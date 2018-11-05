<?php

namespace app\index\model;

use think\facade\Session;
use think\Model;

class User extends Model
{
    // 设置当前模型对应的完整数据表名称
    protected $table = 'sales_user';
    // 主键
    protected $pk = 'id';
    //钩子初始化
    protected static function init()
    {
        User::event('after_insert',function ($User){
            $roleIds=$User->role_id;
            if (!empty($roleIds)){
                foreach($roleIds as $k=>$v){
                    $data[]=[
                        'user_id'=>$User->id,
                        'role_id'=>$v,
                    ];
                }
                model("UserRole")->insertAll($data);
            }
        });
    }

    //添加账号
    public function add($data){
        $this->allowField(true)->save($data);
        return $this->id;
    }
    //修改账号
    public function edit($data){
        if(!empty($data['role_id'])){
            model("UserRole")->where(['user_id'=>$data['id']])->delete();
            model("UserRole")->allowField(true)->insertAll($data['role_id']);
        }
       return $this->allowField(true)->save($data,['id'=>$data['id']]);
//        return model("UserRole")->allowField(true)->insertAll($data);
    }
    //获取非代理商的数据
    public function lst($where){
        return $this->alias('U')->where($where)->field('U.id,U.username,U.status,group_concat(R.role_name) role_name,group_concat(R.id) role_id')
            ->join('user_role UR','U.id=UR.user_id','left')
            ->join('role R','R.id=UR.role_id','left')
            ->group('U.id')
            ->select();
    }
    //真删除账号
    public function del($id){
        return $this->destroy($id);
    }


    public function insertSales($data){
        //添加一个销售员
        $res = User::insertGetId($data);
        return $res;
    }


    //判断登入者是否有权限
    public function chkPri($id){
        $where=[
            'module_name'=>request()->module(),
            'controller_name'=>request()->controller(),
            'action_name'=>request()->action(),
        ];
        $data=$this->alias('A')->field('count(A.id) has')
            ->join('user_role AR','A.id=AR.user_id','left')
            ->join('role_pri RP','AR.role_id=RP.role_id','left')
            ->join('privilege P','P.id=RP.pri_id','left')
            ->where('A.id='.$id)
            ->where($where)
            ->find()->toArray();
        return $data;
    }
    //获取_menu权限列表
    public function getBtns(){
        $user = session('user_info');
        $id = $user['id'];
        if ($id ==1){
            $priData =\Db::name('privilege')->select();
        }else{
            $priData=$this->alias('U')->field('P.*')
                ->join('user_role UR','U.id=UR.user_id')
                ->join('role_pri RP','UR.role_id=RP.role_id')
                ->join('privilege P','P.id=RP.pri_id')
                ->where('U.id='.$id)
                ->select()->toArray();
        }
        $ret =array();
        foreach($priData as $v){
            if ($v['parent_id'] ==0){
                foreach($priData as $v1){
                    if ($v1['parent_id']==$v['id']){
                        $v['children'][]=$v1;
                    }
                }
                $ret[]=$v;
            }
        }

        return $ret;
    }

    public function findUser($user){
    	//查找用户名
    	$res = User::where('username',$user)->find();
    	return $res;
    }

    public function findPhone($phone){
        //查找电话
        $res = User::where('phone',$phone)->find();
        return $res;
    }

    public function updatePassword($data){
    	//修改密码
    	$res = User::where('id',$data['uid'])->update(['password'=>$data['password']]);
    	return $res;
    }

    public function getChildSales($uid){
    	//获取下级销售员
    	$res = User::where('parent_id',$uid)->where('status',1)->field('id,username,parent_id')->select();
    	return $res;
    }

    public function getSales($where){
    	//获取销售员
    	$res = User::where(array('id'=>$where))->field('id,username,parent_id')->select();
    	return $res;
    }

    public function getOneUser($where){
    	//获取一个用户的信息
    	$res = User::alias('a')
    			   ->join('sales_user_info b','a.id = b.user_id','left')
    			   ->field('a.phone,a.parent_id,b.*')
    			   ->where($where)
    			   ->find()
                   ->toArray();
    	return $res;

    }

    public function updateUser($data){
    	//更新用户信息
    	$res = User::update($data);
    	return $res;
    }

    public function getRegUser(){
        //获取注册审核人员
        $res = User::alias('a')
                   ->join('sales_user_info b','a.id = b.user_id')
                   ->join('sales_user_role c','a.id = c.user_id')
                   ->join('sales_role d','c.role_id = d.id')
                   ->field('a.id,a.username,a.phone,b.first_name,b.last_name,d.role_name')
                   ->where('status',0)
                   ->where('type','<>',0)
                   ->order('create_time','desc')
                   ->select()
                   ->toArray();
        return $res;
    }


    //登陆验证
    public function loginVerify($username,$pwd,$remember)
    {
        if (!$username) return false;
        if (!$pwd) return false;
        //定义存session时候需要排除的个人信息
        $unField = ['password', 'create_time', 'update_time', 'ip', 'phone','login_time'];
        $userInfo = self::where('username|phone', '=', $username)->find();
        if (!$userInfo) return -1; //账号不存在
        if (!password_verify($pwd, $userInfo['password'])) return -2;//密码不正确
        if (2 == $userInfo['status']) return -4;//账号被禁用
        if (3 == $userInfo['status']) return -5;//账号被拉入黑名单
        $data['login_time'] = time();
        $data['ip'] = getClientIp();
        self::where('id', $userInfo['id'])->update($data);
        foreach ($unField as $key => $value) {
            unset($userInfo[$value]);
        }
        $roleName = $this->getUserRoleName($userInfo['id']);
        $userInfo['role_name'] = $roleName;
        //$auth = $this->_getAuth($userInfo['id']);
        Session::set('user_info', $userInfo->toArray());
       // Session::set('auth', $auth);
        if($remember != ''){
            $cookieInfo['username']=$username;
            $cookieInfo['password']=encrypt($pwd);
            Cookie::set('user_info',$cookieInfo,30*24*60*60);
        }
        return true;
    }

    public function getTeamUser($where){
    	//获取团队主页的用户信息
    	//无child结构
    	$res = User::alias('a')
		    	    ->join('sales_channel b','a.id = b.user_id','left')
		    	    ->join('sales_user_info c','a.id = c.user_id','left')
		    	    ->field('b.channel_name,b.chan_pfm_obj,b.chan_doc_num,a.phone,c.first_name,c.last_name')
		    	    ->where($where)
		    	    ->select();

		//有child结构
		// $res = User::alias('a')
		// 		   ->join('sales_user_info b','a.id = b.user_id','left')
		// 		   ->field('a.id,a.username,a.phone,b.first_name,b.last_name')
		// 		   ->where($where)
		// 		   ->select()
		// 		   ->toArray();
    	return $res;
    }

    public function checkUserType($where){
    	//检测用户类型
    	$res = User::where($where)->find();
    	return $res;
    }

    //根据用户id获取角色名称
    public function getUserRoleName($id)
    {
        if(!is_numeric($id)) return '';
        $roleNameArr=$this->alias('a')
            ->leftJoin('sales_user_role ur','a.id=ur.user_id')
            ->leftJoin('sales_role r','r.id=ur.role_id')
            ->where('a.id',$id)
            ->field('r.role_name')
            ->find();
        $roleName=empty($roleNameArr['role_name'])? '':$roleNameArr['role_name'];
        return $roleName;
    }

    //根据用户id获取权限
    private function  _getAuth($id)
    {

    }

    public function findUserId($phone){
    	//使用电话号码查找id
    	$res = User::where('phone',$phone)->value('id');
    	return $res;
    }

}

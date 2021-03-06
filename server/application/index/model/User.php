<?php

namespace app\index\model;

use think\Db;
use think\facade\Cookie;
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
        User::event('after_insert', function ($User) {
            $roleIds = $User->role_id;
            if (!empty($roleIds)) {
                foreach ($roleIds as $k => $v) {
                    $data[] = [
                        'user_id' => $User->id,
                        'role_id' => $v,
                    ];
                }
                model("UserRole")->insertAll($data);
            }
        });
    }

    //添加账号
    public function add($data)
    {
        $this->allowField(true)->save($data);
        return $this->id;
    }

    //修改账号
    public function edit($data)
    {
        if (!empty($data['role_id'])) {
            model("UserRole")->where(['user_id' => $data['id']])->delete();
            model("UserRole")->allowField(true)->insertAll($data['role_id']);
        }
        return $this->allowField(true)->save($data, ['id' => $data['id']]);
//        return model("UserRole")->allowField(true)->insertAll($data);
    }

    //获取非代理商的数据
    public function lst($where)
    {
        return $this->alias('U')->where($where)->field('U.id,U.username,U.status,U.type,group_concat(R.role_name) role_name,group_concat(R.id) role_id')
            ->join('user_role UR', 'U.id=UR.user_id', 'left')
            ->join('role R', 'R.id=UR.role_id', 'left')
            ->group('U.id')
            ->select();
    }

    public function memberlst($where, $per_page = 10, $pageIndex = 1)
    {
        if ($pageIndex < 1) {
            $pageIndex = 1;
        }
        $offset = ($pageIndex - 1) * $per_page;
        $sql = $this->alias('U')->where($where)->field('U.id,U.username,U.status,U.type,U.phone,U.create_time,UI.first_name,UI.last_name')
            ->join('user_info UI', 'U.id = UI.user_id')
            ->order('create_time', 'desc');
        $limitData = $sql->limit($offset, $per_page)->select();
        $count = $sql->count();
        $pageCount = ceil($count / $per_page);
        $data = [
            'data' => $limitData,
            'pageCount' => $pageCount
        ];
        return $data;
    }

    //真删除账号
    public function del($id)
    {
        return $this->destroy($id);
    }


    public function insertSales($data)
    {
        //添加一个销售员
        $res = User::insertGetId($data);
        return $res;
    }


    //判断登入者是否有权限
    public function chkPri($id)
    {
        $where = [
            'module_name' => request()->module(),
            'controller_name' => request()->controller(),
            'action_name' => request()->action(),
        ];
        $data = $this->alias('A')->field('count(A.id) has')
            ->join('user_role AR', 'A.id=AR.user_id', 'left')
            ->join('role_pri RP', 'AR.role_id=RP.role_id', 'left')
            ->join('privilege P', 'P.id=RP.pri_id', 'left')
            ->where('A.id=' . $id)
            ->where($where)
            ->find()->toArray();
        return $data;
    }

    private function _getAuth($id)
    {
        $url = [];
        $page = [];
        $result = Db::name('user')
                    ->alias('u')
                    ->join('user_role ur', 'u.id=ur.user_id')
                    ->join('role_pri rp', 'ur.role_id=rp.role_id')
                    ->join('privilege p', 'p.id=rp.pri_id')
                    ->field('p.controller_name,p.action_name,p.path')
                    ->where('u.id', $id)
                    ->select();
        foreach ($result as $k) {
            $url[] = strtolower($k['controller_name'] . '/' . $k['action_name']);
            if ($k['path'] == 2) {
                //这里存放页面
                $page[] = strtolower($k['controller_name'] . '/' . $k['action_name']);
            }
        }
        Session::set('page',$page);
        return $url;
    }

    //获取_menu权限列表
    public function getBtns()
    {
        $user = session('user_info');
        $id = $user['id'];
        if ($id == 1) {
            $priData = \Db::name('privilege')->where('path','<',3)->select();
        } else {
            $priData = $this->alias('U')->distinct('pri_name')->field('P.*')
                ->join('user_role UR', 'U.id=UR.user_id')
                ->join('role_pri RP', 'UR.role_id=RP.role_id')
                ->join('privilege P', 'P.id=RP.pri_id')
                ->where('U.id=' . $id)
                ->where('P.path','<',3)
                ->select()->toArray();
        }
        $ret = getTree($priData);
        if ($id == 1) {
            //过滤超级管理员的数据
            foreach ($ret as $a => $b) {

                if ($b['path'] == 2 && $b['controller_name'] != 'Message') {
                    unset($ret[$a]);
                }

            }
        }
        
        return $ret;
    }

    public function findUser($user)
    {
        //查找用户名
        $res = User::where('username', $user)->find();
        return $res;
    }

    public function findPhone($phone)
    {
        //查找电话
        $res = User::where('phone', $phone)->find();
        return $res;
    }

    public function findPassword($uid){
        //查询密码
        $res = User::where('id',$uid)->value('password');
        return $res;
    }

    public function updatePassword($data)
    {
        //修改密码
        $res = User::where('id', $data['id'])->update(['password' => $data['password']]);
        return $res;
    }

        public function updatePasswordByPhone($data)
    {
        //修改密码
        $res = User::where('id', $data['uid'])->update(['password' => $data['password']]);
        return $res;
    }

    public function getChildSales($uid)
    {
        //获取下级销售员
        $res = User::where('parent_id', $uid)->where('status', 1)->field('id,username,parent_id')->select();
        return $res;
    }

    public function getSales($where)
    {
        //获取销售员
        $res = User::where(array('id' => $where))->field('id,username,parent_id')->select();
        return $res;
    }

    public function getOneUser($where)
    {
        //获取一个用户的信息
        $res = User::alias('a')
            ->join('sales_user_info b', 'a.id = b.user_id', 'left')
            ->field('a.status,a.type,a.username,a.phone,a.parent_id,a.username,b.*')
            ->where($where)
            ->find()
            ->toArray();
        return $res;

    }

    public function updateUser($data)
    {
        //更新用户信息
        $res = User::update($data);
        return $res;
    }

    public function getRegUser($where = '1=1')
    {
        //获取注册审核人员
        $res = User::alias('a')
            ->join('sales_user_info b', 'a.id = b.user_id')
            ->join('sales_user_role c', 'a.id = c.user_id')
            ->join('sales_role d', 'c.role_id = d.id')
            ->field('a.id,a.username,a.phone,b.first_name,b.last_name,d.role_name')
            ->where($where)
            ->where('type', '<>', 0)
            ->order('create_time', 'desc')
            ->select()
            ->toArray();
        return $res;
    }


    /***
     * 登陆验证
     * @param $username  用户名
     * @param $pwd       密码
     * @param $remember  是否记住密码
     * @return bool|int  返回状态
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\ModelNotFoundException
     * @throws \think\exception\DbException
     */
    public function loginVerify($username, $pwd, $remember)
    {
        if (!$username) return false;
        if (!$pwd) return false;
        //定义存session时候需要排除的个人信息
        $unField = ['password', 'create_time', 'update_time', 'ip', 'phone', 'login_time'];
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
        Session::set('user_info', $userInfo->toArray());
        if ($userInfo['status'] == 1) {
            //状态为1才拥有权限
            $auth = $this->_getAuth($userInfo['id']);
            Session::set('auth', $auth);
        }
        if ($remember != '') {
            $cookieInfo['username'] = $username;
            $cookieInfo['password'] = encrypt($pwd);
            Cookie::set('user_info', $cookieInfo, 30 * 24 * 60 * 60);
        }
        return true;
    }

    public function getTeamUser($where)
    {
        //获取团队主页的用户信息
        //无child结构
        $res = User::alias('a')
            ->join('sales_channel b', 'a.id = b.user_id', 'left')
            ->join('sales_user_info c', 'a.id = c.user_id', 'left')
            ->field('a.status,a.id,b.channel_name,b.chan_pfm_obj,b.chan_doc_num,a.phone,c.first_name,c.last_name')
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

    public function checkUserType($where)
    {
        //检测用户类型
        $res = User::where($where)->find();
        return $res;
    }

    /***
     * 根据用户id获取角色名称
     * @param $id  用户ID
     * @return mixed|string  角色名称
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\ModelNotFoundException
     * @throws \think\exception\DbException
     */
    public function getUserRoleName($id)
    {
        if (!is_numeric($id)) return '';
        $roleNameArr = $this->alias('a')
            ->leftJoin('sales_user_role ur', 'a.id=ur.user_id')
            ->leftJoin('sales_role r', 'r.id=ur.role_id')
            ->where('a.id', $id)
            ->field('r.role_name')
            ->find();
        $roleName = empty($roleNameArr['role_name']) ? '' : $roleNameArr['role_name'];
        return $roleName;
    }

    public function findUserId($phone)
    {
        //使用电话号码查找id
        $res = User::where('phone', $phone)->value('id');
        return $res;
    }

    public function getAdmin($where = '1=1')
    {
        //获取管理员
        $res = User::where($where)->select()->toArray();
        return $res;
    }

    public function getSalesList($where){
        //获取销售员列表id
        $res = User::where($where)->select()->toArray();
        return $res;
    }



}

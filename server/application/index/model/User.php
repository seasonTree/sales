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

    public function findUser($user){
    	//查找用户名
    	$res = User::where('username',$user)->find();
    	return $res;
    }

    public function updatePassword($data){
    	//修改密码
    	$res = User::where('id',$data['uid'])->update(['password'=>$data['password']]);
    	return $res;
    }

    public function getChildSales($uid){
    	//获取下级销售员
    	$res = User::where('parent_id',$uid)->field('id,username,parent_id')->select();
    	return $res;
    }

    public function getSales($where){
    	//获取销售员
    	$res = User::where(array('id'=>$where))->field('id,username,parent_id')->select();
    	return $res;
    }

    public function loginVerify($name,$pwd)
    {
        if(!$name) return false;
        if(!$pwd) return false;
        //定义存session时候需要排除的个人信息
        $unField=['password','create_time','update_time','ip','login_time'];
        $userInfo=self::where('username|phone','=',$name)->find();
        if(!$userInfo) return -1; //账号不存在
        if(!password_verify($pwd,$userInfo['password'])) return -2;//密码不正确
        if(0==$userInfo['status']) return -3;//未通过审核
        if(2==$userInfo['status']) return -4;//账号被禁用
        if(3==$userInfo['status']) return -5;//账号被拉入黑名单
        $data['login_time']=time();
        $data['ip']=getClientIp();
        self::where('id',$userInfo['id'])->update($data);
        foreach ($unField as $key=>$value) {
            unset($userInfo[$value]);
        }
        $roleName=$this->getUserRoleName($userInfo['id']);
        $userInfo['role_name']=$roleName;
        $auth=$this->_getAuth($userInfo['id']);
        Session::set('user_info',$userInfo->toArray());
        Session::set('auth',$auth);
        return true;
    }

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

    public function  _getAuth($id)
    {

    }
}

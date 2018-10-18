<?php

namespace app\index\model;

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

    public function getSales($uid){
    	//获取销售员
    	$res = User::where('parent_id',$uid)->select();
    	return $res;
    }






}

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




}

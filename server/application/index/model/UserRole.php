<?php

namespace app\index\model;

use think\Model;

class UserRole extends Model
{
    //// 设置当前模型对应的完整数据表名称
    protected $table = 'sales_user_role';

    public function insertUserRole($data){
    	//写入用户角色表
    	$res = UserRole::insertGetId($data);
    	return $res;
    }
}

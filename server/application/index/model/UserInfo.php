<?php

namespace app\index\model;

use think\Model;

class UserInfo extends Model
{
    // 设置当前模型对应的完整数据表名称
    protected $table = 'sales_user_info';
    // 主键
    protected $pk = 'id';

    public function findUserId($phone){
    	//使用电话号码查找id
    	$res = UserInfo::where('phone',$phone)->value('user_id');
    	return $res;
    }





}
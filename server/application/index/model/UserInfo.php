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

    public function insertPic($data){
    	//插入图片
    	$res = UserInfo::update($data);
    	return $res;
    }

    public function insertUserInfo($data){
    	//插入用户详细信息
    	$res = UserInfo::insertGetId($data);
    	return $res;
    }

    public function updateUserInfo($data){
    	//更新用户详细信息
    	$res = UserInfo::update($data);
    	return $res;

    }

    public function getUrlCode($where){
        //获取邀请注册的url地址
        $res = UserInfo::where($where)->field('id,url_code')->find()->toArray();
        return $res;
    }






}
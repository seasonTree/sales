<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/7/23
 * Time: 12:53
 */

namespace app\index\model;


use think\Model;

class Message extends Model
{

   // 设置当前模型对应的完整数据表名称
    protected $table = 'sales_message';
    // 主键
    protected $pk = 'id';

    public function getMessage($where){
    	//获取信息
    	$res = Message::where($where)
    				  ->alias('a')
    				  ->join('sales_user_info b','a.sender = b.user_id','left')
    				  ->field('a.*,b.first_name,b.last_name')
    				  ->select();
    	return $res;
    }

    public function getMessageCount($where){
    	//获取未读信息条数
    	$res = Message::where($where)->count('id');
    	// echo Message::getlastsql();exit;
    	return $res;
    }

    public function isRead($where){
    	//标记已读
    	$res = Message::where($where)->update(array('status' => 1));
    	return $res;
    }

}
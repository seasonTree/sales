<?php

namespace app\index\model;

use think\Model;

class User extends Model
{
    // 设置当前模型对应的完整数据表名称
    protected $table = 'sales_user';
    // 主键
    protected $pk = 'id';
    //添加账号
    public function add($data){
        $this->allowField(true)->save($data);
        return $this->id;
    }
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
    	$res = User::where('parent_id',$uid)->where('status',1)->field('id,username,parent_id')->select();
    	return $res;
    }

    public function getSales($where){
    	//获取销售员
    	$res = User::where(array('id'=>$where))->field('id,username,parent_id')->select();
    	return $res;
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






}

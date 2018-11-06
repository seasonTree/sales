<?php
namespace app\index\controller;
use app\index\model\User as UserModel;

class Audit
{
    public function regAudit(){
    	//注册审核
    	return view('/reg_audit');
    }

    public function regLst(){
    	//注册列表
    	$user_model = new UserModel();

    	try {
    			$data = $user_model->getRegUser();

	        } catch (\Exception $e) {

	            return json(['msg' => '获取注册信息失败','code' => 1]);
	        }
    	
    	if ($data) {
    		$mark = array();
	    	//标记
	    	foreach ($data as $k => $v) {
	    		//处理角色叠加问题
	    		if (array_key_exists($v['id'],$mark)){
	    			$mark[$v['id']]['role_name'] = $mark[$v['id']]['role_name'].','.$v['role_name'];
	    		}else{
	    			$mark[$v['id']] = $v;
	    		}
	    	}
	    	sort($mark);
	    	//重建索引
	    	return json(['msg' => '获取注册信息成功','code' => 0,'data' => $mark]);
    	}
    	else{
    		return json(['msg' => '没有数据','code' => 0,'data' => '']);
    	}
    	
    	
    }
}

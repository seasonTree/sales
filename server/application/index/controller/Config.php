<?php
namespace app\index\controller;

use app\index\model\SelConfig as SelConfigModel;

class Config
{	
	
    public function regSetting(){
    	//注册设置
    	return view('/reg_setting');
    }

    public function notifySetting(){
    	//消息设置
    	return view('/notify_setting');
    }

    public function notifySettingLst(){
    	//消息设置列表

    }

    public function addConfig(){
    	//添加新配置、
    	if (\request()->isPost()) {
    		echo 1;
    	}
    	else{

    		try {

    			$sel_model = new SelConfigModel();
	    		$data = $sel_model->getSelConfig(array('select_name' => '消息类型','status' => 1));
	    		$data['child'] = $sel_model->getSelConfig(array('p_id' => $data[0]['id'],'status' => 1));
	    		// dump($data);
    			return json(['msg' => '获取下拉框成功','code' => 0 , 'data' => $data]);
    			
	        } catch (\Exception $e) {
	            // echo $e->getMessage();
	        	return json(['code' => 1,'msg' => '获取下拉框失败' , 'data' => '']);
	        }

    		
    	}
    }

    public function protocolSetting(){
    	//协议设置
    	return view('/protocol_setting');
    }
}

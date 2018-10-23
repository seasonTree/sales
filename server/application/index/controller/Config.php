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
    		$sel_model = new SelConfigModel();
    		$data = $sel_model->getSelConfig(array('select_name' => '消息类型'));
    		$data['child'] = $sel_model->getSelConfig(array('p_id' => $data[0]['id']));
    		dump($data);
    	}
    }

    public function protocolSetting(){
    	//协议设置
    	return view('/protocol_setting');
    }
}

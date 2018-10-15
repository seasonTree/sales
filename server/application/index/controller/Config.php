<?php
namespace app\index\controller;

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

    public function protocolSetting(){
    	//协议设置
    	return view('/protocol_setting');
    }
}

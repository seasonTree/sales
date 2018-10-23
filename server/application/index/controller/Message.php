<?php
namespace app\index\controller;
use app\index\model\Message as MessageModel;
use think\facade\Session;

class Message
{
    
	public function index(){
		//用户信息
		return view('/message');
	}

	public function lst(){
		//信息列表
		$message_model = new MessageModel();
		$userid = Session::get('user.userid');
		$data = $message_model->getMessage(array('receiver' => $userid));
		if ($data) {
			return json(['msg' => '获取成功','code' => 0,'data' => $data]);
		}
		
		return json(['msg' => '获取失败','code' => 1]);
		// dump($data);
	}

}

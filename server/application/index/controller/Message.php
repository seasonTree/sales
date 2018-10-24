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

	public function getMessageCount(){
		//获取未读信息条数
		$userid = Session::get('user.userid');
		$message_model = new MessageModel();
		$count = $message_model->getMessageCount(array('receiver' => $userid,'status' => 0));
		return json(['msg' => '获取未读信息条数成功','code' => 0,'data'=>['count'=>$count]]);
	}

	public function isRead(){
		//标记已读
		$m_id = input('post.data');
		$message_model = new MessageModel();
		$res = $message_model->isRead(array('id' => $m_id));
		return json(['msg' => '已标记已读','code' => 0 ,'data' => '']);
	}

}

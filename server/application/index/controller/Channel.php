<?php
namespace app\index\controller;
use app\index\model\Channel as ChannelModel;
use think\Session;

class Channel
{
	// protected $middleware = ['Check'];


    public function index(){
    	//渠道
    	
    	
    	// dump($data);
    	return view('/channel');
    }

    public function list(){
    	//获取渠道列表
    	$channel = new ChannelModel();
    	// $userid = Session::has('user.userid');
    	$userid = 2;
    	$data = $channel->getChannel($userid);
    	return json(['data'=>$data,'code'=>200,'msg'=>'']);
    }
}

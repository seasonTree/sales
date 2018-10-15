<?php
namespace app\index\controller;
use app\index\model\Channel as ChannelModel;
use think\Session;

class Channel
{
	// protected $middleware = ['Check'];


    public function index(){
    	//渠道
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

    public function add(){
    	//添加渠道
    	$data = input('post.data');
    	// $data['user_id'] = Session::has('user.userid');
    	$data['user_id'] = 2;
    	$channel = new ChannelModel();

    	$count = $channel->countChannel($data['user_id']);
    	if ($count == 10) {
    		return json(['msg'=>'渠道最多存在十条','code'=>3]);
    	}

    	$find = $channel->findChannel($data);
    	if ($find) {
    		return json(['msg'=>'渠道已存在','code'=>2]);
    	}



    	$res = $channel->addChannel($data);
    	if ($res) {
    		return json(['msg'=>'添加成功','code'=>0]);
    	}
    	return json(['msg'=>'添加失败','code'=>1]);
    }
}

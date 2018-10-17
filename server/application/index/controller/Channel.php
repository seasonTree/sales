<?php
namespace app\index\controller;
use app\index\model\Channel as ChannelModel;
use app\index\model\Url as UrlModel;
use app\index\model\User as UserModel;
use think\facade\Cookie;
use think\facade\Session;

require_once '../extend/QueryingCode.php';

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
    	$userid = Session::get('user.userid');
    	$data = $channel->getChannel($userid);
    	// dump($userid);
    	return json(['data'=>$data,'code'=>200,'msg'=>'']);
    }

    public function add(){
    	//添加渠道
    	$data = input('post.data');
    	// $data['user_id'] = Session::has('user.userid');
    	$data['user_id'] = Session::get('user.userid');
    	$channel = new ChannelModel();

    	$count = $channel->countChannel($data['user_id']);
    	if ($count == 10) {
    		return json(['msg'=>'渠道最多存在十条','code'=>3]);
    	}

    	$find = $channel->findChannel($data);

    	if ($find) {
    		return json(['msg'=>'渠道已存在','code'=>2]);
    	}

    	$channelId = $channel->addChannel($data);

    	$url = getShortUrl("http://app.kooa.vip/signup?channelId=" . $channelId . "&referralCode=" . $data['user_id']);

    	$insert_url['channel_id'] = $channelId;
    	$insert_url['url_code'] = $url;

    	$url_model = new UrlModel();
    	$res = $url_model->addUrl($insert_url);

    	if ($res) {
    		return json(['msg'=>'添加成功','code'=>0]);
    	}
    	return json(['msg'=>'添加失败','code'=>1]);
    }

    public function getSales(){
    	//获取销售员
    	$user = new UserModel();
    	$res = $user->getSales(Session::get('user.userid'));
    	dump($res);
    }

    public function QrCode()
    {	
    	//二维码
        $url= urldecode(input('url_code'));
        $option = input('option');
        $logoPath = config('template.client_image').'logo.jpg';
        $code = new \QueryingCode();
        $code->makeQueryingCode($url,$logoPath,$option);
    }
}

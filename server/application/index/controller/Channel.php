<?php
namespace app\index\controller;
use app\index\model\Channel as ChannelModel;
use app\index\model\Url as UrlModel;
use app\index\model\User as UserModel;
use think\facade\Cookie;
use think\facade\Session;
use think\facade\Env;

require_once dirname(Env::get('ROOT_PATH')).'/server/extend/QueryingCode.php';

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
    	$userid = Session::get('user_info')['id'];
    	$data = $channel->getChannel($userid);
    	// dump($userid);
    	return json(['data'=>$data,'code'=>200,'msg'=>'']);
    }

    public function add(){
    	//添加渠道
    	$data = input('post.data');
    	if (empty($data['channel_name'])) {
    		return json(['msg' => '渠道名字不能为空' ,'code' => 4 ]);
    	}
    	// $data['user_id'] = Session::has('user.userid');
    	$data['user_id'] = Session::get('user_info')['id'];
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
    	$data = $user->getChildSales(Session::get('user.userid'));
    	// dump($data);
    	$channel_id = input('post.data.channel_id');
    	$channel_model = new ChannelModel();
    	$user_id = $channel_model->getChannelSales($channel_id);
    	$user_id = array_column($user_id, 'user_id');
    	$child_data = $user->getSales($user_id);
    	return json(['code' => 0,'msg' => '获取销售员成功', 'data' => [ 'sales' => $data,'child' => $child_data ]]);
    }

    public function addSales(){
    	//添加销售员到渠道

    	$data = input('post.data');
    	$channel_id = array_pop($data);
    	$channel_name = array_pop($data);
    	$uid = array_column($data,'id');
    	$channel_model = new ChannelModel();
    	$url_model = new UrlModel();

    	if (empty($uid)) {
    		//一个销售都没有选中
    		$channel_where = array('p_id' => $channel_id);

    		try {
    			$channel_ids = $channel_model->getChannelIds($channel_where);
    			$channel_ids = array_column($channel_ids, 'id');
	            $channel_model->delAllChannel($channel_where);
	            $url_model->delUrl(array('channel_id' => $channel_ids));

	            return json(['code' => 0,'msg' => '操作成功', 'data' => '']);
	        } catch (\Exception $e) {
	            // echo $e->getMessage();
	        	return json(['code' => 1,'msg' => '操作失败' , 'data' => '']);
	        }
    		
    	}
    	
    	try {

    			$channel_ids = $channel_model->getNotInChannelIds($uid,$channel_name);

    			if ($channel_ids) {
    				$channel_ids = array_column($channel_ids, 'id');
			        $channel_model->delNotInChannel(array('p_id' => $channel_id),$channel_name,array('id' => $channel_ids));
			        $url_model->delUrl(array('channel_id' => $channel_ids));
    			}
	            // return json(['code' => 0,'msg' => '操作成功', 'data' => '']);
	        } catch (\Exception $e) {
	            // echo $e->getMessage();
	        	return json(['code' => 1,'msg' => '操作失败' , 'data' => '']);
	        }
    	

        $channel_arr = array(
    					'p_id' => $channel_id,
    					'channel_name' => $channel_name
    						);

    	foreach ($uid as $k => $v) {

    		$channel_arr['user_id'] = $v;

    		try {
    			$find = $channel_model->findChannel(array('channel_name' => $channel_name,'user_id' => $v));
    			
    			if (!$find) {
    				$c_id = $channel_model->addChannel($channel_arr);
		    		//渠道URL
		    		$url = getShortUrl("http://app.kooa.vip/signup?channelId=" . $c_id . "&referralCode=" . $v);

		    		$insert_url['channel_id'] = $c_id;
	    			$insert_url['url_code'] = $url;

		            $url_model->addUrl($insert_url);
    				
    			}
    			
	        } catch (\Exception $e) {
	            // echo $e->getMessage();
	        	return json(['code' => 1,'msg' => '操作失败' , 'data' => '']);
	        }

    	}

    	return json(['code' => 0,'msg' => '操作成功' , 'data' => '']);

    }
    

    public function QrCode()
    {	
    	//二维码
        $url = urldecode(input('url_code'));
        $option = input('option');
        $logoPath = dirname(Env::get('ROOT_PATH')).config('template.tpl_replace_string.__basePath__').'/dist/image/logo.jpg';
        $code = new \QueryingCode();
        $code->makeQueryingCode($url,$logoPath,$option);
    }
}

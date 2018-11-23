<?php
namespace app\index\controller;
use app\index\model\User as UserModel;
use app\index\model\DocUserInfo as DocUserInfoModel;
use app\index\model\EcommerceApi as EcommerceApiModel;
use app\index\model\Channel as ChannelModel;
use think\facade\Session;

class Achievement
{
    public function index(){
    	//业绩主页
    	return view('/achievement');
    }
    
    public function distributionNetwork(){
    	//销售网络
    	return view('/distribution_network');
    }

    public function lst(){
    	//业绩列表
    	$user_model = new UserModel();
    	if (Session::get('user_info')['parent_id'] == 0) {
    		//经销商
    		$where['parent_id'] = Session::get('user_info')['id'];
    	}
    	else{
    		//个人
    		$where['id'] =  Session::get('user_info')['id'];
    	}
    	$sale_lst = $user_model->getSalesList($where);
    	$sale_ids = array_column($sale_lst, 'id');
    	$doc_user_model = new DocUserInfoModel();
    	$ecommerce_model = new EcommerceApiModel();
        $channel_model = new ChannelModel();
        $data = array();
    	foreach ($sale_ids as $k => $v) {
    		$doc = $doc_user_model->getDocData(array('referralCode' => $v));
    		$data[$k]['doc_num'] = count($doc);
            $data[$k]['chan_pfm_obj'] = $channel_model->getPfmObj(array('user_id' => $v));
            $data[$k]['chan_doc_num'] = $channel_model->getDocNum(array('user_id' => $v));
            $data[$k]['achievement'] = 0;
            // $data[$k]['children'] = array();
            foreach ($doc as $a => $b) {
                $ecommerce = $ecommerce_model->getEcommerce(array('a.userid' => $b['user_id'],'b.referralCode' => $v));
                $data[$k]['children'][$a]['firstName'] = $b['firstName'];
                $data[$k]['children'][$a]['lastName'] = $b['lastName'];
                foreach ($ecommerce as $n => $list) {
                    $data[$k]['achievement']+= $list['unitprice'] * $list['quantity'];
                }
            }
    	}

        // return json(['msg' => '获取成功','data' => $data,'code' => 0]);
    	dump($data);

    }



}

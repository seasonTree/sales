<?php
namespace app\index\controller;
use app\index\model\DocUserInfo as DocUserInfoModel;

require_once '../extend/QueryingCode.php';

class Api
{
    public function login(){
    	dump(input('post.'));
    	// return json(['code'=>200,'username'=>input('username'),'password'=>input('password')]);
    }

    public function userRegister()
    {
        //用户注册
        $data = input('put.');
        //获取参数
        $token = config('config.api_token');
        //token

        date_default_timezone_set('UTC');
        $timeStamp = date('Y-m-d\TH', time());
        $key = $token;
        $signature = $this->getSignature($timeStamp, $key);
        // echo $signature;exit;
        $field = array('firstName', 'lastName', 'contactPhone', 'referralCode', 'channelId');
        if (!isset($data['secret'])) {
            return json(['code' => 2, 'msg' => 'secret does not exist.']);
        }
        if ($data['secret'] != $signature) {
            return json(['code' => 3, 'msg' => 'secret error']);

        }
        if (!isset($data['user']['id'])) {
            return json(['code' => 4, 'msg' => 'data in wrong format']);
        }

        foreach ($data['user']['profile'] as $k => $v) {
            if (!in_array($k, $field)) {
                return json(['code' => 4, 'msg' => 'data in wrong format']);
            }
        }
        $insert['user_id'] = $data['user']['id'];
        $insert['firstName'] = $data['user']['profile']['firstName'];
        $insert['lastName'] = $data['user']['profile']['lastName'];
        $insert['contactPhone'] = $data['user']['profile']['contactPhone'];
        $insert['referralCode'] = $data['user']['profile']['referralCode'];
        $insert['channelId'] = $data['user']['profile']['channelId'];
        if ($insert['user_id'] == '') {
            return json(['code' => 6, 'msg' => 'user_id can not be empty']);
        }
        if ($insert['firstName'] == '') {
            return json(['code' => 7, 'msg' => 'firstName can not be empty']);
        }
        if ($insert['lastName'] == '') {
            return json(['code' => 8, 'msg' => 'lastName can not be empty']);
        }
        if ($insert['contactPhone'] == '') {
            return json(['code' => 9, 'msg' => 'contactPhone can not be empty']);
        }
        if ($insert['referralCode'] == '') {
            return json(['code' => 10, 'msg' => 'referralCode can not be empty']);
        }
        if ($insert['channelId'] == '') {
            return json(['code' => 11, 'msg' => 'channelId can not be empty']);
        }
        $find = DocUserInfoModel::where($insert)->find();
        if ($find) {
            return json(['code' => 5, 'msg' => 'data is already there. Please do not repeat it.']);
        }
        $res = DocUserInfoModel::insert($insert);
        if ($res) {
            return json(['code' => 0, 'msg' => 'success']);
        } else {
            return json(['code' => 1, 'msg' => 'fail']);
        }

    }
    //获得推荐人和医生的关联数据
    public function getUsageHistory($startDate, $endDate)
    {

        date_default_timezone_set('UTC');
        $timeStamp = date('Y-m-d\TH', time());
        $key = 'vGaPb2eu1b9dtfGMJ8';
        $signature = $this->getSignature($timeStamp, $key);
        $url = "https://app.kooa.vip/usage?startDate={$startDate}&endDate={$endDate}&secret={$signature}";

        $result = $this->httpGet($url);
        return $result;
    }

    //去购买交易数据
    public function getECommerce($user_id, $startDate, $endDate)
    {
        date_default_timezone_set('UTC');
        $timeStamp = date('Y-m-d\TH', time());
        $key = 'GVz7V95yI0BalgPZFv';
        $signature = $this->getSignature($timeStamp, $key);
        $url = "http://ec.kooa.ai/eCommerce/API/token/index.php/API/user/usages?userid={$user_id}&startdate={$startDate}&enddate={$endDate}&secret={$signature}";
//        $result=$this->httpGet($url);
        $result = $this->httpGet($url);

        return $result;
//            return $url;
    }

    public function httpGet($url)
    {
        $curl = curl_init();
        //需要请求的是哪个地址
        curl_setopt($curl, CURLOPT_URL, $url);
        //表示把请求的数据已文件流的方式输出到变量中
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        //开启 TLS False Start （一种 TLS 握手优化方式）php 7.0.7 有效
        curl_setopt($curl, CURLOPT_SSL_FALSESTART, 1);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
        $result = curl_exec($curl);
        curl_close($curl);
        return $result;
    }

    public function getSignature($timeStamp, $key)
    {
        return $signature = sha1($timeStamp . $key);
    }

    public function createQrCode()
    {
        //生成二维码
        $code = new \QueryingCode();
        $input = input('get.');
        $token = config('config.api_token');
        //token

        if (!isset($input['api_token'])) {
            return json(['code' => 2, 'msg' => 'Token does not exist.']);
        }
        if ($input['api_token'] != $token) {
            return json(['code' => 3, 'msg' => 'Token error']);
        }
        if (!isset($input['url'])) {
            return json(['code' => 4, 'msg' => 'data in wrong format']);
        }
        if (!isset($input['logo_url'])) {
            return json(['code' => 4, 'msg' => 'data in wrong format']);
        }

        try {
            $logo_res = file_get_contents($input['logo_url']);
        } catch (\Exception $e) {
            // echo "error";
            $logo_res = '';

        }
        //异常处理

        if (!$logo_res) {
            return json(['code' => 5, 'msg' => 'logo does not exist']);
        }

        $qr_string = $code->createQrCode($input['url'], $input['logo_url']);
        if ($qr_string) {
            return json(['code' => 0, 'msg' => 'success', 'qr_code_url' => $qr_string]);
        } else {
            return json(['code' => 1, 'msg' => 'fail']);

        }
        // echo $qr_string;
    }

    public function test(){
    	//测试
    	return view('/test');
    }
}

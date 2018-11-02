<?php
namespace app\index\controller;

use \think\Request;
use think\facade\Env;
use app\index\model\User as UserModel;

require_once dirname(Env::get('ROOT_PATH')).'/server/extend/ShortMessage.php';
require_once dirname(Env::get('ROOT_PATH')).'/server/extend/Mailer.php';

class Register
{
	private $redis;
    public function __construct(Request $request = null)
    {
        // parent::__construct($request);
        // $this->redis=new \Redis();
        // $this->redis->connect(Config::get('redis.host'),Config::get('redis.port'));
        // $this->redis->select(Config::get('redis.db_index'));
    }

    public  function index()
    {
        return view('/user_reg');
    }


    public function userRegister(){
    	//用户注册
    	$data = input('post.data');
    	if ($data['username'] == '') {
    		return json(['msg' => '用户名不能为空','code' => 1]);
    	}
    	if ($data['password'] == '') {
    		return json(['msg' => '密码不能为空','code' => 2]);
    	}
    	if ($data['identify_code'] == '') {
    		return json(['msg' => '验证码不能为空','code' => 3]);
    	}
    	if ($data['phone_num'] == '') {
    		return json(['msg' => '电话号码不能为空','code' => 4]);
    	}
    	if ($data['agree'] != 'true') {
    		return json(['msg' => '请同意协议','code' => 5]);
    	}

    	if ($data['referralCode'] == '') {
    		return json(['msg' => '缺少邀请码','code' => 6]);
    	}

    	if ($data['password'] != $data['rePassword']) {
    		return json(['msg' => '两次输入密码不一样','code' => 13]);
    	}

    	$user_model = new UserModel();
    	$find_user = $user_model->findUser($data['username']);
    	if ($find_user) {
    		return json(['msg' => '用户名已经存在','code' => 12]);
    	}
    	$find_phone = $user_model->findPhone($data['phone_num']);
    	if ($find_phone) {
    		return json(['msg' => '电话已经存在','code' => 14]);
    	}

    	$redis = new \Redis();
        $redis->connect(config('config.redis.host'), config('config.redis.port'));
        $redis->select(config('config.redis.db_index'));
        $phone = $redis->get('user:'.input('post.data.phone_num'));
        if (!$phone) {
        	return json(['code' => 7,'msg' => '非法操作，未能获取验证码']);
        }
        if ($phone != input('post.data.identify_code')) {
        	return json(['code' => 8,'msg' => '验证码错误']);
        }

        $check_user = checkUser($data['username']);
        if (!$check_user) {
        	return json(['code' => 9 ,'msg' => '用户名6至12位，以字母开头,字母，数字，减号，下划线']);
        }
        $check_password = checkPassword($data['password']);
        if (!$check_password) {
        	return json(['code' => 10,'msg' => '密码不能小于6位']);
        }
        $check_phone = checkPhone($data['phone_num']);
        if (!$check_phone) {
        	return json(['code' => 11,'msg' => '手机号码格式错误']);
        }

        $insert['password'] = password_hash($data['password'],PASSWORD_DEFAULT);
        $insert['username'] = $data['username'];
        $insert['phone'] = $data['phone_num'];
        $insert['parent_id'] = $data['referralCode'];

        $res = $user_model->insertSales($insert);
        if ($res) {
        	return json(['code' => 0,'msg' => '注册成功','data' => ['url' => '/']]);
        }
        else{
        	return json(['code' => 15,'msg' => '注册失败']);
        }

    }

    public function showProtocol(){
    	//展示协议
    	return view('/protocol');
    }

	/**
     * @return \think\response\Json
     * 发送短信验证码
     */
    public function sendMessage()
    {
        if (\request()->isPost()) {
            $phone = input('phone');
            $section = input('section');
            if (!$this->isMobile($phone)) {
                return json(['resp_code' => '1', 'msg' => \think\lang::get('phone_rule')]);
            }
            if (!$this->checkExpire($phone)) {
                return json(['resp_code' => '2', 'msg' => \think\lang::get('short_message_reg')]);
            }

            $code = $this->random();
            $this->redis->set('user:' . $phone, $code);
            $this->redis->setex('user:' . $phone, 300, $code);
            $message = new \ShortMessage();
            $result = $message->sendSms('00' . $section . $phone, $code);
            if ($result->Message == 'OK' && $result->Code == 'OK') {
                return json(['resp_code' => '0', 'msg' => \think\lang::get('short_message_success')]);
            }
        }
    }

    /**
     * @return string
     * 返回随机验证码
     */
    private function random()
    {
        $length = 6;
        $char = '0123456789';
        $code = '';
        while (strlen($code) < $length) {
            //截取字符串长度
            $code .= substr($char, (mt_rand() % strlen($char)), 1);
        }
        return $code;
    }
}

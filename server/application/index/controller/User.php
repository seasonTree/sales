<?php
namespace app\index\controller;
use app\index\model\UserInfo as UserInfoModel;
use app\index\model\User as UserModel;

require_once '../extend/ShortMessage.php';
require_once '../extend/Mailer.php';

class User
{

	public function index(){
		//用户主页
		return view('/user_manage');
	}

	public function personInfo(){
		//个人信息
		return view('/user_info');
	}

	public function resetPassword(){
		//重置密码
		return view('/reset_password');
	}

	public function doResetPassword(){
		//重置密码
		$data = input('post.data');
		if ($data['password'] == '') {
			return json(['code' => 1,'msg' => '密码不能为空']);
		}
		if ($data['rePassword'] != $data['password']) {
			return json(['code' => 2,'msg' => '两次输入密码不一致']);
		}
		if (!isset($data['uid'])) {
			return json(['code' => 3,'msg' => '非法操作']);
		}
		$data['password'] = password_hash($data['password'],PASSWORD_DEFAULT);
		$user_model = new UserModel();
		$res = $user_model->updatePassword($data);
		if (!$res) {
			return json(['code' => 4,'msg' => '修改失败']);
		}
		return json(['code' => 0,'msg' => '修改成功' ,'data' => [ 'url' => '/']]);

	}

	public function doCheckCode(){
		//验证码验证
		$redis = new \Redis();
        $redis->connect(config('config.redis.host'), config('config.redis.port'));
        $redis->select(config('config.redis.db_index'));
        $phone = $redis->get('user:'.input('post.data.phone_num'));
        if (!$phone) {
        	return json(['code' => 1,'msg' => '非法操作，未能获取验证码']);
        }
        if ($phone != input('post.data.identify_code')) {
        	return json(['code' => 2,'msg' => '验证码错误']);
        }
        $user_info = new UserInfoModel();
        $uid = $user_info->findUserId(input('post.data.phone_num'));
        return json(['code' => 0,'msg' => '验证成功','data'=>['url'=>'/user/resetpassword','uid'=>$uid]]);
	}

	public function sendMessage()
    {
    	//发短信
        if (\request()->isPost()) {

        	$redis = new \Redis();
	        $redis->connect(config('config.redis.host'), config('config.redis.port'));
	        $redis->select(config('config.redis.db_index'));

            $phone = input('post.data.phone_num');
            // dump(input('post.'));exit;
            if ($phone == '') {
            	return json(['resp_code' => '2', 'msg' => '电话号码不能为空']);
            }

            if (!checkPhone($phone)) {
            	return json(['resp_code' => '3', 'msg' => '请填写正确的电话号码']);
            }
            //电话号码
            // $section = input('section');
            $section = '86';
            //区号
            $code = $this->random();
            //随机验证码
            $redis->set('user:' . $phone, $code);
            $redis->setex('user:' . $phone, 300, $code);
            // $message = new \ShortMessage();
            // $result = $message->sendSms('00' . $section . $phone, $code);
            // // dump($result);
            // if ($result->Message == 'OK' && $result->Code == 'OK') {
            //     return json(['resp_code' => '0', 'msg' => '发送成功']);
            // }
            // else{
            // 	return json(['resp_code' => '1', 'msg' => '发送失败']);
            // }
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

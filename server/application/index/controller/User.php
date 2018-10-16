<?php
namespace app\index\controller;


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

	public function sendMessage()
    {
    	//发短信
        if (\request()->isPost()) {

        	$redis = new \Redis();
	        $redis->connect(config('config.redis.host'), config('config.redis.port'));
	        $redis->select(config('config.redis.db_index'));

            $phone = input('phone');
            //电话号码
            // $section = input('section');
            $section = '86';
            //区号
            $code = $this->random();
            //随机验证码
            $redis->set('user:' . $phone, $code);
            $redis->setex('user:' . $phone, 300, $code);
            $message = new \ShortMessage();
            $result = $message->sendSms('00' . $section . $phone, $code);
            // dump($result);
            if ($result->Message == 'OK' && $result->Code == 'OK') {
                return json(['resp_code' => '0', 'msg' => '发送成功']);
            }
            else{
            	return json(['resp_code' => '1', 'msg' => '发送失败']);
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

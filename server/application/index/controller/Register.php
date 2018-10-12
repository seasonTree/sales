<?php
namespace app\index\controller;

use think\Loader;
Loader::import('ShortMessage', ROOT_PATH . 'application/entend/ShortMessage.php');
Loader::import('Mailer', ROOT_PATH . 'application/entend/Mailer.php');

class Register
{
	private $redis;
    public function __construct(Request $request = null)
    {
        parent::__construct($request);
        $this->redis=new \Redis();
        $this->redis->connect(Config::get('redis.host'),Config::get('redis.port'));
        $this->redis->select(Config::get('redis.db_index'));
    }
    
    public function companyReg(){
    	//公司注册
    	return view('/company_reg');
    }

    public function personReg(){
    	//个人注册
    	return view('/person_reg');
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

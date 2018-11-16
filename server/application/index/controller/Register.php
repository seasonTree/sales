<?php
namespace app\index\controller;

use \think\Request;
use think\facade\Env;
use app\index\model\User as UserModel;
use app\index\model\UserRole as UserRoleModel;
use app\index\model\Message as MessageModel;

require_once dirname(Env::get('ROOT_PATH')).'/server/extend/ShortMessage.php';
require_once dirname(Env::get('ROOT_PATH')).'/server/extend/Mailer.php';

class Register
{
	

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

        $phone = redis()->get('user:'.input('post.data.phone_num'));
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
        $insert['type'] = 2;

        $res = $user_model->insertSales($insert);
        if ($res) {
        	$user_role_model = new UserRoleModel();
        	$role_id = $user_role_model->getRoleId(array('role_name' => '销售员'));
        	$user_role_model->insertUserRole(array('user_id' => $res,'role_id' => $role_id));
        	//写入角色

        	$message_model = new MessageModel();
			$insert_message = array(
									'title' => '注册信息',
									'sender' => 1,
									'receiver' => $res,
									'type' => 3
								);
			$insert_message['content'] = '恭喜您已经注册成功，请尽快完善个人信息，才可以正常使用所有功能。';
			$message_model->addMessage($insert_message);

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


}

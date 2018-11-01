<?php
namespace app\index\controller;

use app\index\model\User as UserModel;
use think\facade\Cookie;
use think\facade\Log;
use think\facade\Request;
use think\facade\Session;
use think\Model;

class Login
{
    private $userModel;
    public function __construct(UserModel $userModel)
    {
        $this->userModel=$userModel;
    }

    public function searchPass()
    {
        //找回密码界面
        return view('/forget_password');
    }

    public function loginOut(){
        //退出登录
        Session::clear();
        return redirect('/');
    }

    public function login(){
        //登录
        $username = input('post.data.username');
        $password = input('post.data.password');
        $remember = input('post.data.remember');

        if ($username == '') {
            return json(['code' => 1,'msg' => '用户名不能为空']);
        }

        if ($password == '') {
            return json(['code' => 2,'msg' => '密码不能为空']);
        }

        //$user = new UserModel();
        $res = $this->userModel->findUser($username);

        if (!$res) {
            return json(['code' => 3,'msg' => '用户名不存在']);
        }
        if(!password_verify($password,$res['password'])){
            return json(['code' => 4,'msg' => '密码错误']);
        }

        if($remember != ''){
               Cookie::set('username',$username,30*24*60*60);
               Cookie::set('userid',$res['id'],30*24*60*60);
        }

        Session::set('user.username', $username);
        Session::set('user.userid', $res['id']);

        return json(['code' => 0,'msg' => '正在登录','data'=>'/channel/index']);

    }

    public function loginVerify()
    {
        if(!Request::param('data.username')) return json(['code'=>1,'msg'=>'用户名不能为空']);
        if(!Request::param('data.password')) return json(['code'=>2,'msg'=>'密码不能为空']);
        $info=$this->userModel->loginVerify(Request::param('data.username'),Request::param('data.password'),Request::param('data.remember'));
        if(false===$info) return json(['code'=>3,'msg'=>'登陆错误']);
        if(-1===$info) return json(['code'=>4,'msg'=>'账号不存在']);
        if(-2===$info) return json(['code'=>5,'msg'=>'密码错误']);
        if(-4===$info) return json(['code'=>7,'msg'=>'账号被禁用']);
        if(-5===$info) return json(['code'=>8,'msg'=>'账号被拉入黑名单']);
        if($info) Log::record('login:登陆成功','operate');
        return json(['code'=>0,'msg'=>'登陆成功','url'=>'/user/userinfo']);
    }

    public function testPassword()
    {
        $data='12345678';
        echo $data;
        $encryptData=encrypt($data);
        echo $encryptData;
        $decryptData=decrypt($encryptData);
        echo $decryptData;
    }

    public function testGetIp()
    {
      dump(getenv("HTTP_CLIENT_IP"));
      PHP_EOL;
      dump(getenv("HTTP_X_FORWARDED_FOR"));
      PHP_EOL;
      dump(getenv('REMOTE_ADDR'));
    }
}

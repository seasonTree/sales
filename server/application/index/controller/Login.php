<?php
namespace app\index\controller;

use app\index\model\User as UserModel;
use think\facade\Cookie;
use think\facade\Request;
use think\facade\Session;

class Login
{
    public function searchPass()
    {
        //找回密码界面
        return view('/forget_password');
    }

    public function loginOut(){
        //退出登录
        return view('/index');
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

        $user = new UserModel();
        $res = $user->findUser($username);

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
        if(!Request::param('username')) return json(['code'=>'1','msg'=>'用户名不能为空']);
        if(!Request::param('password')) return json(['code'=>'','msg'=>'密码不能为空']);
    }
}

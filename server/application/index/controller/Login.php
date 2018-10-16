<?php
namespace app\index\controller;

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

    }
}

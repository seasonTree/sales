<?php
namespace app\index\controller;

class Login
{
    public function searchPass()
    {
        //找回密码界面
        return view('/forget_password');
    }
}

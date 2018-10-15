<?php
namespace app\index\controller;

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

}

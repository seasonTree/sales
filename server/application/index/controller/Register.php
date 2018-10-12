<?php
namespace app\index\controller;

class Register
{
    public function companyReg(){
    	//公司注册
    	return view('/company_reg');
    }

    public function personReg(){
    	//个人注册
    	return view('/person_reg');
    }
}

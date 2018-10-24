<?php
namespace app\index\controller;

class Achievement
{
    public function index(){
    	//业绩主页
    	return view('/achievement');
    }
    
    public function distributionNetwork(){
    	//销售网络
    	return view('/distribution_network');
    }
}

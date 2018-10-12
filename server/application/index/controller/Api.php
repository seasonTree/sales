<?php
namespace app\index\controller;

class Api
{
    public function login(){
    	dump(input('post.'));
    	// return json(['code'=>200,'username'=>input('username'),'password'=>input('password')]);
    }
}

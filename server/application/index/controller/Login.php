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

    public function login()
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
        return json(['code'=>0,'msg'=>'登陆成功','data'=>['url'=>'/user/userInfo']]);
    }

}

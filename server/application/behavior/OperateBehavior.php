<?php

namespace app\behavior;

use \think\Controller;
use think\Exception;
use think\facade\Cookie;
use think\facade\Log;
use think\facade\Request;
use think\facade\Session;

/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/10/16
 * Time: 14:54
 */
class OperateBehavior extends Controller
{
    /**
     * 定义需要排除权限的路由
     */
    protected $exclude = [
        '/',
        'index/index',
        'login/loginout',
    ];

    /**
     *定义未登录需要排除权限的路由
     */
    protected $login = [
        '/',
        'index/index',
        'login/searchpass',
        'login/login',
        'index/browserchoose',
    ];

    /**
     * 权限验证
     */
    public function run()
    {
        //获取当前访问路由
        $url = getActionUrl();
        if (in_array($url, $this->login)) {
            if (checkLogin()) {
                $this->redirect('user/userInfo');
            }
        }
        if (empty(Session::get()) && !in_array($url, $this->login)) {
            if (checkLogin()) {
                $this->redirect($url);
            }
            $this->error('请先登陆', '/', '', '1');
        }

        //用户所拥有的权限路由
//            $auth=Session::get('auth.url')?Session::get('auth.url'):[];
//            if(!$auth&&!in_array($url,$this->login)&&!in_array($url,$this->exclude)){
//                $this->error('请先登陆','/index/index');
//            }
//            if(!in_array($url, $auth) && !in_array($url, $this->exclude)){
//                $this->error('无权限访问');
//            }
    }

}
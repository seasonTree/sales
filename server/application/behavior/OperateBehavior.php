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
        'transaction/lst',//获取交易报告的数据
        'transaction/exportExcel',//打印交易报告的数据
        'Auser/lst',//获取后台账号数据
        'user/getmemberlst',//获取销售账号数据
        'role/lst',//获取角色列表
        'user/userinfo',//当前用户页面跳转
        'user/getoneuser',//获取当前用户信息
        'channel/list',//获取渠道信息
        'team/lst',//获取团队列表
        'channel/qrcode',//获取二维码信息
        'channel/getchannel',//获取单条渠道
        'channel/addsales',//调整销售员
        'audit/reglst',//获取审核列表
        'channel/getsales',//获取销售员
        'message/getmessagecount',//获取未读条数
        'config/getprotocol',//获取协议内容
        'user/insuserinfo',//写入用户信息
        'user/upload',//上传
        'user/sendmessage',//发短信,
        'config/protocollst',//协议列表
        'config/getprotocol',//获取协议内容
        'auser/lst',//获取管理员列表
        'message/lst',//获取信息列表
        'user/doresetpassword',//修改密码

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
        'user/sendmessage',
        'config/showprotocol',
        'register/index',//注册页面
        'register/userregister',//注册提交
    ];

    /**
     *定义未审核的时候拥有的权限路由
     */
    protected $unaudit = [
        'user/userinfo',//当前用户页面跳转
        'user/getoneuser',//获取当前用户信息
        'user/insuserinfo',//写入用户信息
        'user/upload',//上传
        'message/index',//信息主页
        'message/lst',//获取信息列表
        'message/getmessagecount'//获取未读条数
    ];

    /**
     * 权限验证
     */
    public function run()
    {
        //获取当前访问路由
        $url = getActionUrl();
        if (in_array($url, $this->login)) {
            if (checkLogin() && $url != 'user/sendmessage') {
                $this->redirect('user/userInfo');
            }
        }
        if (empty(Session::get()) && !in_array($url, $this->login)) {
            if (checkLogin()) {
                $this->redirect($url);
            }
            $this->error('请先登陆', '/', '', '1');
        }

        $userid = Session::get('user_info')['id'] ? Session::get('user_info')['id'] : 0;
        if ($userid != 0) {
            //用户所拥有的权限路由(登录后)
            $auth = Session::get('auth') ? Session::get('auth') : $this->unaudit;
            $auth = array_merge($this->login,$this->exclude,$auth);
            // dump($auth);exit;
        }
        else{
            $auth = $this->login;
            if (!in_array($url, $auth)) {
                $this->error('请先登陆', '/index/index');
            }
        }
        if ($userid != 1) {
            //超级管理员跳权限
            if (!in_array($url, $auth)) {
                $this->error('无权限访问');
            }

        }
        

    }

}
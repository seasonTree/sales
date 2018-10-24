<?php
namespace app\behavior;
use \think\Controller;
use think\Exception;
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
    protected $exclude =[
        'index/index/index',

    ];

    /**
     *定义未登录需要排除权限的路由
     */
    protected $login=[
        'admin/login/index',
        'admin/login/loginverify',
        'admin/login/iebrowsernocompat',
        'admin/index/welcome',
        'mobile/login/ajaxpswlogin',
        'mobile/login/ajaxsmslogin',
        'mobile/login/sendsms',
        'mobile/login/ajaxupdatepsw',
        'mobile/login/ajaxisregister',
        'mobile/login/ajaxregister',
    ];

    /**
     *定义不需要检测权限的模块
     */
    protected $module=[
        'union',
        'mobile',
    ];

    /**
     * 权限验证
     */
    public  function run()
    {
            //获取当前访问路由
            $url=$this->getActionUrl();
            if(empty(Session::get())&&!in_array($url,$this->login)&&!in_array(strtolower(Request::module()),$this->module)){
                $this->error('please login first','/index/index');
            }
            //用户所拥有的权限路由
            $auth=Session::get('auth.url')?Session::get('auth.url'):[];
            if(!$auth&&!in_array($url,$this->login)&&!in_array($url,$this->exclude)&&!in_array(strtolower(Request::module()),$this->module)){
                $this->error('please login first','/index/index');
            }

            if(!in_array($url, $auth) && !in_array($url, $this->exclude) && !in_array(strtolower(Request::module()), $this->moudel)){
                $this->error('无权限访问1');
            }

    }

    /**
     * 获取当前访问路由
     */
    private function getActionUrl()
    {
        $module=Request::module();
        $controller=Request::controller();
        $action=Request::action();
        $url=$module.'/'.$controller.'/'.$action;
        return strtolower($url);
    }
}
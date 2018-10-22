<?php
namespace app\index\controller;
use think\Controller;
use think\facade\Hook;

class Index extends Controller
{
    public function index()
    {
        return view('/index');
    }

    public function personReg(){
        return view('/person_reg');
    }

    public function httpRequest()
    {
       $arr1=[1,2,3,4];
       $arr2=['a','b','1','2'];
       $arr=array_merge($arr1,$arr2);
       print_r($arr) ;
    }

    public function test()
    {
        $result='';
        $flag=['first','second'];
        Hook::add('first_action','app\\behavior\\Test');
        Hook::add('second_action','app\\behavior\\Test');
        foreach ($flag as $key=>$value)
        {
            if($value=='first'){
              $result=  Hook::listen('first_action','this is first behavior');
              dump($result) ;
            }
            if($value=='second'){
               $result= Hook::listen('second_action','this is second behavior');
               dump($result) ;
            }
        }
    }

}

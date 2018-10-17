<?php
namespace app\index\controller;

class Role
{
    
	public function index(){
       
		//角色主页
		return view('/user_role');
	}
	public function lst(){
        $data =model('Role')->lst();
        foreach ($data as $k=>$v){
            $v['username'] =array_unique(explode(',',$v['username']));$data[$k]['username'] =implode(',',$v['username']);
            $v['pri_name'] =array_unique(explode(',',$v['pri_name']));$data[$k]['pri_name'] =implode(',',$v['pri_name']);
        }
        $priData =model('privilege')->getTree();
        return json(['data'=>$data,'priData'=>$priData]);
    }

}

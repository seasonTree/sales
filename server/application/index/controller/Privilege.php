<?php
namespace app\index\controller;
use \think\Controller;
class Privilege extends Controller
{
    
	public function index (){
		//权限主页
//        $model =model('Privilege');
//
//        $data = $model->getTree();
//        $count = count($data);
//        halt($data);

//        $this->assign('data',$data);
//
//        $this->assign('count',$count);
		return view('/user_permisson');
	}
	//提供权限数据
	public function list(){
        $model =model('Privilege');

        $data = $model->getTree();
        $count = count($data);
        return json(['data'=>$data,'count'=>$count,'code'=>200,'message'=>'权限列表数据']);
    }

}

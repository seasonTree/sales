<?php
namespace app\index\controller;
use \think\Controller;
class Privilege extends Controller
{
    
	public function index (){
		return view('/user_permisson');
	}
	//提供权限数据
	public function list(){
        $model =model('Privilege');

        $data = $model->getTree();
        $count = count($data);
        return json(['data'=>$data,'count'=>$count,'code'=>200,'message'=>'权限列表数据']);
    }
    public function edit(){
        $priModel = model('Privilege');
	    $data = input('post.data');
	    $data['pri_name']=preg_replace('/-+/','',$data['pri_name']);
	    unset($data['level']);
        $validate =validate('Privilege');
        if (!$validate->check($data)){
            $error =$validate->getError();
            return json("$error");
        }

        try{
            $id =$priModel->edit($data);

        }catch(\Exception $e){
            $error =$e->getMessage();
            return json("$error");

        }
	    return json(['data'=>$id]);
    }

}

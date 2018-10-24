<?php
namespace app\index\controller;
use \think\Controller;
class Privilege extends Controller
{
    
	public function index (){
		return view('/user_privilege');
	}
	//提供权限数据
	public function lst(){
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
            return json(['message'=>$error]);
        }

        try{
            $id =$priModel->edit($data);

        }catch(\Exception $e){
            $error =$e->getMessage();
            return json(['message'=>$error]);

        }

	    return json(['message'=>'修改成功']);
    }
    public function add(){
	    $data = input('post.data');
        $validate =validate('Privilege');
        if (!$validate->check($data)){
            $error =$validate->getError();
            return json(['message'=>$error]);
        }
        try{
            $id =model('Privilege')->add($data);
        }catch(\Exception $e){
            $error =$e->getMessage();
            return json(['message'=>$error]);
        }
        return json(['message'=>'新增成功']);
    }
    public function del(){
	    $id = input('post.data');
        $res['msg'] = \app\index\model\Privilege::destroy($id);
        if ($res['msg']){
            return json(['message'=>'删除成功']);
        }else{
            return json(['message'=>'删除失败']);
        }

    }

}

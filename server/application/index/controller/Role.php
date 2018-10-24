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
            $v['pri_id'] =array_unique(explode(',',$v['pri_id']));$data[$k]['pri_id'] =implode(',',$v['pri_id']);
        }
        $priData =model('privilege')->getTree();
        return json(['data'=>$data,'priData'=>$priData]);
    }
    public function add(){
	    $data = input('post.data');
	    $arr['role_name'] = $data['role_name'];
        foreach ($data['selected'] as $k =>$v){
            $arr['pri_id'][] =$v['id'];
        }
        $data = $arr;
        $validate =validate('Role');
        if (!$validate->check($data)){
//                $this->error($validate->getError());
            $error =$validate->getError();
            return json(['message'=>$error]);
        }

        $id=model('Role')->add($data);
        if($id){
            return json(['message'=>'新增成功']);
        }
    }
    public function edit(){
        $data =input('post.data');
        $arr['role_name'] = $data['role_name'];
        $arr['id'] = $data['id'];
        foreach ($data['selected'] as $k =>$v){
            $arr['pri_id'][] =$v['id'];
        }
        $data = $arr;
        $validate =validate('Role');
        if (!$validate->check($data)){
            $error =$validate->getError();
            return json(['message'=>$error]);
        }
        $id=model('Role')->edit($data);
        if($id){
            return json(['message'=>'修改成功']);
        }
    }
    public function del(){
	    $id =input('post.data');
        if (model('role')->del($id)){
            return json(['message'=>'删除成功']);
        }else{
            return json(['message'=>'失败成功']);
        }
    }
}

<?php
namespace app\index\controller;
use \think\Controller;
use think\Request;

class Auser extends Controller
{
//    protected $middleware =['Check'];
    public function index(Request $request){
        if($request->error){
            return $request->error;
        }
        //用户主页
        return view('/user_manage');
    }
    //添加账号
    public function add(){
        $data = input('post.data');
        $user =model('User')->findUser($data['username']);
        if($user){
            return json(['msg'=>'账号名已存在','code'=>1]);
        }
        $validate =validate('User');
        if (!$validate->check($data)){
            $error =$validate->getError();
            return json(['msg'=>$error,'code'=>1]);
        }
        $data['password']= password_hash($data['password'],PASSWORD_DEFAULT);
        $data['status']= 1;
        $id=model('User')->add($data);
        if($id){
            return json(['msg'=>'新增成功','code'=>0]);
        }
    }
    //修改账号
    public function edit(){
        $data = input('post.data');
        if(!empty($data['password'])){
            if($data['password'] ===$data['password_confirm']){
                $data['password']= password_hash($data['password'],PASSWORD_DEFAULT);
            }else{
                return json(['msg'=>'密码不一致','code'=>'1']);
            }
        }

        if(!empty($data['role_id'])){

            foreach ($data['role_id'] as $k =>$v){
                $arr[]=[
                    'user_id'=>$data['id'],
                    'role_id'=>$v,
                ];
            }
            $data['role_id']=$arr;
        }
        $id=model('User')->edit($data);

        if($id){
            return json(['msg'=>'修改成功','code'=>'0']);
        }else{
            return json(['msg'=>'修改失败','code'=>'1']);
        }
    }
    //用户列表展示
    public function lst($where ='type<>2'){
        $data =model('Role')->lst();
        $res=  model('User')->lst($where);
        return json(['Userdata'=>$res,'data'=>$data,'code'=>0,'msg'=>'用户列表展示数据']);
    }

    //删除账号
    public function del(){
        $id =input('post.data');
        if (model('user')->del($id)){
            return json(['msg'=>'删除成功','code'=>'0']);
        }else{
            return json(['msg'=>'删除失败','code'=>'1']);
        }
    }
    //管理员添加代理商
    public function addDls(){
        $data = input('post.data');
        $user =model('User')->findUser($data['username']);
        if($user){
            return json(['msg'=>'账号名已存在','code'=>1]);
        }
        $validate =validate('User');
        if (!$validate->check($data)){
            $error =$validate->getError();
            return json(['msg'=>$error,'code'=>1]);
        }
        $data['password']= password_hash($data['password'],PASSWORD_DEFAULT);
        $data['status']= 0;
        if($data['role_id'][0] ==2){
            $data['type']= 3;
        }elseif ($data['role_id'][0] ==1){
            $data['type']= 1;
        }
        $id=model('User')->add($data);
        if($id){
            return json(['msg'=>'新增成功','code'=>0]);
        }
    }

}

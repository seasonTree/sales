<?php
namespace app\index\controller;
use think\facade\Env;
use think\facade\Request;
use think\facade\Session;
use app\index\model\UserInfo as UserInfoModel;
use app\index\model\User as UserModel;

require_once dirname(Env::get('ROOT_PATH')).'/server/extend/ShortMessage.php';
require_once dirname(Env::get('ROOT_PATH')).'/server/extend/Mailer.php';

class User
{

	public function index(){
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
        foreach ($data['role_id'] as $k =>$v){
            $arr[]=[
                'user_id'=>$data['id'],
                'role_id'=>$v,
            ];
        }
        $id=model('User')->edit($arr);

        if($id){
            return json(['msg'=>'修改成功','code'=>'0']);
        }else{
            return json(['msg'=>'修改失败','code'=>'1']);
        }
    }
    //用户列表展示
    public function lst($where = ['type'=>'0']){
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

	public function personInfo(){
		//个人信息
		return view('/user_info');
	}

	public function resetPassword(){
		//重置密码
		return view('/reset_password');
	}

	public function doResetPassword(){
		//重置密码
		$data = input('post.data');
		if ($data['password'] == '') {
			return json(['code' => 1,'msg' => '密码不能为空']);
		}
		if ($data['rePassword'] != $data['password']) {
			return json(['code' => 2,'msg' => '两次输入密码不一致']);
		}

		$check_has = Session::has('user.userid');
		if (!$check_has) {
			if (!isset($data['uid'])) {
				return json(['code' => 3,'msg' => '非法操作']);
			}
		}
		else{

			$data['uid'] = Session::get('user.userid');
		}

		if (strlen($data['password']) < 6 || strlen($data['password']) > 30 ) {
			return json(['code' => 4,'msg' => '密码长度只能在6到30位之间']);
		}
		if (!checkPassword($data['password'])) {
			return json(['code' => 5,'msg' => '密码由数字字母下划线和.组成']);
		}
		$data['password'] = password_hash($data['password'],PASSWORD_DEFAULT);
		$user_model = new UserModel();
		$res = $user_model->updatePassword($data);
		if (!$res) {
			return json(['code' => 6,'msg' => '修改失败']);
		}
		return json(['code' => 0,'msg' => '修改成功' ,'data' => [ 'url' => '/']]);

	}

	public function doCheckCode(){
		//验证码验证
		$redis = new \Redis();
        $redis->connect(config('config.redis.host'), config('config.redis.port'));
        $redis->select(config('config.redis.db_index'));
        $phone = $redis->get('user:'.input('post.data.phone_num'));
        if (!$phone) {
        	return json(['code' => 1,'msg' => '非法操作，未能获取验证码']);
        }
        if ($phone != input('post.data.identify_code')) {
        	return json(['code' => 2,'msg' => '验证码错误']);
        }
        $user_info = new UserInfoModel();
        $uid = $user_info->findUserId(input('post.data.phone_num'));
        return json(['code' => 0,'msg' => '验证成功','data'=>['url'=>'/user/resetpassword','uid'=>$uid]]);
	}

	public function sendMessage()
    {
    	//发短信
        if (\request()->isPost()) {

        	$redis = new \Redis();
	        $redis->connect(config('config.redis.host'), config('config.redis.port'));
	        $redis->select(config('config.redis.db_index'));

            $phone = input('post.data.phone_num');
            // dump(input('post.data.phone_num'));exit;
            if ($phone == '') {
            	return json(['resp_code' => '2', 'msg' => '电话号码不能为空']);
            }

            if (!checkPhone($phone)) {
            	return json(['resp_code' => '3', 'msg' => '请填写正确的电话号码']);
            }

            // $user_model = new UserModel();
            // $res = $user_model->findUserId($phone);
            // if (!$res) {
            // 	return json(['resp_code' => '4', 'msg' => '电话号码不存在']);
            // }
            //电话号码
            // $section = input('section');
            $section = '86';
            //区号
            $code = $this->random();
            //随机验证码
            $redis->set('user:' . $phone, $code);
            $redis->setex('user:' . $phone, 300, $code);
            $message = new \ShortMessage();
            $result = $message->sendSms('00' . $section . $phone, $code);
            // dump($result);
            if ($result->Message == 'OK' && $result->Code == 'OK') {
                return json(['resp_code' => '0', 'msg' => '发送成功']);
            }
            else{
            	return json(['resp_code' => '1', 'msg' => '发送失败']);
            }
        }
    }

     /**
     * @return string
     * 返回随机验证码
     */
    private function random()
    {
        $length = 6;
        $char = '0123456789';
        $code = '';
        while (strlen($code) < $length) {
            //截取字符串长度
            $code .= substr($char, (mt_rand() % strlen($char)), 1);
        }
        return $code;
    }

    public function userInfo(){
    	//个人资料
    	// input('post.');
    	// return json(['msg' => '成功','code' => 0,'data' => ]);
    	$user_id = Session::get('user.userid');
    	$file_path = dirname(Env::get('ROOT_PATH')).'/client/dist/upload/temp'.$user_id;
    	$has_temp = Session::has('temp'.$user_id);
    	//检测是否存在临时session图片路径记录
    	if (!$has_temp) {
    		//如果不存在，则删除相应的文件夹
    		delDir($file_path.'/');
    		//删除空目录
    		@rmdir($file_path);
    	}

    	$user_model = new UserModel();
    	$user = $user_model->checkUserType(array('id' => $user_id));
    	if ($user['parent_id'] == 0) {
    		//这是公司账户
    		return view('/company_detail');
    	}
    	else{
    		//这是个人账户
    		return view('/person_detail');
    	}


    }

    public function getOneUser(){
    	//获取当前的个人信息
    	
    }

    public function upload(){
    	//上传
    	$userid = Session::get('user.userid');

    	$file_path = dirname(Env::get('ROOT_PATH')).'/client/dist/upload/temp'.$userid;
    	$save_path = 'upload/temp'.$userid.'/';
    	
    	// 创建临时文件夹
    	if (!is_dir($file_path)) {
            mkdir($file_path,0777,true);
        }

        // 获取表单上传文件
	    $file = request()->file('image');

	    // 移动到框架应用根目录/uploads/ 目录下
	    $info = $file->validate(['size'=>2097152,'ext'=>'jpg,png,jpeg'])->move($file_path.'/');
	    if($info){
	        // 成功上传后 获取上传信息
	        // 输出 jpg
	        // echo $info->getExtension();
	        // // 输出 20160820/42a79759f284b767dfcb2a0197904287.jpg
	        // echo $info->getSaveName();
	        // // 输出 42a79759f284b767dfcb2a0197904287.jpg
	        // echo $info->getFilename(); 

	    	$type = request()->get('type');
	    	//判断上传图片的类型
	    	switch ($type) {
	    		case '1':
	    		//营业执照
	    			Session::set('business_licence',$file_path.'/'.$info->getSaveName());
	    			break;
	    		
	    		case '2':
	    		//个人照片
	    			Session::set('photo_self',$file_path.'/'.$info->getSaveName());
	    			break;

	    		case '3':
	    		//身份证正面
	    			Session::set('id_card_front',$file_path.'/'.$info->getSaveName());
	    			break;
	    			
	    		case '4':
	    		//身份证反面
	    			Session::set('id_card_back',$file_path.'/'.$info->getSaveName());
	    			break;		
	    	}

	    	$option = array(
	    		'image_url' => $file_path.'/'.$info->getSaveName(),
	    		'pic_name' => $info->getFilename(),
	    		'save_path' => $save_path
	    		);

	    	$thumb = $this->createThumb($option);
	    	// dump($thumb);exit;
	    	
	    	Session::set('temp'.$userid,1);

	        return json(['msg' => '上传成功','code' => 0,'data' => [ 'image_url' => $thumb ] ]);
	    }else{
	        // 上传失败获取错误信息
	        // echo $file->getError();
	        return json(['msg' => $file->getError(),'code' => 1]);
	    }


    }

    public function moveImage(){
    	//上传
    	//先检测目录是否存在
    	$file_path = dirname(Env::get('ROOT_PATH')).'/client/dist/upload/image';
    	if (!is_dir($file_path)) {
            mkdir($file_path,0777,true);
        }
    	// 获取表单上传文件
	    $file = request()->file('image');
	    $type = request()->get('type');
	    //判断上传图片的类型

	    // 移动到框架应用根目录/uploads/ 目录下
	    $info = $file->validate(['size'=>2097152,'ext'=>'jpg,png,jpeg'])->move($file_path.'/');
	    if($info){
	        // 成功上传后 获取上传信息
	        // 输出 jpg
	        // echo $info->getExtension();
	        // // 输出 20160820/42a79759f284b767dfcb2a0197904287.jpg
	        // echo $info->getSaveName();
	        // // 输出 42a79759f284b767dfcb2a0197904287.jpg
	        // echo $info->getFilename(); 
	    	$option = array(
	    		'image_url' => $file_path.'/'.$info->getSaveName(),
	    		'pic_name' => $info->getFilename()
	    		);

	    	$thumb = $this->createThumb($option);
	    	// dump($thumb);exit;

	        return json(['msg' => '上传成功','code' => 0,'data' => [ 'image_url' => $thumb ] ]);
	    }else{
	        // 上传失败获取错误信息
	        // echo $file->getError();
	        return json(['msg' => $file->getError(),'code' => 1]);
	    }

    }

    public function createThumb($option){
    	//生成缩略图,
    	//参数1,image_rul,图片的url地址。
    	//参数2,pic_name,图片的名称。
    	//参数3,save_path,保存地址。
    	// $file_path = dirname(Env::get('ROOT_PATH')).'/client/dist/upload/image_thumb';
    	$file_path = dirname(Env::get('ROOT_PATH')).'/client/dist/'.$option['save_path'];
    	if (!is_dir($file_path)) {
            //创建目录
            mkdir($file_path,0777,true);
        }

    	$image = \think\Image::open($option['image_url']);
		// 按照原图的比例生成一个最大为120*100的缩略图并保存为以下名字
		$image->thumb(120, 100)->save($file_path.'/thumb_'.$option['pic_name']);

		return '/client/'.$option['save_path'].'thumb_'.$option['pic_name'];
    }



}

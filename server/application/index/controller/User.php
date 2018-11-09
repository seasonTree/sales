<?php
namespace app\index\controller;
use think\facade\Env;
use think\facade\Request;
use think\facade\Session;
use app\index\model\UserInfo as UserInfoModel;
use app\index\model\User as UserModel;
use app\index\model\Message as MessageModel;

require_once dirname(Env::get('ROOT_PATH')).'/server/extend/ShortMessage.php';
require_once dirname(Env::get('ROOT_PATH')).'/server/extend/Mailer.php';

class User
{
    public function memberlst(){
        return view('/member_list');
    }
    //获取会员列表数据
    public function  getmemberlst(){
        $post = input('post.data');
        $data = model('User')->memberlst(['type'=>$post['type']]);
        return json(['code'=>0,'data'=>$data]);

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

		$check_has = Session::has('user_info');
		if (!$check_has) {
			if (!isset($data['uid'])) {
				return json(['code' => 3,'msg' => '非法操作']);
			}
		}
		else{

			$data['uid'] = Session::get('user_info')['id'];
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
        $phone = redis()->get('user:'.input('post.data.phone_num'));
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
            $phone = input('post.data.phone_num');
            if ($phone == '') {
            	return json(['resp_code' => '2', 'msg' => '电话号码不能为空']);
            }

            if (!checkPhone($phone)) {
            	return json(['resp_code' => '3', 'msg' => '请填写正确的电话号码']);
            }
            $section = '86';
            //区号
            $code = $this->random();
            //随机验证码
            redis()->set('user:' . $phone, $code);
            redis()->setex('user:' . $phone, 300, $code);
            $message = new \ShortMessage();
            $result = $message->sendSms('00' . $section . $phone, $code);
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
    	$user_id = Session::get('user_info')['id'];
    	$file_path = dirname(Env::get('ROOT_PATH')).config('template.tpl_replace_string.__basePath__').'/dist/upload/temp'.$user_id;
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

    	if ($user['type'] == 1) {
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
    	if (input('post.data')) {
    		$uid = input('post.data');
    	}
    	else{
    		$uid = Session::get('user_info')['id'];
    	}
    	
    	$user_model = new UserModel();
    	$data = $user_model->getOneUser(array('a.id' => $uid));
    	$field = array(
			    		'thumb_business_licence',
			    		'business_licence',
			    		'thumb_photo_self',
			    		'photo_self',
			    		'thumb_id_card_front',
			    		'id_card_front',
			    		'thumb_id_card_back',
			    		'id_card_back'
    				);
    	$path = config('template.tpl_replace_string.__basePath__');
    	foreach ($data as $k => $v) {
    		if (in_array($k, $field)) {
    			if ($data[$k] != '') {
    				$data[$k] = $path.$data[$k];
    			}
    			else{
    				$data[$k] = '';
    			}
    			
    		}
    	}
    	return json(['msg' => '获取成功','code' => 0,'data' => $data]);
    	// dump($user);
    }

    public function insUserInfo(){
    	//插入个人详细资料
    	$data = input('post.data');
    	$data['user_id'] = Session::get('user_info')['id'];
    	if (Session::has('user_info_id'.$data['user_id'])) {
    		//检测是否设置了user_info_id
    		$data['id'] = Session::get('user_info_id'.$data['user_id']);
    	}
    	$status = 0;
    	if ($data['type'] == 0) {
    		$status = 1;
    	}
    	$phone = array(
    						'id' => $data['user_id'],
    						'phone' => $data['phone'],
    						'status' => $status,
    						'update_time' => time()
    					);
    	unset($data['phone']);
    	//删除电话
    	unset($data['type']);
    	//删除类型
    	$username = $data['username'];
    	unset($data['username']);
    	//删除用户名
    	$user_model = new UserModel();
    	$res = $user_model->updateUser($phone);
    	$user_info_model = new UserInfoModel();
    	unset($data['parent_id']);
    	//删除pid
    	if ($data['id'] == '') {
    		unset($data['id']);
    		$id = $user_info_model->insertUserInfo($data);
    		//设置一个user_info_id
    		Session::set('user_info_id'.$data['user_id'],$id);
    	}

    	else{
    		$field = array(
			    		'thumb_business_licence',
			    		'business_licence',
			    		'thumb_photo_self',
			    		'photo_self',
			    		'thumb_id_card_front',
			    		'id_card_front',
			    		'thumb_id_card_back',
			    		'id_card_back'
    				);
			foreach ($data as $k => $v) {
	    		if (in_array($k, $field)) {
	    			//去除写入图片url
	    			unset($data[$k]);
	    		}
	    	}
    		$res = $user_info_model->updateUserInfo($data);
    		$id = $data['id'];

    	}
    	
    	if ($res) {

    		$this->moveImage($user_info_model,$id,$data);

    		if ($status == 0 ) {
    			$admin = $user_model->getAdmin(array('type' => 0));
	    		$key_list = array_column($admin,'id');

	    		$message_model = new MessageModel();
	    		foreach ($key_list as $k => $v) {
	    			$insert_message[$k]['title'] = '审核通知';
	    			$insert_message[$k]['sender'] = $data['user_id'];
	    			$insert_message[$k]['receiver'] = $v;
	    			$insert_message[$k]['type'] = 3;
	    			$insert_message[$k]['content'] = '您有一条'.$username.'的注册信息需要审核！';
	    			
	    		}
	    		$message_model->addMessageAll($insert_message);
    		}

    		return json(['msg' => '修改成功','code' => 0]);
    	}
    	else{
    		return json(['msg' => '修改失败','code' => 1]);
    	}


    	

    }

    public function upload(){
    	//上传
    	$userid = Session::get('user_info')['id'];

    	$file_path = dirname(Env::get('ROOT_PATH')).config('template.tpl_replace_string.__basePath__').'/dist/upload/temp'.$userid;
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

	    	$option = array(
	    		'image_url' => $file_path.'/'.$info->getSaveName(),
	    		'pic_name' => $info->getFilename(),
	    		'save_path' => $save_path
	    		);

	    	$thumb = $this->createThumb($option);
			Session::set('temp'.$userid,1);

			$type = request()->get('type');
	    	//判断上传图片的类型
	    	switch ($type) {
	    		case '1':
	    		//营业执照
	    			Session::set('business_licence'.$userid,$file_path.'/'.$info->getSaveName());
	    			Session::set('thumb_business_licence'.$userid,dirname(Env::get('ROOT_PATH')).$thumb[1]);
	    			//这是用于文件转移使用的路径
	    			break;
	    		
	    		case '2':
	    		//个人照片
	    			Session::set('photo_self'.$userid,$file_path.'/'.$info->getSaveName());
	    			Session::set('thumb_photo_self'.$userid,dirname(Env::get('ROOT_PATH')).$thumb[1]);

	    			break;

	    		case '3':
	    		//身份证正面
	    			Session::set('id_card_front'.$userid,$file_path.'/'.$info->getSaveName());
	    			Session::set('thumb_id_card_front'.$userid,dirname(Env::get('ROOT_PATH')).$thumb[1]);
	    			break;
	    			
	    		case '4':
	    		//身份证反面
	    			Session::set('id_card_back'.$userid,$file_path.'/'.$info->getSaveName());
	    			Session::set('thumb_id_card_back'.$userid,dirname(Env::get('ROOT_PATH')).$thumb[1]);
	    			break;		
	    	}
	        return json(['msg' => '上传成功','code' => 0,'data' => [ 'image_url' => $thumb[0] ] ]);
	    }else{
	        // 上传失败获取错误信息
	        return json(['msg' => $file->getError(),'code' => 1]);
	    }
    }

    public function moveImage($obj,$id,$data){
    	//移动图片
    	$id_card_path = createDir('id_card_front');
        $id_card_back_path = createDir('id_card_back');
    	$business_licence_path = createDir('business_licence');
    	$photo_self_path = createDir('photo_self');
    	//创建并获取路径
        $userid = Session::get('user_info')['id'];
        $save_path = '/upload/image/';
        //存储路径
        $del_path = dirname(Env::get('ROOT_PATH')).config('template.tpl_replace_string.__basePath__').'/dist/';
        //删除路径

        if (Session::has('user_data'.$userid)) {
        	//获取session中的user_data
        	$data = unserialize(Session::pull('user_data'.$userid));
        }

        $user_info_model = new UserInfoModel();
        $field = array( 
        				'id_card_front' => $id_card_path,
        				'id_card_back' => $id_card_back_path,
        				'business_licence' => $business_licence_path,
        				'photo_self' => $photo_self_path
        			);
        //设置4个字段,字段名 = 地址
        foreach ($field as $k => $v) {
        	if (Session::has($k.$userid)) {
        		$pic = Session::pull($k.$userid);
        		$thumb_pic = Session::pull('thumb_'.$k.$userid);
        		//获取临时文件的地址,并删除该session
        		$ext = strstr($pic, '.');
        		//获取文件后缀名
        		$pic_path = $v.'/'.$userid.$ext;
        		$thumb_pic_path = $v.'/'.$userid.'thumb'.$ext;
        		//生成移动后的路径
        		@unlink($del_path.strstr($data[$k],'upload/'));
	        	@unlink($del_path.strstr($data['thumb_'.$k],'upload/'));
	        	//删除旧文件
	        	@rename($pic, $pic_path);
	        	@rename($thumb_pic, $thumb_pic_path);
	        	//移动新文件
	        	$obj->insertPic(
        				array(
        					$k => $save_path.$k.'/'.date('Ymd',time()).'/'.$userid.$ext,
        					'thumb_'.$k => $save_path.$k.'/'.date('Ymd',time()).'/'.$userid.'thumb'.$ext,
        					'id' => $id
        				)
        			);
        		//入库
	        	$data[$k] = $save_path.$k.'/'.date('Ymd',time()).'/'.$userid.$ext;
	        	$data['thumb_'.$k] = $save_path.$k.'/'.date('Ymd',time()).'/'.$userid.'thumb'.$ext;
	        	//更新这个用户的图片存储地址的路径
        	}
        }

        $file_path = $del_path.'/upload/temp'.$userid;
        delDir($file_path.'/');
    	//删除临时目录
    	@rmdir($file_path);
		//删除空目录
        Session::set('user_data'.$userid,serialize($data));
        //把数据存回session,保证下次调用的时候是最新数据

    }

    public function createThumb($option){
    	//生成缩略图,
    	//参数1,image_rul,图片的url地址。
    	//参数2,pic_name,图片的名称。
    	//参数3,save_path,保存地址。
    	$file_path = dirname(Env::get('ROOT_PATH')).config('template.tpl_replace_string.__basePath__').'/dist/'.$option['save_path'];
    	if (!is_dir($file_path)) {
            //创建目录
            mkdir($file_path,0777,true);
        }

    	$image = \think\Image::open($option['image_url']);
		// 按照原图的比例生成一个最大为120*100的缩略图并保存为以下名字
		$image->thumb(120, 100)->save($file_path.'/thumb_'.$option['pic_name']);

		//返回data两种路径，1，按域名计算的路径,2，按文件系统进行计算的路径
		$data = array(
						config('template.tpl_replace_string.__basePath__').'/'.$option['save_path'].'thumb_'.$option['pic_name'],
						config('template.tpl_replace_string.__basePath__').'/dist/'.$option['save_path'].'thumb_'.$option['pic_name']
					);

		return $data;
    }



}

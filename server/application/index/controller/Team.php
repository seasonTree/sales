<?php
namespace app\index\controller;
use app\index\model\User as UserModel;
use app\index\model\Channel as ChannelModel;
use app\index\model\UserInfo as UserInfoModel;
use think\facade\Session;

class Team
{
    
	public function index(){
		//团队主页
		return view('/team');
	}

	public function lst(){
		//团队列表
		$team = new UserModel();
		$userid = Session::get('user_info')['id'];
		$p_id = Session::get('user_info')['parent_id'];
		if ($p_id == 0) {
			$team_user = $team->getTeamUser(array('parent_id' => $userid));
		}
		else{
			$team_user = $team->getTeamUser(array('a.id' => $userid));
		}
		if ($team_user) {
			return json(['msg' => '获取成功','code' => 1,'data' => $team_user]);
		}
		else{
			return json(['msg' => '没能获取到数据','code' => 0,'data' => $team_user]);
		}
		
	}

	public function showInvitation(){
		//获取邀请人的信息
		$user_info_model = new UserInfoModel();
		$res = $user_info_model->getUrlCode(array('user_id' => Session::get('user_info')['id']));
		if ($res['url_code'] == '') {
			$url = getShortUrl('http://'.$_SERVER['SERVER_NAME']."/register/index?referralCode=".Session::get('user_info')['id']);
			$res['url_code'] = $url;
			$user_info_model->updateUserInfo($res);

		}
		if ($res) {
			return json(['msg' => '获取邀请人的信息成功','code' => 0,'data' => $res]);
		}
		return json(['msg' => '获取邀请人的信息失败','code' => 1]);
	}

	public function changeStatus(){
		//启用,禁用
		$data = input('post.data');
		$user_model = new UserModel();
		if ($data['status'] == 1) {
		   $res	= $user_model->updateUser(array('id' => $data['id'],'status' => 2));
		   $status = 2;
		}
		if ($data['status'] == 2) {
		   $res	= $user_model->updateUser(array('id' => $data['id'],'status' => 1));
		   $status = 1;
		}
		if ($res) {
			return json(['msg' => '操作成功','code' => 0,'data' => ['status' => $status]]);
		}
		else{
			return json(['msg' => '操作失败','code' => 1]);
		}

	}

}

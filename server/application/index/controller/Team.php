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
		$team_user = $team->getTeamUser(array('parent_id' => $userid));
		// $channel_model = new ChannelModel();

		// foreach ($team_user as $k => $v) {

		// 	$team_user[$k]['channel'] = $channel_model->getTeamChannel(array('user_id' => $v['id']));

		// }
		return json(['msg' => '获取成功','code' => 1,'data' => $team_user]);
		// dump($team_user);
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

}

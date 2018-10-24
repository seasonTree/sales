<?php
namespace app\index\controller;
use app\index\model\User as UserModel;
use app\index\model\Channel as ChannelModel;
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
		$userid = Session::get('user.userid');
		$team_user = $team->getTeamUser(array('parent_id' => $userid));
		// $channel_model = new ChannelModel();

		// foreach ($team_user as $k => $v) {

		// 	$team_user[$k]['channel'] = $channel_model->getTeamChannel(array('user_id' => $v['id']));

		// }
		return json(['msg' => '获取成功','code' => 1,'data' => $team_user]);
		// dump($team_user);
	}

}

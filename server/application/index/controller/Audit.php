<?php
namespace app\index\controller;
use app\index\model\User as UserModel;
use app\index\model\RegisterAudit as RegisterAuditModel;
use app\index\model\Message as MessageModel;
use think\facade\Session;


class Audit
{
    public function regAudit(){
    	//注册审核
    	return view('/reg_audit');
    }

    public function regLst(){
    	//注册列表
    	$user_model = new UserModel();

        $get = input('get.');

    	try {
                if ($get['type'] == 100) {
                    $data = $user_model->getRegUser();
                }
                else{
                    $data = $user_model->getRegUser(array('status' => $get['type']));
                }
    			

	        } catch (\Exception $e) {

	            return json(['msg' => '获取注册信息失败','code' => 1]);
	        }
    	
    	if ($data) {
    		$mark = array();
	    	//标记
	    	foreach ($data as $k => $v) {
	    		//处理角色叠加问题
	    		if (array_key_exists($v['id'],$mark)){
	    			$mark[$v['id']]['role_name'] = $mark[$v['id']]['role_name'].','.$v['role_name'];
	    		}else{
	    			$mark[$v['id']] = $v;
	    		}
	    	}
	    	sort($mark);
	    	//重建索引
	    	return json(['msg' => '获取注册信息成功','code' => 0,'data' => $mark]);
    	}
    	else{
    		return json(['msg' => '没有数据','code' => 0,'data' => []]);
    	}
    }

    public function auditCommit(){
    	//提交审核
    	// dump(input('post.'));exit;
    	$commit = input('post.data');
    	$data['user_id'] = $commit['uid'];
    	$data['audit_id'] = Session::get('user_info')['id'];
    	$data['status'] = $commit['type'];
    	$data['note'] = $commit['note'];

    	$user_model = new UserModel();
    	$res = $user_model->updateUser(array('id' => $data['user_id'],'status' => $data['status']));
    	//写入审核状态
    	if ($res) {
    		$register_audit_model = new RegisterAuditModel();
    		$res = $register_audit_model->auditCommit($data);
    		//写入审核记录

    		$message_model = new MessageModel();
			$insert_message = array(
									'title' => '审核消息',
									'sender' => $data['audit_id'],
									'receiver' => $data['user_id'],
									'type' => 3
								);
			if ($commit['type'] == -1) {
				$insert_message['content'] = '您的个人信息未能通过审核,原因为：'.$data['note'];
			}
			else{
				$insert_message['content'] = '您的个人信息已经通过审核！';
			}
    		if ($res) {
	    		$message_model->addMessage($insert_message);
	    		//发送信息提示，写入信息
    			return json(['msg' => '审核成功','code' => 0,'data' => ['url' => '/Audit/regAudit']]);
    		}
    		else{
    			return json(['msg' => '审核失败','code' => 1]);
    		}
    	}
    	else{
    		return json(['msg' => '审核失败','code' => 1]);
    	}
    	
    }

}

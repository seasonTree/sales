<?php
namespace app\index\controller;

use app\index\model\SelConfig as SelConfigModel;
use app\index\model\Protocol as ProtocolModel;

class Config
{	
	
    public function regSetting(){
    	//注册设置
    	return view('/reg_setting');
    }

    public function notifySetting(){
    	//消息设置
    	return view('/notify_setting');
    }

    public function notifySettingLst(){
    	//消息设置列表

    }

    public function addConfig(){
    	//添加新配置、
    	if (\request()->isPost()) {
    		echo 1;
    	}
    	else{

    		try {

    			$sel_model = new SelConfigModel();
	    		$data = $sel_model->getSelConfig(array('select_name' => '消息类型','status' => 1));
	    		$data['child'] = $sel_model->getSelConfig(array('p_id' => $data[0]['id'],'status' => 1));
	    		// dump($data);
    			return json(['msg' => '获取下拉框成功','code' => 0 , 'data' => $data]);
    			
	        } catch (\Exception $e) {
	            // echo $e->getMessage();
	        	return json(['code' => 1,'msg' => '获取下拉框失败' , 'data' => '']);
	        }

    		
    	}
    }

    public function protocolSetting(){
    	//协议设置
    	return view('/protocol_setting');
    }

    public function protocolLst(){
        //协议列表
        $protocol_model = new ProtocolModel();
        
        try{
            $protocol = $protocol_model->getProtocol();
            foreach ($protocol as $k => $v) {
                $protocol[$k]['create_time'] = date('Y-m-d H:i:s',$v['create_time']);
            }
        }catch(\Exception $e){
            return json(['msg' => '获取协议失败','code' => 1]);
        }
        return json(['msg' => '获取协议成功','code' => 0,'data' => $protocol]);
    }

    public function getProtocol(){
        //获取协议内容
        $id = input('post.data.id');
        $protocol_model = new ProtocolModel();
        try{
            $data = $protocol_model->getProtocolOne(array('id' => $id));
        }catch(\Exception $e){
            return json(['msg' => '获取失败','code' => 1]);
        }
        return json(['msg' => '获取成功','code' => 0,'data' => $data]);

    }

    public function editProtocol(){
        //修改协议
        $data = input('post.');
        $protocol_model = new ProtocolModel();
        $res = $protocol_model->editProtocol($data);
        if ($res) {
            return json(['msg' => '操作成功','code' => 0]);
        }
        else{
            return json(['msg' => '操作失败','code' => 1]);
        }
    }

    public function delProtocol(){
        //删除协议
        $id = input('post.data');
        $protocol_model = new ProtocolModel();
        $res = $protocol_model->delProtocol(array('id' => $id));
        if ($res) {
            return json(['msg' => '操作成功','code' => 0]);
        }
        else{
            return json(['msg' => '操作失败','code' => 1]);
        }
    }

    public function addProtocol(){
        //添加协议
        $data = input('post.');
        $data['create_time'] = time();
        $protocol_model = new ProtocolModel();
        $id = $protocol_model->addProtocol($data);
        if ($id) {
            $data = $protocol_model->getProtocolOne(array('id' => $id));
            $data['create_time'] = date('Y-m-d H:i:s',$data['create_time']);
            return json(['msg' => '操作成功','code' => 0,'data' => $data]);
        }
        else{
            return json(['msg' => '操作失败','code' => 1]);
        }
    }

    public function showProtocol(){
        //展示协议
        $protocol_model = new ProtocolModel();
        $data = $protocol_model->getProtocolOne(array('id' => input('p_id')));

        return view('/protocol',['data' => $data]);
    }
}

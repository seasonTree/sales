<?php
namespace app\index\model;


use think\Model;

class Protocol extends Model{
    protected $table = 'sales_protocol';
    
    // 主键
    protected $pk = 'id';

    public function getProtocol($where = '1=1'){
    	//获取协议
    	$res = Protocol::where($where)->where('status',0)->order('update_time','desc')->select();
    	return $res;
    }

    public function getProtocolOne($where = '1=1'){
    	//获取单条数据
    	$res = Protocol::where($where)->where('status',0)->find()->toArray();
    	return $res;

    }

    public function editProtocol($data){
        //修改协议
        $res = Protocol::update($data);
        return $res;
    }

    public function delProtocol($where){
        //删除协议
        $res = Protocol::where($where)->update(array('status' => 1));
        return $res;
    }

    public function addProtocol($data){
        //添加协议
        $res = Protocol::insertGetId($data);
        return $res;
    }
    
}
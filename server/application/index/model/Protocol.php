<?php
namespace app\index\model;


use think\Model;

class Protocol extends Model{
    protected $table = 'sales_protocol';
    
    // 主键
    protected $pk = 'id';

    public function getProtocol($where='1=1'){
    	//获取协议
    	$res = Protocol::where($where)->select();
    	return $res;
    }
    
}
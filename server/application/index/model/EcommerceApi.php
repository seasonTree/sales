<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/9/12
 * Time: 17:54
 */
namespace app\index\model;


use think\Model;

class EcommerceApi extends Model{
    protected $table = 'sales_ecommerce_api';
    public function add ($data){
        $res =$this->saveAll($data,false);
        return $res;
    }

    public function getEcommerce($where){
    	//获取数据
    	$res = EcommerceApi::alias('a')
    					   ->join('sales_tran_api b','a.userid = b.userId','left')
    					   ->field('a.unitprice,a.quantity,a.pid')
    					   ->where($where)
    					   ->group('a.id')
    					   ->select()
    					   ->toArray();
    	return $res;
    }

}
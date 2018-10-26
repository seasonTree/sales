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

}
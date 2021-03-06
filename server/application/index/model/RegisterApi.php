<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/9/12
 * Time: 17:54
 */
namespace app\index\model;


use think\Model;

class RegisterApi extends Model{
    protected $table = 'sales_register_api';
    //获取交易报告数据
    public function getTranReport($referalCode,$startDate=0,$endDate=0,$per_page=10, $pageIndex=1){
        if($referalCode ==1){
            $where=[];
        }else{
            $where =['R.referralCode'=>$referalCode];
        }
        if($pageIndex < 1){
            $pageIndex = 1;
        }
        $offset = ($pageIndex - 1) * $per_page;
        $sql =$this->alias('R')->field('R.referralCode,firstName,description,unitprice,quantity,created_at,contactPhone as phone')
            ->join('ecommerce_api EA','R.userId=EA.userid','RIGHT')->order('created_at','desc')
            ->join('doc_user_info DUI','DUI.user_id =EA.userid','LEFT')->where($where)->where('created_at','between',[$startDate,$endDate]);
        $limitData = $sql->limit($offset, $per_page)->select();
        $count = $sql->count();
        $pageCount = ceil($count / $per_page);
        $data = [
            'data' => $limitData,
            'pageCount' => $pageCount
        ];
            
        return $data;
    }
    //获取交易报告excel数据
    public function getTranReportExcel($referalCode,$startDate=0,$endDate=0){
        if($referalCode ==1){
            $where=[];
        }else{
            $where =['R.referralCode'=>$referalCode];
        }

        $sql =$this->alias('R')->field('R.referralCode,firstName,description,unitprice,quantity,created_at,contactPhone as phone')
            ->join('ecommerce_api EA','R.userId=EA.userid','RIGHT')->order('created_at','desc')
            ->join('doc_user_info DUI','DUI.user_id =EA.userid','LEFT')->where($where)->where('created_at','between',[$startDate,$endDate]);
        $data = $sql->select()->toArray();
        return $data;
    }
}
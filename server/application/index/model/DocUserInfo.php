<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/7/23
 * Time: 12:53
 */

namespace app\index\model;


use think\Model;

class DocUserInfo extends Model
{

   // 设置当前模型对应的完整数据表名称
    protected $table = 'sales_doc_user_info';
    // 主键
    protected $pk = 'id';
    public function getTranReport($referalCode,$start,$end,$per_page=10, $pageIndex=1){
        if($referalCode ==1){
            $where=[];
        }else{
            $where =['referralCode'=>$referalCode];
        }
        if($pageIndex < 1){
            $pageIndex = 1;
        }
        $offset = ($pageIndex - 1) * $per_page;
        $sql =$this->field('referralCode,firstName,create_time as created_at,contactPhone as phone')
           ->order('create_time','desc')
           ->where($where)->where('create_time','between',[$start,$end]);
        $limitData = $sql->limit($offset, $per_page)->select();
        $count = $sql->count();
        $pageCount = ceil($count / $per_page);
        $data = [
            'data' => $limitData,
            'pageCount' => $pageCount
        ];

        return $data;
    }
    public function getTranReportExcel($referalCode,$start,$end){
        if($referalCode ==1){
            $where=[];
        }else{
            $where =['referralCode'=>$referalCode];
        }

        $sql =$this->field('referralCode,firstName,create_time as created_at,contactPhone as phone')
            ->order('create_time','desc')
            ->where($where)->where('create_time','between',[$start,$end]);
        $data = $sql->select()->toArray();


        return $data;
    }

    public function getDocData($where){
        //获取医生们的数据集合
        $res = DocUserInfo::field('user_id,firstName,lastName')->where($where)->select()->toArray();
        return $res;
    }
}
<?php
namespace app\index\model;


use think\Model;

class RegisterAudit extends Model{
    protected $table = 'sales_register_audit';
    
    // 主键
    protected $pk = 'id';

    public function auditCommit($data){
        //提交审核
        $res = RegisterAudit::insertGetId($data);
        return $res;
    }
    
}
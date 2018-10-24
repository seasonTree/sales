<?php

namespace app\index\model;

use think\Model;

class SelConfig extends Model
{
    // 设置当前模型对应的完整数据表名称
    protected $table = 'sales_sel_config';
    // 主键
    protected $pk = 'id';

    public function getSelConfig($where){
        //获取下拉框选项
        $res = SelConfig::where($where)->field('id,select_name,p_id')->select();
        return $res;
    }

}

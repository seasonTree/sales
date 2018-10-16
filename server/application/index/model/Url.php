<?php

namespace app\index\model;

use think\Model;

class Url extends Model
{
    // 设置当前模型对应的完整数据表名称
    protected $table = 'sales_url';
    // 主键
    protected $pk = 'id';

    public function addUrl($data){
        //添加URL
        $res = Url::insert($data);
        return $res;
    }


}

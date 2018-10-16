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

}
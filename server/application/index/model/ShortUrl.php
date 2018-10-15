<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/7/23
 * Time: 12:54
 */

namespace app\admin\model;

use think\Db;
use think\Model;

class ShortUrl extends Model
{
    // 设置当前模型对应的完整数据表名称
    protected $table = 'sales_short_url';
    // 主键
    protected $pk = 'id';
   
}

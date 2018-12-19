<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/12/14
 * Time: 15:23
 */

namespace app\index\model;

use think\Model;

class Tax extends Model
{
    protected $table = 'sales_tax';
    protected $pk = 'id';

    /***
     * 保存、更新数据
     * @param $data
     * @param $id
     * @return bool
     */
    public function addTax($data, $id)
    {
        if ($id) {
            return $this->save($data, ['id' => $id]);
        }
        return $this->save($data);
    }

    /***
     * 直接删除数据库数据
     * @param $id
     * @return bool
     */
    public function delTax($id)
    {
        return self::destroy($id);
    }
}
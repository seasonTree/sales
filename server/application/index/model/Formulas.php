<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/11/30
 * Time: 16:25
 */

namespace app\index\model;

use think\Model;


class Formulas extends Model
{
    protected $id = 'id';
    protected $table = 'sales_formulas';

    public function addFormulas($data)
    {
        return $this->save($data);
    }

    public function delFormulas($id=null)
    {
        if(!$id){
            return false;
        }
        return $this->where(['id'=>$id])->$this->delete();
    }

    public function getFormulas($id = null)
    {
        if ($id) {
            return $this->where(['id' => $id])->find()->toArray();
        }
        return $this->select()->toArray();
    }

    public function updateFormulas($id=null,$data)
    {
        if(!$id){
            return false;
        }
        return $this->save($data,['id'=>$id]);
    }
}
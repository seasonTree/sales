<?php
/**
 * Created by PhpStorm.
 * 税务管理
 * User: Administrator
 * Date: 2018/12/14
 * Time: 15:02
 */

namespace app\index\controller;

use app\index\model\Tax as TaxModel;

class Tax
{

    /***
     * 添加、更新税率
     * @return \think\response\Json
     */
    public function save()
    {
        $type = input('data.type');
        $value = input('data.value');
        $id = input('data.id');
        if (empty($type)) return json(['code' => 1, 'msg' => '税率类型不能为空']);
        if (empty($value)) return json(['code' => 2, 'msg' => '税率值不能为空']);
        $data = ['type' => $type, 'value' => $value];
        $taxModel = new TaxModel();
        if (!$taxModel->addTax($data, $id)) {
            return json(['code' => 3, 'msg' => '添加失败']);
        }
        return json(['code' => 1, 'msg' => '添加成功']);
    }

    /***
     * 删除税率
     * @return \think\response\Json
     */
    public function delete()
    {
        $id = input('data.id');
        if (!$id) return json(['code' => 1, 'msg' => '删除失败']);
        $taxModel = new TaxModel();
        if (!$taxModel->taxDel($id)) {
            return json(['code' => 1, 'msg' => '删除失败']);
        }
        return json(['code' => 0, 'msg' => '删除成功']);
    }

    /***
     * @param $salesAmount 含税销售额
     * @param $taxRate  增值税率
     * @return float|int 返回不含税销售额
     */
    public static function exclusiveOfTax($salesAmount, $taxRate)
    {
        return $exclusiveSalesAmount = $salesAmount / (1 + $taxRate);
    }


    /*
     * 不含税销售额
     */
    public function amountExclusiveOfTax()
    {
        $salesAmount = input('data.amount');
        $taxRate = input('data.rate');
        if (!$salesAmount) return json(['code' => 1, 'msg' => '含税销售额不能为空']);
        if (!$taxRate) return json(['code' => 2, 'msg' => '税率不能为空']);
        $data = self::exclusiveOfTax($salesAmount, $taxRate);
        return json(['code' => 0, 'msg' => '', 'data' => $data]);
    }

    /***
     * @param $salesAmount 含税销售额
     * @param $taxRate   增值税率
     * @return float|int  返回增值税
     */
    public static function addValueTax($salesAmount, $taxRate)
    {
       return $addValueTax=($salesAmount/(1+$taxRate))*$taxRate;
    }

    /***
     * 增值税
     * @return \think\response\Json
     */
    public function addMount()
    {
        $salesAmount = input('data.amount');
        $taxRate = input('data.rate');
        if (!$salesAmount) return json(['code' => 1, 'msg' => '含税销售额不能为空']);
        if (!$taxRate) return json(['code' => 2, 'msg' => '税率不能为空']);
        $data = self::addValueTax($salesAmount, $taxRate);
        return json(['code' => 0, 'msg' => '', 'data' => $data]);
    }

    public function individualIncomeTax()
    {

    }
}
<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/11/28
 * Time: 11:21
 */

namespace app\index\controller;


class Financial
{
    public function index()
    {
        return view('/financial_manage');
    }

    public function financialTaxRate()
    {
        return view('/financial_tax_manage');
    }

    public function financialCalculate()
    {
        return view('/financial_tax_calculate');
    }
}
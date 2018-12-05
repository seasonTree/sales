<?php

namespace app\index\controller;

use app\index\model\Formulas;
use think\facade\Request;

class Commission
{
    protected $formulasModel;

    public function __construct(Formulas $formulas)
    {
        $this->formulasModel = $formulas;
    }

    public function index()
    {
        //佣金
        return view('/commission_setting');
    }

    public function addCommission()
    {
        $data = [
            ['id' => 1, 'product_id' => 1, 'type_id' => 1, 'method' => '$', 'create_time' => '', 'end_time' => '',
                [
                    'step1' => 1, 'step2' => 10, 'amt' => 1,
                ],
                [
                    'step' => 10, 'step2' => 20, 'amt' => 2,
                ],
                [
                    'step' => 20, 'step2' => 30, 'amt' => 3,
                ]
            ],
            ['id' => 2, 'product_id' => 2, 'type_id' => 2, 'method' => '%', 'step1' => 1, 'step2' => 10, 'amt' => 1, 'create_time' => '', 'end_time' => ''],
            ['id' => 3, 'product_id' => 3, 'type_id' => 3, 'method' => '￥', 'step1' => 1, 'step2' => 10, 'amt' => 1, 'create_time' => '', 'end_time' => ''],
        ];

    }

    /***
     * 添加佣金计算方法
     * @return \think\response\Json
     */
    public function addFormulas()
    {
        if (Request::param('data.name')) return json(['code' => 1, 'msg' => '佣金类型不能为空']);
        if (Request::param('data.method')) return json(['code' => 1, 'msg' => '佣金计算公式不能为空']);
        if (!$this->formulasModel->addFormulas(Request::param('data'))) {
            return json(['code' => 0, 'msg' => '添加失败']);
        }
        return json(['code' => 0, 'msg' => '添加成功']);
    }

    /***
     * 获取佣金计算方法列表
     * @return \think\response\Json
     */
    public function formulasList()
    {
        if (!$data = $this->formulasModel->getFormulas()) {
            return json(['code' => 1, 'msg' => '查找失败或暂无数据']);
        }
        return json(['data' => $data, 'code' => 0, 'msg' => '返回所有列表']);
    }

    /***
     * 修改佣金计算方法
     * @return \think\response\Json
     */
    public function updateFormulas()
    {
        $id = Request::param('data.id');
        $data = Request::param('data');
        if (!$this->formulasModel->updateFormulas($id, $data)) {
            return json(['code' => 0, 'msg' => '更新失败']);
        }
        return json(['code' => 1, 'msg' => '更新成功']);
    }
}

<?php
namespace app\index\controller;


use app\index\model\EcommerceApi;
use app\index\model\RegisterApi;
use app\index\model\TranApi;
use think\Controller;
use think\Exception;

class Transaction extends Controller
{
    public function index()
    {
//        $referralCode = session('userid');
//        $list = model('RegisterApi')->getTranReport($referralCode);
//        $this->assign('list', $list);
        return view('/transaction_report');
    }
    //提供交易记录据
    public function lst(){
        $referralCode = session('userid');
        $dd = input('post.data');

        $referralCode = 1;
        $list = model('RegisterApi')->getTranReport($referralCode,'','',$dd['pageSize'], $dd['pageIndex']);
        // halt($list);
        // $page =$list->render();
        return json(['data'=>$list,'code'=>0,'msg'=>'提供交易记录据']);

    }
    public function getMonthData()
    {
        $month = input('post.data');
        list($month, $year) = preg_split('/\s/', $month);
        $startDate = $year . '-' . $month . '-00';
        $endDate = $year . '-' . $month . '-32';
        $referralCode = session('userid');
        $data = model('RegisterApi')->getTranReport($referralCode, $startDate, $endDate);
        return json($data);
    }
    public function getUsageApi()
    {
        $api = new Api();
        $startDate = date('Y-m-d', strtotime('-1 day'));
        $endDate = date('Y-m-d');
        $json = $api->getUsageHistory($startDate, $endDate);
        $result = json_decode($json, true);
        if (!isset($result['error']) || $result['error'] != 0) {
            $content = $result;
            $this->log('getUsageApi', $content);
            return false;
        };

        foreach ($result['data'] as $k => $v) {
            if ($a = preg_match('/^\d+$/', $v['referralCode'])) {
                $saleData[$k]['referral_id'] = $v['referralCode'];
                foreach ($v['registrations'] as $kkk => $vvv) {
                    $saleData[$k]['registrations'][] = $vvv;
                }
                foreach ($v['features'] as $kk => $vv) {
                    $saleData[$k]['docData'][] = $vv;
                }
            } else {

                $docData[$k]['referral_id'] = $v['referralCode'];
                foreach ($v['registrations'] as $kkk => $vvv) {
                    $docData[$k]['registrations'][] = $vvv;
                }
                foreach ($v['features'] as $kk => $vv) {
                    $docData[$k]['docData'][] = $vv;
                }
            }
        }

        $tranApi = new TranApi();
        $registerApi = new RegisterApi();
        if (isset($saleData)) {
            foreach ($saleData as $key => $val) {
                foreach ($val['registrations'] as $kk => $vv) {
                    $regarr[] = [
                        'referralCode' => $val['referral_id'],
                        'userId' => $vv['userId'],
                        'registereDate' => $vv['registeredDate'],
                        'status' => 1,
                    ];
                }
                foreach ($val['docData'] as $k => $v) {
                    $tranarr[] = [
                        'referralCode' => $val['referral_id'],
                        'userId' => $v['userId'],
                        'identifier' => $v['identifier'],
                        'purchaseDate' => $v['purchaseDate'],
                        'startDate' => $v['startDate'],
                        'status' => 1,
                    ];
                }
            }
        }

        if (isset($docData)) {
            foreach ($docData as $key => $val) {
                foreach ($val['registrations'] as $kk => $vv) {
                    $docregarr[] = [
                        'referralCode' => $val['referral_id'],
                        'userId' => $vv['userId'],
                        'registereDate' => $vv['registeredDate'],
                        'status' => -1,
                    ];
                }
                foreach ($val['docData'] as $k => $v) {
                    $doctranarr[] = [
                        'referralCode' => $val['referral_id'],
                        'userId' => $v['userId'],
                        'identifier' => $v['identifier'],
                        'purchaseDate' => $v['purchaseDate'],
                        'startDate' => $v['startDate'],
                        'status' => -1,
                    ];
                }
            }
        }

        try {
            $tranApi->insertAll($tranarr);
            $registerApi->insertAll($regarr);
            $registerApi->insertAll($docregarr);
            $tranApi->insertAll($doctranarr);
        } catch (\Exception $e) {
            $content = $e->getLine() . '---' . $e->getMessage();
            $this->log('getUsageApi', $content);
        }

    }
    public function getEcommerceApi()
    {
        $api = new Api();
        $EcommerceApi = new EcommerceApi();
        $startDate = date('Y-m-d', strtotime('-1 day'));
        $endDate = date('Y-m-d');
        $json = $api->getECommerce('', $startDate, $endDate);

        $result = json_decode($json, true);

        if ($result['status'] === 0) {
            try {
                $EcommerceApi->add($result['message']);
            } catch (\Exception $e) {
                $content = $e->getLine() . '---' . $e->getMessage();
                $this->log('ecommerceApi', $content);
            }
        } else {
            $content = $json . '---' . $startDate . '-->' . $endDate;
            $this->log('ecommerceApi', $content);
        }

    }
    public function log($type, $content)
    {

        $filename = APP_PATH . 'errorlog';
        if (!is_dir($filename)) {
            mkdir($filename, 0777, true);
        }
        $filename = $filename . DS . $type . '.txt';
        if (!file_exists($filename)) {
            @fopen($filename, 'w');
        }
        if (!is_writable($filename)) {
            chmod($filename, 0777);
        }
        $Ts = @fopen($filename, "a+");
        @fputs($Ts, "执行日期：" . "\r\n" . date('Y-m-d H:i:s', time()) . ' ' . "\n" . $content . "\n");
        fclose($Ts);
    }

}

<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/8/9
 * Time: 19:02
 */



use Aliyun\DySDKLite\SignatureHelper;
use \think\Config;

class ShortMessage
{
    /**
     * 发送短信
     */
    public function sendSms($phone, $code)
    {
        require_once (ROOT_PATH  . 'extend/aliyun/SignatureHelper.php');
        $params = array();
        // *** 需用户填写部分 ***
        // fixme 必填: 请参阅 https://ak-console.aliyun.com/ 取得您的AK信息
        $accessKeyId = Config::get('sendMessage.accessKeyId');
        $accessKeySecret = Config::get('sendMessage.accessKeySecret');
        // fixme 必填: 短信接收号码
        $params["PhoneNumbers"] = $phone;
        // fixme 必填: 短信签名，应严格按"签名名称"填写，请参考: https://dysms.console.aliyun.com/dysms.htm#/develop/sign
        $params["SignName"] = Config::get('sendMessage.signName');
        // fixme 必填: 短信模板Code，应严格按"模板CODE"填写, 请参考: https://dysms.console.aliyun.com/dysms.htm#/develop/template
        $params["TemplateCode"] = Config::get('sendMessage.templateCode');
        // fixme 可选: 设置模板参数, 假如模板中存在变量需要替换则为必填项
        $params['TemplateParam'] = Array(
            "code" => $code,
            // "product" => "阿里通信"
        );
        // fixme 可选: 设置发送短信流水号
        $params['OutId'] = "12345";
        // fixme 可选: 上行短信扩展码, 扩展码字段控制在7位或以下，无特殊需求用户请忽略此字段
        //$params['SmsUpExtendCode'] = "1234567";

        // *** 需用户填写部分结束, 以下代码若无必要无需更改 ***
        if (!empty($params["TemplateParam"]) && is_array($params["TemplateParam"])) {
            $params["TemplateParam"] = json_encode($params["TemplateParam"], JSON_UNESCAPED_UNICODE);
        }
        // 初始化SignatureHelper实例用于设置参数，签名以及发送请求
        $helper = new SignatureHelper();
        // 此处可能会抛出异常，注意catch
        $content = $helper->request(
            $accessKeyId,
            $accessKeySecret,
            "dysmsapi.aliyuncs.com",
            array_merge($params, array(
                "RegionId" => "cn-hangzhou",
                "Action" => "SendSms",
                "Version" => "2017-05-25",
            ))
        // fixme 选填: 启用https
        // ,true
        );
        return $content;
    }
//ini_set("display_errors", "on"); // 显示错误提示，仅用于测试时排查问题
// error_reporting(E_ALL); // 显示所有错误提示，仅用于测试时排查问题
//set_time_limit(0); // 防止脚本超时，仅用于测试使用，生产环境请按实际情况设置
//header("Content-Type: text/plain; charset=utf-8"); // 输出为utf-8的文本格式，仅用于测试
// 验证发送短信(SendSms)接口
//print_r(sendSms($phone='',$code='123456'));
}
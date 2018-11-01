<?php

// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006-2016 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: 流年 <liu21st@gmail.com>
// +----------------------------------------------------------------------

// 应用公共文件

function getShortUrl($url){
      //生成短连接
      $url = str_replace('&', '%26', $url);
      //字符串替换&为%26
      $short_url = "http://soc.kooa.vip/api/v2/action/shorten?key=d2ffa91d967c1424c992c2176df88c&url=".$url.'&is_secret=true';
      $short_url = file_get_contents($short_url);
      return $short_url;

}

// function checkPassword($password){
// 	//检查密码
// 	$rule = "/^[a-zA-Z0-9_\.]+$/";

// 	if (!preg_match($rule, $password)) {
// 		return false;
// 	}
// 	return true;
// }

function checkPhone($phone){
	//检查电话号码
	$rule = "/^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0-9])|(17[0-9])|(19[0-9])|16[6])\d{8}$/";

	if (!preg_match($rule, $phone)) {
		return false;
	}
	return true;
}

function checkUser($username){
  //检查用户名
  $rule = "/^[a-zA-Z]([_a-zA-Z0-9]{6,12})+$/";

  if (!preg_match($rule, $username)) {
    return false;
  }
  return true;
}

function checkPassword($password){
  //检查密码

  if (strlen($password) < 6 ) {
    return false;
  }
  return true;
}

function getClientIp()
{
    if (getenv("HTTP_CLIENT_IP") && strcasecmp(getenv("HTTP_CLIENT_IP"), "unknown"))
        $ip = getenv("HTTP_CLIENT_IP");
    else if (getenv("HTTP_X_FORWARDED_FOR") && strcasecmp(getenv("HTTP_X_FORWARDED_FOR"), "unknown"))
        $ip = getenv("HTTP_X_FORWARDED_FOR");
    else if (getenv("REMOTE_ADDR") && strcasecmp(getenv("REMOTE_ADDR"), "unknown"))
        $ip = getenv("REMOTE_ADDR");
    else if (isset($_SERVER['REMOTE_ADDR']) && $_SERVER['REMOTE_ADDR'] && strcasecmp($_SERVER['REMOTE_ADDR'], "unknown"))
        $ip = $_SERVER['REMOTE_ADDR'];
    else
        $ip = "unknown";
    return($ip);
}

function delDir($path){
  //清空文件夹函数和清空文件夹后删除空文件夹函数的处理
   //如果是目录则继续
   if(is_dir($path)){
    //扫描一个文件夹内的所有文件夹和文件并返回数组
   $p = scandir($path);
   foreach($p as $val){
    //排除目录中的.和..
    if($val !="." && $val !=".."){
     //如果是目录则递归子目录，继续操作
     if(is_dir($path.$val)){
      //子目录中操作删除文件夹和文件
      deldir($path.$val.'/');
      //目录清空后删除空文件夹
      @rmdir($path.$val.'/');
     }else{
      //如果是文件直接删除
      unlink($path.$val);
     }
    }
   }
  }
}

function createDir($file_name){
      //创建文件夹目录
      $path = dirname(Env::get('ROOT_PATH')).'/client/dist/upload/image/'.$file_name.'/'.date('Ymd',time());
      if (!is_dir($path)) {
            mkdir($path,0777,true);
        }
        return $path;
}

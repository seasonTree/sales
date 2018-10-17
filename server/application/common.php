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

function checkUserName($username){
	//检查用户名
	$rule = "/^[a-zA-Z0-9]+$/";

	if (!preg_match($rule, $username)) {
		return false;
	}
	return true;
}

function checkPhone($phone){
	//检查电话号码
	$rule = "/^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0-9])|(17[0-9])|(19[0-9])|16[6])\d{8}$/";

	if (!preg_match($rule, $phone)) {
		return false;
	}
	return true;
}
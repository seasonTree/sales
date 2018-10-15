<?php

namespace app\admin\model;

use think\Model;

class Url extends Model
{
    // 设置当前模型对应的完整数据表名称
    protected $table = 'sales_url';
    // 主键
    protected $pk = 'id';


    public function getUrl($channel){
    	//获取邀请url
    	foreach ($channel as $k => $v) {
    		$temp = Url::alias('a')
		    		->join('sales_role b','a.role_id = b.id','left')
		    		->field('a.id,a.url_code,b.role_name,a.role_id')
		    		->where('channel_id',$v['id'])
		    		->select()
		    		->toArray();
		    $channel[$k]['url_code'] = $temp;
    	}
    	return $channel;
    }
}

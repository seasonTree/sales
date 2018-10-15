<?php

namespace app\index\model;

use think\Model;

class Channel extends Model
{
    // 设置当前模型对应的完整数据表名称
    protected $table = 'sales_channel';
    // 主键
    protected $pk = 'id';


    public function getChannel($uid = 0){
        //获取渠道
        $channel = Channel::alias('a')
                            ->join('sales_url b','a.id = b.channel_id','left')
                            ->field('a.*,b.channel_id,b.url_code')
                            ->where('user_id',$uid)
                            ->select();

        if ($channel[0]['p_id'] == 0) {
            //顶级渠道
            foreach ($channel as $k => $v) {
                $channel[$k]['children'] = Channel::alias('a')
                                                   ->join('sales_url b','a.id = b.channel_id','left')
                                                   ->join('sales_user c','c.id = a.user_id','left')
                                                   ->field('c.username,a.*,b.url_code')
                                                   ->where('p_id',$v['id'])
                                                   ->select();
            }
        }
        return $channel;
    }

    public function addChannel($data){
        //添加渠道
        $res = Channel::insert($data);
        return $res;
    }

    public function findChannel($data){
        //检查渠道
        $res = Channel::where($data)->find();
        return $res;
    }

    public function countChannel($uid){
        //检查渠道条数
        $res = Channel::where('user_id',$uid)->count();
        return $res;
    }
}

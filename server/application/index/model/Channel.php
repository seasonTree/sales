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
            $chan_pfm_obj = '';
            //业绩总量
            $chan_doc_num = '';
            //医生总量
            foreach ($channel as $k => $v) {

                $channel[$k]['children'] = Channel::alias('a')
                                                   ->join('sales_url b','a.id = b.channel_id','left')
                                                   ->join('sales_user c','c.id = a.user_id','left')
                                                   ->field('c.username,a.*,b.url_code')
                                                   ->where('p_id',$v['id'])
                                                   ->select()
                                                   ->toArray();

                    
                        if (isset($channel[$k]['children'])){

                            $channel[$k]['chan_pfm_obj'] = array_sum(array_column($channel[$k]['children'], 'chan_pfm_obj'));
                            //计算业绩总量

                            $channel[$k]['chan_doc_num'] = array_sum(array_column($channel[$k]['children'], 'chan_doc_num'));
                            //计算医生总量

                        }

            }
        }
        return $channel;
    }

    public function addChannel($data){
        //添加渠道
        $res = Channel::insertGetId($data);
        return $res;
    }

    public function findChannel($data){
        //检查渠道
        $res = Channel::where(['user_id'=>$data['user_id'],'channel_name'=>$data['channel_name']])->find();
        return $res;
    }

    public function countChannel($uid){
        //检查渠道条数
        $res = Channel::where('user_id',$uid)->count();
        return $res;
    }
}

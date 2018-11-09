<?php

namespace app\index\model;

use think\Model;

class Channel extends Model
{
    // 设置当前模型对应的完整数据表名称
    protected $table = 'sales_channel';
    // 主键
    protected $pk = 'id';


    public function getChannel($where){
        //获取渠道
        $channel = Channel::alias('a')
                            ->join('sales_url b','a.id = b.channel_id','left')
                            ->field('a.*,b.channel_id,b.url_code')
                            ->where($where)
                            ->select();
                            // dump(Channel::getlastsql());exit;

        foreach ($channel as $a => $b) {

            if ($b['p_id'] == 0) {
            //顶级渠道,叠加目标
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
                if ($v['type'] == 1) {
                    //判断为叠加目标
                    if (isset($channel[$k]['children'])){

                            $channel[$k]['chan_pfm_obj'] = array_sum(array_column($channel[$k]['children'], 'chan_pfm_obj'));
                            //计算业绩总量

                            $channel[$k]['chan_doc_num'] = array_sum(array_column($channel[$k]['children'], 'chan_doc_num'));
                            //计算医生总量
                        }
                }
                    
                        
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

    public function updateChannel($data){
        //更新渠道
        $res = Channel::update($data);
        return $res;
    }

    public function updateStatus($where,$data){
        //更新状态
        $res = Channel::where($where)->update($data);
        return $res;
    }

    public function findChannel($where){
        //检查渠道
        $res = Channel::where(['user_id'=>$where['user_id'],'channel_name'=>$where['channel_name']])->find();
        return $res;
    }

    public function countChannel($uid){
        //检查渠道条数
        $res = Channel::where('user_id',$uid)->count();
        return $res;
    }

    public function getChannelSales($channel_id){
        //获取这个渠道下的销售员id
        $res = Channel::where('p_id',$channel_id)
                        ->where('status',1)
                        ->field('user_id')
                        ->select()
                        ->toArray();
        return $res;
    }

    public function delAllChannel($where){
        //删除所有的渠道
        $res = Channel::where($where)->delete();
        return $res;
    }

    public function getChannelName($where){
        //获取渠道名字
        $res = Channel::where($where)->value('channel_name');
        return $res;
    }

    public function getChannelIds($where){
        //获取渠道ID集合
        $res = Channel::where($where)->field('id')->select()->toArray();
        return $res;
    }

    public function getNotInChannelIds($where,$channel_name){
        //获取不包括该渠道的id集合
        $res = Channel::where('channel_name',$channel_name)
                      ->where('user_id','not in',$where)
                      ->where('p_id','<>',0)
                      ->field('id')
                      ->select()
                      ->toArray();
        return $res;
    }

    public function delNotInChannel($where,$channel_name,$channel_ids){
        //删除没有被选中的渠道
        $res = Channel::where('channel_name',$channel_name)
                      ->where($where)
                      ->where($channel_ids)
                      ->delete();
        return $res;
    }

    public function getTeamChannel($where){
        //获取团队渠道
        $res = Channel::where($where)
                       ->field('id,channel_name,chan_pfm_obj,chan_doc_num')
                       ->select()
                       ->toArray();
        return $res;
    }


}

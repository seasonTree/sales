<?php
namespace app\index\model;

use think\Model;

class Privilege extends Model
{
    protected $pk='id';
    protected $table='sales_privilege';
    protected static function init()
    {
        Privilege::event('after_delete',function ($Privilege){
            $nums=$Privilege->getChildren($Privilege->id);
                Privilege::destroy($nums);
        });
    }

    public function add($data){
        if (!is_array($data)){
            return exception('传递数据不合法');
        }

        $this->allowField(true)->save($data);
        return $this->id;
    }
    public function edit($data){
        if (!is_array($data)){
            return exception('传递数据不合法');
        }
        $num =$this->setField($data);
        return $num;
    }
    public function getOne($id){
        return self::get($id)->toArray();
    }
    public function getTree(){

        $data =$this->select()->toArray();
        return $this->_reSort($data);
    }

    public function makeTree()
    {
        $data=$this->order('parent_id')->select()->toArray();
        return $this->rankSort($data);
    }

    /***
     * @param $srcData 需要进行处理的数组，处理前必须已经按照pid排序
     * @param string $id 数组的id字段名，你可以定义成你自己的id名称
     * @param string $pid 数组的pid字段名，关联上级的id，你可以改成自己的pid名
     * @param string $sub 保存下级数组的键名，你可以自己改
     * @return array 返回排序好后的数组
     */
    function rankSort(&$srcData,$id='id',$pid='parent_id',$sub='sub'){
        $data=[];
        $list=[];
        foreach($srcData as $key=>$value){
            if($value[$pid]==0){
                $data[$value[$id]]=$value;
                $list[$value[$id]]=&$data[$value[$id]];
            }else{
                $list[$value[$pid]][$sub][]=$value;
                $list[$value[$id]]=&$list[$value[$pid]][$sub][count($list[$value[$pid]][$sub])-1];
            }
        }
        return $data;
    }

    private function _reSort($data,$parent_id=0,$level=0,$isClear=TRUE)
    {
        static $ret =array();
        if ($isClear)
            $ret =array();
        foreach ($data as $k =>$v){
            if ($v['parent_id'] == $parent_id){
                $v['level']=$level;
                $ret[]=$v;
                $this->_reSort($data,$v['id'],$level+1,$isClear=FALSE);
            }
        }
        return $ret;
    }
    public function getChildren($id){
        $data=$this->select();
        return $this->_children($data,$id);
    }
    private function _children($data,$parent_id=0,$isClear=TRUE){
        static $ret =array();
        if ($isClear)
            $ret =array();
        foreach ($data as $k =>$v){
            if ($v['parent_id'] ==$parent_id){
                $ret[]=$v['id'];
                $this->_children($data,$v['id'],FALSE);
            }
        }
        return $ret;
    }
}
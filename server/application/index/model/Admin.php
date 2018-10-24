<?php

namespace app\index\model;

use think\Db;
use think\Model;

class Admin extends Model
{
    // 设置当前模型对应的完整数据表名称
    protected $table = 'sales_user';
    // 主键
    protected $pk = 'id';

    public function getAdmin($where='1=1'){
    	//获取管理员
    	$admin = Admin::alias('a')
    					 ->join('sales_admin_role s','a.id=s.user_id','left')
    					 ->join('sales_role r','s.role_id=r.id','left')
    					 ->field('a.id,a.user_name,a.status,s.*,r.role_name')
    					 ->where($where)
                         ->where('a.type',0)
    					 ->select()
    					 ->toArray();
    	// echo Admin::getlastsql();exit;
        $admins = array();
        //获取重复id
        foreach ($admin as $k => $v) {
            if (!array_key_exists($v['id'],$admins)) {
                //获取id存起来
               $admins[$v['id']] = $v;
            }
            else{
                //当出现重复id值的时候叠加角色
               $admins[$v['id']]['role_name'] = $admins[$v['id']]['role_name'].','.$v['role_name'];
            }
            
        }
        // dump($admins);
    	return $admins;
    }
    public function chkPri($id){
        $where=[
          'module_name'=>request()->module(),
          'controller_name'=>request()->controller(),
          'action_name'=>request()->action(),
        ];
        $data=$this->alias('A')->field('count(A.id) has')
            ->join('admin_role AR','A.id=AR.user_id','left')
            ->join('role_pri RP','AR.role_id=RP.role_id','left')
            ->join('privilege.js P','P.id=RP.pri_id','left')
            ->where('A.id='.$id)
            ->where($where)
            ->find()->toArray();
        return $data;
    }
    //获取_menu权限列表
    public function getBtns(){
        $id = session('uid');
        if ($id ==1){
            $priData =Db::name('privilege.js')->select();
        }else{
            $priData=$this->alias('A')->field('P.*')
                ->join('admin_role AR','A.id=AR.user_id','left')
                ->join('role_pri RP','AR.role_id=RP.role_id','left')
                ->join('privilege.js P','P.id=RP.pri_id','left')
                ->where('A.id='.$id)
                ->select()->toArray();
        }
        $ret =array();
        foreach($priData as $v){
            if ($v['parent_id'] ==0){
                foreach($priData as $v1){
                    if ($v1['parent_id']==$v['id']){
                        $v['children'][]=$v1;
                    }
                }
                $ret[]=$v;
            }
        }
        return $ret;
    }


}

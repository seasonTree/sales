<?php

namespace app\http\middleware;
class Check
{
    public function handle($request, \Closure $next)
    {
        if (!$this->isLogin()) {

            return redirect('/');
        }
        if(!$this->isHasCheckPri()){
            $request->error = '非法访问';
        }
        return $next($request);

    }
    public function isLogin(){
        $user =session('user','');
        if ($user && $user['userid']){
            return true;
        }
        return false;
    }
    public function isHasCheckPri(){
        $user =session('user');

        if ($user && $user['userid']){
            if($user['userid'] === 1){
                return true;
            }
          $res = model('User')->chkPri( $user['userid']);
            if($res['has']){
                return true;
            }else{
//                session('user',null);
                return false;
            }
        }
    }
}

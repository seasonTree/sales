<?php

namespace app\http\middleware;

class Check
{
    public function handle($request, \Closure $next)
    {
        if (!$this->isLogin()) {

            return redirect('login/index');
        }
        return $next($request);
    }
    public function isLogin(){
        $user =session('adminuser','','easy_love');
        if ($user && $user['id']){
            return true;
        }
        return false;
    }
}

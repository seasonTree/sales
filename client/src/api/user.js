import request from '../common/request';

//检查修改密码的短信校验码
export function sendSMS(data) {
    return request({
        url: '/user/sendMessage',
        method: 'post',
        data: data
    })
}

//检查修改密码的短信校验码
export function checkPasswordSMS(data) {
    return request({
        url: '/user/doCheckCode',
        method: 'post',
        data: data
    })
}

//修改密码
export function resetPassword(data) {
    return request({
        url: '/user/doResetPassword',
        method: 'post',
        data: data
    })
}
//获取所有角色
export function get(data) {
    return request({
        url: '/Auser/lst',
        method: 'get',
        data: data
    })
}
//获取所有角色
export function getmemberlst(data) {
    return request({
        url: '/user/getmemberlst',
        method: 'get',
        // data: data
        params: data
    })
}

//获取会员的角色
export function getMemberRole(data){
    return request({
        url: '/user/getMemberRole',
        method: 'get',
        data: data
    })
}

//超级管理员添加账号
export function add(data){
    return request({
        url: '/Auser/add',
        method: 'post',
        data: data
    })
}
//管理员添加代理商账号
export function addDls(data){
    return request({
        url: '/Auser/addDls',
        method: 'post',
        data: data
    })
}
//更改user状态
export function userStatus(data){
    return request({
        url: '/user/userStatus',
        method: 'post',
        data: data
    })
}


//获取当前用户的信息
export function getOneUser(data){
    return request({
        url: '/user/getOneUser',
        method: 'post',
        data:data
    })
}
//删除账号
export function del(data){
    return request({
        url: '/Auser/del',
        method: 'post',
        data: data
    })
}
//修改账号
export function edit(data){
    return request({
        url: '/Auser/edit',
        method: 'post',
        data: data
    })
}

//更新个人信息
export function insUserInfo(data){
    return request({
        url: '/user/insUserInfo',
        method: 'post',
        data: data
    })
}
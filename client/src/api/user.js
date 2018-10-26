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
        url: '/user/lst',
        method: 'post',
        data: data
    })
}
//管理员添加账号
export function add(data){
    return request({
        url: '/user/add',
        method: 'post',
        data: data
    })
}

//获取当前用户的信息
export function getOneUser(data){
    return request({
        url: '/user/getOneUser',
        method: 'get',
    })
}
//删除账号
export function del(data){
    return request({
        url: '/user/del',
        method: 'post',
        data: data
    })
}
//修改账号
export function edit(data){
    return request({
        url: '/user/edit',
        method: 'post',
        data: data
    })
}
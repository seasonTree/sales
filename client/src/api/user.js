import request from '../common/request';

//检查修改密码的短信校验码
export function sendPasswordSMS(data) {
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
        url: '/user/reset_password',
        method: 'post',
        data: data
    })
}
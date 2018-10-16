import request from '../common/request';

//登录
export function login(data) {
    return request({
        url: '/user/login',
        method: 'post',
        data: data
    })
}

//退出
export function logout(data) {
    return request({
        url: '/user/logout',
        method: 'post',
        data: data
    })
}

//检查修改密码的短信校验码
export function sendPasswordSMS(data) {
    return request({
        url: '/user/send_password_sms',
        method: 'post',
        data: data
    })
}

//检查修改密码的短信校验码
export function checkPasswordSMS(data) {
    return request({
        url: '/user/check_password_sms',
        method: 'post',
        data: data
    })
}
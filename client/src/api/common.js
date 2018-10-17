import request from '../common/request';

//登录
export function login(data) {
    return request({
        url: '/login/login',
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


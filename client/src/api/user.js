import request from '../common/request';

export function login(data) {
    return request({
        url: '/login',
        method: 'post',
        data: data
    })
}

export function logout(data) {
    return request({
        url: '/logout',
        method: 'post',
        data: data
    })
}
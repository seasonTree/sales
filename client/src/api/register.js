import request from '../common/request';

//团队列表
export function userRegister(data) {
    return request({
        url: '/register/userRegister',
        method: 'post',
        data: data
    })
}


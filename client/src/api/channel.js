import request from '../common/request';

export function get(data) {
    return request({
        url: '/channel/list',
        method: 'post',
        data: data
    })
}

export function add(data) {

    return request({
        url: '/channel/add',
        method: 'post',
        data: data
    })
}

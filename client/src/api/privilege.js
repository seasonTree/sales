import request from '../common/request';

export function get(data) {
    return request({
        url: '/privilege/list',
        method: 'post',
        data: data
    })
}

export function edit(data){
    return request({
        url: '/privilege/edit',
        method: 'post',
        data: data
    })
}

import request from '../common/request';

export function get(data) {
    return request({
        url: '/role/lst',
        method: 'post',
        data: data
    })
}

export function edit(data){
    return request({
        url: '/role/edit',
        method: 'post',
        data: data
    })
}
export function add(data){
    return request({
        url: '/role/add',
        method: 'post',
        data: data
    })
}
export function del(data){
    return request({
        url: '/role/del',
        method: 'post',
        data: data
    })
}

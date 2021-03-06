import request from '../common/request';

export function get(data) {
    return request({
        url: '/privilege/privilegeList',
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
export function add(data){
    return request({
        url: '/privilege/add',
        method: 'post',
        data: data
    })
}
export function del(data){
    return request({
        url: '/privilege/del',
        method: 'post',
        data: data
    })
}

export function getSelect(data){
    return request({
        url: '/privilege/getSelect',
        method: 'post',
        data: data
    })
}


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

export function getSales(data) {

    return request({
        url: '/channel/getSales',
        method: 'post',
        data: data
    })
}

export function addSales(data) {

    return request({
        url: '/channel/addSales',
        method: 'post',
        data: data
    })
}

export function changeStatus(data){
    return request({
        url: '/channel/changeStatus',
        method: 'post',
        data: data
    })
}

export function getChannel(data){
    return request({
        url: '/channel/getChannel',
        method: 'post',
        data: data
    })
}

export function updateChannel(data){
    return request({
        url: '/channel/updateChannel',
        method: 'post',
        data: data
    })
}
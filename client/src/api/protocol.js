import request from '../common/request';

//新增
export function add(data) {
    return request({
        url: '/protocol/add',
        method: 'post',
        data: data
    });
}

//修改
export function edit(data){
    return request({
        url: '/protocol/edit',
        method: 'post',
        data: data
    });
}

//删除
export function del(data){
    return request({
        url: '/protocol/del',
        method: 'post',
        data: data
    });
}

//获取内容
export function getContent(data){
    return request({
        url: '/protocol/getContent',
        method: 'get',
        data: data
    });
}

//获取列表
export function get(data){
    return request({
        url: '/protocol/list',
        method: 'get',
        data: data
    });
}
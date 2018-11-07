import request from '../common/request';

//新增
export function add(data) {
    return request({
        url: '/Config/addProtocol',
        method: 'post',
        data: data
    });
}

//修改
export function edit(data){
    return request({
        url: '/Config/editProtocol',
        method: 'post',
        data: data
    });
}

//删除
export function del(data){
    return request({
        url: '/Config/delProtocol',
        method: 'post',
        data: data
    });
}

//获取内容
export function getContent(data){
    return request({
        url: '/Config/getProtocol',
        method: 'post',
        data: data
    });
}

//获取列表
export function get(data){
    return request({
        url: '/Config/protocolLst',
        method: 'get',
        data: data
    });
}
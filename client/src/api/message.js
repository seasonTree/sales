import request from '../common/request';

//信息列表
export function lst(data) {
    return request({
        url: '/message/lst',
        method: 'post',
        data: data
    })
}

//获取信息模板列表
export function get(data) {
    return request({
        url: '/message/get',
        method: 'post',
        data: data
    })
}

//添加信息模板
export function add(data) {
    return request({
        url: '/message/add',
        method: 'post',
        data: data
    })
}

//修改信息模板
export function edit(data) {
    return request({
        url: '/message/edit',
        method: 'post',
        data: data
    })
}

//删除信息模板
export function del(data){
    return request({
        url: '/message/del',
        method: 'post',
        data: data
    })
}

//设置模板启用
export function setUse(data){
    return request({
        url: '/message/setUse',
        method: 'post',
        data: data
    })
}

//获取未读信息数量
export function getMessageCount() {
    return request({
        url: '/message/getMessageCount',
        method: 'get',
        data: null
    })
}
//标记已读
export function isRead(data) {
    return request({
        url: '/message/isRead',
        method: 'post',
        data: data
    })
}

//删除消息
export function delMessage(data) {
    return request({
        url: '/message/delMessage',
        method: 'post',
        data: data
    });
}
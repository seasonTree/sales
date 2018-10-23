import request from '../common/request';

//团队列表
export function lst(data) {
    return request({
        url: '/message/lst',
        method: 'post',
        data: data
    })
}

//获取未读信息数量
export function getMessageCount(){
    return request({
        url: '/message/getMessageCount',
        method: 'get',
        data: null
    })
}
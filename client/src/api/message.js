import request from '../common/request';

//团队列表
export function lst(data) {
    return request({
        url: '/message/lst',
        method: 'post',
        data: data
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


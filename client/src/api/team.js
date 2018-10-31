import request from '../common/request';

//团队列表
export function lst(data) {
    return request({
        url: '/team/lst',
        method: 'post',
        data: data
    })
}

//团队列表
export function showQrCode(data) {
    return request({
        url: '/team/showInvitation',
        method: 'get',
        data: data
    })
}

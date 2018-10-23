import request from '../common/request';

//团队列表
export function lst(data) {
    return request({
        url: '/message/lst',
        method: 'post',
        data: data
    })
}


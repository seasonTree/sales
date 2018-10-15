import request from '../common/request';

export function get(data) {
    return request({
        url: '/channel/list',
        method: 'post',
        data: data
    })
}

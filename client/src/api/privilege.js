import request from '../common/request';

export function get(data) {
    return request({
        url: '/privilege/list',
        method: 'post',
        data: data
    })
}

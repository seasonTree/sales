import request from '../common/request';

export function getRegLst(data) {
    return request({
        url: '/audit/regLst',
        method: 'get',
    })
}

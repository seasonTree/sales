import request from '../common/request';

export function getRegLst(data) {
    return request({
        url: '/audit/regLst',
        method: 'get',
    })
}

//提交审核
export function auditCommit(data) {
    return request({
        url: '/audit/auditCommit',
        method: 'post',
        data:data
    })
}
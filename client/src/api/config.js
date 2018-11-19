import request from '../common/request';

//获取下拉消息类型
export function addSel(data) {
    return request({
        url: '/config/addConfig',
        method: 'get',
    })
}


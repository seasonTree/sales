import request from '../common/request';


//获取所有角色
export function get(data) {
    return request({
        url: '/transaction/lst',
        method: 'post',
        data: data
    })
}
//获取所有角色
export function exportExcel(data) {
    return request({
        url: '/transaction/exportExcel',
        method: 'post',
        data: data
    })
}
//管理员添加账号
export function add(data){
    return request({
        url: '/user/add',
        method: 'post',
        data: data
    })
}

//获取当前用户的信息
export function getOneUser(data){
    return request({
        url: '/user/getOneUser',
        method: 'get',
    })
}
//删除账号
export function del(data){
    return request({
        url: '/user/del',
        method: 'post',
        data: data
    })
}
//修改账号
export function edit(data){
    return request({
        url: '/user/edit',
        method: 'post',
        data: data
    })
}
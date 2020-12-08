import request from '@/utils/request'

/* 
 * 按钮管理模块
 */

// 新增
export const insertModel = (data) => {
    return request({
        url: '/dict/insertModel',
        method: 'post',
        data
    })
}

// 编辑
export const updateModel = (data) => {
    return request({
        url: '/dict/updateModel',
        method: 'post',
        data
    })
}


// 批量删除
export const deleteList = (data) => {
    return request({
        url: '/dict/deleteList',
        method: 'post',
        data
    })
}

// 删除
export const deleteModel = (data) => {
    return request({
        url: '/dict/deleteModel',
        method: 'get',
        data
    })
}


// 查询Model
export const queryModel = (params) => {
    return request({
        url: '/dict/queryModel',
        method: 'get',
        params
    })
}

// 查询Page
export const queryPage = () => {
    return request({
        url: '/dict/queryPage',
        method: 'get'
    })
}

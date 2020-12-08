import request from '@/utils/request'

/* 
 * 按钮管理模块
 */

// 新增
export const insertModel = (data) => {
    return request({
        url: '/button/insertModel',
        method: 'post',
        data
    })
}

// 编辑
export const updateModel = (data) => {
    return request({
        url: '/button/updateModel',
        method: 'post',
        data
    })
}


// 批量删除
export const deleteList = (data) => {
    return request({
        url: '/button/deleteList',
        method: 'post',
        data
    })
}

// 删除
export const deleteModel = (data) => {
    return request({
        url: '/button/deleteModel',
        method: 'get',
        data
    })
}


// 查询Model
export const queryModel = (params) => {
    return request({
        url: '/button/queryModel',
        method: 'get',
        params
    })
}

// 查询Page
export const queryPage = () => {
    return request({
        url: '/button/queryPage',
        method: 'get'
    })
}

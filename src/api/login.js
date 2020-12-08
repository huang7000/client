import request from '@/utils/request'
/* 
 * 系统登录模块
 */
// 登录
export const login = data => {
    return request({
        url: '/api/login',
        method: 'post',
        data
    })
}
// 登出
export const logout = () => {
    return request({
        url: 'logout',
        method: 'get'
    })
}

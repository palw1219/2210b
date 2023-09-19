import http from "./http"

// 规定请求的数据类型
interface IUser {
    username: string;
    password: string;
}
// 登录
export const loginApi = (params: IUser) => http.post("login", params)
interface men {

}
export const menusApi = (params: men) => http.get('menus', params)
// 用户数据
interface user {
    query: any
    pagenum: number
    pagesize: number
}
export const usersApi = (params: user) => http.get('users', { params })
// 添加用户
interface tj {
    username: string
    password: string
    email: string
    mobile: string
}
export const tjApi = (params: tj) => http.post('users', params)
// 删除
interface bj {
    id: any
}
export const delApi = (id: bj) => http.delete(`users/${id}`)
// 编辑
interface bjj {
    id: any
    email: string
    mobile: string
}
export const bjApi = (params: bjj) => http.put(`users/${params.id}`, params)
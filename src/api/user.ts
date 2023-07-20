import request from '../utils/request'

// 获取userinfo
export const register = (username: string, password: string, confirmPassword: string) => {
  return request.post('/front/user/register', {
    username,
    password,
    confirmPassword
  })
}

// 获取userinfo
export const getUserInfo = () => {
  return request.get('/front/user')
}
// 登录
export const login = (username: string, password: string) => {
  return request.post('/front/user/login', {
    username,
    password
  })
}
// 登出
export const logout = () => {
  return request.post('/admin/logout')
}

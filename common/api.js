
const http = uni.$u.http

// 获取验证码
export const smsCodeApi = (params, config = {}) => http.post('/login/smsCode', params, config)
// 注册账号
export const registerApi = (params, config = {}) => http.post('/login/register', params, config)
// 密码登录
export const pwdLoginApi = (params, config = {}) => http.post('/login/pwdLogin', params, config)
// 验证码登录
export const codeLoginApi = (params, config = {}) => http.post('/login/codeLogin', params, config)
// 微信登录
export const wxLoginApi = (params, config = {}) => http.post('/login/wxLogin', params, config)
// 获取账本信息
export const getBookApi = (params, config = {}) => http.post('/record/getBook', params, config)

// 增加记录
export const addApi = (params, config = {}) => http.post('/record/add', params, config)
// 查询该月份下的所有记录
export const selectApi = (params, config = {}) => http.post('/record/select', params, config)
// 查询记录详情
export const selectDetailApi = (params, config = {}) => http.post('/record/selectDetail', params, config)
// 删除记录
export const delApi = (params, config = {}) => http.post('/record/del', params, config)
// 修改记录
export const updateApi = (params, config = {}) => http.post('/record/update', params, config)

// 获取用户数据
export const getUserApi = (params, config = {}) => http.post('/user/getUser', params, config)
// 修改昵称，简介，预算
export const updateUserApi = (params, config = {}) => http.post('/user/updateUser', params, config)


// get请求，获取菜单，注意：get请求的配置等，都在第二个参数中，详见前面解释
// export const getMenu = (data) => http.get('/ebapi/public_api/index', data)

import axios from 'axios';

const instance = axios.create({
    baseURL: '/index/api/', // api的base_url
    timeout: 6000 // 请求超时时间
})
// request拦截器
instance.interceptors.request.use(
    config => {
        // config.params = config.params || {}
        // config.headers = config.headers || {}
        //set 默认值
        return config
    },
    error => ({
        status: 0,
        msg: error.message
    })
)
// respone拦截器
instance.interceptors.response.use(
    response => {
        const resp = response.data
        if (response.status === 200) {
            return resp
        }
        return resp
    },
    error => {
        console.log('err' + error) // for debug
        return Promise.reject(error)
    }
)
export default instance;
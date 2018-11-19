import axios from 'axios';
// import {getToken} from './util';

const instance = axios.create({
    baseURL: '', // api的base_url
    timeout: 6000 // 请求超时时间

})

let token = document.head.querySelector('meta[name="token"]')
if (token) {
    instance.defaults.headers.common['__token__'] = token.content;
    console.log(token)
}
// request拦截器
instance.interceptors.request.use(
    config => {
        // config.params = config.params || {}
        // config.headers = config.headers || {}
        //set 默认值
        // config.headers.token = getToken(); 
        return config
    },
    error => ({
        code: 404,
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
        return Promise.reject(error);
    }
)



export default instance;
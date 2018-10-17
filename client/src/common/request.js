import axios from 'axios';

const instance = axios.create({
    baseURL: '', // api的base_url
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

// export default function request(opt) {
//     // 调用 axios api，统一拦截
//     return instance(opt)
//         .then((response) => {
//             console.log('******************');
//             console.log(response);
//         })
//         .catch((error) => {
//             console.log('EEEEEEEEEEEEEE');
//             console.log(error);
//         });
// }
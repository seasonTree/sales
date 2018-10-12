import * as user from '../api/user'

const apis = {
    user
}

const install = function (Vue) {
    if (install.installed) return
    install.installed = true
    Object.defineProperties(Vue.prototype, {
        $api: {
            get() {
                return apis
            }
        }
    })
};

export default {
    install
}
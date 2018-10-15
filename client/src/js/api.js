import * as user from '../api/user'
import * as privilege from '../api/privilege';

const apis = {
    user, //user: user
    privilege
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
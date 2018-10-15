import * as user from '../api/user'
import * as privilege from '../api/privilege';
import * as channel from '../api/channel';

const apis = {
    user, //user: user
    privilege,
    channel
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
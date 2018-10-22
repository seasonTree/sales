import * as common from '../api/common'
import * as user from '../api/user'
import * as privilege from '../api/privilege';
import * as channel from '../api/channel';
import * as role from '../api/role';
import * as team from '../api/team';

const apis = {
    common,
    user, //user: user
    privilege,
    channel,
    role,
    team
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
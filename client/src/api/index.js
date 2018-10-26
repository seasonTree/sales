import * as common from './common'
import * as user from './user'
import * as privilege from './privilege';
import * as channel from './channel';
import * as role from './role';
import * as team from './team';
import * as message from './message';
import * as config from './config';
import * as transaction from './transaction';

const apis = {
    common,
    user, //user: user
    privilege,
    channel,
    role,
    transaction,
    message,
    team,
    config

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
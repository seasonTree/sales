import toast from './toast';
import confirm from './confirm';

const comp = {
    toast,
    confirm
}

const install = function (Vue) {
    if (install.installed) return
    install.installed = true
    Object.defineProperties(Vue.prototype, {
        $comp: {
            get() {
                return comp;
            }
        }
    })
};

export default install
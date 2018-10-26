import toast from './toast';

const comp = {
    toast
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

export default {
    install
}
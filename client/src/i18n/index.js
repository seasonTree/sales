const i18n = {
    'zh-cn': require('./zh-cn'),
    'zh-hk': require('./zh-hk'),
    'en-us': require('./en-us'),
}

let locale = 'zh-cn';

const install = function (Vue) {
    if (install.installed) return
    install.installed = true
    Object.defineProperties(Vue.prototype, {
        $i18n: {
            setLocal(local) {
                if (i18n[local]) {
                    locale = local;
                } else {
                    locale = 'zh-cn';;
                }
            },

            get() { //这里不用import，因为import是promise
                let data = i18n[locale];

                return data.default;
            }
        }
    })
};

export default {
    install
}
import {
    getCookie
} from '../common/util';

const base = {
    data() {
        return {
            global: {
                language: 'zh_cn',
                currentView: '',
                subSelect: {}
            }
        }
    },

    mounted() {
        this._checkLanguage();
        this._checkLocation();
    },

    methods: {
        _checkLanguage() {
            this.global.language = getCookie('_language') || 'zh-cn';
        },

        _checkLocation() {
            let that = this,
                pathname = window.location.pathname.replace(/(\.html)$/, ''),
                href = window.location.href.replace(/(\.html|\/index.html|\/index)$/, '');

            that.global.currentView = href.split('/').pop().toLocaleLowerCase();

            if (window._menu) {
                let menu = window._menu;

                for (var pkey in menu) {
                    var pitem = menu[pkey];

                    for (var ckey in pitem) {
                        var citem = pitem[ckey];

                        //找出
                        if (citem == pathname) {
                            that.global.subSelect[pkey] = pkey;
                            that.global.subSelect[ckey] = ckey;
                        }
                    }
                }
            }
        }
    }
};

const mixin = {
    extends: base,

    data() {
        return {
            global: {

                messageCount: 0,
                messageTimeout: null,

                changePassword: {
                    valid: false,
                    show: false,
                    passOldVis: false,
                    passVis: false,
                    passVis1: false,
                    password: '',
                    oldPassword: '',
                    rePassword: '',
                    submitLoading: false
                },

                viewSelect: {
                    system: false,
                    user: false,
                    commision: false,
                    setting: false,
                    audit: false
                },
            }
        };
    },

    mounted() {
        this._checkMessage();
    },

    watch: {
        'global.changePassword.show': {
            handler(newValue, oldValue) {
                //重置内容
                if (newValue == false) {
                    this.$refs.globalPassRef.reset();
                    this.global.changePassword.passVis = false;
                    this.global.changePassword.passVis1 = false;
                    this.global.changePassword.submitLoading = false;
                }
            },
        },

        'global.currentView': {
            handler(newValue, oldValue) {
                this.global.viewSelect.user = (newValue == 'privilege' ||
                    newValue == 'role' ||
                    newValue == 'user');

                this.global.viewSelect.commision = (newValue == 'commision_manage');

                this.global.viewSelect.setting = (newValue == 'notifysetting' ||
                    newValue == 'protocolsetting');

                this.global.viewSelect.audit = (newValue == 'regaudit');

                this.global.viewSelect.system = this.global.viewSelect.user || this.global.viewSelect.commision ||
                    this.global.viewSelect.setting || this.global.viewSelect.audit
            },
        }
    },

    methods: {

        // _setMenuSelect(){
        //     let that = this,
        //         mstring = window.sessionStorage.getItem('menu'),
        //         arr = [];

        //     if(mstring){
        //         arr = mstring.split(',')
        //     }

        //     that.subSelect = arr;
        // },  

        //检查是否有新的消息
        _checkMessage() {
            var that = this;

            clearTimeout(that.global.messageTimeout);

            that.$api.message
                .getMessageCount()
                .then(res => {
                    if (res.code == 0) {
                        that.global.messageCount = res.data.count;
                    }
                    that.messageTimeout = setTimeout(() => {
                        that._checkMessage();
                    }, 1000 * 60);
                })
                .catch(res => {
                    that.global.messageCount = 0;

                    that.messageTimeout = setTimeout(() => {
                        that._checkMessage();
                    }, 1000 * 60);
                });
        },

        globalCommitPassword() {

            var that = this;

            that.global.changePassword.submitLoading = true;

            if (that.$refs.globalPassRef.validate()) {
                that.$api.user.resetPassword({
                    data: that.global.changePassword
                }).then((res) => {

                    if (res.code == 0) {
                        this.$comp.toast({
                            text: res.msg,
                        });

                        // that.globalShowMessage(true, res.msg, 'success');

                        // setTimeout(() => {
                        that.global.changePassword.show = false;
                        // }, 3000);
                    } else {
                        this.$comp.toast({
                            text: res.msg,
                            color: 'error'
                        });

                        // that.globalShowMessage(true, res.msg, 'error');
                        that.global.changePassword.submitLoading = false;
                    }

                }).catch((res) => {
                    this.$comp.toast({
                        text: '修改失败,请重试.',
                        color: 'error'
                    });

                    // that.globalShowMessage(true, '修改失败,请重试.', 'error');

                    this.global.changePassword.submitLoading = false;
                });
            }
        },

        // globalMenu(id, parent_id, url){
        //     let arr = [];
        //         // herf = url.replace(/(\.html|\/index.html|\/index)$/, ''),
        //         // menu = href.split('/').pop().toLocaleLowerCase(),
        //         // smenu = window.sessionStorage.getItem('menu'),
        //         // mObj = null;

        //     if(id){
        //         arr.push(id);
        //     }

        //     if(parent_id){
        //         arr.push(parent_id);
        //     }
        //     window.sessionStorage.setItem('menu', arr.join(','));
        //     window.location.href = url;
        // }
    }
};

export const baseMixin = base;
export const mixinExt = mixin;
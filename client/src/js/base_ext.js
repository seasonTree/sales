import Vue from './base';

Vue.mixin({
    data() {
        return {

            global: {

                //修改密码
                changePassword: {
                    valid: false,
                    show: false,
                    passVis: false,
                    passVis1: false,
                    password: '',
                    rePassword: '',
                    submitLoading: false
                },

                messageCount: 0,
                messageTimeout: null,
            }
        };
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
        }
    },

    // mounted() {
    //     this.__checkMessage();
    // },

    methods: {

        globalCommitPassword() {

            var that = this;

            that.global.changePassword.submitLoading = false;

            if (that.$refs.globalPassRef.validate()) {
                that.$api.user.resetPassword({
                    data: that.global.changePassword
                }).then((res) => {

                    if (res.code == 0) {
                        that.globalShowMessage(true, res.msg, 'success');

                        setTimeout(() => {
                            that.global.changePassword.show = false;
                        }, 3000);
                    } else {
                        that.globalShowMessage(true, res.msg, 'error');
                        that.global.changePassword.submitLoading = false;
                    }

                }).catch((res) => {
                    that.globalShowMessage(true, '修改失败,请重试.', 'error');

                    this.global.changePassword.submitLoading = false;
                });
            }
        },

        //检查是否有新的消息
        __checkMessage() {
            var that = this;

            that.messageTimeout = setTimeout(() => {
                that.$api.message.getMessageCount().then((res) => {

                    if (res.code == 0) {
                        this.global.messageCount = res.data.count;
                    }

                    // that.__checkMessage();
                }).catch((res) => {
                    that.global.messageCount = 0;

                    // that.__checkMessage();
                });                
            }, 1000);
        },
    }
});

export default Vue;
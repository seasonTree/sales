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
                }
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

        // globalLogout() {
        //     this.$api.user.logout().then((data) => {
        //         window.location.reload();
        //     }).catch((data) => {
        //         window.location.reload();
        //     });
        // },


        //检查是否有新的消息
        checkMessage() {

        },


    }
});

export default Vue;
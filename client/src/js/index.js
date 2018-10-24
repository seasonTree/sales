import Vue from './base';
new Vue({
    el: '#app',

    methods: {

        handlerSubmit() {
            let that = this;

            that.submitLoading = true;

            that.$api.common.login({
                data: that.data
            }).then((res) => {
                if (res.code == 0) {

                    window.location.href = res.data;
                } else {
                    this.globalShowMessage(true, res.msg, 'error');
                    that.submitLoading = false;
                }                
            }).catch((res) => {
                this.globalShowMessage(true, '登录失败,请重试.', 'error');
                that.submitLoading = false;
            });
        }
    },

    data() {
        return {
            show_pass: false,
            submitLoading: false,

            message: {
                show: false,
                text: '',
                time: 3000,
                color: 'success'
            },

            data: {
                username: '',
                password: '',
                remember: false,
            }
        }
    }
});
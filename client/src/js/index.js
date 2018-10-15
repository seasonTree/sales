import Vue from './base';
new Vue({
    el: '#app',

    mounted() {

    },

    methods: {
        handlerSubmit() {
            let that = this;

            that.submitLoading = true;

            that.$api.user.login({
                data: that.data
            }).then((res) => {

                if (data.code == 0) {
                    that.message.text = res.message;
                    that.message.color = 'success';
                    that.message.show = true;

                    //重刷页面,后台负责跳转
                    setTimeout(() => {
                        window.location.reload();
                    }, 3000);
                } else {
                    that.message.text = res.message;
                    that.message.color = 'error';
                    that.message.show = true;
                }

                that.submitLoading = false;
            }).catch((res) => {
                that.message.text = '登录失败,请重试.';
                that.message.color = 'error';
                that.message.show = true;
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
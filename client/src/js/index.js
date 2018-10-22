import Vue from './base_ext';
new Vue({
    el: '#app',

    methods: {
        showMessage(show, text, color){
            this.message.text = text || '';
            this.message.color = color;
            this.message.show = show;
        },

        handlerSubmit() {
            let that = this;

            that.submitLoading = true;

            that.$api.common.login({
                data: that.data
            }).then((res) => {
                if (res.code == 0) {

                    this.showMessage(true, res.msg, 'success');

                    //重刷页面,后台负责跳转
                    setTimeout(() => {
                        window.location.href = res.data;
                    }, 3000);
                } else {
                    this.showMessage(true, res.msg, 'error');
                }

                that.submitLoading = false;
            }).catch((res) => {
                this.showMessage(true, '登录失败,请重试.', 'error')
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
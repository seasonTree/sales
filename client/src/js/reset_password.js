import Vue from './base';
new Vue({
    el: '#app',

    methods: {

        showMessage(show, text, color) {
            this.message.text = text || '';
            this.message.color = color;
            this.message.show = show;
        },

        commit() {
            let that = this;

            if (that.$refs.form.validate()) {
                that.$api.user.resetPassword({
                    data: that.data
                }).then((res) => {

                    if (res.code == 0) {
                        that.showMessage(true, res.msg, 'success');

                        setTimeout(() => {
                            window.location.href = '/';
                        }, 3000);
                    } else {
                        that.showMessage(true, res.msg, 'error');
                    }

                }).catch((res) => {
                    that.showMessage(true, '修改失败,请重试.', 'error');
                });
            }
        }
    },

    data() {
        return {
            show_pass: false,
            show_pass1: false,

            data:{
                password: '',
                rePassword: ''
            },
            
            message: {
                show: false,
                text: '',
                time: 3000,
                color: 'success'
            },
        }
    }
});
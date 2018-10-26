import Vue from './base';
import { baseMixin }  from './mixin';

new Vue({
    el: '#app',
    mixins: [baseMixin],

    methods: {

        // showMessage(show, text, color) {
        //     this.message.text = text || '';
        //     this.message.color = color;
        //     this.message.show = show;
        // },

        commit() {
            let that = this;

            if (that.$refs.form.validate()) {
                that.$api.user.resetPassword({
                    data: that.data
                }).then((res) => {

                    if (res.code == 0) {
                        // that.globalShowMessage(true, res.msg, 'success');

                        this.$comp.toast({
                            text: res.msg,
                            timeout: 1200
                        })

                        setTimeout(() => {
                            window.location.href = res.data.url;
                        }, 1500);
                    } else {
                        // that.globalShowMessage(true, res.msg, 'error');

                        this.$comp.toast({
                            text: res.msg,
                            color: 'error'
                        })
                    }

                }).catch((res) => {
                    this.$comp.toast({
                        text: '修改失败,请重试.',
                        color: 'error'
                    })

                    // that.globalShowMessage(true, '修改失败,请重试.', 'error');
                });
            }
        }
    },

    data() {
        return {

            valid : false,
            show_pass: false,
            show_pass1: false,

            data:{
                password: '',
                rePassword: '',
                uid: ''
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
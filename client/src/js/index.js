import Vue from './base';
import { baseMixin }  from './mixin';

new Vue({
    el: '#app',
    mixins: [baseMixin],

    methods: {

        handlerSubmit() {
            let that = this;

            that.submitLoading = true;

            that.$api.common.login({
                data: that.data
            }).then((res) => {
                if (res.code == 0) {

                    window.location.href = res.data.url;
                } else {
                    // this.globalShowMessage(true, res.msg, 'error');

                    this.$comp.toast({
                        text: res.msg,
                        color: 'error'
                    })

                    that.submitLoading = false;
                }                
            }).catch((res) => {
                this.$comp.toast({
                    text: '登录失败,请重试.',
                    color: 'error'
                })

                // this.globalShowMessage(true, '登录失败,请重试.', 'error');

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
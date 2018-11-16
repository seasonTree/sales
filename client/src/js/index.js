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

                that.submitLoading = false;
            });
        }
    },

    data() {
        return {
            show_pass: false,
            submitLoading: false,

            data: {
                username: '',
                password: '',
                remember: false,
            }
        }
    }
});
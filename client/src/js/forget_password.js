import Vue from './base';
import {
    baseMixin
} from './mixin';

new Vue({
    el: '#app',
    mixins: [baseMixin],

    data() {
        return {

            data: {
                phone_num: '',
                identify_code: ''
            },

            valid: false,
            sending: false,

            phoneRex: /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0-9])|(17[0-9])|(19[0-9])|16[6])\d{8}$/,

            phoneRoules: [
                value => !!value || '手机号必填',
                value => {
                    return this.phoneRex.test(value) || '手机号不正确'
                }
            ],

            IdentifyingCodeRoules: [
                value => !!value || '验证码必填',
            ],

            identifyBtnText: '发送验证码',

            sendInterval: null,

            smsDisabled: true
        }
    },

    watch: {
        data: {
            handler(newValue, oldValue) {
                //不是发送，并且检验通过，disable为false，否则true
                this.smsDisabled = this.sending || !this.phoneRex.test(newValue.phone_num);
            },
            deep: true
        },
    },

    methods: {
        sendSMS() {
            let that = this;

            that.sending = true;
            that.smsDisabled = true;
            that.identifyBtnText = 59;
            that.sendInterval = setInterval(() => {
                if (that.identifyBtnText == 1) {

                    that.sending = false;
                    //因为直接写watch会出现无法监听sending，所以写到这里
                    that.smsDisabled = !that.phoneRex.test(that.data.phone_num);
                    that.identifyBtnText = '发送验证码';

                    clearInterval(that.sendInterval);

                } else {
                    that.identifyBtnText--;
                }

            }, 1000);

            that.$api.user.sendSMS({
                data: that.data
            }).then((res) => {
                if (res.code == 0) {
                    this.$comp.toast({
                        text: res.msg,
                    });
                } else {
                    this.$comp.toast({
                        text: res.msg,
                        color: 'error'
                    });
                }
            }).catch((res) => {
                this.$comp.toast({
                    text: '发送失败,请重试.',
                    color: 'error'
                });
            })
        },

        submit() {
    
            let that = this;
            if (that.$refs.form.validate()) {
                that.$api.user.checkPasswordSMS({
                    data: that.data
                }).then((res) => {

                    if (res.code == 0) {
                        this.$comp.toast({
                            text: res.msg
                        });

                        setTimeout(() => {
                            window.location.href = res.data.url + '?uid=' + res.data.uid;
                        }, 3000);
                    } else {
                        this.$comp.toast({
                            text: res.msg,
                            color: 'error'
                        });
                    }

                }).catch((res) => {
                    this.$comp.toast({
                        text: '验证失败,请重试.',
                        color: 'error'
                    });
                });
            }
        }
    }

});
import Vue from './base';
import {
    baseMixin
} from './mixin';

new Vue({
    el: '#app',
    mixins: [baseMixin],

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

            // console.log('***********');
            // console.log(that.data.phone_num);

            that.$api.user.sendSMS({
                data: {
                    phone_num: that.data.phone_num
                }
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
    },

    data() {
        return {

            valid: false,
            show_pass: false,
            show_pass1: false,
            dialog: false,
            submitLoading: false,

            data: {
                password: '',
                rePassword: '',
                phone_num: '',
                identify_code: '',
                agree: false
            },

            sending: false,

            userRex: /^[a-zA-Z]([_a-zA-Z0-9]{6,12})+$/,

            phoneRex: /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0-9])|(17[0-9])|(19[0-9])|16[6])\d{8}$/,

            userNameRoules: [
                value => !!value || '用户名必填',
                value => {
                    // console.log('eeeeeeeeeeeee');
                    // console.log(this.userRex.test(value))

                    return this.userRex.test(value) || '用户名6至12位，以字母开头,字母，数字，减号，下划线'
                }
            ],

            phoneRoules: [
                value => !!value || '手机号必填',
                value => {
                    return this.phoneRex.test(value) || '手机号不正确'
                }
            ],

            passwordRoules: [
                value => !!value || '密码是必填',
                value => {
                    return value.length >= 6 || '密码最少6位'
                }
            ],

            rePasswordRoules: [
                value => !!value || '确认密码是必填',
                value => this.data.password == value || '两次输入的密码不一致'
            ],

            IdentifyingCodeRoules: [
                value => !!value || '验证码必填',
            ],

            checkAgree: [value => !!value || ''],

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
});
import Vue from './base';
new Vue({
    el: '#app',

    data() {
        return {

            data: {
                phone_num: '',
                identify_code: ''
            },

            valid: false,

            sending: false,

            phoneRoules: [
                value => !!value || '手机号必填',
                value => /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0-9])|(17[0-9])|(19[0-9])|16[6])\d{8}$/.test(value) || '手机号不正确'
            ],

            IdentifyingCodeRoules: [
                value => !!value || '验证码必填',
            ],

            message: {
                show: false,
                text: '',
                time: 3000,
                color: 'success'
            },

            identifyBtnText: '发送验证码',

            sendInterval: null
        }
    },

    computed: {
        smsDisabled(){
            return !this.valid && this.sending;
        },
    },

    methods: {

        showMessage(show, text, color) {
            this.message.text = text || '';
            this.message.color = color;
            this.message.show = show;
        },

        sendSMS() {
            let that = this;

            that.sending = true;
            that.identifyBtnText = 60;
            that.sendInterval = setInterval(() => {
                if (that.identifyBtnText) {
                    clearInterval(that.sendInterval);

                    that.sending = false;
                    that.identify_code == '发送验证码';
                } else {
                    that.identifyBtnText--;
                }

            }, 1000);

            that.$api.common.sendPasswordSMS({
                data: that.data
            }).then((res) => {
                if (res.code == 0) {
                    that.showMessage(true, res.msg, 'success');
                } else {
                    that.showMessage(true, res.msg, 'error');
                }
            }).catch((res) => {
                that.showMessage(true, '发送失败,请重试.', 'error');
            })
        },

        submit() {
            let that = this;

            if (that.$refs.form.validate()) {
                that.$api.common.checkPassworkSMS({
                    data: that.data
                }).then((res) => {

                    if (res.code == 0) {
                        this.showMessage(true, res.msg, 'success');

                        setTimeout(() => {
                            //TODO
                            window.location.href = '/';
                        }, 3000);
                    } else {
                        this.showMessage(true, res.msg, 'error');
                    }

                }).catch((res) => {
                    this.showMessage(true, '验证失败,请重试.', 'error');
                });
            }
        }
    }

});
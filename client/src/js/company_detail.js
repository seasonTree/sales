import Vue from './base';
import uploadImage from '@compontent/uploadimage/UploadImage';
import {
    mixinExt
} from './mixin';

new Vue({
    el: '#app',
    mixins: [mixinExt],
    components: {
        uploadImage
    },

    created() {
        let that = this;

        that.$api.user.getOneUser().then((res) => {
            that.data = res.data;

            that.originPhone = JSON.parse(JSON.stringify(res.data.phone));
        }).catch((res) => {
            that.$comp.toast({
                text: '获取数据失败，请刷新后重试.',
                color: 'error'
            });
        });
    },

    computed: {
        phoneChange(){
            return this.data.phone != this.originPhone;
        }
    },

    methods: {
        submit() {
            let that = this;

            that.$api.user.insUserInfo({
                data: that.data
            }).then((res) => {
                if (res.code == 0) {
                    that.$comp.toast({
                        text: res.msg,
                    });
                } else {
                    that.$comp.toast({
                        text: res.msg,
                        color: 'error'
                    });
                }
            }).catch((res) => {
                that.$comp.toast({
                    text: '提交失败，请刷新后重试.',
                    color: 'error'
                });
            });
        },

        sendSMS() {
            let that = this;

            if (that.phoneRex.test(that.data.phone)) {
                that.smsDisabled = true;
                that.identifyBtnText = 59;
                that.sendInterval = setInterval(() => {
                    if (that.identifyBtnText == 1) {

                        that.smsDisabled = false;
                        that.identifyBtnText = '发送验证码';

                        clearInterval(that.sendInterval);

                    } else {
                        that.identifyBtnText--;
                    }

                }, 1000);

                that.$api.user.sendSMS({
                    data: {
                        phone_num: that.data.phone
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
            } else {
                this.$comp.toast({
                    text: '请输入正确的手机号码.',
                    color: 'error'
                });
            }
        },
    },

    data() {
        return {
            data: [],
            originPhone: '',
            phoneRex: /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0-9])|(17[0-9])|(19[0-9])|16[6])\d{8}$/,
            smsDisabled: false,
            identifyBtnText: '发送验证码',
        }
    }
});
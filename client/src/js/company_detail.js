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
        }).catch((res) => {
            that.$comp.toast({
                text: '提交失败，请刷新后重试.',
                color: 'error'
            });
        });
    },

    methods :{
        submit(){
            let that = this;

            that.$api.user.insUserInfo({
                data:that.data
            }).then((res) => {
                if(res.code == 0){
                    that.$comp.toast({
                        text: res.msg,
                    });
                }else{
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
    },
    

    data() {
        return {
            data:[],
        }
    }
});
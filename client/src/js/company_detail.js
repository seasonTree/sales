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
            console.log('eeeeeeeeeeeee');
            console.log(res);
        });
    },

    methods :{
        submit(){
            let that = this;

            that.$api.user.insUserInfo({
                data:that.data
            }).then((res) => {
                // that.data = res.data;
            }).catch((res) => {
                console.log('eeeeeeeeeeeee');
                console.log(res);
            });

        },
    },
    

    data() {
        return {

            data:[
                

            ],

        }
    }
});
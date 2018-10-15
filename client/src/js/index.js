import Vue from './base';
new Vue({
    el: '#app',

    mounted() {
        let that = this;

        this.$api.user.login({
            data: that.data
        }).then((data) => {

        }).catch((data)=>{
            
        });
    },

    data() {
        return {
            show_pass: false,
            sending: false,

            data: {
                username: '',
                password: '',
                remember: false,
            }
        }
    }
});
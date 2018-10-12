import Vue from './base';
new Vue({
    el: '#app',

    mounted() {

    },

    methods:{
        handlerSubmit(){
            this.$api.user.login({
                data: this.data
            }).then((data) => {
                console.log('************************');
                console.log(data);
            }).catch((data)=>{
                
            });
        }
    },

    data() {
        return {
            drawer: false,
            show_pass: false,

            data: {
                username: '',
                password: '',
                remember: false,
            }
        }
    }
});
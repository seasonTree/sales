import Vue from './base';
new Vue({
    el: '#app',

    mounted() {
        this.$api.user.login({
            test: 'value'
        }).then((data) => {
            console.log('************************');
            console.log(data);
        });
    },

    data() {
        return {
            drawer: false,
            show_pass: false,
        }
    }
});
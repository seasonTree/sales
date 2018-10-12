import Vue from './base';
new Vue({
    el: '#app',

    methods: {
        commitChange() {
            this.snackbar = true;

            setTimeout(() => {
                window.location.href = '/login.html';
            }, 3000);
        }
    },

    data() {
        return {
            snackbar: false,

            show_pass: false
        }
    }
});
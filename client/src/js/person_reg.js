import Vue from './base';
import uploadImage from '../compontent/UploadImage'
import '@css/person_reg';

new Vue({
    el: '#app',
    components: {
        uploadImage
    },

    data() {
        return {
            show_pass: false,
            dialog: false,


        }
    }
});
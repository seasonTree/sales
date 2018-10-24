import Vue from './base';
import uploadImage from '../compontent/uploadimage/UploadImage';
import '@css/person_reg';
import mixin from './mixin';

new Vue({
    el: '#app',
    mixins: [mixin],
    components: {
        uploadImage
    },

    data() {
        return {
        }
    }
});
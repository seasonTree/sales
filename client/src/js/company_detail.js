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

    data() {
        return {

        }
    }
});
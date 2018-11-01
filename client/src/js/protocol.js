import Vue from './base';
import { baseMixin }  from './mixin';

new Vue({
    el: '#app',
    mixins: [baseMixin],
});
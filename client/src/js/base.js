import '@css/reset';
import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@css/fonts';
import '@css/common';
import Vue from 'vue';
import Vuetify from 'vuetify';
import api from './api';
import { getCookie } from '../common/util';

Vue.use(api);
Vue.config.productionTip = false

Vue.use(Vuetify);

Vue.mixin({
    data() {
        return {
            //全局消息
            global: {
                message: {
                    show: false,
                    text: '消息',
                    time: 3000,
                    color: 'success'
                },

                toolbar: {
                    language: 'zh-cn',
                },
                
                currentView: ''
            },
        }
    },

    mounted() {
        this.globalChangeLanguage(getCookie("think_var") || 'zh-cn');
    },

    computed: {
        languageLocal(){
            let local = this.toolbar.language;

            switch(local){
                case 'zh-cn': 
                    return import('../i18n/zh-cn');

                case 'zh-hk':
                    return import('../i18n/zh-cn');

                case 'en-us':
                    return import('../i18n/en-us');
            }
        }
    },

    methods: {

        /**
         * @param {Boolean} show 是否弹出提示
         * @param {String} text 提示内容
         * @param {String} color error | success 
         * @param {Number} time 提示停留时间
         */
        globalShowMessage(show, text, color, time) {
            this.global.message.text = text || '消息';
            this.global.message.color = color;
            this.global.message.show = show;
            this.global.time = time || 3000;
        },

        globalChangeLanguage(local){
            let larr = ['zh-cn', 'zh-hk', 'en-us'],
                found = '';

            for(var i = 0; i < larr.length; i++){
                var item = larr[i];

                if(item == local){
                    found = item;
                    break;
                }
            }

            found = found || 'zh-cn';

            this.global.toolbar.language = found;
        }
    }
});

export default Vue;
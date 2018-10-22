import '@css/reset';
import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@css/fonts';
import '@css/common';
import Vue from 'vue';
import Vuetify from 'vuetify';
import api from './api';

Vue.use(api);
Vue.config.productionTip = false

Vue.use(Vuetify);

Vue.mixin({
    data(){
        return {
            //全局消息
            global: {
                message: {
                    show: false,
                    text: '消息',
                    time: 3000,
                    color: 'success'                    
                },
            }
        }
    },

    methods:{

        /**
         * @param {Boolean} show 是否弹出提示
         * @param {String} text 提示内容
         * @param {String} color error | success 
         * @param {Number} time 提示停留时间
         */
        globalShowMessage(show, text, color, time){
            this.global.message.text = text || '消息';
            this.global.message.color = color;
            this.global.message.show = show;
            this.global.time = time || 3000;
        },
    }
});

export default Vue;
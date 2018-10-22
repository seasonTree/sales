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

export default Vue;
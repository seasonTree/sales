import '@css/reset';
import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@css/fonts';
import '@css/common';
import Vue from 'vue';
import Vuetify from 'vuetify';
import api from '../api';
import i18n from '../i18n';
import comp from '../compontent';

Vue.use(api);
Vue.use(i18n);
Vue.use(comp);

Vue.config.productionTip = false

Vue.use(Vuetify);

export default Vue;
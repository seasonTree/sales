import Vue from 'vue';
import confirm from './Confirm';

let confirmConstruction = Vue.extend(confirm);
let instance = null;

export default (option) => {
    option = option || {};

    //创建toast实例，一直重用
    if (!instance) {
        instance = new confirmConstruction();

        instance.$mount();

        document.body.appendChild(instance.$el);

        instance._close = () => {
            instance.visible = false;
        }
    }

    instance.title = option.title || '标题';
    instance.text = option.text || '确认吗？';
    instance.okBtnTex = option.okBtnTex || '确认';
    instance.cancelBtnText = option.cancelBtnText || '取消';
    instance.ok = option.ok || null;
    instance.cancel = option.cancel || null;

    instance.visible = true;
}
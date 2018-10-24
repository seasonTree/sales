import Vue from 'vue';
import toast from './toast';

let toastConstruction = Vue.extend(toast);
let instance = null;

export default (option) => {
    option = option || {};

    //创建toast实例，一直重用
    if (!instance) {
        instance = new toastConstruction();

        instance.$mount();
        document.body.appendChild(instance.$el);
    }

    instance.text = option.text || '消息';
    instance.color = option.color || 'success';
    instance.timeout = option.timeout || 3000;
    instance.top = option.top || true;
    instance.left = option.left || false;
    instance.right = option.right || false;
    instance.bottom = option.bottom || false;
    instance.closeText = option.closeText || '关闭';



    instance.visible = true;
}
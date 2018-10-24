import Vue from 'vue';
import toast from './toast';

let toastConstruction = Vue.extend(toast);
let instance = null;

export default (option) =>{
    instance = new toastConstruction();

    document.body.appendChild(instance.$el);

    

}
import Vue from './base';
import {
    mixinExt
} from './mixin';

new Vue({
    el: '#app',
    mixins: [mixinExt],

    mounted() {
        ClassicEditor
            .create(document.querySelector('#editor'), {})
            .catch(error => {
                console.error(error);
            });
    },

    // computed: {
    //     editor() {
    //         return this.$refs.quillEditor.quill
    //     },
    // },

    data() {
        return {
            content: null,
            editorOption: {},

            showAdd: false,

            items: [
                '开启注册',
                '关闭注册'
            ],

            theader: [{
                    text: '',
                    align: 'left',
                    value: 'a',
                    sortable: false,
                },
                {
                    text: '协议名称',
                    align: 'left',
                    value: 'b',
                    sortable: false,
                },
                {
                    text: '协议内容',
                    align: 'left',
                    value: 'c',
                    sortable: false,
                },
                {
                    align: 'center',
                    value: 'h',
                    sortable: false,
                },
            ],

            tdata: [{
                a: 1,
                b: '佣金协议',
                c: '协议内容',
            }]
        }
    }
});
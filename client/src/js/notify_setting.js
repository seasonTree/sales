import Vue from './base';
import {
    mixinExt
} from './mixin';


new Vue({
    el: '#app',
    mixins: [mixinExt],

    data() {
        return {
            showAdd: false,

            items: [
                '佣金变动消息'
            ],

            theader: [{
                    text: '',
                    align: 'left',
                    value: 'a',
                    sortable: false,
                },
                {
                    text: '消息类型',
                    align: 'left',
                    value: 'b',
                    sortable: false,
                },
                {
                    text: '消息内容',
                    align: 'left',
                    value: 'c',
                    sortable: false,
                },
                {
                    align: 'center',
                    value: 'd',
                    sortable: false,
                },
            ],

            tdata: [{
                a: 1,
                b: '佣金消息',
                c: '1322312321231223',
            }]
        }
    }
});
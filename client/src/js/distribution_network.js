import Vue from './base';
import { mixinExt }  from './mixin';

new Vue({
    el: '#app',
    mixins: [mixinExt],

    data() {
        return {

            theader: [{
                    text: '渠道名',
                    align: 'left',
                    value: 'a',
                    sortable: false,
                },
                {
                    text: '名字',
                    align: 'left',
                    value: 'b',
                    sortable: false,
                },
                {
                    text: '姓',
                    align: 'left',
                    value: 'c',
                    sortable: false,
                },
                {
                    text: '用户名',
                    align: 'left',
                    value: 'd',
                    sortable: false,
                },
                {
                    text: '注册日期',
                    align: 'left',
                    value: 'e',
                    sortable: false,
                },
            ],
            tdata: [{
                a: '123',
                b: '111111',
                c: '111111',
                d: '111111',
                e: '111111',
            }]
        };
    }
})
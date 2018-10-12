import Vue from './base';
new Vue({
    el: '#app',

    data() {
        return {
            // dialog: false,
            showAdd: false,

            items: [
                '开启注册',
                '关闭注册'
            ],

            dateFm: null,
            dateTo: null,
            menu: false,
            menu1: false,

            theader: [{
                    text: '',
                    align: 'left',
                    value: 'a',
                    sortable: false,
                },
                {
                    text: '类型',
                    align: 'left',
                    value: 'b',
                    sortable: false,
                },
                {
                    text: '开始日期',
                    align: 'left',
                    value: 'c',
                    sortable: false,
                },
                {
                    text: '结束日期',
                    align: 'left',
                    value: 'd',
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
                    b: '开启注册',
                    c: '2018-2-1',
                    d: '2099-10-1',
                    stop: false
                },
                {
                    a: 1,
                    b: '关闭注册',
                    c: '2018-1-1',
                    d: '2018-1-30',
                    stop: true
                }
            ]
        }
    }
});
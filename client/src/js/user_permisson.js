import Vue from './base';
new Vue({
    el: '#app',

    data() {
        return {

            showAdd: false,

            items: ['页面1', '页面2'],

            theader: [{
                    text: 'ID',
                    align: 'left',
                    value: 'a',
                    sortable: false,
                },
                {
                    text: '权限名称',
                    align: 'left',
                    value: 'b',
                    sortable: false,
                },
                {
                    text: '字段名',
                    align: 'right',
                    value: 'c',
                    sortable: false,
                },
                {
                    text: '操作',
                    align: 'center',
                    value: 'd',
                    sortable: false,
                },
            ],
            tdata: [{
                a: '1',
                b: '会员管理',
                c: 'admin   user   memberlst',
            }]
        };
    }
})
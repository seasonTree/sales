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
                    text: '角色名称',
                    align: 'left',
                    value: 'b',
                    sortable: false,
                },
                {
                    text: '用户列表',
                    align: 'left',
                    value: 'c',
                    sortable: false,
                },
                {
                    text: '描述',
                    align: 'left',
                    value: 'd',
                    sortable: false,
                },
                {
                    text: '操作',
                    align: 'center',
                    value: 'e',
                    sortable: false,
                }
            ],
            tdata: [{
                a: '1',
                b: '管理员',
                c: 'aaa,bbb',
                d: '用户管理员'
            }]
        }
    }
});
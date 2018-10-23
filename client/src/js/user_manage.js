import Vue from './base_ext';
new Vue({
    el: '#app',

    data() {
        return {

            show_pass: false,
            show_pass1: false,

            showAdd: false,

            theader: [{
                    text: 'ID',
                    align: 'left',
                    value: 'a',
                    sortable: false,
                },
                {
                    text: '登录名',
                    align: 'left',
                    value: 'b',
                    sortable: false,
                },
                {
                    text: '角色',
                    align: 'right',
                    value: 'c',
                    sortable: false,
                },
                {
                    text: '是否启用',
                    align: 'left',
                    value: 'd',
                    sortable: false,
                },
                {
                    text: '操作',
                    align: 'center',
                    value: 'e',
                    sortable: false,
                },
            ],
            tdata: [{
                a: '1',
                b: 'admin',
                c: '管理员',
                d: '是',
            }]
        };
    }
})
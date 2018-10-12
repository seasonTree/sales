import Vue from './base';
new Vue({
    el: '#app',

    methods: {
        viewAudit(item) {
            this.auditInfo = true;

            this.viewAuditInfo = item;
        }
    },

    data() {
        return {
            auditInfo: false,

            viewImage: false,

            auditNotPass: false,

            viewAuditInfo: {

            },

            theader: [{
                    text: '姓',
                    align: 'left',
                    value: 'a',
                    sortable: false,
                },
                {
                    text: '名',
                    align: 'left',
                    value: 'b',
                    sortable: false,
                },
                {
                    text: '角色',
                    align: 'left',
                    value: 'c',
                    sortable: false,
                },
                {
                    text: '电话',
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
                    a: '刘',
                    b: '伟',
                    c: '销售员',
                    d: '1234567890',
                    e: 'p'
                },
                {
                    a: '刘',
                    b: '伟2',
                    c: '公司',
                    d: '1234567890',
                    e: 'c'
                }
            ]
        };
    }
})
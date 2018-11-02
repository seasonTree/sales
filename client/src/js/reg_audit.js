import Vue from './base';
import {
    mixinExt
} from './mixin';

new Vue({
    el: '#app',
    mixins: [mixinExt],

    created() {
        let that = this;

        that.$api.audit.getRegLst().then((res) => {
            if (res.code == 0) {
                that.tdata = res.data;
            } else {
                that.$comp.toast({
                    text: res.msg,
                    color: 'error'
                })
            }
        }).catch((res) => {
            that.$comp.toast({
                text: '获取失败，请重试.',
                color: 'error'
            })
        });
    },

    methods: {
        viewAudit(id) {
            let that = this;
            that.type = 'p';

            that.$api.user.getOneUser({
                    data:id
                }).then((res) => {
                if (res.code == 0) {
                    that.viewAuditInfo = res.data;
                } else {
                    that.$comp.toast({
                        text: res.msg,
                        color: 'error'
                    })
                }
            }).catch((res) => {
                that.$comp.toast({
                    text: '获取失败，请重试.',
                    color: 'error'
                })
            });
            that.auditInfo = true;

            // that.viewAuditInfo = item;
        }
    },

    data() {
        return {
            auditInfo: false,

            viewImage: false,

            auditNotPass: false,

            type:'',

            viewAuditInfo: {

            },

            theader: [{
                    text: '用户名',
                    align: 'left',
                    value: 'a',
                    sortable: false,
                },{
                    text: '姓',
                    align: 'left',
                    value: 'b',
                    sortable: false,
                },
                {
                    text: '名',
                    align: 'left',
                    value: 'c',
                    sortable: false,
                },
                {
                    text: '角色',
                    align: 'left',
                    value: 'd',
                    sortable: false,
                },
                {
                    text: '电话',
                    align: 'left',
                    value: 'e',
                    sortable: false,
                },
                {
                    text: '操作',
                    align: 'center',
                    value: 'f',
                    sortable: false,
                },
            ],
            tdata: []
        };
    }
})
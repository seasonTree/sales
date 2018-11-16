import Vue from './base';
import {
    mixinExt
} from './mixin';

new Vue({
    el: '#app',
    mixins: [mixinExt],

    created() {
        let that = this;
        that.getReomteData();
    },

    methods: {

        getReomteData() {
            let that = this;

            that.$api.audit.getRegLst({
                type: that.currentDataType,
                pageSize: that.pager.size,
                pageIndex: that.pager.index
            }).then((res) => {
                if (res.code == 0) {
                    that.tdata = res.data;

                    // that.tdata = res.data.data;
                    // that.pager.count = res.data.pageCount || 1;
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

        changePage() {
            this.getReomteData();
        },

        viewAudit(id) {
            let that = this;
            that.type = 'p';

            that.$api.user.getOneUser({
                data: id
            }).then((res) => {
                if (res.code == 0) {
                    that.viewAuditInfo = res.data;
                    if (res.data.parent_id == 0) {
                        that.type = 'c';
                    } else {
                        that.type = 'p';
                    }
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
        },

        bigImage(url) {
            let that = this;
            that.image_url = url;
            that.viewImage = true;
        },

        auditCommit(uid) {
            let that = this;
            that.data.uid = uid;
            that.data.type = 1;
            that.agreeDisabled = true;

            that.$api.audit.auditCommit({
                data: that.data
            }).then((res) => {
                if (res.code == 0) {
                    that.$comp.toast({
                        text: res.msg,
                    });
                    // window.location.href = res.data.url;
                    that.getReomteData();

                    that.closeDialog();
                } else {
                    that.$comp.toast({
                        text: res.msg,
                        color: 'error'
                    })
                    that.agreeDisabled = false;
                }
            }).catch((res) => {
                that.$comp.toast({
                    text: '提交失败，请重试.',
                    color: 'error'
                })
                that.submitLoading = false;
            });

        },

        auditNotPs(uid) {
            let that = this;
            that.data.uid = uid;
            that.auditNotPass = true;
        },

        auditCommitNotPass() {
            let that = this;
            that.data.type = -1;
            that.disagressDisabled = true;
            that.$api.audit.auditCommit({
                data: that.data
            }).then((res) => {
                if (res.code == 0) {
                    that.$comp.toast({
                        text: res.msg,
                    });

                    that.getReomteData();
                    that.closeDialog();

                    // window.location.href = res.data.url;
                } else {
                    that.$comp.toast({
                        text: res.msg,
                        color: 'error'
                    })
                    that.disagressDisabled = false;
                }
            }).catch((res) => {
                that.$comp.toast({
                    text: '提交失败，请重试.',
                    color: 'error'
                })
                that.submitLoading = false;
            });
        },

        closeDialog() {
            let that = this;
            that.viewAuditInfo = {};
            that.auditInfo = false;
            that.auditNotPass = false;
            that.date = {
                note: '',
                uid: '',
                type: ''
            };
        }
    },

    data() {
        return {
            auditInfo: false,

            viewImage: false,

            auditNotPass: false,

            agreeDisabled: false,
            disagressDisabled: false,
            // rejectDisabled: false,

            type: '',

            image_url: '',

            data: {
                note: '',
                uid: '',
                type: ''
            },

            // submitLoading: false,

            viewAuditInfo: {},

            tableLoading: false,

            currentDataType: 1,
            tableType: [{
                    text: '全部',
                    value: 0
                },
                {
                    text: '未审核',
                    value: 1
                },
                {
                    text: '待审核',
                    value: 2
                },
            ],

            pager: {
                totalVisible: 7,
                count: 1,
                index: 1,
                size: 10
            },

            theader: [{
                    text: '用户名',
                    align: 'left',
                    value: 'username',
                    sortable: false,
                }, {
                    text: '姓',
                    align: 'left',
                    value: 'first_name',
                    sortable: false,
                },
                {
                    text: '名',
                    align: 'left',
                    value: 'last_name',
                    sortable: false,
                },
                {
                    text: '角色',
                    align: 'left',
                    value: 'role_name',
                    sortable: false,
                },
                {
                    text: '电话',
                    align: 'left',
                    value: 'phone',
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
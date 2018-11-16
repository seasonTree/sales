import Vue from './base';
import {
    mixinExt
} from './mixin';

new Vue({
    el: '#app',
    mixins: [mixinExt],

    created() {
        let that = this;

        that.getRemoteData();
    },
    data() {
        return {

            show_pass: false,
            show_pass1: false,

            rolesAll: {},
            userAll: {},

            addData: {
                role_id: [],
            },
            editData: {
                role_id: [],
            },

            showAdd: false,
            showEdit: false,

            theader: [{
                    text: 'ID',
                    align: 'left',
                    value: 'id',
                    sortable: false,
                },
                {
                    text: '登录名',
                    align: 'left',
                    value: 'username',
                    sortable: false,
                },
                {
                    text: '角色',
                    align: 'left',
                    value: 'role_name',
                    sortable: false,
                },
                {
                    text: '是否启用',
                    align: 'left',
                    value: 'status',
                    sortable: false,
                },
                {
                    text: '操作',
                    align: 'center',
                    value: 'e',
                    sortable: false,
                },
            ],
            tdata: []
        };
    },
    methods: {

        getRemoteData() {
            let that = this;

            that.$api.user.get().then((res) => {
                that.rolesAll = res.data.roles;
                that.tdata = res.data.list;
            }).catch((res) => {
                that.$comp.toast({
                    text: '获取数据失败，请刷新重试.',
                    color: 'error'
                });
            });
        },

        addCommit() {
            let that = this;

            that.$api.user.add({
                data: that.addData
            }).then((res) => {

                if (res.code == 0) {
                    that.$comp.toast({
                        text: res.msg || '新增成功.',
                    });

                    that.getRemoteData();

                    that.showAdd = false;

                    that.$refs['addForm'].reset();
                } else {
                    that.$comp.toast({
                        text: res.msg || '新增失败，请刷新后重试.',
                        color: 'error',
                    });
                }
            }).catch((res) => {
                that.$comp.toast({
                    text: '新增失败，请刷新后重试.',
                    color: 'error',
                });
            });
        },

        changeStatus(item, id, status) {
            let that = this,
                data = {
                    'status': status,
                    'id': id,
                };
            that.$api.user.userStatus({
                data: data
            }).then((res) => {
                if (res.code == 0) {
                    that.$comp.toast({
                        text: res.msg || '设置成功.',
                    });

                    item.status = status;
                }else{
                    that.$comp.toast({
                        text: '设置失败，请重试.',
                        color: 'error',
                    });
                }
            }).catch((res) => { //function(data){}
                that.$comp.toast({
                    text: '设置失败，请重试.',
                    color: 'error',
                });
            });
        },
        del(id) {
            let that = this;
            that.$api.user.del({
                data: id
            }).then((res) => {

                if (res.code == 0) {

                    that.$comp.toast({
                        text: res.msg || '删除成功.',
                    });

                    for (var i = 0; i < that.tdata.length; i++) {
                        var item = that.tdata[i];

                        if (item.id == id) {
                            that.tdata.splice(i, 1);
                            break;
                        }
                    }
                } else {
                    that.$comp.toast({
                        text: res.msg || '删除失败，请刷新后重试.',
                        color: 'error',
                    });
                }

            }).catch((res) => { //function(data){}
                that.$comp.toast({
                    text: '删除失败，请刷新后重试.',
                    color: 'error',
                });
            });
        },

        edit(item) {
            let citem = JSON.parse(JSON.stringify(item));

            citem.role_id = citem.role_id ? citem.role_id.split(',').map(itm => {
                return parseInt(itm, 10)
            }) : [];

            this.editData = citem;
            this.showEdit = true;
        },

        editCommit() {
            let that = this;
            that.$api.user.edit({
                data: that.editData
            }).then((res) => {
                if (res.code == 0) {

                    that.$comp.toast({
                        text: res.msg || '修改成功.',
                    });

                    that.getRemoteData();

                    that.showEdit = false;

                    that.$refs['editForm'].reset();
                } else {
                    that.$comp.toast({
                        text: res.msg || '修改失败，请刷新后重试.',
                        color: 'error',
                    });
                }
            }).catch((res) => { //function(data){}
                that.$comp.toast({
                    text: '修改失败，请刷新后重试.',
                    color: 'error',
                });
            });

        },
    }
})
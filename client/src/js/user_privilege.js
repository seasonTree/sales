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

            showAdd: false,
            showEdit: false,

            items: null,

            theader: [{
                    text: 'ID',
                    align: 'left',
                    value: 'id',
                    sortable: false,
                },
                {
                    text: '权限名称',
                    align: 'left',
                    value: 'pri_name',
                    sortable: false,
                },
                {
                    text: '模块名称',
                    align: 'right',
                    value: 'module_name',
                    sortable: false,
                },
                {
                    text: '控制器名称',
                    align: 'right',
                    value: 'controller_name',
                    sortable: false,
                },
                {
                    text: '方法名',
                    align: 'right',
                    value: 'action_name',
                    sortable: false,
                },
                {
                    text: '操作',
                    align: 'center',
                    value: '_act',
                    sortable: false,
                },
            ],
            tdata: [],

            editItem: {},
            addItem: {},
        };
    },

    methods: {

        getRemoteData() {
            let that = this;

            that.$api.privilege.get().then((data) => {
                that.tdata = data.data;
                that.tdata.unshift({
                    parent_id: 0,
                    pri_name: '顶级权限',
                    id: 0,
                    level: 0
                });

                that.items = that.tdata.map(function (item) {
                    item.pri_name = Array(item.level + 1).join('------') + item.pri_name;
                    return item;
                });

            }).catch((data) => {
                that.$comp.toast({
                    text: '获取数据失败，请刷新重试.',
                    color: 'error'
                });
            });
        },

        edit(item) {
            this.editItem = JSON.parse(JSON.stringify(item));

            this.editItem.pri_name = this.editItem.pri_name.replace(/------/g, '');

            this.showEdit = true;
        },

        del(id) {
            let that = this;
            that.$api.privilege.del({
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

        addCommit() {
            let that = this;
            that.$api.privilege.add({
                data: that.addItem
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

        editCommit() {
            let that = this;
            that.$api.privilege.edit({
                data: that.editItem
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
        }
    }
})
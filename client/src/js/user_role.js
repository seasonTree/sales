import Vue from './base';
import STree from '../compontent/stree/STree';
import {
    mixinExt
} from './mixin';

new Vue({
    el: '#app',
    mixins: [mixinExt],

    components: {
        STree
    },

    created() {
        let that = this;
        that.getRemoteData();
    },

    data() {
        return {
            showAdd: false,
            showEdit: false,
            // prevData: [],

            addItem: {},
            editItem: {},

            treeData: [],
            selected: [],

            theader: [{
                    text: 'ID',
                    align: 'left',
                    value: 'id',
                    sortable: false,
                },
                {
                    text: '角色名称',
                    align: 'left',
                    value: 'role_name',
                    sortable: false,
                },
                {
                    text: '用户列表',
                    align: 'left',
                    value: 'username',
                    sortable: false,
                },
                {
                    text: '描述',
                    align: 'left',
                    value: 'pri_name',
                    sortable: false,
                },
                {
                    text: '操作',
                    align: 'center',
                    value: 'e',
                    sortable: false,
                }
            ],
            tdata: []
        }
    },
    methods: {
        getRemoteData() {
            let that = this;

            that.$api.role.get().then((res) => {
                that.tdata = res.data.list;
                that.treeData = res.data.role;

            }).catch((res) => {
                that.$comp.toast({
                    text: '获取数据失败，请刷新重试.',
                    color: 'error'
                });
            });
        },

        edit(item) {
            let that = this;

            that.editItem.role_name = item.role_name;
            that.editItem.id = item.id;
            that.selected = item.pri_id.split(',');

            that.showEdit = true;

        },
        addCommit() {
            let that = this,
                data = {
                    role_name: that.addItem.role_name,
                    selected: that.$refs.treeAdd.getSelect()
                };

            that.$api.role.add({
                data: data
            }).then((res) => {

                if (res.code == 0) {
                    that.$comp.toast({
                        text: res.msg || '新增成功.',
                    });

                    that.getRemoteData();

                    that.closeDialog('add');
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
            let that = this,
                data = {
                    id: that.editItem.id,
                    role_name: that.editItem.role_name,
                    selected: that.$refs.treeEdit.getSelect()
                };

            that.$api.role.edit({
                data: data
            }).then((res) => {
                if (res.code == 0) {

                    that.$comp.toast({
                        text: res.msg || '修改成功.',
                    });

                    that.getRemoteData();

                    that.closeDialog('edit');
                } else {
                    that.$comp.toast({
                        text: res.msg || '修改失败，请刷新后重试.',
                        color: 'error',
                    });
                }
            }).catch((res) => {
                that.$comp.toast({
                    text: '修改失败，请刷新后重试.',
                    color: 'error',
                });
            });
        },

        del(item) {
            let that = this;

            that.$comp.confirm({
                title: '提示',
                text: '确认要删除吗?',
                ok() {
                    that.$api.role.del({
                        data: item
                    }).then((res) => {
                        if (res.code == 0) {
        
                            that.$comp.toast({
                                text: res.msg || '删除成功.',
                            });
        
                            for (var i = 0; i < that.tdata.length; i++) {
                                var citem = that.tdata[i];
        
                                if (citem.id == item.id) {
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
        
                    }).catch((res) => {
                        that.$comp.toast({
                            text: '删除失败，请刷新后重试.',
                            color: 'error',
                        });
                    });
                }
            });
        },

        closeDialog(type){
            let that = this;

            if(type == 'add'){
                that.showAdd = false;
                that.$refs['addForm'].reset();
            }else if(type == 'edit'){
                that.showEdit = false;
                that.$refs['editForm'].reset();
            }
        }
    }
});
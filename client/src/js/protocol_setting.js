import Vue from './base';
import {
    mixinExt
} from './mixin';
import ckEditor from '@compontent/ckeditor/CKEditor'

new Vue({
    el: '#app',
    mixins: [mixinExt],

    components: {
        ckEditor
    },

    created() {
        let that = this;

        that.$api.protocol.get().then((res) => {
            if (res.code == 0) {
                that.tdata = res.data;
            } else {
                that.$comp.toast({
                    text: '获取失败，请重试.',
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
        addCommit() {
            let that = this;

            that.$api.protocol.add(that.addItem).then((res) => {
                if (res.code == 0) {
                    that.$comp.toast({
                        text: res.msg,
                    });

                    that.hideDialog('add');

                    //直接追加一行
                    that.tdata.unshift(res.data);

                } else {
                    that.$comp.toast({
                        text: res.msg || '新增失败，请重试.',
                        color: 'error'
                    });
                }
            }).catch((res) => {
                that.$comp.toast({
                    text: res.msg || '新增失败，请重试.',
                    color: 'error'
                });
            });
        },

        editCommit() {
            let that = this;

            that.$api.protocol.edt(that.addItem).then((res) => {
                if (res.code == 0) {
                    that.$comp.toast({
                        text: res.msg,
                    });

                    that.hideDialog('edit');

                } else {
                    that.$comp.toast({
                        text: res.msg || '修改失败，请重试.',
                        color: 'error'
                    });
                }

            }).catch((res) => {
                that.$comp.toast({
                    text: res.msg || '修改失败，请重试.',
                    color: 'error'
                });
            });
        },

        del(id, index) {
            let that = this;

            that.$api.protocol.del({
                data: id
            }).then((res) => {
                if (res.code == 0) {
                    that.$comp.toast({
                        text: res.msg,
                    });

                    that.tdata.splice(index, 1);
                } else {
                    that.$comp.toast({
                        text: res.msg || '删除失败，请重试.',
                        color: 'error'
                    });
                }
            }).catch((res) => {
                that.$comp.toast({
                    text: res.msg || '删除失败，请重试.',
                    color: 'error'
                });
            });
        },

        //关闭窗口并清除数据
        hideDialog(type) {
            let that = this;

            if (type == 'add') {
                that.addItem.title = '';
                that.addItem.content = '';

                that.showAdd = false;

            } else if (type == 'edit' || type == 'view') {
                that.editItem.id = null;
                that.editItem.title = '';
                that.editItem.content = '';

                that.showEdit = false;
                that.showView = false;
            }
        },

        //修改和查看都是用这个
        showDialog(item, isView) { //isview用于检查用户是否打开查看
            let that = this;

            that.$api.protocol.getContent({
                    data: item.id
                }).then((res) => {
                if (res.code == 0) {
                    that.editItem.id = res.data.id;
                    that.editItem.title = res.data.title;
                    that.editItem.content = res.data.content;

                    if (isView) {
                        that.showView = true;
                    } else {
                        that.showEdit = true;
                    }
                } else {
                    that.$comp.toast({
                        text: res.msg || '获取当前数据失败，请重试.',
                        color: 'error'
                    });
                }

            }).catch((res) => {
                that.$comp.toast({
                    text: res.msg || '获取当前数据失败，请重试.',
                    color: 'error'
                });
            });
        }
    },

    data() {
        return {

            addItem: {
                title: '',
                content: ''
            },

            editItem: {
                id: null,
                title: '',
                content: ''
            },

            showAdd: false,
            showEdit: false,
            showView: false,

            addValid: false,
            editValid: false,

            rules: [
                v => !!v || '协议名称不能为空'
            ],

            theader: [{
                    text: '',
                    align: 'left',
                    value: 'a',
                    sortable: false,
                },
                {
                    text: '协议名称',
                    align: 'left',
                    value: 'b',
                    sortable: false,
                },
                {
                    text: '创建时间',
                    align: 'left',
                    value: 'c',
                    sortable: false,
                },
                {
                    text: '修改时间',
                    align: 'left',
                    value: 'd',
                    sortable: false,
                },
                {
                    align: 'center',
                    value: '',
                    sortable: false,
                },
            ],

            tdata: [{
                id: 1,
                b: '佣金协议',
                c: '2018-10-1',
                d: '2018-10-2'
            }]
        }
    }
});
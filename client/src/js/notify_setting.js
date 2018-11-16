import Vue from './base';
import {
    mixinExt
} from './mixin';

new Vue({
    el: '#app',

    mixins: [mixinExt],

    created() {
        let that = this;

        that.$api.message.get().then((res) => {
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

            that.$api.message.add(that.addItem).then((res) => {
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

            that.$api.message.edt(that.addItem).then((res) => {
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

            that.$api.message.del({
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
                that.addItem.type = null;
                that.addItem.content = '';

                that.showAdd = false;

            } else if (type == 'edit') {
                that.editItem.id = null;
                that.editItem.type = null;
                that.editItem.content = '';

                that.showEdit = false;
            }
        },

        //修改
        showEditDialog(item) {
            let that = this,
                data = JSON.parse(JSON.stringify(item));

            that.editItem.id = data.id;
            that.editItem.title = data.title;
            that.editItem.content = data.content;

            that.showEdit = true;
        },

        setUse(item, flag) {
            let that = this;

            that.$api.message.setUse({
                data: item.id
            }).then((res) => {
                if (res.code == 0) {
                    that.$comp.toast({
                        text: res.msg,
                    });

                    if(flag){ //设置为true，其他的要设置未flase
                        item.status = 0;
                    }else{  //设置未flase
                        item.status = 1;

                        for(var i = 0; i < that.tdata.length; i++){
                            var citem = that.tdata[i];

                            if(citem.id != item.id && citem.type == item.type){
                                citem.type = 1;
                            }
                        }
                    }   

                } else {
                    that.$comp.toast({
                        text: res.msg || '设置失败，请重试.',
                        color: 'error'
                    });
                }
            }).catch((res) => {
                that.$comp.toast({
                    text: res.msg || '设置失败，请重试.',
                    color: 'error'
                });
            });
        }
    },

    data() {
        return {

            addItem: {
                type: '',
                content: ''
            },

            editItem: {
                id: null,
                type: '',
                content: ''
            },

            select: [{
                    id: 1,
                    text: '佣金变动消息'
                },
                {
                    id: 2,
                    text: '审核通过消息'
                },
                {
                    id: 3,
                    text: '审核不通过消息'
                }
            ],

            showAdd: false,
            showEdit: false,

            addValid: false,
            editValid: false,

            rules: [
                v => !!v || '消息类型不能为空.'
            ],

            theader: [{
                    text: '',
                    align: 'left',
                    value: 'a',
                    sortable: false,
                },
                {
                    text: '消息类型',
                    align: 'left',
                    value: 'b',
                    sortable: false,
                },
                {
                    text: '消息内容',
                    align: 'left',
                    value: 'c',
                    sortable: false,
                },
                {
                    align: 'center',
                    value: 'd',
                    sortable: false,
                },
            ],

            tdata: []
        }
    }
});
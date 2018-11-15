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

            selectID: 1,

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
            this.editItem = item;
            this.showEdit = true;
        },

        del(id) {
            let that = this;
            that.$api.privilege.del({
                data: id
            }).then((data) => {
                that.message.text = data.msg;
                that.message.color = 'success';
                that.message.show = true;
                setTimeout(function () {
                    window.location.reload();
                }, 2000)

            }).catch((data) => { //function(data){}
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
            }).then((data) => {
                that.showAdd = false;
                that.$comp.toast({
                    text: data.msg,
                });

                setTimeout(function () {
                    window.location.reload();
                }, 2000)
                // that.tdata.unshift(that.addItem);

            }).catch((data) => { //function(data){}
                // console.log('失败了')
                that.$comp.toast({
                    text: data.msg,
                    color: 'error',
                });
            });
        },

        editCommit() {
            let that = this;
            that.$api.privilege.edit({
                data: this.editItem
            }).then((data) => {
                // that.editItem.id = data.id;
                that.showEdit = false;
                that.$comp.toast({
                    text: data.msg,
                });
            }).catch((data) => { //function(data){}
                that.$comp.toast({
                    text: data.msg,
                    color: 'error',
                });
            });

            this.editItem;
        }
    }
})
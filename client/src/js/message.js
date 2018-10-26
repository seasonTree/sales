import Vue from './base';
import {
    mixinExt
} from './mixin';

new Vue({
    el: '#app',
    mixins: [mixinExt],

    created() {
        let that = this;

        that.$api.message.lst().then((res) => {
            that.tdata = res.data;
        }).catch((res) => {
            that.$comp.toast({
                text: '获取数据失败，请刷新后重试.',
                color: 'error'
            });
        });
    },

    methods: {
        showMessage(item) {

            let that = this,
                citem = JSON.parse(JSON.stringify(item));

            that.message.id = citem.id;
            that.message.title = citem.title;
            that.message.content = citem.content;

            that.message.show = true;

            that.$api.message.isRead({
                data: citem.id
            }).then((res) => {
                if(res.code == 0){
                    var mcount = that.global.messageCount;

                    that.global.messageCount = mcount-- < 0? 0: mcount --;

                    //标记已读
                    item.status = 1;
                }
            }).catch((res) => { });
        },

        delMessage(id, index) {
            let that = this;
            that.$api.message.delMessage({
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
        }
    },

    data() {
        return {

            message: {
                show: false,
                id: '',
                title: '',
                content: ''
            },

            theader: [
                // {
                //     text: 'id',
                //     align: 'left',
                //     value: 'id',
                //     sortable: false,
                // },
                {
                    text: '标题',
                    align: 'left',
                    value: 'title',
                    sortable: false,
                },
                {
                    text: '发送人',
                    align: 'left',
                    value: 'name',
                    sortable: false,
                },
                {
                    text: '发送时间',
                    align: 'left',
                    value: 'create_time',
                    sortable: false,
                },
                {
                    text: '',
                    align: 'left',
                    sortable: false,
                },
            ],
            tdata: [{}]
        };
    }
})
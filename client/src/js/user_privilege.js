import Vue from './base';
import mixin from './mixin';

new Vue({
    el: '#app',
    mixins: [mixin],

    created(){
        let that = this;
        // console.log(this);

        that.$api.privilege.get().then((data) =>{
                that.tdata = data.data;
                 that.tdata.unshift({parent_id:0,pri_name:'顶级权限',level:0});
                that.items = that.tdata.map(function (item) {
                     item.pri_name = new Array(item.level+1).join('------')+item.pri_name;
                    return item;
                });


        }).catch((data) =>{
            console.log('eeeeeeeeeeeee');
            console.log(data);
        });

    },

    data() {
        return {

            showAdd: false,
            showEdit: false,

            selectID: 1,
            // delID:null,

            items: null,

            theader: [
                {
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
            addItem:{},

            message: {
                show: false,
                text: '',
                time: 3000,
                color: 'success'
            },
        };
    },

    methods:{
        edit (item) {
            this.editItem = item;

            this.showEdit = true;
        },
        del(id){
            let that = this;
            that.$api.privilege.del({
                data: id
            }).then((data) => {
                that.message.text = data.message;
                that.message.color = 'success';
                that.message.show = true;
                setTimeout(function () {
                    window.location.reload();
                },2000)

            }).catch((data) =>{ //function(data){}
                that.message.text = data.message;
                that.message.color = 'error';
                that.message.show = true;
                // that.submitLoading = false;
            });
        },

        addCommit(){
            let that = this;
            that.$api.privilege.add({
                data: that.addItem
            }).then((res) => {

                // that.editItem.id = data.id;
                that.showAdd = false;
                that.message.text = res.message;
                that.message.color = 'success';
                that.message.show = true;

                // that.addItem.id = res.data.id


                setTimeout(function () {
                    window.location.reload();
                },2000)


                // that.tdata.unshift(that.addItem);

            }).catch((data) =>{ //function(data){}
                // console.log('失败了')

                that.message.text = data.message;
                that.message.color = 'error';
                that.message.show = true;
                that.submitLoading = false;
            });
        },

        editCommit(){
            let that = this;
            that.$api.privilege.edit({
                data: this.editItem
            }).then((data) => {
                // that.editItem.id = data.id;
                that.showEdit = false;
                that.message.text = data.message;
                that.message.color = 'success';
                that.message.show = true;
            }).catch((data) =>{ //function(data){}
                // console.log('失败了')

                that.message.text = data.message;
                that.message.color = 'error';
                that.message.show = true;
                that.submitLoading = false;
            });

            this.editItem;
        }
    }
})
import Vue from './base';
import * as privilege from "../api/privilege";

new Vue({
    el: '#app',

    created(){
        let that = this;

        that.$api.privilege.get().then((data) =>{
                that.tdata = data.data;
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

            editItem: {}
        };
    },

    methods:{
        edit (item) {
            this.editItem = item;

            this.showEdit = true;
        },



        editCommit(){
            //
            // let data = this.data.map(item){
            //     if(item){
            //         return '-----------' + item.item;
            //     }
            // }
            // let data = this.data.map(item){
            //     if(item){
            //         return '-----------' + item.item;
            //     }
            // }


            let that = this;
            that.$api.privilege.edit({
                data: this.editItem
            }).then((data) => {
                // that.editItem.id = data.id;
                that.showEdit = false;

                console.log(data)
            }).catch((data) =>{ //function(data){}
                console.log('失败了')
            });

            this.editItem;
        }
    }
})
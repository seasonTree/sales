import Vue from './base';
import {
    mixinExt
} from './mixin';

new Vue({
    el: '#app',
    mixins: [mixinExt],

    created(){
        let that = this;
        that.$api.user.get().then((data) =>{
            that.rolesAll = data.data;
            that.tdata = data.Userdata;
        }).catch((data) =>{
            console.log('eeeeeeeeeeeee');
            console.log(data);
        });

    },
    data() {
        return {

            show_pass: false,
            show_pass1: false,
            rolesAll:{},
            userAll:{},
            addData:{
                role_id:[],
            },
            editData:{
                role_id:[],
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
                    align: 'right',
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
    methods :{
        addCommit(){
            let that = this,
                data={};
           // console.log(that.addData);

            that.$api.user.add({
                data: that.addData
            }).then((res) => {

                that.showAdd = false;
                that.$comp.toast({
                    text: res.message,
                });
                if(res.error ==0){
                    setTimeout(function () {
                        window.location.reload();
                    },2000)
                }
            }).catch((data) =>{ //function(data){}
                that.$comp.toast({
                    text: data.message,
                    color:'error',
                });

            });
        },
        del(id){
            let that = this;
            that.$api.user.del({
                data: id
            }).then((data) => {

                that.$comp.toast({
                    text: data.message,
                });

                setTimeout(function () {
                    window.location.reload();
                },2000)

            }).catch((data) =>{ //function(data){}
                that.$comp.toast({
                    text: data.message,
                    color:'error',
                });
            });
        },
        edit (item) {
            item.role_id =item.role_id ? item.role_id.split(',').map(item =>{
                return parseInt(item, 10)
            }):null;
            this.editData = item;
            this.showEdit = true;
        },
        editCommit(){
            let that = this;
            that.$api.user.edit({
                data: that.editData
            }).then((data) => {

                that.showEdit = false;
                that.$comp.toast({
                    text: data.message,
                });
                setTimeout(function () {
                    window.location.reload();
                },2000)
            }).catch((data) =>{ //function(data){}
                that.$comp.toast({
                    text: data.message,
                    color:'error',
                });
            });

        },
    }
})
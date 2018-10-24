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
            addData:{
                role_id:[],
            },
            showAdd: false,

            theader: [{
                    text: 'ID',
                    align: 'left',
                    value: 'a',
                    sortable: false,
                },
                {
                    text: '登录名',
                    align: 'left',
                    value: 'b',
                    sortable: false,
                },
                {
                    text: '角色',
                    align: 'right',
                    value: 'c',
                    sortable: false,
                },
                {
                    text: '是否启用',
                    align: 'left',
                    value: 'd',
                    sortable: false,
                },
                {
                    text: '操作',
                    align: 'center',
                    value: 'e',
                    sortable: false,
                },
            ],
            tdata: [{
                a: '1',
                b: 'admin',
                c: '管理员',
                d: '是',
            }]
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

                // that.showAdd = false;
                console.log(res);
                // that.message.text = res.message;
                // that.message.color = 'success';
                // that.message.show = true;
                // setTimeout(function () {
                //     window.location.reload();
                // },2000)
            }).catch((data) =>{ //function(data){}

                that.message.text = data.message;
                that.message.color = 'error';
                that.message.show = true;
                that.submitLoading = false;
            });
        },
    }
})
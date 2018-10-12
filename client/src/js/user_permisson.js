import Vue from './base';

new Vue({
    el: '#app',

    created(){
        let that = this;

        that.$api.privilege.get().then((data) =>{
                that.tdata = data.data;

                console.log('(((((((((((((((');
                console.log(data.data);
        }).catch((data) =>{
            console.log('eeeeeeeeeeeee');
            console.log(data);
        });
    },

    data() {
        return {

            showAdd: false,

            items: ['页面1', '页面2'],

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
            tdata: []
        };
    }
})
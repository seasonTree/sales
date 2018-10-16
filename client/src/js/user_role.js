import Vue from './base';
new Vue({
    el: '#app',

    created(){
        let that = this;
        // console.log(this);

        that.$api.role.get().then((data) =>{
            that.tdata = data.data;
            that.priData = data.priData;
            // let j=0;
            // data.priData.forEach(function (v,i) {
            //
            //     if (v.level==0){
            //         v.child={};
            //         that.priData[j]=v;
            //
            //         j++;
            //     }
            //     // v.level==0 ? that.priData[i]=v: true;
            //
            //     // 1?that.priData.level=0:2;
            // });
            console.log(that.priData);



        }).catch((data) =>{
            console.log('eeeeeeeeeeeee');
            console.log(data);
        });

    },

    data() {
        return {
            showAdd: false,
            addItem:{},
            priData:[],
            items: ['页面1', '页面2'],

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
            tdata: [],
        }
    }
});
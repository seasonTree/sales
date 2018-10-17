import Vue from './base';
new Vue({
    el: '#app',

    created(){
        let that = this;
        // console.log(this);

        that.$api.role.get().then((data) =>{
            that.tdata = data.data;
            that.priData =that.getChildren(data.priData,1,true) ;

            console.log(data.priData);



        }).catch((data) =>{
            console.log('eeeeeeeeeeeee');
            console.log(data);
        });

    },

    data() {
        return {
            showAdd: false,
            prevData:[],
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
    },
    methods:{

        getChildren(obj,parent_id=0,isClear) {
            let that = this;
            isClear? that.prevData=[]:null;
            obj.forEach(function (value, index) {
                if(value.parent_id == parent_id){
                    that.prevData.push(value.id);
                    that.getChildren(obj,value.id,false);
                }
            })
            return that.prevData;
        },
    }
});


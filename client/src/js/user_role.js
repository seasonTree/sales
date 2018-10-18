import Vue from './base';
import Tree from '../compontent/Tree';
new Vue({
    el: '#app',

    components: {
        Tree
    },

    created(){
        let that = this;


        that.$api.role.get().then((data) =>{
            that.tdata = data.data;

            this.checkBoxData = data.priData;
            // that.addItem.checkBoxData =data.priData ;

            console.log(this.checkBoxData);


        }).catch((data) =>{
            console.log('eeeeeeeeeeeee');
            console.log(data);
        });

    },

    data() {
        return {
            showAdd: false,
            prevData:[],

            checkBoxData:[
                {
                    id: 1,
                    parentID: 0,
                    text: '节点1'
                },
                {
                    id: 2,
                    parentID: 0,
                    text: '节点2'
                },
                {
                    id: 3,
                    parentID: 1,
                    text: '节点3'
                },
                {
                    id: 4,
                    parentID: 1,
                    text: '节点44444'
                },
                {
                    id: 5,
                    parentID: 2,
                    text: '节点4'
                }

            ],

            addItem:{
                // checkBoxData:[],
            },

            selected: [],

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

        // getChildren(obj,parent_id=0,isClear) {
        //     let that = this;
        //     isClear? that.prevData=[]:null;
        //     obj.forEach(function (value, index) {
        //         if(value.parent_id == parent_id){
        //             that.prevData.push(value.id);
        //             that.getChildren(obj,value.id,false);
        //         }
        //     })
        //     return that.prevData;
        // },
    }
});


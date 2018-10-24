import Vue from './base';
import STree from '../compontent/stree/STree';
import mixin from './mixin';

new Vue({
    el: '#app',
    mixins: [mixin],

    components: {
        STree
    },

    created(){
        let that = this;


        that.$api.role.get().then((data) =>{
            that.tdata = data.data;
            this.checkBoxData = data.priData;



        }).catch((data) =>{
            console.log('eeeeeeeeeeeee');
            console.log(data);
        });

    },

    data() {
        return {
            showAdd: false,
            showEdit: false,
            prevData:[],
            addItem:{
                // checkBoxData:[],
            },
            editItem:{
                // checkBoxData:[],
            },
            checkBoxData:[],
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
            message: {
                show: false,
                text: '',
                time: 3000,
                color: 'success'
            },
        }
    },
    methods:{
        edit (item) {
            this.showEdit = true;
            let that = this;
            that.editItem.role_name = item.role_name;
            that.editItem.id = item.id;
            this.selected = item.pri_id.split(',');

        },
        addCommit(){
            let that = this,
                data={};
            data.role_name =that.addItem.role_name;
            data.selected =this.$refs.treeAdd.getSelect();

            that.$api.role.add({
                data: data
            }).then((res) => {
                // that.editItem.id = data.id;
                that.showAdd = false;
                that.message.text = res.message;
                that.message.color = 'success';
                that.message.show = true;
                setTimeout(function () {
                    window.location.reload();
                },2000)
            }).catch((data) =>{ //function(data){}

                that.message.text = data.message;
                that.message.color = 'error';
                that.message.show = true;
                that.submitLoading = false;
            });
        },
        editCommit(){
            let that = this,
                data={};
            data.role_name =that.editItem.role_name;
            data.id =that.editItem.id;
            data.selected =this.$refs.treeEdit.getSelect();
            that.$api.role.edit({
                data: data
            }).then((data) => {

                that.showEdit = false;
                that.message.text = data.message;
                that.message.color = 'success';
                that.message.show = true;
                setTimeout(function () {
                    window.location.reload();
                },2000)
            }).catch((data) =>{ //function(data){}
                // console.log('失败了')

                that.message.text = data.message;
                that.message.color = 'error';
                that.message.show = true;
                that.submitLoading = false;
            });

        },
        del(id){
            let that = this;
            that.$api.role.del({
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


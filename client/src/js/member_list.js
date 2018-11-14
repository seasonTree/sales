import Vue from './base';
import {
    mixinExt
} from './mixin';
import {
    getCurMonthDay
} from '../common/util'

new Vue({
    el: '#app',
    mixins: [mixinExt],
    created() {
        let that = this,
            dyMonth = getCurMonthDay();

        that.dateFm = dyMonth.monthDayStart;
        that.dateTo = dyMonth.monthDayCur;

        that.getReomteData();
        that.$api.user.get().then((data) =>{
            that.rolesAll = data.data;
        }).catch((data) =>{
            that.$comp.toast({
                text: '获取数据失败，请刷新后重试.',
                color: 'error'
            });
        });
    },

    data() {
        return {

            firstLoading: true,

            pager: {
                totalVisible: 7,
                count: 1,
                index: 1,
                size: 10
            },

            tableType: [{
                    text: '代理商',
                    value: 1
                },
                {
                    text: ' 个人代理商',
                    value: 3
                },
                {
                    text: ' 销售员',
                    value: 2
                },
            ],

            showAdd: false,
            addData:{
                role_id:[],
            },
            show_pass: false,
            show_pass1: false,
            rolesAll:{},
            currentDataType: 2,

            theader: [{
                    text: 'ID',
                    align: 'left',
                    value: 'id',
                    sortable: false,
                },
                {
                    text: 'UserName',
                    align: 'left',
                    value: 'username',
                    sortable: false,
                },
                {
                    text: 'First Name',
                    align: 'left',
                    value: 'first_name',
                    sortable: false,
                },
                {
                    text: 'Last Name',
                    align: 'left',
                    value: 'last_name',
                    sortable: false,
                },
                {
                    text: 'Phone',
                    align: 'left',
                    value: 'phone',
                    sortable: false,
                },
                {
                    text: 'Create Time',
                    align: 'left',
                    value: 'create_time',
                    sortable: false,
                },
                {
                    text: 'Status',
                    align: 'left',
                    value: 'status',
                    sortable: false,
                },
                {
                    align: 'center',
                    value: '',
                    sortable: false,
                },
            ],

            tableLoading: false,

            tdata: [],
        };
    },

    watch: {

        currentDataType: {
            handler(newValue, oldValue) {

                let that = this;
                if (this.firstLoading) {
                    return;
                }

                this.pager.index = 1;

                that.getReomteData();
            },
            immediate: true
        },
    },

    methods: {

        addCommit(){
            let that = this,
                data={};

            that.$api.user.addDls({
                data: that.addData
            }).then((res) => {

                that.showAdd = false;
                that.$comp.toast({
                    text: res.msg,
                });

            }).catch((data) =>{ //function(data){}
                that.$comp.toast({
                    text: data.msg,
                    color:'error',
                });

            });
        },
        changeStatus(id,status){
            let that = this,
                data={
                    'status':status,
                    'id':id,
                };
            that.$api.user.userStatus({
                data: data
            }).then((res) => {
                that.$comp.toast({
                    text: res.msg,
                });
                if(res.code ==0){
                    setTimeout(function () {
                        window.location.reload();
                    },2000)
                }
            }).catch((data) =>{ //function(data){}
                that.$comp.toast({
                    text: data.msg,
                    color:'error',
                });

            });

        },
        // changePage() {
        //     this.getReomteData();
        // },

        getReomteData() {
            let that = this;

            that.tableLoading = true;

            that.$api.user.getmemberlst({
                data: {
                    type: that.currentDataType,
                    pageSize: that.pager.size,
                    pageIndex: that.pager.index
                }
            }).then((res) => {
                if (res.code == 0) {
                    that.tdata = res.data.data;
                    that.pager.count = res.data.pageCount || 1;
                } else {
                    that.$comp.toast({
                        text: '获取失败，请重试.',
                        color: 'error'
                    })
                }

                //检测是不是第一次加载
                that.firstLoading && (that.firstLoading = false);

                that.tableLoading = false;
            }).catch((res) => {
                that.$comp.toast({
                    text: '获取失败，请重试.',
                    color: 'error'
                });

                that.tableLoading = false;

                //检测是不是第一次加载
                that.firstLoading && (that.firstLoading = false);
            });
        }
    }
});
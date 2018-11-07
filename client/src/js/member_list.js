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

            currentDataType: 2,

            dateFm: null,
            dateTo: null,
            menu: false,
            menu1: false,

            theader: [],

            tableLoading: false,

            transactionHead: [{
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
                    align: 'right',
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
                    align: 'right',
                    value: 'create_time',
                    sortable: false,
                }
            ],

            // registrationHead: [{
            //         text: 'Firt Name',
            //         align: 'left',
            //         value: 'firstName',
            //         sortable: false,
            //     },
            //     {
            //         text: 'Phone',
            //         align: 'left',
            //         value: 'phone',
            //         sortable: false,
            //     },
            //     {
            //         text: 'Ref. Code',
            //         align: 'left',
            //         value: 'referralCode',
            //         sortable: false,
            //     },
            //     {
            //         text: 'Date',
            //         align: 'left',
            //         value: 'created_at',
            //         sortable: false,
            //     }
            // ],

            tdata: [],

            dataTimer: null
        };
    },

    watch: {

        currentDataType: {
            handler(newValue, oldValue) {

                let that = this;
                that.theader = that.transactionHead;
                // if (newValue == 2) {
                //     that.theader = that.transactionHead;
                // } else if (newValue == 1) {
                //     that.theader = that.registrationHead;
                // }else if (newValue == 3) {
                //     that.theader = that.registrationHead;
                // }

                if(this.firstLoading){
                    return;
                }

                this.pager.index = 1;

                that.getReomteData();
            },
            immediate: true
        },

        // dateFm(newValue, oldValue) {
        //     if(this.firstLoading){
        //         return;
        //     }
        //
        //     this.getReomteData();
        // },
        //
        // dateTo(newValue, oldValue) {
        //     if(this.firstLoading){
        //         return;
        //     }
        //
        //     this.getReomteData();
        // },

        // 'pager.index'(){            
        //     this.getReomteData();
        // }
    },

    methods: {
        exportExcel() {

        },

        changePage(){
            this.getReomteData();
        },

        getReomteData() {
            let that = this;

            // 发送数据类型、
            // {
            //     data: {
            //         type: 0 | 1 , 0交易报告， 1注册历史
            //         dateFm: '开始时间'
            //         dateTo: '结束时间'
            //         pageSize: 每页显示多少页
            //         pageIndex: 当前页
            //     }
            // }

            //返回数据
            // {
            //     data: {
            //         list: [],
            //         pageIndex: 1,
            //         pageCount: 10
            //     },
            //     code: 0 | 其他数值
            //     msg: '消息'
            // }

            that.tableLoading = true;

            that.$api.user.getmemberlst({
                data: {
                    type: that.currentDataType,
                    // dateFm: that.dateFm,
                    // dateTo: that.dateTo,
                    pageSize: that.pager.size,
                    pageIndex: that.pager.index
                }
            }).then((res) => {
                if (res.code == 0) {
                    console.log(res);
                    that.tdata = res.data.data;
                    // that.pager.index = res.data.current_page;
                    that.pager.count = res.data.pageCount;
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
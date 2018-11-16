import Vue from "./base";
import { mixinExt } from "./mixin";

new Vue({
    el: "#app",
    mixins: [mixinExt],
    created() {
        let that = this;

        that.$api.user
            .getMemberRole()
            .then(res => {
                that.rolesAll = res.data;
            })
            .catch(res => {
                that.$comp.toast({
                    text: "获取数据失败，请刷新后重试.",
                    color: "error"
                });
            });

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

            tableType: [
                {
                    text: "经销商",
                    value: 1
                },
                {
                    text: "个人经销商",
                    value: 3
                },
                {
                    text: " 销售员",
                    value: 2
                }
            ],

            showAdd: false,
            showFreeze: false,

            addData: {
                role_id: []
            },

            show_pass: false,
            show_pass1: false,

            rolesAll: {},
            currentDataType: 2,

            freezeItem: {
                id: null,
                reason: '',
                orginItem: null
            },

            theader: [
                {
                    text: "ID",
                    align: "left",
                    value: "id",
                    sortable: false
                },
                {
                    text: "UserName",
                    align: "left",
                    value: "username",
                    sortable: false
                },
                {
                    text: "First Name",
                    align: "left",
                    value: "first_name",
                    sortable: false
                },
                {
                    text: "Last Name",
                    align: "left",
                    value: "last_name",
                    sortable: false
                },
                {
                    text: "Phone",
                    align: "left",
                    value: "phone",
                    sortable: false
                },
                {
                    text: "Create Time",
                    align: "left",
                    value: "create_time",
                    sortable: false
                },
                {
                    text: "Status",
                    align: "left",
                    value: "status",
                    sortable: false
                },
                {
                    align: "center",
                    value: "",
                    sortable: false
                }
            ],

            tableLoading: false,

            tdata: []
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
        }
    },

    methods: {
        addCommit() {
            let that = this;

            that.$api.user
                .addDls({
                    data: that.addData
                })
                .then(res => {
                    if (res.code == 0) {
                        that.$comp.toast({
                            text: res.msg || "新增成功."
                        });

                        that.getRemoteData();
                        that.closeDialog("add");
                    } else {
                        that.$comp.toast({
                            text: res.msg || "新增失败，请刷新后重试.",
                            color: "error"
                        });
                    }
                })
                .catch(res => {
                    //function(data){}
                    that.$comp.toast({
                        text: "新增失败，请刷新后重试.",
                        color: "error"
                    });
                });
        },

        showFreezeDialog(item) {
            let that = this;

            that.freezeItem.id = item.id;
            that.freezeItem.orginItem = item;
            that.showFreeze = true;
        },

        freeze() {
            let that = this;
            that.changeStatus(that.freezeItem.orginItem, that.freezeItem.id, 3, that.freezeItem.reason);
        },

        changeStatus(item, id, status, reason) {
            let that = this,
                data = {
                    status: status,
                    id: id,
                    reason: status == 3 ? reason : ""
                };

            that.$api.user
                .userStatus({
                    data: data
                })
                .then(res => {
                    if (res.code == 0) {
                        that.$comp.toast({
                            text: res.msg || "设置成功."
                        });

                        item.status = status;

                        if(status == 3){
                            that.closeDialog('freeze');
                        }
                    } else {
                        that.$comp.toast({
                            text: "设置失败，请重试.",
                            color: "error"
                        });
                    }
                })
                .catch(data => {
                    //function(data){}
                    that.$comp.toast({
                        text: "设置失败，请重试.",
                        color: "error"
                    });
                });
        },

        changePage() {
            this.getReomteData();
        },

        getReomteData() {
            let that = this;

            that.tableLoading = true;

            that.$api.user
                .getmemberlst({
                    type: that.currentDataType,
                    pageSize: that.pager.size,
                    pageIndex: that.pager.index
                })
                .then(res => {
                    if (res.code == 0) {
                        that.tdata = res.data.data;
                        that.pager.count = res.data.pageCount || 1;
                    } else {
                        that.$comp.toast({
                            text: "获取失败，请重试.",
                            color: "error"
                        });
                    }

                    //检测是不是第一次加载
                    that.firstLoading && (that.firstLoading = false);

                    that.tableLoading = false;
                })
                .catch(res => {
                    that.$comp.toast({
                        text: "获取失败，请重试.",
                        color: "error"
                    });

                    that.tableLoading = false;

                    //检测是不是第一次加载
                    that.firstLoading && (that.firstLoading = false);
                });
        },

        closeDialog(type) {
            let that = this;

            if (type == "add") {
                that.showAdd = false;
                that.$refs["addForm"].reset();
            } else if (type == "freeze") {
                that.showFreeze = false;
                that.freezeItem = {
                    id: null,
                    reason: '',
                    orginItem: null,
                };
            }
        }
    }
});

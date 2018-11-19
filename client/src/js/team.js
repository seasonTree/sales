import Vue from './base';
import {
    mixinExt
} from './mixin';
import uploadImage from '@compontent/uploadimage/UploadImage';

new Vue({
    el: '#app',
    mixins: [mixinExt],
    components: {
        uploadImage
    },

    created() {
        let that = this;

        that.$api.team.lst().then((res) => {
            let data = res.data,
                preItem = null;

            for (var i = 0; i < data.length; i++) {
                var item = data[i];

                if (preItem && preItem.phone == item.phone) {
                    preItem.hideBorder = true;
                    item.hidePre = true;
                }

                preItem = item;
            }

            that.tdata = data;
        }).catch((res) => {
            this.$comp.toast({
                text: '获取数据失败，请重试.',
                color: 'error'
            });
        });
    },

    methods: {
        showInvitation() {
            let that = this;

            that.$api.team.showQrCode().then((res) => {
                that.qr_code = res.data;
                that.showAdd = true;
            }).catch((res) => {
                this.$comp.toast({
                    text: '获取二维码失败，请重试.',
                    color: 'error'
                });
            });

        },

        CopyUrl(url) {
            let that = this;
            //复制链接
            var textToClipboard = url;

            var success = true;
            if (window.clipboardData) { // Internet Explorer
                window.clipboardData.setData("Text", textToClipboard);
            } else {
                // create a temporary element for the execCommand method
                var forExecElement = that.CreateElementForExecCommand(textToClipboard);

                /* Select the contents of the element
                    (the execCommand for 'copy' method works on the selection) */
                that.SelectContent(forExecElement);

                var supported = true;

                // UniversalXPConnect privilege is required for clipboard access in Firefox
                try {
                    if (window.netscape && netscape.security) {
                        netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
                    }

                    // Copy the selected content to the clipboard
                    // Works in Firefox and in Safari be:fore version 5
                    success = document.execCommand("copy", false, null);
                } catch (e) {
                    success = false;
                }

                // remove the temporary element
                document.body.removeChild(forExecElement);
            }

            if (success) {

                this.$comp.toast({
                    text: '复制成功.'
                });

            } else {
                this.$comp.toast({
                    text: '复制失败.',
                    color: 'error'
                });
            }
        },

        CreateElementForExecCommand(textToClipboard) {
            var forExecElement = document.createElement("div");
            // place outside the visible area
            forExecElement.style.position = "absolute";
            forExecElement.style.left = "-10000px";
            forExecElement.style.top = "-10000px";
            // write the necessary text into the element and append to the document
            forExecElement.textContent = textToClipboard;
            document.body.appendChild(forExecElement);
            // the contentEditable mode is necessary for the  execCommand method in Firefox
            forExecElement.contentEditable = true;

            return forExecElement;
        },

        SelectContent(element) {
            // first create a range
            var rangeToSelect = document.createRange();
            rangeToSelect.selectNodeContents(element);

            // select the contents
            var selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(rangeToSelect);
        },

        showEditSales(item, show) {
            let that = this;
            if (show) {
                that.$api.user.getOneUser({
                    data: item.id
                }).then((res) => {
                    if (res.code == 0) {
                        that.editSales = res.data;
                    } else {
                        that.$comp.toast({
                            text: res.msg || '获取数据失败，请重试.',
                            color: 'error'
                        });
                    }

                }).catch((res) => {
                    that.$comp.toast({
                        text: res.msg || '获取数据失败，请重试.',
                        color: 'error'
                    });
                });

                that.showEditDialog = true;
            } else {
                that.$refs['editSalesForm'].reset();
                that.showEditDialog = false;
            }
        },

        //提交修改销售的消息
        editSalesHandler() {
            let that = this;

            that.disabled.editSales = true;

            that.$api.user.insUserInfo({
                data: that.editSales
            }).then((res) => {
                if (res.code == 0) {

                    that.$comp.toast({
                        text: '修改成功, 请等待审核通过.',
                    });

                    that.$refs['editSalesForm'].reset();
                    that.showEditDialog = false;

                } else {
                    that.$comp.toast({
                        text: res.msg || '修改失败，请重试.',
                        color: 'error'
                    });
                }

                that.disabled.editSales = false;
            }).catch((res) => {
                that.$comp.toast({
                    text: res.msg || '修改失败，请重试.',
                    color: 'error'
                });

                that.disabled.editSales = false;
            });
        },
        changeStatus(item) {
            //启用和禁用
            let that = this;
            that.$api.team.changeStatus({
                data: {
                    id: item.id,
                    status: item.status
                }
            }).then((res) => {
                item.status = res.data.status
            }).catch((res) => {
                this.$comp.toast({
                    text: '操作失败，请重试.',
                    color: 'error'
                });
            });
        },
        showPasswordDialog(item) {
            //显示修改密码界面
            let that = this;
            that.changePassword.id = item.id;
            that.showEditPassword = true;
        },
        commitPassword() {
            //提交修改密码
            let that = this;

            that.changePassword.submitLoading = true;

            if (that.$refs.PassRef.validate()) {
                that.$api.user.resetPassword({
                    data: that.changePassword
                }).then((res) => {

                    if (res.code == 0) {
                        this.$comp.toast({
                            text: res.msg,
                        });

                        that.showEditPassword = false;
                        that.$refs['editSalesForm'].reset();

                    } else {
                        this.$comp.toast({
                            text: res.msg,
                            color: 'error'
                        });
                    }

                    that.changePassword.submitLoading = false;

                }).catch((res) => {
                    this.$comp.toast({
                        text: '修改失败,请重试.',
                        color: 'error'
                    });

                    this.changePassword.submitLoading = false;
                });
            }
        }
    },

    data() {
        return {

            showAdd: false,
            showEditDialog: false,
            showEditPassword: false,

            qr_code: {}, //邀请人信息

            editSales: {},

            disabled: {
                editSales: false
            },

            changePassword: {
                valid: false,
                show: false,
                passVis: false,
                passVis1: false,
                password: '',
                rePassword: '',
                submitLoading: false
            },

            theader: [{
                    text: '姓名',
                    align: 'left',
                    value: 'name',
                    sortable: false,
                },
                {
                    text: '电话',
                    align: 'left',
                    value: 'phone',
                    sortable: false,
                },
                {
                    text: '负责/关联渠道',
                    align: 'right',
                    value: 'c',
                    sortable: false,
                },
                {
                    text: '业绩目标',
                    align: 'left',
                    value: 'd',
                    sortable: false,
                },
                {
                    text: '医生目标',
                    align: 'left',
                    value: 'e',
                    sortable: false,
                },
                {
                    text: '设置',
                    align: 'left',
                    value: 'f',
                    sortable: false,
                },
                {
                    text: '操作',
                    align: 'center',
                    value: 'g',
                    sortable: false,
                },
            ],
            tdata: []
        };
    }
})
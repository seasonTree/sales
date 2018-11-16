import Vue from './base';
import {
    mixinExt
} from './mixin';

new Vue({
    el: '#app',
    mixins: [mixinExt],

    created() {
        let that = this;

        that.getData();
    },

    mounted() {
        let that = this;

        for (let i = 0; i < that.tdata.length; i++) {
            const item = that.tdata[i];
            that.$set(that.$refs.dTable.expanded, item.id, true)
        }
    },

    methods: {
        getData() {
            let that = this;

            that.$api.channel.get().then((res) => {
                that.tdata = res.data;

                setTimeout(() => {
                    that.calcWidth();
                }, 600);
            }).catch((res) => {
                that.$comp.toast({
                    text: '获取失败，请重试.',
                    color: 'error'
                })
            });
        },

        onTabelResize() {
            //这里执行速度快,第一次会报错
            try {
                this.calcWidth();
            } catch (error) {}
        },

        calcWidth() {

            try {
                let td1Width = this.$refs.td1.offsetWidth,
                    td2Width = this.$refs.td2.offsetWidth,
                    td3Width = this.$refs.td3.offsetWidth,
                    td4Width = this.$refs.td4.offsetWidth,
                    td5Width = this.$refs.td5.offsetWidth,
                    td6Width = this.$refs.td6.offsetWidth,
                    td7Width = this.$refs.td7.offsetWidth,
                    td8Width = this.$refs.td8.offsetWidth;

                this.subWidth.table['paddingLeft'] = td1Width + 'px';
                this.subWidth.td2.width = td2Width + 'px';
                this.subWidth.td3.width = td3Width + 'px';
                this.subWidth.td4.width = td4Width + 'px';
                this.subWidth.td5.width = td5Width + 'px';
                this.subWidth.td6.width = td6Width + 'px';
                this.subWidth.td7.width = td7Width + 'px';
                this.subWidth.td8.width = td8Width + 'px';
            } catch (error) {

            }
        },

        remove(item) {
            this.chips.splice(this.chips.indexOf(item), 1)
            this.chips = [...this.chips]
        },

        addChannel() {
            let that = this;

            that.disabled.addChannel = true;

            that.$api.channel.add({
                data: that.addItem
            }).then((res) => {
                if (res.code == 0) {
                    that.$comp.toast({
                        text: '新增成功.',
                    });

                    that.getData();

                    that.closeDialog('add');

                } else {
                    that.$comp.toast({
                        text: res.msg,
                        color: 'error'
                    })
                }

                that.disabled.addChannel = false;
            }).catch((res) => {
                that.$comp.toast({
                    text: '新增失败，请重试.',
                    color: 'error'
                })
            });
        },

        showSales(channel_id, channel_name) {

            let that = this;

            that.channel_id = channel_id;
            that.channel_name = channel_name;

            that.$api.channel.getSales({
                data: {
                    'channel_id': channel_id
                }
            }).then((res) => {
                that.saliesLists = res.data.sales;
                //绑定数据
                that.select = res.data.child;
                //选中的数据

                that.showAddSales = true;

            }).catch((res) => {
                that.$comp.toast({
                    text: '获取销售列表失败，请重试.',
                    color: 'error'
                })
            });
        },

        addSales() {

            let that = this;

            that.select.push(that.channel_name);
            that.select.push(that.channel_id);

            that.disabled.sales = true;

            that.$api.channel.addSales({
                data: that.select
            }).then((res) => {
                if (res.code == 0) {
                    that.$comp.toast({
                        text: '处理成功.',
                    });

                    that.getData();

                    that.closeDialog('salesAdd');

                } else {
                    that.$comp.toast({
                        text: res.msg,
                        color: 'error'
                    })
                }

                that.disabled.sales = false;

            }).catch((res) => {
                that.$comp.toast({
                    text: '新增失败，请重试.',
                    color: 'error'
                })
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
                alert('复制成功');
            } else {
                alert('复制失败');
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

        //修改当前渠道的状态
        changeStatus(item) {
            let that = this;

            that.$api.channel.changeStatus({
                data: {
                    id: item.id,
                    status: item.status
                }
            }).then((res) => {
                if (res.code == 0) {

                    let data = res.data;
                    item.status = data.status;

                    if (item.children && item.children.length) {
                        let children = item.children;

                        for (var i = 0; i < children.length; i++) {
                            var citem = children[i];
                            citem.status = data.status;
                        }
                    }

                    this.$comp.toast({
                        text: '设置成功',
                    });
                } else {
                    that.$comp.toast({
                        text: res.msg || '设置失败，请重试.',
                        color: 'error'
                    });
                }
            }).catch((res) => {
                that.$comp.toast({
                    text: res.msg || '设置失败，请重试.',
                    color: 'error'
                });
            });
        },

        //弹窗渠道修改界面
        showEditDig(item) {
            let that = this;

            that.$api.channel.getChannel({
                data: {
                    id: item.id,
                }
            }).then((res) => {
                if (res.code == 0) {
                    that.editItem = res.data;
                } else {
                    that.$comp.toast({
                        text: res.msg || '设置失败，请重试.',
                        color: 'error'
                    });
                }
            }).catch((res) => {
                that.$comp.toast({
                    text: res.msg || '设置失败，请重试.',
                    color: 'error'
                });
            });

            that.showEdit = true;
        },

        editChannel() {
            let that = this;

            that.disabled.editChannel = true;

            that.$api.channel.updateChannel({
                data: that.editItem
            }).then((res) => {
                if (res.code == 0) {
                    that.$comp.toast({
                        text: '修改成功.',
                    });

                    that.getData();

                    that.closeDialog('edit');
                } else {
                    that.$comp.toast({
                        text: res.msg || '设置失败，请重试.',
                        color: 'error'
                    });
                }

                that.disabled.editChannel = false;
            }).catch((res) => {
                that.$comp.toast({
                    text: res.msg || '设置失败，请重试.',
                    color: 'error'
                });

                that.disabled.sales = false;
            });
        },

        closeDialog(type) {
            let that = this;
            if (type == 'add') {
                that.showAdd = false;
                that.$refs['addChannelForm'].reset();
            } else if (type == 'edit') {
                that.showEdit = false;
                that.$refs['channelEditForm'].reset();
            } else if (type == 'salesAdd') {
                that.showAddSales = false;
                that.$refs['salesForm'].reset();
            }
        },
    },

    data() {
        return {

            select: [],

            disabled: {
                addChannel: false,
                editChannel: false,
                sales: false
            },

            channel_id: '',
            channel_name: '',
            achievement_type: [{
                    type: 1,
                    value: '叠加目标'
                },
                {
                    type: 2,
                    value: '分解目标'
                }
            ],

            subWidth: {
                table: {
                    paddingLeft: '0px',
                },
                td2: {
                    width: '0px'
                },
                td3: {
                    width: '0px'
                },
                td4: {
                    width: '0px'
                },
                td5: {
                    width: '0px'
                },
                td6: {
                    width: '0px'
                },
                td7: {
                    width: '0px'
                },
                td8: {
                    width: '0px'
                },
            },

            showAdd: false,
            showEdit: false,
            showAddSales: false,

            saliesLists: [

                {
                    username: '',
                    uid: ''
                },
            ],

            chips: [],

            addItem: {
                channel_name: '',
                channel_info: '',
                qr_code_info: '',
                type: '',
                chan_pfm_obj: '',
                chan_doc_num: ''
            },

            editItem: {
                channel_name: '',
                channel_info: '',
                qr_code_info: '',
                type: '',
                chan_pfm_obj: '',
                chan_doc_num: ''
            },

            theader: [{
                    align: 'left',
                    value: '',
                    sortable: false,
                },
                {
                    align: 'left',
                    value: 'channel_name',
                    sortable: false,
                },
                {
                    align: 'left',
                    value: '',
                    sortable: false,
                },
                {
                    align: 'left',
                    value: 'qr_code_info',
                    sortable: false,
                },
                {
                    align: 'left',
                    value: 'url_code',
                    sortable: false,
                },
                {
                    align: 'right',
                    value: 'chan_doc_num',
                    sortable: false,
                },
                {
                    align: 'right',
                    value: 'chan_pfm_obj',
                    sortable: false,
                },
                {
                    align: 'center',
                    value: '',
                    sortable: false,
                },
            ],

            tdata: []
        };
    }
})
import Vue from './base';
import {
    mixinExt
} from './mixin';

new Vue({
    el: '#app',
    mixins: [mixinExt],

    created() {
        let that = this;

        that.$api.team.lst().then((res) => {
            that.tdata = res.data;
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
                    text: '获取二维码，请重试.',
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
        }
    },


    data() {
        return {

            showAdd: false,

            qr_code: {}, //邀请人信息

            theader: [{
                    text: '姓名',
                    align: 'left',
                    value: 'a',
                    sortable: false,
                },
                {
                    text: '电话',
                    align: 'left',
                    value: 'b',
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
            ],
            tdata: []
        };
    }
})
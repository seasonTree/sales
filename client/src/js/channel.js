import Vue from './base';
import mixin from './mixin';

new Vue({
    el: '#app',
    mixins: [mixin],

    created() {
        let that = this;

        that.$api.channel.get().then((res) => {
            that.tdata = res.data;
        }).catch((res) => {
            console.log('eeeeeeeeeeeee');
            console.log(res);
        });
    },

    mounted() {
        let that = this;

        for (let i = 0; i < that.tdata.length; i += 1) {
            const item = that.tdata[i];
            that.$set(that.$refs.dTable.expanded, item.id, true)
        }

        setTimeout(() => {
            that.calcWidth();
        }, 500);
    },

    methods: {
        onTabelResize() {
            //这里执行速度快,第一次会报错
            try {
                this.calcWidth();
            } catch (error) {}
        },

        calcWidth() {

            let td1Width = this.$refs.td1.offsetWidth,
                td2Width = this.$refs.td2.offsetWidth,
                td3Width = this.$refs.td3.offsetWidth,
                td4Width = this.$refs.td4.offsetWidth,
                td5Width = this.$refs.td5.offsetWidth,
                td6Width = this.$refs.td6.offsetWidth,
                td7Width = this.$refs.td7.offsetWidth,
                td8Width = this.$refs.td8.offsetWidth;

            // this.subWidth.table['paddingLeft'] = this.subWidth.line['marginLeft'] = td1Width + 'px';
            this.subWidth.table['paddingLeft'] = td1Width + 'px';
            this.subWidth.td2.width = td2Width + 'px';
            this.subWidth.td3.width = td3Width + 'px';
            this.subWidth.td4.width = td4Width + 'px';
            this.subWidth.td5.width = td5Width + 'px';
            this.subWidth.td6.width = td6Width + 'px';
            this.subWidth.td7.width = td7Width + 'px';
            this.subWidth.td8.width = td8Width + 'px';

            // this.subWidth.line['width'] = (this.$refs.tr - td1Width) + 'px';

        },

        remove(item) {
            this.chips.splice(this.chips.indexOf(item), 1)
            this.chips = [...this.chips]
        },

        addChannel() {
            // alert('aaa');
            let that = this;

            that.submitLoading = true;

            that.$api.channel.add({
                data: that.addItem
            }).then((res) => {
                if (res.code == 0) {
                    that.message.text = res.msg;
                    that.message.color = 'success';
                    that.message.show = true;
                    // that.showAdd = false;
                    //重刷页面,后台负责跳转
                    setTimeout(() => {
                        window.location.reload();
                    }, 3000);
                } else {
                    that.message.text = res.msg;
                    that.message.color = 'error';
                    that.message.show = true;
                    that.submitLoading = false;
                }


            }).catch((res) => {
                console.log('***********')
            });

        },
        showSales(channel_id,channel_name){

        	let that = this;
        	that.$api.channel.getSales({
        		data:{'channel_id':channel_id}
        	}).then((res) => {
	            that.saliesLists = res.data.sales;
	            //绑定数据
	            that.select = res.data.child;
	            //选中的数据

	        }).catch((res) => {
	            console.log('eeeeeeeeeeeee');
	            console.log(res);
	        });
	        that.channel_id = channel_id;
	        that.channel_name = channel_name;
        	that.showAddSales = true;


        },

        addSales(){

        	let that = this;
        	that.select.push(that.channel_name);
        	that.select.push(that.channel_id);
        	that.$api.channel.addSales({
                data: that.select
            }).then((res) => {
                if (res.code == 0) {
                    that.message.text = res.msg;
                    that.message.color = 'success';
                    that.message.show = true;
                    // that.showAdd = false;
                    //重刷页面,后台负责跳转
                    setTimeout(() => {
                        window.location.reload();
                    }, 3000);
                } else {
                    that.message.text = res.msg;
                    that.message.color = 'error';
                    that.message.show = true;
                    // that.submitLoading = false;
                }


            }).catch((res) => {
                console.log('***********')
            });

        	// console.log(that.select);

        },

        CopyUrl(url) {
        	let that = this;
	        //复制链接
	        var textToClipboard = url;

	        var success = true;
	        if (window.clipboardData) { // Internet Explorer
	            window.clipboardData.setData ("Text", textToClipboard);
	        }
	        else {
	            // create a temporary element for the execCommand method
	            var forExecElement = that.CreateElementForExecCommand (textToClipboard);

	            /* Select the contents of the element
	                (the execCommand for 'copy' method works on the selection) */
	            that.SelectContent (forExecElement);

	            var supported = true;

	            // UniversalXPConnect privilege is required for clipboard access in Firefox
	            try {
	                if (window.netscape && netscape.security) {
	                    netscape.security.PrivilegeManager.enablePrivilege ("UniversalXPConnect");
	                }

	                // Copy the selected content to the clipboard
	                // Works in Firefox and in Safari be:fore version 5
	                success = document.execCommand ("copy", false, null);
	            }
	            catch (e) {
	                success = false;
	            }

	            // remove the temporary element
	            document.body.removeChild (forExecElement);
	        }

	        if (success) {
	            alert ('复制成功');
	        }
	        else {
	            alert ('复制失败');
	        }
	    },

	    CreateElementForExecCommand (textToClipboard) {
	        var forExecElement = document.createElement ("div");
	        // place outside the visible area
	        forExecElement.style.position = "absolute";
	        forExecElement.style.left = "-10000px";
	        forExecElement.style.top = "-10000px";
	        // write the necessary text into the element and append to the document
	        forExecElement.textContent = textToClipboard;
	        document.body.appendChild (forExecElement);
	        // the contentEditable mode is necessary for the  execCommand method in Firefox
	        forExecElement.contentEditable = true;

	        return forExecElement;
	    },

	    SelectContent (element) {
	        // first create a range
	        var rangeToSelect = document.createRange ();
	        rangeToSelect.selectNodeContents (element);

	        // select the contents
	        var selection = window.getSelection ();
	        selection.removeAllRanges ();
	        selection.addRange (rangeToSelect);
	    }
    },


    data() {
        return {
        	select:[

        	],

        	channel_id:'',
        	channel_name:'',

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
                // line: {
                //     marginLeft: '0px',
                //     width: '0px'
                // }
            },

            // infoWidth: {
            //     width: '0px'
            // },

            // qrcodeWidth: {
            //     width: '0px'
            // },

            // subRight: {
            //     width: '0px'
            // },

            // docWidth: {
            //     width: '0px'
            // },

            // achWidth: {
            //     width: '0px'
            // },

            // subUrlWidth: {
            //     width: '0px'
            // },

            // actWidth: {
            //     width: '0px'
            // },

            message: {
                show: false,
                text: '',
                time: 3000,
                color: 'success'
            },

            submitLoading: false,

            showAdd: false,
            showAddSales: false,
            showAddUser: false,

            show_pass: false,

            saliesLists:[

            	{
            		username: '',
            		uid:''
            	},


            ],

            chips: [],

            addItem: {
                channel_name: '',
                channel_info: '',
                qr_code_info: ''
            },

            // items: ['页面1', '页面2'],

            theader: [{
                    align: 'left',
                    // value: '',
                    sortable: false,
                },
                {
                    align: 'left',
                    value: 'channel_name',
                    sortable: false,
                },
                {
                    align: 'left',
                    // value: '',
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
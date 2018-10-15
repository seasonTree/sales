import Vue from './base';
new Vue({
    el: '#app',

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
        }, 100);
    },

    methods: {
        onTabelResize() {            
            //这里执行速度快,第一次会报错

            let that = this;

            setTimeout(() => {
                that.calcWidth();
            }, 100);

            // try {
            //     this.calcWidth();
            // } catch (error) {}
        },

        calcWidth() {
            var td1Width = this.$refs.td1.offsetWidth,
                td2Width = this.$refs.td2.offsetWidth,
                td3Width = this.$refs.td3.offsetWidth,
                td4Width = this.$refs.td4.offsetWidth,
                td5Width = this.$refs.td5.offsetWidth,
                left = td1Width;
                // right = td5Width;

            this.subUrlWidth['width'] = td2Width + 'px';
            this.docWidth['width'] = td3Width + 'px';
            this.achWidth['width'] = td4Width + 'px';
            this.actWidth['width'] = td5Width + 'px';
            this.subSytle['paddingLeft'] = left + 'px';
            // this.subSytle['paddingRight'] = right + 'px';
        },

        remove(item) {
            this.chips.splice(this.chips.indexOf(item), 1)
            this.chips = [...this.chips]
        },

        addChannel(){
        	// alert('aaa');
        	let that = this;

            that.submitLoading = true;

        	that.$api.channel.add({
        		data: that.addItem
        	}).then((res) =>{
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


        	}).catch((res) =>{
        		console.log('***********')
        	});

        }
    },

    data() {
        return {
            subSytle: {
                paddingLeft: '0px',
                // paddingRight: '-100px'
            },

            message: {
                show: false,
                text: '',
                time: 3000,
                color: 'success'
            },

            submitLoading: false,

            docWidth: {
                width: '0px'
            },

            achWidth: {
                width: '0px'
            },

            subUrlWidth: {
                width: '0px'
            },

            actWidth: {
                width: '0px'
            },

            showAdd: false,
            showAddSales: false,
            showAddUser: false,

            show_pass: false,

            saliesLists: [
                '大大',
                '小小'
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
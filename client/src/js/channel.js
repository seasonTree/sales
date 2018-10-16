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

            this.subWidth.table['paddingLeft'] = this.subWidth.line['marginLeft'] = td1Width + 'px';
            this.subWidth.td2.width = td2Width + 'px';
            this.subWidth.td3.width = td3Width + 'px';
            this.subWidth.td4.width = td4Width + 'px';
            this.subWidth.td5.width = td5Width + 'px';
            this.subWidth.td6.width = td6Width + 'px';
            this.subWidth.td7.width = td7Width + 'px';
            this.subWidth.td8.width = td8Width + 'px';
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

        }
    },

    data() {
        return {

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
                line: {
                    marginLeft: '0px'
                }
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
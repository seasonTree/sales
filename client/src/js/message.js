import Vue from './base';
import mixin from './mixin';

new Vue({
    el: '#app',
    mixins: [mixin],
    created() {
        let that = this;

        that.$api.message.lst().then((res) => {
            that.tdata = res.data;
        }).catch((res) => {
            console.log('eeeeeeeeeeeee');
            console.log(res);
        });
    },
    methods: {
    showMessage(list){

        let that = this;

        that.m_id = that.tdata[list].id;
        that.m_title = that.tdata[list].title;
        that.m_content = that.tdata[list].content;

        // console.log(that.m_content);

        that.$api.message.isRead({
            data:that.m_id
        }).then((res) => {
            // that.tdata = res.data;
            that.globalShowMessage(true, res.msg, 'success');
        }).catch((res) => {
            console.log('eeeeeeeeeeeee');
            console.log(res);
        });

        that.viewMessage = true;


        }
    },

    data() {
        return {

            viewMessage: false,

            m_id : '',
            m_title : '',
            m_content : '',

            theader: [{
                    text: 'id',
                    align: 'left',
                    value: 'a',
                    sortable: false,
                },
                {
                    text: '标题',
                    align: 'left',
                    value: 'b',
                    sortable: false,
                },
                {
                    text: '发送人',
                    align: 'left',
                    value: 'c',
                    sortable: false,
                },
                {
                    text: '发送时间',
                    align: 'left',
                    value: 'd',
                    sortable: false,
                },
                {
                    text: '',
                    align: 'left',
                    // value: '',
                    sortable: false,
                },
            ],
            tdata: [{
                // a: '123',
                // b: '111111',
                // c: '111111',
                // d: '111111',
                // e: '111111',
            }]
        };
    }
})
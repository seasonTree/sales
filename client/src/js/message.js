import Vue from './base';
new Vue({
    el: '#app',

    data() {
        return {

            viewMessage: false,

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
                a: '123',
                b: '111111',
                c: '111111',
                d: '111111',
                // e: '111111',
            }]
        };
    }
})
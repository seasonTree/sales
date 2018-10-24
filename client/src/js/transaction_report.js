import Vue from './base';
import mixin from './mixin';

new Vue({
    el: '#app',
    mixins: [mixin],

    data() {
        return {

            pageIdx: 1,

            theader: [{
                    text: 'Firt Name',
                    align: 'left',
                    value: 'a',
                    sortable: false,
                },
                {
                    text: 'Phone',
                    align: 'left',
                    value: 'b',
                    sortable: false,
                },
                {
                    text: 'Amount',
                    align: 'right',
                    value: 'c',
                    sortable: false,
                },
                {
                    text: 'Usage',
                    align: 'left',
                    value: 'd',
                    sortable: false,
                },
                {
                    text: 'Date',
                    align: 'left',
                    value: 'e',
                    sortable: false,
                },
            ],
            tdata: [{
                a: '123',
                b: '111111',
                c: '111111',
                d: '111111',
                e: '111111',
            }]
        };
    }
});
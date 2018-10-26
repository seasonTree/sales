import Vue from './base';
import {
    mixinExt
} from './mixin';

new Vue({
    el: '#app',
    mixins: [mixinExt],
    created(){
        let that = this;


        that.$api.transaction.get().then((data) =>{
            that.tdata = data.list.data;
            that.page = data.page;
            console.log(data.list);



        }).catch((data) =>{
            console.log('eeeeeeeeeeeee');
            console.log(data);
        });

    },
    data() {
        return {

            pageIdx: 1,
            page:{},

            theader: [{
                    text: 'Firt Name',
                    align: 'left',
                    value: 'firstName',
                    sortable: false,
                },
                {
                    text: 'Phone',
                    align: 'left',
                    value: 'phone',
                    sortable: false,
                },
                {
                    text: 'Amount',
                    align: 'right',
                    value: 'quantity * unitprice ',
                    sortable: false,
                },
                {
                    text: 'Usage',
                    align: 'left',
                    value: 'description',
                    sortable: false,
                },
                {
                    text: 'Date',
                    align: 'left',
                    value: 'created_at',
                    sortable: false,
                },
            ],
            tdata: []
        };
    }
});
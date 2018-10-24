import Vue from './base';
import mixin from './mixin';

new Vue({
    el: '#app',
    mixins: [mixin],

    methods: {
    showAddDig(){

        let that = this;

        that.$api.config.addSel().then((res) => {
            // that.tdata = res.data;
            that.items = res.data[0].select_name;
            that.item_child = res.data.child;
            
        }).catch((res) => {
            console.log('eeeeeeeeeeeee');
            console.log(res);
        });

        that.showAdd = true;


        }
    },

    data() {
        return {


            showAdd: false,

            items: '',

            item_child:[
                {
                 id:'',
                 select_name:''   
                }
            ],

            theader: [{
                    text: '',
                    align: 'left',
                    value: 'a',
                    sortable: false,
                },
                {
                    text: '消息类型',
                    align: 'left',
                    value: 'b',
                    sortable: false,
                },
                {
                    text: '消息内容',
                    align: 'left',
                    value: 'c',
                    sortable: false,
                },
                {
                    align: 'center',
                    value: 'd',
                    sortable: false,
                },
            ],

            tdata: [{
                a: 1,
                b: '佣金消息',
                c: '1322312321231223',
            }]
        }
    }
});
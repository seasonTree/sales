import Vue from './base_ext';
new Vue({
    el: '#app',

    created() {
        let that = this;

        that.$api.team.lst().then((res) => {
            that.tdata = res.data;
        }).catch((res) => {
            console.log('eeeeeeeeeeeee');
            console.log(res);
        });
    },


    data() {
        return {

            showAdd: false,
            show_pass: false,
            showEdit: false,

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
            tdata: [
            // {
            //         a: '王成',
            //         b: '187563245',
            //         c: '微信1(大众点评)',
            //         d: '50000',
            //         e: '10000',
            //     },

            //     {
            //         a: '',
            //         b: '',
            //         c: '微信1(大众点评)',
            //         d: '50000',
            //         e: '10000',
            //     },
            //     {
            //         a: '李成功',
            //         b: '1821503112',
            //         c: '医生合作',
            //         d: '50000',
            //         e: '10000',
            //     }
            ]
        };
    }
})
import Vue from './base';
new Vue({
            el: '#app',

            methods: {
                createPie() {}
            },

            data() {
                return {
                    dateFm: null,
                    dateTo: null,
                    menu: false,
                    menu1: false,

                    mounted() {

                        for (let i = 0; i < this.tdata.length; i += 1) {
                            const item = this.tdata[i];

                            // item['pie'] = (item['e'] / 100 * 72) + ' 100'

                            this.$set(this.$refs.dTable.expanded, item.a, true)
                        }
                    },

                    // methods:{
                    //     calcPiePer(value){
                    //         return (value / 100 * 72) + ' 100';
                    //     }
                    // },

                    month: ['1月', '2月', '3月', '4月', '5月', '6月',
                        '7月', '8月', '9月', '10月', '11月', '12月'
                    ],

                    theader: [{
                            text: '销售',
                            align: 'left',
                            value: 'a',
                            sortable: false,
                        },
                        {
                            text: '销售目标',
                            align: 'right',
                            value: 'b',
                            sortable: false,
                        },
                        {
                            text: '完成量',
                            align: 'right',
                            value: 'c',
                            sortable: true,
                        },
                        {
                            text: '未完成量',
                            align: 'right',
                            value: 'd',
                            sortable: true,
                        },
                        {
                            text: '完成比例',
                            align: 'center',
                            value: 'e',
                            sortable: true,
                        },
                        {
                            text: '医生量指标',
                            align: 'right',
                            value: 'f',
                            sortable: false,
                        },
                        {
                            text: '完成量',
                            align: 'right',
                            value: 'g',
                            sortable: false,
                        },
                        {
                            text: '未完成量',
                            align: 'right',
                            value: 'h',
                            sortable: false,
                        },
                        {
                            text: '%',
                            align: 'right',
                            value: 'i',
                            sortable: false,
                        },

                        {
                            text: '提成%',
                            align: 'right',
                            value: 'j',
                            sortable: false,
                        },

                        {
                            text: '提成$',
                            align: 'right',
                            value: 'k',
                            sortable: false,
                        },
                        {
                            text: '状态',
                            align: 'center',
                            value: 'l',
                            sortable: false,
                        },
                    ],

                    tdata: [{
                            a: '王成',
                            b: 5000,
                            c: 3751,
                            d: 1249,
                            e: 72,
                            f: 300,
                            g: 150,
                            h: 150,
                            i: 50,
                            j: 20,
                            k: 13500,
                            l: false,
                            pie: '44 100', //左边是62 * e的百分比, 笔的总宽度是62px

                            children: [{
                                    a: '李文',
                                    b: 136521566145,
                                    c: 12132,
                                    d: 1111,
                                    e: 1355454,
                                    f: 15,
                                    g: 1225,
                                    h: 123
                                },
                                {
                                    a: '李三',
                                    b: 1365215661,
                                    c: 12132,
                                    d: 1111,
                                    e: 1355454,
                                    f: 15,
                                    g: 1225,
                                    h: 123
                                }
                            ],

                            childTotal: {
                                a: 12132,
                                b: 1111,
                                c: 1355454,
                                d: 15,
                                e: 1225,
                                f: 1111
                            }
                        },
                        {
                            a: '王李',
                            b: 5000,
                            c: 3751,
                            d: 1249,
                            e: 72,
                            f: 300,
                            g: 150,
                            h: 150,
                            i: 50,
                            j: 20,
                            k: 13500,
                            l: true,
                            pie: '44 100', //左边是62 * e的百分比, 笔的总宽度是62px

                            children: [

                            ]
                        },
                    ]
                };
            }
        })
import Vue from './base';
        new Vue({
            el: '#app',

            mounted() {
                for (let i = 0; i < this.tdata.length; i += 1) {
                    const item = this.tdata[i];
                    this.$set(this.$refs.dTable.expanded, item.a, true)
                }

                var that = this;

                setTimeout(function () {
                    that.calcWidth();
                }, 100);
            },

            methods: {
                onTabelResize() {
                    this.calcWidth();
                },

                calcWidth() {
                    var td1Width = this.$refs.td1.offsetWidth,
                        td2Width = this.$refs.td2.offsetWidth,
                        td3Width = this.$refs.td3.offsetWidth,
                        td4Width = this.$refs.td4.offsetWidth,
                        td5Width = this.$refs.td5.offsetWidth,
                        left = td1Width,
                        right = td5Width;

                    this.subUrlWidth['width'] = td2Width + 'px';
                    this.docWidth['width'] = td3Width + 'px';
                    this.achWidth['width'] = td4Width + 'px';
                    this.subSytle['paddingLeft'] = left + 'px';
                    this.subSytle['paddingRight'] = right + 'px';
                },

                remove(item) {
                    this.chips.splice(this.chips.indexOf(item), 1)
                    this.chips = [...this.chips]
                }
            },

            data() {
                return {
                    subSytle: {
                        paddingLeft: '0px',
                        paddingRight: '0px'
                    },

                    docWidth: {
                        width: '0px'
                    },

                    achWidth: {
                        width: '0px'
                    },

                    subUrlWidth: {
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

                    // items: ['页面1', '页面2'],

                    theader: [{
                            align: 'left',
                            value: 'a',
                            sortable: false,
                        },
                        {
                            align: 'left',
                            value: 'b',
                            sortable: false,
                        },
                        {
                            align: 'left',
                            value: 'c',
                            sortable: false,
                        },
                        {
                            align: 'left',
                            value: 'd',
                            sortable: false,
                        },
                        {
                            align: 'left',
                            value: 'e',
                            sortable: false,
                        },
                        {
                            align: 'right',
                            value: 'f',
                            sortable: false,
                        },
                        {
                            align: 'right',
                            value: 'g',
                            sortable: false,
                        },
                        {
                            align: 'center',
                            value: 'h',
                            sortable: false,
                        },
                    ],

                    // tsubHead: [{
                    //         align: 'left',
                    //         value: 'a',
                    //         sortable: false,
                    //     },
                    //     {
                    //         align: 'left',
                    //         value: 'b',
                    //         sortable: false,
                    //     },
                    //     {
                    //         align: 'left',
                    //         value: 'c',
                    //         sortable: false,
                    //     },
                    //     {
                    //         align: 'left',
                    //         value: 'd',
                    //         sortable: false,
                    //     },
                    //     {
                    //         align: 'left',
                    //         value: 'e',
                    //         sortable: false,
                    //     },
                    //     {
                    //         align: 'right',
                    //         value: 'f',
                    //         sortable: false,
                    //     },
                    //     {
                    //         align: 'right',
                    //         value: 'g',
                    //         sortable: false,
                    //     },
                    //     {
                    //         align: 'center',
                    //         value: 'h',
                    //         sortable: false,
                    //     },

                    // ],

                    tdata: [{
                            a: '1',
                            a_1: '大众点评xxxxxxxxx',
                            b: '微信',
                            c: '',
                            d: '二维码信息 231312',
                            d_1: '全球领先 免费试用',
                            e: 'http://www.google.com',
                            f: '医生',
                            f_1: 1000,
                            g: '业绩',
                            g_1: 1000,
                            stop: false,

                            children: [{
                                    sub_id: 1,
                                    sub_name: '王成',
                                    url: 'http://www.google.com12312312',
                                    f: '医生',
                                    f_1: 1000,
                                    g: '业绩',
                                    g_1: 1000,
                                },
                                {
                                    sub_id: 2,
                                    sub_name: '王三',
                                    url: 'http://www.google.com12312312',
                                    f: '医生',
                                    f_1: 1000,
                                    g: '业绩',
                                    g_1: 1000,
                                }
                            ]
                        },
                        {
                            a: '2',
                            a_1: '大众点评xxxxxxxxx',
                            b: '微信',
                            c: '',
                            d: '二维码信息 231312',
                            d_1: '全球领先 免费试用',
                            e: 'http://www.google.com',
                            f: '医生',
                            f_1: 1000,
                            g: '业绩',
                            g_1: 1000,
                            stop: true,

                            children: [

                            ]
                        }
                    ]
                };
            }
        })
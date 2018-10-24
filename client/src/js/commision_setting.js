import Vue from './base';
import mixin from './mixin';

new Vue({
    el: '#app',
    mixins: [mixin],

    mounted() {
        for (let i = 0; i < this.tdata.length; i += 1) {
            const item = this.tdata[i];
            this.$set(this.$refs.dTable.expanded, item.a, false)
        }
    },

    methods: {
        addStep() {
            this.edit.step.push({
                a: 0,
                b: 0,
                c: 0
            });
        },

        remvoeStep(index) {
            this.edit.step.splice(index, 1);
        }
    },

    data() {
        return {

            showAdd: false,

            product: ['20G存储', '医生数量'],
            method: ['$', '￥', '%'],
            rule: ['按階计算', '取高计算'],

            edit: {
                item: {},
                step: [{
                    a: 10,
                    b: 10,
                    c: 30
                }],
            },

            theader: [{
                    text: '商品/服务',
                    align: 'left',
                    value: 'a',
                    sortable: false,
                },
                {
                    text: '奖励方法',
                    align: 'left',
                    value: 'b',
                    sortable: false,
                },
                {
                    text: '计算公式',
                    align: 'right',
                    value: 'c',
                    sortable: false,
                },
                {
                    text: '佣金阶梯',
                    align: 'center',
                    // value: 'd',
                    sortable: false,
                },
                {
                    text: '数值',
                    align: 'center',
                    // value: 'e',
                    sortable: false,
                },
                {
                    text: '',
                    align: 'center',
                    value: 'f',
                    sortable: false,
                },
            ],

            tdata: [{
                a: '20G存储',
                b: '%',
                c: '按階计算',
                children: [{
                    a: '100',
                    b: '200',
                    c: '5%'
                }, {
                    a: '200',
                    b: '300',
                    c: '5%'
                }, {
                    a: '400',
                    b: '500',
                    c: '5%'
                }],
                history: [{
                        a: '20G存储',
                        b: '%',
                        c: '按階计算',
                        children: [{
                            a: '100',
                            b: '200',
                            c: '5%'
                        }, {
                            a: '200',
                            b: '300',
                            c: '5%'
                        }, {
                            a: '400',
                            b: '500',
                            c: '5%'
                        }]
                    },
                    {
                        a: '20G存储',
                        b: '%',
                        c: '按階计算',
                        children: [{
                            a: '100',
                            b: '200',
                            c: '5%'
                        }, {
                            a: '200',
                            b: '300',
                            c: '5%'
                        }, {
                            a: '400',
                            b: '500',
                            c: '5%'
                        }],
                    }
                ],

            }]
        }
    }
})
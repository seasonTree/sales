import Vue from './base';
import {
    mixinExt
} from './mixin';

new Vue({
    el: '#app',
    mixins: [mixinExt],

    created() {
    },
    data: () => ({
            showAdd: false,
            showEdit: false,
            addTaxes: '',
            editTaxes: '',
            formData: [],
            headers: [
                {
                    text: '编号',
                    align: 'left',
                    value: 'id',
                    sortable: false,
                },
                {
                    text: '税率',
                    align: 'left',
                    value: 'taxes',
                    sortable: false,
                },
                {
                    text: '操作',
                    align: 'left',
                    value: 'operate',
                    sortable: false,
                },
            ]
        }),
    methods: {
        add() {
            let that = this;
            that.$api.financial.add({
                data: that.addTaxes,
            }).then((res) => {

            })
        },
        edit() {
            let that = this;
            that.showEdit = true;
        },
        del() {

        },
        closeDialog() {
            let that = this;
            that.showAdd = false;
        }
    }
});
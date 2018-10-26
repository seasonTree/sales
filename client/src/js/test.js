import Vue from './base';
import STree from '../compontent/stree/STree';

new Vue({
    el: '#app',

    components: {
        STree
    },

    methods:{
        aaa(){
            console.log(this.$refs.tree.getSelectItem());

            console.log(this.$refs.tree.getSelectItemAndParent())
        }
    },

    data() {
        return {
            data: [
                {
                    id: 1,
                    parentID: 0,
                    text: '节点1'
                },
                {
                    id: 2,
                    parentID: 0,
                    text: '节点2'
                },
                {
                    id: 3,
                    parentID: 1,
                    text: '节点3'
                },
                {
                    id: 4,
                    parentID: 1,
                    text: '节点44444'
                },
                {
                    id: 5,
                    parentID: 2,
                    text: '节点4'
                }
            ],

            selected: [1, 4]
        };
    }
})
import Vue from './base';
import Tree from './component/Tree'
new Vue({
    el: '#app',

    components: {
        Tree
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
                    parentID: 2,
                    text: '节点4'
                }
            ]
        };

        // treeData: {
        //     type: Array,
        //     default: []
        // },
        // idField: {
        //     type: String,
        //     required: true
        // },
        // valueFiled: {
        //     type: String,
        //     required: true
        // },
        // rootValue: [String, Number],
        // useCheck: {
        //     type: Boolean,
        //     default: false
        // },
        // handlerSelect: {
        //     type: Function
        // }
    }
})
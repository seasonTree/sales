<template>
    <ul class="tree-node">
        <li v-for="(item, index) in data" :key="index">
            <template v-if="data.children.length">
                <span>
                    <v-icon>chevron_right</v-icon>
                </span>
            </template>

            <span>
                <v-checkbox v-model="item['_checked']" @change="itemCheck(item)"></v-checkbox>
            </span>

            <span>
                {{ item[valueFiled] }}
            </span>

            <template v-if="data.children.length">
                <tree :treeData="data.children" 
                      :idField="idField" 
                      :valueFiled="valueFiled" 
                      :useCheck="useCheck" 
                      :handlerSelect="handlerSelect"></tree>
            </template>
        </li>

    </ul>
</template>

<script>
import { buildTree } from "../common/util";
export default {
    name: "tree",

    mounted() {
        //parent
        this.data = buildTree(this.treeData);

        this.$on("_select", (id, item) => {
            console.log(id, item);
        });
    },

    props: {
        treeData: {
            type: Array,
            default: []
        },
        idField: {
            type: String,
            required: true
        },
        valueFiled: {
            type: String,
            required: true
        },
        rootValue: [String, Number],
        useCheck: {
            type: Boolean,
            default: false
        },
        handlerSelect: {
            type: Function
        }
    },

    data() {
        return {
            data: [],
            open: false,
            checkList: {}
        };
    },

    methods: {
        toggle() {
            this.open = !this.open;
        },

        select(item) {},

        itemCheck(item) {
            if (item.children.length) {
                item.children.forEach(citem => {
                    citem["_checked"] = item["_checked"];
                });
            }
        }
    }
};
</script>

<style lang='less' scoped>
.tree-node {

}
</style>
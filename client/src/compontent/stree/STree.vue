<template>
    <dl class="tree-node">
        <dd v-for="(item, index) in data" :key="index" class="tree-item">

            <template v-if="item.children.length">
                <v-icon @click="toggle(index, item)" :class="{ 'active' :item['_open']}">chevron_right</v-icon>
            </template>

            <v-checkbox :label="item[valueFiled]" v-model="item['_checked']" @change="itemCheck(index, item)" :indeterminate="item['_rail']"></v-checkbox>

            <transition name="fade">
                <s-tree v-if="item.children.length && item['_open']" class="sub-tree-node" :tree-data="item.children" :id-field="idField" :parent-field="parentField" :value-filed="valueFiled" :root-node="rootParent" :parent-node="parent" :parent-item="item"></s-tree>
            </transition>
        </dd>

    </dl>
</template>

<script>
import { deepClone, buildTree } from "@common/util";
export default {
    name: "s-tree",

    mounted() {
        this.createTree();
    },

    props: {
        treeData: {
            type: Array,
            default: () => {
                return [];
            }
        },
        parentField: {
            type: String,
            required: true
        },
        idField: {
            type: String,
            required: true
        },
        valueFiled: {
            type: String,
            required: true
        },
        expend: {
            type: Boolean,
            default: false
        },
        rootValue: [String, Number],
        rootNode: {
            type: Object
        },
        parentNode: {
            type: Object
        },
        parentItem: {
            type: Object
        },
        initSelect: {
            type: Array,
            default: () => {
                return [];
            }
        }
    },

    data() {
        return {
            data: [],
            checkList: {},
            // select: {},
            // parentSelect: {},
            rootParent: null,
            parent: null
        };
    },

    watch: {
        treeData(newValue, oldValue) {
            this.createTree();
        },

        initSelect(newValue, oldValue) {
            var hasSelect = hasSelect || {}, //记录已经选中的，用于树递归向上的时候判断是否要选中
                railList = railList || {}; //横杆

            //使用快速索引表来处理选中的id
            this.initSelect.forEach(iimte => {
                hasSelect[iimte] = true;
            });

            var that = this;
            setTimeout(() => {
                that.updateSelect(
                    that.data,
                    that.rootValue,
                    hasSelect,
                    railList
                );
            }, 500);
        }
    },

    methods: {
        updateSelect(items, parentID, hasSelect, railList) {
            items.forEach(item => {
                //递归底部向上调用的
                //找到当前的id
                var cid = item[this.idField];

                if (item.children) {
                    this.updateSelect(item.children, cid, hasSelect, railList);
                }

                //设置选中
                this.setCheckOrRail(cid, parentID, item, hasSelect, railList);

                // //判断是否选中了，运行双！！转boolean
                // item["_checked"] = !!hasSelect[cid];

                // //运用递归底部向上走的原理，先记录底部选中，然后向上走的时候
                // //自动上第一个元素加横杆
                // //如果子也有横杆，父也要加横杆railList[cid]
                // if (!!hasSelect[cid] || !!railList[cid]) {
                //     //双叹号，不存在的时候转boolean
                //     //如果子为选择就显示横杆
                //     railList[parentID]
                //         ? railList[parentID]++
                //         : (railList[parentID] = 1);
                // }

                // //如果所有子的都选中了，则父类就选中
                // if (railList[cid] == item.children.length) {
                //     item["_checked"] = true;

                //     //设置当前id选中了
                //     hasSelect[cid] = true;
                // }

                // // //如果当前是选中了，并且select表没有数据，就保存
                // // if (hasSelect[cid] && !this.select[cid]) {
                // //     var sitem = JSON.parse(JSON.stringify(item));

                // //     //删除children
                // //     delete sitem.children;

                // //     this.select[cid] = sitem;
                // // }

                // //没有选中，但子类选中了就加横杆
                // //选中了，但是子类所有没有选中也加横
                // if (
                //     !!!hasSelect[cid] ||
                //     (!!hasSelect[cid] && railList[cid] != item.children.length)
                // ) {
                //     //没有选中就显示横杆
                //     //!!转boolean
                //     item["_rail"] = !!railList[cid];

                //     // if (!!railList[cid]) {
                //     //     var pitem = JSON.parse(JSON.stringify(item));

                //     //     //删除children
                //     //     delete pitem.children;

                //     //     //如果加了横杆，parentSelect也记录下
                //     //     this.parentSelect[cid] = pitem;
                //     // }
                // }
            });

            //批量更新树元素
            this.$forceUpdate();
        },

        setCheckOrRail(cid, parentID, item, hasSelect, railList) {
            //判断是否选中了，运行双！！转boolean
            item["_checked"] = !!hasSelect[cid];

            //运用递归底部向上走的原理，先记录底部选中，然后向上走的时候
            //自动上第一个元素加横杆
            //如果子也有横杆，父也要加横杆railList[cid]
            if (!!hasSelect[cid] || !!railList[cid]) {
                //双叹号，不存在的时候转boolean
                //如果子为选择就显示横杆
                railList[parentID]
                    ? railList[parentID]++
                    : (railList[parentID] = 1);
            }

            //判断是否展开
            item["_open"] = item["_open"] || this.expend;

            //如果所有子的都选中了，则父类就选中
            if (railList[cid] == item.children.length) {
                item["_checked"] = true;

                //设置当前id选中了
                hasSelect[cid] = true;
            }

            // //如果当前是选中了，并且select表没有数据，就保存
            // if (hasSelect[cid] && !this.select[cid]) {
            //     var sitem = JSON.parse(JSON.stringify(item));

            //     //删除children
            //     delete sitem.children;

            //     this.select[cid] = sitem;
            // }

            //没有选中，但子类选中了就加横杆
            //选中了，但是子类所有没有选中也加横杆
            if (
                !!!hasSelect[cid] ||
                (!!hasSelect[cid] && railList[cid] != item.children.length)
            ) {
                //没有选中就显示横杆
                //!!转boolean
                item["_rail"] = !!railList[cid];

                // if (!!railList[cid]) {
                //     var pitem = JSON.parse(JSON.stringify(item));

                //     //删除children
                //     delete pitem.children;

                //     //如果加了横杆，parentSelect也记录下
                //     this.parentSelect[cid] = pitem;
                // }
            }
        },

        createTree() {
            //如果是父组件就复制并生成树列表
            if (this.$parent.$options.name != "s-tree") {
                this.rootParent = this;

                var hasSelect = {}, //记录已经选中的，用于树递归向上的时候判断是否要选中
                    railList = {}; //横杆

                //使用快速索引表来处理选中的id
                this.initSelect.forEach(iimte => {
                    hasSelect[iimte] = true;
                });
                
                //构建树
                this.data = buildTree(
                    // deepClone(this.treeData),
                    JSON.parse(JSON.stringify(this.treeData)),
                    this.parentField,
                    this.idField,
                    this.rootValue,
                    (item, parentID) => {
                        //递归底部向上调用的
                        //找到当前的id
                        var cid = item[this.idField];

                        this.setCheckOrRail(cid, parentID, item, hasSelect, railList);
                    }
                );

                //总的父类记录已经选中的
                // this.$on("_select", items => {
                //     items.forEach(sitem => {
                //         var jitem = JSON.parse(JSON.stringify(sitem));
                //
                //         //删除children
                //         delete jitem.children;
                //
                //         this.select[jitem[this.idField]] = jitem["_checked"]
                //             ? jitem
                //             : null;
                //     });
                // });
            } else {
                //如果是子类型的自己使用已经转了的tree
                this.data = this.treeData;
            }

            //如果子类选中了，更新父类的状态
            this.$on("_update", (item, rail, check) => {
                item["_rail"] = !!rail;
                item["_checked"] = check;

                var pitem = JSON.parse(JSON.stringify(item));

                //删除children
                delete pitem.children;

                //如果父的选中了，添加
                // this.select[item[this.idField]] = item["_checked"]
                //     ? pitem
                //     : null;

                // if (rail) {
                //     this.parentSelect[pitem[this.idField]] = pitem;
                // } else {
                //     this.parentSelect[pitem[this.idField]] = null;
                // }

                //强制更新
                this.$forceUpdate();

                //通知父级更新
                this.noftifyParent(rail);
            });

            this.parent = this;
        },

        toggle(index, item) {
            item["_open"] = !item["_open"];
            this.$set(this.data, index, item);
        },

        //通知父类更新状态
        noftifyParent(rail) {
            if (this.parentNode) {
                let checkCount = 0,
                    hasOtherRail = false;

                this.treeData.forEach(citem => {
                    citem["_checked"] && checkCount++;
                    //检查其他的横杆
                    hasOtherRail =
                        hasOtherRail || citem["_checked"] || citem["_rail"];
                });

                let allChecked = this.treeData.length == checkCount;

                //检查其他的横杆和是否全部选中
                if (hasOtherRail && !allChecked) {
                    rail = true;
                } else if (!hasOtherRail && allChecked) {
                    rail = false;
                }

                this.parentNode.$emit(
                    "_update",
                    this.parentItem,
                    // rail || (checkCount > 0 && !allChecked),
                    rail,
                    allChecked
                );
            }
        },

        setAllChildren(parentItem, children, value, emitData) {
            children.forEach((citem, cindex) => {
                citem["_checked"] = value;
                citem["_rail"] = false;

                this.$set(parentItem.children, cindex, citem);

                emitData.push(citem);

                if (citem.children.length) {
                    this.setAllChildren(citem, citem.children, value, emitData);
                }
            });
        },

        //选中后更新相关的状态
        itemCheck(index, item) {
            let emitData = [];

            emitData.push(item);

            if (item.children.length) {
                // item.children.forEach((citem, cindex) => {
                //     citem["_checked"] = item["_checked"];
                //     citem["_rail"] = false;

                //     this.$set(item.children, cindex, citem);

                //     emitData.push(citem);
                // });

                this.setAllChildren(
                    item,
                    item.children,
                    item["_checked"],
                    emitData
                );
            }

            item["_rail"] = false;

            //强制更新
            this.$forceUpdate();

            //通知选中
            // if (this.rootNode) {
            //     this.rootNode.$emit("_select", emitData);
            // } else {
            //     this.$emit("_select", emitData);
            // }

            //通知父级更新
            this.noftifyParent();
        },

        //获取所有选择的
        genSelectItem(data, result) {
            // var result = result;

            data.forEach(item => {
                if (item["_checked"] || item["_rail"]) {
                    result.push(item);

                    if (item.children.length) {
                        this.genSelectItem(item.children, result);
                    }

                    delete item.children;
                    delete item["_open"];
                    delete item["_checked"];
                    delete item["_rail"];
                }
            });

            // var arr = [],
            //     obj = this.select;
            //
            // for (var i in obj) {
            //     if (obj[i]) {
            //         var item = JSON.parse(JSON.stringify(obj[i]));
            //
            //         delete item["_open"];
            //         delete item["_checked"];
            //         delete item["_rail"];
            //
            //         arr.push(item);
            //     }
            // }
            //
            // return arr;
        },

        //获取所有选择的和同时获取选择的父类
        getSelect() {
            let data = JSON.parse(JSON.stringify(this.data)),
                result = [];

            this.genSelectItem(data, result);

            // console.log("eeeeeeeeeeeeeeee");
            // console.log(result);

            return result;

            //     var hasInsert = {},
            //         arr = [],
            //         parr = [],
            //         obj = this.select,
            //         pobj = this.parentSelect;

            //     for (var i in obj) {
            //         if (obj[i]) {
            //             var item = JSON.parse(JSON.stringify(obj[i]));

            //             delete item["_open"];
            //             delete item["_checked"];
            //             delete item["_rail"];

            //             //主要处理重复
            //             hasInsert[i] = true;

            //             arr.push(item);
            //         }
            //     }

            //     for (var i in pobj) {
            //         if (pobj[i] && !hasInsert[i]) {
            //             //已经插入的不重复插入了
            //             var item = JSON.parse(JSON.stringify(pobj[i]));

            //             delete item["_open"];
            //             delete item["_checked"];
            //             delete item["_rail"];

            //             parr.push(item);
            //         }
            //     }

            //     return arr.concat(parr);
            // }
        }
    }
};
</script>

<style lang='less' scoped>
.tree-node,
.sub-tree-node {
    position: relative;

    .tree-item {
        position: relative;

        i {
            margin-right: 2px;
            vertical-align: inherit;
            transition: all 0.2s;
            &.active {
                transform: rotate(90deg);
            }

            &:hover {
                color: black;
                transform: scale(1.2);

                &.active {
                    transform: rotate(90deg);
                }
            }
        }

        & > div {
            display: inline-block;
        }

        .v-input--checkbox {
            margin-top: 0;
        }

        .v-messages {
            display: none !important;
        }
    }

    .sub-tree-node {
        padding-left: 46px;
        transition: all 0.2;
    }

    .fade-enter-active,
    .fade-leave-active {
        transform: none;
        opacity: 1;
        transition: all 0.4s;
    }
    .fade-enter,
    .fade-leave-to {
        transform: translateY(-100%);
        opacity: 0;
    }
}
</style>
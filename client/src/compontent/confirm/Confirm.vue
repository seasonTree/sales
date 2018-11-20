<template>
    <v-dialog v-model="visible" width="300">
        <v-card-title class="dialog-head blue-grey lighten-5">
            {{title}}
        </v-card-title>
        <v-card-text class="confirm-dialog-text">
            {{text}}
        </v-card-text>
        <v-card-actions class="dialog-foot blue-grey lighten-5">
            <v-spacer></v-spacer>
            <v-btn color="s-primary" @click="okHandler()">
                {{okBtnTex}}
            </v-btn>
            <v-btn color="primary" flat @click="cancelHandler()">
                {{cancelBtnText}}
            </v-btn>
        </v-card-actions>
    </v-dialog>
</template>

<script>
export default {
    name: "confirm",

    props: {
        title: {
            type: String,
            default: "标题"
        },

        text: {
            type: String,
            default: "确认吗?"
        },

        okBtnTex: {
            type: String,
            default: "确认"
        },

        cancelBtnText: {
            type: String,
            default: "取消"
        },

        ok: {
            type: Function,
            default: null
        },

        cancel: {
            type: Function,
            default: null
        },

        visible: {
            type: Boolean,
            default: false
        }
    },
    
    methods: {
        okHandler() {
            let that = this;
            that.ok && that.ok();

            //外部注入关闭方法，参考index.js文件
            that._close();
        },

        cancelHandler() {
            let that = this;
            that.cancel && that.cancel();

            //外部注入关闭方法，参考index.js文件
            that._close();
        }
    }
};
</script>
<style lang='less' scoped>
.confirm-dialog-text {
    background-color: white;
}
</style>
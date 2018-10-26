<template>
    <v-snackbar :color="color" v-model="visible" :timeout="timeout" :top="top" :left="left" :right="right" :bottom="bottom">
        {{ text }}
        <v-btn color="blue" flat @click="visible = false">
            关闭
        </v-btn>
    </v-snackbar>
</template>

<script>
export default {
    name: "toast",

    props: {
        text: {
            type: String,
            default: ""
        },
        color: {
            type: String,
            default: "success"
        },
        timeout: {
            type: Number,
            default: 3000
        },
        top: {
            type: Boolean,
            default: true
        },
        left: {
            type: Boolean,
            default: false
        },
        right: {
            type: Boolean,
            default: false
        },
        bottom: {
            type: Boolean,
            default: false
        },
        closeText: {
            type: String,
            default: '关闭'
        }
    },
    
    data() {
        return {
            visible: false
        };
    }
};
</script>
<style lang='less' scoped>
</style>
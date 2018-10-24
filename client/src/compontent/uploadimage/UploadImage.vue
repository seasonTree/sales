<template>
    <div class="upload-container" :style="style">
        <label :for="id" class="upload"></label>
        <input hidden :id="id" type="file" accept="image/*" />
        <div class="image-content">
            <div>
                <v-icon x-large>image</v-icon>
            </div>
            <div>
                {{content}}
            </div>
        </div>

        <!-- <div class="mask">
            <v-progress-circular size="50" color="info" indeterminate></v-progress-circular>
        </div> -->
    </div>

</template>

<script>
import { guid } from "@common/util";

// 依赖vuetify的图标

export default {
    name: "upload-image",

    props: {
        url: {
            type: String,
            default: ""
        },
        width: String,
        height: String,
        content: {
            type: String,
            default: "上传图片"
        }
    },

    mounted() {
        //宽度
        this.style.width = this.width ? this.width : this.style.width;
        //高度
        this.style.height = this.height ? this.height : this.style.height;
        //id
        this.id = guid(false).substr(0, 6);
    },

    data() {
        return {
            style: {
                width: "100%",
                height: "140px"
            },

            id: 0
        };
    },

    computed: {},

    methods: {
        handleUpload() {}
    }
};
</script>

<style lang='less' scoped>
.upload-container {
    position: relative;
    transition: all 0.2s;
    border: 4px dotted #efefef;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .mask,
    .upload {
        position: absolute;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }

    .upload {
        cursor: pointer;
        background-position: center center;
        background-size: contain;
        z-index: 100;
    }

    .mask {
        z-index: 100;
        background: rgba(255, 255, 255, 0.6);
    }

    // height: 100%;
    // line-height: 140px;
    // text-align: center;
    //
    // cursor: pointer;
    //
    &:hover .image-content {
        transition: all 0.2s;
        cursor: pointer;
    }

    &:hover {
        // color: #5d5d5d;
        box-shadow: 4px 4px 5px #e3e3e3;
    }

    &:hover .image-content {
        transform: scale(1.12);
        // color: #5d5d5d;
        // box-shadow: 4px 4px 5px #e3e3e3;
    }
}
</style>
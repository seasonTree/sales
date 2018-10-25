<template>
    <div class="upload-container">
        <label :for="id" class="upload" :style="style"></label>
        <input hidden :id="id" type="file" @change="handleUpload($event)" capture="video" accept="image/jpe,image/jpeg,image/png" />
        <div class="image-content">
            <div>
                <v-icon x-large>image</v-icon>
            </div>
            <div>
                {{content}}
            </div>
        </div>

        <div class="mask" v-if="progress.show">
            <v-progress-circular class="s-up-progress" :rotate="-90" size="30" :width="5" :value="progress.value" color="info"></v-progress-circular>
        </div>
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
        errorTip: {
            type: String,
            default: "上传失败"
        },
        content: {
            type: String,
            default: "上传图片"
        },
        beforeUpload: {
            type: Function,
            default: null
        },
        afterUpload: {
            type: Function,
            default: null
        }
    },

    mounted() {
        // //宽度
        // this.style.width = this.width ? this.width : this.style.width;
        // //高度
        // this.style.height = this.height ? this.height : this.style.height;
        //id
        this.id = guid(false).substr(0, 6);

        //TODO 拖动上传
        
    },

    data() {
        return {
            id: 0,

            files: [],

            style: {
                backgroundImage: ""
            },

            progress: {
                show: false,
                value: 0
            }
        };
    },

    computed: {},

    methods: {
        handleUpload(evt) {
            if (this.url) {
                let that = this,
                    f = evt.target.files[0],
                    fr = new FileReader();

                that.beforeUpload && that.beforeUpload(f);

                //选择用readAsDataURL(),读取方式读取
                fr.readAsDataURL(f);
                //开始读取指定的Blob中的内容。一旦完成，result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容。
                //FileReader.onload 处理load事件。该事件在读取操作完成时触发
                fr.onload = function(evt) {
                    that.style.backgroundImage =
                        "url(" + evt.target.result + ")";
                };

                let form = new FormData(); // FormData 对象
                form.append("image", f); // 文件对象

                let xhr = new XMLHttpRequest(); // XMLHttpRequest 对象
                xhr.open("post", "/user/upload", true); //post方式，url为服务器请求地址，true 该参数规定请求是否异步处理。

                xhr.onload = res => {
                    //请求成功
                    this.progress.show = false;
                };
                xhr.onerror = res => {
                    //请求失败
                    this.$comp.toast({
                        text: that.errorTip,
                        color: "error"
                    });

                    that.style.backgroundImage = "";
                    this.progress.show = false;
                };

                xhr.upload.onprogress = res => {
                    //【上传进度调用方法实现】
                    this.progress.value = Math.round(
                        (evt.loaded / evt.total) * 100
                    );
                };

                //开始上传
                xhr.upload.onloadstart = () => {
                    this.progress.show = true;
                };

                xhr.send(form); //开始上传，发送form数据
            }
        }
    }
};
</script>

<style lang='less' scoped>
.upload-container {
    position: relative;
    transition: all 0.2s;
    border: 1px solid #efefef;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    overflow: hidden;

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
        background-size: 100% 100%;
        z-index: 100;
        transition: all 0.2s;
    }

    .s-up-progress {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .mask {
        z-index: 100;
        background: rgba(0, 0, 0, 0.4);
    }

    &:hover .image-content {
        transition: all 0.2s;
        cursor: pointer;
    }

    &:hover {
        box-shadow: 4px 4px 5px #e3e3e3;

        .upload {
            transform: scale(1.12);
        }
    }

    &:hover .image-content {
        transform: scale(1.12);
    }
}
</style>
<template>
    <div class="upload-container" :class="{ 'drop-hover': dragInContainer }" @dragenter.prevent.stop="dropEnter" @dragover.prevent.stop="dragOver" @dragleave.prevent.stop="dropLeave" @drop.prevent.stop="drop($event)">
        <label :for="id" class="upload" :style="style"></label>
        <input hidden :id="id" type="file" @change="handleUpload($event)" capture="video" :accept="accept" />
        <div class="image-content" v-show="contentShow">
            <div>
                <v-icon x-large>image</v-icon>
            </div>
            <div>
                {{content}}
            </div>
        </div>

        <div class="mask" v-if="progress.show">
            <v-progress-circular :indeterminate="progress.indeterminate" class="s-up-progress" :rotate="-90" size="30" :width="5" :value="progress.value" color="info"></v-progress-circular>
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
            default: "上传失败, 请重试。"
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
        },
        accept: {
            type: String,
            default: "image/jpe,image/jpeg,image/png"
        },
        notSendTip: {
            type: String,
            default: "不能上传不允许的图片类型"
        },
        imageUrl: {
            type: String,
            default: ""
        },
        dataField: {
            type: String,
            default: ""
        },
        uploadSize: {
            type: Number,
            default: 0
        },
        overUploadSizeText:{
            type: String,
            default: '超过上传限制的大小.'
        }
    },

    mounted() {
        //id
        // this.id = guid(false).substr(0, 6);

        if (this.dataField) {
            this.imageFiled = this.dataField.split(".");
        }
    },

    data() {
        return {
            id: guid(false).substr(0, 6),

            files: [],

            style: {
                backgroundImage: "",
                opacity: 0
            },

            progress: {
                show: false,
                value: 0,
                indeterminate: false //一直转圈
            },

            contentShow: false,

            imageFiled: [],

            dragInContainer: false
        };
    },

    watch: {
        "progress.show": {
            handler(newValue, oldValue) {
                let that = this;

                setTimeout(() => {
                    that.contentShow = !newValue;
                }, 300);
            },
            immediate: true
        },

        imageUrl: {
            handler(newValue, oldValue) {
                let that = this;

                if (newValue) {
                    that.progress.show = true;
                    that.progress.indeterminate = true;

                    let img = new Image();

                    // debugger;

                    img.onload = img.onerror = () => {
                        that.progress.show = false;
                        that.progress.indeterminate = false;

                        that.style.backgroundImage = "url(" + newValue + ")";
                        that.style.opacity = 1;
                    };

                    img.src = newValue;
                } else {
                    that.style.backgroundImage = "";
                    that.style.opacity = 1;
                }
            },
            //初始马上执行
            immediate: true
        }
    },

    methods: {
        dropEnter() {
            this.dragInContainer = true;
        },

        dragOver() {},

        dropLeave() {
            this.dragInContainer = false;
        },

        drop(evt) {
            //如果正在上传就忽略
            if (this.progress.show) {
                return;
            }

            this.dragInContainer = false;

            let file = evt.dataTransfer.files[0];

            this.handleUpload(evt, file);
        },

        handleUpload(evt, file) {
            let that = this,
                f = file || evt.target.files[0],
                type = f.type,
                acp = this.accept.split(","),
                isImg = false;

            if (that.uploadSize != 0 && f.size >= that.uploadSize) {
                that.$comp.toast({
                    text: that.overUploadSizeText,
                    color: "error"
                });

                return;
            }

            for (var i = 0; i < acp.length; i++) {
                var item = acp[i],
                    rex = new RegExp(item);

                if (rex.test(type)) {
                    isImg = true;
                    break;
                }
            }

            if (!isImg) {
                that.$comp.toast({
                    text: that.notSendTip,
                    color: "error"
                });

                return;
            }

            //如果before返回false的话就停止上传
            let afv = that.beforeUpload && that.beforeUpload(f);
            if (afv === false) {
                return;
            }

            if (that.url) {
                let fr = new FileReader();

                //选择用readAsDataURL(),读取方式读取
                fr.readAsDataURL(f);
                //开始读取指定的Blob中的内容。一旦完成，result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容。
                //FileReader.onload 处理load事件。该事件在读取操作完成时触发
                fr.onload = function(evt) {
                    that.style.backgroundImage =
                        "url(" + evt.target.result + ")";
                };

                let form = new FormData(), // FormData 对象
                    xhr = new XMLHttpRequest(); // XMLHttpRequest 对象


                form.append("image", f); // 文件对象
                xhr.open("post", that.url, true); //post方式，url为服务器请求地址，true 该参数规定请求是否异步处理。

                //连接上了
                xhr.onload = res => {
                    //请求成功
                    that.progress.show = false;

                    if (res.target.status != 200) {
                        that.$comp.toast({
                            text: that.errorTip,
                            color: "error"
                        });
                    }

                    var result = JSON.parse(res.target.responseText);

                    //如果有设置imageFile的话，就循环遍历找到url
                    if (that.imageFiled.length) {
                        let url = result;

                        for (var i = 0; i < that.imageFiled.length; i++) {
                            url = url[that.imageFiled[i]];
                        }

                        if (url) {
                            that.style.backgroundImage = "url(" + url + ")";
                        }
                    }

                    that.afterUpload && that.afterUpload(result);
                };

                //连接完毕,支持不怎么好
                xhr.onloadend = evt => {};

                //链接错误
                xhr.onerror = res => {
                    //请求失败
                    that.$comp.toast({
                        text: that.errorTip,
                        color: "error"
                    });

                    that.style.backgroundImage = "";
                    that.progress.show = false;
                };

                xhr.upload.onprogress = res => {
                    //【上传进度调用方法实现】
                    that.progress.value = Math.round(
                        (evt.loaded / evt.total) * 100
                    );
                };

                //开始上传
                xhr.upload.onloadstart = () => {
                    that.progress.show = true;
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
    border: 2px solid #efefef;
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
        transition: all 0.3s;
    }

    .s-up-progress {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .mask {
        z-index: 100;
        background: rgba(189, 186, 186, 0.3);
    }

    .image-content {
        transition: all 0.2s;
        cursor: pointer;
    }

    &:hover,
    &.drop-hover {
        box-shadow: 4px 4px 5px #e3e3e3;

        .upload {
            transform: scale(1.12);
        }
        .image-content {
            transform: scale(1.12);
        }
    }
}
</style>
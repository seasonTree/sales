const path = require('path');
const extractTextPlugin = require("extract-text-webpack-plugin");
const vueLoaderPlugin = require('vue-loader/lib/plugin');
// const htmlPlugin = require('html-webpack-plugin');
const fs = require('fs');
// 自动查找后缀文件
// const glob = require('glob');

//多线程打包, 使用 happypack@next
const happyPack = require('happypack');
const os = require('os');
const happyThreadPool = happyPack.ThreadPool({
    size: os.cpus().length
});

const outputPath = path.resolve(__dirname, '../dist');
const entryPath = path.resolve(__dirname, '../src/js');

const srcPath = path.resolve(__dirname, '../src');

// const nodeModulesPath = path.resolve(__dirname, '../../node_modules/');

const copyFile = require('copy-webpack-plugin');

//如果dist文件不存在就创建
try {
    fs.statSync(outputPath);
} catch (error) {
    fs.mkdirSync(outputPath);
}

//读取php配置
function loadGlobalConfig() {

    let filenamePath = path.resolve(__dirname, '../../config.json'),
        globalConfig = JSON.parse(fs.readFileSync(filenamePath, {
            encoding: 'utf-8'
        }));

    return globalConfig;

}

const globalCfg = loadGlobalConfig();
//这个publicPath只用于image， fonts
const publicPath = globalCfg.publicPath;

//移除dist生成的path
function rmGenFile(outputPath) {
    let files = fs.readdirSync(outputPath);

    files.forEach((item) => {
        if (item !== 'upload' && item != 'js' && item != 'image' && item != 'fonts') {
            var fpath = path.resolve(outputPath, item),
                fstat = fs.statSync(fpath);

            if (fstat.isDirectory()) {
                rmGenFile(fpath);
                fs.rmdirSync(fpath)
            } else {
                fs.unlinkSync(fpath);
            }
        }
    });
}

rmGenFile(outputPath);

//生成入文件
let entry = {};

function genEntey(entryPath, parent) {
    let files = fs.readdirSync(entryPath);

    files.forEach((item) => {
        var fpath = path.resolve(entryPath, item),
            fstat = fs.statSync(fpath);

        if (fstat.isDirectory()) {
            genEntey(fpath, parent + '/' + item)
        } else if (/\.js/.test(item)) {
            var key = parent ? parent + '/' + item.replace(/\.js$/, '') : item.replace(/\.js$/, '');

            entry[key] = path.resolve(entryPath, item);
        }
    });
}

genEntey(entryPath, '');

module.exports = {
    mode: 'production', //默认是生产环境

    performance: {
        hints: false
        // hints: "warning", // 枚举
        // maxAssetSize: 300000, // 整数类型（以字节为单位）
        // maxEntrypointSize: 500000, // 整数类型（以字节为单位）
        // assetFilter: function (assetFilename) {
        //     // 提供资源文件名的断言函数
        //     return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
        // }
    },

    entry: entry,
    output: {
        path: `${outputPath}`,
        filename: 'js/[name].js',
        // chunkFilename: 'js/chunks/[name][hash:4].js',
        chunkFilename: 'js/chunks/[name].js',
        publicPath: `${publicPath}/`,

        // publicPath: `${publicPath}`
    },

    externals: {
        'CKEDITOR': 'window.CKEDITOR'
    },

    resolve: {
        //一定要添加，不然无法找到文件
        extensions: ['.vue', '.js', '.less', '.css', '.json'],
        alias: {
            'vue': 'vue/dist/vue.js',
            '@css': path.resolve(srcPath, 'css'),
            // '@image': path.resolve(srcPath, 'image'),
            // '@fonts': path.resolve(srcPath, 'fonts'),
            '@common': path.resolve(srcPath, 'common'),
            '@compontent': path.resolve(srcPath, 'compontent'),
            '@pageCompontent': path.resolve(srcPath, 'page_compontent'),
        }
    },

    optimization: {
        splitChunks: {
            // chunks: 'all',
            // minChunks: 2,
            // name: 'vendor'

            cacheGroups: {
                // frame: {                    
                //     test: /[\\/]node_modules[\\/](vue|vuetify)[\\/]/,
                //     name: 'frame',
                //     chunks: 'all',
                //     minChunks: 1,
                //     priority: -10,
                //     minSize: 0
                // },

                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all',
                    minChunks: 1,
                    priority: -20,
                    minSize: 0
                },

                common: {
                    test: /[\\/]src[\\/]/,
                    name: 'common',
                    chunks: 'all',
                    minChunks: 2,
                    priority: -30,
                    minSize: 0,
                    reuseExistingChunk: true
                }
            },
        },

        runtimeChunk: {
            name: 'runtime'
        }
        // runtimeChunk: true
    },
    plugins: [

        new vueLoaderPlugin(),

        // new htmlPlugin({
        //     filename: '../template/index.html',
        //     template: './client/src/template/bb.html',
        //     chunks:['test', 'cc'],
        //     hash: true,
        //     inject: false
        // }),

        // new htmlPlugin({
        //     filename: `${manageOutPath}/index.html`,
        //     template: `${managePath}/index.html`,
        //     inject: 'body',
        // }),

        //不能写成common.css，打包的时候会缺少文件
        //https://github.com/lavas-project/lavas/issues/85
        new extractTextPlugin({
            filename: `css/[name].css`,
            allChunks: true
        }),

        new happyPack({ //多线程打包js
            id: 'happybabel',
            loaders: ['babel-loader?cacheDirectory=true?presets=es2015'],
            threadPool: happyThreadPool,
            // cache: true,
            verbose: true
        }),
        new happyPack({ //多线程打包css
            id: 'postcss',
            loaders: ["css-loader?-autoprefixer!postcss-loader"],
            threadPool: happyThreadPool,
            // cache: true,
            verbose: true
        }),
        new happyPack({ //多线程打包less
            id: 'postless',
            //https://segmentfault.com/q/1010000009157879，注意编译顺序
            loaders: ['css-loader?-autoprefixer!postcss-loader!less-loader'],
            threadPool: happyThreadPool,
            // cache: true,
            verbose: true
        }),

        //复制文件
        new copyFile([{ //image
                from: `${srcPath}/image`,
                to: `${outputPath}/image`,
                force: true,
            },
            { //font
                from: `${srcPath}/fonts`,
                to: `${outputPath}/fonts`,
                force: true,
            },

            //ckeditor
            {
                from: `${srcPath}/common/editor`,
                to: `${outputPath}/js/editor`,
                force: true,
            }

            // //tinymce
            // {
            //     from: `/${nodeModulesPath}/tinymce/skins/lightgray`,
            //     to: `${outputPath}/css/editor`,
            //     force: true,
            // },
        ])
    ],
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    extractCSS: true,
                    loaders: {
                        css: extractTextPlugin.extract({
                            use: ["happypack/loader?id=postcss"],
                            fallback: 'vue-style-loader',
                        }),
                        less: extractTextPlugin.extract({
                            use: ["happypack/loader?id=postless"],
                            fallback: 'vue-style-loader'
                        }),
                    }
                }
            },
            {
                test: /\.js$/,
                loader: 'happypack/loader?id=happybabel', //已经在.babelrc配置，这里配置的话多线程任务会出错
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: extractTextPlugin.extract({ //单独打包
                    fallback: "style-loader", //一定要加fallback
                    use: ["happypack/loader?id=postcss"]
                }),
            },
            {
                test: /\.less$/,
                use: extractTextPlugin.extract({ //单独打包
                    fallback: 'style-loader', //一定要加fallback
                    use: ["happypack/loader?id=postless"]
                }),
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: `image/[name].[hash:7].[ext]`,
                    publicPath: `${publicPath}`
                }
            },
            {
                test: /\.(woff2?|woff|eot|ttf|otf)(\?.*)?$/,

                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: `fonts/[name].[hash:7].[ext]`,
                    publicPath: `${publicPath}`
                }

                // loader: 'url-loader',
                // options: {
                //     limit: 10000,
                //     name: `client/fonts/[name].[hash:7].[ext]`,
                //     publicPath: '/fonts/'
                // }
            }
        ],
    }
}
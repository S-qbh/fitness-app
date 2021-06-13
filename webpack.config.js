/**
 * webpack配置文件
 * 
 */


// 导入npm获取路径的包
const path = require('path');
// 导入html打包的插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 导入 提取js中的代码的插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 将css文件进行压缩
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

//自动清除dist 
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// 导出
module.exports = {
    // 入口
    entry: {
        home: './src/js/home.js',
        login: './src/js/login.js'
    },

    // 出口
    output: {
        // 文件路径
        path: path.resolve(__dirname, 'dist'),
        // 文件名
        filename: './js/[name].js',
        // 设置静态资源请求的相对路径
        publicPath: './'
    },
    // 解释器
    module: {
        rules: [
            // 以什么格式的解释器解释文件
            {
                test: /\.css$/, use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: '../'
                    }
                }, 'css-loader']
            },
            // 适配less
            {
                test: /\.less$/, use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: '../'
                    }
                }, 'css-loader', 'less-loader']
            },
            // 适配css中的图片
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader',//只有一个参数时使用loader+字符串形式
                // 配置
                options: {
                    // 文件名 hash默认32位，可以设置长度
                    name: '[hash:10].[ext]',
                    // 小于20kb base64压缩 大于20kb不压缩
                    limit: 10 * 1024,
                    esModule: false,//以es6的模块进行打包
                    outputPath: 'img'
                }
            },
            // 适配html中的代码
            { test: /\.html$/, loader: 'html-loader' },
            // 字体图标
            {
                test: /\.(svg|ttf|eot|woff|woff2)$/, loader: 'file-loader',
                options: {
                    outputPath: 'fonts'
                }
            },
            // 打包ES6代码为ES5
            {
                test: /\.js$/,//匹配js文件
                loader: 'babel-loader',//编译ES6为ES5
                exclude: /node_modules/ //排除三方包中的ES6代码
            }

        ]
    },
    //插件
    plugins: [
        // 引入插件
        // 引入html-home
        new HtmlWebpackPlugin({
            template: "./src/page/home.html",
            filename: 'home.html',
            chunks: ['home']
        }),
        // 引入html-login
        new HtmlWebpackPlugin({
            template: "./src/page/login.html",
            filename: 'login.html',
            chunks: ['login']
        }),
        new MiniCssExtractPlugin({
            // 设置文件名及路径[name]跟随主模块的名字
            filename: 'css/[name].css'
        }),
        new OptimizeCssAssetsWebpackPlugin(),
        //plugin 添加
        new CleanWebpackPlugin()
    ],
    // 环境
    mode: 'development',



    // 开发服务器 配置【】
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'), // 启动服务器目录
        compress: true, // 启动gzip
        port: 8081,  // 端口  8080 80  8081 8082
        open: true, // 自动打开服务
        publicPath: '/', // 静态资源查找路径
        openPage: 'index.html', // 打开的页面
    },
    target: 'web', // 目标是浏览器
}
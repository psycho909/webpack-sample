//使用loader時不用require引入，只有在plugins時才需要使用require引入

const webpack=require('webpack')
//不用另行安裝,先引入path,用於引入絕對路徑
const path=require('path')
//不用另行安裝webpack已經包括了,使用於壓縮JS
const uglify = require('uglifyjs-webpack-plugin');
//打包HTML文件
const htmlPlugin=require('html-webpack-plugin');//先安裝
//引入extract-text-webpack-plugin可以把css分離出JS
const extractTextPlugin = require("extract-text-webpack-plugin");

//圖片路徑問題
//利用extract-text-webpack-plugin插件很輕鬆的就把CSS文件分離了出來，但是CSS路徑並不正確
//publicPath：是在webpack.config.js文件的output選項中，主要作用就是處理靜態文件路徑的。
var website={
    //注意，這裡的IP和端口，是你本機的ip或者是你devServer配置的IP和端口。
    //然後在output選項中引用這個對象的publicPath屬性。
    publicPath:'http://localhost:1717'
}
module.exports={
    //配置入口文件的地址，可以是單一入口，也可以是多入口
    entry:{
        //兩個入口
        //[name]:path路徑
        index:'./src/js/entry.js',
        vendors:['jquery']
    },
    //配置出口文件的地址，在webpack2.X版本後，支持多出口配置。
    output:{
        //打包的路徑位置
        path:path.resolve(__dirname,'dist'),
        //打包路徑的名稱
        //單個出口
        //filename:'bundle.js'
        //多個出口 [name].js 可產生 entry.js entry2.js
        filename:'js/[name].js'//,
        //publicPath:website.publicPath
    },
    //配置模塊，主要是解析CSS和圖片轉換壓縮等功能。
    module:{
        rules:[
            {
                test:/\.(jsx|js)/,
                use:{
                    loader:'babel-loader'
                },
                exclude:/node_modules/
            },
            {   
                //用於匹配處理文件的擴展名的表達式
                test:/\.(scss|sass|css)$/,
                //1.use:['style-loader','css-loader']
                //2-1.loader名稱,就是要使用的模塊名稱
                //2-2.loader:['style-loader','css-loader']
                //使用extractTextPlugin分離出css於JS中
                use: extractTextPlugin.extract({
                    use:[{
                        loader:'css-loader'
                    },{
                        loader:'postcss-loader'
                    },{
                        loader:'sass-loader',
                        options:{
                            options:{
                                outputStyle:'compressed'
                            }
                        }
                    }]
                })
            },{
                test:/\.(png|jpg|gif)/,
                use:[{
                    //使用url-loader
                    //只使用url-loader因為url-loader封裝了file-loader
                    //url-loader不依賴於file-loader，即使用url-loader時，只需要安裝url-loader即可，不需要安裝file-loader，因為url-loader內置了file-loader
                    loader:'url-loader',
                    options:{
                        //是把小於500000B的文件打成Base64的格式，寫入JS
                        limit:500000,
                        outputPath:'images/'
                    }
                }]
            },{
                //解决的问题就是在hmtl文件中引入<img>标签的问题。
                test:/\.(htm|html)$/i,
                use:['html-withimg-loader']
            },
            // {
            //     test:/\.scss$/,
            //     use:extractTextPlugin.extract({
            //         use:[{
            //             loader:'css-loader'
            //         },{
            //             loader:'sass-loader'
            //         }],
            //         fallback:'style-loader'
            //     })
            // }
        ]
    },
    //配置插件，根據你的需要配置不同功能的插件。
    plugins:[
        //會與devServer發生衝突,開發時會出錯
        //適用於生產時如: npm run build 時使用
        //new uglify(),
        new htmlPlugin({
            //對html文件進行壓縮
            minify:{
                //去掉屬性雙引號
                removeAttributeQuotes:false
            },
            inject:'body',
            chunks:['vendors','index'],
            //加入緩存效果
            hash:true,
            //打包html的模塊路徑和文件名稱
            template:'./src/index.html'
        }),
        //指分離出的路徑位置
       new extractTextPlugin('./css/index.css'),
       //引入jquery全局套件
       new webpack.ProvidePlugin({
           $:'jquery',
           jQuery:'jquery',
           Popper:['popper.js','default']
       }),
       new webpack.optimize.CommonsChunkPlugin({
           name:'vendors'
       })
    ],
    //配置開發服務功能
    devServer:{
        //設置基本目錄結構
        contentBase:path.resolve(__dirname,'dist'),
        //服務器位置
        host:'localhost',
        //服務端壓縮是否開放
        compress:true,
        //端口號
        port:1717
    }
}
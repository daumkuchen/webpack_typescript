const webpack = require('webpack');
const path = require('path');
const glob = require('glob');
const globule = require('globule');
const _ = require('lodash');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const CONFIG = {
    PROJECT: path.resolve(__dirname, '../'),
    PUBLIC: path.resolve(__dirname, '../public'),
    ASSETS: path.resolve(__dirname, '../public/assets'),
    SRC: path.resolve(__dirname, '../src'),
    BrowserSync: {
        proxy: 'localhost',
        port: 3000,
        notify: false,
        open: false
    }
};

// String.prototype.filename = function () {
//     return this.match('.+/(.+?)([\?#;].*)?$')[1];
// }
// let targets = _.filter(glob.sync(`${CONFIG.SRC}/pug/**/*.pug`), (item) => {
//     return !item.filename().match(/^_/)
// });
// let entries = {};
// targets.forEach(value => {
//     let re = new RegExp(`${CONFIG.SRC}/pug/`);
//     let key = value.replace(re, '');
//     entries[key] = value;
//     console.log('------------------------------')
//     console.log(key)
//     console.log(value.filename())
//     console.log('------------------------------')
//     console.log('')
// });

const convertExtensions = {
    pug: 'html'
};
const entries = {}
Object.keys(convertExtensions).forEach(from => {
    const to = convertExtensions[from];
    globule.find([`**/*.${from}`, `!**/_*.${from}`], {
        cwd: CONFIG.SRC + '/pug/'
    }).forEach(filename => {
        entries[filename.replace(new RegExp(`.${from}$`, 'i'), `.${to}`)] = path.join(CONFIG.SRC + '/pug/', filename);
    });
});

module.exports = env => {

    const PRODUCTION = JSON.stringify(process.env.NODE_ENV === 'production');

    // pug
    // --------------------------------------------------
    const pugBuildConfig = {
        context: CONFIG.SRC,
        entry: entries,
        output: {
            path: CONFIG.PUBLIC + '/',
            filename: '[name]'
        },
        module: {
            rules: [{
                test: /\.pug$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        // 'file-loader?name=[path][name].html',
                        // 'extract-loader',
                        'html-loader',
                        'pug-html-loader',
                        // 'apply-loader',
                        // 'pug-loader',
                    ]
                })
            }]
        },
        plugins: [
            new ExtractTextPlugin('[name]'),
            // new HtmlWebpackPlugin({
            //     template: CONFIG.SRC + '[name]',
            // }),
            new BrowserSyncPlugin({
                proxy: CONFIG.BrowserSync.proxy,
                port: CONFIG.BrowserSync.port,
                notify: CONFIG.BrowserSync.notify,
                open: CONFIG.BrowserSync.open,
                files: [
                    CONFIG.PROJECT + '/**/*.pug',
                    CONFIG.PROJECT + '/**/*.html',
                    CONFIG.PROJECT + '/**/*.php',
                    CONFIG.ASSETS  + '/**/*.sass',
                    CONFIG.ASSETS  + '/**/*.css',
                    CONFIG.ASSETS  + '/**/*.js'
                ]
            })
        ]
    }

    // sass
    // --------------------------------------------------
    const sassBuildConfig = {
        context: CONFIG.SRC,
        entry: [CONFIG.SRC + '/sass/index.sass'],
        output: {
            path: CONFIG.ASSETS + '/css',
            filename: 'bundle.css'
        },
        module: {
            rules: [{
                test: /\.sass$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            root: CONFIG.PROJECT,
                        }
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                                path: CONFIG.PROJECT + '/_config/postcss.config.js'
                            }
                        }
                    }, {
                        loader: 'sass-loader',
                        options: {
                            outputStyle: 'compressed',
                        }
                    }, ],
                })
            }, {
                test: /\.(jpg|jpeg|png|svg)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name(file) {
                            return file.replace(CONFIG.PROJECT, '').replace('/public/assets', '..');
                        },
                        emitFile: false
                    }
                }]
            }, {
                test: /\.(woff|woff2)$/,
                use: [{
                    loader: 'url-loader',
                }]
            }]
        },
        plugins: [
            new ExtractTextPlugin({
                filename: 'bundle.css',
                disable: false,
                allChunks: true
            })
        ]
    };

    // ts
    // --------------------------------------------------

    const tsBuildConfig = {
        context: CONFIG.SRC,
        entry: {
            main: './ts/index.ts'
        },
        output: {
            path: CONFIG.ASSETS + '/js/',
            filename: '[name].bundle.js'
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: 'ts-loader'
                }
            ]
        },
        optimization: {
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /node_modules/,
                        name: 'vendor',
                        chunks: 'initial',
                        enforce: true
                    }
                }
            }
        },
        resolve: {
            extensions: [
                '.ts'
            ]
        }
    }

    const tsStageBuildConfig = {
        context: CONFIG.SRC,
        entry: {
            stage: './ts/three/Stage.ts'
        },
        output: {
            path: CONFIG.ASSETS + '/js/',
            filename: 'stage.js'
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: 'ts-loader'
                }, 
                // {
                //     test: /\.(glsl|vs|fs|vert|frag)$/,
                //     include: CONFIG.SRC + '/js',
                //     use: [{
                //         loader: 'shader-loader',
                //     }]
                // },
                {
                    test: /\.(glsl|vs|fs|vert|frag)$/,
                    include: CONFIG.SRC + '/ts',
                    use: [
                        'raw-loader',{
                            loader: 'glslify-loader',
                            // options: {
                            //     transform: [
                            //         ['glslify-hex', { 'option-1': true, 'option-2': 42 }]
                            //     ]
                            // }
                        }
                    ]
                },
            ]
        },
        resolve: {
            extensions: [
                '.ts', '.js', '.glsl', '.vs', '.fs', '.vert', '.frag'
            ],
        }
    }

    // js
    // --------------------------------------------------

    // const jsBuildConfig = {
    //     context: CONFIG.SRC,
    //     entry: {
    //         main: './js/index.js'
    //     },
    //     output: {
    //         path: CONFIG.ASSETS + '/js',
    //         filename: '[name].bundle.js'
    //     },
    //     resolve: {
    //         alias: {
    //             'js': path.join(__dirname, '../src/js/'),
    //             'TweenLite': 'gsap/src/uncompressed/TweenLite',
    //         }
    //     },
    //     optimization: {
    //         splitChunks: {
    //             cacheGroups: {
    //                 vendor: {
    //                     test: /node_modules/,
    //                     name: 'vendor',
    //                     chunks: 'initial',
    //                     enforce: true
    //                 }
    //             }
    //         }
    //     },
    // }

    // const jsBuildConfig = {
    //     context: CONFIG.SRC,
    //     entry: {
    //         main: './js/index.js'
    //     },
    //     output: {
    //         path: CONFIG.ASSETS + '/js',
    //         filename: '[name].bundle.js'
    //     },
    //     resolve: {
    //         alias: {
    //             'js': path.join(__dirname, '../src/js/'),
    //             'TweenLite': 'gsap/src/uncompressed/TweenLite',
    //         }
    //     },
    //     module: {
    //         rules: [{
    //             test: /\.js$/,
    //             include: CONFIG.SRC + '/js',
    //             use: [{
    //                 loader: 'babel-loader',
    //                 options: {
    //                     presets: [
    //                         ['es2015', {
    //                             modules: false
    //                         }]
    //                     ]
    //                 }
    //             }]
    //         }, {
    //             test: /\.(png|jpg|gif)$/,
    //             use: [{
    //                 loader: 'url-loader',
    //                 options: {
    //                     // limit: 8192
    //                 }
    //             }]
    //         }]
    //     },
    //     optimization: {
    //         splitChunks: {
    //             cacheGroups: {
    //                 vendor: {
    //                     test: /node_modules/,
    //                     name: 'vendor',
    //                     chunks: 'initial',
    //                     enforce: true
    //                 }
    //             }
    //         }
    //     },
    //     plugins: [
    //         new webpack.ProvidePlugin({
    //             '$': 'jquery',
    //             'jquery': 'jquery',
    //             'window.jQuery': 'jquery',
    //             'jQuery': 'jquery',
    //             'TweenLite': 'gsap/src/uncompressed/TweenLite',
    //             'Promise': 'es6-promise',
    //         }),
    //         new webpack.DefinePlugin({
    //             'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    //             'process.env.TIME_STAMP': JSON.stringify(Date.now()),
    //             'PRODUCTION': PRODUCTION,
    //         }),
    //         new UglifyJsPlugin({
    //             sourceMap: !PRODUCTION,
    //             uglifyOptions: {
    //                 warnings: false
    //             }
    //         }),
    //         new webpack.optimize.OccurrenceOrderPlugin(),
    //         new webpack.optimize.AggressiveMergingPlugin()
    //     ],
    //     // devtool: PRODUCTION ? '' : 'source-map'
    // };

    // stage
    // --------------------------------------------------
    // const stageBuildConfig = {
    //     context: CONFIG.SRC,
    //     entry: {
    //         stage: './js/three/Stage.js'
    //     },
    //     output: {
    //         path: CONFIG.ASSETS + '/js/',
    //         filename: 'stage.js'
    //     },
    //     resolve: {
    //         alias: {
    //             'js': path.join(__dirname, '../src/js/'),
    //             'TweenLite': 'gsap/src/uncompressed/TweenLite',
    //         }
    //     },
    //     module: {
    //         rules: [
    //             {
    //                 test: /\.js$/,
    //                 include: CONFIG.SRC + '/js',
    //                 use: [{
    //                     loader: 'babel-loader',
    //                     options: {
    //                         presets: [
    //                             ['es2015', {
    //                                 modules: false
    //                             }]
    //                         ]
    //                     }
    //                 }]
    //             }, {
    //                 test: /\.(glsl|vs|fs|vert|frag)$/,
    //                 include: CONFIG.SRC + '/js',
    //                 use: [
    //                     'raw-loader',{
    //                         loader: 'glslify-loader',
    //                         // options: {
    //                         //     transform: [
    //                         //         ['glslify-hex', { 'option-1': true, 'option-2': 42 }]
    //                         //     ]
    //                         // }
    //                     }
    //                 ]
    //             },
    //             /*{
    //                 test: /\.(glsl|vs|fs|vert|frag)$/,
    //                 include: CONFIG.SRC + '/js',
    //                 use: [{
    //                     loader: 'shader-loader',
    //                 }]
    //             },*/
    //             {
    //                 test: /\.(png|jpg|gif)$/,
    //                 use: [{
    //                     loader: 'url-loader',
    //                     options: {
    //                         // limit: 8192
    //                     }
    //                 }]
    //             }
                
    //         ]
    //     },
    //     plugins: [
    //         new webpack.ProvidePlugin({
    //             'TweenLite': 'gsap/src/uncompressed/TweenLite',
    //         }),
    //         new UglifyJsPlugin({
    //             sourceMap: !PRODUCTION,
    //             uglifyOptions: {
    //                 warnings: false
    //             }
    //         }),
    //         new webpack.optimize.OccurrenceOrderPlugin(),
    //         new webpack.optimize.AggressiveMergingPlugin()
    //     ],
    //     // devtool: PRODUCTION ? '' : 'source-map'
    // };

    return [pugBuildConfig, sassBuildConfig, tsBuildConfig, /*jsBuildConfig,*/ /*stageBuildConfig,*/ tsStageBuildConfig ];
};
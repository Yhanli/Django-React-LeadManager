var path = require("path");
const cssRegex = /\.(css|scss)$/;
module.exports = {
    // plugins: [
    //     new CopyWebpackPlugin({
    //         patterns: [
    //             // relative path is from src
    //             { from: './favicon.ico' }, // <- your path to favicon
    //         ],})],
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "main.js",
        publicPath: "/frontend/static/public/"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                }
            },
            {
                test: /\.svg$/,
                use: 'file-loader'
            },

            {
                test: /\.module\.css$/,
                use: [
                    require.resolve('style-loader'),
                    {
                        loader: require.resolve('css-loader'),
                        options: {
                            importLoaders: 1,
                            modules: {
                                localIdentName: '[name]__[local]__[hash:base64:5]',
                            },
                            sourceMap: true,
                            localsConvention: 'camelCase' //to allow select dash name by the camelCase

                        }
                    }
                ],
                include: /\.module\.css$/
                // for the css module to work, need to rename the corresponding file to xxx.module.css
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
                exclude: /\.module\.css$/
            },
            {
                test: /\.(png|svg|jpg|gif|pdf|xml)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]'
                        }
                    }
                ]
            }
            // {
            //     loader: 'css-loader',
            //     options: {
            //         url: false
            //     }
            // }
        ]
    }
};
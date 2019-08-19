const path = require('path')
const webpack = require('webpack')

const config = {
    entry: path.join(__dirname, './public/group_scoop.js'),
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, './public')
    },
    resolve: {
        extensions: [".js"]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: { presets: ["env"] }
                }
            }
        ]
    },
    plugins: [
        new webpack.ProgressPlugin()
    ],
    devtool: 'source-map'
}

module.exports = config
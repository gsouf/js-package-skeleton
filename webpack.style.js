var ExtractTextPlugin = require("extract-text-webpack-plugin");

var libraryName = require("./package.json").name;
var outputFile = libraryName.toLowerCase();
var env = process.env.WEBPACK_ENV;
var IS_DEV = "prod"!== env;

var scssExtractProcessor;

if (!IS_DEV) {
    outputFile += '.min.css';
    scssExtractProcessor = "css?minimize!sass";
} else {
    outputFile += '.css';
    scssExtractProcessor = "css!sass";
}

module.exports = {
    entry: __dirname + '/src/stylesheets/base.scss',
    devtool:"source-map",
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract(scssExtractProcessor)

            }
        ]
    },
    output: {
        path: __dirname + '/build',
        filename: outputFile
    },
    plugins: [
        new ExtractTextPlugin(outputFile)
    ]
};
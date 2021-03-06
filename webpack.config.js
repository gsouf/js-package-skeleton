var webpack = require('webpack');
var path = require('path');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

var libraryName = require("./package.json").name;
var outputFile = libraryName.toLowerCase();
var env = process.env.WEBPACK_ENV;
var IS_DEV = "prod"!== env;

var plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"' + env + '"'
      }
    })
];

if (!IS_DEV) {
  plugins.push(new UglifyJsPlugin({
    minimize: true,
    sourceMap: true
  }));
  outputFile += '.min.js';
} else {
  outputFile += '.js';
}

var config = {
  entry: __dirname + '/src/javascripts/index.js',
  devtool: 'source-map',
  output: {
    path: __dirname + '/build',
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    loaders: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel',
        exclude: /(node_modules|bower_components)/
      }
    ]

  },

  resolve: {
    modules: [path.resolve('./src/javascripts')],
    extensions: ['.js']
  },
  plugins: plugins
};


if(process.env.WEBPACK_EXPORT_CSS){
    var exports = [config];
    exports.push(require('./webpack.style.js'));
    module.exports = exports;
}else{
    // Needs to be a single config (not an array of configs) when working with karma
    module.exports = config;
}

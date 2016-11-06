var webpackConfig = require('./webpack.config');
var path = require('path');

delete webpackConfig.entry;
delete webpackConfig.output;

webpackConfig.devtool = 'inline-source-map';

webpackConfig.resolve = {
    alias: {
        src: path.resolve(__dirname, 'src/javascripts')
    }
};


module.exports = function(config) {
    config.set({
        frameworks: ['jasmine'],
        browsers: ['PhantomJS'],
        logLevel: "ERROR",
        captureConsole: true,

        reporters: ['progress', 'coverage'],

        singleRun: process.env.IS_CI_RUN == 1,

        files: [
            // Includes other deps here. e.g: './node_modules/vue/dist/vue.js'
            './tests/spec/index.js'
        ],

        preprocessors: {
            './tests/spec/index.js': ['webpack', 'sourcemap']
        },

        webpack: webpackConfig,
        webpackMiddleware: {
            noInfo: true
        },

        coverageReporter: {
            dir : 'build/coverage/',
            reporters: [
                // reporters not supporting the `file` property
                { type: 'lcov', subdir: 'report-lcov' },
                { type: 'html', subdir: 'report-html' }
            ]
        }
    });
};

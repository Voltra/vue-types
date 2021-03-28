// Karma configuration
// Generated on Wed Oct 26 2016 17:54:27 GMT+0200 (CEST)

module.exports = (config) => {
  process.env.CHROME_BIN = require('puppeteer').executablePath()

  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    browsers: ['ChromeHeadless'],

    customLaunchers: {
      ChromeHeadlessCI: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '–disable-setuid-sandbox'],
      },
    },

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'karma-typescript'],

    plugins: ['karma-*'],

    // list of files / patterns to load in the browser
    files: ['src/**/*.ts', 'test/**/*.ts'],

    // list of files to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'src/**/*.ts': 'karma-typescript',
      'test/**/*.ts': 'karma-typescript',
    },

    karmaTypescriptConfig: {
      reports: process.env.CIRCLECI
        ? {
            lcovonly: {
              directory: 'coverage',
              subdirectory: () => '',
              filename: 'lcov.info',
            },
          }
        : {
            text: '',
          },
      compilerOptions: {
        target: 'ES2020',
        sourceMap: true,
        module: 'commonjs',
      },
      coverageOptions: {
        instrumentation: true,
      },
      bundlerOptions: {
        transforms: [require('karma-typescript-es6-transform')()],
        entrypoints: /\.test\.ts$/,
      },
      include: ['**/*.ts'],
      exclude: ['node_modules', 'examples/**/*.ts'],
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'karma-typescript'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    concurrency: Infinity,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    client: {
      captureConsole: false,
      jasmine: {
        random: false,
        timeoutInterval: 5000,
      },
    },
  })
}

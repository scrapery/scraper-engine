const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MergeJsonWebpackPlugin = require('merge-jsons-webpack-plugin');

const utils = require('./utils.js');

const getTsLoaderRule = env => {
  const rules = [
    { loader: 'cache-loader' },
    {
        loader: 'thread-loader',
        options: {
            // there should be 1 cpu for the fork-ts-checker-webpack-plugin
            workers: require('os').cpus().length - 1
        }
    },
    {
      loader: 'ts-loader',
      options: {
        transpileOnly: true,
        happyPackMode: true
      }
    }
  ];
  if (env === 'development') {
    rules.unshift({
      loader: 'react-hot-loader/webpack'
    });
  }
  return rules;
};

module.exports = options => ({
  cache: options.env !== 'production',
  resolve: {
    extensions: [
      '.js', '.jsx', '.ts', '.tsx', '.json'
    ],
    modules: ['node_modules'],
    alias: {
      app: utils.root('src/main/webapp/app/')
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: getTsLoaderRule(options.env),
        include: [utils.root('./src/main/webapp/app')],
        exclude: ['node_modules']
      },
      {
        test: /\.(jpe?g|png|gif|svg|woff2?|ttf|eot)$/i,
        loaders: ['file-loader?hash=sha512&digest=hex&name=content/[hash].[ext]']
      },
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        loader: 'source-map-loader'
      },
      {
        test: /\.tsx?$/,
        enforce: 'pre',
        loaders: 'tslint-loader',
        exclude: ['node_modules']
      }
    ]
  },
  stats: {
    children: false
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: `'${options.env}'`,
        BUILD_TIMESTAMP: `'${new Date().getTime()}'`,
        VERSION: `'${utils.parseVersion()}'`,
        DEBUG_INFO_ENABLED: options.env === 'development',
        // The root URL for API calls, ending with a '/' - for example: `"https://www.simlife.io:8081/myservice/"`.
        // If this URL is left empty (""), then it will be relative to the current context.
        // If you use an API server, in `prod` mode, you will need to enable CORS
        // (see the `simlife.cors` common Simlife property in the `application-*.yml` configurations)
        SERVER_API_URL: `''`
      }
    }),
    new ForkTsCheckerWebpackPlugin({ tslint: true }),
    new CopyWebpackPlugin([
      { from: './node_modules/swagger-ui/dist/css', to: 'swagger-ui/dist/css' },
      { from: './node_modules/swagger-ui/dist/lib', to: 'swagger-ui/dist/lib' },
      { from: './node_modules/swagger-ui/dist/swagger-ui.min.js', to: 'swagger-ui/dist/swagger-ui.min.js' },
      { from: './src/main/webapp//swagger-ui/', to: 'swagger-ui' },
      { from: './src/main/webapp/static/', to: 'content' },
      { from: './src/main/webapp/favicon.ico', to: 'favicon.ico' },
      { from: './src/main/webapp/manifest.webapp', to: 'manifest.webapp' },
      // simlife-needle-add-assets-to-webpack - Simlife will add/remove third-party resources in this array
      { from: './src/main/webapp/robots.txt', to: 'robots.txt' }
    ]),
    new HtmlWebpackPlugin({
      template: './src/main/webapp/index.html',
      chunksSortMode: 'dependency',
      inject: 'body'
    }),
    new MergeJsonWebpackPlugin({
        output: {
            groupBy: [
                    { pattern: "./src/main/webapp/i18n/en/*.json", fileName: "./i18n/en.json" },
                    { pattern: "./src/main/webapp/i18n/ar-ly/*.json", fileName: "./i18n/ar-ly.json" },
                    { pattern: "./src/main/webapp/i18n/hy/*.json", fileName: "./i18n/hy.json" },
                    { pattern: "./src/main/webapp/i18n/ca/*.json", fileName: "./i18n/ca.json" },
                    { pattern: "./src/main/webapp/i18n/zh-cn/*.json", fileName: "./i18n/zh-cn.json" },
                    { pattern: "./src/main/webapp/i18n/zh-tw/*.json", fileName: "./i18n/zh-tw.json" },
                    { pattern: "./src/main/webapp/i18n/cs/*.json", fileName: "./i18n/cs.json" },
                    { pattern: "./src/main/webapp/i18n/da/*.json", fileName: "./i18n/da.json" },
                    { pattern: "./src/main/webapp/i18n/nl/*.json", fileName: "./i18n/nl.json" },
                    { pattern: "./src/main/webapp/i18n/et/*.json", fileName: "./i18n/et.json" },
                    { pattern: "./src/main/webapp/i18n/fa/*.json", fileName: "./i18n/fa.json" },
                    { pattern: "./src/main/webapp/i18n/fr/*.json", fileName: "./i18n/fr.json" },
                    { pattern: "./src/main/webapp/i18n/gl/*.json", fileName: "./i18n/gl.json" },
                    { pattern: "./src/main/webapp/i18n/de/*.json", fileName: "./i18n/de.json" },
                    { pattern: "./src/main/webapp/i18n/el/*.json", fileName: "./i18n/el.json" },
                    { pattern: "./src/main/webapp/i18n/hi/*.json", fileName: "./i18n/hi.json" },
                    { pattern: "./src/main/webapp/i18n/hu/*.json", fileName: "./i18n/hu.json" },
                    { pattern: "./src/main/webapp/i18n/id/*.json", fileName: "./i18n/id.json" },
                    { pattern: "./src/main/webapp/i18n/it/*.json", fileName: "./i18n/it.json" },
                    { pattern: "./src/main/webapp/i18n/ja/*.json", fileName: "./i18n/ja.json" },
                    { pattern: "./src/main/webapp/i18n/ko/*.json", fileName: "./i18n/ko.json" },
                    { pattern: "./src/main/webapp/i18n/mr/*.json", fileName: "./i18n/mr.json" },
                    { pattern: "./src/main/webapp/i18n/pl/*.json", fileName: "./i18n/pl.json" },
                    { pattern: "./src/main/webapp/i18n/pt-br/*.json", fileName: "./i18n/pt-br.json" },
                    { pattern: "./src/main/webapp/i18n/pt-pt/*.json", fileName: "./i18n/pt-pt.json" },
                    { pattern: "./src/main/webapp/i18n/ro/*.json", fileName: "./i18n/ro.json" },
                    { pattern: "./src/main/webapp/i18n/ru/*.json", fileName: "./i18n/ru.json" },
                    { pattern: "./src/main/webapp/i18n/sk/*.json", fileName: "./i18n/sk.json" },
                    { pattern: "./src/main/webapp/i18n/sr/*.json", fileName: "./i18n/sr.json" },
                    { pattern: "./src/main/webapp/i18n/es/*.json", fileName: "./i18n/es.json" },
                    { pattern: "./src/main/webapp/i18n/sv/*.json", fileName: "./i18n/sv.json" },
                    { pattern: "./src/main/webapp/i18n/tr/*.json", fileName: "./i18n/tr.json" },
                    { pattern: "./src/main/webapp/i18n/ta/*.json", fileName: "./i18n/ta.json" },
                    { pattern: "./src/main/webapp/i18n/th/*.json", fileName: "./i18n/th.json" },
                    { pattern: "./src/main/webapp/i18n/ua/*.json", fileName: "./i18n/ua.json" },
                    { pattern: "./src/main/webapp/i18n/uz-lat/*.json", fileName: "./i18n/uz-lat.json" },
                    { pattern: "./src/main/webapp/i18n/vi/*.json", fileName: "./i18n/vi.json" }
                    // simlife-needle-i18n-language-webpack - Simlife will add/remove languages in this array
                ]
        }
    }),
  ]
});

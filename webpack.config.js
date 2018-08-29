const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
//const open = require('open');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const sourcePath =  './src';

const wpConfig = {
  mode: 'development',
  entry: {
    'app': [`${sourcePath}/app.js`],
    'content': `${sourcePath}/content.js`,
    'background': `${sourcePath}/background.js`,
    'injected': `${sourcePath}/injected.js`,
    //vendors: ['vue', 'vue-material'],
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].build.js',
  },

  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.common.js'
    },
    extensions: ['.js', '.vue'],
    // root: [
    //   // path.resolve(__dirname),
    //   path.resolve(sourcePath),
    // ]
  },

  watch: true,

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            //presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.html$/,
        loader: 'raw-loader',
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /\.sass$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              indentedSyntax: true
            }
          }
        ]
      }
      // {
      //   test: /\.scss$/,
      //   use: [
      //     "style-loader", // creates style nodes from JS strings
      //     "css-loader", // translates CSS into CommonJS
      //     "sass-loader" // compiles Sass to CSS, using Node Sass by default
      //   ]
      // }
      // {
      //   test: /\.sass$/,
      //   loaders: ['style-loader', 'css-loader?root=' + __dirname + sourcePath, 'sass-loader'],
      // },
      // {
      //   test: /\.css/,
      //   loaders: ['style-loader', 'css-loader?root=' + __dirname + sourcePath, 'css-loader'],
      // },
    ]
  },
  // vue: {
  //   loaders: {
  //     scss: 'style!css!sass'
  //   }
  // },
  plugins: [
    //new webpack.optimize.DedupePlugin(),
    new VueLoaderPlugin(),
    new CopyWebpackPlugin([
      {from: 'index.html', to: 'index.html'},
      {from: 'manifest.json', to: 'manifest.json'},
    ]),
    // new webpack.DefinePlugin({})
  ],
  // postcss: [ autoprefixer({ browsers: ['last 2 versions'] }) ],

  // sassLoader: {
  //   includePaths: [path.resolve(__dirname, sourcePath)]
  // },
};

module.exports = wpConfig;

'use strict';

const webpack = require('webpack');
const CleanPlugin = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = function(env, argv) {
  env = env || {};
  env.production = Boolean(env.production);

  return [getExtensionConfig(env)];
};

function getExtensionConfig(env) {
  const clean = ['dist'];

  const plugins = [
    new CleanPlugin(clean, { verbose: false }),
    new webpack.IgnorePlugin(/^spawn-sync$/)
  ];

  return {
    name: 'extension',
    entry: './src/extension.ts',
    mode: env.production ? 'production' : 'development',
    target: 'node',
    node: {
      __dirname: false
    },
    devtool: 'source-map',
    output: {
      libraryTarget: 'commonjs2',
      filename: 'extension.js',
      devtoolModuleFilenameTemplate: 'file:///[absolute-resource-path]'
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          cache: true,
          parallel: true,
          sourceMap: true,
          terserOptions: {
            ecma: 8,
            module: true
          }
        })
      ]
    },
    externals: {
      vscode: 'commonjs vscode'
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          enforce: 'pre',
          use: 'tslint-loader',
          exclude: /node_modules/
        },
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules|\.d\.ts$/
        }
      ]
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    plugins: plugins,
    stats: {
      all: false,
      assets: true,
      builtAt: true,
      env: true,
      errors: true,
      timings: true,
      warnings: true
    }
  };
}

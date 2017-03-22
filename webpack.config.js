const path = require('path');
const webpack = require('webpack');

const config =  {
  entry: {
    main: './app/index.js',
    vendor: ['express','twitter','lodash','winston','s3-streamlogger'] 
  },
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
  },
  plugins: [
          new webpack.optimize.CommonsChunkPlugin({
              name: 'vendor', // Specify the common bundle's name.
              minChunks: function (module) {
                 // this assumes your vendor imports exist in the node_modules directory
                 return module.context && module.context.indexOf('node_modules') !== -1;
              }
          }),
          //CommonChunksPlugin will now extract all the common modules from vendor and main bundles
          new webpack.optimize.CommonsChunkPlugin({ 
              name: 'manifest' //But since there are no more common modules between them we end up with just the runtime code included in the manifest file
          })
      ],
  module: {
    rules: [
      {test: /\.(js|jsx)$/, use: 'babel-loader'}
    ]
  }
};

module.exports = config;
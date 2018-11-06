const path = require('path');

module.exports = {
  entry: path.join(__dirname, '/scripts/Game.ts'),
  output: {
    filename: 'game.js',
    path: path.resolve('dist'),
    publicPath: 'dist'    
  },
  module: {
    rules: [
        {
            test: /\.tsx?$/,
            loader: 'ts-loader',
            exclude: /node_modules/,
        },
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
};
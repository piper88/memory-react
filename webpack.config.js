const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  test   : /\.jsx?$/,
 exclude: /(node_modules|bower_components)/,
 loader : 'babel',
 query  : {
   presets:[ 'react', 'es2015' ]
 },
};
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
 rules: [
    {
        test: /\.(png|jpg|gif|svg)$/i,
        use: [
            {
                loader: 'svg-url-loader',
                options: {
                    limit: 10000,
                },
            },
        ],
    },
],
};

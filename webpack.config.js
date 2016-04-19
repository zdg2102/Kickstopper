var path = require("path");

module.exports = {
  context: __dirname,
  entry: "./frontend/kickstopper.jsx",
  output: {
    path: path.join(__dirname, 'app', 'assets', 'javascripts'),
    filename: "bundle.js"
  },
  devtool: 'source-maps',
  resolve: {
    extensions: ["", ".js", ".jsx"]
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['react']
        }
      },
      {
        test: /\.node$/,
        loader: "node-loader"
      }
    ]
  }
};

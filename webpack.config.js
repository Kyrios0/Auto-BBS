var webpack = require("webpack");
var path = require("path");

var DEV = path.resolve(__dirname, "bbs\\app_bbs\\static\\js");
var OUTPUT = path.resolve(__dirname, "bbs\\app_bbs\\static\\js");

var config = {
  entry: DEV + "\\index.jsx",
  output: {
    path: OUTPUT,
    filename: "index.js"
  },
  module: {
    rules: [{
        include: DEV,
        loader: "babel-loader",
    }]
  }
};

module.exports = config;
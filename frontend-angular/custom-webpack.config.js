const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      $ENV: {
        API_BASEURL: JSON.stringify(process.env.API_BASEURL),
        API_PORT: JSON.stringify(process.env.API_PORT),
      }
    })
  ]
};

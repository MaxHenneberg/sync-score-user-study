const webpack = require('webpack')

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        MY_TEST_VAR: JSON.stringify(process.env.MY_TEST_VAR)
      }
    })
  ]
}

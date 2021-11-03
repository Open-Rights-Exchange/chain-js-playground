const path = require('path');
const { env } = require('process');






module.exports = (env, argv) => {

  var local_chainjs_alias = function() {
    if(env.use_local_chainjs_code_NOT_npm == 'true') {
      return {
        "@open-rights-exchange/chainjs": path.resolve(__dirname, "../chain-js/dist/src"), 
      }
    } else {
      return {}
    }
  }();

  return {entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [{
            loader:'ts-loader',
            options: {projectReferences: true}
          }],
        exclude: [
          /node_modules/
        ],
        
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
    alias: local_chainjs_alias,
    fallback: {
      "./package": false,
      "electron": false,
      "expect":false,
      "os": require.resolve("os-browserify/browser")
    },
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  target: ["node"],
  mode: 'development'
}
};

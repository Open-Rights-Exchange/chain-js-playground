const path = require('path');
const { env } = require('process');






module.exports = (env, argv) => {

  // This function creates an object which is then used in the webpack config 
  // when the env variable "use_local_chainjs_code_NOT_npm" is set, 
  // webpack will look to get it's source code from ../chain-js/dist/src
  // becasue ts-loader has options: {projectReferences: true} set, 
  // it will rebuild the chainjs source and output to  ../chain-js/dist/src before webpack creates the final bundle
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

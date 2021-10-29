const path = require('path');

module.exports = {
  entry: './src/index.ts',
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
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      "@open-rights-exchange/chainjs": path.resolve(__dirname, "../chain-js/dist/src"),
    },
    fallback: {
      "./package": false,
      "electron": false,
      "it": false,
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
};

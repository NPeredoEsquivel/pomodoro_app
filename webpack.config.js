module.exports = {
    mode: "development",
    watch: true,
    entry: "./src/index.tsx",
    output: {
      filename: "bundle.js",
      path: __dirname + "/dist"
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".json"]
    },
    devtool: "source-map",
    module: {
      rules: [
        { test: /\.scss$/, use: [ "style-loader", "css-loader", "sass-loader" ] }
      ]
    }
};
const path = require("path");

module.exports = {
    mode: "development",
    watch: true,
    entry: "./src/index.tsx",
    output: {
        filename: "bundle.js",

        path: path.resolve(__dirname, "/dist"),
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"],
        alias: {
            Components: path.resolve(__dirname, "src/components"),
            "@UI": path.resolve(__dirname, "src/UI/*"),
        },
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
        ],
    },
};

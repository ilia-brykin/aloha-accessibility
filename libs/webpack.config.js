const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const ESLintPlugin = require("eslint-webpack-plugin");


module.exports = (env, argv) => {
  const IS_DEVELOPMENT = argv.mode === "development";
  return {
    entry: "./src/main.js",
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "../plugin/devtool"),
    },
    devtool: IS_DEVELOPMENT ? "inline-source-map" : "source-map",
    plugins: [
      new HtmlWebpackPlugin({
        title: "Aloha. Accessibility.",
        template: "./public/index.html",
        filename: "panel.html",
        // Compress HTML
        minify: {
          removeComments: true, // Remove comments from HTML
          collapseWhitespace: true // Remove whitespace and newline
        }
      }),
      new VueLoaderPlugin(), // Plug in for parsing and converting. vue files
      new ESLintPlugin({}),
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ["babel-loader"],
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          type: "asset", // Automatically choose between exporting a data URI and sending a separate file
        },
        {
          test: /\.vue$/,
          use: ["vue-loader"],
        },
        {
          test: /\.pug$/,
          use: ["vue-pug-loader"],
        },
      ],
    },
    // https://webpack.docschina.org/guides/caching/
    // optimization: {
    //   // The deterministic option benefits long-term caching
    //   moduleIds: "deterministic",
    //   // use optimization.runtimeChunk  Option to split the runtime code into a separate chunk
    //   runtimeChunk: "single",
    //   splitChunks: {
    //     // Using the client's long-term caching mechanism, hit the cache to eliminate requests and reduce getting resources from the server,
    //     // At the same time, it can ensure that the client code and server code version are consistent. This can be done by
    //     // Use the cacheGroups option of the SplitChunksPlugin plug-in.
    //     cacheGroups: {
    //       vendor: {
    //         test: /[\\/]node_modules[\\/]/,
    //         name: "vendors",
    //         chunks: "all",
    //       },
    //     },
    //   },
    // },
  };
};

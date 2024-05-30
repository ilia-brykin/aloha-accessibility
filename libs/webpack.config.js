const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const ESLintPlugin = require("eslint-webpack-plugin");


function resolveAlias(mode)  {
  return {
    "aloha-vue": path.resolve(__dirname, "node_modules/aloha-vue"),
    axios: path.resolve(__dirname, "node_modules/axios"),
    fecha: path.resolve(__dirname, "node_modules/fecha"),
    "lodash-es": path.resolve(__dirname, "node_modules/lodash"),
    moment: path.resolve(__dirname, "node_modules/moment"),
    "vue-style-loader": path.resolve(__dirname, "node_modules/vue-style-loader"),
    "vue-upload-component":  path.resolve(__dirname, "node_modules/vue-upload-component"),
    vue: path.resolve(__dirname, mode === "development" ? "node_modules/vue/dist/vue.esm-bundler.js" : "node_modules/vue/dist/vue.esm-browser.prod.js"),
    vuex: path.resolve(__dirname, "node_modules/vuex"),
    "vue-loader": path.resolve(__dirname, "node_modules/vue-loader"),
    leaflet: path.resolve(__dirname, "node_modules/leaflet"),
    inputmask: path.resolve(__dirname, "node_modules/inputmask"),
    autosize: path.resolve(__dirname, "node_modules/autosize"),
    mediaelement: path.resolve(__dirname, "node_modules/mediaelement"),
    "mediaelement-plugins": path.resolve(__dirname, "node_modules/mediaelement-plugins"),
    "get-contrast-ratio": path.resolve(__dirname, "node_modules/get-contrast-ratio"),
    popperjs: path.resolve(__dirname, "node_modules/@popperjs/core"),
    "tiny-emitter": path.resolve(__dirname, "node_modules/tiny-emitter"),
    dompurify: path.resolve(__dirname, "node_modules/dompurify"),
    tinymce: path.resolve(__dirname, "node_modules/tinymce"),
    "@floating-ui/vue": path.resolve(__dirname, "node_modules/@floating-ui/vue"),
  };
}

module.exports = (env, argv) => {
  const IS_DEVELOPMENT = argv.mode === "development";
  return {
    entry: "./src/main.js",
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "../plugin/devtool"),
    },
    devtool: IS_DEVELOPMENT ? "inline-source-map" : "source-map",
    watchOptions: {
      ignored: /node_modules/,
    },
    resolve: {
      alias: resolveAlias(argv.mode),
    },
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
          test: /\.pug$/,
          use: ["vue-pug-loader"],
        },
        {
          test: /\.vue$/,
          use: ["vue-loader"],
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "style-loader"
            },
            {
              loader: "css-loader",
              options: {
                sourceMap: true,
              },
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true,
              },
            }
          ],
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: "style-loader"
            },
            {
              loader: "css-loader",
              options: {
                sourceMap: true,
              },
            },
          ],
          exclude: [
            /tinymce\/skins\/content\/default\/content\.css$/,
            /tinymce\/skins\/ui\/oxide\/content\.css$/,
          ],
        },
        {
          test: /tinymce\/skins\/ui\/oxide\/content\.css$/i,
          use: ["css-loader"],
        },
        {
          test: /tinymce\/skins\/content\/default\/content\.css$/i,
          use: ["css-loader"],
        },
        {
          test: /\.(png|jpg)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "/static/[hash].[ext]"
              }
            }
          ]
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          type: "asset", // Automatically choose between exporting a data URI and sending a separate file
        },
      ],
    },
  };
};

// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  // The entry point of your app
  entry: "./src/index.js",

  // The output bundle
  output: {
    filename: "bundle.[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    clean: true, // Clean the output directory before emit
  },

  // Enable source maps for debugging
  devtool: "inline-source-map",

  // DevServer configuration with fallback for SPA routing
  devServer: {
    static: "./dist",
    historyApiFallback: true, // For SPA: redirects 404s to /index.html
    open: true,
  },

  // Module rules to handle different file types
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i, // Match both .sass and .scss files
        use: [
          "style-loader", // Injects styles into DOM
          "css-loader", // Turns CSS into CommonJS
          "sass-loader", // Compiles Sass to CSS
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.html$/,
        use: "html-loader",
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },

  // Plugins to enhance Webpack's functionality
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html", // Use our custom HTML file
      filename: "index.html",
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "src/components/header/header.html", to: "components/header/" },
        { from: "src/components/footer/footer.html", to: "components/footer/" },
        { from: "src/components/about/about.html", to: "components/about/" },
        { from: "src/pages/home/home.html", to: "pages/home/" },
        { from: "src/pages/contact/contact.html", to: "pages/contact/" },
      ],
    }),
  ],
};

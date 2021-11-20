const path = require("path");

const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ReactRefreshTypeScript = require("react-refresh-typescript");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = (_, argv) => {
  const mode = argv.mode;
  const isDevelopment = mode === "development";

  return {
    devServer: {
      historyApiFallback: true,
      hot: true,
      port: 8080,
    },
    entry: path.join(__dirname, "src", "index.tsx"),
    output: {
      path: path.join(__dirname, "dist"),
      filename: "[name].js",
      publicPath: "/",
    },
    devtool: isDevelopment ? "eval-source-map" : "source-map",
    module: {
      rules: [
        {
          test: /\.[jt]sx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: require.resolve("ts-loader"),
              options: {
                getCustomTransformers: () => ({
                  before: [isDevelopment && ReactRefreshTypeScript()].filter(
                    Boolean
                  ),
                }),
                transpileOnly: isDevelopment,
              },
            },
          ],
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
            {
              loader: "css-modules-typescript-loader",
              options: {
                mode: isDevelopment ? "emit" : "verify",
              },
            },
            {
              loader: "css-loader",
              options: {
                modules: {
                  auto: (resourcePath) =>
                    resourcePath.startsWith(path.join(__dirname, "src")),
                  exportLocalsConvention: "camelCaseOnly",
                },
                sourceMap: true,
              },
            },
            {
              loader: "postcss-loader",
              options: {
                sourceMap: true,
                postcssOptions: {
                  plugins: () => [require("autoprefixer")],
                },
              },
            },
            {
              loader: "sass-loader",
              options: { sourceMap: true },
            },
          ],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
      modules: ["src", "node_modules"],
    },
    plugins: [
      new ForkTsCheckerWebpackPlugin(),
      new HtmlWebpackPlugin(),
      new FaviconsWebpackPlugin(
        path.resolve(__dirname, "src", "images", "logo.svg")
      ),
      !isDevelopment && new MiniCssExtractPlugin(),
      isDevelopment && new ReactRefreshWebpackPlugin(),
      new BundleAnalyzerPlugin({
        analyzerMode: isDevelopment ? "server" : "static",
        reportFilename: path.resolve(__dirname, "report.html"),
        openAnalyzer: false,
      }),
    ].filter(Boolean),
  };
};

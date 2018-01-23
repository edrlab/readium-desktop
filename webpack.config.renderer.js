var fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

// Default values for DEV environment
let nodeEnv = process.env.NODE_ENV || "DEV";

let definePlugin = new webpack.DefinePlugin({
    __NODE_ENV__: JSON.stringify(nodeEnv),
});

////// ================================
////// EXTERNALS
// Some modules cannot be bundled by Webpack
// for example those that make internal use of NodeJS require() in special ways
// in order to resolve asset paths, etc.
// In DEBUG / DEV mode, we just external-ize as much as possible (any non-TypeScript / non-local code),
// to minimize bundle size / bundler computations / compile times.

// const nodeExternals = require("webpack-node-externals");
// const nodeExternals = require("./nodeExternals");

let externals = {
    "bindings": "bindings",
    "leveldown": "leveldown",
    "fsevents": "fsevents",
    "conf": "conf"
}
if (nodeEnv === "DEV") {
    // // externals = Object.assign(externals, {
    // //         "electron-config": "electron-config",
    // //     }
    // // );
    // const { dependencies } = require("./package.json");
    // const depsKeysArray = Object.keys(dependencies || {});
    // const depsKeysObj = {};
    // depsKeysArray.forEach((depsKey) => { depsKeysObj[depsKey] = depsKey });
    // externals = Object.assign(externals, depsKeysObj);
    // delete externals["pouchdb-core"];

    // externals = [
    //     nodeExternals(
    //         {
    //             processName: "RENDERER"
    //             // whitelist: ["pouchdb-core"],
    //         }
    //     ),
    // ];

    externals = Object.assign(externals, {

        // "react": "React",
        // "react-dom": "ReactDOM"
        // react: {
        //     root: 'React',
        //     commonjs2: 'react',
        //     commonjs: 'react',
        //     amd: 'react',
        //     umd: 'react',
        //   },
        //   'react-dom': {
        //     root: 'ReactDOM',
        //     commonjs2: 'react-dom',
        //     commonjs: 'react-dom',
        //     amd: 'react-dom',
        //     umd: 'react-dom',
        //   }
        }
    );
}

console.log("WEBPACK externals (RENDERER):");
console.log(JSON.stringify(externals, null, "  "));
////// EXTERNALS
////// ================================


let config = Object.assign({}, {
    entry: "./src/index_app.ts",
    name: "renderer index app",
    output: {
        filename: "index_app.js",
        path: path.join(__dirname, "dist"),
        // https://github.com/webpack/webpack/issues/1114
        libraryTarget: "commonjs2",
    },
    target: "electron-renderer",

    externals: externals,

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
        alias: {
            "readium-desktop": path.resolve(__dirname, "src"),

            // "@r2-utils-js": path.resolve(__dirname, "node_modules/r2-utils-js/dist/es6-es2015/src"),
            // "@r2-lcp-js": path.resolve(__dirname, "node_modules/r2-lcp-js/dist/es6-es2015/src"),
            // "@r2-opds-js": path.resolve(__dirname, "node_modules/r2-opds-js/dist/es6-es2015/src"),
            // "@r2-shared-js": path.resolve(__dirname, "node_modules/r2-shared-js/dist/es6-es2015/src"),
            // "@r2-streamer-js": path.resolve(__dirname, "node_modules/r2-streamer-js/dist/es6-es2015/src"),
            // "@r2-navigator-js": path.resolve(__dirname, "node_modules/r2-navigator-js/dist/es6-es2015/src"),
            // "@r2-testapp-js": path.resolve(__dirname, "node_modules/r2-testapp-js/dist/es6-es2015/src"),

            "@r2-utils-js": "r2-utils-js/dist/es6-es2015/src",
            "@r2-lcp-js": "r2-lcp-js/dist/es6-es2015/src",
            "@r2-opds-js": "r2-opds-js/dist/es6-es2015/src",
            "@r2-shared-js": "r2-shared-js/dist/es6-es2015/src",
            "@r2-streamer-js": "r2-streamer-js/dist/es6-es2015/src",
            "@r2-navigator-js": "r2-navigator-js/dist/es6-es2015/src",
            "@r2-testapp-js": "r2-testapp-js/dist/es6-es2015/src",
        },
    },

    module: {
        loaders: [
            {
                exclude: /node_modules/,
                loaders: ["react-hot-loader/webpack", "awesome-typescript-loader"],
                test: /\.tsx?$/,
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader",
                }),
            },
            {
                loader: "file-loader?name=assets/[name].[hash].[ext]",
                test: /\.(png|jpe?g|gif|ico)$/,
            },
            {
                loader: "file-loader?name=assets/[name].[hash].[ext]",
                test: /\.(woff|woff2|ttf|eot|svg)$/,
            },
        ],
    },

    devServer: {
        contentBase: __dirname,
        hot: true,
        watchContentBase: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index_app.ejs",
            filename: "index_app.html",
        }),
        // new CopyWebpackPlugin([
        //     {
        //         from: path.join(__dirname, "FILE.ext"),
        //         to: "FILE.ext",
        //     }
        // ]),
        new ExtractTextPlugin("styles.css"),
        definePlugin,
    ],
});

if (nodeEnv === "DEV") {
    // Renderer config for DEV environment
    config = Object.assign({}, config, {
        // Enable sourcemaps for debugging webpack's output.
        devtool: "source-map",

        devServer: {
            contentBase: __dirname,
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            hot: true,
            watchContentBase: true,
        },
    });

    config.output.pathinfo = true;

    config.output.publicPath = "http://localhost:8080/";
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = config;

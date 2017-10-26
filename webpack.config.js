const { CheckerPlugin } = require('awesome-typescript-loader')
const path = require("path");

module.exports = {
    entry: {
        media: './src/app/media.ts',
        captured: './src/app/captured.ts',
    },
    output: {
        path: path.resolve(__dirname, 'dist', "app"),
        filename: '[name].bundle.js'
    },
    // Currently we need to add '.ts' to the resolve.extensions array.
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },

    // Source maps support ('inline-source-map' also works)
    devtool: 'source-map',

    // Add the loader for .ts files.
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader'
            }
        ]
    },
    plugins: [
        new CheckerPlugin()
    ]
};
module.exports = function override (config, env) {
    console.log('override')
    let loaders = config.resolve
    loaders.fallback = {
        // "fs": false,
        // // "tls": false,
        // // "net": false,
        // "http": false,
        // "url": false,
        // "https":false,
        // 'net':false,
        // 'dns':false,
        // 'os':false,
        // 'zlib':false,
        // 'tls':false,
        // 'http2':false,
        // 'process':false,
        // // "path": require.resolve("path-browserify"),
        // "stream": require.resolve("stream-browserify"),
        // // "util": require.resolve("util/"),
        // // "crypto": require.resolve("crypto-browserify")
        // // resolve.fallback: { "stream": false }
    }
    
    return config
}
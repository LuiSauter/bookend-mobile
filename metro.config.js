const { getDefaultConfig } = require('expo/metro-config')

const config = getDefaultConfig(__dirname)

// Remove all console logs in production...
// config.transformer.minifierConfig.compress.drop_console = true
// config.transformer.minifierPath = 'metro-minify-terser'
config.resolver.sourceExts.push('cjs')

module.exports = config
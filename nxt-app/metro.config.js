const { getDefaultConfig } = require('expo/metro-config')
const path = require('path')

const config = getDefaultConfig(__dirname)

config.resolver.unstable_enableSymlinks = true
config.watchFolders = [path.resolve(__dirname, '..')]

module.exports = config

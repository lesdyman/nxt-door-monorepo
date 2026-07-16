module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@constants': './constants',
            '@components': './components',
            '@screens': './screens',
            '@services': './services',
            '@assets': './assets',
            '@contexts': './contexts',
            '@hooks': './hooks',
            '@utils': './utils',
          },
        },
      ],
    ],
  }
}

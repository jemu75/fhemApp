module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],

  outputDir: 'www/fhemapp',
  publicPath: '',
  productionSourceMap: false,

  pluginOptions: {
    i18n: {
      locale: 'de',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    }
  }
}

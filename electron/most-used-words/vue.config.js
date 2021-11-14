module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      mainProcessWatch: [
        'src/core/parse-subtitles.js'
      ],
      outputDir: 'build',
      builderOptions: {
        win: {
          target: [{
            target: 'portable',
            arch: ['x64']
          }]
        }
      }
    }
  }
}
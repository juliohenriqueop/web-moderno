const scheduler = require('node-schedule')

module.exports = function (app) {
  const usersRepository = app.repositories['users-repository']
  const categoriesRepository = app.repositories['categories-repository']
  const articlesRepository = app.repositories['articles-repository']
  const statisticsRepository = app.repositories['statistics-repository']
  const statisticsMessages = app.localizations.pt_br['statistics-messages']
  const logError = app.errors['log-error']

  async function updateStatistics() {
    try {
      const usersCount = await usersRepository.count()
      const categoriesCount = await categoriesRepository.count()
      const articlesCount = await articlesRepository.count()
      const lastStatistics = await statisticsRepository.getLast()

      const statisticsFound = (lastStatistics !== null)

      if (statisticsFound) {
        const usersCountNotChanged = (usersCount === lastStatistics.usersCount)
        const categoriesCountNotChanged = (categoriesCount === lastStatistics.categoriesCount)
        const articlesCountNotChanged = (articlesCount === lastStatistics.articlesCount)

        const statisticsNotChanged = (
          usersCountNotChanged && categoriesCountNotChanged && articlesCountNotChanged
        )

        if (statisticsNotChanged) {
          return console.log(statisticsMessages.will_not_update)
        }
      }

      await statisticsRepository.create({
        usersCount,
        categoriesCount,
        articlesCount
      })
      return console.log(statisticsMessages.update_succeeded)
    } catch {
      return logError(statisticsMessages.update_failed)
    }
  }

  function startStatisticsScheduler() {
    const scheduleRule = new scheduler.RecurrenceRule()
    scheduleRule.minute = new scheduler.Range(0, 59)

    const statisticsJob = scheduler.scheduleJob(scheduleRule, updateStatistics)
    return statisticsJob
  }

  startStatisticsScheduler()
}
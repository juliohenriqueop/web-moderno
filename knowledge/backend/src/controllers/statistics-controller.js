module.exports = function(app) {
  const statisticsRepository = app.repositories['statistics-repository']
  const sendOkResponse = app.http.responses['send-ok-response']

  async function getLast(request, response) {
    const statistics = await statisticsRepository.getLast()
    const statisticsNotFound = (statistics === null)

    if (statisticsNotFound) {
      const defaultStatistics = {
        users_count: 0,
        categories_count: 0,
        articles_count: 0
      }

      return sendOkResponse(response, defaultStatistics)
    }

    const updatedStatistics = {
      users_count: statistics.usersCount,
      categories_count: statistics.categoriesCount,
      articles_count: statistics.articlesCount
    }

    return sendOkResponse(response, updatedStatistics)
  }

  return {
    getLast
  }
}
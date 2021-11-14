module.exports = function(app) {
  const statisticsController = app.controllers['statistics-controller']

  app.route('/statistics')
    .get(statisticsController.getLast)
}
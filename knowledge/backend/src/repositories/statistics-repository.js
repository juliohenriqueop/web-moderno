const mongoose = require('mongoose')

module.exports = function(app) {
  const statisticsSchema = mongoose.Schema({
    users_count: Number,
    categories_count: Number,
    articles_count: Number,
  }, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  })

  const statisticsModel = mongoose.model('statistics', statisticsSchema)

  async function create({
    usersCount,
    categoriesCount,
    articlesCount
  }) {
    await statisticsModel.create({
      users_count: usersCount,
      categories_count: categoriesCount,
      articles_count: articlesCount
    })
  }

  async function getLast() {
    const statisticsDocument = await statisticsModel.findOne({}, {}, {
      sort: {
        'created_at': '-1'
      }
    })

    const documentNotFound = (statisticsDocument === null)

    if (documentNotFound) {
      return null
    }

    const statistics = {
      usersCount: statisticsDocument.users_count,
      categoriesCount: statisticsDocument.categories_count,
      articlesCount: statisticsDocument.articles_count
    }

    return statistics
  }

  return {
    create,
    getLast
  }
}
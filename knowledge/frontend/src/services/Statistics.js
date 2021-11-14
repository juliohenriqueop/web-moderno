import axios from 'axios'

export default {
  async fetchStatistics() {
    const backend = process.env.VUE_APP_BACKEND_URL
    const statisticsEndPoint = process.env.VUE_APP_STATISTICS_ENDPOINT

    const URL = `${backend}/${statisticsEndPoint}`

    const response = await axios.get(URL)
    const statistics = response.data

    return {
      usersCount: statistics.users_count,
      categoriesCount: statistics.categories_count,
      articlesCount: statistics.articles_count
    }
  }
}
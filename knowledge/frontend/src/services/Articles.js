import axios from 'axios'

const backend = process.env.VUE_APP_BACKEND_URL
const articlesEndPoint = process.env.VUE_APP_ARTICLES_ENDPOINT
const categoriesEndPoint = process.env.VUE_APP_CATEGORIES_ENDPOINT

export default {
  async fetchArticlesList(page = 1) {
    const URL = `${backend}/${articlesEndPoint}/page/${page}`
    const response = await axios.get(URL)

    const responseBody = response.data

    const articlesList = {
      meta: {
        page: responseBody.meta.page,
        count: responseBody.meta.count
      },
      articles: responseBody.data.map(article => {
        return {
          id: article.id,
          title: article.title,
          description: article.description,
          categoryId: article.category_id,
          authorName: article.author_name
        }
      })
    }

    return articlesList
  },

  async fetchArticlesByCategory(categoryId, page = 1) {
    const categoryURL = `${categoriesEndPoint}/${categoryId}`
    const articlesPageURL = `${articlesEndPoint}/page/${page}`

    const URL = `${backend}/${categoryURL}/${articlesPageURL}`

    const response = await axios.get(URL)
    const responseBody = response.data

    const articlesList = {
      articles: responseBody.map(article => {
        return {
          id: article.id,
          title: article.title,
          description: article.description,
          thumbnailURL: article.thumbnail_url,
          categoryId: article.category_id,
          authorName: article.author_name
        }
      })
    }

    return articlesList
  },

  async getArticle(id) {
    const URL = `${backend}/${articlesEndPoint}/${id}`

    const response = await axios.get(URL)
    const responseBody = response.data

    const article = {
      id: responseBody.id,
      title: responseBody.title,
      description: responseBody.description,
      thumbnailURL: responseBody.thumbnail_url,
      content: responseBody.content,
      authorId: responseBody.author_id,
      categoryId: responseBody.category_id
    }

    return article
  },

  async createArticle(article, authorId) {
    const URL = `${backend}/${articlesEndPoint}`

    const articleData = {
      title: article.title,
      description: article.description,
      thumbnail_url: article.thumbnailURL,
      content: article.content,
      author_id: authorId,
      category_id: article.categoryId
    }

    const response = await axios.post(URL, articleData)
    const responseBody = response.data

    const articleId = responseBody.id

    return articleId
  },

  async updateArticle(article) {
    const URL = `${backend}/${articlesEndPoint}/${article.id}`

    const articleData = {
      title: article.title,
      description: article.description,
      content: article.content,
      thumbnail_url: article.thumbnailURL,
      author_id: article.authorId,
      category_id: article.categoryId
    }

    return axios.put(URL, articleData)
  },

  async deleteArticle(id) {
    const URL = `${backend}/${articlesEndPoint}/${id}`
    return axios.delete(URL)
  }
}
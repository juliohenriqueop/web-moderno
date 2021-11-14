import axios from "axios";
import store from "@/configuration/vuex-store"

const backend = process.env.VUE_APP_BACKEND_URL
const categoriesEndPoint = process.env.VUE_APP_CATEGORIES_ENDPOINT

export default {
  async fetchCategories() {
    const URL = `${backend}/${categoriesEndPoint}`
    const response = await axios.get(URL)

    const categories = response.data.map(category => {
      return {
        id: category.id,
        name: category.name,
        parentId: category.parent_id
      }
    })

    return categories
  },

  async updateCategories() {
    const categories = await this.fetchCategories()
    store.commit("categories/update", categories)
  },

  findCategoryHierarchy(category, categories) {
    let hierarchyTree = [category];
    let currentCategory = category;

    const isParentCategory = (parent) =>
      parent.id === currentCategory.parentId;

    while (currentCategory.parentId) {
      const parentCategory = categories.find(isParentCategory);
      hierarchyTree.unshift(parentCategory)

      currentCategory = parentCategory;
    }

    return hierarchyTree;
  },

  getCategoryPath(categoryHierarchy) {
    let categoryPath = "Raiz";

    categoryHierarchy.forEach((currentCategory) => {
      categoryPath = categoryPath.concat(` ➜ ${currentCategory.name}`);
    });

    return categoryPath;
  },

  subscribeToCategoriesUpdates(onCategoryUpdateCallback, ...callbackParams) {
    return store.subscribe((mutation) => {
      if (mutation.type === "categories/update") {
        onCategoryUpdateCallback(callbackParams)
      }
    });
  },

  async createCategory({
    name,
    parentId
  }) {
    const URL = `${backend}/${categoriesEndPoint}`

    const category = {
      name: name,
      parent_id: parentId
    }

    const response = await axios.post(URL, category)
    const responseBody = response.data

    const categoryId = responseBody.id

    return categoryId
  },

  async updateCategory({
    id,
    name,
    parentId
  }) {
    const URL = `${backend}/${categoriesEndPoint}/${id}`

    const category = {
      id: id,
      name: name,
      parent_id: parentId
    }

    return axios.put(URL, category)
  },

  async deleteCategory(id) {
    const URL = `${backend}/${categoriesEndPoint}/${id}`
    return axios.delete(URL)
  },

  validateCategoryName(name) {
    const nameValidationResult = {
      notExists: !name,
      toLong: name.length > 30
    }

    return nameValidationResult
  }
}
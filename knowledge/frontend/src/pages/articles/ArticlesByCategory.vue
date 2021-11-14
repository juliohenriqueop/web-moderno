<template>
  <div class="articlesByCategory h-100">
    <div
      v-if="isLoading"
      class="
        articlesCategory__loading
        d-flex
        justify-content-center
        align-items-center
      "
    >
      <b-spinner label="Loading"></b-spinner>
    </div>
    <div v-else>
      <Title
        :title="currentCategory.name"
        :subtitle="`Artigos da categoria ${currentCategory.name}.`"
        iconClass="far fa-folder-open"
      />
      <div v-for="article in articles" :key="article.id">
        <ArticleItem :article="article" />
      </div>
      <div v-if="!noMoreArticles" class="d-flex justify-content-center">
        <b-button
          class="m-3"
          variant="outline-primary"
          @click="fetchNextArticles"
          >Mais Artigos</b-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import Title from "@/components/Title";
import ArticleItem from "@/pages/articles/ArticleItem";
import ArticlesService from "@/services/Articles";
import CategoriesService from "@/services/Categories";

import { mapState } from "vuex";

export default {
  name: "ArticlesByCategory",

  components: {
    Title,
    ArticleItem,
  },

  data: function () {
    return {
      currentCategory: {},
      articles: [],
      currentPage: 1,
      noMoreArticles: false,
    };
  },

  created: function () {
    this.currentCategory = {
      id: null,
      name: "",
    };

    CategoriesService.subscribeToCategoriesUpdates(this.handleCategoryChange);
  },

  mounted: function () {
    this.currentCategory.id = parseInt(this.$route.params.id);
    this.handleCategoryChange();
  },

  watch: {
    $route() {
      this.handleCategoryChange();
    },
  },

  computed: {
    ...mapState("categories", { categories: "items" }),

    isLoading() {
      return this.articles.length === 0;
    },
  },

  methods: {
    reset() {
      this.articles = [];
      this.currentPage = 1;
      this.noMoreArticles = false;

      this.currentCategory = {
        id: null,
        name: "",
      };
    },

    findCategory(id) {
      const isTargetCategory = (category) => category.id === id;
      const category = this.categories.find(isTargetCategory);

      return category;
    },

    findCurrentCategory() {
      const currentCategoryId = parseInt(this.$route.params.id);
      const category = this.findCategory(currentCategoryId);

      const categoryFound = Boolean(category);
      if (!categoryFound) return false;

      this.currentCategory.id = category.id;
      this.currentCategory.name = category.name;

      this.fetchCategoryArticles();

      return true;
    },

    async fetchCategoryArticles() {
      const articlesList = await ArticlesService.fetchArticlesByCategory(
        this.currentCategory.id,
        this.currentPage
      );

      if (articlesList.articles.length === 0) {
        this.noMoreArticles = true;
      }

      this.articles = this.articles.concat(articlesList.articles);
    },

    async fetchNextArticles() {
      this.currentPage++;
      this.fetchCategoryArticles();
    },

    redirectToHome() {
      const isInArticlesByCategoryRoute =
        this.$route.name === "articlesByCategory";

      if (isInArticlesByCategoryRoute) {
        return this.$router.push({ name: "home" });
      }
    },

    handleCategoryChange() {
      this.reset();

      if (this.categories.length === 0) return;

      const currentCategoryFound = this.findCurrentCategory();
      if (!currentCategoryFound) return this.redirectToHome();
    },
  },
};
</script>

<style>
.articlesCategory__loading {
  height: 100%;
}
</style>
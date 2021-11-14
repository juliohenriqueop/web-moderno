<template>
  <div class="articleById">
    <Title
      :title="article.title"
      :subtitle="article.description"
      iconClass="far fa-file"
    />
    <div class="articleById__content" v-html="article.content"></div>
  </div>
</template>

<script>
import Title from "@/components/Title";
import ArticleService from "@/services/Articles";

import "highlight.js/styles/github-gist.css";
import hljs from "highlight.js";

export default {
  name: "articleById",

  components: {
    Title,
  },

  data: function () {
    return {
      article: {},
    };
  },

  created: function () {
    this.article = {
      name: "",
      description: "",
    };
  },

  mounted: function () {
    this.fetchArticle();
  },

  updated: function () {
    const codeElements = document.querySelectorAll(".ql-syntax");

    codeElements.forEach((currentCodeElement) => {
      hljs.highlightElement(currentCodeElement);
    });
  },

  methods: {
    async fetchArticle() {
      const articleId = this.$route.params.id;

      const article = await ArticleService.getArticle(articleId);
      this.article = article;
    },
  },
};
</script>

<style>
.articleById__content {
  background-color: white;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin: 10px;
  padding: 25px;
}

.articleById__content img {
  max-width: 100%;
  object-fit: contain;
}
</style>
<template>
  <div class="articleItem">
    <router-link
      class="articleItem__link"
      :to="{ name: 'articleById', params: { id: article.id } }"
    >
      <div class="articleItem__thumbnail d-none d-sm-block">
        <img
          v-if="article.thumbnailURL"
          width="150"
          height="150"
          :src="thumbnailURL"
          alt="Capa de um artigo"
        />
        <img
          v-else
          width="150"
          height="150"
          src="@/assets/article.png"
          alt="Capa de um artigo"
        />
      </div>
      <div class="articleItem__info">
        <h2 class="articleItem__title">{{ article.title }}</h2>
        <p class="articleItem__description">{{ article.description }}</p>
        <span>
          <strong>Autor: </strong>
          {{ article.authorName }}
        </span>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "articleItem",

  props: {
    article: Object,
  },

  computed: {
    thumbnailURL() {
      const randomBigNumber = Math.random() * 10000;
      return `${this.article.thumbnailURL}#${Math.ceil(randomBigNumber)}`;
    },
  },
};
</script>

<style>
.articleItem {
  background-color: white;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.15);
  margin: 20px;
  padding: 20px;
}

.articleItem__link,
.articleItem__link:hover {
  align-items: flex-start;
  color: black;
  display: flex;
  text-decoration: none;
}

.articleItem__info {
  align-self: stretch;
  display: flex;
  flex-direction: column;
}

.articleItem__title {
  font-size: 1.7em;
}

.articleItem__thumbnail {
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  margin-right: 20px;
  padding-right: 20px;
}

.articleItem__thumbnail img {
  border-radius: 5px;
}

.articleItem__description {
  color: #555;
  flex: 1;
  font-size: 1.1em;
}
</style>
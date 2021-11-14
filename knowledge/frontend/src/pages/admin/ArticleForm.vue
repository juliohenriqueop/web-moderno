<template>
  <b-form>
    <b-row>
      <b-col sm="12" md="6">
        <b-form-group label="Título" label-for="currentArticleName">
          <b-form-input
            required
            type="text"
            id="currentArticleTitle"
            placeholder="Informe o título do artigo."
            v-model="currentTitle"
            :disabled="disabled"
            @input="emitTitleUpdateEvent"
          >
          </b-form-input>
        </b-form-group>
      </b-col>
      <b-col sm="12" md="6">
        <b-form-group label="Categoria" label-for="categoryOptions">
          <b-form-select
            v-model="currentCategoryId"
            :options="categoryOptions"
            :disabled="disabled"
            @change="emitCategoryIdUpdateEvent"
          ></b-form-select>
        </b-form-group>
      </b-col>
      <b-col cols="12">
        <b-form-group label="Descrição" label-for="currentArticleDescription">
          <b-form-input
            required
            type="text"
            id="currentArticleDescription"
            placeholder="Informe a descrição do artigo."
            v-model="currentDescription"
            :disabled="disabled"
            @input="emitDescriptionUpdateEvent"
          >
          </b-form-input>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
        <b-form-group label="Capa" label-for="currentArticleThumbnailURL">
          <b-form-input
            required
            type="text"
            id="currentArticleThumbnailURL"
            placeholder="Informe o URL de uma imagem para a capa do artigo."
            v-model="currentThumbnailURL"
            :disabled="disabled"
            @input="emitThumbnailUrlUpdateEvent"
          >
          </b-form-input>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
        <b-form-group
          v-if="showContentEditor"
          label="Conteúdo"
          label-for="currentArticleContent"
        >
          <VueEditor
            id="currentArticleContent"
            placeholder="Informe o conteúdo do artigo."
            v-model="currentContent"
            :disabled="disabled"
            @input="emitContentUpdateEvent"
          />
        </b-form-group>
      </b-col>
    </b-row>
  </b-form>
</template>

<script>
import { VueEditor } from "vue2-editor";

export default {
  name: "ArticleForm",

  components: {
    VueEditor,
  },

  props: {
    disabled: Boolean,
    showContentEditor: Boolean,
    categoryOptions: Array,
    title: String,
    description: String,
    categoryId: Number,
    thumbnailURL: String,
    content: String,
  },

  data: function () {
    return {
      currentTitle: this.title,
      currentCategoryId: this.categoryId,
      currentDescription: this.description,
      currentThumbnailURL: this.thumbnailURL,
      currentContent: this.content,
    };
  },

  methods: {
    emitTitleUpdateEvent(title) {
      this.$emit("update:title", title);
    },

    emitCategoryIdUpdateEvent(categoryId) {
      this.$emit("update:categoryId", categoryId);
    },

    emitDescriptionUpdateEvent(description) {
      this.$emit("update:description", description);
    },

    emitThumbnailUrlUpdateEvent(thumbnailURL) {
      this.$emit("update:thumbnailURL", thumbnailURL);
    },

    emitContentUpdateEvent(content) {
      this.$emit("update:content", content);
    },
  },
};
</script>

<style>
</style>
<template>
  <div class="articlesEditor">
    <div class="d-flex justify-content-center">
      <div v-if="isInLoadingMode">
        <b-spinner label="Loading"></b-spinner>
      </div>
      <div v-else class="flex-grow-1">
        <p v-if="isInErrorMode" class="text-center text-muted mt-4">
          Não foi possível obter a lista de artigos.
        </p>
        <div v-else>
          <Modal
            id="editorModal"
            title="Editor de Artigo"
            :mode="currentMode"
            :show="isEditorOpen"
            @onSave="handleSave"
            @onUpdate="handleUpdate"
            @onDelete="handleDelete"
            @onCancel="handleCancel"
          >
            <ArticleForm
              :disabled="isInDeleteMode"
              :showContentEditor="isContentEditorVisible"
              :categoryOptions="categoryOptions"
              v-bind:title.sync="currentArticle.title"
              v-bind:categoryId.sync="currentArticle.categoryId"
              v-bind:description.sync="currentArticle.description"
              v-bind:thumbnailURL.sync="currentArticle.thumbnailURL"
              v-bind:content.sync="currentArticle.content"
            />
          </Modal>
          <p v-if="isEmpty" class="text-center text-muted mt-5">
            Nenhum artigo encontrado.
          </p>
          <ItemTable
            v-else
            sortBy="title"
            searchPlaceHolder="Busca por artigos."
            :fields="fields"
            :items="articles"
            :itemsCount="articlesCount"
            :page="articlesPage"
            :itemsPerPage="10"
            @onCreate="handleCreationMode"
            @onEdit="handleEditMode"
            @onDelete="handleDeleteMode"
            @onPageChange="handlePageChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "@/pages/admin/Modal.vue";
import ArticleForm from "@/pages/admin/ArticleForm.vue";
import ItemTable from "@/pages/admin/ItemTable.vue";
import CategoriesService from "@/services/Categories";
import ArticlesService from "@/services/Articles";

import { mapGetters, mapState, mapMutations } from "vuex";

export default {
  name: "ArticlesTab",

  components: {
    Modal,
    ArticleForm,
    ItemTable,
  },

  created: function () {
    this.categoryOptions = [
      {
        value: null,
        text: "-- Selecione uma categoria para o artigo --",
        disabled: true,
      },
    ];

    this.fields = [
      {
        key: "title",
        label: "Título",
        sortable: true,
      },
      {
        key: "description",
        label: "Descrição",
        sortable: true,
        class: "d-none d-sm-table-cell",
      },
      {
        key: "authorName",
        label: "Autor",
        sortable: true,
        class: "d-none d-sm-table-cell",
      },
      {
        key: "actions",
        label: "Opções",
      },
    ];

    this.modes = {
      LOADING: "LOADING",
      ERROR: "ERROR",
      DEFAULT: "DEFAULT",
      CREATING: "CREATING",
      EDITING: "EDITING",
      DELETING: "DELETING",
    };
  },

  data: function () {
    return {
      categoryOptions: [],
      currentMode: "DEFAULT",
      articles: [],
      articlesCount: 0,
      articlesPage: 1,
      currentArticle: {
        title: "",
        description: "",
        thumbnailURL: "",
        categoryId: null,
        content: "",
      },
    };
  },

  mounted: function () {
    this.subscribeForCategoriesChanges();
    this.fetchArticles(1);
  },

  computed: {
    ...mapGetters("user", { currentUserId: "id" }),
    ...mapState("categories", { categories: "items" }),

    isEmpty() {
      return this.articles.length === 0;
    },

    isInLoadingMode() {
      return this.currentMode === this.modes.LOADING;
    },

    isInErrorMode() {
      return this.currentMode === this.modes.ERROR;
    },

    isInDefaultMode() {
      return this.currentMode === this.modes.DEFAULT;
    },

    isInCreationMode() {
      return this.currentMode === this.modes.CREATING;
    },

    isInEditMode() {
      return this.currentMode === this.modes.EDITING;
    },

    isInDeleteMode() {
      return this.currentMode === this.modes.DELETING;
    },

    isEditorOpen() {
      return this.isInCreationMode || this.isInEditMode || this.isInDeleteMode;
    },

    isContentEditorVisible() {
      return this.isInCreationMode || this.isInEditMode;
    },
  },

  methods: {
    ...mapMutations("categories", { updateStore: "update" }),
    ...mapMutations("menu", { hideMenu: "hide" }),

    subscribeForCategoriesChanges() {
      this.$store.subscribe((mutation) => {
        if (mutation.type === "categories/update") {
          this.createCategoriesOptions();
        }
      });
    },

    async fetchArticles(page) {
      try {
        this.currentMode = this.modes.LOADING;

        const articlesList = await ArticlesService.fetchArticlesList(page);

        this.articles = articlesList.articles;
        this.articlesCount = articlesList.meta.count;

        this.currentMode = this.modes.DEFAULT;
      } catch (error) {
        this.currentMode = this.modes.ERROR;
        throw error;
      }
    },

    resetCategoryOptions(categoryOptions) {
      const lastOptionIndex = categoryOptions.length - 1;
      return categoryOptions.splice(1, lastOptionIndex);
    },

    sortCategoryOptions(categoryOptions) {
      const placeHolderOption = categoryOptions[0];

      categoryOptions.shift();

      categoryOptions.sort((categoryOptionA, categoryOptionB) => {
        return categoryOptionA.text.length - categoryOptionB.text.length;
      });

      categoryOptions.unshift(placeHolderOption);
    },

    async createCategoriesOptions() {
      this.resetCategoryOptions(this.categoryOptions);

      this.categories.forEach((currentCategory) => {
        const categoryHierarchy = CategoriesService.findCategoryHierarchy(
          currentCategory,
          this.categories
        );

        const categoryPath =
          CategoriesService.getCategoryPath(categoryHierarchy);

        const category = {
          value: currentCategory.id,
          text: categoryPath,
        };

        this.categoryOptions.push(category);
      });

      this.sortCategoryOptions(this.categoryOptions);
    },

    reset() {
      this.currentArticle = {
        title: "",
        description: "",
        thumbnailURL: "",
        categoryId: null,
        content: "",
      };
    },

    cancel() {
      this.currentMode = this.modes.DEFAULT;
      this.reset();
    },

    validateTitle() {
      if (this.currentArticle.title.length === 0) {
        this.$toasted.global.ErrorToast(
          "O título do artigo não foi informado."
        );
        return false;
      }

      return true;
    },

    validateCategory() {
      if (this.currentArticle.categoryId === null) {
        this.$toasted.global.ErrorToast(
          "Não foi selecionada uma categoria válida para o artigo."
        );
        return false;
      }

      return true;
    },

    validateDescription() {
      if (this.currentArticle.description.length === 0) {
        this.$toasted.global.ErrorToast(
          "A descrição do artigo não foi informada."
        );
        return false;
      }

      return true;
    },

    validateContent() {
      if (this.currentArticle.content.length === 0) {
        this.$toasted.global.ErrorToast("O artigo precisa ter um conteúdo.");
        return false;
      }

      return true;
    },

    validateCurrentArticle() {
      const validations = [
        this.validateTitle,
        this.validateCategory,
        this.validateDescription,
        this.validateContent,
      ];

      const validationSucceeded = (validation) => validation();
      return validations.every(validationSucceeded);
    },

    handleCreationMode() {
      this.reset();
      this.currentMode = this.modes.CREATING;
    },

    async handleEditMode(article) {
      try {
        this.currentArticle = await ArticlesService.getArticle(article.id);

        this.hideMenu();
        this.currentMode = this.modes.EDITING;
      } catch (error) {
        this.$toasted.global.ErrorToast(
          "Não foi possível obter o conteúdo do artigo."
        );
        this.cancel();

        throw error;
      }
    },

    async handleDeleteMode(article) {
      try {
        this.currentArticle = await ArticlesService.getArticle(article.id);

        this.hideMenu();
        this.currentMode = this.modes.DELETING;
      } catch (error) {
        this.$toasted.global.ErrorToast(
          "Não foi possível obter o conteúdo do artigo."
        );
        this.cancel();

        throw error;
      }
    },

    handlePageChange(page) {
      this.articlesPage = page;
      this.fetchArticles(page);
    },

    handleCancel() {
      this.cancel();
    },

    async handleSave() {
      const isCurrentArticleValid = this.validateCurrentArticle();

      if (!isCurrentArticleValid) return;

      await ArticlesService.createArticle(
        this.currentArticle,
        this.currentUserId
      );

      this.$toasted.global.SuccessToast("Artigo criado com sucesso !");

      this.fetchArticles(1);
      this.cancel();
    },

    async handleUpdate() {
      const isCurrentArticleValid = this.validateCurrentArticle();

      if (!isCurrentArticleValid) return;

      await ArticlesService.updateArticle(this.currentArticle);
      this.$toasted.global.SuccessToast("Artigo atualizado com sucesso !");

      this.fetchArticles(1);
      this.cancel();
    },

    async handleDelete() {
      const isCurrentArticleValid = this.validateCurrentArticle();

      if (!isCurrentArticleValid) return;

      await ArticlesService.deleteArticle(this.currentArticle.id);
      this.$toasted.global.SuccessToast("Artigo removido com sucesso !");

      this.fetchArticles(1);
      this.cancel();
    },
  },
};
</script>

<style>
</style>
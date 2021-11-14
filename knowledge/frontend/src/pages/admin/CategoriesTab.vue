<template>
  <div class="categoriesEditor">
    <div class="d-flex justify-content-center">
      <div v-if="isInLoadingMode">
        <b-spinner label="Loading"></b-spinner>
      </div>
      <div v-else class="flex-grow-1">
        <p v-if="isInErrorMode" class="text-center text-muted mt-4">
          Não foi possível obter a lista de categorias.
        </p>
        <div v-else>
          <Modal
            title="Editor de Categoria"
            :mode="currentMode"
            :show="isEditorOpen"
            @onSave="handleSave"
            @onUpdate="handleUpdate"
            @onDelete="handleDelete"
            @onCancel="handleCancel"
          >
            <CategoryForm
              :disabled="isInDeleteMode"
              :categoryOptions="availableCategoryOptions"
              v-bind:name.sync="currentCategory.name"
              v-bind:parentId.sync="currentCategory.parentId"
            />
          </Modal>
          <p v-if="isEmpty" class="text-center text-muted mt-5">
            Nenhuma categoria encontrada.
          </p>
          <ItemTable
            v-else
            sortBy="path"
            searchPlaceHolder="Busca por categorias."
            :fields="fields"
            :items="categories"
            :itemsPerPage="10"
            @onCreate="handleCreationMode"
            @onEdit="handleEditMode"
            @onDelete="handleDeleteMode"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "@/pages/admin/Modal.vue";
import CategoryForm from "@/pages/admin/CategoryForm.vue";
import ItemTable from "@/pages/admin/ItemTable.vue";
import CategoriesService from "@/services/Categories";

import { mapState, mapMutations } from "vuex";

export default {
  name: "CategoriesTab",

  components: {
    Modal,
    CategoryForm,
    ItemTable,
  },

  created: function () {
    this.fields = [
      {
        key: "name",
        label: "Nome",
        sortable: true,
      },
      {
        key: "path",
        label: "Caminho",
        sortable: true,
        class: "d-none d-sm-table-cell",
      },
      {
        key: "actions",
        label: "Opções",
      },
    ];

    this.availableCategoryOptions = [
      {
        value: null,
        text: "Raiz",
        hierarchy: [],
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
      currentMode: "",
      availableCategoryOptions: [],
      unavailableCategoryOptions: [],
      categoryTableItems: [],
      currentCategory: {},
    };
  },

  mounted: async function () {
    this.currentMode = this.modes.DEFAULT;
    this.fetchCategories();
  },

  computed: {
    ...mapState("categories", { categories: "items" }),

    isEmpty() {
      return this.categories.length === 0;
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
  },

  methods: {
    ...mapMutations("categories", { updateStore: "update" }),
    ...mapMutations("menu", { hideMenu: "hide" }),

    appendCategoryHierarchy(category, categoryHierarchy) {
      const categoryHierarchyIds = categoryHierarchy.map(
        (currentCategory) => currentCategory.id
      );

      return {
        ...category,
        hierarchy: categoryHierarchyIds,
      };
    },

    appendCategoryPath(category, path) {
      return {
        ...category,
        path: path,
      };
    },

    createCategoryOption(category) {
      return {
        value: category.id,
        text: category.path,
      };
    },

    removeCategoryOption(category, categoryOptions) {
      const isCategoryOption = (currentCategory) =>
        currentCategory.value === category.id;

      const categoryOptionIndex = categoryOptions.findIndex(isCategoryOption);

      categoryOptions.splice(categoryOptionIndex, 1);
    },

    resetAvailableCategoryOptions(availableCategoryOptions) {
      const lastOptionIndex = availableCategoryOptions.length - 1;
      const firstOptionIndexAfterRoot = 1;

      return availableCategoryOptions.splice(
        firstOptionIndexAfterRoot,
        lastOptionIndex
      );
    },

    resetUnavailableCategoryOptions(unavailableCategoryOptions) {
      const unavailableOptionsCount = unavailableCategoryOptions.length;
      return unavailableCategoryOptions.splice(0, unavailableOptionsCount);
    },

    disableCategoryParents(
      category,
      availableCategoryOptions,
      unavailableCategoryOptions
    ) {
      const categoryOptions = Array.from(availableCategoryOptions);
      categoryOptions.shift();

      this.resetAvailableCategoryOptions(availableCategoryOptions);
      this.resetUnavailableCategoryOptions(unavailableCategoryOptions);

      categoryOptions.forEach((currentOption) => {
        if (currentOption.hierarchy.includes(category.id)) {
          return unavailableCategoryOptions.push(currentOption);
        }

        return availableCategoryOptions.push(currentOption);
      });
    },

    makeAllCategoryOptionsAvailable(
      availableCategoryOptions,
      unavailableCategoryOptions
    ) {
      const unavailableOptions = Array.from(unavailableCategoryOptions);
      this.resetUnavailableCategoryOptions(unavailableCategoryOptions);

      unavailableOptions.forEach((currentOption) => {
        availableCategoryOptions.push(currentOption);
      });
    },

    sortCategoryOptions(categoryOptions) {
      categoryOptions.sort((categoryOptionA, categoryOptionB) => {
        return categoryOptionA.text.length - categoryOptionB.text.length;
      });
    },

    async updateCategoriesStore() {
      try {
        this.switchMode(this.modes.LOADING);

        const categories = await CategoriesService.fetchCategories();
        this.updateStore(categories);

        this.switchMode(this.modes.DEFAULT);
      } catch (error) {
        this.switchMode(this.modes.ERROR);
        throw error;
      }
    },

    async fetchCategories() {
      await this.updateCategoriesStore();

      this.resetAvailableCategoryOptions(this.availableCategoryOptions);

      this.categoryTableItems = this.categories.map((currentCategory) => {
        const categoryHierarchy = CategoriesService.findCategoryHierarchy(
          currentCategory,
          this.categories
        );

        const categoryPath =
          CategoriesService.getCategoryPath(categoryHierarchy);
        const category = this.appendCategoryPath(currentCategory, categoryPath);

        const categoryOption = this.createCategoryOption(category);
        const categoryOptionWithPath = this.appendCategoryHierarchy(
          categoryOption,
          categoryHierarchy
        );

        this.availableCategoryOptions.push(categoryOptionWithPath);

        return category;
      });

      this.sortCategoryOptions(this.availableCategoryOptions);
    },

    switchMode(mode) {
      if (this.isInEditMode) {
        this.makeAllCategoryOptionsAvailable(
          this.availableCategoryOptions,
          this.unavailableCategoryOptions
        );
      }

      this.currentMode = mode;
    },

    validateCategoryName(name) {
      const nameValidationResult = CategoriesService.validateCategoryName(name);

      if (nameValidationResult.notExists) {
        this.$toasted.global.ErrorToast(
          "Não foi informado um nome para a categoria."
        );

        return false;
      }

      if (nameValidationResult.toLong) {
        this.$toasted.global.ErrorToast(
          "O nome dá categoria deve ter menos de 30 caracteres."
        );

        return false;
      }

      return true;
    },

    handleCreationMode() {
      this.reset();
      this.currentMode = this.modes.CREATING;
    },

    handleEditMode(category) {
      this.hideMenu();
      this.switchMode(this.modes.EDITING);

      this.disableCategoryParents(
        category,
        this.availableCategoryOptions,
        this.unavailableCategoryOptions
      );

      this.currentCategory = {
        ...category,
      };
    },

    handleDeleteMode(category) {
      this.hideMenu();
      this.switchMode(this.modes.DELETING);

      this.currentCategory = {
        ...category,
      };
    },

    reset() {
      this.currentCategory = {
        name: "",
        parentId: null,
      };
    },

    cancel() {
      this.switchMode(this.modes.DEFAULT);
      this.reset();
    },

    async handleSave() {
      const isCategoryNameValid = this.validateCategoryName(
        this.currentCategory.name
      );

      if (!isCategoryNameValid) return;

      await CategoriesService.createCategory(this.currentCategory);
      this.$toasted.global.SuccessToast("Categoria criada com sucesso !");

      this.fetchCategories();
      this.cancel();
    },

    async handleUpdate() {
      const isCategoryNameValid = this.validateCategoryName(
        this.currentCategory.name
      );

      if (!isCategoryNameValid) return;

      await CategoriesService.updateCategory(this.currentCategory);
      this.$toasted.global.SuccessToast("Categoria atualizada com sucesso !");

      this.fetchCategories();
      this.cancel();
    },

    async handleDelete() {
      await CategoriesService.deleteCategory(this.currentCategory.id);
      this.$toasted.global.SuccessToast("Categoria removida com sucesso !");

      this.fetchCategories();
      this.cancel();
    },

    handleCancel() {
      this.cancel();
    },
  },
};
</script>

<style>
</style>
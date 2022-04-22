<template>
  <aside :class="{ menu: true, 'menu--hidden': isMenuHidden || !isUserLogged }">
    <div class="menu__content">
      <div class="menu__search">
        <input
          class="menu__input"
          type="text"
          placeholder="Busca por categoria."
          v-model="tree.search"
        />
        <i class="menu__icon fas fa-search fa-lg"></i>
      </div>
      <LiquorTree
        class="menu__tree"
        ref="treeRef"
        :key="tree.key"
        :options="tree.options"
        :data="tree.data"
        :filter="tree.search"
        @node:selected="handleCategorySelected"
      />
    </div>
  </aside>
</template>

<script>
import { mapState } from "vuex";
import LiquorTree from "liquor-tree";

import CategoriesService from "@/services/Categories";

export default {
  name: "Menu",

  components: {
    LiquorTree,
  },

  data: function () {
    return {
      tree: {
        key: 0,
        options: {},
        data: [],
        search: "",
      },
    };
  },

  created: function () {
    this.tree.options = {
      propertyNames: {
        text: "name",
      },
      filter: {
        emptyText: "Nenhuma categoria encontrada.",
      },
    };

    CategoriesService.subscribeToCategoriesUpdates(() => {
      this.handleCategoriesUpdate();
    });
  },

  computed: {
    ...mapState("menu", { isMenuHidden: "hidden" }),
    ...mapState("user", { currentUser: "account" }),
    ...mapState("categories", { categories: "items" }),

    isUserLogged() {
      return Boolean(this.currentUser);
    },
  },

  methods: {
    handleCategoriesUpdate() {
      const isParentCategory = (currentCategory) => !currentCategory.parentId;

      const parentCategories = this.categories.filter(isParentCategory);

      this.tree.data = parentCategories.map((category) => {
        const isChildrenCategory = (currentCategory) =>
          currentCategory.parentId === category.id;

        const childrens = this.categories.filter(isChildrenCategory);

        const childrensTreeData = childrens.map((children) => {
          return {
            id: children.id,
            name: children.name,
          };
        });

        const currentCategoryTreeData = {
          id: category.id,
          name: category.name,
          children: childrensTreeData,
        };

        return currentCategoryTreeData;
      });

      this.tree.key++;
    },

    handleCategorySelected(categoryTreeData) {
      this.$router.push({
        name: "articlesByCategory",
        params: {
          id: categoryTreeData.id,
        },
      });
    },
  },
};
</script>

<style>
.menu {
  background: linear-gradient(to right, #232526, #414345);
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  grid-area: menu;
  overflow: hidden;
  transition: width 300ms ease-in-out;
  width: 300px;
}

@media screen and (max-width: 960px) {
  .menu {
    height: calc(100% - 60px);
    left: 0;
    opacity: 0.9;
    position: absolute;
    top: 60px;
    z-index: 4;
  }
}

.menu--hidden {
  width: 0;
}

.menu__content {
  height: 100%;
  overflow: hidden;
  overflow-y: scroll;
}

.menu__search {
  align-items: center;
  border-bottom: 1px solid #aaa;
  display: flex;
  justify-content: center;
  margin: 20px;
  padding-bottom: 8px;
  z-index: 4;
}

.menu__icon {
  color: #aaa;
  margin-left: 10px;
}

.menu__input {
  background: transparent;
  border: 0;
  color: #ccc;
  font-size: 1.1em;
  outline: 0;
  width: 100%;
}

.menu__tree {
  background: inherit;
  overflow-x: hidden !important;
  width: 100%;
  z-index: 4;
}

.menu__tree span {
  color: white;
}

.menu__tree .tree-node.selected > .tree-content,
.menu__tree .tree-node:not(.selected) .tree-content:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.menu__tree .tree-arrow.has-child {
  filter: brightness(3);
}

.menu__tree .tree-filter-empty {
  color: #ccc;
  font: 1.1em;
  margin-left: 20px;
}
</style>
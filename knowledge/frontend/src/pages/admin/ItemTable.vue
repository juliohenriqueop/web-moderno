<template>
  <div>
    <div class="toolbar d-flex mb-3">
      <b-input :placeholder="searchPlaceHolder" v-model="search" />
      <b-button
        class="toolbar__create ml-2"
        variant="primary"
        @click="emitOnCreateEvent"
      >
        <i class="fas fa-plus"></i>
      </b-button>
    </div>
    <b-table
      hover
      striped
      sort-icon-left
      :fields="fields"
      :items="items"
      :filter="search"
      :sort-by="sortBy"
      :current-page="currentPage"
    >
      <template slot="cell(actions)" slot-scope="data">
        <div class="itemTable__actions">
          <b-button
            class="mr-1"
            variant="warning"
            @click="emitOnEditEvent(data.item)"
          >
            <i class="far fa-edit"></i>
          </b-button>
          <b-button
            class="ml-1"
            variant="danger"
            @click="emitOnDeleteEvent(data.item)"
          >
            <i class="far fa-trash-alt"></i>
          </b-button>
        </div>
      </template>
    </b-table>
    <div class="d-flex justify-content-center">
      <b-pagination
        size="md"
        v-model="currentPage"
        :total-rows="itemsCount"
        :per-page="itemsPerPage"
      ></b-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "ItemTable",

  props: {
    searchPlaceHolder: String,
    fields: Array,
    items: Array,
    itemsCount: Number,
    page: {
      type: Number,
      default: 1,
    },
    itemsPerPage: Number,
    sortBy: String,
  },

  data: function () {
    return {
      search: "",
      currentPage: this.page,
    };
  },

  watch: {
    currentPage(nextPage) {
      this.$emit("onPageChange", nextPage);
      return nextPage;
    },
  },

  methods: {
    emitOnCreateEvent() {
      this.$emit("onCreate");
    },

    emitOnEditEvent(item) {
      this.$emit("onEdit", item);
    },

    emitOnDeleteEvent(item) {
      this.$emit("onDelete", item);
    },
  },
};
</script>

<style>
.itemTable__actions {
  display: flex;
  justify-content: space-between;
  width: 100px;
}

.toolbar__create {
  width: 50px;
  padding: 0px;
  font-size: 16pt;
}
</style>
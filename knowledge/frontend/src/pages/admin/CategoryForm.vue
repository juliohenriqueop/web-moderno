<template>
  <b-form>
    <b-row>
      <b-col sm="12" md="6">
        <b-form-group label="Nome" label-for="currentCategoryName">
          <b-form-input
            required
            type="text"
            id="currentCategoryName"
            placeholder="Informe o nome da categoria."
            v-model="currentName"
            :disabled="disabled"
            @input="emitNameUpdateEvent"
          >
          </b-form-input>
        </b-form-group>
      </b-col>
      <b-col sm="12" md="6">
        <b-form-group label="Caminho" label-for="currentCategoryPath">
          <b-form-select
            v-model="currentParentId"
            :options="categoryOptions"
            :disabled="disabled"
            @select="emitParentIdUpdateEvent"
          ></b-form-select>
        </b-form-group>
      </b-col>
    </b-row>
  </b-form>
</template>

<script>
export default {
  name: "CategoryForm",

  props: {
    categoryOptions: Array,
    disabled: Boolean,
    name: String,
    parentId: Number,
  },

  data: function () {
    return {
      currentName: this.name,
      currentParentId: this.parentId,
    };
  },

  methods: {
    emitNameUpdateEvent(name) {
      this.$emit("update:name", name);
    },

    emitParentIdUpdateEvent(parentId) {
      this.$emit("update:parentId", parentId);
    },
  },
};
</script>

<style>
</style>
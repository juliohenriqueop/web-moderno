<template>
  <b-form-group class="nameInput">
    <b-form-input
      type="text"
      placeholder="Nome do usuário."
      v-model="name"
      :state="validationState"
      @focus="startValidation"
      @change="emitNameChangeEvent"
    />
    <b-form-invalid-feedback>Insira um nome válido.</b-form-invalid-feedback>
  </b-form-group>
</template>

<script>
export default {
  name: "NameInput",

  data: function () {
    return {
      name: "",
      shouldValidate: false,
    };
  },

  computed: {
    validationState() {
      return this.shouldValidate ? this.validateName() : null;
    },
  },

  methods: {
    startValidation() {
      this.shouldValidate = true;
    },

    validateName() {
      const isNameValid = this.name.length > 0;
      this.$emit("update:validationResult", isNameValid);

      return isNameValid;
    },

    emitNameChangeEvent() {
      this.$emit("update:name", this.name);
    },
  },
};
</script>

<style>
</style>
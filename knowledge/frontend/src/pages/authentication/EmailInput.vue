<template>
  <b-form-group class="emailInput">
    <b-form-input
      type="email"
      placeholder="E-mail do usuário."
      v-model="email"
      :state="validationState"
      @focus="startValidation"
      @change="emitEmailChangeEvent"
    />
    <b-form-invalid-feedback>
      Insira um e-mail válido.
    </b-form-invalid-feedback>
  </b-form-group>
</template>

<script>
export default {
  name: "EmailInput",

  data: function () {
    return {
      email: "",
      shouldValidate: false,
    };
  },

  computed: {
    validationState() {
      return this.shouldValidate ? this.validateEmail() : null;
    },
  },

  methods: {
    startValidation() {
      this.shouldValidate = true;
    },

    validateEmail() {
      const isEmailValid = this.email.includes("@") && this.email.includes(".");
      this.$emit("update:validationResult", isEmailValid);

      return isEmailValid;
    },

    emitEmailChangeEvent() {
      this.$emit("update:email", this.email);
    },
  },
};
</script>

<style>
</style>
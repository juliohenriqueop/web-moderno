<template>
  <b-form-group class="passwordInput">
    <b-form-input
      type="password"
      placeholder="Senha do usuário."
      v-model="password"
      :state="validationState"
      @focus="startValidation"
      @input="emitPasswordUpdateEvent"
    />
    <b-form-invalid-feedback>
      <span v-if="isEmpty">Insira uma senha.</span>
      <span v-else>
        Insira uma senha com no minimo {{ minLength }} caracteres.
      </span>
    </b-form-invalid-feedback>
  </b-form-group>
</template>

<script>
export default {
  name: "PasswordInput",

  props: {
    enableValidation: {
      type: Boolean,
      default: true,
    },

    minLength: {
      type: Number,
      default: 1,
    },
  },

  data: function () {
    return {
      password: "",
      shouldValidate: false,
    };
  },

  computed: {
    validationState() {
      return this.shouldValidate ? this.validatePassword() : null;
    },

    isEmpty() {
      return this.password.length === 0;
    },
  },

  methods: {
    startValidation() {
      if (this.enableValidation) {
        this.shouldValidate = true;
      }
    },

    validatePassword() {
      const isPasswordValid = this.password.length >= this.minLength;
      this.$emit("update:validationResult", isPasswordValid);

      return isPasswordValid;
    },

    emitPasswordUpdateEvent() {
      this.$emit("update:password", this.password);
    },
  },
};
</script>

<style>
</style>
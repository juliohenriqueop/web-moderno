<template>
  <b-form-group class="passwordConfirmation">
    <b-form-input
      type="password"
      placeholder="Senha do usuário."
      v-model="passwordConfirmation"
      :state="validationState"
      @focus="startValidation"
      @change="emitPasswordChangeEvent"
    />
    <b-form-invalid-feedback>
      As senhas informadas são diferentes.
    </b-form-invalid-feedback>
  </b-form-group>
</template>

<script>
export default {
  name: "PasswordConfirmationInput",

  props: {
    password: String,
  },

  data: function () {
    return {
      passwordConfirmation: "",
      shouldValidate: false,
    };
  },

  computed: {
    validationState() {
      return this.shouldValidate ? this.validatePasswordConfirmation() : null;
    },
  },

  methods: {
    startValidation() {
      this.shouldValidate = true;
    },

    validatePasswordConfirmation() {
      const isConfirmationValid =
        this.password.length >= 6 &&
        this.password === this.passwordConfirmation;

      this.$emit("update:validationResult", isConfirmationValid);
      return isConfirmationValid;
    },

    emitPasswordChangeEvent() {
      this.$emit("update:passwordConfirmation", this.passwordConfirmation);
    },
  },
};
</script>

<style>
</style>
<template>
  <div class="signUp">
    <Modal title="Cadastro">
      <Form @onSubmit="handleSignUp">
        <NameInput
          v-bind:name.sync="name"
          v-bind:validationResult.sync="isNameValid"
        />
        <EmailInput
          v-bind:email.sync="email"
          v-bind:validationResult.sync="isEmailValid"
        />
        <PasswordInput
          :minLength="6"
          v-bind:password.sync="password"
          v-bind:validationResult.sync="isPasswordValid"
        />
        <PasswordConfirmationInput
          :password="password"
          v-bind:validationResult.sync="isPasswordConfirmationValid"
        />
        <SubmitButton>Cadastrar</SubmitButton>
      </Form>
      <router-link to="/login">Já tem uma conta ? Faça login.</router-link>
    </Modal>
  </div>
</template>

<script>
import Modal from "@/pages/authentication/Modal";
import Form from "@/pages/authentication/Form";
import NameInput from "@/pages/authentication/NameInput";
import EmailInput from "@/pages/authentication/EmailInput";
import PasswordInput from "@/pages/authentication/PasswordInput";
import PasswordConfirmationInput from "@/pages/authentication/PasswordConfirmationInput";
import SubmitButton from "@/pages/authentication/SubmitButton";
import AuthenticationService from "@/services/Authentication";
import CategoriesService from "@/services/Categories";

export default {
  name: "SignIn",

  components: {
    Modal,
    Form,
    NameInput,
    EmailInput,
    PasswordInput,
    PasswordConfirmationInput,
    SubmitButton,
  },

  data: function () {
    return {
      name: "",
      isNameValid: false,

      email: "",
      isEmailValid: false,

      password: "",
      isPasswordValid: false,
      isPasswordConfirmationValid: false,
    };
  },

  methods: {
    async handleSignUp() {
      if (!this.isNameValid) return;
      if (!this.isEmailValid) return;
      if (!this.isPasswordValid) return;
      if (!this.isPasswordConfirmationValid) return;

      await AuthenticationService.signUp(
        this.name,
        this.email,
        this.password
      );

      AuthenticationService.subscribeToTokenExpiration(() => {
        AuthenticationService.logout();

        this.$toasted.global.ErrorToast("Seu login expirou.");
        this.$router.push({ name: "login" });
      });

      CategoriesService.updateCategories();

      const redirectPath = this.$route.query.next;

      if (redirectPath) {
        return this.$router.push({ path: redirectPath });
      }

      this.$router.push({ name: "home" });
    },
  },
};
</script>

<style>
.signUp {
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
}
</style>
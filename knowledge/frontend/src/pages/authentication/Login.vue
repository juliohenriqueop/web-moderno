<template>
  <div class="login">
    <Modal title="Login">
      <Form @onSubmit="handleLogin">
        <EmailInput
          v-bind:validationResult.sync="isEmailValid"
          v-bind:email.sync="email"
        />
        <PasswordInput v-bind:password.sync="password" />
        <SubmitButton>Entrar</SubmitButton>
      </Form>
      <router-link to="/signUp">Não tem uma conta ? Cadastre-se.</router-link>
    </Modal>
  </div>
</template>

<script>
import Modal from "@/pages/authentication/Modal";
import Form from "@/pages/authentication/Form";
import EmailInput from "@/pages/authentication/EmailInput";
import PasswordInput from "@/pages/authentication/PasswordInput";
import SubmitButton from "@/pages/authentication/SubmitButton";
import AuthenticationService from "@/services/Authentication";
import CategoriesService from "@/services/Categories";

export default {
  name: "Login",

  components: {
    Modal,
    Form,
    EmailInput,
    PasswordInput,
    SubmitButton,
  },

  data: function () {
    return {
      isEmailValid: false,
      email: "",
      password: "",
    };
  },

  methods: {
    async handleLogin() {
      if (!this.isEmailValid) return;

      await AuthenticationService.login(this.email, this.password);

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
.login {
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
}
</style>
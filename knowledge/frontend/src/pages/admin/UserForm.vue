<template>
  <b-form>
    <input id="currentUserId" type="hidden" :value="id" />
    <b-row>
      <b-col sm="12" md="6">
        <b-form-group label="Nome" label-for="userName">
          <b-form-input
            required
            type="text"
            id="userName"
            placeholder="Informe o nome do usuário."
            v-model="currentName"
            :disabled="disabled"
            @input="emitNameChangeEvent"
          >
          </b-form-input>
        </b-form-group>
      </b-col>
      <b-col sm="12" md="6">
        <b-form-group label="E-mail" label-for="userEmail">
          <b-form-input
            required
            type="email"
            id="userEmail"
            placeholder="Informe o e-mail do usuário."
            v-model="currentEmail"
            :disabled="disabled"
            @input="emitEmailChangeEvent"
          >
          </b-form-input>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="12" md="6">
        <b-form-group label="Senha" label-for="userPassword">
          <b-form-input
            required
            type="password"
            id="userPassword"
            placeholder="Informe uma senha para o usuário."
            v-model="currentPassword"
            :disabled="disabled"
            @input="emitPasswordChangeEvent"
          >
          </b-form-input>
        </b-form-group>
      </b-col>
      <b-col sm="12" md="6">
        <b-form-group
          label="Confirmação de senha"
          label-for="userPasswordConfirmation"
        >
          <b-form-input
            required
            type="password"
            id="userPasswordConfirmation"
            placeholder="Informe novamente a senha para o usuário."
            v-model="currentPasswordConfirmation"
            :disabled="disabled"
            @input="emitConfirmationChangeEvent"
          >
          </b-form-input>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row class="mb-3">
      <b-col
        cols="12"
        sm="8"
        class="d-flex justify-content-center justify-content-sm-start h-25"
      >
        <b-form-checkbox
          id="userAdmin"
          class="mt-3 mb-3"
          v-model="isAdmin"
          :disabled="disabled"
          @select="emitAdminChangeEvent"
        >
          Administrador
        </b-form-checkbox>
      </b-col>
    </b-row>
  </b-form>
</template>

<script>
export default {
  name: "UserForm",

  props: {
    disabled: Boolean,
    id: Number,
    name: String,
    email: String,
    admin: Boolean,
    password: String,
    passwordConfirmation: String,
  },

  data: function () {
    return {
      currentName: this.name,
      currentEmail: this.email,
      isAdmin: this.admin,
      currentPassword: this.password,
      currentPasswordConfirmation: this.passwordConfirmation,
    };
  },

  methods: {
    emitNameChangeEvent(name) {
      this.$emit("update:name", name);
    },

    emitEmailChangeEvent(email) {
      this.$emit("update:email", email);
    },

    emitPasswordChangeEvent(password) {
      this.$emit("update:password", password);
    },

    emitConfirmationChangeEvent(passwordConfirmation) {
      this.$emit("update:passwordConfirmation", passwordConfirmation);
    },

    emitAdminChangeEvent(isAdmin) {
      this.$emit("update:admin", isAdmin);
    },
  },
};
</script>

<style>
</style>
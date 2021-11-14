<template>
  <div class="usersEditor">
    <div class="d-flex justify-content-center">
      <div v-if="isInLoadingMode">
        <b-spinner label="Loading"></b-spinner>
      </div>
      <div v-else class="flex-grow-1">
        <p v-if="isInErrorMode" class="text-center text-muted mt-4">
          Não foi possível obter a lista de usuários.
        </p>
        <div v-else>
          <Modal
            title="Editor de Usuário"
            :mode="currentMode"
            :show="isEditorOpen"
            @onSave="handleSave"
            @onUpdate="handleUpdate"
            @onDelete="handleDelete"
            @onCancel="handleCancel"
          >
            <UserForm
              :id="currentUser.id"
              :disabled="isInDeleteMode"
              v-bind:name.sync="currentUser.name"
              v-bind:email.sync="currentUser.email"
              v-bind:admin.sync="currentUser.admin"
              v-bind:password.sync="currentUser.password"
              v-bind:passwordConfirmation.sync="
                currentUser.passwordConfirmation
              "
            />
          </Modal>
          <p v-if="isEmpty" class="text-center text-muted mt-5">
            Nenhum usuário encontrado.
          </p>
          <ItemTable
            v-else
            sortBy="name"
            searchPlaceHolder="Busca por usuários."
            :fields="fields"
            :items="users"
            :itemsPerPage="10"
            @onCreate="handleCreationMode"
            @onEdit="handleEditMode"
            @onDelete="handleDeleteMode"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "@/pages/admin/Modal.vue";
import UserForm from "@/pages/admin/UserForm.vue";
import ItemTable from "@/pages/admin/ItemTable.vue";

import UsersService from "@/services/Users";
import { mapState } from "vuex";

export default {
  name: "UsersTab",

  components: {
    Modal,
    UserForm,
    ItemTable,
  },

  created: function () {
    this.fields = [
      {
        key: "name",
        label: "Nome",
        sortable: true,
      },
      {
        key: "email",
        label: "Email",
        class: "d-none d-sm-table-cell",
      },
      {
        key: "admin",
        label: "Administrador",
        sortable: true,
        class: "d-none d-sm-table-cell",
        formatter: (isAdmin) => (isAdmin ? "Sim" : "Não"),
      },
      {
        key: "actions",
        label: "Opções",
      },
    ];

    this.modes = {
      LOADING: "LOADING",
      ERROR: "ERROR",
      DEFAULT: "DEFAULT",
      CREATING: "CREATING",
      EDITING: "EDITING",
      DELETING: "DELETING",
    };
  },

  data: function () {
    return {
      currentMode: "",
      users: [],
      currentUser: {
        name: "",
        email: "",
        admin: false,
        password: "",
        passwordConfirmation: "",
      },
    };
  },

  mounted: async function () {
    this.fetchUsers();
  },

  computed: {
    ...mapState("menu", { isMenuHidden: "hidden" }),

    isEmpty() {
      return this.users.length === 0;
    },

    isInLoadingMode() {
      return this.currentMode === this.modes.LOADING;
    },

    isInErrorMode() {
      return this.currentMode === this.modes.ERROR;
    },

    isInDefaultMode() {
      return this.currentMode === this.modes.DEFAULT;
    },

    isInCreationMode() {
      return this.currentMode === this.modes.CREATING;
    },

    isInEditMode() {
      return this.currentMode === this.modes.EDITING;
    },

    isInDeleteMode() {
      return this.currentMode === this.modes.DELETING;
    },

    isEditorOpen() {
      return this.isInCreationMode || this.isInEditMode || this.isInDeleteMode;
    },
  },

  methods: {
    async fetchUsers() {
      this.currentMode = this.modes.LOADING;

      try {
        this.users = await UsersService.fetchUsers();
        this.currentMode = this.modes.DEFAULT;
      } catch (error) {
        this.currentMode = this.modes.ERROR;
        throw error;
      }
    },

    validateUserName() {
      if (this.currentUser.name.length === 0) {
        this.$toasted.global.ErrorToast("Nome de usuário não foi informado.");
        return false;
      }

      return true;
    },

    validateUserEmail() {
      if (this.currentUser.email.length === 0) {
        this.$toasted.global.ErrorToast(
          "E-mail de usuário não foi informado !"
        );

        return false;
      }

      return true;
    },

    validatePassword() {
      if (this.currentUser.password.length === 0) {
        this.$toasted.global.ErrorToast("Senha de usuário não foi informada !");
        return false;
      }

      return true;
    },

    validatePasswordConfirmation() {
      if (this.currentUser.passwordConfirmation.length === 0) {
        this.$toasted.global.ErrorToast(
          "Senha de usuário não foi confirmada !"
        );

        return false;
      }

      return true;
    },

    comparePasswords() {
      if (this.currentUser.password !== this.currentUser.passwordConfirmation) {
        this.$toasted.global.ErrorToast(
          "As senhas informadas são diferentes !"
        );

        return false;
      }

      return true;
    },

    validateCurrentUser() {
      const validations = [
        this.validateUserName,
        this.validateUserEmail,
        this.validatePassword,
        this.validatePasswordConfirmation,
        this.comparePasswords,
      ];

      const validationSucceeded = (validation) => validation();
      return validations.every(validationSucceeded);
    },

    async handleSave() {
      const isCurrentUserValid = this.validateCurrentUser();

      if (!isCurrentUserValid) return;

      await UsersService.createUser(this.currentUser);
      this.$toasted.global.SuccessToast("Usuário criado com sucesso !");

      this.fetchUsers();
      this.cancel();
    },

    async handleUpdate() {
      const isCurrentUserValid = this.validateCurrentUser();

      if (!isCurrentUserValid) return;

      await UsersService.updateUser(this.currentUser);
      this.$toasted.global.SuccessToast("Usuário atualizado com sucesso !");

      this.fetchUsers();
      this.cancel();
    },

    async handleDelete() {
      await UsersService.deleteUser(this.currentUser.id);
      this.$toasted.global.SuccessToast("Usuário removido com sucesso !");

      this.fetchUsers();
      this.cancel();
    },

    reset() {
      this.currentUser = {
        name: "",
        email: "",
        password: "",
        passwordConfirmation: "",
      };
    },

    cancel() {
      this.currentMode = this.modes.DEFAULT;
      this.reset();
    },

    handleCancel() {
      this.cancel();
    },

    handleCreationMode() {
      this.reset();
      this.currentMode = this.modes.CREATING;
    },

    handleEditMode(user) {
      this.currentUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        admin: user.admin,
        password: "",
        passwordConfirmation: "",
      };

      this.currentMode = this.modes.EDITING;
    },

    handleDeleteMode(user) {
      this.currentUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        admin: user.admin,
        password: "00000000",
        passwordConfirmation: "00000000",
      };

      this.currentMode = this.modes.DELETING;
    },
  },
};
</script>

<style>
</style>
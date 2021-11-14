<template>
  <div class="user">
    <div class="user__card">
      <div class="user__image">
        <Gravatar :email="email" alt="Usuário" />
      </div>
      <span class="d-none d-md-block user__name">{{ name }}</span>
      <i class="fas fa-angle-down user__arrow"></i>
    </div>
    <div class="user__dropdown">
      <router-link v-if="admin" class="user__link" to="/admin">
        <i class="fas fa-cogs user__icon">Administração</i>
      </router-link>
      <a class="user__link" href @click.prevent="handleLogout">
        <i class="fas fa-sign-out-alt user__icon">Sair</i>
      </a>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import Gravatar from "vue-gravatar";
import AuthenticationService from "@/services/Authentication";

export default {
  name: "User",

  components: {
    Gravatar,
  },

  computed: {
    ...mapGetters("user", ["name", "email", "admin"]),
  },

  methods: {
    ...mapMutations("user", ["removeAccount"]),

    handleLogout() {
      AuthenticationService.logout();
      this.removeAccount();

      this.$router.push({ name: "login" });
    },
  },
};
</script>

<style>
.user {
  height: 100%;
  position: relative;
}
.user__card {
  align-items: center;
  color: white;
  cursor: pointer;
  display: flex;
  height: 100%;
  justify-content: space-evenly;
  max-width: 250px;
  min-width: 85px;
  padding: 0 20px;
}
.user__card:hover {
  background-color: rgba(0, 0, 0, 0.2);
}
.user__image > img {
  border-radius: 50%;
  border: 2px white solid;
  height: 35px;
  margin-right: 5px;
  width: 35px;
}
.user__name {
  margin: 0 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.user__arrow {
  margin-left: 5px;
}
.user__dropdown {
  background-color: #f9f9f9;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  min-width: fit-content;
  opacity: 0;
  padding: 10px;
  position: absolute;
  right: 0;
  transition: opacity 500ms linear;
  visibility: hidden;
  width: 100%;
  z-index: 1;
}
.user:hover .user__dropdown {
  opacity: 1;
  visibility: visible;
}
.user__link {
  padding: 10px;
  text-decoration: none;
  white-space: nowrap;
}
.user__link:hover {
  background-color: #ededed;
}
.user__link,
.user__link:hover {
  color: black;
}
.user__icon::before {
  padding-right: 10px;
}
</style>
<template>
  <div id="app" class="app__grid">
    <Header title="Cod3r - Base de Conhecimento" :showControls="isUserLogged" />
    <Menu />
    <Loading v-if="loading" />
    <Content v-else />
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header";
import Menu from "@/components/Menu";
import Loading from "@/components/Loading";
import Content from "@/components/Content";
import Footer from "@/components/Footer";

import AuthenticationService from "@/services/Authentication";
import CategoriesService from "@/services/Categories";

import { mapState, mapMutations } from "vuex";

export default {
  name: "App",

  components: { Header, Menu, Loading, Content, Footer },

  data: function () {
    return {
      loading: true,
    };
  },

  created: function () {
    AuthenticationService.subscribeToExternalLogin(async () => {
      const token = AuthenticationService.getToken();
      await this.authorize(token);

      await CategoriesService.updateCategories();

      const redirectPath = this.$route.query.next;

      if (redirectPath) {
        return this.$router.push({ path: redirectPath });
      }

      this.$router.push({ name: "home" });
    });

    AuthenticationService.subscribeToExternalLogout(this.unauthorize);
    AuthenticationService.subscribeToTokenExpiration(this.unauthorize);
  },

  mounted: async function () {
    try {
      const token = AuthenticationService.getToken();
      if (!token) return this.unauthorize();

      await this.authorize(token);

      await CategoriesService.updateCategories();
    } catch (error) {
      this.unauthorize();
      throw error;
    }
  },

  computed: {
    ...mapState("user", { currentUser: "account" }),

    isUserLogged() {
      return Boolean(this.currentUser);
    },
  },

  methods: {
    ...mapMutations("user", ["setAccount", "removeAccount"]),
    ...mapMutations("categories", { updateCategoriesStore: "update" }),

    unauthorize() {
      AuthenticationService.logout();

      if (this.$route.name === "login") {
        this.loading = false;
        return;
      }

      this.$router.push({
        name: "login",
        query: {
          next: this.$route.path,
        },
      });

      this.loading = false;
    },

    async authorize(token) {
      await AuthenticationService.authorize(token);
      this.loading = false;
    },
  },
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  font-family: "Lato", sans-serif;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
}
#app {
  height: 100vh;
}
.app__grid {
  display: grid;

  grid-template-areas:
    "header header"
    "menu content"
    "menu footer";

  grid-template-columns: min-content 1fr;
  grid-template-rows: 60px 1fr 40px;
}
</style>
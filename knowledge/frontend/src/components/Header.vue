<template>
  <header class="header">
    <div class="header__item header__item--corner">
      <a class="header__menu" @click="toggleMenu" v-if="showControls">
        <i class="fas fa-bars" :class="iconClass"></i>
      </a>
    </div>
    <div class="header__item header__item--middle">
      <h1 class="header__title">
        <router-link class="header__link" to="/">{{ title }}</router-link>
      </h1>
    </div>
    <div class="header__item header__item--corner">
      <User class="header__user" v-if="showControls" />
    </div>
  </header>
</template>

<script>
import User from "@/components/User";

export default {
  name: "Header",
  components: { User },
  props: {
    title: String,
    showControls: Boolean,
  },
  computed: {
    iconClass() {
      const isMenuHidden = this.$store.state.menu.hidden;
      return isMenuHidden ? "fa-bars" : "fa-times";
    },
  },
  methods: {
    toggleMenu() {
      this.$store.commit("menu/toggle");
    },
  },
};
</script>

<style>
.header {
  align-items: center;
  background: linear-gradient(to right, #1e469a, #49a7c1);
  display: flex;
  grid-area: header;
  justify-content: space-between;
}
.header__item {
  display: flex;
  height: 100%;
}
.header__item--corner {
  flex: 1;
}
.header__item--middle {
  flex: 2;
}
.header__menu {
  align-items: center;
  cursor: pointer;
  display: flex;
  height: 100%;
  justify-content: center;
  width: 60px;
}
.header__menu:hover {
  background-color: rgba(0, 0, 0, 0.2);
  text-decoration: none;
}
.header__menu,
.header__menu:hover {
  color: white;
}
.header__title {
  align-self: center;
  color: white;
  font-size: clamp(0.5rem, 3vw, 1.2rem);
  font-weight: 100;
  margin: 0 auto;
}
.header__link {
  cursor: pointer;
}
.header__link,
.header__link:hover {
  color: white;
  text-decoration: none;
}
.header__user {
  margin-left: auto;
}
</style>
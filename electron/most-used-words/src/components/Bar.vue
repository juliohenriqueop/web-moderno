<template>
  <v-app-bar app flat>
    <v-toolbar-title>{{ title }}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon @click="switchTheme">
      <v-icon>mdi-lightbulb-outline</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  props: {
    title: String
  },
  methods: {
    switchTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
  },
};
</script>
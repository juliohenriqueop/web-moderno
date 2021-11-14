<template>
  <v-app>
    <Bar title="Most Used Words" />
    <v-main>
      <Content />
    </v-main>
  </v-app>
</template>

<script>
import Content from "./Content";
import Bar from "./Bar";

export default {
  name: "App",
  components: {
    Bar,
    Content,
  },
};
</script>
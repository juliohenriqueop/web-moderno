<template>
  <div class="title">
    <h2 class="title__main">
      <i class="title__icon" :class="iconClass">{{ title }}</i>
    </h2>
    <h3 class="title__subtitle">{{ subtitle }}</h3>
    <hr />
  </div>
</template>

<script>
export default {
  name: "Title",
  props: {
    iconClass: String,
    title: String,
    subtitle: String,
  },
};
</script>

<style>
.title {
  margin: 10px;
}
.title__main {
  margin: 0;
}
.title__icon::before {
  padding-right: 10px;
}
.title__subtitle {
  color: #777;
  font-size: clamp(1rem, 3vw, 1.3rem);
  margin-top: 5px;
}
</style>
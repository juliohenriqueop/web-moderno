<template>
  <div class="authModal">
    <img src="@/assets/logo.png" width="200" alt="Logo" />
    <hr class="authModal__line" />
    <h2 class="authModal__title">{{ title }}</h2>
    <slot />
  </div>
</template>

<script>
export default {
  name: "Modal",

  props: {
    title: String,
  },
};
</script>

<style>
.authModal {
  align-items: center;
  background-color: white;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  padding: 35px;
  width: 350px;
}

.authModal__line {
  background-image: linear-gradient(
    to right,
    rgba(120, 120, 120, 0),
    rgba(120, 120, 120, 0.75),
    rgba(120, 120, 120, 0)
  );
  border: 0;
  height: 1px;
  width: 100%;
}

.authModal__title {
  font-size: 1.2em;
  font-weight: 100;
  margin-bottom: 15px;
  margin-top: 5px;
}
</style>
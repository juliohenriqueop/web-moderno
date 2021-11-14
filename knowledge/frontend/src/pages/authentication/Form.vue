<template>
  <b-form
    class="authForm"
    v-bind="$props"
    @submit.prevent="emitSubmissionEvent"
    novalidate
  >
    <slot />
  </b-form>
</template>

<script>
export default {
  name: "Form",

  methods: {
    emitSubmissionEvent() {
      this.$emit("onSubmit");
    },
  },
};
</script>

<style>
.authForm {
  width: 100%;
}

.authForm > * {
  width: 100%;
  margin-bottom: 20px;
}

.authForm button[type="submit"] {
  margin-top: 10px;
}
</style>
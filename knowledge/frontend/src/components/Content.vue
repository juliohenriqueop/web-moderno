<template>
  <div class="content" ref="contentRef">
    <transition
      mode="out-in"
      enter-active-class="content--animated"
      enter-class="content--transparent"
      leave-active-class="content--animated"
      leave-to-class="content--transparent"
    >
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: "Content",

  mounted: function () {
    this.$store.subscribe((mutation) => {
      if (mutation.type === "content/scrollUp") {
        this.$refs.contentRef.scrollTo({ top: 0, behavior: "smooth" });
      }
      if (mutation.type === "content/scrollTo") {
        this.$refs.contentRef.scrollTo({
          top: mutation.payload.top,
          left: mutation.payload.left,
          behavior: "smooth",
        });
      }
    });
  },
};
</script>

<style>
.content {
  background-color: #efefef;
  grid-area: content;
  overflow: hidden;
  overflow-y: scroll;
}
.content--animated {
  transition-duration: 100ms;
  transition-property: opacity, transform;
  transition-timing-function: ease-in-out;
}
.content--transparent {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
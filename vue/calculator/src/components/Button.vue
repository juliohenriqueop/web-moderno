<template>
  <button class="button" :class="{ double, triple, operation }"
    @click="$emit('btn-click', label)">{{ label }}</button>
</template>

<script>
export default {
  props: {
    label: {},
    double: { type: Boolean },
    triple: { type: Boolean },
    operation: { type: Boolean }
  }
}
</script>

<style>
  .button {
    font-size: 1.4em;
    background-color: #F0F0F0;
    border: none;
    /* border-right: solid 1px #888; */
    /* border-bottom: solid 1px #888; */
    outline: none;
  }

  .button:active {
    background-color: #CCC;
  }

  .button.double {
    grid-column: span 2;
  }

  .button.triple {
    grid-column: span 3;
  }

  .button.operation {
    background-color: #FA8231;
    color: white;
  }

  .button.operation:active {
    background-color: #FA8231CC;
  }
</style>
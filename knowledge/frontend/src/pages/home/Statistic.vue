<template>
  <div class="statistic">
    <i
      class="statistic__icon"
      :class="iconClass"
      :style="{ color: color || 'black' }"
    >
    </i>
    <div class="statistic__content">
      <span class="statistic__title">{{title}}</span>
      <span class="statistic__value">{{value}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Statistic',
  props: {
    title: String,
    value: Number,
    iconClass: String,
    color: String
  }
}
</script>

<style>
  .statistic {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
    display: flex;
    flex: 1;
    min-width: 250px;
    padding: 20px;
  }
  .statistic__icon {
    align-self: center;
    font-size: 5rem;
  }
  .statistic__content {
    align-items: flex-end;
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  .statistic__title {
    font-size: 1.2rem;
  }
  .statistic__value {
    font-size: 3rem;
  }
</style>
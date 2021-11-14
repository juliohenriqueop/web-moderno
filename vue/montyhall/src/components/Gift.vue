<template>
  <div class="gift">
    <div class="gift__tie gift__tie--horizontal"></div>
    <div class="gift__tie gift__tie--vertical"></div>
    <div class="gift__cover"></div>
    <div class="gift__box"></div>
  </div>
</template>

<script>
export default {
  name: 'Gift'
}
</script>

<style>
.gift {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
}
.gift__tie {
  position: absolute;
  background-color: red;
}
.gift__tie--horizontal {
  top: 40px;
  width: 90px;
  height: 15px;
}
.gift__tie--vertical {
  width: 15px;
  height: 85px;
}
.gift__cover {
  width: 100px;
  height: 25px;
  background-color: #7AA944;
}
.gift__box {
  width: 90px;
  height: 60px;
  background-color: #5C7E32;
}
</style>
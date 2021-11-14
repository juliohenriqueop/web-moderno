<template>
  <div id="app">
    <h1>Calculadora</h1>
    <Calculator />
  </div>
</template>

<script>
import Calculator from './Calculator'

export default {
  components: {
    Calculator
  }
}
</script>

<style>
  @font-face {
    font-family: "RobotoMono";
    src: url("../assets/fonts/RobotoMono-Thin.ttf");
  }

  * {
    font-family: "RobotoMono", monospace;
    box-sizing: border-box;
  }

  body {
    margin: 0;
  }

  #app {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: white;
    background: linear-gradient(to right, #67b26f, #4ca2cd);
  }
</style>
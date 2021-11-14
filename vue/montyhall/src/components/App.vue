<template>
  <div class="app">
    <h1 class="app__title">Problema de Monty Hall</h1>
    <div class="app__form">
      <div v-if="!started">
        <label for="doorsAmountInput">Quantas Portas ?</label>
        <input
          class="app__input"
          type="number"
          min="1"
          size="3"
          id="doorsAmountInput"
          v-model.number="doorsAmount"
        />
      </div>
      <div v-if="!started">
        <label for="selectedDoorInput">Qual é a porta premiada ?</label>
        <input
          class="app__input"
          type="number"
          min="1"
          :max="doorsAmount"
          size="1"
          id="selectedDoorInput"
          v-model.number="selectedDoor"
        />
      </div>
      <button class="app__button" v-if="!started" @click="start">
        Iniciar
      </button>
      <button class="app__button" v-if="started" @click="restart">
        Reiniciar
      </button>
    </div>
    <div class="app__doors" v-if="started">
      <div v-for="doorNumber in doorsAmount" :key="doorNumber">
        <Door :number="doorNumber" :hasGift="doorNumber === selectedDoor" />
      </div>
    </div>
  </div>
</template>

<script>
import Door from "./Door";

export default {
  name: "App",
  components: {
    Door,
  },
  data: function () {
    return {
      started: false,
      doorsAmount: 3,
      selectedDoor: 1,
    };
  },
  methods: {
    start() {
      this.started = true;
    },
    restart() {
      this.started = false;
    },
  },
};
</script>

<style>
* {
  box-sizing: border-box;
  font-family: "Montserrat", sans-serif;
}
body {
  color: white;
  background: #8e2de2;
  background: linear-gradient(to right, #4a00e0, #8e2de2);
}
.app {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.app__title {
  border: 1px solid black;
  background-color: #0004;
  padding: 20px;
  margin-bottom: 60px;
}
.app__form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
}
.app__input {
  text-align: center;
}
.app__input,
.app__button {
  margin: 10px;
  font-size: 1.5rem;
}
.app__doors {
  align-self: stretch;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
</style>
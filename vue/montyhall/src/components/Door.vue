<template>
  <div class="door">
    <div
      class="door__frame"
      :class="{ ['door__frame--selected']: selected && !open }"
    >
      <Gift v-if="open && hasGift" />
    </div>
    <div
      class="door__panel"
      :class="{ ['door__panel--open']: open }"
      @click="switchSelection"
    >
      <div
        class="door__sign"
        :class="{
          ['door__sign--hidden']: open,
          ['door__sign--selected']: selected,
        }"
      >
        {{ number }}
      </div>
      <div
        class="door__knob"
        :class="{
          ['door__knob--hidden']: open,
          ['door__knob--selected']: selected,
        }"
        @click="openDoor"
      ></div>
    </div>
  </div>
</template>

<script>
import Gift from "./Gift";

export default {
  components: {
    Gift,
  },
  props: {
    number: Number,
    hasGift: Boolean,
  },
  data: function () {
    return {
      open: false,
      selected: false,
    };
  },
  methods: {
    switchSelection() {
      this.selected = !this.selected;
    },
    openDoor() {
      this.open = true;
    },
  },
};
</script>

<style>
:root {
  --door-border: 5px solid brown;
  --selected-border: 5px solid yellow;
}
.door {
  position: relative;
  width: 200px;
  height: 310px;
  border-bottom: 10px solid #aaa;
  margin-bottom: 20px;
  font-size: 3rem;
  display: flex;
  justify-content: center;
}
.door__frame {
  position: relative;
  width: 180px;
  height: 300px;
  border-left: var(--door-border);
  border-top: var(--door-border);
  border-right: var(--door-border);
  display: flex;
  justify-content: center;
  align-items: flex-end;
}
.door__frame--selected {
  border-left: var(--selected-border);
  border-top: var(--selected-border);
  border-right: var(--selected-border);
}
.door__panel {
  position: absolute;
  top: 5px;
  width: 170px;
  height: 295px;
  background-color: chocolate;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
}
.door__panel--open {
  background-color: #0007;
}
.door__sign {
  user-select: none;
}
.door__sign--selected {
  color: yellow;
}
.door__knob {
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: brown;
  align-self: flex-start;
  margin-top: 60px;
}
.door__knob--selected {
  background-color: yellow;
}
.door__sign--hidden,
.door__knob--hidden {
  display: none;
}
</style>
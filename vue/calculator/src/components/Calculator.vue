<template>
  <div class="calculator">
    <Display :value="displayValue" />
    <Button label="AC" triple @btn-click="clear" />
    <Button label="÷" operation @btn-click="setOperation" />
    <Button label="7" @btn-click="appendDigit" />
    <Button label="8" @btn-click="appendDigit" />
    <Button label="9" @btn-click="appendDigit" />
    <Button label="x" operation @btn-click="setOperation" />
    <Button label="4" @btn-click="appendDigit" />
    <Button label="5" @btn-click="appendDigit" />
    <Button label="6" @btn-click="appendDigit" />
    <Button label="-" operation @btn-click="setOperation" />
    <Button label="1" @btn-click="appendDigit" />
    <Button label="2" @btn-click="appendDigit" />
    <Button label="3" @btn-click="appendDigit" />
    <Button label="+" operation @btn-click="setOperation" />
    <Button label="0" double @btn-click="appendDigit" />
    <Button label="." @btn-click="appendDigit" />
    <Button label="=" operation @btn-click="setOperation" />
  </div>
</template>

<script>
import Button from "./Button";
import Display from "./Display";

export default {
  data: function () {
    return {
      displayValue: "0",
      mustClearDisplay: false,
      operation: null,
      values: [0, 0],
      activeValue: 0,
    };
  },
  components: {
    Button,
    Display,
  },
  methods: {
    clear() {
      Object.assign(this.$data, this.$options.data.apply(this));
    },
    setOperation(operation) {
      this.mustClearDisplay = true;

      if (operation !== "=") this.operation = operation;

      if (this.activeValue === 0) {
        this.activeValue = 1;
      } else {
        const values = this.values;

        let result = 0;
        switch (this.operation) {
          case "+":
            result = values[0] + values[1];
            break;
          case "-":
            result = values[0] - values[1];
            break;
          case "x":
            result = values[0] * values[1];
            break;
          case "÷":
            result = values[0] / values[1];
            break;
          default:
            result = this.values[0];
            break;
        }

        this.activeValue = 0;
        this.values[0] = result;
        this.values[1] = 0;

        this.displayValue = `${result}`;
      }
    },
    appendDigit(digit) {
      if (this.displayValue.includes(".") && digit === ".") return;

      if (this.displayValue === "0" && digit !== ".")
        this.mustClearDisplay = true;

      if (this.mustClearDisplay) this.displayValue = "";

      this.displayValue += digit;
      this.mustClearDisplay = false;

      if (digit !== ".") {
        const activeValue = this.activeValue;
        const values = this.values;

        const displayValue = this.displayValue;
        values[activeValue] = parseFloat(displayValue);

        this.values = values;
      }
    },
  },
};
</script>

<style>
.calculator {
  width: 320px;
  border-radius: 5px;
  overflow: hidden;

  display: grid;
  grid-template-columns: repeat(4, 25%);
  grid-template-rows: 1fr repeat(5, 48px);
}
</style>
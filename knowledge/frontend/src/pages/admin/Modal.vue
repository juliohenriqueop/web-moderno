<template>
  <b-modal
    no-stacking
    centered
    scrollable
    modal-class="editor__modal"
    dialog-class="editor__dialog"
    cancel-title="Cancelar"
    :ok-title="okButtonTitle"
    :title="title"
    :visible="show"
    :ok-variant="okButtonVariant"
    @hidden="emitCancelEvent"
    @ok="emitOkEvent"
  >
    <slot />
  </b-modal>
</template>

<script>
export default {
  name: "Modal",

  props: {
    title: String,
    show: Boolean,
    mode: String,
  },

  computed: {
    okButtonTitle() {
      switch (this.mode) {
        case "DELETING": {
          return "Apagar";
        }
        case "EDITING": {
          return "Salvar";
        }
        default: {
          return "Criar";
        }
      }
    },

    okButtonVariant() {
      switch (this.mode) {
        case "DELETING": {
          return "danger";
        }
        case "EDITING": {
          return "warning";
        }
        default: {
          return "primary";
        }
      }
    },
  },

  methods: {
    emitCancelEvent() {
      this.$emit("onCancel");
    },

    emitOkEvent() {
      switch (this.mode) {
        case "DELETING": {
          this.$emit("onDelete");
          break;
        }
        case "EDITING": {
          this.$emit("onUpdate");
          break;
        }
        default: {
          this.$emit("onSave");
        }
      }
    },
  },
};
</script>

<style>
.editor__modal {
  padding: 0px 5px !important;
}
.editor__dialog {
  min-width: 85%;
}
</style>
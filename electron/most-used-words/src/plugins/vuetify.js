import Vue from 'vue';
import Vuetify, {
  colors
} from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: false,
    themes: {
      dark: {
        inputBorder: colors.grey.lighten2,
        filePill: colors.grey.darken3
      },
      light: {
        inputBorder: colors.grey.darken2,
        filePill: colors.grey.lighten4
      }
    }
  }
});
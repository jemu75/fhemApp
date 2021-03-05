import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import de from 'vuetify/es5/locale/de';
import colors from 'vuetify/es5/util/colors';

Vue.use(Vuetify);

export default new Vuetify({
    lang: {
      locales: { de },
      current: 'de',
    },
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.grey.darken4,
          secondary: colors.grey.darken3,
          success: colors.green.accent2,
          accent: colors.green.accent2
        },
        light: {
          secondary: colors.grey.lighten3,
        }
      }
    }
});

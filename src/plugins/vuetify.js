import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import de from 'vuetify/es5/locale/de';
import colors from 'vuetify/es5/util/colors';
import config from '/public/assets/app.config.json';

Vue.use(Vuetify);

const settings = {
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
};

if(config.theme) Object.assign(settings.theme, config.theme);

export default new Vuetify(settings);

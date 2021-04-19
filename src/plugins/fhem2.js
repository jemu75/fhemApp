import EventEmitter from 'events';

class Fhem extends EventEmitter {
  constructor() {
    super();

    this.app = {
      connection: {
        location: window.location.protocol + '//' + window.location.hostname,
        port: window.location.port,
        path: 'fhem' //root path
      },
      socket: null,
      session: {
        connect: false,
        csrf: null,
        restart: false,
        restartCnt: 0,
        logList: [],
        logLast: {}
      },
      options: {
        lang: 'de', // default language
        debugMode: false,
        debugLevel: 2, // 1 = fehler, 2 = status, 3 = requests, 4 = informChannel, 5 = internals
        loading: false,
        loadCount: 0,
        clockInterval: 5000,
        clock: null,
        date: null,
        maxChartPoints: 100,
        updateProcess: false,
        logRecord: true,
        logBuffer: 500,
        ignoreFhemRoom: false,
        ignoreFhemGroup: false,
        ignoreFhemSortby: false,
        mobileHeader: false
      },
      theme: {},
      templates: [], // only the fallback for v3.1
      componentMap: [],
      data: {
        roomList: [],
        groupList: [],
        deviceList: [],
        header: ''
      }
    }
  }

  // coreFunction: handle log-messages
  log(message) {
    let time = new Date().toLocaleTimeString(this.app.options.lang);
    let miSecs = new Date().getMilliseconds();
    let result = {
      time: time + ':' + ('000' + miSecs).slice(-3),
      msg: message.msg || '',
      lvl: message.lvl || 5
    }

    if(result.lvl <= this.app.options.debugLevel) {
      console.log(result);
    }
  }

  // coreFunction: to get json-data from a server-file
  async getJsonFile(file) {
    let header = new Headers();
    header.append('pragma', 'no-cache');
    header.append('cache-control', 'no-cache');

    let options = {
      method: 'GET',
      headers: header,
    };

    return await fetch(file, options)
      .then((res) => {
        let contentType = res.headers.get("content-type")
        if(contentType.indexOf("application/json") != -1) {
          return res.json()
        } else {
          throw new Error('No JSON-Data found')
        }
      })
      .catch((err) => this.log({ lvl: 1, msg: err.message + ' at ' + file }))
  }

  // coreFunction: to merge config-data with app-default scheme
  async readConfig(file) {
    let cfg = await this.getJsonFile(file);
    if(cfg) {
      for(const item of Object.keys(cfg)) {
        if(item in this.app) Object.assign(this.app[item], cfg[item]);
      }
      this.log({ lvl: 5, msg: 'Read Configuration from ' + file + ' completed.' });
    }
  }

  // mainFunction: Initializing FHEM App
  async init(vuetify, i18n) {
    this.log({ lvl: 2, msg: 'Starting FHEMApp...'});
    await this.readConfig('./cfg/config.json');

    if(vuetify && this.app.theme) {
      vuetify.framework.theme.dark = this.app.theme.dark;
      Object.assign(vuetify.framework.theme.themes.light, this.app.theme.themes.light);
      Object.assign(vuetify.framework.theme.themes.dark, this.app.theme.themes.dark);
    }

    if(i18n && this.app.options.lang) {
      i18n.locale = this.app.options.lang;
    }
  }
}

export default {
  install(Vue, vuetify, i18n) {

    // add an instance method
    Vue.prototype.$myMethod = new Fhem;

    Vue.prototype.$myMethod.init(vuetify, i18n);
  }
}

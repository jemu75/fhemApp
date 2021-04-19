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

  // coreFunction: create URL - params [ { param: '', value: '' }, {...} ]
  createURL(params) {
    let conn = this.app.connection;

    let location = conn.location ? conn.location : '';
    let port = conn.port ? ':' + conn.port.replace(':','') : '';
    let path = conn.path ? '/' + conn.path.replace('/','') : '';
    let query = '';

    if(typeof params == 'object' && params.length > 0) {
      params.forEach((item) => {
        if(item.param && item.value) {
          query += query ? '&' : '?';
          query += item.param + '=' + encodeURIComponent(item.value)
        }
      });
    }

    return location + port + path + query;
  }

  // mainFunction: get element from deep nested objects
  getEl(obj, ...args) {
    return args.reduce((obj, level) => obj && obj[level], obj);
  }

  // coreFunction: send request to server
  async request(cmd, resType, obj) {
    let options = [];
    if(resType != 'csrf') options.push({ param: 'fwcsrf', value: this.app.session.csrf });
    if(resType === 'json' || resType === 'csrf') options.push({ param: 'XHR', value: '1' });
    if(typeof cmd === 'object') cmd.length > 0 ? options.push(...cmd) : options.push(cmd);
    if(typeof cmd === 'string') options.push({ param: 'cmd', value: cmd });
    let req = this.createURL(options);

    this.log({ lvl: 3, msg: 'Request: ' + req })

    return await fetch(req)
      .then((res) => {
        let result = null;

        if(resType === 'csrf') result = res.headers.get('x-fhem-csrftoken');
        if(resType === 'json') result = res.json();
        if(!result) result = res.text();

        return typeof obj === 'object' ? Object.assign(obj, { data: result }) : result;
      })
      .catch((err) => this.log({ lvl: 1, msg: err.message + ' - Request: ' + req }))
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
    } else {
      this.log({ lvl: 2, msg: 'No Configuration File found. FHEMApp starting with default settings.'})
    }
  }

  // subFunction: for doUpdate(), return Data from update as Object
  handleData(line) {
    let arr = JSON.parse(line);
    let result = null;

    if(!arr[2].match('<div')) {
      if(!arr[0].match('-ts')) {
        this.log({ lvl: 4, msg: arr[0].replace('-',': ') + ': ' + arr[1] });
      }

      if(arr[0].match('global-UPDATE')) {
        this.app.options.updateProcess = false;
      } else if(arr[0].match('-a-')) {
        let parts = arr[0].split('-a-');
        result = {
          Name: parts[0],
          devicePart: 'Attributes',
          param: parts[1],
          value: arr[1]
        }
      } else if(arr[0].match('-')) {
        let parts = arr[0].split('-');
        result = {
          Name: parts[0],
          devicePart: 'Readings',
          paramPart: arr[0].match('-ts') ? 'Time' : 'Value',
          param: arr[0].replace('-ts', '').replace(parts[0] + '-', ''),
          value: arr[1]
        }
      } else {
        // alles was nicht verarbeitet werden kann
        this.log({ lvl: 3, msg: 'No Handling for this FHEM data. ' + arr })
      }
    }

    return result;
  }

  // subFunction: calls after websockt message
  doUpdate(message) {
    let lines = message.data.split('\n');

    for(const line of lines) {
      if(line.length > 0)  {
        let data = this.handleData(line);
        if(data) {
          let idx = 0;

          for(const device of this.app.data.deviceList) {
            let target = this.app.data.deviceList[idx];
            let source = Object.assign({}, target);

            if(device.Name === data.Name) {
              if(data.devicePart === 'Readings' && this.getEl(source, 'Readings', data.param, data.paramPart)) {
                source.Readings[data.param][data.paramPart] = data.value;
              }
              if(data.devicePart === 'Attributes' && this.getEl(source, 'Attributes', data.param)) {
                source.Attributes[data.param] = data.value;
              }
              this.app.data.deviceList.splice(idx, 1, source);
            }

            if('Connected' in device) {
              let i = 0;
              for(const item of Object.values(device.Connected)) {
                if(item.Name === data.Name) {
                  let alias = Object.keys(device.Connected)[i];

                  if(data.devicePart === 'Readings' && this.getEl(source.Connected[alias], 'Readings', data.param, data.paramPart)) {
                    source.Connected[alias].Readings[data.param][data.paramPart] = data.value;
                  }
                  if(data.devicePart === 'Attributes' && this.getEl(source.Connected[alias], 'Attributes', data.param)) {
                    source.Connected[alias].Attributes[data.param] = data.value;
                  }
                  this.app.data.deviceList.splice(idx, 1, source);
                }

                i++;
              }
            }
            idx++;
          }
        }
      }
    }
  }

  // subFunction: calls after websocket is opened
  async wsOpen() {
    this.app.session.connect = true;

    this.log({ lvl: 2, msg: 'Connection with FHEM is opened.'})
  }

  // subFunction: calls after websocket is closed
  async wsClose() {
    this.app.session.connect = false;
    this.app.session.csrf = null;
    this.app.session.socket = null;

    if(!this.app.session.restart) {
      let msecs = this.app.session.restartCnt == 0 ? 1 : 3000;

      this.log({ lvl: 5, msg: 'Restart-Sequence is started. (restart counter: ' +  this.app.session.restartCnt +  ' - restart on: '+ msecs + ' milliseconds)'})

      this.app.session.restart = true;
      setTimeout(() => {
        this.app.session.restart = false;
        this.app.session.restartCnt ++;
        this.wsStart()
      }, msecs);

      this.log({ lvl: 2, msg: 'Connection with FHEM was closed. Try to Reconnect in ' + (msecs / 1000) + ' seconds...' })
    }
  }

  // coreFuntion: open a websocket to FHEM-Server
  async wsStart() {
    let params = [ { param: 'inform', value: 'type=status;filter=.*;fmt=JSON' }, { param: 'XHR', value: '1' } ];
    let url = this.createURL(params).replace(/^http/i,'ws');

    this.app.session.csrf = await this.request({}, 'csrf')
    this.app.socket = new WebSocket(url);

    this.app.socket.onopen = () => this.wsOpen();
    this.app.socket.onmessage = (message) => this.doUpdate(message);
    this.app.socket.onclose = () => this.wsClose();
  }

  // mainFunction: Initializing FHEM App
  async init(vuetify, i18n) {
    this.log({ lvl: 2, msg: 'Starting FHEMApp...'});
    await this.readConfig('./cfg/config.json');
    this.wsStart();

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

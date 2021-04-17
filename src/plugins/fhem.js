import EventEmitter from 'events';

export default class Fhem extends EventEmitter {
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
        debugLevel: 3, // 1 = fehler, 2 = status, 3 = requests, 4 = informChannel, 5 = internals
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

  set loading(val) {
    if(val) this.app.options.loadCount ++;
    if(!val && this.app.options.loadCount > 0) this.app.options.loadCount --;
    if(this.app.options.loadCount > 0 && !this.app.options.loading) this.app.options.loading = true;
    if(this.app.options.loadCount === 0) this.app.options.loading = false;
  }

  set log(data) {
    let target = {
      type: 'info',
      timestamp: Date.now(),
      timeFlag: null,
      debugLevel: this.app.options.debugLevel,
      message: '',
      icon: '',
      color: ''
    }

    Object.assign(target, data);

    let time = new Date(target.timestamp).toLocaleTimeString(this.app.options.lang);
    let miSecs = new Date(target.timestamp).getMilliseconds();

    target.timeFlag = time + ':' + ('000' + miSecs).slice(-3);
    if(target.type === 'error') { target.icon = 'mdi-alert-outline'; target.color = 'error' } // debugLevel 1 error
    if(target.type === 'status') { target.icon = 'mdi-connection'; target.color = 'info' } // debugLevel 2 status
    if(target.type === 'request') { target.icon = 'mdi-send-circle-outline'; target.color = 'success' } // debugLevel 3 request
    if(target.type === 'warning') { target.icon = 'mdi-help-circle-outline'; target.color = 'warning' } // debugLevel 3 request
    if(target.type === 'info') { target.icon = 'mdi-sync'; target.color = 'success' } // debugLevel 4 request
    if(target.type === 'intern') { target.icon = 'mdi-hexagon-multiple-outline'; target.color = 'warning' } // debugLevel 5 internals

    this.app.session.logLast = target;

    if(target.type === 'error') this.emit('message', { type: target.type, message: target.message, meta: target.meta });

    if(this.app.options.logRecord && target.debugLevel <= this.app.options.debugLevel) {
      this.app.session.logList.unshift(target);
      if(this.app.session.logList.length > this.app.options.logBuffer) this.app.session.logList.length = this.app.options.logBuffer;
    }
  }

  // mainfunction, Calculate Date with diff of days
  getDate(val) {
    let diff = val ? parseInt(val) : 0;
    return ( d => new Date(d.setDate(d.getDate() + diff)).toISOString() )(new Date).split('T')[0];
  }

  // mainfunction, Format Date and Time from FHEM
  getDateTime(val) {
    let timestamp = val ? val : new Date().toISOString();

    return new Date(timestamp.replace(' ','T')).toLocaleString(this.app.options.lang, { dateStyle: 'short', timeStyle: 'medium' }).replace(',','');
  }

  // mainfunction get element from deep nested objects
  getEl(obj, ...args) {
    return args.reduce((obj, level) => obj && obj[level], obj);
  }

  // corefunction, create URL - params [ { param: '', value: '' }, {...} ]
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

  // corefunction, get csrf-Token from FHEM
  async getCsrfToken() {
    let promise = new Promise((resolve, reject) => {
      this.request({}, 'csrf')
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    })
    return promise;
  }

  // corefunction send request to FHEM Server
  async request(cmd, resType, result) {
    let promise = new Promise((resolve, reject) => {
      let options = [];
      if(resType != 'csrf') options.push({ param: 'fwcsrf', value: this.app.session.csrf });
      if(resType === 'json' || resType === 'csrf') options.push({ param: 'XHR', value: '1' });
      if(typeof cmd === 'object') cmd.length > 0 ? options.push(...cmd) : options.push(cmd);
      if(typeof cmd === 'string') options.push({ param: 'cmd', value: cmd });
      let req = this.createURL(options);

      this.log = { type: 'request', message: 'Request: ' + req, debugLevel: 3 };

      fetch(req)
        .then((res) => {
          if(res.ok) {
            if(resType === 'csrf') {
              let headerResult = res.headers.get('x-fhem-csrftoken');
              resolve(typeof result === 'object' ? Object.assign(result, { data: headerResult }) : headerResult);
            } else if(resType === 'json') {
              res.json().then((jsonResult) => {
                resolve(typeof result === 'object' ? Object.assign(result, { data: jsonResult }) : jsonResult);
              })
            } else {
              res.text().then((textResult) => {
                resolve(typeof result === 'object' ? Object.assign(result, { data: textResult }) : textResult);
              });
            }
          }
        })
        .catch((err) => {
          reject({ error: err, request: req });
        })
    })
    return promise;
  }

  // subfunction for readLogFile() - split timestamp and value and reduce data if large array
  handleLogData(data) {
    let items = data.split('\n');
    if(items.length > 3) items.splice(-3, 3);
    let result = [];
    let steps = items.length > this.app.options.maxChartPoints ? parseInt(items.length / this.app.options.maxChartPoints) : 1; // important for performance
    let nextStep = steps;
    let sumVal = 0;
    let idx = 1;

    for(const item of items) {
      let itemPart = item.split(' ');
      let timestamp = Date.parse(itemPart[0].replace('_','T'));
      let value = parseFloat(itemPart[1]);

      sumVal += value;

      if(idx >= nextStep || idx === items.length) {
        if(idx === items.length) steps = steps - (nextStep - idx);

        result.push({ timestamp, value: sumVal / steps });
        nextStep += steps;
        sumVal = 0;
      }

      idx ++;
    }

    this.log = { type: 'intern', message: 'handle Chartdata (Lines: ' + items.length + ')', debugLevel: 5 };

    return result;
  }

  // mainfunction { deviceName: '', from: timestamp, to: timestamp, defs: [def1, def2] }
  async readLogData(obj) {
    let promise = new Promise((resolve, reject) => {
      if(obj.defs && obj.defs.length > 0) {
        let data = [];
        let idx = 0;

        for(const def of obj.defs) {
          let select = /\(.*\)/.exec(def);

          let defPart = select ? def.replace(select[0], '_').split(':') : def.split(':'); // definiton  [ source : (regex) : name : suffix : axis ]
          let cmd = 'get ';
          cmd += defPart[0] ? defPart[0] : obj.deviceName;
          cmd += obj.from ? ' - - ' + obj.from : '';
          cmd += obj.to ? ' ' + obj.to : '';
          cmd += select ? ' ' + select[0].replace(/\(|\)/g,'') : ' 4:' + defPart[1];

          this.log = { type: 'intern', message: 'Loading Chartdata - ' + cmd, debugLevel: 5 };

          this.request([{ param: 'cmd', value: cmd }, { param: 'XHR', value: '1' }],'text', { id: idx })
            .then((res) => {
              data.push({ id: res.id, data: this.handleLogData(res.data) });

              if(data.length === obj.defs.length) {
                Object.assign(obj, { data: data });
                resolve(obj);
              }
            })
            .catch((err) => {
              this.log = { type: 'error', message: 'Fetch data from FHEM Logfile failed.', meta: err, debugLevel: 1 };
              reject();
            });

          idx ++;
        }
      } else {
        this.log = { type: 'error', message: 'No Definitions for Chart found.', meta: obj, debugLevel: 1 };
        reject();
      }
    });
    return promise;
  }

  // mainfunction check if new updates for FHEM are available
  async checkUpdate() {
    let promise = new Promise((resolve, reject) => {

      this.request([{ param: 'cmd', value: 'update check' }, { param: 'XHR', value: '1' }])
        .then((res) => {
          let lines = res.split('\n').splice(2);
          let count = 0;
          let idx = 1;

          for(const line of lines) {
            if(line.match('UPD') && !line.match('excluded')) count ++;

            if(idx === lines.length) {
              resolve(count > 0 ? true : false);
            }
            idx ++;
          }
        })
        .catch((err) => {
          this.log = { type: 'error', message: 'FHEM check for Updates failed.', meta: err, debugLevel: 1 };
          reject(err);
        })
    });
    return promise;
  }

  // mainfunction fill array with rooms and groups
  getRoutes(attr) {
    this.app.options.loading = true;
    if(attr === 'room' || attr === 'group') {
      let listName = attr + 'List';
      let list = [];
      this.app.data.[listName].splice(0);

      this.request({ param: 'cmd', value: 'jsonList2 appOptions!= appOptions room group' }, 'json')
        .then(async (res) => {
          let idx = 1;

          for (const item of res.Results) {
            let options = await this.createOptions(item);
            let defs = options[attr];

            if(defs && options.template) {
              let vals = defs.split(',');
              for (let val of vals) {
                //let route = '/devices/' + attr + '=' + val.replace(/\s/g,'\\s').replace(/&/g,'.');
                let route = '/devices/' + attr + '=' + val;

                if(list.map((e) => e.title).indexOf(val) == -1) {
                  list.push({ title: val, route: route });
                }
              }
            }
            if(idx === res.Results.length) {
              list.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));
              this.app.data[attr + 'List'] = Object.assign([], list);
              this.app.options.loading = false;
            }
            idx ++;
          }
        })
        .catch((err) => {
          this.log = { type: 'error', message: 'Loading ' + attr + 's from FHEM failed.', meta: err, debugLevel: 1 };
          this.app.options.loading = false;
        });
    } else {
      this.log = { type: 'error', message: 'Creating Routes failed.', meta: attr, debugLevel: 1 };
      this.app.options.loading = false;
    }
  }

  // subfunction for handleVals %s %n %i %t &#058;
  replaceVals(defSet, state) {
    let chkNum = /-?[0-9]/.exec(state);
    let result = [];

    for (var i = 2; i < defSet.length; i ++) {
      let val = defSet[i];

      if(defSet[i].match('%s')) val = defSet[i].replace('%s', state);
      if(defSet[i].match('%t')) val = defSet[i].replace('%t', this.getDateTime(state));
      if(defSet[i].match('%n') && chkNum) {
        if(!/%n.[0-9]/.test(defSet[i])) defSet[i] = defSet[i].replace('%n','%n.0');
        let isDecimal = /%n../.exec(defSet[i]);
        let decimal = isDecimal[0].replace('%n.','');
        val = defSet[i].replace(isDecimal[0], parseFloat(state.slice(chkNum.index)).toFixed(decimal))
      }
      if(defSet[i].match('%i') && chkNum) {
        let inc = parseFloat(defSet[i].split('%i')[1]);
        if(inc != 'isNaN') {
          let isDecimal = inc.toString().split('.')[1] || '';
          let decimal = isDecimal.length;
          let newVal = parseFloat(state.slice(chkNum.index)) + inc;
          val = defSet[i].replace('%i' + inc, newVal.toFixed(decimal));
        }
      }

      val = val.replace('&#058;',':');

      result.push(val);
    }

    return result;
  }

  // mainfunction to handle reading states and get back properties for elements
  handleVals(device, defs) {
    let result = [];

    if(typeof defs === 'string') result = defs.split(':');

    if(typeof device === 'object' && typeof defs === 'object' && defs.length > 0) {
      for(const def of defs) {
        let defSet = def.split(':');

        if(defSet.length > 2) {
          let value = defSet[0].match(/\./) ? defSet[0].split('.') : [ 'Readings', defSet[0], 'Value' ];
          let state = this.getEl(device, ...value);

          if(state) {
            let found = false;
            if(isNaN(parseFloat(defSet[1]))) {
              if(RegExp(!defSet[1] ? '.' : defSet[1]).test(state)) found = true;
            } else {
              let chkNum = /-?[0-9]/.exec(state);
              if(chkNum.index != -1) {
                if(parseFloat(state.slice(chkNum.index)) >= parseFloat(defSet[1])) found = true;
              }
            }

            if(found) {
              result = this.replaceVals(defSet, state);
              break;
            }
          }
        }
      }
    }

    return result;
  }

  // deprecated - mainfuntion handle states and set mainValues
  handleStates(device, vals, defaultSet) {
    let defs = this.getEl(device, 'Options', 'states') || defaultSet;


    if(defs) {
      for(const def of defs) {
        let defSet = def.split(':'); // reading:value:description:level:color:icon

        if(defSet[0]) {
          let value = defSet[0].match(/\./) ? defSet[0].split('.') : [ 'Readings', defSet[0], 'Value' ];
          let state = this.getEl(device, ...value);

          if(state) {
            let found = false;

            if(isNaN(parseFloat(defSet[1]))) {
              if(RegExp(!defSet[1] ? '.' : defSet[1]).test(state)) found = true;
            } else {
              if(parseFloat(state) >= parseFloat(defSet[1])) found = true;
            }

            if(found) {
              let result = {}
              if(defSet[2]) result.mainState = defSet[0] === defSet[2] ? state : defSet[2];
              if(defSet[3]) result.mainLevel = defSet[0] === defSet[3] ? state : defSet[3];
              if(defSet[4]) result.mainColor = defSet[4];
              if(defSet[5]) result.systemIcon = defSet[5];

              Object.assign(vals, result);
              break;
            }
          }
        } else {
          this.log = { type: 'error', message: 'Wrong Definition for Device-States.', meta: device, debugLevel: 1 }
        }
      }
    }

    return vals;
  }

  async createConnected(device) {
    let result = {};

    if('connected' in device.Options) {
      let deviceList = Object.keys(device.Options.connected);

      for (const item of deviceList) {
        result[item] = await this.request({ param: 'cmd', value: 'jsonlist2 ' + device.Options.connected[item] }, 'json')
          .then(async (res) => {
            if('PossibleSets' in res.Results[0]) delete res.Results[0].PossibleSets;
            if('PossibleAttrs' in res.Results[0]) delete res.Results[0].PossibleAttrs;

            let options = await this.createOptions(res.Results[0]);
            if(options) res.Results[0].Options = options;

            return res.Results[0];
          })
          .catch((err) => {
            this.log = { type: 'error', message: 'Request to FHEM failed.', meta: err, debugLevel: 1 };
          })
      }
    }

    return result;
  }

  // subfunction for getDevices(), create the setup
  async getSetup(template) {
    let result = null;

    //only the fallback for v3.1 an lower
    if(!result) {
      let idx = this.app.templates.map((e) => e.name).indexOf(template);

      if(idx != -1) {
        let templDef = this.app.templates[idx];
        let setup = {}

        if(templDef.status) Object.assign(setup, { status: templDef.status });
        if(templDef.main) Object.assign(setup, { main: templDef.main });
        if(templDef.info) Object.assign(setup, { info: templDef.info});

        result = setup;
      }
    }

    if(!result) {
      result = await fetch('./cfg/templ_' + template + '.json')
        .then(async (res) => {
          let templDef = await res.json();
          let setup = {};

          if(templDef.size) setup.size = templDef.size;
          if(templDef.status) Object.assign(setup, { status: templDef.status });
          if(templDef.main) Object.assign(setup, { main: templDef.main });
          if(templDef.info) Object.assign(setup, { info: templDef.info});

          return setup;
        })
        .catch((err) => {
          this.log = { type: 'error', message: 'Loading Template ' + template + ' failed.', meta: err, debugLevel: 1 };
          return {};
        })
    }

    return result;
  }

  // subfunction for createOptions, searches and return the component
  getComponent(template) {
    let result = { component: 'templ_default' };
    let idx = this.app.componentMap.map((e) => e.name).indexOf(template);
    if(idx != -1) {
      let comp = this.app.componentMap[idx].component
      if(comp) result.component = comp;
    }

    return result;
  }

  // core function for validation json strings
  createJson(string) {
    let result = {};

    if(string) {
      try {
        result = JSON.parse(string);
      } catch(err) {
        this.log = { type: 'error', message: 'Json-Object is no valid. ' + string, meta: err.message, debugLevel: 1 };
      }
    }
    return result;
  }

  // subfunction for getDevices(), create the Options Object for device
  async createOptions(device) {
    let result = null;

    if('appOptions' in device.Attributes) {
      result = this.createJson(device.Attributes.appOptions);
      if(result) {
        result.device = device.Name;
        if(!result.name) result.name = this.getEl(device, 'Attributes', 'alias') || device.Name;
        if(!result.sortby && !this.app.options.ignoreFhemSortby) result.sortby = this.getEl(device, 'Attributes', 'sortby') || 'zzz';
        if(!result.room && !this.app.options.ignoreFhemRoom) result.room = this.getEl(device, 'Attributes', 'room') || '';
        if(!result.group && !this.app.options.ignoreFhemGroup) result.group = this.getEl(device, 'Attributes', 'group') || '';
        if(result.room === 'hidden') result.room = '';
        if(result.group === 'hidden') result.group = '';
        if(!result.sortby) result.sortby = 'zzz';
      }
    }

    return await result;
  }

  // subfunction for getDevices(), checking filter in jsonlist2 result
  checkFilter(fltr, options) {
    let result = false;

    if(fltr === 'app=home' && options.home) result = true;
    if(fltr === 'app=dashboard' && options.dashboard) result = true;
    if(fltr === 'app=system' && options.system) result = true;
    if(fltr.match('room=') || fltr.match('group=')) {
      let fltrPart = fltr.split('=');
      if(options[fltrPart[0]]) {
        let defs = options[fltrPart[0]].split(',');
        let search = fltrPart[1].replace('%20',' ');
        if(defs.indexOf(search) != -1) result = true;
      }
    }
    if(fltr.match('device=')) {
      let defs = fltr.split('=')[1].split('&')[0].split(',');
      if(defs.indexOf(options.device) != -1) result = true;
    }

    return(result);
  }

  // mainfunction fill array with Devices
  getDevices(fltr) {
    this.app.options.loading = true;
    this.app.data.deviceList.splice(0);

    this.request({ param: 'cmd', value: 'jsonlist2 appOptions!=' }, 'json')
      .then(async (res) => {
        let target = [];
        let idx = 1;

        for(const item of res.Results) {
          let options = await this.createOptions(item);

          if(this.checkFilter(fltr, options) && options.template) {
            if('PossibleSets' in item) delete item.PossibleSets;
            if('PossibleAttrs' in item) delete item.PossibleAttrs;

            let component = this.getComponent(options.template);
            Object.assign(options, component);

            if(options.component === 'templ_default') {
              let setup = await this.getSetup(options.template);
              if(options.setup) Object.assign(setup, options.setup);
              options.setup = setup;
            }

            item.Options = options;
            if(item.Options.connected) item.Connected = await this.createConnected(item);
            target.push(item);
          }

          if(idx === res.Results.length) {
            target.sort((a,b) => (a.Options.sortby > b.Options.sortby) ? 1 : ((b.Options.sortby > a.Options.sortby) ? -1 : 0));
            this.app.data.deviceList = Object.assign([], target);
            this.app.options.loading = false
          }
          idx ++;

        }
      })
      .catch((err) => {
        this.log = { type: 'error', message: 'Request to FHEM failed.', meta: err, debugLevel: 1 };
        this.app.options.loading = false;
      })
  }

  // subfunction for doUpdate(), return Data from update as Object
  handleData(line) {
    let arr = JSON.parse(line);
    let result = null;

    if(!arr[2].match('<div')) {
      if(!arr[0].match('-ts')) {
        this.log = { type: 'info', message: arr[0].replace('-',': ') + ': ' + arr[1], debugLevel: 4 };
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
        this.log = { type: 'warning', message: 'No Handling for this FHEM data. ' + arr, meta: arr, debugLevel: 3 };
      }
    }

    return result;
  }

  // subfunction for init(), handle updates from FHEM
  doUpdate(message) {
    let lines = message.data.split('\n');

    lines.forEach((line) => {
      if(line.length > 0)  {
        let data = this.handleData(line);
        if(data) {
          this.app.data.deviceList.forEach((device, idx) => {
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
              Object.values(device.Connected).forEach((item, i) => {
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
              });
            }

          });
        }
      }
    });
  }

  // subfunction for init(), close Connection with FHEM
  connClose() {
    this.app.session.connect = false;
    this.app.session.csrf = null;
    this.app.session.socket = null;

    if(!this.app.session.restart) {
      let msecs = this.app.session.restartCnt == 0 ? 1 : 3000;

      this.log = { type: 'intern', message: 'Restart-Sequence is started. (restart counter: ' +  this.app.session.restartCnt +  ' - restart on: '+ msecs + ' milliseconds)' , debugLevel: 5 };

      this.app.session.restart = true;
      setTimeout(() => {
        this.app.session.restart = false;
        this.app.session.restartCnt ++;
        this.init()
      }, msecs);

      this.log = {
        type: 'status',
        message: 'Connection with FHEM was closed. Try to Reconnect in ' + (msecs / 1000) + ' seconds...',
        debugLevel: 2
      }
    }
  }

  // subfunction for init(), open Connection with FHEM
  connOpen() {
    this.app.options.loading = true;
    this.app.session.restartCnt = 0;
    this.getCsrfToken()
      .then((res) => {
        this.app.session.csrf = res;
        this.app.session.connect = true;
        this.emit('connect');

        this.log = {
          type: 'status',
          message: 'Connection with FHEM is opened.',
          meta: this.session,
          debugLevel: 2
        }
        this.app.options.loading = false;
      })
      .catch((err) => {
        this.app.session.csrf = null;
        this.app.session.connect = false;

        this.log = {
          type: 'error',
          message: 'Retrieve csrf-Token failed.',
          meta: err,
          debugLevel: 1
        };
      })
      .finally(() => this.app.options.loading = false);
  }

  // subfunction, set the actual timestamp for menubar
  setClock() {
    let timestamp = new Date();

    this.app.options.clock = timestamp.toLocaleString(this.app.options.lang, { hour: '2-digit', minute: '2-digit' })
    this.app.options.date = timestamp.toLocaleString(this.app.options.lang, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  }

  // mainfunction, create websocket and listen for updates from FHEM
  init() {
    let options = [ { param: 'inform', value: 'type=status;filter=.*;fmt=JSON' }, { param: 'XHR', value: '1' } ];
    let url = this.createURL(options).replace(/^http/i,'ws');

    this.app.socket = new WebSocket(url);

    this.app.socket.onopen = () => this.connOpen();
    this.app.socket.onmessage = (message) => this.doUpdate(message);
    this.app.socket.onclose = () => this.connClose();

    this.setClock();

    setInterval(() => this.setClock(), this.app.options.clockInterval);
  }
}

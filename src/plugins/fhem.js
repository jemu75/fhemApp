import EventEmitter from 'events';

class Fhem extends EventEmitter {
  constructor() {
    super();

    this.app = {
      connection: {
        location: window.location.protocol + '//' + window.location.hostname,
        port: window.location.port,
        path: 'fhem', //root path
        type: 'websocket' // default connection type
      },
      conn: null, // WebSocket or XMLHttpRequest Object
      connOffset: 0,
      session: {
        connect: false,
        ready: false,
        csrf: null,
        restart: false,
        restartCnt: 0,
        logList: [],
      },
      options: {
        lang: 'de',
        debugMode: false,
        debugLevel: 5, // 1 = errors, 2 = status, 3 = requests, 4 = informChannel, 5 = internals
        loading: false,
        loadCount: 0,
        clockInterval: 1000,
        clockFormat: { hour: '2-digit', minute: '2-digit' },
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
      theme: {
        dark: true,
        themes: {}
      },
      appBar: {
        color: 'primary',
        drawer: false,
        clock: null,
        header: null,
        mobileHeader: null
      },
      templates: [],
      componentMap: [
        { name: 'panel', component: 'templ_panel' },
        { name: 'chart', component: 'templ_chart' },
        { name: 'weather', component: 'templ_weather' },
        { name: 'list', component: 'templ_list' },
        { name: 'sysmon', component: 'templ_sysmon' },
        { name: 'hmlan', component: 'templ_hmlan' },
        { name: 'sonos', component: 'templ_sonos' },
        { name: 'scenes', component: 'templ_scenes' },
        { name: 'cam', component: 'templ_cam' },
        { name: 'iframe', component: 'templ_iframe' },
      ],
      data: {
        roomList: [],
        groupList: [],
        deviceList: [],
        routeList: [],
        header: ''
      },
      hasConnected: []
    }
  }

  // coreFunction: handle the loading status from app
  set loading(val) {
    if(val) this.app.options.loadCount ++;
    if(!val && this.app.options.loadCount > 0) this.app.options.loadCount --;
    if(this.app.options.loadCount > 0 && !this.app.options.loading) this.app.options.loading = true;
    if(this.app.options.loadCount === 0) this.app.options.loading = false;
  }

  // coreFunction: handle log-messages
  log(message) {
    let icons = ['','mdi-alert-outline','mdi-connection','mdi-send-circle-outline','mdi-sync','mdi-hexagon-multiple-outline'];
    let colors = ['','error','info','success','success','warning'];
    let time = new Date().toLocaleTimeString(this.app.options.lang);
    let miSecs = new Date().getMilliseconds();
    let result = {
      time: time + ':' + ('000' + miSecs).slice(-3),
      msg: message.msg || '',
      lvl: message.lvl || 5,
      meta: message.meta || null,
      icon: icons[message.lvl || 5],
      color: colors[message.lvl || 5],
    }

    if(this.app.options.logRecord && result.lvl <= this.app.options.debugLevel) {
      this.app.session.logList.unshift(result);
      if(this.app.session.logList.length > this.app.options.logBuffer) this.app.session.logList.length = this.app.options.logBuffer;
    }

    if(result.lvl == 1) {
      this.app.options.loadCount = 0;
      this.app.options.loading = false;
      this.emit('message', result);
    }
  }

  // mainFunction: Calculate Date with diff of days
  getDate(val) {
    let diff = val ? parseInt(val) : 0;
    return ( d => new Date(d.setDate(d.getDate() - diff)).toISOString() )(new Date).split('T')[0];
  }

  // mainFunction: Format Date and Time from FHEM
  getDateTime(val) {
    let timestamp = val ? val : new Date().toISOString();

    return new Date(timestamp.replace(' ','T')).toLocaleString(this.app.options.lang, { dateStyle: 'short', timeStyle: 'medium' }).replace(',','');
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
      .catch((err) => this.log({ lvl: 1, msg: 'Request failed ' + req, meta: err.message }))
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

    let result = await fetch(file, options)
      .then((res) => res.json())
      .catch((err) => this.log({ lvl: 1, msg: 'Read Json-Data from ' + file + ' failed.', meta: err }));

    if(result) this.log({ lvl: 5, msg: 'Json-Data parsed from ' + file, meta: result });

    return await result;
  }

  // coreFunction: to merge config-data with app-default scheme
  async readConfig(file) {
    let cfg = await this.getJsonFile(file);
    if(cfg) {
      for(const item of Object.keys(cfg)) {
        if(item in this.app) Object.assign(this.app[item], cfg[item]);
      }
      if(this.app.options.debugMode) this.app.appBar.color = 'pink darken-4';
    } else {
      this.log({ lvl: 2, msg: 'No Configuration File found. FHEMApp starting with default settings.', meta: this.app.options })
    }
  }

  // subFunction: create object from fhem Attribute `appOptions`
  async createOptions(device) {
    let result = null;

    if('appOptions' in device.Attributes) {
      try {
        result = JSON.parse(device.Attributes.appOptions);
      } catch(err) {
        this.log({ lvl: 1, msg: 'Read `appOptions` from ' + device.Name + ' failed.', meta: err.message })
      }

      if(result) {
        result.device = device.Name;
        if(!result.name) result.name = this.getEl(device, 'Attributes', 'alias') || device.Name;
        if(!result.sortby && !this.app.options.ignoreFhemSortby) result.sortby = this.getEl(device, 'Attributes', 'sortby') || 'zzz';
        if(!result.room && !this.app.options.ignoreFhemRoom) result.room = this.getEl(device, 'Attributes', 'room') || '';
        if(!result.group && !this.app.options.ignoreFhemGroup) result.group = this.getEl(device, 'Attributes', 'group') || '';
        if(result.room === 'hidden') result.room = '';
        if(result.group === 'hidden') result.group = '';
        if(!result.sortby) result.sortby = 'zzz';
        if(!result.setup) result.setup = {};
        result.show = true;
        result.status = {
          level: null,
          color: null,
          isActive: true,
          error: null
        };
        result.info = {
          left1Icon: null,
          left1IconColor: null,
          left1Text: null,
          left2Icon: null,
          left2IconColor: null,
          left2Text: null,
          mid1Icon: null,
          mid1IconColor: null,
          mid1Text: null,
          mid2Icon: null,
          mid2IconColor: null,
          mid2Text: null,
          right1Icon: null,
          right1IconColor: null,
          right1Text: null,
          right2Icon: null,
          right2IconColor: null,
          right2Text: null
        };
      }
    }

    return await result;
  }

  // subFunction: fill list with routes
  createRoutes(options, route) {
    let idx = this.app.data.routeList.map((e) => e.route).indexOf(route);

    if(idx != -1) {
      this.app.data.routeList[idx].deviceList.push(options.device);
    } else {
      this.app.data.routeList.push({ route: route, deviceList: [options.device] })
    }
  }

  // subFunction: fill lists for app navigation (rooms and groups)
  createNaviItems(options, arr, attr) {
    let items = options[attr].split(',');

    for(const item of items) {
      let route = attr + '=' + item;

      if(arr.map((e) => e.title).indexOf(item) == -1) arr.push({ title: item, route: route });
      this.createRoutes(options, route)
    }
  }

  //subFunction: fill template definitions
  async getTemplate(options) {
    if(this.app.componentMap.map((e) => e.name).indexOf(options.template) == -1) {
      if(this.app.templates.map((e) => e.name).indexOf(options.template) == -1) {
        return await this.getJsonFile('./cfg/templ_' + options.template + '.json');
      }
    }
  }

  // coreFunction: load rooms, groups from fhem server, load templates
  async loadStructure() {
    let devices = await this.request({ param: 'cmd', value: 'jsonList2 appOptions!= appOptions room group' }, 'json');

    if(devices && devices.Results.length > 0) {
      let roomList = [];
      let groupList = [];
      this.app.data.routeList.splice(0);

      for(const device of devices.Results) {
        let options = await this.createOptions(device);
        if(options.template) {
          let template = await this.getTemplate(options);

          if(template) this.app.templates.push(template);
          if(options.room) this.createNaviItems(options, roomList, 'room');
          if(options.group) this.createNaviItems(options, groupList, 'group');
          if(options.home) this.createRoutes(options, '/');
          if(options.dashboard) this.createRoutes(options, '/dashboard');
          if(options.system) this.createRoutes(options, '/system');
        }
      }

      roomList.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));
      groupList.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));

      this.app.data.roomList = Object.assign([], roomList);
      this.app.data.groupList = Object.assign([], groupList);

      this.app.session.ready = true;
      this.loading = false;
    }
  }

  // subFunction: for getDevices return the connected devices from fhem server
  async createConnected(obj) {
    let result = {};
    let idx = this.app.hasConnected.indexOf(obj.Name);

    if(idx == -1) {
      this.app.hasConnected.push(obj.Name);

      if('connected' in obj.Options) {
        let deviceList = Object.keys(obj.Options.connected);

        for (const item of deviceList) {
          let device = await this.request({ param: 'cmd', value: 'jsonlist2 ' + obj.Options.connected[item] }, 'json');

          if(device && device.Results.length == 1) {
            if('PossibleSets' in device.Results[0]) delete device.Results[0].PossibleSets;
            if('PossibleAttrs' in device.Results[0]) delete device.Results[0].PossibleAttrs;

            let options = await this.createOptions(device.Results[0]);
            if(options) device.Results[0].Options = options;
            if(options && device.Results[0].Options.connected) device.Results[0].Connected = await this.createConnected(device.Results[0]);
            if(device.Results[0].Options) this.handleTemplate(device.Results[0]);

            result[item] = device.Results[0];
          }
        }
      }
    } else {
      this.log({ lvl: 1, msg: 'FHEM Device ' + obj.Name + ' is defined as connected device, witch is called from himself. ', meta: obj });
    }

    return result;
  }

  // subFunction: for getDevices return the setup from templates
  getSetup(template) {
    let idx = this.app.templates.map((e) => e.name).indexOf(template);

    if(idx != -1) {
      let templDef = this.app.templates[idx];
      let setup = {}

      if(templDef.status) Object.assign(setup, { status: templDef.status });
      if(templDef.main) Object.assign(setup, { main: templDef.main });
      if(templDef.info) Object.assign(setup, { info: templDef.info});
      if(templDef.show) Object.assign(setup, { show: templDef.show });
      setup.size = templDef.size || 'col-12 col-sm-6 col-md-4 col-lg-4';
      setup.expand = templDef.expand || false;
      setup.expanded = templDef.expanded || false;

      return setup;
    } else {
      this.log({ lvl: 1, msg: 'Template Definition ' + template + ' not found.'});
    }
  }

  // subFunction: for getDevices return the component
  getComponent(template) {
    let result = { component: 'templ_default' };
    let idx = this.app.componentMap.map((e) => e.name).indexOf(template);
    if(idx != -1) {
      let comp = this.app.componentMap[idx].component
      if(comp) result.component = comp;
    }

    return result;
  }

  // mainFunction: load Devices from fhem server
  async getDevices(fltr) {
    let idx = this.app.data.routeList.map((e) => e.route).indexOf(fltr);

    this.app.data.deviceList.splice(0);
    this.app.hasConnected = [];

    if(idx != -1 || fltr.match('device=')) {
      let filter = idx != -1 ? this.app.data.routeList[idx].deviceList.join(',') : fltr.replace('device=','').split('&')[0];

      if(filter) {
        this.loading = true;

        let devices = await this.request({ param: 'cmd', value: 'jsonlist2 ' + filter }, 'json')
        let target = [];
        let idx = 1;

        for(const item of devices.Results) {
          if('PossibleSets' in item) delete item.PossibleSets;
          if('PossibleAttrs' in item) delete item.PossibleAttrs;

          let options = await this.createOptions(item);
          let component = this.getComponent(options.template);

          Object.assign(options, component);

          if(options.component === 'templ_default') {
            let setup = await this.getSetup(options.template);
            if(options.setup) Object.assign(setup, options.setup);
            options.setup = setup;
          }

          item.Options = options;
          if(item.Options.connected) item.Connected = await this.createConnected(item);
          this.handleTemplate(item);
          target.push(item);

          if(idx === devices.Results.length) {
            target.sort((a,b) => (a.Options.sortby > b.Options.sortby) ? 1 : ((b.Options.sortby > a.Options.sortby) ? -1 : 0));
            this.app.data.deviceList = Object.assign([], target);
            this.loading = false;
          }
          idx ++;
        }
      }
    }
  }

  // mainFunction: check if new updates for FHEM are available
  async checkUpdate() {
    let result = await this.request([{ param: 'cmd', value: 'update check' }, { param: 'XHR', value: '1' }])
    let count = 0;

    if(result) {
      let lines = result.split('\n').splice(2);

      for(const line of lines) if(line.match('UPD') && !line.match('excluded')) count ++;
    }

    return count > 0 ? true : false
  }

  // subFunction for readLogFile() - split timestamp and value and reduce data if large array
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

    this.log({ lvl: 5, msg: 'handle Chartdata (Lines: ' + items.length + ')'});

    return result;
  }

  // mainFunction { deviceName: '', from: timestamp, to: timestamp, defs: [def1, def2] }
  async readLogData(obj) {
    let data = [];
    this.loading = true;

    if(obj.defs && obj.defs.length > 0) {
      let idx = 0;

      for(const def of obj.defs) {
        let select = /\(.*\)/.exec(def);

        let defPart = select ? def.replace(select[0], '_').split(':') : def.split(':'); // definiton  [ source : (regex) : name : suffix : axis ]
        let cmd = 'get ';
        cmd += defPart[0] ? defPart[0] : obj.deviceName;
        cmd += obj.from ? ' - - ' + obj.from : '';
        cmd += obj.to ? ' ' + obj.to : '';
        cmd += select ? ' ' + select[0].replace(/\(|\)/g,'') : ' 4:' + defPart[1];

        let logData = await this.request([{ param: 'cmd', value: cmd }, { param: 'XHR', value: '1' }],'text', { id: idx });

        if(logData) data.push({ id: logData.id, data: this.handleLogData(await logData.data) });

        idx ++;
      }
    }

    this.loading = false;
    return Object.assign(obj, { data: data });
  }

  // subFunction: for handleVals %s %n %i %t &#058;
  replaceVals(defSet, state, device) {
    let chkNum = /-?[0-9]/.exec(state);
    let result = [];

    for (var i = 2; i < defSet.length; i ++) {
      let val = defSet[i];

      if(/%d/.test(defSet[i])) val = defSet[i].replace('%d', device);
      if(/%s/.test(defSet[i])) val = defSet[i].replace('%s', state);
      if(/%t/.test(defSet[i])) val = defSet[i].replace('%t', this.getDateTime(state));
      if(/%a/.test(defSet[i])) {
        let now = new Date();
        let ts = new Date(state.replace(' ','T'));
        let diffMs = (now - ts); // milliseconds between now & timestamp
        let diffDays = Math.floor(diffMs / 86400000); // days
        let diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
        let diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
        let diff = diffDays > 1 ? (diffDays + 'Tage ') : diffDays > 0 ? (diffDays + 'Tag ') : '';
        diff += diffHrs > 0 ? (diffHrs + 'h ') : '';
        diff += diffMins > 0 ? (diffMins + 'min') : '';
        val = defSet[i].replace('%a', diff);
      }
      if(/%n/.test(defSet[i]) && chkNum) {
        if(!/%n.[0-9]/.test(defSet[i])) defSet[i] = defSet[i].replace('%n','%n.0');
        let isDecimal = /%n../.exec(defSet[i]);
        let digits = isDecimal[0].replace('%n.','');
        val = defSet[i].replace(isDecimal[0], parseFloat(state.slice(chkNum.index)).toLocaleString(this.app.options.lang, { minimumFractionDigits: digits, maximumFractionDigits: digits }));
      }
      if(/%i/.test(defSet[i]) && chkNum) {
        let inc = parseFloat(defSet[i].split('%i')[1]);
        if(inc != 'isNaN') {
          let isDecimal = inc.toString().split('.')[1] || '';
          let decimal = isDecimal.length;
          let newVal = parseFloat(state.slice(chkNum.index)) + inc;
          val = defSet[i].replace('%i' + inc, newVal.toFixed(decimal));
        }
      }

      val = val.replace(/&#058;/g,':');

      result.push(val);
    }

    return result;
  }

  // mainFunction: handle reading states and get back properties for elements
  handleVals(device, defs) {
    let result = [];

    if(typeof defs === 'string') {
      result = [defs];
    }

    if(typeof device === 'object' && typeof defs === 'object' && defs.length > 0) {
      for(const def of defs) {
        let defSet = def.split(':');

        if(defSet.length > 2) {
          let value = /\./.test(defSet[0]) ? defSet[0].split('.') : [ 'Readings', defSet[0], 'Value' ];
          let state = this.getEl(device, ...value) || this.getEl(device, 'Readings', defSet[0], 'Value');

          if(state) {
            let found = false;
            let ds1 = parseFloat(defSet[1]);
            if(isNaN(ds1)) {
              if(RegExp(!defSet[1] ? '.' : defSet[1]).test(state)) found = true;
            } else {
              let chkNum = /-?[0-9]/.exec(state);
              if(chkNum.index != -1) {
                if(parseFloat(state.slice(chkNum.index)) >= ds1) found = true;
              }
            }

            if(found) {
              result = this.replaceVals(defSet, state, device.Name);
              break;
            }
          }
        }
      }
    }

    return result;
  }

  // subFunction: for getDevices and doUpdate
  handleTemplate(device) {
    let showDefs = this.getEl(device, 'Options', 'setup', 'show');
    let statusDefs = this.getEl(device, 'Options', 'setup', 'status', 'bar');
    let errorDefs = this.getEl(device, 'Options', 'setup', 'status', 'error');
    let infoDefs = this.getEl(device, 'Options', 'setup', 'info');

    if(showDefs) {
      let showVals = this.handleVals(device, showDefs);
      device.Options.show = showVals[0] === 'false' ? false : true;
      if(showVals[1]) device.Options.setup.size = showVals[1];
      if(showVals[2]) {
        device.Options.sortby = showVals[2];
      }
    }

    if(statusDefs) {
      let statusMin = this.getEl(device, 'Options', 'setup', 'status', 'min') || 0;
      let statusMax = this.getEl(device, 'Options', 'setup', 'status', 'max') || 100;
      let statusVals = this.handleVals(device, statusDefs);
      let steps = 100 / (statusMax - statusMin);
      let level = (statusVals[0] || '0' - statusMin) * steps;

      device.Options.status.level = statusVals[2] ? 100 - level : level;
      device.Options.status.color = statusVals[1] || 'success';
    }

    if(errorDefs) {
      let errorVals = this.handleVals(device, errorDefs);

      if(errorVals.length > 0) {
        device.Options.status.level = errorVals[0] || '100';
        device.Options.status.color = errorVals[1] || 'error';
        device.Options.status.error = errorVals[2] || 'Fehler';
        device.Options.status.isActive = false;
      } else {
        device.Options.status.isActive = true;
      }
    }

    if(infoDefs) {
      let infoLeft1Vals = this.handleVals(device, infoDefs.left1);
      let infoLeft2Vals = this.handleVals(device, infoDefs.left2);
      let infoMid1Vals = this.handleVals(device, infoDefs.mid1);
      let infoMid2Vals = this.handleVals(device, infoDefs.mid2);
      let infoRight1Vals = this.handleVals(device, infoDefs.right1);
      let infoRight2Vals = this.handleVals(device, infoDefs.right2);

      device.Options.info.left1IconColor = infoLeft1Vals[2] || '';
      device.Options.info.left1Icon = infoLeft1Vals[1] || '';
      device.Options.info.left1Text = infoLeft1Vals[0] || '';

      device.Options.info.left2IconColor = infoLeft2Vals[2] || '';
      device.Options.info.left2Icon = infoLeft2Vals[1] || '';
      device.Options.info.left2Text = infoLeft2Vals[0] || '';

      device.Options.info.mid1IconColor = infoMid1Vals[2] || '';
      device.Options.info.mid1Icon = infoMid1Vals[1] || '';
      device.Options.info.mid1Text = infoMid1Vals[0] || '';

      device.Options.info.mid2IconColor = infoMid2Vals[2] || '';
      device.Options.info.mid2Icon = infoMid2Vals[1] || '';
      device.Options.info.mid2Text = infoMid2Vals[0] || '';

      device.Options.info.right1IconColor = infoRight1Vals[2] || '';
      device.Options.info.right1Icon = infoRight1Vals[1] || '';
      device.Options.info.right1Text = infoRight1Vals[0] || '';

      device.Options.info.right2IconColor = infoRight2Vals[2] || '';
      device.Options.info.right2Icon = infoRight2Vals[1] || '';
      device.Options.info.right2Text = infoRight2Vals[0] || '';
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
          value: arr[1] || ' '
        }
      } else {
        // alles was nicht verarbeitet werden kann
        this.log({ lvl: 3, msg: 'No Handling for this FHEM data. ', meta: arr })
      }
    }

    return result;
  }

  // subFunction: calls after message from FHEM-Server
  doUpdate(message) {
    let lines = [];

    if(this.app.connection.type === 'websocket') {
      lines = message.data.split('\n');
    } else {
      let response = this.app.conn.responseText;

      if(response && response.slice(-2).match(']')) {
        lines = response.substr(this.app.connOffset, response.length - this.app.connOffset).split('\n');
        this.app.connOffset = response.length;
      }
    }

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

              this.handleTemplate(source);
              this.app.data.deviceList.splice(idx, 1, source);
              this.app.data.deviceList.sort((a,b) => (a.Options.sortby > b.Options.sortby) ? 1 : ((b.Options.sortby > a.Options.sortby) ? -1 : 0));
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

                  this.handleTemplate(source);
                  this.app.data.deviceList.splice(idx, 1, source);
                  this.app.data.deviceList.sort((a,b) => (a.Options.sortby > b.Options.sortby) ? 1 : ((b.Options.sortby > a.Options.sortby) ? -1 : 0));
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

  // subFunction: calls after Connection is opened
  async connOpen() {
    this.app.session.connect = true;
    this.app.session.restartCnt = 0;

    this.log({ lvl: 2, msg: 'Connection with FHEM is opened.', meta: this.app.connection })

    this.app.session.csrf = await this.request({}, 'csrf');
    this.log({ lvl: 2, msg: 'Crsf-Token received.', meta: { token: this.app.session.csrf } });

    this.loadStructure();
  }

  // subFunction: calls after connection was closed
  async connClose(evt) {
    this.app.session.connect = false;
    this.app.session.csrf = null;
    this.app.session.ready = false;
    this.app.conn = null;

    if(!this.app.session.restart) {
      let msecs = this.app.session.restartCnt == 0 ? 1 : 3000;

      this.app.session.restart = true;
      setTimeout(() => {
        this.app.session.restart = false;
        this.app.session.restartCnt ++;
        this.connStart()
      }, msecs);

      let meta = {
        info: 'Connection (' + this.app.connection.type + ') ' + (evt ? 'failed.' : 'was closed.'),
        errCode: evt || ''
      };

      this.log({ lvl: 2, msg: 'Connection with FHEM was closed. Try to Reconnect in ' + (msecs / 1000) + ' seconds...', meta: meta })
      this.loading = false;
    }
  }

  // coreFunction: open a Connection to FHEM-Server
  async connStart() {
    let params = [ { param: 'inform', value: 'type=status;filter=.*;fmt=JSON' }, { param: 'XHR', value: '1' } ];
    let url = this.createURL(params);

    if(this.app.connection.type === 'websocket') {
      this.app.conn = new WebSocket(url.replace(/^http/i,'ws'));

      this.app.conn.onopen = () => this.connOpen();
      this.app.conn.onmessage = (message) => this.doUpdate(message);
      this.app.conn.onclose = () => this.connClose();
      this.app.conn.onerror = (err) => this.connClose(err);
    } else {
      this.app.conn = new XMLHttpRequest();
      this.app.conn.open("GET", url, true);

      this.app.conn.onreadystatechange = () => {
        if(this.app.conn.status === 200 && this.app.conn.readyState === 2) this.connOpen();
        if(this.app.conn.status === 200 && this.app.conn.readyState === 3) this.doUpdate();
      }
      this.app.conn.onerror = (err) => this.connClose(err);

      this.app.conn.send();
    }
  }

  // subFunction: set the actual timestamp for menubar
  setClock() {
    let timestamp = new Date();

    this.app.appBar.clock = timestamp.toLocaleString(this.app.options.lang, this.app.options.clockFormat)
    this.app.appBar.header = timestamp.toLocaleString(this.app.options.lang, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

    if(this.app.options.mobileHeaderContent === 'clock') this.app.appBar.mobileHeader = timestamp.toLocaleString(this.app.options.lang, this.app.options.clockFormat)
    if(this.app.options.mobileHeaderContent === 'date') this.app.appBar.mobileHeader = timestamp.toLocaleString(this.app.options.lang, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  }

  // mainFunction: Initializing FHEM App
  async init(vuetify, i18n) {
    this.log({ lvl: 2, msg: 'Starting FHEMApp...'});
    this.loading = true;

    await this.readConfig('./cfg/config.json');
    this.connStart();

    if(vuetify && this.app.theme) {
      if(this.app.theme.dark != -1) Object.assign(vuetify.framework.theme, { dark: this.app.theme.dark })
      if(this.app.theme.themes.light) Object.assign(vuetify.framework.theme.themes.light, this.app.theme.themes.light);
      if(this.app.theme.themes.dark) Object.assign(vuetify.framework.theme.themes.dark, this.app.theme.themes.dark);
    }

    if(i18n && this.app.options.lang) {
      i18n.locale = this.app.options.lang;
    }

    this.setClock();
    setInterval(() => this.setClock(), this.app.options.clockInterval);
  }
}

// add an instance method and init fhem
export default {
  install(Vue, vuetify, i18n) {
    Vue.prototype.$fhem = new Fhem;
    Vue.prototype.$fhem.init(vuetify, i18n);
  }
}

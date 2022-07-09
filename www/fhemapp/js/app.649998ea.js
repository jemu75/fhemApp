(function(){var t={7235:function(t,e,s){"use strict";var a=s(144),n=s(998),o=s(6843),i=s(5550),r=s(4562),l=s(4127),p=s(2118),c=s(9223),h=s(4324),d=s(5495),u=s(5808),m=s(7397),f=s(4525),g=s(1137),v=s(4611),b=s(3059),y=s(9709),w=s(2933),O=s(3305),k=s(3687),C=s(2082),x=function(){var t=this,e=t._self._c;return e(n.Z,{staticClass:"noselect"},[e(w.Z,{attrs:{value:t.app.options.loading}},[e(O.Z,{attrs:{indeterminate:"",size:"64"}})],1),e(o.Z,{attrs:{app:"",color:t.appBar.color,dark:"","clipped-left":""}},[t.appBar.drawer?t._e():e("div",[e(i.Z,{on:{click:function(e){e.stopPropagation(),t.appBar.drawer=!t.appBar.drawer}}})],1),t.appBar.drawer?e("div",{staticClass:"text-h5"},[e("div",{staticClass:"text-h5 hidden-md-and-down"},[t._v(" "+t._s(t.appBar.clock)+" ")])]):t._e(),e(k.Z),t.app.options.mobileHeader||t.app.options.mobileHeaderContent?e("div",{staticClass:"text-h5 hidden-lg-and-up"},[t._v(" "+t._s(t.appBar.mobileHeader)+" ")]):t._e(),e("div",{staticClass:"text-h5 hidden-md-and-down"},[t._v(" "+t._s(t.appBar.header)+" ")]),e(k.Z),t.app.options.debugMode?e(r.Z,{attrs:{icon:""},on:{click:function(e){return t.goTo("/syslog")}}},[e(h.Z,[t._v("mdi-format-list-bulleted")])],1):t._e(),t.app.options.reloadBtn?e(r.Z,{attrs:{icon:""},on:{click:function(e){return t.reload()}}},[e(h.Z,[t._v("mdi-reload")])],1):t._e(),t.app.options.homeBtn&&!t.appBar.drawer?e(r.Z,{staticClass:"text-h5",attrs:{icon:""},on:{click:function(e){return t.goTo()}}},[e(h.Z,[t._v("mdi-home")])],1):t._e(),e(C.Z,{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function({on:s,attrs:a}){return[e(h.Z,t._g(t._b({staticClass:"ml-3",attrs:{small:"",color:t.status.color},domProps:{textContent:t._s(t.status.icon)}},"v-icon",a,!1),s))]}}])},[e("div",{domProps:{textContent:t._s(t.status.text)}}),e("div",{domProps:{textContent:t._s(t.status.time)}})])],1),e(y.Z,{attrs:{app:"",color:"secondary",dark:this.$vuetify.theme.dark,clipped:""},model:{value:t.appBar.drawer,callback:function(e){t.$set(t.appBar,"drawer",e)},expression:"appBar.drawer"}},[e(d.Z,{attrs:{src:s(2862)}}),e(c.Z),e(u.Z,{attrs:{nav:""}},[e(f.Z,{key:"home",attrs:{link:"",to:"/"}},[e(v.Z,[e(h.Z,[t._v("mdi-home")])],1),e(g.km,[e(g.V9,{staticClass:"text-left"},[t._v(" "+t._s(t.$t("app.navigation.home"))+" ")])],1)],1),e(c.Z),t.showGroups?e(m.Z,{attrs:{color:"secondary lighten-4","prepend-icon":"mdi-lightbulb-group",value:t.app.options.expandGroups},scopedSlots:t._u([{key:"activator",fn:function(){return[e(g.V9,[t._v(t._s(t.$t("app.navigation.group")))])]},proxy:!0}],null,!1,444615855)},t._l(t.app.data.groupList,(function(s){return e(l.Z,{key:s.title,staticClass:"ma-2",attrs:{link:"",to:"/devices/"+s.route}},[t._v(" "+t._s(s.title)+" ")])})),1):t._e(),t.showRooms?e(m.Z,{attrs:{color:"secondary lighten-4","prepend-icon":"mdi-floor-plan",value:t.app.options.expandRooms},scopedSlots:t._u([{key:"activator",fn:function(){return[e(g.V9,[t._v(t._s(t.$t("app.navigation.room")))])]},proxy:!0}],null,!1,438615151)},t._l(t.app.data.roomList,(function(s){return e(l.Z,{key:s.title,staticClass:"ma-2",attrs:{link:"",to:"/devices/"+s.route}},[t._v(" "+t._s(s.title)+" ")])})),1):t._e(),e(c.Z),e(f.Z,{key:"dashboard",attrs:{link:"",to:"/dashboard"}},[e(v.Z,[e(h.Z,[t._v("mdi-view-dashboard")])],1),e(g.km,[e(g.V9,{staticClass:"text-left"},[t._v(" "+t._s(t.$t("app.navigation.dashboard"))+" ")])],1)],1),e(c.Z),e(f.Z,{key:"system",attrs:{link:"",to:"/system"}},[e(v.Z,[e(h.Z,[t._v("mdi-tools")])],1),e(g.km,[e(g.V9,{staticClass:"text-left"},[t._v(" "+t._s(t.$t("app.navigation.system"))+" ")])],1)],1),e(c.Z),e(f.Z,[e(g.km,[e(g.oZ,[t._v(" "+t._s(t.version)+" ")])],1)],1)],1)],1),e(b.Z,[e(p.Z,{attrs:{fluid:""}},[e("Broadcaster"),e("router-view")],1)],1)],1)},_=[],Z=s(7359),L=s(266),D=s(1713),j=function(){var t=this,e=t._self._c;return e(Z.Z,{attrs:{value:t.alert,type:t.type,dense:"",text:"",outlined:""}},[e(D.Z,{attrs:{align:"center"}},[e(L.Z,[e("div",[t._v(" "+t._s(t.message)+" ")]),e("div",[t._v(" "+t._s(t.meta)+" ")])]),e(L.Z,{staticClass:"shrink"},[e(r.Z,{attrs:{icon:"",small:""},on:{click:function(e){return t.clearMessage()}}},[e(h.Z,{attrs:{color:t.type}},[t._v(" mdi-close-circle ")])],1)],1)],1)],1)},R=[],S={name:"BroadCaster",data:()=>({alert:!1,type:"info",types:["","error","info","info","success","warning"],message:"",meta:"",msgList:[]}),watch:{msgList(){this.msgList&&this.msgList.length>0?(this.type=this.types[this.msgList[0].lvl],this.message=this.msgList[0].msg,this.meta=this.msgList[0].meta,this.alert=!0):(this.alert=!1,this.type="info",this.message="",this.meta="")}},mounted(){this.$fhem.on("message",(t=>{let e={lvl:5,msg:"no valid message received",meta:""};Object.assign(e,t),this.msgList.unshift(e)}))},methods:{clearMessage(){this.msgList.length>0&&this.msgList.splice(0,1)}}},T=S,E=s(1001),P=(0,E.Z)(T,j,R,!1,null,null,null),F=P.exports,B={components:{Broadcaster:F},data:()=>({appBar:{color:"",drawer:null,clock:null,header:null},app:{options:{loading:!1,reloadBtn:!1,expandGroups:!1,expandRooms:!1,mobileHeaderContent:!1},session:{connect:!1},data:{roomList:[],groupList:[]}},version:"v"+s(4147).i8,status:{color:"secondary",icon:"mdi-circle",text:"unbekannt",time:""}}),computed:{showRooms(){return this.app.data.roomList.length>0},showGroups(){return this.app.data.groupList.length>0}},watch:{"app.session.connect"(t){this.status.color=t?"success":"error",this.status.text=t?"online":"offline",this.status.time=this.$fhem.getDateTime()}},mounted(){this.app.session=this.$fhem.app.session,this.app.options=this.$fhem.app.options,this.app.data=this.$fhem.app.data,this.appBar=this.$fhem.app.appBar},methods:{reload(){location.reload(!0)},goTo(t){let e=t||"/";this.$router.currentRoute.path!=e&&this.$router.push(e)}}},N=B,I=(0,E.Z)(N,x,_,!1,null,"3b4d7587",null),H=I.exports,A=s(8345);a.ZP.use(A.Z);const M=[{path:"/",name:"Home",component:()=>s.e(365).then(s.bind(s,3365))},{path:"/system",name:"System",component:()=>s.e(365).then(s.bind(s,3365))},{path:"/dashboard",name:"Dashboard",component:()=>s.e(365).then(s.bind(s,3365))},{path:"/devices/:filter",name:"Devices",component:()=>s.e(365).then(s.bind(s,3365))},{path:"/settings",name:"Settings",component:()=>s.e(52).then(s.bind(s,5052))},{path:"/syslog",name:"Syslog",component:()=>Promise.all([s.e(124),s.e(420),s.e(466)]).then(s.bind(s,9466))}],V=new A.Z({mode:"hash",base:"",routes:M});var U=V,$=s(1705),q=s(6027),z=s(2638);a.ZP.use($.Z);const G={lang:{locales:{de:q.Z},current:"de"},theme:{dark:!0,themes:{dark:{primary:z.Z.grey.darken4,secondary:z.Z.grey.darken3,success:z.Z.green.accent2,accent:z.Z.green.accent2},light:{primary:z.Z.grey,secondary:z.Z.grey.lighten3,success:z.Z.green.accent3,accent:z.Z.green.accent3}}}};var J=new $.Z(G),X=s(7166),Y=s.n(X),W=s(7152);function K(){const t=s(8973),e={};return t.keys().forEach((s=>{const a=s.match(/([A-Za-z0-9-_]+)\./i);if(a&&a.length>1){const n=a[1];e[n]=t(s)}})),e}a.ZP.use(W.Z);var Q=new W.Z({locale:"de",fallbackLocale:"en",messages:K()}),tt=s(7187),et=s.n(tt);class st extends(et()){constructor(){super(),this.app={connection:{location:window.location.protocol+"//"+window.location.hostname,port:window.location.port,path:"fhem",type:"websocket"},conn:null,connOffset:0,session:{connect:!1,ready:!1,csrf:null,restart:!1,restartCnt:0,logList:[]},options:{lang:"de",debugMode:!1,debugLevel:5,loading:!1,loadCount:0,clockInterval:1e3,clockFormat:{hour:"2-digit",minute:"2-digit"},clock:null,date:null,maxChartPoints:100,updateProcess:!1,logRecord:!0,logBuffer:500,ignoreFhemRoom:!1,ignoreFhemGroup:!1,ignoreFhemSortby:!1,mobileHeader:!1},theme:{dark:!0,themes:{}},appBar:{color:"primary",drawer:!1,clock:null,header:null,mobileHeader:null},templates:[],componentMap:[{name:"panel",component:"templ_panel"},{name:"chart",component:"templ_chart"},{name:"weather",component:"templ_weather"},{name:"list",component:"templ_list"},{name:"wdtimer",component:"templ_wdtimer"},{name:"sysmon",component:"templ_sysmon"},{name:"hmlan",component:"templ_hmlan"},{name:"sonos",component:"templ_sonos"},{name:"scenes",component:"templ_scenes"},{name:"cam",component:"templ_cam"},{name:"iframe",component:"templ_iframe"}],data:{roomList:[],groupList:[],deviceList:[],routeList:[],header:""},hasConnected:[]}}set loading(t){t&&this.app.options.loadCount++,!t&&this.app.options.loadCount>0&&this.app.options.loadCount--,this.app.options.loadCount>0&&!this.app.options.loading&&(this.app.options.loading=!0),0===this.app.options.loadCount&&(this.app.options.loading=!1)}log(t){let e=["","mdi-alert-outline","mdi-connection","mdi-send-circle-outline","mdi-sync","mdi-hexagon-multiple-outline"],s=["","error","info","success","success","warning"],a=(new Date).toLocaleTimeString(this.app.options.lang),n=(new Date).getMilliseconds(),o={time:a+":"+("000"+n).slice(-3),msg:t.msg||"",lvl:t.lvl||5,meta:t.meta||null,icon:e[t.lvl||5],color:s[t.lvl||5]};this.app.options.logRecord&&o.lvl<=this.app.options.debugLevel&&(this.app.session.logList.unshift(o),this.app.session.logList.length>this.app.options.logBuffer&&(this.app.session.logList.length=this.app.options.logBuffer)),1==o.lvl&&(this.app.options.loadCount=0,this.app.options.loading=!1,this.emit("message",o))}getDate(t){let e=t?parseInt(t):0;return(t=>new Date(t.setDate(t.getDate()-e)).toISOString())(new Date).split("T")[0]}getWeekDay(t){let e=null;if(t){let s=/\d{2}.\d{2}.\d{4}/.exec(t);if(s&&1===s.length){let e=s[0].split(".");t=e[2]+"/"+e[1]+"/"+e[0]}e=new Date(t).toLocaleString(this.app.options.lang,{weekday:"long"})}return e}getDateTime(t){let e=t||(new Date).toISOString();return new Date(e.replace(" ","T")).toLocaleString(this.app.options.lang,{dateStyle:"short",timeStyle:"medium"}).replace(",","")}createURL(t){let e=this.app.connection,s=e.location?e.location:"",a=e.port?":"+e.port.replace(":",""):"",n=e.path?"/"+e.path.replace("/",""):"",o="";return"object"==typeof t&&t.length>0&&t.forEach((t=>{t.param&&t.value&&(o+=o?"&":"?",o+=t.param+"="+encodeURIComponent(t.value))})),s+a+n+o}getEl(t,...e){return e.reduce(((t,e)=>t&&t[e]),t)}async request(t,e,s){let a=[];"csrf"!=e&&a.push({param:"fwcsrf",value:this.app.session.csrf}),"json"!==e&&"csrf"!==e||a.push({param:"XHR",value:"1"}),"object"===typeof t&&(t.length>0?a.push(...t):a.push(t)),"string"===typeof t&&a.push({param:"cmd",value:t});let n=this.createURL(a);return this.log({lvl:3,msg:"Request: "+n}),await fetch(n).then((t=>{let a=null;return"csrf"===e&&(a=t.headers.get("x-fhem-csrftoken")),"json"===e&&(a=t.json()),a||(a=t.text()),"object"===typeof s?Object.assign(s,{data:a}):a})).catch((t=>this.log({lvl:1,msg:"Request failed "+n,meta:t.message})))}async getJsonFile(t){let e=new Headers;e.append("pragma","no-cache"),e.append("cache-control","no-cache");let s={method:"GET",headers:e},a=await fetch(t,s).then((t=>t.json())).catch((e=>this.log({lvl:1,msg:"Read Json-Data from "+t+" failed.",meta:e})));return a&&this.log({lvl:5,msg:"Json-Data parsed from "+t,meta:a}),await a}async readConfig(t){let e=await this.getJsonFile(t);if(e){for(const t of Object.keys(e))t in this.app&&Object.assign(this.app[t],e[t]);this.app.options.debugMode&&(this.app.appBar.color="pink darken-4")}else this.log({lvl:2,msg:"No Configuration File found. FHEMApp starting with default settings.",meta:this.app.options})}async createOptions(t){let e=null;if("appOptions"in t.Attributes){try{e=JSON.parse(t.Attributes.appOptions)}catch(s){this.log({lvl:1,msg:"Read `appOptions` from "+t.Name+" failed.",meta:s.message})}e&&(e.device=t.Name,e.name||(e.name=this.getEl(t,"Attributes","alias")||t.Name),e.sortby||this.app.options.ignoreFhemSortby||(e.sortby=this.getEl(t,"Attributes","sortby")||"zzz"),e.room||this.app.options.ignoreFhemRoom||(e.room=this.getEl(t,"Attributes","room")||""),e.group||this.app.options.ignoreFhemGroup||(e.group=this.getEl(t,"Attributes","group")||""),"hidden"===e.room&&(e.room=""),"hidden"===e.group&&(e.group=""),e.sortby||(e.sortby="zzz"),e.setup||(e.setup={}),e.show=!0,e.status={level:null,color:null,isActive:!0,error:null},e.info={left1Icon:null,left1IconColor:null,left1Text:null,left2Icon:null,left2IconColor:null,left2Text:null,mid1Icon:null,mid1IconColor:null,mid1Text:null,mid2Icon:null,mid2IconColor:null,mid2Text:null,right1Icon:null,right1IconColor:null,right1Text:null,right2Icon:null,right2IconColor:null,right2Text:null})}return await e}createRoutes(t,e){let s=this.app.data.routeList.map((t=>t.route)).indexOf(e);-1!=s?this.app.data.routeList[s].deviceList.push(t.device):this.app.data.routeList.push({route:e,deviceList:[t.device]})}createNaviItems(t,e,s){let a=t[s].split(",");for(const n of a){let a=s+"="+n;-1==e.map((t=>t.title)).indexOf(n)&&e.push({title:n,route:a}),this.createRoutes(t,a)}}async getTemplate(t){if(-1==this.app.componentMap.map((t=>t.name)).indexOf(t.template)&&-1==this.app.templates.map((t=>t.name)).indexOf(t.template))return await this.getJsonFile("./cfg/templ_"+t.template+".json")}async loadStructure(){let t=await this.request({param:"cmd",value:"jsonList2 appOptions!= appOptions room group"},"json");if(t&&t.Results.length>0){let e=[],s=[];this.app.data.routeList.splice(0);for(const a of t.Results){let t=await this.createOptions(a);if(t.template){let a=await this.getTemplate(t);a&&this.app.templates.push(a),t.room&&this.createNaviItems(t,e,"room"),t.group&&this.createNaviItems(t,s,"group"),t.home&&this.createRoutes(t,"/"),t.dashboard&&this.createRoutes(t,"/dashboard"),t.system&&this.createRoutes(t,"/system")}}e.sort(((t,e)=>t.title>e.title?1:e.title>t.title?-1:0)),s.sort(((t,e)=>t.title>e.title?1:e.title>t.title?-1:0)),this.app.data.roomList=Object.assign([],e),this.app.data.groupList=Object.assign([],s),this.app.session.ready=!0,this.loading=!1}}async createConnected(t){let e={},s=this.app.hasConnected.indexOf(t.Name);if(-1==s){if(this.app.hasConnected.push(t.Name),"connected"in t.Options){let s=Object.keys(t.Options.connected);for(const a of s){let s=await this.request({param:"cmd",value:"jsonlist2 "+t.Options.connected[a]},"json");if(s&&1==s.Results.length){"PossibleSets"in s.Results[0]&&delete s.Results[0].PossibleSets,"PossibleAttrs"in s.Results[0]&&delete s.Results[0].PossibleAttrs;let t=await this.createOptions(s.Results[0]);t&&(s.Results[0].Options=t),t&&s.Results[0].Options.connected&&(s.Results[0].Connected=await this.createConnected(s.Results[0])),s.Results[0].Options&&this.handleTemplate(s.Results[0]),e[a]=s.Results[0]}}}}else this.log({lvl:1,msg:"FHEM Device "+t.Name+" is defined as connected device, witch is called from himself. ",meta:t});return e}getSetup(t){let e=this.app.templates.map((t=>t.name)).indexOf(t);if(-1!=e){let t=this.app.templates[e],s={};return t.status&&Object.assign(s,{status:t.status}),t.main&&Object.assign(s,{main:t.main}),t.info&&Object.assign(s,{info:t.info}),t.show&&Object.assign(s,{show:t.show}),s.size=t.size||"col-12 col-sm-6 col-md-4 col-lg-4",s.expand=t.expand||!1,s.expanded=t.expanded||!1,s}this.log({lvl:1,msg:"Template Definition "+t+" not found."})}getComponent(t){let e={component:"templ_default"},s=this.app.componentMap.map((t=>t.name)).indexOf(t);if(-1!=s){let t=this.app.componentMap[s].component;t&&(e.component=t)}return e}async getDevices(t){let e=this.app.data.routeList.map((t=>t.route)).indexOf(t);if(this.app.data.deviceList.splice(0),this.app.hasConnected=[],-1!=e||t.match("device=")){let s=-1!=e?this.app.data.routeList[e].deviceList.join(","):t.replace("device=","").split("&")[0];if(s){this.loading=!0;let t=await this.request({param:"cmd",value:"jsonlist2 "+s},"json"),e=[],a=1;for(const s of t.Results){"PossibleSets"in s&&delete s.PossibleSets,"PossibleAttrs"in s&&delete s.PossibleAttrs;let n=await this.createOptions(s),o=this.getComponent(n.template);if(Object.assign(n,o),"templ_default"===n.component){let t=await this.getSetup(n.template);n.setup&&Object.assign(t,n.setup),n.setup=t}s.Options=n,s.Options.connected&&(s.Connected=await this.createConnected(s)),this.handleTemplate(s),e.push(s),a===t.Results.length&&(e.sort(((t,e)=>t.Options.sortby>e.Options.sortby?1:e.Options.sortby>t.Options.sortby?-1:0)),this.app.data.deviceList=Object.assign([],e),this.loading=!1),a++}}}}async checkUpdate(){let t=await this.request([{param:"cmd",value:"update check"},{param:"XHR",value:"1"}]),e=0;if(t){let s=t.split("\n").splice(2);for(const t of s)t.match("UPD")&&!t.match("excluded")&&e++}return e>0}handleLogData(t,e){let s=t.split("\n");s.length>3&&s.splice(-3,3);let a=[],n=s.length>this.app.options.maxChartPoints?parseInt(s.length/this.app.options.maxChartPoints):1,o=n,i=null,r=1,l=null;for(const p of s){let t=p.split(" "),c=Date.parse(t[0].replace("_","T")),h=new Date(c),d=null,u=parseFloat(t[1]);e?(/-min/.test(e)&&(i>u||!i)&&(i=u),/-max/.test(e)&&i<u&&(i=u),/-avg/.test(e)&&(i=(i+u)/2),/-delta/.test(e)&&!i&&(i=u),/hour-/.test(e)&&(d=new Date(h.getFullYear()+"-"+(h.getMonth()+1)+"-"+h.getDate()).setHours(h.getHours())),/day-/.test(e)&&(d=new Date(h.getFullYear()+"-"+(h.getMonth()+1)+"-"+h.getDate()).setHours(12)),/week-/.test(e)&&(d=new Date(h.getFullYear()+"-"+(h.getMonth()+1)+"-"+h.getDate()).setDate(h.getDate()-h.getDay()+3)),/month-/.test(e)&&(d=new Date(h.getFullYear()+"-"+(h.getMonth()+1)+"-1")),/year-/.test(e)&&(d=new Date(h.getFullYear()+"-1-1")),l||(l=d),(d>l||r===s.length)&&(a.push({timestamp:l,value:i}),i=null,l=d)):(i+=u,(r>=o||r===s.length)&&(r===s.length&&(n-=o-r),a.push({timestamp:c,value:i/n}),o+=n,i=0)),r++}return this.log({lvl:5,msg:"handle Chartdata (Lines: "+s.length+")"}),a}async readLogData(t){let e=[];if(this.loading=!0,t.defs&&t.defs.length>0){let s=0;for(const a of t.defs){let n=/\(.*\)/.exec(a),o=n?a.replace(n[0],"_").split(":"):a.split(":"),i="get ";i+=o[0]?o[0]:t.deviceName,i+=t.from?" - - "+t.from:"",i+=t.to?" "+t.to:"",i+=n?" "+n[0].replace(/\(|\)/g,""):" 4:"+o[1];let r=await this.request([{param:"cmd",value:i},{param:"XHR",value:"1"}],"text",{id:s}),l=o[11]?o[11]:null;r&&e.push({id:r.id,data:this.handleLogData(await r.data,l)}),s++}}return this.loading=!1,Object.assign(t,{data:e})}replaceVals(t,e,s){let a=/-?[0-9]/.exec(e),n=[];for(var o=2;o<t.length;o++){let i=t[o];if(/%d/.test(t[o])&&(i=t[o].replace("%d",s)),/%s/.test(t[o])&&(i=t[o].replace("%s",e)),/%t/.test(t[o])&&(i=t[o].replace("%t",this.getDateTime(e))),/%wd/.test(t[o])&&(i=t[o].replace("%wd",this.getWeekDay(e))),/%a/.test(t[o])){let s=new Date,a=new Date(e.replace(" ","T")),n=s-a,r=Math.floor(n/864e5),l=Math.floor(n%864e5/36e5),p=Math.round(n%864e5%36e5/6e4),c=r>1?r+"Tage ":r>0?r+"Tag ":"";c+=l>0?l+"h ":"",c+=p>0?p+"min":"",i=t[o].replace("%a",c)}if(/%n/.test(t[o])&&a){/%n.[0-9]/.test(t[o])||(t[o]=t[o].replace("%n","%n.0"));let s=/%n../.exec(t[o]),n=s[0].replace("%n.","");i=t[o].replace(s[0],parseFloat(e.slice(a.index)).toLocaleString(this.app.options.lang,{minimumFractionDigits:n,maximumFractionDigits:n}))}if(/%i/.test(t[o])&&a){let s=parseFloat(t[o].split("%i")[1]);if("isNaN"!=s){let n=s.toString().split(".")[1]||"",r=n.length,l=parseFloat(e.slice(a.index))+s;i=t[o].replace("%i"+s,l.toFixed(r))}}i=i.replace(/&#058;/g,":"),n.push(i)}return n}handleVals(t,e){let s=[];if("string"===typeof e&&(s=[e]),"object"===typeof t&&"object"===typeof e&&e.length>0)for(const a of e){let e=a.split(":");if(e.length>2){let a=/\./.test(e[0])?e[0].split("."):["Readings",e[0],"Value"],n=this.getEl(t,...a)||this.getEl(t,"Readings",e[0],"Value");if(n){let a=!1,o=parseFloat(e[1]);if(isNaN(o))RegExp(e[1]?e[1]:".").test(n)&&(a=!0);else{let t=/-?[0-9]/.exec(n);-1!=t.index&&parseFloat(n.slice(t.index))>=o&&(a=!0)}if(a){s=this.replaceVals(e,n,t.Name);break}}}}return s}handleTemplate(t){let e=this.getEl(t,"Options","setup","show"),s=this.getEl(t,"Options","setup","status","bar"),a=this.getEl(t,"Options","setup","status","error"),n=this.getEl(t,"Options","setup","info");if(e){let s=this.handleVals(t,e);t.Options.show="false"!==s[0],s[1]&&(t.Options.setup.size=s[1]),s[2]&&(t.Options.sortby=s[2])}if(s){let e=this.getEl(t,"Options","setup","status","min")||0,a=this.getEl(t,"Options","setup","status","max")||100,n=this.handleVals(t,s),o=100/(a-e),i=(n[0]||"0"-e)*o;t.Options.status.level=n[2]?100-i:i,t.Options.status.color=n[1]||"success"}if(a){let e=this.handleVals(t,a);e.length>0?(t.Options.status.level=e[0]||"100",t.Options.status.color=e[1]||"error",t.Options.status.error=e[2]||"Fehler",t.Options.status.isActive=!1):t.Options.status.isActive=!0}if(n){let e=this.handleVals(t,n.left1),s=this.handleVals(t,n.left2),a=this.handleVals(t,n.mid1),o=this.handleVals(t,n.mid2),i=this.handleVals(t,n.right1),r=this.handleVals(t,n.right2);t.Options.info.left1IconColor=e[2]||"",t.Options.info.left1Icon=e[1]||"",t.Options.info.left1Text=e[0]||"",t.Options.info.left2IconColor=s[2]||"",t.Options.info.left2Icon=s[1]||"",t.Options.info.left2Text=s[0]||"",t.Options.info.mid1IconColor=a[2]||"",t.Options.info.mid1Icon=a[1]||"",t.Options.info.mid1Text=a[0]||"",t.Options.info.mid2IconColor=o[2]||"",t.Options.info.mid2Icon=o[1]||"",t.Options.info.mid2Text=o[0]||"",t.Options.info.right1IconColor=i[2]||"",t.Options.info.right1Icon=i[1]||"",t.Options.info.right1Text=i[0]||"",t.Options.info.right2IconColor=r[2]||"",t.Options.info.right2Icon=r[1]||"",t.Options.info.right2Text=r[0]||""}}handleData(t){let e=JSON.parse(t),s=null;if(!e[2].match("<div"))if(e[0].match("-ts")||this.log({lvl:4,msg:e[0].replace("-",": ")+": "+e[1]}),e[0].match("global-UPDATE"))this.app.options.updateProcess=!1;else if(e[0].match("-a-")){let t=e[0].split("-a-");s={Name:t[0],devicePart:"Attributes",param:t[1],value:e[1]}}else if(e[0].match("-")){let t=e[0].split("-");s={Name:t[0],devicePart:"Readings",paramPart:e[0].match("-ts")?"Time":"Value",param:e[0].replace("-ts","").replace(t[0]+"-",""),value:e[1]||" "}}else this.log({lvl:3,msg:"No Handling for this FHEM data. ",meta:e});return s}doUpdate(t){let e=[];if("websocket"===this.app.connection.type)e=t.data.split("\n");else{let t=this.app.conn.responseText;t&&t.slice(-2).match("]")&&(e=t.substr(this.app.connOffset,t.length-this.app.connOffset).split("\n"),this.app.connOffset=t.length)}for(const s of e)if(s.length>0){let t=this.handleData(s);if(t){let e=0;for(const s of this.app.data.deviceList){let a=this.app.data.deviceList[e],n=Object.assign({},a);if(s.Name===t.Name&&("Readings"===t.devicePart&&this.getEl(n,"Readings",t.param,t.paramPart)&&(n.Readings[t.param][t.paramPart]=t.value),"Attributes"===t.devicePart&&this.getEl(n,"Attributes",t.param)&&(n.Attributes[t.param]=t.value),this.handleTemplate(n),this.app.data.deviceList.splice(e,1,n),this.app.data.deviceList.sort(((t,e)=>t.Options.sortby>e.Options.sortby?1:e.Options.sortby>t.Options.sortby?-1:0))),"Connected"in s){let a=0;for(const o of Object.values(s.Connected)){if(o.Name===t.Name){let o=Object.keys(s.Connected)[a];"Readings"===t.devicePart&&this.getEl(n.Connected[o],"Readings",t.param,t.paramPart)&&(n.Connected[o].Readings[t.param][t.paramPart]=t.value),"Attributes"===t.devicePart&&this.getEl(n.Connected[o],"Attributes",t.param)&&(n.Connected[o].Attributes[t.param]=t.value),this.handleTemplate(n),this.app.data.deviceList.splice(e,1,n),this.app.data.deviceList.sort(((t,e)=>t.Options.sortby>e.Options.sortby?1:e.Options.sortby>t.Options.sortby?-1:0))}a++}}e++}}}}async connOpen(){this.app.session.connect=!0,this.app.session.restartCnt=0,this.log({lvl:2,msg:"Connection with FHEM is opened.",meta:this.app.connection}),this.app.session.csrf=await this.request({},"csrf"),this.log({lvl:2,msg:"Crsf-Token received.",meta:{token:this.app.session.csrf}}),this.loadStructure()}async connClose(t){if(this.app.session.connect=!1,this.app.session.csrf=null,this.app.session.ready=!1,this.app.conn=null,!this.app.session.restart){let e=0==this.app.session.restartCnt?1:3e3;this.app.session.restart=!0,setTimeout((()=>{this.app.session.restart=!1,this.app.session.restartCnt++,this.connStart()}),e);let s={info:"Connection ("+this.app.connection.type+") "+(t?"failed.":"was closed."),errCode:t||""};this.log({lvl:2,msg:"Connection with FHEM was closed. Try to Reconnect in "+e/1e3+" seconds...",meta:s}),this.loading=!1}}async connStart(){let t=[{param:"inform",value:"type=status;filter=.*;fmt=JSON"},{param:"XHR",value:"1"}],e=this.createURL(t);"websocket"===this.app.connection.type?(this.app.conn=new WebSocket(e.replace(/^http/i,"ws")),this.app.conn.onopen=()=>this.connOpen(),this.app.conn.onmessage=t=>this.doUpdate(t),this.app.conn.onclose=()=>this.connClose(),this.app.conn.onerror=t=>this.connClose(t)):(this.app.conn=new XMLHttpRequest,this.app.conn.open("GET",e,!0),this.app.conn.onreadystatechange=()=>{200===this.app.conn.status&&2===this.app.conn.readyState&&this.connOpen(),200===this.app.conn.status&&3===this.app.conn.readyState&&this.doUpdate()},this.app.conn.onerror=t=>this.connClose(t),this.app.conn.send())}setClock(){let t=new Date;this.app.appBar.clock=t.toLocaleString(this.app.options.lang,this.app.options.clockFormat),this.app.appBar.header=t.toLocaleString(this.app.options.lang,{weekday:"long",year:"numeric",month:"long",day:"numeric"}),"clock"===this.app.options.mobileHeaderContent&&(this.app.appBar.mobileHeader=t.toLocaleString(this.app.options.lang,this.app.options.clockFormat)),"date"===this.app.options.mobileHeaderContent&&(this.app.appBar.mobileHeader=t.toLocaleString(this.app.options.lang,{weekday:"long",year:"numeric",month:"long",day:"numeric"}))}async init(t,e){this.getWeekDay("2022-04-06 08:37:29"),this.log({lvl:2,msg:"Starting FHEMApp..."}),this.loading=!0,await this.readConfig("./cfg/config.json"),this.connStart(),t&&this.app.theme&&(-1!=this.app.theme.dark&&Object.assign(t.framework.theme,{dark:this.app.theme.dark}),this.app.theme.themes.light&&Object.assign(t.framework.theme.themes.light,this.app.theme.themes.light),this.app.theme.themes.dark&&Object.assign(t.framework.theme.themes.dark,this.app.theme.themes.dark)),e&&this.app.options.lang&&(e.locale=this.app.options.lang),this.setClock(),setInterval((()=>this.setClock()),this.app.options.clockInterval)}}var at={install(t,e,s){t.prototype.$fhem=new st,t.prototype.$fhem.init(e,s)}};a.ZP.use(at,J,Q),a.ZP.use(Y()),a.ZP.component("apex-chart",Y()),a.ZP.config.productionTip=!1,new a.ZP({vuetify:J,router:U,i18n:Q,render:t=>t(H)}).$mount("#app")},8973:function(t,e,s){var a={"./de.json":9929,"./en.json":790};function n(t){var e=o(t);return s(e)}function o(t){if(!s.o(a,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return a[t]}n.keys=function(){return Object.keys(a)},n.resolve=o,t.exports=n,n.id=8973},2862:function(t,e,s){"use strict";t.exports=s.p+"img/FHEM_Logo.a2a7fc8d.png"},4147:function(t){"use strict";t.exports={i8:"3.34.3"}},9929:function(t){"use strict";t.exports=JSON.parse('{"app":{"navigation":{"home":"Home","group":"Gruppen","room":"Bereiche","dashboard":"Dashboard","system":"System"},"dates":{"from":"von","to":"bis"}},"templates":{"sysmon":{"updateBtn":["prüfe Updates...","system aktuell","update","update läuft.."],"restartBtn":"neustart","updateDialog":{"header":"FHEM Update","text":"Update wurde erfolgreich beendet. FHEM sollte neu gestartet werden.","restartBtn":"jetzt neustarten"}}}}')},790:function(t){"use strict";t.exports=JSON.parse('{"app":{"navigation":{"home":"Home","group":"Groups","room":"Area","dashboard":"Dashboard","system":"System"},"dates":{"from":"From","to":"To"}},"templates":{"sysmon":{"updateBtn":["check updates...","up to date","update","update running..."],"restartBtn":"restart","updateDialog":{"header":"FHEM Update","text":"Update was successful finished. FHEM should be restarted now.","restartBtn":"restart now"}}}}')}},e={};function s(a){var n=e[a];if(void 0!==n)return n.exports;var o=e[a]={exports:{}};return t[a].call(o.exports,o,o.exports,s),o.exports}s.m=t,function(){var t=[];s.O=function(e,a,n,o){if(!a){var i=1/0;for(c=0;c<t.length;c++){a=t[c][0],n=t[c][1],o=t[c][2];for(var r=!0,l=0;l<a.length;l++)(!1&o||i>=o)&&Object.keys(s.O).every((function(t){return s.O[t](a[l])}))?a.splice(l--,1):(r=!1,o<i&&(i=o));if(r){t.splice(c--,1);var p=n();void 0!==p&&(e=p)}}return e}o=o||0;for(var c=t.length;c>0&&t[c-1][2]>o;c--)t[c]=t[c-1];t[c]=[a,n,o]}}(),function(){s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,{a:e}),e}}(),function(){s.d=function(t,e){for(var a in e)s.o(e,a)&&!s.o(t,a)&&Object.defineProperty(t,a,{enumerable:!0,get:e[a]})}}(),function(){s.f={},s.e=function(t){return Promise.all(Object.keys(s.f).reduce((function(e,a){return s.f[a](t,e),e}),[]))}}(),function(){s.u=function(t){return"js/"+t+"."+{52:"9972e164",124:"bddeb759",165:"f98be37f",239:"4a5136f2",282:"e98bcb91",365:"1c6be703",420:"ab4b87a9",444:"34e3c465",466:"9cbff9a9",478:"fe1a11b7",492:"e39a9f84",498:"0ce482e1",574:"129394ef",816:"c12dfb2b",818:"8339cd07",896:"3fb67c1a",957:"9abf91c0",971:"fb6a45ea"}[t]+".js"}}(),function(){s.miniCssF=function(t){return"css/"+t+"."+{165:"8ff6640a",239:"8ff6640a",282:"29d29498",420:"8bdd2ebf",466:"80f62a8a",478:"8ff6640a",492:"a562c19c",498:"57253e28",574:"70cff375",816:"4f9aa920",818:"526f2843",896:"8ff6640a",957:"29d29498",971:"87b379f8"}[t]+".css"}}(),function(){s.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){var t={},e="fhemapp:";s.l=function(a,n,o,i){if(t[a])t[a].push(n);else{var r,l;if(void 0!==o)for(var p=document.getElementsByTagName("script"),c=0;c<p.length;c++){var h=p[c];if(h.getAttribute("src")==a||h.getAttribute("data-webpack")==e+o){r=h;break}}r||(l=!0,r=document.createElement("script"),r.charset="utf-8",r.timeout=120,s.nc&&r.setAttribute("nonce",s.nc),r.setAttribute("data-webpack",e+o),r.src=a),t[a]=[n];var d=function(e,s){r.onerror=r.onload=null,clearTimeout(u);var n=t[a];if(delete t[a],r.parentNode&&r.parentNode.removeChild(r),n&&n.forEach((function(t){return t(s)})),e)return e(s)},u=setTimeout(d.bind(null,void 0,{type:"timeout",target:r}),12e4);r.onerror=d.bind(null,r.onerror),r.onload=d.bind(null,r.onload),l&&document.head.appendChild(r)}}}(),function(){s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}}(),function(){s.p=""}(),function(){var t=function(t,e,s,a){var n=document.createElement("link");n.rel="stylesheet",n.type="text/css";var o=function(o){if(n.onerror=n.onload=null,"load"===o.type)s();else{var i=o&&("load"===o.type?"missing":o.type),r=o&&o.target&&o.target.href||e,l=new Error("Loading CSS chunk "+t+" failed.\n("+r+")");l.code="CSS_CHUNK_LOAD_FAILED",l.type=i,l.request=r,n.parentNode.removeChild(n),a(l)}};return n.onerror=n.onload=o,n.href=e,document.head.appendChild(n),n},e=function(t,e){for(var s=document.getElementsByTagName("link"),a=0;a<s.length;a++){var n=s[a],o=n.getAttribute("data-href")||n.getAttribute("href");if("stylesheet"===n.rel&&(o===t||o===e))return n}var i=document.getElementsByTagName("style");for(a=0;a<i.length;a++){n=i[a],o=n.getAttribute("data-href");if(o===t||o===e)return n}},a=function(a){return new Promise((function(n,o){var i=s.miniCssF(a),r=s.p+i;if(e(i,r))return n();t(a,r,n,o)}))},n={143:0};s.f.miniCss=function(t,e){var s={165:1,239:1,282:1,420:1,466:1,478:1,492:1,498:1,574:1,816:1,818:1,896:1,957:1,971:1};n[t]?e.push(n[t]):0!==n[t]&&s[t]&&e.push(n[t]=a(t).then((function(){n[t]=0}),(function(e){throw delete n[t],e})))}}(),function(){var t={143:0};s.f.j=function(e,a){var n=s.o(t,e)?t[e]:void 0;if(0!==n)if(n)a.push(n[2]);else{var o=new Promise((function(s,a){n=t[e]=[s,a]}));a.push(n[2]=o);var i=s.p+s.u(e),r=new Error,l=function(a){if(s.o(t,e)&&(n=t[e],0!==n&&(t[e]=void 0),n)){var o=a&&("load"===a.type?"missing":a.type),i=a&&a.target&&a.target.src;r.message="Loading chunk "+e+" failed.\n("+o+": "+i+")",r.name="ChunkLoadError",r.type=o,r.request=i,n[1](r)}};s.l(i,l,"chunk-"+e,e)}},s.O.j=function(e){return 0===t[e]};var e=function(e,a){var n,o,i=a[0],r=a[1],l=a[2],p=0;if(i.some((function(e){return 0!==t[e]}))){for(n in r)s.o(r,n)&&(s.m[n]=r[n]);if(l)var c=l(s)}for(e&&e(a);p<i.length;p++)o=i[p],s.o(t,o)&&t[o]&&t[o][0](),t[o]=0;return s.O(c)},a=self["webpackChunkfhemapp"]=self["webpackChunkfhemapp"]||[];a.forEach(e.bind(null,0)),a.push=e.bind(null,a.push.bind(a))}();var a=s.O(void 0,[998],(function(){return s(7235)}));a=s.O(a)})();
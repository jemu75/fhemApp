"use strict";(self["webpackChunkfhemapp"]=self["webpackChunkfhemapp"]||[]).push([[438],{9968:function(){},2371:function(t,e,s){var i=s(4367),a=(s(9653),s(4944),s(3792),s(9968),s(5648)),n=s(7342),r=s(6505),l=s(3325);e["Z"]=(0,l.Z)(n.Z,r.Z,a.Z).extend({name:"v-card",props:{flat:Boolean,hover:Boolean,img:String,link:Boolean,loaderHeight:{type:[Number,String],default:4},raised:Boolean},computed:{classes:function(){return(0,i.Z)((0,i.Z)({"v-card":!0},r.Z.options.computed.classes.call(this)),{},{"v-card--flat":this.flat,"v-card--hover":this.hover,"v-card--link":this.isClickable,"v-card--loading":this.loading,"v-card--disabled":this.disabled,"v-card--raised":this.raised},a.Z.options.computed.classes.call(this))},styles:function(){var t=(0,i.Z)({},a.Z.options.computed.styles.call(this));return this.img&&(t.background='url("'.concat(this.img,'") center center / cover no-repeat')),t}},methods:{genProgress:function(){var t=n.Z.options.methods.genProgress.call(this);return t?this.$createElement("div",{staticClass:"v-card__progress",key:"progress"},[t]):null}},render:function(t){var e=this.generateRouteLink(),s=e.tag,i=e.data;return i.style=this.styles,this.isClickable&&(i.attrs=i.attrs||{},i.attrs.tabindex=0),t(s,this.setBackgroundColor(this.color,i),[this.genProgress(),this.$slots.default])}})},7118:function(t,e,s){s.d(e,{h7:function(){return n},Qq:function(){return r},ZB:function(){return l},EB:function(){return o}});var i=s(2371),a=s(4589),n=(0,a.Ji)("v-card__actions"),r=(0,a.Ji)("v-card__subtitle"),l=(0,a.Ji)("v-card__text"),o=(0,a.Ji)("v-card__title");i.Z},7003:function(t,e,s){s.d(e,{Z:function(){return f}});var i=s(4367),a=s(3796),n=(s(9653),s(9253),s(5827)),r=s(8083),l=s(6952),o=s(3536),c=s(1431),h=s(8085),d=s(4589),u=s(3325),v=(0,u.Z)(l.Z,(0,o.d)(["absolute","fixed","top","bottom"]),c.Z,h.Z),f=v.extend({name:"v-progress-linear",directives:{intersect:r.Z},props:{active:{type:Boolean,default:!0},backgroundColor:{type:String,default:null},backgroundOpacity:{type:[Number,String],default:null},bufferValue:{type:[Number,String],default:100},color:{type:String,default:"primary"},height:{type:[Number,String],default:4},indeterminate:Boolean,query:Boolean,reverse:Boolean,rounded:Boolean,stream:Boolean,striped:Boolean,value:{type:[Number,String],default:0}},data:function(){return{internalLazyValue:this.value||0,isVisible:!0}},computed:{__cachedBackground:function(){return this.$createElement("div",this.setBackgroundColor(this.backgroundColor||this.color,{staticClass:"v-progress-linear__background",style:this.backgroundStyle}))},__cachedBar:function(){return this.$createElement(this.computedTransition,[this.__cachedBarType])},__cachedBarType:function(){return this.indeterminate?this.__cachedIndeterminate:this.__cachedDeterminate},__cachedBuffer:function(){return this.$createElement("div",{staticClass:"v-progress-linear__buffer",style:this.styles})},__cachedDeterminate:function(){return this.$createElement("div",this.setBackgroundColor(this.color,{staticClass:"v-progress-linear__determinate",style:{width:(0,d.kb)(this.normalizedValue,"%")}}))},__cachedIndeterminate:function(){return this.$createElement("div",{staticClass:"v-progress-linear__indeterminate",class:{"v-progress-linear__indeterminate--active":this.active}},[this.genProgressBar("long"),this.genProgressBar("short")])},__cachedStream:function(){return this.stream?this.$createElement("div",this.setTextColor(this.color,{staticClass:"v-progress-linear__stream",style:{width:(0,d.kb)(100-this.normalizedBuffer,"%")}})):null},backgroundStyle:function(){var t,e=null==this.backgroundOpacity?this.backgroundColor?1:.3:parseFloat(this.backgroundOpacity);return t={opacity:e},(0,a.Z)(t,this.isReversed?"right":"left",(0,d.kb)(this.normalizedValue,"%")),(0,a.Z)(t,"width",(0,d.kb)(Math.max(0,this.normalizedBuffer-this.normalizedValue),"%")),t},classes:function(){return(0,i.Z)({"v-progress-linear--absolute":this.absolute,"v-progress-linear--fixed":this.fixed,"v-progress-linear--query":this.query,"v-progress-linear--reactive":this.reactive,"v-progress-linear--reverse":this.isReversed,"v-progress-linear--rounded":this.rounded,"v-progress-linear--striped":this.striped,"v-progress-linear--visible":this.isVisible},this.themeClasses)},computedTransition:function(){return this.indeterminate?n.Z5:n.Qn},isReversed:function(){return this.$vuetify.rtl!==this.reverse},normalizedBuffer:function(){return this.normalize(this.bufferValue)},normalizedValue:function(){return this.normalize(this.internalLazyValue)},reactive:function(){return Boolean(this.$listeners.change)},styles:function(){var t={};return this.active||(t.height=0),this.indeterminate||100===parseFloat(this.normalizedBuffer)||(t.width=(0,d.kb)(this.normalizedBuffer,"%")),t}},methods:{genContent:function(){var t=(0,d.z9)(this,"default",{value:this.internalLazyValue});return t?this.$createElement("div",{staticClass:"v-progress-linear__content"},t):null},genListeners:function(){var t=this.$listeners;return this.reactive&&(t.click=this.onClick),t},genProgressBar:function(t){return this.$createElement("div",this.setBackgroundColor(this.color,{staticClass:"v-progress-linear__indeterminate",class:(0,a.Z)({},t,!0)}))},onClick:function(t){if(this.reactive){var e=this.$el.getBoundingClientRect(),s=e.width;this.internalValue=t.offsetX/s*100}},onObserve:function(t,e,s){this.isVisible=s},normalize:function(t){return t<0?0:t>100?100:parseFloat(t)}},render:function(t){var e={staticClass:"v-progress-linear",attrs:{role:"progressbar","aria-valuemin":0,"aria-valuemax":this.normalizedBuffer,"aria-valuenow":this.indeterminate?void 0:this.normalizedValue},class:this.classes,directives:[{name:"intersect",value:this.onObserve}],style:{bottom:this.bottom?0:void 0,height:this.active?(0,d.kb)(this.height):0,top:this.top?0:void 0},on:this.genListeners()};return t("div",e,[this.__cachedStream,this.__cachedBackground,this.__cachedBuffer,this.__cachedBar,this.genContent()])}})},2691:function(t,e,s){s.d(e,{Z:function(){return c}});var i=s(4367),a=(s(9653),s(9253),s(3358)),n=s(6952),r=s(8085),l=s(3325),o=s(4589),c=(0,l.Z)((0,a.Z)("bar",["height","window"]),n.Z,r.Z).extend({name:"v-system-bar",props:{height:[Number,String],lightsOut:Boolean,window:Boolean},computed:{classes:function(){return(0,i.Z)({"v-system-bar--lights-out":this.lightsOut,"v-system-bar--absolute":this.absolute,"v-system-bar--fixed":!this.absolute&&(this.app||this.fixed),"v-system-bar--window":this.window},this.themeClasses)},computedHeight:function(){return this.height?isNaN(parseInt(this.height))?this.height:parseInt(this.height):this.window?32:24},styles:function(){return{height:(0,o.kb)(this.computedHeight)}}},methods:{updateApplication:function(){return this.$el?this.$el.clientHeight:this.computedHeight}},render:function(t){var e={staticClass:"v-system-bar",class:this.classes,style:this.styles,on:this.$listeners};return t("div",this.setBackgroundColor(this.color,e),(0,o.z9)(this))}})},7342:function(t,e,s){s.d(e,{Z:function(){return r}});s(9653);var i=s(144),a=s(7003),n=a.Z,r=i.Z.extend().extend({name:"loadable",props:{loading:{type:[Boolean,String],default:!1},loaderHeight:{type:[Number,String],default:2}},methods:{genProgress:function(){return!1===this.loading?null:this.$slots.progress||this.$createElement(n,{props:{absolute:!0,color:!0===this.loading||""===this.loading?this.color||"primary":this.loading,height:this.loaderHeight,indeterminate:!0}})}}})},7438:function(t,e,s){s.r(e),s.d(e,{default:function(){return x}});var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-col",{class:t.setup.size},[s("v-card",{attrs:{dark:this.$vuetify.theme.dark,color:"secondary"}},[s("v-progress-linear",{attrs:{height:"7",value:t.vals.status.level,color:t.vals.status.color,"background-color":"secondary darken-1"}}),s("v-card-title",{staticClass:"text-truncate"},[t._v(" "+t._s(t.vals.title)+" ")]),s("v-divider"),s("v-card-text",[s("v-row",{attrs:{align:"center"}},[s("v-col",{staticClass:"col-4",attrs:{align:"center"}},[t._v(" Auslastung ")]),s("v-col",{staticClass:"col-8",attrs:{align:"center"}},[t._v(" Geräte ")])],1),s("v-row",{attrs:{align:"center"}},[s("v-col",{staticClass:"col-4",attrs:{align:"center"}},[s("v-progress-circular",{attrs:{rotate:"90",size:"70",width:"7",value:t.vals.main.loadLvl,color:t.workLoadColor}},[t._v(" "+t._s(t.vals.main.loadLvl)+" ")])],1),s("v-col",{staticClass:"col-4",attrs:{align:"center"}},[s("v-progress-circular",{attrs:{rotate:"90",size:"70",width:"7",value:t.devOnlinePercent,color:"success"}},[t._v(" "+t._s(t.vals.devCount)+" ")])],1),s("v-col",{staticClass:"col-4",attrs:{align:"center"}},[s("v-progress-circular",{attrs:{rotate:"90",size:"70",width:"7",value:t.devOfflinePercent,color:"error"}},[s("v-btn",{attrs:{disabled:t.vals.devOffline.length<1,plain:""},on:{click:function(e){return t.goTo()}}},[t._v(" "+t._s(t.vals.devOffline.length)+" ")])],1)],1)],1),s("v-row",{attrs:{align:"center"}},[s("v-col",{staticClass:"col-4",attrs:{align:"center"}},[t._v(" "+t._s(t.vals.main.loadLvlText)+" ")]),s("v-col",{staticClass:"col-4",attrs:{align:"center"}},[t._v(" aktiv ")]),s("v-col",{staticClass:"col-4",attrs:{align:"center"}},[t._v(" inaktiv ")])],1)],1),s("v-divider"),s("v-system-bar",{attrs:{color:"secondary darken-1"}},[s("v-icon",{staticClass:"ml-0"},[t._v(" "+t._s(t.vals.info.left1Icon)+" ")]),s("div",{staticClass:"text-truncate"},[t._v(" "+t._s(t.vals.info.left1Text)+" ")]),s("v-icon",{staticClass:"ml-2"},[t._v(" "+t._s(t.vals.info.left2Icon)+" ")]),s("div",{staticClass:"text-truncate"},[t._v(" "+t._s(t.vals.info.left2Text)+" ")]),s("v-spacer"),s("v-icon",[t._v(" "+t._s(t.vals.info.mid1Icon)+" ")]),s("div",{staticClass:"text-truncate"},[t._v(" "+t._s(t.vals.info.mid1Text)+" ")]),s("v-icon",{staticClass:"ml-2"},[t._v(" "+t._s(t.vals.info.mid2Icon)+" ")]),s("div",{staticClass:"text-truncate"},[t._v(" "+t._s(t.vals.info.mid2Text)+" ")]),s("v-spacer"),s("v-icon",[t._v(" "+t._s(t.vals.info.right1Icon)+" ")]),s("div",{staticClass:"text-truncate"},[t._v(" "+t._s(t.vals.info.right1Text)+" ")]),s("v-icon",{staticClass:"ml-2 mr-0"},[t._v(" "+t._s(t.vals.info.right2Icon)+" ")]),s("div",{staticClass:"text-truncate"},[t._v(" "+t._s(t.vals.info.right2Text)+" ")])],1)],1)],1)},a=[],n=s(2032),r=(s(6977),s(4916),s(3123),s(4723),s(5306),{props:{item:{type:Object,default:function(){return{name:"hmlan"}}}},data:function(){return{name:"hmlan",setup:{size:"col-12 col-sm-12 col-md-6 col-lg-6",status:{bar:["cond:^(?!ok):100:error","loadLvl:low:100:success","loadLvl:batchLevel:50:success","loadLvl:high:10:success","loadLvl:suspended:100:error"],error:[]},main:{loadLvl:["cond:^(?!ok):--:offline","Internals.msgLoadCurrent:99:%n%:überlastet","Internals.msgLoadCurrent:90:%n%:sehr hoch","Internals.msgLoadCurrent:40:%n%:hoch","Internals.msgLoadCurrent:0:%n%:normal"]},info:{left1:["cond:^(?!ok)::mdi-access-point-network-off","loadLvl:low::mdi-access-point-network","loadLvl:batchLevel::mdi-access-point-network","loadLvl:high::mdi-access-point-network","loadLvl:suspended::mdi-access-point-network"],left2:[],mid1:["Readings.cond.Time::%t"],mid2:[],right1:[],right2:[]}},vals:{title:"",status:{color:"",level:0},main:{loadLvl:0,loadLvlText:""},info:{left1Icon:"",left1Text:"",left2Icon:"",left2Text:"",mid1Icon:"",mid1Text:"",mid2Icon:"",mid2Text:"",right1Icon:"",right1Text:"",right2Icon:"",right2Text:""},devCount:0,devOffline:[]},active:!0}},computed:{workLoadColor:function(){return parseInt(this.vals.main.loadLvl)>80?"error":"success"},devOnlinePercent:function(){var t=parseInt(this.vals.devCount)+this.vals.devOffline.length;return t>0?(parseInt(this.vals.devCount)/t*100).toFixed(1):0},devOfflinePercent:function(){var t=parseInt(this.vals.devCount)+this.vals.devOffline.length;return t>0?(100*(1-parseInt(this.vals.devCount)/t)).toFixed(1):0}},watch:{item:{immediate:!0,deep:!0,handler:function(t){var e=this.$fhem.getEl(t,"Connected","watcher","Readings","state","Value"),s=this.$fhem.getEl(t,"Connected","watcher","Readings"),i=this.$fhem.getEl(t,"Internals","msgLoadCurrent"),a=this.$fhem.getEl(t,"Attributes","alias")||t.Name;this.vals.title=this.$fhem.getEl(t,"Options","name")||a,this.vals.main.loadLvl=i+"%",this.vals.devCount=e.split(" ")[0].split(":")[1],this.checkDevices(s),this.setValues()}}},methods:{setValues:function(){var t=this.$fhem.handleVals(this.item,this.setup.status.bar),e=this.$fhem.handleVals(this.item,this.setup.status.error),s=this.$fhem.handleVals(this.item,this.setup.main.loadLvl),i=this.$fhem.handleVals(this.item,this.setup.info.left1),a=this.$fhem.handleVals(this.item,this.setup.info.left2),n=this.$fhem.handleVals(this.item,this.setup.info.mid1),r=this.$fhem.handleVals(this.item,this.setup.info.mid2),l=this.$fhem.handleVals(this.item,this.setup.info.right1),o=this.$fhem.handleVals(this.item,this.setup.info.right2);this.vals.status.level=t[0]||"100",this.vals.status.color=t[1]||"success",this.vals.status.invert=!!t[2],this.vals.main.loadLvl=s[0]||"",this.vals.main.loadLvlText=s[1]||"",this.vals.info.left1Icon=i[1]||"",this.vals.info.left1Text=i[0]||"",this.vals.info.left2Icon=a[1]||"",this.vals.info.left2Text=a[0]||"",this.vals.info.mid1Icon=n[1]||"",this.vals.info.mid1Text=n[0]||"",this.vals.info.mid2Icon=r[1]||"",this.vals.info.mid2Text=r[0]||"",this.vals.info.right1Icon=l[1]||"",this.vals.info.right1Text=l[0]||"",this.vals.info.right2Icon=o[1]||"",this.vals.info.right2Text=o[0]||"",e.length>0?(this.vals.status.level=e[0]||"100",this.vals.status.color=e[1]||"error",this.vals.main.text=e[2]||"Fehler",this.isActive=!1):this.isActive=!0},checkDevices:function(t){var e=this,s=[];for(var i in t)if(i.match("status_")&&"alive"!=t[i].Value){var a=i.replace("status_","");-1===s.indexOf(a)&&s.push(a)}s.length>0&&this.$fhem.request("jsonlist2 appOptions!=","json").then((function(t){if(t.Results.length>0){var i,a=(0,n.Z)(t.Results);try{for(a.s();!(i=a.n()).done;){var r,l=i.value,o=s.indexOf(l.Name),c=l.Attributes.appOptions.match("connected"),h=null,d=(0,n.Z)(s);try{for(d.s();!(r=d.n()).done;){var u=r.value;!h&&l.Attributes.appOptions.match(u)&&(h=!0)}}catch(v){d.e(v)}finally{d.f()}(-1!=o||c&&h)&&-1==e.vals.devOffline.indexOf(l.Name)&&e.vals.devOffline.push(l.Name)}}catch(v){a.e(v)}finally{a.f()}}}))},goTo:function(){this.$router.push("/devices/device="+this.vals.devOffline)}}}),l=r,o=s(1001),c=s(3453),h=s.n(c),d=s(3150),u=s(2371),v=s(7118),f=s(2102),m=s(1418),g=s(6428),p=s(624),_=s(7003),b=s(2877),C=s(9762),y=s(2691),k=(0,o.Z)(l,i,a,!1,null,null,null),x=k.exports;h()(k,{VBtn:d.Z,VCard:u.Z,VCardText:v.ZB,VCardTitle:v.EB,VCol:f.Z,VDivider:m.Z,VIcon:g.Z,VProgressCircular:p.Z,VProgressLinear:_.Z,VRow:b.Z,VSpacer:C.Z,VSystemBar:y.Z})}}]);
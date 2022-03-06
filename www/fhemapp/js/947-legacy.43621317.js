"use strict";(self["webpackChunkfhemapp"]=self["webpackChunkfhemapp"]||[]).push([[947],{9968:function(){},2371:function(t,e,i){var s=i(4367),a=(i(9653),i(4944),i(3792),i(9968),i(5648)),n=i(7342),r=i(6505),o=i(3325);e["Z"]=(0,o.Z)(n.Z,r.Z,a.Z).extend({name:"v-card",props:{flat:Boolean,hover:Boolean,img:String,link:Boolean,loaderHeight:{type:[Number,String],default:4},raised:Boolean},computed:{classes:function(){return(0,s.Z)((0,s.Z)({"v-card":!0},r.Z.options.computed.classes.call(this)),{},{"v-card--flat":this.flat,"v-card--hover":this.hover,"v-card--link":this.isClickable,"v-card--loading":this.loading,"v-card--disabled":this.disabled,"v-card--raised":this.raised},a.Z.options.computed.classes.call(this))},styles:function(){var t=(0,s.Z)({},a.Z.options.computed.styles.call(this));return this.img&&(t.background='url("'.concat(this.img,'") center center / cover no-repeat')),t}},methods:{genProgress:function(){var t=n.Z.options.methods.genProgress.call(this);return t?this.$createElement("div",{staticClass:"v-card__progress",key:"progress"},[t]):null}},render:function(t){var e=this.generateRouteLink(),i=e.tag,s=e.data;return s.style=this.styles,this.isClickable&&(s.attrs=s.attrs||{},s.attrs.tabindex=0),t(i,this.setBackgroundColor(this.color,s),[this.genProgress(),this.$slots.default])}})},7118:function(t,e,i){i.d(e,{h7:function(){return n},Qq:function(){return r},ZB:function(){return o},EB:function(){return l}});var s=i(2371),a=i(4589),n=(0,a.Ji)("v-card__actions"),r=(0,a.Ji)("v-card__subtitle"),o=(0,a.Ji)("v-card__text"),l=(0,a.Ji)("v-card__title");s.Z},7003:function(t,e,i){i.d(e,{Z:function(){return m}});var s=i(4367),a=i(3796),n=(i(9653),i(9253),i(5827)),r=i(8083),o=i(6952),l=i(3536),c=i(1431),h=i(8085),d=i(4589),u=i(3325),v=(0,u.Z)(o.Z,(0,l.d)(["absolute","fixed","top","bottom"]),c.Z,h.Z),m=v.extend({name:"v-progress-linear",directives:{intersect:r.Z},props:{active:{type:Boolean,default:!0},backgroundColor:{type:String,default:null},backgroundOpacity:{type:[Number,String],default:null},bufferValue:{type:[Number,String],default:100},color:{type:String,default:"primary"},height:{type:[Number,String],default:4},indeterminate:Boolean,query:Boolean,reverse:Boolean,rounded:Boolean,stream:Boolean,striped:Boolean,value:{type:[Number,String],default:0}},data:function(){return{internalLazyValue:this.value||0,isVisible:!0}},computed:{__cachedBackground:function(){return this.$createElement("div",this.setBackgroundColor(this.backgroundColor||this.color,{staticClass:"v-progress-linear__background",style:this.backgroundStyle}))},__cachedBar:function(){return this.$createElement(this.computedTransition,[this.__cachedBarType])},__cachedBarType:function(){return this.indeterminate?this.__cachedIndeterminate:this.__cachedDeterminate},__cachedBuffer:function(){return this.$createElement("div",{staticClass:"v-progress-linear__buffer",style:this.styles})},__cachedDeterminate:function(){return this.$createElement("div",this.setBackgroundColor(this.color,{staticClass:"v-progress-linear__determinate",style:{width:(0,d.kb)(this.normalizedValue,"%")}}))},__cachedIndeterminate:function(){return this.$createElement("div",{staticClass:"v-progress-linear__indeterminate",class:{"v-progress-linear__indeterminate--active":this.active}},[this.genProgressBar("long"),this.genProgressBar("short")])},__cachedStream:function(){return this.stream?this.$createElement("div",this.setTextColor(this.color,{staticClass:"v-progress-linear__stream",style:{width:(0,d.kb)(100-this.normalizedBuffer,"%")}})):null},backgroundStyle:function(){var t,e=null==this.backgroundOpacity?this.backgroundColor?1:.3:parseFloat(this.backgroundOpacity);return t={opacity:e},(0,a.Z)(t,this.isReversed?"right":"left",(0,d.kb)(this.normalizedValue,"%")),(0,a.Z)(t,"width",(0,d.kb)(Math.max(0,this.normalizedBuffer-this.normalizedValue),"%")),t},classes:function(){return(0,s.Z)({"v-progress-linear--absolute":this.absolute,"v-progress-linear--fixed":this.fixed,"v-progress-linear--query":this.query,"v-progress-linear--reactive":this.reactive,"v-progress-linear--reverse":this.isReversed,"v-progress-linear--rounded":this.rounded,"v-progress-linear--striped":this.striped,"v-progress-linear--visible":this.isVisible},this.themeClasses)},computedTransition:function(){return this.indeterminate?n.Z5:n.Qn},isReversed:function(){return this.$vuetify.rtl!==this.reverse},normalizedBuffer:function(){return this.normalize(this.bufferValue)},normalizedValue:function(){return this.normalize(this.internalLazyValue)},reactive:function(){return Boolean(this.$listeners.change)},styles:function(){var t={};return this.active||(t.height=0),this.indeterminate||100===parseFloat(this.normalizedBuffer)||(t.width=(0,d.kb)(this.normalizedBuffer,"%")),t}},methods:{genContent:function(){var t=(0,d.z9)(this,"default",{value:this.internalLazyValue});return t?this.$createElement("div",{staticClass:"v-progress-linear__content"},t):null},genListeners:function(){var t=this.$listeners;return this.reactive&&(t.click=this.onClick),t},genProgressBar:function(t){return this.$createElement("div",this.setBackgroundColor(this.color,{staticClass:"v-progress-linear__indeterminate",class:(0,a.Z)({},t,!0)}))},onClick:function(t){if(this.reactive){var e=this.$el.getBoundingClientRect(),i=e.width;this.internalValue=t.offsetX/i*100}},onObserve:function(t,e,i){this.isVisible=i},normalize:function(t){return t<0?0:t>100?100:parseFloat(t)}},render:function(t){var e={staticClass:"v-progress-linear",attrs:{role:"progressbar","aria-valuemin":0,"aria-valuemax":this.normalizedBuffer,"aria-valuenow":this.indeterminate?void 0:this.normalizedValue},class:this.classes,directives:[{name:"intersect",value:this.onObserve}],style:{bottom:this.bottom?0:void 0,height:this.active?(0,d.kb)(this.height):0,top:this.top?0:void 0},on:this.genListeners()};return t("div",e,[this.__cachedStream,this.__cachedBackground,this.__cachedBuffer,this.__cachedBar,this.genContent()])}})},2691:function(t,e,i){i.d(e,{Z:function(){return c}});var s=i(4367),a=(i(9653),i(9253),i(3358)),n=i(6952),r=i(8085),o=i(3325),l=i(4589),c=(0,o.Z)((0,a.Z)("bar",["height","window"]),n.Z,r.Z).extend({name:"v-system-bar",props:{height:[Number,String],lightsOut:Boolean,window:Boolean},computed:{classes:function(){return(0,s.Z)({"v-system-bar--lights-out":this.lightsOut,"v-system-bar--absolute":this.absolute,"v-system-bar--fixed":!this.absolute&&(this.app||this.fixed),"v-system-bar--window":this.window},this.themeClasses)},computedHeight:function(){return this.height?isNaN(parseInt(this.height))?this.height:parseInt(this.height):this.window?32:24},styles:function(){return{height:(0,l.kb)(this.computedHeight)}}},methods:{updateApplication:function(){return this.$el?this.$el.clientHeight:this.computedHeight}},render:function(t){var e={staticClass:"v-system-bar",class:this.classes,style:this.styles,on:this.$listeners};return t("div",this.setBackgroundColor(this.color,e),(0,l.z9)(this))}})},7342:function(t,e,i){i.d(e,{Z:function(){return r}});i(9653);var s=i(144),a=i(7003),n=a.Z,r=s.Z.extend().extend({name:"loadable",props:{loading:{type:[Boolean,String],default:!1},loaderHeight:{type:[Number,String],default:2}},methods:{genProgress:function(){return!1===this.loading?null:this.$slots.progress||this.$createElement(n,{props:{absolute:!0,color:!0===this.loading||""===this.loading?this.color||"primary":this.loading,height:this.loaderHeight,indeterminate:!0}})}}})},9285:function(t,e,i){i.r(e),i.d(e,{default:function(){return C}});var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-col",{staticClass:"col-12 col-sm-6 col-md-4 col-lg-4"},[i("v-card",{attrs:{dark:this.$vuetify.theme.dark,color:"secondary"}},[i("v-progress-linear",{attrs:{height:"7",value:t.vals.mainLevel,color:t.vals.mainColor,"background-color":"secondary darken-1"}}),i("v-card-title",{staticClass:"text-truncate"},[t._v(" "+t._s(t.vals.title)+" "),i("v-spacer"),i("v-btn",{attrs:{small:"",icon:""},on:{click:t.expand}},[i("v-icon",{attrs:{small:""}},[t._v(" "+t._s(t.maxIcon)+" ")])],1)],1),i("v-divider"),i("v-card-text",[i("v-row",{attrs:{align:"center"}},[i("v-col",{attrs:{align:"center"}},[i("div",{staticClass:"headline font-weight-bold"},[t._v(" "+t._s(t.vals.mainState)+" ")])])],1),t.expanded?i("v-row",{attrs:{align:"center"}},[i("v-col",{attrs:{align:"center"}},[i("div",[t._v("Luftdruck")]),i("div",{staticClass:"headline font-weight-bold"},[t._v(" "+t._s(t.vals.pressure)+" ")])]),i("v-col",{attrs:{align:"center"}},[i("div",[t._v("Wind")]),i("div",{staticClass:"headline font-weight-bold"},[t._v(" "+t._s(t.vals.wind)+" ")])])],1):t._e()],1),t.expanded?i("v-divider"):t._e(),t.expanded?i("v-card-text",t._l(t.vals.forecast,(function(e){return i("v-row",{key:e.weekday,attrs:{align:"center"}},[i("v-col",{staticClass:"col-2",attrs:{align:"center"}},[i("v-icon",{attrs:{large:""}},[t._v(" "+t._s(e.icon)+" ")])],1),i("v-col",{staticClass:"text-truncate"},[i("h3",[t._v(t._s(e.weekday))]),i("span",[t._v(t._s(e.condition))])]),i("v-col",{staticClass:"col-2 pl-0",attrs:{align:"center"}},[i("div",[t._v(t._s(e.temp_max))]),i("div",[t._v(t._s(e.temp_min))])])],1)})),1):t._e(),i("v-divider"),i("v-system-bar",{attrs:{color:"secondary darken-1"}},[i("v-icon",[t._v(t._s(t.vals.systemIcon))]),t._v(t._s(t.vals.systemIconValue)+" "),i("v-spacer"),t._v(" "+t._s(t.vals.systemLastEvent)+" "),i("v-spacer"),i("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var s=e.on,a=e.attrs;return[i("v-icon",t._g(t._b({},"v-icon",a,!1),s),[t._v(" "+t._s(t.vals.systemActivityIcon)+" ")])]}}])},[t._v(" "+t._s(t.vals.systemActivityState)+" ")])],1)],1)],1)},a=[],n=(i(4916),i(3123),i(5306),i(561),{props:{item:{type:Object,default:function(){return{name:"weather"}}}},data:function(){return{name:"weather",app:{options:{lang:""}},apiSet:{Weather:{lastUpdate:"validity",condition:"condition",pressure:"pressure",wind:"wind_condition",icon:"icon",fcCondition:"_condition",fcIcon:"_icon",fcMin:"_low_c",fcMax:"_high_c"},PROPLANTA:{lastUpdate:"lastConnection",condition:"weather",pressure:"pressure",wind:"wind",icon:"weatherIcon",fcCondition:"_weatherDay",fcIcon:"_weatherDayIcon",fcMin:"_tempMin",fcMax:"_tempMax",icons:{t1:"sunny",t2:"partly_cloudy",t3:"partly_cloudy",t4:"partly_cloudy",t5:"cloudy",t6:"chance_of_rain",t7:"rain",t8:"thunderstorm",t9:"sleet",t10:"snow",t11:"sleet",t12:"fog",t13:"fog",t14:"rain",n1:"clear_night",n2:"clear_night",n3:"partly_cloudy_night",n4:"partly_cloudy_night",n5:"partly_cloudy_night",n6:"clear_night",n7:"clear_night",n8:"clear_night",n9:"clear_night",n10:"clear_night",n11:"clear_night",n12:"clear_night",n13:"clear_night",n14:"clear_night"}}},iconSet:{sunny:"mdi-weather-sunny",fog:"mdi-weather-fog",cloudy:"mdi-weather-cloudy",partly_cloudy:"mdi-weather-partly-cloudy",partly_cloudy_night:"mdi-weather-night-partly-cloudy",chance_of_rain:"mdi-weather-partly-rainy",clear_day:"mdi-weather-sunny",hail:"mdi-weather-hail",rain:"mdi-weather-rainy",sleet:"mdi-weather-snowy-rainy",snow:"mdi-weather-snowy",thunderstorm:"mdi-weather-lightning",windy:"mdi-weather-windy",clear_night:"mdi-weather-night"},vals:{title:"",mainLevel:0,mainColor:"success",mainState:"",pressure:"",wind:"",forecast:[],systemIcon:"",systemIconValue:"",systemLastEvent:""},maxIcon:"mdi-arrow-expand",expanded:!1,active:!0,type:"Weather"}},watch:{item:{immediate:!0,deep:!0,handler:function(t){this.type=this.$fhem.getEl(t,"Internals","TYPE");var e=this.$fhem.getEl(t,"Readings",this.apiSet[this.type].lastUpdate,"Time"),i=this.$fhem.getEl(t,"Readings",this.apiSet[this.type].lastUpdate,"Value")||"up-to-date",s=this.$fhem.getEl(t,"Readings",this.apiSet[this.type].icon,"Value"),a=this.$fhem.getEl(t,"Readings",this.apiSet[this.type].pressure,"Value"),n=this.$fhem.getEl(t,"Readings",this.apiSet[this.type].wind,"Value"),r=this.$fhem.getEl(t,"Attributes","alias")||t.Name;"PROPLANTA"===this.type&&(i="up-to-date",n="Wind: "+n+" km/h"),this.vals.title=this.$fhem.getEl(t,"Options","name")||r,this.vals.mainState=this.$fhem.getEl(t,"Readings",this.apiSet[this.type].condition,"Value")||"",this.vals.systemIcon=this.getIcon(s),this.vals.pressure=a?parseInt(a).toLocaleString("de-DE")+"hPa":"",this.vals.wind=n?n.split(":")[1]:"",this.vals.systemLastEvent=e?this.$fhem.getDateTime(e):"",this.vals.systemActivityIcon="up-to-date"===i?"mdi-sync":"mdi-sync-off",this.vals.systemActivityState=i,"up-to-date"!=i&&(this.active=!1,this.vals.mainLevel=100,this.vals.mainColor="error",this.vals.mainState="nicht aktuell")}}},methods:{getIcon:function(t){if("PROPLANTA"===this.type){var e=/\/.{1,3}\.gif/.exec(t),i=e[0].replace("/","").replace(".gif","");t=this.apiSet.PROPLANTA.icons[i]||i}if(t&&this.iconSet[t])return this.iconSet[t];this.vals.systemIconValue=t},loadForecast:function(){this.vals.forecast.splice(0);for(var t=1;t<7;t++){var e=this.type||"Weather",i=this.$fhem.getDate(1-t),s="PROPLANTA"===e?t-1:t,a=new Date(i).toLocaleString(this.app.options.lang,{weekday:"long"}),n=this.$fhem.getEl(this.item,"Readings","fc"+s+this.apiSet[e].fcCondition,"Value"),r=this.$fhem.getEl(this.item,"Readings","fc"+s+this.apiSet[e].fcIcon,"Value"),o=this.$fhem.getEl(this.item,"Readings","fc"+s+this.apiSet[e].fcMin,"Value")||"--",l=this.$fhem.getEl(this.item,"Readings","fc"+s+this.apiSet[e].fcMax,"Value")||"--",c={weekday:a,condition:n,icon:this.getIcon(r),temp:o+"°C max. "+l+"°C min.",temp_max:o+"°C",temp_min:l+"°C"};this.vals.forecast.push(c)}},expand:function(){this.expanded?(this.expanded=!1,this.maxIcon="mdi-arrow-expand"):(this.expanded=!0,this.maxIcon="mdi-arrow-collapse",this.loadForecast())}},mounted:function(){this.app.options=this.$fhem.app.options,this.$fhem.getEl(this.item,"Options","setup","expanded")&&(this.expanded=!1,this.expand())}}),r=n,o=i(1001),l=i(3453),c=i.n(l),h=i(3150),d=i(2371),u=i(7118),v=i(2102),m=i(1418),p=i(6428),g=i(7003),f=i(2877),_=i(9762),y=i(2691),b=i(9330),w=(0,o.Z)(r,s,a,!1,null,null,null),C=w.exports;c()(w,{VBtn:h.Z,VCard:d.Z,VCardText:u.ZB,VCardTitle:u.EB,VCol:v.Z,VDivider:m.Z,VIcon:p.Z,VProgressLinear:g.Z,VRow:f.Z,VSpacer:_.Z,VSystemBar:y.Z,VTooltip:b.Z})}}]);
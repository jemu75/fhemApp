(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-dc5178fa"],{"5d11":function(t,s,e){"use strict";e.r(s);var i=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("v-col",{class:t.setup.size},[e("v-card",{attrs:{dark:this.$vuetify.theme.dark,color:"secondary"}},[e("v-progress-linear",{attrs:{height:"7",value:t.getLevel,color:t.vals.status.color,"background-color":"secondary darken-1"}}),e("v-card-title",{staticClass:"text-truncate"},[t._v(" "+t._s(t.vals.title)+" ")]),e("v-divider"),e("v-card-text",{staticClass:"pa-0"},t._l(t.list,(function(s){return e("div",{key:s.Name,attrs:{align:"center"}},[e("v-row",{staticClass:"ma-1",attrs:{dense:"",align:"center"}},[e("v-col",{staticClass:"col-2"},[e("v-progress-circular",{attrs:{value:s.level,color:s.color}})],1),e("v-col",{staticClass:"text-truncate",attrs:{align:"left"}},[e("div",{staticClass:"text-truncate headline"},[t._v(" "+t._s(s.title)+" ")]),e("div",{staticClass:"text-truncate"},[t._v(" "+t._s(s.text)+" ")])]),e("v-col",{staticClass:"col-2",attrs:{align:"center"}},[s.route&&!s.click&&s.icon?e("v-btn",{attrs:{icon:"",link:"",to:s.route}},[e("v-icon",{attrs:{large:""}},[t._v(" "+t._s(s.icon)+" ")])],1):t._e(),s.click&&!s.route&&s.icon?e("div",[e("v-btn",{attrs:{icon:""},on:{click:function(e){return t.set(s.device,s.click)}}},[e("v-icon",{attrs:{large:""}},[t._v(" "+t._s(s.icon)+" ")])],1)],1):t._e(),s.menu&&!s.route&&!s.click&&s.icon?e("div",[e("v-menu",{attrs:{bottom:"",left:"",transition:"slide-y-transition"},scopedSlots:t._u([{key:"activator",fn:function(i){var a=i.on,n=i.attrs;return[e("v-btn",t._g(t._b({attrs:{icon:""}},"v-btn",n,!1),a),[e("v-icon",{attrs:{large:""}},[t._v(" "+t._s(s.icon)+" ")])],1)]}}],null,!0)},[e("v-list",{attrs:{dense:"",color:"secondary lighten-2"}},[e("v-list-item-group",t._l(s.menu,(function(i,a){return e("v-list-item",{key:a,on:{click:function(e){return t.set(s.device,i.cmd)}}},[e("v-list-item-content",[e("v-list-item-title",{staticClass:"text-subtitle-1"},[t._v(" "+t._s(i.name)+" ")])],1)],1)})),1)],1)],1)],1):t._e()],1)],1),e("v-divider")],1)})),0),e("v-system-bar",{attrs:{color:"secondary darken-1"}},[e("v-icon",{staticClass:"ml-0"},[t._v(" "+t._s(t.vals.info.left1Icon)+" ")]),t._v(t._s(t.vals.info.left1Text)+" "),e("v-icon",{staticClass:"ml-2"},[t._v(" "+t._s(t.vals.info.left2Icon)+" ")]),t._v(t._s(t.vals.info.left2Text)+" "),e("v-spacer"),e("v-icon",[t._v(t._s(t.vals.info.mid1Icon))]),t._v(t._s(t.vals.info.mid1Text)+" "),e("v-icon",{staticClass:"ml-2"},[t._v(" "+t._s(t.vals.info.mid2Icon)+" ")]),t._v(t._s(t.vals.info.mid2Text)+" "),e("v-spacer"),e("v-icon",[t._v(t._s(t.vals.info.right1Icon))]),t._v(t._s(t.vals.info.right1Text)+" "),e("v-icon",{staticClass:"ml-2 mr-0"},[t._v(" "+t._s(t.vals.info.right2Icon)+" ")]),t._v(t._s(t.vals.info.right2Text)+" ")],1)],1)],1)},a=[],n=e("b85c"),l=(e("466d"),e("ac1f"),e("1276"),e("d81d"),e("b0c0"),e("a434"),{props:{item:{type:Object,default:function(){return{name:"panel"}}}},data:function(){return{name:"panel",setup:{size:"col-12 col-sm-6 col-md-6 col-lg-6",status:{bar:[],error:[],min:0,max:100},info:{left1:[],left2:[],mid1:[],mid2:[],right1:[],right2:[]}},vals:{title:"",status:{level:0,color:"",invert:!1},info:{left1Icon:"",left1Text:"",left2Icon:"",left2Text:"",mid1Icon:"",mid1Text:"",mid2Icon:"",mid2Text:"",right1Icon:"",right1Text:"",right2Icon:"",right2Text:""}},list:[]}},computed:{getLevel:function(){var t=100/(this.setup.status.max-this.setup.status.min),s=(this.vals.status.level-this.setup.status.min)*t;return this.vals.status.invert?100-s:s}},watch:{item:{immediate:!0,deep:!0,handler:function(t){var s=this.$fhem.getEl(t,"Attributes","alias")||t.Name;this.vals.title=this.$fhem.getEl(t,"Options","name")||s,this.setValues(),this.doList()}},setup:{deep:!0,handler:function(){this.setValues()}}},created:function(){var t=this.$fhem.getEl(this.item,"Options","setup","size"),s=this.$fhem.getEl(this.item,"Options","setup","status"),e=this.$fhem.getEl(this.item,"Options","setup","info");t&&(this.setup.size=t),s&&Object.assign(this.setup.status,s),e&&Object.assign(this.setup.info,e)},methods:{setValues:function(){var t=this.$fhem.handleVals(this.item,this.setup.status.bar),s=this.$fhem.handleVals(this.item,this.setup.status.error),e=this.$fhem.handleVals(this.item,this.setup.info.left1),i=this.$fhem.handleVals(this.item,this.setup.info.left2),a=this.$fhem.handleVals(this.item,this.setup.info.mid1),n=this.$fhem.handleVals(this.item,this.setup.info.mid2),l=this.$fhem.handleVals(this.item,this.setup.info.right1),o=this.$fhem.handleVals(this.item,this.setup.info.right2);this.vals.status.level=t[0]||"100",this.vals.status.color=t[1]||"success",this.vals.status.invert=!!t[2],this.vals.info.left1Icon=e[1]||"",this.vals.info.left1Text=e[0]||"",this.vals.info.left2Icon=i[1]||"",this.vals.info.left2Text=i[0]||"",this.vals.info.mid1Icon=a[1]||"",this.vals.info.mid1Text=a[0]||"",this.vals.info.mid2Icon=n[1]||"",this.vals.info.mid2Text=n[0]||"",this.vals.info.right1Icon=l[1]||"",this.vals.info.right1Text=l[0]||"",this.vals.info.right2Icon=o[1]||"",this.vals.info.right2Text=o[0]||"",s.length>0?(this.vals.status.level=s[0]||"100",this.vals.status.color=s[1]||"error",this.vals.main.text=s[2]||"Fehler",this.isActive=!1):this.isActive=!0},set:function(t,s){var e=s.match("set")?s:"set "+t+" "+s;this.$fhem.request(e)},loadItem:function(t){var s=this.$fhem.getEl(t,"Name")||"",e=this.$fhem.getEl(t,"Attributes","alias")||t.Name,i=this.$fhem.getEl(t,"Options","name")||e,a=this.$fhem.getEl(t,"Options","panel","link")||"",l=this.$fhem.handleVals(t,this.$fhem.getEl(t,"Options","panel","status"))||[],o=this.$fhem.handleVals(t,this.$fhem.getEl(t,"Options","panel","btn"))||[],c=this.$fhem.handleVals(t,this.$fhem.getEl(t,"Options","panel","click"))||[],h=this.$fhem.getEl(t,"Options","panel","menu")||[],r=this.$fhem.getEl(t,"Options","panel","min")||0,u=this.$fhem.getEl(t,"Options","panel","max")||100,v=100/(u-r),m=((l[1]||0)-r)*v,f=[];if(h.length>0){var d,p=Object(n["a"])(h);try{for(p.s();!(d=p.n()).done;){var g=d.value,_=g.split(":");2==_.length&&f.push({name:_[0],cmd:_[1]})}}catch(x){p.e(x)}finally{p.f()}}var b={device:s,title:i,text:l[0]||"",level:l[3]?100-m:m,color:l[2]||"success",icon:o[0]||"",route:a,click:c[0]||"",menu:f};return b},doList:function(){if(this.item.Connected)for(var t in this.item.Options.connected){var s=this.list.map((function(t){return t.name})).indexOf(t),e=this.loadItem(this.item.Connected[t]),i={name:t,device:e.device,level:e.level,color:e.color,title:e.title,text:e.text,icon:e.icon,route:e.route,click:e.click,menu:e.menu};0==this.setup.status.bar.length&&"success"!=i.color&&"success"===this.vals.status.color&&(this.vals.status.color=i.color),-1!=s?this.list.splice(s,1,i):this.list.push(i)}}}}),o=l,c=e("2877"),h=e("6544"),r=e.n(h),u=e("8336"),v=e("b0af"),m=e("99d9"),f=e("62ad"),d=e("ce7e"),p=e("132d"),g=e("8860"),_=e("da13"),b=e("5d23"),x=e("1baa"),V=e("e449"),$=e("490a"),I=e("8e36"),O=e("0fd9"),k=e("2fa4"),C=e("afd9"),y=Object(c["a"])(o,i,a,!1,null,null,null);s["default"]=y.exports;r()(y,{VBtn:u["a"],VCard:v["a"],VCardText:m["c"],VCardTitle:m["d"],VCol:f["a"],VDivider:d["a"],VIcon:p["a"],VList:g["a"],VListItem:_["a"],VListItemContent:b["a"],VListItemGroup:x["a"],VListItemTitle:b["c"],VMenu:V["a"],VProgressCircular:$["a"],VProgressLinear:I["a"],VRow:O["a"],VSpacer:k["a"],VSystemBar:C["a"]})},8308:function(t,s,e){},afd9:function(t,s,e){"use strict";var i=e("5530"),a=(e("a9e3"),e("c7cd"),e("8308"),e("3a66")),n=e("a9ad"),l=e("7560"),o=e("58df"),c=e("80d2");s["a"]=Object(o["a"])(Object(a["a"])("bar",["height","window"]),n["a"],l["a"]).extend({name:"v-system-bar",props:{height:[Number,String],lightsOut:Boolean,window:Boolean},computed:{classes:function(){return Object(i["a"])({"v-system-bar--lights-out":this.lightsOut,"v-system-bar--absolute":this.absolute,"v-system-bar--fixed":!this.absolute&&(this.app||this.fixed),"v-system-bar--window":this.window},this.themeClasses)},computedHeight:function(){return this.height?isNaN(parseInt(this.height))?this.height:parseInt(this.height):this.window?32:24},styles:function(){return{height:Object(c["g"])(this.computedHeight)}}},methods:{updateApplication:function(){return this.$el?this.$el.clientHeight:this.computedHeight}},render:function(t){var s={staticClass:"v-system-bar",class:this.classes,style:this.styles,on:this.$listeners};return t("div",this.setBackgroundColor(this.color,s),Object(c["s"])(this))}})}}]);
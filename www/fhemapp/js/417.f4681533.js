"use strict";(self["webpackChunkfhemapp"]=self["webpackChunkfhemapp"]||[]).push([[417],{1417:function(t,e,i){i.r(e),i.d(e,{default:function(){return B}});var s=i(7179),n=i(3385),l=i(5223),a=i(4437),o=i(4192),r=i(5057),h=i(248),c=i(1908),d=i(2321),u=i(2776),m=i(8228),f=i(92),p=i(1302),v=i(5294),g=i(2059),x=i(5234),_=i(9953),C=function(){var t=this,e=t._self._c;return t.item.Options.show?e(a.Z,{class:t.item.Options.setup.size},[e(n.Z,{attrs:{dark:this.$vuetify.theme.dark,color:"secondary"}},[e(p.Z,{attrs:{height:"7",value:t.item.Options.status.level,color:t.item.Options.status.color,"background-color":"secondary darken-1"}}),e(l.EB,{staticClass:"text-truncate"},[t._v(" "+t._s(t.item.Options.name)+" "),e(x.Z),t.lvlIcon&&t.item.Options.status.isActive?e(s.Z,{attrs:{small:"",icon:""},on:{click:function(e){return t.lvlBtn()}}},[e(r.Z,{attrs:{small:""}},[t._v(" "+t._s(t.lvlIcon)+" ")])],1):t._e(),t.app.options.debugMode?e("jsonList",{attrs:{item:t.item}}):t._e()],1),e(o.Z),t.item.Options.status.isActive?t._e():e("div",[e(l.ZB,[e(v.Z,{attrs:{align:"center"}},[e(a.Z,{attrs:{align:"center"}},[e("div",{staticClass:"headline font-weight-bold"},[t._v(" "+t._s(t.item.Options.status.error)+" ")])])],1)],1),e(o.Z)],1),t.item.Options.status.isActive?e("div",t._l(t.main,(function(i){return e("div",{key:i.idx},[i.show?e("div",[t._v(" "+t._s(i.order)+" "),e(l.ZB,[e(v.Z,{attrs:{align:"center"}},[0==i.leftMenu.length&&i.leftBtn?e(a.Z,{staticClass:"col-3",attrs:{align:"center"}},[e(s.Z,{attrs:{small:"",icon:"",color:i.leftBtnColor,disabled:i.leftBtnDisabled},on:{touchstart:function(e){return t.clickStart(i.idx,"left","touch")},touchend:function(e){return t.clickEnd(i.idx,"left","touch")},mousedown:function(e){return t.clickStart(i.idx,"left","mouse")},mouseup:function(e){return t.clickEnd(i.idx,"left","mouse")}}},[i.slider?e("div",[e(r.Z,[t._v(" "+t._s(i.leftBtn)+" ")])],1):t._e(),i.slider?t._e():e("div",[e(r.Z,{attrs:{large:""}},[t._v(" "+t._s(i.leftBtn)+" ")])],1)])],1):t._e(),i.leftMenu.length>0&&i.leftBtn?e(a.Z,{staticClass:"col-3",attrs:{align:"center"}},[e(f.Z,{attrs:{bottom:"",right:"",transition:"slide-y-transition"},scopedSlots:t._u([{key:"activator",fn:function({on:n,attrs:l}){return[e(s.Z,t._g(t._b({attrs:{small:"",icon:"",color:i.leftBtnColor,disabled:i.leftBtnDisabled}},"v-btn",l,!1),n),[i.slider?e("div",[e(r.Z,[t._v(" "+t._s(i.leftBtn)+" ")])],1):t._e(),i.slider?t._e():e("div",[e(r.Z,{attrs:{large:""}},[t._v(" "+t._s(i.leftBtn)+" ")])],1)])]}}],null,!0)},[e(h.Z,{attrs:{dense:"",color:"secondary lighten-2"}},[e(u.Z,{attrs:{"active-class":"success--text"},model:{value:i.leftMenuIdx,callback:function(e){t.$set(i,"leftMenuIdx",e)},expression:"level.leftMenuIdx"}},t._l(i.leftMenu,(function(i,s){return e(c.Z,{key:s,on:{click:function(e){return t.sendCmd(i.cmd)}}},[e(d.km,[e(d.V9,{staticClass:"text-subtitle-1"},[t._v(" "+t._s(i.name)+" ")])],1),i.active?e(m.Z,[e(r.Z,[t._v("mdi-check")])],1):t._e()],1)})),1)],1)],1)],1):t._e(),i.leftBtn&&!i.slider?e(o.Z,{attrs:{vertical:""}}):t._e(),i.midBtn||i.slider?t._e():e(a.Z,{attrs:{align:i.textAlign}},[e("div",{staticClass:"headline font-weight-bold"},[t._v(" "+t._s(i.text)+" ")])]),!i.text2||i.midBtn||i.slider?t._e():e(a.Z,{attrs:{align:i.text2Align}},[e("div",{staticClass:"headline font-weight-bold"},[t._v(" "+t._s(i.text2)+" ")])]),0===i.midMenu.length&&i.midBtn?e(a.Z,{staticClass:"headline",attrs:{align:"center"}},[e(s.Z,{attrs:{small:"",icon:"",disabled:i.midBtnDisabled,color:i.midBtnColor},on:{touchstart:function(e){return t.clickStart(i.idx,"mid","touch")},touchend:function(e){return t.clickEnd(i.idx,"mid","touch")},mousedown:function(e){return t.clickStart(i.idx,"mid","mouse")},mouseup:function(e){return t.clickEnd(i.idx,"mid","mouse")}}},[e(r.Z,{attrs:{large:""}},[t._v(" "+t._s(i.midBtn)+" ")])],1)],1):t._e(),i.midMenu.length>0&&i.midBtn?e(a.Z,{staticClass:"headline",attrs:{align:"center"}},[e(f.Z,{attrs:{bottom:"",transition:"slide-y-transition"},scopedSlots:t._u([{key:"activator",fn:function({on:n,attrs:l}){return[i.text?e(s.Z,t._g(t._b({staticClass:"headline font-weight-bold",attrs:{block:"",plain:""}},"v-btn",l,!1),n),[t._v(" "+t._s(i.text)+" ")]):t._e(),i.text?t._e():e(s.Z,t._g(t._b({attrs:{small:"",icon:"",disabled:i.midBtnDisabled,color:i.midBtnColor}},"v-btn",l,!1),n),[e(r.Z,{attrs:{large:""}},[t._v(" "+t._s(i.midBtn)+" ")])],1)]}}],null,!0)},[e(h.Z,{attrs:{dense:"",color:"secondary lighten-2"}},[e(u.Z,{attrs:{"active-class":"success--text"},model:{value:i.midMenuIdx,callback:function(e){t.$set(i,"midMenuIdx",e)},expression:"level.midMenuIdx"}},t._l(i.midMenu,(function(i,s){return e(c.Z,{key:s,on:{click:function(e){return t.sendCmd(i.cmd)}}},[e(d.km,[e(d.V9,{staticClass:"text-subtitle-1"},[t._v(" "+t._s(i.name)+" ")])],1),i.active?e(m.Z,[e(r.Z,[t._v("mdi-check")])],1):t._e()],1)})),1)],1)],1)],1):t._e(),i.slider?e(a.Z,{attrs:{align:"center"}},[e(g.Z,{attrs:{min:i.sliderMin,max:i.sliderMax,label:i.text,"hide-details":"","thumb-label":"","thumb-size":"48",color:"success",step:i.sliderStep},on:{change:function(e){return t.setSlider(i.idx,i.sliderCurrent)}},scopedSlots:t._u([{key:"thumb-label",fn:function({value:s}){return[e("div",{staticClass:"text-h6"},[t._v(" "+t._s(t.sliderVal(i.idx,s))+" ")])]}}],null,!0),model:{value:i.sliderCurrent,callback:function(e){t.$set(i,"sliderCurrent",e)},expression:"level.sliderCurrent"}})],1):t._e(),i.rightBtn&&!i.slider?e(o.Z,{attrs:{vertical:""}}):t._e(),0===i.rightMenu.length&&i.rightBtn?e(a.Z,{staticClass:"col-3",attrs:{align:"center"}},[e(s.Z,{attrs:{small:"",icon:"",disabled:i.rightBtnDisabled,color:i.rightBtnColor},on:{touchstart:function(e){return t.clickStart(i.idx,"right","touch")},touchend:function(e){return t.clickEnd(i.idx,"right","touch")},mousedown:function(e){return t.clickStart(i.idx,"right","mouse")},mouseup:function(e){return t.clickEnd(i.idx,"right","mouse")}}},[i.slider?e("div",[e(r.Z,[t._v(" "+t._s(i.rightBtn)+" ")])],1):t._e(),i.slider?t._e():e("div",[e(r.Z,{attrs:{large:""}},[t._v(" "+t._s(i.rightBtn)+" ")])],1)])],1):t._e(),i.rightMenu.length>0&&i.rightBtn?e(a.Z,{staticClass:"col-3",attrs:{align:"center"}},[e(f.Z,{attrs:{bottom:"",left:"",transition:"slide-y-transition"},scopedSlots:t._u([{key:"activator",fn:function({on:n,attrs:l}){return[e(s.Z,t._g(t._b({attrs:{small:"",icon:"",disabled:i.rightBtnDisabled,color:i.rightBtnColor}},"v-btn",l,!1),n),[i.slider?e("div",[e(r.Z,[t._v(" "+t._s(i.rightBtn)+" ")])],1):t._e(),i.slider?t._e():e("div",[e(r.Z,{attrs:{large:""}},[t._v(" "+t._s(i.rightBtn)+" ")])],1)])]}}],null,!0)},[e(h.Z,{attrs:{dense:"",color:"secondary lighten-2"}},[e(u.Z,{attrs:{"active-class":"success--text"},model:{value:i.rightMenuIdx,callback:function(e){t.$set(i,"rightMenuIdx",e)},expression:"level.rightMenuIdx"}},t._l(i.rightMenu,(function(i,s){return e(c.Z,{key:s,on:{click:function(e){return t.sendCmd(i.cmd)}}},[e(d.km,[e(d.V9,{staticClass:"text-subtitle-1"},[t._v(" "+t._s(i.name)+" ")])],1),i.active?e(m.Z,[e(r.Z,[t._v("mdi-check")])],1):t._e()],1)})),1)],1)],1)],1):t._e()],1)],1),e(o.Z)],1):t._e()])})),0):t._e(),e(_.Z,{attrs:{color:"secondary darken-1"}},[e(r.Z,{staticClass:"ml-0",attrs:{color:t.item.Options.info.left1IconColor}},[t._v(" "+t._s(t.item.Options.info.left1Icon)+" ")]),e("div",{staticClass:"text-truncate"},[t._v(" "+t._s(t.item.Options.info.left1Text)+" ")]),e(r.Z,{staticClass:"ml-2",attrs:{color:t.item.Options.info.left2IconColor}},[t._v(" "+t._s(t.item.Options.info.left2Icon)+" ")]),e("div",{staticClass:"text-truncate"},[t._v(" "+t._s(t.item.Options.info.left2Text)+" ")]),e(x.Z),e(r.Z,{attrs:{color:t.item.Options.info.mid1IconColor}},[t._v(" "+t._s(t.item.Options.info.mid1Icon)+" ")]),e("div",{staticClass:"text-truncate"},[t._v(" "+t._s(t.item.Options.info.mid1Text)+" ")]),e(r.Z,{staticClass:"ml-2",attrs:{color:t.item.Options.info.mid2IconColor}},[t._v(" "+t._s(t.item.Options.info.mid2Icon)+" ")]),e("div",{staticClass:"text-truncate"},[t._v(" "+t._s(t.item.Options.info.mid2Text)+" ")]),e(x.Z),e(r.Z,{attrs:{color:t.item.Options.info.right1IconColor}},[t._v(" "+t._s(t.item.Options.info.right1Icon)+" ")]),e("div",{staticClass:"text-truncate"},[t._v(" "+t._s(t.item.Options.info.right1Text)+" ")]),e(r.Z,{staticClass:"ml-2 mr-0",attrs:{color:t.item.Options.info.right2IconColor}},[t._v(" "+t._s(t.item.Options.info.right2Icon)+" ")]),e("div",{staticClass:"text-truncate"},[t._v(" "+t._s(t.item.Options.info.right2Text)+" ")])],1)],1)],1):t._e()},k=[],Z=(i(7658),i(9044)),b={components:{jsonList:Z.Z},props:{item:{type:Object,default:()=>({name:"default"})}},data:()=>({name:"default",app:{options:{debugMode:!1}},main:[],lvlMax:1,lvlIcon:null,timer:!1,long:!1,pendingClick:0,touchFirst:!1}),watch:{item:{immediate:!1,deep:!0,handler(){this.setVals()}}},created(){this.app.options=this.$fhem.app.options,this.lvlMax=this.item.Options.setup.main.length,this.lvlIcon=this.lvlMax>1?this.item.Options.setup.expand?"mdi-arrow-expand":"mdi-swap-vertical":null,this.setLvl(this.$fhem.getEl(this.item,"Options","setup","expanded")&&this.$fhem.getEl(this.item,"Options","setup","expand")?-1:0),this.setVals()},methods:{sendCmd(t,e){let i=this.$fhem.getEl(this.item,"Internals","NAME");/%d/.test(t)&&(t=t.replace("%d",i)),e?(this.pendingClick&&(clearTimeout(this.pendingClick),this.pendingClick=0),this.pendingClick=setTimeout((()=>{this.$fhem.request(t)}),1e3)):this.$fhem.request(t)},updateReading(t){let e=t.split(" ");4===e.length&&this.$fhem.getEl(this.item,"Readings",e[2],"Value")&&(this.item.Readings[e[2]].Value=e[3])},createCmd(t){let e="";if(t.match("set")||t.match("get")){let i=t.trim().split(" ");if(i[1]&&i[1].match("Connected")){let t=i[1].replace("Connected.","");i[1]=this.$fhem.getEl(this.item,"Connected",t,"Internals","NAME"),i[1]?e=i.join(" "):this.$fhem.log({lvl:1,msg:"Connected Device not found. "+this.item.Options})}else e=t}else e="set "+this.item.Name+" "+t;return e},clickStart(t,e,i){this.long=!1,this.$fhem.log({lvl:5,msg:"ClickStart: type "+e+":"+i}),this.touchFirst&&"mouse"===i||("touch"===i&&(this.touchFirst=!0),this.timer=setInterval((()=>{this.long=!0;let i=this.item.Options.setup.main[t][e+"Long"];if(this.$fhem.log({lvl:5,msg:"ClickEvent: Long  ["+i+"]"}),i){let t=this.$fhem.handleVals(this.item,i);if(t[0]){let e=this.createCmd(t[0]);this.sendCmd(e),this.timer=clearInterval(this.timer)}}}),1e3))},clickEnd(t,e,i){if(this.$fhem.log({lvl:5,msg:"ClickEnd: type "+e+":"+i}),this.touchFirst&&"mouse"===i)return;"touch"===i&&(this.touchFirst=!0),this.timer=clearInterval(this.timer);let s=this.item.Options.setup.main[t][e+(this.long?"LongRelease":"Click")];if(this.$fhem.log({lvl:5,msg:"ClickEvent: "+(this.long?"LongRelease":"Click")+" ["+s+"]"}),s){let e=this.$fhem.handleVals(this.item,s);if(e[0]){let i=this.item.Options.setup.expand?t:0;this.main[i].sliderPrevent=!1;let n=this.createCmd(e[0]),l=-1!=s.findIndex((t=>t.match("%i")));!this.long&&l&&this.updateReading(n),this.sendCmd(n,l)}}},sliderVal(t,e){let i=this.item.Options.setup.main[t].slider,s=e;if(i){let t=this.$fhem.handleVals(this.item,i),n=t[4]&&t[4].match(".")?1:0;s=e.toFixed(n)}return s},setSlider(t,e){let i=this.item.Options.setup.main[t].slider;if(i){let s=this.$fhem.handleVals(this.item,i);if(s[0]){let i=this.item.Options.setup.expand?t:0;this.main[i].sliderPrevent=!0;let n=this.createCmd(s[0]),l=s[4]&&s[4].match("\\.")?1:0;n=n.replace("%v",e.toFixed(l)),this.sendCmd(n)}}},checkMenu(t){let e=!1;if(t){let i=t.split(" ");i[0].match("set")&&i.splice(0,2),1===i.length&&i.splice(0,0,"state");let s=/\./.test(i[0])?i[0].split("."):["Readings",i[0],"Value"],n=this.$fhem.getEl(this.item,...s);n&&n===i[1]&&(e=!0)}return e},createMenu(t){let e=[];if("string"===typeof t){let e=/\./.test(t)?t.split("."):["Readings",t,"Value"],i=this.$fhem.getEl(this.item,...e);t=JSON.parse(i)}if(t&&t.length>0)for(let i of t){let t=i.split(":");if(t.length>1){let i=this.createCmd(t[1].replace(/&#058;/g,":")),s=this.checkMenu(i);e.push({name:t[0],cmd:i,active:s})}}return e},lvlBtn(){let t=0;this.item.Options.setup.expand?(t=this.main.length>1?0:-1,this.lvlIcon=-1===t?"mdi-arrow-collapse":"mdi-arrow-expand"):(t=this.main[0].idx+1,t>this.lvlMax-1&&(t=0)),this.setLvl(t),this.setVals()},setLvl(t){let e=-1!=t?t:0,i=-1!=t?t:this.lvlMax-1;this.main.splice(0);for(let s=e;s<=i;s++){let t={idx:s,show:!0,leftBtn:"",leftBtnDisabled:!1,leftBtnColor:"",leftMenu:[],leftMenuIdx:-1,text:"",textAlign:"",text2:"",text2Align:"",midBtn:"",midBtnDisabled:!1,midBtnColor:"",midMenu:[],midMenuIdx:-1,slider:!1,sliderCurrent:0,sliderPrevent:!1,sliderMin:0,sliderMax:100,sliderStep:1,rightBtn:"",rightBtnDisabled:!1,rightBtnColor:"",rightMenu:[],rightMenuIdx:-1};this.main.push(t)}},setVals(){for(const t in this.main){let e=this.main[t].idx,i=this.$fhem.handleVals(this.item,this.item.Options.setup.main[e].show),s=this.$fhem.handleVals(this.item,this.item.Options.setup.main[e].text),n=this.$fhem.handleVals(this.item,this.item.Options.setup.main[e].text2),l=this.$fhem.handleVals(this.item,this.item.Options.setup.main[e].slider),a=this.$fhem.handleVals(this.item,this.item.Options.setup.main[e].leftBtn),o=this.$fhem.handleVals(this.item,this.item.Options.setup.main[e].midBtn),r=this.$fhem.handleVals(this.item,this.item.Options.setup.main[e].rightBtn),h=this.createMenu(this.item.Options.setup.main[e].leftMenu),c=this.createMenu(this.item.Options.setup.main[e].midMenu),d=this.createMenu(this.item.Options.setup.main[e].rightMenu);this.main[t].show="false"!==i[0],this.main[t].text=s[0]||"",this.main[t].textAlign=s[1]||"center",this.main[t].text2=n[0]||"",this.main[t].text2Align=n[1]||"center",this.main[t].leftBtn=a[0]||"",this.main[t].midBtn=o[0]||"",this.main[t].rightBtn=r[0]||"",this.main[t].leftBtnDisabled=!!a[1],this.main[t].midBtnDisabled=!!o[1],this.main[t].rightBtnDisabled=!!r[1],this.main[t].leftBtnColor=a[2]||"",this.main[t].midBtnColor=o[2]||"",this.main[t].rightBtnColor=r[2]||"",this.main[t].leftMenu=h,this.main[t].leftMenuIdx=h.map((t=>t.active)).indexOf(!0),this.main[t].midMenu=c,this.main[t].midMenuIdx=c.map((t=>t.active)).indexOf(!0),this.main[t].rightMenu=d,this.main[t].rightMenuIdx=d.map((t=>t.active)).indexOf(!0),this.main[t].slider=!!l[0],this.main[t].sliderMin=l[2]||0,this.main[t].sliderMax=l[3]||100,this.main[t].sliderStep=l[4]||1,this.main[t].sliderPrevent?this.main[t].sliderCurrent===l[1]&&(this.main[t].sliderPrevent=!1,this.main[t].sliderCurrent=l[1]||0):this.main[t].sliderCurrent=l[1]||0}}}},O=b,I=i(1001),M=(0,I.Z)(O,C,k,!1,null,null,null),B=M.exports},92:function(t,e,i){i.d(e,{Z:function(){return x}});i(7658);var s=i(8791),n=i(5840),l=i(4019),a=i(2524),o=i(7482),r=i(1649),h=i(3960),c=i(3276),d=i(9042),u=i(9495),m=i(4987),f=i(6596),p=i(1050),v=i(473);const g=(0,m.Z)(a.Z,l.Z,r.Z,h.Z,c.Z,o.Z);var x=g.extend({name:"v-menu",directives:{ClickOutside:d.Z,Resize:u.Z},provide(){return{isInMenu:!0,theme:this.theme}},props:{auto:Boolean,closeOnClick:{type:Boolean,default:!0},closeOnContentClick:{type:Boolean,default:!0},disabled:Boolean,disableKeys:Boolean,maxHeight:{type:[Number,String],default:"auto"},offsetX:Boolean,offsetY:Boolean,openOnHover:Boolean,origin:{type:String,default:"top left"},transition:{type:[Boolean,String],default:"v-menu-transition"}},data(){return{calculatedTopAuto:0,defaultOffset:8,hasJustFocused:!1,listIndex:-1,resizeTimeout:0,selectedIndex:null,tiles:[]}},computed:{activeTile(){return this.tiles[this.listIndex]},calculatedLeft(){const t=Math.max(this.dimensions.content.width,parseFloat(this.calculatedMinWidth));return this.auto?(0,p.kb)(this.calcXOverflow(this.calcLeftAuto(),t))||"0":this.calcLeft(t)||"0"},calculatedMaxHeight(){const t=this.auto?"200px":(0,p.kb)(this.maxHeight);return t||"0"},calculatedMaxWidth(){return(0,p.kb)(this.maxWidth)||"0"},calculatedMinWidth(){if(this.minWidth)return(0,p.kb)(this.minWidth)||"0";const t=Math.min(this.dimensions.activator.width+Number(this.nudgeWidth)+(this.auto?16:0),Math.max(this.pageWidth-24,0)),e=isNaN(parseInt(this.calculatedMaxWidth))?t:parseInt(this.calculatedMaxWidth);return(0,p.kb)(Math.min(e,t))||"0"},calculatedTop(){const t=this.auto?(0,p.kb)(this.calcYOverflow(this.calculatedTopAuto)):this.calcTop();return t||"0"},hasClickableTiles(){return Boolean(this.tiles.find((t=>t.tabIndex>-1)))},styles(){return{maxHeight:this.calculatedMaxHeight,minWidth:this.calculatedMinWidth,maxWidth:this.calculatedMaxWidth,top:this.calculatedTop,left:this.calculatedLeft,transformOrigin:this.origin,zIndex:this.zIndex||this.activeZIndex}}},watch:{isActive(t){t||(this.listIndex=-1)},isContentActive(t){this.hasJustFocused=t},listIndex(t,e){if(t in this.tiles){const e=this.tiles[t];e.classList.add("v-list-item--highlighted");const i=this.$refs.content.scrollTop,s=this.$refs.content.clientHeight;i>e.offsetTop-8?(0,v.Z)(e.offsetTop-e.clientHeight,{appOffset:!1,duration:300,container:this.$refs.content}):i+s<e.offsetTop+e.clientHeight+8&&(0,v.Z)(e.offsetTop-s+2*e.clientHeight,{appOffset:!1,duration:300,container:this.$refs.content})}e in this.tiles&&this.tiles[e].classList.remove("v-list-item--highlighted")}},created(){this.$attrs.hasOwnProperty("full-width")&&(0,f.Jk)("full-width",this)},mounted(){this.isActive&&this.callActivate()},methods:{activate(){this.updateDimensions(),requestAnimationFrame((()=>{this.startTransition().then((()=>{this.$refs.content&&(this.calculatedTopAuto=this.calcTopAuto(),this.auto&&(this.$refs.content.scrollTop=this.calcScrollPosition()))}))}))},calcScrollPosition(){const t=this.$refs.content,e=t.querySelector(".v-list-item--active"),i=t.scrollHeight-t.offsetHeight;return e?Math.min(i,Math.max(0,e.offsetTop-t.offsetHeight/2+e.offsetHeight/2)):t.scrollTop},calcLeftAuto(){return parseInt(this.dimensions.activator.left-2*this.defaultOffset)},calcTopAuto(){const t=this.$refs.content,e=t.querySelector(".v-list-item--active");if(e||(this.selectedIndex=null),this.offsetY||!e)return this.computedTop;this.selectedIndex=Array.from(this.tiles).indexOf(e);const i=e.offsetTop-this.calcScrollPosition(),s=t.querySelector(".v-list-item").offsetTop;return this.computedTop-i-s-1},changeListIndex(t){if(this.getTiles(),this.isActive&&this.hasClickableTiles)if(t.keyCode!==p.keyCodes.tab){if(t.keyCode===p.keyCodes.down)this.nextTile();else if(t.keyCode===p.keyCodes.up)this.prevTile();else if(t.keyCode===p.keyCodes.end)this.lastTile();else if(t.keyCode===p.keyCodes.home)this.firstTile();else{if(t.keyCode!==p.keyCodes.enter||-1===this.listIndex)return;this.tiles[this.listIndex].click()}t.preventDefault()}else this.isActive=!1},closeConditional(t){const e=t.target;return this.isActive&&!this._isDestroyed&&this.closeOnClick&&!this.$refs.content.contains(e)},genActivatorAttributes(){const t=n.Z.options.methods.genActivatorAttributes.call(this);return this.activeTile&&this.activeTile.id?{...t,"aria-activedescendant":this.activeTile.id}:t},genActivatorListeners(){const t=o.Z.options.methods.genActivatorListeners.call(this);return this.disableKeys||(t.keydown=this.onKeyDown),t},genTransition(){const t=this.genContent();return this.transition?this.$createElement("transition",{props:{name:this.transition}},[t]):t},genDirectives(){const t=[{name:"show",value:this.isContentActive}];return!this.openOnHover&&this.closeOnClick&&t.push({name:"click-outside",value:{handler:()=>{this.isActive=!1},closeConditional:this.closeConditional,include:()=>[this.$el,...this.getOpenDependentElements()]}}),t},genContent(){const t={attrs:{...this.getScopeIdAttrs(),role:"role"in this.$attrs?this.$attrs.role:"menu"},staticClass:"v-menu__content",class:{...this.rootThemeClasses,...this.roundedClasses,"v-menu__content--auto":this.auto,"v-menu__content--fixed":this.activatorFixed,menuable__content__active:this.isActive,[this.contentClass.trim()]:!0},style:this.styles,directives:this.genDirectives(),ref:"content",on:{click:t=>{const e=t.target;e.getAttribute("disabled")||this.closeOnContentClick&&(this.isActive=!1)},keydown:this.onKeyDown}};return this.$listeners.scroll&&(t.on=t.on||{},t.on.scroll=this.$listeners.scroll),!this.disabled&&this.openOnHover&&(t.on=t.on||{},t.on.mouseenter=this.mouseEnterHandler),this.openOnHover&&(t.on=t.on||{},t.on.mouseleave=this.mouseLeaveHandler),this.$createElement("div",t,this.getContentSlot())},getTiles(){this.$refs.content&&(this.tiles=Array.from(this.$refs.content.querySelectorAll(".v-list-item, .v-divider, .v-subheader")))},mouseEnterHandler(){this.runDelay("open",(()=>{this.hasJustFocused||(this.hasJustFocused=!0)}))},mouseLeaveHandler(t){this.runDelay("close",(()=>{var e;(null===(e=this.$refs.content)||void 0===e?void 0:e.contains(t.relatedTarget))||requestAnimationFrame((()=>{this.isActive=!1,this.callDeactivate()}))}))},nextTile(){const t=this.tiles[this.listIndex+1];if(!t){if(!this.tiles.length)return;return this.listIndex=-1,void this.nextTile()}this.listIndex++,-1===t.tabIndex&&this.nextTile()},prevTile(){const t=this.tiles[this.listIndex-1];if(!t){if(!this.tiles.length)return;return this.listIndex=this.tiles.length,void this.prevTile()}this.listIndex--,-1===t.tabIndex&&this.prevTile()},lastTile(){const t=this.tiles[this.tiles.length-1];t&&(this.listIndex=this.tiles.length-1,-1===t.tabIndex&&this.prevTile())},firstTile(){const t=this.tiles[0];t&&(this.listIndex=0,-1===t.tabIndex&&this.nextTile())},onKeyDown(t){if(t.keyCode===p.keyCodes.esc){setTimeout((()=>{this.isActive=!1}));const t=this.getActivator();this.$nextTick((()=>t&&t.focus()))}else!this.isActive&&[p.keyCodes.up,p.keyCodes.down].includes(t.keyCode)&&(this.isActive=!0);this.$nextTick((()=>this.changeListIndex(t)))},onResize(){this.isActive&&(this.$refs.content.offsetWidth,this.updateDimensions(),clearTimeout(this.resizeTimeout),this.resizeTimeout=window.setTimeout(this.updateDimensions,100))}},render(t){const e={staticClass:"v-menu",class:{"v-menu--attached":""===this.attach||!0===this.attach||"attach"===this.attach},directives:[{arg:"500",name:"resize",value:this.onResize}]};return t("div",e,[!this.activator&&this.genActivator(),this.showLazyContent((()=>[this.$createElement(s.Z,{props:{root:!0,light:this.light,dark:this.dark}},[this.genTransition()])]))])}})}}]);
"use strict";(self["webpackChunkfhemapp"]=self["webpackChunkfhemapp"]||[]).push([[869],{9968:function(){},2371:function(t,e,s){s(9968);var i=s(5648),n=s(7342),a=s(6505),r=s(3325);e["Z"]=(0,r.Z)(n.Z,a.Z,i.Z).extend({name:"v-card",props:{flat:Boolean,hover:Boolean,img:String,link:Boolean,loaderHeight:{type:[Number,String],default:4},raised:Boolean},computed:{classes(){return{"v-card":!0,...a.Z.options.computed.classes.call(this),"v-card--flat":this.flat,"v-card--hover":this.hover,"v-card--link":this.isClickable,"v-card--loading":this.loading,"v-card--disabled":this.disabled,"v-card--raised":this.raised,...i.Z.options.computed.classes.call(this)}},styles(){const t={...i.Z.options.computed.styles.call(this)};return this.img&&(t.background=`url("${this.img}") center center / cover no-repeat`),t}},methods:{genProgress(){const t=n.Z.options.methods.genProgress.call(this);return t?this.$createElement("div",{staticClass:"v-card__progress",key:"progress"},[t]):null}},render(t){const{tag:e,data:s}=this.generateRouteLink();return s.style=this.styles,this.isClickable&&(s.attrs=s.attrs||{},s.attrs.tabindex=0),t(e,this.setBackgroundColor(this.color,s),[this.genProgress(),this.$slots.default])}})},7118:function(t,e,s){s.d(e,{h7:function(){return a},Qq:function(){return r},ZB:function(){return l},EB:function(){return o}});var i=s(2371),n=s(4589);const a=(0,n.Ji)("v-card__actions"),r=(0,n.Ji)("v-card__subtitle"),l=(0,n.Ji)("v-card__text"),o=(0,n.Ji)("v-card__title");i.Z},1152:function(t,e,s){s.d(e,{Z:function(){return x}});var i=s(3242),n=s(5795),a=s(4561),r=s(5907),l=s(5936),o=s(423),h=s(3712),c=s(2936),d=s(8085),u=s(5600),v=s(549),m=s(3325),f=s(1824),p=s(4589),g=s(1439);const b=(0,m.Z)(r.Z,a.Z,l.Z,o.Z,h.Z,c.Z,d.Z);var x=b.extend({name:"v-menu",directives:{ClickOutside:u.Z,Resize:v.Z},provide(){return{isInMenu:!0,theme:this.theme}},props:{auto:Boolean,closeOnClick:{type:Boolean,default:!0},closeOnContentClick:{type:Boolean,default:!0},disabled:Boolean,disableKeys:Boolean,maxHeight:{type:[Number,String],default:"auto"},offsetX:Boolean,offsetY:Boolean,openOnHover:Boolean,origin:{type:String,default:"top left"},transition:{type:[Boolean,String],default:"v-menu-transition"}},data(){return{calculatedTopAuto:0,defaultOffset:8,hasJustFocused:!1,listIndex:-1,resizeTimeout:0,selectedIndex:null,tiles:[]}},computed:{activeTile(){return this.tiles[this.listIndex]},calculatedLeft(){const t=Math.max(this.dimensions.content.width,parseFloat(this.calculatedMinWidth));return this.auto?(0,p.kb)(this.calcXOverflow(this.calcLeftAuto(),t))||"0":this.calcLeft(t)||"0"},calculatedMaxHeight(){const t=this.auto?"200px":(0,p.kb)(this.maxHeight);return t||"0"},calculatedMaxWidth(){return(0,p.kb)(this.maxWidth)||"0"},calculatedMinWidth(){if(this.minWidth)return(0,p.kb)(this.minWidth)||"0";const t=Math.min(this.dimensions.activator.width+Number(this.nudgeWidth)+(this.auto?16:0),Math.max(this.pageWidth-24,0)),e=isNaN(parseInt(this.calculatedMaxWidth))?t:parseInt(this.calculatedMaxWidth);return(0,p.kb)(Math.min(e,t))||"0"},calculatedTop(){const t=this.auto?(0,p.kb)(this.calcYOverflow(this.calculatedTopAuto)):this.calcTop();return t||"0"},hasClickableTiles(){return Boolean(this.tiles.find((t=>t.tabIndex>-1)))},styles(){return{maxHeight:this.calculatedMaxHeight,minWidth:this.calculatedMinWidth,maxWidth:this.calculatedMaxWidth,top:this.calculatedTop,left:this.calculatedLeft,transformOrigin:this.origin,zIndex:this.zIndex||this.activeZIndex}}},watch:{isActive(t){t||(this.listIndex=-1)},isContentActive(t){this.hasJustFocused=t},listIndex(t,e){if(t in this.tiles){const e=this.tiles[t];e.classList.add("v-list-item--highlighted");const s=this.$refs.content.scrollTop,i=this.$refs.content.clientHeight;s>e.offsetTop-8?(0,g.Z)(e.offsetTop-e.clientHeight,{appOffset:!1,duration:300,container:this.$refs.content}):s+i<e.offsetTop+e.clientHeight+8&&(0,g.Z)(e.offsetTop-i+2*e.clientHeight,{appOffset:!1,duration:300,container:this.$refs.content})}e in this.tiles&&this.tiles[e].classList.remove("v-list-item--highlighted")}},created(){this.$attrs.hasOwnProperty("full-width")&&(0,f.Jk)("full-width",this)},mounted(){this.isActive&&this.callActivate()},methods:{activate(){this.updateDimensions(),requestAnimationFrame((()=>{this.startTransition().then((()=>{this.$refs.content&&(this.calculatedTopAuto=this.calcTopAuto(),this.auto&&(this.$refs.content.scrollTop=this.calcScrollPosition()))}))}))},calcScrollPosition(){const t=this.$refs.content,e=t.querySelector(".v-list-item--active"),s=t.scrollHeight-t.offsetHeight;return e?Math.min(s,Math.max(0,e.offsetTop-t.offsetHeight/2+e.offsetHeight/2)):t.scrollTop},calcLeftAuto(){return parseInt(this.dimensions.activator.left-2*this.defaultOffset)},calcTopAuto(){const t=this.$refs.content,e=t.querySelector(".v-list-item--active");if(e||(this.selectedIndex=null),this.offsetY||!e)return this.computedTop;this.selectedIndex=Array.from(this.tiles).indexOf(e);const s=e.offsetTop-this.calcScrollPosition(),i=t.querySelector(".v-list-item").offsetTop;return this.computedTop-s-i-1},changeListIndex(t){if(this.getTiles(),this.isActive&&this.hasClickableTiles)if(t.keyCode!==p.Do.tab){if(t.keyCode===p.Do.down)this.nextTile();else if(t.keyCode===p.Do.up)this.prevTile();else if(t.keyCode===p.Do.end)this.lastTile();else if(t.keyCode===p.Do.home)this.firstTile();else{if(t.keyCode!==p.Do.enter||-1===this.listIndex)return;this.tiles[this.listIndex].click()}t.preventDefault()}else this.isActive=!1},closeConditional(t){const e=t.target;return this.isActive&&!this._isDestroyed&&this.closeOnClick&&!this.$refs.content.contains(e)},genActivatorAttributes(){const t=n.Z.options.methods.genActivatorAttributes.call(this);return this.activeTile&&this.activeTile.id?{...t,"aria-activedescendant":this.activeTile.id}:t},genActivatorListeners(){const t=l.Z.options.methods.genActivatorListeners.call(this);return this.disableKeys||(t.keydown=this.onKeyDown),t},genTransition(){const t=this.genContent();return this.transition?this.$createElement("transition",{props:{name:this.transition}},[t]):t},genDirectives(){const t=[{name:"show",value:this.isContentActive}];return!this.openOnHover&&this.closeOnClick&&t.push({name:"click-outside",value:{handler:()=>{this.isActive=!1},closeConditional:this.closeConditional,include:()=>[this.$el,...this.getOpenDependentElements()]}}),t},genContent(){const t={attrs:{...this.getScopeIdAttrs(),role:"role"in this.$attrs?this.$attrs.role:"menu"},staticClass:"v-menu__content",class:{...this.rootThemeClasses,...this.roundedClasses,"v-menu__content--auto":this.auto,"v-menu__content--fixed":this.activatorFixed,menuable__content__active:this.isActive,[this.contentClass.trim()]:!0},style:this.styles,directives:this.genDirectives(),ref:"content",on:{click:t=>{const e=t.target;e.getAttribute("disabled")||this.closeOnContentClick&&(this.isActive=!1)},keydown:this.onKeyDown}};return this.$listeners.scroll&&(t.on=t.on||{},t.on.scroll=this.$listeners.scroll),!this.disabled&&this.openOnHover&&(t.on=t.on||{},t.on.mouseenter=this.mouseEnterHandler),this.openOnHover&&(t.on=t.on||{},t.on.mouseleave=this.mouseLeaveHandler),this.$createElement("div",t,this.getContentSlot())},getTiles(){this.$refs.content&&(this.tiles=Array.from(this.$refs.content.querySelectorAll(".v-list-item, .v-divider, .v-subheader")))},mouseEnterHandler(){this.runDelay("open",(()=>{this.hasJustFocused||(this.hasJustFocused=!0)}))},mouseLeaveHandler(t){this.runDelay("close",(()=>{var e;null!=(e=this.$refs.content)&&e.contains(t.relatedTarget)||requestAnimationFrame((()=>{this.isActive=!1,this.callDeactivate()}))}))},nextTile(){const t=this.tiles[this.listIndex+1];if(!t){if(!this.tiles.length)return;return this.listIndex=-1,void this.nextTile()}this.listIndex++,-1===t.tabIndex&&this.nextTile()},prevTile(){const t=this.tiles[this.listIndex-1];if(!t){if(!this.tiles.length)return;return this.listIndex=this.tiles.length,void this.prevTile()}this.listIndex--,-1===t.tabIndex&&this.prevTile()},lastTile(){const t=this.tiles[this.tiles.length-1];t&&(this.listIndex=this.tiles.length-1,-1===t.tabIndex&&this.prevTile())},firstTile(){const t=this.tiles[0];t&&(this.listIndex=0,-1===t.tabIndex&&this.nextTile())},onKeyDown(t){if(t.keyCode===p.Do.esc){setTimeout((()=>{this.isActive=!1}));const t=this.getActivator();this.$nextTick((()=>t&&t.focus()))}else!this.isActive&&[p.Do.up,p.Do.down].includes(t.keyCode)&&(this.isActive=!0);this.$nextTick((()=>this.changeListIndex(t)))},onResize(){this.isActive&&(this.$refs.content.offsetWidth,this.updateDimensions(),clearTimeout(this.resizeTimeout),this.resizeTimeout=window.setTimeout(this.updateDimensions,100))}},render(t){const e={staticClass:"v-menu",class:{"v-menu--attached":""===this.attach||!0===this.attach||"attach"===this.attach},directives:[{arg:"500",name:"resize",value:this.onResize}]};return t("div",e,[!this.activator&&this.genActivator(),this.showLazyContent((()=>[this.$createElement(i.Z,{props:{root:!0,light:this.light,dark:this.dark}},[this.genTransition()])]))])}})},7003:function(t,e,s){s.d(e,{Z:function(){return u}});var i=s(5827),n=s(8083),a=s(6952),r=s(3536),l=s(1431),o=s(8085),h=s(4589),c=s(3325);const d=(0,c.Z)(a.Z,(0,r.d)(["absolute","fixed","top","bottom"]),l.Z,o.Z);var u=d.extend({name:"v-progress-linear",directives:{intersect:n.Z},props:{active:{type:Boolean,default:!0},backgroundColor:{type:String,default:null},backgroundOpacity:{type:[Number,String],default:null},bufferValue:{type:[Number,String],default:100},color:{type:String,default:"primary"},height:{type:[Number,String],default:4},indeterminate:Boolean,query:Boolean,reverse:Boolean,rounded:Boolean,stream:Boolean,striped:Boolean,value:{type:[Number,String],default:0}},data(){return{internalLazyValue:this.value||0,isVisible:!0}},computed:{__cachedBackground(){return this.$createElement("div",this.setBackgroundColor(this.backgroundColor||this.color,{staticClass:"v-progress-linear__background",style:this.backgroundStyle}))},__cachedBar(){return this.$createElement(this.computedTransition,[this.__cachedBarType])},__cachedBarType(){return this.indeterminate?this.__cachedIndeterminate:this.__cachedDeterminate},__cachedBuffer(){return this.$createElement("div",{staticClass:"v-progress-linear__buffer",style:this.styles})},__cachedDeterminate(){return this.$createElement("div",this.setBackgroundColor(this.color,{staticClass:"v-progress-linear__determinate",style:{width:(0,h.kb)(this.normalizedValue,"%")}}))},__cachedIndeterminate(){return this.$createElement("div",{staticClass:"v-progress-linear__indeterminate",class:{"v-progress-linear__indeterminate--active":this.active}},[this.genProgressBar("long"),this.genProgressBar("short")])},__cachedStream(){return this.stream?this.$createElement("div",this.setTextColor(this.color,{staticClass:"v-progress-linear__stream",style:{width:(0,h.kb)(100-this.normalizedBuffer,"%")}})):null},backgroundStyle(){const t=null==this.backgroundOpacity?this.backgroundColor?1:.3:parseFloat(this.backgroundOpacity);return{opacity:t,[this.isReversed?"right":"left"]:(0,h.kb)(this.normalizedValue,"%"),width:(0,h.kb)(Math.max(0,this.normalizedBuffer-this.normalizedValue),"%")}},classes(){return{"v-progress-linear--absolute":this.absolute,"v-progress-linear--fixed":this.fixed,"v-progress-linear--query":this.query,"v-progress-linear--reactive":this.reactive,"v-progress-linear--reverse":this.isReversed,"v-progress-linear--rounded":this.rounded,"v-progress-linear--striped":this.striped,"v-progress-linear--visible":this.isVisible,...this.themeClasses}},computedTransition(){return this.indeterminate?i.Z5:i.Qn},isReversed(){return this.$vuetify.rtl!==this.reverse},normalizedBuffer(){return this.normalize(this.bufferValue)},normalizedValue(){return this.normalize(this.internalLazyValue)},reactive(){return Boolean(this.$listeners.change)},styles(){const t={};return this.active||(t.height=0),this.indeterminate||100===parseFloat(this.normalizedBuffer)||(t.width=(0,h.kb)(this.normalizedBuffer,"%")),t}},methods:{genContent(){const t=(0,h.z9)(this,"default",{value:this.internalLazyValue});return t?this.$createElement("div",{staticClass:"v-progress-linear__content"},t):null},genListeners(){const t=this.$listeners;return this.reactive&&(t.click=this.onClick),t},genProgressBar(t){return this.$createElement("div",this.setBackgroundColor(this.color,{staticClass:"v-progress-linear__indeterminate",class:{[t]:!0}}))},onClick(t){if(!this.reactive)return;const{width:e}=this.$el.getBoundingClientRect();this.internalValue=t.offsetX/e*100},onObserve(t,e,s){this.isVisible=s},normalize(t){return t<0?0:t>100?100:parseFloat(t)}},render(t){const e={staticClass:"v-progress-linear",attrs:{role:"progressbar","aria-valuemin":0,"aria-valuemax":this.normalizedBuffer,"aria-valuenow":this.indeterminate?void 0:this.normalizedValue},class:this.classes,directives:[{name:"intersect",value:this.onObserve}],style:{bottom:this.bottom?0:void 0,height:this.active?(0,h.kb)(this.height):0,top:this.top?0:void 0},on:this.genListeners()};return t("div",e,[this.__cachedStream,this.__cachedBackground,this.__cachedBuffer,this.__cachedBar,this.genContent()])}})},2691:function(t,e,s){s.d(e,{Z:function(){return o}});var i=s(3358),n=s(6952),a=s(8085),r=s(3325),l=s(4589),o=(0,r.Z)((0,i.Z)("bar",["height","window"]),n.Z,a.Z).extend({name:"v-system-bar",props:{height:[Number,String],lightsOut:Boolean,window:Boolean},computed:{classes(){return{"v-system-bar--lights-out":this.lightsOut,"v-system-bar--absolute":this.absolute,"v-system-bar--fixed":!this.absolute&&(this.app||this.fixed),"v-system-bar--window":this.window,...this.themeClasses}},computedHeight(){return this.height?isNaN(parseInt(this.height))?this.height:parseInt(this.height):this.window?32:24},styles(){return{height:(0,l.kb)(this.computedHeight)}}},methods:{updateApplication(){return this.$el?this.$el.clientHeight:this.computedHeight}},render(t){const e={staticClass:"v-system-bar",class:this.classes,style:this.styles,on:this.$listeners};return t("div",this.setBackgroundColor(this.color,e),(0,l.z9)(this))}})},3242:function(t,e,s){var i=s(8085);e["Z"]=i.Z.extend({name:"v-theme-provider",props:{root:Boolean},computed:{isDark(){return this.root?this.rootIsDark:i.Z.options.computed.isDark.call(this)}},render(){return this.$slots.default&&this.$slots.default.find((t=>!t.isComment&&" "!==t.text))}})},7342:function(t,e,s){s.d(e,{Z:function(){return r}});var i=s(144),n=s(7003),a=n.Z,r=i.Z.extend().extend({name:"loadable",props:{loading:{type:[Boolean,String],default:!1},loaderHeight:{type:[Number,String],default:2}},methods:{genProgress(){return!1===this.loading?null:this.$slots.progress||this.$createElement(a,{props:{absolute:!0,color:!0===this.loading||""===this.loading?this.color||"primary":this.loading,height:this.loaderHeight,indeterminate:!0}})}}})},423:function(t,e,s){var i=s(144);e["Z"]=i.Z.extend({name:"returnable",props:{returnValue:null},data:()=>({isActive:!1,originalValue:null}),watch:{isActive(t){t?this.originalValue=this.returnValue:this.$emit("update:return-value",this.originalValue)}},methods:{save(t){this.originalValue=t,setTimeout((()=>{this.isActive=!1}))}}})},1869:function(t,e,s){s.r(e),s.d(e,{default:function(){return $}});var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return t.item.Options.show?s("v-col",{class:t.setup.size},[s("v-card",{attrs:{dark:this.$vuetify.theme.dark,color:"secondary"}},[s("v-progress-linear",{attrs:{height:"7",value:t.vals.status.level,color:t.vals.status.color,"background-color":"secondary darken-1"}}),s("v-card-title",{staticClass:"text-truncate"},[t._v(" "+t._s(t.vals.title)+" ")]),s("v-divider"),s("v-card-text",[s("v-row",{attrs:{align:"center"}},[s("v-col",{attrs:{align:"center"}},[s("div",{staticClass:"headline font-weight-bold text-truncate"},[t._v(" "+t._s(t._f("scene_text")(t.vals.main.text))+" ")])]),s("v-divider",{attrs:{vertical:""}}),s("v-col",{staticClass:"col-3",attrs:{align:"center"}},[s("v-menu",{attrs:{bottom:"",left:"",transition:"slide-y-transition"},scopedSlots:t._u([{key:"activator",fn:function(e){var i=e.on,n=e.attrs;return[s("v-btn",t._g(t._b({attrs:{small:"",icon:""}},"v-btn",n,!1),i),[s("v-icon",{attrs:{large:""}},[t._v(" "+t._s(t.vals.main.rightIcon)+" ")])],1)]}}],null,!1,4018787445)},[s("v-list",{attrs:{dense:"",color:"secondary lighten-2"}},[s("v-list-item-group",{attrs:{"active-class":"success--text"},model:{value:t.vals.sceneSelected,callback:function(e){t.$set(t.vals,"sceneSelected",e)},expression:"vals.sceneSelected"}},t._l(t.vals.scenes,(function(e,i){return s("v-list-item",{key:i,on:{click:function(s){return t.setScene(e)}}},[s("v-list-item-content",[s("v-list-item-title",{staticClass:"text-subtitle-1"},[t._v(" "+t._s(t._f("scene_text")(e))+" ")])],1),e===t.vals.main.text?s("v-list-item-icon",[s("v-icon",[t._v("mdi-check")])],1):t._e()],1)})),1)],1)],1)],1)],1)],1),s("v-divider"),s("v-system-bar",{attrs:{color:"secondary darken-1"}},[s("v-icon",[t._v(t._s(t.vals.info.left1Icon))]),t._v(t._s(t.vals.info.left1Text)+" ")],1)],1)],1):t._e()},n=[],a={filters:{scene_text(t){return t.replace(/_/g," ")}},props:{item:{type:Object,default:()=>({name:"scene"})}},data:()=>({name:"scene",setup:{size:"col-12 col-sm-6 col-md-4 col-lg-4",status:{bar:["state:unknown:0:success","state::100:success"]},main:[{text:["state:unknown:...","state::%s"]}],info:{left1:["state:unknown::mdi-movie-open","state:::mdi-movie-open-check"]}},vals:{title:"",status:{level:0,color:""},main:{text:"",rightIcon:"mdi-dots-vertical"},info:{left1Icon:"",left1Text:""},scenes:[],sceneSelected:-1}}),watch:{item:{immediate:!0,deep:!0,handler(t){let e=this.$fhem.getEl(t,"Attributes","alias")||t.Name;this.vals.title=this.$fhem.getEl(t,"Options","name")||e,this.setValues(),this.vals.sceneSelected=this.vals.scenes.indexOf(this.vals.main.text)}}},created(){let t=this.$fhem.getEl(this.item,"Options","setup","size"),e=this.$fhem.getEl(this.item,"Options","setup","status"),s=this.$fhem.getEl(this.item,"Options","setup","main"),i=this.$fhem.getEl(this.item,"Options","setup","info");t&&(this.setup.size=t),e&&Object.assign(this.setup.status,e),s&&Object.assign(this.setup.main,s),i&&Object.assign(this.setup.info,i),this.setValues(),this.loadScenes()},methods:{setValues(){let t=this.$fhem.handleVals(this.item,this.setup.status.bar),e=this.$fhem.handleVals(this.item,this.setup.main[0].text),s=this.$fhem.handleVals(this.item,this.setup.info.left1);this.vals.status.level=t[0]||"100",this.vals.status.color=t[1]||"success",this.vals.main.text=e[0]||"",this.vals.info.left1Icon=s[1]||"",this.vals.info.left1Text=s[0]||""},loadScenes(){let t=[{param:"cmd",value:"get "+this.item.Name+" scenes"},{param:"XHR",value:"1"}];this.vals.scenes.splice(0),this.$fhem.request(t).then((t=>{if(t){let e=t.replace("\n\n","").split("\n");this.vals.scenes.push(...e)}this.vals.sceneSelected=this.vals.scenes.indexOf(this.vals.main.text)}))},setScene(t){if(this.vals.mainState=t,this.vals.mainState!=this.item.Readings.state.Value){let t="set "+this.item.Name+" scene "+this.vals.mainState;this.$fhem.request(t)}}}},r=a,l=s(1001),o=s(3453),h=s.n(o),c=s(3150),d=s(2371),u=s(7118),v=s(2102),m=s(1418),f=s(6428),p=s(6816),g=s(7620),b=s(1960),x=s(3249),y=s(459),_=s(1152),k=s(7003),C=s(2877),T=s(2691),Z=(0,l.Z)(r,i,n,!1,null,null,null),$=Z.exports;h()(Z,{VBtn:c.Z,VCard:d.Z,VCardText:u.ZB,VCardTitle:u.EB,VCol:v.Z,VDivider:m.Z,VIcon:f.Z,VList:p.Z,VListItem:g.Z,VListItemContent:b.km,VListItemGroup:x.Z,VListItemIcon:y.Z,VListItemTitle:b.V9,VMenu:_.Z,VProgressLinear:k.Z,VRow:C.Z,VSystemBar:T.Z})}}]);
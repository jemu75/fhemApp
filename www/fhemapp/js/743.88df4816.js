"use strict";(self["webpackChunkfhemapp"]=self["webpackChunkfhemapp"]||[]).push([[743],{8743:function(e,t,s){s.r(t),s.d(t,{default:function(){return d}});var i=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("v-row",e._l(e.app.data.deviceList,(function(e){return s(e.Options.component,{key:e.Internals.FUUID,tag:"component",attrs:{item:e}})})),1)],1)},a=[],n={name:"DevicesView",components:{templ_default:()=>Promise.all([s.e(121),s.e(288),s.e(322),s.e(622)]).then(s.bind(s,7144)),templ_panel:()=>Promise.all([s.e(121),s.e(337)]).then(s.bind(s,2965)),templ_chart:()=>Promise.all([s.e(121),s.e(288),s.e(285),s.e(387)]).then(s.bind(s,387)),templ_weather:()=>s.e(947).then(s.bind(s,9285)),templ_list:()=>Promise.all([s.e(121),s.e(840)]).then(s.bind(s,6640)),templ_scenes:()=>s.e(869).then(s.bind(s,1869)),templ_sonos:()=>Promise.all([s.e(121),s.e(288),s.e(322),s.e(475)]).then(s.bind(s,400)),templ_sysmon:()=>Promise.all([s.e(121),s.e(289)]).then(s.bind(s,5193)),templ_hmlan:()=>s.e(438).then(s.bind(s,7438)),templ_cam:()=>Promise.all([s.e(121),s.e(396)]).then(s.bind(s,8519)),templ_iframe:()=>Promise.all([s.e(121),s.e(154)]).then(s.bind(s,2756))},data:()=>({app:{session:{connect:!1},options:{mobileHeader:!1},data:{deviceList:[],header:""}}}),watch:{$route(){this.subscribe()},"app.session.ready"(e){e&&this.subscribe()}},mounted(){this.app.session=this.$fhem.app.session,this.app.options=this.$fhem.app.options,this.app.data=this.$fhem.app.data},methods:{setHeader(){(this.app.options.mobileHeader||"page"===this.app.options.mobileHeaderContent)&&("Devices"===this.$route.name?this.$route.params.filter.match("device=")?this.$fhem.app.appBar.mobileHeader="":this.$fhem.app.appBar.mobileHeader=this.$route.params.filter.split("=")[1]:this.$fhem.app.appBar.mobileHeader=this.$route.name)},subscribe(){let e=this.$route.params.filter||this.$route.path;this.setHeader(),this.$fhem.getDevices(e)}}},p=n,o=s(1001),l=s(3453),r=s.n(l),h=s(2877),m=(0,o.Z)(p,i,a,!1,null,null,null),d=m.exports;r()(m,{VRow:h.Z})}}]);
"use strict";(self["webpackChunkfhemapp"]=self["webpackChunkfhemapp"]||[]).push([[775],{3775:function(e,t,n){n.r(t),n.d(t,{default:function(){return m}});var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("v-row",e._l(e.app.data.deviceList,(function(e){return n(e.Options.component,{key:e.Internals.FUUID,tag:"component",attrs:{item:e}})})),1)],1)},s=[],a=(n(1539),n(8783),n(3948),n(8309),n(4916),n(4723),n(7327),n(3123),{name:"DevicesView",components:{templ_default:function(){return Promise.all([n.e(121),n.e(288),n.e(322),n.e(897)]).then(n.bind(n,9216))},templ_panel:function(){return Promise.all([n.e(121),n.e(337)]).then(n.bind(n,2965))},templ_chart:function(){return Promise.all([n.e(121),n.e(288),n.e(285),n.e(387)]).then(n.bind(n,387))},templ_weather:function(){return n.e(947).then(n.bind(n,9285))},templ_scenes:function(){return n.e(869).then(n.bind(n,1869))},templ_sonos:function(){return Promise.all([n.e(121),n.e(288),n.e(322),n.e(475)]).then(n.bind(n,400))},templ_sysmon:function(){return Promise.all([n.e(121),n.e(289)]).then(n.bind(n,5193))},templ_hmlan:function(){return n.e(438).then(n.bind(n,7438))},templ_cam:function(){return Promise.all([n.e(121),n.e(396)]).then(n.bind(n,8519))},templ_iframe:function(){return Promise.all([n.e(121),n.e(154)]).then(n.bind(n,2756))}},data:function(){return{app:{session:{connect:!1},options:{mobileHeader:!1},data:{deviceList:[],header:""}}}},watch:{$route:function(){this.subscribe()},"app.session.ready":function(e){e&&this.subscribe()}},mounted:function(){this.app.session=this.$fhem.app.session,this.app.options=this.$fhem.app.options,this.app.data=this.$fhem.app.data},methods:{setHeader:function(){(this.app.options.mobileHeader||"page"===this.app.options.mobileHeaderContent)&&("Devices"===this.$route.name?this.$route.params.filter.match("device=")?this.$fhem.app.appBar.mobileHeader="":this.$fhem.app.appBar.mobileHeader=this.$route.params.filter.split("=")[1]:this.$fhem.app.appBar.mobileHeader=this.$route.name)},subscribe:function(){var e=this.$route.params.filter||this.$route.path;this.setHeader(),this.$fhem.getDevices(e)}}}),r=a,o=n(1001),p=n(3453),u=n.n(p),h=n(2877),l=(0,o.Z)(r,i,s,!1,null,null,null),m=l.exports;u()(l,{VRow:h.Z})}}]);
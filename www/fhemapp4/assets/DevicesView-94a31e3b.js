import{u as m,c as i,r as c,o as n,a as l,w as p,b as f,d,F as h,e as w}from"./index-2cab99a9.js";import{_ as v}from"./PanelCard-8361bb87.js";const b={__name:"DevicesView",setup(k){const t=m(),u=i(()=>{let e=[];for(const s of t.app.panelView)t.handleDefs(t.app.panelList[s].panel.show,["show"],[!0]).show&&e.push(t.app.panelList[s]);return e.sort((s,a)=>o(s)>o(a)?1:o(a)>o(s)?-1:0),e});function o(e){return t.handleDefs(e.panel.sortby,["sortby"],["999"]).sortby}return(e,s)=>{const a=c("v-col"),_=c("v-row");return n(),l(_,{"no-gutters":""},{default:p(()=>[(n(!0),f(h,null,d(u.value,r=>(n(),l(a,{cols:"12",sm:"6",lg:"4",key:r.name,class:"pa-1"},{default:p(()=>[w(v,{panel:r},null,8,["panel"])]),_:2},1024))),128))]),_:1})}}};export{b as default};

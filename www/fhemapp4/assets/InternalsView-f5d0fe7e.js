import{V as w}from"./styles-10252b9a.js";import{f as g,u as V,c as x,r as e,o as y,a as C,w as o,e as t,j as k,t as B,h as N}from"./index-cf353a75.js";const I={__name:"InternalsView",setup(S){const n=g(!1),l=V(),a=x(()=>n.value?l.app.config:l.app);function _(){navigator.clipboard.writeText(JSON.stringify(a.value,null,"  "))}return(s,c)=>{const u=e("v-toolbar-title"),i=e("v-toolbar"),p=e("v-switch"),r=e("v-col"),d=e("v-btn"),v=e("v-row"),m=e("v-divider"),f=e("v-card-text"),b=e("v-card");return y(),C(b,null,{default:o(()=>[t(i,null,{default:o(()=>[t(u,null,{default:o(()=>[k(B(s.$t("_app.internals.title")),1)]),_:1})]),_:1}),t(f,null,{default:o(()=>[t(v,{"no-gutters":"",class:"align-center pb-2"},{default:o(()=>[t(r,null,{default:o(()=>[t(p,{label:s.$t("_app.internals.onlyConfig"),modelValue:n.value,"onUpdate:modelValue":c[0]||(c[0]=h=>n.value=h),color:"blue",density:"comfortable","hide-details":""},null,8,["label","modelValue"])]),_:1}),t(r,{cols:"1",class:"text-right"},{default:o(()=>[t(d,{variant:"text",icon:"mdi-clipboard-multiple-outline",size:"small",onClick:_})]),_:1})]),_:1}),t(m,{class:"pb-3"}),t(N(w),{data:a.value,deep:n.value?2:1,showLine:!1,showIcon:!0,showLength:!0},null,8,["data","deep"])]),_:1})]),_:1})}}};export{I as default};

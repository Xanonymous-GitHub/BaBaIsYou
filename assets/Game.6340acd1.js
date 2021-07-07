import{u as a,_ as e}from"./index.804d3193.js";import{f as s,g as t,A as l,B as n,o as u,c as r,u as o,C as c,a as i,F as v,l as m,m as p,G as d,D as E,E as _}from"./core.6e7909b5.js";import{u as R}from"./index.aad48cce.js";var y,g;(g=y||(y={})).GENERAL="GENERAL",g.RESTART="RESTART",g.WIN="WIN",g.YOU_GONE="YOU_GONE";m("data-v-5237a132");const f={id:"game-layer","class":"\n       transform-gpu\n        flex\n        h-screen\n        justify-center\n        relative\n        bg-gray-900"};p();const T=s({setup(s){const m=R(),p=a(),g=t({}),T=t(!1),A=t(!1),N=t(0),b=t(0),w=t(y.GENERAL),G=l((()=>e((()=>__import__("./Menu.83ce0a9b.js")),["/assets/Menu.83ce0a9b.js","/assets/index.804d3193.js","/assets/index.b78fd0be.css","/assets/core.6e7909b5.js","/assets/index.aad48cce.js"]))),L=l((()=>e((()=>__import__("./NoYouAlertBar.9845c4b8.js")),["/assets/NoYouAlertBar.9845c4b8.js","/assets/NoYouAlertBar.6e93a7e4.css","/assets/core.6e7909b5.js","/assets/index.804d3193.js","/assets/index.b78fd0be.css","/assets/index.aad48cce.js"])));let O;const I=document.createElement("audio"),j=()=>{O.pause()},P=a=>{null==a||a.preventDefault(),null==a||a.stopImmediatePropagation(),null==a||a.stopPropagation(),N.value++,T.value=!T.value,T.value?j():(O.resume(),w.value=y.GENERAL)},S=a=>{a.preventDefault(),a.stopImmediatePropagation(),a.stopPropagation(),w.value=y.RESTART,N.value++,j(),T.value=!0},D=async()=>{const a=m.value.currentLevel.setupFileName;var e;a&&(await O.startLevel(a.trim()),A.value=!1,E.bind("esc",P),E.bind("r",S),e=m.value.currentLevel.backgroundMusic,I.src="/music/"+e,I.loop=!0,await I.play())},M=async a=>{switch(a){case _.WIN:w.value=y.WIN,N.value++,E.unbind(["esc","r"]),T.value=!0,await I.pause();break;case _.RESTART:await D()}},k=async a=>{I.pause(),a||b.value++,A.value=!a},x=()=>{P(),D()},H=async()=>{I.pause(),await p.replace({name:"Level"})},W=async()=>{I.pause(),await p.replace({name:"Home"})};return n((async()=>{O=await(async()=>await d)(),O.setGameOverOutsideHandler(M),O.setYouGoneOutsideHandler(k),g.value.appendChild(O.gameView),await D()})),(a,e)=>(u(),r(v,null,[T.value?(u(),r(o(G),{key:"menu"+N.value,mode:w.value,onResume:P,onRestart:x,onToMenu:H,onToHome:W},null,8,["mode"])):c("",!0),A.value?(u(),r(o(L),{key:"alertBar"+b.value})):c("",!0),i("div",f,[i("div",{ref:g,"class":"\n         game-layer\n         self-center"},null,512)])],64))}});T.__scopeId="data-v-5237a132";const A=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module","default":T});export{A as G,y as M};

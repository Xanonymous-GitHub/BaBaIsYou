import{u as a,_ as e}from"./index.3ecdaa5b.js";import{f as s,g as t,A as l,B as n,c as u,u as o,C as r,a as c,F as i,G as v,m,q as p,D as d,o as E,E as _}from"./core.5db55a25.js";import{u as R}from"./index.68904440.js";var y,g;(g=y||(y={})).GENERAL="GENERAL",g.RESTART="RESTART",g.WIN="WIN",g.YOU_GONE="YOU_GONE";m("data-v-5237a132");const f={id:"game-layer","class":"\n       transform-gpu\n        flex\n        h-screen\n        justify-center\n        relative\n        bg-gray-900"};p();const T=s({expose:[],setup(s){const m=R(),p=a(),g=t({}),T=t(!1),b=t(!1),A=t(0),N=t(0),w=t(y.GENERAL),G=l((()=>e((()=>__import__("./Menu.d87e4dbd.js")),["/assets/Menu.d87e4dbd.js","/assets/index.3ecdaa5b.js","/assets/index.229a3e5b.css","/assets/core.5db55a25.js","/assets/index.68904440.js"]))),L=l((()=>e((()=>__import__("./NoYouAlertBar.b8e5cc5c.js")),["/assets/NoYouAlertBar.b8e5cc5c.js","/assets/NoYouAlertBar.6e93a7e4.css","/assets/core.5db55a25.js","/assets/index.3ecdaa5b.js","/assets/index.229a3e5b.css","/assets/index.68904440.js"])));let O;const I=document.createElement("audio"),j=()=>{O.pause()},P=a=>{null==a||a.preventDefault(),null==a||a.stopImmediatePropagation(),null==a||a.stopPropagation(),A.value++,T.value=!T.value,T.value?j():(O.resume(),w.value=y.GENERAL)},S=a=>{a.preventDefault(),a.stopImmediatePropagation(),a.stopPropagation(),w.value=y.RESTART,A.value++,j(),T.value=!0},x=async()=>{const a=m.value.currentLevel.setupFileName;var e;a&&(await O.startLevel(a.trim()),b.value=!1,d.bind("esc",P),d.bind("r",S),e=m.value.currentLevel.backgroundMusic,I.src="/music/"+e,I.loop=!0,await I.play())},D=async a=>{switch(a){case _.WIN:w.value=y.WIN,A.value++,d.unbind(["esc","r"]),T.value=!0,await I.pause();break;case _.RESTART:await x()}},M=async a=>{I.pause(),a||N.value++,b.value=!a},k=()=>{P(),x()},H=async()=>{I.pause(),await p.replace({name:"Level"})},W=async()=>{I.pause(),await p.replace({name:"Home"})};return n((async()=>{O=await(async()=>await v)(),O.setGameOverOutsideHandler(D),O.setYouGoneOutsideHandler(M),g.value.appendChild(O.gameView),await x()})),(a,e)=>(E(),u(i,null,[T.value?(E(),u(o(G),{key:"menu"+A.value,mode:w.value,onResume:P,onRestart:k,onToMenu:H,onToHome:W},null,8,["mode"])):r("",!0),b.value?(E(),u(o(L),{key:"alertBar"+N.value})):r("",!0),c("div",f,[c("div",{ref:g,"class":"\n         game-layer\n         self-center"},null,512)])],64))}});T.__scopeId="data-v-5237a132";const b=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module","default":T});export{b as G,y as M};

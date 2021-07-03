import{u as a,_ as e}from"./index.be7f842c.js";import{f as s,g as t,A as l,B as n,c as u,u as r,C as o,a as i,F as c,G as v,m,q as p,D as d,o as E,E as _}from"./core.8e3ab24a.js";import{u as f}from"./index.583b65e0.js";var R,y;(y=R||(R={})).GENERAL="GENERAL",y.RESTART="RESTART",y.WIN="WIN",y.YOU_GONE="YOU_GONE";m("data-v-5237a132");const g={id:"game-layer","class":"\n       transform-gpu\n        flex\n        h-screen\n        justify-center\n        relative\n        bg-gray-900"};p();const T=s({setup(s){const m=f(),p=a(),y=t({}),T=t(!1),A=t(!1),N=t(0),b=t(0),w=t(R.GENERAL),G=l((()=>e((()=>__import__("./Menu.f699415d.js")),["/assets/Menu.f699415d.js","/assets/index.be7f842c.js","/assets/index.229a3e5b.css","/assets/core.8e3ab24a.js","/assets/index.583b65e0.js"]))),L=l((()=>e((()=>__import__("./NoYouAlertBar.37f5c74d.js")),["/assets/NoYouAlertBar.37f5c74d.js","/assets/NoYouAlertBar.6e93a7e4.css","/assets/core.8e3ab24a.js","/assets/index.be7f842c.js","/assets/index.229a3e5b.css","/assets/index.583b65e0.js"])));let O;const I=document.createElement("audio"),j=()=>{O.pause()},P=a=>{null==a||a.preventDefault(),null==a||a.stopImmediatePropagation(),null==a||a.stopPropagation(),N.value++,T.value=!T.value,T.value?j():(O.resume(),w.value=R.GENERAL)},S=a=>{a.preventDefault(),a.stopImmediatePropagation(),a.stopPropagation(),w.value=R.RESTART,N.value++,j(),T.value=!0},D=async()=>{const a=m.value.currentLevel.setupFileName;var e;a&&(await O.startLevel(a.trim()),A.value=!1,d.bind("esc",P),d.bind("r",S),e=m.value.currentLevel.backgroundMusic,I.src="/music/"+e,I.loop=!0,await I.play())},M=async a=>{switch(a){case _.WIN:w.value=R.WIN,N.value++,d.unbind(["esc","r"]),T.value=!0,await I.pause();break;case _.RESTART:await D()}},k=async a=>{I.pause(),a||b.value++,A.value=!a},x=()=>{P(),D()},H=async()=>{I.pause(),await p.replace({name:"Level"})},W=async()=>{I.pause(),await p.replace({name:"Home"})};return n((async()=>{O=await(async()=>await v)(),O.setGameOverOutsideHandler(M),O.setYouGoneOutsideHandler(k),y.value.appendChild(O.gameView),await D()})),(a,e)=>(E(),u(c,null,[T.value?(E(),u(r(G),{key:"menu"+N.value,mode:w.value,onResume:P,onRestart:x,onToMenu:H,onToHome:W},null,8,["mode"])):o("",!0),A.value?(E(),u(r(L),{key:"alertBar"+b.value})):o("",!0),i("div",g,[i("div",{ref:y,"class":"\n         game-layer\n         self-center"},null,512)])],64))}});T.__scopeId="data-v-5237a132";const A=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module","default":T});export{A as G,R as M};

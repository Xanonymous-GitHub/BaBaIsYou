!function(){function e(e,n,r){return n in e?Object.defineProperty(e,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[n]=r,e}function n(e,n,r,t,a,u,o){try{var c=e[u](o),i=c.value}catch(s){return void r(s)}c.done?n(i):Promise.resolve(i).then(t,a)}function r(e){return function(){var r=this,t=arguments;return new Promise((function(a,u){var o=e.apply(r,t);function c(e){n(o,a,u,c,i,"next",e)}function i(e){n(o,a,u,c,i,"throw",e)}c(undefined)}))}}var t=document.createElement("style");t.innerHTML=".abs-center{top:50%;left:50%;transform:translate(-50%,-50%)}.game-layer[data-v-5237a132]{max-height:min-content;min-height:max-content;height:min-content}",document.head.appendChild(t),System.register(["./index-legacy.99e05dc3.js","./core-legacy.8c26a0a9.js","./index-legacy.10f85740.js"],(function(n,t){"use strict";var a,u,o,c,i,s,l,f,p,v,m,d,g,R,h,x,y,b,w;return{setters:[function(e){a=e.u,u=e._},function(e){o=e.f,c=e.g,i=e.C,s=e.D,l=e.o,f=e.q,p=e.c,v=e.u,m=e.E,d=e.a,g=e.F,R=e.l,h=e.m,x=e.G,y=e.H,b=e.I},function(e){w=e.u}],execute:function(){var E,k,N;n("M",k),(N=k||n("M",k={})).GENERAL="GENERAL",N.RESTART="RESTART",N.WIN="WIN",N.YOU_GONE="YOU_GONE";R("data-v-5237a132");var T={id:"game-layer","class":"\n       transform-gpu\n        flex\n        h-screen\n        justify-center\n        relative\n        bg-gray-900"};h();var G=o({setup:function(e){var n,o=w(),R=a(),h=c({}),E=c(!1),N=c(!1),G=c(0),A=c(0),L=c(k.GENERAL),O=i((function(){return u((function(){return t["import"]("./Menu-legacy.6a017344.js")}),void 0)})),_=i((function(){return u((function(){return t["import"]("./NoYouAlertBar-legacy.19ec983c.js")}),void 0)})),j=document.createElement("audio"),I=function(){n.pause()},M=function(e){null==e||e.preventDefault(),null==e||e.stopImmediatePropagation(),null==e||e.stopPropagation(),G.value++,E.value=!E.value,E.value?I():(n.resume(),L.value=k.GENERAL)},P=function(e){e.preventDefault(),e.stopImmediatePropagation(),e.stopPropagation(),L.value=k.RESTART,G.value++,I(),E.value=!0},S=function(){var e=r(regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(e=o.value.currentLevel.setupFileName){r.next=3;break}return r.abrupt("return");case 3:return r.next=5,n.startLevel(e.trim());case 5:return N.value=!1,y.bind("esc",M),y.bind("r",P),t=o.value.currentLevel.backgroundMusic,j.src="/music/"+t,j.loop=!0,r.next=11,j.play();case 11:case"end":return r.stop()}var t}),t)})));return function(){return e.apply(this,arguments)}}(),H=function(){var e=r(regeneratorRuntime.mark((function n(e){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:n.t0=e,n.next=n.t0===b.WIN?3:n.t0===b.RESTART?10:13;break;case 3:return L.value=k.WIN,G.value++,y.unbind(["esc","r"]),E.value=!0,n.next=9,j.pause();case 9:return n.abrupt("break",13);case 10:return n.next=12,S();case 12:return n.abrupt("break",13);case 13:case"end":return n.stop()}}),n)})));return function(n){return e.apply(this,arguments)}}(),W=function(){var e=r(regeneratorRuntime.mark((function n(e){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:j.pause(),e||A.value++,N.value=!e;case 3:case"end":return n.stop()}}),n)})));return function(n){return e.apply(this,arguments)}}(),Y=function(){M(),S()},C=function(){var e=r(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return j.pause(),e.next=3,R.replace({name:"Level"});case 3:case"end":return e.stop()}}),n)})));return function(){return e.apply(this,arguments)}}(),D=function(){var e=r(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return j.pause(),e.next=3,R.replace({name:"Home"});case 3:case"end":return e.stop()}}),n)})));return function(){return e.apply(this,arguments)}}();return s(r(regeneratorRuntime.mark((function B(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,r(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x;case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),t)})))();case 2:return(n=e.sent).setGameOverOutsideHandler(H),n.setYouGoneOutsideHandler(W),h.value.appendChild(n.gameView),e.next=6,S();case 6:case"end":return e.stop()}}),B)})))),function(e,n){return l(),f(g,null,[E.value?(l(),p(v(O),{key:"menu"+G.value,mode:L.value,onResume:M,onRestart:Y,onToMenu:C,onToHome:D},null,8,["mode"])):m("",!0),N.value?(l(),p(v(_),{key:"alertBar"+A.value})):m("",!0),d("div",T,[d("div",{ref:h,"class":"\n         game-layer\n         self-center"},null,512)])],64)}}});G.__scopeId="data-v-5237a132";var A=Object.freeze((e(E={__proto__:null},Symbol.toStringTag,"Module"),e(E,"default",G),E));n("G",A)}}}))}();
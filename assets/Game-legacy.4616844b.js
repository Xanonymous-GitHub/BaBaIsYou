!function(){function e(e,n,r){return n in e?Object.defineProperty(e,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[n]=r,e}function n(e,n,r,t,a,u,o){try{var c=e[u](o),i=c.value}catch(s){return void r(s)}c.done?n(i):Promise.resolve(i).then(t,a)}function r(e){return function(){var r=this,t=arguments;return new Promise((function(a,u){var o=e.apply(r,t);function c(e){n(o,a,u,c,i,"next",e)}function i(e){n(o,a,u,c,i,"throw",e)}c(undefined)}))}}var t=document.createElement("style");t.innerHTML=".abs-center{top:50%;left:50%;transform:translate(-50%,-50%)}.game-layer[data-v-5237a132]{max-height:min-content;min-height:max-content;height:min-content}",document.head.appendChild(t),System.register(["./index-legacy.b9c54cbb.js","./core-legacy.58c2d3b0.js","./index-legacy.6de700d9.js"],(function(n,t){"use strict";var a,u,o,c,i,s,l,f,p,v,m,d,g,R,b,h,x,y;return{setters:[function(e){a=e.u,u=e._},function(e){o=e.f,c=e.g,i=e.A,s=e.B,l=e.o,f=e.c,p=e.u,v=e.C,m=e.a,d=e.F,g=e.l,R=e.m,b=e.G,h=e.D,x=e.E},function(e){y=e.u}],execute:function(){var w,E,k;n("M",void 0),(k=E||(E=n("M",{}))).GENERAL="GENERAL",k.RESTART="RESTART",k.WIN="WIN",k.YOU_GONE="YOU_GONE";g("data-v-5237a132");var N={id:"game-layer","class":"\n       transform-gpu\n        flex\n        h-screen\n        justify-center\n        relative\n        bg-gray-900"};R();var T=o({setup:function(e){var n,o=y(),g=a(),R=c({}),w=c(!1),k=c(!1),T=c(0),A=c(0),G=c(E.GENERAL),L=i((function(){return u((function(){return t["import"]("./Menu-legacy.b6265b21.js")}),void 0)})),O=i((function(){return u((function(){return t["import"]("./NoYouAlertBar-legacy.14105403.js")}),void 0)})),_=document.createElement("audio"),j=function(){n.pause()},I=function(e){null==e||e.preventDefault(),null==e||e.stopImmediatePropagation(),null==e||e.stopPropagation(),T.value++,w.value=!w.value,w.value?j():(n.resume(),G.value=E.GENERAL)},M=function(e){e.preventDefault(),e.stopImmediatePropagation(),e.stopPropagation(),G.value=E.RESTART,T.value++,j(),w.value=!0},P=function(){var e=r(regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(e=o.value.currentLevel.setupFileName){r.next=3;break}return r.abrupt("return");case 3:return r.next=5,n.startLevel(e.trim());case 5:return k.value=!1,h.bind("esc",I),h.bind("r",M),t=o.value.currentLevel.backgroundMusic,_.src="/music/"+t,_.loop=!0,r.next=11,_.play();case 11:case"end":return r.stop()}var t}),t)})));return function(){return e.apply(this,arguments)}}(),S=function(){var e=r(regeneratorRuntime.mark((function n(e){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:n.t0=e,n.next=n.t0===x.WIN?3:n.t0===x.RESTART?10:13;break;case 3:return G.value=E.WIN,T.value++,h.unbind(["esc","r"]),w.value=!0,n.next=9,_.pause();case 9:return n.abrupt("break",13);case 10:return n.next=12,P();case 12:return n.abrupt("break",13);case 13:case"end":return n.stop()}}),n)})));return function(n){return e.apply(this,arguments)}}(),H=function(){var e=r(regeneratorRuntime.mark((function n(e){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:_.pause(),e||A.value++,k.value=!e;case 3:case"end":return n.stop()}}),n)})));return function(n){return e.apply(this,arguments)}}(),W=function(){I(),P()},Y=function(){var e=r(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return _.pause(),e.next=3,g.replace({name:"Level"});case 3:case"end":return e.stop()}}),n)})));return function(){return e.apply(this,arguments)}}(),B=function(){var e=r(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return _.pause(),e.next=3,g.replace({name:"Home"});case 3:case"end":return e.stop()}}),n)})));return function(){return e.apply(this,arguments)}}();return s(r(regeneratorRuntime.mark((function C(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,r(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,b;case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),t)})))();case 2:return(n=e.sent).setGameOverOutsideHandler(S),n.setYouGoneOutsideHandler(H),R.value.appendChild(n.gameView),e.next=6,P();case 6:case"end":return e.stop()}}),C)})))),function(e,n){return l(),f(d,null,[w.value?(l(),f(p(L),{key:"menu"+T.value,mode:G.value,onResume:I,onRestart:W,onToMenu:Y,onToHome:B},null,8,["mode"])):v("",!0),k.value?(l(),f(p(O),{key:"alertBar"+A.value})):v("",!0),m("div",N,[m("div",{ref:R,"class":"\n         game-layer\n         self-center"},null,512)])],64)}}});T.__scopeId="data-v-5237a132";var A=Object.freeze((e(w={__proto__:null},Symbol.toStringTag,"Module"),e(w,"default",T),w));n("G",A)}}}))}();
!function(){function e(e,n,r){return n in e?Object.defineProperty(e,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[n]=r,e}function n(e,n,r,t,a,u,o){try{var i=e[u](o),c=i.value}catch(s){return void r(s)}i.done?n(c):Promise.resolve(c).then(t,a)}function r(e){return function(){var r=this,t=arguments;return new Promise((function(a,u){var o=e.apply(r,t);function i(e){n(o,a,u,i,c,"next",e)}function c(e){n(o,a,u,i,c,"throw",e)}i(undefined)}))}}var t=document.createElement("style");t.innerHTML=".abs-center{top:50%;left:50%;transform:translate(-50%,-50%)}.game-layer[data-v-239973a8]{max-height:min-content;min-height:max-content;height:min-content}",document.head.appendChild(t),System.register(["./index-legacy.a673569a.js","./core-legacy.687c22f3.js","./index-legacy.cc0632e6.js"],(function(n,t){"use strict";var a,u,o,i,c,s,l,f,p,v,m,d,g,R,h,x,y,b;return{setters:[function(e){a=e.u,u=e._},function(e){o=e.f,i=e.g,c=e.A,s=e.B,l=e.c,f=e.u,p=e.C,v=e.a,m=e.F,d=e.G,g=e.m,R=e.q,h=e.D,x=e.o,y=e.E},function(e){b=e.u}],execute:function(){var w,E,k;n("M",void 0),(k=E||(E=n("M",{}))).GENERAL="GENERAL",k.RESTART="RESTART",k.WIN="WIN",k.YOU_GONE="YOU_GONE";g("data-v-239973a8");var N={id:"game-layer","class":"\n       transform-gpu\n        flex\n        h-screen\n        justify-center\n        relative\n        bg-gray-900"};R();var T=o({expose:[],setup:function(e){var n,o=b(),g=a(),R=i({}),w=i(!1),k=i(!1),T=i(0),A=i(0),G=i(E.GENERAL),O=c((function(){return u((function(){return t["import"]("./Menu-legacy.727319c5.js")}),void 0)})),_=c((function(){return u((function(){return t["import"]("./NoYouAlertBar-legacy.62b859b7.js")}),void 0)})),j=function(){n.pause()},L=function(e){null==e||e.preventDefault(),null==e||e.stopImmediatePropagation(),null==e||e.stopPropagation(),T.value++,w.value=!w.value,w.value?j():(n.resume(),G.value=E.GENERAL)},I=function(e){e.preventDefault(),e.stopImmediatePropagation(),e.stopPropagation(),G.value=E.RESTART,T.value++,j(),w.value=!0},P=function(){var e=r(regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(e=o.value.currentLevel.setupFileName){r.next=3;break}return r.abrupt("return");case 3:return r.next=5,n.startLevel(e.trim());case 5:k.value=!1,h.bind("esc",L),h.bind("r",I);case 8:case"end":return r.stop()}}),t)})));return function(){return e.apply(this,arguments)}}(),S=function(){var e=r(regeneratorRuntime.mark((function n(e){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:n.t0=e,n.next=n.t0===y.WIN?3:n.t0===y.RESTART?8:11;break;case 3:return G.value=E.WIN,T.value++,h.unbind(["esc","r"]),w.value=!0,n.abrupt("break",11);case 8:return n.next=10,P();case 10:return n.abrupt("break",11);case 11:case"end":return n.stop()}}),n)})));return function(n){return e.apply(this,arguments)}}(),M=function(){var e=r(regeneratorRuntime.mark((function n(e){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:e||A.value++,k.value=!e;case 2:case"end":return n.stop()}}),n)})));return function(n){return e.apply(this,arguments)}}(),H=function(){L(),P()},W=function(){var e=r(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,g.replace({name:"Level"});case 2:case"end":return e.stop()}}),n)})));return function(){return e.apply(this,arguments)}}(),Y=function(){var e=r(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,g.replace({name:"Home"});case 2:case"end":return e.stop()}}),n)})));return function(){return e.apply(this,arguments)}}();return s(r(regeneratorRuntime.mark((function B(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,r(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d;case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),t)})))();case 2:return(n=e.sent).setGameOverOutsideHandler(S),n.setYouGoneOutsideHandler(M),R.value.appendChild(n.gameView),e.next=6,P();case 6:case"end":return e.stop()}}),B)})))),function(e,n){return x(),l(m,null,[w.value?(x(),l(f(O),{key:"menu"+T.value,mode:G.value,onResume:L,onRestart:H,onToMenu:W,onToHome:Y},null,8,["mode"])):p("",!0),k.value?(x(),l(f(_),{key:"alertBar"+A.value})):p("",!0),v("div",N,[v("div",{ref:R,"class":"\n         game-layer\n         self-center"},null,512)])],64)}}});T.__scopeId="data-v-239973a8";var A=Object.freeze((e(w={__proto__:null},Symbol.toStringTag,"Module"),e(w,"default",T),w));n("G",A)}}}))}();

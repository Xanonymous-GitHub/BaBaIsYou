!function(){function e(e,a,c,n,r,t,i){try{var o=e[t](i),s=o.value}catch(u){return void c(u)}o.done?a(s):Promise.resolve(s).then(n,r)}var a=document.createElement("style");a.innerHTML=".card-container[data-v-54d452a0]{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,15rem),1fr));grid-template-rows:auto;justify-items:center;gap:1.5rem;padding:1.5rem}.animate-bg[data-v-54d452a0]{--s: 25vmin;--p: calc(var(--s) / 2);--c1: #374151;--c2: black;--c3: #111827;--bg: var(--c3);--d: 5s;--e: cubic-bezier(.76, 0, .24, 1);background-color:var(--bg);background-image:linear-gradient(45deg,var(--c1) 25%,transparent 25%),linear-gradient(-45deg,var(--c1) 25%,transparent 25%),linear-gradient(45deg,transparent 75%,var(--c2) 75%),linear-gradient(-45deg,transparent 75%,var(--c2) 75%);background-size:var(--s) var(--s);background-position:calc(var(--p) * 1) calc(var(--p) * 0),calc(var(--p) * -1) calc(var(--p) * 1),calc(var(--p) * 1) calc(var(--p) * -1),calc(var(--p) * -1) calc(var(--p) * 0);animation:color-54d452a0 var(--d) var(--e) infinite,position-54d452a0 var(--d) var(--e) infinite}@keyframes color-54d452a0{0%,25%{--bg: var(--c3)}26%,50%{--bg: var(--c1)}51%,75%{--bg: var(--c3)}76%,to{--bg: var(--c2)}}@keyframes position-54d452a0{0%{background-position:calc(var(--p) * 1) calc(var(--p) * 0),calc(var(--p) * -1) calc(var(--p) * 1),calc(var(--p) * 1) calc(var(--p) * -1),calc(var(--p) * -1) calc(var(--p) * 0)}25%{background-position:calc(var(--p) * 1) calc(var(--p) * 4),calc(var(--p) * -1) calc(var(--p) * 5),calc(var(--p) * 1) calc(var(--p) * 3),calc(var(--p) * -1) calc(var(--p) * 4)}50%{background-position:calc(var(--p) * 3) calc(var(--p) * 8),calc(var(--p) * -3) calc(var(--p) * 9),calc(var(--p) * 2) calc(var(--p) * 7),calc(var(--p) * -2) calc(var(--p) * 8)}75%{background-position:calc(var(--p) * 3) calc(var(--p) * 12),calc(var(--p) * -3) calc(var(--p) * 13),calc(var(--p) * 2) calc(var(--p) * 11),calc(var(--p) * -2) calc(var(--p) * 12)}to{background-position:calc(var(--p) * 5) calc(var(--p) * 16),calc(var(--p) * -5) calc(var(--p) * 17),calc(var(--p) * 5) calc(var(--p) * 15),calc(var(--p) * -5) calc(var(--p) * 16)}}@media (prefers-reduced-motion){.animate-bg[data-v-54d452a0]{animation:none}}\n",document.head.appendChild(a),System.register(["./core-legacy.e2e55cc4.js","./index-legacy.92ea3e05.js","./index-legacy.1237acb7.js"],(function(a){"use strict";var c,n,r,t,i,o,s,u,l,p,m,v;return{setters:[function(e){c=e.f,n=e.o,r=e.l,t=e.a,i=e.F,o=e.x,s=e.u,u=e.y,l=e.z},function(e){p=e._,m=e.u},function(e){v=e.u}],execute:function(){var d=[{name:"Where Do I Go?",setupFileName:"level001.json",backgroundMusic:"bg_music_0.mp3"},{name:"Now What Is This?",setupFileName:"level002.json",backgroundMusic:"bg_music_0.mp3"},{name:"Out Of Reach",setupFileName:"level003.json",backgroundMusic:"bg_music_0.mp3"},{name:"Still Out Of Reach",setupFileName:"level004.json",backgroundMusic:"bg_music_0.mp3"},{name:"Volcano",setupFileName:"level005.json",backgroundMusic:"bg_music_0.mp3"},{name:"Off Limits",setupFileName:"level006.json",backgroundMusic:"bg_music_0.mp3"},{name:"Grass Yard",setupFileName:"level007.json",backgroundMusic:"bg_music_0.mp3"},{name:"Turns",setupFileName:"level102.json",backgroundMusic:"bg_music_1.mp3"},{name:"Pillar Yard",setupFileName:"level104.json",backgroundMusic:"bg_music_1.mp3"},{name:"Novice Locksmith",setupFileName:"level107.json",backgroundMusic:"bg_music_1.mp3"},{name:"Submerged Ruins",setupFileName:"level1a.json",backgroundMusic:"bg_music_1.mp3"},{name:"Sunken Temple",setupFileName:"level1b.json",backgroundMusic:"bg_music_1.mp3"},{name:"Warm River",setupFileName:"level202.json",backgroundMusic:"bg_music_2.mp3"},{name:"Tiny Pond",setupFileName:"level208.json",backgroundMusic:"bg_music_2.mp3"},{name:"Catch The Thief!",setupFileName:"level209.json",backgroundMusic:"bg_music_2.mp3"},{name:"Evaporating River",setupFileName:"level212.json",backgroundMusic:"bg_music_2.mp3"},{name:"Fragility",setupFileName:"level301.json",backgroundMusic:"bg_music_3.mp3"}],g={"class":"flex animate-bg h-full justify-center relative flex-col bg-gray-900"},b={"class":"card-container w-4/5 relative mx-auto my-auto"},f=["onClick"],k=c({setup:function(a){var c=m(),p=v(),k=function(){var a,n=(a=regeneratorRuntime.mark((function r(e){return regeneratorRuntime.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return p.value.currentLevel=e,a.next=3,c.push({name:"Game"});case 3:case"end":return a.stop()}}),r)})),function(){var c=this,n=arguments;return new Promise((function(r,t){var i=a.apply(c,n);function o(a){e(i,r,t,o,s,"next",a)}function s(a){e(i,r,t,o,s,"throw",a)}o(undefined)}))});return function(e){return n.apply(this,arguments)}}();return function(e,a){return n(),r("div",g,[t("div",b,[(n(!0),r(i,null,o(s(d),(function(e,a){return n(),r("button",{key:a,"class":"w-60 h-10 py-1 px-2 sm:py-2 sm:px-4 flex justify-center items-center bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg",type:"button",onClick:u((function(a){return k(e)}),["stop","prevent"])},l(e.name),9,f)})),128))]),t("button",{"class":"relative mx-auto my-10 w-45 h-10 py-1 px-2 sm:py-2 sm:px-4 flex justify-center items-center bg-white hover:bg-gray-400 text-black transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg",type:"button",onClick:a[0]||(a[0]=u((function(e){return s(c).push({name:"Home"})}),["stop","prevent"]))}," Back To Home ")])}}});a("default",p(k,[["__scopeId","data-v-54d452a0"]]))}}}))}();

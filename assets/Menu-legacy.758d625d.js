System.register(["./index-legacy.7a8f21a8.js","./core-legacy.46ca887e.js","./Game-legacy.160ea87c.js","./index-legacy.faa80b08.js"],(function(e,t){"use strict";var n,o,s,r,u,i,f,c,l,a,g,m,d,p,x;return{setters:[function(e){n=e._},function(e){o=e.f,s=e.A,r=e.g,u=e.B,i=e.o,f=e.c,c=e.u,l=e.C,a=e.a,g=e.H,m=e.I,d=e.v,p=e.x},function(e){x=e.M},function(){}],execute:function(){var y={"class":"bg-gray-900 opacity-95 w-full h-full fixed z-30"},b={key:1,"class":"my-30 w-full text-white font-extrabold text-xl md:text-3xl text-center"},R={"class":"w-70 sm:w-60 relative mx-auto"};e("default",o({props:{mode:{type:String,required:!1,"default":x.GENERAL}},emits:["resume","restart","toMenu","toHome"],setup:function(e,o){var T=o.emit,v=e,w=s((function(){return n((function(){return t["import"]("./WinText-legacy.42feb2f0.js")}),void 0)})),E=r({});return u((function(){v.mode!==x.WIN&&E.value.focus()})),function(t,n){return i(),f("div",y,[e.mode===c(x).WIN?(i(),f(c(w),{key:0,"class":"w-full relative"})):l("",!0),e.mode===c(x).RESTART?(i(),f("p",b," ARE YOU SURE YOU WANT TO RESTART? ")):l("",!0),a("div",R,[g(a("button",{ref:E,type:"button","class":"opacity-100 my-10 py-1 px-2 sm:py-2 sm:px-4 flex justify-center items-center bg-green-500 hover:bg-green-600 focus:ring-green-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg ",onClick:n[1]||(n[1]=d((function(e){return T("resume")}),["prevent","stop"]))},p(e.mode!==c(x).RESTART?"RESUME":"No"),513),[[m,e.mode!==c(x).WIN]]),a("button",{type:"button","class":"opacity-100 my-10 py-1 px-2 sm:py-2 sm:px-4 flex justify-center items-center bg-green-500 hover:bg-green-600 focus:ring-green-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg ",onClick:n[2]||(n[2]=d((function(e){return T("restart")}),["prevent","stop"]))},p(e.mode!==c(x).RESTART?"RESTART":"Yes"),1),g(a("button",{type:"button","class":"opacity-100 my-10 py-1 px-2 sm:py-2 sm:px-4 flex justify-center items-center bg-green-500 hover:bg-green-600 focus:ring-green-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg ",onClick:n[3]||(n[3]=d((function(e){return T("toMenu")}),["prevent","stop"]))}," RETURN TO MENU ",512),[[m,e.mode!==c(x).RESTART]]),g(a("button",{type:"button","class":"opacity-100 my-10 py-1 px-2 sm:py-2 sm:px-4 flex justify-center items-center bg-green-500 hover:bg-green-600 focus:ring-green-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg ",onClick:n[4]||(n[4]=d((function(e){return T("toHome")}),["prevent","stop"]))}," RETURN TO HOME ",512),[[m,e.mode!==c(x).RESTART]])])])}}}))}}}));
System.register(["./index-legacy.b9c54cbb.js","./core-legacy.58c2d3b0.js","./Game-legacy.4616844b.js","./index-legacy.6de700d9.js"],(function(e,t){"use strict";var n,o,s,r,u,i,f,c,l,a,g,d,m,p,x;return{setters:[function(e){n=e._},function(e){o=e.f,s=e.A,r=e.g,u=e.B,i=e.o,f=e.c,c=e.u,l=e.C,a=e.a,g=e.H,d=e.I,m=e.v,p=e.x},function(e){x=e.M},function(){}],execute:function(){var y={"class":"bg-gray-900 opacity-95 w-full h-full fixed z-30"},b={key:1,"class":"my-30 w-full text-white font-extrabold text-xl md:text-3xl text-center"},R={"class":"w-70 sm:w-60 relative mx-auto"};e("default",o({props:{mode:{type:String,required:!1,"default":x.GENERAL}},emits:["resume","restart","toMenu","toHome"],setup:function(e,o){var T=o.emit,v=e,w=s((function(){return n((function(){return t["import"]("./WinText-legacy.3f960f22.js")}),void 0)})),E=r({});return u((function(){v.mode!==x.WIN&&E.value.focus()})),function(t,n){return i(),f("div",y,[e.mode===c(x).WIN?(i(),f(c(w),{key:0,"class":"w-full relative"})):l("",!0),e.mode===c(x).RESTART?(i(),f("p",b," ARE YOU SURE YOU WANT TO RESTART? ")):l("",!0),a("div",R,[g(a("button",{ref:E,type:"button","class":"opacity-100 my-10 py-1 px-2 sm:py-2 sm:px-4 flex justify-center items-center bg-green-500 hover:bg-green-600 focus:ring-green-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg ",onClick:n[1]||(n[1]=m((function(e){return T("resume")}),["prevent","stop"]))},p(e.mode!==c(x).RESTART?"RESUME":"No"),513),[[d,e.mode!==c(x).WIN]]),a("button",{type:"button","class":"opacity-100 my-10 py-1 px-2 sm:py-2 sm:px-4 flex justify-center items-center bg-green-500 hover:bg-green-600 focus:ring-green-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg ",onClick:n[2]||(n[2]=m((function(e){return T("restart")}),["prevent","stop"]))},p(e.mode!==c(x).RESTART?"RESTART":"Yes"),1),g(a("button",{type:"button","class":"opacity-100 my-10 py-1 px-2 sm:py-2 sm:px-4 flex justify-center items-center bg-green-500 hover:bg-green-600 focus:ring-green-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg ",onClick:n[3]||(n[3]=m((function(e){return T("toMenu")}),["prevent","stop"]))}," RETURN TO MENU ",512),[[d,e.mode!==c(x).RESTART]]),g(a("button",{type:"button","class":"opacity-100 my-10 py-1 px-2 sm:py-2 sm:px-4 flex justify-center items-center bg-green-500 hover:bg-green-600 focus:ring-green-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg ",onClick:n[4]||(n[4]=m((function(e){return T("toHome")}),["prevent","stop"]))}," RETURN TO HOME ",512),[[d,e.mode!==c(x).RESTART]])])])}}}))}}}));
import{a as e}from"./index.acfaee25.js";import{f as t,C as o,g as s,D as n,o as r,l as i,u,c as f,E as a,a as c,J as l,K as m,y as d,z as g}from"./core.a711d75e.js";import{M as p}from"./Game.ae142dfc.js";import"./index.4b2c5951.js";const x={"class":"bg-gray-900 opacity-95 w-full h-full fixed z-30"},y={key:1,"class":"my-30 w-full text-white font-extrabold text-xl md:text-3xl text-center"},b={"class":"w-70 sm:w-60 relative mx-auto"},R=t({props:{mode:{type:String,required:!1,"default":p.GENERAL}},emits:["resume","restart","toMenu","toHome"],setup(t,{emit:R}){const T=t,E=o((()=>e((()=>import("./WinText.472831c0.js")),["assets/WinText.472831c0.js","assets/core.a711d75e.js"]))),w=s({});return n((()=>{T.mode!==p.WIN&&w.value.focus()})),(e,o)=>(r(),i("div",x,[t.mode===u(p).WIN?(r(),f(u(E),{key:0,"class":"w-full relative"})):a("",!0),t.mode===u(p).RESTART?(r(),i("p",y," ARE YOU SURE YOU WANT TO RESTART? ")):a("",!0),c("div",b,[l(c("button",{ref_key:"resumeButton",ref:w,"class":"opacity-100 my-10 py-1 px-2 sm:py-2 sm:px-4 flex justify-center items-center bg-green-500 hover:bg-green-600 focus:ring-green-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg",type:"button",onClick:o[0]||(o[0]=d((e=>R("resume")),["prevent","stop"]))},g(t.mode!==u(p).RESTART?"RESUME":"No"),513),[[m,t.mode!==u(p).WIN]]),c("button",{"class":"opacity-100 my-10 py-1 px-2 sm:py-2 sm:px-4 flex justify-center items-center bg-green-500 hover:bg-green-600 focus:ring-green-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg",type:"button",onClick:o[1]||(o[1]=d((e=>R("restart")),["prevent","stop"]))},g(t.mode!==u(p).RESTART?"RESTART":"Yes"),1),l(c("button",{"class":"opacity-100 my-10 py-1 px-2 sm:py-2 sm:px-4 flex justify-center items-center bg-green-500 hover:bg-green-600 focus:ring-green-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg",type:"button",onClick:o[2]||(o[2]=d((e=>R("toMenu")),["prevent","stop"]))}," RETURN TO MENU ",512),[[m,t.mode!==u(p).RESTART]]),l(c("button",{"class":"opacity-100 my-10 py-1 px-2 sm:py-2 sm:px-4 flex justify-center items-center bg-green-500 hover:bg-green-600 focus:ring-green-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg",type:"button",onClick:o[3]||(o[3]=d((e=>R("toHome")),["prevent","stop"]))}," RETURN TO HOME ",512),[[m,t.mode!==u(p).RESTART]])])]))}});export{R as default};

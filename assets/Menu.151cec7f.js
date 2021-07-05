import{_ as e}from"./index.c18b3332.js";import{f as t,A as o,g as s,B as n,o as r,c as i,u,C as f,a,H as c,I as l,v as m,x as g}from"./core.a2bfc164.js";import{M as p}from"./Game.23888934.js";import"./index.ac883107.js";const d={"class":"bg-gray-900 opacity-95 w-full h-full fixed z-30"},x={key:1,"class":"my-30 w-full text-white font-extrabold text-xl md:text-3xl text-center"},b={"class":"w-70 sm:w-60 relative mx-auto"},y=t({props:{mode:{type:String,required:!1,"default":p.GENERAL}},emits:["resume","restart","toMenu","toHome"],setup(t,{emit:y}){const R=t,T=o((()=>e((()=>__import__("./WinText.ce7c6e22.js")),["/assets/WinText.ce7c6e22.js","/assets/core.a2bfc164.js"]))),E=s({});return n((()=>{R.mode!==p.WIN&&E.value.focus()})),(e,o)=>(r(),i("div",d,[t.mode===u(p).WIN?(r(),i(u(T),{key:0,"class":"w-full relative"})):f("",!0),t.mode===u(p).RESTART?(r(),i("p",x," ARE YOU SURE YOU WANT TO RESTART? ")):f("",!0),a("div",b,[c(a("button",{ref:E,type:"button","class":"opacity-100 my-10 py-1 px-2 sm:py-2 sm:px-4 flex justify-center items-center bg-green-500 hover:bg-green-600 focus:ring-green-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg ",onClick:o[1]||(o[1]=m((e=>y("resume")),["prevent","stop"]))},g(t.mode!==u(p).RESTART?"RESUME":"No"),513),[[l,t.mode!==u(p).WIN]]),a("button",{type:"button","class":"opacity-100 my-10 py-1 px-2 sm:py-2 sm:px-4 flex justify-center items-center bg-green-500 hover:bg-green-600 focus:ring-green-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg ",onClick:o[2]||(o[2]=m((e=>y("restart")),["prevent","stop"]))},g(t.mode!==u(p).RESTART?"RESTART":"Yes"),1),c(a("button",{type:"button","class":"opacity-100 my-10 py-1 px-2 sm:py-2 sm:px-4 flex justify-center items-center bg-green-500 hover:bg-green-600 focus:ring-green-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg ",onClick:o[3]||(o[3]=m((e=>y("toMenu")),["prevent","stop"]))}," RETURN TO MENU ",512),[[l,t.mode!==u(p).RESTART]]),c(a("button",{type:"button","class":"opacity-100 my-10 py-1 px-2 sm:py-2 sm:px-4 flex justify-center items-center bg-green-500 hover:bg-green-600 focus:ring-green-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg ",onClick:o[4]||(o[4]=m((e=>y("toHome")),["prevent","stop"]))}," RETURN TO HOME ",512),[[l,t.mode!==u(p).RESTART]])])]))}});export default y;

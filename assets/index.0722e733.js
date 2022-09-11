import{c as we,w as st,r as it,o as Se,a as ct,b as at,s as lt,u as F,d as M,e as Ge,n as ut,f as ze,i as V,h as De,p as ae,g as ft,j as ht,k as dt}from"./core.365c9d25.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const c of o)if(c.type==="childList")for(const d of c.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&r(d)}).observe(document,{childList:!0,subtree:!0});function n(o){const c={};return o.integrity&&(c.integrity=o.integrity),o.referrerpolicy&&(c.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?c.credentials="include":o.crossorigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function r(o){if(o.ep)return;o.ep=!0;const c=n(o);fetch(o.href,c)}})();const pt=(e,t)=>{const n=e.__vccOpts||e;for(const[r,o]of t)n[r]=o;return n},mt={},gt=["id"];function vt(e,t){const n=it("router-view");return Se(),we(n,null,{default:st(({Component:r,route:o})=>[ct("main",{id:o.name,class:"h-full bg-white"},[(Se(),we(at(r)))],8,gt)]),_:1})}const yt=pt(mt,[["render",vt]]),Et="modulepreload",Rt=function(e){return"/"+e},ke={},le=function(t,n,r){return!n||n.length===0?t():Promise.all(n.map(o=>{if(o=Rt(o),o in ke)return;ke[o]=!0;const c=o.endsWith(".css"),d=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${o}"]${d}`))return;const p=document.createElement("link");if(p.rel=c?"stylesheet":Et,c||(p.as="script",p.crossOrigin=""),p.href=o,document.head.appendChild(p),c)return new Promise((a,u)=>{p.addEventListener("load",a),p.addEventListener("error",()=>u(new Error(`Unable to preload CSS for ${o}`)))})})).then(()=>t())};/*!
  * vue-router v4.1.5
  * (c) 2022 Eduardo San Martin Morote
  * @license MIT
  */const q=typeof window<"u";function Pt(e){return e.__esModule||e[Symbol.toStringTag]==="Module"}const w=Object.assign;function ue(e,t){const n={};for(const r in t){const o=t[r];n[r]=N(o)?o.map(e):e(o)}return n}const W=()=>{},N=Array.isArray,_t=/\/$/,wt=e=>e.replace(_t,"");function fe(e,t,n="/"){let r,o={},c="",d="";const p=t.indexOf("#");let a=t.indexOf("?");return p<a&&p>=0&&(a=-1),a>-1&&(r=t.slice(0,a),c=t.slice(a+1,p>-1?p:t.length),o=e(c)),p>-1&&(r=r||t.slice(0,p),d=t.slice(p,t.length)),r=bt(r!=null?r:t,n),{fullPath:r+(c&&"?")+c+d,path:r,query:o,hash:d}}function St(e,t){const n=t.query?e(t.query):"";return t.path+(n&&"?")+n+(t.hash||"")}function Ce(e,t){return!t||!e.toLowerCase().startsWith(t.toLowerCase())?e:e.slice(t.length)||"/"}function kt(e,t,n){const r=t.matched.length-1,o=n.matched.length-1;return r>-1&&r===o&&G(t.matched[r],n.matched[o])&&Ue(t.params,n.params)&&e(t.query)===e(n.query)&&t.hash===n.hash}function G(e,t){return(e.aliasOf||e)===(t.aliasOf||t)}function Ue(e,t){if(Object.keys(e).length!==Object.keys(t).length)return!1;for(const n in e)if(!Ct(e[n],t[n]))return!1;return!0}function Ct(e,t){return N(e)?be(e,t):N(t)?be(t,e):e===t}function be(e,t){return N(t)?e.length===t.length&&e.every((n,r)=>n===t[r]):e.length===1&&e[0]===t}function bt(e,t){if(e.startsWith("/"))return e;if(!e)return t;const n=t.split("/"),r=e.split("/");let o=n.length-1,c,d;for(c=0;c<r.length;c++)if(d=r[c],d!==".")if(d==="..")o>1&&o--;else break;return n.slice(0,o).join("/")+"/"+r.slice(c-(c===r.length?1:0)).join("/")}var X;(function(e){e.pop="pop",e.push="push"})(X||(X={}));var Y;(function(e){e.back="back",e.forward="forward",e.unknown=""})(Y||(Y={}));function At(e){if(!e)if(q){const t=document.querySelector("base");e=t&&t.getAttribute("href")||"/",e=e.replace(/^\w+:\/\/[^\/]+/,"")}else e="/";return e[0]!=="/"&&e[0]!=="#"&&(e="/"+e),wt(e)}const Ot=/^[^#]+#/;function xt(e,t){return e.replace(Ot,"#")+t}function Lt(e,t){const n=document.documentElement.getBoundingClientRect(),r=e.getBoundingClientRect();return{behavior:t.behavior,left:r.left-n.left-(t.left||0),top:r.top-n.top-(t.top||0)}}const ee=()=>({left:window.pageXOffset,top:window.pageYOffset});function Mt(e){let t;if("el"in e){const n=e.el,r=typeof n=="string"&&n.startsWith("#"),o=typeof n=="string"?r?document.getElementById(n.slice(1)):document.querySelector(n):n;if(!o)return;t=Lt(o,e)}else t=e;"scrollBehavior"in document.documentElement.style?window.scrollTo(t):window.scrollTo(t.left!=null?t.left:window.pageXOffset,t.top!=null?t.top:window.pageYOffset)}function Ae(e,t){return(history.state?history.state.position-t:-1)+e}const de=new Map;function Nt(e,t){de.set(e,t)}function It(e){const t=de.get(e);return de.delete(e),t}let $t=()=>location.protocol+"//"+location.host;function Ke(e,t){const{pathname:n,search:r,hash:o}=t,c=e.indexOf("#");if(c>-1){let p=o.includes(e.slice(c))?e.slice(c).length:1,a=o.slice(p);return a[0]!=="/"&&(a="/"+a),Ce(a,"")}return Ce(n,e)+r+o}function Tt(e,t,n,r){let o=[],c=[],d=null;const p=({state:f})=>{const g=Ke(e,location),E=n.value,C=t.value;let k=0;if(f){if(n.value=g,t.value=f,d&&d===E){d=null;return}k=C?f.position-C.position:0}else r(g);o.forEach(_=>{_(n.value,E,{delta:k,type:X.pop,direction:k?k>0?Y.forward:Y.back:Y.unknown})})};function a(){d=n.value}function u(f){o.push(f);const g=()=>{const E=o.indexOf(f);E>-1&&o.splice(E,1)};return c.push(g),g}function s(){const{history:f}=window;!f.state||f.replaceState(w({},f.state,{scroll:ee()}),"")}function l(){for(const f of c)f();c=[],window.removeEventListener("popstate",p),window.removeEventListener("beforeunload",s)}return window.addEventListener("popstate",p),window.addEventListener("beforeunload",s),{pauseListeners:a,listen:u,destroy:l}}function Oe(e,t,n,r=!1,o=!1){return{back:e,current:t,forward:n,replaced:r,position:window.history.length,scroll:o?ee():null}}function Bt(e){const{history:t,location:n}=window,r={value:Ke(e,n)},o={value:t.state};o.value||c(r.value,{back:null,current:r.value,forward:null,position:t.length-1,replaced:!0,scroll:null},!0);function c(a,u,s){const l=e.indexOf("#"),f=l>-1?(n.host&&document.querySelector("base")?e:e.slice(l))+a:$t()+e+a;try{t[s?"replaceState":"pushState"](u,"",f),o.value=u}catch(g){console.error(g),n[s?"replace":"assign"](f)}}function d(a,u){const s=w({},t.state,Oe(o.value.back,a,o.value.forward,!0),u,{position:o.value.position});c(a,s,!0),r.value=a}function p(a,u){const s=w({},o.value,t.state,{forward:a,scroll:ee()});c(s.current,s,!0);const l=w({},Oe(r.value,a,null),{position:s.position+1},u);c(a,l,!1),r.value=a}return{location:r,state:o,push:p,replace:d}}function Ht(e){e=At(e);const t=Bt(e),n=Tt(e,t.state,t.location,t.replace);function r(c,d=!0){d||n.pauseListeners(),history.go(c)}const o=w({location:"",base:e,go:r,createHref:xt.bind(null,e)},t,n);return Object.defineProperty(o,"location",{enumerable:!0,get:()=>t.location.value}),Object.defineProperty(o,"state",{enumerable:!0,get:()=>t.state.value}),o}function jt(e){return typeof e=="string"||e&&typeof e=="object"}function Qe(e){return typeof e=="string"||typeof e=="symbol"}const T={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0},Fe=Symbol("");var xe;(function(e){e[e.aborted=4]="aborted",e[e.cancelled=8]="cancelled",e[e.duplicated=16]="duplicated"})(xe||(xe={}));function z(e,t){return w(new Error,{type:e,[Fe]:!0},t)}function $(e,t){return e instanceof Error&&Fe in e&&(t==null||!!(e.type&t))}const Le="[^/]+?",qt={sensitive:!1,strict:!1,start:!0,end:!0},Vt=/[.+*?^${}()[\]/\\]/g;function Gt(e,t){const n=w({},qt,t),r=[];let o=n.start?"^":"";const c=[];for(const u of e){const s=u.length?[]:[90];n.strict&&!u.length&&(o+="/");for(let l=0;l<u.length;l++){const f=u[l];let g=40+(n.sensitive?.25:0);if(f.type===0)l||(o+="/"),o+=f.value.replace(Vt,"\\$&"),g+=40;else if(f.type===1){const{value:E,repeatable:C,optional:k,regexp:_}=f;c.push({name:E,repeatable:C,optional:k});const P=_||Le;if(P!==Le){g+=10;try{new RegExp(`(${P})`)}catch(L){throw new Error(`Invalid custom RegExp for param "${E}" (${P}): `+L.message)}}let O=C?`((?:${P})(?:/(?:${P}))*)`:`(${P})`;l||(O=k&&u.length<2?`(?:/${O})`:"/"+O),k&&(O+="?"),o+=O,g+=20,k&&(g+=-8),C&&(g+=-20),P===".*"&&(g+=-50)}s.push(g)}r.push(s)}if(n.strict&&n.end){const u=r.length-1;r[u][r[u].length-1]+=.7000000000000001}n.strict||(o+="/?"),n.end?o+="$":n.strict&&(o+="(?:/|$)");const d=new RegExp(o,n.sensitive?"":"i");function p(u){const s=u.match(d),l={};if(!s)return null;for(let f=1;f<s.length;f++){const g=s[f]||"",E=c[f-1];l[E.name]=g&&E.repeatable?g.split("/"):g}return l}function a(u){let s="",l=!1;for(const f of e){(!l||!s.endsWith("/"))&&(s+="/"),l=!1;for(const g of f)if(g.type===0)s+=g.value;else if(g.type===1){const{value:E,repeatable:C,optional:k}=g,_=E in u?u[E]:"";if(N(_)&&!C)throw new Error(`Provided param "${E}" is an array but it is not repeatable (* or + modifiers)`);const P=N(_)?_.join("/"):_;if(!P)if(k)f.length<2&&(s.endsWith("/")?s=s.slice(0,-1):l=!0);else throw new Error(`Missing required param "${E}"`);s+=P}}return s||"/"}return{re:d,score:r,keys:c,parse:p,stringify:a}}function zt(e,t){let n=0;for(;n<e.length&&n<t.length;){const r=t[n]-e[n];if(r)return r;n++}return e.length<t.length?e.length===1&&e[0]===40+40?-1:1:e.length>t.length?t.length===1&&t[0]===40+40?1:-1:0}function Dt(e,t){let n=0;const r=e.score,o=t.score;for(;n<r.length&&n<o.length;){const c=zt(r[n],o[n]);if(c)return c;n++}if(Math.abs(o.length-r.length)===1){if(Me(r))return 1;if(Me(o))return-1}return o.length-r.length}function Me(e){const t=e[e.length-1];return e.length>0&&t[t.length-1]<0}const Ut={type:0,value:""},Kt=/[a-zA-Z0-9_]/;function Qt(e){if(!e)return[[]];if(e==="/")return[[Ut]];if(!e.startsWith("/"))throw new Error(`Invalid path "${e}"`);function t(g){throw new Error(`ERR (${n})/"${u}": ${g}`)}let n=0,r=n;const o=[];let c;function d(){c&&o.push(c),c=[]}let p=0,a,u="",s="";function l(){!u||(n===0?c.push({type:0,value:u}):n===1||n===2||n===3?(c.length>1&&(a==="*"||a==="+")&&t(`A repeatable param (${u}) must be alone in its segment. eg: '/:ids+.`),c.push({type:1,value:u,regexp:s,repeatable:a==="*"||a==="+",optional:a==="*"||a==="?"})):t("Invalid state to consume buffer"),u="")}function f(){u+=a}for(;p<e.length;){if(a=e[p++],a==="\\"&&n!==2){r=n,n=4;continue}switch(n){case 0:a==="/"?(u&&l(),d()):a===":"?(l(),n=1):f();break;case 4:f(),n=r;break;case 1:a==="("?n=2:Kt.test(a)?f():(l(),n=0,a!=="*"&&a!=="?"&&a!=="+"&&p--);break;case 2:a===")"?s[s.length-1]=="\\"?s=s.slice(0,-1)+a:n=3:s+=a;break;case 3:l(),n=0,a!=="*"&&a!=="?"&&a!=="+"&&p--,s="";break;default:t("Unknown state");break}}return n===2&&t(`Unfinished custom RegExp for param "${u}"`),l(),d(),o}function Ft(e,t,n){const r=Gt(Qt(e.path),n),o=w(r,{record:e,parent:t,children:[],alias:[]});return t&&!o.record.aliasOf==!t.record.aliasOf&&t.children.push(o),o}function Wt(e,t){const n=[],r=new Map;t=$e({strict:!1,end:!0,sensitive:!1},t);function o(s){return r.get(s)}function c(s,l,f){const g=!f,E=Yt(s);E.aliasOf=f&&f.record;const C=$e(t,s),k=[E];if("alias"in s){const O=typeof s.alias=="string"?[s.alias]:s.alias;for(const L of O)k.push(w({},E,{components:f?f.record.components:E.components,path:L,aliasOf:f?f.record:E}))}let _,P;for(const O of k){const{path:L}=O;if(l&&L[0]!=="/"){const H=l.record.path,I=H[H.length-1]==="/"?"":"/";O.path=l.record.path+(L&&I+L)}if(_=Ft(O,l,C),f?f.alias.push(_):(P=P||_,P!==_&&P.alias.push(_),g&&s.name&&!Ie(_)&&d(s.name)),E.children){const H=E.children;for(let I=0;I<H.length;I++)c(H[I],_,f&&f.children[I])}f=f||_,a(_)}return P?()=>{d(P)}:W}function d(s){if(Qe(s)){const l=r.get(s);l&&(r.delete(s),n.splice(n.indexOf(l),1),l.children.forEach(d),l.alias.forEach(d))}else{const l=n.indexOf(s);l>-1&&(n.splice(l,1),s.record.name&&r.delete(s.record.name),s.children.forEach(d),s.alias.forEach(d))}}function p(){return n}function a(s){let l=0;for(;l<n.length&&Dt(s,n[l])>=0&&(s.record.path!==n[l].record.path||!We(s,n[l]));)l++;n.splice(l,0,s),s.record.name&&!Ie(s)&&r.set(s.record.name,s)}function u(s,l){let f,g={},E,C;if("name"in s&&s.name){if(f=r.get(s.name),!f)throw z(1,{location:s});C=f.record.name,g=w(Ne(l.params,f.keys.filter(P=>!P.optional).map(P=>P.name)),s.params&&Ne(s.params,f.keys.map(P=>P.name))),E=f.stringify(g)}else if("path"in s)E=s.path,f=n.find(P=>P.re.test(E)),f&&(g=f.parse(E),C=f.record.name);else{if(f=l.name?r.get(l.name):n.find(P=>P.re.test(l.path)),!f)throw z(1,{location:s,currentLocation:l});C=f.record.name,g=w({},l.params,s.params),E=f.stringify(g)}const k=[];let _=f;for(;_;)k.unshift(_.record),_=_.parent;return{name:C,path:E,params:g,matched:k,meta:Zt(k)}}return e.forEach(s=>c(s)),{addRoute:c,resolve:u,removeRoute:d,getRoutes:p,getRecordMatcher:o}}function Ne(e,t){const n={};for(const r of t)r in e&&(n[r]=e[r]);return n}function Yt(e){return{path:e.path,redirect:e.redirect,name:e.name,meta:e.meta||{},aliasOf:void 0,beforeEnter:e.beforeEnter,props:Xt(e),children:e.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in e?e.components||null:e.component&&{default:e.component}}}function Xt(e){const t={},n=e.props||!1;if("component"in e)t.default=n;else for(const r in e.components)t[r]=typeof n=="boolean"?n:n[r];return t}function Ie(e){for(;e;){if(e.record.aliasOf)return!0;e=e.parent}return!1}function Zt(e){return e.reduce((t,n)=>w(t,n.meta),{})}function $e(e,t){const n={};for(const r in e)n[r]=r in t?t[r]:e[r];return n}function We(e,t){return t.children.some(n=>n===e||We(e,n))}const Ye=/#/g,Jt=/&/g,en=/\//g,tn=/=/g,nn=/\?/g,Xe=/\+/g,rn=/%5B/g,on=/%5D/g,Ze=/%5E/g,sn=/%60/g,Je=/%7B/g,cn=/%7C/g,et=/%7D/g,an=/%20/g;function ge(e){return encodeURI(""+e).replace(cn,"|").replace(rn,"[").replace(on,"]")}function ln(e){return ge(e).replace(Je,"{").replace(et,"}").replace(Ze,"^")}function pe(e){return ge(e).replace(Xe,"%2B").replace(an,"+").replace(Ye,"%23").replace(Jt,"%26").replace(sn,"`").replace(Je,"{").replace(et,"}").replace(Ze,"^")}function un(e){return pe(e).replace(tn,"%3D")}function fn(e){return ge(e).replace(Ye,"%23").replace(nn,"%3F")}function hn(e){return e==null?"":fn(e).replace(en,"%2F")}function J(e){try{return decodeURIComponent(""+e)}catch{}return""+e}function dn(e){const t={};if(e===""||e==="?")return t;const r=(e[0]==="?"?e.slice(1):e).split("&");for(let o=0;o<r.length;++o){const c=r[o].replace(Xe," "),d=c.indexOf("="),p=J(d<0?c:c.slice(0,d)),a=d<0?null:J(c.slice(d+1));if(p in t){let u=t[p];N(u)||(u=t[p]=[u]),u.push(a)}else t[p]=a}return t}function Te(e){let t="";for(let n in e){const r=e[n];if(n=un(n),r==null){r!==void 0&&(t+=(t.length?"&":"")+n);continue}(N(r)?r.map(c=>c&&pe(c)):[r&&pe(r)]).forEach(c=>{c!==void 0&&(t+=(t.length?"&":"")+n,c!=null&&(t+="="+c))})}return t}function pn(e){const t={};for(const n in e){const r=e[n];r!==void 0&&(t[n]=N(r)?r.map(o=>o==null?null:""+o):r==null?r:""+r)}return t}const mn=Symbol(""),Be=Symbol(""),te=Symbol(""),tt=Symbol(""),me=Symbol("");function Q(){let e=[];function t(r){return e.push(r),()=>{const o=e.indexOf(r);o>-1&&e.splice(o,1)}}function n(){e=[]}return{add:t,list:()=>e,reset:n}}function B(e,t,n,r,o){const c=r&&(r.enterCallbacks[o]=r.enterCallbacks[o]||[]);return()=>new Promise((d,p)=>{const a=l=>{l===!1?p(z(4,{from:n,to:t})):l instanceof Error?p(l):jt(l)?p(z(2,{from:t,to:l})):(c&&r.enterCallbacks[o]===c&&typeof l=="function"&&c.push(l),d())},u=e.call(r&&r.instances[o],t,n,a);let s=Promise.resolve(u);e.length<3&&(s=s.then(a)),s.catch(l=>p(l))})}function he(e,t,n,r){const o=[];for(const c of e)for(const d in c.components){let p=c.components[d];if(!(t!=="beforeRouteEnter"&&!c.instances[d]))if(gn(p)){const u=(p.__vccOpts||p)[t];u&&o.push(B(u,n,r,c,d))}else{let a=p();o.push(()=>a.then(u=>{if(!u)return Promise.reject(new Error(`Couldn't resolve component "${d}" at "${c.path}"`));const s=Pt(u)?u.default:u;c.components[d]=s;const f=(s.__vccOpts||s)[t];return f&&B(f,n,r,c,d)()}))}}return o}function gn(e){return typeof e=="object"||"displayName"in e||"props"in e||"__vccOpts"in e}function He(e){const t=V(te),n=V(tt),r=M(()=>t.resolve(F(e.to))),o=M(()=>{const{matched:a}=r.value,{length:u}=a,s=a[u-1],l=n.matched;if(!s||!l.length)return-1;const f=l.findIndex(G.bind(null,s));if(f>-1)return f;const g=je(a[u-2]);return u>1&&je(s)===g&&l[l.length-1].path!==g?l.findIndex(G.bind(null,a[u-2])):f}),c=M(()=>o.value>-1&&Rn(n.params,r.value.params)),d=M(()=>o.value>-1&&o.value===n.matched.length-1&&Ue(n.params,r.value.params));function p(a={}){return En(a)?t[F(e.replace)?"replace":"push"](F(e.to)).catch(W):Promise.resolve()}return{route:r,href:M(()=>r.value.href),isActive:c,isExactActive:d,navigate:p}}const vn=ze({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"}},useLink:He,setup(e,{slots:t}){const n=Ge(He(e)),{options:r}=V(te),o=M(()=>({[qe(e.activeClass,r.linkActiveClass,"router-link-active")]:n.isActive,[qe(e.exactActiveClass,r.linkExactActiveClass,"router-link-exact-active")]:n.isExactActive}));return()=>{const c=t.default&&t.default(n);return e.custom?c:De("a",{"aria-current":n.isExactActive?e.ariaCurrentValue:null,href:n.href,onClick:n.navigate,class:o.value},c)}}}),yn=vn;function En(e){if(!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)&&!e.defaultPrevented&&!(e.button!==void 0&&e.button!==0)){if(e.currentTarget&&e.currentTarget.getAttribute){const t=e.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(t))return}return e.preventDefault&&e.preventDefault(),!0}}function Rn(e,t){for(const n in t){const r=t[n],o=e[n];if(typeof r=="string"){if(r!==o)return!1}else if(!N(o)||o.length!==r.length||r.some((c,d)=>c!==o[d]))return!1}return!0}function je(e){return e?e.aliasOf?e.aliasOf.path:e.path:""}const qe=(e,t,n)=>e!=null?e:t!=null?t:n,Pn=ze({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(e,{attrs:t,slots:n}){const r=V(me),o=M(()=>e.route||r.value),c=V(Be,0),d=M(()=>{let u=F(c);const{matched:s}=o.value;let l;for(;(l=s[u])&&!l.components;)u++;return u}),p=M(()=>o.value.matched[d.value]);ae(Be,M(()=>d.value+1)),ae(mn,p),ae(me,o);const a=ft();return ht(()=>[a.value,p.value,e.name],([u,s,l],[f,g,E])=>{s&&(s.instances[l]=u,g&&g!==s&&u&&u===f&&(s.leaveGuards.size||(s.leaveGuards=g.leaveGuards),s.updateGuards.size||(s.updateGuards=g.updateGuards))),u&&s&&(!g||!G(s,g)||!f)&&(s.enterCallbacks[l]||[]).forEach(C=>C(u))},{flush:"post"}),()=>{const u=o.value,s=e.name,l=p.value,f=l&&l.components[s];if(!f)return Ve(n.default,{Component:f,route:u});const g=l.props[s],E=g?g===!0?u.params:typeof g=="function"?g(u):g:null,k=De(f,w({},E,t,{onVnodeUnmounted:_=>{_.component.isUnmounted&&(l.instances[s]=null)},ref:a}));return Ve(n.default,{Component:k,route:u})||k}}});function Ve(e,t){if(!e)return null;const n=e(t);return n.length===1?n[0]:n}const _n=Pn;function wn(e){const t=Wt(e.routes,e),n=e.parseQuery||dn,r=e.stringifyQuery||Te,o=e.history,c=Q(),d=Q(),p=Q(),a=lt(T);let u=T;q&&e.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const s=ue.bind(null,i=>""+i),l=ue.bind(null,hn),f=ue.bind(null,J);function g(i,m){let h,v;return Qe(i)?(h=t.getRecordMatcher(i),v=m):v=i,t.addRoute(v,h)}function E(i){const m=t.getRecordMatcher(i);m&&t.removeRoute(m)}function C(){return t.getRoutes().map(i=>i.record)}function k(i){return!!t.getRecordMatcher(i)}function _(i,m){if(m=w({},m||a.value),typeof i=="string"){const y=fe(n,i,m.path),A=t.resolve({path:y.path},m),K=o.createHref(y.fullPath);return w(y,A,{params:f(A.params),hash:J(y.hash),redirectedFrom:void 0,href:K})}let h;if("path"in i)h=w({},i,{path:fe(n,i.path,m.path).path});else{const y=w({},i.params);for(const A in y)y[A]==null&&delete y[A];h=w({},i,{params:l(i.params)}),m.params=l(m.params)}const v=t.resolve(h,m),S=i.hash||"";v.params=s(f(v.params));const b=St(r,w({},i,{hash:ln(S),path:v.path})),R=o.createHref(b);return w({fullPath:b,hash:S,query:r===Te?pn(i.query):i.query||{}},v,{redirectedFrom:void 0,href:R})}function P(i){return typeof i=="string"?fe(n,i,a.value.path):w({},i)}function O(i,m){if(u!==i)return z(8,{from:m,to:i})}function L(i){return D(i)}function H(i){return L(w(P(i),{replace:!0}))}function I(i){const m=i.matched[i.matched.length-1];if(m&&m.redirect){const{redirect:h}=m;let v=typeof h=="function"?h(i):h;return typeof v=="string"&&(v=v.includes("?")||v.includes("#")?v=P(v):{path:v},v.params={}),w({query:i.query,hash:i.hash,params:"path"in v?{}:i.params},v)}}function D(i,m){const h=u=_(i),v=a.value,S=i.state,b=i.force,R=i.replace===!0,y=I(h);if(y)return D(w(P(y),{state:typeof y=="object"?w({},S,y.state):S,force:b,replace:R}),m||h);const A=h;A.redirectedFrom=m;let K;return!b&&kt(r,v,h)&&(K=z(16,{to:A,from:v}),Pe(v,v,!0,!1)),(K?Promise.resolve(K):ve(A,v)).catch(x=>$(x)?$(x,2)?x:oe(x):re(x,A,v)).then(x=>{if(x){if($(x,2))return D(w({replace:R},P(x.to),{state:typeof x.to=="object"?w({},S,x.to.state):S,force:b}),m||A)}else x=Ee(A,v,!0,R,S);return ye(A,v,x),x})}function nt(i,m){const h=O(i,m);return h?Promise.reject(h):Promise.resolve()}function ve(i,m){let h;const[v,S,b]=Sn(i,m);h=he(v.reverse(),"beforeRouteLeave",i,m);for(const y of v)y.leaveGuards.forEach(A=>{h.push(B(A,i,m))});const R=nt.bind(null,i,m);return h.push(R),j(h).then(()=>{h=[];for(const y of c.list())h.push(B(y,i,m));return h.push(R),j(h)}).then(()=>{h=he(S,"beforeRouteUpdate",i,m);for(const y of S)y.updateGuards.forEach(A=>{h.push(B(A,i,m))});return h.push(R),j(h)}).then(()=>{h=[];for(const y of i.matched)if(y.beforeEnter&&!m.matched.includes(y))if(N(y.beforeEnter))for(const A of y.beforeEnter)h.push(B(A,i,m));else h.push(B(y.beforeEnter,i,m));return h.push(R),j(h)}).then(()=>(i.matched.forEach(y=>y.enterCallbacks={}),h=he(b,"beforeRouteEnter",i,m),h.push(R),j(h))).then(()=>{h=[];for(const y of d.list())h.push(B(y,i,m));return h.push(R),j(h)}).catch(y=>$(y,8)?y:Promise.reject(y))}function ye(i,m,h){for(const v of p.list())v(i,m,h)}function Ee(i,m,h,v,S){const b=O(i,m);if(b)return b;const R=m===T,y=q?history.state:{};h&&(v||R?o.replace(i.fullPath,w({scroll:R&&y&&y.scroll},S)):o.push(i.fullPath,S)),a.value=i,Pe(i,m,h,R),oe()}let U;function rt(){U||(U=o.listen((i,m,h)=>{if(!_e.listening)return;const v=_(i),S=I(v);if(S){D(w(S,{replace:!0}),v).catch(W);return}u=v;const b=a.value;q&&Nt(Ae(b.fullPath,h.delta),ee()),ve(v,b).catch(R=>$(R,12)?R:$(R,2)?(D(R.to,v).then(y=>{$(y,20)&&!h.delta&&h.type===X.pop&&o.go(-1,!1)}).catch(W),Promise.reject()):(h.delta&&o.go(-h.delta,!1),re(R,v,b))).then(R=>{R=R||Ee(v,b,!1),R&&(h.delta&&!$(R,8)?o.go(-h.delta,!1):h.type===X.pop&&$(R,20)&&o.go(-1,!1)),ye(v,b,R)}).catch(W)}))}let ne=Q(),Re=Q(),Z;function re(i,m,h){oe(i);const v=Re.list();return v.length?v.forEach(S=>S(i,m,h)):console.error(i),Promise.reject(i)}function ot(){return Z&&a.value!==T?Promise.resolve():new Promise((i,m)=>{ne.add([i,m])})}function oe(i){return Z||(Z=!i,rt(),ne.list().forEach(([m,h])=>i?h(i):m()),ne.reset()),i}function Pe(i,m,h,v){const{scrollBehavior:S}=e;if(!q||!S)return Promise.resolve();const b=!h&&It(Ae(i.fullPath,0))||(v||!h)&&history.state&&history.state.scroll||null;return ut().then(()=>S(i,m,b)).then(R=>R&&Mt(R)).catch(R=>re(R,i,m))}const se=i=>o.go(i);let ie;const ce=new Set,_e={currentRoute:a,listening:!0,addRoute:g,removeRoute:E,hasRoute:k,getRoutes:C,resolve:_,options:e,push:L,replace:H,go:se,back:()=>se(-1),forward:()=>se(1),beforeEach:c.add,beforeResolve:d.add,afterEach:p.add,onError:Re.add,isReady:ot,install(i){const m=this;i.component("RouterLink",yn),i.component("RouterView",_n),i.config.globalProperties.$router=m,Object.defineProperty(i.config.globalProperties,"$route",{enumerable:!0,get:()=>F(a)}),q&&!ie&&a.value===T&&(ie=!0,L(o.location).catch(S=>{}));const h={};for(const S in T)h[S]=M(()=>a.value[S]);i.provide(te,m),i.provide(tt,Ge(h)),i.provide(me,a);const v=i.unmount;ce.add(i),i.unmount=function(){ce.delete(i),ce.size<1&&(u=T,U&&U(),U=null,a.value=T,ie=!1,Z=!1),v()}}};return _e}function j(e){return e.reduce((t,n)=>t.then(()=>n()),Promise.resolve())}function Sn(e,t){const n=[],r=[],o=[],c=Math.max(t.matched.length,e.matched.length);for(let d=0;d<c;d++){const p=t.matched[d];p&&(e.matched.find(u=>G(u,p))?r.push(p):n.push(p));const a=e.matched[d];a&&(t.matched.find(u=>G(u,a))||o.push(a))}return[n,r,o]}function An(){return V(te)}const kn=[{path:"/",name:"Home",component:()=>le(()=>import("./Home.28315b69.js"),["assets/Home.28315b69.js","assets/Home.ecea4ff9.css","assets/core.365c9d25.js"])},{path:"/",name:"Level",component:()=>le(()=>import("./Level.cb289862.js"),["assets/Level.cb289862.js","assets/Level.66b716e8.css","assets/core.365c9d25.js","assets/index.4070831a.js"])},{path:"/",name:"Game",component:()=>le(()=>import("./Game.f2681326.js").then(e=>e.G),["assets/Game.f2681326.js","assets/Game.c0d935d1.css","assets/core.365c9d25.js","assets/index.4070831a.js"])}],Cn=wn({history:Ht("/"),routes:kn});dt(yt).use(Cn).mount("#app");export{pt as _,le as a,An as u};

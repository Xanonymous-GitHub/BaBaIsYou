!function(){function t(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},e(t)}function r(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var r=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null==r)return;var n,a,o=[],i=!0,c=!1;try{for(r=r.call(t);!(i=(n=r.next()).done)&&(o.push(n.value),!e||o.length!==e);i=!0);}catch(u){c=!0,a=u}finally{try{i||null==r["return"]||r["return"]()}finally{if(c)throw a}}return o}(t,e)||a(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function n(t,e){var r="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!r){if(Array.isArray(t)||(r=a(t))||e&&t&&"number"==typeof t.length){r&&(t=r);var n=0,o=function(){};return{s:o,n:function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,c=!0,u=!1;return{s:function(){r=r.call(t)},n:function(){var t=r.next();return c=t.done,t},e:function(t){u=!0,i=t},f:function(){try{c||null==r["return"]||r["return"]()}finally{if(u)throw i}}}}function a(t,e){if(t){if("string"==typeof t)return o(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?o(t,e):void 0}}function o(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}var i=document.createElement("style");i.innerHTML='html,body,#app{min-height:100vh;min-height:-webkit-fill-available;height:100%;-webkit-overflow-scrolling:touch;-moz-text-size-adjust:none;-ms-text-size-adjust:none;-webkit-text-size-adjust:none;overscroll-behavior:contain;-ms-scroll-chaining:none;margin:0;overflow:auto}*,:before,:after{-webkit-box-sizing:border-box;box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}*{--tw-ring-inset: var(--tw-empty, );--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgba(59, 130, 246, .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000}:root{-moz-tab-size:4;-o-tab-size:4;tab-size:4}:-moz-focusring{outline:1px dotted ButtonText}:-moz-ui-invalid{box-shadow:none}::moz-focus-inner{border-style:none;padding:0}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}abbr[title]{-webkit-text-decoration:underline dotted;text-decoration:underline dotted}a{color:inherit;text-decoration:inherit}body{margin:0;font-family:inherit;line-height:inherit}button{font-family:inherit;font-size:100%;line-height:1.15;margin:0;text-transform:none;background-color:transparent;background-image:none;padding:0;line-height:inherit;color:inherit}button,[type=button],[type=reset],[type=submit]{-webkit-appearance:button}button:focus{outline:1px dotted;outline:5px auto -webkit-focus-ring-color}button,[role=button]{cursor:pointer}html{-webkit-text-size-adjust:100%;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";line-height:1.5}img{border-style:solid;display:block;vertical-align:middle;max-width:100%;height:auto}p{margin:0}strong{font-weight:bolder}.container{width:100%}@media (min-width: 640px){.container{max-width:640px}}@media (min-width: 768px){.container{max-width:768px}}@media (min-width: 1024px){.container{max-width:1024px}}@media (min-width: 1280px){.container{max-width:1280px}}@media (min-width: 1536px){.container{max-width:1536px}}.bg-white{--tw-bg-opacity: 1;background-color:rgba(255,255,255,var(--tw-bg-opacity))}.bg-gray-900{--tw-bg-opacity: 1;background-color:rgba(17,24,39,var(--tw-bg-opacity))}.bg-green-500{--tw-bg-opacity: 1;background-color:rgba(16,185,129,var(--tw-bg-opacity))}.hover\\:bg-green-600:hover{--tw-bg-opacity: 1;background-color:rgba(5,150,105,var(--tw-bg-opacity))}.bg-\\[\\#080808\\]{--tw-bg-opacity: 1;background-color:rgba(8,8,8,var(--tw-bg-opacity))}.bg-red-600{--tw-bg-opacity: 1;background-color:rgba(220,38,38,var(--tw-bg-opacity))}.hover\\:bg-red-700:hover{--tw-bg-opacity: 1;background-color:rgba(185,28,28,var(--tw-bg-opacity))}.bg-blue-600{--tw-bg-opacity: 1;background-color:rgba(37,99,235,var(--tw-bg-opacity))}.hover\\:bg-blue-700:hover{--tw-bg-opacity: 1;background-color:rgba(29,78,216,var(--tw-bg-opacity))}.hover\\:bg-gray-400:hover{--tw-bg-opacity: 1;background-color:rgba(156,163,175,var(--tw-bg-opacity))}.rounded-lg{border-radius:.5rem}.cursor-default{cursor:default}.block{display:block}.flex{display:-webkit-box;display:-ms-flexbox;display:-webkit-flex;display:flex}.flex-col{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;-webkit-flex-direction:column;flex-direction:column}.items-center{-webkit-box-align:center;-ms-flex-align:center;-webkit-align-items:center;align-items:center}.self-center{-ms-flex-item-align:center;-ms-grid-row-align:center;-webkit-align-self:center;align-self:center}.justify-center{-webkit-box-pack:center;-ms-flex-pack:center;-webkit-justify-content:center;justify-content:center}.font-extrabold{font-weight:800}.font-semibold{font-weight:600}.h-full{height:100%}.h-screen{height:100vh}.h-auto{height:auto}.h-10{height:2.5rem}.h-50{height:12.5rem}.text-xl{font-size:1.25rem;line-height:1.75rem}.text-base{font-size:1rem;line-height:1.5rem}.my-30{margin-top:7.5rem;margin-bottom:7.5rem}.mx-auto{margin-left:auto;margin-right:auto}.my-10{margin-top:2.5rem;margin-bottom:2.5rem}.my-auto{margin-top:auto;margin-bottom:auto}.max-w-full{max-width:100%}.opacity-95{opacity:.95}.opacity-100{opacity:1}.opacity-65{opacity:.65}.opacity-70{opacity:.7}.focus\\:outline-none:focus{outline:2px solid transparent;outline-offset:2px}.py-1{padding-top:.25rem;padding-bottom:.25rem}.px-2{padding-left:.5rem;padding-right:.5rem}.static{position:static}.fixed{position:fixed}.absolute{position:absolute}.relative{position:relative}.top-\\[30\\%\\]{top:30%}.top-15\\/100{top:15%}.bottom-5{bottom:1.25rem}.shadow-md{--tw-shadow-color: 0, 0, 0;--tw-shadow: 0 4px 6px -1px rgba(var(--tw-shadow-color), .1), 0 2px 4px -1px rgba(var(--tw-shadow-color), .06);-webkit-box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.focus\\:ring-2:focus{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);-webkit-box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}.focus\\:ring-offset-blue-200:focus{--tw-ring-offset-opacity: 1;--tw-ring-offset-color: rgba(191, 219, 254, var(--tw-ring-offset-opacity))}.focus\\:ring-offset-red-200:focus{--tw-ring-offset-opacity: 1;--tw-ring-offset-color: rgba(254, 202, 202, var(--tw-ring-offset-opacity))}.focus\\:ring-offset-2:focus{--tw-ring-offset-width: 2px}.focus\\:ring-green-500:focus{--tw-ring-opacity: 1;--tw-ring-color: rgba(16, 185, 129, var(--tw-ring-opacity))}.focus\\:ring-red-500:focus{--tw-ring-opacity: 1;--tw-ring-color: rgba(239, 68, 68, var(--tw-ring-opacity))}.focus\\:ring-blue-500:focus{--tw-ring-opacity: 1;--tw-ring-color: rgba(59, 130, 246, var(--tw-ring-opacity))}.text-center{text-align:center}.text-white{--tw-text-opacity: 1;color:rgba(255,255,255,var(--tw-text-opacity))}.text-black{--tw-text-opacity: 1;color:rgba(0,0,0,var(--tw-text-opacity))}.select-none{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.w-full{width:100%}.w-10\\/12{width:83.333333%}.w-4\\/5{width:80%}.w-60{width:15rem}.w-70{width:17.5rem}.w-30{width:7.5rem}.w-45{width:11.25rem}.z-30{z-index:30}.z-20{z-index:20}.transform{--tw-rotate: 0;--tw-rotate-x: 0;--tw-rotate-y: 0;--tw-rotate-z: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-scale-z: 1;--tw-skew-x: 0;--tw-skew-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-translate-z: 0;-webkit-transform:rotate(var(--tw-rotate)) rotateX(var(--tw-rotate-x)) rotateY(var(--tw-rotate-y)) rotateZ(var(--tw-rotate-z)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)) scaleZ(var(--tw-scale-z)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y)) translateZ(var(--tw-translate-z));-ms-transform:rotate(var(--tw-rotate)) rotateX(var(--tw-rotate-x)) rotateY(var(--tw-rotate-y)) rotateZ(var(--tw-rotate-z)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)) scaleZ(var(--tw-scale-z)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y)) translateZ(var(--tw-translate-z));transform:rotate(var(--tw-rotate)) rotateX(var(--tw-rotate-x)) rotateY(var(--tw-rotate-y)) rotate(var(--tw-rotate-z)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)) scaleZ(var(--tw-scale-z)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) translate(var(--tw-translate-x)) translateY(var(--tw-translate-y)) translateZ(var(--tw-translate-z))}.transform-gpu{--tw-rotate: 0;--tw-rotate-x: 0;--tw-rotate-y: 0;--tw-rotate-z: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-scale-z: 1;--tw-skew-x: 0;--tw-skew-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-translate-z: 0;-webkit-transform:rotate(var(--tw-rotate)) rotateX(var(--tw-rotate-x)) rotateY(var(--tw-rotate-y)) rotateZ(var(--tw-rotate-z)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)) scaleZ(var(--tw-scale-z)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) translate3d(var(--tw-translate-x),var(--tw-translate-y),var(--tw-translate-z));-ms-transform:rotate(var(--tw-rotate)) rotateX(var(--tw-rotate-x)) rotateY(var(--tw-rotate-y)) rotateZ(var(--tw-rotate-z)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)) scaleZ(var(--tw-scale-z)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) translate3d(var(--tw-translate-x),var(--tw-translate-y),var(--tw-translate-z));transform:rotate(var(--tw-rotate)) rotateX(var(--tw-rotate-x)) rotateY(var(--tw-rotate-y)) rotate(var(--tw-rotate-z)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)) scaleZ(var(--tw-scale-z)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) translate3d(var(--tw-translate-x),var(--tw-translate-y),var(--tw-translate-z))}.transition{-webkit-transition-property:background-color,border-color,color,fill,stroke,opacity,-webkit-box-shadow,-webkit-transform,filter,backdrop-filter;-o-transition-property:background-color,border-color,color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;transition-property:background-color,border-color,color,fill,stroke,opacity,box-shadow,-webkit-box-shadow,transform,-webkit-transform,filter,backdrop-filter;-webkit-transition-timing-function:cubic-bezier(.4,0,.2,1);-o-transition-timing-function:cubic-bezier(.4,0,.2,1);transition-timing-function:cubic-bezier(.4,0,.2,1);-webkit-transition-duration:.15s;-o-transition-duration:.15s;transition-duration:.15s}.ease-in{-webkit-transition-timing-function:cubic-bezier(.4,0,1,1);-o-transition-timing-function:cubic-bezier(.4,0,1,1);transition-timing-function:cubic-bezier(.4,0,1,1)}.duration-200{-webkit-transition-duration:.2s;-o-transition-duration:.2s;transition-duration:.2s}@keyframes pulse{0%,to{opacity:1}50%{opacity:.5}}@-webkit-keyframes pulse{0%,to{opacity:1}50%{opacity:.5}}@keyframes bounce{0%,to{-webkit-transform:translateY(-25%);transform:translateY(-25%);-webkit-animation-timing-function:cubic-bezier(.8,0,1,1);animation-timing-function:cubic-bezier(.8,0,1,1)}50%{-webkit-transform:translateY(0);transform:translateY(0);-webkit-animation-timing-function:cubic-bezier(0,0,.2,1);animation-timing-function:cubic-bezier(0,0,.2,1)}}@-webkit-keyframes bounce{0%,to{-webkit-transform:translateY(-25%);transform:translateY(-25%);-webkit-animation-timing-function:cubic-bezier(.8,0,1,1);animation-timing-function:cubic-bezier(.8,0,1,1)}50%{-webkit-transform:translateY(0);transform:translateY(0);-webkit-animation-timing-function:cubic-bezier(0,0,.2,1);animation-timing-function:cubic-bezier(0,0,.2,1)}}.animate-pulse{-webkit-animation:pulse 2s cubic-bezier(.4,0,.6,1) infinite;animation:pulse 2s cubic-bezier(.4,0,.6,1) infinite}.animate-bounce{-webkit-animation:bounce 1s infinite;animation:bounce 1s infinite}.animate{-webkit-animation-iteration-count:1;animation-iteration-count:1}.invert,.\\.invert{--tw-invert: invert(100%)}@media (min-width: 640px){.sm\\:py-2{padding-top:.5rem;padding-bottom:.5rem}.sm\\:px-4{padding-left:1rem;padding-right:1rem}.sm\\:w-60{width:15rem}.sm\\:w-9\\/12{width:75%}.sm\\:w-40{width:10rem}}@media (min-width: 768px){.md\\:text-3xl{font-size:1.875rem;line-height:2.25rem}}@media (min-width: 1024px){.lg\\:w-8\\/12{width:66.666667%}}@media (min-width: 1280px){.xl\\:w-7\\/12{width:58.333333%}}@media (min-width: 1536px){.\\32xl\\:w-6\\/12{width:50%}}#--unocss--{layer:__ALL__}\n',document.head.appendChild(i),System.register(["./core-legacy.e2e55cc4.js"],(function(a,o){"use strict";var i,c,u,l,s,f,d,p,v,h,w,m,g,b,y,x,k,z;return{setters:[function(t){i=t.r,c=t.o,u=t.c,l=t.w,s=t.a,f=t.b,d=t.s,p=t.u,v=t.d,h=t.e,w=t.i,m=t.n,g=t.f,b=t.h,y=t.p,x=t.g,k=t.j,z=t.k}],execute:function(){a("u",(function(){return w(C)}));var E=a("_",(function(t,e){var a,o=n(e);try{for(o.s();!(a=o.n()).done;){var i=r(a.value,2),c=i[0],u=i[1];t[c]=u}}catch(l){o.e(l)}finally{o.f()}return t})),A=["id"];var S=E({},[["render",function(t,e){var r=i("router-view");return c(),u(r,null,{"default":l((function(t){var e=t.Component,r=t.route;return[s("main",{id:r.name,"class":"h-full bg-white"},[(c(),u(f(e)))],8,A)]})),_:1})}]]),j=a("a",(function(t,e){return t()})),R="function"==typeof Symbol&&"symbol"===e(Symbol.toStringTag),O=function(t){return R?Symbol(t):"_vr_"+t},Y=O("rvlm"),P=O("rvd"),C=O("r"),X=O("rl"),L=O("rvl"),_="undefined"!=typeof window;var q=Object.assign;function I(t,e){var r={};for(var n in e){var a=e[n];r[n]=Array.isArray(a)?a.map(t):t(a)}return r}var Z,B,G=function(){},M=/\/$/;function T(t,e){var r,n=arguments.length>2&&arguments[2]!==undefined?arguments[2]:"/",a={},o="",i="",c=e.indexOf("?"),u=e.indexOf("#",c>-1?c:0);return c>-1&&(r=e.slice(0,c),a=t(o=e.slice(c+1,u>-1?u:e.length))),u>-1&&(r=r||e.slice(0,u),i=e.slice(u,e.length)),{fullPath:(r=D(null!=r?r:e,n))+(o&&"?")+o+i,path:r,query:a,hash:i}}function U(t,e){return e&&t.toLowerCase().startsWith(e.toLowerCase())?t.slice(e.length)||"/":t}function $(t,e){return(t.aliasOf||t)===(e.aliasOf||e)}function F(t,e){if(Object.keys(t).length!==Object.keys(e).length)return!1;for(var r in t)if(!H(t[r],e[r]))return!1;return!0}function H(t,e){return Array.isArray(t)?W(t,e):Array.isArray(e)?W(e,t):t===e}function W(t,e){return Array.isArray(e)?t.length===e.length&&t.every((function(t,r){return t===e[r]})):1===t.length&&t[0]===e}function D(t,e){if(t.startsWith("/"))return t;if(!t)return e;var r,n,a=e.split("/"),o=t.split("/"),i=a.length-1;for(r=0;r<o.length;r++)if(n=o[r],1!==i&&"."!==n){if(".."!==n)break;i--}return a.slice(0,i).join("/")+"/"+o.slice(r-(r===o.length?1:0)).join("/")}function V(t){if(!t)if(_){var e=document.querySelector("base");t=(t=e&&e.getAttribute("href")||"/").replace(/^\w+:\/\/[^\/]+/,"")}else t="/";return"/"!==t[0]&&"#"!==t[0]&&(t="/"+t),t.replace(M,"")}!function(t){t.pop="pop",t.push="push"}(Z||(Z={})),function(t){t.back="back",t.forward="forward",t.unknown=""}(B||(B={}));var K=/^[^#]+#/;function N(t,e){return t.replace(K,"#")+e}var Q=function(){return{left:window.pageXOffset,top:window.pageYOffset}};function J(t){var e;if("el"in t){var r=t.el,n="string"==typeof r&&r.startsWith("#"),a="string"==typeof r?n?document.getElementById(r.slice(1)):document.querySelector(r):r;if(!a)return;e=function(t,e){var r=document.documentElement.getBoundingClientRect(),n=t.getBoundingClientRect();return{behavior:e.behavior,left:n.left-r.left-(e.left||0),top:n.top-r.top-(e.top||0)}}(a,t)}else e=t;"scrollBehavior"in document.documentElement.style?window.scrollTo(e):window.scrollTo(null!=e.left?e.left:window.pageXOffset,null!=e.top?e.top:window.pageYOffset)}function tt(t,e){return(history.state?history.state.position-e:-1)+t}var et=new Map;var rt=function(){return location.protocol+"//"+location.host};function nt(t,e){var r=e.pathname,n=e.search,a=e.hash,o=t.indexOf("#");if(o>-1){var i=a.includes(t.slice(o))?t.slice(o).length:1,c=a.slice(i);return"/"!==c[0]&&(c="/"+c),U(c,"")}return U(r,t)+n+a}function at(t,e,r){var n=arguments.length>3&&arguments[3]!==undefined&&arguments[3],a=arguments.length>4&&arguments[4]!==undefined&&arguments[4];return{back:t,current:e,forward:r,replaced:n,position:window.history.length,scroll:a?Q():null}}function ot(t){return"string"==typeof t||"symbol"===e(t)}var it,ct={path:"/",name:undefined,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:undefined},ut=O("nf");function lt(e,r){return q(new Error,t({type:e},ut,!0),r)}function st(t,e){return t instanceof Error&&ut in t&&(null==e||!!(t.type&e))}!function(t){t[t.aborted=4]="aborted",t[t.cancelled=8]="cancelled",t[t.duplicated=16]="duplicated"}(it||(it={}));var ft="[^/]+?",dt={sensitive:!1,strict:!1,start:!0,end:!0},pt=/[.+*?^${}()[\]/\\]/g;function vt(t,e){for(var r=0;r<t.length&&r<e.length;){var n=e[r]-t[r];if(n)return n;r++}return t.length<e.length?1===t.length&&80===t[0]?-1:1:t.length>e.length?1===e.length&&80===e[0]?1:-1:0}function ht(t,e){for(var r=0,n=t.score,a=e.score;r<n.length&&r<a.length;){var o=vt(n[r],a[r]);if(o)return o;r++}return a.length-n.length}var wt={type:0,value:""},mt=/[a-zA-Z0-9_]/;function gt(t,e,r){var a=function(t,e){var r,a=q({},dt,e),o=[],i=a.start?"^":"",c=[],u=n(t);try{for(u.s();!(r=u.n()).done;){var l=r.value,s=l.length?[]:[90];a.strict&&!l.length&&(i+="/");for(var f=0;f<l.length;f++){var d=l[f],p=40+(a.sensitive?.25:0);if(0===d.type)f||(i+="/"),i+=d.value.replace(pt,"\\$&"),p+=40;else if(1===d.type){var v=d.value,h=d.repeatable,w=d.optional,m=d.regexp;c.push({name:v,repeatable:h,optional:w});var g=m||ft;if(g!==ft){p+=10;try{new RegExp("(".concat(g,")"))}catch(k){throw new Error('Invalid custom RegExp for param "'.concat(v,'" (').concat(g,"): ")+k.message)}}var b=h?"((?:".concat(g,")(?:/(?:").concat(g,"))*)"):"(".concat(g,")");f||(b=w&&l.length<2?"(?:/".concat(b,")"):"/"+b),w&&(b+="?"),i+=b,p+=20,w&&(p+=-8),h&&(p+=-20),".*"===g&&(p+=-50)}s.push(p)}o.push(s)}}catch(k){u.e(k)}finally{u.f()}if(a.strict&&a.end){var y=o.length-1;o[y][o[y].length-1]+=.7000000000000001}a.strict||(i+="/?"),a.end?i+="$":a.strict&&(i+="(?:/|$)");var x=new RegExp(i,a.sensitive?"":"i");return{re:x,score:o,keys:c,parse:function(t){var e=t.match(x),r={};if(!e)return null;for(var n=1;n<e.length;n++){var a=e[n]||"",o=c[n-1];r[o.name]=a&&o.repeatable?a.split("/"):a}return r},stringify:function(e){var r,a="",o=!1,i=n(t);try{for(i.s();!(r=i.n()).done;){var c=r.value;o&&a.endsWith("/")||(a+="/"),o=!1;var u,l=n(c);try{for(l.s();!(u=l.n()).done;){var s=u.value;if(0===s.type)a+=s.value;else if(1===s.type){var f=s.value,d=s.repeatable,p=s.optional,v=f in e?e[f]:"";if(Array.isArray(v)&&!d)throw new Error('Provided param "'.concat(f,'" is an array but it is not repeatable (* or + modifiers)'));var h=Array.isArray(v)?v.join("/"):v;if(!h){if(!p)throw new Error('Missing required param "'.concat(f,'"'));c.length<2&&(a.endsWith("/")?a=a.slice(0,-1):o=!0)}a+=h}}}catch(k){l.e(k)}finally{l.f()}}}catch(k){i.e(k)}finally{i.f()}return a}}}(function(t){if(!t)return[[]];if("/"===t)return[[wt]];if(!t.startsWith("/"))throw new Error('Invalid path "'.concat(t,'"'));function e(t){throw new Error("ERR (".concat(n,')/"').concat(l,'": ').concat(t))}var r,n=0,a=n,o=[];function i(){r&&o.push(r),r=[]}var c,u=0,l="",s="";function f(){l&&(0===n?r.push({type:0,value:l}):1===n||2===n||3===n?(r.length>1&&("*"===c||"+"===c)&&e("A repeatable param (".concat(l,") must be alone in its segment. eg: '/:ids+.")),r.push({type:1,value:l,regexp:s,repeatable:"*"===c||"+"===c,optional:"*"===c||"?"===c})):e("Invalid state to consume buffer"),l="")}function d(){l+=c}for(;u<t.length;)if("\\"!==(c=t[u++])||2===n)switch(n){case 0:"/"===c?(l&&f(),i()):":"===c?(f(),n=1):d();break;case 4:d(),n=a;break;case 1:"("===c?n=2:mt.test(c)?d():(f(),n=0,"*"!==c&&"?"!==c&&"+"!==c&&u--);break;case 2:")"===c?"\\"==s[s.length-1]?s=s.slice(0,-1)+c:n=3:s+=c;break;case 3:f(),n=0,"*"!==c&&"?"!==c&&"+"!==c&&u--,s="";break;default:e("Unknown state")}else a=n,n=4;return 2===n&&e('Unfinished custom RegExp for param "'.concat(l,'"')),f(),i(),o}(t.path),r),o=q(a,{record:t,parent:e,children:[],alias:[]});return e&&!o.record.aliasOf==!e.record.aliasOf&&e.children.push(o),o}function bt(t,e){var r=[],a=new Map;function o(t,r,a){var u=!a,l=function(t){return{path:t.path,redirect:t.redirect,name:t.name,meta:t.meta||{},aliasOf:undefined,beforeEnter:t.beforeEnter,props:yt(t),children:t.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in t?t.components||{}:{"default":t.component}}}(t);l.aliasOf=a&&a.record;var s,f,d=zt(e,t),p=[l];if("alias"in t){var v,h=n("string"==typeof t.alias?[t.alias]:t.alias);try{for(h.s();!(v=h.n()).done;){var w=v.value;p.push(q({},l,{components:a?a.record.components:l.components,path:w,aliasOf:a?a.record:l}))}}catch(A){h.e(A)}finally{h.f()}}for(var m=0,g=p;m<g.length;m++){var b=g[m],y=b.path;if(r&&"/"!==y[0]){var x=r.record.path,k="/"===x[x.length-1]?"":"/";b.path=r.record.path+(y&&k+y)}if(s=gt(b,r,d),a?a.alias.push(s):((f=f||s)!==s&&f.alias.push(s),u&&t.name&&!xt(s)&&i(t.name)),"children"in l)for(var z=l.children,E=0;E<z.length;E++)o(z[E],s,a&&a.children[E]);a=a||s,c(s)}return f?function(){i(f)}:G}function i(t){if(ot(t)){var e=a.get(t);e&&(a["delete"](t),r.splice(r.indexOf(e),1),e.children.forEach(i),e.alias.forEach(i))}else{var n=r.indexOf(t);n>-1&&(r.splice(n,1),t.record.name&&a["delete"](t.record.name),t.children.forEach(i),t.alias.forEach(i))}}function c(t){for(var e=0;e<r.length&&ht(t,r[e])>=0;)e++;r.splice(e,0,t),t.record.name&&!xt(t)&&a.set(t.record.name,t)}return e=zt({strict:!1,end:!0,sensitive:!1},e),t.forEach((function(t){return o(t)})),{addRoute:o,resolve:function(t,e){var o,i,c,u={};if("name"in t&&t.name){if(!(o=a.get(t.name)))throw lt(1,{location:t});c=o.record.name,u=q(function(t,e){var r,a={},o=n(e);try{for(o.s();!(r=o.n()).done;){var i=r.value;i in t&&(a[i]=t[i])}}catch(c){o.e(c)}finally{o.f()}return a}(e.params,o.keys.filter((function(t){return!t.optional})).map((function(t){return t.name}))),t.params),i=o.stringify(u)}else if("path"in t)i=t.path,(o=r.find((function(t){return t.re.test(i)})))&&(u=o.parse(i),c=o.record.name);else{if(!(o=e.name?a.get(e.name):r.find((function(t){return t.re.test(e.path)}))))throw lt(1,{location:t,currentLocation:e});c=o.record.name,u=q({},e.params,t.params),i=o.stringify(u)}for(var l=[],s=o;s;)l.unshift(s.record),s=s.parent;return{name:c,path:i,params:u,matched:l,meta:kt(l)}},removeRoute:i,getRoutes:function(){return r},getRecordMatcher:function(t){return a.get(t)}}}function yt(t){var e={},r=t.props||!1;if("component"in t)e["default"]=r;else for(var n in t.components)e[n]="boolean"==typeof r?r:r[n];return e}function xt(t){for(;t;){if(t.record.aliasOf)return!0;t=t.parent}return!1}function kt(t){return t.reduce((function(t,e){return q(t,e.meta)}),{})}function zt(t,e){var r={};for(var n in t)r[n]=n in e?e[n]:t[n];return r}var Et=/#/g,At=/&/g,St=/\//g,jt=/=/g,Rt=/\?/g,Ot=/\+/g,Yt=/%5B/g,Pt=/%5D/g,Ct=/%5E/g,Xt=/%60/g,Lt=/%7B/g,_t=/%7C/g,qt=/%7D/g,It=/%20/g;function Zt(t){return encodeURI(""+t).replace(_t,"|").replace(Yt,"[").replace(Pt,"]")}function Bt(t){return Zt(t).replace(Ot,"%2B").replace(It,"+").replace(Et,"%23").replace(At,"%26").replace(Xt,"`").replace(Lt,"{").replace(qt,"}").replace(Ct,"^")}function Gt(t){return null==t?"":function(t){return Zt(t).replace(Et,"%23").replace(Rt,"%3F")}(t).replace(St,"%2F")}function Mt(t){try{return decodeURIComponent(""+t)}catch(e){}return""+t}function Tt(t){var e={};if(""===t||"?"===t)return e;for(var r=("?"===t[0]?t.slice(1):t).split("&"),n=0;n<r.length;++n){var a=r[n].replace(Ot," "),o=a.indexOf("="),i=Mt(o<0?a:a.slice(0,o)),c=o<0?null:Mt(a.slice(o+1));if(i in e){var u=e[i];Array.isArray(u)||(u=e[i]=[u]),u.push(c)}else e[i]=c}return e}function Ut(t){var e="",r=function(r){var a=t[r];if(r=Bt(r).replace(jt,"%3D"),null==a)return a!==undefined&&(e+=(e.length?"&":"")+r),n=r,"continue";(Array.isArray(a)?a.map((function(t){return t&&Bt(t)})):[a&&Bt(a)]).forEach((function(t){t!==undefined&&(e+=(e.length?"&":"")+r,null!=t&&(e+="="+t))})),n=r};for(var n in t)r(n);return e}function $t(t){var e={};for(var r in t){var n=t[r];n!==undefined&&(e[r]=Array.isArray(n)?n.map((function(t){return null==t?null:""+t})):null==n?n:""+n)}return e}function Ft(){var t=[];return{add:function(e){return t.push(e),function(){var r=t.indexOf(e);r>-1&&t.splice(r,1)}},list:function(){return t},reset:function(){t=[]}}}function Ht(t,r,n,a,o){var i=a&&(a.enterCallbacks[o]=a.enterCallbacks[o]||[]);return function(){return new Promise((function(c,u){var l=function(t){var l;!1===t?u(lt(4,{from:n,to:r})):t instanceof Error?u(t):"string"==typeof(l=t)||l&&"object"===e(l)?u(lt(2,{from:r,to:t})):(i&&a.enterCallbacks[o]===i&&"function"==typeof t&&i.push(t),c())},s=t.call(a&&a.instances[o],r,n,l),f=Promise.resolve(s);t.length<3&&(f=f.then(l)),f["catch"]((function(t){return u(t)}))}))}}function Wt(t,r,a,o){var i,c=[],u=n(t);try{var l=function(){var t=i.value,n=function(n){var i,u=t.components[n];if("beforeRouteEnter"!==r&&!t.instances[n])return"continue";if("object"===e(i=u)||"displayName"in i||"props"in i||"__vccOpts"in i){var l=(u.__vccOpts||u)[r];l&&c.push(Ht(l,a,o,t,n))}else{var s=u();c.push((function(){return s.then((function(e){if(!e)return Promise.reject(new Error("Couldn't resolve component \"".concat(n,'" at "').concat(t.path,'"')));var i,c=(i=e).__esModule||R&&"Module"===i[Symbol.toStringTag]?e["default"]:e;t.components[n]=c;var u=(c.__vccOpts||c)[r];return u&&Ht(u,a,o,t,n)()}))}))}};for(var u in t.components)n(u)};for(u.s();!(i=u.n()).done;)l()}catch(s){u.e(s)}finally{u.f()}return c}function Dt(t){var r=w(C),n=w(X),a=v((function(){return r.resolve(p(t.to))})),o=v((function(){var t=a.value.matched,e=t.length,r=t[e-1],o=n.matched;if(!r||!o.length)return-1;var i=o.findIndex($.bind(null,r));if(i>-1)return i;var c=Nt(t[e-2]);return e>1&&Nt(r)===c&&o[o.length-1].path!==c?o.findIndex($.bind(null,t[e-2])):i})),i=v((function(){return o.value>-1&&function(t,r){var n=function(e){var n=r[e],a=t[e];if("string"==typeof n){if(n!==a)return{v:!1}}else if(!Array.isArray(a)||a.length!==n.length||n.some((function(t,e){return t!==a[e]})))return{v:!1}};for(var a in r){var o=n(a);if("object"===e(o))return o.v}return!0}(n.params,a.value.params)})),c=v((function(){return o.value>-1&&o.value===n.matched.length-1&&F(n.params,a.value.params)}));return{route:a,href:v((function(){return a.value.href})),isActive:i,isExactActive:c,navigate:function(){var e=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};return Kt(e)?r[p(t.replace)?"replace":"push"](p(t.to))["catch"](G):Promise.resolve()}}}var Vt=g({name:"RouterLink",props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,"default":"page"}},useLink:Dt,setup:function(e,r){var n=r.slots,a=h(Dt(e)),o=w(C).options,i=v((function(){var r;return t(r={},Qt(e.activeClass,o.linkActiveClass,"router-link-active"),a.isActive),t(r,Qt(e.exactActiveClass,o.linkExactActiveClass,"router-link-exact-active"),a.isExactActive),r}));return function(){var t=n["default"]&&n["default"](a);return e.custom?t:b("a",{"aria-current":a.isExactActive?e.ariaCurrentValue:null,href:a.href,onClick:a.navigate,"class":i.value},t)}}});function Kt(t){if(!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey||t.defaultPrevented||t.button!==undefined&&0!==t.button)){if(t.currentTarget&&t.currentTarget.getAttribute){var e=t.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(e))return}return t.preventDefault&&t.preventDefault(),!0}}function Nt(t){return t?t.aliasOf?t.aliasOf.path:t.path:""}var Qt=function(t,e,r){return null!=t?t:null!=e?e:r};function Jt(t,e){if(!t)return null;var r=t(e);return 1===r.length?r[0]:r}var te=g({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,"default":"default"},route:Object},setup:function(t,e){var n=e.attrs,a=e.slots,o=w(L),i=v((function(){return t.route||o.value})),c=w(P,0),u=v((function(){return i.value.matched[c]}));y(P,c+1),y(Y,u),y(L,i);var l=x();return k((function(){return[l.value,u.value,t.name]}),(function(t,e){var n=r(t,3),a=n[0],o=n[1],i=n[2],c=r(e,3),u=c[0],l=c[1];c[2];o&&(o.instances[i]=a,l&&l!==o&&a&&a===u&&(o.leaveGuards.size||(o.leaveGuards=l.leaveGuards),o.updateGuards.size||(o.updateGuards=l.updateGuards))),!a||!o||l&&$(o,l)&&u||(o.enterCallbacks[i]||[]).forEach((function(t){return t(a)}))}),{flush:"post"}),function(){var e=i.value,r=u.value,o=r&&r.components[t.name],c=t.name;if(!o)return Jt(a["default"],{Component:o,route:e});var s=r.props[t.name],f=s?!0===s?e.params:"function"==typeof s?s(e):s:null,d=b(o,q({},f,n,{onVnodeUnmounted:function(t){t.component.isUnmounted&&(r.instances[c]=null)},ref:l}));return Jt(a["default"],{Component:d,route:e})||d}}});function ee(t){return t.reduce((function(t,e){return t.then((function(){return e()}))}),Promise.resolve())}var re=[{path:"/",name:"Home",component:function(){return j((function(){return o["import"]("./Home-legacy.636903ab.js")}),void 0)}},{path:"/",name:"Level",component:function(){return j((function(){return o["import"]("./Level-legacy.239e458c.js")}),void 0)}},{path:"/",name:"Game",component:function(){return j((function(){return o["import"]("./Game-legacy.d3d31aa8.js").then((function(t){return t.G}))}),void 0)}}],ne=function(t){var e=bt(t.routes,t),a=t.parseQuery||Tt,o=t.stringifyQuery||Ut,i=t.history,c=Ft(),u=Ft(),l=Ft(),s=d(ct),f=ct;_&&t.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");var w,g=I.bind(null,(function(t){return""+t})),b=I.bind(null,Gt),y=I.bind(null,Mt);function x(t,r){if(r=q({},r||s.value),"string"==typeof t){var n=T(a,t,r.path),c=e.resolve({path:n.path},r),u=i.createHref(n.fullPath);return q(n,c,{params:y(c.params),hash:Mt(n.hash),redirectedFrom:undefined,href:u})}var l;if("path"in t)l=q({},t,{path:T(a,t.path,r.path).path});else{var f=q({},t.params);for(var d in f)null==f[d]&&delete f[d];l=q({},t,{params:b(t.params)}),r.params=b(r.params)}var p=e.resolve(l,r),v=t.hash||"";p.params=g(y(p.params));var h,w=function(t,e){var r=e.query?t(e.query):"";return e.path+(r&&"?")+r+(e.hash||"")}(o,q({},t,{hash:(h=v,Zt(h).replace(Lt,"{").replace(qt,"}").replace(Ct,"^")),path:p.path})),m=i.createHref(w);return q({fullPath:w,hash:v,query:o===Ut?$t(t.query):t.query||{}},p,{redirectedFrom:undefined,href:m})}function k(t){return"string"==typeof t?T(a,t,s.value.path):q({},t)}function z(t,e){if(f!==t)return lt(8,{from:e,to:t})}function E(t){return S(t)}function A(t){var e=t.matched[t.matched.length-1];if(e&&e.redirect){var r=e.redirect,n="function"==typeof r?r(t):r;return"string"==typeof n&&((n=n.includes("?")||n.includes("#")?n=k(n):{path:n}).params={}),q({query:t.query,hash:t.hash,params:t.params},n)}}function S(t,e){var r=f=x(t),n=s.value,a=t.state,i=t.force,c=!0===t.replace,u=A(r);if(u)return S(q(k(u),{state:a,force:i,replace:c}),e||r);var l,d=r;return d.redirectedFrom=e,!i&&function(t,e,r){var n=e.matched.length-1,a=r.matched.length-1;return n>-1&&n===a&&$(e.matched[n],r.matched[a])&&F(e.params,r.params)&&t(e.query)===t(r.query)&&e.hash===r.hash}(o,n,r)&&(l=lt(16,{to:d,from:n}),D(n,n,!0,!1)),(l?Promise.resolve(l):R(d,n))["catch"]((function(t){return st(t)?t:H(t,d,n)})).then((function(t){if(t){if(st(t,2))return S(q(k(t.to),{state:a,force:i,replace:c}),e||d)}else t=Y(d,n,!0,c,a);return O(d,n,t),t}))}function j(t,e){var r=z(t,e);return r?Promise.reject(r):Promise.resolve()}function R(t,e){var a,o=function(t,e){for(var r=[],n=[],a=[],o=Math.max(e.matched.length,t.matched.length),i=function(o){var i=e.matched[o];i&&(t.matched.find((function(t){return $(t,i)}))?n.push(i):r.push(i));var c=t.matched[o];c&&(e.matched.find((function(t){return $(t,c)}))||a.push(c))},c=0;c<o;c++)i(c);return[r,n,a]}(t,e),i=r(o,3),l=i[0],s=i[1],f=i[2];a=Wt(l.reverse(),"beforeRouteLeave",t,e);var d,p=n(l);try{for(p.s();!(d=p.n()).done;){d.value.leaveGuards.forEach((function(r){a.push(Ht(r,t,e))}))}}catch(h){p.e(h)}finally{p.f()}var v=j.bind(null,t,e);return a.push(v),ee(a).then((function(){a=[];var r,o=n(c.list());try{for(o.s();!(r=o.n()).done;){var i=r.value;a.push(Ht(i,t,e))}}catch(h){o.e(h)}finally{o.f()}return a.push(v),ee(a)})).then((function(){a=Wt(s,"beforeRouteUpdate",t,e);var r,o=n(s);try{for(o.s();!(r=o.n()).done;){r.value.updateGuards.forEach((function(r){a.push(Ht(r,t,e))}))}}catch(h){o.e(h)}finally{o.f()}return a.push(v),ee(a)})).then((function(){a=[];var r,o=n(t.matched);try{for(o.s();!(r=o.n()).done;){var i=r.value;if(i.beforeEnter&&!e.matched.includes(i))if(Array.isArray(i.beforeEnter)){var c,u=n(i.beforeEnter);try{for(u.s();!(c=u.n()).done;){var l=c.value;a.push(Ht(l,t,e))}}catch(h){u.e(h)}finally{u.f()}}else a.push(Ht(i.beforeEnter,t,e))}}catch(h){o.e(h)}finally{o.f()}return a.push(v),ee(a)})).then((function(){return t.matched.forEach((function(t){return t.enterCallbacks={}})),(a=Wt(f,"beforeRouteEnter",t,e)).push(v),ee(a)})).then((function(){a=[];var r,o=n(u.list());try{for(o.s();!(r=o.n()).done;){var i=r.value;a.push(Ht(i,t,e))}}catch(h){o.e(h)}finally{o.f()}return a.push(v),ee(a)}))["catch"]((function(t){return st(t,8)?t:Promise.reject(t)}))}function O(t,e,r){var a,o=n(l.list());try{for(o.s();!(a=o.n()).done;){(0,a.value)(t,e,r)}}catch(i){o.e(i)}finally{o.f()}}function Y(t,e,r,n,a){var o=z(t,e);if(o)return o;var c=e===ct,u=_?history.state:{};r&&(n||c?i.replace(t.fullPath,q({scroll:c&&u&&u.scroll},a)):i.push(t.fullPath,a)),s.value=t,D(t,e,r,c),W()}function P(){w=i.listen((function(t,e,r){var n=x(t),a=A(n);if(a)S(q(a,{replace:!0}),n)["catch"](G);else{f=n;var o,c,u=s.value;_&&(o=tt(u.fullPath,r.delta),c=Q(),et.set(o,c)),R(n,u)["catch"]((function(t){return st(t,12)?t:st(t,2)?(S(t.to,n).then((function(t){st(t,20)&&!r.delta&&r.type===Z.pop&&i.go(-1,!1)}))["catch"](G),Promise.reject()):(r.delta&&i.go(-r.delta,!1),H(t,n,u))})).then((function(t){(t=t||Y(n,u,!1))&&(r.delta?i.go(-r.delta,!1):r.type===Z.pop&&st(t,20)&&i.go(-1,!1)),O(n,u,t)}))["catch"](G)}}))}var B,M=Ft(),U=Ft();function H(t,e,r){W(t);var n=U.list();return n.length?n.forEach((function(n){return n(t,e,r)})):console.error(t),Promise.reject(t)}function W(t){B||(B=!0,P(),M.list().forEach((function(e){var n=r(e,2),a=n[0],o=n[1];return t?o(t):a()})),M.reset())}function D(e,r,n,a){var o=t.scrollBehavior;if(!_||!o)return Promise.resolve();var i,c,u=!n&&(i=tt(e.fullPath,0),c=et.get(i),et["delete"](i),c)||(a||!n)&&history.state&&history.state.scroll||null;return m().then((function(){return o(e,r,u)})).then((function(t){return t&&J(t)}))["catch"]((function(t){return H(t,e,r)}))}var V,K=function(t){return i.go(t)},N=new Set,rt={currentRoute:s,addRoute:function(t,r){var n,a;return ot(t)?(n=e.getRecordMatcher(t),a=r):a=t,e.addRoute(a,n)},removeRoute:function(t){var r=e.getRecordMatcher(t);r&&e.removeRoute(r)},hasRoute:function(t){return!!e.getRecordMatcher(t)},getRoutes:function(){return e.getRoutes().map((function(t){return t.record}))},resolve:x,options:t,push:E,replace:function(t){return E(q(k(t),{replace:!0}))},go:K,back:function(){return K(-1)},forward:function(){return K(1)},beforeEach:c.add,beforeResolve:u.add,afterEach:l.add,onError:U.add,isReady:function(){return B&&s.value!==ct?Promise.resolve():new Promise((function(t,e){M.add([t,e])}))},install:function(t){t.component("RouterLink",Vt),t.component("RouterView",te),t.config.globalProperties.$router=this,Object.defineProperty(t.config.globalProperties,"$route",{enumerable:!0,get:function(){return p(s)}}),_&&!V&&s.value===ct&&(V=!0,E(i.location)["catch"]((function(t){})));var e={},r=function(t){e[t]=v((function(){return s.value[t]}))};for(var n in ct)r(n);t.provide(C,this),t.provide(X,h(e)),t.provide(L,s);var a=t.unmount;N.add(t),t.unmount=function(){N["delete"](t),N.size<1&&(f=ct,w&&w(),s.value=ct,V=!1,B=!1),a()}}};return rt}({history:function(t){var e=function(t){var e=window,r=e.history,n=e.location,a={value:nt(t,n)},o={value:r.state};function i(e,a,i){var c=t.indexOf("#"),u=c>-1?(n.host&&document.querySelector("base")?t:t.slice(c))+e:rt()+t+e;try{r[i?"replaceState":"pushState"](a,"",u),o.value=a}catch(l){console.error(l),n[i?"replace":"assign"](u)}}return o.value||i(a.value,{back:null,current:a.value,forward:null,position:r.length-1,replaced:!0,scroll:null},!0),{location:a,state:o,push:function(t,e){var n=q({},o.value,r.state,{forward:t,scroll:Q()});i(n.current,n,!0),i(t,q({},at(a.value,t,null),{position:n.position+1},e),!1),a.value=t},replace:function(t,e){i(t,q({},r.state,at(o.value.back,t,o.value.forward,!0),e,{position:o.value.position}),!0),a.value=t}}}(t=V(t)),r=function(t,e,r,a){var o=[],i=[],c=null,u=function(n){var i=n.state,u=nt(t,location),l=r.value,s=e.value,f=0;if(i){if(r.value=u,e.value=i,c&&c===l)return void(c=null);f=s?i.position-s.position:0}else a(u);o.forEach((function(t){t(r.value,l,{delta:f,type:Z.pop,direction:f?f>0?B.forward:B.back:B.unknown})}))};function l(){var t=window.history;t.state&&t.replaceState(q({},t.state,{scroll:Q()}),"")}return window.addEventListener("popstate",u),window.addEventListener("beforeunload",l),{pauseListeners:function(){c=r.value},listen:function(t){o.push(t);var e=function(){var e=o.indexOf(t);e>-1&&o.splice(e,1)};return i.push(e),e},destroy:function(){var t,e=n(i);try{for(e.s();!(t=e.n()).done;)(0,t.value)()}catch(r){e.e(r)}finally{e.f()}i=[],window.removeEventListener("popstate",u),window.removeEventListener("beforeunload",l)}}}(t,e.state,e.location,e.replace),a=q({location:"",base:t,go:function(t){var e=!(arguments.length>1&&arguments[1]!==undefined)||arguments[1];e||r.pauseListeners(),history.go(t)},createHref:N.bind(null,t)},e,r);return Object.defineProperty(a,"location",{enumerable:!0,get:function(){return e.location.value}}),Object.defineProperty(a,"state",{enumerable:!0,get:function(){return e.state.value}}),a}("/"),routes:re});z(S).use(ne).mount("#app")}}}))}();

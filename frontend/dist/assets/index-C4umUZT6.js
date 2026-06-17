function m0(t,e){for(var n=0;n<e.length;n++){const i=e[n];if(typeof i!="string"&&!Array.isArray(i)){for(const r in i)if(r!=="default"&&!(r in t)){const s=Object.getOwnPropertyDescriptor(i,r);s&&Object.defineProperty(t,r,s.get?s:{enumerable:!0,get:()=>i[r]})}}}return Object.freeze(Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}))}(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();function Jm(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var eg={exports:{}},Xl={},tg={exports:{}},Ve={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var jo=Symbol.for("react.element"),g0=Symbol.for("react.portal"),_0=Symbol.for("react.fragment"),v0=Symbol.for("react.strict_mode"),x0=Symbol.for("react.profiler"),y0=Symbol.for("react.provider"),S0=Symbol.for("react.context"),M0=Symbol.for("react.forward_ref"),E0=Symbol.for("react.suspense"),w0=Symbol.for("react.memo"),T0=Symbol.for("react.lazy"),Ah=Symbol.iterator;function A0(t){return t===null||typeof t!="object"?null:(t=Ah&&t[Ah]||t["@@iterator"],typeof t=="function"?t:null)}var ng={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},ig=Object.assign,rg={};function Os(t,e,n){this.props=t,this.context=e,this.refs=rg,this.updater=n||ng}Os.prototype.isReactComponent={};Os.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};Os.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function sg(){}sg.prototype=Os.prototype;function sd(t,e,n){this.props=t,this.context=e,this.refs=rg,this.updater=n||ng}var od=sd.prototype=new sg;od.constructor=sd;ig(od,Os.prototype);od.isPureReactComponent=!0;var Ch=Array.isArray,og=Object.prototype.hasOwnProperty,ad={current:null},ag={key:!0,ref:!0,__self:!0,__source:!0};function lg(t,e,n){var i,r={},s=null,o=null;if(e!=null)for(i in e.ref!==void 0&&(o=e.ref),e.key!==void 0&&(s=""+e.key),e)og.call(e,i)&&!ag.hasOwnProperty(i)&&(r[i]=e[i]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var l=Array(a),c=0;c<a;c++)l[c]=arguments[c+2];r.children=l}if(t&&t.defaultProps)for(i in a=t.defaultProps,a)r[i]===void 0&&(r[i]=a[i]);return{$$typeof:jo,type:t,key:s,ref:o,props:r,_owner:ad.current}}function C0(t,e){return{$$typeof:jo,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function ld(t){return typeof t=="object"&&t!==null&&t.$$typeof===jo}function b0(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var bh=/\/+/g;function Sc(t,e){return typeof t=="object"&&t!==null&&t.key!=null?b0(""+t.key):e.toString(36)}function Ya(t,e,n,i,r){var s=typeof t;(s==="undefined"||s==="boolean")&&(t=null);var o=!1;if(t===null)o=!0;else switch(s){case"string":case"number":o=!0;break;case"object":switch(t.$$typeof){case jo:case g0:o=!0}}if(o)return o=t,r=r(o),t=i===""?"."+Sc(o,0):i,Ch(r)?(n="",t!=null&&(n=t.replace(bh,"$&/")+"/"),Ya(r,e,n,"",function(c){return c})):r!=null&&(ld(r)&&(r=C0(r,n+(!r.key||o&&o.key===r.key?"":(""+r.key).replace(bh,"$&/")+"/")+t)),e.push(r)),1;if(o=0,i=i===""?".":i+":",Ch(t))for(var a=0;a<t.length;a++){s=t[a];var l=i+Sc(s,a);o+=Ya(s,e,n,l,r)}else if(l=A0(t),typeof l=="function")for(t=l.call(t),a=0;!(s=t.next()).done;)s=s.value,l=i+Sc(s,a++),o+=Ya(s,e,n,l,r);else if(s==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return o}function ra(t,e,n){if(t==null)return t;var i=[],r=0;return Ya(t,i,"","",function(s){return e.call(n,s,r++)}),i}function R0(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var qt={current:null},$a={transition:null},P0={ReactCurrentDispatcher:qt,ReactCurrentBatchConfig:$a,ReactCurrentOwner:ad};function cg(){throw Error("act(...) is not supported in production builds of React.")}Ve.Children={map:ra,forEach:function(t,e,n){ra(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return ra(t,function(){e++}),e},toArray:function(t){return ra(t,function(e){return e})||[]},only:function(t){if(!ld(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};Ve.Component=Os;Ve.Fragment=_0;Ve.Profiler=x0;Ve.PureComponent=sd;Ve.StrictMode=v0;Ve.Suspense=E0;Ve.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=P0;Ve.act=cg;Ve.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var i=ig({},t.props),r=t.key,s=t.ref,o=t._owner;if(e!=null){if(e.ref!==void 0&&(s=e.ref,o=ad.current),e.key!==void 0&&(r=""+e.key),t.type&&t.type.defaultProps)var a=t.type.defaultProps;for(l in e)og.call(e,l)&&!ag.hasOwnProperty(l)&&(i[l]=e[l]===void 0&&a!==void 0?a[l]:e[l])}var l=arguments.length-2;if(l===1)i.children=n;else if(1<l){a=Array(l);for(var c=0;c<l;c++)a[c]=arguments[c+2];i.children=a}return{$$typeof:jo,type:t.type,key:r,ref:s,props:i,_owner:o}};Ve.createContext=function(t){return t={$$typeof:S0,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:y0,_context:t},t.Consumer=t};Ve.createElement=lg;Ve.createFactory=function(t){var e=lg.bind(null,t);return e.type=t,e};Ve.createRef=function(){return{current:null}};Ve.forwardRef=function(t){return{$$typeof:M0,render:t}};Ve.isValidElement=ld;Ve.lazy=function(t){return{$$typeof:T0,_payload:{_status:-1,_result:t},_init:R0}};Ve.memo=function(t,e){return{$$typeof:w0,type:t,compare:e===void 0?null:e}};Ve.startTransition=function(t){var e=$a.transition;$a.transition={};try{t()}finally{$a.transition=e}};Ve.unstable_act=cg;Ve.useCallback=function(t,e){return qt.current.useCallback(t,e)};Ve.useContext=function(t){return qt.current.useContext(t)};Ve.useDebugValue=function(){};Ve.useDeferredValue=function(t){return qt.current.useDeferredValue(t)};Ve.useEffect=function(t,e){return qt.current.useEffect(t,e)};Ve.useId=function(){return qt.current.useId()};Ve.useImperativeHandle=function(t,e,n){return qt.current.useImperativeHandle(t,e,n)};Ve.useInsertionEffect=function(t,e){return qt.current.useInsertionEffect(t,e)};Ve.useLayoutEffect=function(t,e){return qt.current.useLayoutEffect(t,e)};Ve.useMemo=function(t,e){return qt.current.useMemo(t,e)};Ve.useReducer=function(t,e,n){return qt.current.useReducer(t,e,n)};Ve.useRef=function(t){return qt.current.useRef(t)};Ve.useState=function(t){return qt.current.useState(t)};Ve.useSyncExternalStore=function(t,e,n){return qt.current.useSyncExternalStore(t,e,n)};Ve.useTransition=function(){return qt.current.useTransition()};Ve.version="18.3.1";tg.exports=Ve;var W=tg.exports;const cd=Jm(W),L0=m0({__proto__:null,default:cd},[W]);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var N0=W,D0=Symbol.for("react.element"),I0=Symbol.for("react.fragment"),U0=Object.prototype.hasOwnProperty,F0=N0.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,O0={key:!0,ref:!0,__self:!0,__source:!0};function ug(t,e,n){var i,r={},s=null,o=null;n!==void 0&&(s=""+n),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(o=e.ref);for(i in e)U0.call(e,i)&&!O0.hasOwnProperty(i)&&(r[i]=e[i]);if(t&&t.defaultProps)for(i in e=t.defaultProps,e)r[i]===void 0&&(r[i]=e[i]);return{$$typeof:D0,type:t,key:s,ref:o,props:r,_owner:F0.current}}Xl.Fragment=I0;Xl.jsx=ug;Xl.jsxs=ug;eg.exports=Xl;var R=eg.exports,Cu={},fg={exports:{}},vn={},dg={exports:{}},hg={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(D,$){var K=D.length;D.push($);e:for(;0<K;){var se=K-1>>>1,J=D[se];if(0<r(J,$))D[se]=$,D[K]=J,K=se;else break e}}function n(D){return D.length===0?null:D[0]}function i(D){if(D.length===0)return null;var $=D[0],K=D.pop();if(K!==$){D[0]=K;e:for(var se=0,J=D.length,Ie=J>>>1;se<Ie;){var j=2*(se+1)-1,ie=D[j],he=j+1,de=D[he];if(0>r(ie,K))he<J&&0>r(de,ie)?(D[se]=de,D[he]=K,se=he):(D[se]=ie,D[j]=K,se=j);else if(he<J&&0>r(de,K))D[se]=de,D[he]=K,se=he;else break e}}return $}function r(D,$){var K=D.sortIndex-$.sortIndex;return K!==0?K:D.id-$.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;t.unstable_now=function(){return s.now()}}else{var o=Date,a=o.now();t.unstable_now=function(){return o.now()-a}}var l=[],c=[],f=1,d=null,h=3,p=!1,v=!1,x=!1,m=typeof setTimeout=="function"?setTimeout:null,u=typeof clearTimeout=="function"?clearTimeout:null,_=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function g(D){for(var $=n(c);$!==null;){if($.callback===null)i(c);else if($.startTime<=D)i(c),$.sortIndex=$.expirationTime,e(l,$);else break;$=n(c)}}function S(D){if(x=!1,g(D),!v)if(n(l)!==null)v=!0,G(b);else{var $=n(c);$!==null&&q(S,$.startTime-D)}}function b(D,$){v=!1,x&&(x=!1,u(C),C=-1),p=!0;var K=h;try{for(g($),d=n(l);d!==null&&(!(d.expirationTime>$)||D&&!L());){var se=d.callback;if(typeof se=="function"){d.callback=null,h=d.priorityLevel;var J=se(d.expirationTime<=$);$=t.unstable_now(),typeof J=="function"?d.callback=J:d===n(l)&&i(l),g($)}else i(l);d=n(l)}if(d!==null)var Ie=!0;else{var j=n(c);j!==null&&q(S,j.startTime-$),Ie=!1}return Ie}finally{d=null,h=K,p=!1}}var A=!1,T=null,C=-1,E=5,y=-1;function L(){return!(t.unstable_now()-y<E)}function H(){if(T!==null){var D=t.unstable_now();y=D;var $=!0;try{$=T(!0,D)}finally{$?z():(A=!1,T=null)}}else A=!1}var z;if(typeof _=="function")z=function(){_(H)};else if(typeof MessageChannel<"u"){var Y=new MessageChannel,X=Y.port2;Y.port1.onmessage=H,z=function(){X.postMessage(null)}}else z=function(){m(H,0)};function G(D){T=D,A||(A=!0,z())}function q(D,$){C=m(function(){D(t.unstable_now())},$)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(D){D.callback=null},t.unstable_continueExecution=function(){v||p||(v=!0,G(b))},t.unstable_forceFrameRate=function(D){0>D||125<D?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):E=0<D?Math.floor(1e3/D):5},t.unstable_getCurrentPriorityLevel=function(){return h},t.unstable_getFirstCallbackNode=function(){return n(l)},t.unstable_next=function(D){switch(h){case 1:case 2:case 3:var $=3;break;default:$=h}var K=h;h=$;try{return D()}finally{h=K}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(D,$){switch(D){case 1:case 2:case 3:case 4:case 5:break;default:D=3}var K=h;h=D;try{return $()}finally{h=K}},t.unstable_scheduleCallback=function(D,$,K){var se=t.unstable_now();switch(typeof K=="object"&&K!==null?(K=K.delay,K=typeof K=="number"&&0<K?se+K:se):K=se,D){case 1:var J=-1;break;case 2:J=250;break;case 5:J=1073741823;break;case 4:J=1e4;break;default:J=5e3}return J=K+J,D={id:f++,callback:$,priorityLevel:D,startTime:K,expirationTime:J,sortIndex:-1},K>se?(D.sortIndex=K,e(c,D),n(l)===null&&D===n(c)&&(x?(u(C),C=-1):x=!0,q(S,K-se))):(D.sortIndex=J,e(l,D),v||p||(v=!0,G(b))),D},t.unstable_shouldYield=L,t.unstable_wrapCallback=function(D){var $=h;return function(){var K=h;h=$;try{return D.apply(this,arguments)}finally{h=K}}}})(hg);dg.exports=hg;var z0=dg.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var k0=W,_n=z0;function re(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var pg=new Set,To={};function Lr(t,e){Es(t,e),Es(t+"Capture",e)}function Es(t,e){for(To[t]=e,t=0;t<e.length;t++)pg.add(e[t])}var pi=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),bu=Object.prototype.hasOwnProperty,B0=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Rh={},Ph={};function H0(t){return bu.call(Ph,t)?!0:bu.call(Rh,t)?!1:B0.test(t)?Ph[t]=!0:(Rh[t]=!0,!1)}function V0(t,e,n,i){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return i?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function G0(t,e,n,i){if(e===null||typeof e>"u"||V0(t,e,n,i))return!0;if(i)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function Kt(t,e,n,i,r,s,o){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=i,this.attributeNamespace=r,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=s,this.removeEmptyString=o}var Ot={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){Ot[t]=new Kt(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];Ot[e]=new Kt(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){Ot[t]=new Kt(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){Ot[t]=new Kt(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){Ot[t]=new Kt(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){Ot[t]=new Kt(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){Ot[t]=new Kt(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){Ot[t]=new Kt(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){Ot[t]=new Kt(t,5,!1,t.toLowerCase(),null,!1,!1)});var ud=/[\-:]([a-z])/g;function fd(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(ud,fd);Ot[e]=new Kt(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(ud,fd);Ot[e]=new Kt(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(ud,fd);Ot[e]=new Kt(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){Ot[t]=new Kt(t,1,!1,t.toLowerCase(),null,!1,!1)});Ot.xlinkHref=new Kt("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){Ot[t]=new Kt(t,1,!1,t.toLowerCase(),null,!0,!0)});function dd(t,e,n,i){var r=Ot.hasOwnProperty(e)?Ot[e]:null;(r!==null?r.type!==0:i||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(G0(e,n,r,i)&&(n=null),i||r===null?H0(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):r.mustUseProperty?t[r.propertyName]=n===null?r.type===3?!1:"":n:(e=r.attributeName,i=r.attributeNamespace,n===null?t.removeAttribute(e):(r=r.type,n=r===3||r===4&&n===!0?"":""+n,i?t.setAttributeNS(i,e,n):t.setAttribute(e,n))))}var yi=k0.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,sa=Symbol.for("react.element"),Jr=Symbol.for("react.portal"),es=Symbol.for("react.fragment"),hd=Symbol.for("react.strict_mode"),Ru=Symbol.for("react.profiler"),mg=Symbol.for("react.provider"),gg=Symbol.for("react.context"),pd=Symbol.for("react.forward_ref"),Pu=Symbol.for("react.suspense"),Lu=Symbol.for("react.suspense_list"),md=Symbol.for("react.memo"),Pi=Symbol.for("react.lazy"),_g=Symbol.for("react.offscreen"),Lh=Symbol.iterator;function Xs(t){return t===null||typeof t!="object"?null:(t=Lh&&t[Lh]||t["@@iterator"],typeof t=="function"?t:null)}var mt=Object.assign,Mc;function lo(t){if(Mc===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);Mc=e&&e[1]||""}return`
`+Mc+t}var Ec=!1;function wc(t,e){if(!t||Ec)return"";Ec=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(c){var i=c}Reflect.construct(t,[],e)}else{try{e.call()}catch(c){i=c}t.call(e.prototype)}else{try{throw Error()}catch(c){i=c}t()}}catch(c){if(c&&i&&typeof c.stack=="string"){for(var r=c.stack.split(`
`),s=i.stack.split(`
`),o=r.length-1,a=s.length-1;1<=o&&0<=a&&r[o]!==s[a];)a--;for(;1<=o&&0<=a;o--,a--)if(r[o]!==s[a]){if(o!==1||a!==1)do if(o--,a--,0>a||r[o]!==s[a]){var l=`
`+r[o].replace(" at new "," at ");return t.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",t.displayName)),l}while(1<=o&&0<=a);break}}}finally{Ec=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?lo(t):""}function W0(t){switch(t.tag){case 5:return lo(t.type);case 16:return lo("Lazy");case 13:return lo("Suspense");case 19:return lo("SuspenseList");case 0:case 2:case 15:return t=wc(t.type,!1),t;case 11:return t=wc(t.type.render,!1),t;case 1:return t=wc(t.type,!0),t;default:return""}}function Nu(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case es:return"Fragment";case Jr:return"Portal";case Ru:return"Profiler";case hd:return"StrictMode";case Pu:return"Suspense";case Lu:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case gg:return(t.displayName||"Context")+".Consumer";case mg:return(t._context.displayName||"Context")+".Provider";case pd:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case md:return e=t.displayName||null,e!==null?e:Nu(t.type)||"Memo";case Pi:e=t._payload,t=t._init;try{return Nu(t(e))}catch{}}return null}function j0(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Nu(e);case 8:return e===hd?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function Ki(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function vg(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function X0(t){var e=vg(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),i=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var r=n.get,s=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return r.call(this)},set:function(o){i=""+o,s.call(this,o)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return i},setValue:function(o){i=""+o},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function oa(t){t._valueTracker||(t._valueTracker=X0(t))}function xg(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),i="";return t&&(i=vg(t)?t.checked?"true":"false":t.value),t=i,t!==n?(e.setValue(t),!0):!1}function dl(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function Du(t,e){var n=e.checked;return mt({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function Nh(t,e){var n=e.defaultValue==null?"":e.defaultValue,i=e.checked!=null?e.checked:e.defaultChecked;n=Ki(e.value!=null?e.value:n),t._wrapperState={initialChecked:i,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function yg(t,e){e=e.checked,e!=null&&dd(t,"checked",e,!1)}function Iu(t,e){yg(t,e);var n=Ki(e.value),i=e.type;if(n!=null)i==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(i==="submit"||i==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?Uu(t,e.type,n):e.hasOwnProperty("defaultValue")&&Uu(t,e.type,Ki(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function Dh(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var i=e.type;if(!(i!=="submit"&&i!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function Uu(t,e,n){(e!=="number"||dl(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var co=Array.isArray;function hs(t,e,n,i){if(t=t.options,e){e={};for(var r=0;r<n.length;r++)e["$"+n[r]]=!0;for(n=0;n<t.length;n++)r=e.hasOwnProperty("$"+t[n].value),t[n].selected!==r&&(t[n].selected=r),r&&i&&(t[n].defaultSelected=!0)}else{for(n=""+Ki(n),e=null,r=0;r<t.length;r++){if(t[r].value===n){t[r].selected=!0,i&&(t[r].defaultSelected=!0);return}e!==null||t[r].disabled||(e=t[r])}e!==null&&(e.selected=!0)}}function Fu(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(re(91));return mt({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function Ih(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(re(92));if(co(n)){if(1<n.length)throw Error(re(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:Ki(n)}}function Sg(t,e){var n=Ki(e.value),i=Ki(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),i!=null&&(t.defaultValue=""+i)}function Uh(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function Mg(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Ou(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?Mg(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var aa,Eg=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,i,r){MSApp.execUnsafeLocalFunction(function(){return t(e,n,i,r)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(aa=aa||document.createElement("div"),aa.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=aa.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function Ao(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var mo={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Y0=["Webkit","ms","Moz","O"];Object.keys(mo).forEach(function(t){Y0.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),mo[e]=mo[t]})});function wg(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||mo.hasOwnProperty(t)&&mo[t]?(""+e).trim():e+"px"}function Tg(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var i=n.indexOf("--")===0,r=wg(n,e[n],i);n==="float"&&(n="cssFloat"),i?t.setProperty(n,r):t[n]=r}}var $0=mt({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function zu(t,e){if(e){if($0[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(re(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(re(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(re(61))}if(e.style!=null&&typeof e.style!="object")throw Error(re(62))}}function ku(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Bu=null;function gd(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Hu=null,ps=null,ms=null;function Fh(t){if(t=$o(t)){if(typeof Hu!="function")throw Error(re(280));var e=t.stateNode;e&&(e=Zl(e),Hu(t.stateNode,t.type,e))}}function Ag(t){ps?ms?ms.push(t):ms=[t]:ps=t}function Cg(){if(ps){var t=ps,e=ms;if(ms=ps=null,Fh(t),e)for(t=0;t<e.length;t++)Fh(e[t])}}function bg(t,e){return t(e)}function Rg(){}var Tc=!1;function Pg(t,e,n){if(Tc)return t(e,n);Tc=!0;try{return bg(t,e,n)}finally{Tc=!1,(ps!==null||ms!==null)&&(Rg(),Cg())}}function Co(t,e){var n=t.stateNode;if(n===null)return null;var i=Zl(n);if(i===null)return null;n=i[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(t=t.type,i=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!i;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(re(231,e,typeof n));return n}var Vu=!1;if(pi)try{var Ys={};Object.defineProperty(Ys,"passive",{get:function(){Vu=!0}}),window.addEventListener("test",Ys,Ys),window.removeEventListener("test",Ys,Ys)}catch{Vu=!1}function q0(t,e,n,i,r,s,o,a,l){var c=Array.prototype.slice.call(arguments,3);try{e.apply(n,c)}catch(f){this.onError(f)}}var go=!1,hl=null,pl=!1,Gu=null,K0={onError:function(t){go=!0,hl=t}};function Z0(t,e,n,i,r,s,o,a,l){go=!1,hl=null,q0.apply(K0,arguments)}function Q0(t,e,n,i,r,s,o,a,l){if(Z0.apply(this,arguments),go){if(go){var c=hl;go=!1,hl=null}else throw Error(re(198));pl||(pl=!0,Gu=c)}}function Nr(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function Lg(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function Oh(t){if(Nr(t)!==t)throw Error(re(188))}function J0(t){var e=t.alternate;if(!e){if(e=Nr(t),e===null)throw Error(re(188));return e!==t?null:t}for(var n=t,i=e;;){var r=n.return;if(r===null)break;var s=r.alternate;if(s===null){if(i=r.return,i!==null){n=i;continue}break}if(r.child===s.child){for(s=r.child;s;){if(s===n)return Oh(r),t;if(s===i)return Oh(r),e;s=s.sibling}throw Error(re(188))}if(n.return!==i.return)n=r,i=s;else{for(var o=!1,a=r.child;a;){if(a===n){o=!0,n=r,i=s;break}if(a===i){o=!0,i=r,n=s;break}a=a.sibling}if(!o){for(a=s.child;a;){if(a===n){o=!0,n=s,i=r;break}if(a===i){o=!0,i=s,n=r;break}a=a.sibling}if(!o)throw Error(re(189))}}if(n.alternate!==i)throw Error(re(190))}if(n.tag!==3)throw Error(re(188));return n.stateNode.current===n?t:e}function Ng(t){return t=J0(t),t!==null?Dg(t):null}function Dg(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=Dg(t);if(e!==null)return e;t=t.sibling}return null}var Ig=_n.unstable_scheduleCallback,zh=_n.unstable_cancelCallback,ex=_n.unstable_shouldYield,tx=_n.unstable_requestPaint,xt=_n.unstable_now,nx=_n.unstable_getCurrentPriorityLevel,_d=_n.unstable_ImmediatePriority,Ug=_n.unstable_UserBlockingPriority,ml=_n.unstable_NormalPriority,ix=_n.unstable_LowPriority,Fg=_n.unstable_IdlePriority,Yl=null,Qn=null;function rx(t){if(Qn&&typeof Qn.onCommitFiberRoot=="function")try{Qn.onCommitFiberRoot(Yl,t,void 0,(t.current.flags&128)===128)}catch{}}var kn=Math.clz32?Math.clz32:ax,sx=Math.log,ox=Math.LN2;function ax(t){return t>>>=0,t===0?32:31-(sx(t)/ox|0)|0}var la=64,ca=4194304;function uo(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function gl(t,e){var n=t.pendingLanes;if(n===0)return 0;var i=0,r=t.suspendedLanes,s=t.pingedLanes,o=n&268435455;if(o!==0){var a=o&~r;a!==0?i=uo(a):(s&=o,s!==0&&(i=uo(s)))}else o=n&~r,o!==0?i=uo(o):s!==0&&(i=uo(s));if(i===0)return 0;if(e!==0&&e!==i&&!(e&r)&&(r=i&-i,s=e&-e,r>=s||r===16&&(s&4194240)!==0))return e;if(i&4&&(i|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=i;0<e;)n=31-kn(e),r=1<<n,i|=t[n],e&=~r;return i}function lx(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function cx(t,e){for(var n=t.suspendedLanes,i=t.pingedLanes,r=t.expirationTimes,s=t.pendingLanes;0<s;){var o=31-kn(s),a=1<<o,l=r[o];l===-1?(!(a&n)||a&i)&&(r[o]=lx(a,e)):l<=e&&(t.expiredLanes|=a),s&=~a}}function Wu(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function Og(){var t=la;return la<<=1,!(la&4194240)&&(la=64),t}function Ac(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function Xo(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-kn(e),t[e]=n}function ux(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var i=t.eventTimes;for(t=t.expirationTimes;0<n;){var r=31-kn(n),s=1<<r;e[r]=0,i[r]=-1,t[r]=-1,n&=~s}}function vd(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var i=31-kn(n),r=1<<i;r&e|t[i]&e&&(t[i]|=e),n&=~r}}var et=0;function zg(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var kg,xd,Bg,Hg,Vg,ju=!1,ua=[],ki=null,Bi=null,Hi=null,bo=new Map,Ro=new Map,Di=[],fx="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function kh(t,e){switch(t){case"focusin":case"focusout":ki=null;break;case"dragenter":case"dragleave":Bi=null;break;case"mouseover":case"mouseout":Hi=null;break;case"pointerover":case"pointerout":bo.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":Ro.delete(e.pointerId)}}function $s(t,e,n,i,r,s){return t===null||t.nativeEvent!==s?(t={blockedOn:e,domEventName:n,eventSystemFlags:i,nativeEvent:s,targetContainers:[r]},e!==null&&(e=$o(e),e!==null&&xd(e)),t):(t.eventSystemFlags|=i,e=t.targetContainers,r!==null&&e.indexOf(r)===-1&&e.push(r),t)}function dx(t,e,n,i,r){switch(e){case"focusin":return ki=$s(ki,t,e,n,i,r),!0;case"dragenter":return Bi=$s(Bi,t,e,n,i,r),!0;case"mouseover":return Hi=$s(Hi,t,e,n,i,r),!0;case"pointerover":var s=r.pointerId;return bo.set(s,$s(bo.get(s)||null,t,e,n,i,r)),!0;case"gotpointercapture":return s=r.pointerId,Ro.set(s,$s(Ro.get(s)||null,t,e,n,i,r)),!0}return!1}function Gg(t){var e=gr(t.target);if(e!==null){var n=Nr(e);if(n!==null){if(e=n.tag,e===13){if(e=Lg(n),e!==null){t.blockedOn=e,Vg(t.priority,function(){Bg(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function qa(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=Xu(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var i=new n.constructor(n.type,n);Bu=i,n.target.dispatchEvent(i),Bu=null}else return e=$o(n),e!==null&&xd(e),t.blockedOn=n,!1;e.shift()}return!0}function Bh(t,e,n){qa(t)&&n.delete(e)}function hx(){ju=!1,ki!==null&&qa(ki)&&(ki=null),Bi!==null&&qa(Bi)&&(Bi=null),Hi!==null&&qa(Hi)&&(Hi=null),bo.forEach(Bh),Ro.forEach(Bh)}function qs(t,e){t.blockedOn===e&&(t.blockedOn=null,ju||(ju=!0,_n.unstable_scheduleCallback(_n.unstable_NormalPriority,hx)))}function Po(t){function e(r){return qs(r,t)}if(0<ua.length){qs(ua[0],t);for(var n=1;n<ua.length;n++){var i=ua[n];i.blockedOn===t&&(i.blockedOn=null)}}for(ki!==null&&qs(ki,t),Bi!==null&&qs(Bi,t),Hi!==null&&qs(Hi,t),bo.forEach(e),Ro.forEach(e),n=0;n<Di.length;n++)i=Di[n],i.blockedOn===t&&(i.blockedOn=null);for(;0<Di.length&&(n=Di[0],n.blockedOn===null);)Gg(n),n.blockedOn===null&&Di.shift()}var gs=yi.ReactCurrentBatchConfig,_l=!0;function px(t,e,n,i){var r=et,s=gs.transition;gs.transition=null;try{et=1,yd(t,e,n,i)}finally{et=r,gs.transition=s}}function mx(t,e,n,i){var r=et,s=gs.transition;gs.transition=null;try{et=4,yd(t,e,n,i)}finally{et=r,gs.transition=s}}function yd(t,e,n,i){if(_l){var r=Xu(t,e,n,i);if(r===null)Fc(t,e,i,vl,n),kh(t,i);else if(dx(r,t,e,n,i))i.stopPropagation();else if(kh(t,i),e&4&&-1<fx.indexOf(t)){for(;r!==null;){var s=$o(r);if(s!==null&&kg(s),s=Xu(t,e,n,i),s===null&&Fc(t,e,i,vl,n),s===r)break;r=s}r!==null&&i.stopPropagation()}else Fc(t,e,i,null,n)}}var vl=null;function Xu(t,e,n,i){if(vl=null,t=gd(i),t=gr(t),t!==null)if(e=Nr(t),e===null)t=null;else if(n=e.tag,n===13){if(t=Lg(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return vl=t,null}function Wg(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(nx()){case _d:return 1;case Ug:return 4;case ml:case ix:return 16;case Fg:return 536870912;default:return 16}default:return 16}}var Fi=null,Sd=null,Ka=null;function jg(){if(Ka)return Ka;var t,e=Sd,n=e.length,i,r="value"in Fi?Fi.value:Fi.textContent,s=r.length;for(t=0;t<n&&e[t]===r[t];t++);var o=n-t;for(i=1;i<=o&&e[n-i]===r[s-i];i++);return Ka=r.slice(t,1<i?1-i:void 0)}function Za(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function fa(){return!0}function Hh(){return!1}function xn(t){function e(n,i,r,s,o){this._reactName=n,this._targetInst=r,this.type=i,this.nativeEvent=s,this.target=o,this.currentTarget=null;for(var a in t)t.hasOwnProperty(a)&&(n=t[a],this[a]=n?n(s):s[a]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?fa:Hh,this.isPropagationStopped=Hh,this}return mt(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=fa)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=fa)},persist:function(){},isPersistent:fa}),e}var zs={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Md=xn(zs),Yo=mt({},zs,{view:0,detail:0}),gx=xn(Yo),Cc,bc,Ks,$l=mt({},Yo,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Ed,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==Ks&&(Ks&&t.type==="mousemove"?(Cc=t.screenX-Ks.screenX,bc=t.screenY-Ks.screenY):bc=Cc=0,Ks=t),Cc)},movementY:function(t){return"movementY"in t?t.movementY:bc}}),Vh=xn($l),_x=mt({},$l,{dataTransfer:0}),vx=xn(_x),xx=mt({},Yo,{relatedTarget:0}),Rc=xn(xx),yx=mt({},zs,{animationName:0,elapsedTime:0,pseudoElement:0}),Sx=xn(yx),Mx=mt({},zs,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),Ex=xn(Mx),wx=mt({},zs,{data:0}),Gh=xn(wx),Tx={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Ax={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Cx={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function bx(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=Cx[t])?!!e[t]:!1}function Ed(){return bx}var Rx=mt({},Yo,{key:function(t){if(t.key){var e=Tx[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=Za(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?Ax[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Ed,charCode:function(t){return t.type==="keypress"?Za(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Za(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),Px=xn(Rx),Lx=mt({},$l,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Wh=xn(Lx),Nx=mt({},Yo,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Ed}),Dx=xn(Nx),Ix=mt({},zs,{propertyName:0,elapsedTime:0,pseudoElement:0}),Ux=xn(Ix),Fx=mt({},$l,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),Ox=xn(Fx),zx=[9,13,27,32],wd=pi&&"CompositionEvent"in window,_o=null;pi&&"documentMode"in document&&(_o=document.documentMode);var kx=pi&&"TextEvent"in window&&!_o,Xg=pi&&(!wd||_o&&8<_o&&11>=_o),jh=" ",Xh=!1;function Yg(t,e){switch(t){case"keyup":return zx.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function $g(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var ts=!1;function Bx(t,e){switch(t){case"compositionend":return $g(e);case"keypress":return e.which!==32?null:(Xh=!0,jh);case"textInput":return t=e.data,t===jh&&Xh?null:t;default:return null}}function Hx(t,e){if(ts)return t==="compositionend"||!wd&&Yg(t,e)?(t=jg(),Ka=Sd=Fi=null,ts=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return Xg&&e.locale!=="ko"?null:e.data;default:return null}}var Vx={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Yh(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!Vx[t.type]:e==="textarea"}function qg(t,e,n,i){Ag(i),e=xl(e,"onChange"),0<e.length&&(n=new Md("onChange","change",null,n,i),t.push({event:n,listeners:e}))}var vo=null,Lo=null;function Gx(t){o_(t,0)}function ql(t){var e=rs(t);if(xg(e))return t}function Wx(t,e){if(t==="change")return e}var Kg=!1;if(pi){var Pc;if(pi){var Lc="oninput"in document;if(!Lc){var $h=document.createElement("div");$h.setAttribute("oninput","return;"),Lc=typeof $h.oninput=="function"}Pc=Lc}else Pc=!1;Kg=Pc&&(!document.documentMode||9<document.documentMode)}function qh(){vo&&(vo.detachEvent("onpropertychange",Zg),Lo=vo=null)}function Zg(t){if(t.propertyName==="value"&&ql(Lo)){var e=[];qg(e,Lo,t,gd(t)),Pg(Gx,e)}}function jx(t,e,n){t==="focusin"?(qh(),vo=e,Lo=n,vo.attachEvent("onpropertychange",Zg)):t==="focusout"&&qh()}function Xx(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return ql(Lo)}function Yx(t,e){if(t==="click")return ql(e)}function $x(t,e){if(t==="input"||t==="change")return ql(e)}function qx(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var Hn=typeof Object.is=="function"?Object.is:qx;function No(t,e){if(Hn(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),i=Object.keys(e);if(n.length!==i.length)return!1;for(i=0;i<n.length;i++){var r=n[i];if(!bu.call(e,r)||!Hn(t[r],e[r]))return!1}return!0}function Kh(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Zh(t,e){var n=Kh(t);t=0;for(var i;n;){if(n.nodeType===3){if(i=t+n.textContent.length,t<=e&&i>=e)return{node:n,offset:e-t};t=i}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Kh(n)}}function Qg(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?Qg(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function Jg(){for(var t=window,e=dl();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=dl(t.document)}return e}function Td(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function Kx(t){var e=Jg(),n=t.focusedElem,i=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&Qg(n.ownerDocument.documentElement,n)){if(i!==null&&Td(n)){if(e=i.start,t=i.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var r=n.textContent.length,s=Math.min(i.start,r);i=i.end===void 0?s:Math.min(i.end,r),!t.extend&&s>i&&(r=i,i=s,s=r),r=Zh(n,s);var o=Zh(n,i);r&&o&&(t.rangeCount!==1||t.anchorNode!==r.node||t.anchorOffset!==r.offset||t.focusNode!==o.node||t.focusOffset!==o.offset)&&(e=e.createRange(),e.setStart(r.node,r.offset),t.removeAllRanges(),s>i?(t.addRange(e),t.extend(o.node,o.offset)):(e.setEnd(o.node,o.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var Zx=pi&&"documentMode"in document&&11>=document.documentMode,ns=null,Yu=null,xo=null,$u=!1;function Qh(t,e,n){var i=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;$u||ns==null||ns!==dl(i)||(i=ns,"selectionStart"in i&&Td(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),xo&&No(xo,i)||(xo=i,i=xl(Yu,"onSelect"),0<i.length&&(e=new Md("onSelect","select",null,e,n),t.push({event:e,listeners:i}),e.target=ns)))}function da(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var is={animationend:da("Animation","AnimationEnd"),animationiteration:da("Animation","AnimationIteration"),animationstart:da("Animation","AnimationStart"),transitionend:da("Transition","TransitionEnd")},Nc={},e_={};pi&&(e_=document.createElement("div").style,"AnimationEvent"in window||(delete is.animationend.animation,delete is.animationiteration.animation,delete is.animationstart.animation),"TransitionEvent"in window||delete is.transitionend.transition);function Kl(t){if(Nc[t])return Nc[t];if(!is[t])return t;var e=is[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in e_)return Nc[t]=e[n];return t}var t_=Kl("animationend"),n_=Kl("animationiteration"),i_=Kl("animationstart"),r_=Kl("transitionend"),s_=new Map,Jh="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Ji(t,e){s_.set(t,e),Lr(e,[t])}for(var Dc=0;Dc<Jh.length;Dc++){var Ic=Jh[Dc],Qx=Ic.toLowerCase(),Jx=Ic[0].toUpperCase()+Ic.slice(1);Ji(Qx,"on"+Jx)}Ji(t_,"onAnimationEnd");Ji(n_,"onAnimationIteration");Ji(i_,"onAnimationStart");Ji("dblclick","onDoubleClick");Ji("focusin","onFocus");Ji("focusout","onBlur");Ji(r_,"onTransitionEnd");Es("onMouseEnter",["mouseout","mouseover"]);Es("onMouseLeave",["mouseout","mouseover"]);Es("onPointerEnter",["pointerout","pointerover"]);Es("onPointerLeave",["pointerout","pointerover"]);Lr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Lr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Lr("onBeforeInput",["compositionend","keypress","textInput","paste"]);Lr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Lr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Lr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var fo="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),ey=new Set("cancel close invalid load scroll toggle".split(" ").concat(fo));function ep(t,e,n){var i=t.type||"unknown-event";t.currentTarget=n,Q0(i,e,void 0,t),t.currentTarget=null}function o_(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var i=t[n],r=i.event;i=i.listeners;e:{var s=void 0;if(e)for(var o=i.length-1;0<=o;o--){var a=i[o],l=a.instance,c=a.currentTarget;if(a=a.listener,l!==s&&r.isPropagationStopped())break e;ep(r,a,c),s=l}else for(o=0;o<i.length;o++){if(a=i[o],l=a.instance,c=a.currentTarget,a=a.listener,l!==s&&r.isPropagationStopped())break e;ep(r,a,c),s=l}}}if(pl)throw t=Gu,pl=!1,Gu=null,t}function st(t,e){var n=e[Ju];n===void 0&&(n=e[Ju]=new Set);var i=t+"__bubble";n.has(i)||(a_(e,t,2,!1),n.add(i))}function Uc(t,e,n){var i=0;e&&(i|=4),a_(n,t,i,e)}var ha="_reactListening"+Math.random().toString(36).slice(2);function Do(t){if(!t[ha]){t[ha]=!0,pg.forEach(function(n){n!=="selectionchange"&&(ey.has(n)||Uc(n,!1,t),Uc(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[ha]||(e[ha]=!0,Uc("selectionchange",!1,e))}}function a_(t,e,n,i){switch(Wg(e)){case 1:var r=px;break;case 4:r=mx;break;default:r=yd}n=r.bind(null,e,n,t),r=void 0,!Vu||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(r=!0),i?r!==void 0?t.addEventListener(e,n,{capture:!0,passive:r}):t.addEventListener(e,n,!0):r!==void 0?t.addEventListener(e,n,{passive:r}):t.addEventListener(e,n,!1)}function Fc(t,e,n,i,r){var s=i;if(!(e&1)&&!(e&2)&&i!==null)e:for(;;){if(i===null)return;var o=i.tag;if(o===3||o===4){var a=i.stateNode.containerInfo;if(a===r||a.nodeType===8&&a.parentNode===r)break;if(o===4)for(o=i.return;o!==null;){var l=o.tag;if((l===3||l===4)&&(l=o.stateNode.containerInfo,l===r||l.nodeType===8&&l.parentNode===r))return;o=o.return}for(;a!==null;){if(o=gr(a),o===null)return;if(l=o.tag,l===5||l===6){i=s=o;continue e}a=a.parentNode}}i=i.return}Pg(function(){var c=s,f=gd(n),d=[];e:{var h=s_.get(t);if(h!==void 0){var p=Md,v=t;switch(t){case"keypress":if(Za(n)===0)break e;case"keydown":case"keyup":p=Px;break;case"focusin":v="focus",p=Rc;break;case"focusout":v="blur",p=Rc;break;case"beforeblur":case"afterblur":p=Rc;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":p=Vh;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":p=vx;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":p=Dx;break;case t_:case n_:case i_:p=Sx;break;case r_:p=Ux;break;case"scroll":p=gx;break;case"wheel":p=Ox;break;case"copy":case"cut":case"paste":p=Ex;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":p=Wh}var x=(e&4)!==0,m=!x&&t==="scroll",u=x?h!==null?h+"Capture":null:h;x=[];for(var _=c,g;_!==null;){g=_;var S=g.stateNode;if(g.tag===5&&S!==null&&(g=S,u!==null&&(S=Co(_,u),S!=null&&x.push(Io(_,S,g)))),m)break;_=_.return}0<x.length&&(h=new p(h,v,null,n,f),d.push({event:h,listeners:x}))}}if(!(e&7)){e:{if(h=t==="mouseover"||t==="pointerover",p=t==="mouseout"||t==="pointerout",h&&n!==Bu&&(v=n.relatedTarget||n.fromElement)&&(gr(v)||v[mi]))break e;if((p||h)&&(h=f.window===f?f:(h=f.ownerDocument)?h.defaultView||h.parentWindow:window,p?(v=n.relatedTarget||n.toElement,p=c,v=v?gr(v):null,v!==null&&(m=Nr(v),v!==m||v.tag!==5&&v.tag!==6)&&(v=null)):(p=null,v=c),p!==v)){if(x=Vh,S="onMouseLeave",u="onMouseEnter",_="mouse",(t==="pointerout"||t==="pointerover")&&(x=Wh,S="onPointerLeave",u="onPointerEnter",_="pointer"),m=p==null?h:rs(p),g=v==null?h:rs(v),h=new x(S,_+"leave",p,n,f),h.target=m,h.relatedTarget=g,S=null,gr(f)===c&&(x=new x(u,_+"enter",v,n,f),x.target=g,x.relatedTarget=m,S=x),m=S,p&&v)t:{for(x=p,u=v,_=0,g=x;g;g=Ur(g))_++;for(g=0,S=u;S;S=Ur(S))g++;for(;0<_-g;)x=Ur(x),_--;for(;0<g-_;)u=Ur(u),g--;for(;_--;){if(x===u||u!==null&&x===u.alternate)break t;x=Ur(x),u=Ur(u)}x=null}else x=null;p!==null&&tp(d,h,p,x,!1),v!==null&&m!==null&&tp(d,m,v,x,!0)}}e:{if(h=c?rs(c):window,p=h.nodeName&&h.nodeName.toLowerCase(),p==="select"||p==="input"&&h.type==="file")var b=Wx;else if(Yh(h))if(Kg)b=$x;else{b=Xx;var A=jx}else(p=h.nodeName)&&p.toLowerCase()==="input"&&(h.type==="checkbox"||h.type==="radio")&&(b=Yx);if(b&&(b=b(t,c))){qg(d,b,n,f);break e}A&&A(t,h,c),t==="focusout"&&(A=h._wrapperState)&&A.controlled&&h.type==="number"&&Uu(h,"number",h.value)}switch(A=c?rs(c):window,t){case"focusin":(Yh(A)||A.contentEditable==="true")&&(ns=A,Yu=c,xo=null);break;case"focusout":xo=Yu=ns=null;break;case"mousedown":$u=!0;break;case"contextmenu":case"mouseup":case"dragend":$u=!1,Qh(d,n,f);break;case"selectionchange":if(Zx)break;case"keydown":case"keyup":Qh(d,n,f)}var T;if(wd)e:{switch(t){case"compositionstart":var C="onCompositionStart";break e;case"compositionend":C="onCompositionEnd";break e;case"compositionupdate":C="onCompositionUpdate";break e}C=void 0}else ts?Yg(t,n)&&(C="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(C="onCompositionStart");C&&(Xg&&n.locale!=="ko"&&(ts||C!=="onCompositionStart"?C==="onCompositionEnd"&&ts&&(T=jg()):(Fi=f,Sd="value"in Fi?Fi.value:Fi.textContent,ts=!0)),A=xl(c,C),0<A.length&&(C=new Gh(C,t,null,n,f),d.push({event:C,listeners:A}),T?C.data=T:(T=$g(n),T!==null&&(C.data=T)))),(T=kx?Bx(t,n):Hx(t,n))&&(c=xl(c,"onBeforeInput"),0<c.length&&(f=new Gh("onBeforeInput","beforeinput",null,n,f),d.push({event:f,listeners:c}),f.data=T))}o_(d,e)})}function Io(t,e,n){return{instance:t,listener:e,currentTarget:n}}function xl(t,e){for(var n=e+"Capture",i=[];t!==null;){var r=t,s=r.stateNode;r.tag===5&&s!==null&&(r=s,s=Co(t,n),s!=null&&i.unshift(Io(t,s,r)),s=Co(t,e),s!=null&&i.push(Io(t,s,r))),t=t.return}return i}function Ur(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function tp(t,e,n,i,r){for(var s=e._reactName,o=[];n!==null&&n!==i;){var a=n,l=a.alternate,c=a.stateNode;if(l!==null&&l===i)break;a.tag===5&&c!==null&&(a=c,r?(l=Co(n,s),l!=null&&o.unshift(Io(n,l,a))):r||(l=Co(n,s),l!=null&&o.push(Io(n,l,a)))),n=n.return}o.length!==0&&t.push({event:e,listeners:o})}var ty=/\r\n?/g,ny=/\u0000|\uFFFD/g;function np(t){return(typeof t=="string"?t:""+t).replace(ty,`
`).replace(ny,"")}function pa(t,e,n){if(e=np(e),np(t)!==e&&n)throw Error(re(425))}function yl(){}var qu=null,Ku=null;function Zu(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var Qu=typeof setTimeout=="function"?setTimeout:void 0,iy=typeof clearTimeout=="function"?clearTimeout:void 0,ip=typeof Promise=="function"?Promise:void 0,ry=typeof queueMicrotask=="function"?queueMicrotask:typeof ip<"u"?function(t){return ip.resolve(null).then(t).catch(sy)}:Qu;function sy(t){setTimeout(function(){throw t})}function Oc(t,e){var n=e,i=0;do{var r=n.nextSibling;if(t.removeChild(n),r&&r.nodeType===8)if(n=r.data,n==="/$"){if(i===0){t.removeChild(r),Po(e);return}i--}else n!=="$"&&n!=="$?"&&n!=="$!"||i++;n=r}while(n);Po(e)}function Vi(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function rp(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var ks=Math.random().toString(36).slice(2),$n="__reactFiber$"+ks,Uo="__reactProps$"+ks,mi="__reactContainer$"+ks,Ju="__reactEvents$"+ks,oy="__reactListeners$"+ks,ay="__reactHandles$"+ks;function gr(t){var e=t[$n];if(e)return e;for(var n=t.parentNode;n;){if(e=n[mi]||n[$n]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=rp(t);t!==null;){if(n=t[$n])return n;t=rp(t)}return e}t=n,n=t.parentNode}return null}function $o(t){return t=t[$n]||t[mi],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function rs(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(re(33))}function Zl(t){return t[Uo]||null}var ef=[],ss=-1;function er(t){return{current:t}}function lt(t){0>ss||(t.current=ef[ss],ef[ss]=null,ss--)}function rt(t,e){ss++,ef[ss]=t.current,t.current=e}var Zi={},Wt=er(Zi),nn=er(!1),Er=Zi;function ws(t,e){var n=t.type.contextTypes;if(!n)return Zi;var i=t.stateNode;if(i&&i.__reactInternalMemoizedUnmaskedChildContext===e)return i.__reactInternalMemoizedMaskedChildContext;var r={},s;for(s in n)r[s]=e[s];return i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=r),r}function rn(t){return t=t.childContextTypes,t!=null}function Sl(){lt(nn),lt(Wt)}function sp(t,e,n){if(Wt.current!==Zi)throw Error(re(168));rt(Wt,e),rt(nn,n)}function l_(t,e,n){var i=t.stateNode;if(e=e.childContextTypes,typeof i.getChildContext!="function")return n;i=i.getChildContext();for(var r in i)if(!(r in e))throw Error(re(108,j0(t)||"Unknown",r));return mt({},n,i)}function Ml(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||Zi,Er=Wt.current,rt(Wt,t),rt(nn,nn.current),!0}function op(t,e,n){var i=t.stateNode;if(!i)throw Error(re(169));n?(t=l_(t,e,Er),i.__reactInternalMemoizedMergedChildContext=t,lt(nn),lt(Wt),rt(Wt,t)):lt(nn),rt(nn,n)}var ci=null,Ql=!1,zc=!1;function c_(t){ci===null?ci=[t]:ci.push(t)}function ly(t){Ql=!0,c_(t)}function tr(){if(!zc&&ci!==null){zc=!0;var t=0,e=et;try{var n=ci;for(et=1;t<n.length;t++){var i=n[t];do i=i(!0);while(i!==null)}ci=null,Ql=!1}catch(r){throw ci!==null&&(ci=ci.slice(t+1)),Ig(_d,tr),r}finally{et=e,zc=!1}}return null}var os=[],as=0,El=null,wl=0,Mn=[],En=0,wr=null,ui=1,fi="";function fr(t,e){os[as++]=wl,os[as++]=El,El=t,wl=e}function u_(t,e,n){Mn[En++]=ui,Mn[En++]=fi,Mn[En++]=wr,wr=t;var i=ui;t=fi;var r=32-kn(i)-1;i&=~(1<<r),n+=1;var s=32-kn(e)+r;if(30<s){var o=r-r%5;s=(i&(1<<o)-1).toString(32),i>>=o,r-=o,ui=1<<32-kn(e)+r|n<<r|i,fi=s+t}else ui=1<<s|n<<r|i,fi=t}function Ad(t){t.return!==null&&(fr(t,1),u_(t,1,0))}function Cd(t){for(;t===El;)El=os[--as],os[as]=null,wl=os[--as],os[as]=null;for(;t===wr;)wr=Mn[--En],Mn[En]=null,fi=Mn[--En],Mn[En]=null,ui=Mn[--En],Mn[En]=null}var gn=null,mn=null,ct=!1,Fn=null;function f_(t,e){var n=wn(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function ap(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,gn=t,mn=Vi(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,gn=t,mn=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=wr!==null?{id:ui,overflow:fi}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=wn(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,gn=t,mn=null,!0):!1;default:return!1}}function tf(t){return(t.mode&1)!==0&&(t.flags&128)===0}function nf(t){if(ct){var e=mn;if(e){var n=e;if(!ap(t,e)){if(tf(t))throw Error(re(418));e=Vi(n.nextSibling);var i=gn;e&&ap(t,e)?f_(i,n):(t.flags=t.flags&-4097|2,ct=!1,gn=t)}}else{if(tf(t))throw Error(re(418));t.flags=t.flags&-4097|2,ct=!1,gn=t}}}function lp(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;gn=t}function ma(t){if(t!==gn)return!1;if(!ct)return lp(t),ct=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!Zu(t.type,t.memoizedProps)),e&&(e=mn)){if(tf(t))throw d_(),Error(re(418));for(;e;)f_(t,e),e=Vi(e.nextSibling)}if(lp(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(re(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){mn=Vi(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}mn=null}}else mn=gn?Vi(t.stateNode.nextSibling):null;return!0}function d_(){for(var t=mn;t;)t=Vi(t.nextSibling)}function Ts(){mn=gn=null,ct=!1}function bd(t){Fn===null?Fn=[t]:Fn.push(t)}var cy=yi.ReactCurrentBatchConfig;function Zs(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(re(309));var i=n.stateNode}if(!i)throw Error(re(147,t));var r=i,s=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===s?e.ref:(e=function(o){var a=r.refs;o===null?delete a[s]:a[s]=o},e._stringRef=s,e)}if(typeof t!="string")throw Error(re(284));if(!n._owner)throw Error(re(290,t))}return t}function ga(t,e){throw t=Object.prototype.toString.call(e),Error(re(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function cp(t){var e=t._init;return e(t._payload)}function h_(t){function e(u,_){if(t){var g=u.deletions;g===null?(u.deletions=[_],u.flags|=16):g.push(_)}}function n(u,_){if(!t)return null;for(;_!==null;)e(u,_),_=_.sibling;return null}function i(u,_){for(u=new Map;_!==null;)_.key!==null?u.set(_.key,_):u.set(_.index,_),_=_.sibling;return u}function r(u,_){return u=Xi(u,_),u.index=0,u.sibling=null,u}function s(u,_,g){return u.index=g,t?(g=u.alternate,g!==null?(g=g.index,g<_?(u.flags|=2,_):g):(u.flags|=2,_)):(u.flags|=1048576,_)}function o(u){return t&&u.alternate===null&&(u.flags|=2),u}function a(u,_,g,S){return _===null||_.tag!==6?(_=jc(g,u.mode,S),_.return=u,_):(_=r(_,g),_.return=u,_)}function l(u,_,g,S){var b=g.type;return b===es?f(u,_,g.props.children,S,g.key):_!==null&&(_.elementType===b||typeof b=="object"&&b!==null&&b.$$typeof===Pi&&cp(b)===_.type)?(S=r(_,g.props),S.ref=Zs(u,_,g),S.return=u,S):(S=rl(g.type,g.key,g.props,null,u.mode,S),S.ref=Zs(u,_,g),S.return=u,S)}function c(u,_,g,S){return _===null||_.tag!==4||_.stateNode.containerInfo!==g.containerInfo||_.stateNode.implementation!==g.implementation?(_=Xc(g,u.mode,S),_.return=u,_):(_=r(_,g.children||[]),_.return=u,_)}function f(u,_,g,S,b){return _===null||_.tag!==7?(_=Mr(g,u.mode,S,b),_.return=u,_):(_=r(_,g),_.return=u,_)}function d(u,_,g){if(typeof _=="string"&&_!==""||typeof _=="number")return _=jc(""+_,u.mode,g),_.return=u,_;if(typeof _=="object"&&_!==null){switch(_.$$typeof){case sa:return g=rl(_.type,_.key,_.props,null,u.mode,g),g.ref=Zs(u,null,_),g.return=u,g;case Jr:return _=Xc(_,u.mode,g),_.return=u,_;case Pi:var S=_._init;return d(u,S(_._payload),g)}if(co(_)||Xs(_))return _=Mr(_,u.mode,g,null),_.return=u,_;ga(u,_)}return null}function h(u,_,g,S){var b=_!==null?_.key:null;if(typeof g=="string"&&g!==""||typeof g=="number")return b!==null?null:a(u,_,""+g,S);if(typeof g=="object"&&g!==null){switch(g.$$typeof){case sa:return g.key===b?l(u,_,g,S):null;case Jr:return g.key===b?c(u,_,g,S):null;case Pi:return b=g._init,h(u,_,b(g._payload),S)}if(co(g)||Xs(g))return b!==null?null:f(u,_,g,S,null);ga(u,g)}return null}function p(u,_,g,S,b){if(typeof S=="string"&&S!==""||typeof S=="number")return u=u.get(g)||null,a(_,u,""+S,b);if(typeof S=="object"&&S!==null){switch(S.$$typeof){case sa:return u=u.get(S.key===null?g:S.key)||null,l(_,u,S,b);case Jr:return u=u.get(S.key===null?g:S.key)||null,c(_,u,S,b);case Pi:var A=S._init;return p(u,_,g,A(S._payload),b)}if(co(S)||Xs(S))return u=u.get(g)||null,f(_,u,S,b,null);ga(_,S)}return null}function v(u,_,g,S){for(var b=null,A=null,T=_,C=_=0,E=null;T!==null&&C<g.length;C++){T.index>C?(E=T,T=null):E=T.sibling;var y=h(u,T,g[C],S);if(y===null){T===null&&(T=E);break}t&&T&&y.alternate===null&&e(u,T),_=s(y,_,C),A===null?b=y:A.sibling=y,A=y,T=E}if(C===g.length)return n(u,T),ct&&fr(u,C),b;if(T===null){for(;C<g.length;C++)T=d(u,g[C],S),T!==null&&(_=s(T,_,C),A===null?b=T:A.sibling=T,A=T);return ct&&fr(u,C),b}for(T=i(u,T);C<g.length;C++)E=p(T,u,C,g[C],S),E!==null&&(t&&E.alternate!==null&&T.delete(E.key===null?C:E.key),_=s(E,_,C),A===null?b=E:A.sibling=E,A=E);return t&&T.forEach(function(L){return e(u,L)}),ct&&fr(u,C),b}function x(u,_,g,S){var b=Xs(g);if(typeof b!="function")throw Error(re(150));if(g=b.call(g),g==null)throw Error(re(151));for(var A=b=null,T=_,C=_=0,E=null,y=g.next();T!==null&&!y.done;C++,y=g.next()){T.index>C?(E=T,T=null):E=T.sibling;var L=h(u,T,y.value,S);if(L===null){T===null&&(T=E);break}t&&T&&L.alternate===null&&e(u,T),_=s(L,_,C),A===null?b=L:A.sibling=L,A=L,T=E}if(y.done)return n(u,T),ct&&fr(u,C),b;if(T===null){for(;!y.done;C++,y=g.next())y=d(u,y.value,S),y!==null&&(_=s(y,_,C),A===null?b=y:A.sibling=y,A=y);return ct&&fr(u,C),b}for(T=i(u,T);!y.done;C++,y=g.next())y=p(T,u,C,y.value,S),y!==null&&(t&&y.alternate!==null&&T.delete(y.key===null?C:y.key),_=s(y,_,C),A===null?b=y:A.sibling=y,A=y);return t&&T.forEach(function(H){return e(u,H)}),ct&&fr(u,C),b}function m(u,_,g,S){if(typeof g=="object"&&g!==null&&g.type===es&&g.key===null&&(g=g.props.children),typeof g=="object"&&g!==null){switch(g.$$typeof){case sa:e:{for(var b=g.key,A=_;A!==null;){if(A.key===b){if(b=g.type,b===es){if(A.tag===7){n(u,A.sibling),_=r(A,g.props.children),_.return=u,u=_;break e}}else if(A.elementType===b||typeof b=="object"&&b!==null&&b.$$typeof===Pi&&cp(b)===A.type){n(u,A.sibling),_=r(A,g.props),_.ref=Zs(u,A,g),_.return=u,u=_;break e}n(u,A);break}else e(u,A);A=A.sibling}g.type===es?(_=Mr(g.props.children,u.mode,S,g.key),_.return=u,u=_):(S=rl(g.type,g.key,g.props,null,u.mode,S),S.ref=Zs(u,_,g),S.return=u,u=S)}return o(u);case Jr:e:{for(A=g.key;_!==null;){if(_.key===A)if(_.tag===4&&_.stateNode.containerInfo===g.containerInfo&&_.stateNode.implementation===g.implementation){n(u,_.sibling),_=r(_,g.children||[]),_.return=u,u=_;break e}else{n(u,_);break}else e(u,_);_=_.sibling}_=Xc(g,u.mode,S),_.return=u,u=_}return o(u);case Pi:return A=g._init,m(u,_,A(g._payload),S)}if(co(g))return v(u,_,g,S);if(Xs(g))return x(u,_,g,S);ga(u,g)}return typeof g=="string"&&g!==""||typeof g=="number"?(g=""+g,_!==null&&_.tag===6?(n(u,_.sibling),_=r(_,g),_.return=u,u=_):(n(u,_),_=jc(g,u.mode,S),_.return=u,u=_),o(u)):n(u,_)}return m}var As=h_(!0),p_=h_(!1),Tl=er(null),Al=null,ls=null,Rd=null;function Pd(){Rd=ls=Al=null}function Ld(t){var e=Tl.current;lt(Tl),t._currentValue=e}function rf(t,e,n){for(;t!==null;){var i=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,i!==null&&(i.childLanes|=e)):i!==null&&(i.childLanes&e)!==e&&(i.childLanes|=e),t===n)break;t=t.return}}function _s(t,e){Al=t,Rd=ls=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(en=!0),t.firstContext=null)}function Cn(t){var e=t._currentValue;if(Rd!==t)if(t={context:t,memoizedValue:e,next:null},ls===null){if(Al===null)throw Error(re(308));ls=t,Al.dependencies={lanes:0,firstContext:t}}else ls=ls.next=t;return e}var _r=null;function Nd(t){_r===null?_r=[t]:_r.push(t)}function m_(t,e,n,i){var r=e.interleaved;return r===null?(n.next=n,Nd(e)):(n.next=r.next,r.next=n),e.interleaved=n,gi(t,i)}function gi(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var Li=!1;function Dd(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function g_(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function hi(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function Gi(t,e,n){var i=t.updateQueue;if(i===null)return null;if(i=i.shared,Ye&2){var r=i.pending;return r===null?e.next=e:(e.next=r.next,r.next=e),i.pending=e,gi(t,n)}return r=i.interleaved,r===null?(e.next=e,Nd(i)):(e.next=r.next,r.next=e),i.interleaved=e,gi(t,n)}function Qa(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,vd(t,n)}}function up(t,e){var n=t.updateQueue,i=t.alternate;if(i!==null&&(i=i.updateQueue,n===i)){var r=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};s===null?r=s=o:s=s.next=o,n=n.next}while(n!==null);s===null?r=s=e:s=s.next=e}else r=s=e;n={baseState:i.baseState,firstBaseUpdate:r,lastBaseUpdate:s,shared:i.shared,effects:i.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function Cl(t,e,n,i){var r=t.updateQueue;Li=!1;var s=r.firstBaseUpdate,o=r.lastBaseUpdate,a=r.shared.pending;if(a!==null){r.shared.pending=null;var l=a,c=l.next;l.next=null,o===null?s=c:o.next=c,o=l;var f=t.alternate;f!==null&&(f=f.updateQueue,a=f.lastBaseUpdate,a!==o&&(a===null?f.firstBaseUpdate=c:a.next=c,f.lastBaseUpdate=l))}if(s!==null){var d=r.baseState;o=0,f=c=l=null,a=s;do{var h=a.lane,p=a.eventTime;if((i&h)===h){f!==null&&(f=f.next={eventTime:p,lane:0,tag:a.tag,payload:a.payload,callback:a.callback,next:null});e:{var v=t,x=a;switch(h=e,p=n,x.tag){case 1:if(v=x.payload,typeof v=="function"){d=v.call(p,d,h);break e}d=v;break e;case 3:v.flags=v.flags&-65537|128;case 0:if(v=x.payload,h=typeof v=="function"?v.call(p,d,h):v,h==null)break e;d=mt({},d,h);break e;case 2:Li=!0}}a.callback!==null&&a.lane!==0&&(t.flags|=64,h=r.effects,h===null?r.effects=[a]:h.push(a))}else p={eventTime:p,lane:h,tag:a.tag,payload:a.payload,callback:a.callback,next:null},f===null?(c=f=p,l=d):f=f.next=p,o|=h;if(a=a.next,a===null){if(a=r.shared.pending,a===null)break;h=a,a=h.next,h.next=null,r.lastBaseUpdate=h,r.shared.pending=null}}while(!0);if(f===null&&(l=d),r.baseState=l,r.firstBaseUpdate=c,r.lastBaseUpdate=f,e=r.shared.interleaved,e!==null){r=e;do o|=r.lane,r=r.next;while(r!==e)}else s===null&&(r.shared.lanes=0);Ar|=o,t.lanes=o,t.memoizedState=d}}function fp(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var i=t[e],r=i.callback;if(r!==null){if(i.callback=null,i=n,typeof r!="function")throw Error(re(191,r));r.call(i)}}}var qo={},Jn=er(qo),Fo=er(qo),Oo=er(qo);function vr(t){if(t===qo)throw Error(re(174));return t}function Id(t,e){switch(rt(Oo,e),rt(Fo,t),rt(Jn,qo),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:Ou(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=Ou(e,t)}lt(Jn),rt(Jn,e)}function Cs(){lt(Jn),lt(Fo),lt(Oo)}function __(t){vr(Oo.current);var e=vr(Jn.current),n=Ou(e,t.type);e!==n&&(rt(Fo,t),rt(Jn,n))}function Ud(t){Fo.current===t&&(lt(Jn),lt(Fo))}var ft=er(0);function bl(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var kc=[];function Fd(){for(var t=0;t<kc.length;t++)kc[t]._workInProgressVersionPrimary=null;kc.length=0}var Ja=yi.ReactCurrentDispatcher,Bc=yi.ReactCurrentBatchConfig,Tr=0,dt=null,Tt=null,Pt=null,Rl=!1,yo=!1,zo=0,uy=0;function zt(){throw Error(re(321))}function Od(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!Hn(t[n],e[n]))return!1;return!0}function zd(t,e,n,i,r,s){if(Tr=s,dt=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,Ja.current=t===null||t.memoizedState===null?py:my,t=n(i,r),yo){s=0;do{if(yo=!1,zo=0,25<=s)throw Error(re(301));s+=1,Pt=Tt=null,e.updateQueue=null,Ja.current=gy,t=n(i,r)}while(yo)}if(Ja.current=Pl,e=Tt!==null&&Tt.next!==null,Tr=0,Pt=Tt=dt=null,Rl=!1,e)throw Error(re(300));return t}function kd(){var t=zo!==0;return zo=0,t}function jn(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Pt===null?dt.memoizedState=Pt=t:Pt=Pt.next=t,Pt}function bn(){if(Tt===null){var t=dt.alternate;t=t!==null?t.memoizedState:null}else t=Tt.next;var e=Pt===null?dt.memoizedState:Pt.next;if(e!==null)Pt=e,Tt=t;else{if(t===null)throw Error(re(310));Tt=t,t={memoizedState:Tt.memoizedState,baseState:Tt.baseState,baseQueue:Tt.baseQueue,queue:Tt.queue,next:null},Pt===null?dt.memoizedState=Pt=t:Pt=Pt.next=t}return Pt}function ko(t,e){return typeof e=="function"?e(t):e}function Hc(t){var e=bn(),n=e.queue;if(n===null)throw Error(re(311));n.lastRenderedReducer=t;var i=Tt,r=i.baseQueue,s=n.pending;if(s!==null){if(r!==null){var o=r.next;r.next=s.next,s.next=o}i.baseQueue=r=s,n.pending=null}if(r!==null){s=r.next,i=i.baseState;var a=o=null,l=null,c=s;do{var f=c.lane;if((Tr&f)===f)l!==null&&(l=l.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),i=c.hasEagerState?c.eagerState:t(i,c.action);else{var d={lane:f,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};l===null?(a=l=d,o=i):l=l.next=d,dt.lanes|=f,Ar|=f}c=c.next}while(c!==null&&c!==s);l===null?o=i:l.next=a,Hn(i,e.memoizedState)||(en=!0),e.memoizedState=i,e.baseState=o,e.baseQueue=l,n.lastRenderedState=i}if(t=n.interleaved,t!==null){r=t;do s=r.lane,dt.lanes|=s,Ar|=s,r=r.next;while(r!==t)}else r===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function Vc(t){var e=bn(),n=e.queue;if(n===null)throw Error(re(311));n.lastRenderedReducer=t;var i=n.dispatch,r=n.pending,s=e.memoizedState;if(r!==null){n.pending=null;var o=r=r.next;do s=t(s,o.action),o=o.next;while(o!==r);Hn(s,e.memoizedState)||(en=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),n.lastRenderedState=s}return[s,i]}function v_(){}function x_(t,e){var n=dt,i=bn(),r=e(),s=!Hn(i.memoizedState,r);if(s&&(i.memoizedState=r,en=!0),i=i.queue,Bd(M_.bind(null,n,i,t),[t]),i.getSnapshot!==e||s||Pt!==null&&Pt.memoizedState.tag&1){if(n.flags|=2048,Bo(9,S_.bind(null,n,i,r,e),void 0,null),Lt===null)throw Error(re(349));Tr&30||y_(n,e,r)}return r}function y_(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=dt.updateQueue,e===null?(e={lastEffect:null,stores:null},dt.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function S_(t,e,n,i){e.value=n,e.getSnapshot=i,E_(e)&&w_(t)}function M_(t,e,n){return n(function(){E_(e)&&w_(t)})}function E_(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!Hn(t,n)}catch{return!0}}function w_(t){var e=gi(t,1);e!==null&&Bn(e,t,1,-1)}function dp(t){var e=jn();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:ko,lastRenderedState:t},e.queue=t,t=t.dispatch=hy.bind(null,dt,t),[e.memoizedState,t]}function Bo(t,e,n,i){return t={tag:t,create:e,destroy:n,deps:i,next:null},e=dt.updateQueue,e===null?(e={lastEffect:null,stores:null},dt.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(i=n.next,n.next=t,t.next=i,e.lastEffect=t)),t}function T_(){return bn().memoizedState}function el(t,e,n,i){var r=jn();dt.flags|=t,r.memoizedState=Bo(1|e,n,void 0,i===void 0?null:i)}function Jl(t,e,n,i){var r=bn();i=i===void 0?null:i;var s=void 0;if(Tt!==null){var o=Tt.memoizedState;if(s=o.destroy,i!==null&&Od(i,o.deps)){r.memoizedState=Bo(e,n,s,i);return}}dt.flags|=t,r.memoizedState=Bo(1|e,n,s,i)}function hp(t,e){return el(8390656,8,t,e)}function Bd(t,e){return Jl(2048,8,t,e)}function A_(t,e){return Jl(4,2,t,e)}function C_(t,e){return Jl(4,4,t,e)}function b_(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function R_(t,e,n){return n=n!=null?n.concat([t]):null,Jl(4,4,b_.bind(null,e,t),n)}function Hd(){}function P_(t,e){var n=bn();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&Od(e,i[1])?i[0]:(n.memoizedState=[t,e],t)}function L_(t,e){var n=bn();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&Od(e,i[1])?i[0]:(t=t(),n.memoizedState=[t,e],t)}function N_(t,e,n){return Tr&21?(Hn(n,e)||(n=Og(),dt.lanes|=n,Ar|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,en=!0),t.memoizedState=n)}function fy(t,e){var n=et;et=n!==0&&4>n?n:4,t(!0);var i=Bc.transition;Bc.transition={};try{t(!1),e()}finally{et=n,Bc.transition=i}}function D_(){return bn().memoizedState}function dy(t,e,n){var i=ji(t);if(n={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null},I_(t))U_(e,n);else if(n=m_(t,e,n,i),n!==null){var r=Yt();Bn(n,t,i,r),F_(n,e,i)}}function hy(t,e,n){var i=ji(t),r={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null};if(I_(t))U_(e,r);else{var s=t.alternate;if(t.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var o=e.lastRenderedState,a=s(o,n);if(r.hasEagerState=!0,r.eagerState=a,Hn(a,o)){var l=e.interleaved;l===null?(r.next=r,Nd(e)):(r.next=l.next,l.next=r),e.interleaved=r;return}}catch{}finally{}n=m_(t,e,r,i),n!==null&&(r=Yt(),Bn(n,t,i,r),F_(n,e,i))}}function I_(t){var e=t.alternate;return t===dt||e!==null&&e===dt}function U_(t,e){yo=Rl=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function F_(t,e,n){if(n&4194240){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,vd(t,n)}}var Pl={readContext:Cn,useCallback:zt,useContext:zt,useEffect:zt,useImperativeHandle:zt,useInsertionEffect:zt,useLayoutEffect:zt,useMemo:zt,useReducer:zt,useRef:zt,useState:zt,useDebugValue:zt,useDeferredValue:zt,useTransition:zt,useMutableSource:zt,useSyncExternalStore:zt,useId:zt,unstable_isNewReconciler:!1},py={readContext:Cn,useCallback:function(t,e){return jn().memoizedState=[t,e===void 0?null:e],t},useContext:Cn,useEffect:hp,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,el(4194308,4,b_.bind(null,e,t),n)},useLayoutEffect:function(t,e){return el(4194308,4,t,e)},useInsertionEffect:function(t,e){return el(4,2,t,e)},useMemo:function(t,e){var n=jn();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var i=jn();return e=n!==void 0?n(e):e,i.memoizedState=i.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},i.queue=t,t=t.dispatch=dy.bind(null,dt,t),[i.memoizedState,t]},useRef:function(t){var e=jn();return t={current:t},e.memoizedState=t},useState:dp,useDebugValue:Hd,useDeferredValue:function(t){return jn().memoizedState=t},useTransition:function(){var t=dp(!1),e=t[0];return t=fy.bind(null,t[1]),jn().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var i=dt,r=jn();if(ct){if(n===void 0)throw Error(re(407));n=n()}else{if(n=e(),Lt===null)throw Error(re(349));Tr&30||y_(i,e,n)}r.memoizedState=n;var s={value:n,getSnapshot:e};return r.queue=s,hp(M_.bind(null,i,s,t),[t]),i.flags|=2048,Bo(9,S_.bind(null,i,s,n,e),void 0,null),n},useId:function(){var t=jn(),e=Lt.identifierPrefix;if(ct){var n=fi,i=ui;n=(i&~(1<<32-kn(i)-1)).toString(32)+n,e=":"+e+"R"+n,n=zo++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=uy++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},my={readContext:Cn,useCallback:P_,useContext:Cn,useEffect:Bd,useImperativeHandle:R_,useInsertionEffect:A_,useLayoutEffect:C_,useMemo:L_,useReducer:Hc,useRef:T_,useState:function(){return Hc(ko)},useDebugValue:Hd,useDeferredValue:function(t){var e=bn();return N_(e,Tt.memoizedState,t)},useTransition:function(){var t=Hc(ko)[0],e=bn().memoizedState;return[t,e]},useMutableSource:v_,useSyncExternalStore:x_,useId:D_,unstable_isNewReconciler:!1},gy={readContext:Cn,useCallback:P_,useContext:Cn,useEffect:Bd,useImperativeHandle:R_,useInsertionEffect:A_,useLayoutEffect:C_,useMemo:L_,useReducer:Vc,useRef:T_,useState:function(){return Vc(ko)},useDebugValue:Hd,useDeferredValue:function(t){var e=bn();return Tt===null?e.memoizedState=t:N_(e,Tt.memoizedState,t)},useTransition:function(){var t=Vc(ko)[0],e=bn().memoizedState;return[t,e]},useMutableSource:v_,useSyncExternalStore:x_,useId:D_,unstable_isNewReconciler:!1};function In(t,e){if(t&&t.defaultProps){e=mt({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function sf(t,e,n,i){e=t.memoizedState,n=n(i,e),n=n==null?e:mt({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var ec={isMounted:function(t){return(t=t._reactInternals)?Nr(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var i=Yt(),r=ji(t),s=hi(i,r);s.payload=e,n!=null&&(s.callback=n),e=Gi(t,s,r),e!==null&&(Bn(e,t,r,i),Qa(e,t,r))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var i=Yt(),r=ji(t),s=hi(i,r);s.tag=1,s.payload=e,n!=null&&(s.callback=n),e=Gi(t,s,r),e!==null&&(Bn(e,t,r,i),Qa(e,t,r))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=Yt(),i=ji(t),r=hi(n,i);r.tag=2,e!=null&&(r.callback=e),e=Gi(t,r,i),e!==null&&(Bn(e,t,i,n),Qa(e,t,i))}};function pp(t,e,n,i,r,s,o){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(i,s,o):e.prototype&&e.prototype.isPureReactComponent?!No(n,i)||!No(r,s):!0}function O_(t,e,n){var i=!1,r=Zi,s=e.contextType;return typeof s=="object"&&s!==null?s=Cn(s):(r=rn(e)?Er:Wt.current,i=e.contextTypes,s=(i=i!=null)?ws(t,r):Zi),e=new e(n,s),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=ec,t.stateNode=e,e._reactInternals=t,i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=r,t.__reactInternalMemoizedMaskedChildContext=s),e}function mp(t,e,n,i){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,i),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,i),e.state!==t&&ec.enqueueReplaceState(e,e.state,null)}function of(t,e,n,i){var r=t.stateNode;r.props=n,r.state=t.memoizedState,r.refs={},Dd(t);var s=e.contextType;typeof s=="object"&&s!==null?r.context=Cn(s):(s=rn(e)?Er:Wt.current,r.context=ws(t,s)),r.state=t.memoizedState,s=e.getDerivedStateFromProps,typeof s=="function"&&(sf(t,e,s,n),r.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof r.getSnapshotBeforeUpdate=="function"||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(e=r.state,typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount(),e!==r.state&&ec.enqueueReplaceState(r,r.state,null),Cl(t,n,r,i),r.state=t.memoizedState),typeof r.componentDidMount=="function"&&(t.flags|=4194308)}function bs(t,e){try{var n="",i=e;do n+=W0(i),i=i.return;while(i);var r=n}catch(s){r=`
Error generating stack: `+s.message+`
`+s.stack}return{value:t,source:e,stack:r,digest:null}}function Gc(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function af(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var _y=typeof WeakMap=="function"?WeakMap:Map;function z_(t,e,n){n=hi(-1,n),n.tag=3,n.payload={element:null};var i=e.value;return n.callback=function(){Nl||(Nl=!0,_f=i),af(t,e)},n}function k_(t,e,n){n=hi(-1,n),n.tag=3;var i=t.type.getDerivedStateFromError;if(typeof i=="function"){var r=e.value;n.payload=function(){return i(r)},n.callback=function(){af(t,e)}}var s=t.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(n.callback=function(){af(t,e),typeof i!="function"&&(Wi===null?Wi=new Set([this]):Wi.add(this));var o=e.stack;this.componentDidCatch(e.value,{componentStack:o!==null?o:""})}),n}function gp(t,e,n){var i=t.pingCache;if(i===null){i=t.pingCache=new _y;var r=new Set;i.set(e,r)}else r=i.get(e),r===void 0&&(r=new Set,i.set(e,r));r.has(n)||(r.add(n),t=Ly.bind(null,t,e,n),e.then(t,t))}function _p(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function vp(t,e,n,i,r){return t.mode&1?(t.flags|=65536,t.lanes=r,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=hi(-1,1),e.tag=2,Gi(n,e,1))),n.lanes|=1),t)}var vy=yi.ReactCurrentOwner,en=!1;function Xt(t,e,n,i){e.child=t===null?p_(e,null,n,i):As(e,t.child,n,i)}function xp(t,e,n,i,r){n=n.render;var s=e.ref;return _s(e,r),i=zd(t,e,n,i,s,r),n=kd(),t!==null&&!en?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,_i(t,e,r)):(ct&&n&&Ad(e),e.flags|=1,Xt(t,e,i,r),e.child)}function yp(t,e,n,i,r){if(t===null){var s=n.type;return typeof s=="function"&&!qd(s)&&s.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=s,B_(t,e,s,i,r)):(t=rl(n.type,null,i,e,e.mode,r),t.ref=e.ref,t.return=e,e.child=t)}if(s=t.child,!(t.lanes&r)){var o=s.memoizedProps;if(n=n.compare,n=n!==null?n:No,n(o,i)&&t.ref===e.ref)return _i(t,e,r)}return e.flags|=1,t=Xi(s,i),t.ref=e.ref,t.return=e,e.child=t}function B_(t,e,n,i,r){if(t!==null){var s=t.memoizedProps;if(No(s,i)&&t.ref===e.ref)if(en=!1,e.pendingProps=i=s,(t.lanes&r)!==0)t.flags&131072&&(en=!0);else return e.lanes=t.lanes,_i(t,e,r)}return lf(t,e,n,i,r)}function H_(t,e,n){var i=e.pendingProps,r=i.children,s=t!==null?t.memoizedState:null;if(i.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},rt(us,dn),dn|=n;else{if(!(n&1073741824))return t=s!==null?s.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,rt(us,dn),dn|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},i=s!==null?s.baseLanes:n,rt(us,dn),dn|=i}else s!==null?(i=s.baseLanes|n,e.memoizedState=null):i=n,rt(us,dn),dn|=i;return Xt(t,e,r,n),e.child}function V_(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function lf(t,e,n,i,r){var s=rn(n)?Er:Wt.current;return s=ws(e,s),_s(e,r),n=zd(t,e,n,i,s,r),i=kd(),t!==null&&!en?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,_i(t,e,r)):(ct&&i&&Ad(e),e.flags|=1,Xt(t,e,n,r),e.child)}function Sp(t,e,n,i,r){if(rn(n)){var s=!0;Ml(e)}else s=!1;if(_s(e,r),e.stateNode===null)tl(t,e),O_(e,n,i),of(e,n,i,r),i=!0;else if(t===null){var o=e.stateNode,a=e.memoizedProps;o.props=a;var l=o.context,c=n.contextType;typeof c=="object"&&c!==null?c=Cn(c):(c=rn(n)?Er:Wt.current,c=ws(e,c));var f=n.getDerivedStateFromProps,d=typeof f=="function"||typeof o.getSnapshotBeforeUpdate=="function";d||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==i||l!==c)&&mp(e,o,i,c),Li=!1;var h=e.memoizedState;o.state=h,Cl(e,i,o,r),l=e.memoizedState,a!==i||h!==l||nn.current||Li?(typeof f=="function"&&(sf(e,n,f,i),l=e.memoizedState),(a=Li||pp(e,n,a,i,h,l,c))?(d||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(e.flags|=4194308)):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=i,e.memoizedState=l),o.props=i,o.state=l,o.context=c,i=a):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),i=!1)}else{o=e.stateNode,g_(t,e),a=e.memoizedProps,c=e.type===e.elementType?a:In(e.type,a),o.props=c,d=e.pendingProps,h=o.context,l=n.contextType,typeof l=="object"&&l!==null?l=Cn(l):(l=rn(n)?Er:Wt.current,l=ws(e,l));var p=n.getDerivedStateFromProps;(f=typeof p=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==d||h!==l)&&mp(e,o,i,l),Li=!1,h=e.memoizedState,o.state=h,Cl(e,i,o,r);var v=e.memoizedState;a!==d||h!==v||nn.current||Li?(typeof p=="function"&&(sf(e,n,p,i),v=e.memoizedState),(c=Li||pp(e,n,c,i,h,v,l)||!1)?(f||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(i,v,l),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(i,v,l)),typeof o.componentDidUpdate=="function"&&(e.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof o.componentDidUpdate!="function"||a===t.memoizedProps&&h===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===t.memoizedProps&&h===t.memoizedState||(e.flags|=1024),e.memoizedProps=i,e.memoizedState=v),o.props=i,o.state=v,o.context=l,i=c):(typeof o.componentDidUpdate!="function"||a===t.memoizedProps&&h===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===t.memoizedProps&&h===t.memoizedState||(e.flags|=1024),i=!1)}return cf(t,e,n,i,s,r)}function cf(t,e,n,i,r,s){V_(t,e);var o=(e.flags&128)!==0;if(!i&&!o)return r&&op(e,n,!1),_i(t,e,s);i=e.stateNode,vy.current=e;var a=o&&typeof n.getDerivedStateFromError!="function"?null:i.render();return e.flags|=1,t!==null&&o?(e.child=As(e,t.child,null,s),e.child=As(e,null,a,s)):Xt(t,e,a,s),e.memoizedState=i.state,r&&op(e,n,!0),e.child}function G_(t){var e=t.stateNode;e.pendingContext?sp(t,e.pendingContext,e.pendingContext!==e.context):e.context&&sp(t,e.context,!1),Id(t,e.containerInfo)}function Mp(t,e,n,i,r){return Ts(),bd(r),e.flags|=256,Xt(t,e,n,i),e.child}var uf={dehydrated:null,treeContext:null,retryLane:0};function ff(t){return{baseLanes:t,cachePool:null,transitions:null}}function W_(t,e,n){var i=e.pendingProps,r=ft.current,s=!1,o=(e.flags&128)!==0,a;if((a=o)||(a=t!==null&&t.memoizedState===null?!1:(r&2)!==0),a?(s=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(r|=1),rt(ft,r&1),t===null)return nf(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(o=i.children,t=i.fallback,s?(i=e.mode,s=e.child,o={mode:"hidden",children:o},!(i&1)&&s!==null?(s.childLanes=0,s.pendingProps=o):s=ic(o,i,0,null),t=Mr(t,i,n,null),s.return=e,t.return=e,s.sibling=t,e.child=s,e.child.memoizedState=ff(n),e.memoizedState=uf,t):Vd(e,o));if(r=t.memoizedState,r!==null&&(a=r.dehydrated,a!==null))return xy(t,e,o,i,a,r,n);if(s){s=i.fallback,o=e.mode,r=t.child,a=r.sibling;var l={mode:"hidden",children:i.children};return!(o&1)&&e.child!==r?(i=e.child,i.childLanes=0,i.pendingProps=l,e.deletions=null):(i=Xi(r,l),i.subtreeFlags=r.subtreeFlags&14680064),a!==null?s=Xi(a,s):(s=Mr(s,o,n,null),s.flags|=2),s.return=e,i.return=e,i.sibling=s,e.child=i,i=s,s=e.child,o=t.child.memoizedState,o=o===null?ff(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},s.memoizedState=o,s.childLanes=t.childLanes&~n,e.memoizedState=uf,i}return s=t.child,t=s.sibling,i=Xi(s,{mode:"visible",children:i.children}),!(e.mode&1)&&(i.lanes=n),i.return=e,i.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=i,e.memoizedState=null,i}function Vd(t,e){return e=ic({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function _a(t,e,n,i){return i!==null&&bd(i),As(e,t.child,null,n),t=Vd(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function xy(t,e,n,i,r,s,o){if(n)return e.flags&256?(e.flags&=-257,i=Gc(Error(re(422))),_a(t,e,o,i)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(s=i.fallback,r=e.mode,i=ic({mode:"visible",children:i.children},r,0,null),s=Mr(s,r,o,null),s.flags|=2,i.return=e,s.return=e,i.sibling=s,e.child=i,e.mode&1&&As(e,t.child,null,o),e.child.memoizedState=ff(o),e.memoizedState=uf,s);if(!(e.mode&1))return _a(t,e,o,null);if(r.data==="$!"){if(i=r.nextSibling&&r.nextSibling.dataset,i)var a=i.dgst;return i=a,s=Error(re(419)),i=Gc(s,i,void 0),_a(t,e,o,i)}if(a=(o&t.childLanes)!==0,en||a){if(i=Lt,i!==null){switch(o&-o){case 4:r=2;break;case 16:r=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:r=32;break;case 536870912:r=268435456;break;default:r=0}r=r&(i.suspendedLanes|o)?0:r,r!==0&&r!==s.retryLane&&(s.retryLane=r,gi(t,r),Bn(i,t,r,-1))}return $d(),i=Gc(Error(re(421))),_a(t,e,o,i)}return r.data==="$?"?(e.flags|=128,e.child=t.child,e=Ny.bind(null,t),r._reactRetry=e,null):(t=s.treeContext,mn=Vi(r.nextSibling),gn=e,ct=!0,Fn=null,t!==null&&(Mn[En++]=ui,Mn[En++]=fi,Mn[En++]=wr,ui=t.id,fi=t.overflow,wr=e),e=Vd(e,i.children),e.flags|=4096,e)}function Ep(t,e,n){t.lanes|=e;var i=t.alternate;i!==null&&(i.lanes|=e),rf(t.return,e,n)}function Wc(t,e,n,i,r){var s=t.memoizedState;s===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:i,tail:n,tailMode:r}:(s.isBackwards=e,s.rendering=null,s.renderingStartTime=0,s.last=i,s.tail=n,s.tailMode=r)}function j_(t,e,n){var i=e.pendingProps,r=i.revealOrder,s=i.tail;if(Xt(t,e,i.children,n),i=ft.current,i&2)i=i&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&Ep(t,n,e);else if(t.tag===19)Ep(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}i&=1}if(rt(ft,i),!(e.mode&1))e.memoizedState=null;else switch(r){case"forwards":for(n=e.child,r=null;n!==null;)t=n.alternate,t!==null&&bl(t)===null&&(r=n),n=n.sibling;n=r,n===null?(r=e.child,e.child=null):(r=n.sibling,n.sibling=null),Wc(e,!1,r,n,s);break;case"backwards":for(n=null,r=e.child,e.child=null;r!==null;){if(t=r.alternate,t!==null&&bl(t)===null){e.child=r;break}t=r.sibling,r.sibling=n,n=r,r=t}Wc(e,!0,n,null,s);break;case"together":Wc(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function tl(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function _i(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),Ar|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(re(153));if(e.child!==null){for(t=e.child,n=Xi(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=Xi(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function yy(t,e,n){switch(e.tag){case 3:G_(e),Ts();break;case 5:__(e);break;case 1:rn(e.type)&&Ml(e);break;case 4:Id(e,e.stateNode.containerInfo);break;case 10:var i=e.type._context,r=e.memoizedProps.value;rt(Tl,i._currentValue),i._currentValue=r;break;case 13:if(i=e.memoizedState,i!==null)return i.dehydrated!==null?(rt(ft,ft.current&1),e.flags|=128,null):n&e.child.childLanes?W_(t,e,n):(rt(ft,ft.current&1),t=_i(t,e,n),t!==null?t.sibling:null);rt(ft,ft.current&1);break;case 19:if(i=(n&e.childLanes)!==0,t.flags&128){if(i)return j_(t,e,n);e.flags|=128}if(r=e.memoizedState,r!==null&&(r.rendering=null,r.tail=null,r.lastEffect=null),rt(ft,ft.current),i)break;return null;case 22:case 23:return e.lanes=0,H_(t,e,n)}return _i(t,e,n)}var X_,df,Y_,$_;X_=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};df=function(){};Y_=function(t,e,n,i){var r=t.memoizedProps;if(r!==i){t=e.stateNode,vr(Jn.current);var s=null;switch(n){case"input":r=Du(t,r),i=Du(t,i),s=[];break;case"select":r=mt({},r,{value:void 0}),i=mt({},i,{value:void 0}),s=[];break;case"textarea":r=Fu(t,r),i=Fu(t,i),s=[];break;default:typeof r.onClick!="function"&&typeof i.onClick=="function"&&(t.onclick=yl)}zu(n,i);var o;n=null;for(c in r)if(!i.hasOwnProperty(c)&&r.hasOwnProperty(c)&&r[c]!=null)if(c==="style"){var a=r[c];for(o in a)a.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(To.hasOwnProperty(c)?s||(s=[]):(s=s||[]).push(c,null));for(c in i){var l=i[c];if(a=r!=null?r[c]:void 0,i.hasOwnProperty(c)&&l!==a&&(l!=null||a!=null))if(c==="style")if(a){for(o in a)!a.hasOwnProperty(o)||l&&l.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in l)l.hasOwnProperty(o)&&a[o]!==l[o]&&(n||(n={}),n[o]=l[o])}else n||(s||(s=[]),s.push(c,n)),n=l;else c==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,a=a?a.__html:void 0,l!=null&&a!==l&&(s=s||[]).push(c,l)):c==="children"?typeof l!="string"&&typeof l!="number"||(s=s||[]).push(c,""+l):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(To.hasOwnProperty(c)?(l!=null&&c==="onScroll"&&st("scroll",t),s||a===l||(s=[])):(s=s||[]).push(c,l))}n&&(s=s||[]).push("style",n);var c=s;(e.updateQueue=c)&&(e.flags|=4)}};$_=function(t,e,n,i){n!==i&&(e.flags|=4)};function Qs(t,e){if(!ct)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var i=null;n!==null;)n.alternate!==null&&(i=n),n=n.sibling;i===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:i.sibling=null}}function kt(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,i=0;if(e)for(var r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags&14680064,i|=r.flags&14680064,r.return=t,r=r.sibling;else for(r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags,i|=r.flags,r.return=t,r=r.sibling;return t.subtreeFlags|=i,t.childLanes=n,e}function Sy(t,e,n){var i=e.pendingProps;switch(Cd(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return kt(e),null;case 1:return rn(e.type)&&Sl(),kt(e),null;case 3:return i=e.stateNode,Cs(),lt(nn),lt(Wt),Fd(),i.pendingContext&&(i.context=i.pendingContext,i.pendingContext=null),(t===null||t.child===null)&&(ma(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,Fn!==null&&(yf(Fn),Fn=null))),df(t,e),kt(e),null;case 5:Ud(e);var r=vr(Oo.current);if(n=e.type,t!==null&&e.stateNode!=null)Y_(t,e,n,i,r),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!i){if(e.stateNode===null)throw Error(re(166));return kt(e),null}if(t=vr(Jn.current),ma(e)){i=e.stateNode,n=e.type;var s=e.memoizedProps;switch(i[$n]=e,i[Uo]=s,t=(e.mode&1)!==0,n){case"dialog":st("cancel",i),st("close",i);break;case"iframe":case"object":case"embed":st("load",i);break;case"video":case"audio":for(r=0;r<fo.length;r++)st(fo[r],i);break;case"source":st("error",i);break;case"img":case"image":case"link":st("error",i),st("load",i);break;case"details":st("toggle",i);break;case"input":Nh(i,s),st("invalid",i);break;case"select":i._wrapperState={wasMultiple:!!s.multiple},st("invalid",i);break;case"textarea":Ih(i,s),st("invalid",i)}zu(n,s),r=null;for(var o in s)if(s.hasOwnProperty(o)){var a=s[o];o==="children"?typeof a=="string"?i.textContent!==a&&(s.suppressHydrationWarning!==!0&&pa(i.textContent,a,t),r=["children",a]):typeof a=="number"&&i.textContent!==""+a&&(s.suppressHydrationWarning!==!0&&pa(i.textContent,a,t),r=["children",""+a]):To.hasOwnProperty(o)&&a!=null&&o==="onScroll"&&st("scroll",i)}switch(n){case"input":oa(i),Dh(i,s,!0);break;case"textarea":oa(i),Uh(i);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(i.onclick=yl)}i=r,e.updateQueue=i,i!==null&&(e.flags|=4)}else{o=r.nodeType===9?r:r.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=Mg(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=o.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof i.is=="string"?t=o.createElement(n,{is:i.is}):(t=o.createElement(n),n==="select"&&(o=t,i.multiple?o.multiple=!0:i.size&&(o.size=i.size))):t=o.createElementNS(t,n),t[$n]=e,t[Uo]=i,X_(t,e,!1,!1),e.stateNode=t;e:{switch(o=ku(n,i),n){case"dialog":st("cancel",t),st("close",t),r=i;break;case"iframe":case"object":case"embed":st("load",t),r=i;break;case"video":case"audio":for(r=0;r<fo.length;r++)st(fo[r],t);r=i;break;case"source":st("error",t),r=i;break;case"img":case"image":case"link":st("error",t),st("load",t),r=i;break;case"details":st("toggle",t),r=i;break;case"input":Nh(t,i),r=Du(t,i),st("invalid",t);break;case"option":r=i;break;case"select":t._wrapperState={wasMultiple:!!i.multiple},r=mt({},i,{value:void 0}),st("invalid",t);break;case"textarea":Ih(t,i),r=Fu(t,i),st("invalid",t);break;default:r=i}zu(n,r),a=r;for(s in a)if(a.hasOwnProperty(s)){var l=a[s];s==="style"?Tg(t,l):s==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&Eg(t,l)):s==="children"?typeof l=="string"?(n!=="textarea"||l!=="")&&Ao(t,l):typeof l=="number"&&Ao(t,""+l):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(To.hasOwnProperty(s)?l!=null&&s==="onScroll"&&st("scroll",t):l!=null&&dd(t,s,l,o))}switch(n){case"input":oa(t),Dh(t,i,!1);break;case"textarea":oa(t),Uh(t);break;case"option":i.value!=null&&t.setAttribute("value",""+Ki(i.value));break;case"select":t.multiple=!!i.multiple,s=i.value,s!=null?hs(t,!!i.multiple,s,!1):i.defaultValue!=null&&hs(t,!!i.multiple,i.defaultValue,!0);break;default:typeof r.onClick=="function"&&(t.onclick=yl)}switch(n){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}}i&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return kt(e),null;case 6:if(t&&e.stateNode!=null)$_(t,e,t.memoizedProps,i);else{if(typeof i!="string"&&e.stateNode===null)throw Error(re(166));if(n=vr(Oo.current),vr(Jn.current),ma(e)){if(i=e.stateNode,n=e.memoizedProps,i[$n]=e,(s=i.nodeValue!==n)&&(t=gn,t!==null))switch(t.tag){case 3:pa(i.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&pa(i.nodeValue,n,(t.mode&1)!==0)}s&&(e.flags|=4)}else i=(n.nodeType===9?n:n.ownerDocument).createTextNode(i),i[$n]=e,e.stateNode=i}return kt(e),null;case 13:if(lt(ft),i=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(ct&&mn!==null&&e.mode&1&&!(e.flags&128))d_(),Ts(),e.flags|=98560,s=!1;else if(s=ma(e),i!==null&&i.dehydrated!==null){if(t===null){if(!s)throw Error(re(318));if(s=e.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(re(317));s[$n]=e}else Ts(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;kt(e),s=!1}else Fn!==null&&(yf(Fn),Fn=null),s=!0;if(!s)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(i=i!==null,i!==(t!==null&&t.memoizedState!==null)&&i&&(e.child.flags|=8192,e.mode&1&&(t===null||ft.current&1?At===0&&(At=3):$d())),e.updateQueue!==null&&(e.flags|=4),kt(e),null);case 4:return Cs(),df(t,e),t===null&&Do(e.stateNode.containerInfo),kt(e),null;case 10:return Ld(e.type._context),kt(e),null;case 17:return rn(e.type)&&Sl(),kt(e),null;case 19:if(lt(ft),s=e.memoizedState,s===null)return kt(e),null;if(i=(e.flags&128)!==0,o=s.rendering,o===null)if(i)Qs(s,!1);else{if(At!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(o=bl(t),o!==null){for(e.flags|=128,Qs(s,!1),i=o.updateQueue,i!==null&&(e.updateQueue=i,e.flags|=4),e.subtreeFlags=0,i=n,n=e.child;n!==null;)s=n,t=i,s.flags&=14680066,o=s.alternate,o===null?(s.childLanes=0,s.lanes=t,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=o.childLanes,s.lanes=o.lanes,s.child=o.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=o.memoizedProps,s.memoizedState=o.memoizedState,s.updateQueue=o.updateQueue,s.type=o.type,t=o.dependencies,s.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return rt(ft,ft.current&1|2),e.child}t=t.sibling}s.tail!==null&&xt()>Rs&&(e.flags|=128,i=!0,Qs(s,!1),e.lanes=4194304)}else{if(!i)if(t=bl(o),t!==null){if(e.flags|=128,i=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),Qs(s,!0),s.tail===null&&s.tailMode==="hidden"&&!o.alternate&&!ct)return kt(e),null}else 2*xt()-s.renderingStartTime>Rs&&n!==1073741824&&(e.flags|=128,i=!0,Qs(s,!1),e.lanes=4194304);s.isBackwards?(o.sibling=e.child,e.child=o):(n=s.last,n!==null?n.sibling=o:e.child=o,s.last=o)}return s.tail!==null?(e=s.tail,s.rendering=e,s.tail=e.sibling,s.renderingStartTime=xt(),e.sibling=null,n=ft.current,rt(ft,i?n&1|2:n&1),e):(kt(e),null);case 22:case 23:return Yd(),i=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==i&&(e.flags|=8192),i&&e.mode&1?dn&1073741824&&(kt(e),e.subtreeFlags&6&&(e.flags|=8192)):kt(e),null;case 24:return null;case 25:return null}throw Error(re(156,e.tag))}function My(t,e){switch(Cd(e),e.tag){case 1:return rn(e.type)&&Sl(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return Cs(),lt(nn),lt(Wt),Fd(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return Ud(e),null;case 13:if(lt(ft),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(re(340));Ts()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return lt(ft),null;case 4:return Cs(),null;case 10:return Ld(e.type._context),null;case 22:case 23:return Yd(),null;case 24:return null;default:return null}}var va=!1,Vt=!1,Ey=typeof WeakSet=="function"?WeakSet:Set,me=null;function cs(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(i){vt(t,e,i)}else n.current=null}function hf(t,e,n){try{n()}catch(i){vt(t,e,i)}}var wp=!1;function wy(t,e){if(qu=_l,t=Jg(),Td(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var i=n.getSelection&&n.getSelection();if(i&&i.rangeCount!==0){n=i.anchorNode;var r=i.anchorOffset,s=i.focusNode;i=i.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var o=0,a=-1,l=-1,c=0,f=0,d=t,h=null;t:for(;;){for(var p;d!==n||r!==0&&d.nodeType!==3||(a=o+r),d!==s||i!==0&&d.nodeType!==3||(l=o+i),d.nodeType===3&&(o+=d.nodeValue.length),(p=d.firstChild)!==null;)h=d,d=p;for(;;){if(d===t)break t;if(h===n&&++c===r&&(a=o),h===s&&++f===i&&(l=o),(p=d.nextSibling)!==null)break;d=h,h=d.parentNode}d=p}n=a===-1||l===-1?null:{start:a,end:l}}else n=null}n=n||{start:0,end:0}}else n=null;for(Ku={focusedElem:t,selectionRange:n},_l=!1,me=e;me!==null;)if(e=me,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,me=t;else for(;me!==null;){e=me;try{var v=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(v!==null){var x=v.memoizedProps,m=v.memoizedState,u=e.stateNode,_=u.getSnapshotBeforeUpdate(e.elementType===e.type?x:In(e.type,x),m);u.__reactInternalSnapshotBeforeUpdate=_}break;case 3:var g=e.stateNode.containerInfo;g.nodeType===1?g.textContent="":g.nodeType===9&&g.documentElement&&g.removeChild(g.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(re(163))}}catch(S){vt(e,e.return,S)}if(t=e.sibling,t!==null){t.return=e.return,me=t;break}me=e.return}return v=wp,wp=!1,v}function So(t,e,n){var i=e.updateQueue;if(i=i!==null?i.lastEffect:null,i!==null){var r=i=i.next;do{if((r.tag&t)===t){var s=r.destroy;r.destroy=void 0,s!==void 0&&hf(e,n,s)}r=r.next}while(r!==i)}}function tc(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var i=n.create;n.destroy=i()}n=n.next}while(n!==e)}}function pf(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function q_(t){var e=t.alternate;e!==null&&(t.alternate=null,q_(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[$n],delete e[Uo],delete e[Ju],delete e[oy],delete e[ay])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function K_(t){return t.tag===5||t.tag===3||t.tag===4}function Tp(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||K_(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function mf(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=yl));else if(i!==4&&(t=t.child,t!==null))for(mf(t,e,n),t=t.sibling;t!==null;)mf(t,e,n),t=t.sibling}function gf(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(i!==4&&(t=t.child,t!==null))for(gf(t,e,n),t=t.sibling;t!==null;)gf(t,e,n),t=t.sibling}var It=null,Un=!1;function Ei(t,e,n){for(n=n.child;n!==null;)Z_(t,e,n),n=n.sibling}function Z_(t,e,n){if(Qn&&typeof Qn.onCommitFiberUnmount=="function")try{Qn.onCommitFiberUnmount(Yl,n)}catch{}switch(n.tag){case 5:Vt||cs(n,e);case 6:var i=It,r=Un;It=null,Ei(t,e,n),It=i,Un=r,It!==null&&(Un?(t=It,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):It.removeChild(n.stateNode));break;case 18:It!==null&&(Un?(t=It,n=n.stateNode,t.nodeType===8?Oc(t.parentNode,n):t.nodeType===1&&Oc(t,n),Po(t)):Oc(It,n.stateNode));break;case 4:i=It,r=Un,It=n.stateNode.containerInfo,Un=!0,Ei(t,e,n),It=i,Un=r;break;case 0:case 11:case 14:case 15:if(!Vt&&(i=n.updateQueue,i!==null&&(i=i.lastEffect,i!==null))){r=i=i.next;do{var s=r,o=s.destroy;s=s.tag,o!==void 0&&(s&2||s&4)&&hf(n,e,o),r=r.next}while(r!==i)}Ei(t,e,n);break;case 1:if(!Vt&&(cs(n,e),i=n.stateNode,typeof i.componentWillUnmount=="function"))try{i.props=n.memoizedProps,i.state=n.memoizedState,i.componentWillUnmount()}catch(a){vt(n,e,a)}Ei(t,e,n);break;case 21:Ei(t,e,n);break;case 22:n.mode&1?(Vt=(i=Vt)||n.memoizedState!==null,Ei(t,e,n),Vt=i):Ei(t,e,n);break;default:Ei(t,e,n)}}function Ap(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new Ey),e.forEach(function(i){var r=Dy.bind(null,t,i);n.has(i)||(n.add(i),i.then(r,r))})}}function Pn(t,e){var n=e.deletions;if(n!==null)for(var i=0;i<n.length;i++){var r=n[i];try{var s=t,o=e,a=o;e:for(;a!==null;){switch(a.tag){case 5:It=a.stateNode,Un=!1;break e;case 3:It=a.stateNode.containerInfo,Un=!0;break e;case 4:It=a.stateNode.containerInfo,Un=!0;break e}a=a.return}if(It===null)throw Error(re(160));Z_(s,o,r),It=null,Un=!1;var l=r.alternate;l!==null&&(l.return=null),r.return=null}catch(c){vt(r,e,c)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)Q_(e,t),e=e.sibling}function Q_(t,e){var n=t.alternate,i=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(Pn(e,t),Wn(t),i&4){try{So(3,t,t.return),tc(3,t)}catch(x){vt(t,t.return,x)}try{So(5,t,t.return)}catch(x){vt(t,t.return,x)}}break;case 1:Pn(e,t),Wn(t),i&512&&n!==null&&cs(n,n.return);break;case 5:if(Pn(e,t),Wn(t),i&512&&n!==null&&cs(n,n.return),t.flags&32){var r=t.stateNode;try{Ao(r,"")}catch(x){vt(t,t.return,x)}}if(i&4&&(r=t.stateNode,r!=null)){var s=t.memoizedProps,o=n!==null?n.memoizedProps:s,a=t.type,l=t.updateQueue;if(t.updateQueue=null,l!==null)try{a==="input"&&s.type==="radio"&&s.name!=null&&yg(r,s),ku(a,o);var c=ku(a,s);for(o=0;o<l.length;o+=2){var f=l[o],d=l[o+1];f==="style"?Tg(r,d):f==="dangerouslySetInnerHTML"?Eg(r,d):f==="children"?Ao(r,d):dd(r,f,d,c)}switch(a){case"input":Iu(r,s);break;case"textarea":Sg(r,s);break;case"select":var h=r._wrapperState.wasMultiple;r._wrapperState.wasMultiple=!!s.multiple;var p=s.value;p!=null?hs(r,!!s.multiple,p,!1):h!==!!s.multiple&&(s.defaultValue!=null?hs(r,!!s.multiple,s.defaultValue,!0):hs(r,!!s.multiple,s.multiple?[]:"",!1))}r[Uo]=s}catch(x){vt(t,t.return,x)}}break;case 6:if(Pn(e,t),Wn(t),i&4){if(t.stateNode===null)throw Error(re(162));r=t.stateNode,s=t.memoizedProps;try{r.nodeValue=s}catch(x){vt(t,t.return,x)}}break;case 3:if(Pn(e,t),Wn(t),i&4&&n!==null&&n.memoizedState.isDehydrated)try{Po(e.containerInfo)}catch(x){vt(t,t.return,x)}break;case 4:Pn(e,t),Wn(t);break;case 13:Pn(e,t),Wn(t),r=t.child,r.flags&8192&&(s=r.memoizedState!==null,r.stateNode.isHidden=s,!s||r.alternate!==null&&r.alternate.memoizedState!==null||(jd=xt())),i&4&&Ap(t);break;case 22:if(f=n!==null&&n.memoizedState!==null,t.mode&1?(Vt=(c=Vt)||f,Pn(e,t),Vt=c):Pn(e,t),Wn(t),i&8192){if(c=t.memoizedState!==null,(t.stateNode.isHidden=c)&&!f&&t.mode&1)for(me=t,f=t.child;f!==null;){for(d=me=f;me!==null;){switch(h=me,p=h.child,h.tag){case 0:case 11:case 14:case 15:So(4,h,h.return);break;case 1:cs(h,h.return);var v=h.stateNode;if(typeof v.componentWillUnmount=="function"){i=h,n=h.return;try{e=i,v.props=e.memoizedProps,v.state=e.memoizedState,v.componentWillUnmount()}catch(x){vt(i,n,x)}}break;case 5:cs(h,h.return);break;case 22:if(h.memoizedState!==null){bp(d);continue}}p!==null?(p.return=h,me=p):bp(d)}f=f.sibling}e:for(f=null,d=t;;){if(d.tag===5){if(f===null){f=d;try{r=d.stateNode,c?(s=r.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(a=d.stateNode,l=d.memoizedProps.style,o=l!=null&&l.hasOwnProperty("display")?l.display:null,a.style.display=wg("display",o))}catch(x){vt(t,t.return,x)}}}else if(d.tag===6){if(f===null)try{d.stateNode.nodeValue=c?"":d.memoizedProps}catch(x){vt(t,t.return,x)}}else if((d.tag!==22&&d.tag!==23||d.memoizedState===null||d===t)&&d.child!==null){d.child.return=d,d=d.child;continue}if(d===t)break e;for(;d.sibling===null;){if(d.return===null||d.return===t)break e;f===d&&(f=null),d=d.return}f===d&&(f=null),d.sibling.return=d.return,d=d.sibling}}break;case 19:Pn(e,t),Wn(t),i&4&&Ap(t);break;case 21:break;default:Pn(e,t),Wn(t)}}function Wn(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(K_(n)){var i=n;break e}n=n.return}throw Error(re(160))}switch(i.tag){case 5:var r=i.stateNode;i.flags&32&&(Ao(r,""),i.flags&=-33);var s=Tp(t);gf(t,s,r);break;case 3:case 4:var o=i.stateNode.containerInfo,a=Tp(t);mf(t,a,o);break;default:throw Error(re(161))}}catch(l){vt(t,t.return,l)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function Ty(t,e,n){me=t,J_(t)}function J_(t,e,n){for(var i=(t.mode&1)!==0;me!==null;){var r=me,s=r.child;if(r.tag===22&&i){var o=r.memoizedState!==null||va;if(!o){var a=r.alternate,l=a!==null&&a.memoizedState!==null||Vt;a=va;var c=Vt;if(va=o,(Vt=l)&&!c)for(me=r;me!==null;)o=me,l=o.child,o.tag===22&&o.memoizedState!==null?Rp(r):l!==null?(l.return=o,me=l):Rp(r);for(;s!==null;)me=s,J_(s),s=s.sibling;me=r,va=a,Vt=c}Cp(t)}else r.subtreeFlags&8772&&s!==null?(s.return=r,me=s):Cp(t)}}function Cp(t){for(;me!==null;){var e=me;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:Vt||tc(5,e);break;case 1:var i=e.stateNode;if(e.flags&4&&!Vt)if(n===null)i.componentDidMount();else{var r=e.elementType===e.type?n.memoizedProps:In(e.type,n.memoizedProps);i.componentDidUpdate(r,n.memoizedState,i.__reactInternalSnapshotBeforeUpdate)}var s=e.updateQueue;s!==null&&fp(e,s,i);break;case 3:var o=e.updateQueue;if(o!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}fp(e,o,n)}break;case 5:var a=e.stateNode;if(n===null&&e.flags&4){n=a;var l=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&n.focus();break;case"img":l.src&&(n.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var c=e.alternate;if(c!==null){var f=c.memoizedState;if(f!==null){var d=f.dehydrated;d!==null&&Po(d)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(re(163))}Vt||e.flags&512&&pf(e)}catch(h){vt(e,e.return,h)}}if(e===t){me=null;break}if(n=e.sibling,n!==null){n.return=e.return,me=n;break}me=e.return}}function bp(t){for(;me!==null;){var e=me;if(e===t){me=null;break}var n=e.sibling;if(n!==null){n.return=e.return,me=n;break}me=e.return}}function Rp(t){for(;me!==null;){var e=me;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{tc(4,e)}catch(l){vt(e,n,l)}break;case 1:var i=e.stateNode;if(typeof i.componentDidMount=="function"){var r=e.return;try{i.componentDidMount()}catch(l){vt(e,r,l)}}var s=e.return;try{pf(e)}catch(l){vt(e,s,l)}break;case 5:var o=e.return;try{pf(e)}catch(l){vt(e,o,l)}}}catch(l){vt(e,e.return,l)}if(e===t){me=null;break}var a=e.sibling;if(a!==null){a.return=e.return,me=a;break}me=e.return}}var Ay=Math.ceil,Ll=yi.ReactCurrentDispatcher,Gd=yi.ReactCurrentOwner,Tn=yi.ReactCurrentBatchConfig,Ye=0,Lt=null,Et=null,Ut=0,dn=0,us=er(0),At=0,Ho=null,Ar=0,nc=0,Wd=0,Mo=null,Jt=null,jd=0,Rs=1/0,li=null,Nl=!1,_f=null,Wi=null,xa=!1,Oi=null,Dl=0,Eo=0,vf=null,nl=-1,il=0;function Yt(){return Ye&6?xt():nl!==-1?nl:nl=xt()}function ji(t){return t.mode&1?Ye&2&&Ut!==0?Ut&-Ut:cy.transition!==null?(il===0&&(il=Og()),il):(t=et,t!==0||(t=window.event,t=t===void 0?16:Wg(t.type)),t):1}function Bn(t,e,n,i){if(50<Eo)throw Eo=0,vf=null,Error(re(185));Xo(t,n,i),(!(Ye&2)||t!==Lt)&&(t===Lt&&(!(Ye&2)&&(nc|=n),At===4&&Ii(t,Ut)),sn(t,i),n===1&&Ye===0&&!(e.mode&1)&&(Rs=xt()+500,Ql&&tr()))}function sn(t,e){var n=t.callbackNode;cx(t,e);var i=gl(t,t===Lt?Ut:0);if(i===0)n!==null&&zh(n),t.callbackNode=null,t.callbackPriority=0;else if(e=i&-i,t.callbackPriority!==e){if(n!=null&&zh(n),e===1)t.tag===0?ly(Pp.bind(null,t)):c_(Pp.bind(null,t)),ry(function(){!(Ye&6)&&tr()}),n=null;else{switch(zg(i)){case 1:n=_d;break;case 4:n=Ug;break;case 16:n=ml;break;case 536870912:n=Fg;break;default:n=ml}n=av(n,ev.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function ev(t,e){if(nl=-1,il=0,Ye&6)throw Error(re(327));var n=t.callbackNode;if(vs()&&t.callbackNode!==n)return null;var i=gl(t,t===Lt?Ut:0);if(i===0)return null;if(i&30||i&t.expiredLanes||e)e=Il(t,i);else{e=i;var r=Ye;Ye|=2;var s=nv();(Lt!==t||Ut!==e)&&(li=null,Rs=xt()+500,Sr(t,e));do try{Ry();break}catch(a){tv(t,a)}while(!0);Pd(),Ll.current=s,Ye=r,Et!==null?e=0:(Lt=null,Ut=0,e=At)}if(e!==0){if(e===2&&(r=Wu(t),r!==0&&(i=r,e=xf(t,r))),e===1)throw n=Ho,Sr(t,0),Ii(t,i),sn(t,xt()),n;if(e===6)Ii(t,i);else{if(r=t.current.alternate,!(i&30)&&!Cy(r)&&(e=Il(t,i),e===2&&(s=Wu(t),s!==0&&(i=s,e=xf(t,s))),e===1))throw n=Ho,Sr(t,0),Ii(t,i),sn(t,xt()),n;switch(t.finishedWork=r,t.finishedLanes=i,e){case 0:case 1:throw Error(re(345));case 2:dr(t,Jt,li);break;case 3:if(Ii(t,i),(i&130023424)===i&&(e=jd+500-xt(),10<e)){if(gl(t,0)!==0)break;if(r=t.suspendedLanes,(r&i)!==i){Yt(),t.pingedLanes|=t.suspendedLanes&r;break}t.timeoutHandle=Qu(dr.bind(null,t,Jt,li),e);break}dr(t,Jt,li);break;case 4:if(Ii(t,i),(i&4194240)===i)break;for(e=t.eventTimes,r=-1;0<i;){var o=31-kn(i);s=1<<o,o=e[o],o>r&&(r=o),i&=~s}if(i=r,i=xt()-i,i=(120>i?120:480>i?480:1080>i?1080:1920>i?1920:3e3>i?3e3:4320>i?4320:1960*Ay(i/1960))-i,10<i){t.timeoutHandle=Qu(dr.bind(null,t,Jt,li),i);break}dr(t,Jt,li);break;case 5:dr(t,Jt,li);break;default:throw Error(re(329))}}}return sn(t,xt()),t.callbackNode===n?ev.bind(null,t):null}function xf(t,e){var n=Mo;return t.current.memoizedState.isDehydrated&&(Sr(t,e).flags|=256),t=Il(t,e),t!==2&&(e=Jt,Jt=n,e!==null&&yf(e)),t}function yf(t){Jt===null?Jt=t:Jt.push.apply(Jt,t)}function Cy(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var i=0;i<n.length;i++){var r=n[i],s=r.getSnapshot;r=r.value;try{if(!Hn(s(),r))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function Ii(t,e){for(e&=~Wd,e&=~nc,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-kn(e),i=1<<n;t[n]=-1,e&=~i}}function Pp(t){if(Ye&6)throw Error(re(327));vs();var e=gl(t,0);if(!(e&1))return sn(t,xt()),null;var n=Il(t,e);if(t.tag!==0&&n===2){var i=Wu(t);i!==0&&(e=i,n=xf(t,i))}if(n===1)throw n=Ho,Sr(t,0),Ii(t,e),sn(t,xt()),n;if(n===6)throw Error(re(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,dr(t,Jt,li),sn(t,xt()),null}function Xd(t,e){var n=Ye;Ye|=1;try{return t(e)}finally{Ye=n,Ye===0&&(Rs=xt()+500,Ql&&tr())}}function Cr(t){Oi!==null&&Oi.tag===0&&!(Ye&6)&&vs();var e=Ye;Ye|=1;var n=Tn.transition,i=et;try{if(Tn.transition=null,et=1,t)return t()}finally{et=i,Tn.transition=n,Ye=e,!(Ye&6)&&tr()}}function Yd(){dn=us.current,lt(us)}function Sr(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,iy(n)),Et!==null)for(n=Et.return;n!==null;){var i=n;switch(Cd(i),i.tag){case 1:i=i.type.childContextTypes,i!=null&&Sl();break;case 3:Cs(),lt(nn),lt(Wt),Fd();break;case 5:Ud(i);break;case 4:Cs();break;case 13:lt(ft);break;case 19:lt(ft);break;case 10:Ld(i.type._context);break;case 22:case 23:Yd()}n=n.return}if(Lt=t,Et=t=Xi(t.current,null),Ut=dn=e,At=0,Ho=null,Wd=nc=Ar=0,Jt=Mo=null,_r!==null){for(e=0;e<_r.length;e++)if(n=_r[e],i=n.interleaved,i!==null){n.interleaved=null;var r=i.next,s=n.pending;if(s!==null){var o=s.next;s.next=r,i.next=o}n.pending=i}_r=null}return t}function tv(t,e){do{var n=Et;try{if(Pd(),Ja.current=Pl,Rl){for(var i=dt.memoizedState;i!==null;){var r=i.queue;r!==null&&(r.pending=null),i=i.next}Rl=!1}if(Tr=0,Pt=Tt=dt=null,yo=!1,zo=0,Gd.current=null,n===null||n.return===null){At=1,Ho=e,Et=null;break}e:{var s=t,o=n.return,a=n,l=e;if(e=Ut,a.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var c=l,f=a,d=f.tag;if(!(f.mode&1)&&(d===0||d===11||d===15)){var h=f.alternate;h?(f.updateQueue=h.updateQueue,f.memoizedState=h.memoizedState,f.lanes=h.lanes):(f.updateQueue=null,f.memoizedState=null)}var p=_p(o);if(p!==null){p.flags&=-257,vp(p,o,a,s,e),p.mode&1&&gp(s,c,e),e=p,l=c;var v=e.updateQueue;if(v===null){var x=new Set;x.add(l),e.updateQueue=x}else v.add(l);break e}else{if(!(e&1)){gp(s,c,e),$d();break e}l=Error(re(426))}}else if(ct&&a.mode&1){var m=_p(o);if(m!==null){!(m.flags&65536)&&(m.flags|=256),vp(m,o,a,s,e),bd(bs(l,a));break e}}s=l=bs(l,a),At!==4&&(At=2),Mo===null?Mo=[s]:Mo.push(s),s=o;do{switch(s.tag){case 3:s.flags|=65536,e&=-e,s.lanes|=e;var u=z_(s,l,e);up(s,u);break e;case 1:a=l;var _=s.type,g=s.stateNode;if(!(s.flags&128)&&(typeof _.getDerivedStateFromError=="function"||g!==null&&typeof g.componentDidCatch=="function"&&(Wi===null||!Wi.has(g)))){s.flags|=65536,e&=-e,s.lanes|=e;var S=k_(s,a,e);up(s,S);break e}}s=s.return}while(s!==null)}rv(n)}catch(b){e=b,Et===n&&n!==null&&(Et=n=n.return);continue}break}while(!0)}function nv(){var t=Ll.current;return Ll.current=Pl,t===null?Pl:t}function $d(){(At===0||At===3||At===2)&&(At=4),Lt===null||!(Ar&268435455)&&!(nc&268435455)||Ii(Lt,Ut)}function Il(t,e){var n=Ye;Ye|=2;var i=nv();(Lt!==t||Ut!==e)&&(li=null,Sr(t,e));do try{by();break}catch(r){tv(t,r)}while(!0);if(Pd(),Ye=n,Ll.current=i,Et!==null)throw Error(re(261));return Lt=null,Ut=0,At}function by(){for(;Et!==null;)iv(Et)}function Ry(){for(;Et!==null&&!ex();)iv(Et)}function iv(t){var e=ov(t.alternate,t,dn);t.memoizedProps=t.pendingProps,e===null?rv(t):Et=e,Gd.current=null}function rv(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=My(n,e),n!==null){n.flags&=32767,Et=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{At=6,Et=null;return}}else if(n=Sy(n,e,dn),n!==null){Et=n;return}if(e=e.sibling,e!==null){Et=e;return}Et=e=t}while(e!==null);At===0&&(At=5)}function dr(t,e,n){var i=et,r=Tn.transition;try{Tn.transition=null,et=1,Py(t,e,n,i)}finally{Tn.transition=r,et=i}return null}function Py(t,e,n,i){do vs();while(Oi!==null);if(Ye&6)throw Error(re(327));n=t.finishedWork;var r=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(re(177));t.callbackNode=null,t.callbackPriority=0;var s=n.lanes|n.childLanes;if(ux(t,s),t===Lt&&(Et=Lt=null,Ut=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||xa||(xa=!0,av(ml,function(){return vs(),null})),s=(n.flags&15990)!==0,n.subtreeFlags&15990||s){s=Tn.transition,Tn.transition=null;var o=et;et=1;var a=Ye;Ye|=4,Gd.current=null,wy(t,n),Q_(n,t),Kx(Ku),_l=!!qu,Ku=qu=null,t.current=n,Ty(n),tx(),Ye=a,et=o,Tn.transition=s}else t.current=n;if(xa&&(xa=!1,Oi=t,Dl=r),s=t.pendingLanes,s===0&&(Wi=null),rx(n.stateNode),sn(t,xt()),e!==null)for(i=t.onRecoverableError,n=0;n<e.length;n++)r=e[n],i(r.value,{componentStack:r.stack,digest:r.digest});if(Nl)throw Nl=!1,t=_f,_f=null,t;return Dl&1&&t.tag!==0&&vs(),s=t.pendingLanes,s&1?t===vf?Eo++:(Eo=0,vf=t):Eo=0,tr(),null}function vs(){if(Oi!==null){var t=zg(Dl),e=Tn.transition,n=et;try{if(Tn.transition=null,et=16>t?16:t,Oi===null)var i=!1;else{if(t=Oi,Oi=null,Dl=0,Ye&6)throw Error(re(331));var r=Ye;for(Ye|=4,me=t.current;me!==null;){var s=me,o=s.child;if(me.flags&16){var a=s.deletions;if(a!==null){for(var l=0;l<a.length;l++){var c=a[l];for(me=c;me!==null;){var f=me;switch(f.tag){case 0:case 11:case 15:So(8,f,s)}var d=f.child;if(d!==null)d.return=f,me=d;else for(;me!==null;){f=me;var h=f.sibling,p=f.return;if(q_(f),f===c){me=null;break}if(h!==null){h.return=p,me=h;break}me=p}}}var v=s.alternate;if(v!==null){var x=v.child;if(x!==null){v.child=null;do{var m=x.sibling;x.sibling=null,x=m}while(x!==null)}}me=s}}if(s.subtreeFlags&2064&&o!==null)o.return=s,me=o;else e:for(;me!==null;){if(s=me,s.flags&2048)switch(s.tag){case 0:case 11:case 15:So(9,s,s.return)}var u=s.sibling;if(u!==null){u.return=s.return,me=u;break e}me=s.return}}var _=t.current;for(me=_;me!==null;){o=me;var g=o.child;if(o.subtreeFlags&2064&&g!==null)g.return=o,me=g;else e:for(o=_;me!==null;){if(a=me,a.flags&2048)try{switch(a.tag){case 0:case 11:case 15:tc(9,a)}}catch(b){vt(a,a.return,b)}if(a===o){me=null;break e}var S=a.sibling;if(S!==null){S.return=a.return,me=S;break e}me=a.return}}if(Ye=r,tr(),Qn&&typeof Qn.onPostCommitFiberRoot=="function")try{Qn.onPostCommitFiberRoot(Yl,t)}catch{}i=!0}return i}finally{et=n,Tn.transition=e}}return!1}function Lp(t,e,n){e=bs(n,e),e=z_(t,e,1),t=Gi(t,e,1),e=Yt(),t!==null&&(Xo(t,1,e),sn(t,e))}function vt(t,e,n){if(t.tag===3)Lp(t,t,n);else for(;e!==null;){if(e.tag===3){Lp(e,t,n);break}else if(e.tag===1){var i=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(Wi===null||!Wi.has(i))){t=bs(n,t),t=k_(e,t,1),e=Gi(e,t,1),t=Yt(),e!==null&&(Xo(e,1,t),sn(e,t));break}}e=e.return}}function Ly(t,e,n){var i=t.pingCache;i!==null&&i.delete(e),e=Yt(),t.pingedLanes|=t.suspendedLanes&n,Lt===t&&(Ut&n)===n&&(At===4||At===3&&(Ut&130023424)===Ut&&500>xt()-jd?Sr(t,0):Wd|=n),sn(t,e)}function sv(t,e){e===0&&(t.mode&1?(e=ca,ca<<=1,!(ca&130023424)&&(ca=4194304)):e=1);var n=Yt();t=gi(t,e),t!==null&&(Xo(t,e,n),sn(t,n))}function Ny(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),sv(t,n)}function Dy(t,e){var n=0;switch(t.tag){case 13:var i=t.stateNode,r=t.memoizedState;r!==null&&(n=r.retryLane);break;case 19:i=t.stateNode;break;default:throw Error(re(314))}i!==null&&i.delete(e),sv(t,n)}var ov;ov=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||nn.current)en=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return en=!1,yy(t,e,n);en=!!(t.flags&131072)}else en=!1,ct&&e.flags&1048576&&u_(e,wl,e.index);switch(e.lanes=0,e.tag){case 2:var i=e.type;tl(t,e),t=e.pendingProps;var r=ws(e,Wt.current);_s(e,n),r=zd(null,e,i,t,r,n);var s=kd();return e.flags|=1,typeof r=="object"&&r!==null&&typeof r.render=="function"&&r.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,rn(i)?(s=!0,Ml(e)):s=!1,e.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,Dd(e),r.updater=ec,e.stateNode=r,r._reactInternals=e,of(e,i,t,n),e=cf(null,e,i,!0,s,n)):(e.tag=0,ct&&s&&Ad(e),Xt(null,e,r,n),e=e.child),e;case 16:i=e.elementType;e:{switch(tl(t,e),t=e.pendingProps,r=i._init,i=r(i._payload),e.type=i,r=e.tag=Uy(i),t=In(i,t),r){case 0:e=lf(null,e,i,t,n);break e;case 1:e=Sp(null,e,i,t,n);break e;case 11:e=xp(null,e,i,t,n);break e;case 14:e=yp(null,e,i,In(i.type,t),n);break e}throw Error(re(306,i,""))}return e;case 0:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:In(i,r),lf(t,e,i,r,n);case 1:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:In(i,r),Sp(t,e,i,r,n);case 3:e:{if(G_(e),t===null)throw Error(re(387));i=e.pendingProps,s=e.memoizedState,r=s.element,g_(t,e),Cl(e,i,null,n);var o=e.memoizedState;if(i=o.element,s.isDehydrated)if(s={element:i,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){r=bs(Error(re(423)),e),e=Mp(t,e,i,n,r);break e}else if(i!==r){r=bs(Error(re(424)),e),e=Mp(t,e,i,n,r);break e}else for(mn=Vi(e.stateNode.containerInfo.firstChild),gn=e,ct=!0,Fn=null,n=p_(e,null,i,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Ts(),i===r){e=_i(t,e,n);break e}Xt(t,e,i,n)}e=e.child}return e;case 5:return __(e),t===null&&nf(e),i=e.type,r=e.pendingProps,s=t!==null?t.memoizedProps:null,o=r.children,Zu(i,r)?o=null:s!==null&&Zu(i,s)&&(e.flags|=32),V_(t,e),Xt(t,e,o,n),e.child;case 6:return t===null&&nf(e),null;case 13:return W_(t,e,n);case 4:return Id(e,e.stateNode.containerInfo),i=e.pendingProps,t===null?e.child=As(e,null,i,n):Xt(t,e,i,n),e.child;case 11:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:In(i,r),xp(t,e,i,r,n);case 7:return Xt(t,e,e.pendingProps,n),e.child;case 8:return Xt(t,e,e.pendingProps.children,n),e.child;case 12:return Xt(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(i=e.type._context,r=e.pendingProps,s=e.memoizedProps,o=r.value,rt(Tl,i._currentValue),i._currentValue=o,s!==null)if(Hn(s.value,o)){if(s.children===r.children&&!nn.current){e=_i(t,e,n);break e}}else for(s=e.child,s!==null&&(s.return=e);s!==null;){var a=s.dependencies;if(a!==null){o=s.child;for(var l=a.firstContext;l!==null;){if(l.context===i){if(s.tag===1){l=hi(-1,n&-n),l.tag=2;var c=s.updateQueue;if(c!==null){c=c.shared;var f=c.pending;f===null?l.next=l:(l.next=f.next,f.next=l),c.pending=l}}s.lanes|=n,l=s.alternate,l!==null&&(l.lanes|=n),rf(s.return,n,e),a.lanes|=n;break}l=l.next}}else if(s.tag===10)o=s.type===e.type?null:s.child;else if(s.tag===18){if(o=s.return,o===null)throw Error(re(341));o.lanes|=n,a=o.alternate,a!==null&&(a.lanes|=n),rf(o,n,e),o=s.sibling}else o=s.child;if(o!==null)o.return=s;else for(o=s;o!==null;){if(o===e){o=null;break}if(s=o.sibling,s!==null){s.return=o.return,o=s;break}o=o.return}s=o}Xt(t,e,r.children,n),e=e.child}return e;case 9:return r=e.type,i=e.pendingProps.children,_s(e,n),r=Cn(r),i=i(r),e.flags|=1,Xt(t,e,i,n),e.child;case 14:return i=e.type,r=In(i,e.pendingProps),r=In(i.type,r),yp(t,e,i,r,n);case 15:return B_(t,e,e.type,e.pendingProps,n);case 17:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:In(i,r),tl(t,e),e.tag=1,rn(i)?(t=!0,Ml(e)):t=!1,_s(e,n),O_(e,i,r),of(e,i,r,n),cf(null,e,i,!0,t,n);case 19:return j_(t,e,n);case 22:return H_(t,e,n)}throw Error(re(156,e.tag))};function av(t,e){return Ig(t,e)}function Iy(t,e,n,i){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function wn(t,e,n,i){return new Iy(t,e,n,i)}function qd(t){return t=t.prototype,!(!t||!t.isReactComponent)}function Uy(t){if(typeof t=="function")return qd(t)?1:0;if(t!=null){if(t=t.$$typeof,t===pd)return 11;if(t===md)return 14}return 2}function Xi(t,e){var n=t.alternate;return n===null?(n=wn(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function rl(t,e,n,i,r,s){var o=2;if(i=t,typeof t=="function")qd(t)&&(o=1);else if(typeof t=="string")o=5;else e:switch(t){case es:return Mr(n.children,r,s,e);case hd:o=8,r|=8;break;case Ru:return t=wn(12,n,e,r|2),t.elementType=Ru,t.lanes=s,t;case Pu:return t=wn(13,n,e,r),t.elementType=Pu,t.lanes=s,t;case Lu:return t=wn(19,n,e,r),t.elementType=Lu,t.lanes=s,t;case _g:return ic(n,r,s,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case mg:o=10;break e;case gg:o=9;break e;case pd:o=11;break e;case md:o=14;break e;case Pi:o=16,i=null;break e}throw Error(re(130,t==null?t:typeof t,""))}return e=wn(o,n,e,r),e.elementType=t,e.type=i,e.lanes=s,e}function Mr(t,e,n,i){return t=wn(7,t,i,e),t.lanes=n,t}function ic(t,e,n,i){return t=wn(22,t,i,e),t.elementType=_g,t.lanes=n,t.stateNode={isHidden:!1},t}function jc(t,e,n){return t=wn(6,t,null,e),t.lanes=n,t}function Xc(t,e,n){return e=wn(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function Fy(t,e,n,i,r){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Ac(0),this.expirationTimes=Ac(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Ac(0),this.identifierPrefix=i,this.onRecoverableError=r,this.mutableSourceEagerHydrationData=null}function Kd(t,e,n,i,r,s,o,a,l){return t=new Fy(t,e,n,a,l),e===1?(e=1,s===!0&&(e|=8)):e=0,s=wn(3,null,null,e),t.current=s,s.stateNode=t,s.memoizedState={element:i,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Dd(s),t}function Oy(t,e,n){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Jr,key:i==null?null:""+i,children:t,containerInfo:e,implementation:n}}function lv(t){if(!t)return Zi;t=t._reactInternals;e:{if(Nr(t)!==t||t.tag!==1)throw Error(re(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(rn(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(re(171))}if(t.tag===1){var n=t.type;if(rn(n))return l_(t,n,e)}return e}function cv(t,e,n,i,r,s,o,a,l){return t=Kd(n,i,!0,t,r,s,o,a,l),t.context=lv(null),n=t.current,i=Yt(),r=ji(n),s=hi(i,r),s.callback=e??null,Gi(n,s,r),t.current.lanes=r,Xo(t,r,i),sn(t,i),t}function rc(t,e,n,i){var r=e.current,s=Yt(),o=ji(r);return n=lv(n),e.context===null?e.context=n:e.pendingContext=n,e=hi(s,o),e.payload={element:t},i=i===void 0?null:i,i!==null&&(e.callback=i),t=Gi(r,e,o),t!==null&&(Bn(t,r,o,s),Qa(t,r,o)),o}function Ul(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function Np(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function Zd(t,e){Np(t,e),(t=t.alternate)&&Np(t,e)}function zy(){return null}var uv=typeof reportError=="function"?reportError:function(t){console.error(t)};function Qd(t){this._internalRoot=t}sc.prototype.render=Qd.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(re(409));rc(t,e,null,null)};sc.prototype.unmount=Qd.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;Cr(function(){rc(null,t,null,null)}),e[mi]=null}};function sc(t){this._internalRoot=t}sc.prototype.unstable_scheduleHydration=function(t){if(t){var e=Hg();t={blockedOn:null,target:t,priority:e};for(var n=0;n<Di.length&&e!==0&&e<Di[n].priority;n++);Di.splice(n,0,t),n===0&&Gg(t)}};function Jd(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function oc(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function Dp(){}function ky(t,e,n,i,r){if(r){if(typeof i=="function"){var s=i;i=function(){var c=Ul(o);s.call(c)}}var o=cv(e,i,t,0,null,!1,!1,"",Dp);return t._reactRootContainer=o,t[mi]=o.current,Do(t.nodeType===8?t.parentNode:t),Cr(),o}for(;r=t.lastChild;)t.removeChild(r);if(typeof i=="function"){var a=i;i=function(){var c=Ul(l);a.call(c)}}var l=Kd(t,0,!1,null,null,!1,!1,"",Dp);return t._reactRootContainer=l,t[mi]=l.current,Do(t.nodeType===8?t.parentNode:t),Cr(function(){rc(e,l,n,i)}),l}function ac(t,e,n,i,r){var s=n._reactRootContainer;if(s){var o=s;if(typeof r=="function"){var a=r;r=function(){var l=Ul(o);a.call(l)}}rc(e,o,t,r)}else o=ky(n,e,t,r,i);return Ul(o)}kg=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=uo(e.pendingLanes);n!==0&&(vd(e,n|1),sn(e,xt()),!(Ye&6)&&(Rs=xt()+500,tr()))}break;case 13:Cr(function(){var i=gi(t,1);if(i!==null){var r=Yt();Bn(i,t,1,r)}}),Zd(t,1)}};xd=function(t){if(t.tag===13){var e=gi(t,134217728);if(e!==null){var n=Yt();Bn(e,t,134217728,n)}Zd(t,134217728)}};Bg=function(t){if(t.tag===13){var e=ji(t),n=gi(t,e);if(n!==null){var i=Yt();Bn(n,t,e,i)}Zd(t,e)}};Hg=function(){return et};Vg=function(t,e){var n=et;try{return et=t,e()}finally{et=n}};Hu=function(t,e,n){switch(e){case"input":if(Iu(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var i=n[e];if(i!==t&&i.form===t.form){var r=Zl(i);if(!r)throw Error(re(90));xg(i),Iu(i,r)}}}break;case"textarea":Sg(t,n);break;case"select":e=n.value,e!=null&&hs(t,!!n.multiple,e,!1)}};bg=Xd;Rg=Cr;var By={usingClientEntryPoint:!1,Events:[$o,rs,Zl,Ag,Cg,Xd]},Js={findFiberByHostInstance:gr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Hy={bundleType:Js.bundleType,version:Js.version,rendererPackageName:Js.rendererPackageName,rendererConfig:Js.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:yi.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=Ng(t),t===null?null:t.stateNode},findFiberByHostInstance:Js.findFiberByHostInstance||zy,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var ya=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!ya.isDisabled&&ya.supportsFiber)try{Yl=ya.inject(Hy),Qn=ya}catch{}}vn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=By;vn.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Jd(e))throw Error(re(200));return Oy(t,e,null,n)};vn.createRoot=function(t,e){if(!Jd(t))throw Error(re(299));var n=!1,i="",r=uv;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(i=e.identifierPrefix),e.onRecoverableError!==void 0&&(r=e.onRecoverableError)),e=Kd(t,1,!1,null,null,n,!1,i,r),t[mi]=e.current,Do(t.nodeType===8?t.parentNode:t),new Qd(e)};vn.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(re(188)):(t=Object.keys(t).join(","),Error(re(268,t)));return t=Ng(e),t=t===null?null:t.stateNode,t};vn.flushSync=function(t){return Cr(t)};vn.hydrate=function(t,e,n){if(!oc(e))throw Error(re(200));return ac(null,t,e,!0,n)};vn.hydrateRoot=function(t,e,n){if(!Jd(t))throw Error(re(405));var i=n!=null&&n.hydratedSources||null,r=!1,s="",o=uv;if(n!=null&&(n.unstable_strictMode===!0&&(r=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),e=cv(e,null,t,1,n??null,r,!1,s,o),t[mi]=e.current,Do(t),i)for(t=0;t<i.length;t++)n=i[t],r=n._getVersion,r=r(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,r]:e.mutableSourceEagerHydrationData.push(n,r);return new sc(e)};vn.render=function(t,e,n){if(!oc(e))throw Error(re(200));return ac(null,t,e,!1,n)};vn.unmountComponentAtNode=function(t){if(!oc(t))throw Error(re(40));return t._reactRootContainer?(Cr(function(){ac(null,null,t,!1,function(){t._reactRootContainer=null,t[mi]=null})}),!0):!1};vn.unstable_batchedUpdates=Xd;vn.unstable_renderSubtreeIntoContainer=function(t,e,n,i){if(!oc(n))throw Error(re(200));if(t==null||t._reactInternals===void 0)throw Error(re(38));return ac(t,e,n,!1,i)};vn.version="18.3.1-next-f1338f8080-20240426";function fv(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(fv)}catch(t){console.error(t)}}fv(),fg.exports=vn;var Vy=fg.exports,Ip=Vy;Cu.createRoot=Ip.createRoot,Cu.hydrateRoot=Ip.hydrateRoot;/**
 * @remix-run/router v1.23.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Vo(){return Vo=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)({}).hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t},Vo.apply(null,arguments)}var zi;(function(t){t.Pop="POP",t.Push="PUSH",t.Replace="REPLACE"})(zi||(zi={}));const Up="popstate";function Gy(t){t===void 0&&(t={});function e(i,r){let{pathname:s,search:o,hash:a}=i.location;return Sf("",{pathname:s,search:o,hash:a},r.state&&r.state.usr||null,r.state&&r.state.key||"default")}function n(i,r){return typeof r=="string"?r:Fl(r)}return jy(e,n,null,t)}function ht(t,e){if(t===!1||t===null||typeof t>"u")throw new Error(e)}function eh(t,e){if(!t){typeof console<"u"&&console.warn(e);try{throw new Error(e)}catch{}}}function Wy(){return Math.random().toString(36).substr(2,8)}function Fp(t,e){return{usr:t.state,key:t.key,idx:e}}function Sf(t,e,n,i){return n===void 0&&(n=null),Vo({pathname:typeof t=="string"?t:t.pathname,search:"",hash:""},typeof e=="string"?Bs(e):e,{state:n,key:e&&e.key||i||Wy()})}function Fl(t){let{pathname:e="/",search:n="",hash:i=""}=t;return n&&n!=="?"&&(e+=n.charAt(0)==="?"?n:"?"+n),i&&i!=="#"&&(e+=i.charAt(0)==="#"?i:"#"+i),e}function Bs(t){let e={};if(t){let n=t.indexOf("#");n>=0&&(e.hash=t.substr(n),t=t.substr(0,n));let i=t.indexOf("?");i>=0&&(e.search=t.substr(i),t=t.substr(0,i)),t&&(e.pathname=t)}return e}function jy(t,e,n,i){i===void 0&&(i={});let{window:r=document.defaultView,v5Compat:s=!1}=i,o=r.history,a=zi.Pop,l=null,c=f();c==null&&(c=0,o.replaceState(Vo({},o.state,{idx:c}),""));function f(){return(o.state||{idx:null}).idx}function d(){a=zi.Pop;let m=f(),u=m==null?null:m-c;c=m,l&&l({action:a,location:x.location,delta:u})}function h(m,u){a=zi.Push;let _=Sf(x.location,m,u);c=f()+1;let g=Fp(_,c),S=x.createHref(_);try{o.pushState(g,"",S)}catch(b){if(b instanceof DOMException&&b.name==="DataCloneError")throw b;r.location.assign(S)}s&&l&&l({action:a,location:x.location,delta:1})}function p(m,u){a=zi.Replace;let _=Sf(x.location,m,u);c=f();let g=Fp(_,c),S=x.createHref(_);o.replaceState(g,"",S),s&&l&&l({action:a,location:x.location,delta:0})}function v(m){let u=r.location.origin!=="null"?r.location.origin:r.location.href,_=typeof m=="string"?m:Fl(m);return _=_.replace(/ $/,"%20"),ht(u,"No window.location.(origin|href) available to create URL for href: "+_),new URL(_,u)}let x={get action(){return a},get location(){return t(r,o)},listen(m){if(l)throw new Error("A history only accepts one active listener");return r.addEventListener(Up,d),l=m,()=>{r.removeEventListener(Up,d),l=null}},createHref(m){return e(r,m)},createURL:v,encodeLocation(m){let u=v(m);return{pathname:u.pathname,search:u.search,hash:u.hash}},push:h,replace:p,go(m){return o.go(m)}};return x}var Op;(function(t){t.data="data",t.deferred="deferred",t.redirect="redirect",t.error="error"})(Op||(Op={}));function Xy(t,e,n){return n===void 0&&(n="/"),Yy(t,e,n)}function Yy(t,e,n,i){let r=typeof e=="string"?Bs(e):e,s=Ps(r.pathname||"/",n);if(s==null)return null;let o=dv(t);$y(o);let a=null,l=sS(s);for(let c=0;a==null&&c<o.length;++c)a=iS(o[c],l);return a}function dv(t,e,n,i){e===void 0&&(e=[]),n===void 0&&(n=[]),i===void 0&&(i="");let r=(s,o,a)=>{let l={relativePath:a===void 0?s.path||"":a,caseSensitive:s.caseSensitive===!0,childrenIndex:o,route:s};l.relativePath.startsWith("/")&&(ht(l.relativePath.startsWith(i),'Absolute route path "'+l.relativePath+'" nested under path '+('"'+i+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),l.relativePath=l.relativePath.slice(i.length));let c=Yi([i,l.relativePath]),f=n.concat(l);s.children&&s.children.length>0&&(ht(s.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+c+'".')),dv(s.children,e,f,c)),!(s.path==null&&!s.index)&&e.push({path:c,score:tS(c,s.index),routesMeta:f})};return t.forEach((s,o)=>{var a;if(s.path===""||!((a=s.path)!=null&&a.includes("?")))r(s,o);else for(let l of hv(s.path))r(s,o,l)}),e}function hv(t){let e=t.split("/");if(e.length===0)return[];let[n,...i]=e,r=n.endsWith("?"),s=n.replace(/\?$/,"");if(i.length===0)return r?[s,""]:[s];let o=hv(i.join("/")),a=[];return a.push(...o.map(l=>l===""?s:[s,l].join("/"))),r&&a.push(...o),a.map(l=>t.startsWith("/")&&l===""?"/":l)}function $y(t){t.sort((e,n)=>e.score!==n.score?n.score-e.score:nS(e.routesMeta.map(i=>i.childrenIndex),n.routesMeta.map(i=>i.childrenIndex)))}const qy=/^:[\w-]+$/,Ky=3,Zy=2,Qy=1,Jy=10,eS=-2,zp=t=>t==="*";function tS(t,e){let n=t.split("/"),i=n.length;return n.some(zp)&&(i+=eS),e&&(i+=Zy),n.filter(r=>!zp(r)).reduce((r,s)=>r+(qy.test(s)?Ky:s===""?Qy:Jy),i)}function nS(t,e){return t.length===e.length&&t.slice(0,-1).every((i,r)=>i===e[r])?t[t.length-1]-e[e.length-1]:0}function iS(t,e,n){let{routesMeta:i}=t,r={},s="/",o=[];for(let a=0;a<i.length;++a){let l=i[a],c=a===i.length-1,f=s==="/"?e:e.slice(s.length)||"/",d=Mf({path:l.relativePath,caseSensitive:l.caseSensitive,end:c},f),h=l.route;if(!d)return null;Object.assign(r,d.params),o.push({params:r,pathname:Yi([s,d.pathname]),pathnameBase:uS(Yi([s,d.pathnameBase])),route:h}),d.pathnameBase!=="/"&&(s=Yi([s,d.pathnameBase]))}return o}function Mf(t,e){typeof t=="string"&&(t={path:t,caseSensitive:!1,end:!0});let[n,i]=rS(t.path,t.caseSensitive,t.end),r=e.match(n);if(!r)return null;let s=r[0],o=s.replace(/(.)\/+$/,"$1"),a=r.slice(1);return{params:i.reduce((c,f,d)=>{let{paramName:h,isOptional:p}=f;if(h==="*"){let x=a[d]||"";o=s.slice(0,s.length-x.length).replace(/(.)\/+$/,"$1")}const v=a[d];return p&&!v?c[h]=void 0:c[h]=(v||"").replace(/%2F/g,"/"),c},{}),pathname:s,pathnameBase:o,pattern:t}}function rS(t,e,n){e===void 0&&(e=!1),n===void 0&&(n=!0),eh(t==="*"||!t.endsWith("*")||t.endsWith("/*"),'Route path "'+t+'" will be treated as if it were '+('"'+t.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+t.replace(/\*$/,"/*")+'".'));let i=[],r="^"+t.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(o,a,l)=>(i.push({paramName:a,isOptional:l!=null}),l?"/?([^\\/]+)?":"/([^\\/]+)"));return t.endsWith("*")?(i.push({paramName:"*"}),r+=t==="*"||t==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?r+="\\/*$":t!==""&&t!=="/"&&(r+="(?:(?=\\/|$))"),[new RegExp(r,e?void 0:"i"),i]}function sS(t){try{return t.split("/").map(e=>decodeURIComponent(e).replace(/\//g,"%2F")).join("/")}catch(e){return eh(!1,'The URL path "'+t+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+e+").")),t}}function Ps(t,e){if(e==="/")return t;if(!t.toLowerCase().startsWith(e.toLowerCase()))return null;let n=e.endsWith("/")?e.length-1:e.length,i=t.charAt(n);return i&&i!=="/"?null:t.slice(n)||"/"}const oS=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,aS=t=>oS.test(t);function lS(t,e){e===void 0&&(e="/");let{pathname:n,search:i="",hash:r=""}=typeof t=="string"?Bs(t):t,s;if(n)if(aS(n))s=n;else{if(n.includes("//")){let o=n;n=pv(n),eh(!1,"Pathnames cannot have embedded double slashes - normalizing "+(o+" -> "+n))}n.startsWith("/")?s=kp(n.substring(1),"/"):s=kp(n,e)}else s=e;return{pathname:s,search:fS(i),hash:dS(r)}}function kp(t,e){let n=e.replace(/\/+$/,"").split("/");return t.split("/").forEach(r=>{r===".."?n.length>1&&n.pop():r!=="."&&n.push(r)}),n.length>1?n.join("/"):"/"}function Yc(t,e,n,i){return"Cannot include a '"+t+"' character in a manually specified "+("`to."+e+"` field ["+JSON.stringify(i)+"].  Please separate it out to the ")+("`to."+n+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function cS(t){return t.filter((e,n)=>n===0||e.route.path&&e.route.path.length>0)}function th(t,e){let n=cS(t);return e?n.map((i,r)=>r===n.length-1?i.pathname:i.pathnameBase):n.map(i=>i.pathnameBase)}function nh(t,e,n,i){i===void 0&&(i=!1);let r;typeof t=="string"?r=Bs(t):(r=Vo({},t),ht(!r.pathname||!r.pathname.includes("?"),Yc("?","pathname","search",r)),ht(!r.pathname||!r.pathname.includes("#"),Yc("#","pathname","hash",r)),ht(!r.search||!r.search.includes("#"),Yc("#","search","hash",r)));let s=t===""||r.pathname==="",o=s?"/":r.pathname,a;if(o==null)a=n;else{let d=e.length-1;if(!i&&o.startsWith("..")){let h=o.split("/");for(;h[0]==="..";)h.shift(),d-=1;r.pathname=h.join("/")}a=d>=0?e[d]:"/"}let l=lS(r,a),c=o&&o!=="/"&&o.endsWith("/"),f=(s||o===".")&&n.endsWith("/");return!l.pathname.endsWith("/")&&(c||f)&&(l.pathname+="/"),l}const pv=t=>t.replace(/\/\/+/g,"/"),Yi=t=>pv(t.join("/")),uS=t=>t.replace(/\/+$/,"").replace(/^\/*/,"/"),fS=t=>!t||t==="?"?"":t.startsWith("?")?t:"?"+t,dS=t=>!t||t==="#"?"":t.startsWith("#")?t:"#"+t;function hS(t){return t!=null&&typeof t.status=="number"&&typeof t.statusText=="string"&&typeof t.internal=="boolean"&&"data"in t}const mv=["post","put","patch","delete"];new Set(mv);const pS=["get",...mv];new Set(pS);/**
 * React Router v6.30.4
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Go(){return Go=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)({}).hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t},Go.apply(null,arguments)}const lc=W.createContext(null),gv=W.createContext(null),Si=W.createContext(null),cc=W.createContext(null),nr=W.createContext({outlet:null,matches:[],isDataRoute:!1}),_v=W.createContext(null);function mS(t,e){let{relative:n}=e===void 0?{}:e;Hs()||ht(!1);let{basename:i,navigator:r}=W.useContext(Si),{hash:s,pathname:o,search:a}=uc(t,{relative:n}),l=o;return i!=="/"&&(l=o==="/"?i:Yi([i,o])),r.createHref({pathname:l,search:a,hash:s})}function Hs(){return W.useContext(cc)!=null}function Vs(){return Hs()||ht(!1),W.useContext(cc).location}function vv(t){W.useContext(Si).static||W.useLayoutEffect(t)}function xv(){let{isDataRoute:t}=W.useContext(nr);return t?bS():gS()}function gS(){Hs()||ht(!1);let t=W.useContext(lc),{basename:e,future:n,navigator:i}=W.useContext(Si),{matches:r}=W.useContext(nr),{pathname:s}=Vs(),o=JSON.stringify(th(r,n.v7_relativeSplatPath)),a=W.useRef(!1);return vv(()=>{a.current=!0}),W.useCallback(function(c,f){if(f===void 0&&(f={}),!a.current)return;if(typeof c=="number"){i.go(c);return}let d=nh(c,JSON.parse(o),s,f.relative==="path");t==null&&e!=="/"&&(d.pathname=d.pathname==="/"?e:Yi([e,d.pathname])),(f.replace?i.replace:i.push)(d,f.state,f)},[e,i,o,s,t])}function uc(t,e){let{relative:n}=e===void 0?{}:e,{future:i}=W.useContext(Si),{matches:r}=W.useContext(nr),{pathname:s}=Vs(),o=JSON.stringify(th(r,i.v7_relativeSplatPath));return W.useMemo(()=>nh(t,JSON.parse(o),s,n==="path"),[t,o,s,n])}function _S(t,e){return vS(t,e)}function vS(t,e,n,i){Hs()||ht(!1);let{navigator:r}=W.useContext(Si),{matches:s}=W.useContext(nr),o=s[s.length-1],a=o?o.params:{};o&&o.pathname;let l=o?o.pathnameBase:"/";o&&o.route;let c=Vs(),f;if(e){var d;let m=typeof e=="string"?Bs(e):e;l==="/"||(d=m.pathname)!=null&&d.startsWith(l)||ht(!1),f=m}else f=c;let h=f.pathname||"/",p=h;if(l!=="/"){let m=l.replace(/^\//,"").split("/");p="/"+h.replace(/^\//,"").split("/").slice(m.length).join("/")}let v=Xy(t,{pathname:p}),x=ES(v&&v.map(m=>Object.assign({},m,{params:Object.assign({},a,m.params),pathname:Yi([l,r.encodeLocation?r.encodeLocation(m.pathname).pathname:m.pathname]),pathnameBase:m.pathnameBase==="/"?l:Yi([l,r.encodeLocation?r.encodeLocation(m.pathnameBase).pathname:m.pathnameBase])})),s,n,i);return e&&x?W.createElement(cc.Provider,{value:{location:Go({pathname:"/",search:"",hash:"",state:null,key:"default"},f),navigationType:zi.Pop}},x):x}function xS(){let t=CS(),e=hS(t)?t.status+" "+t.statusText:t instanceof Error?t.message:JSON.stringify(t),n=t instanceof Error?t.stack:null,r={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"};return W.createElement(W.Fragment,null,W.createElement("h2",null,"Unexpected Application Error!"),W.createElement("h3",{style:{fontStyle:"italic"}},e),n?W.createElement("pre",{style:r},n):null,null)}const yS=W.createElement(xS,null);class SS extends W.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,n){return n.location!==e.location||n.revalidation!=="idle"&&e.revalidation==="idle"?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error!==void 0?e.error:n.error,location:n.location,revalidation:e.revalidation||n.revalidation}}componentDidCatch(e,n){console.error("React Router caught the following error during render",e,n)}render(){return this.state.error!==void 0?W.createElement(nr.Provider,{value:this.props.routeContext},W.createElement(_v.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function MS(t){let{routeContext:e,match:n,children:i}=t,r=W.useContext(lc);return r&&r.static&&r.staticContext&&(n.route.errorElement||n.route.ErrorBoundary)&&(r.staticContext._deepestRenderedBoundaryId=n.route.id),W.createElement(nr.Provider,{value:e},i)}function ES(t,e,n,i){var r;if(e===void 0&&(e=[]),n===void 0&&(n=null),i===void 0&&(i=null),t==null){var s;if(!n)return null;if(n.errors)t=n.matches;else if((s=i)!=null&&s.v7_partialHydration&&e.length===0&&!n.initialized&&n.matches.length>0)t=n.matches;else return null}let o=t,a=(r=n)==null?void 0:r.errors;if(a!=null){let f=o.findIndex(d=>d.route.id&&(a==null?void 0:a[d.route.id])!==void 0);f>=0||ht(!1),o=o.slice(0,Math.min(o.length,f+1))}let l=!1,c=-1;if(n&&i&&i.v7_partialHydration)for(let f=0;f<o.length;f++){let d=o[f];if((d.route.HydrateFallback||d.route.hydrateFallbackElement)&&(c=f),d.route.id){let{loaderData:h,errors:p}=n,v=d.route.loader&&h[d.route.id]===void 0&&(!p||p[d.route.id]===void 0);if(d.route.lazy||v){l=!0,c>=0?o=o.slice(0,c+1):o=[o[0]];break}}}return o.reduceRight((f,d,h)=>{let p,v=!1,x=null,m=null;n&&(p=a&&d.route.id?a[d.route.id]:void 0,x=d.route.errorElement||yS,l&&(c<0&&h===0?(RS("route-fallback"),v=!0,m=null):c===h&&(v=!0,m=d.route.hydrateFallbackElement||null)));let u=e.concat(o.slice(0,h+1)),_=()=>{let g;return p?g=x:v?g=m:d.route.Component?g=W.createElement(d.route.Component,null):d.route.element?g=d.route.element:g=f,W.createElement(MS,{match:d,routeContext:{outlet:f,matches:u,isDataRoute:n!=null},children:g})};return n&&(d.route.ErrorBoundary||d.route.errorElement||h===0)?W.createElement(SS,{location:n.location,revalidation:n.revalidation,component:x,error:p,children:_(),routeContext:{outlet:null,matches:u,isDataRoute:!0}}):_()},null)}var yv=function(t){return t.UseBlocker="useBlocker",t.UseRevalidator="useRevalidator",t.UseNavigateStable="useNavigate",t}(yv||{}),Sv=function(t){return t.UseBlocker="useBlocker",t.UseLoaderData="useLoaderData",t.UseActionData="useActionData",t.UseRouteError="useRouteError",t.UseNavigation="useNavigation",t.UseRouteLoaderData="useRouteLoaderData",t.UseMatches="useMatches",t.UseRevalidator="useRevalidator",t.UseNavigateStable="useNavigate",t.UseRouteId="useRouteId",t}(Sv||{});function wS(t){let e=W.useContext(lc);return e||ht(!1),e}function TS(t){let e=W.useContext(gv);return e||ht(!1),e}function AS(t){let e=W.useContext(nr);return e||ht(!1),e}function Mv(t){let e=AS(),n=e.matches[e.matches.length-1];return n.route.id||ht(!1),n.route.id}function CS(){var t;let e=W.useContext(_v),n=TS(),i=Mv();return e!==void 0?e:(t=n.errors)==null?void 0:t[i]}function bS(){let{router:t}=wS(yv.UseNavigateStable),e=Mv(Sv.UseNavigateStable),n=W.useRef(!1);return vv(()=>{n.current=!0}),W.useCallback(function(r,s){s===void 0&&(s={}),n.current&&(typeof r=="number"?t.navigate(r):t.navigate(r,Go({fromRouteId:e},s)))},[t,e])}const Bp={};function RS(t,e,n){Bp[t]||(Bp[t]=!0)}function PS(t,e){t==null||t.v7_startTransition,t==null||t.v7_relativeSplatPath}function LS(t){let{to:e,replace:n,state:i,relative:r}=t;Hs()||ht(!1);let{future:s,static:o}=W.useContext(Si),{matches:a}=W.useContext(nr),{pathname:l}=Vs(),c=xv(),f=nh(e,th(a,s.v7_relativeSplatPath),l,r==="path"),d=JSON.stringify(f);return W.useEffect(()=>c(JSON.parse(d),{replace:n,state:i,relative:r}),[c,d,r,n,i]),null}function ho(t){ht(!1)}function NS(t){let{basename:e="/",children:n=null,location:i,navigationType:r=zi.Pop,navigator:s,static:o=!1,future:a}=t;Hs()&&ht(!1);let l=e.replace(/^\/*/,"/"),c=W.useMemo(()=>({basename:l,navigator:s,static:o,future:Go({v7_relativeSplatPath:!1},a)}),[l,a,s,o]);typeof i=="string"&&(i=Bs(i));let{pathname:f="/",search:d="",hash:h="",state:p=null,key:v="default"}=i,x=W.useMemo(()=>{let m=Ps(f,l);return m==null?null:{location:{pathname:m,search:d,hash:h,state:p,key:v},navigationType:r}},[l,f,d,h,p,v,r]);return x==null?null:W.createElement(Si.Provider,{value:c},W.createElement(cc.Provider,{children:n,value:x}))}function DS(t){let{children:e,location:n}=t;return _S(Ef(e),n)}new Promise(()=>{});function Ef(t,e){e===void 0&&(e=[]);let n=[];return W.Children.forEach(t,(i,r)=>{if(!W.isValidElement(i))return;let s=[...e,r];if(i.type===W.Fragment){n.push.apply(n,Ef(i.props.children,s));return}i.type!==ho&&ht(!1),!i.props.index||!i.props.children||ht(!1);let o={id:i.props.id||s.join("-"),caseSensitive:i.props.caseSensitive,element:i.props.element,Component:i.props.Component,index:i.props.index,path:i.props.path,loader:i.props.loader,action:i.props.action,errorElement:i.props.errorElement,ErrorBoundary:i.props.ErrorBoundary,hasErrorBoundary:i.props.ErrorBoundary!=null||i.props.errorElement!=null,shouldRevalidate:i.props.shouldRevalidate,handle:i.props.handle,lazy:i.props.lazy};i.props.children&&(o.children=Ef(i.props.children,s)),n.push(o)}),n}/**
 * React Router DOM v6.30.4
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Ol(){return Ol=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)({}).hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t},Ol.apply(null,arguments)}function Ev(t,e){if(t==null)return{};var n={};for(var i in t)if({}.hasOwnProperty.call(t,i)){if(e.indexOf(i)!==-1)continue;n[i]=t[i]}return n}function IS(t){return!!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)}function US(t,e){return t.button===0&&(!e||e==="_self")&&!IS(t)}const FS=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","viewTransition"],OS=["aria-current","caseSensitive","className","end","style","to","viewTransition","children"],zS="6";try{window.__reactRouterVersion=zS}catch{}const kS=W.createContext({isTransitioning:!1}),BS="startTransition",Hp=L0[BS];function HS(t){let{basename:e,children:n,future:i,window:r}=t,s=W.useRef();s.current==null&&(s.current=Gy({window:r,v5Compat:!0}));let o=s.current,[a,l]=W.useState({action:o.action,location:o.location}),{v7_startTransition:c}=i||{},f=W.useCallback(d=>{c&&Hp?Hp(()=>l(d)):l(d)},[l,c]);return W.useLayoutEffect(()=>o.listen(f),[o,f]),W.useEffect(()=>PS(i),[i]),W.createElement(NS,{basename:e,children:n,location:a.location,navigationType:a.action,navigator:o,future:i})}const VS=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",GS=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,WS=W.forwardRef(function(e,n){let{onClick:i,relative:r,reloadDocument:s,replace:o,state:a,target:l,to:c,preventScrollReset:f,viewTransition:d}=e,h=Ev(e,FS),{basename:p}=W.useContext(Si),v,x=!1;if(typeof c=="string"&&GS.test(c)&&(v=c,VS))try{let g=new URL(window.location.href),S=c.startsWith("//")?new URL(g.protocol+c):new URL(c),b=Ps(S.pathname,p);S.origin===g.origin&&b!=null?c=b+S.search+S.hash:x=!0}catch{}let m=mS(c,{relative:r}),u=YS(c,{replace:o,state:a,target:l,preventScrollReset:f,relative:r,viewTransition:d});function _(g){i&&i(g),g.defaultPrevented||u(g)}return W.createElement("a",Ol({},h,{href:v||m,onClick:x||s?i:_,ref:n,target:l}))}),jS=W.forwardRef(function(e,n){let{"aria-current":i="page",caseSensitive:r=!1,className:s="",end:o=!1,style:a,to:l,viewTransition:c,children:f}=e,d=Ev(e,OS),h=uc(l,{relative:d.relative}),p=Vs(),v=W.useContext(gv),{navigator:x,basename:m}=W.useContext(Si),u=v!=null&&$S(h)&&c===!0,_=x.encodeLocation?x.encodeLocation(h).pathname:h.pathname,g=p.pathname,S=v&&v.navigation&&v.navigation.location?v.navigation.location.pathname:null;r||(g=g.toLowerCase(),S=S?S.toLowerCase():null,_=_.toLowerCase()),S&&m&&(S=Ps(S,m)||S);const b=_!=="/"&&_.endsWith("/")?_.length-1:_.length;let A=g===_||!o&&g.startsWith(_)&&g.charAt(b)==="/",T=S!=null&&(S===_||!o&&S.startsWith(_)&&S.charAt(_.length)==="/"),C={isActive:A,isPending:T,isTransitioning:u},E=A?i:void 0,y;typeof s=="function"?y=s(C):y=[s,A?"active":null,T?"pending":null,u?"transitioning":null].filter(Boolean).join(" ");let L=typeof a=="function"?a(C):a;return W.createElement(WS,Ol({},d,{"aria-current":E,className:y,ref:n,style:L,to:l,viewTransition:c}),typeof f=="function"?f(C):f)});var wf;(function(t){t.UseScrollRestoration="useScrollRestoration",t.UseSubmit="useSubmit",t.UseSubmitFetcher="useSubmitFetcher",t.UseFetcher="useFetcher",t.useViewTransitionState="useViewTransitionState"})(wf||(wf={}));var Vp;(function(t){t.UseFetcher="useFetcher",t.UseFetchers="useFetchers",t.UseScrollRestoration="useScrollRestoration"})(Vp||(Vp={}));function XS(t){let e=W.useContext(lc);return e||ht(!1),e}function YS(t,e){let{target:n,replace:i,state:r,preventScrollReset:s,relative:o,viewTransition:a}=e===void 0?{}:e,l=xv(),c=Vs(),f=uc(t,{relative:o});return W.useCallback(d=>{if(US(d,n)){d.preventDefault();let h=i!==void 0?i:Fl(c)===Fl(f);l(t,{replace:h,state:r,preventScrollReset:s,relative:o,viewTransition:a})}},[c,l,f,i,r,n,t,s,o,a])}function $S(t,e){e===void 0&&(e={});let n=W.useContext(kS);n==null&&ht(!1);let{basename:i}=XS(wf.useViewTransitionState),r=uc(t,{relative:e.relative});if(!n.isTransitioning)return!1;let s=Ps(n.currentLocation.pathname,i)||n.currentLocation.pathname,o=Ps(n.nextLocation.pathname,i)||n.nextLocation.pathname;return Mf(r.pathname,o)!=null||Mf(r.pathname,s)!=null}const qS={},Gp=t=>{let e;const n=new Set,i=(f,d)=>{const h=typeof f=="function"?f(e):f;if(!Object.is(h,e)){const p=e;e=d??(typeof h!="object"||h===null)?h:Object.assign({},e,h),n.forEach(v=>v(e,p))}},r=()=>e,l={setState:i,getState:r,getInitialState:()=>c,subscribe:f=>(n.add(f),()=>n.delete(f)),destroy:()=>{(qS?"production":void 0)!=="production"&&console.warn("[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."),n.clear()}},c=e=t(i,r,l);return l},KS=t=>t?Gp(t):Gp;var wv={exports:{}},Tv={},Av={exports:{}},Cv={};/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ls=W;function ZS(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var QS=typeof Object.is=="function"?Object.is:ZS,JS=Ls.useState,eM=Ls.useEffect,tM=Ls.useLayoutEffect,nM=Ls.useDebugValue;function iM(t,e){var n=e(),i=JS({inst:{value:n,getSnapshot:e}}),r=i[0].inst,s=i[1];return tM(function(){r.value=n,r.getSnapshot=e,$c(r)&&s({inst:r})},[t,n,e]),eM(function(){return $c(r)&&s({inst:r}),t(function(){$c(r)&&s({inst:r})})},[t]),nM(n),n}function $c(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!QS(t,n)}catch{return!0}}function rM(t,e){return e()}var sM=typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"?rM:iM;Cv.useSyncExternalStore=Ls.useSyncExternalStore!==void 0?Ls.useSyncExternalStore:sM;Av.exports=Cv;var oM=Av.exports;/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var fc=W,aM=oM;function lM(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var cM=typeof Object.is=="function"?Object.is:lM,uM=aM.useSyncExternalStore,fM=fc.useRef,dM=fc.useEffect,hM=fc.useMemo,pM=fc.useDebugValue;Tv.useSyncExternalStoreWithSelector=function(t,e,n,i,r){var s=fM(null);if(s.current===null){var o={hasValue:!1,value:null};s.current=o}else o=s.current;s=hM(function(){function l(p){if(!c){if(c=!0,f=p,p=i(p),r!==void 0&&o.hasValue){var v=o.value;if(r(v,p))return d=v}return d=p}if(v=d,cM(f,p))return v;var x=i(p);return r!==void 0&&r(v,x)?(f=p,v):(f=p,d=x)}var c=!1,f,d,h=n===void 0?null:n;return[function(){return l(e())},h===null?void 0:function(){return l(h())}]},[e,n,i,r]);var a=uM(t,s[0],s[1]);return dM(function(){o.hasValue=!0,o.value=a},[a]),pM(a),a};wv.exports=Tv;var mM=wv.exports;const gM=Jm(mM),bv={},{useDebugValue:_M}=cd,{useSyncExternalStoreWithSelector:vM}=gM;let Wp=!1;const xM=t=>t;function yM(t,e=xM,n){(bv?"production":void 0)!=="production"&&n&&!Wp&&(console.warn("[DEPRECATED] Use `createWithEqualityFn` instead of `create` or use `useStoreWithEqualityFn` instead of `useStore`. They can be imported from 'zustand/traditional'. https://github.com/pmndrs/zustand/discussions/1937"),Wp=!0);const i=vM(t.subscribe,t.getState,t.getServerState||t.getInitialState,e,n);return _M(i),i}const jp=t=>{(bv?"production":void 0)!=="production"&&typeof t!="function"&&console.warn("[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`.");const e=typeof t=="function"?KS(t):t,n=(i,r)=>yM(e,i,r);return Object.assign(n,e),n},SM=t=>t?jp(t):jp,Gs=SM(t=>({stones:[],selectedStoneId:1,latestReadings:{},activeAlerts:[],simulationResult:null,optimizationRecord:null,isOptimizing:!1,optimizationProgress:null,wsConnected:!1,setStones:e=>t({stones:e}),setSelectedStoneId:e=>t({selectedStoneId:e}),setLatestReading:(e,n)=>t(i=>({latestReadings:{...i.latestReadings,[e]:n}})),addAlert:e=>t(n=>({activeAlerts:[e,...n.activeAlerts].slice(0,20)})),setActiveAlerts:e=>t({activeAlerts:e}),setSimulationResult:e=>t({simulationResult:e}),setOptimizationRecord:e=>t({optimizationRecord:e}),setIsOptimizing:e=>t({isOptimizing:e}),setOptimizationProgress:e=>t({optimizationProgress:e}),setWsConnected:e=>t({wsConnected:e})}));function MM(){const t=W.useRef(null),{setWsConnected:e,setLatestReading:n,addAlert:i,setOptimizationProgress:r,setIsOptimizing:s}=Gs(),o=W.useCallback(()=>{const c=`${window.location.protocol==="https:"?"wss:":"ws:"}//${window.location.host}/ws`;try{const f=new WebSocket(c);f.onopen=()=>{console.log("WebSocket connected"),e(!0)},f.onmessage=d=>{try{const h=JSON.parse(d.data);if(h.type==="sensor"){const p=h.data;n(p.stone_id,p)}else if(h.type==="alert"){const p=h.data;i(p)}else if(h.type==="optimization_progress"){const p=h.data;r({iteration:p.iteration,freq:p.freq,loss:p.loss})}}catch(h){console.error("Failed to parse WS message",h)}},f.onclose=()=>{console.log("WebSocket disconnected, reconnecting..."),e(!1),s(!1),setTimeout(o,3e3)},f.onerror=d=>{console.error("WebSocket error",d)},t.current=f}catch(f){console.error("Failed to connect WS",f),setTimeout(o,5e3)}},[e,n,i,r,s]);return W.useEffect(()=>(o(),()=>{t.current&&t.current.close()}),[o]),{send:W.useCallback(l=>{t.current&&t.current.readyState===WebSocket.OPEN&&t.current.send(JSON.stringify(l))},[]),wsRef:t}}const Ko="/api";async function EM(){const t=await fetch(`${Ko}/stones`);if(!t.ok)throw new Error("Failed to fetch stones");return t.json()}async function wM(t){const e=await fetch(`${Ko}/simulation/run`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});if(!e.ok)throw new Error("Failed to run simulation");return e.json()}async function TM(t){const e=await fetch(`${Ko}/simulation/results/${t}`);if(!e.ok)throw new Error("Failed to fetch simulation result");return e.json()}async function AM(t){const e=await fetch(`${Ko}/optimization/start`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});if(!e.ok)throw new Error("Failed to start optimization");return e.json()}async function CM(){const t=await fetch(`${Ko}/alerts/active`);if(!t.ok)throw new Error("Failed to fetch active alerts");return t.json()}const bM=[{path:"/",label:"编磬可视化",icon:"🎵"},{path:"/dashboard",label:"实时监测",icon:"📊"},{path:"/simulation",label:"仿真调音",icon:"⚙️"}];function RM(){const{wsConnected:t}=Gs();return R.jsxs("aside",{className:"w-60 flex flex-col bg-gradient-to-b from-deep-indigo to-dark-indigo border-r border-bronze/30 shadow-lg",children:[R.jsxs("div",{className:"p-6 border-b border-bronze/30",children:[R.jsx("h1",{className:"text-xl font-serif font-bold text-bronze tracking-wide",children:"曾侯乙编磬"}),R.jsx("p",{className:"text-sm text-bronze/70 mt-1",children:"声学系统"})]}),R.jsx("nav",{className:"flex-1 py-6",children:R.jsx("ul",{className:"space-y-2 px-3",children:bM.map(e=>R.jsx("li",{children:R.jsxs(jS,{to:e.path,end:e.path==="/",className:({isActive:n})=>`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${n?"bg-bronze/20 text-bronze border border-bronze/50 shadow-bronze-glow":"text-gray-300 hover:bg-bronze/10 hover:text-bronze border border-transparent"}`,children:[R.jsx("span",{className:"text-xl",children:e.icon}),R.jsx("span",{className:"font-medium",children:e.label})]})},e.path))})}),R.jsx("div",{className:"p-4 border-t border-bronze/30",children:R.jsxs("div",{className:"flex items-center gap-3 px-2",children:[R.jsx("div",{className:`w-3 h-3 rounded-full ${t?"bg-jade animate-pulse":"bg-gray-500"}`}),R.jsx("span",{className:`text-sm ${t?"text-jade":"text-gray-500"}`,children:t?"连接正常":"连接断开"})]})})]})}function PM({alerts:t}){const[e,n]=W.useState(!1),[i,r]=W.useState(!0);return W.useEffect(()=>{if(t.length>0){r(!0);const s=setTimeout(()=>{e||r(!1)},5e3);return()=>clearTimeout(s)}},[t.length,e]),t.length===0?null:!i&&!e?R.jsx("button",{onClick:()=>{r(!0),n(!0)},className:"fixed top-4 right-4 z-50 w-12 h-12 rounded-full bg-vermilion text-white flex items-center justify-center alert-pulse hover:scale-110 transition-transform",children:R.jsx("span",{className:"text-lg font-bold",children:t.length})}):R.jsxs("div",{className:`bg-vermilion/90 backdrop-blur-sm border-b border-vermilion/50 alert-pulse transition-all duration-300 ${e?"py-2":"py-3"}`,children:[R.jsxs("div",{className:"px-6 flex items-center justify-between cursor-pointer",onClick:()=>n(!e),children:[R.jsxs("div",{className:"flex items-center gap-3",children:[R.jsx("span",{className:"text-2xl",children:"⚠️"}),R.jsxs("div",{children:[R.jsxs("span",{className:"font-bold text-white",children:[t.length," 个音准偏差警报"]}),R.jsx("span",{className:"text-white/80 text-sm ml-3",children:"偏差超过 10 音分"})]})]}),R.jsx("span",{className:"text-white/80 text-sm",children:e?"收起 ▲":"展开 ▼"})]}),e&&R.jsx("div",{className:"px-6 pb-3 pt-2 max-h-48 overflow-y-auto",children:R.jsx("ul",{className:"space-y-2",children:t.slice(0,10).map(s=>R.jsxs("li",{className:"bg-black/20 rounded px-3 py-2 flex justify-between items-center",children:[R.jsx("span",{className:"text-white/90",children:s.message}),R.jsxs("span",{className:"text-white font-mono",children:[s.cents_deviation.toFixed(1)," 音分"]})]},s.id))})})]})}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ih="168",xs={ROTATE:0,DOLLY:1,PAN:2},fs={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},LM=0,Xp=1,NM=2,Rv=1,Pv=2,ai=3,Qi=0,on=1,On=2,$i=0,ys=1,Yp=2,$p=3,qp=4,DM=5,pr=100,IM=101,UM=102,FM=103,OM=104,zM=200,kM=201,BM=202,HM=203,Tf=204,Af=205,VM=206,GM=207,WM=208,jM=209,XM=210,YM=211,$M=212,qM=213,KM=214,ZM=0,QM=1,JM=2,zl=3,eE=4,tE=5,nE=6,iE=7,Lv=0,rE=1,sE=2,qi=0,oE=1,aE=2,lE=3,Nv=4,cE=5,uE=6,fE=7,Dv=300,Ns=301,Ds=302,Cf=303,bf=304,dc=306,Rf=1e3,xr=1001,Pf=1002,tn=1003,dE=1004,Sa=1005,pn=1006,qc=1007,yr=1008,vi=1009,Iv=1010,Uv=1011,Wo=1012,rh=1013,br=1014,Kn=1015,Zo=1016,sh=1017,oh=1018,Is=1020,Fv=35902,Ov=1021,zv=1022,zn=1023,kv=1024,Bv=1025,Ss=1026,Us=1027,ah=1028,lh=1029,Hv=1030,ch=1031,uh=1033,sl=33776,ol=33777,al=33778,ll=33779,Lf=35840,Nf=35841,Df=35842,If=35843,Uf=36196,Ff=37492,Of=37496,zf=37808,kf=37809,Bf=37810,Hf=37811,Vf=37812,Gf=37813,Wf=37814,jf=37815,Xf=37816,Yf=37817,$f=37818,qf=37819,Kf=37820,Zf=37821,cl=36492,Qf=36494,Jf=36495,Vv=36283,ed=36284,td=36285,nd=36286,hE=3200,pE=3201,Gv=0,mE=1,Ui="",Xn="srgb",ir="srgb-linear",fh="display-p3",hc="display-p3-linear",kl="linear",ot="srgb",Bl="rec709",Hl="p3",Fr=7680,Kp=519,gE=512,_E=513,vE=514,Wv=515,xE=516,yE=517,SE=518,ME=519,Zp=35044,Qp="300 es",di=2e3,Vl=2001;class Dr{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(n)===-1&&i[e].push(n)}hasEventListener(e,n){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(n)!==-1}removeEventListener(e,n){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(n);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const Bt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],ul=Math.PI/180,id=180/Math.PI;function Qo(){const t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Bt[t&255]+Bt[t>>8&255]+Bt[t>>16&255]+Bt[t>>24&255]+"-"+Bt[e&255]+Bt[e>>8&255]+"-"+Bt[e>>16&15|64]+Bt[e>>24&255]+"-"+Bt[n&63|128]+Bt[n>>8&255]+"-"+Bt[n>>16&255]+Bt[n>>24&255]+Bt[i&255]+Bt[i>>8&255]+Bt[i>>16&255]+Bt[i>>24&255]).toLowerCase()}function Gt(t,e,n){return Math.max(e,Math.min(n,t))}function EE(t,e){return(t%e+e)%e}function Kc(t,e,n){return(1-n)*t+n*e}function eo(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return t/4294967295;case Uint16Array:return t/65535;case Uint8Array:return t/255;case Int32Array:return Math.max(t/2147483647,-1);case Int16Array:return Math.max(t/32767,-1);case Int8Array:return Math.max(t/127,-1);default:throw new Error("Invalid component type.")}}function Zt(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return Math.round(t*4294967295);case Uint16Array:return Math.round(t*65535);case Uint8Array:return Math.round(t*255);case Int32Array:return Math.round(t*2147483647);case Int16Array:return Math.round(t*32767);case Int8Array:return Math.round(t*127);default:throw new Error("Invalid component type.")}}const wE={DEG2RAD:ul};class De{constructor(e=0,n=0){De.prototype.isVector2=!0,this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,i=this.y,r=e.elements;return this.x=r[0]*n+r[3]*i+r[6],this.y=r[1]*n+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(Gt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y;return n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const i=Math.cos(n),r=Math.sin(n),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ke{constructor(e,n,i,r,s,o,a,l,c){ke.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,o,a,l,c)}set(e,n,i,r,s,o,a,l,c){const f=this.elements;return f[0]=e,f[1]=r,f[2]=a,f[3]=n,f[4]=s,f[5]=l,f[6]=i,f[7]=o,f[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(e,n,i){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],f=i[4],d=i[7],h=i[2],p=i[5],v=i[8],x=r[0],m=r[3],u=r[6],_=r[1],g=r[4],S=r[7],b=r[2],A=r[5],T=r[8];return s[0]=o*x+a*_+l*b,s[3]=o*m+a*g+l*A,s[6]=o*u+a*S+l*T,s[1]=c*x+f*_+d*b,s[4]=c*m+f*g+d*A,s[7]=c*u+f*S+d*T,s[2]=h*x+p*_+v*b,s[5]=h*m+p*g+v*A,s[8]=h*u+p*S+v*T,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],f=e[8];return n*o*f-n*a*c-i*s*f+i*a*l+r*s*c-r*o*l}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],f=e[8],d=f*o-a*c,h=a*l-f*s,p=c*s-o*l,v=n*d+i*h+r*p;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/v;return e[0]=d*x,e[1]=(r*c-f*i)*x,e[2]=(a*i-r*o)*x,e[3]=h*x,e[4]=(f*n-r*l)*x,e[5]=(r*s-a*n)*x,e[6]=p*x,e[7]=(i*l-c*n)*x,e[8]=(o*n-i*s)*x,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,i,r,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*o+c*a)+o+e,-r*c,r*l,-r*(-c*o+l*a)+a+n,0,0,1),this}scale(e,n){return this.premultiply(Zc.makeScale(e,n)),this}rotate(e){return this.premultiply(Zc.makeRotation(-e)),this}translate(e,n){return this.premultiply(Zc.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<9;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<9;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Zc=new ke;function jv(t){for(let e=t.length-1;e>=0;--e)if(t[e]>=65535)return!0;return!1}function Gl(t){return document.createElementNS("http://www.w3.org/1999/xhtml",t)}function TE(){const t=Gl("canvas");return t.style.display="block",t}const Jp={};function wo(t){t in Jp||(Jp[t]=!0,console.warn(t))}function AE(t,e,n){return new Promise(function(i,r){function s(){switch(t.clientWaitSync(e,t.SYNC_FLUSH_COMMANDS_BIT,0)){case t.WAIT_FAILED:r();break;case t.TIMEOUT_EXPIRED:setTimeout(s,n);break;default:i()}}setTimeout(s,n)})}const em=new ke().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),tm=new ke().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),to={[ir]:{transfer:kl,primaries:Bl,luminanceCoefficients:[.2126,.7152,.0722],toReference:t=>t,fromReference:t=>t},[Xn]:{transfer:ot,primaries:Bl,luminanceCoefficients:[.2126,.7152,.0722],toReference:t=>t.convertSRGBToLinear(),fromReference:t=>t.convertLinearToSRGB()},[hc]:{transfer:kl,primaries:Hl,luminanceCoefficients:[.2289,.6917,.0793],toReference:t=>t.applyMatrix3(tm),fromReference:t=>t.applyMatrix3(em)},[fh]:{transfer:ot,primaries:Hl,luminanceCoefficients:[.2289,.6917,.0793],toReference:t=>t.convertSRGBToLinear().applyMatrix3(tm),fromReference:t=>t.applyMatrix3(em).convertLinearToSRGB()}},CE=new Set([ir,hc]),Je={enabled:!0,_workingColorSpace:ir,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(t){if(!CE.has(t))throw new Error(`Unsupported working color space, "${t}".`);this._workingColorSpace=t},convert:function(t,e,n){if(this.enabled===!1||e===n||!e||!n)return t;const i=to[e].toReference,r=to[n].fromReference;return r(i(t))},fromWorkingColorSpace:function(t,e){return this.convert(t,this._workingColorSpace,e)},toWorkingColorSpace:function(t,e){return this.convert(t,e,this._workingColorSpace)},getPrimaries:function(t){return to[t].primaries},getTransfer:function(t){return t===Ui?kl:to[t].transfer},getLuminanceCoefficients:function(t,e=this._workingColorSpace){return t.fromArray(to[e].luminanceCoefficients)}};function Ms(t){return t<.04045?t*.0773993808:Math.pow(t*.9478672986+.0521327014,2.4)}function Qc(t){return t<.0031308?t*12.92:1.055*Math.pow(t,.41666)-.055}let Or;class bE{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Or===void 0&&(Or=Gl("canvas")),Or.width=e.width,Or.height=e.height;const i=Or.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=Or}return n.width>2048||n.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),n.toDataURL("image/jpeg",.6)):n.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const n=Gl("canvas");n.width=e.width,n.height=e.height;const i=n.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=Ms(s[o]/255)*255;return i.putImageData(r,0,0),n}else if(e.data){const n=e.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(Ms(n[i]/255)*255):n[i]=Ms(n[i]);return{data:n,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let RE=0;class Xv{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:RE++}),this.uuid=Qo(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(Jc(r[o].image)):s.push(Jc(r[o]))}else s=Jc(r);i.url=s}return n||(e.images[this.uuid]=i),i}}function Jc(t){return typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap?bE.getDataURL(t):t.data?{data:Array.from(t.data),width:t.width,height:t.height,type:t.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let PE=0;class $t extends Dr{constructor(e=$t.DEFAULT_IMAGE,n=$t.DEFAULT_MAPPING,i=xr,r=xr,s=pn,o=yr,a=zn,l=vi,c=$t.DEFAULT_ANISOTROPY,f=Ui){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:PE++}),this.uuid=Qo(),this.name="",this.source=new Xv(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new De(0,0),this.repeat=new De(1,1),this.center=new De(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ke,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=f,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Dv)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Rf:e.x=e.x-Math.floor(e.x);break;case xr:e.x=e.x<0?0:1;break;case Pf:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Rf:e.y=e.y-Math.floor(e.y);break;case xr:e.y=e.y<0?0:1;break;case Pf:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}$t.DEFAULT_IMAGE=null;$t.DEFAULT_MAPPING=Dv;$t.DEFAULT_ANISOTROPY=1;class at{constructor(e=0,n=0,i=0,r=1){at.prototype.isVector4=!0,this.x=e,this.y=n,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,i,r){return this.x=e,this.y=n,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*n+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*n+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*n+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*n+o[7]*i+o[11]*r+o[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,i,r,s;const l=e.elements,c=l[0],f=l[4],d=l[8],h=l[1],p=l[5],v=l[9],x=l[2],m=l[6],u=l[10];if(Math.abs(f-h)<.01&&Math.abs(d-x)<.01&&Math.abs(v-m)<.01){if(Math.abs(f+h)<.1&&Math.abs(d+x)<.1&&Math.abs(v+m)<.1&&Math.abs(c+p+u-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const g=(c+1)/2,S=(p+1)/2,b=(u+1)/2,A=(f+h)/4,T=(d+x)/4,C=(v+m)/4;return g>S&&g>b?g<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(g),r=A/i,s=T/i):S>b?S<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(S),i=A/r,s=C/r):b<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(b),i=T/s,r=C/s),this.set(i,r,s,n),this}let _=Math.sqrt((m-v)*(m-v)+(d-x)*(d-x)+(h-f)*(h-f));return Math.abs(_)<.001&&(_=1),this.x=(m-v)/_,this.y=(d-x)/_,this.z=(h-f)/_,this.w=Math.acos((c+p+u-1)/2),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this.z=Math.max(e.z,Math.min(n.z,this.z)),this.w=Math.max(e.w,Math.min(n.w,this.w)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this.z=Math.max(e,Math.min(n,this.z)),this.w=Math.max(e,Math.min(n,this.w)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this.w=e.w+(n.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class LE extends Dr{constructor(e=1,n=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=1,this.scissor=new at(0,0,e,n),this.scissorTest=!1,this.viewport=new at(0,0,e,n);const r={width:e,height:n,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:pn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const s=new $t(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);s.flipY=!1,s.generateMipmaps=i.generateMipmaps,s.internalFormat=i.internalFormat,this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,n,i=1){if(this.width!==e||this.height!==n||this.depth!==i){this.width=e,this.height=n,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=n,this.textures[r].image.depth=i;this.dispose()}this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,r=e.textures.length;i<r;i++)this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const n=Object.assign({},e.texture.image);return this.texture.source=new Xv(n),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Rr extends LE{constructor(e=1,n=1,i={}){super(e,n,i),this.isWebGLRenderTarget=!0}}class Yv extends $t{constructor(e=null,n=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=tn,this.minFilter=tn,this.wrapR=xr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class NE extends $t{constructor(e=null,n=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=tn,this.minFilter=tn,this.wrapR=xr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Pr{constructor(e=0,n=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=i,this._w=r}static slerpFlat(e,n,i,r,s,o,a){let l=i[r+0],c=i[r+1],f=i[r+2],d=i[r+3];const h=s[o+0],p=s[o+1],v=s[o+2],x=s[o+3];if(a===0){e[n+0]=l,e[n+1]=c,e[n+2]=f,e[n+3]=d;return}if(a===1){e[n+0]=h,e[n+1]=p,e[n+2]=v,e[n+3]=x;return}if(d!==x||l!==h||c!==p||f!==v){let m=1-a;const u=l*h+c*p+f*v+d*x,_=u>=0?1:-1,g=1-u*u;if(g>Number.EPSILON){const b=Math.sqrt(g),A=Math.atan2(b,u*_);m=Math.sin(m*A)/b,a=Math.sin(a*A)/b}const S=a*_;if(l=l*m+h*S,c=c*m+p*S,f=f*m+v*S,d=d*m+x*S,m===1-a){const b=1/Math.sqrt(l*l+c*c+f*f+d*d);l*=b,c*=b,f*=b,d*=b}}e[n]=l,e[n+1]=c,e[n+2]=f,e[n+3]=d}static multiplyQuaternionsFlat(e,n,i,r,s,o){const a=i[r],l=i[r+1],c=i[r+2],f=i[r+3],d=s[o],h=s[o+1],p=s[o+2],v=s[o+3];return e[n]=a*v+f*d+l*p-c*h,e[n+1]=l*v+f*h+c*d-a*p,e[n+2]=c*v+f*p+a*h-l*d,e[n+3]=f*v-a*d-l*h-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,i,r){return this._x=e,this._y=n,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){const i=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(i/2),f=a(r/2),d=a(s/2),h=l(i/2),p=l(r/2),v=l(s/2);switch(o){case"XYZ":this._x=h*f*d+c*p*v,this._y=c*p*d-h*f*v,this._z=c*f*v+h*p*d,this._w=c*f*d-h*p*v;break;case"YXZ":this._x=h*f*d+c*p*v,this._y=c*p*d-h*f*v,this._z=c*f*v-h*p*d,this._w=c*f*d+h*p*v;break;case"ZXY":this._x=h*f*d-c*p*v,this._y=c*p*d+h*f*v,this._z=c*f*v+h*p*d,this._w=c*f*d-h*p*v;break;case"ZYX":this._x=h*f*d-c*p*v,this._y=c*p*d+h*f*v,this._z=c*f*v-h*p*d,this._w=c*f*d+h*p*v;break;case"YZX":this._x=h*f*d+c*p*v,this._y=c*p*d+h*f*v,this._z=c*f*v-h*p*d,this._w=c*f*d-h*p*v;break;case"XZY":this._x=h*f*d-c*p*v,this._y=c*p*d-h*f*v,this._z=c*f*v+h*p*d,this._w=c*f*d+h*p*v;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const i=n/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,i=n[0],r=n[4],s=n[8],o=n[1],a=n[5],l=n[9],c=n[2],f=n[6],d=n[10],h=i+a+d;if(h>0){const p=.5/Math.sqrt(h+1);this._w=.25/p,this._x=(f-l)*p,this._y=(s-c)*p,this._z=(o-r)*p}else if(i>a&&i>d){const p=2*Math.sqrt(1+i-a-d);this._w=(f-l)/p,this._x=.25*p,this._y=(r+o)/p,this._z=(s+c)/p}else if(a>d){const p=2*Math.sqrt(1+a-i-d);this._w=(s-c)/p,this._x=(r+o)/p,this._y=.25*p,this._z=(l+f)/p}else{const p=2*Math.sqrt(1+d-i-a);this._w=(o-r)/p,this._x=(s+c)/p,this._y=(l+f)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let i=e.dot(n)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Gt(this.dot(e),-1,1)))}rotateTowards(e,n){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,n/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const i=e._x,r=e._y,s=e._z,o=e._w,a=n._x,l=n._y,c=n._z,f=n._w;return this._x=i*f+o*a+r*c-s*l,this._y=r*f+o*l+s*a-i*c,this._z=s*f+o*c+i*l-r*a,this._w=o*f-i*a-r*l-s*c,this._onChangeCallback(),this}slerp(e,n){if(n===0)return this;if(n===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,o=this._w;let a=o*e._w+i*e._x+r*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=i,this._y=r,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const p=1-n;return this._w=p*o+n*this._w,this._x=p*i+n*this._x,this._y=p*r+n*this._y,this._z=p*s+n*this._z,this.normalize(),this}const c=Math.sqrt(l),f=Math.atan2(c,a),d=Math.sin((1-n)*f)/c,h=Math.sin(n*f)/c;return this._w=o*d+this._w*h,this._x=i*d+this._x*h,this._y=r*d+this._y*h,this._z=s*d+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,n,i){return this.copy(e).slerp(n,i)}random(){const e=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(n),s*Math.cos(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class F{constructor(e=0,n=0,i=0){F.prototype.isVector3=!0,this.x=e,this.y=n,this.z=i}set(e,n,i){return i===void 0&&(i=this.z),this.x=e,this.y=n,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(nm.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(nm.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[3]*i+s[6]*r,this.y=s[1]*n+s[4]*i+s[7]*r,this.z=s[2]*n+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*n+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*n+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*n+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*n+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){const n=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*r-a*i),f=2*(a*n-s*r),d=2*(s*i-o*n);return this.x=n+l*c+o*d-a*f,this.y=i+l*f+a*c-s*d,this.z=r+l*d+s*f-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[4]*i+s[8]*r,this.y=s[1]*n+s[5]*i+s[9]*r,this.z=s[2]*n+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this.z=Math.max(e.z,Math.min(n.z,this.z)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this.z=Math.max(e,Math.min(n,this.z)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const i=e.x,r=e.y,s=e.z,o=n.x,a=n.y,l=n.z;return this.x=r*l-s*a,this.y=s*o-i*l,this.z=i*a-r*o,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const i=e.dot(this)/n;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return eu.copy(this).projectOnVector(e),this.sub(eu)}reflect(e){return this.sub(eu.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(Gt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return n*n+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,i){const r=Math.sin(n)*e;return this.x=r*Math.sin(i),this.y=Math.cos(n)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,i){return this.x=e*Math.sin(n),this.y=i,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=i,this.z=r,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(e),this.y=n,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const eu=new F,nm=new Pr;class Jo{constructor(e=new F(1/0,1/0,1/0),n=new F(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n+=3)this.expandByPoint(Ln.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,i=e.count;n<i;n++)this.expandByPoint(Ln.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const i=Ln.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(n===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Ln):Ln.fromBufferAttribute(s,o),Ln.applyMatrix4(e.matrixWorld),this.expandByPoint(Ln);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ma.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Ma.copy(i.boundingBox)),Ma.applyMatrix4(e.matrixWorld),this.union(Ma)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],n);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Ln),Ln.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,i;return e.normal.x>0?(n=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),n<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(no),Ea.subVectors(this.max,no),zr.subVectors(e.a,no),kr.subVectors(e.b,no),Br.subVectors(e.c,no),wi.subVectors(kr,zr),Ti.subVectors(Br,kr),sr.subVectors(zr,Br);let n=[0,-wi.z,wi.y,0,-Ti.z,Ti.y,0,-sr.z,sr.y,wi.z,0,-wi.x,Ti.z,0,-Ti.x,sr.z,0,-sr.x,-wi.y,wi.x,0,-Ti.y,Ti.x,0,-sr.y,sr.x,0];return!tu(n,zr,kr,Br,Ea)||(n=[1,0,0,0,1,0,0,0,1],!tu(n,zr,kr,Br,Ea))?!1:(wa.crossVectors(wi,Ti),n=[wa.x,wa.y,wa.z],tu(n,zr,kr,Br,Ea))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Ln).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Ln).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ni[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ni[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ni[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ni[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ni[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ni[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ni[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ni[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ni),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const ni=[new F,new F,new F,new F,new F,new F,new F,new F],Ln=new F,Ma=new Jo,zr=new F,kr=new F,Br=new F,wi=new F,Ti=new F,sr=new F,no=new F,Ea=new F,wa=new F,or=new F;function tu(t,e,n,i,r){for(let s=0,o=t.length-3;s<=o;s+=3){or.fromArray(t,s);const a=r.x*Math.abs(or.x)+r.y*Math.abs(or.y)+r.z*Math.abs(or.z),l=e.dot(or),c=n.dot(or),f=i.dot(or);if(Math.max(-Math.max(l,c,f),Math.min(l,c,f))>a)return!1}return!0}const DE=new Jo,io=new F,nu=new F;class pc{constructor(e=new F,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const i=this.center;n!==void 0?i.copy(n):DE.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const i=this.center.distanceToSquared(e);return n.copy(e),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;io.subVectors(e,this.center);const n=io.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),r=(i-this.radius)*.5;this.center.addScaledVector(io,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(nu.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(io.copy(e.center).add(nu)),this.expandByPoint(io.copy(e.center).sub(nu))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const ii=new F,iu=new F,Ta=new F,Ai=new F,ru=new F,Aa=new F,su=new F;class dh{constructor(e=new F,n=new F(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ii)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=ii.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(ii.copy(this.origin).addScaledVector(this.direction,n),ii.distanceToSquared(e))}distanceSqToSegment(e,n,i,r){iu.copy(e).add(n).multiplyScalar(.5),Ta.copy(n).sub(e).normalize(),Ai.copy(this.origin).sub(iu);const s=e.distanceTo(n)*.5,o=-this.direction.dot(Ta),a=Ai.dot(this.direction),l=-Ai.dot(Ta),c=Ai.lengthSq(),f=Math.abs(1-o*o);let d,h,p,v;if(f>0)if(d=o*l-a,h=o*a-l,v=s*f,d>=0)if(h>=-v)if(h<=v){const x=1/f;d*=x,h*=x,p=d*(d+o*h+2*a)+h*(o*d+h+2*l)+c}else h=s,d=Math.max(0,-(o*h+a)),p=-d*d+h*(h+2*l)+c;else h=-s,d=Math.max(0,-(o*h+a)),p=-d*d+h*(h+2*l)+c;else h<=-v?(d=Math.max(0,-(-o*s+a)),h=d>0?-s:Math.min(Math.max(-s,-l),s),p=-d*d+h*(h+2*l)+c):h<=v?(d=0,h=Math.min(Math.max(-s,-l),s),p=h*(h+2*l)+c):(d=Math.max(0,-(o*s+a)),h=d>0?s:Math.min(Math.max(-s,-l),s),p=-d*d+h*(h+2*l)+c);else h=o>0?-s:s,d=Math.max(0,-(o*h+a)),p=-d*d+h*(h+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(iu).addScaledVector(Ta,h),p}intersectSphere(e,n){ii.subVectors(e.center,this.origin);const i=ii.dot(this.direction),r=ii.dot(ii)-i*i,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,n):this.at(a,n)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/n;return i>=0?i:null}intersectPlane(e,n){const i=this.distanceToPlane(e);return i===null?null:this.at(i,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let i,r,s,o,a,l;const c=1/this.direction.x,f=1/this.direction.y,d=1/this.direction.z,h=this.origin;return c>=0?(i=(e.min.x-h.x)*c,r=(e.max.x-h.x)*c):(i=(e.max.x-h.x)*c,r=(e.min.x-h.x)*c),f>=0?(s=(e.min.y-h.y)*f,o=(e.max.y-h.y)*f):(s=(e.max.y-h.y)*f,o=(e.min.y-h.y)*f),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),d>=0?(a=(e.min.z-h.z)*d,l=(e.max.z-h.z)*d):(a=(e.max.z-h.z)*d,l=(e.min.z-h.z)*d),i>l||a>r)||((a>i||i!==i)&&(i=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,n)}intersectsBox(e){return this.intersectBox(e,ii)!==null}intersectTriangle(e,n,i,r,s){ru.subVectors(n,e),Aa.subVectors(i,e),su.crossVectors(ru,Aa);let o=this.direction.dot(su),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Ai.subVectors(this.origin,e);const l=a*this.direction.dot(Aa.crossVectors(Ai,Aa));if(l<0)return null;const c=a*this.direction.dot(ru.cross(Ai));if(c<0||l+c>o)return null;const f=-a*Ai.dot(su);return f<0?null:this.at(f/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class pt{constructor(e,n,i,r,s,o,a,l,c,f,d,h,p,v,x,m){pt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,o,a,l,c,f,d,h,p,v,x,m)}set(e,n,i,r,s,o,a,l,c,f,d,h,p,v,x,m){const u=this.elements;return u[0]=e,u[4]=n,u[8]=i,u[12]=r,u[1]=s,u[5]=o,u[9]=a,u[13]=l,u[2]=c,u[6]=f,u[10]=d,u[14]=h,u[3]=p,u[7]=v,u[11]=x,u[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new pt().fromArray(this.elements)}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(e){const n=this.elements,i=e.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,i){return e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,n,i){return this.set(e.x,n.x,i.x,0,e.y,n.y,i.y,0,e.z,n.z,i.z,0,0,0,0,1),this}extractRotation(e){const n=this.elements,i=e.elements,r=1/Hr.setFromMatrixColumn(e,0).length(),s=1/Hr.setFromMatrixColumn(e,1).length(),o=1/Hr.setFromMatrixColumn(e,2).length();return n[0]=i[0]*r,n[1]=i[1]*r,n[2]=i[2]*r,n[3]=0,n[4]=i[4]*s,n[5]=i[5]*s,n[6]=i[6]*s,n[7]=0,n[8]=i[8]*o,n[9]=i[9]*o,n[10]=i[10]*o,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(r),c=Math.sin(r),f=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const h=o*f,p=o*d,v=a*f,x=a*d;n[0]=l*f,n[4]=-l*d,n[8]=c,n[1]=p+v*c,n[5]=h-x*c,n[9]=-a*l,n[2]=x-h*c,n[6]=v+p*c,n[10]=o*l}else if(e.order==="YXZ"){const h=l*f,p=l*d,v=c*f,x=c*d;n[0]=h+x*a,n[4]=v*a-p,n[8]=o*c,n[1]=o*d,n[5]=o*f,n[9]=-a,n[2]=p*a-v,n[6]=x+h*a,n[10]=o*l}else if(e.order==="ZXY"){const h=l*f,p=l*d,v=c*f,x=c*d;n[0]=h-x*a,n[4]=-o*d,n[8]=v+p*a,n[1]=p+v*a,n[5]=o*f,n[9]=x-h*a,n[2]=-o*c,n[6]=a,n[10]=o*l}else if(e.order==="ZYX"){const h=o*f,p=o*d,v=a*f,x=a*d;n[0]=l*f,n[4]=v*c-p,n[8]=h*c+x,n[1]=l*d,n[5]=x*c+h,n[9]=p*c-v,n[2]=-c,n[6]=a*l,n[10]=o*l}else if(e.order==="YZX"){const h=o*l,p=o*c,v=a*l,x=a*c;n[0]=l*f,n[4]=x-h*d,n[8]=v*d+p,n[1]=d,n[5]=o*f,n[9]=-a*f,n[2]=-c*f,n[6]=p*d+v,n[10]=h-x*d}else if(e.order==="XZY"){const h=o*l,p=o*c,v=a*l,x=a*c;n[0]=l*f,n[4]=-d,n[8]=c*f,n[1]=h*d+x,n[5]=o*f,n[9]=p*d-v,n[2]=v*d-p,n[6]=a*f,n[10]=x*d+h}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(IE,e,UE)}lookAt(e,n,i){const r=this.elements;return un.subVectors(e,n),un.lengthSq()===0&&(un.z=1),un.normalize(),Ci.crossVectors(i,un),Ci.lengthSq()===0&&(Math.abs(i.z)===1?un.x+=1e-4:un.z+=1e-4,un.normalize(),Ci.crossVectors(i,un)),Ci.normalize(),Ca.crossVectors(un,Ci),r[0]=Ci.x,r[4]=Ca.x,r[8]=un.x,r[1]=Ci.y,r[5]=Ca.y,r[9]=un.y,r[2]=Ci.z,r[6]=Ca.z,r[10]=un.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],f=i[1],d=i[5],h=i[9],p=i[13],v=i[2],x=i[6],m=i[10],u=i[14],_=i[3],g=i[7],S=i[11],b=i[15],A=r[0],T=r[4],C=r[8],E=r[12],y=r[1],L=r[5],H=r[9],z=r[13],Y=r[2],X=r[6],G=r[10],q=r[14],D=r[3],$=r[7],K=r[11],se=r[15];return s[0]=o*A+a*y+l*Y+c*D,s[4]=o*T+a*L+l*X+c*$,s[8]=o*C+a*H+l*G+c*K,s[12]=o*E+a*z+l*q+c*se,s[1]=f*A+d*y+h*Y+p*D,s[5]=f*T+d*L+h*X+p*$,s[9]=f*C+d*H+h*G+p*K,s[13]=f*E+d*z+h*q+p*se,s[2]=v*A+x*y+m*Y+u*D,s[6]=v*T+x*L+m*X+u*$,s[10]=v*C+x*H+m*G+u*K,s[14]=v*E+x*z+m*q+u*se,s[3]=_*A+g*y+S*Y+b*D,s[7]=_*T+g*L+S*X+b*$,s[11]=_*C+g*H+S*G+b*K,s[15]=_*E+g*z+S*q+b*se,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[4],r=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],f=e[2],d=e[6],h=e[10],p=e[14],v=e[3],x=e[7],m=e[11],u=e[15];return v*(+s*l*d-r*c*d-s*a*h+i*c*h+r*a*p-i*l*p)+x*(+n*l*p-n*c*h+s*o*h-r*o*p+r*c*f-s*l*f)+m*(+n*c*d-n*a*p-s*o*d+i*o*p+s*a*f-i*c*f)+u*(-r*a*f-n*l*d+n*a*h+r*o*d-i*o*h+i*l*f)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=n,r[14]=i),this}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],f=e[8],d=e[9],h=e[10],p=e[11],v=e[12],x=e[13],m=e[14],u=e[15],_=d*m*c-x*h*c+x*l*p-a*m*p-d*l*u+a*h*u,g=v*h*c-f*m*c-v*l*p+o*m*p+f*l*u-o*h*u,S=f*x*c-v*d*c+v*a*p-o*x*p-f*a*u+o*d*u,b=v*d*l-f*x*l-v*a*h+o*x*h+f*a*m-o*d*m,A=n*_+i*g+r*S+s*b;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const T=1/A;return e[0]=_*T,e[1]=(x*h*s-d*m*s-x*r*p+i*m*p+d*r*u-i*h*u)*T,e[2]=(a*m*s-x*l*s+x*r*c-i*m*c-a*r*u+i*l*u)*T,e[3]=(d*l*s-a*h*s-d*r*c+i*h*c+a*r*p-i*l*p)*T,e[4]=g*T,e[5]=(f*m*s-v*h*s+v*r*p-n*m*p-f*r*u+n*h*u)*T,e[6]=(v*l*s-o*m*s-v*r*c+n*m*c+o*r*u-n*l*u)*T,e[7]=(o*h*s-f*l*s+f*r*c-n*h*c-o*r*p+n*l*p)*T,e[8]=S*T,e[9]=(v*d*s-f*x*s-v*i*p+n*x*p+f*i*u-n*d*u)*T,e[10]=(o*x*s-v*a*s+v*i*c-n*x*c-o*i*u+n*a*u)*T,e[11]=(f*a*s-o*d*s-f*i*c+n*d*c+o*i*p-n*a*p)*T,e[12]=b*T,e[13]=(f*x*r-v*d*r+v*i*h-n*x*h-f*i*m+n*d*m)*T,e[14]=(v*a*r-o*x*r-v*i*l+n*x*l+o*i*m-n*a*m)*T,e[15]=(o*d*r-f*a*r+f*i*l-n*d*l-o*i*h+n*a*h)*T,this}scale(e){const n=this.elements,i=e.x,r=e.y,s=e.z;return n[0]*=i,n[4]*=r,n[8]*=s,n[1]*=i,n[5]*=r,n[9]*=s,n[2]*=i,n[6]*=r,n[10]*=s,n[3]*=i,n[7]*=r,n[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,i,r))}makeTranslation(e,n,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const i=Math.cos(n),r=Math.sin(n),s=1-i,o=e.x,a=e.y,l=e.z,c=s*o,f=s*a;return this.set(c*o+i,c*a-r*l,c*l+r*a,0,c*a+r*l,f*a+i,f*l-r*o,0,c*l-r*a,f*l+r*o,s*l*l+i,0,0,0,0,1),this}makeScale(e,n,i){return this.set(e,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,n,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,n,r,1,0,0,0,0,1),this}compose(e,n,i){const r=this.elements,s=n._x,o=n._y,a=n._z,l=n._w,c=s+s,f=o+o,d=a+a,h=s*c,p=s*f,v=s*d,x=o*f,m=o*d,u=a*d,_=l*c,g=l*f,S=l*d,b=i.x,A=i.y,T=i.z;return r[0]=(1-(x+u))*b,r[1]=(p+S)*b,r[2]=(v-g)*b,r[3]=0,r[4]=(p-S)*A,r[5]=(1-(h+u))*A,r[6]=(m+_)*A,r[7]=0,r[8]=(v+g)*T,r[9]=(m-_)*T,r[10]=(1-(h+x))*T,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,n,i){const r=this.elements;let s=Hr.set(r[0],r[1],r[2]).length();const o=Hr.set(r[4],r[5],r[6]).length(),a=Hr.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],Nn.copy(this);const c=1/s,f=1/o,d=1/a;return Nn.elements[0]*=c,Nn.elements[1]*=c,Nn.elements[2]*=c,Nn.elements[4]*=f,Nn.elements[5]*=f,Nn.elements[6]*=f,Nn.elements[8]*=d,Nn.elements[9]*=d,Nn.elements[10]*=d,n.setFromRotationMatrix(Nn),i.x=s,i.y=o,i.z=a,this}makePerspective(e,n,i,r,s,o,a=di){const l=this.elements,c=2*s/(n-e),f=2*s/(i-r),d=(n+e)/(n-e),h=(i+r)/(i-r);let p,v;if(a===di)p=-(o+s)/(o-s),v=-2*o*s/(o-s);else if(a===Vl)p=-o/(o-s),v=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=f,l[9]=h,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=v,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,n,i,r,s,o,a=di){const l=this.elements,c=1/(n-e),f=1/(i-r),d=1/(o-s),h=(n+e)*c,p=(i+r)*f;let v,x;if(a===di)v=(o+s)*d,x=-2*d;else if(a===Vl)v=s*d,x=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-h,l[1]=0,l[5]=2*f,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=x,l[14]=-v,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<16;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<16;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e[n+9]=i[9],e[n+10]=i[10],e[n+11]=i[11],e[n+12]=i[12],e[n+13]=i[13],e[n+14]=i[14],e[n+15]=i[15],e}}const Hr=new F,Nn=new pt,IE=new F(0,0,0),UE=new F(1,1,1),Ci=new F,Ca=new F,un=new F,im=new pt,rm=new Pr;class ei{constructor(e=0,n=0,i=0,r=ei.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,i,r=this._order){return this._x=e,this._y=n,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,i=!0){const r=e.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],f=r[9],d=r[2],h=r[6],p=r[10];switch(n){case"XYZ":this._y=Math.asin(Gt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-f,p),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Gt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(Gt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Gt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Gt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-f,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-Gt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-f,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,i){return im.makeRotationFromQuaternion(e),this.setFromRotationMatrix(im,n,i)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return rm.setFromEuler(this),this.setFromQuaternion(rm,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ei.DEFAULT_ORDER="XYZ";class $v{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let FE=0;const sm=new F,Vr=new Pr,ri=new pt,ba=new F,ro=new F,OE=new F,zE=new Pr,om=new F(1,0,0),am=new F(0,1,0),lm=new F(0,0,1),cm={type:"added"},kE={type:"removed"},Gr={type:"childadded",child:null},ou={type:"childremoved",child:null};class Ft extends Dr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:FE++}),this.uuid=Qo(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ft.DEFAULT_UP.clone();const e=new F,n=new ei,i=new Pr,r=new F(1,1,1);function s(){i.setFromEuler(n,!1)}function o(){n.setFromQuaternion(i,void 0,!1)}n._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new pt},normalMatrix:{value:new ke}}),this.matrix=new pt,this.matrixWorld=new pt,this.matrixAutoUpdate=Ft.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ft.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new $v,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return Vr.setFromAxisAngle(e,n),this.quaternion.multiply(Vr),this}rotateOnWorldAxis(e,n){return Vr.setFromAxisAngle(e,n),this.quaternion.premultiply(Vr),this}rotateX(e){return this.rotateOnAxis(om,e)}rotateY(e){return this.rotateOnAxis(am,e)}rotateZ(e){return this.rotateOnAxis(lm,e)}translateOnAxis(e,n){return sm.copy(e).applyQuaternion(this.quaternion),this.position.add(sm.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(om,e)}translateY(e){return this.translateOnAxis(am,e)}translateZ(e){return this.translateOnAxis(lm,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ri.copy(this.matrixWorld).invert())}lookAt(e,n,i){e.isVector3?ba.copy(e):ba.set(e,n,i);const r=this.parent;this.updateWorldMatrix(!0,!1),ro.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ri.lookAt(ro,ba,this.up):ri.lookAt(ba,ro,this.up),this.quaternion.setFromRotationMatrix(ri),r&&(ri.extractRotation(r.matrixWorld),Vr.setFromRotationMatrix(ri),this.quaternion.premultiply(Vr.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(cm),Gr.child=e,this.dispatchEvent(Gr),Gr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(kE),ou.child=e,this.dispatchEvent(ou),ou.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ri.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ri.multiply(e.parent.matrixWorld)),e.applyMatrix4(ri),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(cm),Gr.child=e,this.dispatchEvent(Gr),Gr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(e,n);if(o!==void 0)return o}}getObjectsByProperty(e,n,i=[]){this[e]===n&&i.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,n,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ro,e,OE),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ro,zE,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].updateMatrixWorld(e)}updateWorldMatrix(e,n){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const n=e===void 0||typeof e=="string",i={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,f=l.length;c<f;c++){const d=l[c];s(e.shapes,d)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(e.animations,l))}}if(n){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),f=o(e.images),d=o(e.shapes),h=o(e.skeletons),p=o(e.animations),v=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),f.length>0&&(i.images=f),d.length>0&&(i.shapes=d),h.length>0&&(i.skeletons=h),p.length>0&&(i.animations=p),v.length>0&&(i.nodes=v)}return i.object=r,i;function o(a){const l=[];for(const c in a){const f=a[c];delete f.metadata,l.push(f)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}Ft.DEFAULT_UP=new F(0,1,0);Ft.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ft.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Dn=new F,si=new F,au=new F,oi=new F,Wr=new F,jr=new F,um=new F,lu=new F,cu=new F,uu=new F;class qn{constructor(e=new F,n=new F,i=new F){this.a=e,this.b=n,this.c=i}static getNormal(e,n,i,r){r.subVectors(i,n),Dn.subVectors(e,n),r.cross(Dn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,n,i,r,s){Dn.subVectors(r,n),si.subVectors(i,n),au.subVectors(e,n);const o=Dn.dot(Dn),a=Dn.dot(si),l=Dn.dot(au),c=si.dot(si),f=si.dot(au),d=o*c-a*a;if(d===0)return s.set(0,0,0),null;const h=1/d,p=(c*l-a*f)*h,v=(o*f-a*l)*h;return s.set(1-p-v,v,p)}static containsPoint(e,n,i,r){return this.getBarycoord(e,n,i,r,oi)===null?!1:oi.x>=0&&oi.y>=0&&oi.x+oi.y<=1}static getInterpolation(e,n,i,r,s,o,a,l){return this.getBarycoord(e,n,i,r,oi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,oi.x),l.addScaledVector(o,oi.y),l.addScaledVector(a,oi.z),l)}static isFrontFacing(e,n,i,r){return Dn.subVectors(i,n),si.subVectors(e,n),Dn.cross(si).dot(r)<0}set(e,n,i){return this.a.copy(e),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(e,n,i,r){return this.a.copy(e[n]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,n,i,r){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Dn.subVectors(this.c,this.b),si.subVectors(this.a,this.b),Dn.cross(si).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return qn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return qn.getBarycoord(e,this.a,this.b,this.c,n)}getInterpolation(e,n,i,r,s){return qn.getInterpolation(e,this.a,this.b,this.c,n,i,r,s)}containsPoint(e){return qn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return qn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const i=this.a,r=this.b,s=this.c;let o,a;Wr.subVectors(r,i),jr.subVectors(s,i),lu.subVectors(e,i);const l=Wr.dot(lu),c=jr.dot(lu);if(l<=0&&c<=0)return n.copy(i);cu.subVectors(e,r);const f=Wr.dot(cu),d=jr.dot(cu);if(f>=0&&d<=f)return n.copy(r);const h=l*d-f*c;if(h<=0&&l>=0&&f<=0)return o=l/(l-f),n.copy(i).addScaledVector(Wr,o);uu.subVectors(e,s);const p=Wr.dot(uu),v=jr.dot(uu);if(v>=0&&p<=v)return n.copy(s);const x=p*c-l*v;if(x<=0&&c>=0&&v<=0)return a=c/(c-v),n.copy(i).addScaledVector(jr,a);const m=f*v-p*d;if(m<=0&&d-f>=0&&p-v>=0)return um.subVectors(s,r),a=(d-f)/(d-f+(p-v)),n.copy(r).addScaledVector(um,a);const u=1/(m+x+h);return o=x*u,a=h*u,n.copy(i).addScaledVector(Wr,o).addScaledVector(jr,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const qv={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},bi={h:0,s:0,l:0},Ra={h:0,s:0,l:0};function fu(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+(e-t)*6*n:n<1/2?e:n<2/3?t+(e-t)*6*(2/3-n):t}class Be{constructor(e,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,i)}set(e,n,i){if(n===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,n,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=Xn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Je.toWorkingColorSpace(this,n),this}setRGB(e,n,i,r=Je.workingColorSpace){return this.r=e,this.g=n,this.b=i,Je.toWorkingColorSpace(this,r),this}setHSL(e,n,i,r=Je.workingColorSpace){if(e=EE(e,1),n=Gt(n,0,1),i=Gt(i,0,1),n===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+n):i+n-i*n,o=2*i-s;this.r=fu(o,s,e+1/3),this.g=fu(o,s,e),this.b=fu(o,s,e-1/3)}return Je.toWorkingColorSpace(this,r),this}setStyle(e,n=Xn){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,n);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,n);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,n);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,n);if(o===6)return this.setHex(parseInt(s,16),n);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=Xn){const i=qv[e.toLowerCase()];return i!==void 0?this.setHex(i,n):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ms(e.r),this.g=Ms(e.g),this.b=Ms(e.b),this}copyLinearToSRGB(e){return this.r=Qc(e.r),this.g=Qc(e.g),this.b=Qc(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Xn){return Je.fromWorkingColorSpace(Ht.copy(this),e),Math.round(Gt(Ht.r*255,0,255))*65536+Math.round(Gt(Ht.g*255,0,255))*256+Math.round(Gt(Ht.b*255,0,255))}getHexString(e=Xn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=Je.workingColorSpace){Je.fromWorkingColorSpace(Ht.copy(this),n);const i=Ht.r,r=Ht.g,s=Ht.b,o=Math.max(i,r,s),a=Math.min(i,r,s);let l,c;const f=(a+o)/2;if(a===o)l=0,c=0;else{const d=o-a;switch(c=f<=.5?d/(o+a):d/(2-o-a),o){case i:l=(r-s)/d+(r<s?6:0);break;case r:l=(s-i)/d+2;break;case s:l=(i-r)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=f,e}getRGB(e,n=Je.workingColorSpace){return Je.fromWorkingColorSpace(Ht.copy(this),n),e.r=Ht.r,e.g=Ht.g,e.b=Ht.b,e}getStyle(e=Xn){Je.fromWorkingColorSpace(Ht.copy(this),e);const n=Ht.r,i=Ht.g,r=Ht.b;return e!==Xn?`color(${e} ${n.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,n,i){return this.getHSL(bi),this.setHSL(bi.h+e,bi.s+n,bi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,i){return this.r=e.r+(n.r-e.r)*i,this.g=e.g+(n.g-e.g)*i,this.b=e.b+(n.b-e.b)*i,this}lerpHSL(e,n){this.getHSL(bi),e.getHSL(Ra);const i=Kc(bi.h,Ra.h,n),r=Kc(bi.s,Ra.s,n),s=Kc(bi.l,Ra.l,n);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*n+s[3]*i+s[6]*r,this.g=s[1]*n+s[4]*i+s[7]*r,this.b=s[2]*n+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ht=new Be;Be.NAMES=qv;let BE=0;class Ws extends Dr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:BE++}),this.uuid=Qo(),this.name="",this.type="Material",this.blending=ys,this.side=Qi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Tf,this.blendDst=Af,this.blendEquation=pr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Be(0,0,0),this.blendAlpha=0,this.depthFunc=zl,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Kp,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Fr,this.stencilZFail=Fr,this.stencilZPass=Fr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const i=e[n];if(i===void 0){console.warn(`THREE.Material: parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){console.warn(`THREE.Material: '${n}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==ys&&(i.blending=this.blending),this.side!==Qi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Tf&&(i.blendSrc=this.blendSrc),this.blendDst!==Af&&(i.blendDst=this.blendDst),this.blendEquation!==pr&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==zl&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Kp&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Fr&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Fr&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Fr&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(n){const s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let i=null;if(n!==null){const r=n.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=n[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Kv extends Ws{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Be(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ei,this.combine=Lv,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Mt=new F,Pa=new De;class An{constructor(e,n,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=i,this.usage=Zp,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Kn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return wo("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,i){e*=this.itemSize,i*=n.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=n.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)Pa.fromBufferAttribute(this,n),Pa.applyMatrix3(e),this.setXY(n,Pa.x,Pa.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)Mt.fromBufferAttribute(this,n),Mt.applyMatrix3(e),this.setXYZ(n,Mt.x,Mt.y,Mt.z);return this}applyMatrix4(e){for(let n=0,i=this.count;n<i;n++)Mt.fromBufferAttribute(this,n),Mt.applyMatrix4(e),this.setXYZ(n,Mt.x,Mt.y,Mt.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)Mt.fromBufferAttribute(this,n),Mt.applyNormalMatrix(e),this.setXYZ(n,Mt.x,Mt.y,Mt.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)Mt.fromBufferAttribute(this,n),Mt.transformDirection(e),this.setXYZ(n,Mt.x,Mt.y,Mt.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let i=this.array[e*this.itemSize+n];return this.normalized&&(i=eo(i,this.array)),i}setComponent(e,n,i){return this.normalized&&(i=Zt(i,this.array)),this.array[e*this.itemSize+n]=i,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=eo(n,this.array)),n}setX(e,n){return this.normalized&&(n=Zt(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=eo(n,this.array)),n}setY(e,n){return this.normalized&&(n=Zt(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=eo(n,this.array)),n}setZ(e,n){return this.normalized&&(n=Zt(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=eo(n,this.array)),n}setW(e,n){return this.normalized&&(n=Zt(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,i){return e*=this.itemSize,this.normalized&&(n=Zt(n,this.array),i=Zt(i,this.array)),this.array[e+0]=n,this.array[e+1]=i,this}setXYZ(e,n,i,r){return e*=this.itemSize,this.normalized&&(n=Zt(n,this.array),i=Zt(i,this.array),r=Zt(r,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,n,i,r,s){return e*=this.itemSize,this.normalized&&(n=Zt(n,this.array),i=Zt(i,this.array),r=Zt(r,this.array),s=Zt(s,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Zp&&(e.usage=this.usage),e}}class Zv extends An{constructor(e,n,i){super(new Uint16Array(e),n,i)}}class Qv extends An{constructor(e,n,i){super(new Uint32Array(e),n,i)}}class an extends An{constructor(e,n,i){super(new Float32Array(e),n,i)}}let HE=0;const Sn=new pt,du=new Ft,Xr=new F,fn=new Jo,so=new Jo,Rt=new F;class Vn extends Dr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:HE++}),this.uuid=Qo(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(jv(e)?Qv:Zv)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,i=0){this.groups.push({start:e,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new ke().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Sn.makeRotationFromQuaternion(e),this.applyMatrix4(Sn),this}rotateX(e){return Sn.makeRotationX(e),this.applyMatrix4(Sn),this}rotateY(e){return Sn.makeRotationY(e),this.applyMatrix4(Sn),this}rotateZ(e){return Sn.makeRotationZ(e),this.applyMatrix4(Sn),this}translate(e,n,i){return Sn.makeTranslation(e,n,i),this.applyMatrix4(Sn),this}scale(e,n,i){return Sn.makeScale(e,n,i),this.applyMatrix4(Sn),this}lookAt(e){return du.lookAt(e),du.updateMatrix(),this.applyMatrix4(du.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Xr).negate(),this.translate(Xr.x,Xr.y,Xr.z),this}setFromPoints(e){const n=[];for(let i=0,r=e.length;i<r;i++){const s=e[i];n.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new an(n,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Jo);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new F(-1/0,-1/0,-1/0),new F(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let i=0,r=n.length;i<r;i++){const s=n[i];fn.setFromBufferAttribute(s),this.morphTargetsRelative?(Rt.addVectors(this.boundingBox.min,fn.min),this.boundingBox.expandByPoint(Rt),Rt.addVectors(this.boundingBox.max,fn.max),this.boundingBox.expandByPoint(Rt)):(this.boundingBox.expandByPoint(fn.min),this.boundingBox.expandByPoint(fn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new pc);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new F,1/0);return}if(e){const i=this.boundingSphere.center;if(fn.setFromBufferAttribute(e),n)for(let s=0,o=n.length;s<o;s++){const a=n[s];so.setFromBufferAttribute(a),this.morphTargetsRelative?(Rt.addVectors(fn.min,so.min),fn.expandByPoint(Rt),Rt.addVectors(fn.max,so.max),fn.expandByPoint(Rt)):(fn.expandByPoint(so.min),fn.expandByPoint(so.max))}fn.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)Rt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Rt));if(n)for(let s=0,o=n.length;s<o;s++){const a=n[s],l=this.morphTargetsRelative;for(let c=0,f=a.count;c<f;c++)Rt.fromBufferAttribute(a,c),l&&(Xr.fromBufferAttribute(e,c),Rt.add(Xr)),r=Math.max(r,i.distanceToSquared(Rt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=n.position,r=n.normal,s=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new An(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let C=0;C<i.count;C++)a[C]=new F,l[C]=new F;const c=new F,f=new F,d=new F,h=new De,p=new De,v=new De,x=new F,m=new F;function u(C,E,y){c.fromBufferAttribute(i,C),f.fromBufferAttribute(i,E),d.fromBufferAttribute(i,y),h.fromBufferAttribute(s,C),p.fromBufferAttribute(s,E),v.fromBufferAttribute(s,y),f.sub(c),d.sub(c),p.sub(h),v.sub(h);const L=1/(p.x*v.y-v.x*p.y);isFinite(L)&&(x.copy(f).multiplyScalar(v.y).addScaledVector(d,-p.y).multiplyScalar(L),m.copy(d).multiplyScalar(p.x).addScaledVector(f,-v.x).multiplyScalar(L),a[C].add(x),a[E].add(x),a[y].add(x),l[C].add(m),l[E].add(m),l[y].add(m))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let C=0,E=_.length;C<E;++C){const y=_[C],L=y.start,H=y.count;for(let z=L,Y=L+H;z<Y;z+=3)u(e.getX(z+0),e.getX(z+1),e.getX(z+2))}const g=new F,S=new F,b=new F,A=new F;function T(C){b.fromBufferAttribute(r,C),A.copy(b);const E=a[C];g.copy(E),g.sub(b.multiplyScalar(b.dot(E))).normalize(),S.crossVectors(A,E);const L=S.dot(l[C])<0?-1:1;o.setXYZW(C,g.x,g.y,g.z,L)}for(let C=0,E=_.length;C<E;++C){const y=_[C],L=y.start,H=y.count;for(let z=L,Y=L+H;z<Y;z+=3)T(e.getX(z+0)),T(e.getX(z+1)),T(e.getX(z+2))}}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new An(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let h=0,p=i.count;h<p;h++)i.setXYZ(h,0,0,0);const r=new F,s=new F,o=new F,a=new F,l=new F,c=new F,f=new F,d=new F;if(e)for(let h=0,p=e.count;h<p;h+=3){const v=e.getX(h+0),x=e.getX(h+1),m=e.getX(h+2);r.fromBufferAttribute(n,v),s.fromBufferAttribute(n,x),o.fromBufferAttribute(n,m),f.subVectors(o,s),d.subVectors(r,s),f.cross(d),a.fromBufferAttribute(i,v),l.fromBufferAttribute(i,x),c.fromBufferAttribute(i,m),a.add(f),l.add(f),c.add(f),i.setXYZ(v,a.x,a.y,a.z),i.setXYZ(x,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let h=0,p=n.count;h<p;h+=3)r.fromBufferAttribute(n,h+0),s.fromBufferAttribute(n,h+1),o.fromBufferAttribute(n,h+2),f.subVectors(o,s),d.subVectors(r,s),f.cross(d),i.setXYZ(h+0,f.x,f.y,f.z),i.setXYZ(h+1,f.x,f.y,f.z),i.setXYZ(h+2,f.x,f.y,f.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let n=0,i=e.count;n<i;n++)Rt.fromBufferAttribute(e,n),Rt.normalize(),e.setXYZ(n,Rt.x,Rt.y,Rt.z)}toNonIndexed(){function e(a,l){const c=a.array,f=a.itemSize,d=a.normalized,h=new c.constructor(l.length*f);let p=0,v=0;for(let x=0,m=l.length;x<m;x++){a.isInterleavedBufferAttribute?p=l[x]*a.data.stride+a.offset:p=l[x]*f;for(let u=0;u<f;u++)h[v++]=c[p++]}return new An(h,f,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new Vn,i=this.index.array,r=this.attributes;for(const a in r){const l=r[a],c=e(l,i);n.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let f=0,d=c.length;f<d;f++){const h=c[f],p=e(h,i);l.push(p)}n.morphAttributes[a]=l}n.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];n.addGroup(c.start,c.count,c.materialIndex)}return n}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],f=[];for(let d=0,h=c.length;d<h;d++){const p=c[d];f.push(p.toJSON(e.data))}f.length>0&&(r[l]=f,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(n));const r=e.attributes;for(const c in r){const f=r[c];this.setAttribute(c,f.clone(n))}const s=e.morphAttributes;for(const c in s){const f=[],d=s[c];for(let h=0,p=d.length;h<p;h++)f.push(d[h].clone(n));this.morphAttributes[c]=f}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,f=o.length;c<f;c++){const d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const fm=new pt,ar=new dh,La=new pc,dm=new F,Yr=new F,$r=new F,qr=new F,hu=new F,Na=new F,Da=new De,Ia=new De,Ua=new De,hm=new F,pm=new F,mm=new F,Fa=new F,Oa=new F;class Zn extends Ft{constructor(e=new Vn,n=new Kv){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,n){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;n.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(s&&a){Na.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const f=a[l],d=s[l];f!==0&&(hu.fromBufferAttribute(d,e),o?Na.addScaledVector(hu,f):Na.addScaledVector(hu.sub(n),f))}n.add(Na)}return n}raycast(e,n){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),La.copy(i.boundingSphere),La.applyMatrix4(s),ar.copy(e.ray).recast(e.near),!(La.containsPoint(ar.origin)===!1&&(ar.intersectSphere(La,dm)===null||ar.origin.distanceToSquared(dm)>(e.far-e.near)**2))&&(fm.copy(s).invert(),ar.copy(e.ray).applyMatrix4(fm),!(i.boundingBox!==null&&ar.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,n,ar)))}_computeIntersections(e,n,i){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,f=s.attributes.uv1,d=s.attributes.normal,h=s.groups,p=s.drawRange;if(a!==null)if(Array.isArray(o))for(let v=0,x=h.length;v<x;v++){const m=h[v],u=o[m.materialIndex],_=Math.max(m.start,p.start),g=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let S=_,b=g;S<b;S+=3){const A=a.getX(S),T=a.getX(S+1),C=a.getX(S+2);r=za(this,u,e,i,c,f,d,A,T,C),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=m.materialIndex,n.push(r))}}else{const v=Math.max(0,p.start),x=Math.min(a.count,p.start+p.count);for(let m=v,u=x;m<u;m+=3){const _=a.getX(m),g=a.getX(m+1),S=a.getX(m+2);r=za(this,o,e,i,c,f,d,_,g,S),r&&(r.faceIndex=Math.floor(m/3),n.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let v=0,x=h.length;v<x;v++){const m=h[v],u=o[m.materialIndex],_=Math.max(m.start,p.start),g=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let S=_,b=g;S<b;S+=3){const A=S,T=S+1,C=S+2;r=za(this,u,e,i,c,f,d,A,T,C),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=m.materialIndex,n.push(r))}}else{const v=Math.max(0,p.start),x=Math.min(l.count,p.start+p.count);for(let m=v,u=x;m<u;m+=3){const _=m,g=m+1,S=m+2;r=za(this,o,e,i,c,f,d,_,g,S),r&&(r.faceIndex=Math.floor(m/3),n.push(r))}}}}function VE(t,e,n,i,r,s,o,a){let l;if(e.side===on?l=i.intersectTriangle(o,s,r,!0,a):l=i.intersectTriangle(r,s,o,e.side===Qi,a),l===null)return null;Oa.copy(a),Oa.applyMatrix4(t.matrixWorld);const c=n.ray.origin.distanceTo(Oa);return c<n.near||c>n.far?null:{distance:c,point:Oa.clone(),object:t}}function za(t,e,n,i,r,s,o,a,l,c){t.getVertexPosition(a,Yr),t.getVertexPosition(l,$r),t.getVertexPosition(c,qr);const f=VE(t,e,n,i,Yr,$r,qr,Fa);if(f){r&&(Da.fromBufferAttribute(r,a),Ia.fromBufferAttribute(r,l),Ua.fromBufferAttribute(r,c),f.uv=qn.getInterpolation(Fa,Yr,$r,qr,Da,Ia,Ua,new De)),s&&(Da.fromBufferAttribute(s,a),Ia.fromBufferAttribute(s,l),Ua.fromBufferAttribute(s,c),f.uv1=qn.getInterpolation(Fa,Yr,$r,qr,Da,Ia,Ua,new De)),o&&(hm.fromBufferAttribute(o,a),pm.fromBufferAttribute(o,l),mm.fromBufferAttribute(o,c),f.normal=qn.getInterpolation(Fa,Yr,$r,qr,hm,pm,mm,new F),f.normal.dot(i.direction)>0&&f.normal.multiplyScalar(-1));const d={a,b:l,c,normal:new F,materialIndex:0};qn.getNormal(Yr,$r,qr,d.normal),f.face=d}return f}class ea extends Vn{constructor(e=1,n=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],f=[],d=[];let h=0,p=0;v("z","y","x",-1,-1,i,n,e,o,s,0),v("z","y","x",1,-1,i,n,-e,o,s,1),v("x","z","y",1,1,e,i,n,r,o,2),v("x","z","y",1,-1,e,i,-n,r,o,3),v("x","y","z",1,-1,e,n,i,r,s,4),v("x","y","z",-1,-1,e,n,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new an(c,3)),this.setAttribute("normal",new an(f,3)),this.setAttribute("uv",new an(d,2));function v(x,m,u,_,g,S,b,A,T,C,E){const y=S/T,L=b/C,H=S/2,z=b/2,Y=A/2,X=T+1,G=C+1;let q=0,D=0;const $=new F;for(let K=0;K<G;K++){const se=K*L-z;for(let J=0;J<X;J++){const Ie=J*y-H;$[x]=Ie*_,$[m]=se*g,$[u]=Y,c.push($.x,$.y,$.z),$[x]=0,$[m]=0,$[u]=A>0?1:-1,f.push($.x,$.y,$.z),d.push(J/T),d.push(1-K/C),q+=1}}for(let K=0;K<C;K++)for(let se=0;se<T;se++){const J=h+se+X*K,Ie=h+se+X*(K+1),j=h+(se+1)+X*(K+1),ie=h+(se+1)+X*K;l.push(J,Ie,ie),l.push(Ie,j,ie),D+=6}a.addGroup(p,D,E),p+=D,h+=q}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ea(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Fs(t){const e={};for(const n in t){e[n]={};for(const i in t[n]){const r=t[n][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][i]=null):e[n][i]=r.clone():Array.isArray(r)?e[n][i]=r.slice():e[n][i]=r}}return e}function jt(t){const e={};for(let n=0;n<t.length;n++){const i=Fs(t[n]);for(const r in i)e[r]=i[r]}return e}function GE(t){const e=[];for(let n=0;n<t.length;n++)e.push(t[n].clone());return e}function Jv(t){const e=t.getRenderTarget();return e===null?t.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Je.workingColorSpace}const WE={clone:Fs,merge:jt};var jE=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,XE=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class xi extends Ws{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=jE,this.fragmentShader=XE,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Fs(e.uniforms),this.uniformsGroups=GE(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?n.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?n.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?n.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?n.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?n.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?n.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?n.uniforms[r]={type:"m4",value:o.toArray()}:n.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}}class e0 extends Ft{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new pt,this.projectionMatrix=new pt,this.projectionMatrixInverse=new pt,this.coordinateSystem=di}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,n){super.updateWorldMatrix(e,n),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Ri=new F,gm=new De,_m=new De;class hn extends e0{constructor(e=50,n=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=id*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ul*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return id*2*Math.atan(Math.tan(ul*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,n,i){Ri.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ri.x,Ri.y).multiplyScalar(-e/Ri.z),Ri.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Ri.x,Ri.y).multiplyScalar(-e/Ri.z)}getViewSize(e,n){return this.getViewBounds(e,gm,_m),n.subVectors(_m,gm)}setViewOffset(e,n,i,r,s,o){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan(ul*.5*this.fov)/this.zoom,i=2*n,r=this.aspect*i,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,n-=o.offsetY*i/c,r*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,n,n-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}const Kr=-90,Zr=1;class YE extends Ft{constructor(e,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new hn(Kr,Zr,e,n);r.layers=this.layers,this.add(r);const s=new hn(Kr,Zr,e,n);s.layers=this.layers,this.add(s);const o=new hn(Kr,Zr,e,n);o.layers=this.layers,this.add(o);const a=new hn(Kr,Zr,e,n);a.layers=this.layers,this.add(a);const l=new hn(Kr,Zr,e,n);l.layers=this.layers,this.add(l);const c=new hn(Kr,Zr,e,n);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,n=this.children.concat(),[i,r,s,o,a,l]=n;for(const c of n)this.remove(c);if(e===di)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Vl)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of n)this.add(c),c.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,f]=this.children,d=e.getRenderTarget(),h=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),v=e.xr.enabled;e.xr.enabled=!1;const x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(n,s),e.setRenderTarget(i,1,r),e.render(n,o),e.setRenderTarget(i,2,r),e.render(n,a),e.setRenderTarget(i,3,r),e.render(n,l),e.setRenderTarget(i,4,r),e.render(n,c),i.texture.generateMipmaps=x,e.setRenderTarget(i,5,r),e.render(n,f),e.setRenderTarget(d,h,p),e.xr.enabled=v,i.texture.needsPMREMUpdate=!0}}class t0 extends $t{constructor(e,n,i,r,s,o,a,l,c,f){e=e!==void 0?e:[],n=n!==void 0?n:Ns,super(e,n,i,r,s,o,a,l,c,f),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class $E extends Rr{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new t0(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:pn}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new ea(5,5,5),s=new xi({name:"CubemapFromEquirect",uniforms:Fs(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:on,blending:$i});s.uniforms.tEquirect.value=n;const o=new Zn(r,s),a=n.minFilter;return n.minFilter===yr&&(n.minFilter=pn),new YE(1,10,this).update(e,o),n.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,n,i,r){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(n,i,r);e.setRenderTarget(s)}}const pu=new F,qE=new F,KE=new ke;class Ni{constructor(e=new F(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,i,r){return this.normal.set(e,n,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,i){const r=pu.subVectors(i,n).cross(qE.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n){const i=e.delta(pu),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:n.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const n=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return n<0&&i>0||i<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const i=n||KE.getNormalMatrix(e),r=this.coplanarPoint(pu).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const lr=new pc,ka=new F;class hh{constructor(e=new Ni,n=new Ni,i=new Ni,r=new Ni,s=new Ni,o=new Ni){this.planes=[e,n,i,r,s,o]}set(e,n,i,r,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(n),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,n=di){const i=this.planes,r=e.elements,s=r[0],o=r[1],a=r[2],l=r[3],c=r[4],f=r[5],d=r[6],h=r[7],p=r[8],v=r[9],x=r[10],m=r[11],u=r[12],_=r[13],g=r[14],S=r[15];if(i[0].setComponents(l-s,h-c,m-p,S-u).normalize(),i[1].setComponents(l+s,h+c,m+p,S+u).normalize(),i[2].setComponents(l+o,h+f,m+v,S+_).normalize(),i[3].setComponents(l-o,h-f,m-v,S-_).normalize(),i[4].setComponents(l-a,h-d,m-x,S-g).normalize(),n===di)i[5].setComponents(l+a,h+d,m+x,S+g).normalize();else if(n===Vl)i[5].setComponents(a,d,x,g).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),lr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),lr.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(lr)}intersectsSprite(e){return lr.center.set(0,0,0),lr.radius=.7071067811865476,lr.applyMatrix4(e.matrixWorld),this.intersectsSphere(lr)}intersectsSphere(e){const n=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(n[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const n=this.planes;for(let i=0;i<6;i++){const r=n[i];if(ka.x=r.normal.x>0?e.max.x:e.min.x,ka.y=r.normal.y>0?e.max.y:e.min.y,ka.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(ka)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function n0(){let t=null,e=!1,n=null,i=null;function r(s,o){n(s,o),i=t.requestAnimationFrame(r)}return{start:function(){e!==!0&&n!==null&&(i=t.requestAnimationFrame(r),e=!0)},stop:function(){t.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){n=s},setContext:function(s){t=s}}}function ZE(t){const e=new WeakMap;function n(a,l){const c=a.array,f=a.usage,d=c.byteLength,h=t.createBuffer();t.bindBuffer(l,h),t.bufferData(l,c,f),a.onUploadCallback();let p;if(c instanceof Float32Array)p=t.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?p=t.HALF_FLOAT:p=t.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=t.SHORT;else if(c instanceof Uint32Array)p=t.UNSIGNED_INT;else if(c instanceof Int32Array)p=t.INT;else if(c instanceof Int8Array)p=t.BYTE;else if(c instanceof Uint8Array)p=t.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=t.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function i(a,l,c){const f=l.array,d=l._updateRange,h=l.updateRanges;if(t.bindBuffer(c,a),d.count===-1&&h.length===0&&t.bufferSubData(c,0,f),h.length!==0){for(let p=0,v=h.length;p<v;p++){const x=h[p];t.bufferSubData(c,x.start*f.BYTES_PER_ELEMENT,f,x.start,x.count)}l.clearUpdateRanges()}d.count!==-1&&(t.bufferSubData(c,d.offset*f.BYTES_PER_ELEMENT,f,d.offset,d.count),d.count=-1),l.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(t.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const f=e.get(a);(!f||f.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,n(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:r,remove:s,update:o}}class ta extends Vn{constructor(e=1,n=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:i,heightSegments:r};const s=e/2,o=n/2,a=Math.floor(i),l=Math.floor(r),c=a+1,f=l+1,d=e/a,h=n/l,p=[],v=[],x=[],m=[];for(let u=0;u<f;u++){const _=u*h-o;for(let g=0;g<c;g++){const S=g*d-s;v.push(S,-_,0),x.push(0,0,1),m.push(g/a),m.push(1-u/l)}}for(let u=0;u<l;u++)for(let _=0;_<a;_++){const g=_+c*u,S=_+c*(u+1),b=_+1+c*(u+1),A=_+1+c*u;p.push(g,S,A),p.push(S,b,A)}this.setIndex(p),this.setAttribute("position",new an(v,3)),this.setAttribute("normal",new an(x,3)),this.setAttribute("uv",new an(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ta(e.width,e.height,e.widthSegments,e.heightSegments)}}var QE=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,JE=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,e1=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,t1=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,n1=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,i1=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,r1=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,s1=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,o1=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,a1=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,l1=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,c1=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,u1=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,f1=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,d1=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,h1=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,p1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,m1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,g1=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,_1=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,v1=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,x1=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,y1=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,S1=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,M1=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,E1=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,w1=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,T1=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,A1=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,C1=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,b1="gl_FragColor = linearToOutputTexel( gl_FragColor );",R1=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,P1=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,L1=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,N1=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,D1=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,I1=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,U1=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,F1=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,O1=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,z1=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,k1=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,B1=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,H1=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,V1=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,G1=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,W1=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,j1=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,X1=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Y1=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,$1=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,q1=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,K1=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Z1=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Q1=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,J1=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,ew=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,tw=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,nw=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,iw=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,rw=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,sw=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,ow=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,aw=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,lw=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,cw=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,uw=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,fw=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,dw=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,hw=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,pw=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,mw=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,gw=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,_w=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,vw=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,xw=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,yw=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Sw=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Mw=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Ew=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,ww=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Tw=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Aw=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Cw=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,bw=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Rw=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Pw=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Lw=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Nw=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Dw=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Iw=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Uw=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Fw=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Ow=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,zw=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,kw=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Bw=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Hw=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Vw=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Gw=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Ww=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,jw=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Xw=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Yw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,$w=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,qw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Kw=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Zw=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Qw=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Jw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,eT=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,tT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,nT=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,iT=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,rT=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,sT=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,oT=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,aT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,lT=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cT=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,uT=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,fT=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,dT=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,hT=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,pT=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,mT=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,gT=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,_T=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,vT=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,xT=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,yT=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ST=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,MT=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ET=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,wT=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,TT=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,AT=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,CT=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,bT=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,RT=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,PT=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ze={alphahash_fragment:QE,alphahash_pars_fragment:JE,alphamap_fragment:e1,alphamap_pars_fragment:t1,alphatest_fragment:n1,alphatest_pars_fragment:i1,aomap_fragment:r1,aomap_pars_fragment:s1,batching_pars_vertex:o1,batching_vertex:a1,begin_vertex:l1,beginnormal_vertex:c1,bsdfs:u1,iridescence_fragment:f1,bumpmap_pars_fragment:d1,clipping_planes_fragment:h1,clipping_planes_pars_fragment:p1,clipping_planes_pars_vertex:m1,clipping_planes_vertex:g1,color_fragment:_1,color_pars_fragment:v1,color_pars_vertex:x1,color_vertex:y1,common:S1,cube_uv_reflection_fragment:M1,defaultnormal_vertex:E1,displacementmap_pars_vertex:w1,displacementmap_vertex:T1,emissivemap_fragment:A1,emissivemap_pars_fragment:C1,colorspace_fragment:b1,colorspace_pars_fragment:R1,envmap_fragment:P1,envmap_common_pars_fragment:L1,envmap_pars_fragment:N1,envmap_pars_vertex:D1,envmap_physical_pars_fragment:W1,envmap_vertex:I1,fog_vertex:U1,fog_pars_vertex:F1,fog_fragment:O1,fog_pars_fragment:z1,gradientmap_pars_fragment:k1,lightmap_pars_fragment:B1,lights_lambert_fragment:H1,lights_lambert_pars_fragment:V1,lights_pars_begin:G1,lights_toon_fragment:j1,lights_toon_pars_fragment:X1,lights_phong_fragment:Y1,lights_phong_pars_fragment:$1,lights_physical_fragment:q1,lights_physical_pars_fragment:K1,lights_fragment_begin:Z1,lights_fragment_maps:Q1,lights_fragment_end:J1,logdepthbuf_fragment:ew,logdepthbuf_pars_fragment:tw,logdepthbuf_pars_vertex:nw,logdepthbuf_vertex:iw,map_fragment:rw,map_pars_fragment:sw,map_particle_fragment:ow,map_particle_pars_fragment:aw,metalnessmap_fragment:lw,metalnessmap_pars_fragment:cw,morphinstance_vertex:uw,morphcolor_vertex:fw,morphnormal_vertex:dw,morphtarget_pars_vertex:hw,morphtarget_vertex:pw,normal_fragment_begin:mw,normal_fragment_maps:gw,normal_pars_fragment:_w,normal_pars_vertex:vw,normal_vertex:xw,normalmap_pars_fragment:yw,clearcoat_normal_fragment_begin:Sw,clearcoat_normal_fragment_maps:Mw,clearcoat_pars_fragment:Ew,iridescence_pars_fragment:ww,opaque_fragment:Tw,packing:Aw,premultiplied_alpha_fragment:Cw,project_vertex:bw,dithering_fragment:Rw,dithering_pars_fragment:Pw,roughnessmap_fragment:Lw,roughnessmap_pars_fragment:Nw,shadowmap_pars_fragment:Dw,shadowmap_pars_vertex:Iw,shadowmap_vertex:Uw,shadowmask_pars_fragment:Fw,skinbase_vertex:Ow,skinning_pars_vertex:zw,skinning_vertex:kw,skinnormal_vertex:Bw,specularmap_fragment:Hw,specularmap_pars_fragment:Vw,tonemapping_fragment:Gw,tonemapping_pars_fragment:Ww,transmission_fragment:jw,transmission_pars_fragment:Xw,uv_pars_fragment:Yw,uv_pars_vertex:$w,uv_vertex:qw,worldpos_vertex:Kw,background_vert:Zw,background_frag:Qw,backgroundCube_vert:Jw,backgroundCube_frag:eT,cube_vert:tT,cube_frag:nT,depth_vert:iT,depth_frag:rT,distanceRGBA_vert:sT,distanceRGBA_frag:oT,equirect_vert:aT,equirect_frag:lT,linedashed_vert:cT,linedashed_frag:uT,meshbasic_vert:fT,meshbasic_frag:dT,meshlambert_vert:hT,meshlambert_frag:pT,meshmatcap_vert:mT,meshmatcap_frag:gT,meshnormal_vert:_T,meshnormal_frag:vT,meshphong_vert:xT,meshphong_frag:yT,meshphysical_vert:ST,meshphysical_frag:MT,meshtoon_vert:ET,meshtoon_frag:wT,points_vert:TT,points_frag:AT,shadow_vert:CT,shadow_frag:bT,sprite_vert:RT,sprite_frag:PT},ue={common:{diffuse:{value:new Be(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ke},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ke}},envmap:{envMap:{value:null},envMapRotation:{value:new ke},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ke}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ke}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ke},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ke},normalScale:{value:new De(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ke},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ke}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ke}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ke}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Be(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Be(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0},uvTransform:{value:new ke}},sprite:{diffuse:{value:new Be(16777215)},opacity:{value:1},center:{value:new De(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ke},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0}}},Yn={basic:{uniforms:jt([ue.common,ue.specularmap,ue.envmap,ue.aomap,ue.lightmap,ue.fog]),vertexShader:ze.meshbasic_vert,fragmentShader:ze.meshbasic_frag},lambert:{uniforms:jt([ue.common,ue.specularmap,ue.envmap,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.fog,ue.lights,{emissive:{value:new Be(0)}}]),vertexShader:ze.meshlambert_vert,fragmentShader:ze.meshlambert_frag},phong:{uniforms:jt([ue.common,ue.specularmap,ue.envmap,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.fog,ue.lights,{emissive:{value:new Be(0)},specular:{value:new Be(1118481)},shininess:{value:30}}]),vertexShader:ze.meshphong_vert,fragmentShader:ze.meshphong_frag},standard:{uniforms:jt([ue.common,ue.envmap,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.roughnessmap,ue.metalnessmap,ue.fog,ue.lights,{emissive:{value:new Be(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ze.meshphysical_vert,fragmentShader:ze.meshphysical_frag},toon:{uniforms:jt([ue.common,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.gradientmap,ue.fog,ue.lights,{emissive:{value:new Be(0)}}]),vertexShader:ze.meshtoon_vert,fragmentShader:ze.meshtoon_frag},matcap:{uniforms:jt([ue.common,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.fog,{matcap:{value:null}}]),vertexShader:ze.meshmatcap_vert,fragmentShader:ze.meshmatcap_frag},points:{uniforms:jt([ue.points,ue.fog]),vertexShader:ze.points_vert,fragmentShader:ze.points_frag},dashed:{uniforms:jt([ue.common,ue.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ze.linedashed_vert,fragmentShader:ze.linedashed_frag},depth:{uniforms:jt([ue.common,ue.displacementmap]),vertexShader:ze.depth_vert,fragmentShader:ze.depth_frag},normal:{uniforms:jt([ue.common,ue.bumpmap,ue.normalmap,ue.displacementmap,{opacity:{value:1}}]),vertexShader:ze.meshnormal_vert,fragmentShader:ze.meshnormal_frag},sprite:{uniforms:jt([ue.sprite,ue.fog]),vertexShader:ze.sprite_vert,fragmentShader:ze.sprite_frag},background:{uniforms:{uvTransform:{value:new ke},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ze.background_vert,fragmentShader:ze.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ke}},vertexShader:ze.backgroundCube_vert,fragmentShader:ze.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ze.cube_vert,fragmentShader:ze.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ze.equirect_vert,fragmentShader:ze.equirect_frag},distanceRGBA:{uniforms:jt([ue.common,ue.displacementmap,{referencePosition:{value:new F},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ze.distanceRGBA_vert,fragmentShader:ze.distanceRGBA_frag},shadow:{uniforms:jt([ue.lights,ue.fog,{color:{value:new Be(0)},opacity:{value:1}}]),vertexShader:ze.shadow_vert,fragmentShader:ze.shadow_frag}};Yn.physical={uniforms:jt([Yn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ke},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ke},clearcoatNormalScale:{value:new De(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ke},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ke},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ke},sheen:{value:0},sheenColor:{value:new Be(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ke},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ke},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ke},transmissionSamplerSize:{value:new De},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ke},attenuationDistance:{value:0},attenuationColor:{value:new Be(0)},specularColor:{value:new Be(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ke},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ke},anisotropyVector:{value:new De},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ke}}]),vertexShader:ze.meshphysical_vert,fragmentShader:ze.meshphysical_frag};const Ba={r:0,b:0,g:0},cr=new ei,LT=new pt;function NT(t,e,n,i,r,s,o){const a=new Be(0);let l=s===!0?0:1,c,f,d=null,h=0,p=null;function v(_){let g=_.isScene===!0?_.background:null;return g&&g.isTexture&&(g=(_.backgroundBlurriness>0?n:e).get(g)),g}function x(_){let g=!1;const S=v(_);S===null?u(a,l):S&&S.isColor&&(u(S,1),g=!0);const b=t.xr.getEnvironmentBlendMode();b==="additive"?i.buffers.color.setClear(0,0,0,1,o):b==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(t.autoClear||g)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil))}function m(_,g){const S=v(g);S&&(S.isCubeTexture||S.mapping===dc)?(f===void 0&&(f=new Zn(new ea(1,1,1),new xi({name:"BackgroundCubeMaterial",uniforms:Fs(Yn.backgroundCube.uniforms),vertexShader:Yn.backgroundCube.vertexShader,fragmentShader:Yn.backgroundCube.fragmentShader,side:on,depthTest:!1,depthWrite:!1,fog:!1})),f.geometry.deleteAttribute("normal"),f.geometry.deleteAttribute("uv"),f.onBeforeRender=function(b,A,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(f.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(f)),cr.copy(g.backgroundRotation),cr.x*=-1,cr.y*=-1,cr.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(cr.y*=-1,cr.z*=-1),f.material.uniforms.envMap.value=S,f.material.uniforms.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,f.material.uniforms.backgroundBlurriness.value=g.backgroundBlurriness,f.material.uniforms.backgroundIntensity.value=g.backgroundIntensity,f.material.uniforms.backgroundRotation.value.setFromMatrix4(LT.makeRotationFromEuler(cr)),f.material.toneMapped=Je.getTransfer(S.colorSpace)!==ot,(d!==S||h!==S.version||p!==t.toneMapping)&&(f.material.needsUpdate=!0,d=S,h=S.version,p=t.toneMapping),f.layers.enableAll(),_.unshift(f,f.geometry,f.material,0,0,null)):S&&S.isTexture&&(c===void 0&&(c=new Zn(new ta(2,2),new xi({name:"BackgroundMaterial",uniforms:Fs(Yn.background.uniforms),vertexShader:Yn.background.vertexShader,fragmentShader:Yn.background.fragmentShader,side:Qi,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=S,c.material.uniforms.backgroundIntensity.value=g.backgroundIntensity,c.material.toneMapped=Je.getTransfer(S.colorSpace)!==ot,S.matrixAutoUpdate===!0&&S.updateMatrix(),c.material.uniforms.uvTransform.value.copy(S.matrix),(d!==S||h!==S.version||p!==t.toneMapping)&&(c.material.needsUpdate=!0,d=S,h=S.version,p=t.toneMapping),c.layers.enableAll(),_.unshift(c,c.geometry,c.material,0,0,null))}function u(_,g){_.getRGB(Ba,Jv(t)),i.buffers.color.setClear(Ba.r,Ba.g,Ba.b,g,o)}return{getClearColor:function(){return a},setClearColor:function(_,g=1){a.set(_),l=g,u(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(_){l=_,u(a,l)},render:x,addToRenderList:m}}function DT(t,e){const n=t.getParameter(t.MAX_VERTEX_ATTRIBS),i={},r=h(null);let s=r,o=!1;function a(y,L,H,z,Y){let X=!1;const G=d(z,H,L);s!==G&&(s=G,c(s.object)),X=p(y,z,H,Y),X&&v(y,z,H,Y),Y!==null&&e.update(Y,t.ELEMENT_ARRAY_BUFFER),(X||o)&&(o=!1,S(y,L,H,z),Y!==null&&t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,e.get(Y).buffer))}function l(){return t.createVertexArray()}function c(y){return t.bindVertexArray(y)}function f(y){return t.deleteVertexArray(y)}function d(y,L,H){const z=H.wireframe===!0;let Y=i[y.id];Y===void 0&&(Y={},i[y.id]=Y);let X=Y[L.id];X===void 0&&(X={},Y[L.id]=X);let G=X[z];return G===void 0&&(G=h(l()),X[z]=G),G}function h(y){const L=[],H=[],z=[];for(let Y=0;Y<n;Y++)L[Y]=0,H[Y]=0,z[Y]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:H,attributeDivisors:z,object:y,attributes:{},index:null}}function p(y,L,H,z){const Y=s.attributes,X=L.attributes;let G=0;const q=H.getAttributes();for(const D in q)if(q[D].location>=0){const K=Y[D];let se=X[D];if(se===void 0&&(D==="instanceMatrix"&&y.instanceMatrix&&(se=y.instanceMatrix),D==="instanceColor"&&y.instanceColor&&(se=y.instanceColor)),K===void 0||K.attribute!==se||se&&K.data!==se.data)return!0;G++}return s.attributesNum!==G||s.index!==z}function v(y,L,H,z){const Y={},X=L.attributes;let G=0;const q=H.getAttributes();for(const D in q)if(q[D].location>=0){let K=X[D];K===void 0&&(D==="instanceMatrix"&&y.instanceMatrix&&(K=y.instanceMatrix),D==="instanceColor"&&y.instanceColor&&(K=y.instanceColor));const se={};se.attribute=K,K&&K.data&&(se.data=K.data),Y[D]=se,G++}s.attributes=Y,s.attributesNum=G,s.index=z}function x(){const y=s.newAttributes;for(let L=0,H=y.length;L<H;L++)y[L]=0}function m(y){u(y,0)}function u(y,L){const H=s.newAttributes,z=s.enabledAttributes,Y=s.attributeDivisors;H[y]=1,z[y]===0&&(t.enableVertexAttribArray(y),z[y]=1),Y[y]!==L&&(t.vertexAttribDivisor(y,L),Y[y]=L)}function _(){const y=s.newAttributes,L=s.enabledAttributes;for(let H=0,z=L.length;H<z;H++)L[H]!==y[H]&&(t.disableVertexAttribArray(H),L[H]=0)}function g(y,L,H,z,Y,X,G){G===!0?t.vertexAttribIPointer(y,L,H,Y,X):t.vertexAttribPointer(y,L,H,z,Y,X)}function S(y,L,H,z){x();const Y=z.attributes,X=H.getAttributes(),G=L.defaultAttributeValues;for(const q in X){const D=X[q];if(D.location>=0){let $=Y[q];if($===void 0&&(q==="instanceMatrix"&&y.instanceMatrix&&($=y.instanceMatrix),q==="instanceColor"&&y.instanceColor&&($=y.instanceColor)),$!==void 0){const K=$.normalized,se=$.itemSize,J=e.get($);if(J===void 0)continue;const Ie=J.buffer,j=J.type,ie=J.bytesPerElement,he=j===t.INT||j===t.UNSIGNED_INT||$.gpuType===rh;if($.isInterleavedBufferAttribute){const de=$.data,we=de.stride,Re=$.offset;if(de.isInstancedInterleavedBuffer){for(let Ae=0;Ae<D.locationSize;Ae++)u(D.location+Ae,de.meshPerAttribute);y.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=de.meshPerAttribute*de.count)}else for(let Ae=0;Ae<D.locationSize;Ae++)m(D.location+Ae);t.bindBuffer(t.ARRAY_BUFFER,Ie);for(let Ae=0;Ae<D.locationSize;Ae++)g(D.location+Ae,se/D.locationSize,j,K,we*ie,(Re+se/D.locationSize*Ae)*ie,he)}else{if($.isInstancedBufferAttribute){for(let de=0;de<D.locationSize;de++)u(D.location+de,$.meshPerAttribute);y.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=$.meshPerAttribute*$.count)}else for(let de=0;de<D.locationSize;de++)m(D.location+de);t.bindBuffer(t.ARRAY_BUFFER,Ie);for(let de=0;de<D.locationSize;de++)g(D.location+de,se/D.locationSize,j,K,se*ie,se/D.locationSize*de*ie,he)}}else if(G!==void 0){const K=G[q];if(K!==void 0)switch(K.length){case 2:t.vertexAttrib2fv(D.location,K);break;case 3:t.vertexAttrib3fv(D.location,K);break;case 4:t.vertexAttrib4fv(D.location,K);break;default:t.vertexAttrib1fv(D.location,K)}}}}_()}function b(){C();for(const y in i){const L=i[y];for(const H in L){const z=L[H];for(const Y in z)f(z[Y].object),delete z[Y];delete L[H]}delete i[y]}}function A(y){if(i[y.id]===void 0)return;const L=i[y.id];for(const H in L){const z=L[H];for(const Y in z)f(z[Y].object),delete z[Y];delete L[H]}delete i[y.id]}function T(y){for(const L in i){const H=i[L];if(H[y.id]===void 0)continue;const z=H[y.id];for(const Y in z)f(z[Y].object),delete z[Y];delete H[y.id]}}function C(){E(),o=!0,s!==r&&(s=r,c(s.object))}function E(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:C,resetDefaultState:E,dispose:b,releaseStatesOfGeometry:A,releaseStatesOfProgram:T,initAttributes:x,enableAttribute:m,disableUnusedAttributes:_}}function IT(t,e,n){let i;function r(c){i=c}function s(c,f){t.drawArrays(i,c,f),n.update(f,i,1)}function o(c,f,d){d!==0&&(t.drawArraysInstanced(i,c,f,d),n.update(f,i,d))}function a(c,f,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,f,0,d);let p=0;for(let v=0;v<d;v++)p+=f[v];n.update(p,i,1)}function l(c,f,d,h){if(d===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let v=0;v<c.length;v++)o(c[v],f[v],h[v]);else{p.multiDrawArraysInstancedWEBGL(i,c,0,f,0,h,0,d);let v=0;for(let x=0;x<d;x++)v+=f[x];for(let x=0;x<h.length;x++)n.update(v,i,h[x])}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function UT(t,e,n,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");r=t.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(A){return!(A!==zn&&i.convert(A)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(A){const T=A===Zo&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==vi&&i.convert(A)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==Kn&&!T)}function l(A){if(A==="highp"){if(t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.HIGH_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.MEDIUM_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=n.precision!==void 0?n.precision:"highp";const f=l(c);f!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",f,"instead."),c=f);const d=n.logarithmicDepthBuffer===!0,h=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),p=t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=t.getParameter(t.MAX_TEXTURE_SIZE),x=t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),m=t.getParameter(t.MAX_VERTEX_ATTRIBS),u=t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),_=t.getParameter(t.MAX_VARYING_VECTORS),g=t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS),S=p>0,b=t.getParameter(t.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,maxTextures:h,maxVertexTextures:p,maxTextureSize:v,maxCubemapSize:x,maxAttributes:m,maxVertexUniforms:u,maxVaryings:_,maxFragmentUniforms:g,vertexTextures:S,maxSamples:b}}function FT(t){const e=this;let n=null,i=0,r=!1,s=!1;const o=new Ni,a=new ke,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){const p=d.length!==0||h||i!==0||r;return r=h,i=d.length,p},this.beginShadows=function(){s=!0,f(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,h){n=f(d,h,0)},this.setState=function(d,h,p){const v=d.clippingPlanes,x=d.clipIntersection,m=d.clipShadows,u=t.get(d);if(!r||v===null||v.length===0||s&&!m)s?f(null):c();else{const _=s?0:i,g=_*4;let S=u.clippingState||null;l.value=S,S=f(v,h,g,p);for(let b=0;b!==g;++b)S[b]=n[b];u.clippingState=S,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=_}};function c(){l.value!==n&&(l.value=n,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function f(d,h,p,v){const x=d!==null?d.length:0;let m=null;if(x!==0){if(m=l.value,v!==!0||m===null){const u=p+x*4,_=h.matrixWorldInverse;a.getNormalMatrix(_),(m===null||m.length<u)&&(m=new Float32Array(u));for(let g=0,S=p;g!==x;++g,S+=4)o.copy(d[g]).applyMatrix4(_,a),o.normal.toArray(m,S),m[S+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,m}}function OT(t){let e=new WeakMap;function n(o,a){return a===Cf?o.mapping=Ns:a===bf&&(o.mapping=Ds),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===Cf||a===bf)if(e.has(o)){const l=e.get(o).texture;return n(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new $E(l.height);return c.fromEquirectangularTexture(t,o),e.set(o,c),o.addEventListener("dispose",r),n(c.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}class i0 extends e0{constructor(e=-1,n=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,o=i+e,a=r+n,l=r-n;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,f=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=f*this.view.offsetY,l=a-f*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}const ds=4,vm=[.125,.215,.35,.446,.526,.582],mr=20,mu=new i0,xm=new Be;let gu=null,_u=0,vu=0,xu=!1;const hr=(1+Math.sqrt(5))/2,Qr=1/hr,ym=[new F(-hr,Qr,0),new F(hr,Qr,0),new F(-Qr,0,hr),new F(Qr,0,hr),new F(0,hr,-Qr),new F(0,hr,Qr),new F(-1,1,-1),new F(1,1,-1),new F(-1,1,1),new F(1,1,1)];class Sm{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,n=0,i=.1,r=100){gu=this._renderer.getRenderTarget(),_u=this._renderer.getActiveCubeFace(),vu=this._renderer.getActiveMipmapLevel(),xu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,i,r,s),n>0&&this._blur(s,0,0,n),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=wm(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Em(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(gu,_u,vu),this._renderer.xr.enabled=xu,e.scissorTest=!1,Ha(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===Ns||e.mapping===Ds?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),gu=this._renderer.getRenderTarget(),_u=this._renderer.getActiveCubeFace(),vu=this._renderer.getActiveMipmapLevel(),xu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=n||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:pn,minFilter:pn,generateMipmaps:!1,type:Zo,format:zn,colorSpace:ir,depthBuffer:!1},r=Mm(e,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Mm(e,n,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=zT(s)),this._blurMaterial=kT(s,e,n)}return r}_compileMaterial(e){const n=new Zn(this._lodPlanes[0],e);this._renderer.compile(n,mu)}_sceneToCubeUV(e,n,i,r){const a=new hn(90,1,n,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],f=this._renderer,d=f.autoClear,h=f.toneMapping;f.getClearColor(xm),f.toneMapping=qi,f.autoClear=!1;const p=new Kv({name:"PMREM.Background",side:on,depthWrite:!1,depthTest:!1}),v=new Zn(new ea,p);let x=!1;const m=e.background;m?m.isColor&&(p.color.copy(m),e.background=null,x=!0):(p.color.copy(xm),x=!0);for(let u=0;u<6;u++){const _=u%3;_===0?(a.up.set(0,l[u],0),a.lookAt(c[u],0,0)):_===1?(a.up.set(0,0,l[u]),a.lookAt(0,c[u],0)):(a.up.set(0,l[u],0),a.lookAt(0,0,c[u]));const g=this._cubeSize;Ha(r,_*g,u>2?g:0,g,g),f.setRenderTarget(r),x&&f.render(v,a),f.render(e,a)}v.geometry.dispose(),v.material.dispose(),f.toneMapping=h,f.autoClear=d,e.background=m}_textureToCubeUV(e,n){const i=this._renderer,r=e.mapping===Ns||e.mapping===Ds;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=wm()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Em());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new Zn(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;Ha(n,0,0,3*l,2*l),i.setRenderTarget(n),i.render(o,mu)}_applyPMREM(e){const n=this._renderer,i=n.autoClear;n.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=ym[(r-s-1)%ym.length];this._blur(e,s-1,s,o,a)}n.autoClear=i}_blur(e,n,i,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,n,i,r,"latitudinal",s),this._halfBlur(o,e,i,i,r,"longitudinal",s)}_halfBlur(e,n,i,r,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const f=3,d=new Zn(this._lodPlanes[r],c),h=c.uniforms,p=this._sizeLods[i]-1,v=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*mr-1),x=s/v,m=isFinite(s)?1+Math.floor(f*x):mr;m>mr&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${mr}`);const u=[];let _=0;for(let T=0;T<mr;++T){const C=T/x,E=Math.exp(-C*C/2);u.push(E),T===0?_+=E:T<m&&(_+=2*E)}for(let T=0;T<u.length;T++)u[T]=u[T]/_;h.envMap.value=e.texture,h.samples.value=m,h.weights.value=u,h.latitudinal.value=o==="latitudinal",a&&(h.poleAxis.value=a);const{_lodMax:g}=this;h.dTheta.value=v,h.mipInt.value=g-i;const S=this._sizeLods[r],b=3*S*(r>g-ds?r-g+ds:0),A=4*(this._cubeSize-S);Ha(n,b,A,3*S,2*S),l.setRenderTarget(n),l.render(d,mu)}}function zT(t){const e=[],n=[],i=[];let r=t;const s=t-ds+1+vm.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);n.push(a);let l=1/a;o>t-ds?l=vm[o-t+ds-1]:o===0&&(l=0),i.push(l);const c=1/(a-2),f=-c,d=1+c,h=[f,f,d,f,d,d,f,f,d,d,f,d],p=6,v=6,x=3,m=2,u=1,_=new Float32Array(x*v*p),g=new Float32Array(m*v*p),S=new Float32Array(u*v*p);for(let A=0;A<p;A++){const T=A%3*2/3-1,C=A>2?0:-1,E=[T,C,0,T+2/3,C,0,T+2/3,C+1,0,T,C,0,T+2/3,C+1,0,T,C+1,0];_.set(E,x*v*A),g.set(h,m*v*A);const y=[A,A,A,A,A,A];S.set(y,u*v*A)}const b=new Vn;b.setAttribute("position",new An(_,x)),b.setAttribute("uv",new An(g,m)),b.setAttribute("faceIndex",new An(S,u)),e.push(b),r>ds&&r--}return{lodPlanes:e,sizeLods:n,sigmas:i}}function Mm(t,e,n){const i=new Rr(t,e,n);return i.texture.mapping=dc,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Ha(t,e,n,i,r){t.viewport.set(e,n,i,r),t.scissor.set(e,n,i,r)}function kT(t,e,n){const i=new Float32Array(mr),r=new F(0,1,0);return new xi({name:"SphericalGaussianBlur",defines:{n:mr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:ph(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:$i,depthTest:!1,depthWrite:!1})}function Em(){return new xi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ph(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:$i,depthTest:!1,depthWrite:!1})}function wm(){return new xi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ph(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:$i,depthTest:!1,depthWrite:!1})}function ph(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function BT(t){let e=new WeakMap,n=null;function i(a){if(a&&a.isTexture){const l=a.mapping,c=l===Cf||l===bf,f=l===Ns||l===Ds;if(c||f){let d=e.get(a);const h=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==h)return n===null&&(n=new Sm(t)),d=c?n.fromEquirectangular(a,d):n.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),d.texture;if(d!==void 0)return d.texture;{const p=a.image;return c&&p&&p.height>0||f&&p&&r(p)?(n===null&&(n=new Sm(t)),d=c?n.fromEquirectangular(a):n.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),a.addEventListener("dispose",s),d.texture):null}}}return a}function r(a){let l=0;const c=6;for(let f=0;f<c;f++)a[f]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:o}}function HT(t){const e={};function n(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=t.getExtension("WEBGL_depth_texture")||t.getExtension("MOZ_WEBGL_depth_texture")||t.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=t.getExtension("EXT_texture_filter_anisotropic")||t.getExtension("MOZ_EXT_texture_filter_anisotropic")||t.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=t.getExtension("WEBGL_compressed_texture_s3tc")||t.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=t.getExtension("WEBGL_compressed_texture_pvrtc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=t.getExtension(i)}return e[i]=r,r}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){const r=n(i);return r===null&&wo("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function VT(t,e,n,i){const r={},s=new WeakMap;function o(d){const h=d.target;h.index!==null&&e.remove(h.index);for(const v in h.attributes)e.remove(h.attributes[v]);for(const v in h.morphAttributes){const x=h.morphAttributes[v];for(let m=0,u=x.length;m<u;m++)e.remove(x[m])}h.removeEventListener("dispose",o),delete r[h.id];const p=s.get(h);p&&(e.remove(p),s.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,n.memory.geometries--}function a(d,h){return r[h.id]===!0||(h.addEventListener("dispose",o),r[h.id]=!0,n.memory.geometries++),h}function l(d){const h=d.attributes;for(const v in h)e.update(h[v],t.ARRAY_BUFFER);const p=d.morphAttributes;for(const v in p){const x=p[v];for(let m=0,u=x.length;m<u;m++)e.update(x[m],t.ARRAY_BUFFER)}}function c(d){const h=[],p=d.index,v=d.attributes.position;let x=0;if(p!==null){const _=p.array;x=p.version;for(let g=0,S=_.length;g<S;g+=3){const b=_[g+0],A=_[g+1],T=_[g+2];h.push(b,A,A,T,T,b)}}else if(v!==void 0){const _=v.array;x=v.version;for(let g=0,S=_.length/3-1;g<S;g+=3){const b=g+0,A=g+1,T=g+2;h.push(b,A,A,T,T,b)}}else return;const m=new(jv(h)?Qv:Zv)(h,1);m.version=x;const u=s.get(d);u&&e.remove(u),s.set(d,m)}function f(d){const h=s.get(d);if(h){const p=d.index;p!==null&&h.version<p.version&&c(d)}else c(d);return s.get(d)}return{get:a,update:l,getWireframeAttribute:f}}function GT(t,e,n){let i;function r(h){i=h}let s,o;function a(h){s=h.type,o=h.bytesPerElement}function l(h,p){t.drawElements(i,p,s,h*o),n.update(p,i,1)}function c(h,p,v){v!==0&&(t.drawElementsInstanced(i,p,s,h*o,v),n.update(p,i,v))}function f(h,p,v){if(v===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,s,h,0,v);let m=0;for(let u=0;u<v;u++)m+=p[u];n.update(m,i,1)}function d(h,p,v,x){if(v===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let u=0;u<h.length;u++)c(h[u]/o,p[u],x[u]);else{m.multiDrawElementsInstancedWEBGL(i,p,0,s,h,0,x,0,v);let u=0;for(let _=0;_<v;_++)u+=p[_];for(let _=0;_<x.length;_++)n.update(u,i,x[_])}}this.setMode=r,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=f,this.renderMultiDrawInstances=d}function WT(t){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(n.calls++,o){case t.TRIANGLES:n.triangles+=a*(s/3);break;case t.LINES:n.lines+=a*(s/2);break;case t.LINE_STRIP:n.lines+=a*(s-1);break;case t.LINE_LOOP:n.lines+=a*s;break;case t.POINTS:n.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:r,update:i}}function jT(t,e,n){const i=new WeakMap,r=new at;function s(o,a,l){const c=o.morphTargetInfluences,f=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=f!==void 0?f.length:0;let h=i.get(a);if(h===void 0||h.count!==d){let y=function(){C.dispose(),i.delete(a),a.removeEventListener("dispose",y)};var p=y;h!==void 0&&h.texture.dispose();const v=a.morphAttributes.position!==void 0,x=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,u=a.morphAttributes.position||[],_=a.morphAttributes.normal||[],g=a.morphAttributes.color||[];let S=0;v===!0&&(S=1),x===!0&&(S=2),m===!0&&(S=3);let b=a.attributes.position.count*S,A=1;b>e.maxTextureSize&&(A=Math.ceil(b/e.maxTextureSize),b=e.maxTextureSize);const T=new Float32Array(b*A*4*d),C=new Yv(T,b,A,d);C.type=Kn,C.needsUpdate=!0;const E=S*4;for(let L=0;L<d;L++){const H=u[L],z=_[L],Y=g[L],X=b*A*4*L;for(let G=0;G<H.count;G++){const q=G*E;v===!0&&(r.fromBufferAttribute(H,G),T[X+q+0]=r.x,T[X+q+1]=r.y,T[X+q+2]=r.z,T[X+q+3]=0),x===!0&&(r.fromBufferAttribute(z,G),T[X+q+4]=r.x,T[X+q+5]=r.y,T[X+q+6]=r.z,T[X+q+7]=0),m===!0&&(r.fromBufferAttribute(Y,G),T[X+q+8]=r.x,T[X+q+9]=r.y,T[X+q+10]=r.z,T[X+q+11]=Y.itemSize===4?r.w:1)}}h={count:d,texture:C,size:new De(b,A)},i.set(a,h),a.addEventListener("dispose",y)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(t,"morphTexture",o.morphTexture,n);else{let v=0;for(let m=0;m<c.length;m++)v+=c[m];const x=a.morphTargetsRelative?1:1-v;l.getUniforms().setValue(t,"morphTargetBaseInfluence",x),l.getUniforms().setValue(t,"morphTargetInfluences",c)}l.getUniforms().setValue(t,"morphTargetsTexture",h.texture,n),l.getUniforms().setValue(t,"morphTargetsTextureSize",h.size)}return{update:s}}function XT(t,e,n,i){let r=new WeakMap;function s(l){const c=i.render.frame,f=l.geometry,d=e.get(l,f);if(r.get(d)!==c&&(e.update(d),r.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==c&&(n.update(l.instanceMatrix,t.ARRAY_BUFFER),l.instanceColor!==null&&n.update(l.instanceColor,t.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const h=l.skeleton;r.get(h)!==c&&(h.update(),r.set(h,c))}return d}function o(){r=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),n.remove(c.instanceMatrix),c.instanceColor!==null&&n.remove(c.instanceColor)}return{update:s,dispose:o}}class r0 extends $t{constructor(e,n,i,r,s,o,a,l,c,f=Ss){if(f!==Ss&&f!==Us)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&f===Ss&&(i=br),i===void 0&&f===Us&&(i=Is),super(null,r,s,o,a,l,f,i,c),this.isDepthTexture=!0,this.image={width:e,height:n},this.magFilter=a!==void 0?a:tn,this.minFilter=l!==void 0?l:tn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const n=super.toJSON(e);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}const s0=new $t,Tm=new r0(1,1),o0=new Yv,a0=new NE,l0=new t0,Am=[],Cm=[],bm=new Float32Array(16),Rm=new Float32Array(9),Pm=new Float32Array(4);function js(t,e,n){const i=t[0];if(i<=0||i>0)return t;const r=e*n;let s=Am[r];if(s===void 0&&(s=new Float32Array(r),Am[r]=s),e!==0){i.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=n,t[o].toArray(s,a)}return s}function Ct(t,e){if(t.length!==e.length)return!1;for(let n=0,i=t.length;n<i;n++)if(t[n]!==e[n])return!1;return!0}function bt(t,e){for(let n=0,i=e.length;n<i;n++)t[n]=e[n]}function mc(t,e){let n=Cm[e];n===void 0&&(n=new Int32Array(e),Cm[e]=n);for(let i=0;i!==e;++i)n[i]=t.allocateTextureUnit();return n}function YT(t,e){const n=this.cache;n[0]!==e&&(t.uniform1f(this.addr,e),n[0]=e)}function $T(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Ct(n,e))return;t.uniform2fv(this.addr,e),bt(n,e)}}function qT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(t.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(Ct(n,e))return;t.uniform3fv(this.addr,e),bt(n,e)}}function KT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Ct(n,e))return;t.uniform4fv(this.addr,e),bt(n,e)}}function ZT(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Ct(n,e))return;t.uniformMatrix2fv(this.addr,!1,e),bt(n,e)}else{if(Ct(n,i))return;Pm.set(i),t.uniformMatrix2fv(this.addr,!1,Pm),bt(n,i)}}function QT(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Ct(n,e))return;t.uniformMatrix3fv(this.addr,!1,e),bt(n,e)}else{if(Ct(n,i))return;Rm.set(i),t.uniformMatrix3fv(this.addr,!1,Rm),bt(n,i)}}function JT(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Ct(n,e))return;t.uniformMatrix4fv(this.addr,!1,e),bt(n,e)}else{if(Ct(n,i))return;bm.set(i),t.uniformMatrix4fv(this.addr,!1,bm),bt(n,i)}}function eA(t,e){const n=this.cache;n[0]!==e&&(t.uniform1i(this.addr,e),n[0]=e)}function tA(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Ct(n,e))return;t.uniform2iv(this.addr,e),bt(n,e)}}function nA(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Ct(n,e))return;t.uniform3iv(this.addr,e),bt(n,e)}}function iA(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Ct(n,e))return;t.uniform4iv(this.addr,e),bt(n,e)}}function rA(t,e){const n=this.cache;n[0]!==e&&(t.uniform1ui(this.addr,e),n[0]=e)}function sA(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Ct(n,e))return;t.uniform2uiv(this.addr,e),bt(n,e)}}function oA(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Ct(n,e))return;t.uniform3uiv(this.addr,e),bt(n,e)}}function aA(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Ct(n,e))return;t.uniform4uiv(this.addr,e),bt(n,e)}}function lA(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r);let s;this.type===t.SAMPLER_2D_SHADOW?(Tm.compareFunction=Wv,s=Tm):s=s0,n.setTexture2D(e||s,r)}function cA(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture3D(e||a0,r)}function uA(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTextureCube(e||l0,r)}function fA(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture2DArray(e||o0,r)}function dA(t){switch(t){case 5126:return YT;case 35664:return $T;case 35665:return qT;case 35666:return KT;case 35674:return ZT;case 35675:return QT;case 35676:return JT;case 5124:case 35670:return eA;case 35667:case 35671:return tA;case 35668:case 35672:return nA;case 35669:case 35673:return iA;case 5125:return rA;case 36294:return sA;case 36295:return oA;case 36296:return aA;case 35678:case 36198:case 36298:case 36306:case 35682:return lA;case 35679:case 36299:case 36307:return cA;case 35680:case 36300:case 36308:case 36293:return uA;case 36289:case 36303:case 36311:case 36292:return fA}}function hA(t,e){t.uniform1fv(this.addr,e)}function pA(t,e){const n=js(e,this.size,2);t.uniform2fv(this.addr,n)}function mA(t,e){const n=js(e,this.size,3);t.uniform3fv(this.addr,n)}function gA(t,e){const n=js(e,this.size,4);t.uniform4fv(this.addr,n)}function _A(t,e){const n=js(e,this.size,4);t.uniformMatrix2fv(this.addr,!1,n)}function vA(t,e){const n=js(e,this.size,9);t.uniformMatrix3fv(this.addr,!1,n)}function xA(t,e){const n=js(e,this.size,16);t.uniformMatrix4fv(this.addr,!1,n)}function yA(t,e){t.uniform1iv(this.addr,e)}function SA(t,e){t.uniform2iv(this.addr,e)}function MA(t,e){t.uniform3iv(this.addr,e)}function EA(t,e){t.uniform4iv(this.addr,e)}function wA(t,e){t.uniform1uiv(this.addr,e)}function TA(t,e){t.uniform2uiv(this.addr,e)}function AA(t,e){t.uniform3uiv(this.addr,e)}function CA(t,e){t.uniform4uiv(this.addr,e)}function bA(t,e,n){const i=this.cache,r=e.length,s=mc(n,r);Ct(i,s)||(t.uniform1iv(this.addr,s),bt(i,s));for(let o=0;o!==r;++o)n.setTexture2D(e[o]||s0,s[o])}function RA(t,e,n){const i=this.cache,r=e.length,s=mc(n,r);Ct(i,s)||(t.uniform1iv(this.addr,s),bt(i,s));for(let o=0;o!==r;++o)n.setTexture3D(e[o]||a0,s[o])}function PA(t,e,n){const i=this.cache,r=e.length,s=mc(n,r);Ct(i,s)||(t.uniform1iv(this.addr,s),bt(i,s));for(let o=0;o!==r;++o)n.setTextureCube(e[o]||l0,s[o])}function LA(t,e,n){const i=this.cache,r=e.length,s=mc(n,r);Ct(i,s)||(t.uniform1iv(this.addr,s),bt(i,s));for(let o=0;o!==r;++o)n.setTexture2DArray(e[o]||o0,s[o])}function NA(t){switch(t){case 5126:return hA;case 35664:return pA;case 35665:return mA;case 35666:return gA;case 35674:return _A;case 35675:return vA;case 35676:return xA;case 5124:case 35670:return yA;case 35667:case 35671:return SA;case 35668:case 35672:return MA;case 35669:case 35673:return EA;case 5125:return wA;case 36294:return TA;case 36295:return AA;case 36296:return CA;case 35678:case 36198:case 36298:case 36306:case 35682:return bA;case 35679:case 36299:case 36307:return RA;case 35680:case 36300:case 36308:case 36293:return PA;case 36289:case 36303:case 36311:case 36292:return LA}}class DA{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.setValue=dA(n.type)}}class IA{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=NA(n.type)}}class UA{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,i){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(e,n[a.id],i)}}}const yu=/(\w+)(\])?(\[|\.)?/g;function Lm(t,e){t.seq.push(e),t.map[e.id]=e}function FA(t,e,n){const i=t.name,r=i.length;for(yu.lastIndex=0;;){const s=yu.exec(i),o=yu.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){Lm(n,c===void 0?new DA(a,t,e):new IA(a,t,e));break}else{let d=n.map[a];d===void 0&&(d=new UA(a),Lm(n,d)),n=d}}}class fl{constructor(e,n){this.seq=[],this.map={};const i=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(n,r),o=e.getUniformLocation(n,s.name);FA(s,o,this)}}setValue(e,n,i,r){const s=this.map[n];s!==void 0&&s.setValue(e,i,r)}setOptional(e,n,i){const r=n[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,n,i,r){for(let s=0,o=n.length;s!==o;++s){const a=n[s],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,r)}}static seqWithValue(e,n){const i=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in n&&i.push(o)}return i}}function Nm(t,e,n){const i=t.createShader(e);return t.shaderSource(i,n),t.compileShader(i),i}const OA=37297;let zA=0;function kA(t,e){const n=t.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,n.length);for(let o=r;o<s;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${n[o]}`)}return i.join(`
`)}function BA(t){const e=Je.getPrimaries(Je.workingColorSpace),n=Je.getPrimaries(t);let i;switch(e===n?i="":e===Hl&&n===Bl?i="LinearDisplayP3ToLinearSRGB":e===Bl&&n===Hl&&(i="LinearSRGBToLinearDisplayP3"),t){case ir:case hc:return[i,"LinearTransferOETF"];case Xn:case fh:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",t),[i,"LinearTransferOETF"]}}function Dm(t,e,n){const i=t.getShaderParameter(e,t.COMPILE_STATUS),r=t.getShaderInfoLog(e).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const o=parseInt(s[1]);return n.toUpperCase()+`

`+r+`

`+kA(t.getShaderSource(e),o)}else return r}function HA(t,e){const n=BA(e);return`vec4 ${t}( vec4 value ) { return ${n[0]}( ${n[1]}( value ) ); }`}function VA(t,e){let n;switch(e){case oE:n="Linear";break;case aE:n="Reinhard";break;case lE:n="Cineon";break;case Nv:n="ACESFilmic";break;case uE:n="AgX";break;case fE:n="Neutral";break;case cE:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),n="Linear"}return"vec3 "+t+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const Va=new F;function GA(){Je.getLuminanceCoefficients(Va);const t=Va.x.toFixed(4),e=Va.y.toFixed(4),n=Va.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${t}, ${e}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function WA(t){return[t.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",t.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(po).join(`
`)}function jA(t){const e=[];for(const n in t){const i=t[n];i!==!1&&e.push("#define "+n+" "+i)}return e.join(`
`)}function XA(t,e){const n={},i=t.getProgramParameter(e,t.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=t.getActiveAttrib(e,r),o=s.name;let a=1;s.type===t.FLOAT_MAT2&&(a=2),s.type===t.FLOAT_MAT3&&(a=3),s.type===t.FLOAT_MAT4&&(a=4),n[o]={type:s.type,location:t.getAttribLocation(e,o),locationSize:a}}return n}function po(t){return t!==""}function Im(t,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return t.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Um(t,e){return t.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const YA=/^[ \t]*#include +<([\w\d./]+)>/gm;function rd(t){return t.replace(YA,qA)}const $A=new Map;function qA(t,e){let n=ze[e];if(n===void 0){const i=$A.get(e);if(i!==void 0)n=ze[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return rd(n)}const KA=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Fm(t){return t.replace(KA,ZA)}function ZA(t,e,n,i){let r="";for(let s=parseInt(e);s<parseInt(n);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Om(t){let e=`precision ${t.precision} float;
	precision ${t.precision} int;
	precision ${t.precision} sampler2D;
	precision ${t.precision} samplerCube;
	precision ${t.precision} sampler3D;
	precision ${t.precision} sampler2DArray;
	precision ${t.precision} sampler2DShadow;
	precision ${t.precision} samplerCubeShadow;
	precision ${t.precision} sampler2DArrayShadow;
	precision ${t.precision} isampler2D;
	precision ${t.precision} isampler3D;
	precision ${t.precision} isamplerCube;
	precision ${t.precision} isampler2DArray;
	precision ${t.precision} usampler2D;
	precision ${t.precision} usampler3D;
	precision ${t.precision} usamplerCube;
	precision ${t.precision} usampler2DArray;
	`;return t.precision==="highp"?e+=`
#define HIGH_PRECISION`:t.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:t.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function QA(t){let e="SHADOWMAP_TYPE_BASIC";return t.shadowMapType===Rv?e="SHADOWMAP_TYPE_PCF":t.shadowMapType===Pv?e="SHADOWMAP_TYPE_PCF_SOFT":t.shadowMapType===ai&&(e="SHADOWMAP_TYPE_VSM"),e}function JA(t){let e="ENVMAP_TYPE_CUBE";if(t.envMap)switch(t.envMapMode){case Ns:case Ds:e="ENVMAP_TYPE_CUBE";break;case dc:e="ENVMAP_TYPE_CUBE_UV";break}return e}function eC(t){let e="ENVMAP_MODE_REFLECTION";if(t.envMap)switch(t.envMapMode){case Ds:e="ENVMAP_MODE_REFRACTION";break}return e}function tC(t){let e="ENVMAP_BLENDING_NONE";if(t.envMap)switch(t.combine){case Lv:e="ENVMAP_BLENDING_MULTIPLY";break;case rE:e="ENVMAP_BLENDING_MIX";break;case sE:e="ENVMAP_BLENDING_ADD";break}return e}function nC(t){const e=t.envMapCubeUVHeight;if(e===null)return null;const n=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),7*16)),texelHeight:i,maxMip:n}}function iC(t,e,n,i){const r=t.getContext(),s=n.defines;let o=n.vertexShader,a=n.fragmentShader;const l=QA(n),c=JA(n),f=eC(n),d=tC(n),h=nC(n),p=WA(n),v=jA(s),x=r.createProgram();let m,u,_=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(m=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,v].filter(po).join(`
`),m.length>0&&(m+=`
`),u=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,v].filter(po).join(`
`),u.length>0&&(u+=`
`)):(m=[Om(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,v,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+f:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(po).join(`
`),u=[Om(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,v,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+c:"",n.envMap?"#define "+f:"",n.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor||n.batchingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==qi?"#define TONE_MAPPING":"",n.toneMapping!==qi?ze.tonemapping_pars_fragment:"",n.toneMapping!==qi?VA("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",ze.colorspace_pars_fragment,HA("linearToOutputTexel",n.outputColorSpace),GA(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(po).join(`
`)),o=rd(o),o=Im(o,n),o=Um(o,n),a=rd(a),a=Im(a,n),a=Um(a,n),o=Fm(o),a=Fm(a),n.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,u=["#define varying in",n.glslVersion===Qp?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===Qp?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+u);const g=_+m+o,S=_+u+a,b=Nm(r,r.VERTEX_SHADER,g),A=Nm(r,r.FRAGMENT_SHADER,S);r.attachShader(x,b),r.attachShader(x,A),n.index0AttributeName!==void 0?r.bindAttribLocation(x,0,n.index0AttributeName):n.morphTargets===!0&&r.bindAttribLocation(x,0,"position"),r.linkProgram(x);function T(L){if(t.debug.checkShaderErrors){const H=r.getProgramInfoLog(x).trim(),z=r.getShaderInfoLog(b).trim(),Y=r.getShaderInfoLog(A).trim();let X=!0,G=!0;if(r.getProgramParameter(x,r.LINK_STATUS)===!1)if(X=!1,typeof t.debug.onShaderError=="function")t.debug.onShaderError(r,x,b,A);else{const q=Dm(r,b,"vertex"),D=Dm(r,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(x,r.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+H+`
`+q+`
`+D)}else H!==""?console.warn("THREE.WebGLProgram: Program Info Log:",H):(z===""||Y==="")&&(G=!1);G&&(L.diagnostics={runnable:X,programLog:H,vertexShader:{log:z,prefix:m},fragmentShader:{log:Y,prefix:u}})}r.deleteShader(b),r.deleteShader(A),C=new fl(r,x),E=XA(r,x)}let C;this.getUniforms=function(){return C===void 0&&T(this),C};let E;this.getAttributes=function(){return E===void 0&&T(this),E};let y=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=r.getProgramParameter(x,OA)),y},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(x),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=zA++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=b,this.fragmentShader=A,this}let rC=0;class sC{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const n=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(n),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let i=n.get(e);return i===void 0&&(i=new Set,n.set(e,i)),i}_getShaderStage(e){const n=this.shaderCache;let i=n.get(e);return i===void 0&&(i=new oC(e),n.set(e,i)),i}}class oC{constructor(e){this.id=rC++,this.code=e,this.usedTimes=0}}function aC(t,e,n,i,r,s,o){const a=new $v,l=new sC,c=new Set,f=[],d=r.logarithmicDepthBuffer,h=r.vertexTextures;let p=r.precision;const v={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(E){return c.add(E),E===0?"uv":`uv${E}`}function m(E,y,L,H,z){const Y=H.fog,X=z.geometry,G=E.isMeshStandardMaterial?H.environment:null,q=(E.isMeshStandardMaterial?n:e).get(E.envMap||G),D=q&&q.mapping===dc?q.image.height:null,$=v[E.type];E.precision!==null&&(p=r.getMaxPrecision(E.precision),p!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",p,"instead."));const K=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,se=K!==void 0?K.length:0;let J=0;X.morphAttributes.position!==void 0&&(J=1),X.morphAttributes.normal!==void 0&&(J=2),X.morphAttributes.color!==void 0&&(J=3);let Ie,j,ie,he;if($){const qe=Yn[$];Ie=qe.vertexShader,j=qe.fragmentShader}else Ie=E.vertexShader,j=E.fragmentShader,l.update(E),ie=l.getVertexShaderID(E),he=l.getFragmentShaderID(E);const de=t.getRenderTarget(),we=z.isInstancedMesh===!0,Re=z.isBatchedMesh===!0,Ae=!!E.map,$e=!!E.matcap,N=!!q,nt=!!E.aoMap,Ge=!!E.lightMap,We=!!E.bumpMap,Se=!!E.normalMap,it=!!E.displacementMap,Ce=!!E.emissiveMap,be=!!E.metalnessMap,P=!!E.roughnessMap,M=E.anisotropy>0,k=E.clearcoat>0,ee=E.dispersion>0,ne=E.iridescence>0,te=E.sheen>0,Te=E.transmission>0,fe=M&&!!E.anisotropyMap,_e=k&&!!E.clearcoatMap,Oe=k&&!!E.clearcoatNormalMap,oe=k&&!!E.clearcoatRoughnessMap,ge=ne&&!!E.iridescenceMap,je=ne&&!!E.iridescenceThicknessMap,Ue=te&&!!E.sheenColorMap,ve=te&&!!E.sheenRoughnessMap,Fe=!!E.specularMap,He=!!E.specularColorMap,ut=!!E.specularIntensityMap,I=Te&&!!E.transmissionMap,ae=Te&&!!E.thicknessMap,Z=!!E.gradientMap,Q=!!E.alphaMap,ce=E.alphaTest>0,Pe=!!E.alphaHash,Xe=!!E.extensions;let yt=qi;E.toneMapped&&(de===null||de.isXRRenderTarget===!0)&&(yt=t.toneMapping);const Nt={shaderID:$,shaderType:E.type,shaderName:E.name,vertexShader:Ie,fragmentShader:j,defines:E.defines,customVertexShaderID:ie,customFragmentShaderID:he,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:p,batching:Re,batchingColor:Re&&z._colorsTexture!==null,instancing:we,instancingColor:we&&z.instanceColor!==null,instancingMorph:we&&z.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:de===null?t.outputColorSpace:de.isXRRenderTarget===!0?de.texture.colorSpace:ir,alphaToCoverage:!!E.alphaToCoverage,map:Ae,matcap:$e,envMap:N,envMapMode:N&&q.mapping,envMapCubeUVHeight:D,aoMap:nt,lightMap:Ge,bumpMap:We,normalMap:Se,displacementMap:h&&it,emissiveMap:Ce,normalMapObjectSpace:Se&&E.normalMapType===mE,normalMapTangentSpace:Se&&E.normalMapType===Gv,metalnessMap:be,roughnessMap:P,anisotropy:M,anisotropyMap:fe,clearcoat:k,clearcoatMap:_e,clearcoatNormalMap:Oe,clearcoatRoughnessMap:oe,dispersion:ee,iridescence:ne,iridescenceMap:ge,iridescenceThicknessMap:je,sheen:te,sheenColorMap:Ue,sheenRoughnessMap:ve,specularMap:Fe,specularColorMap:He,specularIntensityMap:ut,transmission:Te,transmissionMap:I,thicknessMap:ae,gradientMap:Z,opaque:E.transparent===!1&&E.blending===ys&&E.alphaToCoverage===!1,alphaMap:Q,alphaTest:ce,alphaHash:Pe,combine:E.combine,mapUv:Ae&&x(E.map.channel),aoMapUv:nt&&x(E.aoMap.channel),lightMapUv:Ge&&x(E.lightMap.channel),bumpMapUv:We&&x(E.bumpMap.channel),normalMapUv:Se&&x(E.normalMap.channel),displacementMapUv:it&&x(E.displacementMap.channel),emissiveMapUv:Ce&&x(E.emissiveMap.channel),metalnessMapUv:be&&x(E.metalnessMap.channel),roughnessMapUv:P&&x(E.roughnessMap.channel),anisotropyMapUv:fe&&x(E.anisotropyMap.channel),clearcoatMapUv:_e&&x(E.clearcoatMap.channel),clearcoatNormalMapUv:Oe&&x(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:oe&&x(E.clearcoatRoughnessMap.channel),iridescenceMapUv:ge&&x(E.iridescenceMap.channel),iridescenceThicknessMapUv:je&&x(E.iridescenceThicknessMap.channel),sheenColorMapUv:Ue&&x(E.sheenColorMap.channel),sheenRoughnessMapUv:ve&&x(E.sheenRoughnessMap.channel),specularMapUv:Fe&&x(E.specularMap.channel),specularColorMapUv:He&&x(E.specularColorMap.channel),specularIntensityMapUv:ut&&x(E.specularIntensityMap.channel),transmissionMapUv:I&&x(E.transmissionMap.channel),thicknessMapUv:ae&&x(E.thicknessMap.channel),alphaMapUv:Q&&x(E.alphaMap.channel),vertexTangents:!!X.attributes.tangent&&(Se||M),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,pointsUvs:z.isPoints===!0&&!!X.attributes.uv&&(Ae||Q),fog:!!Y,useFog:E.fog===!0,fogExp2:!!Y&&Y.isFogExp2,flatShading:E.flatShading===!0,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:d,skinning:z.isSkinnedMesh===!0,morphTargets:X.morphAttributes.position!==void 0,morphNormals:X.morphAttributes.normal!==void 0,morphColors:X.morphAttributes.color!==void 0,morphTargetsCount:se,morphTextureStride:J,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:E.dithering,shadowMapEnabled:t.shadowMap.enabled&&L.length>0,shadowMapType:t.shadowMap.type,toneMapping:yt,decodeVideoTexture:Ae&&E.map.isVideoTexture===!0&&Je.getTransfer(E.map.colorSpace)===ot,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===On,flipSided:E.side===on,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:Xe&&E.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Xe&&E.extensions.multiDraw===!0||Re)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return Nt.vertexUv1s=c.has(1),Nt.vertexUv2s=c.has(2),Nt.vertexUv3s=c.has(3),c.clear(),Nt}function u(E){const y=[];if(E.shaderID?y.push(E.shaderID):(y.push(E.customVertexShaderID),y.push(E.customFragmentShaderID)),E.defines!==void 0)for(const L in E.defines)y.push(L),y.push(E.defines[L]);return E.isRawShaderMaterial===!1&&(_(y,E),g(y,E),y.push(t.outputColorSpace)),y.push(E.customProgramCacheKey),y.join()}function _(E,y){E.push(y.precision),E.push(y.outputColorSpace),E.push(y.envMapMode),E.push(y.envMapCubeUVHeight),E.push(y.mapUv),E.push(y.alphaMapUv),E.push(y.lightMapUv),E.push(y.aoMapUv),E.push(y.bumpMapUv),E.push(y.normalMapUv),E.push(y.displacementMapUv),E.push(y.emissiveMapUv),E.push(y.metalnessMapUv),E.push(y.roughnessMapUv),E.push(y.anisotropyMapUv),E.push(y.clearcoatMapUv),E.push(y.clearcoatNormalMapUv),E.push(y.clearcoatRoughnessMapUv),E.push(y.iridescenceMapUv),E.push(y.iridescenceThicknessMapUv),E.push(y.sheenColorMapUv),E.push(y.sheenRoughnessMapUv),E.push(y.specularMapUv),E.push(y.specularColorMapUv),E.push(y.specularIntensityMapUv),E.push(y.transmissionMapUv),E.push(y.thicknessMapUv),E.push(y.combine),E.push(y.fogExp2),E.push(y.sizeAttenuation),E.push(y.morphTargetsCount),E.push(y.morphAttributeCount),E.push(y.numDirLights),E.push(y.numPointLights),E.push(y.numSpotLights),E.push(y.numSpotLightMaps),E.push(y.numHemiLights),E.push(y.numRectAreaLights),E.push(y.numDirLightShadows),E.push(y.numPointLightShadows),E.push(y.numSpotLightShadows),E.push(y.numSpotLightShadowsWithMaps),E.push(y.numLightProbes),E.push(y.shadowMapType),E.push(y.toneMapping),E.push(y.numClippingPlanes),E.push(y.numClipIntersection),E.push(y.depthPacking)}function g(E,y){a.disableAll(),y.supportsVertexTextures&&a.enable(0),y.instancing&&a.enable(1),y.instancingColor&&a.enable(2),y.instancingMorph&&a.enable(3),y.matcap&&a.enable(4),y.envMap&&a.enable(5),y.normalMapObjectSpace&&a.enable(6),y.normalMapTangentSpace&&a.enable(7),y.clearcoat&&a.enable(8),y.iridescence&&a.enable(9),y.alphaTest&&a.enable(10),y.vertexColors&&a.enable(11),y.vertexAlphas&&a.enable(12),y.vertexUv1s&&a.enable(13),y.vertexUv2s&&a.enable(14),y.vertexUv3s&&a.enable(15),y.vertexTangents&&a.enable(16),y.anisotropy&&a.enable(17),y.alphaHash&&a.enable(18),y.batching&&a.enable(19),y.dispersion&&a.enable(20),y.batchingColor&&a.enable(21),E.push(a.mask),a.disableAll(),y.fog&&a.enable(0),y.useFog&&a.enable(1),y.flatShading&&a.enable(2),y.logarithmicDepthBuffer&&a.enable(3),y.skinning&&a.enable(4),y.morphTargets&&a.enable(5),y.morphNormals&&a.enable(6),y.morphColors&&a.enable(7),y.premultipliedAlpha&&a.enable(8),y.shadowMapEnabled&&a.enable(9),y.doubleSided&&a.enable(10),y.flipSided&&a.enable(11),y.useDepthPacking&&a.enable(12),y.dithering&&a.enable(13),y.transmission&&a.enable(14),y.sheen&&a.enable(15),y.opaque&&a.enable(16),y.pointsUvs&&a.enable(17),y.decodeVideoTexture&&a.enable(18),y.alphaToCoverage&&a.enable(19),E.push(a.mask)}function S(E){const y=v[E.type];let L;if(y){const H=Yn[y];L=WE.clone(H.uniforms)}else L=E.uniforms;return L}function b(E,y){let L;for(let H=0,z=f.length;H<z;H++){const Y=f[H];if(Y.cacheKey===y){L=Y,++L.usedTimes;break}}return L===void 0&&(L=new iC(t,y,E,s),f.push(L)),L}function A(E){if(--E.usedTimes===0){const y=f.indexOf(E);f[y]=f[f.length-1],f.pop(),E.destroy()}}function T(E){l.remove(E)}function C(){l.dispose()}return{getParameters:m,getProgramCacheKey:u,getUniforms:S,acquireProgram:b,releaseProgram:A,releaseShaderCache:T,programs:f,dispose:C}}function lC(){let t=new WeakMap;function e(o){return t.has(o)}function n(o){let a=t.get(o);return a===void 0&&(a={},t.set(o,a)),a}function i(o){t.delete(o)}function r(o,a,l){t.get(o)[a]=l}function s(){t=new WeakMap}return{has:e,get:n,remove:i,update:r,dispose:s}}function cC(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.material.id!==e.material.id?t.material.id-e.material.id:t.z!==e.z?t.z-e.z:t.id-e.id}function zm(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.z!==e.z?e.z-t.z:t.id-e.id}function km(){const t=[];let e=0;const n=[],i=[],r=[];function s(){e=0,n.length=0,i.length=0,r.length=0}function o(d,h,p,v,x,m){let u=t[e];return u===void 0?(u={id:d.id,object:d,geometry:h,material:p,groupOrder:v,renderOrder:d.renderOrder,z:x,group:m},t[e]=u):(u.id=d.id,u.object=d,u.geometry=h,u.material=p,u.groupOrder=v,u.renderOrder=d.renderOrder,u.z=x,u.group=m),e++,u}function a(d,h,p,v,x,m){const u=o(d,h,p,v,x,m);p.transmission>0?i.push(u):p.transparent===!0?r.push(u):n.push(u)}function l(d,h,p,v,x,m){const u=o(d,h,p,v,x,m);p.transmission>0?i.unshift(u):p.transparent===!0?r.unshift(u):n.unshift(u)}function c(d,h){n.length>1&&n.sort(d||cC),i.length>1&&i.sort(h||zm),r.length>1&&r.sort(h||zm)}function f(){for(let d=e,h=t.length;d<h;d++){const p=t[d];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:n,transmissive:i,transparent:r,init:s,push:a,unshift:l,finish:f,sort:c}}function uC(){let t=new WeakMap;function e(i,r){const s=t.get(i);let o;return s===void 0?(o=new km,t.set(i,[o])):r>=s.length?(o=new km,s.push(o)):o=s[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}function fC(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new F,color:new Be};break;case"SpotLight":n={position:new F,direction:new F,color:new Be,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new F,color:new Be,distance:0,decay:0};break;case"HemisphereLight":n={direction:new F,skyColor:new Be,groundColor:new Be};break;case"RectAreaLight":n={color:new Be,position:new F,halfWidth:new F,halfHeight:new F};break}return t[e.id]=n,n}}}function dC(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new De};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new De};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new De,shadowCameraNear:1,shadowCameraFar:1e3};break}return t[e.id]=n,n}}}let hC=0;function pC(t,e){return(e.castShadow?2:0)-(t.castShadow?2:0)+(e.map?1:0)-(t.map?1:0)}function mC(t){const e=new fC,n=dC(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new F);const r=new F,s=new pt,o=new pt;function a(c){let f=0,d=0,h=0;for(let E=0;E<9;E++)i.probe[E].set(0,0,0);let p=0,v=0,x=0,m=0,u=0,_=0,g=0,S=0,b=0,A=0,T=0;c.sort(pC);for(let E=0,y=c.length;E<y;E++){const L=c[E],H=L.color,z=L.intensity,Y=L.distance,X=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)f+=H.r*z,d+=H.g*z,h+=H.b*z;else if(L.isLightProbe){for(let G=0;G<9;G++)i.probe[G].addScaledVector(L.sh.coefficients[G],z);T++}else if(L.isDirectionalLight){const G=e.get(L);if(G.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const q=L.shadow,D=n.get(L);D.shadowIntensity=q.intensity,D.shadowBias=q.bias,D.shadowNormalBias=q.normalBias,D.shadowRadius=q.radius,D.shadowMapSize=q.mapSize,i.directionalShadow[p]=D,i.directionalShadowMap[p]=X,i.directionalShadowMatrix[p]=L.shadow.matrix,_++}i.directional[p]=G,p++}else if(L.isSpotLight){const G=e.get(L);G.position.setFromMatrixPosition(L.matrixWorld),G.color.copy(H).multiplyScalar(z),G.distance=Y,G.coneCos=Math.cos(L.angle),G.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),G.decay=L.decay,i.spot[x]=G;const q=L.shadow;if(L.map&&(i.spotLightMap[b]=L.map,b++,q.updateMatrices(L),L.castShadow&&A++),i.spotLightMatrix[x]=q.matrix,L.castShadow){const D=n.get(L);D.shadowIntensity=q.intensity,D.shadowBias=q.bias,D.shadowNormalBias=q.normalBias,D.shadowRadius=q.radius,D.shadowMapSize=q.mapSize,i.spotShadow[x]=D,i.spotShadowMap[x]=X,S++}x++}else if(L.isRectAreaLight){const G=e.get(L);G.color.copy(H).multiplyScalar(z),G.halfWidth.set(L.width*.5,0,0),G.halfHeight.set(0,L.height*.5,0),i.rectArea[m]=G,m++}else if(L.isPointLight){const G=e.get(L);if(G.color.copy(L.color).multiplyScalar(L.intensity),G.distance=L.distance,G.decay=L.decay,L.castShadow){const q=L.shadow,D=n.get(L);D.shadowIntensity=q.intensity,D.shadowBias=q.bias,D.shadowNormalBias=q.normalBias,D.shadowRadius=q.radius,D.shadowMapSize=q.mapSize,D.shadowCameraNear=q.camera.near,D.shadowCameraFar=q.camera.far,i.pointShadow[v]=D,i.pointShadowMap[v]=X,i.pointShadowMatrix[v]=L.shadow.matrix,g++}i.point[v]=G,v++}else if(L.isHemisphereLight){const G=e.get(L);G.skyColor.copy(L.color).multiplyScalar(z),G.groundColor.copy(L.groundColor).multiplyScalar(z),i.hemi[u]=G,u++}}m>0&&(t.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ue.LTC_FLOAT_1,i.rectAreaLTC2=ue.LTC_FLOAT_2):(i.rectAreaLTC1=ue.LTC_HALF_1,i.rectAreaLTC2=ue.LTC_HALF_2)),i.ambient[0]=f,i.ambient[1]=d,i.ambient[2]=h;const C=i.hash;(C.directionalLength!==p||C.pointLength!==v||C.spotLength!==x||C.rectAreaLength!==m||C.hemiLength!==u||C.numDirectionalShadows!==_||C.numPointShadows!==g||C.numSpotShadows!==S||C.numSpotMaps!==b||C.numLightProbes!==T)&&(i.directional.length=p,i.spot.length=x,i.rectArea.length=m,i.point.length=v,i.hemi.length=u,i.directionalShadow.length=_,i.directionalShadowMap.length=_,i.pointShadow.length=g,i.pointShadowMap.length=g,i.spotShadow.length=S,i.spotShadowMap.length=S,i.directionalShadowMatrix.length=_,i.pointShadowMatrix.length=g,i.spotLightMatrix.length=S+b-A,i.spotLightMap.length=b,i.numSpotLightShadowsWithMaps=A,i.numLightProbes=T,C.directionalLength=p,C.pointLength=v,C.spotLength=x,C.rectAreaLength=m,C.hemiLength=u,C.numDirectionalShadows=_,C.numPointShadows=g,C.numSpotShadows=S,C.numSpotMaps=b,C.numLightProbes=T,i.version=hC++)}function l(c,f){let d=0,h=0,p=0,v=0,x=0;const m=f.matrixWorldInverse;for(let u=0,_=c.length;u<_;u++){const g=c[u];if(g.isDirectionalLight){const S=i.directional[d];S.direction.setFromMatrixPosition(g.matrixWorld),r.setFromMatrixPosition(g.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(m),d++}else if(g.isSpotLight){const S=i.spot[p];S.position.setFromMatrixPosition(g.matrixWorld),S.position.applyMatrix4(m),S.direction.setFromMatrixPosition(g.matrixWorld),r.setFromMatrixPosition(g.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(m),p++}else if(g.isRectAreaLight){const S=i.rectArea[v];S.position.setFromMatrixPosition(g.matrixWorld),S.position.applyMatrix4(m),o.identity(),s.copy(g.matrixWorld),s.premultiply(m),o.extractRotation(s),S.halfWidth.set(g.width*.5,0,0),S.halfHeight.set(0,g.height*.5,0),S.halfWidth.applyMatrix4(o),S.halfHeight.applyMatrix4(o),v++}else if(g.isPointLight){const S=i.point[h];S.position.setFromMatrixPosition(g.matrixWorld),S.position.applyMatrix4(m),h++}else if(g.isHemisphereLight){const S=i.hemi[x];S.direction.setFromMatrixPosition(g.matrixWorld),S.direction.transformDirection(m),x++}}}return{setup:a,setupView:l,state:i}}function Bm(t){const e=new mC(t),n=[],i=[];function r(f){c.camera=f,n.length=0,i.length=0}function s(f){n.push(f)}function o(f){i.push(f)}function a(){e.setup(n)}function l(f){e.setupView(n,f)}const c={lightsArray:n,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function gC(t){let e=new WeakMap;function n(r,s=0){const o=e.get(r);let a;return o===void 0?(a=new Bm(t),e.set(r,[a])):s>=o.length?(a=new Bm(t),o.push(a)):a=o[s],a}function i(){e=new WeakMap}return{get:n,dispose:i}}class _C extends Ws{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=hE,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class vC extends Ws{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const xC=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,yC=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function SC(t,e,n){let i=new hh;const r=new De,s=new De,o=new at,a=new _C({depthPacking:pE}),l=new vC,c={},f=n.maxTextureSize,d={[Qi]:on,[on]:Qi,[On]:On},h=new xi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new De},radius:{value:4}},vertexShader:xC,fragmentShader:yC}),p=h.clone();p.defines.HORIZONTAL_PASS=1;const v=new Vn;v.setAttribute("position",new An(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new Zn(v,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Rv;let u=this.type;this.render=function(A,T,C){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;const E=t.getRenderTarget(),y=t.getActiveCubeFace(),L=t.getActiveMipmapLevel(),H=t.state;H.setBlending($i),H.buffers.color.setClear(1,1,1,1),H.buffers.depth.setTest(!0),H.setScissorTest(!1);const z=u!==ai&&this.type===ai,Y=u===ai&&this.type!==ai;for(let X=0,G=A.length;X<G;X++){const q=A[X],D=q.shadow;if(D===void 0){console.warn("THREE.WebGLShadowMap:",q,"has no shadow.");continue}if(D.autoUpdate===!1&&D.needsUpdate===!1)continue;r.copy(D.mapSize);const $=D.getFrameExtents();if(r.multiply($),s.copy(D.mapSize),(r.x>f||r.y>f)&&(r.x>f&&(s.x=Math.floor(f/$.x),r.x=s.x*$.x,D.mapSize.x=s.x),r.y>f&&(s.y=Math.floor(f/$.y),r.y=s.y*$.y,D.mapSize.y=s.y)),D.map===null||z===!0||Y===!0){const se=this.type!==ai?{minFilter:tn,magFilter:tn}:{};D.map!==null&&D.map.dispose(),D.map=new Rr(r.x,r.y,se),D.map.texture.name=q.name+".shadowMap",D.camera.updateProjectionMatrix()}t.setRenderTarget(D.map),t.clear();const K=D.getViewportCount();for(let se=0;se<K;se++){const J=D.getViewport(se);o.set(s.x*J.x,s.y*J.y,s.x*J.z,s.y*J.w),H.viewport(o),D.updateMatrices(q,se),i=D.getFrustum(),S(T,C,D.camera,q,this.type)}D.isPointLightShadow!==!0&&this.type===ai&&_(D,C),D.needsUpdate=!1}u=this.type,m.needsUpdate=!1,t.setRenderTarget(E,y,L)};function _(A,T){const C=e.update(x);h.defines.VSM_SAMPLES!==A.blurSamples&&(h.defines.VSM_SAMPLES=A.blurSamples,p.defines.VSM_SAMPLES=A.blurSamples,h.needsUpdate=!0,p.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new Rr(r.x,r.y)),h.uniforms.shadow_pass.value=A.map.texture,h.uniforms.resolution.value=A.mapSize,h.uniforms.radius.value=A.radius,t.setRenderTarget(A.mapPass),t.clear(),t.renderBufferDirect(T,null,C,h,x,null),p.uniforms.shadow_pass.value=A.mapPass.texture,p.uniforms.resolution.value=A.mapSize,p.uniforms.radius.value=A.radius,t.setRenderTarget(A.map),t.clear(),t.renderBufferDirect(T,null,C,p,x,null)}function g(A,T,C,E){let y=null;const L=C.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(L!==void 0)y=L;else if(y=C.isPointLight===!0?l:a,t.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0){const H=y.uuid,z=T.uuid;let Y=c[H];Y===void 0&&(Y={},c[H]=Y);let X=Y[z];X===void 0&&(X=y.clone(),Y[z]=X,T.addEventListener("dispose",b)),y=X}if(y.visible=T.visible,y.wireframe=T.wireframe,E===ai?y.side=T.shadowSide!==null?T.shadowSide:T.side:y.side=T.shadowSide!==null?T.shadowSide:d[T.side],y.alphaMap=T.alphaMap,y.alphaTest=T.alphaTest,y.map=T.map,y.clipShadows=T.clipShadows,y.clippingPlanes=T.clippingPlanes,y.clipIntersection=T.clipIntersection,y.displacementMap=T.displacementMap,y.displacementScale=T.displacementScale,y.displacementBias=T.displacementBias,y.wireframeLinewidth=T.wireframeLinewidth,y.linewidth=T.linewidth,C.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const H=t.properties.get(y);H.light=C}return y}function S(A,T,C,E,y){if(A.visible===!1)return;if(A.layers.test(T.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&y===ai)&&(!A.frustumCulled||i.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse,A.matrixWorld);const z=e.update(A),Y=A.material;if(Array.isArray(Y)){const X=z.groups;for(let G=0,q=X.length;G<q;G++){const D=X[G],$=Y[D.materialIndex];if($&&$.visible){const K=g(A,$,E,y);A.onBeforeShadow(t,A,T,C,z,K,D),t.renderBufferDirect(C,null,z,K,A,D),A.onAfterShadow(t,A,T,C,z,K,D)}}}else if(Y.visible){const X=g(A,Y,E,y);A.onBeforeShadow(t,A,T,C,z,X,null),t.renderBufferDirect(C,null,z,X,A,null),A.onAfterShadow(t,A,T,C,z,X,null)}}const H=A.children;for(let z=0,Y=H.length;z<Y;z++)S(H[z],T,C,E,y)}function b(A){A.target.removeEventListener("dispose",b);for(const C in c){const E=c[C],y=A.target.uuid;y in E&&(E[y].dispose(),delete E[y])}}}function MC(t){function e(){let I=!1;const ae=new at;let Z=null;const Q=new at(0,0,0,0);return{setMask:function(ce){Z!==ce&&!I&&(t.colorMask(ce,ce,ce,ce),Z=ce)},setLocked:function(ce){I=ce},setClear:function(ce,Pe,Xe,yt,Nt){Nt===!0&&(ce*=yt,Pe*=yt,Xe*=yt),ae.set(ce,Pe,Xe,yt),Q.equals(ae)===!1&&(t.clearColor(ce,Pe,Xe,yt),Q.copy(ae))},reset:function(){I=!1,Z=null,Q.set(-1,0,0,0)}}}function n(){let I=!1,ae=null,Z=null,Q=null;return{setTest:function(ce){ce?he(t.DEPTH_TEST):de(t.DEPTH_TEST)},setMask:function(ce){ae!==ce&&!I&&(t.depthMask(ce),ae=ce)},setFunc:function(ce){if(Z!==ce){switch(ce){case ZM:t.depthFunc(t.NEVER);break;case QM:t.depthFunc(t.ALWAYS);break;case JM:t.depthFunc(t.LESS);break;case zl:t.depthFunc(t.LEQUAL);break;case eE:t.depthFunc(t.EQUAL);break;case tE:t.depthFunc(t.GEQUAL);break;case nE:t.depthFunc(t.GREATER);break;case iE:t.depthFunc(t.NOTEQUAL);break;default:t.depthFunc(t.LEQUAL)}Z=ce}},setLocked:function(ce){I=ce},setClear:function(ce){Q!==ce&&(t.clearDepth(ce),Q=ce)},reset:function(){I=!1,ae=null,Z=null,Q=null}}}function i(){let I=!1,ae=null,Z=null,Q=null,ce=null,Pe=null,Xe=null,yt=null,Nt=null;return{setTest:function(qe){I||(qe?he(t.STENCIL_TEST):de(t.STENCIL_TEST))},setMask:function(qe){ae!==qe&&!I&&(t.stencilMask(qe),ae=qe)},setFunc:function(qe,ti,Gn){(Z!==qe||Q!==ti||ce!==Gn)&&(t.stencilFunc(qe,ti,Gn),Z=qe,Q=ti,ce=Gn)},setOp:function(qe,ti,Gn){(Pe!==qe||Xe!==ti||yt!==Gn)&&(t.stencilOp(qe,ti,Gn),Pe=qe,Xe=ti,yt=Gn)},setLocked:function(qe){I=qe},setClear:function(qe){Nt!==qe&&(t.clearStencil(qe),Nt=qe)},reset:function(){I=!1,ae=null,Z=null,Q=null,ce=null,Pe=null,Xe=null,yt=null,Nt=null}}}const r=new e,s=new n,o=new i,a=new WeakMap,l=new WeakMap;let c={},f={},d=new WeakMap,h=[],p=null,v=!1,x=null,m=null,u=null,_=null,g=null,S=null,b=null,A=new Be(0,0,0),T=0,C=!1,E=null,y=null,L=null,H=null,z=null;const Y=t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,G=0;const q=t.getParameter(t.VERSION);q.indexOf("WebGL")!==-1?(G=parseFloat(/^WebGL (\d)/.exec(q)[1]),X=G>=1):q.indexOf("OpenGL ES")!==-1&&(G=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),X=G>=2);let D=null,$={};const K=t.getParameter(t.SCISSOR_BOX),se=t.getParameter(t.VIEWPORT),J=new at().fromArray(K),Ie=new at().fromArray(se);function j(I,ae,Z,Q){const ce=new Uint8Array(4),Pe=t.createTexture();t.bindTexture(I,Pe),t.texParameteri(I,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(I,t.TEXTURE_MAG_FILTER,t.NEAREST);for(let Xe=0;Xe<Z;Xe++)I===t.TEXTURE_3D||I===t.TEXTURE_2D_ARRAY?t.texImage3D(ae,0,t.RGBA,1,1,Q,0,t.RGBA,t.UNSIGNED_BYTE,ce):t.texImage2D(ae+Xe,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,ce);return Pe}const ie={};ie[t.TEXTURE_2D]=j(t.TEXTURE_2D,t.TEXTURE_2D,1),ie[t.TEXTURE_CUBE_MAP]=j(t.TEXTURE_CUBE_MAP,t.TEXTURE_CUBE_MAP_POSITIVE_X,6),ie[t.TEXTURE_2D_ARRAY]=j(t.TEXTURE_2D_ARRAY,t.TEXTURE_2D_ARRAY,1,1),ie[t.TEXTURE_3D]=j(t.TEXTURE_3D,t.TEXTURE_3D,1,1),r.setClear(0,0,0,1),s.setClear(1),o.setClear(0),he(t.DEPTH_TEST),s.setFunc(zl),We(!1),Se(Xp),he(t.CULL_FACE),nt($i);function he(I){c[I]!==!0&&(t.enable(I),c[I]=!0)}function de(I){c[I]!==!1&&(t.disable(I),c[I]=!1)}function we(I,ae){return f[I]!==ae?(t.bindFramebuffer(I,ae),f[I]=ae,I===t.DRAW_FRAMEBUFFER&&(f[t.FRAMEBUFFER]=ae),I===t.FRAMEBUFFER&&(f[t.DRAW_FRAMEBUFFER]=ae),!0):!1}function Re(I,ae){let Z=h,Q=!1;if(I){Z=d.get(ae),Z===void 0&&(Z=[],d.set(ae,Z));const ce=I.textures;if(Z.length!==ce.length||Z[0]!==t.COLOR_ATTACHMENT0){for(let Pe=0,Xe=ce.length;Pe<Xe;Pe++)Z[Pe]=t.COLOR_ATTACHMENT0+Pe;Z.length=ce.length,Q=!0}}else Z[0]!==t.BACK&&(Z[0]=t.BACK,Q=!0);Q&&t.drawBuffers(Z)}function Ae(I){return p!==I?(t.useProgram(I),p=I,!0):!1}const $e={[pr]:t.FUNC_ADD,[IM]:t.FUNC_SUBTRACT,[UM]:t.FUNC_REVERSE_SUBTRACT};$e[FM]=t.MIN,$e[OM]=t.MAX;const N={[zM]:t.ZERO,[kM]:t.ONE,[BM]:t.SRC_COLOR,[Tf]:t.SRC_ALPHA,[XM]:t.SRC_ALPHA_SATURATE,[WM]:t.DST_COLOR,[VM]:t.DST_ALPHA,[HM]:t.ONE_MINUS_SRC_COLOR,[Af]:t.ONE_MINUS_SRC_ALPHA,[jM]:t.ONE_MINUS_DST_COLOR,[GM]:t.ONE_MINUS_DST_ALPHA,[YM]:t.CONSTANT_COLOR,[$M]:t.ONE_MINUS_CONSTANT_COLOR,[qM]:t.CONSTANT_ALPHA,[KM]:t.ONE_MINUS_CONSTANT_ALPHA};function nt(I,ae,Z,Q,ce,Pe,Xe,yt,Nt,qe){if(I===$i){v===!0&&(de(t.BLEND),v=!1);return}if(v===!1&&(he(t.BLEND),v=!0),I!==DM){if(I!==x||qe!==C){if((m!==pr||g!==pr)&&(t.blendEquation(t.FUNC_ADD),m=pr,g=pr),qe)switch(I){case ys:t.blendFuncSeparate(t.ONE,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case Yp:t.blendFunc(t.ONE,t.ONE);break;case $p:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case qp:t.blendFuncSeparate(t.ZERO,t.SRC_COLOR,t.ZERO,t.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}else switch(I){case ys:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case Yp:t.blendFunc(t.SRC_ALPHA,t.ONE);break;case $p:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case qp:t.blendFunc(t.ZERO,t.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}u=null,_=null,S=null,b=null,A.set(0,0,0),T=0,x=I,C=qe}return}ce=ce||ae,Pe=Pe||Z,Xe=Xe||Q,(ae!==m||ce!==g)&&(t.blendEquationSeparate($e[ae],$e[ce]),m=ae,g=ce),(Z!==u||Q!==_||Pe!==S||Xe!==b)&&(t.blendFuncSeparate(N[Z],N[Q],N[Pe],N[Xe]),u=Z,_=Q,S=Pe,b=Xe),(yt.equals(A)===!1||Nt!==T)&&(t.blendColor(yt.r,yt.g,yt.b,Nt),A.copy(yt),T=Nt),x=I,C=!1}function Ge(I,ae){I.side===On?de(t.CULL_FACE):he(t.CULL_FACE);let Z=I.side===on;ae&&(Z=!Z),We(Z),I.blending===ys&&I.transparent===!1?nt($i):nt(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),s.setFunc(I.depthFunc),s.setTest(I.depthTest),s.setMask(I.depthWrite),r.setMask(I.colorWrite);const Q=I.stencilWrite;o.setTest(Q),Q&&(o.setMask(I.stencilWriteMask),o.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),o.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),Ce(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?he(t.SAMPLE_ALPHA_TO_COVERAGE):de(t.SAMPLE_ALPHA_TO_COVERAGE)}function We(I){E!==I&&(I?t.frontFace(t.CW):t.frontFace(t.CCW),E=I)}function Se(I){I!==LM?(he(t.CULL_FACE),I!==y&&(I===Xp?t.cullFace(t.BACK):I===NM?t.cullFace(t.FRONT):t.cullFace(t.FRONT_AND_BACK))):de(t.CULL_FACE),y=I}function it(I){I!==L&&(X&&t.lineWidth(I),L=I)}function Ce(I,ae,Z){I?(he(t.POLYGON_OFFSET_FILL),(H!==ae||z!==Z)&&(t.polygonOffset(ae,Z),H=ae,z=Z)):de(t.POLYGON_OFFSET_FILL)}function be(I){I?he(t.SCISSOR_TEST):de(t.SCISSOR_TEST)}function P(I){I===void 0&&(I=t.TEXTURE0+Y-1),D!==I&&(t.activeTexture(I),D=I)}function M(I,ae,Z){Z===void 0&&(D===null?Z=t.TEXTURE0+Y-1:Z=D);let Q=$[Z];Q===void 0&&(Q={type:void 0,texture:void 0},$[Z]=Q),(Q.type!==I||Q.texture!==ae)&&(D!==Z&&(t.activeTexture(Z),D=Z),t.bindTexture(I,ae||ie[I]),Q.type=I,Q.texture=ae)}function k(){const I=$[D];I!==void 0&&I.type!==void 0&&(t.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function ee(){try{t.compressedTexImage2D.apply(t,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ne(){try{t.compressedTexImage3D.apply(t,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function te(){try{t.texSubImage2D.apply(t,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Te(){try{t.texSubImage3D.apply(t,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function fe(){try{t.compressedTexSubImage2D.apply(t,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function _e(){try{t.compressedTexSubImage3D.apply(t,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Oe(){try{t.texStorage2D.apply(t,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function oe(){try{t.texStorage3D.apply(t,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ge(){try{t.texImage2D.apply(t,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function je(){try{t.texImage3D.apply(t,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Ue(I){J.equals(I)===!1&&(t.scissor(I.x,I.y,I.z,I.w),J.copy(I))}function ve(I){Ie.equals(I)===!1&&(t.viewport(I.x,I.y,I.z,I.w),Ie.copy(I))}function Fe(I,ae){let Z=l.get(ae);Z===void 0&&(Z=new WeakMap,l.set(ae,Z));let Q=Z.get(I);Q===void 0&&(Q=t.getUniformBlockIndex(ae,I.name),Z.set(I,Q))}function He(I,ae){const Q=l.get(ae).get(I);a.get(ae)!==Q&&(t.uniformBlockBinding(ae,Q,I.__bindingPointIndex),a.set(ae,Q))}function ut(){t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ZERO),t.blendFuncSeparate(t.ONE,t.ZERO,t.ONE,t.ZERO),t.blendColor(0,0,0,0),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0),t.depthMask(!0),t.depthFunc(t.LESS),t.clearDepth(1),t.stencilMask(4294967295),t.stencilFunc(t.ALWAYS,0,4294967295),t.stencilOp(t.KEEP,t.KEEP,t.KEEP),t.clearStencil(0),t.cullFace(t.BACK),t.frontFace(t.CCW),t.polygonOffset(0,0),t.activeTexture(t.TEXTURE0),t.bindFramebuffer(t.FRAMEBUFFER,null),t.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),t.bindFramebuffer(t.READ_FRAMEBUFFER,null),t.useProgram(null),t.lineWidth(1),t.scissor(0,0,t.canvas.width,t.canvas.height),t.viewport(0,0,t.canvas.width,t.canvas.height),c={},D=null,$={},f={},d=new WeakMap,h=[],p=null,v=!1,x=null,m=null,u=null,_=null,g=null,S=null,b=null,A=new Be(0,0,0),T=0,C=!1,E=null,y=null,L=null,H=null,z=null,J.set(0,0,t.canvas.width,t.canvas.height),Ie.set(0,0,t.canvas.width,t.canvas.height),r.reset(),s.reset(),o.reset()}return{buffers:{color:r,depth:s,stencil:o},enable:he,disable:de,bindFramebuffer:we,drawBuffers:Re,useProgram:Ae,setBlending:nt,setMaterial:Ge,setFlipSided:We,setCullFace:Se,setLineWidth:it,setPolygonOffset:Ce,setScissorTest:be,activeTexture:P,bindTexture:M,unbindTexture:k,compressedTexImage2D:ee,compressedTexImage3D:ne,texImage2D:ge,texImage3D:je,updateUBOMapping:Fe,uniformBlockBinding:He,texStorage2D:Oe,texStorage3D:oe,texSubImage2D:te,texSubImage3D:Te,compressedTexSubImage2D:fe,compressedTexSubImage3D:_e,scissor:Ue,viewport:ve,reset:ut}}function Hm(t,e,n,i){const r=EC(i);switch(n){case Ov:return t*e;case kv:return t*e;case Bv:return t*e*2;case ah:return t*e/r.components*r.byteLength;case lh:return t*e/r.components*r.byteLength;case Hv:return t*e*2/r.components*r.byteLength;case ch:return t*e*2/r.components*r.byteLength;case zv:return t*e*3/r.components*r.byteLength;case zn:return t*e*4/r.components*r.byteLength;case uh:return t*e*4/r.components*r.byteLength;case sl:case ol:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case al:case ll:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case Nf:case If:return Math.max(t,16)*Math.max(e,8)/4;case Lf:case Df:return Math.max(t,8)*Math.max(e,8)/2;case Uf:case Ff:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case Of:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case zf:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case kf:return Math.floor((t+4)/5)*Math.floor((e+3)/4)*16;case Bf:return Math.floor((t+4)/5)*Math.floor((e+4)/5)*16;case Hf:return Math.floor((t+5)/6)*Math.floor((e+4)/5)*16;case Vf:return Math.floor((t+5)/6)*Math.floor((e+5)/6)*16;case Gf:return Math.floor((t+7)/8)*Math.floor((e+4)/5)*16;case Wf:return Math.floor((t+7)/8)*Math.floor((e+5)/6)*16;case jf:return Math.floor((t+7)/8)*Math.floor((e+7)/8)*16;case Xf:return Math.floor((t+9)/10)*Math.floor((e+4)/5)*16;case Yf:return Math.floor((t+9)/10)*Math.floor((e+5)/6)*16;case $f:return Math.floor((t+9)/10)*Math.floor((e+7)/8)*16;case qf:return Math.floor((t+9)/10)*Math.floor((e+9)/10)*16;case Kf:return Math.floor((t+11)/12)*Math.floor((e+9)/10)*16;case Zf:return Math.floor((t+11)/12)*Math.floor((e+11)/12)*16;case cl:case Qf:case Jf:return Math.ceil(t/4)*Math.ceil(e/4)*16;case Vv:case ed:return Math.ceil(t/4)*Math.ceil(e/4)*8;case td:case nd:return Math.ceil(t/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function EC(t){switch(t){case vi:case Iv:return{byteLength:1,components:1};case Wo:case Uv:case Zo:return{byteLength:2,components:1};case sh:case oh:return{byteLength:2,components:4};case br:case rh:case Kn:return{byteLength:4,components:1};case Fv:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${t}.`)}function wC(t,e,n,i,r,s,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new De,f=new WeakMap;let d;const h=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(P,M){return p?new OffscreenCanvas(P,M):Gl("canvas")}function x(P,M,k){let ee=1;const ne=be(P);if((ne.width>k||ne.height>k)&&(ee=k/Math.max(ne.width,ne.height)),ee<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){const te=Math.floor(ee*ne.width),Te=Math.floor(ee*ne.height);d===void 0&&(d=v(te,Te));const fe=M?v(te,Te):d;return fe.width=te,fe.height=Te,fe.getContext("2d").drawImage(P,0,0,te,Te),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ne.width+"x"+ne.height+") to ("+te+"x"+Te+")."),fe}else return"data"in P&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ne.width+"x"+ne.height+")."),P;return P}function m(P){return P.generateMipmaps&&P.minFilter!==tn&&P.minFilter!==pn}function u(P){t.generateMipmap(P)}function _(P,M,k,ee,ne=!1){if(P!==null){if(t[P]!==void 0)return t[P];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let te=M;if(M===t.RED&&(k===t.FLOAT&&(te=t.R32F),k===t.HALF_FLOAT&&(te=t.R16F),k===t.UNSIGNED_BYTE&&(te=t.R8)),M===t.RED_INTEGER&&(k===t.UNSIGNED_BYTE&&(te=t.R8UI),k===t.UNSIGNED_SHORT&&(te=t.R16UI),k===t.UNSIGNED_INT&&(te=t.R32UI),k===t.BYTE&&(te=t.R8I),k===t.SHORT&&(te=t.R16I),k===t.INT&&(te=t.R32I)),M===t.RG&&(k===t.FLOAT&&(te=t.RG32F),k===t.HALF_FLOAT&&(te=t.RG16F),k===t.UNSIGNED_BYTE&&(te=t.RG8)),M===t.RG_INTEGER&&(k===t.UNSIGNED_BYTE&&(te=t.RG8UI),k===t.UNSIGNED_SHORT&&(te=t.RG16UI),k===t.UNSIGNED_INT&&(te=t.RG32UI),k===t.BYTE&&(te=t.RG8I),k===t.SHORT&&(te=t.RG16I),k===t.INT&&(te=t.RG32I)),M===t.RGB&&k===t.UNSIGNED_INT_5_9_9_9_REV&&(te=t.RGB9_E5),M===t.RGBA){const Te=ne?kl:Je.getTransfer(ee);k===t.FLOAT&&(te=t.RGBA32F),k===t.HALF_FLOAT&&(te=t.RGBA16F),k===t.UNSIGNED_BYTE&&(te=Te===ot?t.SRGB8_ALPHA8:t.RGBA8),k===t.UNSIGNED_SHORT_4_4_4_4&&(te=t.RGBA4),k===t.UNSIGNED_SHORT_5_5_5_1&&(te=t.RGB5_A1)}return(te===t.R16F||te===t.R32F||te===t.RG16F||te===t.RG32F||te===t.RGBA16F||te===t.RGBA32F)&&e.get("EXT_color_buffer_float"),te}function g(P,M){let k;return P?M===null||M===br||M===Is?k=t.DEPTH24_STENCIL8:M===Kn?k=t.DEPTH32F_STENCIL8:M===Wo&&(k=t.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===br||M===Is?k=t.DEPTH_COMPONENT24:M===Kn?k=t.DEPTH_COMPONENT32F:M===Wo&&(k=t.DEPTH_COMPONENT16),k}function S(P,M){return m(P)===!0||P.isFramebufferTexture&&P.minFilter!==tn&&P.minFilter!==pn?Math.log2(Math.max(M.width,M.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?M.mipmaps.length:1}function b(P){const M=P.target;M.removeEventListener("dispose",b),T(M),M.isVideoTexture&&f.delete(M)}function A(P){const M=P.target;M.removeEventListener("dispose",A),E(M)}function T(P){const M=i.get(P);if(M.__webglInit===void 0)return;const k=P.source,ee=h.get(k);if(ee){const ne=ee[M.__cacheKey];ne.usedTimes--,ne.usedTimes===0&&C(P),Object.keys(ee).length===0&&h.delete(k)}i.remove(P)}function C(P){const M=i.get(P);t.deleteTexture(M.__webglTexture);const k=P.source,ee=h.get(k);delete ee[M.__cacheKey],o.memory.textures--}function E(P){const M=i.get(P);if(P.depthTexture&&P.depthTexture.dispose(),P.isWebGLCubeRenderTarget)for(let ee=0;ee<6;ee++){if(Array.isArray(M.__webglFramebuffer[ee]))for(let ne=0;ne<M.__webglFramebuffer[ee].length;ne++)t.deleteFramebuffer(M.__webglFramebuffer[ee][ne]);else t.deleteFramebuffer(M.__webglFramebuffer[ee]);M.__webglDepthbuffer&&t.deleteRenderbuffer(M.__webglDepthbuffer[ee])}else{if(Array.isArray(M.__webglFramebuffer))for(let ee=0;ee<M.__webglFramebuffer.length;ee++)t.deleteFramebuffer(M.__webglFramebuffer[ee]);else t.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&t.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&t.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let ee=0;ee<M.__webglColorRenderbuffer.length;ee++)M.__webglColorRenderbuffer[ee]&&t.deleteRenderbuffer(M.__webglColorRenderbuffer[ee]);M.__webglDepthRenderbuffer&&t.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const k=P.textures;for(let ee=0,ne=k.length;ee<ne;ee++){const te=i.get(k[ee]);te.__webglTexture&&(t.deleteTexture(te.__webglTexture),o.memory.textures--),i.remove(k[ee])}i.remove(P)}let y=0;function L(){y=0}function H(){const P=y;return P>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+r.maxTextures),y+=1,P}function z(P){const M=[];return M.push(P.wrapS),M.push(P.wrapT),M.push(P.wrapR||0),M.push(P.magFilter),M.push(P.minFilter),M.push(P.anisotropy),M.push(P.internalFormat),M.push(P.format),M.push(P.type),M.push(P.generateMipmaps),M.push(P.premultiplyAlpha),M.push(P.flipY),M.push(P.unpackAlignment),M.push(P.colorSpace),M.join()}function Y(P,M){const k=i.get(P);if(P.isVideoTexture&&it(P),P.isRenderTargetTexture===!1&&P.version>0&&k.__version!==P.version){const ee=P.image;if(ee===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ee.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Ie(k,P,M);return}}n.bindTexture(t.TEXTURE_2D,k.__webglTexture,t.TEXTURE0+M)}function X(P,M){const k=i.get(P);if(P.version>0&&k.__version!==P.version){Ie(k,P,M);return}n.bindTexture(t.TEXTURE_2D_ARRAY,k.__webglTexture,t.TEXTURE0+M)}function G(P,M){const k=i.get(P);if(P.version>0&&k.__version!==P.version){Ie(k,P,M);return}n.bindTexture(t.TEXTURE_3D,k.__webglTexture,t.TEXTURE0+M)}function q(P,M){const k=i.get(P);if(P.version>0&&k.__version!==P.version){j(k,P,M);return}n.bindTexture(t.TEXTURE_CUBE_MAP,k.__webglTexture,t.TEXTURE0+M)}const D={[Rf]:t.REPEAT,[xr]:t.CLAMP_TO_EDGE,[Pf]:t.MIRRORED_REPEAT},$={[tn]:t.NEAREST,[dE]:t.NEAREST_MIPMAP_NEAREST,[Sa]:t.NEAREST_MIPMAP_LINEAR,[pn]:t.LINEAR,[qc]:t.LINEAR_MIPMAP_NEAREST,[yr]:t.LINEAR_MIPMAP_LINEAR},K={[gE]:t.NEVER,[ME]:t.ALWAYS,[_E]:t.LESS,[Wv]:t.LEQUAL,[vE]:t.EQUAL,[SE]:t.GEQUAL,[xE]:t.GREATER,[yE]:t.NOTEQUAL};function se(P,M){if(M.type===Kn&&e.has("OES_texture_float_linear")===!1&&(M.magFilter===pn||M.magFilter===qc||M.magFilter===Sa||M.magFilter===yr||M.minFilter===pn||M.minFilter===qc||M.minFilter===Sa||M.minFilter===yr)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),t.texParameteri(P,t.TEXTURE_WRAP_S,D[M.wrapS]),t.texParameteri(P,t.TEXTURE_WRAP_T,D[M.wrapT]),(P===t.TEXTURE_3D||P===t.TEXTURE_2D_ARRAY)&&t.texParameteri(P,t.TEXTURE_WRAP_R,D[M.wrapR]),t.texParameteri(P,t.TEXTURE_MAG_FILTER,$[M.magFilter]),t.texParameteri(P,t.TEXTURE_MIN_FILTER,$[M.minFilter]),M.compareFunction&&(t.texParameteri(P,t.TEXTURE_COMPARE_MODE,t.COMPARE_REF_TO_TEXTURE),t.texParameteri(P,t.TEXTURE_COMPARE_FUNC,K[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===tn||M.minFilter!==Sa&&M.minFilter!==yr||M.type===Kn&&e.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||i.get(M).__currentAnisotropy){const k=e.get("EXT_texture_filter_anisotropic");t.texParameterf(P,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,r.getMaxAnisotropy())),i.get(M).__currentAnisotropy=M.anisotropy}}}function J(P,M){let k=!1;P.__webglInit===void 0&&(P.__webglInit=!0,M.addEventListener("dispose",b));const ee=M.source;let ne=h.get(ee);ne===void 0&&(ne={},h.set(ee,ne));const te=z(M);if(te!==P.__cacheKey){ne[te]===void 0&&(ne[te]={texture:t.createTexture(),usedTimes:0},o.memory.textures++,k=!0),ne[te].usedTimes++;const Te=ne[P.__cacheKey];Te!==void 0&&(ne[P.__cacheKey].usedTimes--,Te.usedTimes===0&&C(M)),P.__cacheKey=te,P.__webglTexture=ne[te].texture}return k}function Ie(P,M,k){let ee=t.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(ee=t.TEXTURE_2D_ARRAY),M.isData3DTexture&&(ee=t.TEXTURE_3D);const ne=J(P,M),te=M.source;n.bindTexture(ee,P.__webglTexture,t.TEXTURE0+k);const Te=i.get(te);if(te.version!==Te.__version||ne===!0){n.activeTexture(t.TEXTURE0+k);const fe=Je.getPrimaries(Je.workingColorSpace),_e=M.colorSpace===Ui?null:Je.getPrimaries(M.colorSpace),Oe=M.colorSpace===Ui||fe===_e?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,M.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,M.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,Oe);let oe=x(M.image,!1,r.maxTextureSize);oe=Ce(M,oe);const ge=s.convert(M.format,M.colorSpace),je=s.convert(M.type);let Ue=_(M.internalFormat,ge,je,M.colorSpace,M.isVideoTexture);se(ee,M);let ve;const Fe=M.mipmaps,He=M.isVideoTexture!==!0,ut=Te.__version===void 0||ne===!0,I=te.dataReady,ae=S(M,oe);if(M.isDepthTexture)Ue=g(M.format===Us,M.type),ut&&(He?n.texStorage2D(t.TEXTURE_2D,1,Ue,oe.width,oe.height):n.texImage2D(t.TEXTURE_2D,0,Ue,oe.width,oe.height,0,ge,je,null));else if(M.isDataTexture)if(Fe.length>0){He&&ut&&n.texStorage2D(t.TEXTURE_2D,ae,Ue,Fe[0].width,Fe[0].height);for(let Z=0,Q=Fe.length;Z<Q;Z++)ve=Fe[Z],He?I&&n.texSubImage2D(t.TEXTURE_2D,Z,0,0,ve.width,ve.height,ge,je,ve.data):n.texImage2D(t.TEXTURE_2D,Z,Ue,ve.width,ve.height,0,ge,je,ve.data);M.generateMipmaps=!1}else He?(ut&&n.texStorage2D(t.TEXTURE_2D,ae,Ue,oe.width,oe.height),I&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,oe.width,oe.height,ge,je,oe.data)):n.texImage2D(t.TEXTURE_2D,0,Ue,oe.width,oe.height,0,ge,je,oe.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){He&&ut&&n.texStorage3D(t.TEXTURE_2D_ARRAY,ae,Ue,Fe[0].width,Fe[0].height,oe.depth);for(let Z=0,Q=Fe.length;Z<Q;Z++)if(ve=Fe[Z],M.format!==zn)if(ge!==null)if(He){if(I)if(M.layerUpdates.size>0){const ce=Hm(ve.width,ve.height,M.format,M.type);for(const Pe of M.layerUpdates){const Xe=ve.data.subarray(Pe*ce/ve.data.BYTES_PER_ELEMENT,(Pe+1)*ce/ve.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,Z,0,0,Pe,ve.width,ve.height,1,ge,Xe,0,0)}M.clearLayerUpdates()}else n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,Z,0,0,0,ve.width,ve.height,oe.depth,ge,ve.data,0,0)}else n.compressedTexImage3D(t.TEXTURE_2D_ARRAY,Z,Ue,ve.width,ve.height,oe.depth,0,ve.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else He?I&&n.texSubImage3D(t.TEXTURE_2D_ARRAY,Z,0,0,0,ve.width,ve.height,oe.depth,ge,je,ve.data):n.texImage3D(t.TEXTURE_2D_ARRAY,Z,Ue,ve.width,ve.height,oe.depth,0,ge,je,ve.data)}else{He&&ut&&n.texStorage2D(t.TEXTURE_2D,ae,Ue,Fe[0].width,Fe[0].height);for(let Z=0,Q=Fe.length;Z<Q;Z++)ve=Fe[Z],M.format!==zn?ge!==null?He?I&&n.compressedTexSubImage2D(t.TEXTURE_2D,Z,0,0,ve.width,ve.height,ge,ve.data):n.compressedTexImage2D(t.TEXTURE_2D,Z,Ue,ve.width,ve.height,0,ve.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):He?I&&n.texSubImage2D(t.TEXTURE_2D,Z,0,0,ve.width,ve.height,ge,je,ve.data):n.texImage2D(t.TEXTURE_2D,Z,Ue,ve.width,ve.height,0,ge,je,ve.data)}else if(M.isDataArrayTexture)if(He){if(ut&&n.texStorage3D(t.TEXTURE_2D_ARRAY,ae,Ue,oe.width,oe.height,oe.depth),I)if(M.layerUpdates.size>0){const Z=Hm(oe.width,oe.height,M.format,M.type);for(const Q of M.layerUpdates){const ce=oe.data.subarray(Q*Z/oe.data.BYTES_PER_ELEMENT,(Q+1)*Z/oe.data.BYTES_PER_ELEMENT);n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,Q,oe.width,oe.height,1,ge,je,ce)}M.clearLayerUpdates()}else n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,0,oe.width,oe.height,oe.depth,ge,je,oe.data)}else n.texImage3D(t.TEXTURE_2D_ARRAY,0,Ue,oe.width,oe.height,oe.depth,0,ge,je,oe.data);else if(M.isData3DTexture)He?(ut&&n.texStorage3D(t.TEXTURE_3D,ae,Ue,oe.width,oe.height,oe.depth),I&&n.texSubImage3D(t.TEXTURE_3D,0,0,0,0,oe.width,oe.height,oe.depth,ge,je,oe.data)):n.texImage3D(t.TEXTURE_3D,0,Ue,oe.width,oe.height,oe.depth,0,ge,je,oe.data);else if(M.isFramebufferTexture){if(ut)if(He)n.texStorage2D(t.TEXTURE_2D,ae,Ue,oe.width,oe.height);else{let Z=oe.width,Q=oe.height;for(let ce=0;ce<ae;ce++)n.texImage2D(t.TEXTURE_2D,ce,Ue,Z,Q,0,ge,je,null),Z>>=1,Q>>=1}}else if(Fe.length>0){if(He&&ut){const Z=be(Fe[0]);n.texStorage2D(t.TEXTURE_2D,ae,Ue,Z.width,Z.height)}for(let Z=0,Q=Fe.length;Z<Q;Z++)ve=Fe[Z],He?I&&n.texSubImage2D(t.TEXTURE_2D,Z,0,0,ge,je,ve):n.texImage2D(t.TEXTURE_2D,Z,Ue,ge,je,ve);M.generateMipmaps=!1}else if(He){if(ut){const Z=be(oe);n.texStorage2D(t.TEXTURE_2D,ae,Ue,Z.width,Z.height)}I&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,ge,je,oe)}else n.texImage2D(t.TEXTURE_2D,0,Ue,ge,je,oe);m(M)&&u(ee),Te.__version=te.version,M.onUpdate&&M.onUpdate(M)}P.__version=M.version}function j(P,M,k){if(M.image.length!==6)return;const ee=J(P,M),ne=M.source;n.bindTexture(t.TEXTURE_CUBE_MAP,P.__webglTexture,t.TEXTURE0+k);const te=i.get(ne);if(ne.version!==te.__version||ee===!0){n.activeTexture(t.TEXTURE0+k);const Te=Je.getPrimaries(Je.workingColorSpace),fe=M.colorSpace===Ui?null:Je.getPrimaries(M.colorSpace),_e=M.colorSpace===Ui||Te===fe?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,M.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,M.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,_e);const Oe=M.isCompressedTexture||M.image[0].isCompressedTexture,oe=M.image[0]&&M.image[0].isDataTexture,ge=[];for(let Q=0;Q<6;Q++)!Oe&&!oe?ge[Q]=x(M.image[Q],!0,r.maxCubemapSize):ge[Q]=oe?M.image[Q].image:M.image[Q],ge[Q]=Ce(M,ge[Q]);const je=ge[0],Ue=s.convert(M.format,M.colorSpace),ve=s.convert(M.type),Fe=_(M.internalFormat,Ue,ve,M.colorSpace),He=M.isVideoTexture!==!0,ut=te.__version===void 0||ee===!0,I=ne.dataReady;let ae=S(M,je);se(t.TEXTURE_CUBE_MAP,M);let Z;if(Oe){He&&ut&&n.texStorage2D(t.TEXTURE_CUBE_MAP,ae,Fe,je.width,je.height);for(let Q=0;Q<6;Q++){Z=ge[Q].mipmaps;for(let ce=0;ce<Z.length;ce++){const Pe=Z[ce];M.format!==zn?Ue!==null?He?I&&n.compressedTexSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Q,ce,0,0,Pe.width,Pe.height,Ue,Pe.data):n.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Q,ce,Fe,Pe.width,Pe.height,0,Pe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):He?I&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Q,ce,0,0,Pe.width,Pe.height,Ue,ve,Pe.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Q,ce,Fe,Pe.width,Pe.height,0,Ue,ve,Pe.data)}}}else{if(Z=M.mipmaps,He&&ut){Z.length>0&&ae++;const Q=be(ge[0]);n.texStorage2D(t.TEXTURE_CUBE_MAP,ae,Fe,Q.width,Q.height)}for(let Q=0;Q<6;Q++)if(oe){He?I&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,ge[Q].width,ge[Q].height,Ue,ve,ge[Q].data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,Fe,ge[Q].width,ge[Q].height,0,Ue,ve,ge[Q].data);for(let ce=0;ce<Z.length;ce++){const Xe=Z[ce].image[Q].image;He?I&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Q,ce+1,0,0,Xe.width,Xe.height,Ue,ve,Xe.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Q,ce+1,Fe,Xe.width,Xe.height,0,Ue,ve,Xe.data)}}else{He?I&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,Ue,ve,ge[Q]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,Fe,Ue,ve,ge[Q]);for(let ce=0;ce<Z.length;ce++){const Pe=Z[ce];He?I&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Q,ce+1,0,0,Ue,ve,Pe.image[Q]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Q,ce+1,Fe,Ue,ve,Pe.image[Q])}}}m(M)&&u(t.TEXTURE_CUBE_MAP),te.__version=ne.version,M.onUpdate&&M.onUpdate(M)}P.__version=M.version}function ie(P,M,k,ee,ne,te){const Te=s.convert(k.format,k.colorSpace),fe=s.convert(k.type),_e=_(k.internalFormat,Te,fe,k.colorSpace);if(!i.get(M).__hasExternalTextures){const oe=Math.max(1,M.width>>te),ge=Math.max(1,M.height>>te);ne===t.TEXTURE_3D||ne===t.TEXTURE_2D_ARRAY?n.texImage3D(ne,te,_e,oe,ge,M.depth,0,Te,fe,null):n.texImage2D(ne,te,_e,oe,ge,0,Te,fe,null)}n.bindFramebuffer(t.FRAMEBUFFER,P),Se(M)?a.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,ee,ne,i.get(k).__webglTexture,0,We(M)):(ne===t.TEXTURE_2D||ne>=t.TEXTURE_CUBE_MAP_POSITIVE_X&&ne<=t.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&t.framebufferTexture2D(t.FRAMEBUFFER,ee,ne,i.get(k).__webglTexture,te),n.bindFramebuffer(t.FRAMEBUFFER,null)}function he(P,M,k){if(t.bindRenderbuffer(t.RENDERBUFFER,P),M.depthBuffer){const ee=M.depthTexture,ne=ee&&ee.isDepthTexture?ee.type:null,te=g(M.stencilBuffer,ne),Te=M.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,fe=We(M);Se(M)?a.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,fe,te,M.width,M.height):k?t.renderbufferStorageMultisample(t.RENDERBUFFER,fe,te,M.width,M.height):t.renderbufferStorage(t.RENDERBUFFER,te,M.width,M.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,Te,t.RENDERBUFFER,P)}else{const ee=M.textures;for(let ne=0;ne<ee.length;ne++){const te=ee[ne],Te=s.convert(te.format,te.colorSpace),fe=s.convert(te.type),_e=_(te.internalFormat,Te,fe,te.colorSpace),Oe=We(M);k&&Se(M)===!1?t.renderbufferStorageMultisample(t.RENDERBUFFER,Oe,_e,M.width,M.height):Se(M)?a.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,Oe,_e,M.width,M.height):t.renderbufferStorage(t.RENDERBUFFER,_e,M.width,M.height)}}t.bindRenderbuffer(t.RENDERBUFFER,null)}function de(P,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(t.FRAMEBUFFER,P),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(M.depthTexture).__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),Y(M.depthTexture,0);const ee=i.get(M.depthTexture).__webglTexture,ne=We(M);if(M.depthTexture.format===Ss)Se(M)?a.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,ee,0,ne):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,ee,0);else if(M.depthTexture.format===Us)Se(M)?a.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,ee,0,ne):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,ee,0);else throw new Error("Unknown depthTexture format")}function we(P){const M=i.get(P),k=P.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==P.depthTexture){const ee=P.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),ee){const ne=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,ee.removeEventListener("dispose",ne)};ee.addEventListener("dispose",ne),M.__depthDisposeCallback=ne}M.__boundDepthTexture=ee}if(P.depthTexture&&!M.__autoAllocateDepthBuffer){if(k)throw new Error("target.depthTexture not supported in Cube render targets");de(M.__webglFramebuffer,P)}else if(k){M.__webglDepthbuffer=[];for(let ee=0;ee<6;ee++)if(n.bindFramebuffer(t.FRAMEBUFFER,M.__webglFramebuffer[ee]),M.__webglDepthbuffer[ee]===void 0)M.__webglDepthbuffer[ee]=t.createRenderbuffer(),he(M.__webglDepthbuffer[ee],P,!1);else{const ne=P.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,te=M.__webglDepthbuffer[ee];t.bindRenderbuffer(t.RENDERBUFFER,te),t.framebufferRenderbuffer(t.FRAMEBUFFER,ne,t.RENDERBUFFER,te)}}else if(n.bindFramebuffer(t.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=t.createRenderbuffer(),he(M.__webglDepthbuffer,P,!1);else{const ee=P.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,ne=M.__webglDepthbuffer;t.bindRenderbuffer(t.RENDERBUFFER,ne),t.framebufferRenderbuffer(t.FRAMEBUFFER,ee,t.RENDERBUFFER,ne)}n.bindFramebuffer(t.FRAMEBUFFER,null)}function Re(P,M,k){const ee=i.get(P);M!==void 0&&ie(ee.__webglFramebuffer,P,P.texture,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,0),k!==void 0&&we(P)}function Ae(P){const M=P.texture,k=i.get(P),ee=i.get(M);P.addEventListener("dispose",A);const ne=P.textures,te=P.isWebGLCubeRenderTarget===!0,Te=ne.length>1;if(Te||(ee.__webglTexture===void 0&&(ee.__webglTexture=t.createTexture()),ee.__version=M.version,o.memory.textures++),te){k.__webglFramebuffer=[];for(let fe=0;fe<6;fe++)if(M.mipmaps&&M.mipmaps.length>0){k.__webglFramebuffer[fe]=[];for(let _e=0;_e<M.mipmaps.length;_e++)k.__webglFramebuffer[fe][_e]=t.createFramebuffer()}else k.__webglFramebuffer[fe]=t.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){k.__webglFramebuffer=[];for(let fe=0;fe<M.mipmaps.length;fe++)k.__webglFramebuffer[fe]=t.createFramebuffer()}else k.__webglFramebuffer=t.createFramebuffer();if(Te)for(let fe=0,_e=ne.length;fe<_e;fe++){const Oe=i.get(ne[fe]);Oe.__webglTexture===void 0&&(Oe.__webglTexture=t.createTexture(),o.memory.textures++)}if(P.samples>0&&Se(P)===!1){k.__webglMultisampledFramebuffer=t.createFramebuffer(),k.__webglColorRenderbuffer=[],n.bindFramebuffer(t.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let fe=0;fe<ne.length;fe++){const _e=ne[fe];k.__webglColorRenderbuffer[fe]=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,k.__webglColorRenderbuffer[fe]);const Oe=s.convert(_e.format,_e.colorSpace),oe=s.convert(_e.type),ge=_(_e.internalFormat,Oe,oe,_e.colorSpace,P.isXRRenderTarget===!0),je=We(P);t.renderbufferStorageMultisample(t.RENDERBUFFER,je,ge,P.width,P.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+fe,t.RENDERBUFFER,k.__webglColorRenderbuffer[fe])}t.bindRenderbuffer(t.RENDERBUFFER,null),P.depthBuffer&&(k.__webglDepthRenderbuffer=t.createRenderbuffer(),he(k.__webglDepthRenderbuffer,P,!0)),n.bindFramebuffer(t.FRAMEBUFFER,null)}}if(te){n.bindTexture(t.TEXTURE_CUBE_MAP,ee.__webglTexture),se(t.TEXTURE_CUBE_MAP,M);for(let fe=0;fe<6;fe++)if(M.mipmaps&&M.mipmaps.length>0)for(let _e=0;_e<M.mipmaps.length;_e++)ie(k.__webglFramebuffer[fe][_e],P,M,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+fe,_e);else ie(k.__webglFramebuffer[fe],P,M,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0);m(M)&&u(t.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(Te){for(let fe=0,_e=ne.length;fe<_e;fe++){const Oe=ne[fe],oe=i.get(Oe);n.bindTexture(t.TEXTURE_2D,oe.__webglTexture),se(t.TEXTURE_2D,Oe),ie(k.__webglFramebuffer,P,Oe,t.COLOR_ATTACHMENT0+fe,t.TEXTURE_2D,0),m(Oe)&&u(t.TEXTURE_2D)}n.unbindTexture()}else{let fe=t.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(fe=P.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(fe,ee.__webglTexture),se(fe,M),M.mipmaps&&M.mipmaps.length>0)for(let _e=0;_e<M.mipmaps.length;_e++)ie(k.__webglFramebuffer[_e],P,M,t.COLOR_ATTACHMENT0,fe,_e);else ie(k.__webglFramebuffer,P,M,t.COLOR_ATTACHMENT0,fe,0);m(M)&&u(fe),n.unbindTexture()}P.depthBuffer&&we(P)}function $e(P){const M=P.textures;for(let k=0,ee=M.length;k<ee;k++){const ne=M[k];if(m(ne)){const te=P.isWebGLCubeRenderTarget?t.TEXTURE_CUBE_MAP:t.TEXTURE_2D,Te=i.get(ne).__webglTexture;n.bindTexture(te,Te),u(te),n.unbindTexture()}}}const N=[],nt=[];function Ge(P){if(P.samples>0){if(Se(P)===!1){const M=P.textures,k=P.width,ee=P.height;let ne=t.COLOR_BUFFER_BIT;const te=P.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,Te=i.get(P),fe=M.length>1;if(fe)for(let _e=0;_e<M.length;_e++)n.bindFramebuffer(t.FRAMEBUFFER,Te.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+_e,t.RENDERBUFFER,null),n.bindFramebuffer(t.FRAMEBUFFER,Te.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+_e,t.TEXTURE_2D,null,0);n.bindFramebuffer(t.READ_FRAMEBUFFER,Te.__webglMultisampledFramebuffer),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,Te.__webglFramebuffer);for(let _e=0;_e<M.length;_e++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(ne|=t.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(ne|=t.STENCIL_BUFFER_BIT)),fe){t.framebufferRenderbuffer(t.READ_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,Te.__webglColorRenderbuffer[_e]);const Oe=i.get(M[_e]).__webglTexture;t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,Oe,0)}t.blitFramebuffer(0,0,k,ee,0,0,k,ee,ne,t.NEAREST),l===!0&&(N.length=0,nt.length=0,N.push(t.COLOR_ATTACHMENT0+_e),P.depthBuffer&&P.resolveDepthBuffer===!1&&(N.push(te),nt.push(te),t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,nt)),t.invalidateFramebuffer(t.READ_FRAMEBUFFER,N))}if(n.bindFramebuffer(t.READ_FRAMEBUFFER,null),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),fe)for(let _e=0;_e<M.length;_e++){n.bindFramebuffer(t.FRAMEBUFFER,Te.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+_e,t.RENDERBUFFER,Te.__webglColorRenderbuffer[_e]);const Oe=i.get(M[_e]).__webglTexture;n.bindFramebuffer(t.FRAMEBUFFER,Te.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+_e,t.TEXTURE_2D,Oe,0)}n.bindFramebuffer(t.DRAW_FRAMEBUFFER,Te.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.resolveDepthBuffer===!1&&l){const M=P.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,[M])}}}function We(P){return Math.min(r.maxSamples,P.samples)}function Se(P){const M=i.get(P);return P.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function it(P){const M=o.render.frame;f.get(P)!==M&&(f.set(P,M),P.update())}function Ce(P,M){const k=P.colorSpace,ee=P.format,ne=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||k!==ir&&k!==Ui&&(Je.getTransfer(k)===ot?(ee!==zn||ne!==vi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",k)),M}function be(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(c.width=P.naturalWidth||P.width,c.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(c.width=P.displayWidth,c.height=P.displayHeight):(c.width=P.width,c.height=P.height),c}this.allocateTextureUnit=H,this.resetTextureUnits=L,this.setTexture2D=Y,this.setTexture2DArray=X,this.setTexture3D=G,this.setTextureCube=q,this.rebindTextures=Re,this.setupRenderTarget=Ae,this.updateRenderTargetMipmap=$e,this.updateMultisampleRenderTarget=Ge,this.setupDepthRenderbuffer=we,this.setupFrameBufferTexture=ie,this.useMultisampledRTT=Se}function TC(t,e){function n(i,r=Ui){let s;const o=Je.getTransfer(r);if(i===vi)return t.UNSIGNED_BYTE;if(i===sh)return t.UNSIGNED_SHORT_4_4_4_4;if(i===oh)return t.UNSIGNED_SHORT_5_5_5_1;if(i===Fv)return t.UNSIGNED_INT_5_9_9_9_REV;if(i===Iv)return t.BYTE;if(i===Uv)return t.SHORT;if(i===Wo)return t.UNSIGNED_SHORT;if(i===rh)return t.INT;if(i===br)return t.UNSIGNED_INT;if(i===Kn)return t.FLOAT;if(i===Zo)return t.HALF_FLOAT;if(i===Ov)return t.ALPHA;if(i===zv)return t.RGB;if(i===zn)return t.RGBA;if(i===kv)return t.LUMINANCE;if(i===Bv)return t.LUMINANCE_ALPHA;if(i===Ss)return t.DEPTH_COMPONENT;if(i===Us)return t.DEPTH_STENCIL;if(i===ah)return t.RED;if(i===lh)return t.RED_INTEGER;if(i===Hv)return t.RG;if(i===ch)return t.RG_INTEGER;if(i===uh)return t.RGBA_INTEGER;if(i===sl||i===ol||i===al||i===ll)if(o===ot)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===sl)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===ol)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===al)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===ll)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===sl)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===ol)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===al)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===ll)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Lf||i===Nf||i===Df||i===If)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===Lf)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Nf)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Df)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===If)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Uf||i===Ff||i===Of)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Uf||i===Ff)return o===ot?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Of)return o===ot?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===zf||i===kf||i===Bf||i===Hf||i===Vf||i===Gf||i===Wf||i===jf||i===Xf||i===Yf||i===$f||i===qf||i===Kf||i===Zf)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===zf)return o===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===kf)return o===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Bf)return o===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Hf)return o===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Vf)return o===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Gf)return o===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Wf)return o===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===jf)return o===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Xf)return o===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Yf)return o===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===$f)return o===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===qf)return o===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Kf)return o===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Zf)return o===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===cl||i===Qf||i===Jf)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===cl)return o===ot?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Qf)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Jf)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Vv||i===ed||i===td||i===nd)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===cl)return s.COMPRESSED_RED_RGTC1_EXT;if(i===ed)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===td)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===nd)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Is?t.UNSIGNED_INT_24_8:t[i]!==void 0?t[i]:null}return{convert:n}}class AC extends hn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Ga extends Ft{constructor(){super(),this.isGroup=!0,this.type="Group"}}const CC={type:"move"};class Su{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ga,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ga,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new F,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new F),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ga,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new F,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new F),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const i of e.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,i){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const x of e.hand.values()){const m=n.getJointPose(x,i),u=this._getHandJoint(c,x);m!==null&&(u.matrix.fromArray(m.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,u.jointRadius=m.radius),u.visible=m!==null}const f=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],h=f.position.distanceTo(d.position),p=.02,v=.005;c.inputState.pinching&&h>p+v?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=p-v&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=n.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=n.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(CC)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const i=new Ga;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[n.jointName]=i,e.add(i)}return e.joints[n.jointName]}}const bC=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,RC=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class PC{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,n,i){if(this.texture===null){const r=new $t,s=e.properties.get(r);s.__webglTexture=n.texture,(n.depthNear!=i.depthNear||n.depthFar!=i.depthFar)&&(this.depthNear=n.depthNear,this.depthFar=n.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){const n=e.cameras[0].viewport,i=new xi({vertexShader:bC,fragmentShader:RC,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new Zn(new ta(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class LC extends Dr{constructor(e,n){super();const i=this;let r=null,s=1,o=null,a="local-floor",l=1,c=null,f=null,d=null,h=null,p=null,v=null;const x=new PC,m=n.getContextAttributes();let u=null,_=null;const g=[],S=[],b=new De;let A=null;const T=new hn;T.layers.enable(1),T.viewport=new at;const C=new hn;C.layers.enable(2),C.viewport=new at;const E=[T,C],y=new AC;y.layers.enable(1),y.layers.enable(2);let L=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let ie=g[j];return ie===void 0&&(ie=new Su,g[j]=ie),ie.getTargetRaySpace()},this.getControllerGrip=function(j){let ie=g[j];return ie===void 0&&(ie=new Su,g[j]=ie),ie.getGripSpace()},this.getHand=function(j){let ie=g[j];return ie===void 0&&(ie=new Su,g[j]=ie),ie.getHandSpace()};function z(j){const ie=S.indexOf(j.inputSource);if(ie===-1)return;const he=g[ie];he!==void 0&&(he.update(j.inputSource,j.frame,c||o),he.dispatchEvent({type:j.type,data:j.inputSource}))}function Y(){r.removeEventListener("select",z),r.removeEventListener("selectstart",z),r.removeEventListener("selectend",z),r.removeEventListener("squeeze",z),r.removeEventListener("squeezestart",z),r.removeEventListener("squeezeend",z),r.removeEventListener("end",Y),r.removeEventListener("inputsourceschange",X);for(let j=0;j<g.length;j++){const ie=S[j];ie!==null&&(S[j]=null,g[j].disconnect(ie))}L=null,H=null,x.reset(),e.setRenderTarget(u),p=null,h=null,d=null,r=null,_=null,Ie.stop(),i.isPresenting=!1,e.setPixelRatio(A),e.setSize(b.width,b.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){s=j,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){a=j,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(j){c=j},this.getBaseLayer=function(){return h!==null?h:p},this.getBinding=function(){return d},this.getFrame=function(){return v},this.getSession=function(){return r},this.setSession=async function(j){if(r=j,r!==null){if(u=e.getRenderTarget(),r.addEventListener("select",z),r.addEventListener("selectstart",z),r.addEventListener("selectend",z),r.addEventListener("squeeze",z),r.addEventListener("squeezestart",z),r.addEventListener("squeezeend",z),r.addEventListener("end",Y),r.addEventListener("inputsourceschange",X),m.xrCompatible!==!0&&await n.makeXRCompatible(),A=e.getPixelRatio(),e.getSize(b),r.renderState.layers===void 0){const ie={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,n,ie),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),_=new Rr(p.framebufferWidth,p.framebufferHeight,{format:zn,type:vi,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let ie=null,he=null,de=null;m.depth&&(de=m.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,ie=m.stencil?Us:Ss,he=m.stencil?Is:br);const we={colorFormat:n.RGBA8,depthFormat:de,scaleFactor:s};d=new XRWebGLBinding(r,n),h=d.createProjectionLayer(we),r.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),_=new Rr(h.textureWidth,h.textureHeight,{format:zn,type:vi,depthTexture:new r0(h.textureWidth,h.textureHeight,he,void 0,void 0,void 0,void 0,void 0,void 0,ie),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),Ie.setContext(r),Ie.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function X(j){for(let ie=0;ie<j.removed.length;ie++){const he=j.removed[ie],de=S.indexOf(he);de>=0&&(S[de]=null,g[de].disconnect(he))}for(let ie=0;ie<j.added.length;ie++){const he=j.added[ie];let de=S.indexOf(he);if(de===-1){for(let Re=0;Re<g.length;Re++)if(Re>=S.length){S.push(he),de=Re;break}else if(S[Re]===null){S[Re]=he,de=Re;break}if(de===-1)break}const we=g[de];we&&we.connect(he)}}const G=new F,q=new F;function D(j,ie,he){G.setFromMatrixPosition(ie.matrixWorld),q.setFromMatrixPosition(he.matrixWorld);const de=G.distanceTo(q),we=ie.projectionMatrix.elements,Re=he.projectionMatrix.elements,Ae=we[14]/(we[10]-1),$e=we[14]/(we[10]+1),N=(we[9]+1)/we[5],nt=(we[9]-1)/we[5],Ge=(we[8]-1)/we[0],We=(Re[8]+1)/Re[0],Se=Ae*Ge,it=Ae*We,Ce=de/(-Ge+We),be=Ce*-Ge;if(ie.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(be),j.translateZ(Ce),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert(),we[10]===-1)j.projectionMatrix.copy(ie.projectionMatrix),j.projectionMatrixInverse.copy(ie.projectionMatrixInverse);else{const P=Ae+Ce,M=$e+Ce,k=Se-be,ee=it+(de-be),ne=N*$e/M*P,te=nt*$e/M*P;j.projectionMatrix.makePerspective(k,ee,ne,te,P,M),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}}function $(j,ie){ie===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(ie.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(r===null)return;let ie=j.near,he=j.far;x.texture!==null&&(x.depthNear>0&&(ie=x.depthNear),x.depthFar>0&&(he=x.depthFar)),y.near=C.near=T.near=ie,y.far=C.far=T.far=he,(L!==y.near||H!==y.far)&&(r.updateRenderState({depthNear:y.near,depthFar:y.far}),L=y.near,H=y.far);const de=j.parent,we=y.cameras;$(y,de);for(let Re=0;Re<we.length;Re++)$(we[Re],de);we.length===2?D(y,T,C):y.projectionMatrix.copy(T.projectionMatrix),K(j,y,de)};function K(j,ie,he){he===null?j.matrix.copy(ie.matrixWorld):(j.matrix.copy(he.matrixWorld),j.matrix.invert(),j.matrix.multiply(ie.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(ie.projectionMatrix),j.projectionMatrixInverse.copy(ie.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=id*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(h===null&&p===null))return l},this.setFoveation=function(j){l=j,h!==null&&(h.fixedFoveation=j),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=j)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(y)};let se=null;function J(j,ie){if(f=ie.getViewerPose(c||o),v=ie,f!==null){const he=f.views;p!==null&&(e.setRenderTargetFramebuffer(_,p.framebuffer),e.setRenderTarget(_));let de=!1;he.length!==y.cameras.length&&(y.cameras.length=0,de=!0);for(let Re=0;Re<he.length;Re++){const Ae=he[Re];let $e=null;if(p!==null)$e=p.getViewport(Ae);else{const nt=d.getViewSubImage(h,Ae);$e=nt.viewport,Re===0&&(e.setRenderTargetTextures(_,nt.colorTexture,h.ignoreDepthValues?void 0:nt.depthStencilTexture),e.setRenderTarget(_))}let N=E[Re];N===void 0&&(N=new hn,N.layers.enable(Re),N.viewport=new at,E[Re]=N),N.matrix.fromArray(Ae.transform.matrix),N.matrix.decompose(N.position,N.quaternion,N.scale),N.projectionMatrix.fromArray(Ae.projectionMatrix),N.projectionMatrixInverse.copy(N.projectionMatrix).invert(),N.viewport.set($e.x,$e.y,$e.width,$e.height),Re===0&&(y.matrix.copy(N.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),de===!0&&y.cameras.push(N)}const we=r.enabledFeatures;if(we&&we.includes("depth-sensing")){const Re=d.getDepthInformation(he[0]);Re&&Re.isValid&&Re.texture&&x.init(e,Re,r.renderState)}}for(let he=0;he<g.length;he++){const de=S[he],we=g[he];de!==null&&we!==void 0&&we.update(de,ie,c||o)}se&&se(j,ie),ie.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ie}),v=null}const Ie=new n0;Ie.setAnimationLoop(J),this.setAnimationLoop=function(j){se=j},this.dispose=function(){}}}const ur=new ei,NC=new pt;function DC(t,e){function n(m,u){m.matrixAutoUpdate===!0&&m.updateMatrix(),u.value.copy(m.matrix)}function i(m,u){u.color.getRGB(m.fogColor.value,Jv(t)),u.isFog?(m.fogNear.value=u.near,m.fogFar.value=u.far):u.isFogExp2&&(m.fogDensity.value=u.density)}function r(m,u,_,g,S){u.isMeshBasicMaterial||u.isMeshLambertMaterial?s(m,u):u.isMeshToonMaterial?(s(m,u),d(m,u)):u.isMeshPhongMaterial?(s(m,u),f(m,u)):u.isMeshStandardMaterial?(s(m,u),h(m,u),u.isMeshPhysicalMaterial&&p(m,u,S)):u.isMeshMatcapMaterial?(s(m,u),v(m,u)):u.isMeshDepthMaterial?s(m,u):u.isMeshDistanceMaterial?(s(m,u),x(m,u)):u.isMeshNormalMaterial?s(m,u):u.isLineBasicMaterial?(o(m,u),u.isLineDashedMaterial&&a(m,u)):u.isPointsMaterial?l(m,u,_,g):u.isSpriteMaterial?c(m,u):u.isShadowMaterial?(m.color.value.copy(u.color),m.opacity.value=u.opacity):u.isShaderMaterial&&(u.uniformsNeedUpdate=!1)}function s(m,u){m.opacity.value=u.opacity,u.color&&m.diffuse.value.copy(u.color),u.emissive&&m.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity),u.map&&(m.map.value=u.map,n(u.map,m.mapTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,n(u.alphaMap,m.alphaMapTransform)),u.bumpMap&&(m.bumpMap.value=u.bumpMap,n(u.bumpMap,m.bumpMapTransform),m.bumpScale.value=u.bumpScale,u.side===on&&(m.bumpScale.value*=-1)),u.normalMap&&(m.normalMap.value=u.normalMap,n(u.normalMap,m.normalMapTransform),m.normalScale.value.copy(u.normalScale),u.side===on&&m.normalScale.value.negate()),u.displacementMap&&(m.displacementMap.value=u.displacementMap,n(u.displacementMap,m.displacementMapTransform),m.displacementScale.value=u.displacementScale,m.displacementBias.value=u.displacementBias),u.emissiveMap&&(m.emissiveMap.value=u.emissiveMap,n(u.emissiveMap,m.emissiveMapTransform)),u.specularMap&&(m.specularMap.value=u.specularMap,n(u.specularMap,m.specularMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest);const _=e.get(u),g=_.envMap,S=_.envMapRotation;g&&(m.envMap.value=g,ur.copy(S),ur.x*=-1,ur.y*=-1,ur.z*=-1,g.isCubeTexture&&g.isRenderTargetTexture===!1&&(ur.y*=-1,ur.z*=-1),m.envMapRotation.value.setFromMatrix4(NC.makeRotationFromEuler(ur)),m.flipEnvMap.value=g.isCubeTexture&&g.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=u.reflectivity,m.ior.value=u.ior,m.refractionRatio.value=u.refractionRatio),u.lightMap&&(m.lightMap.value=u.lightMap,m.lightMapIntensity.value=u.lightMapIntensity,n(u.lightMap,m.lightMapTransform)),u.aoMap&&(m.aoMap.value=u.aoMap,m.aoMapIntensity.value=u.aoMapIntensity,n(u.aoMap,m.aoMapTransform))}function o(m,u){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,u.map&&(m.map.value=u.map,n(u.map,m.mapTransform))}function a(m,u){m.dashSize.value=u.dashSize,m.totalSize.value=u.dashSize+u.gapSize,m.scale.value=u.scale}function l(m,u,_,g){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,m.size.value=u.size*_,m.scale.value=g*.5,u.map&&(m.map.value=u.map,n(u.map,m.uvTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,n(u.alphaMap,m.alphaMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest)}function c(m,u){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,m.rotation.value=u.rotation,u.map&&(m.map.value=u.map,n(u.map,m.mapTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,n(u.alphaMap,m.alphaMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest)}function f(m,u){m.specular.value.copy(u.specular),m.shininess.value=Math.max(u.shininess,1e-4)}function d(m,u){u.gradientMap&&(m.gradientMap.value=u.gradientMap)}function h(m,u){m.metalness.value=u.metalness,u.metalnessMap&&(m.metalnessMap.value=u.metalnessMap,n(u.metalnessMap,m.metalnessMapTransform)),m.roughness.value=u.roughness,u.roughnessMap&&(m.roughnessMap.value=u.roughnessMap,n(u.roughnessMap,m.roughnessMapTransform)),u.envMap&&(m.envMapIntensity.value=u.envMapIntensity)}function p(m,u,_){m.ior.value=u.ior,u.sheen>0&&(m.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen),m.sheenRoughness.value=u.sheenRoughness,u.sheenColorMap&&(m.sheenColorMap.value=u.sheenColorMap,n(u.sheenColorMap,m.sheenColorMapTransform)),u.sheenRoughnessMap&&(m.sheenRoughnessMap.value=u.sheenRoughnessMap,n(u.sheenRoughnessMap,m.sheenRoughnessMapTransform))),u.clearcoat>0&&(m.clearcoat.value=u.clearcoat,m.clearcoatRoughness.value=u.clearcoatRoughness,u.clearcoatMap&&(m.clearcoatMap.value=u.clearcoatMap,n(u.clearcoatMap,m.clearcoatMapTransform)),u.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=u.clearcoatRoughnessMap,n(u.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),u.clearcoatNormalMap&&(m.clearcoatNormalMap.value=u.clearcoatNormalMap,n(u.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(u.clearcoatNormalScale),u.side===on&&m.clearcoatNormalScale.value.negate())),u.dispersion>0&&(m.dispersion.value=u.dispersion),u.iridescence>0&&(m.iridescence.value=u.iridescence,m.iridescenceIOR.value=u.iridescenceIOR,m.iridescenceThicknessMinimum.value=u.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=u.iridescenceThicknessRange[1],u.iridescenceMap&&(m.iridescenceMap.value=u.iridescenceMap,n(u.iridescenceMap,m.iridescenceMapTransform)),u.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=u.iridescenceThicknessMap,n(u.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),u.transmission>0&&(m.transmission.value=u.transmission,m.transmissionSamplerMap.value=_.texture,m.transmissionSamplerSize.value.set(_.width,_.height),u.transmissionMap&&(m.transmissionMap.value=u.transmissionMap,n(u.transmissionMap,m.transmissionMapTransform)),m.thickness.value=u.thickness,u.thicknessMap&&(m.thicknessMap.value=u.thicknessMap,n(u.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=u.attenuationDistance,m.attenuationColor.value.copy(u.attenuationColor)),u.anisotropy>0&&(m.anisotropyVector.value.set(u.anisotropy*Math.cos(u.anisotropyRotation),u.anisotropy*Math.sin(u.anisotropyRotation)),u.anisotropyMap&&(m.anisotropyMap.value=u.anisotropyMap,n(u.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=u.specularIntensity,m.specularColor.value.copy(u.specularColor),u.specularColorMap&&(m.specularColorMap.value=u.specularColorMap,n(u.specularColorMap,m.specularColorMapTransform)),u.specularIntensityMap&&(m.specularIntensityMap.value=u.specularIntensityMap,n(u.specularIntensityMap,m.specularIntensityMapTransform))}function v(m,u){u.matcap&&(m.matcap.value=u.matcap)}function x(m,u){const _=e.get(u).light;m.referencePosition.value.setFromMatrixPosition(_.matrixWorld),m.nearDistance.value=_.shadow.camera.near,m.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function IC(t,e,n,i){let r={},s={},o=[];const a=t.getParameter(t.MAX_UNIFORM_BUFFER_BINDINGS);function l(_,g){const S=g.program;i.uniformBlockBinding(_,S)}function c(_,g){let S=r[_.id];S===void 0&&(v(_),S=f(_),r[_.id]=S,_.addEventListener("dispose",m));const b=g.program;i.updateUBOMapping(_,b);const A=e.render.frame;s[_.id]!==A&&(h(_),s[_.id]=A)}function f(_){const g=d();_.__bindingPointIndex=g;const S=t.createBuffer(),b=_.__size,A=_.usage;return t.bindBuffer(t.UNIFORM_BUFFER,S),t.bufferData(t.UNIFORM_BUFFER,b,A),t.bindBuffer(t.UNIFORM_BUFFER,null),t.bindBufferBase(t.UNIFORM_BUFFER,g,S),S}function d(){for(let _=0;_<a;_++)if(o.indexOf(_)===-1)return o.push(_),_;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(_){const g=r[_.id],S=_.uniforms,b=_.__cache;t.bindBuffer(t.UNIFORM_BUFFER,g);for(let A=0,T=S.length;A<T;A++){const C=Array.isArray(S[A])?S[A]:[S[A]];for(let E=0,y=C.length;E<y;E++){const L=C[E];if(p(L,A,E,b)===!0){const H=L.__offset,z=Array.isArray(L.value)?L.value:[L.value];let Y=0;for(let X=0;X<z.length;X++){const G=z[X],q=x(G);typeof G=="number"||typeof G=="boolean"?(L.__data[0]=G,t.bufferSubData(t.UNIFORM_BUFFER,H+Y,L.__data)):G.isMatrix3?(L.__data[0]=G.elements[0],L.__data[1]=G.elements[1],L.__data[2]=G.elements[2],L.__data[3]=0,L.__data[4]=G.elements[3],L.__data[5]=G.elements[4],L.__data[6]=G.elements[5],L.__data[7]=0,L.__data[8]=G.elements[6],L.__data[9]=G.elements[7],L.__data[10]=G.elements[8],L.__data[11]=0):(G.toArray(L.__data,Y),Y+=q.storage/Float32Array.BYTES_PER_ELEMENT)}t.bufferSubData(t.UNIFORM_BUFFER,H,L.__data)}}}t.bindBuffer(t.UNIFORM_BUFFER,null)}function p(_,g,S,b){const A=_.value,T=g+"_"+S;if(b[T]===void 0)return typeof A=="number"||typeof A=="boolean"?b[T]=A:b[T]=A.clone(),!0;{const C=b[T];if(typeof A=="number"||typeof A=="boolean"){if(C!==A)return b[T]=A,!0}else if(C.equals(A)===!1)return C.copy(A),!0}return!1}function v(_){const g=_.uniforms;let S=0;const b=16;for(let T=0,C=g.length;T<C;T++){const E=Array.isArray(g[T])?g[T]:[g[T]];for(let y=0,L=E.length;y<L;y++){const H=E[y],z=Array.isArray(H.value)?H.value:[H.value];for(let Y=0,X=z.length;Y<X;Y++){const G=z[Y],q=x(G),D=S%b,$=D%q.boundary,K=D+$;S+=$,K!==0&&b-K<q.storage&&(S+=b-K),H.__data=new Float32Array(q.storage/Float32Array.BYTES_PER_ELEMENT),H.__offset=S,S+=q.storage}}}const A=S%b;return A>0&&(S+=b-A),_.__size=S,_.__cache={},this}function x(_){const g={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(g.boundary=4,g.storage=4):_.isVector2?(g.boundary=8,g.storage=8):_.isVector3||_.isColor?(g.boundary=16,g.storage=12):_.isVector4?(g.boundary=16,g.storage=16):_.isMatrix3?(g.boundary=48,g.storage=48):_.isMatrix4?(g.boundary=64,g.storage=64):_.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",_),g}function m(_){const g=_.target;g.removeEventListener("dispose",m);const S=o.indexOf(g.__bindingPointIndex);o.splice(S,1),t.deleteBuffer(r[g.id]),delete r[g.id],delete s[g.id]}function u(){for(const _ in r)t.deleteBuffer(r[_]);o=[],r={},s={}}return{bind:l,update:c,dispose:u}}class UC{constructor(e={}){const{canvas:n=TE(),context:i=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:f="default",failIfMajorPerformanceCaveat:d=!1}=e;this.isWebGLRenderer=!0;let h;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");h=i.getContextAttributes().alpha}else h=o;const p=new Uint32Array(4),v=new Int32Array(4);let x=null,m=null;const u=[],_=[];this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Xn,this.toneMapping=qi,this.toneMappingExposure=1;const g=this;let S=!1,b=0,A=0,T=null,C=-1,E=null;const y=new at,L=new at;let H=null;const z=new Be(0);let Y=0,X=n.width,G=n.height,q=1,D=null,$=null;const K=new at(0,0,X,G),se=new at(0,0,X,G);let J=!1;const Ie=new hh;let j=!1,ie=!1;const he=new pt,de=new F,we=new at,Re={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ae=!1;function $e(){return T===null?q:1}let N=i;function nt(w,U){return n.getContext(w,U)}try{const w={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:f,failIfMajorPerformanceCaveat:d};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${ih}`),n.addEventListener("webglcontextlost",Z,!1),n.addEventListener("webglcontextrestored",Q,!1),n.addEventListener("webglcontextcreationerror",ce,!1),N===null){const U="webgl2";if(N=nt(U,w),N===null)throw nt(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}let Ge,We,Se,it,Ce,be,P,M,k,ee,ne,te,Te,fe,_e,Oe,oe,ge,je,Ue,ve,Fe,He,ut;function I(){Ge=new HT(N),Ge.init(),Fe=new TC(N,Ge),We=new UT(N,Ge,e,Fe),Se=new MC(N),it=new WT(N),Ce=new lC,be=new wC(N,Ge,Se,Ce,We,Fe,it),P=new OT(g),M=new BT(g),k=new ZE(N),He=new DT(N,k),ee=new VT(N,k,it,He),ne=new XT(N,ee,k,it),je=new jT(N,We,be),Oe=new FT(Ce),te=new aC(g,P,M,Ge,We,He,Oe),Te=new DC(g,Ce),fe=new uC,_e=new gC(Ge),ge=new NT(g,P,M,Se,ne,h,l),oe=new SC(g,ne,We),ut=new IC(N,it,We,Se),Ue=new IT(N,Ge,it),ve=new GT(N,Ge,it),it.programs=te.programs,g.capabilities=We,g.extensions=Ge,g.properties=Ce,g.renderLists=fe,g.shadowMap=oe,g.state=Se,g.info=it}I();const ae=new LC(g,N);this.xr=ae,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){const w=Ge.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=Ge.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return q},this.setPixelRatio=function(w){w!==void 0&&(q=w,this.setSize(X,G,!1))},this.getSize=function(w){return w.set(X,G)},this.setSize=function(w,U,B=!0){if(ae.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}X=w,G=U,n.width=Math.floor(w*q),n.height=Math.floor(U*q),B===!0&&(n.style.width=w+"px",n.style.height=U+"px"),this.setViewport(0,0,w,U)},this.getDrawingBufferSize=function(w){return w.set(X*q,G*q).floor()},this.setDrawingBufferSize=function(w,U,B){X=w,G=U,q=B,n.width=Math.floor(w*B),n.height=Math.floor(U*B),this.setViewport(0,0,w,U)},this.getCurrentViewport=function(w){return w.copy(y)},this.getViewport=function(w){return w.copy(K)},this.setViewport=function(w,U,B,V){w.isVector4?K.set(w.x,w.y,w.z,w.w):K.set(w,U,B,V),Se.viewport(y.copy(K).multiplyScalar(q).round())},this.getScissor=function(w){return w.copy(se)},this.setScissor=function(w,U,B,V){w.isVector4?se.set(w.x,w.y,w.z,w.w):se.set(w,U,B,V),Se.scissor(L.copy(se).multiplyScalar(q).round())},this.getScissorTest=function(){return J},this.setScissorTest=function(w){Se.setScissorTest(J=w)},this.setOpaqueSort=function(w){D=w},this.setTransparentSort=function(w){$=w},this.getClearColor=function(w){return w.copy(ge.getClearColor())},this.setClearColor=function(){ge.setClearColor.apply(ge,arguments)},this.getClearAlpha=function(){return ge.getClearAlpha()},this.setClearAlpha=function(){ge.setClearAlpha.apply(ge,arguments)},this.clear=function(w=!0,U=!0,B=!0){let V=0;if(w){let O=!1;if(T!==null){const le=T.texture.format;O=le===uh||le===ch||le===lh}if(O){const le=T.texture.type,pe=le===vi||le===br||le===Wo||le===Is||le===sh||le===oh,xe=ge.getClearColor(),ye=ge.getClearAlpha(),Le=xe.r,Ne=xe.g,Me=xe.b;pe?(p[0]=Le,p[1]=Ne,p[2]=Me,p[3]=ye,N.clearBufferuiv(N.COLOR,0,p)):(v[0]=Le,v[1]=Ne,v[2]=Me,v[3]=ye,N.clearBufferiv(N.COLOR,0,v))}else V|=N.COLOR_BUFFER_BIT}U&&(V|=N.DEPTH_BUFFER_BIT),B&&(V|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),N.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",Z,!1),n.removeEventListener("webglcontextrestored",Q,!1),n.removeEventListener("webglcontextcreationerror",ce,!1),fe.dispose(),_e.dispose(),Ce.dispose(),P.dispose(),M.dispose(),ne.dispose(),He.dispose(),ut.dispose(),te.dispose(),ae.dispose(),ae.removeEventListener("sessionstart",Gn),ae.removeEventListener("sessionend",xh),rr.stop()};function Z(w){w.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),S=!0}function Q(){console.log("THREE.WebGLRenderer: Context Restored."),S=!1;const w=it.autoReset,U=oe.enabled,B=oe.autoUpdate,V=oe.needsUpdate,O=oe.type;I(),it.autoReset=w,oe.enabled=U,oe.autoUpdate=B,oe.needsUpdate=V,oe.type=O}function ce(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function Pe(w){const U=w.target;U.removeEventListener("dispose",Pe),Xe(U)}function Xe(w){yt(w),Ce.remove(w)}function yt(w){const U=Ce.get(w).programs;U!==void 0&&(U.forEach(function(B){te.releaseProgram(B)}),w.isShaderMaterial&&te.releaseShaderCache(w))}this.renderBufferDirect=function(w,U,B,V,O,le){U===null&&(U=Re);const pe=O.isMesh&&O.matrixWorld.determinant()<0,xe=f0(w,U,B,V,O);Se.setMaterial(V,pe);let ye=B.index,Le=1;if(V.wireframe===!0){if(ye=ee.getWireframeAttribute(B),ye===void 0)return;Le=2}const Ne=B.drawRange,Me=B.attributes.position;let Ke=Ne.start*Le,gt=(Ne.start+Ne.count)*Le;le!==null&&(Ke=Math.max(Ke,le.start*Le),gt=Math.min(gt,(le.start+le.count)*Le)),ye!==null?(Ke=Math.max(Ke,0),gt=Math.min(gt,ye.count)):Me!=null&&(Ke=Math.max(Ke,0),gt=Math.min(gt,Me.count));const _t=gt-Ke;if(_t<0||_t===1/0)return;He.setup(O,V,xe,B,ye);let ln,Ze=Ue;if(ye!==null&&(ln=k.get(ye),Ze=ve,Ze.setIndex(ln)),O.isMesh)V.wireframe===!0?(Se.setLineWidth(V.wireframeLinewidth*$e()),Ze.setMode(N.LINES)):Ze.setMode(N.TRIANGLES);else if(O.isLine){let Ee=V.linewidth;Ee===void 0&&(Ee=1),Se.setLineWidth(Ee*$e()),O.isLineSegments?Ze.setMode(N.LINES):O.isLineLoop?Ze.setMode(N.LINE_LOOP):Ze.setMode(N.LINE_STRIP)}else O.isPoints?Ze.setMode(N.POINTS):O.isSprite&&Ze.setMode(N.TRIANGLES);if(O.isBatchedMesh)if(O._multiDrawInstances!==null)Ze.renderMultiDrawInstances(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount,O._multiDrawInstances);else if(Ge.get("WEBGL_multi_draw"))Ze.renderMultiDraw(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount);else{const Ee=O._multiDrawStarts,Dt=O._multiDrawCounts,Qe=O._multiDrawCount,Rn=ye?k.get(ye).bytesPerElement:1,Ir=Ce.get(V).currentProgram.getUniforms();for(let cn=0;cn<Qe;cn++)Ir.setValue(N,"_gl_DrawID",cn),Ze.render(Ee[cn]/Rn,Dt[cn])}else if(O.isInstancedMesh)Ze.renderInstances(Ke,_t,O.count);else if(B.isInstancedBufferGeometry){const Ee=B._maxInstanceCount!==void 0?B._maxInstanceCount:1/0,Dt=Math.min(B.instanceCount,Ee);Ze.renderInstances(Ke,_t,Dt)}else Ze.render(Ke,_t)};function Nt(w,U,B){w.transparent===!0&&w.side===On&&w.forceSinglePass===!1?(w.side=on,w.needsUpdate=!0,ia(w,U,B),w.side=Qi,w.needsUpdate=!0,ia(w,U,B),w.side=On):ia(w,U,B)}this.compile=function(w,U,B=null){B===null&&(B=w),m=_e.get(B),m.init(U),_.push(m),B.traverseVisible(function(O){O.isLight&&O.layers.test(U.layers)&&(m.pushLight(O),O.castShadow&&m.pushShadow(O))}),w!==B&&w.traverseVisible(function(O){O.isLight&&O.layers.test(U.layers)&&(m.pushLight(O),O.castShadow&&m.pushShadow(O))}),m.setupLights();const V=new Set;return w.traverse(function(O){const le=O.material;if(le)if(Array.isArray(le))for(let pe=0;pe<le.length;pe++){const xe=le[pe];Nt(xe,B,O),V.add(xe)}else Nt(le,B,O),V.add(le)}),_.pop(),m=null,V},this.compileAsync=function(w,U,B=null){const V=this.compile(w,U,B);return new Promise(O=>{function le(){if(V.forEach(function(pe){Ce.get(pe).currentProgram.isReady()&&V.delete(pe)}),V.size===0){O(w);return}setTimeout(le,10)}Ge.get("KHR_parallel_shader_compile")!==null?le():setTimeout(le,10)})};let qe=null;function ti(w){qe&&qe(w)}function Gn(){rr.stop()}function xh(){rr.start()}const rr=new n0;rr.setAnimationLoop(ti),typeof self<"u"&&rr.setContext(self),this.setAnimationLoop=function(w){qe=w,ae.setAnimationLoop(w),w===null?rr.stop():rr.start()},ae.addEventListener("sessionstart",Gn),ae.addEventListener("sessionend",xh),this.render=function(w,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(S===!0)return;if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),ae.enabled===!0&&ae.isPresenting===!0&&(ae.cameraAutoUpdate===!0&&ae.updateCamera(U),U=ae.getCamera()),w.isScene===!0&&w.onBeforeRender(g,w,U,T),m=_e.get(w,_.length),m.init(U),_.push(m),he.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),Ie.setFromProjectionMatrix(he),ie=this.localClippingEnabled,j=Oe.init(this.clippingPlanes,ie),x=fe.get(w,u.length),x.init(),u.push(x),ae.enabled===!0&&ae.isPresenting===!0){const le=g.xr.getDepthSensingMesh();le!==null&&_c(le,U,-1/0,g.sortObjects)}_c(w,U,0,g.sortObjects),x.finish(),g.sortObjects===!0&&x.sort(D,$),Ae=ae.enabled===!1||ae.isPresenting===!1||ae.hasDepthSensing()===!1,Ae&&ge.addToRenderList(x,w),this.info.render.frame++,j===!0&&Oe.beginShadows();const B=m.state.shadowsArray;oe.render(B,w,U),j===!0&&Oe.endShadows(),this.info.autoReset===!0&&this.info.reset();const V=x.opaque,O=x.transmissive;if(m.setupLights(),U.isArrayCamera){const le=U.cameras;if(O.length>0)for(let pe=0,xe=le.length;pe<xe;pe++){const ye=le[pe];Sh(V,O,w,ye)}Ae&&ge.render(w);for(let pe=0,xe=le.length;pe<xe;pe++){const ye=le[pe];yh(x,w,ye,ye.viewport)}}else O.length>0&&Sh(V,O,w,U),Ae&&ge.render(w),yh(x,w,U);T!==null&&(be.updateMultisampleRenderTarget(T),be.updateRenderTargetMipmap(T)),w.isScene===!0&&w.onAfterRender(g,w,U),He.resetDefaultState(),C=-1,E=null,_.pop(),_.length>0?(m=_[_.length-1],j===!0&&Oe.setGlobalState(g.clippingPlanes,m.state.camera)):m=null,u.pop(),u.length>0?x=u[u.length-1]:x=null};function _c(w,U,B,V){if(w.visible===!1)return;if(w.layers.test(U.layers)){if(w.isGroup)B=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(U);else if(w.isLight)m.pushLight(w),w.castShadow&&m.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||Ie.intersectsSprite(w)){V&&we.setFromMatrixPosition(w.matrixWorld).applyMatrix4(he);const pe=ne.update(w),xe=w.material;xe.visible&&x.push(w,pe,xe,B,we.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||Ie.intersectsObject(w))){const pe=ne.update(w),xe=w.material;if(V&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),we.copy(w.boundingSphere.center)):(pe.boundingSphere===null&&pe.computeBoundingSphere(),we.copy(pe.boundingSphere.center)),we.applyMatrix4(w.matrixWorld).applyMatrix4(he)),Array.isArray(xe)){const ye=pe.groups;for(let Le=0,Ne=ye.length;Le<Ne;Le++){const Me=ye[Le],Ke=xe[Me.materialIndex];Ke&&Ke.visible&&x.push(w,pe,Ke,B,we.z,Me)}}else xe.visible&&x.push(w,pe,xe,B,we.z,null)}}const le=w.children;for(let pe=0,xe=le.length;pe<xe;pe++)_c(le[pe],U,B,V)}function yh(w,U,B,V){const O=w.opaque,le=w.transmissive,pe=w.transparent;m.setupLightsView(B),j===!0&&Oe.setGlobalState(g.clippingPlanes,B),V&&Se.viewport(y.copy(V)),O.length>0&&na(O,U,B),le.length>0&&na(le,U,B),pe.length>0&&na(pe,U,B),Se.buffers.depth.setTest(!0),Se.buffers.depth.setMask(!0),Se.buffers.color.setMask(!0),Se.setPolygonOffset(!1)}function Sh(w,U,B,V){if((B.isScene===!0?B.overrideMaterial:null)!==null)return;m.state.transmissionRenderTarget[V.id]===void 0&&(m.state.transmissionRenderTarget[V.id]=new Rr(1,1,{generateMipmaps:!0,type:Ge.has("EXT_color_buffer_half_float")||Ge.has("EXT_color_buffer_float")?Zo:vi,minFilter:yr,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Je.workingColorSpace}));const le=m.state.transmissionRenderTarget[V.id],pe=V.viewport||y;le.setSize(pe.z,pe.w);const xe=g.getRenderTarget();g.setRenderTarget(le),g.getClearColor(z),Y=g.getClearAlpha(),Y<1&&g.setClearColor(16777215,.5),g.clear(),Ae&&ge.render(B);const ye=g.toneMapping;g.toneMapping=qi;const Le=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),m.setupLightsView(V),j===!0&&Oe.setGlobalState(g.clippingPlanes,V),na(w,B,V),be.updateMultisampleRenderTarget(le),be.updateRenderTargetMipmap(le),Ge.has("WEBGL_multisampled_render_to_texture")===!1){let Ne=!1;for(let Me=0,Ke=U.length;Me<Ke;Me++){const gt=U[Me],_t=gt.object,ln=gt.geometry,Ze=gt.material,Ee=gt.group;if(Ze.side===On&&_t.layers.test(V.layers)){const Dt=Ze.side;Ze.side=on,Ze.needsUpdate=!0,Mh(_t,B,V,ln,Ze,Ee),Ze.side=Dt,Ze.needsUpdate=!0,Ne=!0}}Ne===!0&&(be.updateMultisampleRenderTarget(le),be.updateRenderTargetMipmap(le))}g.setRenderTarget(xe),g.setClearColor(z,Y),Le!==void 0&&(V.viewport=Le),g.toneMapping=ye}function na(w,U,B){const V=U.isScene===!0?U.overrideMaterial:null;for(let O=0,le=w.length;O<le;O++){const pe=w[O],xe=pe.object,ye=pe.geometry,Le=V===null?pe.material:V,Ne=pe.group;xe.layers.test(B.layers)&&Mh(xe,U,B,ye,Le,Ne)}}function Mh(w,U,B,V,O,le){w.onBeforeRender(g,U,B,V,O,le),w.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),O.onBeforeRender(g,U,B,V,w,le),O.transparent===!0&&O.side===On&&O.forceSinglePass===!1?(O.side=on,O.needsUpdate=!0,g.renderBufferDirect(B,U,V,O,w,le),O.side=Qi,O.needsUpdate=!0,g.renderBufferDirect(B,U,V,O,w,le),O.side=On):g.renderBufferDirect(B,U,V,O,w,le),w.onAfterRender(g,U,B,V,O,le)}function ia(w,U,B){U.isScene!==!0&&(U=Re);const V=Ce.get(w),O=m.state.lights,le=m.state.shadowsArray,pe=O.state.version,xe=te.getParameters(w,O.state,le,U,B),ye=te.getProgramCacheKey(xe);let Le=V.programs;V.environment=w.isMeshStandardMaterial?U.environment:null,V.fog=U.fog,V.envMap=(w.isMeshStandardMaterial?M:P).get(w.envMap||V.environment),V.envMapRotation=V.environment!==null&&w.envMap===null?U.environmentRotation:w.envMapRotation,Le===void 0&&(w.addEventListener("dispose",Pe),Le=new Map,V.programs=Le);let Ne=Le.get(ye);if(Ne!==void 0){if(V.currentProgram===Ne&&V.lightsStateVersion===pe)return wh(w,xe),Ne}else xe.uniforms=te.getUniforms(w),w.onBeforeCompile(xe,g),Ne=te.acquireProgram(xe,ye),Le.set(ye,Ne),V.uniforms=xe.uniforms;const Me=V.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Me.clippingPlanes=Oe.uniform),wh(w,xe),V.needsLights=h0(w),V.lightsStateVersion=pe,V.needsLights&&(Me.ambientLightColor.value=O.state.ambient,Me.lightProbe.value=O.state.probe,Me.directionalLights.value=O.state.directional,Me.directionalLightShadows.value=O.state.directionalShadow,Me.spotLights.value=O.state.spot,Me.spotLightShadows.value=O.state.spotShadow,Me.rectAreaLights.value=O.state.rectArea,Me.ltc_1.value=O.state.rectAreaLTC1,Me.ltc_2.value=O.state.rectAreaLTC2,Me.pointLights.value=O.state.point,Me.pointLightShadows.value=O.state.pointShadow,Me.hemisphereLights.value=O.state.hemi,Me.directionalShadowMap.value=O.state.directionalShadowMap,Me.directionalShadowMatrix.value=O.state.directionalShadowMatrix,Me.spotShadowMap.value=O.state.spotShadowMap,Me.spotLightMatrix.value=O.state.spotLightMatrix,Me.spotLightMap.value=O.state.spotLightMap,Me.pointShadowMap.value=O.state.pointShadowMap,Me.pointShadowMatrix.value=O.state.pointShadowMatrix),V.currentProgram=Ne,V.uniformsList=null,Ne}function Eh(w){if(w.uniformsList===null){const U=w.currentProgram.getUniforms();w.uniformsList=fl.seqWithValue(U.seq,w.uniforms)}return w.uniformsList}function wh(w,U){const B=Ce.get(w);B.outputColorSpace=U.outputColorSpace,B.batching=U.batching,B.batchingColor=U.batchingColor,B.instancing=U.instancing,B.instancingColor=U.instancingColor,B.instancingMorph=U.instancingMorph,B.skinning=U.skinning,B.morphTargets=U.morphTargets,B.morphNormals=U.morphNormals,B.morphColors=U.morphColors,B.morphTargetsCount=U.morphTargetsCount,B.numClippingPlanes=U.numClippingPlanes,B.numIntersection=U.numClipIntersection,B.vertexAlphas=U.vertexAlphas,B.vertexTangents=U.vertexTangents,B.toneMapping=U.toneMapping}function f0(w,U,B,V,O){U.isScene!==!0&&(U=Re),be.resetTextureUnits();const le=U.fog,pe=V.isMeshStandardMaterial?U.environment:null,xe=T===null?g.outputColorSpace:T.isXRRenderTarget===!0?T.texture.colorSpace:ir,ye=(V.isMeshStandardMaterial?M:P).get(V.envMap||pe),Le=V.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,Ne=!!B.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),Me=!!B.morphAttributes.position,Ke=!!B.morphAttributes.normal,gt=!!B.morphAttributes.color;let _t=qi;V.toneMapped&&(T===null||T.isXRRenderTarget===!0)&&(_t=g.toneMapping);const ln=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,Ze=ln!==void 0?ln.length:0,Ee=Ce.get(V),Dt=m.state.lights;if(j===!0&&(ie===!0||w!==E)){const yn=w===E&&V.id===C;Oe.setState(V,w,yn)}let Qe=!1;V.version===Ee.__version?(Ee.needsLights&&Ee.lightsStateVersion!==Dt.state.version||Ee.outputColorSpace!==xe||O.isBatchedMesh&&Ee.batching===!1||!O.isBatchedMesh&&Ee.batching===!0||O.isBatchedMesh&&Ee.batchingColor===!0&&O.colorTexture===null||O.isBatchedMesh&&Ee.batchingColor===!1&&O.colorTexture!==null||O.isInstancedMesh&&Ee.instancing===!1||!O.isInstancedMesh&&Ee.instancing===!0||O.isSkinnedMesh&&Ee.skinning===!1||!O.isSkinnedMesh&&Ee.skinning===!0||O.isInstancedMesh&&Ee.instancingColor===!0&&O.instanceColor===null||O.isInstancedMesh&&Ee.instancingColor===!1&&O.instanceColor!==null||O.isInstancedMesh&&Ee.instancingMorph===!0&&O.morphTexture===null||O.isInstancedMesh&&Ee.instancingMorph===!1&&O.morphTexture!==null||Ee.envMap!==ye||V.fog===!0&&Ee.fog!==le||Ee.numClippingPlanes!==void 0&&(Ee.numClippingPlanes!==Oe.numPlanes||Ee.numIntersection!==Oe.numIntersection)||Ee.vertexAlphas!==Le||Ee.vertexTangents!==Ne||Ee.morphTargets!==Me||Ee.morphNormals!==Ke||Ee.morphColors!==gt||Ee.toneMapping!==_t||Ee.morphTargetsCount!==Ze)&&(Qe=!0):(Qe=!0,Ee.__version=V.version);let Rn=Ee.currentProgram;Qe===!0&&(Rn=ia(V,U,O));let Ir=!1,cn=!1,vc=!1;const St=Rn.getUniforms(),Mi=Ee.uniforms;if(Se.useProgram(Rn.program)&&(Ir=!0,cn=!0,vc=!0),V.id!==C&&(C=V.id,cn=!0),Ir||E!==w){St.setValue(N,"projectionMatrix",w.projectionMatrix),St.setValue(N,"viewMatrix",w.matrixWorldInverse);const yn=St.map.cameraPosition;yn!==void 0&&yn.setValue(N,de.setFromMatrixPosition(w.matrixWorld)),We.logarithmicDepthBuffer&&St.setValue(N,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&St.setValue(N,"isOrthographic",w.isOrthographicCamera===!0),E!==w&&(E=w,cn=!0,vc=!0)}if(O.isSkinnedMesh){St.setOptional(N,O,"bindMatrix"),St.setOptional(N,O,"bindMatrixInverse");const yn=O.skeleton;yn&&(yn.boneTexture===null&&yn.computeBoneTexture(),St.setValue(N,"boneTexture",yn.boneTexture,be))}O.isBatchedMesh&&(St.setOptional(N,O,"batchingTexture"),St.setValue(N,"batchingTexture",O._matricesTexture,be),St.setOptional(N,O,"batchingIdTexture"),St.setValue(N,"batchingIdTexture",O._indirectTexture,be),St.setOptional(N,O,"batchingColorTexture"),O._colorsTexture!==null&&St.setValue(N,"batchingColorTexture",O._colorsTexture,be));const xc=B.morphAttributes;if((xc.position!==void 0||xc.normal!==void 0||xc.color!==void 0)&&je.update(O,B,Rn),(cn||Ee.receiveShadow!==O.receiveShadow)&&(Ee.receiveShadow=O.receiveShadow,St.setValue(N,"receiveShadow",O.receiveShadow)),V.isMeshGouraudMaterial&&V.envMap!==null&&(Mi.envMap.value=ye,Mi.flipEnvMap.value=ye.isCubeTexture&&ye.isRenderTargetTexture===!1?-1:1),V.isMeshStandardMaterial&&V.envMap===null&&U.environment!==null&&(Mi.envMapIntensity.value=U.environmentIntensity),cn&&(St.setValue(N,"toneMappingExposure",g.toneMappingExposure),Ee.needsLights&&d0(Mi,vc),le&&V.fog===!0&&Te.refreshFogUniforms(Mi,le),Te.refreshMaterialUniforms(Mi,V,q,G,m.state.transmissionRenderTarget[w.id]),fl.upload(N,Eh(Ee),Mi,be)),V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(fl.upload(N,Eh(Ee),Mi,be),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&St.setValue(N,"center",O.center),St.setValue(N,"modelViewMatrix",O.modelViewMatrix),St.setValue(N,"normalMatrix",O.normalMatrix),St.setValue(N,"modelMatrix",O.matrixWorld),V.isShaderMaterial||V.isRawShaderMaterial){const yn=V.uniformsGroups;for(let yc=0,p0=yn.length;yc<p0;yc++){const Th=yn[yc];ut.update(Th,Rn),ut.bind(Th,Rn)}}return Rn}function d0(w,U){w.ambientLightColor.needsUpdate=U,w.lightProbe.needsUpdate=U,w.directionalLights.needsUpdate=U,w.directionalLightShadows.needsUpdate=U,w.pointLights.needsUpdate=U,w.pointLightShadows.needsUpdate=U,w.spotLights.needsUpdate=U,w.spotLightShadows.needsUpdate=U,w.rectAreaLights.needsUpdate=U,w.hemisphereLights.needsUpdate=U}function h0(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return b},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return T},this.setRenderTargetTextures=function(w,U,B){Ce.get(w.texture).__webglTexture=U,Ce.get(w.depthTexture).__webglTexture=B;const V=Ce.get(w);V.__hasExternalTextures=!0,V.__autoAllocateDepthBuffer=B===void 0,V.__autoAllocateDepthBuffer||Ge.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),V.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(w,U){const B=Ce.get(w);B.__webglFramebuffer=U,B.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(w,U=0,B=0){T=w,b=U,A=B;let V=!0,O=null,le=!1,pe=!1;if(w){const ye=Ce.get(w);if(ye.__useDefaultFramebuffer!==void 0)Se.bindFramebuffer(N.FRAMEBUFFER,null),V=!1;else if(ye.__webglFramebuffer===void 0)be.setupRenderTarget(w);else if(ye.__hasExternalTextures)be.rebindTextures(w,Ce.get(w.texture).__webglTexture,Ce.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){const Me=w.depthTexture;if(ye.__boundDepthTexture!==Me){if(Me!==null&&Ce.has(Me)&&(w.width!==Me.image.width||w.height!==Me.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");be.setupDepthRenderbuffer(w)}}const Le=w.texture;(Le.isData3DTexture||Le.isDataArrayTexture||Le.isCompressedArrayTexture)&&(pe=!0);const Ne=Ce.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Ne[U])?O=Ne[U][B]:O=Ne[U],le=!0):w.samples>0&&be.useMultisampledRTT(w)===!1?O=Ce.get(w).__webglMultisampledFramebuffer:Array.isArray(Ne)?O=Ne[B]:O=Ne,y.copy(w.viewport),L.copy(w.scissor),H=w.scissorTest}else y.copy(K).multiplyScalar(q).floor(),L.copy(se).multiplyScalar(q).floor(),H=J;if(Se.bindFramebuffer(N.FRAMEBUFFER,O)&&V&&Se.drawBuffers(w,O),Se.viewport(y),Se.scissor(L),Se.setScissorTest(H),le){const ye=Ce.get(w.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+U,ye.__webglTexture,B)}else if(pe){const ye=Ce.get(w.texture),Le=U||0;N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,ye.__webglTexture,B||0,Le)}C=-1},this.readRenderTargetPixels=function(w,U,B,V,O,le,pe){if(!(w&&w.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let xe=Ce.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&pe!==void 0&&(xe=xe[pe]),xe){Se.bindFramebuffer(N.FRAMEBUFFER,xe);try{const ye=w.texture,Le=ye.format,Ne=ye.type;if(!We.textureFormatReadable(Le)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!We.textureTypeReadable(Ne)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=w.width-V&&B>=0&&B<=w.height-O&&N.readPixels(U,B,V,O,Fe.convert(Le),Fe.convert(Ne),le)}finally{const ye=T!==null?Ce.get(T).__webglFramebuffer:null;Se.bindFramebuffer(N.FRAMEBUFFER,ye)}}},this.readRenderTargetPixelsAsync=async function(w,U,B,V,O,le,pe){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let xe=Ce.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&pe!==void 0&&(xe=xe[pe]),xe){Se.bindFramebuffer(N.FRAMEBUFFER,xe);try{const ye=w.texture,Le=ye.format,Ne=ye.type;if(!We.textureFormatReadable(Le))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!We.textureTypeReadable(Ne))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(U>=0&&U<=w.width-V&&B>=0&&B<=w.height-O){const Me=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,Me),N.bufferData(N.PIXEL_PACK_BUFFER,le.byteLength,N.STREAM_READ),N.readPixels(U,B,V,O,Fe.convert(Le),Fe.convert(Ne),0),N.flush();const Ke=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);await AE(N,Ke,4);try{N.bindBuffer(N.PIXEL_PACK_BUFFER,Me),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,le)}finally{N.deleteBuffer(Me),N.deleteSync(Ke)}return le}}finally{const ye=T!==null?Ce.get(T).__webglFramebuffer:null;Se.bindFramebuffer(N.FRAMEBUFFER,ye)}}},this.copyFramebufferToTexture=function(w,U=null,B=0){w.isTexture!==!0&&(wo("WebGLRenderer: copyFramebufferToTexture function signature has changed."),U=arguments[0]||null,w=arguments[1]);const V=Math.pow(2,-B),O=Math.floor(w.image.width*V),le=Math.floor(w.image.height*V),pe=U!==null?U.x:0,xe=U!==null?U.y:0;be.setTexture2D(w,0),N.copyTexSubImage2D(N.TEXTURE_2D,B,0,0,pe,xe,O,le),Se.unbindTexture()},this.copyTextureToTexture=function(w,U,B=null,V=null,O=0){w.isTexture!==!0&&(wo("WebGLRenderer: copyTextureToTexture function signature has changed."),V=arguments[0]||null,w=arguments[1],U=arguments[2],O=arguments[3]||0,B=null);let le,pe,xe,ye,Le,Ne;B!==null?(le=B.max.x-B.min.x,pe=B.max.y-B.min.y,xe=B.min.x,ye=B.min.y):(le=w.image.width,pe=w.image.height,xe=0,ye=0),V!==null?(Le=V.x,Ne=V.y):(Le=0,Ne=0);const Me=Fe.convert(U.format),Ke=Fe.convert(U.type);be.setTexture2D(U,0),N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,U.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,U.unpackAlignment);const gt=N.getParameter(N.UNPACK_ROW_LENGTH),_t=N.getParameter(N.UNPACK_IMAGE_HEIGHT),ln=N.getParameter(N.UNPACK_SKIP_PIXELS),Ze=N.getParameter(N.UNPACK_SKIP_ROWS),Ee=N.getParameter(N.UNPACK_SKIP_IMAGES),Dt=w.isCompressedTexture?w.mipmaps[O]:w.image;N.pixelStorei(N.UNPACK_ROW_LENGTH,Dt.width),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,Dt.height),N.pixelStorei(N.UNPACK_SKIP_PIXELS,xe),N.pixelStorei(N.UNPACK_SKIP_ROWS,ye),w.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,O,Le,Ne,le,pe,Me,Ke,Dt.data):w.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,O,Le,Ne,Dt.width,Dt.height,Me,Dt.data):N.texSubImage2D(N.TEXTURE_2D,O,Le,Ne,le,pe,Me,Ke,Dt),N.pixelStorei(N.UNPACK_ROW_LENGTH,gt),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,_t),N.pixelStorei(N.UNPACK_SKIP_PIXELS,ln),N.pixelStorei(N.UNPACK_SKIP_ROWS,Ze),N.pixelStorei(N.UNPACK_SKIP_IMAGES,Ee),O===0&&U.generateMipmaps&&N.generateMipmap(N.TEXTURE_2D),Se.unbindTexture()},this.copyTextureToTexture3D=function(w,U,B=null,V=null,O=0){w.isTexture!==!0&&(wo("WebGLRenderer: copyTextureToTexture3D function signature has changed."),B=arguments[0]||null,V=arguments[1]||null,w=arguments[2],U=arguments[3],O=arguments[4]||0);let le,pe,xe,ye,Le,Ne,Me,Ke,gt;const _t=w.isCompressedTexture?w.mipmaps[O]:w.image;B!==null?(le=B.max.x-B.min.x,pe=B.max.y-B.min.y,xe=B.max.z-B.min.z,ye=B.min.x,Le=B.min.y,Ne=B.min.z):(le=_t.width,pe=_t.height,xe=_t.depth,ye=0,Le=0,Ne=0),V!==null?(Me=V.x,Ke=V.y,gt=V.z):(Me=0,Ke=0,gt=0);const ln=Fe.convert(U.format),Ze=Fe.convert(U.type);let Ee;if(U.isData3DTexture)be.setTexture3D(U,0),Ee=N.TEXTURE_3D;else if(U.isDataArrayTexture||U.isCompressedArrayTexture)be.setTexture2DArray(U,0),Ee=N.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,U.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,U.unpackAlignment);const Dt=N.getParameter(N.UNPACK_ROW_LENGTH),Qe=N.getParameter(N.UNPACK_IMAGE_HEIGHT),Rn=N.getParameter(N.UNPACK_SKIP_PIXELS),Ir=N.getParameter(N.UNPACK_SKIP_ROWS),cn=N.getParameter(N.UNPACK_SKIP_IMAGES);N.pixelStorei(N.UNPACK_ROW_LENGTH,_t.width),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,_t.height),N.pixelStorei(N.UNPACK_SKIP_PIXELS,ye),N.pixelStorei(N.UNPACK_SKIP_ROWS,Le),N.pixelStorei(N.UNPACK_SKIP_IMAGES,Ne),w.isDataTexture||w.isData3DTexture?N.texSubImage3D(Ee,O,Me,Ke,gt,le,pe,xe,ln,Ze,_t.data):U.isCompressedArrayTexture?N.compressedTexSubImage3D(Ee,O,Me,Ke,gt,le,pe,xe,ln,_t.data):N.texSubImage3D(Ee,O,Me,Ke,gt,le,pe,xe,ln,Ze,_t),N.pixelStorei(N.UNPACK_ROW_LENGTH,Dt),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,Qe),N.pixelStorei(N.UNPACK_SKIP_PIXELS,Rn),N.pixelStorei(N.UNPACK_SKIP_ROWS,Ir),N.pixelStorei(N.UNPACK_SKIP_IMAGES,cn),O===0&&U.generateMipmaps&&N.generateMipmap(Ee),Se.unbindTexture()},this.initRenderTarget=function(w){Ce.get(w).__webglFramebuffer===void 0&&be.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?be.setTextureCube(w,0):w.isData3DTexture?be.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?be.setTexture2DArray(w,0):be.setTexture2D(w,0),Se.unbindTexture()},this.resetState=function(){b=0,A=0,T=null,Se.reset(),He.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return di}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const n=this.getContext();n.drawingBufferColorSpace=e===fh?"display-p3":"srgb",n.unpackColorSpace=Je.workingColorSpace===hc?"display-p3":"srgb"}}class mh{constructor(e,n=1,i=1e3){this.isFog=!0,this.name="",this.color=new Be(e),this.near=n,this.far=i}clone(){return new mh(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class FC extends Ft{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ei,this.environmentIntensity=1,this.environmentRotation=new ei,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}class OC extends $t{constructor(e=null,n=1,i=1,r,s,o,a,l,c=tn,f=tn,d,h){super(null,o,a,l,c,f,r,s,d,h),this.isDataTexture=!0,this.image={data:e,width:n,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class gc extends Ws{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Be(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Wl=new F,jl=new F,Vm=new pt,oo=new dh,Wa=new pc,Mu=new F,Gm=new F;class zC extends Ft{constructor(e=new Vn,n=new gc){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,i=[0];for(let r=1,s=n.count;r<s;r++)Wl.fromBufferAttribute(n,r-1),jl.fromBufferAttribute(n,r),i[r]=i[r-1],i[r]+=Wl.distanceTo(jl);e.setAttribute("lineDistance",new an(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,n){const i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Wa.copy(i.boundingSphere),Wa.applyMatrix4(r),Wa.radius+=s,e.ray.intersectsSphere(Wa)===!1)return;Vm.copy(r).invert(),oo.copy(e.ray).applyMatrix4(Vm);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,f=i.index,h=i.attributes.position;if(f!==null){const p=Math.max(0,o.start),v=Math.min(f.count,o.start+o.count);for(let x=p,m=v-1;x<m;x+=c){const u=f.getX(x),_=f.getX(x+1),g=ja(this,e,oo,l,u,_);g&&n.push(g)}if(this.isLineLoop){const x=f.getX(v-1),m=f.getX(p),u=ja(this,e,oo,l,x,m);u&&n.push(u)}}else{const p=Math.max(0,o.start),v=Math.min(h.count,o.start+o.count);for(let x=p,m=v-1;x<m;x+=c){const u=ja(this,e,oo,l,x,x+1);u&&n.push(u)}if(this.isLineLoop){const x=ja(this,e,oo,l,v-1,p);x&&n.push(x)}}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function ja(t,e,n,i,r,s){const o=t.geometry.attributes.position;if(Wl.fromBufferAttribute(o,r),jl.fromBufferAttribute(o,s),n.distanceSqToSegment(Wl,jl,Mu,Gm)>i)return;Mu.applyMatrix4(t.matrixWorld);const l=e.ray.origin.distanceTo(Mu);if(!(l<e.near||l>e.far))return{distance:l,point:Gm.clone().applyMatrix4(t.matrixWorld),index:r,face:null,faceIndex:null,object:t}}const Wm=new F,jm=new F;class gh extends zC{constructor(e,n){super(e,n),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,i=[];for(let r=0,s=n.count;r<s;r+=2)Wm.fromBufferAttribute(n,r),jm.fromBufferAttribute(n,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+Wm.distanceTo(jm);e.setAttribute("lineDistance",new an(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class kC extends Ws{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Be(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Be(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Gv,this.normalScale=new De(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ei,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class BC extends kC{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new De(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Gt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(n){this.ior=(1+.4*n)/(1-.4*n)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Be(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Be(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Be(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class _h extends Ft{constructor(e,n=1){super(),this.isLight=!0,this.type="Light",this.color=new Be(e),this.intensity=n}dispose(){}copy(e,n){return super.copy(e,n),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const n=super.toJSON(e);return n.object.color=this.color.getHex(),n.object.intensity=this.intensity,this.groundColor!==void 0&&(n.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(n.object.distance=this.distance),this.angle!==void 0&&(n.object.angle=this.angle),this.decay!==void 0&&(n.object.decay=this.decay),this.penumbra!==void 0&&(n.object.penumbra=this.penumbra),this.shadow!==void 0&&(n.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(n.object.target=this.target.uuid),n}}const Eu=new pt,Xm=new F,Ym=new F;class c0{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new De(512,512),this.map=null,this.mapPass=null,this.matrix=new pt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new hh,this._frameExtents=new De(1,1),this._viewportCount=1,this._viewports=[new at(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const n=this.camera,i=this.matrix;Xm.setFromMatrixPosition(e.matrixWorld),n.position.copy(Xm),Ym.setFromMatrixPosition(e.target.matrixWorld),n.lookAt(Ym),n.updateMatrixWorld(),Eu.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Eu),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Eu)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const $m=new pt,ao=new F,wu=new F;class HC extends c0{constructor(){super(new hn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new De(4,2),this._viewportCount=6,this._viewports=[new at(2,1,1,1),new at(0,1,1,1),new at(3,1,1,1),new at(1,1,1,1),new at(3,0,1,1),new at(1,0,1,1)],this._cubeDirections=[new F(1,0,0),new F(-1,0,0),new F(0,0,1),new F(0,0,-1),new F(0,1,0),new F(0,-1,0)],this._cubeUps=[new F(0,1,0),new F(0,1,0),new F(0,1,0),new F(0,1,0),new F(0,0,1),new F(0,0,-1)]}updateMatrices(e,n=0){const i=this.camera,r=this.matrix,s=e.distance||i.far;s!==i.far&&(i.far=s,i.updateProjectionMatrix()),ao.setFromMatrixPosition(e.matrixWorld),i.position.copy(ao),wu.copy(i.position),wu.add(this._cubeDirections[n]),i.up.copy(this._cubeUps[n]),i.lookAt(wu),i.updateMatrixWorld(),r.makeTranslation(-ao.x,-ao.y,-ao.z),$m.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix($m)}}class VC extends _h{constructor(e,n,i=0,r=2){super(e,n),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=r,this.shadow=new HC}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,n){return super.copy(e,n),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class GC extends c0{constructor(){super(new i0(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Tu extends _h{constructor(e,n){super(e,n),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ft.DEFAULT_UP),this.updateMatrix(),this.target=new Ft,this.shadow=new GC}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class WC extends _h{constructor(e,n){super(e,n),this.isAmbientLight=!0,this.type="AmbientLight"}}class jC{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=qm(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const n=qm();e=(n-this.oldTime)/1e3,this.oldTime=n,this.elapsedTime+=e}return e}}function qm(){return(typeof performance>"u"?Date:performance).now()}class Km{constructor(e=1,n=0,i=0){return this.radius=e,this.phi=n,this.theta=i,this}set(e,n,i){return this.radius=e,this.phi=n,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,n,i){return this.radius=Math.sqrt(e*e+n*n+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(Gt(n/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class XC extends gh{constructor(e=10,n=10,i=4473924,r=8947848){i=new Be(i),r=new Be(r);const s=n/2,o=e/n,a=e/2,l=[],c=[];for(let h=0,p=0,v=-a;h<=n;h++,v+=o){l.push(-a,0,v,a,0,v),l.push(v,0,-a,v,0,a);const x=h===s?i:r;x.toArray(c,p),p+=3,x.toArray(c,p),p+=3,x.toArray(c,p),p+=3,x.toArray(c,p),p+=3}const f=new Vn;f.setAttribute("position",new an(l,3)),f.setAttribute("color",new an(c,3));const d=new gc({vertexColors:!0,toneMapped:!1});super(f,d),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}class YC extends gh{constructor(e=1){const n=[0,0,0,e,0,0,0,0,0,0,e,0,0,0,0,0,0,e],i=[1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],r=new Vn;r.setAttribute("position",new an(n,3)),r.setAttribute("color",new an(i,3));const s=new gc({vertexColors:!0,toneMapped:!1});super(r,s),this.type="AxesHelper"}setColors(e,n,i){const r=new Be,s=this.geometry.attributes.color.array;return r.set(e),r.toArray(s,0),r.toArray(s,3),r.set(n),r.toArray(s,6),r.toArray(s,9),r.set(i),r.toArray(s,12),r.toArray(s,15),this.geometry.attributes.color.needsUpdate=!0,this}dispose(){this.geometry.dispose(),this.material.dispose()}}class $C extends Dr{constructor(e,n){super(),this.object=e,this.domElement=n,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ih}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ih);const Zm={type:"change"},vh={type:"start"},u0={type:"end"},Xa=new dh,Qm=new Ni,qC=Math.cos(70*wE.DEG2RAD),wt=new F,Qt=2*Math.PI,tt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Au=1e-6;class KC extends $C{constructor(e,n=null){super(e,n),this.state=tt.NONE,this.enabled=!0,this.target=new F,this.cursor=new F,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:xs.ROTATE,MIDDLE:xs.DOLLY,RIGHT:xs.PAN},this.touches={ONE:fs.ROTATE,TWO:fs.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new F,this._lastQuaternion=new Pr,this._lastTargetPosition=new F,this._quat=new Pr().setFromUnitVectors(e.up,new F(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Km,this._sphericalDelta=new Km,this._scale=1,this._panOffset=new F,this._rotateStart=new De,this._rotateEnd=new De,this._rotateDelta=new De,this._panStart=new De,this._panEnd=new De,this._panDelta=new De,this._dollyStart=new De,this._dollyEnd=new De,this._dollyDelta=new De,this._dollyDirection=new F,this._mouse=new De,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=QC.bind(this),this._onPointerDown=ZC.bind(this),this._onPointerUp=JC.bind(this),this._onContextMenu=ob.bind(this),this._onMouseWheel=nb.bind(this),this._onKeyDown=ib.bind(this),this._onTouchStart=rb.bind(this),this._onTouchMove=sb.bind(this),this._onMouseDown=eb.bind(this),this._onMouseMove=tb.bind(this),this._interceptControlDown=ab.bind(this),this._interceptControlUp=lb.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Zm),this.update(),this.state=tt.NONE}update(e=null){const n=this.object.position;wt.copy(n).sub(this.target),wt.applyQuaternion(this._quat),this._spherical.setFromVector3(wt),this.autoRotate&&this.state===tt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,r=this.maxAzimuthAngle;isFinite(i)&&isFinite(r)&&(i<-Math.PI?i+=Qt:i>Math.PI&&(i-=Qt),r<-Math.PI?r+=Qt:r>Math.PI&&(r-=Qt),i<=r?this._spherical.theta=Math.max(i,Math.min(r,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+r)/2?Math.max(i,this._spherical.theta):Math.min(r,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let s=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),s=o!=this._spherical.radius}if(wt.setFromSpherical(this._spherical),wt.applyQuaternion(this._quatInverse),n.copy(this.target).add(wt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=wt.length();o=this._clampDistance(a*this._scale);const l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),s=!!l}else if(this.object.isOrthographicCamera){const a=new F(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),s=l!==this.object.zoom;const c=new F(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=wt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Xa.origin.copy(this.object.position),Xa.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Xa.direction))<qC?this.object.lookAt(this.target):(Qm.setFromNormalAndCoplanarPoint(this.object.up,this.target),Xa.intersectPlane(Qm,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),s=!0)}return this._scale=1,this._performCursorZoom=!1,s||this._lastPosition.distanceToSquared(this.object.position)>Au||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Au||this._lastTargetPosition.distanceToSquared(this.target)>Au?(this.dispatchEvent(Zm),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Qt/60*this.autoRotateSpeed*e:Qt/60/60*this.autoRotateSpeed}_getZoomScale(e){const n=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*n)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,n){wt.setFromMatrixColumn(n,0),wt.multiplyScalar(-e),this._panOffset.add(wt)}_panUp(e,n){this.screenSpacePanning===!0?wt.setFromMatrixColumn(n,1):(wt.setFromMatrixColumn(n,0),wt.crossVectors(this.object.up,wt)),wt.multiplyScalar(e),this._panOffset.add(wt)}_pan(e,n){const i=this.domElement;if(this.object.isPerspectiveCamera){const r=this.object.position;wt.copy(r).sub(this.target);let s=wt.length();s*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*s/i.clientHeight,this.object.matrix),this._panUp(2*n*s/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(n*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,n){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),r=e-i.left,s=n-i.top,o=i.width,a=i.height;this._mouse.x=r/o*2-1,this._mouse.y=-(s/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const n=this.domElement;this._rotateLeft(Qt*this._rotateDelta.x/n.clientHeight),this._rotateUp(Qt*this._rotateDelta.y/n.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let n=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateUp(Qt*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,this.keyPanSpeed),n=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateUp(-Qt*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,-this.keyPanSpeed),n=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateLeft(Qt*this.rotateSpeed/this.domElement.clientHeight):this._pan(this.keyPanSpeed,0),n=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateLeft(-Qt*this.rotateSpeed/this.domElement.clientHeight):this._pan(-this.keyPanSpeed,0),n=!0;break}n&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),i=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateStart.set(i,r)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),i=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._panStart.set(i,r)}}_handleTouchStartDolly(e){const n=this._getSecondPointerPosition(e),i=e.pageX-n.x,r=e.pageY-n.y,s=Math.sqrt(i*i+r*r);this._dollyStart.set(0,s)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),r=.5*(e.pageX+i.x),s=.5*(e.pageY+i.y);this._rotateEnd.set(r,s)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const n=this.domElement;this._rotateLeft(Qt*this._rotateDelta.x/n.clientHeight),this._rotateUp(Qt*this._rotateDelta.y/n.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),i=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._panEnd.set(i,r)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const n=this._getSecondPointerPosition(e),i=e.pageX-n.x,r=e.pageY-n.y,s=Math.sqrt(i*i+r*r);this._dollyEnd.set(0,s),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(e.pageX+n.x)*.5,a=(e.pageY+n.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let n=0;n<this._pointers.length;n++)if(this._pointers[n]==e.pointerId){this._pointers.splice(n,1);return}}_isTrackingPointer(e){for(let n=0;n<this._pointers.length;n++)if(this._pointers[n]==e.pointerId)return!0;return!1}_trackPointer(e){let n=this._pointerPositions[e.pointerId];n===void 0&&(n=new De,this._pointerPositions[e.pointerId]=n),n.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const n=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[n]}_customWheelEvent(e){const n=e.deltaMode,i={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(n){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function ZC(t){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(t.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(t)&&(this._addPointer(t),t.pointerType==="touch"?this._onTouchStart(t):this._onMouseDown(t)))}function QC(t){this.enabled!==!1&&(t.pointerType==="touch"?this._onTouchMove(t):this._onMouseMove(t))}function JC(t){switch(this._removePointer(t),this._pointers.length){case 0:this.domElement.releasePointerCapture(t.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(u0),this.state=tt.NONE;break;case 1:const e=this._pointers[0],n=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:n.x,pageY:n.y});break}}function eb(t){let e;switch(t.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case xs.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(t),this.state=tt.DOLLY;break;case xs.ROTATE:if(t.ctrlKey||t.metaKey||t.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(t),this.state=tt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(t),this.state=tt.ROTATE}break;case xs.PAN:if(t.ctrlKey||t.metaKey||t.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(t),this.state=tt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(t),this.state=tt.PAN}break;default:this.state=tt.NONE}this.state!==tt.NONE&&this.dispatchEvent(vh)}function tb(t){switch(this.state){case tt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(t);break;case tt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(t);break;case tt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(t);break}}function nb(t){this.enabled===!1||this.enableZoom===!1||this.state!==tt.NONE||(t.preventDefault(),this.dispatchEvent(vh),this._handleMouseWheel(this._customWheelEvent(t)),this.dispatchEvent(u0))}function ib(t){this.enabled===!1||this.enablePan===!1||this._handleKeyDown(t)}function rb(t){switch(this._trackPointer(t),this._pointers.length){case 1:switch(this.touches.ONE){case fs.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(t),this.state=tt.TOUCH_ROTATE;break;case fs.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(t),this.state=tt.TOUCH_PAN;break;default:this.state=tt.NONE}break;case 2:switch(this.touches.TWO){case fs.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(t),this.state=tt.TOUCH_DOLLY_PAN;break;case fs.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(t),this.state=tt.TOUCH_DOLLY_ROTATE;break;default:this.state=tt.NONE}break;default:this.state=tt.NONE}this.state!==tt.NONE&&this.dispatchEvent(vh)}function sb(t){switch(this._trackPointer(t),this.state){case tt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(t),this.update();break;case tt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(t),this.update();break;case tt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(t),this.update();break;case tt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(t),this.update();break;default:this.state=tt.NONE}}function ob(t){this.enabled!==!1&&t.preventDefault()}function ab(t){t.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function lb(t){t.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const cb=`
  uniform float uTime;
  uniform float uAmplitude;
  uniform float uThickness;
  uniform bool uShowModeShape;
  uniform int uGridSizeX;
  uniform int uGridSizeY;
  uniform sampler2D uModeShapeTexture;

  varying vec3 vNormal;
  varying float vDisplacement;
  varying vec2 vUv;
  varying vec3 vPosition;

  // 骨骼影响权重（蒙皮权重）
  attribute vec4 skinWeight;
  attribute vec4 skinIndex;

  void main() {
    vUv = uv;
    vPosition = position;
    vNormal = normal;

    vec3 pos = position;

    if (uShowModeShape) {
      // 从振型纹理中采样位移
      vec2 modeUV = vec2(
        float(int(gl_VertexID) % uGridSizeX) / float(uGridSizeX - 1),
        float(int(gl_VertexID) / uGridSizeX) / float(uGridSizeY - 1)
      );
      float modeVal = texture2D(uModeShapeTexture, modeUV).r;

      // 振动动画: sin(ωt)调制
      float vibration = sin(uTime * 3.0 + position.x * 5.0 + position.y * 5.0) * 0.5 + 0.5;
      float displacement = modeVal * uAmplitude * vibration;

      // 沿法线方向位移
      pos += normal * displacement;
      vDisplacement = modeVal;

      // 骨骼蒙皮（简化版）
      vec4 skinPos = vec4(pos, 1.0);
      float totalWeight = skinWeight.x + skinWeight.y + skinWeight.z + skinWeight.w;
      if (totalWeight > 0.0) {
        pos = skinPos.xyz;
      }
    } else {
      pos.z += uThickness / 2.0;
      vDisplacement = 0.0;
    }

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`,ub=`
  uniform bool uShowContourLines;
  uniform float uContourLevels;
  uniform float uDisplacementMin;
  uniform float uDisplacementMax;

  varying vec3 vNormal;
  varying float vDisplacement;
  varying vec2 vUv;
  varying vec3 vPosition;

  // 彩虹色映射函数
  vec3 rainbowColor(float t) {
    t = clamp(t, 0.0, 1.0);
    vec3 c = vec3(0.0);

    // 蓝 -> 青 -> 绿 -> 黄 -> 红
    if (t < 0.25) {
      c = mix(vec3(0.0, 0.0, 1.0), vec3(0.0, 1.0, 1.0), t / 0.25);
    } else if (t < 0.5) {
      c = mix(vec3(0.0, 1.0, 1.0), vec3(0.0, 1.0, 0.0), (t - 0.25) / 0.25);
    } else if (t < 0.75) {
      c = mix(vec3(0.0, 1.0, 0.0), vec3(1.0, 1.0, 0.0), (t - 0.5) / 0.25);
    } else {
      c = mix(vec3(1.0, 1.0, 0.0), vec3(1.0, 0.0, 0.0), (t - 0.75) / 0.25);
    }

    return c;
  }

  // 等高线计算
  float computeContour(float displacement, float levels) {
    float range = uDisplacementMax - uDisplacementMin;
    if (range < 0.001) return 0.0;

    float normalized = (displacement - uDisplacementMin) / range;
    float scaled = normalized * levels;
    float frac = fract(scaled);
    float lineWidth = 0.08;

    // 计算到最近等高线的距离
    float distToLine = min(frac, 1.0 - frac);
    float edgeFactor = smoothstep(lineWidth, lineWidth * 2.0, distToLine);

    return 1.0 - edgeFactor;
  }

  void main() {
    vec3 baseColor = vec3(0.79, 0.66, 0.43); // 古铜色 #c9a96e

    vec3 finalColor = baseColor;
    float alpha = 0.95;

    if (uShowContourLines) {
      // 彩色位移映射
      float range = uDisplacementMax - uDisplacementMin;
      float t = range > 0.001 ? (vDisplacement - uDisplacementMin) / range : 0.5;
      vec3 displacementColor = rainbowColor(t);

      // 等高线
      float contour = computeContour(vDisplacement, uContourLevels);
      vec3 contourColor = vec3(1.0, 1.0, 1.0);

      // 混合: 位移颜色 + 白色等高线
      finalColor = mix(displacementColor, contourColor, contour * 0.8);
    }

    // 简单光照
    vec3 lightDir = normalize(vec3(0.5, 1.0, 0.8));
    float diff = max(dot(vNormal, lightDir), 0.0);
    vec3 ambient = vec3(0.3);
    vec3 diffuse = diff * vec3(1.0);
    vec3 lighting = ambient + diffuse * 0.7;

    finalColor *= lighting;

    gl_FragColor = vec4(finalColor, alpha);
  }
`;function fb({stone:t,modeShape:e=[],modeIndex:n=0,showModeShape:i=!1,showContourLines:r=!1,isAnimating:s=!1}){const o=W.useRef(null),a=W.useRef(null),l=W.useRef(null),c=W.useRef(null),f=W.useRef(null),d=W.useRef(null),h=W.useRef(0),p=W.useRef(null),v=W.useRef(null),x=W.useRef(null),m=W.useRef(new jC),[u,_]=W.useState(!1),g=W.useCallback(b=>{var y;const A=b.length,T=((y=b[0])==null?void 0:y.length)||0;if(T===0||A===0)return null;const C=new Float32Array(T*A);for(let L=0;L<A;L++)for(let H=0;H<T;H++)C[L*T+H]=b[L][H];const E=new OC(C,T,A,ah,Kn);return E.needsUpdate=!0,E.magFilter=pn,E.minFilter=pn,E},[]),S=(b,A,T)=>{const C=b*A,E=new Float32Array(C*4),y=new Float32Array(C*4);for(let L=0;L<A;L++)for(let H=0;H<b;H++){const z=(L*b+H)*4,Y=H/(b-1),X=L/(A-1),G=(1-Y)*(1-X),q=Y*(1-X),D=Y*X,$=(1-Y)*X;E[z]=G,E[z+1]=q,E[z+2]=D,E[z+3]=$,y[z]=0,y[z+1]=1,y[z+2]=2,y[z+3]=3}T.setAttribute("skinWeight",new An(E,4)),T.setAttribute("skinIndex",new An(y,4))};return W.useEffect(()=>{if(!o.current)return;const b=new FC;b.background=new Be(1710638),b.fog=new mh(1710638,10,30),a.current=b;const A=o.current.clientWidth,T=o.current.clientHeight,C=new hn(45,A/T,.1,100);C.position.set(3,2,4),l.current=C;const E=new UC({antialias:!0});E.setSize(A,T),E.setPixelRatio(Math.min(window.devicePixelRatio,2)),E.shadowMap.enabled=!0,E.shadowMap.type=Pv,E.toneMapping=Nv,E.toneMappingExposure=1.2,o.current.appendChild(E.domElement),c.current=E;const y=new KC(C,E.domElement);y.enableDamping=!0,y.dampingFactor=.05,y.minDistance=2,y.maxDistance=15,y.maxPolarAngle=Math.PI/1.5,f.current=y;const L=new WC(16777215,.4);b.add(L);const H=new Tu(16777215,1);H.position.set(5,10,5),H.castShadow=!0,H.shadow.mapSize.width=2048,H.shadow.mapSize.height=2048,H.shadow.camera.near=.5,H.shadow.camera.far=50,b.add(H);const z=new Tu(13216110,.5);z.position.set(-5,3,-5),b.add(z);const Y=new Tu(10914642,.3);Y.position.set(0,5,-10),b.add(Y);const X=new VC(13216110,.8,20);X.position.set(0,5,3),b.add(X);const G=new XC(10,20,13216110,2960714);G.position.y=-1,b.add(G);const q=new YC(.5);q.position.set(-4,-.9,-4),b.add(q);const D=()=>{if(h.current=requestAnimationFrame(D),y.update(),v.current&&s){const K=m.current.getElapsedTime();v.current.uniforms.uTime.value=K}E.render(b,C)};D();const $=()=>{if(!o.current)return;const K=o.current.clientWidth,se=o.current.clientHeight;C.aspect=K/se,C.updateProjectionMatrix(),E.setSize(K,se)};return window.addEventListener("resize",$),()=>{window.removeEventListener("resize",$),cancelAnimationFrame(h.current),E.dispose(),o.current&&E.domElement&&o.current.removeChild(E.domElement)}},[s]),W.useEffect(()=>{var G,q,D,$,K,se;if(!a.current||!t)return;d.current&&(a.current.remove(d.current),d.current.geometry.dispose(),v.current&&v.current.dispose(),x.current&&x.current.dispose()),p.current&&(a.current.remove(p.current),p.current.geometry.dispose(),p.current.material.dispose());const b=t.length/100,A=t.width/100,T=(((G=t.thickness_profile)==null?void 0:G[0])||.05)/10,C=(e==null?void 0:e.length)||20,E=((q=e[0])==null?void 0:q.length)||10;e&&e.length>0&&(x.current=g(e));const y=new ta(b,A,C-1,E-1);y.rotateX(-Math.PI/2),S(C,E,y);let L=-.3,H=.3;if(e&&e.length>0){const J=e.flat();L=Math.min(...J),H=Math.max(...J)}const z=new xi({vertexShader:cb,fragmentShader:ub,uniforms:{uTime:{value:0},uAmplitude:{value:.15*(n+1)*.5},uThickness:{value:T},uShowModeShape:{value:i},uShowContourLines:{value:r},uGridSizeX:{value:C},uGridSizeY:{value:E},uModeShapeTexture:{value:x.current},uContourLevels:{value:10},uDisplacementMin:{value:L},uDisplacementMax:{value:H}},vertexColors:!i,side:On,transparent:!0,opacity:.95});v.current=z;let Y;if(i)Y=z;else{Y=new BC({color:13216110,metalness:.6,roughness:.3,side:On,transparent:!0,opacity:.95,clearcoat:.3,clearcoatRoughness:.2});const J=y.attributes.position;for(let Ie=0;Ie<J.count;Ie++)J.setZ(Ie,T/2);J.needsUpdate=!0,y.computeVertexNormals()}const X=new Zn(y,Y);if(X.receiveShadow=!0,X.castShadow=!0,a.current.add(X),d.current=X,r&&e&&e.length>0&&!i){const J=new Vn,Ie=[],j=10,ie=L,he=H;for(let Re=0;Re<j;Re++){const Ae=ie+(he-ie)*(Re/(j-1));for(let $e=0;$e<C-1;$e++)for(let N=0;N<E-1;N++){const nt=((D=e[N])==null?void 0:D[$e])||0,Ge=(($=e[N])==null?void 0:$[$e+1])||0,We=((K=e[N+1])==null?void 0:K[$e])||0,Se=((se=e[N+1])==null?void 0:se[$e+1])||0,it=($e/(C-1)-.5)*b,Ce=(($e+1)/(C-1)-.5)*b,be=(N/(E-1)-.5)*A,P=((N+1)/(E-1)-.5)*A,M=[];if((nt-Ae)*(Ge-Ae)<0){const k=(Ae-nt)/(Ge-nt);M.push([it+(Ce-it)*k,be])}if((We-Ae)*(Se-Ae)<0){const k=(Ae-We)/(Se-We);M.push([it+(Ce-it)*k,P])}if((nt-Ae)*(We-Ae)<0){const k=(Ae-nt)/(We-nt);M.push([it,be+(P-be)*k])}if((Ge-Ae)*(Se-Ae)<0){const k=(Ae-Ge)/(Se-Ge);M.push([Ce,be+(P-be)*k])}if(M.length>=2){const k=.02+Re*.005;Ie.push(M[0][0],k,M[0][1],M[1][0],k,M[1][1])}}}J.setAttribute("position",new an(Ie,3));const de=new gc({color:16777215,transparent:!0,opacity:.6}),we=new gh(J,de);we.rotation.x=-Math.PI/2,a.current.add(we),p.current=we}_(i&&s)},[t,e,n,i,r,s,g]),W.useEffect(()=>{v.current&&(v.current.uniforms.uShowModeShape.value=i,v.current.uniforms.uShowContourLines.value=r)},[i,r]),R.jsx("div",{ref:o,className:"w-full h-full relative"})}function db({modeShape:t,frequency:e}){const n=W.useRef(null);return W.useEffect(()=>{var A,T;const i=n.current;if(!i)return;const r=i.getContext("2d");if(!r)return;const s=i.width,o=i.height,a=40,l=s-a*2,c=o-a*2;r.clearRect(0,0,s,o);const f=r.createLinearGradient(0,0,0,o);f.addColorStop(0,"rgba(26, 26, 46, 0.9)"),f.addColorStop(1,"rgba(22, 33, 62, 0.9)"),r.fillStyle=f,r.fillRect(0,0,s,o);const d=s/2,h=o/2,p=Math.min(l,c)/2,v=180,x=50,m=t.length,u=((A=t[0])==null?void 0:A.length)||0;for(let C=0;C<x;C++)for(let E=0;E<v;E++){const y=E/v*Math.PI*2,L=(C+.5)/x*p,H=d+Math.cos(y)*L,z=h+Math.sin(y)*L,Y=L/p,X=Math.floor((Math.cos(y)+1)/2*(m-1)),G=Math.floor((Math.sin(y)+1)/2*(u-1)),q=Math.max(0,Math.min(m-1,X)),D=Math.max(0,Math.min(u-1,G)),$=((T=t[q])==null?void 0:T[D])||0,K=Math.abs($)*(1-Y*.5),se=Math.max(0,Math.min(1,K)),J=30+se*20,Ie=60+se*30,j=20+se*50;r.fillStyle=`hsla(${J}, ${Ie}%, ${j}%, 0.8)`,r.fillRect(H-2,z-2,5,5)}r.strokeStyle="rgba(201, 169, 110, 0.4)",r.lineWidth=1;for(let C=1;C<=4;C++){const E=C/4*p;r.beginPath(),r.arc(d,h,E,0,Math.PI*2),r.stroke()}for(let C=0;C<8;C++){const E=C/8*Math.PI*2;r.beginPath(),r.moveTo(d,h),r.lineTo(d+Math.cos(E)*p,h+Math.sin(E)*p),r.stroke()}r.strokeStyle="rgba(201, 169, 110, 0.6)",r.lineWidth=2,r.beginPath(),r.arc(d,h,p,0,Math.PI*2),r.stroke();const _=s-a-20,g=a,S=c,b=16;for(let C=0;C<S;C++){const E=1-C/S,y=30+E*20,L=60+E*30,H=20+E*50;r.fillStyle=`hsl(${y}, ${L}%, ${H}%)`,r.fillRect(_,g+C,b,1)}r.strokeStyle="rgba(201, 169, 110, 0.6)",r.lineWidth=1,r.strokeRect(_,g,b,S),r.fillStyle="rgba(201, 169, 110, 0.8)",r.font='11px "Noto Sans SC", sans-serif',r.textAlign="left",r.fillText("强",_+b+6,g+10),r.fillText("弱",_+b+6,g+S-2),r.fillStyle="rgba(201, 169, 110, 0.9)",r.font='bold 13px "Noto Serif SC", serif',r.textAlign="center",r.fillText(`声辐射分布图 - ${e.toFixed(1)} Hz`,s/2,22),r.fillStyle="rgba(201, 169, 110, 0.6)",r.font='11px "Noto Sans SC", sans-serif',r.fillText("极坐标视图",d,h+p+25)},[t,e]),R.jsx("canvas",{ref:n,width:400,height:350,className:"w-full h-full"})}function hb(){const{stones:t,selectedStoneId:e,setSelectedStoneId:n,simulationResult:i,setSimulationResult:r,latestReadings:s}=Gs(),[o,a]=W.useState(0),[l,c]=W.useState(!1),[f,d]=W.useState(!1),[h,p]=W.useState(!1),[v,x]=W.useState(!1),m=t.find(C=>C.id===e)||null,u=e?s[e]:null;W.useEffect(()=>{e&&!i&&_(e)},[e]);const _=async C=>{x(!0);try{const E=await TM(C);r(E)}catch(E){console.error("Failed to load simulation result:",E)}finally{x(!1)}},g=C=>{n(C),r(null),a(0)},S=(i==null?void 0:i.mode_shapes)||[],b=(i==null?void 0:i.natural_freqs)||[],A=S[o]||[],T=b[o]||0;return R.jsxs("div",{className:"h-full flex flex-col gap-4",children:[R.jsxs("div",{className:"flex items-center justify-between",children:[R.jsx("h2",{className:"text-2xl font-serif font-bold text-bronze",children:"编磬可视化"}),R.jsxs("div",{className:"flex items-center gap-4",children:[R.jsx("label",{className:"text-bronze/80 text-sm",children:"选择编磬："}),R.jsx("select",{value:e||"",onChange:C=>g(Number(C.target.value)),className:"bg-deep-indigo border border-bronze/40 rounded px-3 py-2 text-bronze focus:outline-none focus:border-bronze",children:t.map(C=>R.jsxs("option",{value:C.id,children:[C.name," - ",C.target_pitch]},C.id))})]})]}),R.jsxs("div",{className:"flex-1 flex gap-4 min-h-0",children:[R.jsxs("div",{className:"flex-1 flex flex-col gap-4 min-h-0",children:[R.jsx("div",{className:"flex-1 card-bronze overflow-hidden min-h-0",children:R.jsx(fb,{stone:m,modeShape:A,modeIndex:o,showModeShape:l,showContourLines:f,isAnimating:h})}),R.jsxs("div",{className:"h-64 card-bronze p-4",children:[R.jsx("h3",{className:"text-lg font-serif text-bronze mb-2",children:"声辐射分布"}),R.jsx("div",{className:"h-48",children:R.jsx(db,{modeShape:A,frequency:T})})]})]}),R.jsxs("div",{className:"w-72 flex flex-col gap-4",children:[R.jsxs("div",{className:"card-bronze p-4",children:[R.jsx("h3",{className:"text-lg font-serif text-bronze mb-4",children:"编磬信息"}),m?R.jsxs("div",{className:"space-y-3 text-sm",children:[R.jsxs("div",{className:"flex justify-between",children:[R.jsx("span",{className:"text-bronze/70",children:"名称"}),R.jsx("span",{className:"text-bronze font-medium",children:m.name})]}),R.jsxs("div",{className:"flex justify-between",children:[R.jsx("span",{className:"text-bronze/70",children:"目标音高"}),R.jsx("span",{className:"text-bronze font-medium",children:m.target_pitch})]}),R.jsxs("div",{className:"flex justify-between",children:[R.jsx("span",{className:"text-bronze/70",children:"目标频率"}),R.jsxs("span",{className:"text-bronze font-mono",children:[m.target_freq.toFixed(2)," Hz"]})]}),R.jsxs("div",{className:"flex justify-between",children:[R.jsx("span",{className:"text-bronze/70",children:"长度"}),R.jsxs("span",{className:"text-bronze font-mono",children:[m.length," mm"]})]}),R.jsxs("div",{className:"flex justify-between",children:[R.jsx("span",{className:"text-bronze/70",children:"宽度"}),R.jsxs("span",{className:"text-bronze font-mono",children:[m.width," mm"]})]}),R.jsxs("div",{className:"flex justify-between",children:[R.jsx("span",{className:"text-bronze/70",children:"材质"}),R.jsx("span",{className:"text-bronze",children:m.material})]}),R.jsxs("div",{className:"flex justify-between",children:[R.jsx("span",{className:"text-bronze/70",children:"密度"}),R.jsxs("span",{className:"text-bronze font-mono",children:[m.density.toFixed(2)," kg/m³"]})]})]}):R.jsx("p",{className:"text-bronze/50 text-sm",children:"请选择编磬"})]}),u&&R.jsxs("div",{className:"card-bronze p-4",children:[R.jsx("h3",{className:"text-lg font-serif text-bronze mb-4",children:"实时数据"}),R.jsxs("div",{className:"space-y-3 text-sm",children:[R.jsxs("div",{className:"flex justify-between",children:[R.jsx("span",{className:"text-bronze/70",children:"当前频率"}),R.jsxs("span",{className:"text-bronze font-mono",children:[u.frequency.toFixed(2)," Hz"]})]}),R.jsxs("div",{className:"flex justify-between",children:[R.jsx("span",{className:"text-bronze/70",children:"音准偏差"}),R.jsxs("span",{className:`font-mono ${Math.abs(u.cents_deviation)<5?"text-jade":Math.abs(u.cents_deviation)<10?"text-yellow-500":"text-vermilion"}`,children:[u.cents_deviation>0?"+":"",u.cents_deviation.toFixed(2)," 音分"]})]})]})]}),R.jsxs("div",{className:"card-bronze p-4",children:[R.jsx("h3",{className:"text-lg font-serif text-bronze mb-4",children:"显示控制"}),R.jsxs("div",{className:"space-y-3",children:[R.jsxs("label",{className:"flex items-center gap-3 cursor-pointer",children:[R.jsx("input",{type:"checkbox",checked:l,onChange:C=>c(C.target.checked),className:"w-4 h-4 accent-bronze"}),R.jsx("span",{className:"text-bronze/90 text-sm",children:"显示振型"})]}),R.jsxs("label",{className:"flex items-center gap-3 cursor-pointer",children:[R.jsx("input",{type:"checkbox",checked:f,onChange:C=>d(C.target.checked),className:"w-4 h-4 accent-bronze"}),R.jsx("span",{className:"text-bronze/90 text-sm",children:"显示等高线"})]}),R.jsxs("label",{className:"flex items-center gap-3 cursor-pointer",children:[R.jsx("input",{type:"checkbox",checked:h,onChange:C=>p(C.target.checked),className:"w-4 h-4 accent-bronze"}),R.jsx("span",{className:"text-bronze/90 text-sm",children:"播放振动动画"})]})]})]})]})]}),R.jsxs("div",{className:"card-bronze p-4",children:[R.jsx("h3",{className:"text-lg font-serif text-bronze mb-3",children:"振型选择"}),R.jsx("div",{className:"flex gap-3 flex-wrap",children:[0,1,2,3,4,5].map(C=>R.jsxs("button",{onClick:()=>a(C),className:`px-5 py-2 rounded font-medium transition-all ${o===C?"bg-bronze text-deep-indigo shadow-bronze-glow":"bg-bronze/10 text-bronze border border-bronze/30 hover:bg-bronze/20"}`,children:["模态 ",C+1,b[C]&&R.jsxs("span",{className:"block text-xs opacity-80",children:[b[C].toFixed(1)," Hz"]})]},C))})]})]})}function pb({spectrum:t,maxFreq:e=2e3}){const n=W.useRef(null),i=W.useRef(),r=W.useRef([]);return W.useEffect(()=>{const s=n.current;if(!s)return;const o=s.getContext("2d");if(!o)return;const a=()=>{const l=s.width,c=s.height,f={top:30,right:20,bottom:40,left:50},d=l-f.left-f.right,h=c-f.top-f.bottom;o.clearRect(0,0,l,c);const p=o.createLinearGradient(0,0,0,c);p.addColorStop(0,"rgba(26, 26, 46, 0.9)"),p.addColorStop(1,"rgba(22, 33, 62, 0.9)"),o.fillStyle=p,o.fillRect(0,0,l,c),o.strokeStyle="rgba(201, 169, 110, 0.15)",o.lineWidth=1;for(let g=0;g<=5;g++){const S=f.top+h/5*g;o.beginPath(),o.moveTo(f.left,S),o.lineTo(l-f.right,S),o.stroke();const b=(1-g/5)*60;o.fillStyle="rgba(201, 169, 110, 0.6)",o.font='11px "Noto Sans SC", sans-serif',o.textAlign="right",o.fillText(`${b.toFixed(0)} dB`,f.left-8,S+4)}for(let g=0;g<=5;g++){const S=f.left+d/5*g,b=e/5*g;o.fillStyle="rgba(201, 169, 110, 0.6)",o.font='11px "Noto Sans SC", sans-serif',o.textAlign="center",o.fillText(`${b.toFixed(0)} Hz`,S,c-f.bottom+20)}const v=Math.min(t.length,128),x=d/v-1,m=t.slice(0,v),u=r.current;u.length!==v&&(r.current=new Array(v).fill(0));const _=m.map((g,S)=>{const b=u[S]||0;return b+(g-b)*.15});r.current=_;for(let g=0;g<v;g++){const b=Math.max(0,Math.min(1,_[g]))*h,A=f.left+g*(x+1),T=f.top+h-b,C=o.createLinearGradient(0,T,0,T+b);C.addColorStop(0,"#d4b87a"),C.addColorStop(.5,"#c9a96e"),C.addColorStop(1,"#a68b52"),o.fillStyle=C,o.fillRect(A,T,x,b),b>2&&(o.fillStyle="rgba(255, 255, 255, 0.3)",o.fillRect(A,T,x,2))}o.strokeStyle="rgba(201, 169, 110, 0.5)",o.lineWidth=1,o.strokeRect(f.left,f.top,d,h),o.fillStyle="rgba(201, 169, 110, 0.8)",o.font='bold 13px "Noto Serif SC", serif',o.textAlign="center",o.fillText("FFT 频谱图",l/2,20),i.current=requestAnimationFrame(a)};return a(),()=>{i.current&&cancelAnimationFrame(i.current)}},[t,e]),R.jsx("canvas",{ref:n,width:600,height:250,className:"w-full h-full"})}function mb(){const{stones:t,latestReadings:e,activeAlerts:n,selectedStoneId:i,setSelectedStoneId:r}=Gs(),s=i?e[i]:null,o=t.find(d=>d.id===i)||null,a=d=>{const h=Math.abs(d);return h<5?"text-jade":h<10?"text-yellow-500":"text-vermilion"},l=d=>{const h=Math.abs(d);return h<5?"border-jade/50 bg-jade/10":h<10?"border-yellow-500/50 bg-yellow-500/10":"border-vermilion/50 bg-vermilion/10"},c=d=>{const h=e[d.id];if(!h)return"unknown";const p=Math.abs(h.cents_deviation);return p<5?"good":p<10?"warning":"error"},f=[{label:"当前频率",value:s?`${s.frequency.toFixed(2)} Hz`:"--",subtext:o?`目标: ${o.target_freq.toFixed(2)} Hz`:"",icon:"🎵"},{label:"音准偏差",value:s?`${s.cents_deviation>0?"+":""}${s.cents_deviation.toFixed(2)} 音分`:"--",subtext:"标准: ±5 音分",color:s?a(s.cents_deviation):"",icon:"📏"},{label:"密度",value:s!=null&&s.density_map?`${(s.density_map.reduce((d,h)=>d+h,0)/s.density_map.length).toFixed(2)} kg/m³`:o?`${o.density.toFixed(2)} kg/m³`:"--",subtext:"平均密度",icon:"⚖️"},{label:"尺寸",value:s!=null&&s.dimensions?`${s.dimensions.length}×${s.dimensions.width}×${s.dimensions.thickness} mm`:o?`${o.length}×${o.width} mm`:"--",subtext:"长×宽×厚",icon:"📐"}];return R.jsxs("div",{className:"h-full flex flex-col gap-4",children:[R.jsxs("div",{className:"flex items-center justify-between",children:[R.jsx("h2",{className:"text-2xl font-serif font-bold text-bronze",children:"实时监测"}),R.jsxs("div",{className:"flex items-center gap-2",children:[R.jsx("div",{className:"w-2 h-2 rounded-full bg-jade animate-pulse"}),R.jsx("span",{className:"text-jade text-sm",children:"实时数据"})]})]}),R.jsx("div",{className:"grid grid-cols-4 gap-4",children:f.map((d,h)=>R.jsx("div",{className:"card-bronze p-4",children:R.jsxs("div",{className:"flex items-start justify-between",children:[R.jsxs("div",{children:[R.jsx("p",{className:"text-bronze/70 text-sm mb-1",children:d.label}),R.jsx("p",{className:`text-xl font-bold font-mono ${d.color||"text-bronze"}`,children:d.value}),d.subtext&&R.jsx("p",{className:"text-bronze/50 text-xs mt-1",children:d.subtext})]}),R.jsx("span",{className:"text-2xl",children:d.icon})]})},h))}),R.jsxs("div",{className:"flex-1 flex gap-4 min-h-0",children:[R.jsxs("div",{className:"flex-1 card-bronze p-4 flex flex-col",children:[R.jsx("h3",{className:"text-lg font-serif text-bronze mb-3",children:"FFT 频谱图"}),R.jsx("div",{className:"flex-1 min-h-0",children:R.jsx(pb,{spectrum:(s==null?void 0:s.spectrum)||new Array(128).fill(0),maxFreq:2e3})})]}),R.jsxs("div",{className:"w-80 card-bronze p-4 flex flex-col",children:[R.jsxs("h3",{className:"text-lg font-serif text-bronze mb-3",children:["警报列表",n.length>0&&R.jsx("span",{className:"ml-2 px-2 py-0.5 bg-vermilion/20 text-vermilion text-xs rounded-full",children:n.length})]}),R.jsx("div",{className:"flex-1 overflow-y-auto space-y-2",children:n.length===0?R.jsx("p",{className:"text-bronze/50 text-sm text-center py-8",children:"暂无警报"}):n.slice(0,15).map(d=>R.jsxs("div",{className:"p-3 rounded border bg-black/20 border-vermilion/30",children:[R.jsxs("div",{className:"flex justify-between items-start",children:[R.jsx("span",{className:"text-sm text-white/90",children:d.message}),R.jsxs("span",{className:"text-vermilion text-xs font-mono",children:[d.cents_deviation.toFixed(1)," 音分"]})]}),R.jsx("p",{className:"text-bronze/50 text-xs mt-1",children:new Date(d.created_at).toLocaleTimeString("zh-CN")})]},d.id))})]})]}),R.jsxs("div",{className:"card-bronze p-4",children:[R.jsx("h3",{className:"text-lg font-serif text-bronze mb-3",children:"编磬状态"}),R.jsx("div",{className:"grid grid-cols-8 gap-2",children:t.map(d=>{const h=c(d),p=e[d.id],v=d.id===i;return R.jsxs("button",{onClick:()=>r(d.id),className:`p-3 rounded-lg border transition-all text-left ${v?"border-bronze bg-bronze/20 shadow-bronze-glow":l((p==null?void 0:p.cents_deviation)||0)} hover:scale-105`,children:[R.jsxs("div",{className:"flex items-center gap-2 mb-1",children:[R.jsx("div",{className:`w-2 h-2 rounded-full ${h==="good"?"bg-jade":h==="warning"?"bg-yellow-500":h==="error"?"bg-vermilion animate-pulse":"bg-gray-500"}`}),R.jsx("span",{className:"text-sm font-medium text-bronze truncate",children:d.name})]}),R.jsx("p",{className:"text-xs text-bronze/70",children:d.target_pitch}),p&&R.jsxs("p",{className:`text-xs font-mono mt-1 ${a(p.cents_deviation)}`,children:[p.cents_deviation>0?"+":"",p.cents_deviation.toFixed(1)," 音分"]})]},d.id)})})]})]})}function gb({history:t}){const e=W.useRef(null);return W.useEffect(()=>{const n=e.current;if(!n)return;const i=n.getContext("2d");if(!i)return;const r=n.width,s=n.height,o={top:30,right:20,bottom:40,left:60},a=r-o.left-o.right,l=s-o.top-o.bottom;i.clearRect(0,0,r,s);const c=i.createLinearGradient(0,0,0,s);c.addColorStop(0,"rgba(26, 26, 46, 0.9)"),c.addColorStop(1,"rgba(22, 33, 62, 0.9)"),i.fillStyle=c,i.fillRect(0,0,r,s),i.strokeStyle="rgba(201, 169, 110, 0.15)",i.lineWidth=1;for(let f=0;f<=5;f++){const d=o.top+l/5*f;i.beginPath(),i.moveTo(o.left,d),i.lineTo(r-o.right,d),i.stroke()}if(t.length>1){const f=Math.max(...t)*1.1,d=Math.min(...t)*.9,h=f-d||1,p=t.map((u,_)=>{const g=o.left+_/(t.length-1)*a,S=o.top+(1-(u-d)/h)*l;return{x:g,y:S}}),v=i.createLinearGradient(o.left,0,r-o.right,0);v.addColorStop(0,"#c84b31"),v.addColorStop(1,"#c9a96e"),i.strokeStyle=v,i.lineWidth=2,i.beginPath(),i.moveTo(p[0].x,p[0].y);for(let u=1;u<p.length;u++)i.lineTo(p[u].x,p[u].y);i.stroke();const x=i.createLinearGradient(0,o.top,0,s-o.bottom);x.addColorStop(0,"rgba(201, 169, 110, 0.3)"),x.addColorStop(1,"rgba(201, 169, 110, 0.0)"),i.fillStyle=x,i.beginPath(),i.moveTo(p[0].x,s-o.bottom);for(let u=0;u<p.length;u++)i.lineTo(p[u].x,p[u].y);i.lineTo(p[p.length-1].x,s-o.bottom),i.closePath(),i.fill();for(let u=0;u<=5;u++){const _=o.top+l/5*u,g=f-h/5*u;i.fillStyle="rgba(201, 169, 110, 0.6)",i.font='11px "Noto Sans SC", sans-serif',i.textAlign="right",i.fillText(g.toFixed(2),o.left-8,_+4)}const m=p[p.length-1];i.fillStyle="#c9a96e",i.beginPath(),i.arc(m.x,m.y,5,0,Math.PI*2),i.fill()}i.strokeStyle="rgba(201, 169, 110, 0.5)",i.lineWidth=1,i.strokeRect(o.left,o.top,a,l),i.fillStyle="rgba(201, 169, 110, 0.8)",i.font='bold 13px "Noto Serif SC", serif',i.textAlign="center",i.fillText("收敛曲线",r/2,20),i.fillStyle="rgba(201, 169, 110, 0.6)",i.font='11px "Noto Sans SC", sans-serif',i.fillText("迭代次数",r/2,s-10),i.save(),i.translate(15,s/2),i.rotate(-Math.PI/2),i.textAlign="center",i.fillText("损失值",0,0),i.restore()},[t]),R.jsx("canvas",{ref:e,width:500,height:250,className:"w-full h-full"})}function _b({before:t,after:e}){const n=W.useRef(null);return W.useEffect(()=>{const i=n.current;if(!i)return;const r=i.getContext("2d");if(!r)return;const s=i.width,o=i.height,a={top:30,right:20,bottom:40,left:50},l=s-a.left-a.right,c=o-a.top-a.bottom;r.clearRect(0,0,s,o);const f=r.createLinearGradient(0,0,0,o);f.addColorStop(0,"rgba(26, 26, 46, 0.9)"),f.addColorStop(1,"rgba(22, 33, 62, 0.9)"),r.fillStyle=f,r.fillRect(0,0,s,o),r.strokeStyle="rgba(201, 169, 110, 0.15)",r.lineWidth=1;for(let _=0;_<=5;_++){const g=a.top+c/5*_;r.beginPath(),r.moveTo(a.left,g),r.lineTo(s-a.right,g),r.stroke()}const d=[...t,...e],h=Math.max(...d)*1.1,p=Math.min(...d)*.9,v=h-p||1,x=(_,g,S=!1)=>{if(_.length!==0){r.strokeStyle=g,r.lineWidth=2,S?r.setLineDash([5,5]):r.setLineDash([]),r.beginPath();for(let b=0;b<_.length;b++){const A=a.left+b/(_.length-1)*l,T=a.top+(1-(_[b]-p)/v)*c;b===0?r.moveTo(A,T):r.lineTo(A,T)}r.stroke(),r.setLineDash([])}};x(t,"rgba(200, 75, 49, 0.8)"),x(e,"rgba(45, 106, 79, 0.9)");for(let _=0;_<=5;_++){const g=a.top+c/5*_,S=h-v/5*_;r.fillStyle="rgba(201, 169, 110, 0.6)",r.font='11px "Noto Sans SC", sans-serif',r.textAlign="right",r.fillText(S.toFixed(2),a.left-8,g+4)}const m=s-a.right-120,u=a.top+10;r.fillStyle="rgba(200, 75, 49, 0.8)",r.fillRect(m,u,20,3),r.fillStyle="rgba(201, 169, 110, 0.8)",r.font='11px "Noto Sans SC", sans-serif',r.textAlign="left",r.fillText("优化前",m+28,u+5),r.fillStyle="rgba(45, 106, 79, 0.9)",r.fillRect(m,u+18,20,3),r.fillStyle="rgba(201, 169, 110, 0.8)",r.fillText("优化后",m+28,u+23),r.strokeStyle="rgba(201, 169, 110, 0.5)",r.lineWidth=1,r.strokeRect(a.left,a.top,l,c),r.fillStyle="rgba(201, 169, 110, 0.8)",r.font='bold 13px "Noto Serif SC", serif',r.textAlign="center",r.fillText("厚度剖面对比",s/2,20),r.fillStyle="rgba(201, 169, 110, 0.6)",r.font='11px "Noto Sans SC", sans-serif',r.fillText("位置",s/2,o-10),r.save(),r.translate(15,o/2),r.rotate(-Math.PI/2),r.textAlign="center",r.fillText("厚度 (mm)",0,0),r.restore()},[t,e]),R.jsx("canvas",{ref:n,width:500,height:250,className:"w-full h-full"})}function vb(){const{stones:t,selectedStoneId:e,setSelectedStoneId:n,simulationResult:i,setSimulationResult:r,optimizationRecord:s,setOptimizationRecord:o,isOptimizing:a,setIsOptimizing:l,optimizationProgress:c}=Gs(),[f,d]=W.useState(30),[h,p]=W.useState(15),[v,x]=W.useState(7e10),[m,u]=W.useState(.22),[_,g]=W.useState(440),[S,b]=W.useState(.01),[A,T]=W.useState(100),[C,E]=W.useState(.02),[y,L]=W.useState(.08),[H,z]=W.useState(!1),[Y,X]=W.useState([]),G=t.find(J=>J.id===e)||null;W.useEffect(()=>{G&&g(G.target_freq)},[e]),W.useEffect(()=>{c&&X(J=>[...J,c.loss])},[c]);const q=async()=>{if(e){z(!0);try{const J=await wM({stone_id:e,mesh_nx:f,mesh_ny:h,elastic_mod:v,poisson:m});r(J)}catch(J){console.error("Simulation failed:",J)}finally{z(!1)}}},D=async()=>{if(e){l(!0),X([]);try{const J=await AM({stone_id:e,target_freq:_,learning_rate:S,max_iter:A,h_min:C,h_max:y});o(J)}catch(J){console.error("Optimization failed:",J),l(!1)}}},$=(i==null?void 0:i.natural_freqs)||[],K=(s==null?void 0:s.thickness_before)||(G==null?void 0:G.thickness_profile)||[],se=(s==null?void 0:s.thickness_after)||[];return R.jsxs("div",{className:"h-full flex flex-col gap-4",children:[R.jsxs("div",{className:"flex items-center justify-between",children:[R.jsx("h2",{className:"text-2xl font-serif font-bold text-bronze",children:"仿真调音"}),R.jsxs("div",{className:"flex items-center gap-4",children:[R.jsx("label",{className:"text-bronze/80 text-sm",children:"选择编磬："}),R.jsx("select",{value:e||"",onChange:J=>{n(Number(J.target.value)),r(null),o(null)},className:"bg-deep-indigo border border-bronze/40 rounded px-3 py-2 text-bronze focus:outline-none focus:border-bronze",children:t.map(J=>R.jsxs("option",{value:J.id,children:[J.name," - ",J.target_pitch]},J.id))})]})]}),R.jsxs("div",{className:"flex-1 flex gap-4 min-h-0",children:[R.jsxs("div",{className:"w-80 flex flex-col gap-4 overflow-y-auto",children:[R.jsxs("div",{className:"card-bronze p-4",children:[R.jsx("h3",{className:"text-lg font-serif text-bronze mb-4",children:"有限元参数"}),R.jsxs("div",{className:"space-y-4",children:[R.jsxs("div",{children:[R.jsxs("div",{className:"flex justify-between text-sm mb-1",children:[R.jsx("span",{className:"text-bronze/80",children:"X 方向网格数"}),R.jsx("span",{className:"text-bronze font-mono",children:f})]}),R.jsx("input",{type:"range",min:"10",max:"50",value:f,onChange:J=>d(Number(J.target.value)),className:"w-full accent-bronze"})]}),R.jsxs("div",{children:[R.jsxs("div",{className:"flex justify-between text-sm mb-1",children:[R.jsx("span",{className:"text-bronze/80",children:"Y 方向网格数"}),R.jsx("span",{className:"text-bronze font-mono",children:h})]}),R.jsx("input",{type:"range",min:"5",max:"30",value:h,onChange:J=>p(Number(J.target.value)),className:"w-full accent-bronze"})]}),R.jsxs("div",{children:[R.jsx("label",{className:"text-bronze/80 text-sm block mb-1",children:"弹性模量 (Pa)"}),R.jsx("input",{type:"number",value:v,onChange:J=>x(Number(J.target.value)),className:"w-full bg-deep-indigo border border-bronze/40 rounded px-3 py-2 text-bronze focus:outline-none focus:border-bronze"})]}),R.jsxs("div",{children:[R.jsx("label",{className:"text-bronze/80 text-sm block mb-1",children:"泊松比"}),R.jsx("input",{type:"number",step:"0.01",value:m,onChange:J=>u(Number(J.target.value)),className:"w-full bg-deep-indigo border border-bronze/40 rounded px-3 py-2 text-bronze focus:outline-none focus:border-bronze"})]})]}),R.jsx("button",{onClick:q,disabled:H||!e,className:"w-full mt-6 btn-bronze disabled:opacity-50 disabled:cursor-not-allowed",children:H?"计算中...":"运行仿真"})]}),R.jsxs("div",{className:"card-bronze p-4",children:[R.jsx("h3",{className:"text-lg font-serif text-bronze mb-4",children:"优化参数"}),R.jsxs("div",{className:"space-y-4",children:[R.jsxs("div",{children:[R.jsx("label",{className:"text-bronze/80 text-sm block mb-1",children:"目标频率 (Hz)"}),R.jsx("input",{type:"number",step:"0.1",value:_,onChange:J=>g(Number(J.target.value)),className:"w-full bg-deep-indigo border border-bronze/40 rounded px-3 py-2 text-bronze focus:outline-none focus:border-bronze"})]}),R.jsxs("div",{children:[R.jsxs("div",{className:"flex justify-between text-sm mb-1",children:[R.jsx("span",{className:"text-bronze/80",children:"学习率"}),R.jsx("span",{className:"text-bronze font-mono",children:S})]}),R.jsx("input",{type:"range",min:"0.001",max:"0.1",step:"0.001",value:S,onChange:J=>b(Number(J.target.value)),className:"w-full accent-bronze"})]}),R.jsxs("div",{children:[R.jsxs("div",{className:"flex justify-between text-sm mb-1",children:[R.jsx("span",{className:"text-bronze/80",children:"最大迭代次数"}),R.jsx("span",{className:"text-bronze font-mono",children:A})]}),R.jsx("input",{type:"range",min:"10",max:"500",step:"10",value:A,onChange:J=>T(Number(J.target.value)),className:"w-full accent-bronze"})]}),R.jsxs("div",{children:[R.jsx("label",{className:"text-bronze/80 text-sm block mb-1",children:"最小厚度 (m)"}),R.jsx("input",{type:"number",step:"0.001",value:C,onChange:J=>E(Number(J.target.value)),className:"w-full bg-deep-indigo border border-bronze/40 rounded px-3 py-2 text-bronze focus:outline-none focus:border-bronze"})]}),R.jsxs("div",{children:[R.jsx("label",{className:"text-bronze/80 text-sm block mb-1",children:"最大厚度 (m)"}),R.jsx("input",{type:"number",step:"0.001",value:y,onChange:J=>L(Number(J.target.value)),className:"w-full bg-deep-indigo border border-bronze/40 rounded px-3 py-2 text-bronze focus:outline-none focus:border-bronze"})]})]}),R.jsx("button",{onClick:D,disabled:a||!e,className:"w-full mt-6 btn-bronze disabled:opacity-50 disabled:cursor-not-allowed",children:a?"优化中...":"开始优化"}),a&&c&&R.jsxs("div",{className:"mt-4 p-3 bg-bronze/10 rounded border border-bronze/30",children:[R.jsxs("div",{className:"flex justify-between text-sm mb-2",children:[R.jsx("span",{className:"text-bronze/80",children:"迭代进度"}),R.jsxs("span",{className:"text-bronze font-mono",children:[c.iteration," / ",A]})]}),R.jsx("div",{className:"w-full h-2 bg-deep-indigo rounded-full overflow-hidden",children:R.jsx("div",{className:"h-full bg-gradient-to-r from-bronze-dark to-bronze transition-all duration-300",style:{width:`${c.iteration/A*100}%`}})}),R.jsxs("div",{className:"flex justify-between text-xs mt-2",children:[R.jsxs("span",{className:"text-bronze/60",children:["当前频率: ",c.freq.toFixed(2)," Hz"]}),R.jsxs("span",{className:"text-bronze/60",children:["损失: ",c.loss.toFixed(4)]})]})]})]})]}),R.jsxs("div",{className:"flex-1 flex flex-col gap-4 min-h-0 overflow-y-auto",children:[R.jsxs("div",{className:"card-bronze p-4",children:[R.jsx("h3",{className:"text-lg font-serif text-bronze mb-3",children:"固有频率"}),$.length>0?R.jsx("div",{className:"grid grid-cols-3 gap-3",children:$.slice(0,6).map((J,Ie)=>R.jsxs("div",{className:"p-3 bg-deep-indigo/50 rounded border border-bronze/20",children:[R.jsxs("p",{className:"text-bronze/60 text-xs mb-1",children:["第 ",Ie+1," 阶"]}),R.jsxs("p",{className:"text-bronze font-mono text-lg",children:[J.toFixed(2)," ",R.jsx("span",{className:"text-sm",children:"Hz"})]})]},Ie))}):R.jsx("p",{className:"text-bronze/50 text-sm text-center py-8",children:"请先运行仿真计算"}),(i==null?void 0:i.mesh_info)&&R.jsxs("div",{className:"mt-3 pt-3 border-t border-bronze/20 flex gap-6 text-sm",children:[R.jsxs("span",{className:"text-bronze/70",children:["节点数: ",R.jsx("span",{className:"text-bronze font-mono",children:i.mesh_info.nodes})]}),R.jsxs("span",{className:"text-bronze/70",children:["单元数: ",R.jsx("span",{className:"text-bronze font-mono",children:i.mesh_info.elements})]})]})]}),R.jsxs("div",{className:"card-bronze p-4 flex-1 min-h-0",children:[R.jsx("h3",{className:"text-lg font-serif text-bronze mb-3",children:"收敛曲线"}),R.jsx("div",{className:"h-56",children:R.jsx(gb,{history:Y})})]}),R.jsxs("div",{className:"card-bronze p-4 flex-1 min-h-0",children:[R.jsx("h3",{className:"text-lg font-serif text-bronze mb-3",children:"厚度剖面对比"}),R.jsx("div",{className:"h-56",children:R.jsx(_b,{before:K,after:se})})]}),s&&R.jsxs("div",{className:"card-bronze p-4",children:[R.jsx("h3",{className:"text-lg font-serif text-bronze mb-3",children:"优化结果"}),R.jsxs("div",{className:"grid grid-cols-4 gap-4 text-sm",children:[R.jsxs("div",{children:[R.jsx("p",{className:"text-bronze/60 mb-1",children:"初始频率"}),R.jsxs("p",{className:"text-bronze font-mono text-lg",children:[s.initial_freq.toFixed(2)," Hz"]})]}),R.jsxs("div",{children:[R.jsx("p",{className:"text-bronze/60 mb-1",children:"目标频率"}),R.jsxs("p",{className:"text-bronze font-mono text-lg",children:[s.target_freq.toFixed(2)," Hz"]})]}),R.jsxs("div",{children:[R.jsx("p",{className:"text-bronze/60 mb-1",children:"优化后频率"}),R.jsxs("p",{className:"text-jade font-mono text-lg",children:[s.optimized_freq.toFixed(2)," Hz"]})]}),R.jsxs("div",{children:[R.jsx("p",{className:"text-bronze/60 mb-1",children:"迭代次数"}),R.jsx("p",{className:"text-bronze font-mono text-lg",children:s.iterations})]})]})]})]})]})]})}function xb(){MM();const{setStones:t,setActiveAlerts:e,activeAlerts:n}=Gs();W.useEffect(()=>{(async()=>{try{const s=await EM();t(s)}catch(s){console.error("Failed to load stones:",s)}try{const s=await CM();e(s)}catch(s){console.error("Failed to load alerts:",s)}})()},[t,e]);const i=n.filter(r=>r.cents_deviation>10);return R.jsxs("div",{className:"flex h-screen w-screen overflow-hidden bg-gradient-to-br from-deep-indigo via-dark-indigo to-deep-indigo",children:[R.jsx(RM,{}),R.jsxs("div",{className:"flex-1 flex flex-col overflow-hidden",children:[i.length>0&&R.jsx(PM,{alerts:i}),R.jsx("main",{className:"flex-1 overflow-auto p-6",children:R.jsxs(DS,{children:[R.jsx(ho,{path:"/",element:R.jsx(hb,{})}),R.jsx(ho,{path:"/dashboard",element:R.jsx(mb,{})}),R.jsx(ho,{path:"/simulation",element:R.jsx(vb,{})}),R.jsx(ho,{path:"*",element:R.jsx(LS,{to:"/",replace:!0})})]})})]})]})}Cu.createRoot(document.getElementById("root")).render(R.jsx(cd.StrictMode,{children:R.jsx(HS,{children:R.jsx(xb,{})})}));

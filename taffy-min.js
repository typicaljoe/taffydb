var TAFFY,exports,T;(function(){"use strict";var e,t,n,r,i,s,o,u,a,f,l,c,h,p,d,v,m,g,y,b,w,E,S;if(!TAFFY){i="2.7";s=1;o="000000";u=1e3;a={};f=function(e){if(TAFFY.isArray(e)||TAFFY.isObject(e)){return e}else{return JSON.parse(e)}};y=function(e,t){return b(e,function(e){return t.indexOf(e)>=0})};b=function(e,t,n){var r=[];if(e==null)return r;if(Array.prototype.filter&&e.filter===Array.prototype.filter)return e.filter(t,n);l(e,function(e,i,s){if(t.call(n,e,i,s))r[r.length]=e});return r};S=function(e){return Object.prototype.toString.call(e)==="[object RegExp]"};E=function(e){var t=T.isArray(e)?[]:T.isObject(e)?{}:null;if(e===null)return e;for(var n in e){t[n]=S(e[n])?e[n].toString():T.isArray(e[n])||T.isObject(e[n])?E(e[n]):e[n]}return t};w=function(e){var t=JSON.stringify(e);if(t.match(/regex/)===null)return t;return JSON.stringify(E(e))};l=function(e,t,n){var r,i,s,o;if(e&&(T.isArray(e)&&e.length===1||!T.isArray(e))){t(T.isArray(e)?e[0]:e,0)}else{for(r,i,s=0,e=T.isArray(e)?e:[e],o=e.length;s<o;s++){i=e[s];if(!T.isUndefined(i)||n||false){r=t(i,s);if(r===T.EXIT){break}}}}};c=function(e,t){var n=0,r,i;for(i in e){if(e.hasOwnProperty(i)){r=t(e[i],i,n++);if(r===T.EXIT){break}}}};a.extend=function(e,t){a[e]=function(){return t.apply(this,arguments)}};h=function(e){var t;if(T.isString(e)&&/[t][0-9]*[r][0-9]*/i.test(e)){return true}if(T.isObject(e)&&e.___id&&e.___s){return true}if(T.isArray(e)){t=true;l(e,function(e){if(!h(e)){t=false;return TAFFY.EXIT}});return t}return false};d=function(e,t){var n=true;l(t,function(t){switch(T.typeOf(t)){case"function":if(!t.apply(e)){n=false;return TAFFY.EXIT}break;case"array":n=t.length===1?d(e,t[0]):t.length===2?d(e,t[0])||d(e,t[1]):t.length===3?d(e,t[0])||d(e,t[1])||d(e,t[2]):t.length===4?d(e,t[0])||d(e,t[1])||d(e,t[2])||d(e,t[3]):false;if(t.length>4){l(t,function(t){if(d(e,t)){n=true}})}break}});return n};p=function(e){var t=[];if(T.isString(e)&&/[t][0-9]*[r][0-9]*/i.test(e)){e={___id:e}}if(T.isArray(e)){l(e,function(e){t.push(p(e))});e=function(){var e=this,n=false;l(t,function(t){if(d(e,t)){n=true}});return n};return e}if(T.isObject(e)){if(T.isObject(e)&&e.___id&&e.___s){e={___id:e.___id}}c(e,function(e,n){if(!T.isObject(e)){e={is:e}}c(e,function(e,r){var i=[],s;s=r==="hasAll"?function(e,t){t(e)}:l;s(e,function(e){var t=true,s=false,o;o=function(){var i=this[n],s="==",o="!=",u="===",a="<",f=">",l="<=",c=">=",h="!==",p;if(typeof i==="undefined"){return false}if(r.indexOf("!")===0&&r!==o&&r!==h){t=false;r=r.substring(1,r.length)}p=r==="regex"?e.test(i):r==="lt"||r===a?i<e:r==="gt"||r===f?i>e:r==="lte"||r===l?i<=e:r==="gte"||r===c?i>=e:r==="left"?i.indexOf(e)===0:r==="leftnocase"?i.toLowerCase().indexOf(e.toLowerCase())===0:r==="right"?i.substring(i.length-e.length)===e:r==="rightnocase"?i.toLowerCase().substring(i.length-e.length)===e.toLowerCase():r==="like"?i.indexOf(e)>=0:r==="likenocase"?i.toLowerCase().indexOf(e.toLowerCase())>=0:r===u||r==="is"?i===e:r===s?i==e:r===h?i!==e:r===o?i!=e:r==="isnocase"?i.toLowerCase?i.toLowerCase()===e.toLowerCase():i===e:r==="has"?T.has(i,e):r==="hasall"?T.hasAll(i,e):r==="contains"?TAFFY.isArray(i)&&i.indexOf(e)>-1:r.indexOf("is")===-1&&!TAFFY.isNull(i)&&!TAFFY.isUndefined(i)&&!TAFFY.isObject(e)&&!TAFFY.isArray(e)?e===i[r]:T[r]&&T.isFunction(T[r])&&r.indexOf("is")===0?T[r](i)===e:T[r]&&T.isFunction(T[r])?T[r](i,e):false;p=p&&!t?false:!p&&!t?true:p;return p};i.push(o)});if(i.length===1){t.push(i[0])}else{t.push(function(){var e=this,t=false;l(i,function(n){if(n.apply(e)){t=true}});return t})}})});e=function(){var e=this,n=true;n=t.length===1&&!t[0].apply(e)?false:t.length===2&&(!t[0].apply(e)||!t[1].apply(e))?false:t.length===3&&(!t[0].apply(e)||!t[1].apply(e)||!t[2].apply(e))?false:t.length===4&&(!t[0].apply(e)||!t[1].apply(e)||!t[2].apply(e)||!t[3].apply(e))?false:true;if(t.length>4){l(t,function(t){if(!d(e,t)){n=false}})}return n};return e}if(T.isFunction(e)){return e}};m=function(e,t){var n=function(e,n){var r=0;T.each(t,function(t){var i,s,o,u,a;i=t.split(" ");s=i[0];o=i.length===1?"logical":i[1];if(o==="logical"){u=v(e[s]);a=v(n[s]);T.each(u.length<=a.length?u:a,function(e,t){if(u[t]<a[t]){r=-1;return TAFFY.EXIT}else if(u[t]>a[t]){r=1;return TAFFY.EXIT}})}else if(o==="logicaldesc"){u=v(e[s]);a=v(n[s]);T.each(u.length<=a.length?u:a,function(e,t){if(u[t]>a[t]){r=-1;return TAFFY.EXIT}else if(u[t]<a[t]){r=1;return TAFFY.EXIT}})}else if(o==="asec"&&e[s]<n[s]){r=-1;return T.EXIT}else if(o==="asec"&&e[s]>n[s]){r=1;return T.EXIT}else if(o==="desc"&&e[s]>n[s]){r=-1;return T.EXIT}else if(o==="desc"&&e[s]<n[s]){r=1;return T.EXIT}if(r===0&&o==="logical"&&u.length<a.length){r=-1}else if(r===0&&o==="logical"&&u.length>a.length){r=1}else if(r===0&&o==="logicaldesc"&&u.length>a.length){r=-1}else if(r===0&&o==="logicaldesc"&&u.length<a.length){r=1}if(r!==0){return T.EXIT}});return r};return e&&e.push?e.sort(n):e};(function(){var e={},t=0;v=function(n){if(t>u){e={};t=0}return e["_"+n]||function(){var r=String(n),i=[],s="_",o="",u,a,f;for(u=0,a=r.length;u<a;u++){f=r.charCodeAt(u);if(f>=48&&f<=57||f===46){if(o!=="n"){o="n";i.push(s.toLowerCase());s=""}s=s+r.charAt(u)}else{if(o!=="s"){o="s";i.push(parseFloat(s));s=""}s=s+r.charAt(u)}}i.push(o==="n"?parseFloat(s):s.toLowerCase());i.shift();e["_"+n]=i;t++;return i}()}})();g=function(){this.context({results:this.getDBI().query(this.context())})};a.extend("filter",function(){var e=TAFFY.mergeObj(this.context(),{run:null}),t=[];l(e.q,function(e){t.push(e)});e.q=t;l(arguments,function(t){e.q.push(p(t));e.filterRaw.push(t)});return this.getroot(e)});a.extend("order",function(e){e=e.split(",");var t=[],n;l(e,function(e){t.push(e.replace(/^\s*/,"").replace(/\s*$/,""))});n=TAFFY.mergeObj(this.context(),{sort:null});n.order=t;return this.getroot(n)});a.extend("limit",function(e){var t=TAFFY.mergeObj(this.context(),{}),n;t.limit=e;if(t.run&&t.sort){n=[];l(t.results,function(t,r){if(r+1>e){return TAFFY.EXIT}n.push(t)});t.results=n}return this.getroot(t)});a.extend("start",function(e){var t=TAFFY.mergeObj(this.context(),{}),n;t.start=e;if(t.run&&t.sort&&!t.limit){n=[];l(t.results,function(t,r){if(r+1>e){n.push(t)}});t.results=n}else{t=TAFFY.mergeObj(this.context(),{run:null,start:e})}return this.getroot(t)});a.extend("update",function(e,t,n){var r=true,i={},s=arguments,o;if(TAFFY.isString(e)&&(arguments.length===2||arguments.length===3)){i[e]=t;if(arguments.length===3){r=n}}else{i=e;if(s.length===2){r=t}}o=this;g.call(this);l(this.context().results,function(e){var t=i;if(TAFFY.isFunction(t)){t=t.apply(TAFFY.mergeObj(e,{}))}else{if(T.isFunction(t)){t=t(TAFFY.mergeObj(e,{}))}}if(TAFFY.isObject(t)){o.getDBI().update(e.___id,t,r)}});if(this.context().results.length){this.context({run:null})}return this});a.extend("remove",function(e){var t=this,n=0;g.call(this);l(this.context().results,function(e){t.getDBI().remove(e.___id);n++});if(this.context().results.length){this.context({run:null});t.getDBI().removeCommit(e)}return n});a.extend("count",function(){g.call(this);return this.context().results.length});a.extend("callback",function(e,t){if(e){var n=this;setTimeout(function(){g.call(n);e.call(n.getroot(n.context()))},t||0)}return null});a.extend("get",function(){g.call(this);return this.context().results});a.extend("stringify",function(){return JSON.stringify(this.get())});a.extend("first",function(){g.call(this);return this.context().results[0]||false});a.extend("last",function(){g.call(this);return this.context().results[this.context().results.length-1]||false});a.extend("sum",function(){var e=0,t=this;g.call(t);l(arguments,function(n){l(t.context().results,function(t){e=e+(t[n]||0)})});return e});a.extend("min",function(e){var t=null;g.call(this);l(this.context().results,function(n){if(t===null||n[e]<t){t=n[e]}});return t});(function(){var e=function(){var e,t,n;e=function(e,t,n){var r,i,s,o;if(n.length===2){r=e[n[0]];s="===";i=t[n[1]]}else{r=e[n[0]];s=n[1];i=t[n[2]]}switch(s){case"===":return r===i;case"!==":return r!==i;case"<":return r<i;case">":return r>i;case"<=":return r<=i;case">=":return r>=i;case"==":return r==i;case"!=":return r!=i;default:throw String(s)+" is not supported"}};t=function(e,t){var n={},r,i;for(r in e){if(e.hasOwnProperty(r)){n[r]=e[r]}}for(r in t){if(t.hasOwnProperty(r)&&r!=="___id"&&r!=="___s"){i=!TAFFY.isUndefined(n[r])?"right_":"";n[i+String(r)]=t[r]}}return n};n=function(n){var r,i,s=arguments,o=s.length,u=[];if(typeof n.filter!=="function"){if(n.TAFFY){r=n()}else{throw"TAFFY DB or result not supplied"}}else{r=n}this.context({results:this.getDBI().query(this.context())});TAFFY.each(this.context().results,function(n){r.each(function(r){var a,f=true;e:for(i=1;i<o;i++){a=s[i];if(typeof a==="function"){f=a(n,r)}else if(typeof a==="object"&&a.length){f=e(n,r,a)}else{f=false}if(!f){break e}}if(f){u.push(t(n,r))}})});return TAFFY(u)()};return n}();a.extend("join",e)})();a.extend("max",function(e){var t=null;g.call(this);l(this.context().results,function(n){if(t===null||n[e]>t){t=n[e]}});return t});a.extend("select",function(){var e=[],t=arguments;g.call(this);if(arguments.length===1){l(this.context().results,function(n){e.push(n[t[0]])})}else{l(this.context().results,function(n){var r=[];l(t,function(e){r.push(n[e])});e.push(r)})}return e});a.extend("distinct",function(){var e=[],t=arguments;g.call(this);if(arguments.length===1){l(this.context().results,function(n){var r=n[t[0]],i=false;l(e,function(e){if(r===e){i=true;return TAFFY.EXIT}});if(!i){e.push(r)}})}else{l(this.context().results,function(n){var r=[],i=false;l(t,function(e){r.push(n[e])});l(e,function(e){var n=true;l(t,function(t,i){if(r[i]!==e[i]){n=false;return TAFFY.EXIT}});if(n){i=true;return TAFFY.EXIT}});if(!i){e.push(r)}})}return e});a.extend("supplant",function(e,t){var n=[];g.call(this);l(this.context().results,function(t){n.push(e.replace(/\{([^\{\}]*)\}/g,function(e,n){var r=t[n];return typeof r==="string"||typeof r==="number"?r:e}))});return!t?n.join(""):n});a.extend("each",function(e){g.call(this);l(this.context().results,e);return this});a.extend("map",function(e){var t=[];g.call(this);l(this.context().results,function(n){t.push(e(n))});return t});T=function(e){var t=[],n={},r=1,i={template:false,onInsert:false,onUpdate:false,onRemove:false,onDBChange:false,storageName:false,forcePropertyCase:null,delayDiskUpdates:0,cacheSize:100,name:""},u=new Date,v=0,g=0,y={},b,E,S;E=function(e){var r=[],i=false;if(e.length===0){return t}l(e,function(e){if(T.isString(e)&&/[t][0-9]*[r][0-9]*/i.test(e)&&t[n[e]]){r.push(t[n[e]]);i=true}if(T.isObject(e)&&e.___id&&e.___s&&t[n[e.___id]]){r.push(t[n[e.___id]]);i=true}if(T.isArray(e)){l(e,function(e){l(E(e),function(e){r.push(e)})})}});if(i&&r.length>1){r=[]}return r};b={dm:function(e){if(e){u=e;y={};v=0;g=0}if(i.onDBChange){setTimeout(function(){i.onDBChange.call(t)},0)}if(i.delayDiskUpdates===0){if(i.storageName){setTimeout(function(){localStorage.setItem("taffy_"+i.storageName,JSON.stringify(t))})}}return u},delayDiskUpdates:function(){i.delayDiskUpdates++},flushDiskUpdates:function(){i.delayDiskUpdates--;if(i.delayDiskUpdates===0){if(i.storageName){setTimeout(function(){localStorage.setItem("taffy_"+i.storageName,JSON.stringify(t))})}}},insert:function(e,u){var a=[],h=[],p=f(e);l(p,function(e,f){var p,d;if(T.isArray(e)&&f===0){l(e,function(e){a.push(i.forcePropertyCase==="lower"?e.toLowerCase():i.forcePropertyCase==="upper"?e.toUpperCase():e)});return true}else if(T.isArray(e)){p={};l(e,function(e,t){p[a[t]]=e});e=p}else if(T.isObject(e)&&i.forcePropertyCase){d={};c(e,function(t,n){d[i.forcePropertyCase==="lower"?n.toLowerCase():i.forcePropertyCase==="upper"?n.toUpperCase():n]=e[n]});e=d}r++;e.___id="T"+String(o+s).slice(-6)+"R"+String(o+r).slice(-6);e.___s=true;h.push(e.___id);if(i.template){e=T.mergeObj(i.template,e)}t.push(e);n[e.___id]=t.length-1;if(i.onInsert&&(u||TAFFY.isUndefined(u))){i.onInsert.call(e)}b.dm(new Date)});return S(h)},sort:function(e){t=m(t,e.split(","));n={};l(t,function(e,t){n[e.___id]=t});b.dm(new Date);return true},update:function(e,r,s){var o={},u,a,f,l;if(i.forcePropertyCase){c(r,function(e,t){o[i.forcePropertyCase==="lower"?t.toLowerCase():i.forcePropertyCase==="upper"?t.toUpperCase():t]=e});r=o}u=t[n[e]];a=T.mergeObj(u,r);f={};l=false;c(a,function(e,t){if(TAFFY.isUndefined(u[t])||u[t]!==e){f[t]=e;l=true}});if(l){if(i.onUpdate&&(s||TAFFY.isUndefined(s))){i.onUpdate.call(a,t[n[e]],f)}t[n[e]]=a;b.dm(new Date)}},remove:function(e){t[n[e]].___s=false},removeCommit:function(e){var r;for(r=t.length-1;r>-1;r--){if(!t[r].___s){if(i.onRemove&&(e||TAFFY.isUndefined(e))){i.onRemove.call(t[r])}n[t[r].___id]=undefined;t.splice(r,1)}}n={};l(t,function(e,t){n[e.___id]=t});b.dm(new Date)},query:function(e){var n,r,s,o,u,a;if(i.cacheSize){r="";l(e.filterRaw,function(e){if(T.isFunction(e)){r="nocache";return TAFFY.EXIT}});if(r===""){r=w(T.mergeObj(e,{q:false,run:false,sort:false}))}}if(!e.results||!e.run||e.run&&b.dm()>e.run){s=[];if(i.cacheSize&&y[r]){y[r].i=v++;return y[r].results}else{if(e.q.length===0&&e.index.length===0){l(t,function(e){s.push(e)});n=s}else{o=E(e.index);l(o,function(t){if(e.q.length===0||d(t,e.q)){s.push(t)}});n=s}}}else{n=e.results}if(e.order.length>0&&(!e.run||!e.sort)){n=m(n,e.order)}if(n.length&&(e.limit&&e.limit<n.length||e.start)){u=[];l(n,function(t,n){if(!e.start||e.start&&n+1>=e.start){if(e.limit){a=e.start?n+1-e.start:n;if(a<e.limit){u.push(t)}else if(a>e.limit){return TAFFY.EXIT}}else{u.push(t)}}});n=u}if(i.cacheSize&&r!=="nocache"){g++;setTimeout(function(){var e,t;if(g>=i.cacheSize*2){g=0;e=v-i.cacheSize;t={};c(function(n,r){if(n.i>=e){t[r]=n}});y=t}},0);y[r]={i:v++,results:n}}return n}};S=function(){var e,t;e=TAFFY.mergeObj(TAFFY.mergeObj(a,{insert:undefined}),{getDBI:function(){return b},getroot:function(e){return S.call(e)},context:function(e){if(e){t=TAFFY.mergeObj(t,e.hasOwnProperty("results")?TAFFY.mergeObj(e,{run:new Date,sort:new Date}):e)}return t},extend:undefined});t=this&&this.q?this:{limit:false,start:false,q:[],filterRaw:[],index:[],order:[],results:false,run:null,sort:null,settings:i};l(arguments,function(e){if(h(e)){t.index.push(e)}else{t.q.push(p(e))}t.filterRaw.push(e)});return e};s++;if(e){b.insert(e)}S.insert=b.insert;S.delayDiskUpdates=b.delayDiskUpdates;S.flushDiskUpdates=b.flushDiskUpdates;S.merge=function(e,t,n){var r={},i=[],s={};n=n||false;t=t||"id";l(e,function(e){var s;r[t]=e[t];i.push(e[t]);s=S(r).first();if(s){b.update(s.___id,e,n)}else{b.insert(e,n)}});s[t]=i;return S(s)};S.TAFFY=true;S.sort=b.sort;S.settings=function(e){if(e){i=TAFFY.mergeObj(i,e);if(e.template){S().update(e.template)}}return i};S.store=function(e){var n=false,r;if(localStorage){if(e){r=localStorage.getItem("taffy_"+e);if(r&&r.length>0){S.insert(r);n=true}if(t.length>0){setTimeout(function(){localStorage.setItem("taffy_"+i.storageName,JSON.stringify(t))})}}S.settings({storageName:e})}return S};return S};TAFFY=T;T.each=l;T.eachin=c;T.extend=a.extend;TAFFY.EXIT="TAFFYEXIT";TAFFY.mergeObj=function(e,t){var n={};c(e,function(t,r){n[r]=e[r]});c(t,function(e,r){n[r]=t[r]});return n};TAFFY.has=function(e,t){var n=false,r;if(e.TAFFY){n=e(t);if(n.length>0){return true}else{return false}}else{switch(T.typeOf(e)){case"object":if(T.isObject(t)){c(t,function(r,i){if(n===true&&!T.isUndefined(e[i])&&e.hasOwnProperty(i)){n=T.has(e[i],t[i])}else{n=false;return TAFFY.EXIT}})}else if(T.isArray(t)){l(t,function(r,i){n=T.has(e,t[i]);if(n){return TAFFY.EXIT}})}else if(T.isString(t)){if(!TAFFY.isUndefined(e[t])){return true}else{return false}}return n;case"array":if(T.isObject(t)){l(e,function(r,i){n=T.has(e[i],t);if(n===true){return TAFFY.EXIT}})}else if(T.isArray(t)){l(t,function(r,i){l(e,function(r,s){n=T.has(e[s],t[i]);if(n===true){return TAFFY.EXIT}});if(n===true){return TAFFY.EXIT}})}else if(T.isString(t)||T.isNumber(t)){n=false;for(r=0;r<e.length;r++){n=T.has(e[r],t);if(n){return true}}}return n;case"string":if(T.isString(t)&&t===e){return true}break;default:if(T.typeOf(e)===T.typeOf(t)&&e===t){return true}break}}return false};TAFFY.hasAll=function(e,t){var n=TAFFY,r;if(n.isArray(t)){r=true;l(t,function(t){r=n.has(e,t);if(r===false){return TAFFY.EXIT}});return r}else{return n.has(e,t)}};TAFFY.typeOf=function(e){var t=typeof e;if(t==="object"){if(e){if(typeof e.length==="number"&&!e.propertyIsEnumerable("length")){t="array"}}else{t="null"}}return t};TAFFY.getObjectKeys=function(e){var t=[];c(e,function(e,n){t.push(n)});t.sort();return t};TAFFY.isSameArray=function(e,t){return TAFFY.isArray(e)&&TAFFY.isArray(t)&&e.join(",")===t.join(",")?true:false};TAFFY.isSameObject=function(e,t){var n=TAFFY,r=true;if(n.isObject(e)&&n.isObject(t)){if(n.isSameArray(n.getObjectKeys(e),n.getObjectKeys(t))){c(e,function(i,s){if(!(n.isObject(e[s])&&n.isObject(t[s])&&n.isSameObject(e[s],t[s])||n.isArray(e[s])&&n.isArray(t[s])&&n.isSameArray(e[s],t[s])||e[s]===t[s])){r=false;return TAFFY.EXIT}})}else{r=false}}else{r=false}return r};e=["String","Number","Object","Array","Boolean","Null","Function","Undefined"];t=function(e){return function(t){return TAFFY.typeOf(t)===e.toLowerCase()?true:false}};for(n=0;n<e.length;n++){r=e[n];TAFFY["is"+r]=t(r)}}})();if(typeof exports==="object"){exports.taffy=TAFFY}
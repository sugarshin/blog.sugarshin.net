(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{19:function(e,n,t){"use strict";e.exports=function(e,n){var t,a,o=n.children||[],u=o.length,s=[],l=-1;for(;++l<u;)(t=i(e,o[l],n))&&(l&&"break"===o[l-1].type&&(t.value&&(t.value=r.left(t.value)),(a=t.children&&t.children[0])&&a.value&&(a.value=r.left(a.value))),s=s.concat(t));return s};var r=t(60),i=t(401)},386:function(e,n,t){"use strict";e.exports=function e(n){return function(e){return(e&&e.value?e.value:e.alt?e.alt:e.title)||""}(n)||n.children&&n.children.map(e).join("")||""}},388:function(e,n,t){"use strict";function r(e){if("string"==typeof e)return function(e){return function(n){return Boolean(n&&n.type===e)}}(e);if(null===e||void 0===e)return i;if("object"==typeof e)return("length"in e?function(e){var n=function(e){var n=[],t=e.length,i=-1;for(;++i<t;)n[i]=r(e[i]);return n}(e),t=n.length;return function(){var e=-1;for(;++e<t;)if(n[e].apply(this,arguments))return!0;return!1}}:function(e){return function(n){var t;for(t in e)if(n[t]!==e[t])return!1;return!0}})(e);if("function"==typeof e)return e;throw new Error("Expected function, string, or object as test")}function i(){return!0}e.exports=r},389:function(e,n,t){"use strict";e.exports=function(e){return new RegExp("^("+e+")$","i")}},393:function(e,n,t){"use strict";var r=t(774);e.exports=function(e,n){return function(e){return function(n){var t=n&&a(n);return t&&i.call(e,t)?e[t]:null}}(function(e,n){var t={};if(!e||!e.type)throw new Error("mdast-util-definitions expected node");return r(e,"definition",n&&n.commonmark?function(e){var n=a(e.identifier);i.call(t,n)||(t[n]=e)}:function(e){t[a(e.identifier)]=e}),t}(e,n))};var i={}.hasOwnProperty;function a(e){return e.toUpperCase()}},401:function(e,n,t){"use strict";e.exports=function(e,n,t){var o=n&&n.type,u=a.call(e.handlers,o)?e.handlers[o]:null;if(!o)throw new Error("Expected node, got `"+n+"`");return("function"==typeof u?u:function(e,n){if(function(e){var n=e.data||{};if(a.call(n,"hName")||a.call(n,"hProperties")||a.call(n,"hChildren"))return!1;return"value"in e}(n))return e.augment(n,r("text",n.value));return e(n,"div",i(e,n))})(e,n,t)};var r=t(26),i=t(19),a={}.hasOwnProperty},402:function(e,n,t){"use strict";e.exports=function(e,n){return e(n,"hr")}},403:function(e,n,t){"use strict";e.exports=function(e,n){var t,a,o={},u=n.ordered?"ol":"ul",s=-1;"number"==typeof n.start&&1!==n.start&&(o.start=n.start);t=i(e,n),a=t.length;for(;++s<a;)if(t[s].properties.className&&-1!==t[s].properties.className.indexOf("task-list-item")){o.className=["contains-task-list"];break}return e(n,u,o,r(t,!0))};var r=t(72),i=t(19)},404:function(e,n,t){"use strict";e.exports=function(e,n){var t=e.footnoteOrder,i=n.identifier;-1===t.indexOf(i)&&t.push(i);return e(n.position,"sup",{id:"fnref-"+i},[e(n,"a",{href:"#fn-"+i,className:["footnote-ref"]},[r("text",n.label||i)])])};var r=t(26)},405:function(e,n,t){"use strict";e.exports=function(e,n){var t,a,o,u=n.referenceType,s="]";"collapsed"===u?s+="[]":"full"===u&&(s+="["+(n.label||n.identifier)+"]");if("imageReference"===n.type)return r("text","!["+n.alt+s);t=i(e,n),(a=t[0])&&"text"===a.type?a.value="["+a.value:t.unshift(r("text","["));(o=t[t.length-1])&&"text"===o.type?o.value+=s:t.push(r("text",s));return t};var r=t(26),i=t(19)},685:function(e,n,t){"use strict";e.exports=o;var r=["\\","`","*","{","}","[","]","(",")","#","+","-",".","!","_",">"],i=r.concat(["~","|"]),a=i.concat(["\n",'"',"$","%","&","'",",","/",":",";","<","=","?","@","^"]);function o(e){var n=e||{};return n.commonmark?a:n.gfm?i:r}o.default=r,o.gfm=i,o.commonmark=a},72:function(e,n,t){"use strict";e.exports=function(e,n){var t=[],i=-1,a=e.length;n&&t.push(r("text","\n"));for(;++i<a;)i&&t.push(r("text","\n")),t.push(e[i]);n&&0!==e.length&&t.push(r("text","\n"));return t};var r=t(26)},735:function(e,n,t){"use strict";e.exports=t(736)},736:function(e,n,t){"use strict";e.exports=function(e,n){var t=n||{},o=t.heading?a(t.heading):null,u=r(e,o,t),s=u.map;u.map=0===s.length?null:i(s,t.tight,t.prefix),o||(u.index=null,u.endIndex=null);return u};var r=t(737),i=t(740),a=t(389)},737:function(e,n,t){"use strict";e.exports=function(e,n,t){var l,c,f=e.children.length,d=null,p=null!==n,g=t.maxDepth||6,h=t.skip?u(t.skip):null,v=a(t.parents||e),m=[];p||(l=-1);o.reset(),i(e,"heading",function(e,t,i){var a=r(e),u=e.data&&e.data.hProperties&&e.data.hProperties.id,f=o.slug(u||a);v(i)&&(p&&(function(e,n){return n&&s(e)&&e.depth<=n}(e,d)&&(c=t,p=!1),function(e,n,t){return null===n&&s(e)&&t.test(r(e))}(e,d,n)&&(l=t+1,d=e.depth)),!(!p&&a&&e.depth<=g)||h&&h.test(a)||m.push({depth:e.depth,children:e.children,id:f}))}),l&&!c&&(c=f+1);void 0===l&&(l=-1,c=-1,m=[]);return{index:l,endIndex:c,map:m}};var r=t(386),i=t(738),a=t(388),o=t(387)(),u=t(389),s=a("heading")},738:function(e,n,t){"use strict";e.exports=u;var r=t(739),i=r.CONTINUE,a=r.SKIP,o=r.EXIT;function u(e,n,t,i){"function"==typeof n&&"function"!=typeof t&&(i=t,t=n,n=null),r(e,n,function(e,n){var r=n[n.length-1],i=r?r.children.indexOf(e):null;return t(e,i,r)},i)}u.CONTINUE=i,u.SKIP=a,u.EXIT=o},739:function(e,n,t){"use strict";e.exports=u;var r=t(388),i=!0,a="skip",o=!1;function u(e,n,t,i){var u;function l(e,r,c){var f,d=[];return(n&&!u(e,r,c[c.length-1]||null)||(d=s(t(e,c)))[0]!==o)&&e.children&&d[0]!==a&&(f=s(function(e,n){var t,r=i?-1:1,a=(i?e.length:-1)+r;for(;a>-1&&a<e.length;){if((t=l(e[a],a,n))[0]===o)return t;a="number"==typeof t[1]?t[1]:a+r}}(e.children,c.concat(e))))[0]===o?f:d}"function"==typeof n&&"function"!=typeof t&&(i=t,t=n,n=null),u=r(n),l(e,null,[])}function s(e){return null!==e&&"object"==typeof e&&"length"in e?e:"number"==typeof e?[i,e]:[e]}u.CONTINUE=i,u.SKIP=a,u.EXIT=o},740:function(e,n,t){"use strict";var r=t(169);e.exports=function(e,n,t){var r,i=1/0,a=-1,o=e.length;for(;++a<o;)e[a].depth<i&&(i=e[a].depth);a=-1;for(;++a<o;)e[a].depth-=i-1;r=d(),a=-1;for(;++a<o;)l(e[a],r,n,t);return r};var i="list",a="listItem",o="paragraph",u="link",s="linkReference";function l(e,n,t,r){var s,f,g=n.children,h=g.length,v=g[h-1];if(1===e.depth?((f=p()).children.push({type:o,children:[{type:u,title:null,url:"#"+(r||"")+e.id,children:c(e.children)}]}),g.push(f)):v&&v.type===a?l(e,v,t,r):v&&v.type===i?(e.depth--,l(e,v,t,r)):n.type===i?(l(e,f=p(),t,r),g.push(f)):(f=d(),e.depth--,l(e,f,t,r),g.push(f)),n.spread=!t,n.type===i&&n.spread)for(n.spread=!1,s=-1;++s<h;)if(g[s].children.length>1){n.spread=!0;break}}function c(e){for(var n=[],t=e.length,r=-1;++r<t;)n=n.concat(f(e[r]));return n}function f(e){var n;return e.type===u||e.type===s?c(e.children):(delete(n=r({},e)).children,delete n.position,n=r(!0,{},n),e.children&&(n.children=c(e.children)),n)}function d(){return{type:i,ordered:!1,spread:!1,children:[]}}function p(){return{type:a,spread:!1,children:[]}}},774:function(e,n,t){"use strict";e.exports=u;var r=t(775),i=r.CONTINUE,a=r.SKIP,o=r.EXIT;function u(e,n,t,i){"function"==typeof n&&"function"!=typeof t&&(i=t,t=n,n=null),r(e,n,function(e,n){var r=n[n.length-1],i=r?r.children.indexOf(e):null;return t(e,i,r)},i)}u.CONTINUE=i,u.SKIP=a,u.EXIT=o},775:function(e,n,t){"use strict";e.exports=u;var r=t(776),i=!0,a="skip",o=!1;function u(e,n,t,i){var u;function l(e,r,c){var f,d=[];return(n&&!u(e,r,c[c.length-1]||null)||(d=s(t(e,c)))[0]!==o)&&e.children&&d[0]!==a&&(f=s(function(e,n){var t,r=i?-1:1,a=(i?e.length:-1)+r;for(;a>-1&&a<e.length;){if((t=l(e[a],a,n))[0]===o)return t;a="number"==typeof t[1]?t[1]:a+r}}(e.children,c.concat(e))))[0]===o?f:d}"function"==typeof n&&"function"!=typeof t&&(i=t,t=n,n=null),u=r(n),l(e,null,[])}function s(e){return null!==e&&"object"==typeof e&&"length"in e?e:"number"==typeof e?[i,e]:[e]}u.CONTINUE=i,u.SKIP=a,u.EXIT=o},776:function(e,n,t){"use strict";function r(e){if("string"==typeof e)return function(e){return function(n){return Boolean(n&&n.type===e)}}(e);if(null===e||void 0===e)return i;if("object"==typeof e)return("length"in e?function(e){var n=function(e){var n=[],t=e.length,i=-1;for(;++i<t;)n[i]=r(e[i]);return n}(e),t=n.length;return function(){var e=-1;for(;++e<t;)if(n[e].apply(this,arguments))return!0;return!1}}:function(e){return function(n){var t;for(t in e)if(n[t]!==e[t])return!1;return!0}})(e);if("function"==typeof e)return e;throw new Error("Expected function, string, or object as test")}function i(){return!0}e.exports=r},799:function(e,n,t){"use strict";e.exports=t(800)},800:function(e,n,t){"use strict";e.exports=function(e,n){var t=function(e,n){var t=n||{},i=t.allowDangerousHTML,l={};return p.dangerous=i,p.definition=s(e,t),p.footnoteById=l,p.footnoteOrder=[],p.augment=c,p.handlers=r(f,t.handlers||{}),a(e,"footnoteDefinition",function(e){var n=e.identifier.toUpperCase();d.call(l,n)||(l[n]=e)}),p;function c(e,n){var t,i;return e&&"data"in e&&(t=e.data,"element"===n.type&&t.hName&&(n.tagName=t.hName),"element"===n.type&&t.hProperties&&(n.properties=r(n.properties,t.hProperties)),n.children&&t.hChildren&&(n.children=t.hChildren)),i=e&&e.position?e:{position:e},u(i)||(n.position={start:o.start(i),end:o.end(i)}),n}function p(e,n,t,r){return(void 0===r||null===r)&&"object"==typeof t&&"length"in t&&(r=t,t={}),c(e,{type:"element",tagName:n,properties:t||{},children:r||[]})}}(e,n),p=l(t,e),g=c(t);g&&(p.children=p.children.concat(i("text","\n"),g));return p};var r=t(22),i=t(26),a=t(120),o=t(123),u=t(801),s=t(802),l=t(401),c=t(803),f=t(804),d={}.hasOwnProperty},801:function(e,n,t){"use strict";function r(e){return e&&"object"==typeof e?e:{}}e.exports=function(e){var n=r(r(e).position),t=r(n.start),i=r(n.end);return!(t.line&&t.column&&i.line&&i.column)}},802:function(e,n,t){"use strict";var r=t(120);e.exports=function(e,n){return function(e){return function(n){var t=n&&a(n);return t&&i.call(e,t)?e[t]:null}}(function(e,n){var t={};if(!e||!e.type)throw new Error("mdast-util-definitions expected node");return r(e,"definition",n&&n.commonmark?function(e){var n=a(e.identifier);i.call(t,n)||(t[n]=e)}:function(e){t[a(e.identifier)]=e}),t}(e,n))};var i={}.hasOwnProperty;function a(e){return e.toUpperCase()}},803:function(e,n,t){"use strict";e.exports=function(e){var n,t,o,u,s=e.footnoteById,l=e.footnoteOrder,c=l.length,f=-1,d=[];for(;++f<c;)(n=s[l[f].toUpperCase()])&&(o=n.children.concat(),u=o[o.length-1],t={type:"link",url:"#fnref-"+n.identifier,data:{hProperties:{className:["footnote-backref"]}},children:[{type:"text",value:"↩"}]},u&&"paragraph"===u.type||(u={type:"paragraph",children:[]},o.push(u)),u.children.push(t),d.push({type:"listItem",data:{hProperties:{id:"fn-"+n.identifier}},children:o,position:n.position}));if(0===d.length)return null;return e(null,"div",{className:["footnotes"]},a([r(e),i(e,{type:"list",ordered:!0,children:d})],!0))};var r=t(402),i=t(403),a=t(72)},804:function(e,n,t){"use strict";function r(){return null}e.exports={blockquote:t(805),break:t(806),code:t(807),delete:t(808),emphasis:t(809),footnoteReference:t(404),footnote:t(810),heading:t(811),html:t(812),imageReference:t(813),image:t(814),inlineCode:t(815),linkReference:t(816),link:t(817),listItem:t(818),list:t(403),paragraph:t(819),root:t(820),strong:t(821),table:t(822),text:t(823),thematicBreak:t(402),toml:r,yaml:r,definition:r,footnoteDefinition:r}},805:function(e,n,t){"use strict";e.exports=function(e,n){return e(n,"blockquote",r(i(e,n),!0))};var r=t(72),i=t(19)},806:function(e,n,t){"use strict";e.exports=function(e,n){return[e(n,"br"),r("text","\n")]};var r=t(26)},807:function(e,n,t){"use strict";e.exports=function(e,n){var t=n.value?r(n.value+"\n"):"",a=n.lang&&n.lang.match(/^[^ \t]+(?=[ \t]|$)/),o={};a&&(o.className=["language-"+a]);return e(n.position,"pre",[e(n,"code",o,[i("text",t)])])};var r=t(397),i=t(26)},808:function(e,n,t){"use strict";e.exports=function(e,n){return e(n,"del",r(e,n))};var r=t(19)},809:function(e,n,t){"use strict";e.exports=function(e,n){return e(n,"em",r(e,n))};var r=t(19)},810:function(e,n,t){"use strict";e.exports=function(e,n){var t=e.footnoteById,i=e.footnoteOrder,a=1;for(;a in t;)a++;return a=String(a),i.push(a),t[a]={type:"footnoteDefinition",identifier:a,children:[{type:"paragraph",children:n.children}],position:n.position},r(e,{type:"footnoteReference",identifier:a,position:n.position})};var r=t(404)},811:function(e,n,t){"use strict";e.exports=function(e,n){return e(n,"h"+n.depth,r(e,n))};var r=t(19)},812:function(e,n,t){"use strict";e.exports=function(e,n){return e.dangerous?e.augment(n,r("raw",n.value)):null};var r=t(26)},813:function(e,n,t){"use strict";e.exports=function(e,n){var t,a=e.definition(n.identifier);if(!a)return i(e,n);t={src:r(a.url||""),alt:n.alt},null!==a.title&&void 0!==a.title&&(t.title=a.title);return e(n,"img",t)};var r=t(54),i=t(405)},814:function(e,n,t){"use strict";var r=t(54);e.exports=function(e,n){var t={src:r(n.url),alt:n.alt};null!==n.title&&void 0!==n.title&&(t.title=n.title);return e(n,"img",t)}},815:function(e,n,t){"use strict";e.exports=function(e,n){return e(n,"code",[i("text",r(n.value))])};var r=t(173),i=t(26)},816:function(e,n,t){"use strict";e.exports=function(e,n){var t,o=e.definition(n.identifier);if(!o)return i(e,n);t={href:r(o.url||"")},null!==o.title&&void 0!==o.title&&(t.title=o.title);return e(n,"a",t,a(e,n))};var r=t(54),i=t(405),a=t(19)},817:function(e,n,t){"use strict";var r=t(54),i=t(19);e.exports=function(e,n){var t={href:r(n.url)};null!==n.title&&void 0!==n.title&&(t.title=n.title);return e(n,"a",t,i(e,n))}},818:function(e,n,t){"use strict";e.exports=function(e,n,t){var u,s,l,c,f,d=n.children[0],p=a(e,n),g=t?function(e){var n=e.spread,t=e.children,r=t.length,i=-1;for(;!n&&++i<r;)n=o(t[i]);return n}(t):o(n),h={};if(g)u=p;else for(u=[],c=p.length,l=-1;++l<c;)"p"===(f=p[l]).tagName?u=u.concat(f.children):u.push(f);"boolean"==typeof n.checked&&(!g||d&&"paragraph"===d.type||u.unshift(e(null,"p",[])),0!==(s=g?u[0].children:u).length&&s.unshift(r("text"," ")),s.unshift(e(null,"input",{type:"checkbox",checked:n.checked,disabled:!0})),h.className=["task-list-item"]);g&&0!==u.length&&(u=i(u,!0));return e(n,"li",h,u)};var r=t(26),i=t(72),a=t(19);function o(e){var n=e.spread;return void 0===n||null===n?e.children.length>1:n}},819:function(e,n,t){"use strict";e.exports=function(e,n){return e(n,"p",r(e,n))};var r=t(19)},820:function(e,n,t){"use strict";e.exports=function(e,n){return e.augment(n,r("root",i(a(e,n))))};var r=t(26),i=t(72),a=t(19)},821:function(e,n,t){"use strict";e.exports=function(e,n){return e(n,"strong",r(e,n))};var r=t(19)},822:function(e,n,t){"use strict";e.exports=function(e,n){var t,o,u,s,l,c=n.children,f=c.length,d=n.align,p=d.length,g=[];for(;f--;){for(o=c[f].children,s=0===f?"th":"td",t=p,u=[];t--;)l=o[t],u[t]=e(l,s,{align:d[t]},l?a(e,l):[]);g[f]=e(c[f],"tr",i(u,!0))}return e(n,"table",i([e(g[0].position,"thead",i([g[0]],!0)),e({start:r.start(g[1]),end:r.end(g[g.length-1])},"tbody",i(g.slice(1),!0))],!0))};var r=t(123),i=t(72),a=t(19)},823:function(e,n,t){"use strict";e.exports=function(e,n){return e.augment(n,r("text",i(n.value)))};var r=t(26),i=t(400)},836:function(e,n,t){"use strict";var r=t(837),i=t(384);function a(){}a.prototype=r;var o=new a;e.exports=o,o.highlight=function(e,n,t){var r=(t||{}).prefix;null!==r&&void 0!==r||(r=c);return E(y(e,n,!0,r))},o.highlightAuto=x,o.registerLanguage=function(e,n){var t=n(o);v[e]=t,h.push(e),t.aliases&&b(e,t.aliases)},o.listLanguages=function(){return h.concat()},o.registerAlias=b,o.getLanguage=R;var u=r.inherit,s={}.hasOwnProperty,l=[].concat,c="hljs-",f="case_insensitive",d="cached_variants",p=" ",g="|",h=[],v={},m={};function x(e,n){var t,r,a,o,u=n||{},s=u.subset||h,l=u.prefix,f=s.length,d=-1;if(null!==l&&void 0!==l||(l=c),"string"!=typeof e)throw i("Expected `string` for value, got `%s`",e);for(r=E({}),t=E({});++d<f;)R(o=s[d])&&((a=E(y(o,e,!1,l))).language=o,a.relevance>r.relevance&&(r=a),a.relevance>t.relevance&&(r=t,t=a));return r.language&&(t.secondBest=r),t}function b(e,n){var t,r,i,a,o=e;for(t in n&&((o={})[e]=n),o)for(i=(r="string"==typeof(r=o[t])?[r]:r).length,a=-1;++a<i;)m[r[a]]=t}function y(e,n,t,r,a){var o,c,h,m,b,E,_,k,O={},C=[],I="",L=0;if("string"!=typeof e)throw i("Expected `string` for name, got `%s`",e);if("string"!=typeof n)throw i("Expected `string` for value, got `%s`",n);if(o=R(e),h=c=a||o,m=k=[],!o)throw i("Unknown language: `%s` is not registered",e);!function(e){function n(n,r){return new RegExp(t(n),"m"+(e[f]?"i":"")+(r?"g":""))}function t(e){return e&&e.source||e}!function r(i,a){var o={};var s;if(i.compiled)return;i.compiled=!0;i.keywords=i.keywords||i.beginKeywords;i.keywords&&("string"==typeof i.keywords?c("keyword",i.keywords):Object.keys(i.keywords).forEach(function(e){c(e,i.keywords[e])}),i.keywords=o);i.lexemesRe=n(i.lexemes||/\w+/,!0);a&&(i.beginKeywords&&(i.begin="\\b("+i.beginKeywords.split(p).join(g)+")\\b"),i.begin||(i.begin=/\B|\b/),i.beginRe=n(i.begin),i.end||i.endsWithParent||(i.end=/\B|\b/),i.end&&(i.endRe=n(i.end)),i.terminatorEnd=t(i.end)||"",i.endsWithParent&&a.terminatorEnd&&(i.terminatorEnd+=(i.end?g:"")+a.terminatorEnd));i.illegal&&(i.illegalRe=n(i.illegal));void 0===i.relevance&&(i.relevance=1);i.contains||(i.contains=[]);i.contains=l.apply([],i.contains.map(function(e){return function(e){var n,t,r,i;if(e.variants&&!e[d]){for(r=e.variants,n=r.length,t=-1,i=[];++t<n;)i[t]=u(e,{variants:null},r[t]);e[d]=i}return e[d]||(e.endsWithParent?[u(e)]:[e])}("self"===e?i:e)}));i.contains.forEach(function(e){r(e,i)});i.starts&&r(i.starts,a);s=i.contains.map(function(e){return e.beginKeywords?"\\.?("+e.begin+")\\.?":e.begin}).concat([i.terminatorEnd,i.illegal]).map(t).filter(Boolean);i.terminators=0===s.length?{exec:N}:n(s.join(g),!0);function c(n,t){var r,i,a,u;for(e[f]&&(t=t.toLowerCase()),r=t.split(p),u=r.length,a=-1;++a<u;)i=r[a].split(g),o[i[0]]=[n,i[1]?Number(i[1]):1]}}(e)}(o);try{for(c.terminators.lastIndex=0,b=0,_=c.terminators.exec(n);_;)E=B(n.substring(b,_.index),_[0]),b=_.index+E,c.terminators.lastIndex=b,_=c.terminators.exec(n);for(B(n.substr(b)),h=c;h.parent;)h.className&&j(),h=h.parent;return{relevance:L,value:m,language:e,top:c}}catch(e){if(-1===e.message.indexOf("Illegal"))throw e;return{relevance:0,value:A(n,[])}}function B(e,n){var r,a,o;if(I+=e,void 0===n)return T(S(),m),0;if(r=function(e,n){var t=n.contains,r=t.length,i=-1;for(;++i<r;)if(w(t[i].beginRe,e))return t[i]}(n,c))return T(S(),m),M(r,n),r.returnBegin?0:n.length;if(a=function e(n,t){if(w(n.endRe,t)){for(;n.endsParent&&n.parent;)n=n.parent;return n}if(n.endsWithParent)return e(n.parent,t)}(c,n)){(o=c).returnEnd||o.excludeEnd||(I+=n),T(S(),m);do{c.className&&j(),L+=c.relevance,c=c.parent}while(c!==a.parent);return o.excludeEnd&&A(n,m),I="",a.starts&&M(a.starts,""),o.returnEnd?0:n.length}if(function(e,n){return!t&&w(n.illegalRe,e)}(n,c))throw i('Illegal lexeme "%s" for mode "%s"',n,c.className||"<unnamed>");return I+=n,n.length||1}function M(e,n){var t;e.className&&(t=D(e.className,[])),e.returnBegin?I="":e.excludeBegin?(A(n,m),I=""):I=n,t&&(m.push(t),C.push(m),m=t.children),c=Object.create(e,{parent:{value:c}})}function S(){var e=c.subLanguage?function(){var e,n="string"==typeof c.subLanguage;if(n&&!v[c.subLanguage])return A(I,[]);e=n?y(c.subLanguage,I,!0,r,O[c.subLanguage]):x(I,{subset:0===c.subLanguage.length?void 0:c.subLanguage,prefix:r});if(!e.language)return[P(I)];c.relevance>0&&(L+=e.relevance);n&&(O[c.subLanguage]=e.top);return[D(e.language,e.value,!0)]}():function(){var e,n,t,r,i=[];if(!c.keywords)return A(I,i);e=0,c.lexemesRe.lastIndex=0,n=c.lexemesRe.exec(I);for(;n;)A(I.substring(e,n.index),i),(r=U(c,n))?(L+=r[1],t=D(r[0],[]),i.push(t),A(n[0],t.children)):A(n[0],i),e=c.lexemesRe.lastIndex,n=c.lexemesRe.exec(I);return A(I.substr(e),i),i}();return I="",e}function T(e,n){for(var t,r=e.length,i=-1;++i<r;)"text"===(t=e[i]).type?A(t.value,n):n.push(t)}function A(e,n){var t;return e&&((t=n[n.length-1])&&"text"===t.type?t.value+=e:n.push(P(e))),n}function P(e){return{type:"text",value:e}}function D(e,n,t){return{type:"element",tagName:"span",properties:{className:[(t?"":r)+e]},children:n}}function U(e,n){var t=n[0];return o[f]&&(t=t.toLowerCase()),s.call(e.keywords,t)&&e.keywords[t]}function j(){m=C.pop()||k}}function E(e){return{relevance:e.relevance||0,language:e.language||null,value:e.value||[]}}function w(e,n){var t=e&&e.exec(n);return t&&0===t.index}function N(){return null}function R(e){return e=e.toLowerCase(),v[e]||v[m[e]]}},837:function(e,n,t){var r,i,a;i=function(e){var n,t=[],r=Object.keys,i={},a={},o=/^(no-?highlight|plain|text)$/i,u=/\blang(?:uage)?-([\w-]+)\b/i,s=/((^(<[^>]+>|\t|)+|(?:\n)))/gm,l="</span>",c={classPrefix:"hljs-",tabReplace:null,useBR:!1,languages:void 0};function f(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function d(e){return e.nodeName.toLowerCase()}function p(e,n){var t=e&&e.exec(n);return t&&0===t.index}function g(e){return o.test(e)}function h(e){var n,t={},r=Array.prototype.slice.call(arguments,1);for(n in e)t[n]=e[n];return r.forEach(function(e){for(n in e)t[n]=e[n]}),t}function v(e){var n=[];return function e(t,r){for(var i=t.firstChild;i;i=i.nextSibling)3===i.nodeType?r+=i.nodeValue.length:1===i.nodeType&&(n.push({event:"start",offset:r,node:i}),r=e(i,r),d(i).match(/br|hr|img|input/)||n.push({event:"stop",offset:r,node:i}));return r}(e,0),n}function m(e){if(n&&!e.langApiRestored){for(var t in e.langApiRestored=!0,n)e[t]&&(e[n[t]]=e[t]);(e.contains||[]).concat(e.variants||[]).forEach(m)}}function x(e){function n(e){return e&&e.source||e}function t(t,r){return new RegExp(n(t),"m"+(e.case_insensitive?"i":"")+(r?"g":""))}!function i(a,o){if(!a.compiled){if(a.compiled=!0,a.keywords=a.keywords||a.beginKeywords,a.keywords){var u={},s=function(n,t){e.case_insensitive&&(t=t.toLowerCase()),t.split(" ").forEach(function(e){var t=e.split("|");u[t[0]]=[n,t[1]?Number(t[1]):1]})};"string"==typeof a.keywords?s("keyword",a.keywords):r(a.keywords).forEach(function(e){s(e,a.keywords[e])}),a.keywords=u}a.lexemesRe=t(a.lexemes||/\w+/,!0),o&&(a.beginKeywords&&(a.begin="\\b("+a.beginKeywords.split(" ").join("|")+")\\b"),a.begin||(a.begin=/\B|\b/),a.beginRe=t(a.begin),a.endSameAsBegin&&(a.end=a.begin),a.end||a.endsWithParent||(a.end=/\B|\b/),a.end&&(a.endRe=t(a.end)),a.terminator_end=n(a.end)||"",a.endsWithParent&&o.terminator_end&&(a.terminator_end+=(a.end?"|":"")+o.terminator_end)),a.illegal&&(a.illegalRe=t(a.illegal)),null==a.relevance&&(a.relevance=1),a.contains||(a.contains=[]),a.contains=Array.prototype.concat.apply([],a.contains.map(function(e){return function(e){return e.variants&&!e.cached_variants&&(e.cached_variants=e.variants.map(function(n){return h(e,{variants:null},n)})),e.cached_variants||e.endsWithParent&&[h(e)]||[e]}("self"===e?a:e)})),a.contains.forEach(function(e){i(e,a)}),a.starts&&i(a.starts,o);var l=a.contains.map(function(e){return e.beginKeywords?"\\.?(?:"+e.begin+")\\.?":e.begin}).concat([a.terminator_end,a.illegal]).map(n).filter(Boolean);a.terminators=l.length?t(function(e,t){for(var r=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./,i=0,a="",o=0;o<e.length;o++){var u=i,s=n(e[o]);for(o>0&&(a+=t);s.length>0;){var l=r.exec(s);if(null==l){a+=s;break}a+=s.substring(0,l.index),s=s.substring(l.index+l[0].length),"\\"==l[0][0]&&l[1]?a+="\\"+String(Number(l[1])+u):(a+=l[0],"("==l[0]&&i++)}}return a}(l,"|"),!0):{exec:function(){return null}}}}(e)}function b(e,n,t,r){function a(e,n){var t=g.case_insensitive?n[0].toLowerCase():n[0];return e.keywords.hasOwnProperty(t)&&e.keywords[t]}function o(e,n,t,r){var i='<span class="'+(r?"":c.classPrefix);return e?(i+=e+'">')+n+(t?"":l):n}function u(){E+=null!=v.subLanguage?function(){var e="string"==typeof v.subLanguage;if(e&&!i[v.subLanguage])return f(w);var n=e?b(v.subLanguage,w,!0,m[v.subLanguage]):y(w,v.subLanguage.length?v.subLanguage:void 0);return v.relevance>0&&(N+=n.relevance),e&&(m[v.subLanguage]=n.top),o(n.language,n.value,!1,!0)}():function(){var e,n,t,r;if(!v.keywords)return f(w);for(r="",n=0,v.lexemesRe.lastIndex=0,t=v.lexemesRe.exec(w);t;)r+=f(w.substring(n,t.index)),(e=a(v,t))?(N+=e[1],r+=o(e[0],f(t[0]))):r+=f(t[0]),n=v.lexemesRe.lastIndex,t=v.lexemesRe.exec(w);return r+f(w.substr(n))}(),w=""}function s(e){E+=e.className?o(e.className,"",!0):"",v=Object.create(e,{parent:{value:v}})}function d(e,n){if(w+=e,null==n)return u(),0;var r=function(e,n){var t,r,i;for(t=0,r=n.contains.length;t<r;t++)if(p(n.contains[t].beginRe,e))return n.contains[t].endSameAsBegin&&(n.contains[t].endRe=(i=n.contains[t].beginRe.exec(e)[0],new RegExp(i.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&"),"m"))),n.contains[t]}(n,v);if(r)return r.skip?w+=n:(r.excludeBegin&&(w+=n),u(),r.returnBegin||r.excludeBegin||(w=n)),s(r),r.returnBegin?0:n.length;var i=function e(n,t){if(p(n.endRe,t)){for(;n.endsParent&&n.parent;)n=n.parent;return n}if(n.endsWithParent)return e(n.parent,t)}(v,n);if(i){var a=v;a.skip?w+=n:(a.returnEnd||a.excludeEnd||(w+=n),u(),a.excludeEnd&&(w=n));do{v.className&&(E+=l),v.skip||v.subLanguage||(N+=v.relevance),v=v.parent}while(v!==i.parent);return i.starts&&(i.endSameAsBegin&&(i.starts.endRe=i.endRe),s(i.starts)),a.returnEnd?0:n.length}if(function(e,n){return!t&&p(n.illegalRe,e)}(n,v))throw new Error('Illegal lexeme "'+n+'" for mode "'+(v.className||"<unnamed>")+'"');return w+=n,n.length||1}var g=R(e);if(!g)throw new Error('Unknown language: "'+e+'"');x(g);var h,v=r||g,m={},E="";for(h=v;h!==g;h=h.parent)h.className&&(E=o(h.className,"",!0)+E);var w="",N=0;try{for(var _,k,O=0;v.terminators.lastIndex=O,_=v.terminators.exec(n);)k=d(n.substring(O,_.index),_[0]),O=_.index+k;for(d(n.substr(O)),h=v;h.parent;h=h.parent)h.className&&(E+=l);return{relevance:N,value:E,language:e,top:v}}catch(e){if(e.message&&-1!==e.message.indexOf("Illegal"))return{relevance:0,value:f(n)};throw e}}function y(e,n){n=n||c.languages||r(i);var t={relevance:0,value:f(e)},a=t;return n.filter(R).filter(_).forEach(function(n){var r=b(n,e,!1);r.language=n,r.relevance>a.relevance&&(a=r),r.relevance>t.relevance&&(a=t,t=r)}),a.language&&(t.second_best=a),t}function E(e){return c.tabReplace||c.useBR?e.replace(s,function(e,n){return c.useBR&&"\n"===e?"<br>":c.tabReplace?n.replace(/\t/g,c.tabReplace):""}):e}function w(e){var n,r,i,o,s,l=function(e){var n,t,r,i,a=e.className+" ";if(a+=e.parentNode?e.parentNode.className:"",t=u.exec(a))return R(t[1])?t[1]:"no-highlight";for(n=0,r=(a=a.split(/\s+/)).length;n<r;n++)if(g(i=a[n])||R(i))return i}(e);g(l)||(c.useBR?(n=document.createElementNS("http://www.w3.org/1999/xhtml","div")).innerHTML=e.innerHTML.replace(/\n/g,"").replace(/<br[ \/]*>/g,"\n"):n=e,s=n.textContent,i=l?b(l,s,!0):y(s),(r=v(n)).length&&((o=document.createElementNS("http://www.w3.org/1999/xhtml","div")).innerHTML=i.value,i.value=function(e,n,r){var i=0,a="",o=[];function u(){return e.length&&n.length?e[0].offset!==n[0].offset?e[0].offset<n[0].offset?e:n:"start"===n[0].event?e:n:e.length?e:n}function s(e){a+="<"+d(e)+t.map.call(e.attributes,function(e){return" "+e.nodeName+'="'+f(e.value).replace('"',"&quot;")+'"'}).join("")+">"}function l(e){a+="</"+d(e)+">"}function c(e){("start"===e.event?s:l)(e.node)}for(;e.length||n.length;){var p=u();if(a+=f(r.substring(i,p[0].offset)),i=p[0].offset,p===e){o.reverse().forEach(l);do{c(p.splice(0,1)[0]),p=u()}while(p===e&&p.length&&p[0].offset===i);o.reverse().forEach(s)}else"start"===p[0].event?o.push(p[0].node):o.pop(),c(p.splice(0,1)[0])}return a+f(r.substr(i))}(r,v(o),s)),i.value=E(i.value),e.innerHTML=i.value,e.className=function(e,n,t){var r=n?a[n]:t,i=[e.trim()];return e.match(/\bhljs\b/)||i.push("hljs"),-1===e.indexOf(r)&&i.push(r),i.join(" ").trim()}(e.className,l,i.language),e.result={language:i.language,re:i.relevance},i.second_best&&(e.second_best={language:i.second_best.language,re:i.second_best.relevance}))}function N(){if(!N.called){N.called=!0;var e=document.querySelectorAll("pre code");t.forEach.call(e,w)}}function R(e){return e=(e||"").toLowerCase(),i[e]||i[a[e]]}function _(e){var n=R(e);return n&&!n.disableAutodetect}return e.highlight=b,e.highlightAuto=y,e.fixMarkup=E,e.highlightBlock=w,e.configure=function(e){c=h(c,e)},e.initHighlighting=N,e.initHighlightingOnLoad=function(){addEventListener("DOMContentLoaded",N,!1),addEventListener("load",N,!1)},e.registerLanguage=function(n,t){var r=i[n]=t(e);m(r),r.aliases&&r.aliases.forEach(function(e){a[e]=n})},e.listLanguages=function(){return r(i)},e.getLanguage=R,e.autoDetection=_,e.inherit=h,e.IDENT_RE="[a-zA-Z]\\w*",e.UNDERSCORE_IDENT_RE="[a-zA-Z_]\\w*",e.NUMBER_RE="\\b\\d+(\\.\\d+)?",e.C_NUMBER_RE="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",e.BINARY_NUMBER_RE="\\b(0b[01]+)",e.RE_STARTERS_RE="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",e.BACKSLASH_ESCAPE={begin:"\\\\[\\s\\S]",relevance:0},e.APOS_STRING_MODE={className:"string",begin:"'",end:"'",illegal:"\\n",contains:[e.BACKSLASH_ESCAPE]},e.QUOTE_STRING_MODE={className:"string",begin:'"',end:'"',illegal:"\\n",contains:[e.BACKSLASH_ESCAPE]},e.PHRASAL_WORDS_MODE={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},e.COMMENT=function(n,t,r){var i=e.inherit({className:"comment",begin:n,end:t,contains:[]},r||{});return i.contains.push(e.PHRASAL_WORDS_MODE),i.contains.push({className:"doctag",begin:"(?:TODO|FIXME|NOTE|BUG|XXX):",relevance:0}),i},e.C_LINE_COMMENT_MODE=e.COMMENT("//","$"),e.C_BLOCK_COMMENT_MODE=e.COMMENT("/\\*","\\*/"),e.HASH_COMMENT_MODE=e.COMMENT("#","$"),e.NUMBER_MODE={className:"number",begin:e.NUMBER_RE,relevance:0},e.C_NUMBER_MODE={className:"number",begin:e.C_NUMBER_RE,relevance:0},e.BINARY_NUMBER_MODE={className:"number",begin:e.BINARY_NUMBER_RE,relevance:0},e.CSS_NUMBER_MODE={className:"number",begin:e.NUMBER_RE+"(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",relevance:0},e.REGEXP_MODE={className:"regexp",begin:/\//,end:/\/[gimuy]*/,illegal:/\n/,contains:[e.BACKSLASH_ESCAPE,{begin:/\[/,end:/\]/,relevance:0,contains:[e.BACKSLASH_ESCAPE]}]},e.TITLE_MODE={className:"title",begin:e.IDENT_RE,relevance:0},e.UNDERSCORE_TITLE_MODE={className:"title",begin:e.UNDERSCORE_IDENT_RE,relevance:0},e.METHOD_GUARD={begin:"\\.\\s*"+e.UNDERSCORE_IDENT_RE,relevance:0},e},a="object"==typeof window&&window||"object"==typeof self&&self,n.nodeType?a&&(a.hljs=i({}),void 0===(r=function(){return a.hljs}.apply(n,[]))||(e.exports=r)):i(n)}}]);
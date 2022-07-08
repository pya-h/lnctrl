"use strict";(self.webpackChunklnctrl=self.webpackChunklnctrl||[]).push([[172],{20394:function(n,t,e){e.d(t,{Z:function(){return v}});var r=e(70885),i=e(42982),o=e(43144),a=e(15671),c=e(75758),s=e(79959),l=e(60136),u=e(43668),f=e(98737),d=e(23197),p=function(n){(0,l.Z)(e,n);var t=(0,u.Z)(e);function e(){var n,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return(0,a.Z)(this,e),(n=t.call(this,r?"\u0639\u062f\u0645 \u062a\u0637\u0627\u0628\u0642 \u062a\u0639\u062f\u0627\u062f \u0633\u062a\u0648\u0646 \u0647\u0627\u06cc ".concat(r.a," \u0628\u0627 \u062a\u0639\u062f\u0627\u062f \u0633\u0637\u0631\u0647\u0627\u06cc \u0645\u0627\u062a\u0631\u06cc\u0633 ").concat(r.b):"\u0633\u062a\u0648 \u0627\u06cc\u0646 \u062e\u0637\u0627 \u0628\u062f\u0644\u06cc\u0644 \u0636\u0631\u0628 \u062f\u0648 \u0645\u0627\u062a\u0631\u06cc\u0633\u06cc \u0627\u062a\u0641\u0627\u0642 \u0627\u0641\u062a\u0627\u062f\u0647 \u0627\u0633\u062a \u06a9\u0647 \u062f\u0631 \u0622\u0646 \u062a\u0639\u062f\u0627\u062f \u0633\u062a\u0648\u0646 \u0647\u0627\u06cc \u0645\u0627\u062a\u0631\u06cc\u0633 \u0627\u0648\u0644\u06cc \u0628\u0627 \u062a\u0639\u062f\u0627\u062f \u0633\u0637\u0631\u0647\u0627\u06cc \u0645\u0627\u062a\u0631\u06cc\u0633 \u062f\u0648\u0645 \u0628\u0631\u0627\u0628\u0631 \u0646\u06cc\u0633\u062a.!")).describe=function(){return console.log(n.message+(n.cause?"\n"+n.cause:"")),n.message+(n.cause?"\n"+n.cause.toString():"")},n.name="DimensionMismatchError",n.type="Matrix",n.code=d.error_codes.dimension_mismatch,n.cause=r,n}return(0,o.Z)(e)}((0,f.Z)(Error)),h=(0,o.Z)((function n(t){var e=this,o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;(0,a.Z)(this,n),this.det=function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:e.M,t=n.length;if(1===t)return n[0];if(2===t)return n[0][0]*n[1][1]-n[0][1]*n[1][0];for(var r=0,o=1,a=function(t){var a=(0,i.Z)(n);a.shift(),a=a.map((function(n){return n.filter((function(n,e){return e!==t}))})),r+=o*n[0][t]*e.det(a),o*=-1},c=0;c<t;c++)a(c);return r},this.adj=function(){var t=e.M.length,r=[];return 2===t&&e.M[0]instanceof Array&&e.M[0].length===t&&((r=[[0,0],[0,0]])[0][1]=-e.M[0][1],r[1][0]=-e.M[1][0],r[0][0]=e.M[1][1],r[1][1]=e.M[0][0]),new n(r)},this.transpose=function(){var t=e.M.length,r=[];if(e.M[0]instanceof Array){var i=e.M[0].length;i>1?r=Array(i).fill(Array(t).fill(0)):1===i&&(r=Array(t).fill(0));for(var o=0;o<t;o++)if(i>1)for(var a=0;a<i;a++)r[o][a]=e.M[a][o];else 1===i&&(r[o]=e.M[o][0])}else{r=Array(t).fill(Array(1).fill(0));for(var c=0;c<t;c++)r[c][0]=e.M[c]}return new n(r)},this.toString=function(){var n=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],t=e.M.length,r="";if(e.M&&e.M instanceof Array){r=n?"\\begin{pmatrix} ":"\\begin{vmatrix}";for(var i=0;i<t;i++){if(e.M[i]&&e.M[i]instanceof Array)for(var o=e.M[i].length,a=0;a<o;a++)r+=e.M[i][a].toString()+(a<o-1?" && ":"");else r+=e.M[i].toString();r+=i<t-1?" \\\\ ":""}r+=n?" \\end{pmatrix}":"\\end{vmatrix}"}else r+=e.M.toString(n);return r},this.at=function(n,t){return e.M[0]instanceof Array&&e.M.length>1?e.M[n][t]:e.M[t]},this.multiply=function(t){var i=n.dimens(e.M),o=(0,r.Z)(i,2),a=o[0],l=o[1],u=n.dimens(t),f=(0,r.Z)(u,2),d=f[0],h=f[1],v=[];if(1===a&&1===l);else if(1===d&&1===h);else{if(l!==d)throw console.log("MISMATCH"),new p(e.name&&t.name?{a:e.name,b:t.name}:null);if(t instanceof Array&&(t=new n(t)),a>1){v=Array(a).fill(0).map((function(n){return Array(h).fill(0)}));for(var Z=0;Z<a;Z++)for(var m=0;m<l;m++)for(var y=0;y<h;y++){var g=t.at(m,y);e.M[Z][m]instanceof c.Z?(v[Z][y]instanceof c.Z||(v[Z][y]=new s.Z([v[Z][y]])),v[Z][y]=v[Z][y].add(e.M[Z][m].multiply(g))):g instanceof c.Z?(v[Z][y]instanceof c.Z||(v[Z][y]=new s.Z([v[Z][y]])),v[Z][y]=v[Z][y].add(g.multiply(e.M[Z][m]))):v[Z][y]+=e.M[Z][m]*g}}else{v=Array(h).fill(0);for(var x=0;x<l;x++)for(var j=0;j<h;j++){var b=t.at(x,j);e.M[x]instanceof c.Z?(v[j]instanceof c.Z||(v[j]=new s.Z([v[j]])),v[j]=v[j].add(e.M[x].multiply(b))):b instanceof c.Z?(v[j]instanceof c.Z||(v[j]=new s.Z([v[j]])),v[j]=v[j].add(b.multiply(e.M[x]))):v[j]+=e.M[x]*b}}}return new n(v)},this.M=t&&t instanceof Array?(0,i.Z)(t):t,this.name=o}));h.dimens=function(n){var t=n;return t instanceof h&&(t=(0,i.Z)(n.M)),t instanceof Array?t[0]instanceof Array?[t.length,t[0].length]:[1,t.length]:[1,1]};var v=h},68296:function(n,t,e){e.r(t),e.d(t,{default:function(){return b}});var r=e(70885),i=e(71598),o=e(61889),a=(e(59416),e(65773)),c=e(79959),s=e(34024),l=e(80184),u=function(){return(0,l.jsxs)(i.Z,{title:"\u0645\u0639\u06cc\u0627\u0631 \u067e\u0627\u06cc\u062f\u0627\u0631\u06cc \u0647\u0631\u0648\u06cc\u062a\u0632",darkBorder:!0,sx:{direction:"rtl"},children:[(0,l.jsxs)(o.ZP,{className:"lecture-text",item:!0,children:[(0,l.jsx)("p",{children:"\xa0 \xa0 \xa0 \xa0 \u062a\u0645\u0627\u0645\u06cc \u0631\u06cc\u0634\u0647 \u0647\u0627\u06cc \u0645\u0639\u0627\u062f\u0644\u0647 \u06cc \u0645\u0634\u062e\u0635\u0647 \u062f\u0631 \u0633\u0645\u062a \u0686\u067e \u0645\u062d\u0648\u0631 \u0645\u0648\u0647\u0648\u0645\u06cc \u0642\u0631\u0627\u0631 \u0645\u06cc \u06af\u06cc\u0631\u0646\u062f \u0627\u06af\u0631 \u0648 \u0641\u0642\u0637 \u0627\u06af\u0631:"}),(0,l.jsx)(a.Z,{children:"$$\\Delta_i > 0$$"}),(0,l.jsx)(a.Z,{children:c.Z.Symbolic("n","s",3)})]}),(0,l.jsx)(o.ZP,{className:"lecture-text",sx:{mr:20},item:!0,children:(0,l.jsx)("img",{className:"lecture-image",src:s,alt:"\u0628\u0627\u0631\u06af\u0630\u0627\u0631\u06cc \u062a\u0635\u0648\u06cc\u0631 \u0628\u0627 \u0645\u0634\u06a9\u0644 \u0645\u0648\u0627\u062c\u0647 \u0634\u062f"})}),(0,l.jsx)(o.ZP,{className:"lecture-text",item:!0,children:(0,l.jsx)("p",{children:"\xa0 \xa0 \xa0 \xa0 \u0634\u0631\u0637 \u0644\u0627\u0632\u0645 \u0628\u0631\u0627\u06cc \u0627\u06cc\u0646\u06a9\u0647 \u0642\u0633\u0645\u062a \u062d\u0642\u06cc\u0642\u06cc \u0642\u0637\u0628 \u0647\u0627 \u0645\u0646\u0641\u06cc \u0628\u0627\u0634\u062f \u0628\u0647 \u0639\u0628\u0627\u0631\u062a \u0632\u06cc\u0631 \u0627\u0633\u062a:"})}),(0,l.jsx)(o.ZP,{className:"lecture-text",item:!0,children:(0,l.jsxs)("p",{children:["\xa0 \xa0 \xa0 \xa0 \u06f1- \u0647\u0645 \u0639\u0644\u0627\u0645\u062a \u0628\u0648\u062f\u0646 \u062a\u0645\u0627\u0645 a",(0,l.jsx)("sub",{children:"i"})," \u0647\u0627: \u062f\u0631 \u0635\u0648\u0631\u062a \u0647\u0645 \u0639\u0644\u0627\u0645\u062a \u0646\u0628\u0648\u062f\u0646 \u062d\u062a\u0645\u0627 \u0631\u06cc\u0634\u0647 \u0627\u06cc \u062f\u0631 \u0633\u0645\u062a \u0631\u0627\u0633\u062a \u0645\u062d\u0648\u0631 \u0645\u0648\u0647\u0648\u0645\u06cc \u0648\u062c\u0648\u062f \u062f\u0627\u0631\u062f."]})}),(0,l.jsx)(o.ZP,{className:"lecture-text",item:!0,children:(0,l.jsxs)("p",{children:["\xa0 \xa0 \xa0 \xa0 \u06f2- \u063a\u06cc\u0631\u0635\u0641\u0631 \u0628\u0648\u062f\u0646 \u062a\u0645\u0627\u0645 a",(0,l.jsx)("sub",{children:"i"})," \u0647\u0627: \u062f\u0631 \u063a\u06cc\u0631 \u0627\u06cc\u0646\u0635\u0648\u0631\u062a \u0631\u06cc\u0634\u0647 \u0627\u06cc \u0631\u0648\u06cc \u0645\u062d\u0648\u0631 \u0645\u0648\u0647\u0648\u0645\u06cc \u0648 \u06cc\u0627 \u0633\u0645\u062a \u0631\u0627\u0633\u062a \u0622\u0646 \u0642\u0631\u0627\u0631 \u062f\u0627\u0631\u062f. (\u0648\u062c\u0648\u062f \u0631\u06cc\u0634\u0647 \u0627\u06cc \u06a9\u0647 \u0633\u0645\u062a \u0686\u067e \u0645\u062d\u0648\u0631 \u0645\u0648\u0647\u0648\u0645\u06cc \u0646\u06cc\u0633\u062a.)"]})})]})},f=e(72791),d=e(54905),p=e(63466),h=e(13400),v=e(20394),Z=e(42440),m=e(69053),y=function(n,t){for(var e=[],r=1;r>1-t;r--){for(var i=[],o=0;o<t;o++){var a=r+2*o;i.push(a>=0&&a<n.length?n[r+2*o]:0)}e.push(i)}return e},g=function(n){var t=n.a_i,e=(0,f.useState)(0),s=(0,r.Z)(e,2),u=s[0],d=s[1],p=(0,f.useState)(""),g=(0,r.Z)(p,2),x=g[0],j=g[1],b=(0,f.useState)(0),M=(0,r.Z)(b,2),w=M[0],P=M[1];return(0,f.useEffect)((function(){var n=t.length;if(n>0){var e=[],r=[],i=new c.Z(t,"s");e.push("$$\\Delta \\lgroup s \\rgroup = "+i.toString()+"$$");for(var o=n-1,a=1;a<=o;a++){var s=new v.Z(y(t,a)),l=s.det();r.push(l);var u=s.toString();e.push("$$\\Delta_{".concat(a,"} = det").concat(u," = ").concat(l,"$$"))}P(e.length),function(n,t){var e=[],r=0;if(t.length>0&&n.length>0){for(r=0;r<n.length&&!(n[r]<=0);r++);if(r>=n.length)return e.push("\u062a\u0645\u0627\u0645\u06cc \u0642\u0637\u0628 \u0647\u0627\u06cc \u0633\u06cc\u0633\u062a\u0645 \u062f\u0631 \u0633\u0645\u062a \u0686\u067e \u0645\u062d\u0648\u0631 \u0645\u0648\u0647\u0648\u0645\u06cc \u0628\u0648\u062f\u0647 \u0648 \u0633\u06cc\u0633\u062a\u0645 \u067e\u0627\u06cc\u062f\u0627\u0631 \u0627\u0633\u062a."),e;for(r=0;r<t.length;r++)if(0===t[r])return e.push("\u0631\u06cc\u0634\u0647 \u0627\u06cc \u062f\u0631 \u0633\u0645\u062a \u0631\u0627\u0633\u062a \u0648 \u06cc\u0627 \u0631\u0648\u06cc \u0645\u062d\u0648\u0631 \u0645\u0648\u0647\u0648\u0645\u06cc \u0648\u062c\u0648\u062f \u062f\u0627\u0631\u062f."),e;for(r=0;r<t.length;r++)if(t[r]*t[0]<0)return e.push("\u0631\u06cc\u0634\u0647 \u0627\u06cc \u062f\u0631 \u0633\u0645\u062a \u0631\u0627\u0633\u062a \u0645\u062d\u0648\u0631 \u0645\u0648\u0647\u0648\u0645\u06cc \u0648\u062c\u0648\u062f \u062f\u0627\u0631\u062f."),e}return e}(r,t).forEach((function(n){return e.push(n)})),j(e)}}),[t]),(0,l.jsxs)(o.ZP,{direction:"column",spacing:.5,container:!0,children:[x instanceof Array&&x.map((function(n,t){return u>=t&&n&&(0,l.jsx)(o.ZP,{xs:12,item:!0,children:(0,l.jsx)(i.Z,{sx:{direction:t<w?"ltr":"rtl"},children:(0,l.jsx)(o.ZP,{sx:{margin:"auto"},container:!0,children:(0,l.jsx)(o.ZP,{children:(0,l.jsx)(a.Z,{children:n})})})})})})),u<x.length-1&&(0,l.jsx)(o.ZP,{item:!0,children:(0,l.jsx)(h.Z,{style:{width:"100%"},color:"secondary","aria-label":"previous",component:"span",onClick:function(){return d(u+1)},children:(0,l.jsx)(Z.Z,{})})}),u>=x.length-1&&(0,l.jsx)(o.ZP,{item:!0,children:(0,l.jsx)(h.Z,{style:{width:"100%"},color:"secondary","aria-label":"previous",component:"span",onClick:function(){return d(0)},children:(0,l.jsx)(m.Z,{})})})]})},x=e(91923),j=e(30830),b=function(){var n=(0,f.useState)(""),t=(0,r.Z)(n,2),e=t[0],i=t[1],c=(0,f.useState)([]),s=(0,r.Z)(c,2),h=s[0],v=s[1];return(0,f.useEffect)((function(){v((0,j.W7)(e))}),[e]),(0,l.jsxs)(o.ZP,{container:!0,direction:"column",spacing:x.dv,children:[(0,l.jsx)(o.ZP,{style:{width:"100%",height:"100%",margin:"auto",direction:"ltr"},item:!0,children:(0,l.jsx)(u,{})}),(0,l.jsxs)(o.ZP,{spacing:x.dv,style:{width:"100%",height:"100%",margin:"auto",marginTop:"1%",direction:"ltr"},container:!0,children:[(0,l.jsx)(o.ZP,{xs:12,item:!0,children:(0,l.jsx)(d.Z,{onChange:function(n){return i(n.target.value)},value:e,style:{width:"100%"},sx:{px:1},InputProps:{startAdornment:(0,l.jsx)(p.Z,{position:"left",children:(0,l.jsx)(a.Z,{children:"$$\\Delta(s) = \\Sigma \\lgroup$$"})}),endAdornment:(0,l.jsx)(p.Z,{position:"right",children:(0,l.jsx)(a.Z,{children:"$$ \\rgroup s^i$$"})})}})}),(0,l.jsx)("hr",{}),(0,l.jsx)(o.ZP,{xs:12,item:!0,children:(0,l.jsx)(g,{a_i:h})})]})]})}},42440:function(n,t,e){var r=e(95318);t.Z=void 0;var i=r(e(45649)),o=e(80184),a=(0,i.default)([(0,o.jsx)("path",{d:"M18 6.41 16.59 5 12 9.58 7.41 5 6 6.41l6 6z"},"0"),(0,o.jsx)("path",{d:"m18 13-1.41-1.41L12 16.17l-4.59-4.58L6 13l6 6z"},"1")],"KeyboardDoubleArrowDown");t.Z=a},69053:function(n,t,e){var r=e(95318);t.Z=void 0;var i=r(e(45649)),o=e(80184),a=(0,i.default)([(0,o.jsx)("path",{d:"M6 17.59 7.41 19 12 14.42 16.59 19 18 17.59l-6-6z"},"0"),(0,o.jsx)("path",{d:"m6 11 1.41 1.41L12 7.83l4.59 4.58L18 11l-6-6z"},"1")],"KeyboardDoubleArrowUp");t.Z=a},63466:function(n,t,e){e.d(t,{Z:function(){return j}});var r=e(4942),i=e(63366),o=e(87462),a=e(72791),c=(e(52007),e(28182)),s=e(90767),l=e(14036),u=e(20890),f=e(93840),d=e(52930),p=e(47630),h=e(95159);function v(n){return(0,h.Z)("MuiInputAdornment",n)}var Z=(0,e(30208).Z)("MuiInputAdornment",["root","filled","standard","outlined","positionStart","positionEnd","disablePointerEvents","hiddenLabel","sizeSmall"]),m=e(93736),y=e(80184),g=["children","className","component","disablePointerEvents","disableTypography","position","variant"],x=(0,p.ZP)("div",{name:"MuiInputAdornment",slot:"Root",overridesResolver:function(n,t){var e=n.ownerState;return[t.root,t["position".concat((0,l.Z)(e.position))],!0===e.disablePointerEvents&&t.disablePointerEvents,t[e.variant]]}})((function(n){var t=n.theme,e=n.ownerState;return(0,o.Z)({display:"flex",height:"0.01em",maxHeight:"2em",alignItems:"center",whiteSpace:"nowrap",color:t.palette.action.active},"filled"===e.variant&&(0,r.Z)({},"&.".concat(Z.positionStart,"&:not(.").concat(Z.hiddenLabel,")"),{marginTop:16}),"start"===e.position&&{marginRight:8},"end"===e.position&&{marginLeft:8},!0===e.disablePointerEvents&&{pointerEvents:"none"})})),j=a.forwardRef((function(n,t){var e=(0,m.Z)({props:n,name:"MuiInputAdornment"}),r=e.children,p=e.className,h=e.component,Z=void 0===h?"div":h,j=e.disablePointerEvents,b=void 0!==j&&j,M=e.disableTypography,w=void 0!==M&&M,P=e.position,S=e.variant,A=(0,i.Z)(e,g),$=(0,d.Z)()||{},E=S;S&&$.variant,$&&!E&&(E=$.variant);var O=(0,o.Z)({},e,{hiddenLabel:$.hiddenLabel,size:$.size,disablePointerEvents:b,position:P,variant:E}),R=function(n){var t=n.classes,e=n.disablePointerEvents,r=n.hiddenLabel,i=n.position,o=n.size,a=n.variant,c={root:["root",e&&"disablePointerEvents",i&&"position".concat((0,l.Z)(i)),a,r&&"hiddenLabel",o&&"size".concat((0,l.Z)(o))]};return(0,s.Z)(c,v,t)}(O);return(0,y.jsx)(f.Z.Provider,{value:null,children:(0,y.jsx)(x,(0,o.Z)({as:Z,ownerState:O,className:(0,c.Z)(R.root,p),ref:t},A,{children:"string"!==typeof r||w?(0,y.jsxs)(a.Fragment,{children:["start"===P?(0,y.jsx)("span",{className:"notranslate",dangerouslySetInnerHTML:{__html:"&#8203;"}}):null,r]}):(0,y.jsx)(u.Z,{color:"text.secondary",children:r})}))})}))},59416:function(){},34024:function(n,t,e){n.exports=e.p+"static/media/hurwitz_deltas.f600a4108bc7a3208a28.jpg"},43668:function(n,t,e){e.d(t,{Z:function(){return s}});var r=e(61120),i=e(78814);function o(n){return o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(n){return typeof n}:function(n){return n&&"function"==typeof Symbol&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},o(n)}var a=e(97326);function c(n,t){if(t&&("object"===o(t)||"function"===typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return(0,a.Z)(n)}function s(n){var t=(0,i.Z)();return function(){var e,i=(0,r.Z)(n);if(t){var o=(0,r.Z)(this).constructor;e=Reflect.construct(i,arguments,o)}else e=i.apply(this,arguments);return c(this,e)}}},11752:function(n,t,e){e.d(t,{Z:function(){return o}});var r=e(61120);function i(n,t){for(;!Object.prototype.hasOwnProperty.call(n,t)&&null!==(n=(0,r.Z)(n)););return n}function o(){return o="undefined"!==typeof Reflect&&Reflect.get?Reflect.get:function(n,t,e){var r=i(n,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?n:e):o.value}},o.apply(this,arguments)}},61120:function(n,t,e){function r(n){return r=Object.setPrototypeOf?Object.getPrototypeOf:function(n){return n.__proto__||Object.getPrototypeOf(n)},r(n)}e.d(t,{Z:function(){return r}})},60136:function(n,t,e){e.d(t,{Z:function(){return i}});var r=e(89611);function i(n,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");Object.defineProperty(n,"prototype",{value:Object.create(t&&t.prototype,{constructor:{value:n,writable:!0,configurable:!0}}),writable:!1}),t&&(0,r.Z)(n,t)}},78814:function(n,t,e){function r(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(n){return!1}}e.d(t,{Z:function(){return r}})},98737:function(n,t,e){e.d(t,{Z:function(){return c}});var r=e(61120),i=e(89611);var o=e(78814);function a(n,t,e){return a=(0,o.Z)()?Reflect.construct:function(n,t,e){var r=[null];r.push.apply(r,t);var o=new(Function.bind.apply(n,r));return e&&(0,i.Z)(o,e.prototype),o},a.apply(null,arguments)}function c(n){var t="function"===typeof Map?new Map:void 0;return c=function(n){if(null===n||(e=n,-1===Function.toString.call(e).indexOf("[native code]")))return n;var e;if("function"!==typeof n)throw new TypeError("Super expression must either be null or a function");if("undefined"!==typeof t){if(t.has(n))return t.get(n);t.set(n,o)}function o(){return a(n,arguments,(0,r.Z)(this).constructor)}return o.prototype=Object.create(n.prototype,{constructor:{value:o,enumerable:!1,writable:!0,configurable:!0}}),(0,i.Z)(o,n)},c(n)}}}]);
//# sourceMappingURL=172.13ce16c7.chunk.js.map
"use strict";(self.webpackChunklnctrl=self.webpackChunklnctrl||[]).push([[10],{93554:function(e,t,n){var r=n(61889),i=n(54905),o=n(63466),a=n(65773),c=n(72791),s=n(80184);t.Z=function(e){var t=e.parameters,n=e.setters,l=e.labels,d=e.units;return(0,s.jsx)(c.Fragment,{children:t instanceof Array&&t.map((function(e,t){return(0,s.jsx)(r.ZP,{md:12,sm:4,xs:6,item:!0,children:(0,s.jsx)(i.Z,{onChange:function(e){return n[t](e.target.value)},value:e,sx:{width:"100%"},InputProps:{startAdornment:(0,s.jsx)(o.Z,{position:"left",children:(0,s.jsx)(a.Z,{children:l[t]})}),endAdornment:d[t]&&(0,s.jsx)(o.Z,{position:"right",children:(0,s.jsx)(a.Z,{children:d[t]})})}})})}))})}},63970:function(e,t,n){n(72791);var r=n(68286),i=n(80184);t.Z=function(e){var t=e.traces,n=e.title,o=(e.width,e.height),a=void 0===o?500:o,c=e.logX;return(0,i.jsx)(r.Z,{style:{textAlign:"center"},data:t,layout:{margin:{t:30,l:30,r:20,b:30},xaxis:{rangemode:"tozero",zeroline:!0,type:c?"log":"dec"},yaxis:{rangemode:"tozero",zeroline:!0},height:a,title:n,hoverlabel:{align:"auto",boxmode:"overlay",font:{color:"#000000FF"}},legend:{orientation:"h"}}})}},29961:function(e,t,n){var r=n(70885),i=n(91720),o=n(27247),a=n(85029),c=n(63787),s=n(61889),l=n(13400),d=n(53767),u=n(82550),h=n(72791),x=n(24250),Z=n(37185),v=n(80184);t.Z=function(e){var t=e.capture,n=e.reset,m=e.update,$=e.toggle3DPlot,p=(0,h.useState)(!1),f=(0,r.Z)(p,2),g=f[0],j=f[1],w=(0,h.useState)(20),y=(0,r.Z)(w,2),P=y[0],b=y[1];return(0,h.useEffect)((function(){m({thickness:P/20+.1})}),[P,m]),(0,v.jsxs)(s.ZP,{sx:{direction:"rtl"},container:!0,direction:"row",children:[(0,v.jsxs)(s.ZP,{md:10,sm:8,xs:6,sx:{direction:"rtl"},item:!0,children:[$&&(0,v.jsx)(l.Z,{color:"secondary","aria-label":"capture graph",component:"span",onClick:function(){j(!g),$()},children:g?(0,v.jsx)(Z.Z,{}):(0,v.jsx)(x.Z,{})}),t&&(0,v.jsx)(l.Z,{color:"secondary","aria-label":"capture graph",component:"span",onClick:t,children:(0,v.jsx)(i.Z,{})}),n&&(0,v.jsx)(l.Z,{color:"secondary","aria-label":"capture graph",component:"span",onClick:n,children:(0,v.jsx)(o.Z,{})})]}),(0,v.jsx)(s.ZP,{md:2,sm:4,xs:6,item:!0,children:(0,v.jsxs)(d.Z,{spacing:2,direction:"row",sx:{mt:.5,direction:"ltr"},alignItems:"center",children:[(0,v.jsx)(a.Z,{}),(0,v.jsx)(u.ZP,{"aria-label":"Volume",value:P,onChange:function(e,t){return b(t)}}),(0,v.jsx)(c.Z,{})]})})]})}},52010:function(e,t,n){n.r(t),n.d(t,{default:function(){return k}});var r=n(15861),i=n(70885),o=n(87757),a=n.n(o),c=n(71598),s=n(30830),l=n(72791),d=n(29961),u=n(61889),h=n(20890),x=n(63970),Z=n(65773),v=n(93554),m=n(91923),$=n(71479),p=n(80184),f=["$$Num = [$$","$$Den = [$$","$$K_p = $$","$$T_i = $$","$$T_d = $$","$$t_{initial} = $$","$$t_{final} = $$","$$N = $$"],g=["$$]$$","$$]$$",null,null,null,"$$sec$$","$$sec$$",null],j=function(e){var t=e.rawNumerator,n=e.rawDenominator,r=e.$rawNumerator,i=e.$rawDenominator,o=e.t_initial,a=e.t_final,s=e.$t_initial,l=e.$t_final,d=e.K_p,x=e.$K_p,Z=e.T_i,j=e.$T_i,w=e.T_d,y=e.$T_d,P=e.N,b=e.$N,S=e.responseTime;return(0,p.jsx)(c.Z,{darkBorder:!0,title:"\u067e\u0627\u0631\u0627\u0645\u062a\u0631\u0647\u0627",sx:{direction:"ltr",textAlign:"right",height:"100%"},children:(0,p.jsxs)(u.ZP,{spacing:m.dv,container:!0,direction:"row",children:[(0,p.jsx)(v.Z,{parameters:[t,n,d,Z,w,o,a,P],setters:[r,i,x,j,y,s,l,b],labels:f,units:g}),(0,p.jsx)(u.ZP,{xs:12,sx:{mt:2},item:!0,children:(0,p.jsx)($.Z,{id:"pid_tune_progress"})}),S&&(0,p.jsx)(u.ZP,{xs:12,sx:{mt:2},item:!0,children:(0,p.jsxs)(h.Z,{style:{textAlign:"center",color:"coral"},children:["\u0645\u062f\u062a \u0632\u0645\u0627\u0646 \u0639\u0645\u0644\u06cc\u0627\u062a: ",S," \u062b\u0627\u0646\u06cc\u0647"]})})]})})},w=n(96758),y=n(78793),P="jw",b="G",S="",_="",k=function(){var e=(0,l.useState)("1"),t=(0,i.Z)(e,2),n=t[0],o=t[1],v=(0,l.useState)("1 1"),$=(0,i.Z)(v,2),f=$[0],g=$[1],k=(0,l.useState)(null),z=(0,i.Z)(k,2),T=z[0],C=z[1],D=(0,l.useState)(1),A=(0,i.Z)(D,2),H=A[0],M=A[1],N=(0,l.useState)(0),V=(0,i.Z)(N,2),I=V[0],R=V[1],B=(0,l.useState)(0),E=(0,i.Z)(B,2),F=E[0],K=E[1],X=(0,l.useState)(null),L=(0,i.Z)(X,2),G=L[0],O=L[1],Y=(0,l.useState)(0),q=(0,i.Z)(Y,2),J=q[0],Q=q[1],U=(0,l.useState)(10),W=(0,i.Z)(U,2),ee=W[0],te=W[1],ne=(0,l.useState)({main:[],controlled:[]}),re=(0,i.Z)(ne,2),ie=re[0],oe=re[1],ae=(0,l.useState)([]),ce=(0,i.Z)(ae,2),se=ce[0],le=ce[1],de=(0,l.useState)(1),ue=(0,i.Z)(de,2),he=ue[0],xe=ue[1],Ze=(0,l.useState)(!1),ve=(0,i.Z)(Ze,2),me=ve[0],$e=ve[1],pe=(0,l.useState)(1e3),fe=(0,i.Z)(pe,2),ge=fe[0],je=fe[1],we=(0,l.useState)(0),ye=(0,i.Z)(we,2),Pe=ye[0],be=ye[1];console.log(w.Z.Specials.$DelayedIntegrator(2,4,4).toString()),(0,l.useEffect)((function(){T&&(0,r.Z)(a().mark((function e(){var t,n,r,o,c,l,d,u,h,x,Z,v,m;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t=T.stepify().laplaceInverse(),n=T.controlFeedback(G),r=n.stepify().laplaceInverse(),le(["$$"+T.label(b)+"$$","$$"+t.$s.label("H")+"$$","$$h(t) = ".concat(t.$t.toString(),"$$"),(0,p.jsx)("hr",{}),"$$C_{PID}(s) = ".concat(G.toString(),"$$"),"$$C(s) = ".concat(r.$s.toString(),"$$"),"$$c(t) = ".concat(r.$t,"$$")]),console.log(n.toString()),o=new Date,T.step(),e.next=10,s.ZP.pointifyAsync(t.$t.$,+J,+ee,document.getElementById("pid_tune_progress"),500,+ge);case 10:return c=e.sent,l=(0,i.Z)(c,2),d=l[0],u=l[1],h=s.ZP.arrayToTrace(d,u,he,"".concat(b,"(").concat(P,")"),me),n.step(),e.next=18,s.ZP.pointifyAsync(r.$t.$,+J,+ee,document.getElementById("pid_tune_progress"),500,+ge);case 18:x=e.sent,Z=(0,i.Z)(x,2),d=Z[0],u=Z[1],v=s.ZP.arrayToTrace(d,u,he,"".concat(b,"(").concat(P,")"),me),oe({main:[h],controlled:[v]}),m=new Date,be((+m-+o)/1e3),e.next=31;break;case 28:e.prev=28,e.t0=e.catch(0),console.log(e.t0);case 31:case"end":return e.stop()}}),e,null,[[0,28]])})))()}),[T,J,ee,G,me,he,ge]),(0,l.useEffect)((function(){O(w.Z.Specials.$PID(H,I,F))}),[H,I,F]),(0,l.useEffect)((function(){try{if(n.trim()!==S||f.trim()!==_){var e=s.ZP.stringToArray(n),t=s.ZP.stringToArray(f),r=new w.Z(e,t);S=n,_=f,C(r),(new AbortController).abort()}}catch(i){console.log(i)}}),[n,f]);return(0,p.jsxs)(y.Z,{children:[(0,p.jsx)(u.ZP,{item:!0,spacing:m.dv,children:(0,p.jsx)(h.Z,{children:(0,p.jsx)("h2",{className:"chapter-section-title",children:"\u06a9\u0646\u062a\u0631\u0644 \u06a9\u0646\u0646\u062f\u0647 PID"})})}),(0,p.jsx)(u.ZP,{item:!0,spacing:m.dv,children:(0,p.jsxs)(u.ZP,{container:!0,direction:"column",spacing:1,children:[(0,p.jsx)(u.ZP,{sx:{margin:"auto",width:"100%"},item:!0,children:(0,p.jsx)(c.Z,{sx:{direction:"ltr"},children:(0,p.jsx)(u.ZP,{id:"formulaBox",sx:{margin:"auto"},container:!0,direction:"row",children:se.map((function(e){return(0,p.jsx)(u.ZP,{style:{fontSize:"18px",textAlign:"center"},xs:12,children:(0,p.jsx)(Z.Z,{children:e})})}))})})}),(0,p.jsxs)(u.ZP,{spacing:2,style:{width:"100%",height:"100%",margin:"auto",direction:"ltr"},container:!0,children:[(0,p.jsx)(u.ZP,{md:3,sm:12,xs:12,sx:{marginTop:"1%",width:"100%"},container:!0,children:(0,p.jsx)(u.ZP,{xs:12,children:(0,p.jsx)(j,{rawNumerator:n,rawDenominator:f,$rawNumerator:o,$rawDenominator:g,t_initial:J,t_final:ee,$t_initial:Q,$t_final:te,K_p:H,$K_p:M,T_i:I,$T_i:R,T_d:F,$T_d:K,N:ge,$N:je,responseTime:Pe})})}),(0,p.jsxs)(u.ZP,{md:9,sm:12,xs:12,item:!0,children:[(0,p.jsx)(c.Z,{children:(0,p.jsx)(d.Z,{reset:function(){g("1 1"),o("1")},update:function(e){return function(e){e&&xe(e.thickness)}(e)},toggle3DPlot:function(){return $e(!me)}})}),(0,p.jsx)("hr",{}),(0,p.jsx)(u.ZP,{lg:12,md:12,sm:12,xs:12,item:!0,children:(0,p.jsxs)(c.Z,{children:[(0,p.jsx)(u.ZP,{lg:9,md:9,sm:12,xs:12,item:!0,children:(0,p.jsx)(x.Z,{title:"\u067e\u0627\u0633\u062e \u067e\u0644\u0647 \u06cc \u0633\u06cc\u0633\u062a\u0645 \u0627\u0648\u0644\u06cc\u0647",traces:ie.main})}),(0,p.jsx)(u.ZP,{lg:9,md:9,sm:12,xs:12,item:!0,children:(0,p.jsx)(x.Z,{title:"\u067e\u0627\u0633\u062e \u067e\u0644\u0647 \u06cc \u0633\u06cc\u0633\u062a\u0645 \u06a9\u0646\u062a\u0631\u0644 \u0634\u062f\u0647",traces:ie.controlled})})]})})]})]})]})})]})}},78793:function(e,t,n){var r=n(1413),i=n(45987),o=n(72791),a=n(13967),c=n(57621),s=n(9585),l=n(20890),d=n(47924),u=n(39504),h=n(80184),x=["border","boxShadow","children","content","contentClass","contentSX","darkTitle","secondary","shadow","sx","title"],Z={"& .MuiCardHeader-action":{mr:0}},v=(0,o.forwardRef)((function(e,t){var n=e.border,o=void 0===n||n,v=e.boxShadow,m=e.children,$=e.content,p=void 0===$||$,f=e.contentClass,g=void 0===f?"":f,j=e.contentSX,w=void 0===j?{}:j,y=e.darkTitle,P=e.secondary,b=e.shadow,S=e.sx,_=void 0===S?{}:S,k=e.title,z=(0,i.Z)(e,x),T=(0,a.Z)();return(0,h.jsxs)(c.Z,(0,r.Z)((0,r.Z)({ref:t},z),{},{sx:(0,r.Z)({overflowY:"auto",border:o?"1px solid":"none",borderColor:T.palette.primary[200]+75,":hover":{boxShadow:v?b||"0 2px 14px 0 rgb(32 40 45 / 8%)":"inherit"}},_),children:[!y&&k&&(0,h.jsx)(s.Z,{sx:Z,title:k,action:P}),y&&k&&(0,h.jsx)(s.Z,{sx:Z,title:(0,h.jsx)(l.Z,{variant:"h3",children:k}),action:P}),k&&(0,h.jsx)(d.Z,{}),p&&(0,h.jsx)(u.Z,{sx:w,className:g,children:m}),!p&&m]}))}));t.Z=v},71479:function(e,t,n){var r=n(80184);t.Z=function(e){var t=e.id,n=e.color,i=void 0===n?"white":n,o=e.background,a=void 0===o?"lightgreen":o,c=e.borderRadius,s=void 0===c?"10px":c;return(0,r.jsx)("div",{style:{width:"0%",textAlign:"right",background:a,color:i,borderRadius:s,padding:"1%"},id:t})}},27247:function(e,t,n){var r=n(95318);t.Z=void 0;var i=r(n(45649)),o=n(80184),a=(0,i.default)((0,o.jsx)("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"}),"Delete");t.Z=a},63787:function(e,t,n){var r=n(95318);t.Z=void 0;var i=r(n(45649)),o=n(80184),a=(0,i.default)((0,o.jsx)("path",{d:"M5 15H3v4c0 1.1.9 2 2 2h4v-2H5v-4zM5 5h4V3H5c-1.1 0-2 .9-2 2v4h2V5zm14-2h-4v2h4v4h2V5c0-1.1-.9-2-2-2zm0 16h-4v2h4c1.1 0 2-.9 2-2v-4h-2v4zM12 9c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"}),"FilterCenterFocus");t.Z=a},85029:function(e,t,n){var r=n(95318);t.Z=void 0;var i=r(n(45649)),o=n(80184),a=(0,i.default)((0,o.jsx)("path",{d:"M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"}),"Fullscreen");t.Z=a},91720:function(e,t,n){var r=n(95318);t.Z=void 0;var i=r(n(45649)),o=n(80184),a=(0,i.default)([(0,o.jsx)("circle",{cx:"12",cy:"12",r:"3.2"},"0"),(0,o.jsx)("path",{d:"M9 2 7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"},"1")],"PhotoCamera");t.Z=a},24250:function(e,t,n){var r=n(95318);t.Z=void 0;var i=r(n(45649)),o=n(80184),a=(0,i.default)((0,o.jsx)("path",{d:"M7.52 21.48C4.25 19.94 1.91 16.76 1.55 13H.05C.56 19.16 5.71 24 12 24l.66-.03-3.81-3.81-1.33 1.32zm.89-6.52c-.19 0-.37-.03-.52-.08-.16-.06-.29-.13-.4-.24-.11-.1-.2-.22-.26-.37-.06-.14-.09-.3-.09-.47h-1.3c0 .36.07.68.21.95.14.27.33.5.56.69.24.18.51.32.82.41.3.1.62.15.96.15.37 0 .72-.05 1.03-.15.32-.1.6-.25.83-.44s.42-.43.55-.72c.13-.29.2-.61.2-.97 0-.19-.02-.38-.07-.56-.05-.18-.12-.35-.23-.51-.1-.16-.24-.3-.4-.43-.17-.13-.37-.23-.61-.31.2-.09.37-.2.52-.33.15-.13.27-.27.37-.42.1-.15.17-.3.22-.46.05-.16.07-.32.07-.48 0-.36-.06-.68-.18-.96-.12-.28-.29-.51-.51-.69-.2-.19-.47-.33-.77-.43C9.1 8.05 8.76 8 8.39 8c-.36 0-.69.05-1 .16-.3.11-.57.26-.79.45-.21.19-.38.41-.51.67-.12.26-.18.54-.18.85h1.3c0-.17.03-.32.09-.45s.14-.25.25-.34c.11-.09.23-.17.38-.22.15-.05.3-.08.48-.08.4 0 .7.1.89.31.19.2.29.49.29.86 0 .18-.03.34-.08.49-.05.15-.14.27-.25.37-.11.1-.25.18-.41.24-.16.06-.36.09-.58.09H7.5v1.03h.77c.22 0 .42.02.6.07s.33.13.45.23c.12.11.22.24.29.4.07.16.1.35.1.57 0 .41-.12.72-.35.93-.23.23-.55.33-.95.33zm8.55-5.92c-.32-.33-.7-.59-1.14-.77-.43-.18-.92-.27-1.46-.27H12v8h2.3c.55 0 1.06-.09 1.51-.27.45-.18.84-.43 1.16-.76.32-.33.57-.73.74-1.19.17-.47.26-.99.26-1.57v-.4c0-.58-.09-1.1-.26-1.57-.18-.47-.43-.87-.75-1.2zm-.39 3.16c0 .42-.05.79-.14 1.13-.1.33-.24.62-.43.85-.19.23-.43.41-.71.53-.29.12-.62.18-.99.18h-.91V9.12h.97c.72 0 1.27.23 1.64.69.38.46.57 1.12.57 1.99v.4zM12 0l-.66.03 3.81 3.81 1.33-1.33c3.27 1.55 5.61 4.72 5.96 8.48h1.5C23.44 4.84 18.29 0 12 0z"}),"ThreeDRotation");t.Z=a},37185:function(e,t,n){var r=n(95318);t.Z=void 0;var i=r(n(45649)),o=n(80184),a=(0,i.default)((0,o.jsx)("path",{d:"M12 7C6.48 7 2 9.24 2 12c0 2.24 2.94 4.13 7 4.77V20l4-4-4-4v2.73c-3.15-.56-5-1.9-5-2.73 0-1.06 3.04-3 8-3s8 1.94 8 3c0 .73-1.46 1.89-4 2.53v2.05c3.53-.77 6-2.53 6-4.58 0-2.76-4.48-5-10-5z"}),"ThreeSixty");t.Z=a},53767:function(e,t,n){var r=n(4942),i=n(63366),o=n(87462),a=n(72791),c=(n(52007),n(51184)),s=n(45682),l=n(78519),d=n(82466),u=n(47630),h=n(93736),x=n(80184),Z=["component","direction","spacing","divider","children"];function v(e,t){var n=a.Children.toArray(e).filter(Boolean);return n.reduce((function(e,r,i){return e.push(r),i<n.length-1&&e.push(a.cloneElement(t,{key:"separator-".concat(i)})),e}),[])}var m=(0,u.ZP)("div",{name:"MuiStack",slot:"Root",overridesResolver:function(e,t){return[t.root]}})((function(e){var t=e.ownerState,n=e.theme,i=(0,o.Z)({display:"flex"},(0,c.k9)({theme:n},(0,c.P$)({values:t.direction,breakpoints:n.breakpoints.values}),(function(e){return{flexDirection:e}})));if(t.spacing){var a=(0,s.hB)(n),l=Object.keys(n.breakpoints.values).reduce((function(e,n){return null==t.spacing[n]&&null==t.direction[n]||(e[n]=!0),e}),{}),u=(0,c.P$)({values:t.direction,base:l}),h=(0,c.P$)({values:t.spacing,base:l});i=(0,d.Z)(i,(0,c.k9)({theme:n},h,(function(e,n){return{"& > :not(style) + :not(style)":(0,r.Z)({margin:0},"margin".concat((i=n?u[n]:t.direction,{row:"Left","row-reverse":"Right",column:"Top","column-reverse":"Bottom"}[i])),(0,s.NA)(a,e))};var i})))}return i})),$=a.forwardRef((function(e,t){var n=(0,h.Z)({props:e,name:"MuiStack"}),r=(0,l.Z)(n),a=r.component,c=void 0===a?"div":a,s=r.direction,d=void 0===s?"column":s,u=r.spacing,$=void 0===u?0:u,p=r.divider,f=r.children,g=(0,i.Z)(r,Z),j={direction:d,spacing:$};return(0,x.jsx)(m,(0,o.Z)({as:c,ownerState:j,ref:t},g,{children:p?v(f,p):f}))}));t.Z=$}}]);
//# sourceMappingURL=10.7a7e7496.chunk.js.map
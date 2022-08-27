"use strict";(self.webpackChunklnctrl=self.webpackChunklnctrl||[]).push([[102],{93554:function(e,t,n){var o=n(61889),r=n(54905),a=n(63466),i=n(65773),s=n(72791),c=n(80184);t.Z=function(e){var t=e.parameters,n=e.setters,l=e.labels,d=e.units;return(0,c.jsx)(s.Fragment,{children:t instanceof Array&&t.map((function(e,t){return(0,c.jsx)(o.ZP,{md:12,sm:4,xs:6,item:!0,children:(0,c.jsx)(r.Z,{onChange:function(e){return n[t](e.target.value)},value:e,sx:{width:"100%"},InputProps:{startAdornment:(0,c.jsx)(a.Z,{position:"left",children:(0,c.jsx)(i.Z,{children:l[t]})}),endAdornment:d[t]&&(0,c.jsx)(a.Z,{position:"right",children:(0,c.jsx)(i.Z,{children:d[t]})})}})})}))})}},63970:function(e,t,n){n(72791);var o=n(68286),r=n(80184);t.Z=function(e){var t=e.traces,n=e.title,a=(e.width,e.height),i=void 0===a?500:a,s=e.logX;return(0,r.jsx)(o.Z,{style:{textAlign:"center"},data:t,layout:{margin:{t:30,l:30,r:20,b:30},xaxis:{rangemode:"tozero",zeroline:!0,type:s?"log":"dec"},yaxis:{rangemode:"tozero",zeroline:!0},height:i,title:n,hoverlabel:{align:"auto",boxmode:"overlay",font:{color:"#000000FF"}},legend:{orientation:"h"}}})}},14102:function(e,t,n){n.r(t),n.d(t,{default:function(){return C}});var o=n(15861),r=n(70885),a=n(87757),i=n.n(a),s=n(71598),c=n(20890),l=n(61889),d=(n(59416),n(69843)),u=n(61454),x=n(80184),h=function(){return(0,x.jsx)(s.Z,{title:"\u0645\u06a9\u0627\u0646 \u0647\u0646\u062f\u0633\u06cc \u0641\u0627\u0632 \u062b\u0627\u0628\u062a",darkBorder:!0,sx:{direction:"rtl"},children:(0,x.jsxs)(c.Z,{children:[(0,x.jsx)(l.ZP,{item:!0,children:(0,x.jsx)("img",{className:"lecture-image",src:d,alt:"\u0628\u0627\u0631\u06af\u0630\u0627\u0631\u06cc \u062a\u0635\u0648\u06cc\u0631 \u0628\u0627 \u0645\u0634\u06a9\u0644 \u0645\u0648\u0627\u062c\u0647 \u0634\u062f"})}),(0,x.jsx)(l.ZP,{item:!0,children:(0,x.jsx)("img",{className:"lecture-image",src:u,alt:"\u0628\u0627\u0631\u06af\u0630\u0627\u0631\u06cc \u062a\u0635\u0648\u06cc\u0631 \u0628\u0627 \u0645\u0634\u06a9\u0644 \u0645\u0648\u0627\u062c\u0647 \u0634\u062f"})})]})})},p=n(30830),m=n(72791),v=n(63970),Z=n(65773),g=n(36151),f=n(93554),b=n(91923),y=n(71479),S=["$$Num = [$$","$$Den = [$$","$$k_{min} = $$","$$k_{max} = $$","$$N = $$"],w=["$$]$$","$$]$$",null,null,null],j=function(e){var t=e.rawNumerator,n=e.rawDenominator,o=e.$rawNumerator,r=e.$rawDenominator,a=e.k_min,i=e.k_max,d=e.$k_min,u=e.$k_max,h=e.updatePlot,p=e.responseTime,m=e.N,v=e.$N,Z=e.method,j=e.changeMethod;return(0,x.jsxs)(s.Z,{darkBorder:!0,title:"\u067e\u0627\u0631\u0627\u0645\u062a\u0631\u0647\u0627",sx:{direction:"ltr",textAlign:"right",height:"100%"},children:[(0,x.jsx)(l.ZP,{spacing:b.dv,container:!0,direction:"row",children:(0,x.jsx)(f.Z,{parameters:[t,n,a,i,m],setters:[o,r,d,u,v],labels:S,units:w})}),(0,x.jsxs)(l.ZP,{xs:12,container:!0,children:[(0,x.jsx)(l.ZP,{xs:6,sx:{py:2,pr:1},item:!0,children:(0,x.jsx)(g.Z,{onClick:function(){j("accurate"),v(200)},style:{width:"100%",textTransform:"none"},variant:"accurate"===Z?"contained":"outlined",children:"\u0631\u0648\u0634 \u062f\u0642\u06cc\u0642 \u062a\u0631"})}),(0,x.jsx)(l.ZP,{xs:6,sx:{py:2,pl:1},item:!0,children:(0,x.jsx)(g.Z,{onClick:function(){j("fast"),v(500)},style:{width:"100%",textTransform:"none"},variant:"fast"===Z?"contained":"outlined",children:"\u0631\u0648\u0634 \u0633\u0631\u06cc\u0639 \u062a\u0631"})})]}),(0,x.jsx)(l.ZP,{xs:12,item:!0,children:(0,x.jsx)(g.Z,{onClick:h,style:{width:"100%",textTransform:"none",background:"coral"},variant:"contained",children:"\u0645\u0634\u0627\u0647\u062f\u0647"})}),(0,x.jsx)(l.ZP,{xs:12,sx:{mt:2},item:!0,children:(0,x.jsx)(y.Z,{id:"progressbar"})}),p&&(0,x.jsx)(l.ZP,{xs:12,sx:{mt:2},item:!0,children:(0,x.jsxs)(c.Z,{style:{textAlign:"center",color:"coral"},children:["\u0645\u062f\u062a \u0632\u0645\u0627\u0646 \u0639\u0645\u0644\u06cc\u0627\u062a: ",p," \u062b\u0627\u0646\u06cc\u0647"]})})]})},z=n(96758),k=n(78793),$=n(5913),P=n(381),C=function(){var e=(0,m.useState)("1"),t=(0,r.Z)(e,2),n=t[0],a=t[1],d=(0,m.useState)("1 5 12"),u=(0,r.Z)(d,2),g=u[0],f=u[1],y=(0,m.useState)(-100),S=(0,r.Z)(y,2),w=S[0],C=S[1],I=(0,m.useState)(100),R=(0,r.Z)(I,2),N=R[0],T=R[1],M=(0,m.useState)({x:[],y:[]}),B=(0,r.Z)(M,2),E=B[0],F=B[1],A=(0,m.useState)({x:[],y:[]}),L=(0,r.Z)(A,2),W=L[0],_=L[1],D=(0,m.useState)({x:[],y:[]}),V=(0,r.Z)(D,2),q=V[0],O=V[1],X=(0,m.useState)(null),G=(0,r.Z)(X,2),H=G[0],Y=G[1],J=(0,m.useState)(null),K=(0,r.Z)(J,2),Q=K[0],U=K[1],ee=(0,m.useState)(null),te=(0,r.Z)(ee,2),ne=te[0],oe=te[1],re=(0,m.useState)("fast"),ae=(0,r.Z)(re,2),ie=ae[0],se=ae[1],ce=(0,m.useState)(1e3),le=(0,r.Z)(ce,2),de=le[0],ue=le[1];(0,m.useEffect)((function(){var e=new z.Z(p.ZP.stringToArray(n),p.ZP.stringToArray(g));Y(e),U(function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0;return"$$ "+e.label("G",t)+" $$"}(e))}),[n,g]);var xe=function(){var e=(0,o.Z)(i().mark((function e(){var t,n,a,s,c,l,d,u,x,h,p,m,v,Z,g,f,b,y,S;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,!H){e.next=20;break}return F({x:[],y:[]}),t=new Date,n=H.roots(),a=(0,r.Z)(n,2),s=a[0],c=a[1],l=P.Z.ToCouples(s),d=(0,r.Z)(l,2),u=d[0],x=d[1],_({x:u,y:x,type:"scatter",mode:"markers",marker:{size:10,color:"black"},name:"Zero"}),h=P.Z.ToCouples(c),p=(0,r.Z)(h,2),m=p[0],v=p[1],O({x:m,y:v,type:"scatter",mode:"markers",marker:{color:"red",symbol:"x",size:10},name:"Pole"}),Z=document.getElementById("progressbar"),e.next=12,("accurate"===ie?H.rootLocus:H.rootsByAlgebriteLocus)(+w,+N,Z,+de);case 12:g=e.sent,f=(0,r.Z)(g,2),b=f[0],y=f[1],S=new Date,F({x:b,y:y,type:"scatter",mode:"markers",marker:{size:3},name:"Root-Locus"}),oe((+S-+t)/1e3),setTimeout((0,o.Z)(i().mark((function e(){return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,$.tV)(Z,0);case 2:case"end":return e.stop()}}),e)}))),[1e3]);case 20:e.next=25;break;case 22:e.prev=22,e.t0=e.catch(0),console.log(e.t0);case 25:case"end":return e.stop()}}),e,null,[[0,22]])})));return function(){return e.apply(this,arguments)}}();return(0,x.jsxs)(k.Z,{children:[(0,x.jsx)(l.ZP,{item:!0,spacing:b.dv,children:(0,x.jsx)(c.Z,{children:(0,x.jsx)("h2",{className:"chapter-section-title",children:"\u0645\u06a9\u0627\u0646 \u0647\u0646\u062f\u0633\u06cc \u0642\u0637\u0628 \u0647\u0627\u06cc \u0633\u06cc\u0633\u062a\u0645"})})}),(0,x.jsx)(l.ZP,{item:!0,spacing:b.dv,children:(0,x.jsxs)(l.ZP,{container:!0,direction:"column",spacing:b.dv,children:[(0,x.jsx)(l.ZP,{style:{width:"100%",height:"100%",margin:"auto",direction:"ltr"},item:!0,children:(0,x.jsx)(h,{})}),(0,x.jsx)(l.ZP,{sx:{margin:"auto",width:"100%"},item:!0,children:(0,x.jsx)(s.Z,{children:(0,x.jsx)(l.ZP,{id:"formulaBox",container:!0,direction:"row",children:(0,x.jsx)(Z.Z,{style:{margin:"auto"},children:Q})})})}),(0,x.jsxs)(l.ZP,{spacing:2,style:{width:"100%",height:"100%",margin:"auto",direction:"ltr"},container:!0,children:[(0,x.jsx)(l.ZP,{md:4,sm:12,xs:12,sx:{marginTop:"1%",width:"100%"},container:!0,children:(0,x.jsx)(l.ZP,{xs:12,children:(0,x.jsx)(j,{rawNumerator:n,rawDenominator:g,k_min:w,k_max:N,$rawNumerator:a,$rawDenominator:f,$k_min:C,$k_max:T,updatePlot:xe,responseTime:ne,N:de,$N:ue,method:ie,changeMethod:se})})}),(0,x.jsx)(l.ZP,{md:8,sm:12,xs:12,item:!0,children:(0,x.jsx)(l.ZP,{xs:12,item:!0,children:(0,x.jsx)(s.Z,{children:(0,x.jsx)(v.Z,{title:"\u0645\u06a9\u0627\u0646 \u0647\u0646\u062f\u0633\u06cc",traces:[E,W,q]})})})})]})]})})]})}},78793:function(e,t,n){var o=n(1413),r=n(45987),a=n(72791),i=n(13967),s=n(57621),c=n(9585),l=n(20890),d=n(47924),u=n(39504),x=n(80184),h=["border","boxShadow","children","content","contentClass","contentSX","darkTitle","secondary","shadow","sx","title"],p={"& .MuiCardHeader-action":{mr:0}},m=(0,a.forwardRef)((function(e,t){var n=e.border,a=void 0===n||n,m=e.boxShadow,v=e.children,Z=e.content,g=void 0===Z||Z,f=e.contentClass,b=void 0===f?"":f,y=e.contentSX,S=void 0===y?{}:y,w=e.darkTitle,j=e.secondary,z=e.shadow,k=e.sx,$=void 0===k?{}:k,P=e.title,C=(0,r.Z)(e,h),I=(0,i.Z)();return(0,x.jsxs)(s.Z,(0,o.Z)((0,o.Z)({ref:t},C),{},{sx:(0,o.Z)({overflowY:"auto",border:a?"1px solid":"none",borderColor:I.palette.primary[200]+75,":hover":{boxShadow:m?z||"0 2px 14px 0 rgb(32 40 45 / 8%)":"inherit"}},$),children:[!w&&P&&(0,x.jsx)(c.Z,{sx:p,title:P,action:j}),w&&P&&(0,x.jsx)(c.Z,{sx:p,title:(0,x.jsx)(l.Z,{variant:"h3",children:P}),action:j}),P&&(0,x.jsx)(d.Z,{}),g&&(0,x.jsx)(u.Z,{sx:S,className:b,children:v}),!g&&v]}))}));t.Z=m},71479:function(e,t,n){var o=n(80184);t.Z=function(e){var t=e.id,n=e.color,r=void 0===n?"white":n,a=e.background,i=void 0===a?"lightgreen":a,s=e.borderRadius,c=void 0===s?"10px":s;return(0,o.jsx)("div",{style:{width:"0%",textAlign:"right",background:i,color:r,borderRadius:c,padding:"1%"},id:t})}},36151:function(e,t,n){n.d(t,{Z:function(){return z}});var o=n(4942),r=n(63366),a=n(87462),i=n(72791),s=(n(52007),n(28182)),c=n(35735),l=n(90767),d=n(12065),u=n(47630),x=n(93736),h=n(23701),p=n(14036),m=n(95159);function v(e){return(0,m.Z)("MuiButton",e)}var Z=(0,n(30208).Z)("MuiButton",["root","text","textInherit","textPrimary","textSecondary","outlined","outlinedInherit","outlinedPrimary","outlinedSecondary","contained","containedInherit","containedPrimary","containedSecondary","disableElevation","focusVisible","disabled","colorInherit","textSizeSmall","textSizeMedium","textSizeLarge","outlinedSizeSmall","outlinedSizeMedium","outlinedSizeLarge","containedSizeSmall","containedSizeMedium","containedSizeLarge","sizeMedium","sizeSmall","sizeLarge","fullWidth","startIcon","endIcon","iconSizeSmall","iconSizeMedium","iconSizeLarge"]);var g=i.createContext({}),f=n(80184),b=["children","color","component","className","disabled","disableElevation","disableFocusRipple","endIcon","focusVisibleClassName","fullWidth","size","startIcon","type","variant"],y=function(e){return(0,a.Z)({},"small"===e.size&&{"& > *:nth-of-type(1)":{fontSize:18}},"medium"===e.size&&{"& > *:nth-of-type(1)":{fontSize:20}},"large"===e.size&&{"& > *:nth-of-type(1)":{fontSize:22}})},S=(0,u.ZP)(h.Z,{shouldForwardProp:function(e){return(0,u.FO)(e)||"classes"===e},name:"MuiButton",slot:"Root",overridesResolver:function(e,t){var n=e.ownerState;return[t.root,t[n.variant],t["".concat(n.variant).concat((0,p.Z)(n.color))],t["size".concat((0,p.Z)(n.size))],t["".concat(n.variant,"Size").concat((0,p.Z)(n.size))],"inherit"===n.color&&t.colorInherit,n.disableElevation&&t.disableElevation,n.fullWidth&&t.fullWidth]}})((function(e){var t,n=e.theme,r=e.ownerState;return(0,a.Z)({},n.typography.button,(t={minWidth:64,padding:"6px 16px",borderRadius:n.shape.borderRadius,transition:n.transitions.create(["background-color","box-shadow","border-color","color"],{duration:n.transitions.duration.short}),"&:hover":(0,a.Z)({textDecoration:"none",backgroundColor:(0,d.Fq)(n.palette.text.primary,n.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},"text"===r.variant&&"inherit"!==r.color&&{backgroundColor:(0,d.Fq)(n.palette[r.color].main,n.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},"outlined"===r.variant&&"inherit"!==r.color&&{border:"1px solid ".concat(n.palette[r.color].main),backgroundColor:(0,d.Fq)(n.palette[r.color].main,n.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},"contained"===r.variant&&{backgroundColor:n.palette.grey.A100,boxShadow:n.shadows[4],"@media (hover: none)":{boxShadow:n.shadows[2],backgroundColor:n.palette.grey[300]}},"contained"===r.variant&&"inherit"!==r.color&&{backgroundColor:n.palette[r.color].dark,"@media (hover: none)":{backgroundColor:n.palette[r.color].main}}),"&:active":(0,a.Z)({},"contained"===r.variant&&{boxShadow:n.shadows[8]})},(0,o.Z)(t,"&.".concat(Z.focusVisible),(0,a.Z)({},"contained"===r.variant&&{boxShadow:n.shadows[6]})),(0,o.Z)(t,"&.".concat(Z.disabled),(0,a.Z)({color:n.palette.action.disabled},"outlined"===r.variant&&{border:"1px solid ".concat(n.palette.action.disabledBackground)},"outlined"===r.variant&&"secondary"===r.color&&{border:"1px solid ".concat(n.palette.action.disabled)},"contained"===r.variant&&{color:n.palette.action.disabled,boxShadow:n.shadows[0],backgroundColor:n.palette.action.disabledBackground})),t),"text"===r.variant&&{padding:"6px 8px"},"text"===r.variant&&"inherit"!==r.color&&{color:n.palette[r.color].main},"outlined"===r.variant&&{padding:"5px 15px",border:"1px solid ".concat("light"===n.palette.mode?"rgba(0, 0, 0, 0.23)":"rgba(255, 255, 255, 0.23)")},"outlined"===r.variant&&"inherit"!==r.color&&{color:n.palette[r.color].main,border:"1px solid ".concat((0,d.Fq)(n.palette[r.color].main,.5))},"contained"===r.variant&&{color:n.palette.getContrastText(n.palette.grey[300]),backgroundColor:n.palette.grey[300],boxShadow:n.shadows[2]},"contained"===r.variant&&"inherit"!==r.color&&{color:n.palette[r.color].contrastText,backgroundColor:n.palette[r.color].main},"inherit"===r.color&&{color:"inherit",borderColor:"currentColor"},"small"===r.size&&"text"===r.variant&&{padding:"4px 5px",fontSize:n.typography.pxToRem(13)},"large"===r.size&&"text"===r.variant&&{padding:"8px 11px",fontSize:n.typography.pxToRem(15)},"small"===r.size&&"outlined"===r.variant&&{padding:"3px 9px",fontSize:n.typography.pxToRem(13)},"large"===r.size&&"outlined"===r.variant&&{padding:"7px 21px",fontSize:n.typography.pxToRem(15)},"small"===r.size&&"contained"===r.variant&&{padding:"4px 10px",fontSize:n.typography.pxToRem(13)},"large"===r.size&&"contained"===r.variant&&{padding:"8px 22px",fontSize:n.typography.pxToRem(15)},r.fullWidth&&{width:"100%"})}),(function(e){var t;return e.ownerState.disableElevation&&(t={boxShadow:"none","&:hover":{boxShadow:"none"}},(0,o.Z)(t,"&.".concat(Z.focusVisible),{boxShadow:"none"}),(0,o.Z)(t,"&:active",{boxShadow:"none"}),(0,o.Z)(t,"&.".concat(Z.disabled),{boxShadow:"none"}),t)})),w=(0,u.ZP)("span",{name:"MuiButton",slot:"StartIcon",overridesResolver:function(e,t){var n=e.ownerState;return[t.startIcon,t["iconSize".concat((0,p.Z)(n.size))]]}})((function(e){var t=e.ownerState;return(0,a.Z)({display:"inherit",marginRight:8,marginLeft:-4},"small"===t.size&&{marginLeft:-2},y(t))})),j=(0,u.ZP)("span",{name:"MuiButton",slot:"EndIcon",overridesResolver:function(e,t){var n=e.ownerState;return[t.endIcon,t["iconSize".concat((0,p.Z)(n.size))]]}})((function(e){var t=e.ownerState;return(0,a.Z)({display:"inherit",marginRight:-4,marginLeft:8},"small"===t.size&&{marginRight:-2},y(t))})),z=i.forwardRef((function(e,t){var n=i.useContext(g),o=(0,c.Z)(n,e),d=(0,x.Z)({props:o,name:"MuiButton"}),u=d.children,h=d.color,m=void 0===h?"primary":h,Z=d.component,y=void 0===Z?"button":Z,z=d.className,k=d.disabled,$=void 0!==k&&k,P=d.disableElevation,C=void 0!==P&&P,I=d.disableFocusRipple,R=void 0!==I&&I,N=d.endIcon,T=d.focusVisibleClassName,M=d.fullWidth,B=void 0!==M&&M,E=d.size,F=void 0===E?"medium":E,A=d.startIcon,L=d.type,W=d.variant,_=void 0===W?"text":W,D=(0,r.Z)(d,b),V=(0,a.Z)({},d,{color:m,component:y,disabled:$,disableElevation:C,disableFocusRipple:R,fullWidth:B,size:F,type:L,variant:_}),q=function(e){var t=e.color,n=e.disableElevation,o=e.fullWidth,r=e.size,i=e.variant,s=e.classes,c={root:["root",i,"".concat(i).concat((0,p.Z)(t)),"size".concat((0,p.Z)(r)),"".concat(i,"Size").concat((0,p.Z)(r)),"inherit"===t&&"colorInherit",n&&"disableElevation",o&&"fullWidth"],label:["label"],startIcon:["startIcon","iconSize".concat((0,p.Z)(r))],endIcon:["endIcon","iconSize".concat((0,p.Z)(r))]},d=(0,l.Z)(c,v,s);return(0,a.Z)({},s,d)}(V),O=A&&(0,f.jsx)(w,{className:q.startIcon,ownerState:V,children:A}),X=N&&(0,f.jsx)(j,{className:q.endIcon,ownerState:V,children:N});return(0,f.jsxs)(S,(0,a.Z)({ownerState:V,className:(0,s.Z)(z,n.className),component:y,disabled:$,focusRipple:!R,focusVisibleClassName:(0,s.Z)(q.focusVisible,T),ref:t,type:L},D,{classes:q,children:[O,u,X]}))}))},59416:function(){},69843:function(e,t,n){e.exports=n.p+"static/media/part1.c6596e2494e0463f05af.png"},61454:function(e,t,n){e.exports=n.p+"static/media/part2.724b591e28f60998df93.png"}}]);
//# sourceMappingURL=102.043925c2.chunk.js.map
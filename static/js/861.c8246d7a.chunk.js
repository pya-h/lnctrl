"use strict";(self.webpackChunklnctrl=self.webpackChunklnctrl||[]).push([[861,773,174,884,836],{93554:function(e,t,n){var i=n(61889),o=n(54905),r=n(63466),a=n(65773),c=n(72791),s=n(80184);t.Z=function(e){var t=e.parameters,n=e.setters,l=e.labels,d=e.units;return(0,s.jsx)(c.Fragment,{children:t instanceof Array&&t.map((function(e,t){return(0,s.jsx)(i.ZP,{md:12,sm:4,xs:6,item:!0,children:(0,s.jsx)(o.Z,{onChange:function(e){return n[t](e.target.value)},value:e,sx:{width:"100%"},InputProps:{startAdornment:(0,s.jsx)(r.Z,{position:"left",children:(0,s.jsx)(a.Z,{children:l[t]})}),endAdornment:d[t]&&(0,s.jsx)(r.Z,{position:"right",children:(0,s.jsx)(a.Z,{children:d[t]})})}})})}))})}},63970:function(e,t,n){n(72791);var i=n(68286),o=n(80184);t.Z=function(e){var t=e.traces,n=e.title,r=(e.width,e.height),a=void 0===r?500:r,c=e.logX;return(0,o.jsx)(i.Z,{style:{textAlign:"center"},data:t,layout:{margin:{t:30,l:30,r:20,b:30},xaxis:{rangemode:"tozero",zeroline:!0,type:c?"log":"dec"},yaxis:{rangemode:"tozero",zeroline:!0},height:a,title:n,hoverlabel:{align:"auto",boxmode:"overlay",font:{color:"#000000FF"}},legend:{orientation:"h"}}})}},29961:function(e,t,n){var i=n(70885),o=n(91720),r=n(27247),a=n(85029),c=n(63787),s=n(61889),l=n(13400),d=n(53767),u=n(82550),h=n(72791),x=n(24250),p=n(37185),m=n(80184);t.Z=function(e){var t=e.capture,n=e.reset,v=e.update,f=e.toggle3DPlot,Z=(0,h.useState)(!1),g=(0,i.Z)(Z,2),$=g[0],b=g[1],j=(0,h.useState)(20),y=(0,i.Z)(j,2),S=y[0],z=y[1];return(0,h.useEffect)((function(){v({thickness:S/20+.1})}),[S,v]),(0,m.jsxs)(s.ZP,{sx:{direction:"rtl"},container:!0,direction:"row",children:[(0,m.jsxs)(s.ZP,{md:10,sm:8,xs:6,sx:{direction:"rtl"},item:!0,children:[f&&(0,m.jsx)(l.Z,{color:"secondary","aria-label":"capture graph",component:"span",onClick:function(){b(!$),f()},children:$?(0,m.jsx)(p.Z,{}):(0,m.jsx)(x.Z,{})}),t&&(0,m.jsx)(l.Z,{color:"secondary","aria-label":"capture graph",component:"span",onClick:t,children:(0,m.jsx)(o.Z,{})}),n&&(0,m.jsx)(l.Z,{color:"secondary","aria-label":"capture graph",component:"span",onClick:n,children:(0,m.jsx)(r.Z,{})})]}),(0,m.jsx)(s.ZP,{md:2,sm:4,xs:6,item:!0,children:(0,m.jsxs)(d.Z,{spacing:2,direction:"row",sx:{mt:.5,direction:"ltr"},alignItems:"center",children:[(0,m.jsx)(a.Z,{}),(0,m.jsx)(u.ZP,{"aria-label":"Volume",value:S,onChange:function(e,t){return z(t)}}),(0,m.jsx)(c.Z,{})]})})]})}},66861:function(e,t,n){n.r(t),n.d(t,{default:function(){return w}});n(59416);var i=n(61889),o=n(78793),r=n(91923),a=n(42982),c=n(70885),s=n(71598),l=n(28297),d=n(36580),u=n(65773),h=n(80184),x=function(){return(0,h.jsxs)(s.Z,{title:"\u0633\u06cc\u0633\u062a\u0645 \u062c\u0631\u0645 \u0641\u0646\u0631 \u062f\u0645\u067e\u0631",darkBorder:!0,sx:{direction:"rtl"},children:[(0,h.jsxs)(i.ZP,{className:"lecture-text",item:!0,children:[(0,h.jsx)("p",{children:"\xa0 \xa0 \xa0 \xa0 \u0647\u0645\u0627\u0646\u0637\u0648\u0631 \u06a9\u0647 \u062f\u0631 \u0633\u06cc\u0633\u062a\u0645 \u0647\u0627\u06cc \u0627\u0644\u06a9\u062a\u0631\u06cc\u06a9\u06cc \u0628\u0627 \u06cc\u06a9 \u0645\u062f\u0627\u0631 \u0627\u0644\u06a9\u062a\u0631\u06cc\u06a9\u06cc \u0633\u0631\u0648\u06a9\u0627\u0631 \u062f\u0627\u0634\u062a\u06cc\u0645 \u06a9\u0647 \u0634\u0627\u0645\u0644 \u06f3 \u0627\u0644\u0645\u0627\u0646 \u0627\u0635\u0644\u06cc \u0628\u0648\u062f\u060c\u062f\u0631 \u0633\u06cc\u0633\u062a\u0645 \u0647\u0627\u06cc \u0645\u06a9\u0627\u0646\u06cc\u06a9\u06cc \u0648 \u0647\u06cc\u062f\u0631\u0648\u0644\u06cc\u06a9\u06cc \u0647\u0645 \u0639\u0645\u0648\u0645\u0627 \u0633\u0647 \u0627\u0644\u0645\u0627\u0646 \u0627\u0635\u0644\u06cc \u062f\u0627\u0631\u06cc\u0645:"}),(0,h.jsx)("img",{className:"lecture-image",src:l,alt:"\u0628\u0627\u0631\u06af\u0630\u0627\u0631\u06cc \u062a\u0635\u0648\u06cc\u0631 \u0628\u0627 \u0645\u0634\u06a9\u0644 \u0645\u0648\u0627\u062c\u0647 \u0634\u062f"})]}),(0,h.jsxs)(i.ZP,{className:"lecture-text",item:!0,children:[(0,h.jsxs)("p",{children:["\xa0 \xa0 \xa0 \xa0",(0,h.jsx)("span",{className:"lecture-text-titr",children:"\u06f1)\u200c \u0641\u0646\u0631: "}),"\u0627\u0648\u0644\u06cc\u0646 \u0627\u0644\u0645\u0627\u0646 \u0641\u0646\u0631 \u0647\u0633\u062a \u06a9\u0647 \u0628\u0627 \u0627\u0639\u0645\u0627\u0644 \u06cc\u06a9 \u0646\u06cc\u0631\u0648 \u0645\u06cc \u062a\u0648\u0627\u0646\u06cc\u0645 \u0645\u06cc\u0632\u0627\u0646 \u06a9\u0634\u0634 \u06cc\u0627 \u062c\u0645\u0639 \u0634\u062f\u06af\u06cc \u06cc\u0627 \u0641\u0634\u0631\u062f\u06af\u06cc \u0641\u0646\u0631 \u0631\u0627 \u0628\u062f\u0633\u062a \u0622\u0648\u0631\u06cc\u0645. K \u0636\u0631\u06cc\u0628 \u062b\u0627\u0628\u062a \u0641\u0646\u0631 \u0627\u0633\u062a"]}),(0,h.jsxs)("p",{children:["\xa0 \xa0 \xa0 \xa0",(0,h.jsx)("span",{className:"lecture-text-titr",children:"\u06f2)\u200c \u062f\u0645\u067e\u0631: "}),"\u062f\u0648\u0645\u06cc\u0646 \u0627\u0644\u0645\u0627\u0646\u06cc \u06a9\u0647 \u062f\u0631 \u0633\u06cc\u0633\u062a\u0645 \u0647\u0627\u06cc \u0645\u06a9\u0627\u0646\u06cc\u06a9\u06cc \u0648 \u0647\u06cc\u062f\u0631\u0648\u0644\u06cc\u06a9\u06cc \u0648\u062c\u0648\u062f \u062f\u0627\u0631\u062f \u062f\u0645\u067e\u0631 \u0647\u0633\u062a \u06a9\u0647 \u0628\u0627 \u0627\u0639\u0645\u0627\u0644 \u0646\u06cc\u0631\u0648\u06cc F \u0645\u06cc\u200c\u062a\u0648\u0627\u0646 \u0622\u0646 \u0631\u0627 \u0628\u0627\u0632 \u06cc\u0627 \u0628\u0633\u062a\u0647 \u06a9\u0631\u062f."]}),(0,h.jsxs)("p",{children:["\xa0 \xa0 \xa0 \xa0",(0,h.jsx)("span",{className:"lecture-text-titr",children:"\u06f3)\u200c \u062c\u0631\u0645: "}),"\u0627\u0644\u0645\u0627\u0646 \u0633\u0648\u0645\u060c \u062c\u0631\u0645 \u0627\u0633\u062a \u06a9\u0647 \u0627\u06cc\u0646\u0631\u0633\u06cc \u0631\u0627 \u062f\u0631 \u062e\u0648\u062f \u0630\u062e\u06cc\u0631\u0647 \u0645\u06cc \u06a9\u0646\u062f \u0648 \u0628\u0627 \u0627\u0639\u0645\u0627\u0644 \u06cc\u06a9 \u0646\u06cc\u0631\u0648 F \u0645\u06cc \u062a\u0648\u0627\u0646 \u0622\u0646 \u0631\u0627 \u062c\u0627\u0628\u0647 \u062c\u0627 \u06a9\u0631\u062f. \u062f\u0631 \u0633\u06cc\u0633\u062a\u0645 \u0647\u0627\u06cc \u0645\u06a9\u0627\u0646\u06cc\u06a9\u06cc \u0628\u0647 \u0637\u0648\u0631 \u0645\u0639\u0645\u0648\u0644 \u0628\u06cc\u0646 \u0646\u06cc\u0631\u0648 \u0648 \u062c\u0627\u0628\u0647 \u062c\u0627\u06cc\u06cc \u0627\u0644\u0645\u0627\u0646 \u06cc\u06a9 \u0631\u0627\u0628\u0637\u0647 \u0628\u0631\u0642\u0631\u0627\u0631 \u0627\u0633\u062a. \u062f\u0631 \u0648\u0627\u0642\u0639 \u0646\u06cc\u0631\u0648 \u0628\u0647 \u0639\u0646\u0648\u0627\u0646 \u0639\u0627\u0645\u0644 \u0645\u062d\u0631\u06a9 \u0648 \u062c\u0627\u0628\u0647 \u062c\u0627\u06cc\u06cc \u0628\u0647 \u0639\u0646\u0648\u0627\u0646 \u0639\u0627\u0645\u0644 \u0645\u062a\u062d\u0631\u06a9 \u0639\u0645\u0644 \u0645\u06cc\u200c\u06a9\u0646\u062f."]}),(0,h.jsx)("img",{className:"lecture-image",src:d,alt:"\u0628\u0627\u0631\u06af\u0630\u0627\u0631\u06cc \u062a\u0635\u0648\u06cc\u0631 \u0628\u0627 \u0645\u0634\u06a9\u0644 \u0645\u0648\u0627\u062c\u0647 \u0634\u062f"})]}),(0,h.jsx)(i.ZP,{className:"lecture-text",item:!0,children:(0,h.jsx)("p",{children:"\xa0 \xa0 \xa0 \xa0 \u067e\u0633 \u0627\u0632 \u062a\u062d\u0644\u06cc\u0644 \u0627\u06cc\u0646 \u0633\u06cc\u0633\u062a\u0645 \u0628\u0647 \u0645\u0639\u0627\u062f\u0644\u0647 \u062f\u06cc\u0641\u0631\u0627\u0646\u0633\u06cc\u0644 \u0645\u0631\u062a\u0628\u0647 \u062f\u0648\u0645 \u0632\u06cc\u0631 \u0645\u06cc \u0631\u0633\u06cc\u0645 \u06a9\u0647 \u067e\u0627\u0633\u062e \u067e\u0627\u0633\u062e \u0622\u0646 \u062f\u0631 \u0648\u0627\u0642\u0639 \u0645\u06cc\u0632\u0627\u0646 \u062c\u0627\u0628\u0647 \u062c\u0627\u06cc\u06cc \u062c\u0631\u0645 m \u0637\u06cc \u0645\u062f\u062a \u0632\u0645\u0627\u0646 t \u062e\u0648\u0627\u0647\u062f \u0628\u0648\u062f."})}),(0,h.jsx)(i.ZP,{item:!0,children:(0,h.jsx)(u.Z,{children:"$$m\\frac{d^2x(t)}{dt^2} + c\\frac{dx(t)}{dt} + kx(t) = F(t)$$"})})]})},p=n(30830),m=n(72791),v=n(36151),f=n(93554),Z=["$$m = $$","$$c = $$","$$k = $$","$$F(t) = $$","$$x_i = $$","$$v_i = $$","$$t_i = $$","$$t_f = $$","$$N = $$"],g=["$$Kg$$","$$\\frac{N.s}{m}$$","$$\\frac{N}{m}$$","$$N$$","$$m$$","$$\\frac{m}{s}$$","$$sec$$","$$sec$$",null],$=function(e){var t=e.m,n=e.c,o=e.k,r=e.F_t,a=e.x_i,l=e.v_i,d=e.t_i,u=e.t_f,x=e.output,p=e.$m,$=e.$c,b=e.$k,j=e.$F_t,y=e.$x_i,S=e.$v_i,z=e.$t_i,w=e.$t_f,k=e.$output,C=e.N,_=e.$N,P=(0,m.useState)(null),F=(0,c.Z)(P,2),N=F[0],I=F[1];return(0,m.useEffect)((function(){I(x?x.toLowerCase():"y")}),[x]),(0,h.jsx)(s.Z,{darkBorder:!0,title:"\u067e\u0627\u0631\u0627\u0645\u062a\u0631\u0647\u0627",sx:{direction:"ltr",textAlign:"right",height:"100%"},children:(0,h.jsxs)(i.ZP,{spacing:.6,container:!0,direction:"row",children:[(0,h.jsx)(f.Z,{parameters:[t,n,o,r,a,l,d,u,C],setters:[p,$,b,j,y,S,z,w,_],labels:Z,units:g}),(0,h.jsxs)(i.ZP,{xs:12,container:!0,children:[(0,h.jsx)(i.ZP,{xs:4,sx:{p:1},item:!0,children:(0,h.jsx)(v.Z,{onClick:function(){return k(null)},style:{width:"100%",textTransform:"none"},variant:"y"===N?"contained":"outlined",children:"x"})}),(0,h.jsx)(i.ZP,{xs:4,sx:{p:1},item:!0,children:(0,h.jsx)(v.Z,{onClick:function(){return k("dy")},style:{width:"100%",textTransform:"none"},variant:"dy"===N?"contained":"outlined",children:"v"})}),(0,h.jsx)(i.ZP,{xs:4,sx:{p:1},item:!0,children:(0,h.jsx)(v.Z,{onClick:function(){return k("d2y")},style:{width:"100%",textTransform:"none"},variant:"d2y"===N?"contained":"outlined",children:"a"})})]})]})})},b=n(29961),j=n(63970),y="t",S=function(e){switch(e){case"dy":return"v";case"d2y":return"a";default:return"x"}},z=function(){var e=(0,m.useState)(100),t=(0,c.Z)(e,2),n=t[0],o=t[1],r=(0,m.useState)(1),l=(0,c.Z)(r,2),d=l[0],v=l[1],f=(0,m.useState)(1),Z=(0,c.Z)(f,2),g=Z[0],z=Z[1],w=(0,m.useState)(0),k=(0,c.Z)(w,2),C=k[0],_=k[1],P=(0,m.useState)(0),F=(0,c.Z)(P,2),N=F[0],I=F[1],R=(0,m.useState)(5),M=(0,c.Z)(R,2),V=M[0],E=M[1],T=(0,m.useState)(0),B=(0,c.Z)(T,2),H=B[0],L=B[1],A=(0,m.useState)(1),W=(0,c.Z)(A,2),D=W[0],O=W[1],q=(0,m.useState)([]),X=(0,c.Z)(q,2),K=X[0],Y=X[1],G=(0,m.useState)([]),J=(0,c.Z)(G,2),Q=J[0],U=J[1],ee=(0,m.useState)(null),te=(0,c.Z)(ee,2),ne=te[0],ie=te[1],oe=(0,m.useState)(1),re=(0,c.Z)(oe,2),ae=re[0],ce=re[1],se=(0,m.useState)(!1),le=(0,c.Z)(se,2),de=le[0],ue=le[1],he=(0,m.useState)(null),xe=(0,c.Z)(he,2),pe=xe[0],me=xe[1],ve=(0,m.useState)(!1),fe=(0,c.Z)(ve,2),Ze=fe[0],ge=fe[1],$e=(0,m.useState)(1e3),be=(0,c.Z)($e,2),je=be[0],ye=be[1];(0,m.useEffect)((function(){var e=function(e,t,i){return Number((C-+d*i-+g*t)/+n)},t=p.ZP.ODE.euiler(2,N,V,{y0:+H,dy_dt0:+D,fyt:e,output:pe},+je),i=(0,c.Z)(t,3),o=i[0],r=i[1],a=i[2];if(pe&&"d2y"===pe.toLowerCase())for(var s=0;s<o.length;s++)r[s]=e(o[s],r[s],a[s]);ie(function(e,t,n,i){return"$$"+e+"\\frac{d^2x(t)}{dt^2}"+(t?" + "+(1!==t?t:"")+"\\frac{dx(t)}{dt}":"")+(n?" + "+(1!==n?n:"")+"x(t) = ":" = ")+i+"$$"}(n,d,g,C));var l=K.map((function(e,t){var n=function(t,n,i){return Number((e.F_t-e.c*i-e.k*n)/e.m)},i=p.ZP.ODE.euiler(2,N,V,{y0:e.x_i,dy_dt0:e.v_i,fyt:n,output:e.output},+je),o=(0,c.Z)(i,3),r=o[0],a=o[1],s=o[2];return e.output&&"d2y"===e.output.toLowerCase()&&(a=r.map((function(e,t){return n(0,a[t],s[t])}))),{x:r,y:a,z:Ze?Array(r.length).fill(0):null,line:{width:e.thickness},type:"scatter"+(Ze?"3d":""),mode:"lines",name:e.legend}}));-1===K.findIndex((function(e){return e.v_i===+D&&e.x_i===+H&&e.m===+n&&e.c===+d&&e.k===+g&&e.F_t===C&&e.output===pe}))&&l.push({x:o,y:r,z:Ze?Array(o.length).fill(0):null,line:{width:ae},type:"scatter"+(Ze?"3d":""),mode:"lines",name:"".concat(S(pe),"(").concat(y,")")}),U(l)}),[n,d,g,C,N,V,H,D,pe,Ze,ae,K,je]),(0,m.useEffect)((function(){ue(!1)}),[n,d,g,C,H,D,pe]);return(0,h.jsxs)(i.ZP,{container:!0,direction:"column",spacing:1,children:[(0,h.jsx)(i.ZP,{style:{width:"100%",height:"100%",margin:"auto",direction:"ltr"},item:!0,children:(0,h.jsx)(x,{})}),(0,h.jsx)(i.ZP,{sx:{margin:"auto",width:"100%"},item:!0,children:(0,h.jsx)(s.Z,{sx:{direction:"ltr"},children:(0,h.jsxs)(i.ZP,{id:"formulaBox",sx:{margin:"auto"},container:!0,direction:"row",children:[K.map((function(e,t){t?e.m===K[t-1].m&&e.c===K[t-1].c&&e.k===K[t-1].k&&e.F_t===K[t-1].F_t?e.index=K[t-1].index:e.index=K[t-1].index+1:e.index=t+1;var n=function(e,t,n,i,o){return"$$"+e+"\\frac{d^2x_{".concat(o,"}(t)}{dt^2}")+(t?" + "+(1!==t?t:"")+"\\frac{dx_{".concat(o,"}(t)}{dt}"):"")+(n?" + "+(1!==n?n:"")+"x_{".concat(o,"}(t) = "):" = ")+i+"$$"}(e.m,e.c,e.k,e.F_t,e.index);return(0,h.jsx)(i.ZP,{md:6,sm:12,item:!0,children:(0,h.jsx)(u.Z,{children:n})})})),!de&&(0,h.jsx)(i.ZP,{md:6,sm:12,children:(0,h.jsx)(u.Z,{children:ne})})]})})}),(0,h.jsxs)(i.ZP,{spacing:2,style:{width:"100%",height:"100%",margin:"auto",direction:"ltr"},container:!0,children:[(0,h.jsx)(i.ZP,{md:3,sm:12,xs:12,sx:{marginTop:"1%",width:"100%"},container:!0,children:(0,h.jsx)(i.ZP,{xs:12,children:(0,h.jsx)($,{m:n,c:d,k:g,F_t:C,x_i:H,v_i:D,t_i:N,t_f:V,output:pe,$m:o,$c:v,$k:z,$F_t:_,$x_i:L,$v_i:O,$t_i:I,$t_f:E,$output:me,N:je,$N:ye})})}),(0,h.jsxs)(i.ZP,{md:9,sm:12,xs:12,item:!0,children:[(0,h.jsx)(s.Z,{children:(0,h.jsx)(b.Z,{capture:function(){var e=(0,a.Z)(K);-1===e.findIndex((function(e){return e.v_i===+D&&e.x_i===+H&&e.m===+n&&e.c===+d&&e.k===+g&&e.F_t===C&&e.output===pe}))&&(e.push({x_i:+H,v_i:+D,m:+n,c:+d,k:+g,F_t:C,output:pe,thickness:ae,legend:"$$"+S(pe)+"_{"+(K.length+1).toString()+"}$$"}),Y(e),ue(!0))},reset:function(){return Y([])},update:function(e){return function(e){e&&ce(e.thickness)}(e)},toggle3DPlot:function(){return ge(!Ze)}})}),(0,h.jsx)("hr",{}),(0,h.jsx)(i.ZP,{lg:12,md:12,sm:12,xs:12,item:!0,children:(0,h.jsx)(s.Z,{children:(0,h.jsx)(j.Z,{title:"\u0645\u0646\u062d\u0646\u06cc \u0645\u0634\u062e\u0635\u0647 \u0647\u0627\u06cc \u06af\u0627\u0631\u06cc",traces:Q})})})]})]})]})},w=function(){return(0,h.jsxs)(o.Z,{style:{background:"transparent"},children:[(0,h.jsx)(i.ZP,{item:!0,spacing:r.dv,children:(0,h.jsx)("h2",{className:"chapter-section-title",children:"\u0645\u062f\u0644 \u0633\u0627\u0632\u06cc \u0633\u06cc\u0633\u062a\u0645 \u0647\u0627\u06cc \u0645\u06a9\u0627\u0646\u06cc\u06a9\u06cc"})}),(0,h.jsx)(i.ZP,{item:!0,spacing:r.dv,children:(0,h.jsx)(z,{})})]})}},78793:function(e,t,n){var i=n(1413),o=n(45987),r=n(72791),a=n(13967),c=n(57621),s=n(9585),l=n(20890),d=n(47924),u=n(39504),h=n(80184),x=["border","boxShadow","children","content","contentClass","contentSX","darkTitle","secondary","shadow","sx","title"],p={"& .MuiCardHeader-action":{mr:0}},m=(0,r.forwardRef)((function(e,t){var n=e.border,r=void 0===n||n,m=e.boxShadow,v=e.children,f=e.content,Z=void 0===f||f,g=e.contentClass,$=void 0===g?"":g,b=e.contentSX,j=void 0===b?{}:b,y=e.darkTitle,S=e.secondary,z=e.shadow,w=e.sx,k=void 0===w?{}:w,C=e.title,_=(0,o.Z)(e,x),P=(0,a.Z)();return(0,h.jsxs)(c.Z,(0,i.Z)((0,i.Z)({ref:t},_),{},{sx:(0,i.Z)({overflowY:"auto",border:r?"1px solid":"none",borderColor:P.palette.primary[200]+75,":hover":{boxShadow:m?z||"0 2px 14px 0 rgb(32 40 45 / 8%)":"inherit"}},k),children:[!y&&C&&(0,h.jsx)(s.Z,{sx:p,title:C,action:S}),y&&C&&(0,h.jsx)(s.Z,{sx:p,title:(0,h.jsx)(l.Z,{variant:"h3",children:C}),action:S}),C&&(0,h.jsx)(d.Z,{}),Z&&(0,h.jsx)(u.Z,{sx:j,className:$,children:v}),!Z&&v]}))}));t.Z=m},27247:function(e,t,n){var i=n(95318);t.Z=void 0;var o=i(n(45649)),r=n(80184),a=(0,o.default)((0,r.jsx)("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"}),"Delete");t.Z=a},63787:function(e,t,n){var i=n(95318);t.Z=void 0;var o=i(n(45649)),r=n(80184),a=(0,o.default)((0,r.jsx)("path",{d:"M5 15H3v4c0 1.1.9 2 2 2h4v-2H5v-4zM5 5h4V3H5c-1.1 0-2 .9-2 2v4h2V5zm14-2h-4v2h4v4h2V5c0-1.1-.9-2-2-2zm0 16h-4v2h4c1.1 0 2-.9 2-2v-4h-2v4zM12 9c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"}),"FilterCenterFocus");t.Z=a},85029:function(e,t,n){var i=n(95318);t.Z=void 0;var o=i(n(45649)),r=n(80184),a=(0,o.default)((0,r.jsx)("path",{d:"M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"}),"Fullscreen");t.Z=a},91720:function(e,t,n){var i=n(95318);t.Z=void 0;var o=i(n(45649)),r=n(80184),a=(0,o.default)([(0,r.jsx)("circle",{cx:"12",cy:"12",r:"3.2"},"0"),(0,r.jsx)("path",{d:"M9 2 7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"},"1")],"PhotoCamera");t.Z=a},24250:function(e,t,n){var i=n(95318);t.Z=void 0;var o=i(n(45649)),r=n(80184),a=(0,o.default)((0,r.jsx)("path",{d:"M7.52 21.48C4.25 19.94 1.91 16.76 1.55 13H.05C.56 19.16 5.71 24 12 24l.66-.03-3.81-3.81-1.33 1.32zm.89-6.52c-.19 0-.37-.03-.52-.08-.16-.06-.29-.13-.4-.24-.11-.1-.2-.22-.26-.37-.06-.14-.09-.3-.09-.47h-1.3c0 .36.07.68.21.95.14.27.33.5.56.69.24.18.51.32.82.41.3.1.62.15.96.15.37 0 .72-.05 1.03-.15.32-.1.6-.25.83-.44s.42-.43.55-.72c.13-.29.2-.61.2-.97 0-.19-.02-.38-.07-.56-.05-.18-.12-.35-.23-.51-.1-.16-.24-.3-.4-.43-.17-.13-.37-.23-.61-.31.2-.09.37-.2.52-.33.15-.13.27-.27.37-.42.1-.15.17-.3.22-.46.05-.16.07-.32.07-.48 0-.36-.06-.68-.18-.96-.12-.28-.29-.51-.51-.69-.2-.19-.47-.33-.77-.43C9.1 8.05 8.76 8 8.39 8c-.36 0-.69.05-1 .16-.3.11-.57.26-.79.45-.21.19-.38.41-.51.67-.12.26-.18.54-.18.85h1.3c0-.17.03-.32.09-.45s.14-.25.25-.34c.11-.09.23-.17.38-.22.15-.05.3-.08.48-.08.4 0 .7.1.89.31.19.2.29.49.29.86 0 .18-.03.34-.08.49-.05.15-.14.27-.25.37-.11.1-.25.18-.41.24-.16.06-.36.09-.58.09H7.5v1.03h.77c.22 0 .42.02.6.07s.33.13.45.23c.12.11.22.24.29.4.07.16.1.35.1.57 0 .41-.12.72-.35.93-.23.23-.55.33-.95.33zm8.55-5.92c-.32-.33-.7-.59-1.14-.77-.43-.18-.92-.27-1.46-.27H12v8h2.3c.55 0 1.06-.09 1.51-.27.45-.18.84-.43 1.16-.76.32-.33.57-.73.74-1.19.17-.47.26-.99.26-1.57v-.4c0-.58-.09-1.1-.26-1.57-.18-.47-.43-.87-.75-1.2zm-.39 3.16c0 .42-.05.79-.14 1.13-.1.33-.24.62-.43.85-.19.23-.43.41-.71.53-.29.12-.62.18-.99.18h-.91V9.12h.97c.72 0 1.27.23 1.64.69.38.46.57 1.12.57 1.99v.4zM12 0l-.66.03 3.81 3.81 1.33-1.33c3.27 1.55 5.61 4.72 5.96 8.48h1.5C23.44 4.84 18.29 0 12 0z"}),"ThreeDRotation");t.Z=a},37185:function(e,t,n){var i=n(95318);t.Z=void 0;var o=i(n(45649)),r=n(80184),a=(0,o.default)((0,r.jsx)("path",{d:"M12 7C6.48 7 2 9.24 2 12c0 2.24 2.94 4.13 7 4.77V20l4-4-4-4v2.73c-3.15-.56-5-1.9-5-2.73 0-1.06 3.04-3 8-3s8 1.94 8 3c0 .73-1.46 1.89-4 2.53v2.05c3.53-.77 6-2.53 6-4.58 0-2.76-4.48-5-10-5z"}),"ThreeSixty");t.Z=a},36151:function(e,t,n){n.d(t,{Z:function(){return z}});var i=n(4942),o=n(63366),r=n(87462),a=n(72791),c=(n(52007),n(28182)),s=n(35735),l=n(90767),d=n(12065),u=n(47630),h=n(93736),x=n(23701),p=n(14036),m=n(95159);function v(e){return(0,m.Z)("MuiButton",e)}var f=(0,n(30208).Z)("MuiButton",["root","text","textInherit","textPrimary","textSecondary","outlined","outlinedInherit","outlinedPrimary","outlinedSecondary","contained","containedInherit","containedPrimary","containedSecondary","disableElevation","focusVisible","disabled","colorInherit","textSizeSmall","textSizeMedium","textSizeLarge","outlinedSizeSmall","outlinedSizeMedium","outlinedSizeLarge","containedSizeSmall","containedSizeMedium","containedSizeLarge","sizeMedium","sizeSmall","sizeLarge","fullWidth","startIcon","endIcon","iconSizeSmall","iconSizeMedium","iconSizeLarge"]);var Z=a.createContext({}),g=n(80184),$=["children","color","component","className","disabled","disableElevation","disableFocusRipple","endIcon","focusVisibleClassName","fullWidth","size","startIcon","type","variant"],b=function(e){return(0,r.Z)({},"small"===e.size&&{"& > *:nth-of-type(1)":{fontSize:18}},"medium"===e.size&&{"& > *:nth-of-type(1)":{fontSize:20}},"large"===e.size&&{"& > *:nth-of-type(1)":{fontSize:22}})},j=(0,u.ZP)(x.Z,{shouldForwardProp:function(e){return(0,u.FO)(e)||"classes"===e},name:"MuiButton",slot:"Root",overridesResolver:function(e,t){var n=e.ownerState;return[t.root,t[n.variant],t["".concat(n.variant).concat((0,p.Z)(n.color))],t["size".concat((0,p.Z)(n.size))],t["".concat(n.variant,"Size").concat((0,p.Z)(n.size))],"inherit"===n.color&&t.colorInherit,n.disableElevation&&t.disableElevation,n.fullWidth&&t.fullWidth]}})((function(e){var t,n=e.theme,o=e.ownerState;return(0,r.Z)({},n.typography.button,(t={minWidth:64,padding:"6px 16px",borderRadius:n.shape.borderRadius,transition:n.transitions.create(["background-color","box-shadow","border-color","color"],{duration:n.transitions.duration.short}),"&:hover":(0,r.Z)({textDecoration:"none",backgroundColor:(0,d.Fq)(n.palette.text.primary,n.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},"text"===o.variant&&"inherit"!==o.color&&{backgroundColor:(0,d.Fq)(n.palette[o.color].main,n.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},"outlined"===o.variant&&"inherit"!==o.color&&{border:"1px solid ".concat(n.palette[o.color].main),backgroundColor:(0,d.Fq)(n.palette[o.color].main,n.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},"contained"===o.variant&&{backgroundColor:n.palette.grey.A100,boxShadow:n.shadows[4],"@media (hover: none)":{boxShadow:n.shadows[2],backgroundColor:n.palette.grey[300]}},"contained"===o.variant&&"inherit"!==o.color&&{backgroundColor:n.palette[o.color].dark,"@media (hover: none)":{backgroundColor:n.palette[o.color].main}}),"&:active":(0,r.Z)({},"contained"===o.variant&&{boxShadow:n.shadows[8]})},(0,i.Z)(t,"&.".concat(f.focusVisible),(0,r.Z)({},"contained"===o.variant&&{boxShadow:n.shadows[6]})),(0,i.Z)(t,"&.".concat(f.disabled),(0,r.Z)({color:n.palette.action.disabled},"outlined"===o.variant&&{border:"1px solid ".concat(n.palette.action.disabledBackground)},"outlined"===o.variant&&"secondary"===o.color&&{border:"1px solid ".concat(n.palette.action.disabled)},"contained"===o.variant&&{color:n.palette.action.disabled,boxShadow:n.shadows[0],backgroundColor:n.palette.action.disabledBackground})),t),"text"===o.variant&&{padding:"6px 8px"},"text"===o.variant&&"inherit"!==o.color&&{color:n.palette[o.color].main},"outlined"===o.variant&&{padding:"5px 15px",border:"1px solid ".concat("light"===n.palette.mode?"rgba(0, 0, 0, 0.23)":"rgba(255, 255, 255, 0.23)")},"outlined"===o.variant&&"inherit"!==o.color&&{color:n.palette[o.color].main,border:"1px solid ".concat((0,d.Fq)(n.palette[o.color].main,.5))},"contained"===o.variant&&{color:n.palette.getContrastText(n.palette.grey[300]),backgroundColor:n.palette.grey[300],boxShadow:n.shadows[2]},"contained"===o.variant&&"inherit"!==o.color&&{color:n.palette[o.color].contrastText,backgroundColor:n.palette[o.color].main},"inherit"===o.color&&{color:"inherit",borderColor:"currentColor"},"small"===o.size&&"text"===o.variant&&{padding:"4px 5px",fontSize:n.typography.pxToRem(13)},"large"===o.size&&"text"===o.variant&&{padding:"8px 11px",fontSize:n.typography.pxToRem(15)},"small"===o.size&&"outlined"===o.variant&&{padding:"3px 9px",fontSize:n.typography.pxToRem(13)},"large"===o.size&&"outlined"===o.variant&&{padding:"7px 21px",fontSize:n.typography.pxToRem(15)},"small"===o.size&&"contained"===o.variant&&{padding:"4px 10px",fontSize:n.typography.pxToRem(13)},"large"===o.size&&"contained"===o.variant&&{padding:"8px 22px",fontSize:n.typography.pxToRem(15)},o.fullWidth&&{width:"100%"})}),(function(e){var t;return e.ownerState.disableElevation&&(t={boxShadow:"none","&:hover":{boxShadow:"none"}},(0,i.Z)(t,"&.".concat(f.focusVisible),{boxShadow:"none"}),(0,i.Z)(t,"&:active",{boxShadow:"none"}),(0,i.Z)(t,"&.".concat(f.disabled),{boxShadow:"none"}),t)})),y=(0,u.ZP)("span",{name:"MuiButton",slot:"StartIcon",overridesResolver:function(e,t){var n=e.ownerState;return[t.startIcon,t["iconSize".concat((0,p.Z)(n.size))]]}})((function(e){var t=e.ownerState;return(0,r.Z)({display:"inherit",marginRight:8,marginLeft:-4},"small"===t.size&&{marginLeft:-2},b(t))})),S=(0,u.ZP)("span",{name:"MuiButton",slot:"EndIcon",overridesResolver:function(e,t){var n=e.ownerState;return[t.endIcon,t["iconSize".concat((0,p.Z)(n.size))]]}})((function(e){var t=e.ownerState;return(0,r.Z)({display:"inherit",marginRight:-4,marginLeft:8},"small"===t.size&&{marginRight:-2},b(t))})),z=a.forwardRef((function(e,t){var n=a.useContext(Z),i=(0,s.Z)(n,e),d=(0,h.Z)({props:i,name:"MuiButton"}),u=d.children,x=d.color,m=void 0===x?"primary":x,f=d.component,b=void 0===f?"button":f,z=d.className,w=d.disabled,k=void 0!==w&&w,C=d.disableElevation,_=void 0!==C&&C,P=d.disableFocusRipple,F=void 0!==P&&P,N=d.endIcon,I=d.focusVisibleClassName,R=d.fullWidth,M=void 0!==R&&R,V=d.size,E=void 0===V?"medium":V,T=d.startIcon,B=d.type,H=d.variant,L=void 0===H?"text":H,A=(0,o.Z)(d,$),W=(0,r.Z)({},d,{color:m,component:b,disabled:k,disableElevation:_,disableFocusRipple:F,fullWidth:M,size:E,type:B,variant:L}),D=function(e){var t=e.color,n=e.disableElevation,i=e.fullWidth,o=e.size,a=e.variant,c=e.classes,s={root:["root",a,"".concat(a).concat((0,p.Z)(t)),"size".concat((0,p.Z)(o)),"".concat(a,"Size").concat((0,p.Z)(o)),"inherit"===t&&"colorInherit",n&&"disableElevation",i&&"fullWidth"],label:["label"],startIcon:["startIcon","iconSize".concat((0,p.Z)(o))],endIcon:["endIcon","iconSize".concat((0,p.Z)(o))]},d=(0,l.Z)(s,v,c);return(0,r.Z)({},c,d)}(W),O=T&&(0,g.jsx)(y,{className:D.startIcon,ownerState:W,children:T}),q=N&&(0,g.jsx)(S,{className:D.endIcon,ownerState:W,children:N});return(0,g.jsxs)(j,(0,r.Z)({ownerState:W,className:(0,c.Z)(z,n.className),component:b,disabled:k,focusRipple:!F,focusVisibleClassName:(0,c.Z)(D.focusVisible,I),ref:t,type:B},A,{classes:D,children:[O,u,q]}))}))},53767:function(e,t,n){var i=n(4942),o=n(63366),r=n(87462),a=n(72791),c=(n(52007),n(51184)),s=n(45682),l=n(78519),d=n(82466),u=n(47630),h=n(93736),x=n(80184),p=["component","direction","spacing","divider","children"];function m(e,t){var n=a.Children.toArray(e).filter(Boolean);return n.reduce((function(e,i,o){return e.push(i),o<n.length-1&&e.push(a.cloneElement(t,{key:"separator-".concat(o)})),e}),[])}var v=(0,u.ZP)("div",{name:"MuiStack",slot:"Root",overridesResolver:function(e,t){return[t.root]}})((function(e){var t=e.ownerState,n=e.theme,o=(0,r.Z)({display:"flex"},(0,c.k9)({theme:n},(0,c.P$)({values:t.direction,breakpoints:n.breakpoints.values}),(function(e){return{flexDirection:e}})));if(t.spacing){var a=(0,s.hB)(n),l=Object.keys(n.breakpoints.values).reduce((function(e,n){return null==t.spacing[n]&&null==t.direction[n]||(e[n]=!0),e}),{}),u=(0,c.P$)({values:t.direction,base:l}),h=(0,c.P$)({values:t.spacing,base:l});o=(0,d.Z)(o,(0,c.k9)({theme:n},h,(function(e,n){return{"& > :not(style) + :not(style)":(0,i.Z)({margin:0},"margin".concat((o=n?u[n]:t.direction,{row:"Left","row-reverse":"Right",column:"Top","column-reverse":"Bottom"}[o])),(0,s.NA)(a,e))};var o})))}return o})),f=a.forwardRef((function(e,t){var n=(0,h.Z)({props:e,name:"MuiStack"}),i=(0,l.Z)(n),a=i.component,c=void 0===a?"div":a,s=i.direction,d=void 0===s?"column":s,u=i.spacing,f=void 0===u?0:u,Z=i.divider,g=i.children,$=(0,o.Z)(i,p),b={direction:d,spacing:f};return(0,x.jsx)(v,(0,r.Z)({as:c,ownerState:b,ref:t},$,{children:Z?m(g,Z):g}))}));t.Z=f},59416:function(){},28297:function(e,t,n){e.exports=n.p+"static/media/mass-spring-damper.jpg.ddc30a137877dd2a25ad.webp"},36580:function(e,t,n){e.exports=n.p+"static/media/mechanic-system-elements.f43b2de32df91825a141.jpg"}}]);
//# sourceMappingURL=861.c8246d7a.chunk.js.map
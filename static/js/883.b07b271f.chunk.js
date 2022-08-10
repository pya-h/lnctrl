"use strict";(self.webpackChunklnctrl=self.webpackChunklnctrl||[]).push([[883],{93554:function(e,n,t){var r=t(61889),s=t(54905),i=t(63466),a=t(65773),c=t(72791),l=t(80184);n.Z=function(e){var n=e.parameters,t=e.setters,o=e.labels,d=e.units;return(0,l.jsx)(c.Fragment,{children:n instanceof Array&&n.map((function(e,n){return(0,l.jsx)(r.ZP,{md:12,sm:4,xs:6,item:!0,children:(0,l.jsx)(s.Z,{onChange:function(e){return t[n](e.target.value)},value:e,sx:{width:"100%"},InputProps:{startAdornment:(0,l.jsx)(i.Z,{position:"left",children:(0,l.jsx)(a.Z,{children:o[n]})}),endAdornment:d[n]&&(0,l.jsx)(i.Z,{position:"right",children:(0,l.jsx)(a.Z,{children:d[n]})})}})})}))})}},63970:function(e,n,t){t(72791);var r=t(68286),s=t(80184);n.Z=function(e){var n=e.traces,t=e.title,i=(e.width,e.height),a=void 0===i?500:i,c=e.logX;return(0,s.jsx)(r.Z,{style:{textAlign:"center"},data:n,layout:{margin:{t:30,l:30,r:20,b:30},xaxis:{rangemode:"tozero",zeroline:!0,type:c?"log":"dec"},yaxis:{rangemode:"tozero",zeroline:!0},height:a,title:t,hoverlabel:{align:"auto",boxmode:"overlay",font:{color:"#000000FF"}},legend:{orientation:"h"}}})}},29961:function(e,n,t){var r=t(70885),s=t(91720),i=t(27247),a=t(85029),c=t(63787),l=t(61889),o=t(13400),d=t(53767),u=t(82550),x=t(72791),h=t(24250),m=t(37185),Z=t(80184);n.Z=function(e){var n=e.capture,t=e.reset,g=e.update,j=e.toggle3DPlot,p=(0,x.useState)(!1),$=(0,r.Z)(p,2),f=$[0],P=$[1],y=(0,x.useState)(20),v=(0,r.Z)(y,2),w=v[0],b=v[1];return(0,x.useEffect)((function(){g({thickness:w/20+.1})}),[w,g]),(0,Z.jsxs)(l.ZP,{sx:{direction:"rtl"},container:!0,direction:"row",children:[(0,Z.jsxs)(l.ZP,{md:10,sm:8,xs:6,sx:{direction:"rtl"},item:!0,children:[j&&(0,Z.jsx)(o.Z,{color:"secondary","aria-label":"capture graph",component:"span",onClick:function(){P(!f),j()},children:f?(0,Z.jsx)(m.Z,{}):(0,Z.jsx)(h.Z,{})}),n&&(0,Z.jsx)(o.Z,{color:"secondary","aria-label":"capture graph",component:"span",onClick:n,children:(0,Z.jsx)(s.Z,{})}),t&&(0,Z.jsx)(o.Z,{color:"secondary","aria-label":"capture graph",component:"span",onClick:t,children:(0,Z.jsx)(i.Z,{})})]}),(0,Z.jsx)(l.ZP,{md:2,sm:4,xs:6,item:!0,children:(0,Z.jsxs)(d.Z,{spacing:2,direction:"row",sx:{mt:.5,direction:"ltr"},alignItems:"center",children:[(0,Z.jsx)(a.Z,{}),(0,Z.jsx)(u.ZP,{"aria-label":"Volume",value:w,onChange:function(e,n){return b(n)}}),(0,Z.jsx)(c.Z,{})]})})]})}},2883:function(e,n,t){t.r(n),t.d(n,{default:function(){return D}});var r=t(1413),s=t(15861),i=t(42982),a=t(70885),c=t(87757),l=t.n(c),o=t(71598),d=t(30830),u=t(72791),x=t(29961),h=t(61889),m=t(20890),Z=t(63970),g=t(65773),j=t(36151),p=t(49877),$=t(82550),f=t(54905),P=t(93554),y=t(91923),v=t(89750),w=t(80184),b=["$$Num = [$$","$$Den = [$$","$$\\omega_{min} = $$","$$\\omega_{max} = $$","$$N = $$"],S=["$$]$$","$$]$$","$$Hz$$","$$Hz$$",null],k=function(e){var n=e.rawNumerator,t=e.rawDenominator,r=e.$rawNumerator,s=e.$rawDenominator,i=e.w_min,c=e.w_max,l=e.$w_min,d=e.$w_max,x=e.phaseInRadianScale,Z=e.setPhaseInRadianScale,k=e.N,T=e.$N,_=e.multiplier,C=(e.K,e.$K),A=(0,u.useState)(100),H=(0,a.Z)(A,2),z=H[0],N=H[1];return(0,w.jsxs)(o.Z,{darkBorder:!0,title:"\u067e\u0627\u0631\u0627\u0645\u062a\u0631\u0647\u0627",sx:{direction:"ltr",textAlign:"right",height:"100%"},children:[(0,w.jsxs)(h.ZP,{spacing:y.dv,container:!0,direction:"row",children:[(0,w.jsx)(P.Z,{parameters:[n,t,i,c,k],setters:[r,s,l,d,T],labels:b,units:S}),(0,w.jsx)(h.ZP,{xs:12,item:!0,children:(0,w.jsx)("hr",{})}),(0,w.jsxs)(h.ZP,{xs:12,style:{paddingLeft:"3%"},container:!0,children:[(0,w.jsx)(h.ZP,{xs:12,item:!0,children:(0,w.jsx)(m.Z,{dir:"rtl",style:{textAlign:"center"},children:"\u062e\u0631\u0648\u062c\u06cc \u0641\u0627\u0632 \u0628\u0631 \u062d\u0633\u0628:"})}),(0,w.jsx)(h.ZP,{xs:6,sx:{p:1},item:!0,children:(0,w.jsx)(j.Z,{onClick:function(){return Z(!1)},style:{width:"100%",textTransform:"none"},variant:x?"outlined":"contained",children:"\u062f\u0631\u062c\u0647"})}),(0,w.jsx)(h.ZP,{xs:6,sx:{p:1},item:!0,children:(0,w.jsx)(j.Z,{onClick:function(){return Z("rad")},style:{width:"100%",textTransform:"none"},variant:x?"contained":"outlined",children:"\u0631\u0627\u062f\u06cc\u0627\u0646"})})]})]}),(0,w.jsx)("hr",{}),(0,w.jsxs)(h.ZP,{xs:12,sx:{pt:y.dv},spacing:y.dv,style:{textAlign:"center"},container:!0,children:[(0,w.jsx)(h.ZP,{xs:12,item:!0,children:"\u062a\u0627\u062b\u06cc\u0631 \u0636\u0631\u0628 \u0627\u0633\u06a9\u0627\u0644\u0631 \u0633\u06cc\u0633\u062a\u0645 \u062f\u0631 \u0646\u0645\u0648\u062f\u0627\u0631 \u0628\u0648\u062f"}),(0,w.jsx)(h.ZP,{xs:4,item:!0,children:(0,w.jsx)(p.Z,{size:"large",variant:"circular",onClick:function(){return _(.1)},children:(0,w.jsx)(v.Z,{type:"scale",direction:"down",children:(0,w.jsx)(g.Z,{children:"$$\\times\\frac{1}{10}$$"})})})}),(0,w.jsx)(h.ZP,{xs:4,item:!0,children:(0,w.jsx)(p.Z,{size:"large",variant:"circular",onClick:function(){return _(10)},children:(0,w.jsx)(v.Z,{type:"scale",direction:"down",children:(0,w.jsx)(g.Z,{children:"$$\\times 10$$"})})})}),(0,w.jsx)(h.ZP,{xs:4,item:!0,children:(0,w.jsx)(p.Z,{size:"large",variant:"circular",onClick:function(){return _(-1)},children:(0,w.jsx)(v.Z,{type:"scale",direction:"down",children:(0,w.jsx)(g.Z,{children:"$$\\lgroup - \\rgroup$$"})})})})]}),(0,w.jsx)("br",{}),(0,w.jsx)("hr",{}),(0,w.jsx)("br",{}),(0,w.jsxs)(h.ZP,{xs:12,style:{textAlign:"center",border:"1px solid grey",borderRadius:"1rem",paddingBottom:"0.5rem",paddingRight:"0.5rem",margin:"auto"},spacing:y.dv,container:!0,children:[(0,w.jsx)(h.ZP,{xs:12,item:!0,children:"\u062a\u0627\u062b\u06cc\u0631 \u062a\u063a\u06cc\u06cc\u0631 \u0628\u0647\u0631\u0647 \u062f\u0631 \u0646\u0645\u0648\u062f\u0627\u0631 \u0628\u0648\u062f"}),(0,w.jsx)(h.ZP,{xs:9,item:!0,children:(0,w.jsx)($.ZP,{sx:{mt:1},"aria-label":"Volume",onChange:function(e,n){return C(n*z/100)}})}),(0,w.jsx)(h.ZP,{xs:3,item:!0,children:(0,w.jsx)(f.Z,{onChange:function(e){return N(e.target.value)},value:z,sx:{width:"100%"}})})]})]})},T=t(96758),_=t(78793),C=t(5913),A="jw",H="H",z="",N="",D=function(){var e=(0,u.useState)("1"),n=(0,a.Z)(e,2),t=n[0],c=n[1],j=(0,u.useState)("1 1"),p=(0,a.Z)(j,2),$=p[0],f=p[1],P=(0,u.useState)(null),v=(0,a.Z)(P,2),b=v[0],S=v[1],D=(0,u.useState)(0),R=(0,a.Z)(D,2),I=R[0],K=R[1],E=(0,u.useState)(10),q=(0,a.Z)(E,2),B=q[0],F=q[1],X=(0,u.useState)([]),V=(0,a.Z)(X,2),L=V[0],M=V[1],G=(0,u.useState)({phase:[],amplitude:[],degreePhase:[]}),J=(0,a.Z)(G,2),O=J[0],Q=J[1],U=(0,u.useState)(null),W=(0,a.Z)(U,2),Y=W[0],ee=W[1],ne=(0,u.useState)(1),te=(0,a.Z)(ne,2),re=te[0],se=te[1],ie=(0,u.useState)(!1),ae=(0,a.Z)(ie,2),ce=ae[0],le=ae[1],oe=(0,u.useState)(!1),de=(0,a.Z)(oe,2),ue=de[0],xe=de[1],he=(0,u.useState)(!0),me=(0,a.Z)(he,2),Ze=me[0],ge=me[1],je=(0,u.useState)(1e3),pe=(0,a.Z)(je,2),$e=pe[0],fe=pe[1],Pe=(0,u.useState)(1),ye=(0,a.Z)(Pe,2),ve=ye[0],we=ye[1],be=function(){var e=(0,i.Z)(L);-1===e.findIndex((function(e){return b.equals(e.H)}))&&(e.push({H_s:b,thickness:re,legend:H+"_{"+(L.length+1).toString()+"}"}),M(e),le(!0))};(0,u.useEffect)((function(){b&&(0,s.Z)(l().mark((function e(){var n,t,s,i,a,c;return l().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:e.prev=0,ee("$$"+b.label("H")+"$$"),n=!1,t={amplitude:Array(L.length),phase:Array(L.length),degreePhase:Array(L.length)},s=0;case 5:if(!(s<L.length)){e.next=17;break}if(s%5!==0){e.next=9;break}return e.next=9,(0,C.Ml)();case 9:t.amplitude[s]=d.ZP.systemToTrace(L[s].H_s.bode,+I,+B,L[s].thickness,L[s].legend,ue,+$e),t.phase[s]=d.ZP.systemToTrace(L[s].H_s.phase,+I,+B,L[s].thickness,L[s].legend,ue,+$e),t.degreePhase[s]=(0,r.Z)({},t.phase[s]),t.degreePhase[s].y=t.degreePhase[s].y.map((function(e){return e*d.ZP.RadianToDegree})),b.equals(L[s].H_s)&&(n=!0);case 14:s++,e.next=5;break;case 17:n||(i=d.ZP.systemToTrace(b.bode,+I,+B,re,"".concat(H,"(").concat(A,")"),ue,+$e),a=d.ZP.systemToTrace(b.phase,+I,+B,re,"".concat(H,"(").concat(A,")"),ue,+$e),(c=(0,r.Z)({},a)).y=c.y.map((function(e){return e*d.ZP.RadianToDegree})),t.phase.push(a),t.degreePhase.push(c),t.amplitude.push(i)),Q(t),e.next=24;break;case 21:e.prev=21,e.t0=e.catch(0),console.log(e.t0);case 24:case"end":return e.stop()}}),e,null,[[0,21]])})))()}),[b,L,I,B,ue,re,$e]);(0,u.useEffect)((function(){try{if(t.trim()!==z||$.trim()!==N){var e=d.ZP.stringToArray(t),n=d.ZP.stringToArray($),r=new T.Z(e,n);z=t,N=$,S(r),we(1)}}catch(s){console.log(s)}}),[t,$]),(0,u.useEffect)((function(){le(!1)}),[t,$]);return(0,w.jsxs)(_.Z,{children:[(0,w.jsx)(h.ZP,{item:!0,spacing:y.dv,children:(0,w.jsx)(m.Z,{children:(0,w.jsx)("h2",{className:"chapter-section-title",children:"\u0646\u0645\u0648\u062f\u0627\u0631 \u0628\u0648\u062f"})})}),(0,w.jsx)(h.ZP,{item:!0,spacing:y.dv,children:(0,w.jsxs)(h.ZP,{container:!0,direction:"column",spacing:1,children:[(0,w.jsx)(h.ZP,{sx:{margin:"auto",width:"100%"},item:!0,children:(0,w.jsx)(o.Z,{sx:{direction:"ltr"},children:(0,w.jsxs)(h.ZP,{id:"formulaBox",sx:{margin:"auto"},container:!0,direction:"row",children:[L.map((function(e,n){var t="$$"+e.H_s.label("H",n+1)+"$$";return(0,w.jsx)(h.ZP,{style:{fontSize:"18px"},md:6,sm:12,item:!0,children:(0,w.jsx)(g.Z,{children:t})})})),!ce&&(0,w.jsx)(h.ZP,{style:{fontSize:"18px"},md:6,sm:12,children:(0,w.jsx)(g.Z,{children:Y})})]})})}),(0,w.jsxs)(h.ZP,{spacing:2,style:{width:"100%",height:"100%",margin:"auto",direction:"ltr"},container:!0,children:[(0,w.jsx)(h.ZP,{md:3,sm:12,xs:12,sx:{marginTop:"1%",width:"100%"},container:!0,children:(0,w.jsx)(h.ZP,{xs:12,children:(0,w.jsx)(k,{rawNumerator:t,rawDenominator:$,$rawNumerator:c,$rawDenominator:f,w_min:I,w_max:B,$w_min:K,$w_max:F,phaseInRadianScale:Ze,setPhaseInRadianScale:ge,N:$e,$N:fe,K:ve,$K:we,multiplier:function(e){var n=L.length,t=b.multiply(e),r=L.filter((function(e){return!e.H_s.equals(t)}));r.length===n?be():M(r),S(t)}})})}),(0,w.jsxs)(h.ZP,{md:9,sm:12,xs:12,item:!0,children:[(0,w.jsx)(o.Z,{children:(0,w.jsx)(x.Z,{capture:be,reset:function(){return M([])},update:function(e){return function(e){e&&se(e.thickness)}(e)},toggle3DPlot:function(){return xe(!ue)}})}),(0,w.jsx)("hr",{}),(0,w.jsx)(h.ZP,{lg:12,md:12,sm:12,xs:12,item:!0,children:(0,w.jsxs)(o.Z,{children:[(0,w.jsx)(h.ZP,{lg:9,md:9,sm:12,xs:12,item:!0,children:(0,w.jsx)(Z.Z,{logX:!0,title:"\u0646\u0645\u0648\u062f\u0627\u0631 \u0628\u0648\u062f",traces:1!==ve?[].concat((0,i.Z)(O.amplitude),[function(){var e=b.multiply(ve);return d.ZP.systemToTrace(e.bode,+I,+B,re,"K=".concat(ve),ue,+$e)}()]):O.amplitude})}),(0,w.jsx)(h.ZP,{lg:9,md:9,sm:12,xs:12,item:!0,children:(0,w.jsx)(Z.Z,{title:"\u0641\u0627\u0632",logX:!0,traces:Ze?O.phase:O.degreePhase})})]})})]})]})]})})]})}}}]);
//# sourceMappingURL=883.b07b271f.chunk.js.map
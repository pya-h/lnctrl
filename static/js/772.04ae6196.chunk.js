"use strict";(self.webpackChunklnctrl=self.webpackChunklnctrl||[]).push([[772],{94447:function(e,n,t){t(72791);var i=t(68286),r=t(80184);n.Z=function(e){var n=e.traces,t=e.title,a=(e.width,e.height),s=void 0===a?500:a,c=e.logX;return(0,r.jsx)(i.Z,{style:{textAlign:"center"},data:n,layout:{margin:{t:30,l:30,r:20,b:30},xaxis:{rangemode:"tozero",zeroline:!0,type:c?"log":"dec"},yaxis:{rangemode:"tozero",zeroline:!0},height:s,title:t,hoverlabel:{align:"auto",boxmode:"overlay",font:{color:"#000000FF"}},legend:{orientation:"h"}}})}},52378:function(e,n,t){var i=t(70885),r=t(16346),a=t(91720),s=t(27247),c=t(85029),l=t(63787),o=t(61889),d=t(13400),h=t(53767),u=t(82550),x=t(64802),m=t(72791),g=t(25498),Z=t.n(g),p=t(24250),j=t(37185),f=t(80184);n.Z=function(e){var n=e.capture,t=e.graphFileName,g=e.formulaFileName,$=e.reset,P=e.update,v=e.toggle3DPlot,y=(0,m.useState)(!1),w=(0,i.Z)(y,2),S=w[0],k=w[1],_=(0,m.useState)(20),C=(0,i.Z)(_,2),b=C[0],N=C[1];return(0,m.useEffect)((function(){P({thickness:b/20+.1})}),[b,P]),(0,f.jsxs)(o.ZP,{sx:{direction:"rtl"},container:!0,direction:"row",children:[(0,f.jsxs)(o.ZP,{md:10,sm:8,xs:6,sx:{direction:"rtl"},item:!0,children:[v&&(0,f.jsx)(d.Z,{color:"secondary","aria-label":"capture graph",component:"span",onClick:function(){k(!S),v()},children:S?(0,f.jsx)(j.Z,{}):(0,f.jsx)(p.Z,{})})," ",(0,f.jsx)(d.Z,{color:"secondary","aria-label":"capture graph",component:"span",onClick:n,children:(0,f.jsx)(a.Z,{})}),(0,f.jsx)(d.Z,{color:"secondary","aria-label":"download graph",component:"span",onClick:function(){var e=document.getElementById("graphBox"),n=document.createElement("canvas");n.width=e.width,n.height=e.height;var i=n.getContext("2d");i.fillStyle="white",i.fillRect(0,0,e.width,e.height),i.drawImage(e,0,0),n.toBlob((function(e){(0,x.saveAs)(e,t)})),Z()(document.getElementById("formulaBox")).then((function(e){e.toBlob((function(e){(0,x.saveAs)(e,g)}))}))},children:(0,f.jsx)(r.Z,{})}),(0,f.jsx)(d.Z,{color:"secondary","aria-label":"capture graph",component:"span",onClick:$,children:(0,f.jsx)(s.Z,{})})]}),(0,f.jsx)(o.ZP,{md:2,sm:4,xs:6,item:!0,children:(0,f.jsxs)(h.Z,{spacing:2,direction:"row",sx:{mt:.5,direction:"ltr"},alignItems:"center",children:[(0,f.jsx)(c.Z,{}),(0,f.jsx)(u.ZP,{"aria-label":"Volume",value:b,onChange:function(e,n){return N(n)}}),(0,f.jsx)(l.Z,{})]})})]})}},93554:function(e,n,t){var i=t(61889),r=t(54905),a=t(63466),s=t(65773),c=(t(3174),t(72791)),l=t(80184);n.Z=function(e){var n=e.parameters,t=e.setters,o=e.labels,d=e.units;return(0,l.jsx)(c.Fragment,{children:n instanceof Array&&n.map((function(e,n){return(0,l.jsx)(i.ZP,{md:12,sm:4,xs:6,item:!0,children:(0,l.jsx)(r.Z,{onChange:function(e){return t[n](e.target.value)},value:e,sx:{width:"100%"},InputProps:{startAdornment:(0,l.jsx)(a.Z,{position:"left",children:(0,l.jsx)(s.Z,{children:o[n]})}),endAdornment:d[n]&&(0,l.jsx)(a.Z,{position:"right",children:(0,l.jsx)(s.Z,{children:d[n]})})}})})}))})}},85772:function(e,n,t){t.r(n),t.d(n,{default:function(){return b}});var i=t(1413),r=t(42982),a=t(70885),s=t(71598),c=t(61889),l=(t(59416),t(65773)),o=t(83962),d=t(80184),h=function(){return(0,d.jsxs)(s.Z,{title:"\u062a\u0627\u0628\u0639 \u062a\u0628\u062f\u06cc\u0644 \u0645\u0631\u062a\u0628\u0647 \u06cc\u06a9",darkBorder:!0,sx:{direction:"rtl"},children:[(0,d.jsx)(c.ZP,{className:"lecture-text",item:!0,children:(0,d.jsx)("p",{children:"\xa0 \xa0 \xa0 \xa0 \u0627\u06cc\u0646 \u062a\u0648\u0627\u0628\u0639 \u062a\u0628\u062f\u06cc\u0644 \u0628\u0647 \u0641\u0631\u0645 \u0632\u06cc\u0631 \u0645\u06cc \u0628\u0627\u0634\u0646\u062f:"})}),(0,d.jsx)(c.ZP,{item:!0,children:(0,d.jsx)(l.Z,{children:"$$G(s) = \\frac{k}{s + a}$$"})}),(0,d.jsxs)(c.ZP,{className:"lecture-text",item:!0,children:[(0,d.jsx)("h1",{style:{marginTop:"5%",marginBottom:"3%"},children:"\xa0\u067e\u0627\u0633\u062e \u062d\u0627\u0644\u062a \u0645\u0627\u0646\u062f\u06af\u0627\u0631"}),(0,d.jsx)("p",{children:"\xa0 \xa0 \xa0 \xa0 \u062f\u06cc\u0627\u06af\u0631\u0627\u0645 \u06cc\u06a9 \u0633\u06cc\u0633\u062a\u0645 LTI \u0633\u0627\u062f\u0647 \u0628\u0635\u0648\u0631\u062a \u0632\u06cc\u0631 \u0645\u06cc \u0628\u0627\u0634\u062f:"})]}),(0,d.jsx)(c.ZP,{item:!0,children:(0,d.jsx)("img",{className:"lecture-image",src:o,alt:"\u0628\u0627\u0631\u06af\u0630\u0627\u0631\u06cc \u062a\u0635\u0648\u06cc\u0631 \u0628\u0627 \u0645\u0634\u06a9\u0644 \u0645\u0648\u0627\u062c\u0647 \u0634\u062f"})})]})},u=t(3174),x=t(72791),m=t(52378),g=t(94447),Z=t(36151),p=t(93554),j=t(91923),f=["$$R = $$","$$C = $$","$$\\omega_{min} = $$","$$\\omega_{max} = $$","$$N = $$"],$=["$$k\\Omega$$","$$\\mu F$$","$$Hz$$","$$Hz$$",null],P=function(e){var n=e.R,t=e.C,i=e.$R,r=e.$C,a=e.w_min,l=e.w_max,o=e.$w_min,h=e.$w_max,u=e.phaseInRadianScale,x=e.setPhaseInRadianScale,m=e.N,g=e.$N;return(0,d.jsx)(s.Z,{darkBorder:!0,title:"\u067e\u0627\u0631\u0627\u0645\u062a\u0631\u0647\u0627",sx:{direction:"ltr",textAlign:"right",height:"100%"},children:(0,d.jsxs)(c.ZP,{spacing:j.dv,container:!0,direction:"row",children:[(0,d.jsx)(p.Z,{parameters:[n,t,a,l,m],setters:[i,r,o,h,g],labels:f,units:$}),(0,d.jsxs)(c.ZP,{xs:12,style:{paddingLeft:"3%"},container:!0,children:[(0,d.jsx)(c.ZP,{xs:6,sx:{p:1},item:!0,children:(0,d.jsx)(Z.Z,{onClick:function(){return x(!1)},style:{width:"100%",textTransform:"none"},variant:u?"outlined":"contained",children:"\u062f\u0631\u062c\u0647"})}),(0,d.jsx)(c.ZP,{xs:6,sx:{p:1},item:!0,children:(0,d.jsx)(Z.Z,{onClick:function(){return x("rad")},style:{width:"100%",textTransform:"none"},variant:u?"contained":"outlined",children:"\u0631\u0627\u062f\u06cc\u0627\u0646"})})]})]})})},v=t(64715),y=t(78793),w="jw",S="H",k=180/Math.PI,_=function(e,n,t,i,r){var a=arguments.length>5&&void 0!==arguments[5]?arguments[5]:"lines";return{x:e,y:n,z:r?Array(e.length).fill(0):null,line:{width:t},type:"scatter"+(r?"3d":""),mode:a,name:"$$".concat(i,"$$")}},C=function(e,n,t,i,r,s){var c=arguments.length>6&&void 0!==arguments[6]?arguments[6]:1e3,l=u.ZP.pointify(e,n,t,c),o=(0,a.Z)(l,2),d=o[0],h=o[1];return _(d,h,i,r,s)},b=function(){var e=(0,x.useState)(.001),n=(0,a.Z)(e,2),t=n[0],o=n[1],u=(0,x.useState)(1),Z=(0,a.Z)(u,2),p=Z[0],f=Z[1],$=(0,x.useState)(null),_=(0,a.Z)($,2),b=_[0],N=_[1],R=(0,x.useState)(-5),I=(0,a.Z)(R,2),A=I[0],B=I[1],H=(0,x.useState)(5),z=(0,a.Z)(H,2),F=z[0],E=z[1],T=(0,x.useState)([]),L=(0,a.Z)(T,2),q=L[0],D=L[1],G=(0,x.useState)({phase:[],amplitude:[],degreePhase:[]}),M=(0,a.Z)(G,2),O=M[0],V=M[1],W=(0,x.useState)(null),X=(0,a.Z)(W,2),J=X[0],K=X[1],Q=(0,x.useState)(1),U=(0,a.Z)(Q,2),Y=U[0],ee=U[1],ne=(0,x.useState)(!1),te=(0,a.Z)(ne,2),ie=te[0],re=te[1],ae=(0,x.useState)(!1),se=(0,a.Z)(ae,2),ce=se[0],le=se[1],oe=(0,x.useState)(!0),de=(0,a.Z)(oe,2),he=de[0],ue=de[1],xe=(0,x.useState)(1e3),me=(0,a.Z)(xe,2),ge=me[0],Ze=me[1];(0,x.useEffect)((function(){try{var e=new v.Z([1],[+t*+p*1e4,1]);N(e),K("$$"+e.label("H")+"$$");for(var n=!1,r={amplitude:Array(q.length),phase:Array(q.length),degreePhase:Array(q.length)},a=0;a<q.length;a++)r.amplitude[a]=C(q[a].H_s.amplitude,+A,+F,q[a].thickness,q[a].legend,ce,+ge),r.phase[a]=C(q[a].H_s.phase,+A,+F,q[a].thickness,q[a].legend,ce,+ge),r.degreePhase[a]=(0,i.Z)({},r.phase[a]),r.degreePhase[a].y=r.degreePhase[a].y.map((function(e){return e*k})),e.equals(q[a].H_s)&&(n=!0);if(!n){var s=C(e.amplitude,+A,+F,Y,"".concat(S,"(").concat(w,")"),ce,+ge),c=C(e.phase,+A,+F,Y,"".concat(S,"(").concat(w,")"),ce,+ge),l=(0,i.Z)({},c);l.y=l.y.map((function(e){return e*k})),r.phase.push(c),r.degreePhase.push(l),r.amplitude.push(s)}V(r)}catch(o){console.log(o)}}),[t,p,A,F,ce,Y,q,ge]),(0,x.useEffect)((function(){re(!1)}),[t,p]);return(0,d.jsxs)(y.Z,{children:[(0,d.jsx)(c.ZP,{item:!0,spacing:j.dv,children:(0,d.jsx)("h2",{className:"chapter-section-title",children:"\u067e\u0627\u0633\u062e \u0641\u0631\u06a9\u0627\u0646\u0633\u06cc \u0641\u06cc\u0644\u062a\u0631 RC"})}),(0,d.jsx)(c.ZP,{item:!0,spacing:j.dv,children:(0,d.jsxs)(c.ZP,{container:!0,direction:"column",spacing:1,children:[(0,d.jsx)(c.ZP,{style:{width:"100%",height:"100%",margin:"auto",direction:"ltr"},item:!0,children:(0,d.jsx)(h,{})}),(0,d.jsx)(c.ZP,{sx:{margin:"auto",width:"100%"},item:!0,children:(0,d.jsx)(s.Z,{sx:{direction:"ltr"},children:(0,d.jsxs)(c.ZP,{id:"formulaBox",sx:{margin:"auto"},container:!0,direction:"row",children:[q.map((function(e,n){var t="$$"+e.H_s.label("H",n+1)+"$$";return(0,d.jsx)(c.ZP,{style:{fontSize:"18px"},md:6,sm:12,item:!0,children:(0,d.jsx)(l.Z,{children:t})})})),!ie&&(0,d.jsx)(c.ZP,{style:{fontSize:"18px"},md:6,sm:12,children:(0,d.jsx)(l.Z,{children:J})})]})})}),(0,d.jsxs)(c.ZP,{spacing:2,style:{width:"100%",height:"100%",margin:"auto",direction:"ltr"},container:!0,children:[(0,d.jsx)(c.ZP,{md:3,sm:12,xs:12,sx:{marginTop:"1%",width:"100%"},container:!0,children:(0,d.jsx)(c.ZP,{xs:12,children:(0,d.jsx)(P,{C:p,R:t,$C:function(e){e>=0&&f(e)},$R:function(e){e>=0&&o(e)},w_min:A,w_max:F,$w_min:B,$w_max:E,phaseInRadianScale:he,setPhaseInRadianScale:ue,N:ge,$N:Ze})})}),(0,d.jsxs)(c.ZP,{md:9,sm:12,xs:12,item:!0,children:[(0,d.jsx)(s.Z,{children:(0,d.jsx)(m.Z,{capture:function(){var e=(0,r.Z)(q);-1===e.findIndex((function(e){return e.R===+t&&e.C===+p}))&&(e.push({R:+t,C:+p,H_s:b,thickness:Y,legend:S+"_{"+(q.length+1).toString()}),D(e),re(!0))},formulaFileName:"Water Tank Level Equations _ "+(0,r.Z)(q.map((function(e){return e.legend}))).join()+".png",graphFileName:(0,r.Z)(q.map((function(e){return"".concat(e.legend,"{alpha=").concat(e.a,"_k=").concat(e.k,"_in=").concat(e.inputSignal?"ramp":"step","}")}))).join(", ")+".png",reset:function(){return D([])},update:function(e){return function(e){e&&ee(e.thickness)}(e)},toggle3DPlot:function(){return le(!ce)}})}),(0,d.jsx)("hr",{}),(0,d.jsx)(c.ZP,{lg:12,md:12,sm:12,xs:12,item:!0,children:(0,d.jsx)(s.Z,{children:(0,d.jsxs)(c.ZP,{spacing:j.dv,direction:"row",container:!0,children:[(0,d.jsx)(c.ZP,{lg:9,md:9,sm:12,xs:12,item:!0,children:(0,d.jsx)(g.Z,{title:"\u0627\u0646\u062f\u0627\u0632\u0647",traces:O.amplitude})}),(0,d.jsx)(c.ZP,{lg:9,md:9,sm:12,xs:12,item:!0,children:(0,d.jsx)(g.Z,{title:"\u0641\u0627\u0632",traces:he?O.phase:O.degreePhase})})]})})})]})]})]})})]})}},59416:function(){},83962:function(e,n,t){e.exports=t.p+"static/media/rc_filter_circuit.293b9d9ec97dfe9e1e14.png"}}]);
//# sourceMappingURL=772.04ae6196.chunk.js.map
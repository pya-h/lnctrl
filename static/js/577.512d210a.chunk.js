"use strict";(self.webpackChunklnctrl=self.webpackChunklnctrl||[]).push([[577],{52378:function(t,e,n){var i=n(70885),s=n(16346),r=n(91720),c=n(27247),l=n(85029),o=n(63787),a=n(61889),u=n(13400),d=n(53767),x=n(82550),m=n(64802),f=n(72791),h=n(25498),Z=n.n(h),p=n(24250),j=n(37185),$=n(80184);e.Z=function(t){var e=t.capture,n=t.graphFileName,h=t.formulaFileName,g=t.reset,P=t.update,y=t.toggle3DPlot,S=(0,f.useState)(!1),v=(0,i.Z)(S,2),k=v[0],_=v[1],b=(0,f.useState)(20),w=(0,i.Z)(b,2),N=w[0],E=w[1];return(0,f.useEffect)((function(){P({thickness:N/20+.1})}),[N,P]),(0,$.jsxs)(a.ZP,{sx:{direction:"rtl"},container:!0,direction:"row",children:[(0,$.jsxs)(a.ZP,{md:10,sm:8,xs:6,sx:{direction:"rtl"},item:!0,children:[y&&(0,$.jsx)(u.Z,{color:"secondary","aria-label":"capture graph",component:"span",onClick:function(){_(!k),y()},children:k?(0,$.jsx)(j.Z,{}):(0,$.jsx)(p.Z,{})})," ",(0,$.jsx)(u.Z,{color:"secondary","aria-label":"capture graph",component:"span",onClick:e,children:(0,$.jsx)(r.Z,{})}),(0,$.jsx)(u.Z,{color:"secondary","aria-label":"download graph",component:"span",onClick:function(){var t=document.getElementById("graphBox"),e=document.createElement("canvas");e.width=t.width,e.height=t.height;var i=e.getContext("2d");i.fillStyle="white",i.fillRect(0,0,t.width,t.height),i.drawImage(t,0,0),e.toBlob((function(t){(0,m.saveAs)(t,n)})),Z()(document.getElementById("formulaBox")).then((function(t){t.toBlob((function(t){(0,m.saveAs)(t,h)}))}))},children:(0,$.jsx)(s.Z,{})}),(0,$.jsx)(u.Z,{color:"secondary","aria-label":"capture graph",component:"span",onClick:g,children:(0,$.jsx)(c.Z,{})})]}),(0,$.jsx)(a.ZP,{md:2,sm:4,xs:6,item:!0,children:(0,$.jsxs)(d.Z,{spacing:2,direction:"row",sx:{mt:.5,direction:"ltr"},alignItems:"center",children:[(0,$.jsx)(l.Z,{}),(0,$.jsx)(x.ZP,{"aria-label":"Volume",value:N,onChange:function(t,e){return E(e)}}),(0,$.jsx)(o.Z,{})]})})]})}},65599:function(t,e,n){var i=n(1413),s=n(70885),r=n(72791),c=(n(54367),n(30830)),l=n(77021),o=n(61889),a=n(54905),u=n(63466),d=n(65773),x=n(80184),m=function(t,e){var n=(0,r.useRef)();(0,r.useEffect)((function(){n.current=t}),[t]),(0,r.useEffect)((function(){if(null!==e){var t=setInterval((function(){n.current()}),e);return function(){return clearInterval(t)}}}),[e])},f=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:5;return e>=5?t*(.2/7+(e-5)/((e+1)*(e+5))):-t/10/(1+3.5*e)+.2*t/7},h=function(t){var e=t.elementDimensions,n=t.position,i=t.isPositionOutside,l=t.point,o=void 0===l?{x:0,y:0,select:function(){}}:l,a=t.extra,u=t.options,d=void 0===u?{pointSize:7,grids:6,pointColor:null}:u,h=t.scale,Z=void 0===h?1:h,p=t.viewpoint,j=(0,r.useState)(0),$=(0,s.Z)(j,2),g=$[0],P=$[1],y=(0,r.useState)(0),S=(0,s.Z)(y,2),v=S[0],k=S[1],_=(0,r.useState)(5),b=(0,s.Z)(_,2),w=b[0],N=b[1],E=(0,r.useState)(7),z=(0,s.Z)(E,2),C=z[0],I=z[1],B=function(t){if(!i){var s=e.width/2,r=(e.height-38)/2,l=c.ZP.round((n.x-s)/s),o=c.ZP.round((r-n.y)/r),a=l*Z*w,u=o*Z*w;P(a),k(u),p(a,u)}},M=(0,r.useCallback)((function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,i=document.getElementById("#point".concat(n));i.style.setProperty("--x",t),i.style.setProperty("--y",e-f(C,w))}),[C,w]),T=function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];t?a&&a.select&&a.select({x:g,y:v}):o&&o.select&&o.select({x:g,y:v}),p(g,v)},F=(0,r.useState)(!1),A=(0,s.Z)(F,2),G=A[0],L=A[1];m(T,G?10:null);var R=(0,r.useState)(!1),D=(0,s.Z)(R,2),U=D[0],q=D[1];return m((function(){return T(!0)}),U?10:null),(0,r.useEffect)((function(){if(o&&0!==Z){var t=Number(o.x),e=Number(o.y),n=c.ZP.round(t/(w*Z)),i=c.ZP.round(e/(w*Z));M(n*w,i*w,0)}}),[o,Z,w,M]),(0,r.useEffect)((function(){if(a&&0!==Z){var t=Number(a.x),e=Number(a.y),n=c.ZP.round(t/(w*Z)),i=c.ZP.round(e/(w*Z));M(n*w,i*w,1)}}),[a,Z,w,M]),(0,r.useEffect)((function(){L(!1),q(!1)}),[Z]),(0,r.useEffect)((function(){d.pointSize&&d.pointSize>=0&&I(d.pointSize),d.grids&&d.grids>=0&&N(d.grids)}),[d]),(0,r.useEffect)((function(){w>=0&&w>=0&&(document.documentElement.style.setProperty("--grids-x",w),document.documentElement.style.setProperty("--grids-y",w),document.documentElement.style.setProperty("--grids-total",2*w))}),[w]),(0,r.useEffect)((function(){C>=0&&document.documentElement.style.setProperty("--point-size",C)}),[C]),(0,x.jsxs)("div",{id:"#box",onMouseEnter:function(t){return B()},onMouseLeave:function(t){return B()},onMouseMove:function(t){return B()},onMouseUp:function(){L(!1),q(!1)},className:"coordinate-box",children:[(0,x.jsx)("div",{id:"#point0",onMouseDown:function(){return L(!0)},onMouseUp:function(){return L(!1)},className:"coordinate-point"}),a&&(0,x.jsx)("div",{id:"#point1",onMouseDown:function(){return q(!0)},onMouseUp:function(){return q(!1)},className:"coordinate-point extra-point-color"})]})},Z=function(t,e){return t>e||t<-e||e-Math.abs(t)<1};e.Z=function(t){var e=(0,r.useState)(0),n=(0,s.Z)(e,2),m=n[0],f=n[1],p=(0,r.useState)(0),j=(0,s.Z)(p,2),$=j[0],g=j[1],P=t.options,y=t.point,S=t.extra,v=P||{grids:6,defaultScale:1},k=v.grids,_=v.defaultScale,b=(0,r.useState)(_||1),w=(0,s.Z)(b,2),N=w[0],E=w[1];return(0,r.useEffect)((function(){var t=k?Math.abs(N*k):Math.abs(6*N);t>0&&(Z(y.x,t)||Z(y.y,t)||S&&(Z(S.x,t)||Z(S.y,t)))&&E(N+1)}),[y,S,N,k]),(0,x.jsxs)(o.ZP,{container:!0,children:[(0,x.jsx)(o.ZP,{xs:12,item:!0,children:(0,x.jsx)(l.Z,{children:(0,x.jsx)(h,(0,i.Z)((0,i.Z)({},t),{},{viewpoint:function(t,e){f(t),g(e)},scale:N}))})}),(0,x.jsx)(o.ZP,{xs:12,children:(0,x.jsx)("p",{style:{textAlign:"center"},children:"("+c.ZP.strictPrecisionFormat(m)+", "+c.ZP.strictPrecisionFormat($)+")"})}),(0,x.jsx)(o.ZP,{xs:12,item:!0,children:(0,x.jsx)(a.Z,{variant:"outlined",value:N,sx:{width:"100%"},onChange:function(t){return E(t.target.value)},InputProps:{startAdornment:(0,x.jsx)(u.Z,{position:"left",children:(0,x.jsx)(d.Z,{children:"$$\\times$$"})}),endAdornment:(0,x.jsx)(u.Z,{position:"left",children:"\u0645\u0642\u06cc\u0627\u0633"})}})})]})}},8577:function(t,e,n){n.r(e),n.d(e,{default:function(){return N}});var i=n(42982),s=n(70885),r=n(71598),c=n(61889),l=n(68383),o=(n(59416),n(65773)),a=n(80184),u=function(){return(0,a.jsxs)(r.Z,{title:"\u062a\u0627\u0628\u0639 \u062a\u0628\u062f\u06cc\u0644 \u0645\u0631\u062a\u0628\u0647 \u06cc\u06a9",darkBorder:!0,sx:{direction:"rtl"},children:[(0,a.jsx)(c.ZP,{className:"lecture-text",item:!0,children:(0,a.jsx)("p",{children:"\xa0 \xa0 \xa0 \xa0 \u0627\u06cc\u0646 \u062a\u0648\u0627\u0628\u0639 \u062a\u0628\u062f\u06cc\u0644 \u0628\u0647 \u0641\u0631\u0645 \u0632\u06cc\u0631 \u0645\u06cc \u0628\u0627\u0634\u0646\u062f:"})}),(0,a.jsx)(c.ZP,{item:!0,children:(0,a.jsx)(o.Z,{children:"$$G(s) = \\frac{k}{s + a}$$"})}),(0,a.jsxs)(c.ZP,{className:"lecture-text",item:!0,children:[(0,a.jsx)("h1",{style:{marginTop:"5%",marginBottom:"3%"},children:"\xa0\u067e\u0627\u0633\u062e \u062d\u0627\u0644\u062a \u0645\u0627\u0646\u062f\u06af\u0627\u0631"}),(0,a.jsx)("p",{children:"\xa0 \xa0 \xa0 \xa0 \u062f\u06cc\u0627\u06af\u0631\u0627\u0645 \u06cc\u06a9 \u0633\u06cc\u0633\u062a\u0645 LTI \u0633\u0627\u062f\u0647 \u0628\u0635\u0648\u0631\u062a \u0632\u06cc\u0631 \u0645\u06cc \u0628\u0627\u0634\u062f:"})]}),(0,a.jsx)(c.ZP,{item:!0,children:(0,a.jsx)("img",{className:"lecture-image",src:l,alt:"\u0628\u0627\u0631\u06af\u0630\u0627\u0631\u06cc \u062a\u0635\u0648\u06cc\u0631 \u0628\u0627 \u0645\u0634\u06a9\u0644 \u0645\u0648\u0627\u062c\u0647 \u0634\u062f"})}),(0,a.jsx)(c.ZP,{style:{fontSize:"20px"},item:!0,children:(0,a.jsx)(o.Z,{children:"$$c(t) = c_{tr}(t) + c_{ss}(t)$$"})}),(0,a.jsx)(c.ZP,{style:{fontSize:"20px"},item:!0,children:(0,a.jsx)(o.Z,{children:"$$\\begin{cases} \\lim\\limits_{t \\to \\infty}c_{tr}(t) = 0 \\\\ \\lim\\limits_{t \\to \\infty}c_{ss}(t) = c_{ss} \\end{cases} \\rightarrow c_{ss} = \\lim\\limits_{t \\to \\infty}c(t)$$"})}),(0,a.jsx)(c.ZP,{className:"lecture-text",item:!0,children:(0,a.jsx)("p",{children:"\xa0 \xa0 \xa0 \xa0 \u0646\u06a9\u062a\u0647:\u200c\u0637\u0628\u0642 \u0642\u0636\u06cc\u0647 \u0645\u0642\u062f\u0627\u0631 \u0646\u0647\u0627\u06cc\u06cc \u062f\u0627\u0631\u06cc\u0645:"})}),(0,a.jsx)(c.ZP,{style:{fontSize:"20px"},item:!0,children:(0,a.jsx)(o.Z,{children:"$$c_{ss} = \\lim\\limits_{t \\to \\infty}c_{ss}(t) = \\lim\\limits_{s \\to 0}sC(s)$$"})}),(0,a.jsx)(c.ZP,{sx:{mt:1},item:!0,children:(0,a.jsxs)(r.Z,{children:[(0,a.jsxs)(c.ZP,{className:"lecture-text",item:!0,children:[(0,a.jsx)("h1",{style:{marginTop:"5%",marginBottom:"3%"},children:"\xa0 \u067e\u0627\u0633\u062e \u067e\u0644\u0647 \u0648\u0627\u062d\u062f"}),(0,a.jsx)("p",{children:"\xa0 \xa0 \xa0 \xa0 \u062d\u0627\u0644 \u067e\u0627\u0633\u062e \u062d\u0627\u0644\u062a \u0645\u0627\u0646\u062f\u06af\u0627\u0631 \u0628\u0647 \u0648\u0631\u0648\u062f\u06cc \u067e\u0644\u0647 \u0648\u0627\u062d\u062f \u0631\u0627 \u0628\u0631\u0627\u06cc \u0633\u06cc\u0633\u062a\u0645 \u0645\u0630\u06a9\u0648\u0631 \u0631\u0627 \u0645\u062d\u0627\u0633\u0628\u0647 \u0645\u06cc \u06a9\u0646\u06cc\u0645:"})]}),(0,a.jsx)(c.ZP,{style:{fontSize:"20px"},item:!0,children:(0,a.jsx)(o.Z,{children:"$$r(t) = u(t) \\rightarrow R(s) = \\frac{1}{s}$$"})}),(0,a.jsx)(c.ZP,{style:{fontSize:"20px"},item:!0,children:(0,a.jsx)(o.Z,{children:"$$C(s) = G(s)R(s) = \\frac{k}{s(s + 1)}$$"})}),(0,a.jsx)(c.ZP,{style:{fontSize:"20px"},item:!0,children:(0,a.jsx)(o.Z,{children:"$$c(t) = (\\frac{k}{a} - \\frac{k}{a}e^{-at})u(t)$$"})}),(0,a.jsx)(c.ZP,{className:"lecture-text",item:!0,children:(0,a.jsx)("p",{children:"\xa0 \xa0 \xa0 \xa0 \u062f\u0631 \u0646\u062a\u06cc\u062c\u0647 \u0645\u0642\u062f\u0627\u0631 \u062d\u0627\u0644\u062a \u0645\u0627\u0646\u062f\u06af\u0627\u0631 \u0633\u06cc\u0633\u062a\u0645 \u0639\u0628\u0627\u0631\u062a \u0627\u0633\u062a \u0627\u0632:"})}),(0,a.jsx)(c.ZP,{style:{fontSize:"20px"},item:!0,children:(0,a.jsx)(o.Z,{children:"$$c_{ss} = \\lim\\limits_{s \\to 0}sC(s) = \\lim\\limits_{s \\to 0}\\frac{k}{s + a} = \\frac{k}{a}$$"})})]})}),(0,a.jsx)(c.ZP,{sx:{mt:1},item:!0,children:(0,a.jsxs)(r.Z,{children:[(0,a.jsxs)(c.ZP,{className:"lecture-text",item:!0,children:[(0,a.jsx)("h1",{style:{marginTop:"5%",marginBottom:"3%"},children:"\xa0 \u067e\u0627\u0633\u062e \u0634\u06cc\u0628 \u0648\u0627\u062d\u062f"}),(0,a.jsx)("p",{children:"\xa0 \xa0 \xa0 \xa0 \u062d\u0627\u0644 \u067e\u0627\u0633\u062e \u062d\u0627\u0644\u062a \u0645\u0627\u0646\u062f\u06af\u0627\u0631 \u0628\u0647 \u0648\u0631\u0648\u062f\u06cc \u0634\u06cc\u06cc\u0628 \u0648\u0627\u062d\u062f \u0631\u0627 \u0628\u0631\u0627\u06cc \u0633\u06cc\u0633\u062a\u0645 \u0645\u0630\u06a9\u0648\u0631 \u0631\u0627 \u0645\u062d\u0627\u0633\u0628\u0647 \u0645\u06cc \u06a9\u0646\u06cc\u0645:"})]}),(0,a.jsx)(c.ZP,{style:{fontSize:"20px"},item:!0,children:(0,a.jsx)(o.Z,{children:"$$r(t) = tu(t) \\rightarrow R(s) = \\frac{1}{s^2}$$"})}),(0,a.jsx)(c.ZP,{style:{fontSize:"20px"},item:!0,children:(0,a.jsx)(o.Z,{children:"$$C(s) = G(s)R(s) = \\frac{k}{s^2(s + 1)}$$"})}),(0,a.jsx)(c.ZP,{style:{fontSize:"20px"},item:!0,children:(0,a.jsx)(o.Z,{children:"$$c(t) = \\frac{k}{a}(t - \\frac{1}{a})u(t) + \\frac{k}{a^2}e^{-at}u(t)$$"})}),(0,a.jsx)(c.ZP,{className:"lecture-text",item:!0,children:(0,a.jsx)("p",{children:"\xa0 \xa0 \xa0 \xa0 \u062f\u0631 \u0646\u062a\u06cc\u062c\u0647 \u0645\u0642\u062f\u0627\u0631 \u062d\u0627\u0644\u062a \u0645\u0627\u0646\u062f\u06af\u0627\u0631 \u0633\u06cc\u0633\u062a\u0645 \u0639\u0628\u0627\u0631\u062a \u0627\u0633\u062a \u0627\u0632:"})}),(0,a.jsx)(c.ZP,{style:{fontSize:"20px"},item:!0,children:(0,a.jsx)(o.Z,{children:"$$c_{ss} = \\lim\\limits_{s \\to 0}sC(s) = \\lim\\limits_{s \\to 0}\\frac{k}{s(s + a)} = \\infty$$"})})]})})]})},d=n(30830),x=n(72791),m=n(52378),f=n(94447),h=n(36151),Z=n(65599),p=n(93554),j=n(91923),$=["$$a = $$","$$k = $$","$$t_i = $$","$$t_f = $$","$$N = $$"],g=[null,null,"$$sec$$","$$sec$$",null],P=function(t){var e=t.k,n=t.a,i=t.$k,s=t.$a,l=t.t_i,o=t.t_f,u=t.$t_i,d=t.$t_f,x=t.inputSignal,m=t.$inputSignal,f=t.N,P=t.$N;return(0,a.jsxs)(r.Z,{darkBorder:!0,title:"\u067e\u0627\u0631\u0627\u0645\u062a\u0631\u0647\u0627",sx:{direction:"ltr",textAlign:"right",height:"100%"},children:[(0,a.jsxs)(c.ZP,{xs:12,container:!0,children:[(0,a.jsx)(c.ZP,{xs:6,sx:{pr:1,pb:1},item:!0,children:(0,a.jsx)(h.Z,{onClick:function(){return m(0)},style:{width:"100%",textTransform:"none"},variant:0===x?"contained":"outlined",children:"\u067e\u0644\u0647"})}),(0,a.jsx)(c.ZP,{sx:{pb:1},xs:6,item:!0,children:(0,a.jsx)(h.Z,{onClick:function(){return m(1)},style:{width:"100%",textTransform:"none"},variant:1===x?"contained":"outlined",children:"\u0631\u0645\u067e"})})]}),(0,a.jsxs)(c.ZP,{spacing:j.dv,container:!0,direction:"row",children:[(0,a.jsx)(p.Z,{parameters:[n,e,l,o,f],setters:[s,i,u,d,P],labels:$,units:g}),(0,a.jsxs)(c.ZP,{sx:{mt:1},md:12,sm:4,xs:6,item:!0,children:[(0,a.jsx)("p",{style:{textAlign:"center"},children:"\u0645\u062d\u0644 \u0642\u0637\u0628 \u0631\u0627 \u0627\u0646\u062a\u062e\u0627\u0628 \u06a9\u0646\u06cc\u062f"}),(0,a.jsx)(Z.Z,{point:{x:-n,y:0,select:function(t){t&&s(-t.x)}},options:{pointSize:10,grids:10}})]})]})]})},y=n(64715),S=n(78793),v=function(t){return-1===t?"-":1===t?"":d.ZP.strictPrecisionFormat(t)},k=function(t){return t>0?" + "+d.ZP.strictPrecisionFormat(t):" - "+-1*d.ZP.strictPrecisionFormat(t)},_=function(t){var e="";return t<0?(e+="-",t*=-1):t>0&&(e+="+"),1!==t&&(e+=d.ZP.strictPrecisionFormat(t)),e},b="t",w="c",N=function(){var t=(0,x.useState)(1),e=(0,s.Z)(t,2),n=e[0],l=e[1],h=(0,x.useState)(1),Z=(0,s.Z)(h,2),p=Z[0],$=Z[1],g=(0,x.useState)(0),N=(0,s.Z)(g,2),E=N[0],z=N[1],C=(0,x.useState)(5),I=(0,s.Z)(C,2),B=I[0],M=I[1],T=(0,x.useState)(0),F=(0,s.Z)(T,2),A=F[0],G=F[1],L=(0,x.useState)([]),R=(0,s.Z)(L,2),D=R[0],U=R[1],q=(0,x.useState)([]),O=(0,s.Z)(q,2),V=O[0],W=O[1],H=(0,x.useState)(null),J=(0,s.Z)(H,2),K=J[0],Q=J[1],X=(0,x.useState)(1),Y=(0,s.Z)(X,2),tt=Y[0],et=Y[1],nt=(0,x.useState)(!1),it=(0,s.Z)(nt,2),st=it[0],rt=it[1],ct=(0,x.useState)(!1),lt=(0,s.Z)(ct,2),ot=lt[0],at=lt[1],ut=(0,x.useState)(1e3),dt=(0,s.Z)(ut,2),xt=dt[0],mt=dt[1];(0,x.useEffect)((function(){var t=null;A?(t=d.ZP.LTI.ramp(1,+p,+n),Q(function(t,e){return"$$\\begin{cases}G(s) = "+y.Z.Specials.$1(t,-e).toString()+(0!==e?" \\\\ \\\\ c(t) = "+v(t/e)+"(t"+k(-1/e)+")u(t)"+_(t/(e*e))+"e^{"+v(-e)+"t}u(t) ":"} \\\\ \\\\ c(t) = t^2u(t) ")+"\\end{cases}$$"}(+p,+n))):(t=d.ZP.LTI.step(1,+p,+n),Q(function(t,e){return"$$\\begin{cases}G(s) = "+y.Z.Specials.$1(t,-e).toString()+(0!==e?" \\\\ \\\\ c(t) = "+v(t/e)+"(1 - e^{"+v(-e)+"t})u(t) ":"} \\\\ \\\\ c(t) = tu(t) ")+"\\end{cases}$$"}(+p,+n)));var e=d.ZP.pointify(t,+E,+B,+xt),i=(0,s.Z)(e,2),r=i[0],c=i[1],l=D.map((function(t,e){var n=null;n=t.inputSignal?d.ZP.LTI.ramp(1,t.k,t.a):d.ZP.LTI.step(1,t.k,t.a);var i=d.ZP.pointify(n,+E,+B,+xt),r=(0,s.Z)(i,2),c=r[0];return{x:c,y:r[1],z:ot?Array(c.length).fill(0):null,line:{width:t.thickness},type:"scatter"+(ot?"3d":""),mode:"lines",name:t.legend}}));-1===D.findIndex((function(t){return t.a===+n&&t.k===+p&&t.inputSignal===A}))&&l.push({x:r,y:c,z:ot?Array(r.length).fill(0):null,line:{width:tt},type:"scatter"+(ot?"3d":""),mode:"lines",name:"".concat(w,"(").concat(b,")")}),W(l)}),[n,p,E,B,A,ot,tt,D,xt]),(0,x.useEffect)((function(){rt(!1)}),[n,p,A]);return(0,a.jsxs)(S.Z,{children:[(0,a.jsx)(c.ZP,{item:!0,spacing:j.dv,children:(0,a.jsx)("h2",{className:"chapter-section-title",children:"\u062a\u0648\u0627\u0628\u0639 \u062a\u0628\u062f\u06cc\u0644 \u0645\u0631\u062a\u0628\u0647 \u06cc\u06a9"})}),(0,a.jsx)(c.ZP,{item:!0,spacing:j.dv,children:(0,a.jsxs)(c.ZP,{container:!0,direction:"column",spacing:1,children:[(0,a.jsx)(c.ZP,{style:{width:"100%",height:"100%",margin:"auto",direction:"ltr"},item:!0,children:(0,a.jsx)(u,{})}),(0,a.jsx)(c.ZP,{sx:{margin:"auto",width:"100%"},item:!0,children:(0,a.jsx)(r.Z,{sx:{direction:"ltr"},children:(0,a.jsxs)(c.ZP,{id:"formulaBox",sx:{margin:"auto"},container:!0,direction:"row",children:[D.map((function(t,e){var n=null;return n=t.inputSignal?function(t,e,n){return"$$\\begin{cases}G_{"+n+"}(s) = "+y.Z.Specials.$1(t,-e).toString()+(0!==e?" \\\\ \\\\ c_{"+n+"}(t) = "+v(t/e)+"(t"+k(-1/e)+")u(t)"+_(t/(e*e))+"e^{"+v(-e)+"t}u(t) ":"} \\\\ \\\\ c_{"+n+"}(t) = t^2u(t) ")+"\\end{cases}$$"}(t.k,t.a,e+1):function(t,e,n){return"$$\\begin{cases}G_{"+n+"}(s) = "+y.Z.Specials.$1(t,-e).toString()+(0!==e?" \\\\ \\\\ c_{"+n+"}(t) = "+v(t/e)+"(1 - e^{"+v(-e)+"t})u(t)":" \\\\ \\\\ c_{"+n+"}(t) = tu(t)")+"\\end{cases}$$"}(t.k,t.a,e+1),(0,a.jsx)(c.ZP,{style:{fontSize:"18px"},md:6,sm:12,item:!0,children:(0,a.jsx)(o.Z,{children:n})})})),!st&&(0,a.jsx)(c.ZP,{style:{fontSize:"18px"},md:6,sm:12,children:(0,a.jsx)(o.Z,{children:K})})]})})}),(0,a.jsxs)(c.ZP,{spacing:2,style:{width:"100%",height:"100%",margin:"auto",direction:"ltr"},container:!0,children:[(0,a.jsx)(c.ZP,{md:3,sm:12,xs:12,sx:{marginTop:"1%",width:"100%"},container:!0,children:(0,a.jsx)(c.ZP,{xs:12,children:(0,a.jsx)(P,{a:n,k:p,t_i:E,t_f:B,$a:l,$k:$,$t_i:z,$t_f:M,inputSignal:A,$inputSignal:G,N:xt,$N:mt})})}),(0,a.jsxs)(c.ZP,{md:9,sm:12,xs:12,item:!0,children:[(0,a.jsx)(r.Z,{children:(0,a.jsx)(m.Z,{capture:function(){var t=(0,i.Z)(D);-1===t.findIndex((function(t){return t.a===+n&&t.k===+p&&t.inputSignal===A}))&&(t.push({a:+n,k:+p,inputSignal:A,thickness:tt,legend:"$$"+w+"_{"+(D.length+1).toString()+"}$$"}),U(t),rt(!0))},formulaFileName:"Water Tank Level Equations _ "+(0,i.Z)(D.map((function(t){return t.legend}))).join()+".png",graphFileName:(0,i.Z)(D.map((function(t){return"".concat(t.legend,"{alpha=").concat(t.a,"_k=").concat(t.k,"_in=").concat(t.inputSignal?"ramp":"step","}")}))).join(", ")+".png",reset:function(){return U([])},update:function(t){return function(t){t&&et(t.thickness)}(t)},toggle3DPlot:function(){return at(!ot)}})}),(0,a.jsx)("hr",{}),(0,a.jsx)(c.ZP,{lg:12,md:12,sm:12,xs:12,item:!0,children:(0,a.jsx)(r.Z,{children:(0,a.jsx)(f.Z,{title:"\u067e\u0627\u0633\u062e \u067e\u0644\u0647/\u0631\u0645\u067e",traces:V})})})]})]})]})})]})}},54367:function(){},59416:function(){},68383:function(t,e,n){t.exports=n.p+"static/media/simple_lti_system.15ca1aa3fb76230afbf2.png"}}]);
//# sourceMappingURL=577.512d210a.chunk.js.map
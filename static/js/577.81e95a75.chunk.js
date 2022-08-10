"use strict";(self.webpackChunklnctrl=self.webpackChunklnctrl||[]).push([[577],{65599:function(t,e,n){var i=n(1413),r=n(70885),o=n(72791),a=(n(54367),n(30830)),s=n(77021),c=n(61889),l=n(20890),d=n(54905),u=n(63466),x=n(65773),h=n(80184),m=function(t,e){var n=(0,o.useRef)();(0,o.useEffect)((function(){n.current=t}),[t]),(0,o.useEffect)((function(){if(null!==e){var t=setInterval((function(){n.current()}),e);return function(){return clearInterval(t)}}}),[e])},p=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:5;return e>=5?t*(.2/7+(e-5)/((e+1)*(e+5))):-t/10/(1+3.5*e)+.2*t/7},f=function(t){var e=t.elementDimensions,n=t.position,i=t.isPositionOutside,s=t.point,c=void 0===s?{x:0,y:0,select:function(){}}:s,l=t.extra,d=t.options,u=void 0===d?{pointSize:7,grids:6,pointColor:null}:d,x=t.scale,f=void 0===x?1:x,Z=t.viewpoint,g=(0,o.useState)(0),v=(0,r.Z)(g,2),j=v[0],S=v[1],$=(0,o.useState)(0),y=(0,r.Z)($,2),b=y[0],P=y[1],z=(0,o.useState)(5),w=(0,r.Z)(z,2),k=w[0],C=w[1],_=(0,o.useState)(7),I=(0,r.Z)(_,2),N=I[0],E=I[1],R=function(t){if(!i){var r=e.width/2,o=(e.height-38)/2,s=a.ZP.round((n.x-r)/r),c=a.ZP.round((o-n.y)/o),l=s*f*k,d=c*f*k;S(l),P(d),Z(l,d)}},M=(0,o.useCallback)((function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,i=document.getElementById("#point".concat(n));i.style.setProperty("--x",t),i.style.setProperty("--y",e-p(N,k))}),[N,k]),T=function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];t?l&&l.select&&l.select({x:j,y:b}):c&&c.select&&c.select({x:j,y:b}),Z(j,b)},F=(0,o.useState)(!1),B=(0,r.Z)(F,2),L=B[0],A=B[1];m(T,L?10:null);var W=(0,o.useState)(!1),V=(0,r.Z)(W,2),G=V[0],D=V[1];return m((function(){return T(!0)}),G?10:null),(0,o.useEffect)((function(){if(c&&0!==f){var t=Number(c.x),e=Number(c.y),n=a.ZP.round(t/(k*f)),i=a.ZP.round(e/(k*f));M(n*k,i*k,0)}}),[c,f,k,M]),(0,o.useEffect)((function(){if(l&&0!==f){var t=Number(l.x),e=Number(l.y),n=a.ZP.round(t/(k*f)),i=a.ZP.round(e/(k*f));M(n*k,i*k,1)}}),[l,f,k,M]),(0,o.useEffect)((function(){A(!1),D(!1)}),[f]),(0,o.useEffect)((function(){u.pointSize&&u.pointSize>=0&&E(u.pointSize),u.grids&&u.grids>=0&&C(u.grids)}),[u]),(0,o.useEffect)((function(){k>=0&&k>=0&&(document.documentElement.style.setProperty("--grids-x",k),document.documentElement.style.setProperty("--grids-y",k),document.documentElement.style.setProperty("--grids-total",2*k))}),[k]),(0,o.useEffect)((function(){N>=0&&document.documentElement.style.setProperty("--point-size",N)}),[N]),(0,h.jsxs)("div",{id:"#box",onMouseEnter:function(t){return R()},onMouseLeave:function(t){return R()},onMouseMove:function(t){return R()},onMouseUp:function(){A(!1),D(!1)},className:"coordinate-box",children:[(0,h.jsx)("div",{id:"#point0",onMouseDown:function(){return A(!0)},onMouseUp:function(){return A(!1)},className:"coordinate-point"}),l&&(0,h.jsx)("div",{id:"#point1",onMouseDown:function(){return D(!0)},onMouseUp:function(){return D(!1)},className:"coordinate-point extra-point-color"})]})},Z=function(t,e){return t>e||t<-e||e-Math.abs(t)<1};e.Z=function(t){var e=(0,o.useState)(0),n=(0,r.Z)(e,2),m=n[0],p=n[1],g=(0,o.useState)(0),v=(0,r.Z)(g,2),j=v[0],S=v[1],$=t.options,y=t.point,b=t.extra,P=$||{grids:6,defaultScale:1},z=P.grids,w=P.defaultScale,k=(0,o.useState)(w||1),C=(0,r.Z)(k,2),_=C[0],I=C[1];return(0,o.useEffect)((function(){var t=z?Math.abs(_*z):Math.abs(6*_);t>0&&(Z(y.x,t)||Z(y.y,t)||b&&(Z(b.x,t)||Z(b.y,t)))&&I(_+1)}),[y,b,_,z]),(0,h.jsxs)(c.ZP,{container:!0,children:[(0,h.jsx)(c.ZP,{xs:12,item:!0,children:(0,h.jsx)(s.Z,{children:(0,h.jsx)(f,(0,i.Z)((0,i.Z)({},t),{},{viewpoint:function(t,e){p(t),S(e)},scale:_}))})}),(0,h.jsx)(c.ZP,{xs:12,children:(0,h.jsx)(l.Z,{style:{textAlign:"center"},children:"("+a.ZP.strictPrecisionFormat(m)+", "+a.ZP.strictPrecisionFormat(j)+")"})}),(0,h.jsx)(c.ZP,{xs:12,item:!0,children:(0,h.jsx)(d.Z,{variant:"outlined",value:_,sx:{width:"100%"},onChange:function(t){return I(t.target.value)},InputProps:{startAdornment:(0,h.jsx)(u.Z,{position:"left",children:(0,h.jsx)(x.Z,{children:"$$\\times$$"})}),endAdornment:(0,h.jsx)(u.Z,{position:"left",children:"\u0645\u0642\u06cc\u0627\u0633"})}})})]})}},93554:function(t,e,n){var i=n(61889),r=n(54905),o=n(63466),a=n(65773),s=n(72791),c=n(80184);e.Z=function(t){var e=t.parameters,n=t.setters,l=t.labels,d=t.units;return(0,c.jsx)(s.Fragment,{children:e instanceof Array&&e.map((function(t,e){return(0,c.jsx)(i.ZP,{md:12,sm:4,xs:6,item:!0,children:(0,c.jsx)(r.Z,{onChange:function(t){return n[e](t.target.value)},value:t,sx:{width:"100%"},InputProps:{startAdornment:(0,c.jsx)(o.Z,{position:"left",children:(0,c.jsx)(a.Z,{children:l[e]})}),endAdornment:d[e]&&(0,c.jsx)(o.Z,{position:"right",children:(0,c.jsx)(a.Z,{children:d[e]})})}})})}))})}},63970:function(t,e,n){n(72791);var i=n(68286),r=n(80184);e.Z=function(t){var e=t.traces,n=t.title,o=(t.width,t.height),a=void 0===o?500:o,s=t.logX;return(0,r.jsx)(i.Z,{style:{textAlign:"center"},data:e,layout:{margin:{t:30,l:30,r:20,b:30},xaxis:{rangemode:"tozero",zeroline:!0,type:s?"log":"dec"},yaxis:{rangemode:"tozero",zeroline:!0},height:a,title:n,hoverlabel:{align:"auto",boxmode:"overlay",font:{color:"#000000FF"}},legend:{orientation:"h"}}})}},29961:function(t,e,n){var i=n(70885),r=n(91720),o=n(27247),a=n(85029),s=n(63787),c=n(61889),l=n(13400),d=n(53767),u=n(82550),x=n(72791),h=n(24250),m=n(37185),p=n(80184);e.Z=function(t){var e=t.capture,n=t.reset,f=t.update,Z=t.toggle3DPlot,g=(0,x.useState)(!1),v=(0,i.Z)(g,2),j=v[0],S=v[1],$=(0,x.useState)(20),y=(0,i.Z)($,2),b=y[0],P=y[1];return(0,x.useEffect)((function(){f({thickness:b/20+.1})}),[b,f]),(0,p.jsxs)(c.ZP,{sx:{direction:"rtl"},container:!0,direction:"row",children:[(0,p.jsxs)(c.ZP,{md:10,sm:8,xs:6,sx:{direction:"rtl"},item:!0,children:[Z&&(0,p.jsx)(l.Z,{color:"secondary","aria-label":"capture graph",component:"span",onClick:function(){S(!j),Z()},children:j?(0,p.jsx)(m.Z,{}):(0,p.jsx)(h.Z,{})}),e&&(0,p.jsx)(l.Z,{color:"secondary","aria-label":"capture graph",component:"span",onClick:e,children:(0,p.jsx)(r.Z,{})}),n&&(0,p.jsx)(l.Z,{color:"secondary","aria-label":"capture graph",component:"span",onClick:n,children:(0,p.jsx)(o.Z,{})})]}),(0,p.jsx)(c.ZP,{md:2,sm:4,xs:6,item:!0,children:(0,p.jsxs)(d.Z,{spacing:2,direction:"row",sx:{mt:.5,direction:"ltr"},alignItems:"center",children:[(0,p.jsx)(a.Z,{}),(0,p.jsx)(u.ZP,{"aria-label":"Volume",value:b,onChange:function(t,e){return P(e)}}),(0,p.jsx)(s.Z,{})]})})]})}},8577:function(t,e,n){n.r(e),n.d(e,{default:function(){return _}});var i=n(42982),r=n(70885),o=n(71598),a=n(20890),s=n(61889),c=n(68383),l=(n(59416),n(65773)),d=n(80184),u=function(){return(0,d.jsx)(o.Z,{title:"\u062a\u0627\u0628\u0639 \u062a\u0628\u062f\u06cc\u0644 \u0645\u0631\u062a\u0628\u0647 \u06cc\u06a9",darkBorder:!0,sx:{direction:"rtl"},children:(0,d.jsxs)(a.Z,{children:[(0,d.jsx)(s.ZP,{className:"lecture-text",item:!0,children:(0,d.jsx)("p",{children:"\xa0 \xa0 \xa0 \xa0 \u0627\u06cc\u0646 \u062a\u0648\u0627\u0628\u0639 \u062a\u0628\u062f\u06cc\u0644 \u0628\u0647 \u0641\u0631\u0645 \u0632\u06cc\u0631 \u0645\u06cc \u0628\u0627\u0634\u0646\u062f:"})}),(0,d.jsx)(s.ZP,{item:!0,children:(0,d.jsx)(l.Z,{children:"$$G(s) = \\frac{k}{s + a}$$"})}),(0,d.jsxs)(s.ZP,{className:"lecture-text",item:!0,children:[(0,d.jsx)("h1",{style:{marginTop:"5%",marginBottom:"3%"},children:"\xa0\u067e\u0627\u0633\u062e \u062d\u0627\u0644\u062a \u0645\u0627\u0646\u062f\u06af\u0627\u0631"}),(0,d.jsx)("p",{children:"\xa0 \xa0 \xa0 \xa0 \u062f\u06cc\u0627\u06af\u0631\u0627\u0645 \u06cc\u06a9 \u0633\u06cc\u0633\u062a\u0645 LTI \u0633\u0627\u062f\u0647 \u0628\u0635\u0648\u0631\u062a \u0632\u06cc\u0631 \u0645\u06cc \u0628\u0627\u0634\u062f:"})]}),(0,d.jsx)(s.ZP,{item:!0,children:(0,d.jsx)("img",{className:"lecture-image",src:c,alt:"\u0628\u0627\u0631\u06af\u0630\u0627\u0631\u06cc \u062a\u0635\u0648\u06cc\u0631 \u0628\u0627 \u0645\u0634\u06a9\u0644 \u0645\u0648\u0627\u062c\u0647 \u0634\u062f"})}),(0,d.jsx)(s.ZP,{style:{fontSize:"20px"},item:!0,children:(0,d.jsx)(l.Z,{children:"$$c(t) = c_{tr}(t) + c_{ss}(t)$$"})}),(0,d.jsx)(s.ZP,{style:{fontSize:"20px"},item:!0,children:(0,d.jsx)(l.Z,{children:"$$\\begin{cases} \\lim\\limits_{t \\to \\infty}c_{tr}(t) = 0 \\\\ \\lim\\limits_{t \\to \\infty}c_{ss}(t) = c_{ss} \\end{cases} \\rightarrow c_{ss} = \\lim\\limits_{t \\to \\infty}c(t)$$"})}),(0,d.jsx)(s.ZP,{className:"lecture-text",item:!0,children:(0,d.jsx)("p",{children:"\xa0 \xa0 \xa0 \xa0 \u0646\u06a9\u062a\u0647:\u200c\u0637\u0628\u0642 \u0642\u0636\u06cc\u0647 \u0645\u0642\u062f\u0627\u0631 \u0646\u0647\u0627\u06cc\u06cc \u062f\u0627\u0631\u06cc\u0645:"})}),(0,d.jsx)(s.ZP,{style:{fontSize:"20px"},item:!0,children:(0,d.jsx)(l.Z,{children:"$$c_{ss} = \\lim\\limits_{t \\to \\infty}c_{ss}(t) = \\lim\\limits_{s \\to 0}sC(s)$$"})}),(0,d.jsx)(s.ZP,{sx:{mt:1},item:!0,children:(0,d.jsxs)(o.Z,{children:[(0,d.jsxs)(s.ZP,{className:"lecture-text",item:!0,children:[(0,d.jsx)("h1",{style:{marginTop:"5%",marginBottom:"3%"},children:"\xa0 \u067e\u0627\u0633\u062e \u067e\u0644\u0647 \u0648\u0627\u062d\u062f"}),(0,d.jsx)("p",{children:"\xa0 \xa0 \xa0 \xa0 \u062d\u0627\u0644 \u067e\u0627\u0633\u062e \u062d\u0627\u0644\u062a \u0645\u0627\u0646\u062f\u06af\u0627\u0631 \u0628\u0647 \u0648\u0631\u0648\u062f\u06cc \u067e\u0644\u0647 \u0648\u0627\u062d\u062f \u0631\u0627 \u0628\u0631\u0627\u06cc \u0633\u06cc\u0633\u062a\u0645 \u0645\u0630\u06a9\u0648\u0631 \u0631\u0627 \u0645\u062d\u0627\u0633\u0628\u0647 \u0645\u06cc \u06a9\u0646\u06cc\u0645:"})]}),(0,d.jsx)(s.ZP,{style:{fontSize:"20px"},item:!0,children:(0,d.jsx)(l.Z,{children:"$$r(t) = u(t) \\rightarrow R(s) = \\frac{1}{s}$$"})}),(0,d.jsx)(s.ZP,{style:{fontSize:"20px"},item:!0,children:(0,d.jsx)(l.Z,{children:"$$C(s) = G(s)R(s) = \\frac{k}{s(s + 1)}$$"})}),(0,d.jsx)(s.ZP,{style:{fontSize:"20px"},item:!0,children:(0,d.jsx)(l.Z,{children:"$$c(t) = (\\frac{k}{a} - \\frac{k}{a}e^{-at})u(t)$$"})}),(0,d.jsx)(s.ZP,{className:"lecture-text",item:!0,children:(0,d.jsx)("p",{children:"\xa0 \xa0 \xa0 \xa0 \u062f\u0631 \u0646\u062a\u06cc\u062c\u0647 \u0645\u0642\u062f\u0627\u0631 \u062d\u0627\u0644\u062a \u0645\u0627\u0646\u062f\u06af\u0627\u0631 \u0633\u06cc\u0633\u062a\u0645 \u0639\u0628\u0627\u0631\u062a \u0627\u0633\u062a \u0627\u0632:"})}),(0,d.jsx)(s.ZP,{style:{fontSize:"20px"},item:!0,children:(0,d.jsx)(l.Z,{children:"$$c_{ss} = \\lim\\limits_{s \\to 0}sC(s) = \\lim\\limits_{s \\to 0}\\frac{k}{s + a} = \\frac{k}{a}$$"})})]})}),(0,d.jsx)(s.ZP,{sx:{mt:1},item:!0,children:(0,d.jsxs)(o.Z,{children:[(0,d.jsxs)(s.ZP,{className:"lecture-text",item:!0,children:[(0,d.jsx)("h1",{style:{marginTop:"5%",marginBottom:"3%"},children:"\xa0 \u067e\u0627\u0633\u062e \u0634\u06cc\u0628 \u0648\u0627\u062d\u062f"}),(0,d.jsx)("p",{children:"\xa0 \xa0 \xa0 \xa0 \u062d\u0627\u0644 \u067e\u0627\u0633\u062e \u062d\u0627\u0644\u062a \u0645\u0627\u0646\u062f\u06af\u0627\u0631 \u0628\u0647 \u0648\u0631\u0648\u062f\u06cc \u0634\u06cc\u06cc\u0628 \u0648\u0627\u062d\u062f \u0631\u0627 \u0628\u0631\u0627\u06cc \u0633\u06cc\u0633\u062a\u0645 \u0645\u0630\u06a9\u0648\u0631 \u0631\u0627 \u0645\u062d\u0627\u0633\u0628\u0647 \u0645\u06cc \u06a9\u0646\u06cc\u0645:"})]}),(0,d.jsx)(s.ZP,{style:{fontSize:"20px"},item:!0,children:(0,d.jsx)(l.Z,{children:"$$r(t) = tu(t) \\rightarrow R(s) = \\frac{1}{s^2}$$"})}),(0,d.jsx)(s.ZP,{style:{fontSize:"20px"},item:!0,children:(0,d.jsx)(l.Z,{children:"$$C(s) = G(s)R(s) = \\frac{k}{s^2(s + 1)}$$"})}),(0,d.jsx)(s.ZP,{style:{fontSize:"20px"},item:!0,children:(0,d.jsx)(l.Z,{children:"$$c(t) = \\frac{k}{a}(t - \\frac{1}{a})u(t) + \\frac{k}{a^2}e^{-at}u(t)$$"})}),(0,d.jsx)(s.ZP,{className:"lecture-text",item:!0,children:(0,d.jsx)("p",{children:"\xa0 \xa0 \xa0 \xa0 \u062f\u0631 \u0646\u062a\u06cc\u062c\u0647 \u0645\u0642\u062f\u0627\u0631 \u062d\u0627\u0644\u062a \u0645\u0627\u0646\u062f\u06af\u0627\u0631 \u0633\u06cc\u0633\u062a\u0645 \u0639\u0628\u0627\u0631\u062a \u0627\u0633\u062a \u0627\u0632:"})}),(0,d.jsx)(s.ZP,{style:{fontSize:"20px"},item:!0,children:(0,d.jsx)(l.Z,{children:"$$c_{ss} = \\lim\\limits_{s \\to 0}sC(s) = \\lim\\limits_{s \\to 0}\\frac{k}{s(s + a)} = \\infty$$"})})]})})]})})},x=n(30830),h=n(72791),m=n(29961),p=n(63970),f=n(36151),Z=n(65599),g=n(93554),v=n(91923),j=["$$a = $$","$$k = $$","$$t_i = $$","$$t_f = $$","$$N = $$"],S=[null,null,"$$sec$$","$$sec$$",null],$=function(t){var e=t.k,n=t.a,i=t.$k,r=t.$a,c=t.t_i,l=t.t_f,u=t.$t_i,x=t.$t_f,h=t.inputSignal,m=t.$inputSignal,p=t.N,$=t.$N;return(0,d.jsxs)(o.Z,{darkBorder:!0,title:"\u067e\u0627\u0631\u0627\u0645\u062a\u0631\u0647\u0627",sx:{direction:"ltr",textAlign:"right",height:"100%"},children:[(0,d.jsxs)(s.ZP,{xs:12,container:!0,children:[(0,d.jsx)(s.ZP,{xs:6,sx:{pr:1,pb:1},item:!0,children:(0,d.jsx)(f.Z,{onClick:function(){return m(0)},style:{width:"100%",textTransform:"none"},variant:0===h?"contained":"outlined",children:"\u067e\u0644\u0647"})}),(0,d.jsx)(s.ZP,{sx:{pb:1},xs:6,item:!0,children:(0,d.jsx)(f.Z,{onClick:function(){return m(1)},style:{width:"100%",textTransform:"none"},variant:1===h?"contained":"outlined",children:"\u0631\u0645\u067e"})})]}),(0,d.jsxs)(s.ZP,{spacing:v.dv,container:!0,direction:"row",children:[(0,d.jsx)(g.Z,{parameters:[n,e,c,l,p],setters:[r,i,u,x,$],labels:j,units:S}),(0,d.jsxs)(s.ZP,{sx:{mt:1},md:12,sm:4,xs:6,item:!0,children:[(0,d.jsx)(a.Z,{style:{textAlign:"center"},children:"\u0645\u062d\u0644 \u0642\u0637\u0628 \u0631\u0627 \u0627\u0646\u062a\u062e\u0627\u0628 \u06a9\u0646\u06cc\u062f"}),(0,d.jsx)(Z.Z,{point:{x:-n,y:0,select:function(t){t&&r(-t.x)}},options:{pointSize:10,grids:10}})]})]})]})},y=n(96758),b=n(78793),P=function(t){return-1===t?"-":1===t?"":x.ZP.strictPrecisionFormat(t)},z=function(t){return t>0?" + "+x.ZP.strictPrecisionFormat(t):" - "+-1*x.ZP.strictPrecisionFormat(t)},w=function(t){var e="";return t<0?(e+="-",t*=-1):t>0&&(e+="+"),1!==t&&(e+=x.ZP.strictPrecisionFormat(t)),e},k="t",C="c",_=function(){var t=(0,h.useState)(1),e=(0,r.Z)(t,2),n=e[0],c=e[1],f=(0,h.useState)(1),Z=(0,r.Z)(f,2),g=Z[0],j=Z[1],S=(0,h.useState)(0),_=(0,r.Z)(S,2),I=_[0],N=_[1],E=(0,h.useState)(5),R=(0,r.Z)(E,2),M=R[0],T=R[1],F=(0,h.useState)(0),B=(0,r.Z)(F,2),L=B[0],A=B[1],W=(0,h.useState)([]),V=(0,r.Z)(W,2),G=V[0],D=V[1],O=(0,h.useState)([]),q=(0,r.Z)(O,2),U=q[0],X=q[1],H=(0,h.useState)(null),J=(0,r.Z)(H,2),K=J[0],Q=J[1],Y=(0,h.useState)(1),tt=(0,r.Z)(Y,2),et=tt[0],nt=tt[1],it=(0,h.useState)(!1),rt=(0,r.Z)(it,2),ot=rt[0],at=rt[1],st=(0,h.useState)(!1),ct=(0,r.Z)(st,2),lt=ct[0],dt=ct[1],ut=(0,h.useState)(1e3),xt=(0,r.Z)(ut,2),ht=xt[0],mt=xt[1];(0,h.useEffect)((function(){var t=null;L?(t=x.ZP.LTI.ramp(1,+g,+n),Q(function(t,e){return"$$\\begin{cases}G(s) = "+y.Z.Shortcuts.$1(t,-e).toString()+(0!==e?" \\\\ \\\\ c(t) = "+P(t/e)+"(t"+z(-1/e)+")u(t)"+w(t/(e*e))+"e^{"+P(-e)+"t}u(t) ":"} \\\\ \\\\ c(t) = t^2u(t) ")+"\\end{cases}$$"}(+g,+n))):(t=x.ZP.LTI.step(1,+g,+n),Q(function(t,e){return"$$\\begin{cases}G(s) = "+y.Z.Shortcuts.$1(t,-e).toString()+(0!==e?" \\\\ \\\\ c(t) = "+P(t/e)+"(1 - e^{"+P(-e)+"t})u(t) ":"} \\\\ \\\\ c(t) = tu(t) ")+"\\end{cases}$$"}(+g,+n)));var e=x.ZP.pointify(t,+I,+M,+ht),i=(0,r.Z)(e,2),o=i[0],a=i[1],s=G.map((function(t,e){var n=null;n=t.inputSignal?x.ZP.LTI.ramp(1,t.k,t.a):x.ZP.LTI.step(1,t.k,t.a);var i=x.ZP.pointify(n,+I,+M,+ht),o=(0,r.Z)(i,2),a=o[0];return{x:a,y:o[1],z:lt?Array(a.length).fill(0):null,line:{width:t.thickness},type:"scatter"+(lt?"3d":""),mode:"lines",name:t.legend}}));-1===G.findIndex((function(t){return t.a===+n&&t.k===+g&&t.inputSignal===L}))&&s.push({x:o,y:a,z:lt?Array(o.length).fill(0):null,line:{width:et},type:"scatter"+(lt?"3d":""),mode:"lines",name:"".concat(C,"(").concat(k,")")}),X(s)}),[n,g,I,M,L,lt,et,G,ht]),(0,h.useEffect)((function(){at(!1)}),[n,g,L]);return(0,d.jsxs)(b.Z,{children:[(0,d.jsx)(s.ZP,{item:!0,spacing:v.dv,children:(0,d.jsx)(a.Z,{children:(0,d.jsx)("h2",{className:"chapter-section-title",children:"\u062a\u0648\u0627\u0628\u0639 \u062a\u0628\u062f\u06cc\u0644 \u0645\u0631\u062a\u0628\u0647 \u06cc\u06a9"})})}),(0,d.jsx)(s.ZP,{item:!0,spacing:v.dv,children:(0,d.jsxs)(s.ZP,{container:!0,direction:"column",spacing:1,children:[(0,d.jsx)(s.ZP,{style:{width:"100%",height:"100%",margin:"auto",direction:"ltr"},item:!0,children:(0,d.jsx)(u,{})}),(0,d.jsx)(s.ZP,{sx:{margin:"auto",width:"100%"},item:!0,children:(0,d.jsx)(o.Z,{sx:{direction:"ltr"},children:(0,d.jsxs)(s.ZP,{id:"formulaBox",sx:{margin:"auto"},container:!0,direction:"row",children:[G.map((function(t,e){var n=null;return n=t.inputSignal?function(t,e,n){return"$$\\begin{cases}G_{"+n+"}(s) = "+y.Z.Shortcuts.$1(t,-e).toString()+(0!==e?" \\\\ \\\\ c_{"+n+"}(t) = "+P(t/e)+"(t"+z(-1/e)+")u(t)"+w(t/(e*e))+"e^{"+P(-e)+"t}u(t) ":"} \\\\ \\\\ c_{"+n+"}(t) = t^2u(t) ")+"\\end{cases}$$"}(t.k,t.a,e+1):function(t,e,n){return"$$\\begin{cases}G_{"+n+"}(s) = "+y.Z.Shortcuts.$1(t,-e).toString()+(0!==e?" \\\\ \\\\ c_{"+n+"}(t) = "+P(t/e)+"(1 - e^{"+P(-e)+"t})u(t)":" \\\\ \\\\ c_{"+n+"}(t) = tu(t)")+"\\end{cases}$$"}(t.k,t.a,e+1),(0,d.jsx)(s.ZP,{style:{fontSize:"18px"},md:6,sm:12,item:!0,children:(0,d.jsx)(l.Z,{children:n})})})),!ot&&(0,d.jsx)(s.ZP,{style:{fontSize:"18px"},md:6,sm:12,children:(0,d.jsx)(l.Z,{children:K})})]})})}),(0,d.jsxs)(s.ZP,{spacing:2,style:{width:"100%",height:"100%",margin:"auto",direction:"ltr"},container:!0,children:[(0,d.jsx)(s.ZP,{md:3,sm:12,xs:12,sx:{marginTop:"1%",width:"100%"},container:!0,children:(0,d.jsx)(s.ZP,{xs:12,children:(0,d.jsx)($,{a:n,k:g,t_i:I,t_f:M,$a:c,$k:j,$t_i:N,$t_f:T,inputSignal:L,$inputSignal:A,N:ht,$N:mt})})}),(0,d.jsxs)(s.ZP,{md:9,sm:12,xs:12,item:!0,children:[(0,d.jsx)(o.Z,{children:(0,d.jsx)(m.Z,{capture:function(){var t=(0,i.Z)(G);-1===t.findIndex((function(t){return t.a===+n&&t.k===+g&&t.inputSignal===L}))&&(t.push({a:+n,k:+g,inputSignal:L,thickness:et,legend:"$$"+C+"_{"+(G.length+1).toString()+"}$$"}),D(t),at(!0))},reset:function(){return D([])},update:function(t){return function(t){t&&nt(t.thickness)}(t)},toggle3DPlot:function(){return dt(!lt)}})}),(0,d.jsx)("hr",{}),(0,d.jsx)(s.ZP,{lg:12,md:12,sm:12,xs:12,item:!0,children:(0,d.jsx)(o.Z,{children:(0,d.jsx)(p.Z,{title:"\u067e\u0627\u0633\u062e \u067e\u0644\u0647/\u0631\u0645\u067e",traces:U})})})]})]})]})})]})}},36151:function(t,e,n){n.d(e,{Z:function(){return P}});var i=n(4942),r=n(63366),o=n(87462),a=n(72791),s=(n(52007),n(28182)),c=n(35735),l=n(90767),d=n(12065),u=n(47630),x=n(93736),h=n(23701),m=n(14036),p=n(95159);function f(t){return(0,p.Z)("MuiButton",t)}var Z=(0,n(30208).Z)("MuiButton",["root","text","textInherit","textPrimary","textSecondary","outlined","outlinedInherit","outlinedPrimary","outlinedSecondary","contained","containedInherit","containedPrimary","containedSecondary","disableElevation","focusVisible","disabled","colorInherit","textSizeSmall","textSizeMedium","textSizeLarge","outlinedSizeSmall","outlinedSizeMedium","outlinedSizeLarge","containedSizeSmall","containedSizeMedium","containedSizeLarge","sizeMedium","sizeSmall","sizeLarge","fullWidth","startIcon","endIcon","iconSizeSmall","iconSizeMedium","iconSizeLarge"]);var g=a.createContext({}),v=n(80184),j=["children","color","component","className","disabled","disableElevation","disableFocusRipple","endIcon","focusVisibleClassName","fullWidth","size","startIcon","type","variant"],S=function(t){return(0,o.Z)({},"small"===t.size&&{"& > *:nth-of-type(1)":{fontSize:18}},"medium"===t.size&&{"& > *:nth-of-type(1)":{fontSize:20}},"large"===t.size&&{"& > *:nth-of-type(1)":{fontSize:22}})},$=(0,u.ZP)(h.Z,{shouldForwardProp:function(t){return(0,u.FO)(t)||"classes"===t},name:"MuiButton",slot:"Root",overridesResolver:function(t,e){var n=t.ownerState;return[e.root,e[n.variant],e["".concat(n.variant).concat((0,m.Z)(n.color))],e["size".concat((0,m.Z)(n.size))],e["".concat(n.variant,"Size").concat((0,m.Z)(n.size))],"inherit"===n.color&&e.colorInherit,n.disableElevation&&e.disableElevation,n.fullWidth&&e.fullWidth]}})((function(t){var e,n=t.theme,r=t.ownerState;return(0,o.Z)({},n.typography.button,(e={minWidth:64,padding:"6px 16px",borderRadius:n.shape.borderRadius,transition:n.transitions.create(["background-color","box-shadow","border-color","color"],{duration:n.transitions.duration.short}),"&:hover":(0,o.Z)({textDecoration:"none",backgroundColor:(0,d.Fq)(n.palette.text.primary,n.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},"text"===r.variant&&"inherit"!==r.color&&{backgroundColor:(0,d.Fq)(n.palette[r.color].main,n.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},"outlined"===r.variant&&"inherit"!==r.color&&{border:"1px solid ".concat(n.palette[r.color].main),backgroundColor:(0,d.Fq)(n.palette[r.color].main,n.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},"contained"===r.variant&&{backgroundColor:n.palette.grey.A100,boxShadow:n.shadows[4],"@media (hover: none)":{boxShadow:n.shadows[2],backgroundColor:n.palette.grey[300]}},"contained"===r.variant&&"inherit"!==r.color&&{backgroundColor:n.palette[r.color].dark,"@media (hover: none)":{backgroundColor:n.palette[r.color].main}}),"&:active":(0,o.Z)({},"contained"===r.variant&&{boxShadow:n.shadows[8]})},(0,i.Z)(e,"&.".concat(Z.focusVisible),(0,o.Z)({},"contained"===r.variant&&{boxShadow:n.shadows[6]})),(0,i.Z)(e,"&.".concat(Z.disabled),(0,o.Z)({color:n.palette.action.disabled},"outlined"===r.variant&&{border:"1px solid ".concat(n.palette.action.disabledBackground)},"outlined"===r.variant&&"secondary"===r.color&&{border:"1px solid ".concat(n.palette.action.disabled)},"contained"===r.variant&&{color:n.palette.action.disabled,boxShadow:n.shadows[0],backgroundColor:n.palette.action.disabledBackground})),e),"text"===r.variant&&{padding:"6px 8px"},"text"===r.variant&&"inherit"!==r.color&&{color:n.palette[r.color].main},"outlined"===r.variant&&{padding:"5px 15px",border:"1px solid ".concat("light"===n.palette.mode?"rgba(0, 0, 0, 0.23)":"rgba(255, 255, 255, 0.23)")},"outlined"===r.variant&&"inherit"!==r.color&&{color:n.palette[r.color].main,border:"1px solid ".concat((0,d.Fq)(n.palette[r.color].main,.5))},"contained"===r.variant&&{color:n.palette.getContrastText(n.palette.grey[300]),backgroundColor:n.palette.grey[300],boxShadow:n.shadows[2]},"contained"===r.variant&&"inherit"!==r.color&&{color:n.palette[r.color].contrastText,backgroundColor:n.palette[r.color].main},"inherit"===r.color&&{color:"inherit",borderColor:"currentColor"},"small"===r.size&&"text"===r.variant&&{padding:"4px 5px",fontSize:n.typography.pxToRem(13)},"large"===r.size&&"text"===r.variant&&{padding:"8px 11px",fontSize:n.typography.pxToRem(15)},"small"===r.size&&"outlined"===r.variant&&{padding:"3px 9px",fontSize:n.typography.pxToRem(13)},"large"===r.size&&"outlined"===r.variant&&{padding:"7px 21px",fontSize:n.typography.pxToRem(15)},"small"===r.size&&"contained"===r.variant&&{padding:"4px 10px",fontSize:n.typography.pxToRem(13)},"large"===r.size&&"contained"===r.variant&&{padding:"8px 22px",fontSize:n.typography.pxToRem(15)},r.fullWidth&&{width:"100%"})}),(function(t){var e;return t.ownerState.disableElevation&&(e={boxShadow:"none","&:hover":{boxShadow:"none"}},(0,i.Z)(e,"&.".concat(Z.focusVisible),{boxShadow:"none"}),(0,i.Z)(e,"&:active",{boxShadow:"none"}),(0,i.Z)(e,"&.".concat(Z.disabled),{boxShadow:"none"}),e)})),y=(0,u.ZP)("span",{name:"MuiButton",slot:"StartIcon",overridesResolver:function(t,e){var n=t.ownerState;return[e.startIcon,e["iconSize".concat((0,m.Z)(n.size))]]}})((function(t){var e=t.ownerState;return(0,o.Z)({display:"inherit",marginRight:8,marginLeft:-4},"small"===e.size&&{marginLeft:-2},S(e))})),b=(0,u.ZP)("span",{name:"MuiButton",slot:"EndIcon",overridesResolver:function(t,e){var n=t.ownerState;return[e.endIcon,e["iconSize".concat((0,m.Z)(n.size))]]}})((function(t){var e=t.ownerState;return(0,o.Z)({display:"inherit",marginRight:-4,marginLeft:8},"small"===e.size&&{marginRight:-2},S(e))})),P=a.forwardRef((function(t,e){var n=a.useContext(g),i=(0,c.Z)(n,t),d=(0,x.Z)({props:i,name:"MuiButton"}),u=d.children,h=d.color,p=void 0===h?"primary":h,Z=d.component,S=void 0===Z?"button":Z,P=d.className,z=d.disabled,w=void 0!==z&&z,k=d.disableElevation,C=void 0!==k&&k,_=d.disableFocusRipple,I=void 0!==_&&_,N=d.endIcon,E=d.focusVisibleClassName,R=d.fullWidth,M=void 0!==R&&R,T=d.size,F=void 0===T?"medium":T,B=d.startIcon,L=d.type,A=d.variant,W=void 0===A?"text":A,V=(0,r.Z)(d,j),G=(0,o.Z)({},d,{color:p,component:S,disabled:w,disableElevation:C,disableFocusRipple:I,fullWidth:M,size:F,type:L,variant:W}),D=function(t){var e=t.color,n=t.disableElevation,i=t.fullWidth,r=t.size,a=t.variant,s=t.classes,c={root:["root",a,"".concat(a).concat((0,m.Z)(e)),"size".concat((0,m.Z)(r)),"".concat(a,"Size").concat((0,m.Z)(r)),"inherit"===e&&"colorInherit",n&&"disableElevation",i&&"fullWidth"],label:["label"],startIcon:["startIcon","iconSize".concat((0,m.Z)(r))],endIcon:["endIcon","iconSize".concat((0,m.Z)(r))]},d=(0,l.Z)(c,f,s);return(0,o.Z)({},s,d)}(G),O=B&&(0,v.jsx)(y,{className:D.startIcon,ownerState:G,children:B}),q=N&&(0,v.jsx)(b,{className:D.endIcon,ownerState:G,children:N});return(0,v.jsxs)($,(0,o.Z)({ownerState:G,className:(0,s.Z)(P,n.className),component:S,disabled:w,focusRipple:!I,focusVisibleClassName:(0,s.Z)(D.focusVisible,E),ref:e,type:L},V,{classes:D,children:[O,u,q]}))}))},54367:function(){},59416:function(){},68383:function(t,e,n){t.exports=n.p+"static/media/simple_lti_system.15ca1aa3fb76230afbf2.png"}}]);
//# sourceMappingURL=577.81e95a75.chunk.js.map
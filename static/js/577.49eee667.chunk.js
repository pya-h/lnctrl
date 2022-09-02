"use strict";(self.webpackChunklnctrl=self.webpackChunklnctrl||[]).push([[577],{65599:function(t,e,n){var i=n(1413),o=n(70885),r=n(72791),a=(n(54367),n(30830)),s=n(77021),c=n(61889),l=n(20890),d=n(54905),u=n(63466),x=n(65773),h=n(80184),p=function(t,e){var n=(0,r.useRef)();(0,r.useEffect)((function(){n.current=t}),[t]),(0,r.useEffect)((function(){if(null!==e){var t=setInterval((function(){n.current()}),e);return function(){return clearInterval(t)}}}),[e])},m=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:5;return e>=5?t*(.2/7+(e-5)/((e+1)*(e+5))):-t/10/(1+3.5*e)+.2*t/7},f=function(t){var e=t.elementDimensions,n=t.position,i=t.isPositionOutside,s=t.point,c=void 0===s?{x:0,y:0,select:function(){}}:s,l=t.extra,d=t.options,u=void 0===d?{pointSize:7,grids:6,pointColor:null}:d,x=t.scale,f=void 0===x?1:x,Z=t.viewpoint,g=(0,r.useState)(0),v=(0,o.Z)(g,2),j=v[0],S=v[1],$=(0,r.useState)(0),b=(0,o.Z)($,2),y=b[0],P=b[1],z=(0,r.useState)(5),w=(0,o.Z)(z,2),k=w[0],C=w[1],_=(0,r.useState)(7),I=(0,o.Z)(_,2),N=I[0],E=I[1],R=function(t){if(!i){var o=e.width/2,r=(e.height-38)/2,s=a.ZP.round((n.x-o)/o),c=a.ZP.round((r-n.y)/r),l=s*f*k,d=c*f*k;S(l),P(d),Z(l,d)}},M=(0,r.useCallback)((function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,i=document.getElementById("#point".concat(n));i.style.setProperty("--x",t),i.style.setProperty("--y",e-m(N,k))}),[N,k]),T=function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];t?l&&l.select&&l.select({x:j,y:y}):c&&c.select&&c.select({x:j,y:y}),Z(j,y)},F=(0,r.useState)(!1),B=(0,o.Z)(F,2),L=B[0],A=B[1];p(T,L?10:null);var W=(0,r.useState)(!1),V=(0,o.Z)(W,2),G=V[0],D=V[1];return p((function(){return T(!0)}),G?10:null),(0,r.useEffect)((function(){if(c&&0!==f){var t=Number(c.x),e=Number(c.y),n=a.ZP.round(t/(k*f)),i=a.ZP.round(e/(k*f));M(n*k,i*k,0)}}),[c,f,k,M]),(0,r.useEffect)((function(){if(l&&0!==f){var t=Number(l.x),e=Number(l.y),n=a.ZP.round(t/(k*f)),i=a.ZP.round(e/(k*f));M(n*k,i*k,1)}}),[l,f,k,M]),(0,r.useEffect)((function(){A(!1),D(!1)}),[f]),(0,r.useEffect)((function(){u.pointSize&&u.pointSize>=0&&E(u.pointSize),u.grids&&u.grids>=0&&C(u.grids)}),[u]),(0,r.useEffect)((function(){k>=0&&k>=0&&(document.documentElement.style.setProperty("--grids-x",k),document.documentElement.style.setProperty("--grids-y",k),document.documentElement.style.setProperty("--grids-total",2*k))}),[k]),(0,r.useEffect)((function(){N>=0&&document.documentElement.style.setProperty("--point-size",N)}),[N]),(0,h.jsxs)("div",{id:"#box",onMouseEnter:function(t){return R()},onMouseLeave:function(t){return R()},onMouseMove:function(t){return R()},onMouseUp:function(){A(!1),D(!1)},className:"coordinate-box",children:[(0,h.jsx)("div",{id:"#point0",onMouseDown:function(){return A(!0)},onMouseUp:function(){return A(!1)},className:"coordinate-point"}),l&&(0,h.jsx)("div",{id:"#point1",onMouseDown:function(){return D(!0)},onMouseUp:function(){return D(!1)},className:"coordinate-point extra-point-color"})]})},Z=function(t,e){return t>e||t<-e||e-Math.abs(t)<1};e.Z=function(t){var e=(0,r.useState)(0),n=(0,o.Z)(e,2),p=n[0],m=n[1],g=(0,r.useState)(0),v=(0,o.Z)(g,2),j=v[0],S=v[1],$=t.options,b=t.point,y=t.extra,P=$||{grids:6,defaultScale:1},z=P.grids,w=P.defaultScale,k=(0,r.useState)(w||1),C=(0,o.Z)(k,2),_=C[0],I=C[1];return(0,r.useEffect)((function(){var t=z?Math.abs(_*z):Math.abs(6*_);t>0&&(Z(b.x,t)||Z(b.y,t)||y&&(Z(y.x,t)||Z(y.y,t)))&&I(_+1)}),[b,y,_,z]),(0,h.jsxs)(c.ZP,{container:!0,children:[(0,h.jsx)(c.ZP,{xs:12,item:!0,children:(0,h.jsx)(s.Z,{children:(0,h.jsx)(f,(0,i.Z)((0,i.Z)({},t),{},{viewpoint:function(t,e){m(t),S(e)},scale:_}))})}),(0,h.jsx)(c.ZP,{xs:12,children:(0,h.jsx)(l.Z,{style:{textAlign:"center"},children:"("+a.ZP.strictPrecisionFormat(p)+", "+a.ZP.strictPrecisionFormat(j)+")"})}),(0,h.jsx)(c.ZP,{xs:12,item:!0,children:(0,h.jsx)(d.Z,{variant:"outlined",value:_,sx:{width:"100%"},onChange:function(t){return I(t.target.value)},InputProps:{startAdornment:(0,h.jsx)(u.Z,{position:"left",children:(0,h.jsx)(x.Z,{children:"$$\\times$$"})}),endAdornment:(0,h.jsx)(u.Z,{position:"left",children:"\u0645\u0642\u06cc\u0627\u0633"})}})})]})}},93554:function(t,e,n){var i=n(61889),o=n(54905),r=n(63466),a=n(65773),s=n(72791),c=n(80184);e.Z=function(t){var e=t.parameters,n=t.setters,l=t.labels,d=t.units;return(0,c.jsx)(s.Fragment,{children:e instanceof Array&&e.map((function(t,e){return(0,c.jsx)(i.ZP,{md:12,sm:4,xs:6,item:!0,children:(0,c.jsx)(o.Z,{onChange:function(t){return n[e](t.target.value)},value:t,sx:{width:"100%"},InputProps:{startAdornment:(0,c.jsx)(r.Z,{position:"left",children:(0,c.jsx)(a.Z,{children:l[e]})}),endAdornment:d[e]&&(0,c.jsx)(r.Z,{position:"right",children:(0,c.jsx)(a.Z,{children:d[e]})})}})})}))})}},29961:function(t,e,n){var i=n(70885),o=n(91720),r=n(27247),a=n(85029),s=n(63787),c=n(61889),l=n(13400),d=n(53767),u=n(82550),x=n(72791),h=n(24250),p=n(37185),m=n(80184);e.Z=function(t){var e=t.capture,n=t.reset,f=t.update,Z=t.toggle3DPlot,g=(0,x.useState)(!1),v=(0,i.Z)(g,2),j=v[0],S=v[1],$=(0,x.useState)(20),b=(0,i.Z)($,2),y=b[0],P=b[1];return(0,x.useEffect)((function(){f({thickness:y/20+.1})}),[y,f]),(0,m.jsxs)(c.ZP,{sx:{direction:"rtl"},container:!0,direction:"row",children:[(0,m.jsxs)(c.ZP,{md:10,sm:8,xs:6,sx:{direction:"rtl"},item:!0,children:[Z&&(0,m.jsx)(l.Z,{color:"secondary","aria-label":"capture graph",component:"span",onClick:function(){S(!j),Z()},children:j?(0,m.jsx)(p.Z,{}):(0,m.jsx)(h.Z,{})}),e&&(0,m.jsx)(l.Z,{color:"secondary","aria-label":"capture graph",component:"span",onClick:e,children:(0,m.jsx)(o.Z,{})}),n&&(0,m.jsx)(l.Z,{color:"secondary","aria-label":"capture graph",component:"span",onClick:n,children:(0,m.jsx)(r.Z,{})})]}),(0,m.jsx)(c.ZP,{md:2,sm:4,xs:6,item:!0,children:(0,m.jsxs)(d.Z,{spacing:2,direction:"row",sx:{mt:.5,direction:"ltr"},alignItems:"center",children:[(0,m.jsx)(a.Z,{}),(0,m.jsx)(u.ZP,{"aria-label":"Volume",value:y,onChange:function(t,e){return P(e)}}),(0,m.jsx)(s.Z,{})]})})]})}},12288:function(t,e,n){n(72791);var i=n(68286),o=n(80184);e.Z=function(t){var e=t.traces,n=t.title,r=(t.width,t.height),a=void 0===r?500:r,s=t.logX,c=t.hideX,l=t.hideY,d=t.yRange,u=t.hideLegends;return(0,o.jsx)(i.Z,{style:{textAlign:"center"},data:e,layout:{showlegend:!u,margin:{t:30,l:30,r:20,b:30},xaxis:{rangemode:"tozero",zeroline:!0,type:s?"log":"dec",visible:!c},yaxis:{rangemode:"tozero",zeroline:!0,visible:!l,range:d},height:a,title:n,hoverlabel:{align:"auto",boxmode:"overlay",font:{color:"#000000FF"}},legend:{orientation:"h"}}})}},8577:function(t,e,n){n.r(e),n.d(e,{default:function(){return _}});var i=n(42982),o=n(70885),r=n(71598),a=n(20890),s=n(61889),c=n(68383),l=(n(59416),n(65773)),d=n(80184),u=function(){return(0,d.jsx)(r.Z,{title:"\u062a\u0627\u0628\u0639 \u062a\u0628\u062f\u06cc\u0644 \u0645\u0631\u062a\u0628\u0647 \u06cc\u06a9",darkBorder:!0,sx:{direction:"rtl"},children:(0,d.jsxs)(a.Z,{children:[(0,d.jsx)(s.ZP,{className:"lecture-text",item:!0,children:(0,d.jsx)("p",{children:"\xa0 \xa0 \xa0 \xa0 \u0627\u06cc\u0646 \u062a\u0648\u0627\u0628\u0639 \u062a\u0628\u062f\u06cc\u0644 \u0628\u0647 \u0641\u0631\u0645 \u0632\u06cc\u0631 \u0645\u06cc \u0628\u0627\u0634\u0646\u062f:"})}),(0,d.jsx)(s.ZP,{item:!0,children:(0,d.jsx)(l.Z,{children:"$$G(s) = \\frac{k}{s + a}$$"})}),(0,d.jsxs)(s.ZP,{className:"lecture-text",item:!0,children:[(0,d.jsx)("h1",{style:{marginTop:"5%",marginBottom:"3%"},children:"\xa0\u067e\u0627\u0633\u062e \u062d\u0627\u0644\u062a \u0645\u0627\u0646\u062f\u06af\u0627\u0631"}),(0,d.jsx)("p",{children:"\xa0 \xa0 \xa0 \xa0 \u062f\u06cc\u0627\u06af\u0631\u0627\u0645 \u06cc\u06a9 \u0633\u06cc\u0633\u062a\u0645 LTI \u0633\u0627\u062f\u0647 \u0628\u0635\u0648\u0631\u062a \u0632\u06cc\u0631 \u0645\u06cc \u0628\u0627\u0634\u062f:"})]}),(0,d.jsx)(s.ZP,{item:!0,children:(0,d.jsx)("img",{className:"lecture-image",src:c,alt:"\u0628\u0627\u0631\u06af\u0630\u0627\u0631\u06cc \u062a\u0635\u0648\u06cc\u0631 \u0628\u0627 \u0645\u0634\u06a9\u0644 \u0645\u0648\u0627\u062c\u0647 \u0634\u062f"})}),(0,d.jsx)(s.ZP,{style:{fontSize:"20px"},item:!0,children:(0,d.jsx)(l.Z,{children:"$$c(t) = c_{tr}(t) + c_{ss}(t)$$"})}),(0,d.jsx)(s.ZP,{style:{fontSize:"20px"},item:!0,children:(0,d.jsx)(l.Z,{children:"$$\\begin{cases} \\lim\\limits_{t \\to \\infty}c_{tr}(t) = 0 \\\\ \\lim\\limits_{t \\to \\infty}c_{ss}(t) = c_{ss} \\end{cases} \\rightarrow c_{ss} = \\lim\\limits_{t \\to \\infty}c(t)$$"})}),(0,d.jsx)(s.ZP,{className:"lecture-text",item:!0,children:(0,d.jsx)("p",{children:"\xa0 \xa0 \xa0 \xa0 \u0646\u06a9\u062a\u0647:\u200c\u0637\u0628\u0642 \u0642\u0636\u06cc\u0647 \u0645\u0642\u062f\u0627\u0631 \u0646\u0647\u0627\u06cc\u06cc \u062f\u0627\u0631\u06cc\u0645:"})}),(0,d.jsx)(s.ZP,{style:{fontSize:"20px"},item:!0,children:(0,d.jsx)(l.Z,{children:"$$c_{ss} = \\lim\\limits_{t \\to \\infty}c_{ss}(t) = \\lim\\limits_{s \\to 0}sC(s)$$"})}),(0,d.jsx)(s.ZP,{sx:{mt:1},item:!0,children:(0,d.jsxs)(r.Z,{children:[(0,d.jsxs)(s.ZP,{className:"lecture-text",item:!0,children:[(0,d.jsx)("h1",{style:{marginTop:"5%",marginBottom:"3%"},children:"\xa0 \u067e\u0627\u0633\u062e \u067e\u0644\u0647 \u0648\u0627\u062d\u062f"}),(0,d.jsx)("p",{children:"\xa0 \xa0 \xa0 \xa0 \u062d\u0627\u0644 \u067e\u0627\u0633\u062e \u062d\u0627\u0644\u062a \u0645\u0627\u0646\u062f\u06af\u0627\u0631 \u0628\u0647 \u0648\u0631\u0648\u062f\u06cc \u067e\u0644\u0647 \u0648\u0627\u062d\u062f \u0631\u0627 \u0628\u0631\u0627\u06cc \u0633\u06cc\u0633\u062a\u0645 \u0645\u0630\u06a9\u0648\u0631 \u0631\u0627 \u0645\u062d\u0627\u0633\u0628\u0647 \u0645\u06cc \u06a9\u0646\u06cc\u0645:"})]}),(0,d.jsx)(s.ZP,{style:{fontSize:"20px"},item:!0,children:(0,d.jsx)(l.Z,{children:"$$r(t) = u(t) \\rightarrow R(s) = \\frac{1}{s}$$"})}),(0,d.jsx)(s.ZP,{style:{fontSize:"20px"},item:!0,children:(0,d.jsx)(l.Z,{children:"$$C(s) = G(s)R(s) = \\frac{k}{s(s + 1)}$$"})}),(0,d.jsx)(s.ZP,{style:{fontSize:"20px"},item:!0,children:(0,d.jsx)(l.Z,{children:"$$c(t) = (\\frac{k}{a} - \\frac{k}{a}e^{-at})u(t)$$"})}),(0,d.jsx)(s.ZP,{className:"lecture-text",item:!0,children:(0,d.jsx)("p",{children:"\xa0 \xa0 \xa0 \xa0 \u062f\u0631 \u0646\u062a\u06cc\u062c\u0647 \u0645\u0642\u062f\u0627\u0631 \u062d\u0627\u0644\u062a \u0645\u0627\u0646\u062f\u06af\u0627\u0631 \u0633\u06cc\u0633\u062a\u0645 \u0639\u0628\u0627\u0631\u062a \u0627\u0633\u062a \u0627\u0632:"})}),(0,d.jsx)(s.ZP,{style:{fontSize:"20px"},item:!0,children:(0,d.jsx)(l.Z,{children:"$$c_{ss} = \\lim\\limits_{s \\to 0}sC(s) = \\lim\\limits_{s \\to 0}\\frac{k}{s + a} = \\frac{k}{a}$$"})})]})}),(0,d.jsx)(s.ZP,{sx:{mt:1},item:!0,children:(0,d.jsxs)(r.Z,{children:[(0,d.jsxs)(s.ZP,{className:"lecture-text",item:!0,children:[(0,d.jsx)("h1",{style:{marginTop:"5%",marginBottom:"3%"},children:"\xa0 \u067e\u0627\u0633\u062e \u0634\u06cc\u0628 \u0648\u0627\u062d\u062f"}),(0,d.jsx)("p",{children:"\xa0 \xa0 \xa0 \xa0 \u062d\u0627\u0644 \u067e\u0627\u0633\u062e \u062d\u0627\u0644\u062a \u0645\u0627\u0646\u062f\u06af\u0627\u0631 \u0628\u0647 \u0648\u0631\u0648\u062f\u06cc \u0634\u06cc\u06cc\u0628 \u0648\u0627\u062d\u062f \u0631\u0627 \u0628\u0631\u0627\u06cc \u0633\u06cc\u0633\u062a\u0645 \u0645\u0630\u06a9\u0648\u0631 \u0631\u0627 \u0645\u062d\u0627\u0633\u0628\u0647 \u0645\u06cc \u06a9\u0646\u06cc\u0645:"})]}),(0,d.jsx)(s.ZP,{style:{fontSize:"20px"},item:!0,children:(0,d.jsx)(l.Z,{children:"$$r(t) = tu(t) \\rightarrow R(s) = \\frac{1}{s^2}$$"})}),(0,d.jsx)(s.ZP,{style:{fontSize:"20px"},item:!0,children:(0,d.jsx)(l.Z,{children:"$$C(s) = G(s)R(s) = \\frac{k}{s^2(s + 1)}$$"})}),(0,d.jsx)(s.ZP,{style:{fontSize:"20px"},item:!0,children:(0,d.jsx)(l.Z,{children:"$$c(t) = \\frac{k}{a}(t - \\frac{1}{a})u(t) + \\frac{k}{a^2}e^{-at}u(t)$$"})}),(0,d.jsx)(s.ZP,{className:"lecture-text",item:!0,children:(0,d.jsx)("p",{children:"\xa0 \xa0 \xa0 \xa0 \u062f\u0631 \u0646\u062a\u06cc\u062c\u0647 \u0645\u0642\u062f\u0627\u0631 \u062d\u0627\u0644\u062a \u0645\u0627\u0646\u062f\u06af\u0627\u0631 \u0633\u06cc\u0633\u062a\u0645 \u0639\u0628\u0627\u0631\u062a \u0627\u0633\u062a \u0627\u0632:"})}),(0,d.jsx)(s.ZP,{style:{fontSize:"20px"},item:!0,children:(0,d.jsx)(l.Z,{children:"$$c_{ss} = \\lim\\limits_{s \\to 0}sC(s) = \\lim\\limits_{s \\to 0}\\frac{k}{s(s + a)} = \\infty$$"})})]})})]})})},x=n(30830),h=n(72791),p=n(29961),m=n(12288),f=n(36151),Z=n(65599),g=n(93554),v=n(91923),j=["$$a = $$","$$k = $$","$$t_i = $$","$$t_f = $$","$$N = $$"],S=[null,null,"$$sec$$","$$sec$$",null],$=function(t){var e=t.k,n=t.a,i=t.$k,o=t.$a,c=t.t_i,l=t.t_f,u=t.$t_i,x=t.$t_f,h=t.inputSignal,p=t.$inputSignal,m=t.N,$=t.$N;return(0,d.jsxs)(r.Z,{darkBorder:!0,title:"\u067e\u0627\u0631\u0627\u0645\u062a\u0631\u0647\u0627",sx:{direction:"ltr",textAlign:"right",height:"100%"},children:[(0,d.jsxs)(s.ZP,{xs:12,container:!0,children:[(0,d.jsx)(s.ZP,{xs:6,sx:{pr:1,pb:1},item:!0,children:(0,d.jsx)(f.Z,{onClick:function(){return p(0)},style:{width:"100%",textTransform:"none"},variant:0===h?"contained":"outlined",children:"\u067e\u0644\u0647"})}),(0,d.jsx)(s.ZP,{sx:{pb:1},xs:6,item:!0,children:(0,d.jsx)(f.Z,{onClick:function(){return p(1)},style:{width:"100%",textTransform:"none"},variant:1===h?"contained":"outlined",children:"\u0631\u0645\u067e"})})]}),(0,d.jsxs)(s.ZP,{spacing:v.dv,container:!0,direction:"row",children:[(0,d.jsx)(g.Z,{parameters:[n,e,c,l,m],setters:[o,i,u,x,$],labels:j,units:S}),(0,d.jsxs)(s.ZP,{sx:{mt:1},md:12,sm:4,xs:6,item:!0,children:[(0,d.jsx)(a.Z,{style:{textAlign:"center"},children:"\u0645\u062d\u0644 \u0642\u0637\u0628 \u0631\u0627 \u0627\u0646\u062a\u062e\u0627\u0628 \u06a9\u0646\u06cc\u062f"}),(0,d.jsx)(Z.Z,{point:{x:-n,y:0,select:function(t){t&&o(-t.x)}},options:{pointSize:10,grids:10}})]})]})]})},b=n(96758),y=n(78793),P=function(t){return-1===t?"-":1===t?"":x.ZP.strictPrecisionFormat(t)},z=function(t){return t>0?" + "+x.ZP.strictPrecisionFormat(t):" - "+-1*x.ZP.strictPrecisionFormat(t)},w=function(t){var e="";return t<0?(e+="-",t*=-1):t>0&&(e+="+"),1!==t&&(e+=x.ZP.strictPrecisionFormat(t)),e},k="t",C="c",_=function(){var t=(0,h.useState)(1),e=(0,o.Z)(t,2),n=e[0],c=e[1],f=(0,h.useState)(1),Z=(0,o.Z)(f,2),g=Z[0],j=Z[1],S=(0,h.useState)(0),_=(0,o.Z)(S,2),I=_[0],N=_[1],E=(0,h.useState)(5),R=(0,o.Z)(E,2),M=R[0],T=R[1],F=(0,h.useState)(0),B=(0,o.Z)(F,2),L=B[0],A=B[1],W=(0,h.useState)([]),V=(0,o.Z)(W,2),G=V[0],D=V[1],O=(0,h.useState)([]),q=(0,o.Z)(O,2),X=q[0],U=q[1],Y=(0,h.useState)(null),H=(0,o.Z)(Y,2),J=H[0],K=H[1],Q=(0,h.useState)(1),tt=(0,o.Z)(Q,2),et=tt[0],nt=tt[1],it=(0,h.useState)(!1),ot=(0,o.Z)(it,2),rt=ot[0],at=ot[1],st=(0,h.useState)(!1),ct=(0,o.Z)(st,2),lt=ct[0],dt=ct[1],ut=(0,h.useState)(1e3),xt=(0,o.Z)(ut,2),ht=xt[0],pt=xt[1];(0,h.useEffect)((function(){var t=null;L?(t=x.ZP.LTI.ramp(1,+g,+n),K(function(t,e){return"$$\\begin{cases}G(s) = "+b.Z.Shortcuts.$1(t,-e).toString()+(0!==e?" \\\\ \\\\ c(t) = "+P(t/e)+"(t"+z(-1/e)+")u(t)"+w(t/(e*e))+"e^{"+P(-e)+"t}u(t) ":"} \\\\ \\\\ c(t) = t^2u(t) ")+"\\end{cases}$$"}(+g,+n))):(t=x.ZP.LTI.step(1,+g,+n),K(function(t,e){return"$$\\begin{cases}G(s) = "+b.Z.Shortcuts.$1(t,-e).toString()+(0!==e?" \\\\ \\\\ c(t) = "+P(t/e)+"(1 - e^{"+P(-e)+"t})u(t) ":"} \\\\ \\\\ c(t) = tu(t) ")+"\\end{cases}$$"}(+g,+n)));var e=x.ZP.pointify(t,+I,+M,+ht),i=(0,o.Z)(e,2),r=i[0],a=i[1],s=G.map((function(t,e){var n=null;n=t.inputSignal?x.ZP.LTI.ramp(1,t.k,t.a):x.ZP.LTI.step(1,t.k,t.a);var i=x.ZP.pointify(n,+I,+M,+ht),r=(0,o.Z)(i,2),a=r[0];return{x:a,y:r[1],z:lt?Array(a.length).fill(0):null,line:{width:t.thickness},type:"scatter"+(lt?"3d":""),mode:"lines",name:t.legend}}));-1===G.findIndex((function(t){return t.a===+n&&t.k===+g&&t.inputSignal===L}))&&s.push({x:r,y:a,z:lt?Array(r.length).fill(0):null,line:{width:et},type:"scatter"+(lt?"3d":""),mode:"lines",name:"".concat(C,"(").concat(k,")")}),U(s)}),[n,g,I,M,L,lt,et,G,ht]),(0,h.useEffect)((function(){at(!1)}),[n,g,L]);return(0,d.jsxs)(y.Z,{children:[(0,d.jsx)(s.ZP,{item:!0,spacing:v.dv,children:(0,d.jsx)(a.Z,{children:(0,d.jsx)("h2",{className:"chapter-section-title",children:"\u062a\u0648\u0627\u0628\u0639 \u062a\u0628\u062f\u06cc\u0644 \u0645\u0631\u062a\u0628\u0647 \u06cc\u06a9"})})}),(0,d.jsx)(s.ZP,{item:!0,spacing:v.dv,children:(0,d.jsxs)(s.ZP,{container:!0,direction:"column",spacing:1,children:[(0,d.jsx)(s.ZP,{style:{width:"100%",height:"100%",margin:"auto",direction:"ltr"},item:!0,children:(0,d.jsx)(u,{})}),(0,d.jsx)(s.ZP,{sx:{margin:"auto",width:"100%"},item:!0,children:(0,d.jsx)(r.Z,{sx:{direction:"ltr"},children:(0,d.jsxs)(s.ZP,{id:"formulaBox",sx:{margin:"auto"},container:!0,direction:"row",children:[G.map((function(t,e){var n=null;return n=t.inputSignal?function(t,e,n){return"$$\\begin{cases}G_{"+n+"}(s) = "+b.Z.Shortcuts.$1(t,-e).toString()+(0!==e?" \\\\ \\\\ c_{"+n+"}(t) = "+P(t/e)+"(t"+z(-1/e)+")u(t)"+w(t/(e*e))+"e^{"+P(-e)+"t}u(t) ":"} \\\\ \\\\ c_{"+n+"}(t) = t^2u(t) ")+"\\end{cases}$$"}(t.k,t.a,e+1):function(t,e,n){return"$$\\begin{cases}G_{"+n+"}(s) = "+b.Z.Shortcuts.$1(t,-e).toString()+(0!==e?" \\\\ \\\\ c_{"+n+"}(t) = "+P(t/e)+"(1 - e^{"+P(-e)+"t})u(t)":" \\\\ \\\\ c_{"+n+"}(t) = tu(t)")+"\\end{cases}$$"}(t.k,t.a,e+1),(0,d.jsx)(s.ZP,{style:{fontSize:"18px"},md:6,sm:12,item:!0,children:(0,d.jsx)(l.Z,{children:n})})})),!rt&&(0,d.jsx)(s.ZP,{style:{fontSize:"18px"},md:6,sm:12,children:(0,d.jsx)(l.Z,{children:J})})]})})}),(0,d.jsxs)(s.ZP,{spacing:2,style:{width:"100%",height:"100%",margin:"auto",direction:"ltr"},container:!0,children:[(0,d.jsx)(s.ZP,{md:3,sm:12,xs:12,sx:{marginTop:"1%",width:"100%"},container:!0,children:(0,d.jsx)(s.ZP,{xs:12,children:(0,d.jsx)($,{a:n,k:g,t_i:I,t_f:M,$a:c,$k:j,$t_i:N,$t_f:T,inputSignal:L,$inputSignal:A,N:ht,$N:pt})})}),(0,d.jsxs)(s.ZP,{md:9,sm:12,xs:12,item:!0,children:[(0,d.jsx)(r.Z,{children:(0,d.jsx)(p.Z,{capture:function(){var t=(0,i.Z)(G);-1===t.findIndex((function(t){return t.a===+n&&t.k===+g&&t.inputSignal===L}))&&(t.push({a:+n,k:+g,inputSignal:L,thickness:et,legend:"$$"+C+"_{"+(G.length+1).toString()+"}$$"}),D(t),at(!0))},reset:function(){return D([])},update:function(t){return function(t){t&&nt(t.thickness)}(t)},toggle3DPlot:function(){return dt(!lt)}})}),(0,d.jsx)("hr",{}),(0,d.jsx)(s.ZP,{xs:12,item:!0,children:(0,d.jsx)(r.Z,{children:(0,d.jsx)(m.Z,{title:"\u067e\u0627\u0633\u062e \u067e\u0644\u0647/\u0631\u0645\u067e",traces:X})})})]})]})]})})]})}},78793:function(t,e,n){var i=n(1413),o=n(45987),r=n(72791),a=n(13967),s=n(57621),c=n(9585),l=n(20890),d=n(47924),u=n(39504),x=n(80184),h=["border","boxShadow","children","content","contentClass","contentSX","darkTitle","secondary","shadow","sx","title"],p={"& .MuiCardHeader-action":{mr:0}},m=(0,r.forwardRef)((function(t,e){var n=t.border,r=void 0===n||n,m=t.boxShadow,f=t.children,Z=t.content,g=void 0===Z||Z,v=t.contentClass,j=void 0===v?"":v,S=t.contentSX,$=void 0===S?{}:S,b=t.darkTitle,y=t.secondary,P=t.shadow,z=t.sx,w=void 0===z?{}:z,k=t.title,C=(0,o.Z)(t,h),_=(0,a.Z)();return(0,x.jsxs)(s.Z,(0,i.Z)((0,i.Z)({ref:e},C),{},{sx:(0,i.Z)({overflowY:"auto",border:r?"1px solid":"none",borderColor:_.palette.primary[200]+75,":hover":{boxShadow:m?P||"0 2px 14px 0 rgb(32 40 45 / 8%)":"inherit"}},w),children:[!b&&k&&(0,x.jsx)(c.Z,{sx:p,title:k,action:y}),b&&k&&(0,x.jsx)(c.Z,{sx:p,title:(0,x.jsx)(l.Z,{variant:"h3",children:k}),action:y}),k&&(0,x.jsx)(d.Z,{}),g&&(0,x.jsx)(u.Z,{sx:$,className:j,children:f}),!g&&f]}))}));e.Z=m},36151:function(t,e,n){n.d(e,{Z:function(){return P}});var i=n(4942),o=n(63366),r=n(87462),a=n(72791),s=(n(52007),n(28182)),c=n(35735),l=n(90767),d=n(12065),u=n(47630),x=n(93736),h=n(23701),p=n(14036),m=n(95159);function f(t){return(0,m.Z)("MuiButton",t)}var Z=(0,n(30208).Z)("MuiButton",["root","text","textInherit","textPrimary","textSecondary","outlined","outlinedInherit","outlinedPrimary","outlinedSecondary","contained","containedInherit","containedPrimary","containedSecondary","disableElevation","focusVisible","disabled","colorInherit","textSizeSmall","textSizeMedium","textSizeLarge","outlinedSizeSmall","outlinedSizeMedium","outlinedSizeLarge","containedSizeSmall","containedSizeMedium","containedSizeLarge","sizeMedium","sizeSmall","sizeLarge","fullWidth","startIcon","endIcon","iconSizeSmall","iconSizeMedium","iconSizeLarge"]);var g=a.createContext({}),v=n(80184),j=["children","color","component","className","disabled","disableElevation","disableFocusRipple","endIcon","focusVisibleClassName","fullWidth","size","startIcon","type","variant"],S=function(t){return(0,r.Z)({},"small"===t.size&&{"& > *:nth-of-type(1)":{fontSize:18}},"medium"===t.size&&{"& > *:nth-of-type(1)":{fontSize:20}},"large"===t.size&&{"& > *:nth-of-type(1)":{fontSize:22}})},$=(0,u.ZP)(h.Z,{shouldForwardProp:function(t){return(0,u.FO)(t)||"classes"===t},name:"MuiButton",slot:"Root",overridesResolver:function(t,e){var n=t.ownerState;return[e.root,e[n.variant],e["".concat(n.variant).concat((0,p.Z)(n.color))],e["size".concat((0,p.Z)(n.size))],e["".concat(n.variant,"Size").concat((0,p.Z)(n.size))],"inherit"===n.color&&e.colorInherit,n.disableElevation&&e.disableElevation,n.fullWidth&&e.fullWidth]}})((function(t){var e,n=t.theme,o=t.ownerState;return(0,r.Z)({},n.typography.button,(e={minWidth:64,padding:"6px 16px",borderRadius:n.shape.borderRadius,transition:n.transitions.create(["background-color","box-shadow","border-color","color"],{duration:n.transitions.duration.short}),"&:hover":(0,r.Z)({textDecoration:"none",backgroundColor:(0,d.Fq)(n.palette.text.primary,n.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},"text"===o.variant&&"inherit"!==o.color&&{backgroundColor:(0,d.Fq)(n.palette[o.color].main,n.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},"outlined"===o.variant&&"inherit"!==o.color&&{border:"1px solid ".concat(n.palette[o.color].main),backgroundColor:(0,d.Fq)(n.palette[o.color].main,n.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},"contained"===o.variant&&{backgroundColor:n.palette.grey.A100,boxShadow:n.shadows[4],"@media (hover: none)":{boxShadow:n.shadows[2],backgroundColor:n.palette.grey[300]}},"contained"===o.variant&&"inherit"!==o.color&&{backgroundColor:n.palette[o.color].dark,"@media (hover: none)":{backgroundColor:n.palette[o.color].main}}),"&:active":(0,r.Z)({},"contained"===o.variant&&{boxShadow:n.shadows[8]})},(0,i.Z)(e,"&.".concat(Z.focusVisible),(0,r.Z)({},"contained"===o.variant&&{boxShadow:n.shadows[6]})),(0,i.Z)(e,"&.".concat(Z.disabled),(0,r.Z)({color:n.palette.action.disabled},"outlined"===o.variant&&{border:"1px solid ".concat(n.palette.action.disabledBackground)},"outlined"===o.variant&&"secondary"===o.color&&{border:"1px solid ".concat(n.palette.action.disabled)},"contained"===o.variant&&{color:n.palette.action.disabled,boxShadow:n.shadows[0],backgroundColor:n.palette.action.disabledBackground})),e),"text"===o.variant&&{padding:"6px 8px"},"text"===o.variant&&"inherit"!==o.color&&{color:n.palette[o.color].main},"outlined"===o.variant&&{padding:"5px 15px",border:"1px solid ".concat("light"===n.palette.mode?"rgba(0, 0, 0, 0.23)":"rgba(255, 255, 255, 0.23)")},"outlined"===o.variant&&"inherit"!==o.color&&{color:n.palette[o.color].main,border:"1px solid ".concat((0,d.Fq)(n.palette[o.color].main,.5))},"contained"===o.variant&&{color:n.palette.getContrastText(n.palette.grey[300]),backgroundColor:n.palette.grey[300],boxShadow:n.shadows[2]},"contained"===o.variant&&"inherit"!==o.color&&{color:n.palette[o.color].contrastText,backgroundColor:n.palette[o.color].main},"inherit"===o.color&&{color:"inherit",borderColor:"currentColor"},"small"===o.size&&"text"===o.variant&&{padding:"4px 5px",fontSize:n.typography.pxToRem(13)},"large"===o.size&&"text"===o.variant&&{padding:"8px 11px",fontSize:n.typography.pxToRem(15)},"small"===o.size&&"outlined"===o.variant&&{padding:"3px 9px",fontSize:n.typography.pxToRem(13)},"large"===o.size&&"outlined"===o.variant&&{padding:"7px 21px",fontSize:n.typography.pxToRem(15)},"small"===o.size&&"contained"===o.variant&&{padding:"4px 10px",fontSize:n.typography.pxToRem(13)},"large"===o.size&&"contained"===o.variant&&{padding:"8px 22px",fontSize:n.typography.pxToRem(15)},o.fullWidth&&{width:"100%"})}),(function(t){var e;return t.ownerState.disableElevation&&(e={boxShadow:"none","&:hover":{boxShadow:"none"}},(0,i.Z)(e,"&.".concat(Z.focusVisible),{boxShadow:"none"}),(0,i.Z)(e,"&:active",{boxShadow:"none"}),(0,i.Z)(e,"&.".concat(Z.disabled),{boxShadow:"none"}),e)})),b=(0,u.ZP)("span",{name:"MuiButton",slot:"StartIcon",overridesResolver:function(t,e){var n=t.ownerState;return[e.startIcon,e["iconSize".concat((0,p.Z)(n.size))]]}})((function(t){var e=t.ownerState;return(0,r.Z)({display:"inherit",marginRight:8,marginLeft:-4},"small"===e.size&&{marginLeft:-2},S(e))})),y=(0,u.ZP)("span",{name:"MuiButton",slot:"EndIcon",overridesResolver:function(t,e){var n=t.ownerState;return[e.endIcon,e["iconSize".concat((0,p.Z)(n.size))]]}})((function(t){var e=t.ownerState;return(0,r.Z)({display:"inherit",marginRight:-4,marginLeft:8},"small"===e.size&&{marginRight:-2},S(e))})),P=a.forwardRef((function(t,e){var n=a.useContext(g),i=(0,c.Z)(n,t),d=(0,x.Z)({props:i,name:"MuiButton"}),u=d.children,h=d.color,m=void 0===h?"primary":h,Z=d.component,S=void 0===Z?"button":Z,P=d.className,z=d.disabled,w=void 0!==z&&z,k=d.disableElevation,C=void 0!==k&&k,_=d.disableFocusRipple,I=void 0!==_&&_,N=d.endIcon,E=d.focusVisibleClassName,R=d.fullWidth,M=void 0!==R&&R,T=d.size,F=void 0===T?"medium":T,B=d.startIcon,L=d.type,A=d.variant,W=void 0===A?"text":A,V=(0,o.Z)(d,j),G=(0,r.Z)({},d,{color:m,component:S,disabled:w,disableElevation:C,disableFocusRipple:I,fullWidth:M,size:F,type:L,variant:W}),D=function(t){var e=t.color,n=t.disableElevation,i=t.fullWidth,o=t.size,a=t.variant,s=t.classes,c={root:["root",a,"".concat(a).concat((0,p.Z)(e)),"size".concat((0,p.Z)(o)),"".concat(a,"Size").concat((0,p.Z)(o)),"inherit"===e&&"colorInherit",n&&"disableElevation",i&&"fullWidth"],label:["label"],startIcon:["startIcon","iconSize".concat((0,p.Z)(o))],endIcon:["endIcon","iconSize".concat((0,p.Z)(o))]},d=(0,l.Z)(c,f,s);return(0,r.Z)({},s,d)}(G),O=B&&(0,v.jsx)(b,{className:D.startIcon,ownerState:G,children:B}),q=N&&(0,v.jsx)(y,{className:D.endIcon,ownerState:G,children:N});return(0,v.jsxs)($,(0,r.Z)({ownerState:G,className:(0,s.Z)(P,n.className),component:S,disabled:w,focusRipple:!I,focusVisibleClassName:(0,s.Z)(D.focusVisible,E),ref:e,type:L},V,{classes:D,children:[O,u,q]}))}))},54367:function(){},59416:function(){},68383:function(t,e,n){t.exports=n.p+"static/media/simple_lti_system.15ca1aa3fb76230afbf2.png"}}]);
//# sourceMappingURL=577.49eee667.chunk.js.map
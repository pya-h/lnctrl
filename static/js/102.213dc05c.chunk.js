"use strict";(self.webpackChunklnctrl=self.webpackChunklnctrl||[]).push([[102],{14102:function(e,t,r){r.r(t),r.d(t,{default:function(){return b}});var n=r(15861),i=r(70885),s=r(87757),a=r.n(s),c=r(71598),o=r(61889),l=(r(59416),r(65773)),d=r(91923),u=r(5913),x=r(80184),m="$$ t_{pk} = \\frac{k\\pi}{\\omega_n \\sqrt{1 - \\zeta^2}} = \\frac{k\\pi}{\\omega_d} "+(0,u.fr)(3)+" k = 1, 2, 3, ...\\\\ t_{rise} = t_p = \\frac{\\pi}{\\omega_d} $$",h=function(){return(0,x.jsxs)(c.Z,{title:"\u0637\u0631\u0627\u062d\u06cc \u0633\u06cc\u0633\u062a\u0645 \u0627\u0632 \u0637\u0631\u06cc\u0642 \u0645\u0634\u062e\u0635\u0627\u062a \u0645\u06cc\u0631\u0627\u06cc\u06cc",darkBorder:!0,sx:{direction:"rtl"},spacing:d.dv,children:[(0,x.jsx)(o.ZP,{className:"lecture-text",style:{fontSize:"20px"},item:!0,children:(0,x.jsx)("p",{children:"\xa0 \xa0 \xa0 \xa0 \u0632\u0645\u0627\u0646 \u0627\u0648\u062c (Rise Time)"})}),(0,x.jsx)(o.ZP,{style:{fontSize:"20px"},item:!0,children:(0,x.jsx)(l.Z,{children:m})}),(0,x.jsx)(o.ZP,{className:"lecture-text",style:{fontSize:"20px"},item:!0,children:(0,x.jsx)("p",{children:"\xa0 \xa0 \xa0 \xa0 \u0628\u0627\u0644\u0627\u0632\u062f\u06af\u06cc (Overshoot)"})}),(0,x.jsx)(o.ZP,{style:{fontSize:"20px"},item:!0,children:(0,x.jsx)(l.Z,{children:"$$M_p = e^{\\frac{-\\zeta \\pi}{\\sqrt{1 - \\zeta^2}}} = e ^ {-\\pi cot\\theta} \\\\\n    \\zeta = \\frac{-\\ln M_p}{\\sqrt{\\pi^2 + \\lgroup \\ln M_p \\rgroup ^ 2}} $$"})})]})},p=r(30830),$=r(72791),Z=r(94447),j=r(36151),g=r(93554),f=r(71479),k=["$$Num = [$$","$$Den = [$$","$$k_{min} = $$","$$k_{max} = $$","$$N = $$"],v=["$$]$$","$$]$$",null,null,null],w=function(e){var t=e.rawNumerator,r=e.rawDenominator,n=e.$rawNumerator,i=e.$rawDenominator,s=e.k_min,a=e.k_max,l=e.$k_min,u=e.$k_max,m=e.updatePlot,h=e.responseTime,p=e.N,$=e.$N;return(0,x.jsx)(c.Z,{darkBorder:!0,title:"\u067e\u0627\u0631\u0627\u0645\u062a\u0631\u0647\u0627",sx:{direction:"ltr",textAlign:"right",height:"100%"},children:(0,x.jsxs)(o.ZP,{spacing:d.dv,container:!0,direction:"row",children:[(0,x.jsx)(g.Z,{parameters:[t,r,s,a,p],setters:[n,i,l,u,$],labels:k,units:v}),(0,x.jsx)(o.ZP,{md:12,sm:4,xs:6,item:!0,children:(0,x.jsx)(j.Z,{onClick:m,style:{width:"100%",textTransform:"none",background:"coral"},variant:"contained",children:"\u0645\u0634\u0627\u0647\u062f\u0647"})}),(0,x.jsx)(o.ZP,{xs:12,sx:{mt:1},item:!0,children:(0,x.jsx)(f.Z,{id:"progressbar"})}),h&&(0,x.jsx)(o.ZP,{xs:12,sx:{mt:1},item:!0,children:(0,x.jsxs)("p",{style:{textAlign:"center",color:"coral"},children:["\u0645\u062f\u062a \u0632\u0645\u0627\u0646 \u0639\u0645\u0644\u06cc\u0627\u062a: ",h," \u062b\u0627\u0646\u06cc\u0647"]})})]})})},P=r(64715),_=r(78793),y=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0;return"$$ "+e.label("G",t)+" $$"},b=function(){var e=(0,$.useState)("1"),t=(0,i.Z)(e,2),r=t[0],s=t[1],m=(0,$.useState)("1 5 12"),j=(0,i.Z)(m,2),g=j[0],f=j[1],k=(0,$.useState)(0),v=(0,i.Z)(k,2),b=v[0],N=v[1],S=(0,$.useState)(50),z=(0,i.Z)(S,2),T=z[0],D=z[1],A=(0,$.useState)({x:[],y:[]}),B=(0,i.Z)(A,2),q=B[0],C=B[1],M=(0,$.useState)(null),R=(0,i.Z)(M,2),E=R[0],G=R[1],I=(0,$.useState)(null),L=(0,i.Z)(I,2),O=L[0],V=L[1],F=(0,$.useState)(null),H=(0,i.Z)(F,2),J=H[0],K=H[1],Q=(0,$.useState)(1e3),U=(0,i.Z)(Q,2),W=U[0],X=U[1];(0,$.useEffect)((function(){G(new P.Z(p.ZP.stringToArray(r),p.ZP.stringToArray(g)))}),[r,g]);var Y=function(){var e=(0,n.Z)(a().mark((function e(){var t,r,s,c,o,l,d;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,!E){e.next=15;break}return t=document.getElementById("progressbar"),r=new Date,e.next=6,E.rootLocus(+b,+T,t,+W);case 6:s=e.sent,c=(0,i.Z)(s,2),o=c[0],l=c[1],d=new Date,V(y(E)),C({x:o,y:l,type:"scatter",mode:"markers",name:"root-locus"}),K((+d-+r)/1e3),setTimeout((0,n.Z)(a().mark((function e(){return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,u.tV)(t,0);case 2:case"end":return e.stop()}}),e)}))),[1e3]);case 15:e.next=20;break;case 17:e.prev=17,e.t0=e.catch(0),console.log(e.t0);case 20:case"end":return e.stop()}}),e,null,[[0,17]])})));return function(){return e.apply(this,arguments)}}();return(0,x.jsxs)(_.Z,{children:[(0,x.jsx)(o.ZP,{item:!0,spacing:d.dv,children:(0,x.jsx)("h2",{className:"chapter-section-title",children:"\u0645\u06a9\u0627\u0646 \u0647\u0646\u062f\u0633\u06cc \u0642\u0637\u0628 \u0647\u0627\u06cc \u0633\u06cc\u0633\u062a\u0645"})}),(0,x.jsx)(o.ZP,{item:!0,spacing:d.dv,children:(0,x.jsxs)(o.ZP,{container:!0,direction:"column",spacing:d.dv,children:[(0,x.jsx)(o.ZP,{style:{width:"100%",height:"100%",margin:"auto",direction:"ltr"},item:!0,children:(0,x.jsx)(h,{})}),(0,x.jsx)(o.ZP,{sx:{margin:"auto",width:"100%"},item:!0,children:(0,x.jsx)(c.Z,{sx:{direction:"ltr"},children:(0,x.jsx)(o.ZP,{id:"formulaBox",sx:{margin:"auto"},container:!0,direction:"row",children:(0,x.jsx)(l.Z,{children:O})})})}),(0,x.jsxs)(o.ZP,{spacing:2,style:{width:"100%",height:"100%",margin:"auto",direction:"ltr"},container:!0,children:[(0,x.jsx)(o.ZP,{md:4,sm:12,xs:12,sx:{marginTop:"1%",width:"100%"},container:!0,children:(0,x.jsx)(o.ZP,{xs:12,children:(0,x.jsx)(w,{rawNumerator:r,rawDenominator:g,k_min:b,k_max:T,$rawNumerator:s,$rawDenominator:f,$k_min:N,$k_max:D,updatePlot:Y,responseTime:J,N:W,$N:X})})}),(0,x.jsxs)(o.ZP,{md:8,sm:12,xs:12,item:!0,children:[(0,x.jsx)(o.ZP,{lg:12,md:12,sm:12,xs:12,item:!0,children:(0,x.jsx)(c.Z,{children:(0,x.jsx)(Z.Z,{title:"\u0645\u06a9\u0627\u0646 \u0647\u0646\u062f\u0633\u06cc",traces:[q]})})}),(0,x.jsx)("hr",{})]})]})]})})]})}},71479:function(e,t,r){var n=r(80184);t.Z=function(e){var t=e.id,r=e.color,i=void 0===r?"white":r,s=e.background,a=void 0===s?"lightgreen":s,c=e.borderRadius,o=void 0===c?"10px":c;return(0,n.jsx)("div",{style:{width:"0%",textAlign:"right",background:a,color:i,borderRadius:o,padding:"1%"},id:t})}},59416:function(){}}]);
//# sourceMappingURL=102.213dc05c.chunk.js.map
"use strict";(self.webpackChunklnctrl=self.webpackChunklnctrl||[]).push([[925],{52378:function(e,t,n){var i=n(70885),r=n(16346),s=n(91720),c=n(27247),a=n(85029),l=n(63787),o=n(61889),d=n(13400),u=n(53767),x=n(82550),h=n(64802),p=n(72791),m=n(25498),Z=n.n(m),f=n(24250),g=n(37185),j=n(80184);t.Z=function(e){var t=e.capture,n=e.graphFileName,m=e.formulaFileName,$=e.reset,_=e.update,v=e.toggle3DPlot,y=(0,p.useState)(!1),P=(0,i.Z)(y,2),S=P[0],b=P[1],k=(0,p.useState)(20),w=(0,i.Z)(k,2),M=w[0],N=w[1];return(0,p.useEffect)((function(){_({thickness:M/20+.1})}),[M,_]),(0,j.jsxs)(o.ZP,{sx:{direction:"rtl"},container:!0,direction:"row",children:[(0,j.jsxs)(o.ZP,{md:10,sm:8,xs:6,sx:{direction:"rtl"},item:!0,children:[v&&(0,j.jsx)(d.Z,{color:"secondary","aria-label":"capture graph",component:"span",onClick:function(){b(!S),v()},children:S?(0,j.jsx)(g.Z,{}):(0,j.jsx)(f.Z,{})})," ",(0,j.jsx)(d.Z,{color:"secondary","aria-label":"capture graph",component:"span",onClick:t,children:(0,j.jsx)(s.Z,{})}),(0,j.jsx)(d.Z,{color:"secondary","aria-label":"download graph",component:"span",onClick:function(){var e=document.getElementById("graphBox"),t=document.createElement("canvas");t.width=e.width,t.height=e.height;var i=t.getContext("2d");i.fillStyle="white",i.fillRect(0,0,e.width,e.height),i.drawImage(e,0,0),t.toBlob((function(e){(0,h.saveAs)(e,n)})),Z()(document.getElementById("formulaBox")).then((function(e){e.toBlob((function(e){(0,h.saveAs)(e,m)}))}))},children:(0,j.jsx)(r.Z,{})}),(0,j.jsx)(d.Z,{color:"secondary","aria-label":"capture graph",component:"span",onClick:$,children:(0,j.jsx)(c.Z,{})})]}),(0,j.jsx)(o.ZP,{md:2,sm:4,xs:6,item:!0,children:(0,j.jsxs)(u.Z,{spacing:2,direction:"row",sx:{mt:.5,direction:"ltr"},alignItems:"center",children:[(0,j.jsx)(a.Z,{}),(0,j.jsx)(x.ZP,{"aria-label":"Volume",value:M,onChange:function(e,t){return N(t)}}),(0,j.jsx)(l.Z,{})]})})]})}},48725:function(e,t,n){n.r(t),n.d(t,{default:function(){return w}});var i=n(42982),r=n(70885),s=n(71598),c=n(61889),a=(n(59416),n(65773)),l=n(91923),o=n(5913),d=n(80184),u="$$ t_{pk} = \\frac{k\\pi}{\\omega_n \\sqrt{1 - \\zeta^2}} = \\frac{k\\pi}{\\omega_d} "+(0,o.fr)(3)+" k = 1, 2, 3, ...\\\\ t_{rise} = t_p = \\frac{\\pi}{\\omega_d} $$",x=function(){return(0,d.jsxs)(s.Z,{title:"\u0637\u0631\u0627\u062d\u06cc \u0633\u06cc\u0633\u062a\u0645 \u0627\u0632 \u0637\u0631\u06cc\u0642 \u0645\u0634\u062e\u0635\u0627\u062a \u0645\u06cc\u0631\u0627\u06cc\u06cc",darkBorder:!0,sx:{direction:"rtl"},spacing:l.dv,children:[(0,d.jsx)(c.ZP,{className:"lecture-text",style:{fontSize:"20px"},item:!0,children:(0,d.jsx)("p",{children:"\xa0 \xa0 \xa0 \xa0 \u0632\u0645\u0627\u0646 \u0627\u0648\u062c (Rise Time)"})}),(0,d.jsx)(c.ZP,{style:{fontSize:"20px"},item:!0,children:(0,d.jsx)(a.Z,{children:u})}),(0,d.jsx)(c.ZP,{className:"lecture-text",style:{fontSize:"20px"},item:!0,children:(0,d.jsx)("p",{children:"\xa0 \xa0 \xa0 \xa0 \u0628\u0627\u0644\u0627\u0632\u062f\u06af\u06cc (Overshoot)"})}),(0,d.jsx)(c.ZP,{style:{fontSize:"20px"},item:!0,children:(0,d.jsx)(a.Z,{children:"$$M_p = e^{\\frac{-\\zeta \\pi}{\\sqrt{1 - \\zeta^2}}} = e ^ {-\\pi cot\\theta} \\\\\n    \\zeta = \\frac{-\\ln M_p}{\\sqrt{\\pi^2 + \\lgroup \\ln M_p \\rgroup ^ 2}} $$"})})]})},h=n(3174),p=n(72791),m=n(52378),Z=n(94447),f=n(65599),g=n(93554),j=["$$M_{p} = $$","$$t_{rise} = $$","$$t_i = $$","$$t_f = $$"],$=["%","$$sec$$","$$sec$$","$$sec$$"],_=function(e){var t=e.M_p,n=e.t_rise,i=e.$M_p,r=e.$t_rise,a=e.t_i,l=e.t_f,o=e.$t_i,u=e.$t_f;return(0,d.jsx)(s.Z,{darkBorder:!0,title:"\u067e\u0627\u0631\u0627\u0645\u062a\u0631\u0647\u0627",sx:{direction:"ltr",textAlign:"right",height:"100%"},children:(0,d.jsxs)(c.ZP,{spacing:.6,container:!0,direction:"row",children:[(0,d.jsx)(g.Z,{parameters:[t,n,a,l],setters:[function(e){return e>=0&&i(e)},function(e){return e>=0&&r(e)},o,u],labels:j,units:$}),(0,d.jsxs)(c.ZP,{sx:{mt:1},md:12,sm:4,xs:6,item:!0,children:[(0,d.jsx)("p",{style:{textAlign:"center"},children:"\u0645\u0642\u062f\u0627\u0631 \u067e\u0627\u0631\u0627\u0645\u062a\u0631\u0647\u0627 \u0631\u0627 \u0627\u0632 \u0627\u06cc\u0646\u062c\u0627 \u0647\u0645 \u0645\u06cc \u062a\u0648\u0627\u0646\u06cc\u062f \u062a\u063a\u06cc\u06cc\u0631 \u062f\u0647\u06cc\u062f"}),(0,d.jsx)(f.Z,{point:{y:t,x:0,select:function(e){var t=e.y;t&&t>=0&&i(t)}},extra:{y:0,x:n,select:function(e){var t=e.x;t&&t>=0&&r(t)}},options:{pointSize:10,grids:1}})]})]})})},v=n(64715),y=n(3521),P=n(78793),S=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:e.step(),n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:void 0;return"$$\\begin{cases} "+e.label("G",n)+" \\\\ \\\\ "+t.label("c",n)+"\\end{cases}$$"},b="t",k="c",w=function(){var e=(0,p.useState)(1),t=(0,r.Z)(e,2),n=t[0],o=t[1],u=(0,p.useState)(1),f=(0,r.Z)(u,2),g=f[0],j=f[1],$=(0,p.useState)(0),w=(0,r.Z)($,2),M=w[0],N=w[1],z=(0,p.useState)(5),C=(0,r.Z)(z,2),B=C[0],E=C[1],A=(0,p.useState)([]),I=(0,r.Z)(A,2),q=I[0],F=I[1],G=(0,p.useState)([]),T=(0,r.Z)(G,2),D=T[0],R=T[1],L=(0,p.useState)(1),O=(0,r.Z)(L,2),V=O[0],W=O[1],H=(0,p.useState)(!1),J=(0,r.Z)(H,2),K=J[0],Q=J[1],U=(0,p.useState)(!1),X=(0,r.Z)(U,2),Y=X[0],ee=X[1],te=(0,p.useState)(null),ne=(0,r.Z)(te,2),ie=ne[0],re=ne[1],se=(0,p.useState)(null),ce=(0,r.Z)(se,2),ae=ce[0],le=ce[1],oe=(0,p.useState)(""),de=(0,r.Z)(oe,2),ue=de[0],xe=de[1],he=(0,p.useState)(null),pe=(0,r.Z)(he,2),me=pe[0],Ze=pe[1];(0,p.useEffect)((function(){var e=v.Z.Specials.$design(Number(g),Number(n)),t=e.step();if(le(e),e){re(t),xe(new y.Z(e));var i=h.ZP.pointify(t.$,Number(M),Number(B)),s=(0,r.Z)(i,2),c=s[0],a=s[1];Ze(S(e));var l=q.map((function(e,t){var n=e.M_p*e.M_p,i=new v.Z([n],[1,2*e.t_rise*e.M_p,n]),s=h.ZP.pointify(i.step().$,Number(M),Number(B)),c=(0,r.Z)(s,2),a=c[0];return{x:a,y:c[1],z:Y?Array(a.length).fill(0):null,line:{width:e.thickness},type:"scatter"+(Y?"3d":""),mode:"lines",name:e.legend}}));-1===q.findIndex((function(e){return n===e.M_p&&g===e.t_rise}))&&l.push({x:c,y:a,z:Y?Array(c.length).fill(0):null,line:{width:V},type:"scatter"+(Y?"3d":""),mode:"lines",name:"".concat(k,"(").concat(b,")")}),R(l)}}),[n,g,M,B,Y,V,q]),(0,p.useEffect)((function(){Q(!1)}),[n,g]);return(0,d.jsxs)(P.Z,{children:[(0,d.jsx)(c.ZP,{item:!0,spacing:l.dv,children:(0,d.jsxs)("h2",{className:"chapter-section-title",children:["\u0637\u0631\u0627\u062d\u06cc \u0633\u06cc\u0633\u062a\u0645 \u0628\u0627 \u0627\u0633\u062a\u0641\u0627\u062f\u0647 \u0627\u0632 \u0645\u0634\u062e\u0635\u0627\u062a \u0645\u06cc\u0631\u0627\u06cc\u06cc \u0633\u06cc\u0633\u062a\u0645"," "]})}),(0,d.jsx)(c.ZP,{item:!0,spacing:l.dv,children:(0,d.jsxs)(c.ZP,{container:!0,direction:"column",spacing:l.dv,children:[(0,d.jsx)(c.ZP,{style:{width:"100%",height:"100%",margin:"auto",direction:"ltr"},item:!0,children:(0,d.jsx)(x,{})}),(0,d.jsx)(c.ZP,{sx:{margin:"auto",width:"100%"},item:!0,children:(0,d.jsx)(s.Z,{sx:{direction:"ltr"},children:(0,d.jsxs)(c.ZP,{id:"formulaBox",sx:{margin:"auto"},container:!0,direction:"row",children:[q instanceof Array&&q.map((function(e,t){var n=S(e.G_s,e.C_t,t+1);return(0,d.jsx)(c.ZP,{style:{fontSize:"18px"},xs:12,item:!0,children:(0,d.jsx)(a.Z,{children:n})})})),!K&&(0,d.jsx)(c.ZP,{style:{fontSize:"18px"},xs:12,children:(0,d.jsx)(a.Z,{children:me})})]})})}),(0,d.jsxs)(c.ZP,{spacing:2,style:{width:"100%",height:"100%",margin:"auto",direction:"ltr"},container:!0,children:[(0,d.jsx)(c.ZP,{md:3,sm:12,xs:12,sx:{marginTop:"1%",width:"100%"},container:!0,children:(0,d.jsx)(c.ZP,{xs:12,children:(0,d.jsx)(_,{M_p:n,t_rise:g,t_i:M,t_f:B,$M_p:o,$t_rise:j,$t_i:N,$t_f:E})})}),(0,d.jsxs)(c.ZP,{md:9,sm:12,xs:12,item:!0,children:[(0,d.jsx)(s.Z,{children:(0,d.jsx)(m.Z,{capture:function(){var e=(0,i.Z)(q);-1===e.findIndex((function(e){return n===e.M_p&&g===e.t_rise}))&&(e.push({M_p:Number(n),t_rise:Number(g),G_s:ae,C_t:ie,thickness:V,legend:"$$"+k+"_{"+(q.length+1).toString()+"}$$"}),F(e),Q(!0))},formulaFileName:"Water Tank Level Equations _ "+(0,i.Z)(q.map((function(e){return e.legend}))).join()+".png",graphFileName:(0,i.Z)(q.map((function(e){return"".concat(e.legend,"{M_p=").concat(e.M_p,"_t_rise=").concat(e.t_rise,"_k=").concat(e.k,"_in=").concat(e.inputSignal?"ramp":"step","}")}))).join(", ")+".png",reset:function(){return F([])},update:function(e){return function(e){e&&W(e.thickness)}(e)},toggle3DPlot:function(){return ee(!Y)}})}),(0,d.jsx)("hr",{}),(0,d.jsx)(c.ZP,{lg:12,md:12,sm:12,xs:12,item:!0,children:(0,d.jsx)(s.Z,{children:(0,d.jsx)(Z.Z,{title:"\u067e\u0627\u0633\u062e \u067e\u0644\u0647",traces:D})})}),(0,d.jsx)("hr",{}),(0,d.jsx)(c.ZP,{lg:12,md:12,sm:12,xs:12,item:!0,children:ue&&(0,d.jsx)(ue.Explain,{})})]})]})]})})]})}}}]);
//# sourceMappingURL=925.e601f209.chunk.js.map
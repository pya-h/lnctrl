"use strict";(self.webpackChunklnctrl=self.webpackChunklnctrl||[]).push([[102],{93554:function(e,t,n){var r=n(61889),i=n(54905),o=n(63466),s=n(65773),a=n(72791),c=n(80184);t.Z=function(e){var t=e.parameters,n=e.setters,l=e.labels,d=e.units;return(0,c.jsx)(a.Fragment,{children:t instanceof Array&&t.map((function(e,t){return(0,c.jsx)(r.ZP,{md:12,sm:4,xs:6,item:!0,children:(0,c.jsx)(i.Z,{onChange:function(e){return n[t](e.target.value)},value:e,sx:{width:"100%"},InputProps:{startAdornment:(0,c.jsx)(o.Z,{position:"left",children:(0,c.jsx)(s.Z,{children:l[t]})}),endAdornment:d[t]&&(0,c.jsx)(o.Z,{position:"right",children:(0,c.jsx)(s.Z,{children:d[t]})})}})})}))})}},12288:function(e,t,n){n(72791);var r=n(68286),i=n(18831),o=n(16030),s=n(80184);t.Z=function(e){var t=e.traces,n=e.title,a=(e.width,e.height),c=void 0===a?500:a,l=e.logX,d=e.hideX,x=e.hideY,u=e.yRange,h=e.hideLegends,m=(0,o.v9)((function(e){return e.customization})),Z=(0,s.jsx)(r.Z,{style:{textAlign:"center"},data:t,layout:{showlegend:!h,margin:{t:30,l:30,r:20,b:30},xaxis:{rangemode:"tozero",zeroline:!0,type:l?"log":"dec",visible:!d},yaxis:{rangemode:"tozero",zeroline:!0,visible:!x,range:u},height:c,title:n,hoverlabel:{align:"auto",boxmode:"overlay",font:{color:"#000000FF"}},legend:{orientation:"h"}}});return m.enableZoom?(0,s.jsx)(i.MapInteractionCSS,{disablePan:!0,children:Z}):Z}},14102:function(e,t,n){n.r(t),n.d(t,{default:function(){return T}});var r=n(15861),i=n(70885),o=n(87757),s=n.n(o),a=n(20890),c=n(61889),l=(n(59416),n(69843)),d=n(61454),x=n(34186),u=n(80184),h=function(){return(0,u.jsx)(x.Z,{title:"\u0645\u06a9\u0627\u0646 \u0647\u0646\u062f\u0633\u06cc \u0641\u0627\u0632 \u062b\u0627\u0628\u062a",border:!0,children:(0,u.jsxs)(a.Z,{children:[(0,u.jsx)(c.ZP,{item:!0,children:(0,u.jsx)("img",{className:"lecture-image",src:l,alt:"\u0628\u0627\u0631\u06af\u0630\u0627\u0631\u06cc \u062a\u0635\u0648\u06cc\u0631 \u0628\u0627 \u0645\u0634\u06a9\u0644 \u0645\u0648\u0627\u062c\u0647 \u0634\u062f"})}),(0,u.jsx)(c.ZP,{item:!0,children:(0,u.jsx)("img",{className:"lecture-image",src:d,alt:"\u0628\u0627\u0631\u06af\u0630\u0627\u0631\u06cc \u062a\u0635\u0648\u06cc\u0631 \u0628\u0627 \u0645\u0634\u06a9\u0644 \u0645\u0648\u0627\u062c\u0647 \u0634\u062f"})})]})})},m=n(84078),Z=n(30830),g=n(72791),p=n(12288),f=n(65773),j=n(36151),v=n(93554),$=n(91923),w=n(71479),b=["$$Num = [$$","$$Den = [$$","$$k_{min} = $$","$$k_{max} = $$","$$N = $$"],y=["$$]$$","$$]$$",null,null,null],k=function(e){var t=e.rawNumerator,n=e.rawDenominator,r=e.$rawNumerator,i=e.$rawDenominator,o=e.k_min,s=e.k_max,l=e.$k_min,d=e.$k_max,x=e.updatePlot,h=e.responseTime,Z=e.N,g=e.$N,p=e.method,f=e.changeMethod;return(0,u.jsxs)(m.Z,{darkBorder:!0,title:"\u067e\u0627\u0631\u0627\u0645\u062a\u0631\u0647\u0627",sx:{direction:"ltr",textAlign:"right",height:"100%"},children:[(0,u.jsx)(c.ZP,{spacing:$.dv,container:!0,direction:"row",children:(0,u.jsx)(v.Z,{parameters:[t,n,o,s,Z],setters:[r,i,l,d,g],labels:b,units:y})}),(0,u.jsxs)(c.ZP,{xs:12,container:!0,children:[(0,u.jsx)(c.ZP,{xs:6,sx:{py:2,pr:1},item:!0,children:(0,u.jsx)(j.Z,{onClick:function(){f("second"),g(200)},style:{width:"100%",textTransform:"none"},variant:"second"===p?"contained":"outlined",children:"\u0631\u0648\u0634 \u062f\u0648\u0645"})}),(0,u.jsx)(c.ZP,{xs:6,sx:{py:2,pl:1},item:!0,children:(0,u.jsx)(j.Z,{onClick:function(){f("first"),g(500)},style:{width:"100%",textTransform:"none"},variant:"first"===p?"contained":"outlined",children:"\u0631\u0648\u0634 \u0627\u0648\u0644"})})]}),(0,u.jsx)(c.ZP,{xs:12,item:!0,children:(0,u.jsx)(j.Z,{onClick:x,style:{width:"100%",textTransform:"none",background:"coral"},variant:"contained",children:"\u0645\u0634\u0627\u0647\u062f\u0647"})}),(0,u.jsx)(c.ZP,{xs:12,sx:{mt:2},item:!0,children:(0,u.jsx)(w.Z,{id:"progressbar"})}),h&&(0,u.jsx)(c.ZP,{xs:12,sx:{mt:2},item:!0,children:(0,u.jsxs)(a.Z,{style:{textAlign:"center",color:"coral"},children:["\u0645\u062f\u062a \u0632\u0645\u0627\u0646 \u0639\u0645\u0644\u06cc\u0627\u062a: ",h," \u062b\u0627\u0646\u06cc\u0647"]})})]})},P=n(92854),S=n(69791),C=n(5913),N=n(381),T=function(){var e=(0,g.useState)("1"),t=(0,i.Z)(e,2),n=t[0],o=t[1],l=(0,g.useState)("1 5 12"),d=(0,i.Z)(l,2),x=d[0],j=d[1],v=(0,g.useState)(-100),w=(0,i.Z)(v,2),b=w[0],y=w[1],T=(0,g.useState)(100),A=(0,i.Z)(T,2),_=A[0],z=A[1],D=(0,g.useState)({x:[],y:[]}),B=(0,i.Z)(D,2),M=B[0],R=B[1],I=(0,g.useState)({x:[],y:[]}),L=(0,i.Z)(I,2),X=L[0],F=L[1],E=(0,g.useState)({x:[],y:[]}),Y=(0,i.Z)(E,2),G=Y[0],H=Y[1],V=(0,g.useState)(null),q=(0,i.Z)(V,2),J=q[0],K=q[1],O=(0,g.useState)(null),Q=(0,i.Z)(O,2),U=Q[0],W=Q[1],ee=(0,g.useState)(null),te=(0,i.Z)(ee,2),ne=te[0],re=te[1],ie=(0,g.useState)("first"),oe=(0,i.Z)(ie,2),se=oe[0],ae=oe[1],ce=(0,g.useState)(1e3),le=(0,i.Z)(ce,2),de=le[0],xe=le[1];(0,g.useEffect)((function(){var e=new P.Z(Z.ZP.stringToArray(n),Z.ZP.stringToArray(x));K(e),W(function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0;return"$$ "+e.label("G",t)+" $$"}(e))}),[n,x]);var ue=function(){var e=(0,r.Z)(s().mark((function e(){var t,n,o,a,c,l,d,x,u,h,m,Z,g,p,f,j,v,$,w;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,!(J instanceof P.Z)){e.next=21;break}return R({x:[],y:[]}),t=new Date,n=J.roots(),o=(0,i.Z)(n,2),a=o[0],c=o[1],l=N.Z.ToCouples(a),d=(0,i.Z)(l,2),x=d[0],u=d[1],F({x:x,y:u,type:"scatter",mode:"markers",marker:{size:10,color:"black"},name:"Zero"}),h=N.Z.ToCouples(c),m=(0,i.Z)(h,2),Z=m[0],g=m[1],H({x:Z,y:g,type:"scatter",mode:"markers",marker:{color:"red",symbol:"x",size:10},name:"Pole"}),p=document.getElementById("progressbar"),e.next=12,("second"===se?J.rootLocus:J.rootsByAlgebriteLocus)(+b,+_,p,+de);case 12:f=e.sent,j=(0,i.Z)(f,2),v=j[0],$=j[1],console.log(v,$),w=new Date,R({x:v,y:$,type:"scatter",mode:"markers",marker:{size:3},name:"Root-Locus"}),re((+w-+t)/1e3),setTimeout((0,r.Z)(s().mark((function e(){return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,C.tV)(p,0);case 2:case"end":return e.stop()}}),e)}))),[1e3]);case 21:e.next=26;break;case 23:e.prev=23,e.t0=e.catch(0),console.log(e.t0);case 26:case"end":return e.stop()}}),e,null,[[0,23]])})));return function(){return e.apply(this,arguments)}}();return(0,u.jsxs)(S.Z,{children:[(0,u.jsx)(c.ZP,{item:!0,spacing:$.dv,children:(0,u.jsx)(a.Z,{children:(0,u.jsx)("h2",{className:"chapter-section-title",children:"\u0645\u06a9\u0627\u0646 \u0647\u0646\u062f\u0633\u06cc \u0642\u0637\u0628 \u0647\u0627\u06cc \u0633\u06cc\u0633\u062a\u0645"})})}),(0,u.jsx)(c.ZP,{item:!0,spacing:$.dv,children:(0,u.jsxs)(c.ZP,{container:!0,direction:"column",spacing:$.dv,children:[(0,u.jsx)(c.ZP,{style:{width:"100%",height:"100%",margin:"auto",direction:"ltr"},item:!0,children:(0,u.jsx)(h,{})}),(0,u.jsx)(c.ZP,{sx:{margin:"auto",width:"100%"},item:!0,children:(0,u.jsx)(m.Z,{children:(0,u.jsx)(c.ZP,{id:"formulaBox",container:!0,direction:"row",children:(0,u.jsx)(f.Z,{style:{margin:"auto"},children:U})})})}),(0,u.jsxs)(c.ZP,{spacing:2,style:{width:"100%",height:"100%",margin:"auto",direction:"ltr"},container:!0,children:[(0,u.jsx)(c.ZP,{md:4,sm:12,xs:12,sx:{marginTop:"1%",width:"100%"},container:!0,children:(0,u.jsx)(c.ZP,{xs:12,children:(0,u.jsx)(k,{rawNumerator:n,rawDenominator:x,k_min:b,k_max:_,$rawNumerator:o,$rawDenominator:j,$k_min:y,$k_max:z,updatePlot:ue,responseTime:ne,N:de,$N:xe,method:se,changeMethod:ae})})}),(0,u.jsx)(c.ZP,{md:8,sm:12,xs:12,item:!0,children:(0,u.jsx)(c.ZP,{xs:12,item:!0,children:(0,u.jsx)(m.Z,{children:(0,u.jsx)(p.Z,{title:"\u0645\u06a9\u0627\u0646 \u0647\u0646\u062f\u0633\u06cc",traces:[M,X,G]})})})})]})]})})]})}},69791:function(e,t,n){var r=n(1413),i=n(45987),o=n(72791),s=n(13967),a=n(57621),c=n(9585),l=n(20890),d=n(47924),x=n(39504),u=n(80184),h=["border","boxShadow","children","content","contentClass","contentSX","darkTitle","secondary","shadow","sx","title"],m={"& .MuiCardHeader-action":{mr:0}},Z=(0,o.forwardRef)((function(e,t){var n=e.border,o=void 0===n||n,Z=e.boxShadow,g=e.children,p=e.content,f=void 0===p||p,j=e.contentClass,v=void 0===j?"":j,$=e.contentSX,w=void 0===$?{}:$,b=e.darkTitle,y=e.secondary,k=e.shadow,P=e.sx,S=void 0===P?{}:P,C=e.title,N=(0,i.Z)(e,h),T=(0,s.Z)();return(0,u.jsxs)(a.Z,(0,r.Z)((0,r.Z)({ref:t},N),{},{sx:(0,r.Z)({overflowY:"auto",border:o?"1px solid":"none",borderColor:T.palette.primary[200]+75,":hover":{boxShadow:Z?k||"0 2px 14px 0 rgb(32 40 45 / 8%)":"inherit"}},S),children:[!b&&C&&(0,u.jsx)(c.Z,{sx:m,title:C,action:y}),b&&C&&(0,u.jsx)(c.Z,{sx:m,title:(0,u.jsx)(l.Z,{variant:"h3",children:C}),action:y}),C&&(0,u.jsx)(d.Z,{}),f&&(0,u.jsx)(x.Z,{sx:w,className:v,children:g}),!f&&g]}))}));t.Z=Z},34186:function(e,t,n){var r=n(84078),i=n(18831),o=n(16030),s=n(80184);t.Z=function(e){var t=e.children,n=e.title,a=e.border,c=(0,o.v9)((function(e){return e.customization}));return(0,s.jsx)(r.Z,{title:n,darkBorder:a,sx:{direction:"rtl"},children:(0,s.jsx)(i.MapInteractionCSS,{disableZoom:!c.enableZoom,children:t})})}},71479:function(e,t,n){var r=n(80184);t.Z=function(e){var t=e.id,n=e.color,i=void 0===n?"white":n,o=e.background,s=void 0===o?"lightgreen":o,a=e.borderRadius,c=void 0===a?"10px":a;return(0,r.jsx)("div",{style:{width:"0%",textAlign:"right",background:s,color:i,borderRadius:c,padding:"1%"},id:t})}},59416:function(){},69843:function(e,t,n){e.exports=n.p+"static/media/part1.c6596e2494e0463f05af.png"},61454:function(e,t,n){e.exports=n.p+"static/media/part2.724b591e28f60998df93.png"}}]);
//# sourceMappingURL=102.360304ff.chunk.js.map
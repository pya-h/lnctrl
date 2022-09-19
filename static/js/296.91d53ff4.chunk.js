"use strict";(self.webpackChunklnctrl=self.webpackChunklnctrl||[]).push([[296],{20394:function(n,t,e){e.d(t,{Z:function(){return h}});var r=e(70885),i=e(42982),a=e(43144),s=e(15671),o=e(75758),l=e(38698),c=e(60136),d=e(29388),u=e(98737),f=e(23197),Z=function(n){(0,c.Z)(e,n);var t=(0,d.Z)(e);function e(){var n,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return(0,s.Z)(this,e),(n=t.call(this,r?"\u0639\u062f\u0645 \u062a\u0637\u0627\u0628\u0642 \u062a\u0639\u062f\u0627\u062f \u0633\u062a\u0648\u0646 \u0647\u0627\u06cc ".concat(r.a," \u0628\u0627 \u062a\u0639\u062f\u0627\u062f \u0633\u0637\u0631\u0647\u0627\u06cc \u0645\u0627\u062a\u0631\u06cc\u0633 ").concat(r.b):"\u0633\u062a\u0648 \u0627\u06cc\u0646 \u062e\u0637\u0627 \u0628\u062f\u0644\u06cc\u0644 \u0636\u0631\u0628 \u062f\u0648 \u0645\u0627\u062a\u0631\u06cc\u0633\u06cc \u0627\u062a\u0641\u0627\u0642 \u0627\u0641\u062a\u0627\u062f\u0647 \u0627\u0633\u062a \u06a9\u0647 \u062f\u0631 \u0622\u0646 \u062a\u0639\u062f\u0627\u062f \u0633\u062a\u0648\u0646 \u0647\u0627\u06cc \u0645\u0627\u062a\u0631\u06cc\u0633 \u0627\u0648\u0644\u06cc \u0628\u0627 \u062a\u0639\u062f\u0627\u062f \u0633\u0637\u0631\u0647\u0627\u06cc \u0645\u0627\u062a\u0631\u06cc\u0633 \u062f\u0648\u0645 \u0628\u0631\u0627\u0628\u0631 \u0646\u06cc\u0633\u062a.!")).describe=function(){return n.message+(n.cause?"\n"+n.cause.toString():"")},n.name="DimensionMismatchError",n.type="Matrix",n.code=f.error_codes.dimension_mismatch,n.cause=r,n}return(0,a.Z)(e)}((0,u.Z)(Error)),x=(0,a.Z)((function n(t){var e=this,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;(0,s.Z)(this,n),this.det=function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:e.M,t=n.length;if(1===t)return n[0];if(2===t)return n[0][0]*n[1][1]-n[0][1]*n[1][0];for(var r=0,a=1,s=function(t){var s=(0,i.Z)(n);s.shift(),s=s.map((function(n){return n.filter((function(n,e){return e!==t}))})),r+=a*n[0][t]*e.det(s),a*=-1},o=0;o<t;o++)s(o);return r},this.adj=function(){var t=e.M.length,r=[];return 2===t&&e.M[0]instanceof Array&&e.M[0].length===t&&((r=[[0,0],[0,0]])[0][1]=-e.M[0][1],r[1][0]=-e.M[1][0],r[0][0]=e.M[1][1],r[1][1]=e.M[0][0]),new n(r)},this.transpose=function(){var t=e.M.length,r=[];if(e.M[0]instanceof Array){var i=e.M[0].length;i>1?r=Array(i).fill(Array(t).fill(0)):1===i&&(r=Array(t).fill(0));for(var a=0;a<t;a++)if(i>1)for(var s=0;s<i;s++)r[a][s]=e.M[s][a];else 1===i&&(r[a]=e.M[a][0])}else{r=Array(t).fill(Array(1).fill(0));for(var o=0;o<t;o++)r[o][0]=e.M[o]}return new n(r)},this.toString=function(){var n=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],t=e.M.length,r="";if(e.M&&e.M instanceof Array){r=n?"\\begin{pmatrix} ":"\\begin{vmatrix}";for(var i=0;i<t;i++){if(e.M[i]&&e.M[i]instanceof Array)for(var a=e.M[i].length,s=0;s<a;s++)r+=e.M[i][s].toString()+(s<a-1?" && ":"");else r+=e.M[i].toString();r+=i<t-1?" \\\\ ":""}r+=n?" \\end{pmatrix}":"\\end{vmatrix}"}else r+=e.M.toString(n);return r},this.at=function(n,t){return e.M[0]instanceof Array&&e.M.length>1?e.M[n][t]:e.M[t]},this.multiply=function(t){var i=n.dimens(e.M),a=(0,r.Z)(i,2),s=a[0],c=a[1],d=n.dimens(t),u=(0,r.Z)(d,2),f=u[0],x=u[1],h=[];if(1===s&&1===c);else if(1===f&&1===x);else{if(c!==f)throw new Z(e.name&&t.name?{a:e.name,b:t.name}:null);if(t instanceof Array&&(t=new n(t)),s>1){h=Array(s).fill(0).map((function(n){return Array(x).fill(0)}));for(var m=0;m<s;m++)for(var v=0;v<c;v++)for(var g=0;g<x;g++){var j=t.at(v,g);e.M[m][v]instanceof o.Z?(h[m][g]instanceof o.Z||(h[m][g]=new l.Poly([h[m][g]])),h[m][g]=h[m][g].add(e.M[m][v].multiply(j))):j instanceof o.Z?(h[m][g]instanceof o.Z||(h[m][g]=new l.Poly([h[m][g]])),h[m][g]=h[m][g].add(j.multiply(e.M[m][v]))):h[m][g]+=e.M[m][v]*j}}else{h=Array(x).fill(0);for(var p=0;p<c;p++)for(var w=0;w<x;w++){var $=t.at(p,w);e.M[p]instanceof o.Z?(h[w]instanceof o.Z||(h[w]=new l.Poly([h[w]])),h[w]=h[w].add(e.M[p].multiply($))):$ instanceof o.Z?(h[w]instanceof o.Z||(h[w]=new l.Poly([h[w]])),h[w]=h[w].add($.multiply(e.M[p]))):h[w]+=e.M[p]*$}}}return new n(h)},this.M=t&&t instanceof Array?(0,i.Z)(t):t,this.name=a}));x.dimens=function(n){var t=n;return t instanceof x&&(t=(0,i.Z)(n.M)),t instanceof Array?t[0]instanceof Array?[t.length,t[0].length]:[1,t.length]:[1,1]};var h=x},23296:function(n,t,e){e.r(t),e.d(t,{default:function(){return _}});e(59416);var r=e(61889),i=e(69791),a=e(91923),s=e(70885),o=e(20890),l=e(65773),c=e(34186),d=e(80184),u=function(){return(0,d.jsx)(c.Z,{title:"\u0645\u0639\u0627\u062f\u0644\u0627\u062a \u0641\u0636\u0627\u06cc \u062d\u0627\u0644\u062a",border:!0,children:(0,d.jsx)(r.ZP,{item:!0,children:(0,d.jsxs)(o.Z,{sx:{px:2},style:{lineHeight:"2.5"},children:["\u0645\u0639\u0627\u062f\u0644\u0627\u062a \u062d\u0627\u0644\u062a \u0648\u062e\u0631\u0648\u062c\u06cc \u0632\u06cc\u0631 \u0631\u0627 \u062f\u0631 \u0646\u0638\u0631 \u0628\u06af\u06cc\u0631\u06cc\u062f:",(0,d.jsx)(l.Z,{style:{fontSize:"18px"},children:"$$\\begin{cases}\\dot{x}(t) = Ax(t) + Bu(t) \\\\ y(t) = Cx(t) + Du(t)\\end{cases}$$"}),"\u0627\u06af\u0631 \u0645\u0639\u0627\u062f\u0644\u0647 \u0627\u0648\u0644 \u0631\u0627 \u0628\u0647 \u0627\u0632\u0627\u06cc \u06cc\u06a9 \u0648\u0631\u0648\u062f\u06cc \u0645\u0639\u06cc\u0646 \u0648 \u0634\u0631\u0627\u06cc\u0637 \u0627\u0648\u0644\u06cc\u0647 \u062f\u0627\u062f\u0647 \u0634\u062f\u0647 \u062d\u0644 \u06a9\u0646\u06cc\u0645 \u067e\u0627\u0633\u062e \u0645\u062a\u063a\u06cc\u0631\u0647\u0627\u06cc \u062d\u0627\u0644\u062a \u0633\u06cc\u0633\u062a\u0645 \u0631\u0627 \u0631\u0627 \u0628\u0647 \u0648\u0631\u0648\u062f\u06cc \u0627\u0639\u0645\u0627\u0644 \u0634\u062f\u0647 \u0628\u0647 \u0633\u06cc\u0633\u062a\u0645 \u0628\u062f\u0633\u062a \u0645\u06cc \u0622\u0648\u0631\u06cc\u0645. \u0628\u0627 \u062c\u0627\u06cc\u06af\u0632\u06cc\u0646\u06cc \u0628\u0631\u062f\u0627\u0631 \u062d\u0627\u0644\u062a \u0645\u062d\u0627\u0633\u0628\u0647 \u0634\u062f\u0647 x(t) \u062f\u0631 \u0631\u0627\u0628\u0637\u0647 \u06cc \u062e\u0631\u0648\u062c\u06cc y(t) \u067e\u0627\u0633\u062e \u0633\u06cc\u0633\u062a\u0645 \u0631\u0627 \u0628\u0647 \u0627\u0632\u0627\u06cc \u0647\u0645\u0627\u0646 \u0648\u0631\u0648\u062f\u06cc \u0648 \u0634\u0631\u0627\u06cc\u0637 \u0627\u0648\u0644\u06cc\u0647 \u0628\u062f\u0633\u062a \u0622\u0648\u0631\u062f\u0647 \u0627\u06cc\u0645.",(0,d.jsx)("br",{}),"[\u0627\u062f\u0627\u0645\u0647 \u0645\u062a\u0646 \u0635\u0641\u062d\u0647 15/41 \u062d\u0644 \u0645\u0639\u0627\u062f\u0644\u0647 \u0628\u0627 \u0627\u0633\u062a\u0641\u0627\u062f\u0647 \u0627\u0632 \u0628\u0633\u0637 \u062a\u06cc\u0644\u0648\u0631]",(0,d.jsx)("h2",{children:"\u0631\u0648\u0634 \u062a\u0628\u062f\u06cc\u0644 \u0644\u0627\u067e\u0644\u0627\u0633 \u062f\u0631 \u062d\u0644 \u0645\u0639\u0627\u062f\u0644\u0647 \u0647\u0645\u06af\u0646 \u062d\u0627\u0644\u062a:"}),(0,d.jsx)(l.Z,{style:{fontSize:"18px"},children:"$$\\dot{x}(t) = Ax(t)$$"}),"\u0628\u0627 \u06af\u0631\u0641\u062a\u0646 \u062a\u0628\u062f\u06cc\u0644 \u0644\u0627\u067e\u0644\u0627\u0633 \u0627\u0632 \u0645\u0639\u0627\u062f\u0644\u0647 \u0641\u0648\u0642 \u062f\u0627\u0631\u06cc\u0645:",(0,d.jsx)(l.Z,{style:{fontSize:"18px"},children:"$$\\begin{cases} sX(s) - x(0) = AX(s) \\\\ \\\\ [sI - A]X(s) = x(0) \\\\ \\\\ X(s) = [sI - A]^{-1} x(0) \\end{cases}$$"}),"\u062d\u0627\u0644 \u0627\u06af\u0631 \u0627\u06cc\u0646 \u0646\u062a\u06cc\u062c\u0647 \u0631\u0627 \u0628\u0627 \u0631\u0627\u0628\u0637\u0647 \u06cc \u0628\u0647 \u062f\u0633\u062a \u0622\u0645\u062f\u0647 \u0627\u0632 \u0631\u0648\u0634 \u0645\u0633\u062a\u0642\u06cc\u0645 \u0645\u0642\u0627\u06cc\u0633\u0647 \u06a9\u0646\u06cc\u0645:",(0,d.jsx)(l.Z,{style:{fontSize:"18px"},children:"$$x(t) = e^{A(t-t_0)}x(t_0)$$"}),(0,d.jsx)(l.Z,{style:{fontSize:"18px"},children:"$$if: t_0 = 0 \\rightarrow x(t) = e^{A(t)}x(0)$$"}),"\u062f\u0631 \u0646\u062a\u06cc\u062c\u0647:",(0,d.jsx)(l.Z,{style:{fontSize:"18px"},children:"$$\\varphi(t) = e^{At} = \\mathscr{L}^{-1}\\{(sI - A)^{-1}\\}$$"})]})})})},f=e(72791),Z=e(84078),x=e(42982),h=e(68870),m=e(54905),v=(e(54367),function(n){var t=n.rows,e=n.columns,i=n.initial,a=n.setter,o=(0,f.useState)((0,x.Z)(i)),l=(0,s.Z)(o,2),c=l[0],u=l[1],Z=12/e;return(0,d.jsx)(h.Z,{component:"form",className:"input-matrix",noValidate:!0,autoComplete:"off",children:Array(t).fill(0).map((function(n,i){return(0,d.jsx)(r.ZP,{container:!0,direction:"row",children:Array(e).fill(0).map((function(n,e){return(0,d.jsx)(r.ZP,{xs:Z,item:!0,children:(0,d.jsx)(m.Z,{sx:{input:{textAlign:"center",p:"1rem"}},style:{padding:"1rem"},variant:"standard",value:t>1?c[i][e]:c[e],onChange:function(n){return function(n,e,r){if(r&&r.target){var i=(0,x.Z)(c);t>1?i[n][e]=+r.target.value:i[e]=+r.target.value,a(i),u(i)}}(i,e,n)}})})}))})}))})}),g=function(n){var t=n.A,e=n.$A,i=n.C,a=n.$C,s=n.x_0,o=n.$x_0;return(0,d.jsx)(Z.Z,{darkBorder:!0,title:"\u067e\u0627\u0631\u0627\u0645\u062a\u0631\u0647\u0627",sx:{direction:"ltr",textAlign:"right",height:"100%",m:0,p:0},children:(0,d.jsxs)(r.ZP,{spacing:1,direction:"row",container:!0,children:[(0,d.jsx)(r.ZP,{xs:12,item:!0,children:(0,d.jsx)(Z.Z,{sx:{direction:"ltr"},children:(0,d.jsx)(r.ZP,{id:"step0",sx:{margin:"auto"},container:!0,direction:"row",children:(0,d.jsx)(l.Z,{children:"$$\\begin{cases} \\dot{x}(t)  = Ax(t) \\\\ \\\\ y(t) = Cx(t) \\end{cases}$$"})})})}),(0,d.jsxs)(r.ZP,{sx:{py:3},spacing:.6,container:!0,children:[(0,d.jsx)(r.ZP,{className:"matrix-left-hand",item:!0,children:(0,d.jsx)(l.Z,{children:"$$A = $$"})}),(0,d.jsx)(r.ZP,{item:!0,children:(0,d.jsx)(v,{rows:2,columns:2,initial:t,setter:function(n){return e(n)}})})]}),(0,d.jsxs)(r.ZP,{spacing:.6,container:!0,children:[(0,d.jsx)(r.ZP,{className:"matrix-left-hand",item:!0,children:(0,d.jsx)(l.Z,{children:"$$C = $$"})}),(0,d.jsx)(r.ZP,{item:!0,children:(0,d.jsx)(v,{rows:1,columns:2,initial:i,setter:function(n){return a(n)}})})]}),(0,d.jsxs)(r.ZP,{spacing:.6,container:!0,children:[(0,d.jsx)(r.ZP,{className:"matrix-left-hand",item:!0,children:(0,d.jsx)(l.Z,{children:"$$x(0) = $$"})}),(0,d.jsx)(r.ZP,{item:!0,children:(0,d.jsx)(v,{rows:2,columns:1,initial:s,setter:function(n){return o(n)}})})]})]})})},j=e(13400),p=e(75758),w=e(20394),$=e(42440),y=e(69053),M=e(30830),S=e(381),A=e(92854),P=e(38698),b=function(n,t,e,r){var i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:r,a=null,s=null;return 0!==n?(a=new A.Z(t,[1,r]).add(new A.Z(e,[1,i])),s=new P.Exp(t,r instanceof p.Z?r.negation():-r).add(new P.Exp(e,i instanceof p.Z?i.negation():-i)),console.log(s.toString(),s)):(a=new A.Z(t,[1,r]).add(new A.Z(e,[1,2*r,Math.pow(r,2)])),s=new P.Exp(t,r instanceof p.Z?r.negation():-r).add(new P.Exp(e,r instanceof p.Z?r.negation():-r,"t",{dot:P.Poly.atn(1,1)}))),[a,s]},C=function(n){var t=n.A,e=n.x_0,i=n.C,a=(0,f.useState)(0),o=(0,s.Z)(a,2),c=o[0],u=o[1],x=(0,f.useState)(""),h=(0,s.Z)(x,2),m=h[0],v=h[1],g=(0,f.useState)(null),A=(0,s.Z)(g,2),C=A[0],z=A[1],_=(0,f.useState)(null),k=(0,s.Z)(_,2),E=k[0],X=k[1],I=(0,f.useState)(""),N=(0,s.Z)(I,2),D=N[0],L=N[1],B=(0,f.useState)(null),T=(0,s.Z)(B,2),H=T[0],K=T[1],F=(0,f.useState)(""),R=(0,s.Z)(F,2),U=R[0],V=R[1],Y=(0,f.useState)(null),q=(0,s.Z)(Y,2),G=q[0],J=q[1],O=(0,f.useState)(""),Q=(0,s.Z)(O,2),W=Q[0],nn=Q[1],tn=(0,f.useState)(""),en=(0,s.Z)(tn,2),rn=en[0],an=en[1],sn=(0,f.useState)([]),on=(0,s.Z)(sn,2),ln=on[0],cn=on[1],dn=(0,f.useState)(null),un=(0,s.Z)(dn,2),fn=un[0],Zn=un[1];return(0,f.useEffect)((function(){var n=new w.Z(t);v(function(n,t){return"$$\\begin{cases} \\dot{x}(t)  = "+new w.Z(n).toString()+" x(t) \\\\ \\\\ x(0) = "+new w.Z(t).toString()+" \\end{cases}$$"}(t,e)),z(new w.Z([[new P.Poly([1,-t[0][0]],"s"),new P.Poly([-t[0][1]],"s")],[new P.Poly([-t[1][0]],"s"),new P.Poly([1,-t[1][1]],"s")]])),X(new P.Poly([1,-(t[0][0]+t[1][1]),n.det()],"s"))}),[t,e]),(0,f.useEffect)((function(){if(C){var n=function(n){var t,e,r,i,a,o,l,c,d=new w.Z(n),u=Math.pow(n[0][0]+n[1][1],2)-4*d.det(),f=null,Z=null;if(u>0){f=(-(n[0][0]+n[1][1])-Math.pow(u,.5))/2,Z=(-(n[0][0]+n[1][1])+Math.pow(u,.5))/2;var x=-n[1][1],h=(x-f)/(Z-f),m=(x-Z)/(f-Z),v=b(u,h,m,f,Z),g=(0,s.Z)(v,2);t=g[0],a=g[1],x=n[0][1];var j=b(u,h=x/(Z-f),m=-h,f,Z),p=(0,s.Z)(j,2);e=p[0],o=p[1],x=n[1][0];var $=b(u,h=x/(Z-f),m=-h,f,Z),y=(0,s.Z)($,2);r=y[0],l=y[1],x=-n[0][0];var M=b(u,h=(x-f)/(Z-f),m=(x-Z)/(f-Z),f,Z),A=(0,s.Z)(M,2);i=A[0],c=A[1]}else if(u){u*=-1;var P=(-n[0][0]+n[1][1])/2,C=Math.pow(u,.5);f=new S.Z(P,C),Z=new S.Z(P,-C);var z=-n[1][1],_=(z-P)/(2*C),k=new S.Z(.5,_),E=new S.Z(.5,-_),X=b(u,k,E,f,Z),I=(0,s.Z)(X,2);t=I[0],a=I[1],_=(z=n[0][1])/(2*C),k=S.Z.jX(_),E=S.Z.jX(-_);var N=b(u,k,E,f,Z),D=(0,s.Z)(N,2);e=D[0],o=D[1],_=(z=n[1][0])/(2*C),k=S.Z.jX(_),E=S.Z.jX(-_);var L=b(u,k,E,f,Z),B=(0,s.Z)(L,2);r=B[0],l=B[1],_=((z=-n[0][0])-P)/(2*C),k=new S.Z(.5,_),E=new S.Z(.5,-_);var T=b(u,k,E,f,Z),H=(0,s.Z)(T,2);i=H[0],c=H[1]}else{f=Z=-(n[0][0]+n[1][1])/2;var K=b(u,1,-n[1][1]-f,f),F=(0,s.Z)(K,2);t=F[0],a=F[1];var R=b(u,0,n[0][1],f),U=(0,s.Z)(R,2);e=U[0],o=U[1];var V=b(u,0,n[1][0],f),Y=(0,s.Z)(V,2);r=Y[0],l=Y[1];var q=b(u,1,-n[0][0]-f,f),G=(0,s.Z)(q,2);i=G[0],c=G[1]}return[f!==Z?[f,Z]:[f],new w.Z([[t,e],[r,i]]),new w.Z([[a,o],[l,c]])]}(t),e=(0,s.Z)(n,3),r=e[0],i=e[1],a=e[2];L(function(n,t,e){return"$$\\begin{cases} sI - A = "+n.toString()+" \\\\ \\\\ |sI - A| = "+t.toString()+" \\\\ \\\\ "+e.map((function(n,t){return"s_{"+(t+1).toString()+"} = "+(n instanceof p.Z?n.toString():M.ZP.strictPrecisionFormat(M.ZP.round(n)))})).join(" , ")+" \\end{cases}$$"}(C,E,r)),K("\\frac{1}{"+E.toString()+"} "+C.adj().toString()),J(i),Zn(a)}}),[C,E,t]),(0,f.useEffect)((function(){H&&G&&G instanceof w.Z&&V(function(n,t){return"$$\\begin{cases} (sI - A)^{-1} = "+n+"\\\\ \\\\ (sI - A)^{-1} = "+t.toString()+" \\end{cases}$$"}(H,G))}),[H,G]),(0,f.useEffect)((function(){if(fn){var n=fn.multiply(e,!0),t=new w.Z(i).multiply(n);nn(function(n){var t=n.toString();return"$$ e^{At} = "+(t.length>250?"\\\\ \\\\":"")+t+" $$"}(fn)),an(function(n,t){return"$$\\begin{cases} \\varphi(t) = e^{At} \\\\ \\\\ x(t) = \\varphi(t)x(0) = "+n.toString()+"\\\\ \\\\ y(t) = \\ Cx(t) = "+t.toString()+" \\end{cases}$$"}(n,t))}}),[fn,e,i]),(0,f.useEffect)((function(){return cn([m,D,U,W,rn])}),[m,D,U,W,rn]),(0,d.jsxs)(r.ZP,{direction:"column",spacing:.5,container:!0,children:[ln instanceof Array&&ln.map((function(n,t){return c>=t&&(0,d.jsx)(r.ZP,{xs:12,item:!0,children:(0,d.jsx)(Z.Z,{sx:3!==t?{direction:"ltr"}:{margin:"auto",fontSize:W.length>210?(18-.7*(M.ZP.precision.get()-4)).toString()+"px":"18px"},children:(0,d.jsx)(r.ZP,{sx:{margin:"auto"},container:!0,children:(0,d.jsx)(r.ZP,{children:(0,d.jsx)(l.Z,{children:n})})})})})})),c<ln.length-1&&(0,d.jsx)(r.ZP,{item:!0,children:(0,d.jsx)(j.Z,{style:{width:"100%"},color:"secondary","aria-label":"previous",component:"span",onClick:function(){return u(c+1)},children:(0,d.jsx)($.Z,{})})}),c>=ln.length-1&&(0,d.jsx)(r.ZP,{item:!0,children:(0,d.jsx)(j.Z,{style:{width:"100%"},color:"secondary","aria-label":"previous",component:"span",onClick:function(){return u(0)},children:(0,d.jsx)(y.Z,{})})})]})},z=function(){var n=(0,f.useState)([[0,1],[-3,-4]]),t=(0,s.Z)(n,2),e=t[0],i=t[1],a=(0,f.useState)([1,0]),o=(0,s.Z)(a,2),l=o[0],c=o[1],Z=(0,f.useState)([[1],[-1]]),x=(0,s.Z)(Z,2),h=x[0],m=x[1];return(0,d.jsxs)(r.ZP,{container:!0,direction:"column",spacing:1,children:[(0,d.jsx)(r.ZP,{style:{width:"100%",height:"100%",margin:"auto",direction:"ltr"},item:!0,children:(0,d.jsx)(u,{})}),(0,d.jsxs)(r.ZP,{spacing:2,style:{width:"100%",height:"100%",margin:"auto",marginTop:"1%",direction:"ltr"},container:!0,children:[(0,d.jsx)(r.ZP,{lg:4,md:12,sm:12,xs:12,item:!0,children:(0,d.jsx)(g,{A:e,$A:i,C:l,$C:c,x_0:h,$x_0:m})}),(0,d.jsx)(r.ZP,{lg:8,md:12,sm:12,xs:12,item:!0,children:(0,d.jsx)(C,{A:e,C:l,x_0:h})})]})]})},_=function(){return(0,d.jsxs)(i.Z,{style:{background:"transparent"},children:[(0,d.jsx)(r.ZP,{item:!0,spacing:a.dv,children:(0,d.jsx)("h2",{className:"chapter-section-title",children:"\u0645\u0639\u0627\u062f\u0644\u0627\u062a \u0641\u0636\u0627\u06cc \u062d\u0627\u0644\u062a"})}),(0,d.jsx)(r.ZP,{item:!0,spacing:a.dv,children:(0,d.jsx)(z,{})})]})}},69791:function(n,t,e){var r=e(1413),i=e(45987),a=e(72791),s=e(13967),o=e(57621),l=e(9585),c=e(20890),d=e(47924),u=e(39504),f=e(80184),Z=["border","boxShadow","children","content","contentClass","contentSX","darkTitle","secondary","shadow","sx","title"],x={"& .MuiCardHeader-action":{mr:0}},h=(0,a.forwardRef)((function(n,t){var e=n.border,a=void 0===e||e,h=n.boxShadow,m=n.children,v=n.content,g=void 0===v||v,j=n.contentClass,p=void 0===j?"":j,w=n.contentSX,$=void 0===w?{}:w,y=n.darkTitle,M=n.secondary,S=n.shadow,A=n.sx,P=void 0===A?{}:A,b=n.title,C=(0,i.Z)(n,Z),z=(0,s.Z)();return(0,f.jsxs)(o.Z,(0,r.Z)((0,r.Z)({ref:t},C),{},{sx:(0,r.Z)({overflowY:"auto",border:a?"1px solid":"none",borderColor:z.palette.primary[200]+75,":hover":{boxShadow:h?S||"0 2px 14px 0 rgb(32 40 45 / 8%)":"inherit"}},P),children:[!y&&b&&(0,f.jsx)(l.Z,{sx:x,title:b,action:M}),y&&b&&(0,f.jsx)(l.Z,{sx:x,title:(0,f.jsx)(c.Z,{variant:"h3",children:b}),action:M}),b&&(0,f.jsx)(d.Z,{}),g&&(0,f.jsx)(u.Z,{sx:$,className:p,children:m}),!g&&m]}))}));t.Z=h},34186:function(n,t,e){var r=e(84078),i=e(18831),a=e(16030),s=e(80184);t.Z=function(n){var t=n.children,e=n.title,o=n.border,l=(0,a.v9)((function(n){return n.customization}));return(0,s.jsx)(r.Z,{title:e,darkBorder:o,sx:{direction:"rtl"},children:(0,s.jsx)(i.MapInteractionCSS,{disableZoom:!l.enableZoom,children:t})})}},42440:function(n,t,e){var r=e(95318);t.Z=void 0;var i=r(e(45649)),a=e(80184),s=(0,i.default)([(0,a.jsx)("path",{d:"M18 6.41 16.59 5 12 9.58 7.41 5 6 6.41l6 6z"},"0"),(0,a.jsx)("path",{d:"m18 13-1.41-1.41L12 16.17l-4.59-4.58L6 13l6 6z"},"1")],"KeyboardDoubleArrowDown");t.Z=s},69053:function(n,t,e){var r=e(95318);t.Z=void 0;var i=r(e(45649)),a=e(80184),s=(0,i.default)([(0,a.jsx)("path",{d:"M6 17.59 7.41 19 12 14.42 16.59 19 18 17.59l-6-6z"},"0"),(0,a.jsx)("path",{d:"m6 11 1.41 1.41L12 7.83l4.59 4.58L18 11l-6-6z"},"1")],"KeyboardDoubleArrowUp");t.Z=s},54367:function(){},59416:function(){}}]);
//# sourceMappingURL=296.91d53ff4.chunk.js.map
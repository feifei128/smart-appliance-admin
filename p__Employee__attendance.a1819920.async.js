"use strict";(self.webpackChunkant_design_pro=self.webpackChunkant_design_pro||[]).push([[393],{77720:function(S,o,_){_.r(o);var D=_(86378),M=_.n(D),f=_(58357),s=_.n(f),b=_(90967),d=_.n(b),C=_(71977),O=_.n(C),P=_(30577),v=_.n(P),r=_(50959),h=_(33093),l=_(79660),A=_(9165),a=_(11527),T=function(){var j=(0,l.useParams)(),m=j.id,B=(0,r.useState)([]),u=v()(B,2),I=u[0],L=u[1];(0,r.useEffect)(function(){var g=function(){var K=O()(s()().mark(function i(){var c,t,p,E;return s()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,(0,l.request)("/api/employees");case 2:c=n.sent,t=c.filter(function(e){return e.id==m})[0],p=t.attendance.map(function(e){return{time:e.date,value:e.signIn,category:"\u7B7E\u5230\u65F6\u95F4"}}),E=t.attendance.map(function(e){return{time:e.date,value:e.signOut,category:"\u7B7E\u9000\u65F6\u95F4"}}),L([].concat(d()(p),d()(E)));case 7:case"end":return n.stop()}},i)}));return function(){return K.apply(this,arguments)}}();g()},[m]);var R={data:I,padding:"auto",xField:"time",yField:"value",seriesField:"category",xAxis:{tickCount:5},slider:{start:0,end:.5}};return(0,a.jsx)(a.Fragment,{children:(0,a.jsx)(A.Z,{bordered:!1,title:"\u8FD1\u4E00\u6708\u8003\u52E4\u8BB0\u5F55",children:(0,a.jsx)(h.Z,M()({},R))})})};o.default=T}}]);

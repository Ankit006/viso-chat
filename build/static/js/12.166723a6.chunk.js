(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[12],{135:function(t,e,c){"use strict";e.a=c.p+"static/media/profile.7f73584e.svg"},136:function(t,e,c){"use strict";c(0);var a=c(33),n=c(27),i=c(135),s=c.p+"static/media/home.205e5c86.svg",r=c.p+"static/media/like.b16558c9.svg",o=c.p+"static/media/search.da3387c7.svg",l=c(3);e.a=Object(n.b)((function(t){return{profileImage:t.userdata.profileImage,notifications:t.saveNotifications.notifications}}))((function(t){var e=t.profileImage,c=t.notifications;return Object(l.jsx)("div",{className:"bottomNav ",children:Object(l.jsxs)("div",{children:[Object(l.jsx)(a.b,{to:"/",children:Object(l.jsx)("img",{src:s,alt:"home",height:"23",width:"23"})}),Object(l.jsx)(a.b,{to:"/search",children:Object(l.jsx)("img",{src:o,alt:"search",height:"23",width:"23"})}),Object(l.jsx)(a.b,{style:{textDecoration:"none"},to:"/notification",children:Object(l.jsxs)("div",{className:"notificationButton",children:[c.length>0?Object(l.jsx)("div",{children:Object(l.jsx)("p",{children:c.length})}):null,Object(l.jsx)("img",{src:r,alt:"like",height:"23",width:"23"})]})}),""===e?Object(l.jsx)(a.b,{to:"/account",children:Object(l.jsx)("img",{src:i.a,alt:"profile",height:"23",width:"23"})}):Object(l.jsx)(a.b,{to:"/account",children:Object(l.jsx)("img",{src:e,className:"rounded",alt:"profile",height:"23",width:"23"})})]})})}))},140:function(t,e,c){"use strict";e.a=c.p+"static/media/Ellipsis-1s-200px.aba39ddd.svg"},255:function(t,e,c){"use strict";c.r(e);var a=c(19),n=c.n(a),i=c(28),s=c(134),r=c(0),o=c(3);function l(t){var e=t.searchHandler,c=t.onChangeHandler,a=t.value;return Object(o.jsx)("div",{className:"horizontal-center mar-top-1",children:Object(o.jsxs)("div",{className:"search",children:[Object(o.jsx)("input",{type:"text",value:a,onChange:c}),Object(o.jsx)("button",{onClick:e,className:"mar-top-1 btn-primary-2",children:"search"})]})})}var u=c(136),d=c(22),j=c.n(d),h=c(27),b=c(5),O=c(2),m=c(140),g=c(141),p=c.n(g);e.default=Object(h.b)((function(t){return{accountId:t.userdata.userId}}))((function(t){var e=t.dispatch,c=t.accountId,a=Object(r.useState)(""),d=Object(s.a)(a,2),h=d[0],g=d[1],f=Object(r.useState)(!1),x=Object(s.a)(f,2),v=x[0],w=x[1],N=Object(r.useState)([]),k=Object(s.a)(N,2),I=k[0],y=k[1],C=Object(r.useState)(""),H=Object(s.a)(C,2),S=H[0],z=H[1],_=Object(b.g)(),A=function(){var t=Object(i.a)(n.a.mark((function t(){var e;return n.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return w(!0),z(""),t.next=4,j.a.get("/api/searchUser?username=".concat(h));case 4:"success"===(e=t.sent).data.status?(y(e.data.result),w(!1)):"not found"===e.data.status&&(z("Not Found"),w(!1));case 6:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),F=function(t){t.target.getAttribute("account")!==c?(e({type:O.v,payload:t.target.getAttribute("account")}),_.push("/viewaccount")):_.push("/account")};return Object(o.jsxs)(o.Fragment,{children:[Object(o.jsx)(l,{searchHandler:A,onChangeHandler:function(t){g(p.a.sanitize(t.target.value))},value:h}),I.map((function(t){return Object(o.jsxs)("div",{className:"searchResult",children:[Object(o.jsx)("img",{src:t.profileImage.imageUrl,alt:"profileImage",height:"40",width:"40",account:t._id,onClick:F}),Object(o.jsx)("p",{onClick:F,account:t._id,children:t.username})]},t._id)})),Object(o.jsx)("div",{className:"horizontal-center mar-bottom-2",children:v?Object(o.jsx)("img",{src:m.a,alt:"loading",height:"50",width:"100"}):null}),Object(o.jsx)("div",{className:"error",children:Object(o.jsx)("h3",{children:S})}),Object(o.jsx)(u.a,{})]})}))}}]);
//# sourceMappingURL=12.166723a6.chunk.js.map
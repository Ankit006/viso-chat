(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[10],{135:function(e,s,a){"use strict";s.a=a.p+"static/media/profile.7f73584e.svg"},136:function(e,s,a){"use strict";a(0);var t=a(33),n=a(27),r=a(135),c=a.p+"static/media/home.205e5c86.svg",o=a.p+"static/media/like.b16558c9.svg",i=a.p+"static/media/search.da3387c7.svg",d=a(3);s.a=Object(n.b)((function(e){return{profileImage:e.userdata.profileImage,notifications:e.saveNotifications.notifications}}))((function(e){var s=e.profileImage,a=e.notifications;return Object(d.jsx)("div",{className:"bottomNav ",children:Object(d.jsxs)("div",{children:[Object(d.jsx)(t.b,{to:"/",children:Object(d.jsx)("img",{src:c,alt:"home",height:"23",width:"23"})}),Object(d.jsx)(t.b,{to:"/search",children:Object(d.jsx)("img",{src:i,alt:"search",height:"23",width:"23"})}),Object(d.jsx)(t.b,{style:{textDecoration:"none"},to:"/notification",children:Object(d.jsxs)("div",{className:"notificationButton",children:[a.length>0?Object(d.jsx)("div",{children:Object(d.jsx)("p",{children:a.length})}):null,Object(d.jsx)("img",{src:o,alt:"like",height:"23",width:"23"})]})}),""===s?Object(d.jsx)(t.b,{to:"/account",children:Object(d.jsx)("img",{src:r.a,alt:"profile",height:"23",width:"23"})}):Object(d.jsx)(t.b,{to:"/account",children:Object(d.jsx)("img",{src:s,className:"rounded",alt:"profile",height:"23",width:"23"})})]})})}))},138:function(e,s,a){"use strict";function t(e,s){e({type:"errorBar-show",message:s}),setTimeout((function(){e({type:"",message:s})}),1500)}function n(e,s){e({type:"successBar-show",message:s}),setTimeout((function(){e({type:"",message:s})}),1500)}a.d(s,"a",(function(){return t})),a.d(s,"b",(function(){return n}))},139:function(e,s,a){"use strict";a.d(s,"a",(function(){return n})),a.d(s,"b",(function(){return r}));a(0);var t=a(3);function n(e){var s=e.message,a=e.messageType;return Object(t.jsx)("div",{className:"errorBar ".concat(a),children:Object(t.jsx)("p",{children:s})})}function r(e){var s=e.message,a=e.messageType;return Object(t.jsx)("div",{className:"successBar ".concat(a),children:Object(t.jsx)("p",{children:s})})}},249:function(e,s,a){"use strict";a.r(s);var t=a(19),n=a.n(t),r=a(28),c=a(134),o=a(0),i=a(27),d=a(136),u=a(22),l=a.n(u),j=a(2),p=a(138),m=a(139),h=a(16),b=a(5),w=a(141),f=a.n(w),g=a(3);s.default=Object(i.b)((function(e){return{accessToken:e.token.accessToken}}))((function(e){var s=e.dispatch,a=e.accessToken,t=Object(b.g)(),i=Object(o.useState)({password:"",username:""}),u=Object(c.a)(i,2),w=u[0],O=u[1],x=Object(o.useState)({oldPassword:"",newPassword:"",confirmPassword:""}),v=Object(c.a)(x,2),P=v[0],y=v[1],N=Object(o.useState)({type:"",message:""}),k=Object(c.a)(N,2),C=k[0],T=k[1],z=Object(o.useState)({type:"",message:""}),B=Object(c.a)(z,2),D=B[0],F=B[1],S=function(){var e=Object(r.a)(n.a.mark((function e(){var t;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,l.a.put("/api/updateUserName",{password:w.password,username:w.username},{headers:{Authorization:"Bearer ".concat(a)}});case 2:"success"===(t=e.sent).data.status?(Object(p.b)(F,"username updated"),s({type:j.a,payload:w.username})):"error"===t.data.status&&Object(p.a)(T,"there is a problem while updating username");case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),A=function(){var e=Object(r.a)(n.a.mark((function e(){var s;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,l.a.put("/api/updatePassword",{oldPassword:P.oldPassword,newPassword:P.newPassword},{headers:{Authorization:"Bearer ".concat(a)}});case 2:"success"===(s=e.sent).data.status?Object(p.b)(F,"password updated"):"error"===s.data.status&&Object(p.a)(T,"there is a problem while updating password");case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),I=function(){var e=Object(r.a)(n.a.mark((function e(){var r;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,l.a.post("/api/logout",null,{headers:{Authorization:"Bearer ".concat(a)}});case 2:"success"===(r=e.sent).data.status?(h.a.emit("isUserActive",{status:"offline"}),s({type:j.o}),t.push("/")):(Object(p.a)(T,"unable to logout, try again later"),console.log(r.data.message));case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(g.jsxs)(g.Fragment,{children:[Object(g.jsxs)("div",{className:"settings",children:[Object(g.jsx)("h1",{children:"Settings"}),Object(g.jsxs)("fieldset",{className:"changeData",children:[Object(g.jsx)("legend",{children:"Change Username"}),Object(g.jsx)("label",{htmlFor:"password",children:"password"}),Object(g.jsx)("input",{onChange:function(e){O({password:f.a.sanitize(e.target.value),username:w.username})},type:"password",className:"inputData",id:"password",name:"password",value:w.password}),Object(g.jsx)("label",{htmlFor:"username",children:"new username"}),Object(g.jsx)("input",{onChange:function(e){O({password:w.password,username:f.a.sanitize(e.target.value)})},type:"text",id:"username",className:"inputData",name:"username",value:w.username}),Object(g.jsx)("div",{className:"save",children:Object(g.jsx)("button",{onClick:S,children:"save"})})]}),Object(g.jsxs)("fieldset",{className:"changeData",children:[Object(g.jsx)("legend",{children:"Change Password"}),Object(g.jsx)("label",{htmlFor:"oldPassword",children:"old password"}),Object(g.jsx)("input",{onChange:function(e){y({oldPassword:f.a.sanitize(e.target.value),newPassword:P.newPassword,confirmPassword:P.confirmPassword})},type:"password",className:"inputData",id:"oldPassword",name:"oldPassword",value:P.oldPassword}),Object(g.jsx)("label",{htmlFor:"newPasword",children:"new password"}),Object(g.jsx)("input",{onChange:function(e){y({oldPassword:P.oldPassword,newPassword:f.a.sanitize(e.target.value),confirmPassword:P.confirmPassword})},type:"password",id:"newPassword",className:"inputData",name:"newPassword",value:P.newPassword}),Object(g.jsx)("label",{htmlFor:"confirmPassword",children:"confirm Password"}),Object(g.jsx)("input",{onChange:function(e){y({oldPassword:P.oldPassword,newPassword:P.newPassword,confirmPassword:f.a.sanitize(e.target.value)})},type:"password",id:"confirmPassword",className:"inputData",name:"confirmPassword",value:P.confirmPassword}),Object(g.jsx)("div",{className:"save",children:Object(g.jsx)("button",{onClick:A,children:"save"})})]}),Object(g.jsx)("div",{className:"logout",children:Object(g.jsx)("button",{onClick:I,children:"Logout"})})]}),Object(g.jsx)(m.b,{message:D.message,messageType:D.type}),Object(g.jsx)(m.a,{message:C.message,messageType:C.type}),Object(g.jsx)(d.a,{})]})}))}}]);
//# sourceMappingURL=10.e8c4c3c1.chunk.js.map
(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[16],{151:function(e,s,t){"use strict";t.d(s,"a",(function(){return r}));t(0);var a=t.p+"static/media/send.57a49ec4.svg",n=t(3);function r(e){var s=e.onChangeValue,t=e.value,r=e.sendMessage;return Object(n.jsx)("div",{className:"send",children:Object(n.jsxs)("div",{children:[Object(n.jsx)("input",{type:"text",onChange:s,value:t}),Object(n.jsx)("img",{src:a,alt:"send",height:"25",width:"25",onClick:r})]})})}},256:function(e,s,t){"use strict";t.r(s);var a=t(17),n=t(134),r=t(0),c=t(5),i=t(27),o=t(16),u=t(3);var d=function(e){var s=e.message,t=e.RecivedUserId;return Object(u.jsx)(u.Fragment,{children:Object(u.jsx)("p",{className:s.id===t?"otherUser":"user",children:Object(u.jsxs)("span",{children:[" ",s.messages]})})})},j=t(151),l=t(141),f=t.n(l);s.default=Object(i.b)((function(e){return{userId:e.personalChatUserData.personalChatUser.userId,username:e.personalChatUserData.personalChatUser.username,profileImg:e.personalChatUserData.personalChatUser.userProfileImg,accountId:e.userdata.userId}}))((function(e){var s=e.userId,t=e.username,i=e.profileImg,l=e.accountId,g=Object(c.g)(),h=Object(r.useState)(""),m=Object(n.a)(h,2),b=m[0],O=m[1],v=Object(r.useState)([]),p=Object(n.a)(v,2),x=p[0],I=p[1],C=Object(r.useState)(""),U=Object(n.a)(C,2),M=U[0],N=U[1];return Object(r.useEffect)((function(){return""===s&&g.push("/"),o.a.on("reciveMessage",(function(e){I((function(s){return[].concat(Object(a.a)(s),[{messages:e.message,id:e.from}])}))})),o.a.emit("getMessages",{from:l,to:s}),o.a.on("getMessages",(function(e){var s=Array.from(e);I(s)})),o.a.on("isUserActive",(function(e){return N(e.message)})),o.a.emit("openChat",{accountId:l,userId:s}),function(){o.a.emit("closeChat",{accountId:l,userId:s}),o.a.off("message"),o.a.off("getMessages"),o.a.off("reciveMessage"),o.a.off("isUserActive")}}),[]),Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)("div",{className:"personalChat",children:Object(u.jsxs)("div",{className:"userInfo",children:[Object(u.jsxs)("div",{children:[Object(u.jsx)("img",{src:i,alt:"profile_image",height:"50",width:"50"}),Object(u.jsx)("div",{style:{backgroundColor:"online"===M?"green":"red"}})]}),Object(u.jsx)("p",{children:t})]})}),Object(u.jsx)("div",{className:"chatArea",children:x?x.map((function(e,t){return Object(u.jsx)(d,{message:e,RecivedUserId:s,accountId:l},t)})):null}),Object(u.jsx)(j.a,{onChangeValue:function(e){O(f.a.sanitize(e.target.value))},value:b,sendMessage:function(){o.a.emit("sendMessage",{from:l,message:b,to:s});var e=[].concat(Object(a.a)(x),[{messages:b,id:l}]);I(e),O("")}})]})}))}}]);
//# sourceMappingURL=16.0d09e8a2.chunk.js.map
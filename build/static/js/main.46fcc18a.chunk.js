(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[1],{132:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),r=n(31),o=n.n(r),s=(n(77),n(19)),u=n.n(s),i=n(28),l=n(5),b=(n(79),n(27)),O=n(2),d=n(16),j=n(22),f=n.n(j);function p(){return(p=Object(i.a)(u.a.mark((function e(t){var n,a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,f.a.get("/api/getAccessToken");case 2:if("success"!==(n=e.sent).data.status){e.next=18;break}return t({type:O.b,payload:n.data.accessToken}),e.next=7,f.a.get("/api/userInfo",{headers:{Authorization:"Bearer ".concat(n.data.accessToken)}});case 7:if("success"!==(a=e.sent).data.status){e.next=15;break}t({type:O.t,payload:{userId:a.data.userId,username:a.data.username,email:a.data.email,profileImage:a.data.profileImage,follower:a.data.follower,following:a.data.following}}),t({type:O.c}),d.a.auth={accountId:a.data.userId},d.a.connect(),e.next=16;break;case 15:return e.abrupt("return");case 16:e.next=19;break;case 18:return e.abrupt("return");case 19:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var h=function(e){return p.apply(this,arguments)},m=n(44),g=n(3),y=Object(a.lazy)((function(){return n.e(7).then(n.bind(null,250))})),v=Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(13)]).then(n.bind(null,245))})),w=Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(4),n.e(11)]).then(n.bind(null,246))})),I=Object(a.lazy)((function(){return n.e(6).then(n.bind(null,247))})),x=Object(a.lazy)((function(){return n.e(17).then(n.bind(null,165))})),E=Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(12)]).then(n.bind(null,255))})),T=Object(a.lazy)((function(){return n.e(5).then(n.bind(null,248))})),S=Object(a.lazy)((function(){return n.e(8).then(n.bind(null,251))})),A=Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(16)]).then(n.bind(null,256))})),_=Object(a.lazy)((function(){return n.e(14).then(n.bind(null,252))})),N=Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(15)]).then(n.bind(null,253))})),P=Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(9)]).then(n.bind(null,254))})),k=Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(10)]).then(n.bind(null,249))}));var R=Object(b.b)((function(e){return{login:e.loginState.login,accountId:e.userdata.userId}}))((function(e){var t=e.dispatch,n=e.login,c=e.accountId;return Object(a.useEffect)((function(){n||h(t),n&&""!==c&&(d.a.emit("notifications",{accountId:c}),d.a.on("notifications",(function(e){var n=Array.from(e);t({type:O.p,payload:n})})),d.a.on("notification",(function(e){t({type:O.q,payload:e})}))),setInterval(Object(i.a)(u.a.mark((function e(){var a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!n){e.next=5;break}return e.next=3,f.a.get("/api/getAccessToken");case 3:"success"===(a=e.sent).data.status&&t({type:O.b,payload:a.data.accessToken});case 5:case"end":return e.stop()}}),e)}))),84e4)}),[n]),Object(g.jsx)("div",{className:"App",children:Object(g.jsx)(a.Suspense,{fallback:Object(g.jsx)("div",{className:"absolute-center",children:Object(g.jsx)("img",{src:m.a,alt:"preloader",width:"100",height:"100"})}),children:Object(g.jsxs)(l.d,{children:[Object(g.jsx)(l.b,{path:"/",component:y,exact:!0}),Object(g.jsx)(l.b,{path:"/login",component:v}),Object(g.jsx)(l.b,{path:"/search",component:E}),Object(g.jsx)(l.b,{path:"/signup",component:w}),Object(g.jsx)(l.b,{path:"/chat",component:S}),Object(g.jsx)(l.b,{path:"/personalChat",component:A}),Object(g.jsx)(l.b,{path:"/notification",component:_}),Object(g.jsx)(l.b,{path:"/showComments",component:N}),Object(g.jsx)(l.b,{path:"/post",component:P}),Object(g.jsx)(l.b,{path:"/settings",component:k}),Object(g.jsx)(l.b,{path:"/account",component:function(){return""===n?Object(g.jsx)(x,{}):n?Object(g.jsx)(I,{}):Object(g.jsx)(v,{})}}),Object(g.jsx)(l.b,{path:"/viewaccount",component:function(){return Object(g.jsx)(T,{})}}),Object(g.jsx)(l.a,{to:"/"})]})})})})),L=n(33),C=n(18),z=n(71),U=n(72),V=n(1),F={login:!1,userId:"",username:"",email:"",profileImage:"",accessToken:"",follower:0,following:0,accountView:"",notifications:[],showPost:{},personalChatUser:{userId:"",username:"",userProfileImg:""},posts:{numberOfPosts:!1,loading:!1,data:[],error:!1}};var W=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:F,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case O.t:return Object(V.a)(Object(V.a)({},e),{},{userId:t.payload.userId,username:t.payload.username,email:t.payload.email,profileImage:t.payload.profileImage,follower:t.payload.follower,following:t.payload.following});case O.a:return Object(V.a)(Object(V.a)({},e),{},{username:t.payload});case O.e:return Object(V.a)(Object(V.a)({},e),{},{follower:e.follower+1});case O.l:return Object(V.a)(Object(V.a)({},e),{},{follower:e.follower-1});case O.f:return Object(V.a)(Object(V.a)({},e),{},{following:e.following+1});case O.m:return Object(V.a)(Object(V.a)({},e),{},{following:e.following-1});case O.o:return F;default:return e}};var G=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:F,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case O.b:return Object(V.a)(Object(V.a)({},e),{},{accessToken:t.payload});case O.o:return F;default:return e}},M=n(17);var D=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:F,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case O.k:return Object(V.a)(Object(V.a)({},e),{},{posts:Object(V.a)(Object(V.a)({},e.posts),{},{loading:!0})});case O.j:return Object(V.a)(Object(V.a)({},e),{},{posts:Object(V.a)(Object(V.a)({},e.posts),{},{loading:!1})});case O.s:return Object(V.a)(Object(V.a)({},e),{},{posts:Object(V.a)(Object(V.a)({},e.posts),{},{data:[].concat(Object(M.a)(e.posts.data),Object(M.a)(t.payload))})});case O.i:return Object(V.a)(Object(V.a)({},e),{},{posts:Object(V.a)(Object(V.a)({},e.posts),{},{error:!0})});case O.h:return Object(V.a)(Object(V.a)({},e),{},{posts:Object(V.a)(Object(V.a)({},e.posts),{},{error:!1})});case O.g:return Object(V.a)(Object(V.a)({},e),{},{posts:Object(V.a)(Object(V.a)({},e.posts),{},{numberOfPosts:t.payload})});case O.u:return Object(V.a)(Object(V.a)({},e),{},{showPost:t.payload});case O.o:return F;default:return e}};var q=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:F,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case O.c:return Object(V.a)(Object(V.a)({},e),{},{login:!0});case O.d:return Object(V.a)(Object(V.a)({},e),{},{login:!1});case O.o:return F;default:return e}};var B=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:F,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case O.v:return Object(V.a)(Object(V.a)({},e),{},{accountView:t.payload});case O.o:return F;default:return e}};var H=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:F,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case O.r:return Object(V.a)(Object(V.a)({},e),{},{personalChatUser:Object(V.a)(Object(V.a)({},e.personalChatUser),{},{userId:t.payload.userId,username:t.payload.username,userProfileImg:t.payload.imgUrl})});case O.o:return F;default:return e}};var J=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:F,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case O.p:return Object(V.a)(Object(V.a)({},e),{},{notifications:[].concat(Object(M.a)(e.notifications),Object(M.a)(t.payload))});case O.q:return Object(V.a)(Object(V.a)({},e),{},{notifications:[].concat(Object(M.a)(e.notifications),[t.payload])});case O.n:return Object(V.a)(Object(V.a)({},e),{},{notifications:[]});case O.o:return F;default:return e}},K=Object(C.combineReducers)({userdata:W,token:G,posts:D,loginState:q,viewAccount:B,personalChatUserData:H,saveNotifications:J}),Q=Object(C.createStore)(K,Object(U.composeWithDevTools)(Object(C.applyMiddleware)(z.a)));o.a.render(Object(g.jsx)(c.a.StrictMode,{children:Object(g.jsx)(L.a,{children:Object(g.jsx)(b.a,{store:Q,children:Object(g.jsx)(R,{})})})}),document.getElementById("root"))},16:function(e,t,n){"use strict";var a=n(70),c=Object(a.io)({autoConnect:!1});t.a=c},2:function(e,t,n){"use strict";n.d(t,"t",(function(){return a})),n.d(t,"a",(function(){return c})),n.d(t,"o",(function(){return r})),n.d(t,"b",(function(){return o})),n.d(t,"k",(function(){return s})),n.d(t,"j",(function(){return u})),n.d(t,"s",(function(){return i})),n.d(t,"i",(function(){return l})),n.d(t,"h",(function(){return b})),n.d(t,"g",(function(){return O})),n.d(t,"c",(function(){return d})),n.d(t,"d",(function(){return j})),n.d(t,"e",(function(){return f})),n.d(t,"l",(function(){return p})),n.d(t,"f",(function(){return h})),n.d(t,"m",(function(){return m})),n.d(t,"v",(function(){return g})),n.d(t,"p",(function(){return y})),n.d(t,"q",(function(){return v})),n.d(t,"n",(function(){return w})),n.d(t,"r",(function(){return I})),n.d(t,"u",(function(){return x}));var a="SAVE_USERDATA",c="CHANGE_USERNAME",r="RESET",o="GET_ACCESS_TOKEN",s="POST_LOADING_TRUE",u="POST_LOADING_FALSE",i="SAVE_POST",l="POST_ERROR_TRUE",b="POST_ERROR_FALSE",O="NUMBER_OF_POSTS",d="LOGIN",j="LOGOUT",f="NEW_FOLLOWER",p="REMOVE_FOLLOWER",h="NEW_FOLLOWING",m="REMOVE_FOLLOWING",g="VIEW_ACCOUNT",y="SAVE_ALL_NOTIFICATIONS",v="SAVE_NOTIFICATION",w="REMOVE_NOTIFICATIONS",I="SAVE_PERSONALCHAT_USER_DATA",x="SHOW_POST"},44:function(e,t,n){"use strict";t.a=n.p+"static/media/preloader.7576caea.svg"},77:function(e,t,n){},79:function(e,t,n){}},[[132,2,3]]]);
//# sourceMappingURL=main.46fcc18a.chunk.js.map
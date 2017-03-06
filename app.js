webpackJsonp([1,2],{122:function(t,e,r){"use strict";var n=r(60),o=r.n(n),s=r(120),i=r(182),a=r(179),c=r(181),u=r(180);o.a.use(s.c),e.a=new s.c.Store({state:i.a,actions:a.a,mutations:c.a,modules:{projects:u.a}})},163:function(t,e,r){"use strict";var n=r(60),o=r.n(n),s=r(419),i=r(122);o.a.use(s.a);var a=new s.a({routes:[r(178),r(175),r(177),r(176)]});a.beforeEach(function(t,e,r){i.a.state.token||"token"===t.name?r():r({name:"token"})}),e.a=a},165:function(t,e,r){var n=r(32)(r(167),r(418),null,null);t.exports=n.exports},167:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"app",components:{"page-header":r(405)},methods:{refresh:function(){console.log("Emit Refresh"),this.$root.$emit("refresh")},logout:function(){this.$store.dispatch("logout"),this.$router.replace({name:"token"})}}}},168:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r(120),o=r(59);e.default={data:function(){return{fetching:!0}},computed:r.i(n.b)({projects:"projectOverview"}),components:{container:r(79)},mounted:function(){var t=this;0===this.$store.state.projects.all.length?r.i(o.a)("projects").then(function(t){if(200===t.status)return t.json();throw new Error(t)}).then(function(e){return t.$store.dispatch("fetchProject",e)}).then(function(){return t.fetching=!1}).catch(function(){localStorage.removeItem("api-token"),t.$router.replace({name:"token"})}):this.fetching=!1}}},169:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r(124),o=r.n(n),s=r(59),i=r(80);e.default={data:function(){return{error:null,fetching:!0,builds:[]}},computed:{projectUrl:function(){return"https://"+("github"===this.$route.params.host?"github.com":"bitbucket.org")+"/"+this.owner+"/"+this.project}},components:{container:r(79)},watch:{$route:function(){this.displayBuilds()}},mounted:function(){var t=this;this.displayBuilds(),console.log(this.$root),this.$root.$on("refresh",function(){return t.refresh()})},methods:{refresh:function(){var t=this;this.fetchBuilds().then(function(){return t.builds=t.$store.getters.getBuild(t.$route.params.host,t.$route.params.owner,t.$route.params.project)}).catch(function(e){console.trace(e),t.error="Response with status "+e.status+", please check fetching correct report or url project exists"})},displayBuilds:function(){var t=this,e=function(){t.error=null,t.fetching=!1,t.builds=t.$store.getters.getBuild(t.$route.params.host,t.$route.params.owner,t.$route.params.project)};r.i(i.a)(this.$store.state.projects.reports,this.$route.params)?e():this.fetchBuilds().then(function(){return e()}).catch(function(e){console.trace(e),t.fetching=!1,t.error="Response with status "+e.status+", please check fetching correct report or url project exists"})},fetchBuilds:function(){var t=this;return r.i(s.a)("project/"+this.$route.params.host+"/"+this.$route.params.owner+"/"+this.$route.params.project+"/tree/master?filter=completed").then(function(t){if(200===t.status)return t.json();throw t}).then(function(e){return t.$store.dispatch("fetchBuild",o()({data:e},t.$route.params))})}}}},170:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{}},components:{container:r(79),"report-card":r(409)}}},171:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r(124),o=r.n(n),s=r(120),i=r(59),a=r(80);e.default={props:["owner","projectName","build","host"],data:function(){return{fetching:!0,project:null,reports:[],error:null}},computed:o()({badge:function(){return"https://circleci.com/"+("github"===this.host?"gh":"bb")+"/"+this.owner+"/"+this.projectName+"/tree/master.svg?style=svg&circle-token="+this.token},projectUrl:function(){return"https://"+("github"===this.host?"github.com":"bitbucket.org")+"/"+this.owner+"/"+this.projectName}},r.i(s.a)(["token"]),r.i(s.b)(["getProject","getReport"])),mounted:function(){this.displayReport(this.host,this.owner,this.projectName,this.build)},watch:{owner:function(){this.displayReport(this.host,this.owner,this.projectName,this.build)},build:function(){this.displayReport(this.host,this.owner,this.projectName,this.build)},projectName:function(){this.displayReport(this.host,this.owner,this.projectName,this.build)},host:function(){this.displayReport(this.host,this.owner,this.projectName,this.build)}},methods:{titleReport:function(t){var e=t.replace("$CIRCLE_ARTIFACTS/","").replace("/index.html","");return""+e.charAt(0).toUpperCase()+e.substr(1)},displayReport:function(t,e,n,o){var s=this,c=function(){s.error=null,s.fetching=!1,s.project=s.getProject(e,n),s.reports=s.getReport(t,e,n,o)};r.i(a.b)(this.$store.state.projects.reports,{host:t,owner:e,project:n,build:o})?c():r.i(i.a)("project/"+t+"/"+e+"/"+n+"/"+o+"/artifacts").then(function(t){if(200===t.status)return t.json();throw t}).then(function(r){return s.$store.dispatch("fetchReport",{host:t,owner:e,project:n,build:o,data:r})}).then(function(){return c()}).catch(function(t){console.trace(t),s.fetching=!1,s.error="Response with status "+t.status+", please check fetching correct report or url project exists"})}}}},172:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r(79),o=r.n(n);e.default={data:function(){return{token:""}},components:{container:o.a},methods:{submit:function(){localStorage.setItem("api-token",this.token),this.$store.dispatch("saveToken",this.token),this.$router.replace({name:"home"})}}}},173:function(t,e,r){"use strict";var n=r(61),o=r.n(n),s=r(186),i=r.n(s);e.a=function(t){if(!(t instanceof Headers))return t&&"object"===(void 0===t?"undefined":i()(t))?o()({},{Accept:"application/json"},t):{Accept:"application/json"};t.set("Accept","application/json")}},174:function(t,e,r){"use strict";t.exports=function(t){var e=localStorage.getItem("api-token"),r=new URL(t,"https://circleci.com/api/v1.1/").toString();return r+(r.indexOf("?")!==-1?"&":"?")+"circle-token="+e}},175:function(t,e,r){"use strict";t.exports={path:"/",name:"home",component:r(406)}},176:function(t,e,r){"use strict";t.exports={path:"/report/:host/:owner/:project",name:"project",component:r(407)}},177:function(t,e,r){"use strict";t.exports={path:"/report/:host/:owner/:project/:build",name:"report",component:r(408)}},178:function(t,e,r){"use strict";t.exports={path:"/token",name:"token",component:r(410)}},179:function(t,e,r){"use strict";var n=r(81);e.a={saveToken:function(t,e){(0,t.commit)(n.e,e)},logout:function(t){var e=t.commit;e(n.e,null),e(n.d),localStorage.clear()}}},180:function(t,e,r){"use strict";function n(t,e){if(!e)return"success";if(t&&t.build_num>e.build_num)return"success";var r=e.outcome;return p.indexOf(r)!==-1?"warn":"fail"}var o,s=r(123),i=r.n(s),a=r(61),c=r.n(a),u=r(81),l=r(80),p=["canceled","no_tests"],d={failed:{content:"bug_report",theme:"fail"},success:{content:"done",theme:"success"},fixed:{content:"build",theme:"success"},timedout:{content:"alarm",theme:"fail"},no_tests:{content:"do_not_disturb_alt",theme:"warn"}},m={all:[],reports:{bitbucket:{},github:{}},builds:{bitbucket:{},github:{}}},h=(o={},i()(o,u.a,function(t,e){t.all=e}),i()(o,u.b,function(t,e){var r=e.host,n=e.owner,o=e.project,s=e.build,a=e.data;t.reports=c()({},t.reports,i()({},r,i()({},n,i()({},o,i()({},s,a)))))}),i()(o,u.c,function(t,e){var r=e.host,n=e.owner,o=e.project,s=e.data;t.builds=c()({},t.builds,i()({},r,i()({},n,i()({},o,s))))}),i()(o,u.d,function(t){t.all=[],t.reports={bitbucket:{},github:{}},t.builds={bitbucket:{},github:{}}}),o),f={fetchProject:function(t,e){(0,t.commit)(u.a,e)},fetchReport:function(t,e){(0,t.commit)(u.b,e)},fetchBuild:function(t,e){(0,t.commit)(u.c,e)}},_={allProject:function(t){return t.all},projectOverview:function(t,e){return e.allProject.map(function(t){if(!("master"in t.branches))return{};var e=t.branches.master.last_success,r=t.branches.master.last_non_success,o=n(e,r),s="success"===o?e:r;return{status:o,report:{name:"report",params:{host:t.vcs_type,owner:t.username,project:t.reponame,build:s.build_num}},projectPage:{name:"project",params:{host:t.vcs_type,owner:t.username,project:t.reponame}},commit:s.vcs_revision.substr(0,6),icon:t.vcs_type,name:t.reponame,build:s.build_num,url:t.vcs_url,owner:t.username}})},getProject:function(t,e){var r=e.projectOverview;return function(t,e){var n=r.filter(function(r){return r.name===e&&r.owner===t});return n.length>0?n[0]:null}},getReport:function(t){return function(e,n,o,s){if(r.i(l.b)(t.reports,{host:e,owner:n,project:o,build:s})){var i=t.reports[e][n][o][s],a=i.filter(function(t){return t.path.endsWith("index.html")}),c=a.reduce(function(t,e){var r=e.pretty_path.split("/").length;return r<t?r:t},1/0);return a.filter(function(t){return t.pretty_path.split("/").length===c})}return[]}},getBuild:function(t){return function(e,n,o){if(r.i(l.a)(t.builds,{host:e,owner:n,project:o})){return t.builds[e][n][o].map(function(t){return{url:{name:"report",params:{host:e,owner:n,project:o,build:t.build_num}},number:t.build_num,status:t.status in d?d[t.status]:t.status,message:t.subject,author:t.author_name}})}return[]}}};e.a={state:m,mutations:h,actions:f,getters:_}},181:function(t,e,r){"use strict";var n=r(123),o=r.n(n),s=r(81);e.a=o()({},s.e,function(t,e){t.token=e})},182:function(t,e,r){"use strict";var n=localStorage.getItem("api-token");e.a={token:n}},400:function(t,e){},401:function(t,e){},402:function(t,e){},405:function(t,e,r){r(400);var n=r(32)(null,r(412),"data-v-09f4815e",null);t.exports=n.exports},406:function(t,e,r){r(401);var n=r(32)(r(168),r(413),"data-v-0fdc74f0",null);t.exports=n.exports},407:function(t,e,r){var n=r(32)(r(169),r(417),null,null);t.exports=n.exports},408:function(t,e,r){var n=r(32)(r(170),r(411),null,null);t.exports=n.exports},409:function(t,e,r){var n=r(32)(r(171),r(415),null,null);t.exports=n.exports},410:function(t,e,r){var n=r(32)(r(172),r(416),null,null);t.exports=n.exports},411:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("container",[r("report-card",{attrs:{host:t.$route.params.host,owner:t.$route.params.owner,projectName:t.$route.params.project,build:t.$route.params.build}})],1)},staticRenderFns:[]}},412:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("md-toolbar",[r("h1",{staticClass:"md-title"},[r("router-link",{attrs:{to:{name:"home"}}},[t._v("\n            Circle CI Dashboard\n        ")])],1)])},staticRenderFns:[]}},413:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("container",[r("h2",[t._v("Projects")]),t._v(" "),t.fetching?r("br"):t._e(),t._v(" "),t.fetching?r("md-progress",{attrs:{"md-indeterminate":""}}):t._e(),t._v(" "),t._l(t.projects,function(e){return e?r("md-card",{key:e.name,staticClass:"md-primary",attrs:{"md-theme":e.status}},[r("md-card-header",[r("div",{staticClass:"md-title"},[t._v("\n                "+t._s(e.name)+"\n                "),r("i",{staticClass:"fa",class:["fa-"+e.icon]})]),t._v(" "),r("div",{staticClass:"md-subhead"},[t._v("\n                #"+t._s(e.build)+"\n                "+t._s(e.commit)+"\n            ")])]),t._v(" "),r("md-card-actions",[r("md-button",{staticClass:"md-raised",attrs:{href:t.$router.resolve(e.projectPage).href}},[t._v("\n                Project\n            ")]),t._v(" "),"warn"!==e.status?r("md-button",{staticClass:"md-raised",attrs:{href:t.$router.resolve(e.report).href}},[t._v("\n                Report\n            ")]):t._e()],1)],1):t._e()})],2)},staticRenderFns:[]}},414:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{staticClass:"container"},[t._t("default")],2)},staticRenderFns:[]}},415:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("md-card",[r("md-card-header",[null===t.error?r("div",{staticClass:"md-title"},[r("h2",[t._v("\n                "+t._s(t.owner)+" / "+t._s(t.projectName)+"\n                #"+t._s(t.build)+"\n                "),r("a",{attrs:{href:t.projectUrl,target:"_blank"}},[r("i",{staticClass:"fa",class:"fa-"+t.host})]),t._v(" "),t.badge?r("img",{attrs:{src:t.badge}}):t._e()])]):t._e(),t._v(" "),null!==t.error?r("div",{staticClass:"md-title"},[t._v("\n            Error occur\n        ")]):t._e()]),t._v(" "),r("md-card-content",[t.fetching?r("md-progress",{attrs:{"md-indeterminate":""}}):t._e(),t._v(" "),t.reports.length>0?r("md-list",t._l(t.reports,function(e){return r("md-list-item",{key:e.path,attrs:{href:e.url,target:"_blank"}},[t._v("\n                "+t._s(t.titleReport(e.pretty_path))+"\n                "),r("md-icon",[t._v("send")])],1)})):t._e()],1),t._v(" "),null!==t.error?r("md-card-content",[t._v("\n        "+t._s(t.error)+"\n    ")]):t._e(),t._v(" "),null!==t.error?r("md-card-actions",[r("md-button",{staticClass:"md-raised md-accent",attrs:{href:t.$router.resolve({name:"home"}).href}},[t._v("Home")])],1):t._e()],1)},staticRenderFns:[]}},416:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("container",[r("h2",[t._v("Input Token")]),t._v(" "),r("form",{attrs:{novalidate:""},on:{submit:function(e){e.stopPropagation(),e.preventDefault(),t.submit(e)}}},[r("md-input-container",[r("label",[t._v("Circle CI API Token")]),t._v(" "),r("md-input",{model:{value:t.token,callback:function(e){t.token=e}}})],1),t._v(" "),r("p",[t._v("\n      You may go to\n      "),r("a",{attrs:{href:"https://circleci.com/account/api",target:"_blank"}},[t._v("here")]),t._v("\n      to create a new API token\n    ")]),t._v(" "),r("md-button",{staticClass:"md-raised md-primary",attrs:{type:"submit"}},[t._v("\n      Submit\n    ")])],1)])},staticRenderFns:[]}},417:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("container",[null===t.error?r("div",{staticClass:"md-title"},[r("h2",[t._v("\n            "+t._s(t.$route.params.owner)+" / "+t._s(t.$route.params.project)+"\n            "),r("a",{attrs:{href:t.projectUrl,target:"_blank"}},[r("i",{staticClass:"fa",class:"fa-"+t.$route.params.host})])])]):t._e(),t._v(" "),r("md-list",[t.fetching?r("md-progress",{attrs:{"md-indeterminate":""}}):t._e(),t._v(" "),t.builds.length>0?r("md-list",{staticClass:"md-double-line"},t._l(t.builds,function(e){return r("md-list-item",{key:e.number,attrs:{target:"_blank"}},[r("md-icon",{staticClass:"md-primary",attrs:{"md-theme":e.status.theme}},[t._v(t._s(e.status.content))]),t._v(" "),r("div",{staticClass:"md-list-text-container"},[r("span",[t._v(t._s(e.message)+" #"+t._s(e.number))]),t._v(" "),r("span",[t._v(t._s(e.author))])]),t._v(" "),r("md-button",{staticClass:"md-icon-button md-list-action",attrs:{href:t.$router.resolve(e.url).href}},[r("md-icon",[t._v("send")])],1)],1)})):t._e()],1)],1)},staticRenderFns:[]}},418:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{attrs:{id:"app"}},[r("page-header"),t._v(" "),r("transition",{attrs:{name:"fade",mode:"out-in"}},[r("router-view")],1),t._v(" "),r("md-speed-dial",{staticClass:"md-fab-top-right",attrs:{"md-open":"click","md-direction":"bottom"}},[r("md-button",{staticClass:"md-fab",attrs:{"md-fab-trigger":""}},[r("md-icon",{attrs:{"md-icon-morph":""}},[t._v("close")]),t._v(" "),r("md-icon",[t._v("settings")])],1),t._v(" "),r("md-button",{staticClass:"md-fab md-primary md-mini md-clean",nativeOn:{click:function(e){t.refresh(e)}}},[r("md-icon",[t._v("refresh")])],1),t._v(" "),r("md-button",{staticClass:"md-fab md-primary md-mini md-clean",nativeOn:{click:function(e){t.logout(e)}}},[r("md-icon",[t._v("exit_to_app")])],1)],1)],1)},staticRenderFns:[]}},421:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r(164),o=(r.n(n),r(60)),s=r.n(o),i=r(166),a=r.n(i),c=r(165),u=r.n(c),l=r(163),p=r(122),d=r(59);s.a.use(a.a),s.a.material.registerTheme("default",{primary:"purple"}),s.a.material.registerTheme({success:{primary:"green"},fail:{primary:"red"},warn:{primary:"orange"}}),p.a.state.projects.all.length||r.i(d.a)("projects").then(function(t){if(200===t.status)return t.json();throw new Error(t)}).then(function(t){return p.a.dispatch("fetchProject",t)}).catch(function(){localStorage.removeItem("api-token"),l.a.replace({name:"token"})}),new s.a({el:"#app",router:l.a,store:p.a,template:"<App/>",components:{App:u.a}})},59:function(t,e,r){"use strict";var n=r(61),o=r.n(n),s=r(174),i=r.n(s),a=r(173),c=window.fetch;e.a=function(t,e){return c(i()(t),e?o()({},{headers:r.i(a.a)(e.headers)},e||{}):{headers:{Accept:"application/json"}})}},79:function(t,e,r){r(402);var n=r(32)(null,r(414),null,null);t.exports=n.exports},80:function(t,e,r){"use strict";function n(t,e){var r=t[e.host];return r&&e.owner in r&&e.project in r[e.owner]}function o(t,e){var r=t[e.host];return n(t,e)&&e.build in r[e.owner][e.project]}e.a=n,e.b=o},81:function(t,e,r){"use strict";r.d(e,"e",function(){return n}),r.d(e,"a",function(){return o}),r.d(e,"b",function(){return s}),r.d(e,"c",function(){return i}),r.d(e,"d",function(){return a});var n="SET_TOKEN",o="FETCH_PROJECT",s="FETCH_REPORT",i="FETCH_BUILD",a="CLEAR_PROJECT"}},[421]);
//# sourceMappingURL=app.js.map
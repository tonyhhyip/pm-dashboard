webpackJsonp([1,2],{118:function(t,e,n){n(399);var r=n(52)(null,n(409),null,null);t.exports=r.exports},121:function(t,e,n){"use strict";var r=n(60),o=n.n(r),a=n(119),s=n(178),c=n(175),i=n(177),u=n(176);o.a.use(a.c),e.a=new a.c.Store({state:s.a,actions:c.a,mutations:i.a,modules:{projects:u.a}})},161:function(t,e,n){"use strict";var r=n(60),o=n.n(r),a=n(412),s=n(121);o.a.use(a.a);var c=new a.a({routes:[n(174),n(172),n(173)]});c.beforeEach(function(t,e,n){s.a.state.token||"token"===t.name?n():n({name:"token"})}),e.a=c},163:function(t,e,n){var r=n(52)(n(165),n(411),null,null);t.exports=r.exports},165:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"app",components:{"page-header":n(402)}}},166:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(119),o=n(78);e.default={data:function(){return{fetching:!0}},computed:n.i(r.b)({projects:"projectOverview"}),components:{container:n(118)},mounted:function(){var t=this;0===this.$store.state.projects.all.length?n.i(o.a)("projects").then(function(t){if(200===t.status)return t.json();throw new Error(t)}).then(function(e){return t.$store.dispatch("fetchProject",e)}).then(function(){return t.fetching=!1}).catch(function(){localStorage.removeItem("api-token"),t.$router.replace({name:"token"})}):this.fetching=!1}}},167:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(53),o=n.n(r),a=n(182),s=n.n(a),c=n(119),i=n(118),u=n.n(i),l=n(78),p=n(171),f=this;e.default={data:function(){return{fetching:!0,project:null,reports:[],error:null}},computed:s()({badge:function(){var t=this.$route.params,e="github"===t.host?"gh":"bb";return"https://circleci.com/"+e+"/"+t.owner+"/"+t.project+"/tree/master.svg?style=svg&circle-token="+this.token}},n.i(c.a)(["token"]),n.i(c.b)({projects:"projectOverview"})),components:{container:u.a},mounted:function(){var t=this.$route.params;this.displayReport(t)},watch:{$route:function(t){f.displayReport(t)}},methods:{titleReport:function(t){var e=t.replace("$CIRCLE_ARTIFACTS/","").replace("/index.html","");return""+e.charAt(0).toUpperCase()+e.substr(1)},displayReport:function(t){var e=this,r=this.$store.state.projects.reports,a=function(){e.fetching=!1;var n=e.projects.filter(function(e){return e.name===t.project});e.project=n[0];var r=e.$store.state.projects.reports[t.host][t.owner][t.project][t.build].filter(function(t){return t.path.endsWith("index.html")}),o=1/0;r.forEach(function(t){var e=t.pretty_path.split("/").length;e<o&&(o=e)}),e.reports=r.filter(function(t){return t.pretty_path.split("/").length===o})};n.i(p.a)(r,t)?a():n.i(l.a)("project/"+t.host+"/"+t.owner+"/"+t.project+"/"+t.build+"/artifacts").then(function(t){if(200===t.status)return t.json();throw t}).then(function(n){return e.$store.dispatch("fetchReport",o()({},t,{data:n}))}).then(function(){return a()}).catch(function(t){console.trace(t),e.fetching=!1,e.error="Response with status "+t.status+", please check fetching correct report or url project exists"})}}}},168:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(118),o=n.n(r);e.default={data:function(){return{token:""}},components:{container:o.a},methods:{submit:function(){localStorage.setItem("api-token",this.token),this.$store.dispatch("saveToken",this.token),this.$router.replace({name:"home"})}}}},169:function(t,e,n){"use strict";var r=n(53),o=n.n(r),a=n(183),s=n.n(a);e.a=function(t){return t instanceof Headers?void t.set("Accept","application/json"):t&&"object"===("undefined"==typeof t?"undefined":s()(t))?o()({},{Accept:"application/json"},t):{Accept:"application/json"}}},170:function(t,e,n){"use strict";t.exports=function(t){var e=localStorage.getItem("api-token"),n=new URL(t,"https://circleci.com/api/v1.1/");return n.toString()+"?circle-token="+e}},171:function(t,e,n){"use strict";function r(t,e){var n=t[e.host];return n&&e.owner in n&&e.project in n[e.owner]&&e.build in n[e.owner][e.project]}e.a=r},172:function(t,e,n){"use strict";t.exports={path:"/",name:"home",component:n(403)}},173:function(t,e,n){"use strict";t.exports={path:"/report/:host/:owner/:project/:build",name:"report",component:n(404)}},174:function(t,e,n){"use strict";t.exports={path:"/token",name:"token",component:n(405)}},175:function(t,e,n){"use strict";var r=n(79);e.a={saveToken:function(t,e){var n=t.commit;n(r.c,e)}}},176:function(t,e,n){"use strict";function r(t,e){if(!e)return"success";if(t&&t.build_num>e.build_num)return"success";var n=e.outcome;return l.indexOf(n)!==-1?"warn":"fail"}var o,a=n(122),s=n.n(a),c=n(53),i=n.n(c),u=n(79),l=["canceled","no_tests"],p={all:[],reports:{bitbucket:{},github:{}}},f=(o={},s()(o,u.a,function(t,e){t.all=e}),s()(o,u.b,function(t,e){var n=e.host,r=e.owner,o=e.project,a=e.build,c=e.data;t.reports=i()({},t.reports,s()({},n,s()({},r,s()({},o,s()({},a,c)))))}),o),d={fetchProject:function(t,e){var n=t.commit;n(u.a,e)},fetchReport:function(t,e){var n=t.commit;n(u.b,e)}},m={allProject:function(t){return t.all},projectOverview:function(t,e){return e.allProject.map(function(t){var e=t.branches.master.last_success,n=t.branches.master.last_non_success,o=r(e,n),a="success"===o?e:n,s={name:"report",params:{host:t.vcs_type,owner:t.username,project:t.reponame,build:a.build_num}};return{status:o,report:s,commit:a.vcs_revision.substr(0,6),icon:t.vcs_type,name:t.reponame,build:a.build_num,url:t.vcs_url}})}};e.a={state:p,mutations:f,actions:d,getters:m}},177:function(t,e,n){"use strict";var r=n(122),o=n.n(r),a=n(79);e.a=o()({},a.c,function(t,e){t.token=e})},178:function(t,e,n){"use strict";var r=localStorage.getItem("api-token");e.a={token:r}},397:function(t,e){},398:function(t,e){},399:function(t,e){},402:function(t,e,n){n(397);var r=n(52)(null,n(407),"data-v-09f4815e",null);t.exports=r.exports},403:function(t,e,n){n(398);var r=n(52)(n(166),n(408),"data-v-0fdc74f0",null);t.exports=r.exports},404:function(t,e,n){var r=n(52)(n(167),n(406),null,null);t.exports=r.exports},405:function(t,e,n){var r=n(52)(n(168),n(410),null,null);t.exports=r.exports},406:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("container",[t.fetching?n("br"):t._e(),t._v(" "),t.fetching?n("md-spinner",{attrs:{"md-indeterminate":""}}):t._e(),t._v(" "),null!==t.project?n("div",{staticClass:"md-title"},[n("h2",[t._v("\n            "+t._s(t.project.name)+"\n            #"+t._s(t.$route.params.build)+"\n            "),n("a",{attrs:{href:t.project.url,target:"_blank"}},[n("i",{staticClass:"fa",class:"fa-"+t.$route.params.host})]),t._v(" "),t.badge?n("img",{attrs:{src:t.badge}}):t._e()])]):t._e(),t._v(" "),null!==t.project?n("md-card",[t.reports.length>0?n("md-list",t._l(t.reports,function(e){return n("md-list-item",{key:e.path,attrs:{href:e.url,target:"_blank"}},[t._v("\n                "+t._s(t.titleReport(e.pretty_path))+"\n                "),n("md-icon",[t._v("send")])],1)})):t._e()],1):t._e(),t._v(" "),null!==t.error?n("md-card",[n("md-card-header",[n("div",{staticClass:"md-title"},[t._v("\n                    Error occur\n                ")])]),t._v(" "),n("md-card-content",[t._v("\n            "+t._s(t.error)+"\n        ")]),t._v(" "),n("md-card-actions",[n("md-button",{staticClass:"md-raised md-accent",attrs:{href:"/#/"}},[t._v("Home")])],1)],1):t._e()],1)},staticRenderFns:[]}},407:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("md-toolbar",[n("h1",{staticClass:"md-title"},[n("router-link",{attrs:{to:{name:"home"}}},[t._v("\n            Circle CI Dashboard\n        ")])],1)])},staticRenderFns:[]}},408:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("container",[n("h2",[t._v("Projects")]),t._v(" "),t.fetching?n("br"):t._e(),t._v(" "),t.fetching?n("md-progress",{attrs:{"md-indeterminate":""}}):t._e(),t._v(" "),t._l(t.projects,function(e){return n("md-card",{key:e.name,staticClass:"md-primary",attrs:{"md-theme":e.status}},[n("md-card-header",[n("div",{staticClass:"md-title"},[t._v("\n                "+t._s(e.name)+"\n                "),n("i",{staticClass:"fa",class:["fa-"+e.icon]})]),t._v(" "),n("div",{staticClass:"md-subhead"},[t._v("\n                #"+t._s(e.build)+"\n                "+t._s(e.commit)+"\n            ")])]),t._v(" "),n("md-card-actions",["warn"!==e.status?n("md-button",{staticClass:"md-raised",attrs:{href:t.$router.resolve(e.report).href}},[t._v("\n                View Report\n            ")]):t._e()],1)],1)})],2)},staticRenderFns:[]}},409:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container"},[t._t("default")],2)},staticRenderFns:[]}},410:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("container",[n("h2",[t._v("Input Token")]),t._v(" "),n("form",{attrs:{novalidate:""},on:{submit:function(e){e.stopPropagation(),e.preventDefault(),t.submit(e)}}},[n("md-input-container",[n("label",[t._v("Circle CI API Token")]),t._v(" "),n("md-input",{model:{value:t.token,callback:function(e){t.token=e}}})],1),t._v(" "),n("p",[t._v("\n      You may go to\n      "),n("a",{attrs:{href:"https://circleci.com/account/api",target:"_blank"}},[t._v("here")]),t._v("\n      to create a new API token\n    ")]),t._v(" "),n("md-button",{staticClass:"md-raised md-primary",attrs:{type:"submit"}},[t._v("\n      Submit\n    ")])],1)])},staticRenderFns:[]}},411:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("page-header"),t._v(" "),n("transition",{attrs:{name:"fade",mode:"out-in"}},[n("router-view")],1)],1)},staticRenderFns:[]}},414:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(162),o=(n.n(r),n(60)),a=n.n(o),s=n(164),c=n.n(s),i=n(163),u=n.n(i),l=n(161),p=n(121),f=n(78);a.a.use(c.a),a.a.material.registerTheme("default",{primary:"purple"}),a.a.material.registerTheme({success:{primary:"green"},fail:{primary:"red"},warn:{primary:"orange"}}),p.a.state.projects.all.length||n.i(f.a)("projects").then(function(t){if(200===t.status)return t.json();throw new Error(t)}).then(function(t){return p.a.dispatch("fetchProject",t)}).catch(function(){localStorage.removeItem("api-token"),l.a.replace({name:"token"})}),new a.a({el:"#app",router:l.a,store:p.a,template:"<App/>",components:{App:u.a}})},78:function(t,e,n){"use strict";var r=n(53),o=n.n(r),a=n(170),s=n.n(a),c=n(169),i=window.fetch;e.a=function(t,e){return i(s()(t),e?o()({},{headers:n.i(c.a)(e.headers)},e||{}):{headers:{Accept:"application/json"}})}},79:function(t,e,n){"use strict";n.d(e,"c",function(){return r}),n.d(e,"a",function(){return o}),n.d(e,"b",function(){return a});var r="SET_TOKEN",o="FETCH_PROJECT",a="FETCH_REPORT"}},[414]);
//# sourceMappingURL=app.js.map
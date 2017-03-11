webpackJsonp([1,2],{123:function(t,e,r){"use strict";var n=r(61),s=r.n(n),o=r(121),i=r(291),a=r(288),c=r(290),u=r(289);s.a.use(o.c),e.a=new o.c.Store({state:i.a,actions:a.a,mutations:c.a,modules:{projects:u.a}})},272:function(t,e,r){"use strict";var n=r(61),s=r.n(n),o=r(529),i=r(123);s.a.use(o.a);var a=new o.a({routes:[r(287),r(284),r(286),r(285)]});a.beforeEach(function(t,e,r){i.a.state.token||"token"===t.name?r():r({name:"token"})}),e.a=a},274:function(t,e,r){var n=r(33)(r(276),r(528),null,null);t.exports=n.exports},276:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"app",components:{"page-header":r(515)},methods:{refresh:function(){this.$root.$emit("refresh")},logout:function(){this.$store.dispatch("logout"),this.$router.replace({name:"token"})}}}},277:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r(1),s=r.n(n),o=r(121),i=r(60);e.default={data:function(){return{fetching:!0}},computed:r.i(o.b)({projects:"projectOverview"}),components:{container:r(80)},mounted:function(){var t=this;0===this.$store.state.projects.all.length?this.fetchProject().then(function(){return t.fetching=!1}).catch(function(){localStorage.removeItem("api-token"),t.$router.replace({name:"token"})}):this.fetching=!1,this.$root.$on("refresh",function(){return t.fetchProject()})},methods:{buildTime:function(t){return s()(t).format("Do MMM YYYY (HH:mm:ss)")},fetchProject:function(){var t=this;return r.i(i.a)("projects").then(function(t){if(200===t.status)return t.json();throw new Error(t)}).then(function(e){return t.$store.dispatch("fetchProject",e)})}}}},278:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r(125),s=r.n(n),o=r(1),i=r.n(o),a=r(60),c=r(81);e.default={data:function(){return{error:null,fetching:!0,builds:[]}},computed:{projectUrl:function(){return"https://"+("github"===this.$route.params.host?"github.com":"bitbucket.org")+"/"+this.owner+"/"+this.project}},components:{container:r(80)},watch:{$route:function(){this.displayBuilds()}},mounted:function(){var t=this;this.displayBuilds(),this.$root.$on("refresh",function(){return t.refresh()})},methods:{buildTime:function(t){return i()(t).format("Do MMM YYYY (HH:mm:ss)")},refresh:function(){var t=this;this.fetchBuilds().then(function(){return t.builds=t.$store.getters.getBuild(t.$route.params.host,t.$route.params.owner,t.$route.params.project)}).catch(function(e){console.trace(e),t.error="Response with status "+e.status+", please check fetching correct report or url project exists"})},displayBuilds:function(){var t=this,e=function(){t.error=null,t.fetching=!1,t.builds=t.$store.getters.getBuild(t.$route.params.host,t.$route.params.owner,t.$route.params.project)};r.i(c.a)(this.$store.state.projects.reports,this.$route.params)?e():this.fetchBuilds().then(function(){return e()}).catch(function(e){console.trace(e),t.fetching=!1,t.error="Response with status "+e.status+", please check fetching correct report or url project exists"})},fetchBuilds:function(){var t=this;return r.i(a.a)("project/"+this.$route.params.host+"/"+this.$route.params.owner+"/"+this.$route.params.project+"/tree/master?filter=completed").then(function(t){if(200===t.status)return t.json();throw t}).then(function(e){return t.$store.dispatch("fetchBuild",s()({data:e},t.$route.params))})}}}},279:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{}},components:{container:r(80),"report-card":r(519)}}},280:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r(125),s=r.n(n),o=r(121),i=r(60),a=r(81);e.default={props:["owner","projectName","build","host"],data:function(){return{fetching:!0,project:null,reports:[],error:null}},computed:s()({badge:function(){return"https://circleci.com/"+("github"===this.host?"gh":"bb")+"/"+this.owner+"/"+this.projectName+"/tree/master.svg?style=svg&circle-token="+this.token},projectUrl:function(){return"https://"+("github"===this.host?"github.com":"bitbucket.org")+"/"+this.owner+"/"+this.projectName}},r.i(o.a)(["token"]),r.i(o.b)(["getProject","getReport"])),mounted:function(){this.displayReport(this.host,this.owner,this.projectName,this.build)},watch:{owner:function(){this.displayReport(this.host,this.owner,this.projectName,this.build)},build:function(){this.displayReport(this.host,this.owner,this.projectName,this.build)},projectName:function(){this.displayReport(this.host,this.owner,this.projectName,this.build)},host:function(){this.displayReport(this.host,this.owner,this.projectName,this.build)}},methods:{titleReport:function(t){var e=t.replace("$CIRCLE_ARTIFACTS/","").replace("/index.html","");return""+e.charAt(0).toUpperCase()+e.substr(1)},displayReport:function(t,e,n,s){var o=this,c=function(){o.error=null,o.fetching=!1,o.project=o.getProject(e,n),o.reports=o.getReport(t,e,n,s)};r.i(a.b)(this.$store.state.projects.reports,{host:t,owner:e,project:n,build:s})?c():r.i(i.a)("project/"+t+"/"+e+"/"+n+"/"+s+"/artifacts").then(function(t){if(200===t.status)return t.json();throw t}).then(function(r){return o.$store.dispatch("fetchReport",{host:t,owner:e,project:n,build:s,data:r})}).then(function(){return c()}).catch(function(t){console.trace(t),o.fetching=!1,o.error="Response with status "+t.status+", please check fetching correct report or url project exists"})}}}},281:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r(80),s=r.n(n);e.default={data:function(){return{token:""}},components:{container:s.a},methods:{submit:function(){localStorage.setItem("api-token",this.token),this.$store.dispatch("saveToken",this.token),this.$router.replace({name:"home"})}}}},282:function(t,e,r){"use strict";var n=r(62),s=r.n(n),o=r(295),i=r.n(o);e.a=function(t){if(!(t instanceof Headers))return t&&"object"===(void 0===t?"undefined":i()(t))?s()({},{Accept:"application/json"},t):{Accept:"application/json"};t.set("Accept","application/json")}},283:function(t,e,r){"use strict";t.exports=function(t){var e=localStorage.getItem("api-token"),r=new URL(t,"https://circleci.com/api/v1.1/").toString();return r+(r.indexOf("?")!==-1?"&":"?")+"circle-token="+e}},284:function(t,e,r){"use strict";t.exports={path:"/",name:"home",component:r(516)}},285:function(t,e,r){"use strict";t.exports={path:"/report/:host/:owner/:project",name:"project",component:r(517)}},286:function(t,e,r){"use strict";t.exports={path:"/report/:host/:owner/:project/:build",name:"report",component:r(518)}},287:function(t,e,r){"use strict";t.exports={path:"/token",name:"token",component:r(520)}},288:function(t,e,r){"use strict";var n=r(82);e.a={saveToken:function(t,e){(0,t.commit)(n.e,e)},logout:function(t){var e=t.commit;e(n.e,null),e(n.d),localStorage.clear()}}},289:function(t,e,r){"use strict";function n(t,e){if(!e)return"success";if(t&&t.build_num>e.build_num)return"success";var r=e.outcome;return m.indexOf(r)!==-1?"warn":"fail"}var s,o=r(124),i=r.n(o),a=r(62),c=r.n(a),u=r(82),l=r(81),m=["canceled","no_tests"],d={failed:{content:"bug_report",theme:"fail"},success:{content:"done",theme:"success"},fixed:{content:"build",theme:"success"},timedout:{content:"alarm",theme:"fail"},no_tests:{content:"do_not_disturb_alt",theme:"warn"}},p={all:[],reports:{bitbucket:{},github:{}},builds:{bitbucket:{},github:{}}},h=(s={},i()(s,u.a,function(t,e){t.all=e}),i()(s,u.b,function(t,e){var r=e.host,n=e.owner,s=e.project,o=e.build,a=e.data;t.reports=c()({},t.reports,i()({},r,i()({},n,i()({},s,i()({},o,a)))))}),i()(s,u.c,function(t,e){var r=e.host,n=e.owner,s=e.project,o=e.data;t.builds=c()({},t.builds,i()({},r,i()({},n,i()({},s,o))))}),i()(s,u.d,function(t){t.all=[],t.reports={bitbucket:{},github:{}},t.builds={bitbucket:{},github:{}}}),s),f={fetchProject:function(t,e){(0,t.commit)(u.a,e)},fetchReport:function(t,e){(0,t.commit)(u.b,e)},fetchBuild:function(t,e){(0,t.commit)(u.c,e)}},j={allProject:function(t){return t.all},projectOverview:function(t,e){return e.allProject.map(function(t){if(!("master"in t.branches))return{};var e=t.branches.master.last_success,r=t.branches.master.last_non_success,s=n(e,r),o="success"===s?e:r;return{status:s,report:{name:"report",params:{host:t.vcs_type,owner:t.username,project:t.reponame,build:o.build_num}},projectPage:{name:"project",params:{host:t.vcs_type,owner:t.username,project:t.reponame}},commit:o.vcs_revision.substr(0,7),icon:t.vcs_type,name:t.reponame,build:o.build_num,url:t.vcs_url,owner:t.username,time:o.added_at}})},getProject:function(t,e){var r=e.projectOverview;return function(t,e){var n=r.filter(function(r){return r.name===e&&r.owner===t});return n.length>0?n[0]:null}},getReport:function(t){return function(e,n,s,o){if(r.i(l.b)(t.reports,{host:e,owner:n,project:s,build:o})){var i=t.reports[e][n][s][o],a=i.filter(function(t){return t.path.endsWith("index.html")}),c=a.reduce(function(t,e){var r=e.pretty_path.split("/").length;return r<t?r:t},1/0);return a.filter(function(t){return t.pretty_path.split("/").length===c})}return[]}},getBuild:function(t){return function(e,n,s){if(r.i(l.a)(t.builds,{host:e,owner:n,project:s})){return t.builds[e][n][s].map(function(t){return{url:{name:"report",params:{host:e,owner:n,project:s,build:t.build_num}},number:t.build_num,status:t.status in d?d[t.status]:t.status,message:t.subject,author:t.author_name,time:t.stop_time,commit:t.vcs_revision.substr(0,7)}})}return[]}}};e.a={state:p,mutations:h,actions:f,getters:j}},290:function(t,e,r){"use strict";var n=r(124),s=r.n(n),o=r(82);e.a=s()({},o.e,function(t,e){t.token=e})},291:function(t,e,r){"use strict";var n=localStorage.getItem("api-token");e.a={token:n}},509:function(t,e){},510:function(t,e){},511:function(t,e){},512:function(t,e,r){function n(t){return r(s(t))}function s(t){var e=o[t];if(!(e+1))throw new Error("Cannot find module '"+t+"'.");return e}var o={"./af":164,"./af.js":164,"./ar":170,"./ar-dz":165,"./ar-dz.js":165,"./ar-ly":166,"./ar-ly.js":166,"./ar-ma":167,"./ar-ma.js":167,"./ar-sa":168,"./ar-sa.js":168,"./ar-tn":169,"./ar-tn.js":169,"./ar.js":170,"./az":171,"./az.js":171,"./be":172,"./be.js":172,"./bg":173,"./bg.js":173,"./bn":174,"./bn.js":174,"./bo":175,"./bo.js":175,"./br":176,"./br.js":176,"./bs":177,"./bs.js":177,"./ca":178,"./ca.js":178,"./cs":179,"./cs.js":179,"./cv":180,"./cv.js":180,"./cy":181,"./cy.js":181,"./da":182,"./da.js":182,"./de":184,"./de-at":183,"./de-at.js":183,"./de.js":184,"./dv":185,"./dv.js":185,"./el":186,"./el.js":186,"./en-au":187,"./en-au.js":187,"./en-ca":188,"./en-ca.js":188,"./en-gb":189,"./en-gb.js":189,"./en-ie":190,"./en-ie.js":190,"./en-nz":191,"./en-nz.js":191,"./eo":192,"./eo.js":192,"./es":194,"./es-do":193,"./es-do.js":193,"./es.js":194,"./et":195,"./et.js":195,"./eu":196,"./eu.js":196,"./fa":197,"./fa.js":197,"./fi":198,"./fi.js":198,"./fo":199,"./fo.js":199,"./fr":202,"./fr-ca":200,"./fr-ca.js":200,"./fr-ch":201,"./fr-ch.js":201,"./fr.js":202,"./fy":203,"./fy.js":203,"./gd":204,"./gd.js":204,"./gl":205,"./gl.js":205,"./he":206,"./he.js":206,"./hi":207,"./hi.js":207,"./hr":208,"./hr.js":208,"./hu":209,"./hu.js":209,"./hy-am":210,"./hy-am.js":210,"./id":211,"./id.js":211,"./is":212,"./is.js":212,"./it":213,"./it.js":213,"./ja":214,"./ja.js":214,"./jv":215,"./jv.js":215,"./ka":216,"./ka.js":216,"./kk":217,"./kk.js":217,"./km":218,"./km.js":218,"./ko":219,"./ko.js":219,"./ky":220,"./ky.js":220,"./lb":221,"./lb.js":221,"./lo":222,"./lo.js":222,"./lt":223,"./lt.js":223,"./lv":224,"./lv.js":224,"./me":225,"./me.js":225,"./mi":226,"./mi.js":226,"./mk":227,"./mk.js":227,"./ml":228,"./ml.js":228,"./mr":229,"./mr.js":229,"./ms":231,"./ms-my":230,"./ms-my.js":230,"./ms.js":231,"./my":232,"./my.js":232,"./nb":233,"./nb.js":233,"./ne":234,"./ne.js":234,"./nl":236,"./nl-be":235,"./nl-be.js":235,"./nl.js":236,"./nn":237,"./nn.js":237,"./pa-in":238,"./pa-in.js":238,"./pl":239,"./pl.js":239,"./pt":241,"./pt-br":240,"./pt-br.js":240,"./pt.js":241,"./ro":242,"./ro.js":242,"./ru":243,"./ru.js":243,"./se":244,"./se.js":244,"./si":245,"./si.js":245,"./sk":246,"./sk.js":246,"./sl":247,"./sl.js":247,"./sq":248,"./sq.js":248,"./sr":250,"./sr-cyrl":249,"./sr-cyrl.js":249,"./sr.js":250,"./ss":251,"./ss.js":251,"./sv":252,"./sv.js":252,"./sw":253,"./sw.js":253,"./ta":254,"./ta.js":254,"./te":255,"./te.js":255,"./tet":256,"./tet.js":256,"./th":257,"./th.js":257,"./tl-ph":258,"./tl-ph.js":258,"./tlh":259,"./tlh.js":259,"./tr":260,"./tr.js":260,"./tzl":261,"./tzl.js":261,"./tzm":263,"./tzm-latn":262,"./tzm-latn.js":262,"./tzm.js":263,"./uk":264,"./uk.js":264,"./uz":265,"./uz.js":265,"./vi":266,"./vi.js":266,"./x-pseudo":267,"./x-pseudo.js":267,"./yo":268,"./yo.js":268,"./zh-cn":269,"./zh-cn.js":269,"./zh-hk":270,"./zh-hk.js":270,"./zh-tw":271,"./zh-tw.js":271};n.keys=function(){return Object.keys(o)},n.resolve=s,t.exports=n,n.id=512},515:function(t,e,r){r(509);var n=r(33)(null,r(522),"data-v-09f4815e",null);t.exports=n.exports},516:function(t,e,r){r(510);var n=r(33)(r(277),r(523),"data-v-0fdc74f0",null);t.exports=n.exports},517:function(t,e,r){var n=r(33)(r(278),r(527),null,null);t.exports=n.exports},518:function(t,e,r){var n=r(33)(r(279),r(521),null,null);t.exports=n.exports},519:function(t,e,r){var n=r(33)(r(280),r(525),null,null);t.exports=n.exports},520:function(t,e,r){var n=r(33)(r(281),r(526),null,null);t.exports=n.exports},521:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("container",[r("report-card",{attrs:{host:t.$route.params.host,owner:t.$route.params.owner,projectName:t.$route.params.project,build:t.$route.params.build}})],1)},staticRenderFns:[]}},522:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("md-toolbar",[r("h1",{staticClass:"md-title"},[r("router-link",{attrs:{to:{name:"home"}}},[t._v("\n            Circle CI Dashboard\n        ")])],1)])},staticRenderFns:[]}},523:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("container",[r("h2",[t._v("Projects")]),t._v(" "),t.fetching?r("br"):t._e(),t._v(" "),t.fetching?r("md-progress",{attrs:{"md-indeterminate":""}}):t._e(),t._v(" "),r("md-list",{staticClass:"md-triple-line"},t._l(t.projects,function(e){return e?r("md-list-item",{key:e.name,attrs:{"md-theme":e.status}},[r("md-icon",{staticClass:"md-accent",class:"fa-"+e.icon,attrs:{"md-iconset":"fa","md-theme":e.status}}),t._v(" "),r("div",{staticClass:"md-list-text-container"},[r("span",[t._v(t._s(e.name)+" #"+t._s(e.build))]),t._v(" "),r("span",[t._v(t._s(t.buildTime(e.time)))]),t._v(" "),r("span",[t._v(t._s(e.commit))])]),t._v(" "),r("md-card-actions",[r("md-button",{staticClass:"md-icon-button md-list-action md-raised md-accent",attrs:{href:t.$router.resolve(e.projectPage).href,"md-theme":e.status}},[r("md-icon",[t._v("list")])],1),t._v(" "),"warn"!==e.status?r("md-button",{staticClass:"md-icon-button md-list-action md-raised md-accent",attrs:{href:t.$router.resolve(e.report).href,"md-theme":e.status}},[r("md-icon",[t._v("receipt")])],1):t._e()],1)],1):t._e()}))],1)},staticRenderFns:[]}},524:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{staticClass:"container"},[t._t("default")],2)},staticRenderFns:[]}},525:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("md-card",[r("md-card-header",[null===t.error?r("div",{staticClass:"md-title"},[r("h2",[t._v("\n                "+t._s(t.owner)+" / "+t._s(t.projectName)+"\n                #"+t._s(t.build)+"\n                "),r("a",{attrs:{href:t.projectUrl,target:"_blank"}},[r("i",{staticClass:"fa",class:"fa-"+t.host})]),t._v(" "),t.badge?r("img",{attrs:{src:t.badge}}):t._e()])]):t._e(),t._v(" "),null!==t.error?r("div",{staticClass:"md-title"},[t._v("\n            Error occur\n        ")]):t._e()]),t._v(" "),r("md-card-content",[t.fetching?r("md-progress",{attrs:{"md-indeterminate":""}}):t._e(),t._v(" "),t.reports.length>0?r("md-list",t._l(t.reports,function(e){return r("md-list-item",{key:e.path,attrs:{href:e.url,target:"_blank"}},[t._v("\n                "+t._s(t.titleReport(e.pretty_path))+"\n                "),r("md-icon",{staticClass:"md-accent"},[t._v("send")])],1)})):t._e()],1),t._v(" "),null!==t.error?r("md-card-content",[t._v("\n        "+t._s(t.error)+"\n    ")]):t._e(),t._v(" "),null!==t.error?r("md-card-actions",[r("md-button",{staticClass:"md-raised md-accent",attrs:{href:t.$router.resolve({name:"home"}).href}},[t._v("Home")])],1):t._e()],1)},staticRenderFns:[]}},526:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("container",[r("h2",[t._v("Input Token")]),t._v(" "),r("form",{attrs:{novalidate:""},on:{submit:function(e){e.stopPropagation(),e.preventDefault(),t.submit(e)}}},[r("md-input-container",[r("label",[t._v("Circle CI API Token")]),t._v(" "),r("md-input",{model:{value:t.token,callback:function(e){t.token=e},expression:"token"}})],1),t._v(" "),r("p",[t._v("\n      You may go to\n      "),r("a",{attrs:{href:"https://circleci.com/account/api",target:"_blank"}},[t._v("here")]),t._v("\n      to create a new API token\n    ")]),t._v(" "),r("md-button",{staticClass:"md-raised md-primary",attrs:{type:"submit"}},[t._v("\n      Submit\n    ")])],1)])},staticRenderFns:[]}},527:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("container",[null===t.error?r("div",{staticClass:"md-title"},[r("h2",[t._v("\n            "+t._s(t.$route.params.owner)+" / "+t._s(t.$route.params.project)+"\n            "),r("a",{attrs:{href:t.projectUrl,target:"_blank"}},[r("i",{staticClass:"fa",class:"fa-"+t.$route.params.host})])])]):t._e(),t._v(" "),r("md-list",[t.fetching?r("md-progress",{attrs:{"md-indeterminate":""}}):t._e(),t._v(" "),t.builds.length>0?r("md-list",{staticClass:"md-triple-line"},t._l(t.builds,function(e){return r("md-list-item",{key:e.number,attrs:{target:"_blank"}},[r("md-icon",{staticClass:"md-primary",attrs:{"md-theme":e.status.theme}},[t._v(t._s(e.status.content))]),t._v(" "),r("div",{staticClass:"md-list-text-container"},[r("span",{staticClass:"md-title"},[t._v("#"+t._s(e.number)+" "+t._s(e.message))]),t._v(" "),r("span",{staticClass:"md-subhead"},[t._v(t._s(e.commit)+" ("+t._s(e.author)+")")]),t._v(" "),r("span",[t._v(t._s(t.buildTime(e.time)))])]),t._v(" "),r("md-button",{staticClass:"md-icon-button md-list-action",attrs:{href:t.$router.resolve(e.url).href}},[r("md-icon",{staticClass:"md-accent"},[t._v("send")])],1)],1)})):t._e()],1)],1)},staticRenderFns:[]}},528:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{attrs:{id:"app"}},[r("page-header"),t._v(" "),r("transition",{attrs:{name:"fade",mode:"out-in"}},[r("router-view")],1),t._v(" "),r("md-speed-dial",{staticClass:"md-fab-top-right",attrs:{"md-open":"click","md-direction":"bottom"}},[r("md-button",{staticClass:"md-fab",attrs:{"md-fab-trigger":""}},[r("md-icon",{attrs:{"md-icon-morph":""}},[t._v("close")]),t._v(" "),r("md-icon",[t._v("settings")])],1),t._v(" "),r("md-button",{staticClass:"md-fab md-primary md-mini md-clean",nativeOn:{click:function(e){t.refresh(e)}}},[r("md-icon",[t._v("refresh")])],1),t._v(" "),r("md-button",{staticClass:"md-fab md-primary md-mini md-clean",nativeOn:{click:function(e){t.logout(e)}}},[r("md-icon",[t._v("exit_to_app")])],1)],1)],1)},staticRenderFns:[]}},532:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r(273),s=(r.n(n),r(61)),o=r.n(s),i=r(275),a=r.n(i),c=r(274),u=r.n(c),l=r(272),m=r(123),d=r(60);o.a.use(a.a),o.a.material.registerTheme("default",{primary:"purple"}),o.a.material.registerTheme({success:{primary:"green",accent:"white"},fail:{primary:"red",accent:"white"},warn:{primary:"orange",accent:"white"}}),m.a.state.projects.all.length||r.i(d.a)("projects").then(function(t){if(200===t.status)return t.json();throw new Error(t)}).then(function(t){return m.a.dispatch("fetchProject",t)}).catch(function(){localStorage.removeItem("api-token"),l.a.replace({name:"token"})}),new o.a({el:"#app",router:l.a,store:m.a,template:"<App/>",components:{App:u.a}})},60:function(t,e,r){"use strict";var n=r(62),s=r.n(n),o=r(283),i=r.n(o),a=r(282),c=window.fetch;e.a=function(t,e){return c(i()(t),e?s()({},{headers:r.i(a.a)(e.headers)},e||{}):{headers:{Accept:"application/json"}})}},80:function(t,e,r){r(511);var n=r(33)(null,r(524),null,null);t.exports=n.exports},81:function(t,e,r){"use strict";function n(t,e){var r=t[e.host];return r&&e.owner in r&&e.project in r[e.owner]}function s(t,e){var r=t[e.host];return n(t,e)&&e.build in r[e.owner][e.project]}e.a=n,e.b=s},82:function(t,e,r){"use strict";r.d(e,"e",function(){return n}),r.d(e,"a",function(){return s}),r.d(e,"b",function(){return o}),r.d(e,"c",function(){return i}),r.d(e,"d",function(){return a});var n="SET_TOKEN",s="FETCH_PROJECT",o="FETCH_REPORT",i="FETCH_BUILD",a="CLEAR_PROJECT"}},[532]);
//# sourceMappingURL=app.js.map
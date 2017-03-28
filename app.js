webpackJsonp([1],{110:function(t,e,r){r(665);var n=r(33)(null,r(820),null,null);t.exports=n.exports},112:function(t,e,r){"use strict";function n(t,e){var r=t[e.host];return r&&e.owner in r&&e.project in r[e.owner]}function s(t,e){var r=t[e.host];return n(t,e)&&e.build in r[e.owner][e.project]}e.a=n,e.b=s},113:function(t,e,r){"use strict";r.d(e,"e",function(){return n}),r.d(e,"a",function(){return s}),r.d(e,"b",function(){return o}),r.d(e,"c",function(){return a}),r.d(e,"d",function(){return i});var n="SET_TOKEN",s="FETCH_PROJECT",o="FETCH_REPORT",a="FETCH_BUILD",i="CLEAR_PROJECT"},171:function(t,e,r){"use strict";var n=r(19),s=r.n(n),o=r(170),a=r(396),i=r(393),c=r(395),u=r(394);s.a.use(o.c),e.a=new o.c.Store({state:a.a,actions:i.a,mutations:c.a,modules:{projects:u.a}})},375:function(t,e,r){"use strict";var n=r(19),s=r.n(n),o=r(825),a=r(171);s.a.use(o.a);var i=new o.a({routes:[r(392),r(389),r(391),r(390)]});i.beforeEach(function(t,e,r){a.a.state.token||"token"===t.name?r():r({name:"token"})}),e.a=i},377:function(t,e,r){var n=r(33)(r(379),r(824),null,null);t.exports=n.exports},379:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"app",components:{"page-header":r(811)},methods:{refresh:function(){this.$root.$emit("refresh")},logout:function(){this.$store.dispatch("logout"),this.$router.replace({name:"token"})}}}},380:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r(806);r.n(n);e.default=n.Line.extend({props:["data","options"],mounted:function(){this.render()},watch:{data:function(){this.render()}},methods:{render:function(){this.renderChart(this.data,this.options)}}})},381:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r(0),s=r.n(n),o=r(170),a=r(76);e.default={data:function(){return{fetching:!0}},computed:r.i(o.b)({projects:"projectOverview"}),components:{container:r(110)},mounted:function(){var t=this;0===this.$store.state.projects.all.length?this.fetchProject().then(function(){return t.fetching=!1}).catch(function(){localStorage.removeItem("api-token"),t.$router.replace({name:"token"})}):this.fetching=!1,this.$root.$on("refresh",function(){return"home"===t.$router.currentRoute.name&&t.fetchProject()})},methods:{buildTime:function(t){return s()(t).format("Do MMM YYYY (HH:mm:ss)")},fetchProject:function(){var t=this;return this.fetching=!0,r.i(a.a)("projects").then(function(t){if(200===t.status)return t.json();throw new Error(t)}).then(function(e){return t.$store.dispatch("fetchProject",e)}).then(function(){t.fetching=!1})}}}},382:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r(174),s=r.n(n),o=r(0),a=r.n(o),i=r(76),c=r(112),u=r(810),l=r.n(u);e.default={data:function(){return{error:null,fetching:!0,builds:[],graphOption:{scales:{yAxes:[{id:"build",position:"left",beginAtZero:!0,scaleLabel:{display:!0,labelString:"Build Time (Minutes)"}},{id:"queue",position:"right",beginAtZero:!0,scaleLabel:{display:!0,labelString:"Queue Time (Minutes)"}}]}}}},computed:{badge:function(){return"https://circleci.com/"+("github"===this.$route.params.host?"gh":"bb")+"/"+this.$route.params.owner+"/"+this.$route.params.project+"/tree/master.svg?style=svg&circle-token="+this.$store.state.token},projectUrl:function(){return"https://"+("github"===this.$route.params.host?"github.com":"bitbucket.org")+"/"+this.$route.params.owner+"/"+this.$route.params.project},graphData:function(){var t=this.$store.getters.getBuildTime(this.$route.params.host,this.$route.params.owner,this.$route.params.project);return{xLabels:t.map(function(t){return t.number}).reverse(),datasets:[{label:"Build Time",borderColor:"#673AB7",data:t.map(function(t){return t.end.diff(t.start)/1e3/60}).reverse(),fill:!1,yAxisID:"build"},{label:"Queue Time",borderColor:"#ff4081",data:t.map(function(t){return Math.abs(t.start.diff(t.queue))/1e3/60}).reverse(),fill:!1,yAxisID:"queue"}]}}},components:{container:r(110),Graph:l.a},watch:{$route:function(){this.displayBuilds()}},mounted:function(){var t=this;this.displayBuilds(),this.$root.$on("refresh",function(){return"project"===t.$router.currentRoute.name&&t.refresh()})},methods:{buildTime:function(t){return a()(t).format("Do MMM YYYY (HH:mm:ss)")},refresh:function(){var t=this;this.fetchBuilds().then(function(){return t.builds=t.$store.getters.getBuild(t.$route.params.host,t.$route.params.owner,t.$route.params.project)}).catch(function(e){"".trace(e),t.error="Response with status "+e.status+", please check fetching correct report or url project exists"})},displayBuilds:function(){var t=this,e=function(){t.error=null,t.fetching=!1,t.builds=t.$store.getters.getBuild(t.$route.params.host,t.$route.params.owner,t.$route.params.project)};r.i(c.a)(this.$store.state.projects.reports,this.$route.params)?e():this.fetchBuilds().then(function(){return e()}).catch(function(e){console.trace(e),t.fetching=!1,t.error="Response with status "+e.status+", please check fetching correct report or url project exists"})},fetchBuilds:function(){var t=this;return this.fetching=!0,r.i(i.a)("project/"+this.$route.params.host+"/"+this.$route.params.owner+"/"+this.$route.params.project+"/tree/master?filter=completed").then(function(t){if(200===t.status)return t.json();throw t}).then(function(e){return t.$store.dispatch("fetchBuild",s()({data:e},t.$route.params))}).then(function(){t.fetching=!1})}}}},383:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{}},components:{container:r(110),"report-card":r(815)}}},384:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r(174),s=r.n(n),o=r(170),a=r(76),i=r(112);e.default={props:["owner","projectName","build","host"],data:function(){return{fetching:!0,project:null,reports:[],error:null}},computed:s()({projectUrl:function(){return"https://"+("github"===this.host?"github.com":"bitbucket.org")+"/"+this.owner+"/"+this.projectName}},r.i(o.a)(["token"]),r.i(o.b)(["getProject","getReport"])),mounted:function(){this.displayReport(this.host,this.owner,this.projectName,this.build)},watch:{owner:function(){this.displayReport(this.host,this.owner,this.projectName,this.build)},build:function(){this.displayReport(this.host,this.owner,this.projectName,this.build)},projectName:function(){this.displayReport(this.host,this.owner,this.projectName,this.build)},host:function(){this.displayReport(this.host,this.owner,this.projectName,this.build)}},methods:{titleReport:function(t){var e=t.replace("$CIRCLE_ARTIFACTS/","").replace("/index.html","");return""+e.charAt(0).toUpperCase()+e.substr(1)},displayReport:function(t,e,n,s){var o=this,c=function(){o.error=null,o.fetching=!1,o.project=o.getProject(e,n),o.reports=o.getReport(t,e,n,s)};r.i(i.b)(this.$store.state.projects.reports,{host:t,owner:e,project:n,build:s})?c():r.i(a.a)("project/"+t+"/"+e+"/"+n+"/"+s+"/artifacts").then(function(t){if(200===t.status)return t.json();throw t}).then(function(r){return o.$store.dispatch("fetchReport",{host:t,owner:e,project:n,build:s,data:r})}).then(function(){return c()}).catch(function(t){console.trace(t),o.fetching=!1,o.error="Response with status "+t.status+", please check fetching correct report or url project exists"})}}}},385:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r(110),s=r.n(n);e.default={data:function(){return{token:""}},components:{container:s.a},methods:{submit:function(){localStorage.setItem("api-token",this.token),this.$store.dispatch("saveToken",this.token),this.$router.replace({name:"home"})}}}},386:function(t,e,r){"use strict";var n=r(77),s=r.n(n),o=r(400),a=r.n(o);e.a=function(t){if(!(t instanceof Headers))return t&&"object"===(void 0===t?"undefined":a()(t))?s()({},{Accept:"application/json"},t):{Accept:"application/json"};t.set("Accept","application/json")}},387:function(t,e,r){"use strict";t.exports=function(t){var e=localStorage.getItem("api-token"),r=new URL(t,"https://circleci.com/api/v1.1/").toString();return r+(r.indexOf("?")!==-1?"&":"?")+"circle-token="+e}},388:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r(376),s=(r.n(n),r(19)),o=r.n(s),a=r(378),i=r.n(a),c=r(377),u=r.n(c),l=r(375),d=r(171),m=r(76);o.a.use(i.a),o.a.material.registerTheme("default",{primary:"deep-purple"}),o.a.material.registerTheme({success:{primary:"green",accent:"white"},fail:{primary:"red",accent:"white"},warn:{primary:"orange",accent:"white"}}),d.a.state.projects.all.length||r.i(m.a)("projects").then(function(t){if(200===t.status)return t.json();throw new Error(t)}).then(function(t){return d.a.dispatch("fetchProject",t)}).catch(function(){localStorage.removeItem("api-token"),l.a.replace({name:"token"})}),new o.a({el:"#app",router:l.a,store:d.a,template:"<App/>",components:{App:u.a}})},389:function(t,e,r){"use strict";t.exports={path:"/",name:"home",component:r(812)}},390:function(t,e,r){"use strict";t.exports={path:"/report/:host/:owner/:project",name:"project",component:r(813)}},391:function(t,e,r){"use strict";t.exports={path:"/report/:host/:owner/:project/:build",name:"report",component:r(814)}},392:function(t,e,r){"use strict";t.exports={path:"/token",name:"token",component:r(816)}},393:function(t,e,r){"use strict";var n=r(113);e.a={saveToken:function(t,e){(0,t.commit)(n.e,e)},logout:function(t){var e=t.commit;e(n.e,null),e(n.d),localStorage.clear()}}},394:function(t,e,r){"use strict";function n(t,e){if(!e)return"success";if(t&&t.build_num>e.build_num)return"success";var r=e.outcome;return p.indexOf(r)!==-1?"warn":"fail"}var s,o=r(173),a=r.n(o),i=r(77),c=r.n(i),u=r(0),l=r.n(u),d=r(113),m=r(112),p=["canceled","no_tests"],h={failed:{content:"bug_report",theme:"fail"},success:{content:"done",theme:"success"},fixed:{content:"build",theme:"success"},timedout:{content:"alarm",theme:"fail"},no_tests:{content:"do_not_disturb_alt",theme:"warn"}},f={all:[],reports:{bitbucket:{},github:{}},builds:{bitbucket:{},github:{}}},j=(s={},a()(s,d.a,function(t,e){t.all=e}),a()(s,d.b,function(t,e){var r=e.host,n=e.owner,s=e.project,o=e.build,i=e.data;t.reports=c()({},t.reports,a()({},r,a()({},n,a()({},s,a()({},o,i)))))}),a()(s,d.c,function(t,e){var r=e.host,n=e.owner,s=e.project,o=e.data;t.builds=c()({},t.builds,a()({},r,a()({},n,a()({},s,o))))}),a()(s,d.d,function(t){t.all=[],t.reports={bitbucket:{},github:{}},t.builds={bitbucket:{},github:{}}}),s),v={fetchProject:function(t,e){(0,t.commit)(d.a,e)},fetchReport:function(t,e){(0,t.commit)(d.b,e)},fetchBuild:function(t,e){(0,t.commit)(d.c,e)}},b={allProject:function(t){return t.all},projectOverview:function(t,e){return e.allProject.map(function(t){if(!("master"in t.branches))return{};var e=t.branches.master.last_success,r=t.branches.master.last_non_success,s=n(e,r),o="success"===s?e:r;return{status:s,report:{name:"report",params:{host:t.vcs_type,owner:t.username,project:t.reponame,build:o.build_num}},projectPage:{name:"project",params:{host:t.vcs_type,owner:t.username,project:t.reponame}},commit:o.vcs_revision.substr(0,7),icon:t.vcs_type,name:t.reponame,build:o.build_num,url:t.vcs_url,owner:t.username,time:o.added_at}})},getProject:function(t,e){var r=e.projectOverview;return function(t,e){var n=r.filter(function(r){return r.name===e&&r.owner===t});return n.length>0?n[0]:null}},getReport:function(t){return function(e,n,s,o){if(r.i(m.b)(t.reports,{host:e,owner:n,project:s,build:o})){var a=t.reports[e][n][s][o],i=a.filter(function(t){return t.path.endsWith("index.html")}),c=i.reduce(function(t,e){var r=e.pretty_path.split("/").length;return r<t?r:t},1/0);return i.filter(function(t){return t.pretty_path.split("/").length===c})}return[]}},getBuild:function(t){return function(e,n,s){if(r.i(m.a)(t.builds,{host:e,owner:n,project:s})){return t.builds[e][n][s].map(function(t){return{url:{name:"report",params:{host:e,owner:n,project:s,build:t.build_num}},number:t.build_num,status:t.status in h?h[t.status]:t.status,message:t.subject,author:t.author_name,time:t.stop_time,commit:t.vcs_revision.substr(0,7)}})}return[]}},getBuildTime:function(t){return function(e,n,s){if(r.i(m.a)(t.builds,{host:e,owner:n,project:s})){return t.builds[e][n][s].map(function(t){return{number:t.build_num,end:l()(t.stop_time),queue:l()(t.usage_queued_at),start:l()(t.start_time)}})}return[]}}};e.a={state:f,mutations:j,actions:v,getters:b}},395:function(t,e,r){"use strict";var n=r(173),s=r.n(n),o=r(113);e.a=s()({},o.e,function(t,e){t.token=e})},396:function(t,e,r){"use strict";var n=localStorage.getItem("api-token");e.a={token:n}},663:function(t,e){},664:function(t,e){},665:function(t,e){},76:function(t,e,r){"use strict";var n=r(77),s=r.n(n),o=r(387),a=r.n(o),i=r(386),c=window.fetch;e.a=function(t,e){return c(a()(t),e?s()({},{headers:r.i(i.a)(e.headers)},e||{}):{headers:{Accept:"application/json"}})}},795:function(t,e,r){function n(t){return r(s(t))}function s(t){var e=o[t];if(!(e+1))throw new Error("Cannot find module '"+t+"'.");return e}var o={"./af":260,"./af.js":260,"./ar":267,"./ar-dz":261,"./ar-dz.js":261,"./ar-kw":262,"./ar-kw.js":262,"./ar-ly":263,"./ar-ly.js":263,"./ar-ma":264,"./ar-ma.js":264,"./ar-sa":265,"./ar-sa.js":265,"./ar-tn":266,"./ar-tn.js":266,"./ar.js":267,"./az":268,"./az.js":268,"./be":269,"./be.js":269,"./bg":270,"./bg.js":270,"./bn":271,"./bn.js":271,"./bo":272,"./bo.js":272,"./br":273,"./br.js":273,"./bs":274,"./bs.js":274,"./ca":275,"./ca.js":275,"./cs":276,"./cs.js":276,"./cv":277,"./cv.js":277,"./cy":278,"./cy.js":278,"./da":279,"./da.js":279,"./de":282,"./de-at":280,"./de-at.js":280,"./de-ch":281,"./de-ch.js":281,"./de.js":282,"./dv":283,"./dv.js":283,"./el":284,"./el.js":284,"./en-au":285,"./en-au.js":285,"./en-ca":286,"./en-ca.js":286,"./en-gb":287,"./en-gb.js":287,"./en-ie":288,"./en-ie.js":288,"./en-nz":289,"./en-nz.js":289,"./eo":290,"./eo.js":290,"./es":292,"./es-do":291,"./es-do.js":291,"./es.js":292,"./et":293,"./et.js":293,"./eu":294,"./eu.js":294,"./fa":295,"./fa.js":295,"./fi":296,"./fi.js":296,"./fo":297,"./fo.js":297,"./fr":300,"./fr-ca":298,"./fr-ca.js":298,"./fr-ch":299,"./fr-ch.js":299,"./fr.js":300,"./fy":301,"./fy.js":301,"./gd":302,"./gd.js":302,"./gl":303,"./gl.js":303,"./gom-latn":304,"./gom-latn.js":304,"./he":305,"./he.js":305,"./hi":306,"./hi.js":306,"./hr":307,"./hr.js":307,"./hu":308,"./hu.js":308,"./hy-am":309,"./hy-am.js":309,"./id":310,"./id.js":310,"./is":311,"./is.js":311,"./it":312,"./it.js":312,"./ja":313,"./ja.js":313,"./jv":314,"./jv.js":314,"./ka":315,"./ka.js":315,"./kk":316,"./kk.js":316,"./km":317,"./km.js":317,"./kn":318,"./kn.js":318,"./ko":319,"./ko.js":319,"./ky":320,"./ky.js":320,"./lb":321,"./lb.js":321,"./lo":322,"./lo.js":322,"./lt":323,"./lt.js":323,"./lv":324,"./lv.js":324,"./me":325,"./me.js":325,"./mi":326,"./mi.js":326,"./mk":327,"./mk.js":327,"./ml":328,"./ml.js":328,"./mr":329,"./mr.js":329,"./ms":331,"./ms-my":330,"./ms-my.js":330,"./ms.js":331,"./my":332,"./my.js":332,"./nb":333,"./nb.js":333,"./ne":334,"./ne.js":334,"./nl":336,"./nl-be":335,"./nl-be.js":335,"./nl.js":336,"./nn":337,"./nn.js":337,"./pa-in":338,"./pa-in.js":338,"./pl":339,"./pl.js":339,"./pt":341,"./pt-br":340,"./pt-br.js":340,"./pt.js":341,"./ro":342,"./ro.js":342,"./ru":343,"./ru.js":343,"./sd":344,"./sd.js":344,"./se":345,"./se.js":345,"./si":346,"./si.js":346,"./sk":347,"./sk.js":347,"./sl":348,"./sl.js":348,"./sq":349,"./sq.js":349,"./sr":351,"./sr-cyrl":350,"./sr-cyrl.js":350,"./sr.js":351,"./ss":352,"./ss.js":352,"./sv":353,"./sv.js":353,"./sw":354,"./sw.js":354,"./ta":355,"./ta.js":355,"./te":356,"./te.js":356,"./tet":357,"./tet.js":357,"./th":358,"./th.js":358,"./tl-ph":359,"./tl-ph.js":359,"./tlh":360,"./tlh.js":360,"./tr":361,"./tr.js":361,"./tzl":362,"./tzl.js":362,"./tzm":364,"./tzm-latn":363,"./tzm-latn.js":363,"./tzm.js":364,"./uk":365,"./uk.js":365,"./ur":366,"./ur.js":366,"./uz":368,"./uz-latn":367,"./uz-latn.js":367,"./uz.js":368,"./vi":369,"./vi.js":369,"./x-pseudo":370,"./x-pseudo.js":370,"./yo":371,"./yo.js":371,"./zh-cn":372,"./zh-cn.js":372,"./zh-hk":373,"./zh-hk.js":373,"./zh-tw":374,"./zh-tw.js":374};n.keys=function(){return Object.keys(o)},n.resolve=s,t.exports=n,n.id=795},810:function(t,e,r){var n=r(33)(r(380),null,null,null);t.exports=n.exports},811:function(t,e,r){r(663);var n=r(33)(null,r(818),"data-v-09f4815e",null);t.exports=n.exports},812:function(t,e,r){r(664);var n=r(33)(r(381),r(819),"data-v-0fdc74f0",null);t.exports=n.exports},813:function(t,e,r){var n=r(33)(r(382),r(823),null,null);t.exports=n.exports},814:function(t,e,r){var n=r(33)(r(383),r(817),null,null);t.exports=n.exports},815:function(t,e,r){var n=r(33)(r(384),r(821),null,null);t.exports=n.exports},816:function(t,e,r){var n=r(33)(r(385),r(822),null,null);t.exports=n.exports},817:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("container",[r("report-card",{attrs:{host:t.$route.params.host,owner:t.$route.params.owner,projectName:t.$route.params.project,build:t.$route.params.build}})],1)},staticRenderFns:[]}},818:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("md-toolbar",[r("h1",{staticClass:"md-title"},[r("router-link",{attrs:{to:{name:"home"}}},[t._v("\n            Circle CI Dashboard\n        ")])],1)])},staticRenderFns:[]}},819:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("container",[r("h2",[t._v("Projects")]),t._v(" "),t.fetching?r("br"):t._e(),t._v(" "),t.fetching?r("md-progress",{attrs:{"md-indeterminate":""}}):t._e(),t._v(" "),r("md-list",{staticClass:"md-triple-line"},t._l(t.projects,function(e){return e?r("md-list-item",{key:e.name,attrs:{"md-theme":e.status}},[r("md-icon",{staticClass:"md-accent",class:"fa-"+e.icon,attrs:{"md-iconset":"fa","md-theme":e.status}}),t._v(" "),r("div",{staticClass:"md-list-text-container"},[r("span",[t._v(t._s(e.name)+" #"+t._s(e.build))]),t._v(" "),r("span",[t._v(t._s(t.buildTime(e.time)))]),t._v(" "),r("span",[t._v(t._s(e.commit))])]),t._v(" "),r("md-card-actions",[r("md-button",{staticClass:"md-icon-button md-list-action md-raised md-accent",attrs:{href:t.$router.resolve(e.projectPage).href,"md-theme":e.status}},[r("md-icon",[t._v("list")])],1),t._v(" "),"warn"!==e.status?r("md-button",{staticClass:"md-icon-button md-list-action md-raised md-accent",attrs:{href:t.$router.resolve(e.report).href,"md-theme":e.status}},[r("md-icon",[t._v("receipt")])],1):t._e()],1)],1):t._e()}))],1)},staticRenderFns:[]}},820:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{staticClass:"container"},[t._t("default")],2)},staticRenderFns:[]}},821:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("md-card",[r("md-card-header",[null===t.error?r("div",{staticClass:"md-title"},[r("h2",[t._v("\n                "+t._s(t.owner)+" / "+t._s(t.projectName)+"\n                #"+t._s(t.build)+"\n                "),r("a",{attrs:{href:t.projectUrl,target:"_blank"}},[r("i",{staticClass:"fa",class:"fa-"+t.host})])])]):t._e(),t._v(" "),null!==t.error?r("div",{staticClass:"md-title"},[t._v("\n            Error occur\n        ")]):t._e()]),t._v(" "),r("md-card-content",[t.fetching?r("md-progress",{attrs:{"md-indeterminate":""}}):t._e(),t._v(" "),t.reports.length>0?r("md-list",t._l(t.reports,function(e){return r("md-list-item",{key:e.path,attrs:{href:e.url,target:"_blank"}},[t._v("\n                "+t._s(t.titleReport(e.pretty_path))+"\n                "),r("md-icon",{staticClass:"md-accent"},[t._v("send")])],1)})):t._e()],1),t._v(" "),null!==t.error?r("md-card-content",[t._v("\n        "+t._s(t.error)+"\n    ")]):t._e(),t._v(" "),null!==t.error?r("md-card-actions",[r("md-button",{staticClass:"md-raised md-accent",attrs:{href:t.$router.resolve({name:"home"}).href}},[t._v("Home")])],1):t._e()],1)},staticRenderFns:[]}},822:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("container",[r("h2",[t._v("Input Token")]),t._v(" "),r("form",{attrs:{novalidate:""},on:{submit:function(e){e.stopPropagation(),e.preventDefault(),t.submit(e)}}},[r("md-input-container",[r("label",[t._v("Circle CI API Token")]),t._v(" "),r("md-input",{model:{value:t.token,callback:function(e){t.token=e},expression:"token"}})],1),t._v(" "),r("p",[t._v("\n      You may go to\n      "),r("a",{attrs:{href:"https://circleci.com/account/api",target:"_blank"}},[t._v("here")]),t._v("\n      to create a new API token\n    ")]),t._v(" "),r("md-button",{staticClass:"md-raised md-primary",attrs:{type:"submit"}},[t._v("\n      Submit\n    ")])],1)])},staticRenderFns:[]}},823:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("container",[null===t.error?r("div",{staticClass:"md-title"},[r("h2",[t._v("\n            "+t._s(t.$route.params.owner)+" / "+t._s(t.$route.params.project)+"\n            "),r("a",{attrs:{href:t.projectUrl,target:"_blank"}},[r("i",{staticClass:"fa",class:"fa-"+t.$route.params.host}),t._v(" "),t.badge?r("img",{attrs:{src:t.badge}}):t._e()])])]):t._e(),t._v(" "),r("div",[r("md-tabs",{attrs:{"md-fixed":""}},[r("md-tab",{attrs:{id:"list","md-label":"List"}},[t.fetching?r("md-progress",{attrs:{"md-indeterminate":""}}):t._e(),t._v(" "),t.builds.length>0?r("md-list",{staticClass:"md-triple-line"},t._l(t.builds,function(e){return r("md-list-item",{key:e.number,attrs:{target:"_blank"}},[r("md-icon",{staticClass:"md-primary",attrs:{"md-theme":e.status.theme}},[t._v(t._s(e.status.content))]),t._v(" "),r("div",{staticClass:"md-list-text-container"},[r("span",{staticClass:"md-title"},[t._v("#"+t._s(e.number)+" "+t._s(e.message))]),t._v(" "),r("span",{staticClass:"md-subhead"},[t._v(t._s(e.commit)+" ("+t._s(e.author)+")")]),t._v(" "),r("span",[t._v(t._s(t.buildTime(e.time)))])]),t._v(" "),r("md-button",{staticClass:"md-icon-button md-list-action",attrs:{href:t.$router.resolve(e.url).href}},[r("md-icon",{staticClass:"md-accent"},[t._v("send")])],1)],1)})):t._e()],1),t._v(" "),r("md-tab",{attrs:{id:"graph","md-label":"Graph"}},[t.fetching?r("md-progress",{attrs:{"md-indeterminate":""}}):t._e(),t._v(" "),r("graph",{attrs:{data:t.graphData,options:t.graphOption}}),t._v(" "),r("canvas",{attrs:{id:"line-chart",width:"500",height:"300"}})],1)],1)],1)])},staticRenderFns:[]}},824:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{attrs:{id:"app"}},[r("page-header"),t._v(" "),r("transition",{attrs:{name:"fade",mode:"out-in"}},[r("router-view")],1),t._v(" "),r("md-speed-dial",{staticClass:"md-fab-top-right",attrs:{"md-open":"click","md-direction":"bottom"}},[r("md-button",{staticClass:"md-fab",attrs:{"md-fab-trigger":""}},[r("md-icon",{attrs:{"md-icon-morph":""}},[t._v("close")]),t._v(" "),r("md-icon",[t._v("settings")])],1),t._v(" "),r("md-button",{staticClass:"md-fab md-primary md-mini md-clean",nativeOn:{click:function(e){t.refresh(e)}}},[r("md-icon",[t._v("refresh")])],1),t._v(" "),r("md-button",{staticClass:"md-fab md-primary md-mini md-clean",nativeOn:{click:function(e){t.logout(e)}}},[r("md-icon",[t._v("exit_to_app")])],1)],1)],1)},staticRenderFns:[]}}},[388]);
//# sourceMappingURL=app.js.map
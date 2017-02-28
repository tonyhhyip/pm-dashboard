<template>
    <container>
        <br v-if="fetching" />
        <md-spinner md-indeterminate v-if="fetching" />
        <div class="md-title" v-if="project !== null">
            <h2>
                {{ project.name }}
                #{{ $route.params.build }}
                <a :href="project.url" target="_blank">
                    <i class="fa" :class="'fa-' + $route.params.host"></i>
                </a>
                <img :src="badge" v-if="badge"/>
            </h2>
        </div>
        <md-card v-if="project !== null">
            <md-list v-if="reports.length > 0">
                <md-list-item v-for="report in reports" :href="report.url" target="_blank" :key="report.path">
                    {{ titleReport(report.pretty_path) }}
                    <md-icon>send</md-icon>
                </md-list-item>
            </md-list>
        </md-card>
        <md-card v-if="error !== null">
            <md-card-header>
                    <div class="md-title">
                        Error occur
                    </div>
            </md-card-header>
            <md-card-content>
                {{ error }}
            </md-card-content>
            <md-card-actions>
                <md-button href="/#/" class="md-raised md-accent">Home</md-button>
            </md-card-actions>
        </md-card>
    </container>
</template>
<script>
  import { mapGetters, mapState } from 'vuex';
  import container from './Container.vue';
  import fetch from '../fetch';
  import {reportExists} from '../projects';
  export default{
    data(){
      return {
        fetching: true,
        project: null,
        reports: [],
        error: null,
      }
    },
    computed: {
      badge() {
        const params = this.$route.params;
        const provider = params.host === 'github' ? 'gh' : 'bb';
        return `https://circleci.com/${provider}/${params.owner}/${params.project}/tree/master.svg?style=svg&circle-token=${this.token}`;
      },
      ...mapState(['token']),
      ...mapGetters({
        projects: 'projectOverview',
      })
    },
    components: { container },
    mounted() {
      const {params} = this.$route;
      this.displayReport(params);
    },
    watch: {
      '$route': (nextValue) => {
        this.displayReport(nextValue);
      }
    },
    methods: {
      titleReport(path) {
        const name = path.replace('$CIRCLE_ARTIFACTS/', '').replace('/index.html', '');
        return `${name.charAt(0).toUpperCase()}${name.substr(1)}`;
      },
      displayReport(params) {
        const reports = this.$store.state.projects.reports;
        const output = () => {
          this.fetching = false;
          const project = this.projects.filter(project => project.name === params.project);
          this.project = project[0];
          const reports = this.$store.state.projects.reports[params.host][params.owner][params.project][params.build]
            .filter(report => report.path.endsWith('index.html'));
          let min = Infinity;
          reports.forEach((report) => {
            const depth = report.pretty_path.split('/').length;
            if (depth < min)
              min = depth;
          });
          this.reports = reports.filter(report => report.pretty_path.split('/').length === min);
        };
        if (!reportExists(reports, params)) {
          fetch(`project/${params.host}/${params.owner}/${params.project}/${params.build}/artifacts`)
            .then((response) => {
              if (response.status === 200) {
                return response.json();
              } else {
                throw response;
              }
            })
            .then(data => this.$store.dispatch('fetchReport', Object.assign({}, params, { data })))
            .then(() => output())
            .catch((e) => {
                console.trace(e);
                this.fetching = false;
                this.error = `Response with status ${e.status}, please check fetching correct report or url project exists`;
            });
        } else {
          output();
        }
      }
    },
  }
</script>

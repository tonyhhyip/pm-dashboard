<template>
    <md-card>
        <md-card-header>
            <div class="md-title" v-if="error === null">
                <h2>
                    {{ owner }} / {{ projectName }}
                    #{{ build }}
                    <a :href="project.url" target="_blank" v-if="project !== null">
                        <i class="fa" :class="'fa-' + host"></i>
                    </a>
                    <img :src="badge" v-if="badge"/>
                </h2>
            </div>
            <div class="md-title" v-if="error !== null">
                Error occur
            </div>
        </md-card-header>
        <md-card-content>
            <md-progress md-indeterminate v-if="fetching" />
            <md-list v-if="reports.length > 0">
                <md-list-item v-for="report in reports" :href="report.url" target="_blank" :key="report.path">
                    {{ titleReport(report.pretty_path) }}
                    <md-icon>send</md-icon>
                </md-list-item>
            </md-list>
        </md-card-content>

        <md-card-content v-if="error !== null">
            {{ error }}
        </md-card-content>

        <md-card-actions v-if="error !== null">
            <md-button :href="$router.resolve({name: 'home'}).href" class="md-raised md-accent">Home</md-button>
        </md-card-actions>
    </md-card>
</template>
<script>
  import { mapGetters, mapState } from 'vuex';
  import fetch from '../fetch';
  import {reportExists} from '../projects';
  export default{
    props: [
      'owner',
      'projectName',
      'build',
      'host',
    ],
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
        const provider = this.host === 'github' ? 'gh' : 'bb';
        return `https://circleci.com/${provider}/${this.owner}/${this.projectName}/tree/master.svg?style=svg&circle-token=${this.token}`;
      },
      ...mapState(['token']),
      ...mapGetters([
        'getProject',
        'getReport',
      ]),
    },
    mounted() {
      this.displayReport(this.host, this.owner, this.projectName, this.build);
    },
    watch: {
      owner() {
        this.displayReport(this.host, this.owner, this.projectName, this.build);
      },
      build() {
        this.displayReport(this.host, this.owner, this.projectName, this.build);
      },
      projectName() {
        this.displayReport(this.host, this.owner, this.projectName, this.build)
      },
      host() {
        this.displayReport(this.host, this.owner, this.projectName, this.build)
      },
    },
    methods: {
      titleReport(path) {
        const name = path.replace('$CIRCLE_ARTIFACTS/', '').replace('/index.html', '');
        return `${name.charAt(0).toUpperCase()}${name.substr(1)}`;
      },
      displayReport(host, owner, project, build) {
        const reports = this.$store.state.projects.reports;
        const output = () => {
          this.error = null;
          this.fetching = false;
          this.project = this.getProject(owner, project);
          this.reports = this.getReport(host, owner, project, build);
        };
        if (!reportExists(reports, {host, owner, project, build})) {
          fetch(`project/${host}/${owner}/${project}/${build}/artifacts`)
            .then((response) => {
              if (response.status === 200) {
                return response.json();
              } else {
                throw response;
              }
            })
            .then(data => this.$store.dispatch('fetchReport', { host, owner, project, build, data }))
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

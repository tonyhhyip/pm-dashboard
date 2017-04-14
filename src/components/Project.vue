<template>
    <container>
        <div class="md-title" v-if="error === null">
            <h2>
                {{ $route.params.owner }} / {{ $route.params.project }}
                <a :href="projectUrl" target="_blank">
                <i class="fa" :class="'fa-' + $route.params.host"></i>
                </a>
                <img :src="badge" v-if="badge" />
            </h2>
        </div>
        <div>
            <md-tabs md-fixed>
                <md-tab id="list" md-label="List">
                    <md-progress md-indeterminate v-if="fetching" />
                    <md-list v-if="builds.length > 0" class="md-triple-line">
                        <md-list-item v-for="build in builds" target="_blank" :key="build.number">
                            <md-icon class="md-primary" :md-theme="build.status.theme">{{ build.status.content }}</md-icon>
                            <div class="md-list-text-container">
                                <span class="md-title">#{{build.number}} {{ build.message }}</span>
                                <span class="md-subhead">{{ build.commit }} ({{ build.author }})</span>
                                <span>{{ buildTime(build.time) }}</span>
                            </div>
                            <md-button :href="$router.resolve(build.url).href" class="md-icon-button md-list-action">
                                <md-icon class="md-accent">send</md-icon>
                            </md-button>
                        </md-list-item>
                    </md-list>
                </md-tab>
                <md-tab id="graph" md-label="Graph">
                    <md-progress md-indeterminate v-if="fetching" />
                    <graph :data="graphData" :options="graphOption" />
                    <canvas id="line-chart" width="500" height="300"></canvas>
                </md-tab>
            </md-tabs>
        </div>
    </container>
</template>
<script>
  import moment from 'moment';
  import fetch from '../fetch';
  import {projectExists} from '../projects';
  import Graph from './Graph.vue';
  export default{
    data(){
      return {
        error: null,
        fetching: true,
        builds: [],
        graphOption: {
          scales: {
            yAxes: [
              {
                id: 'build',
                position: 'left',
                beginAtZero: true,
                scaleLabel: {
                  display: true,
                  labelString: 'Build Time (Minutes)'
                },
              },
              {
                id: 'queue',
                position: 'right',
                beginAtZero: true,
                scaleLabel: {
                  display: true,
                  labelString: 'Queue Time (Minutes)'
                },
              },
            ],
          },
        },
      };
    },
    computed: {
      badge() {
        const provider = this.$route.params.host === 'github' ? 'gh' : 'bb';
        return `https://circleci.com/${provider}/${this.$route.params.owner}/${this.$route.params.project}/tree/master.svg?style=svg&circle-token=${this.$store.state.token}`;
      },
      projectUrl() {
        const hostname = this.$route.params.host === 'github' ? 'github.com' : 'bitbucket.org';
        return `https://${hostname}/${this.$route.params.owner}/${this.$route.params.project}`
      },
      graphData() {
        const buildTime = this.$store.getters.getBuildTime(this.$route.params.host, this.$route.params.owner, this.$route.params.project);
        return {
          xLabels: buildTime.map(build => build.number).reverse(),
          datasets: [
            {
              label: 'Build Time',
              borderColor: '#673AB7',
              data: buildTime.map(build => build.end.diff(build.start) / 1000 / 60).reverse(),
              fill: false,
              yAxisID: 'build',
            },
            {
              label: 'Queue Time',
              borderColor: '#ff4081',
              data: buildTime.map(build => Math.abs(build.start.diff(build.queue)) / 1000 / 60).reverse(),
              fill: false,
              yAxisID: 'queue',
            },
          ],
        };
      }
    },
    components: {
      container: require('./Container.vue'),
      Graph,
    },
    watch: {
      '$route': function () {
        this.displayBuilds();
      }
    },
    mounted() {
      this.displayBuilds();
      this.$root.$on('refresh', () => this.$router.currentRoute.name === 'project' && this.refresh());
    },
    methods: {
      buildTime(string) {
        const time = moment(string);
        return time.format('Do MMM YYYY (HH:mm:ss)')
      },
      refresh() {
        this.fetchBuilds()
          .then(() => this.builds = this.$store.getters.getBuild(this.$route.params.host, this.$route.params.owner, this.$route.params.project))
          .catch((e) => {
            ``.trace(e);
            this.error = `Response with status ${e.status}, please check fetching correct report or url project exists`;
          });
      },
      displayBuilds() {
        const output = () => {
          this.error = null;
          this.fetching = false;
          this.builds = this.$store.getters.getBuild(this.$route.params.host, this.$route.params.owner, this.$route.params.project);
        };
        if (!projectExists(this.$store.state.projects.reports, this.$route.params)) {
          this.fetchBuilds()
            .then(() => output())
            .catch((e) => {
              console.trace(e);
              this.fetching = false;
              this.error = `Response with status ${e.status}, please check fetching correct report or url project exists`;
            });
        } else {
          output();
        }
      },
      fetchBuilds() {
        this.fetching = true;
        return fetch(`project/${this.$route.params.host}/${this.$route.params.owner}/${this.$route.params.project}/tree/master?filter=completed`)
          .then((response) => {
            if (response.status === 200) {
              return response.json()
            } else {
              throw response;
            }
          })
          .then(data => this.$store.dispatch('fetchBuild', {data, ...this.$route.params}))
          .then(() => {
            this.fetching = false
          });
      }
    }
  }
</script>

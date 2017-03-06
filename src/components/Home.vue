<template>
    <container>
        <h2>Projects</h2>
        <br v-if="fetching" />
        <md-progress md-indeterminate v-if="fetching" />
        <md-list class="md-triple-line">
            <md-list-item :md-theme="project.status" v-for="project in projects" :key="project.name" v-if="project">
                <md-icon md-iconset="fa" :class="'fa-' + project.icon " :md-theme="project.status" class="md-accent" />
                <div class="md-list-text-container">
                    <span>{{ project.name }} #{{project.build}}</span>
                    <span>{{ buildTime(project.time) }}</span>
                    <span>{{ project.commit }}</span>
                </div>
                <md-card-actions>
                    <md-button :href="$router.resolve(project.projectPage).href" :md-theme="project.status" class="md-icon-button md-list-action md-raised md-accent">
                        <md-icon>list</md-icon>
                    </md-button>
                    <md-button :href="$router.resolve(project.report).href" :md-theme="project.status" class="md-icon-button md-list-action md-raised md-accent" v-if="project.status !== 'warn'">
                        <md-icon>receipt</md-icon>
                    </md-button>
                </md-card-actions>
            </md-list-item>
        </md-list>
    </container>
</template>

<style scoped>
    .md-list-item[md-theme=success] {
        background: #4caf50;
    }

    .md-list-item[md-theme=warn] {
        background: #ff9800;
    }

    .md-list-item[md-theme=fail] {
        background: #f44336;
    }

    .md-card {
        width: 100%;
        margin: 0 4px 16px;
        display: inline-block;
        height: 150px;
        max-width: 400px;
    }
</style>

<script>
  import moment from 'moment';
  import {mapGetters} from 'vuex';
  import fetch from '../fetch';
  export default {
    data() {
      return {
        fetching: true,
      };
    },
    computed: mapGetters({
      projects: 'projectOverview',
    }),
    components: {
      container: require('./Container.vue')
    },
    mounted() {
      if (this.$store.state.projects.all.length === 0) {
        fetch('projects')
          .then((response) => {
            if (response.status === 200) {
              return response.json();
            } else {
              throw new Error(response);
            }
          })
          .then(data => this.$store.dispatch('fetchProject', data))
          .then(() => this.fetching = false)
          .catch(() => {
            localStorage.removeItem('api-token');
            this.$router.replace({name: 'token'});
          });
      } else {
        this.fetching = false
      }
    },
    methods: {
      buildTime(string) {
        const time = moment(string);
        return time.format('Do MMM YYYY (HH:mm:ss)')
      }
    }
  }
</script>

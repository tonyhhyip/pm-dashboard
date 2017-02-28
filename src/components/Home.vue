<template>
    <container>
        <h2>Projects</h2>
        <br v-if="fetching" />
        <md-progress md-indeterminate v-if="fetching" />
        <md-card v-for="project in projects" class="md-primary" :md-theme="project.status" :key="project.name">
            <md-card-header>
                <div class="md-title">
                    {{project.name}}
                    <i class="fa" :class="['fa-' + project.icon]"></i>
                </div>
                <div class="md-subhead">
                    #{{project.build}}
                    {{project.commit}}
                </div>
            </md-card-header>
            <md-card-actions>
                <md-button
                        :href="$router.resolve(project.report).href"
                        class="md-raised"
                        v-if="project.status !== 'warn'"
                >
                    View Report
                </md-button>
            </md-card-actions>
        </md-card>
    </container>
</template>

<style scoped>
    .md-card {
        width: 100%;
        margin: 0 4px 16px;
        display: inline-block;
        height: 150px;
        max-width: 400px;
    }
</style>

<script>
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
  }
</script>

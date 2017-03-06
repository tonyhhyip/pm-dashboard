<template>
  <div id="app">
    <page-header />
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
    <md-speed-dial md-open="click" class="md-fab-top-right" md-direction="bottom">
      <md-button class="md-fab" md-fab-trigger>
        <md-icon md-icon-morph>close</md-icon>
        <md-icon>settings</md-icon>
      </md-button>

      <md-button class="md-fab md-primary md-mini md-clean" @click.native="refresh">
        <md-icon>refresh</md-icon>
      </md-button>

      <md-button class="md-fab md-primary md-mini md-clean" @click.native="logout">
        <md-icon>exit_to_app</md-icon>
      </md-button>

    </md-speed-dial>
  </div>
</template>

<script>
  export default {
    name: 'app',
    components: {
      'page-header': require('./components/Header.vue')
    },
    methods: {
      refresh() {
        console.log('Emit Refresh');
        this.$root.$emit('refresh');
      },
      logout() {
        this.$store.dispatch('logout');
        this.$router.replace({name: 'token'});
      },
    }
  }
</script>


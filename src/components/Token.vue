<template>
  <container>
    <h2>Input Token</h2>
    <form novalidate @submit.stop.prevent="submit">
      <md-input-container>
        <label>Circle CI API Token</label>
        <md-input v-model="token" />
      </md-input-container>
      <p>
        You may go to
        <a href="https://circleci.com/account/api" target="_blank">here</a>
        to create a new API token
      </p>
      <md-button class="md-raised md-primary" type="submit">
        Submit
      </md-button>
    </form>
  </container>
</template>

<script>
  import container from './Container.vue';
  export default {
    data () {
      return {
        token: ''
      }
    },
    components: { container },
    methods: {
      submit() {
        localStorage.setItem('api-token', this.token);
        this.$store.dispatch('saveToken', this.token);
        this.$router.replace({name: 'home'});
      }
    }
  }
</script>


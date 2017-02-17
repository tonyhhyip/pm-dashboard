<template>
  <div>
    <md-toolbar>
      <h1 class="md-title">Circle CI Dashboard</h1>
    </md-toolbar>
    <Container>
      <h2>Input Token</h2>
      <form novalidate @submit.stop.prevent="submit">
        <md-input-container>
          <label>Circle CI API Token</label>
          <md-input v-model="token" />
        </md-input-container>
      </form>
      <p>
        You may go to
        <a href="https://circleci.com/account/api" target="_blank">here</a>
        to create a new API token
      </p>
    </Container>
  </div>
</template>

<script>
import Container from './Container.vue';
import Header from './Header.vue';
export default {
  data () {
    return {
      token: ''
    }
  },
  components: { Container },
  methods: {
    submit() {
      localStorage.setItem('api-token', this.token);
      this.$router.replace({name: 'home'});
    }
  }
}
</script>


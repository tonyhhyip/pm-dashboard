<template>
    <div>
        <page-header />
        <container>
            <br />
            <md-progress md-indeterminate />
        </container>
    </div>
</template>
<script>
  import fetch from '../fetch';
  export default {
    mounted() {
      fetch('projects')
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else {
            throw new Error(response);
          }
        })
        .then(data => console.log(data))
        .catch(() => {
          localStorage.removeItem('api-token');
          this.$router.replace({name: 'token'});
        });
    },
    components: {
      container: require('./Container.vue'),
      'page-header': require('./Header.vue')
    }
  }
</script>

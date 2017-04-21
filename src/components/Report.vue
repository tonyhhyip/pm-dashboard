<template>
    <container>
        <report-card :host="params.host" :owner="params.owner" :projectName="params.project" :build="params.build" />
    </container>
</template>
<script>
    import { mapState } from 'vuex';
  export default{
    data(){
      return {}
    },
    computed: mapState({
      params: state => state.route.params
    }),
    components: {
      container: require('./Container.vue'),
      'report-card': require('./ReportCard.vue')
    }
  }
</script>

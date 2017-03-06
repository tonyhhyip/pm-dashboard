<template>
    <container>
        <report-card
                :host="$route.params.host"
                :owner="$route.params.owner"
                :projectName="$route.params.project"
                :build="$route.params.build"
        />
    </container>
</template>
<script>
  export default{
    data(){
      return {}
    },
    components: {
      container: require('./Container.vue'),
      'report-card': require('./ReportCard.vue')
    }
  }
</script>

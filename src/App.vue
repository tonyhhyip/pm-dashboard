<template>
  <div id="app">
    <page-header />
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {
    'page-header': require('./components/Header.vue')
  }
}
</script>


<template>
  <NavBar/>
  <router-view></router-view>
</template>

<script>
import NavBar from './components/NavBar.vue'
// import ListMenu from './components/ListMenu.vue'

export default {
  name: 'App',
  components: { NavBar }
}
</script>

<style>

</style>

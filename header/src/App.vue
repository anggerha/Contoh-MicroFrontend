<template>
  <div id="app">
    <div v-if="show">
      <Header/>
    </div>
  </div>
</template>

<script>
import Header from '../src/components/Header.vue'

export default {
  name: 'App',
  components: { Header },
  data() {
    return {
      show: false
    }
  },
  created() {
    this.showNavBar()
  },
  methods: {
    showNavBar(){
      if(!sessionStorage.getItem('user') && !sessionStorage.getItem('dataDiri')){
        this.show = false
      } else {
        this.show = true
      }
    }
  }
}
</script>

<style>

</style>

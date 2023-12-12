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
    setInterval(() => {
      this.showNavBar()
    })
  },
  methods: {
    showNavBar(){
      if(!localStorage.getItem('firebase-token') && !localStorage.getItem('firebase-uid')){
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

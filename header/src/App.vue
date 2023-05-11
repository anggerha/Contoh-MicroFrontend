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
      if(!sessionStorage.getItem('firebase-token') && !sessionStorage.getItem('firebase-uid')){
        this.show = false
        // this.$router.replace('/Login').then(() => { this.$router.go() })
      } else {
        this.show = true
      }
    }
  }
}
</script>

<style>

</style>

<template>
  <div id="app">
    <div v-if="show">
      <Header/>
    </div>
  </div>
</template>

<script>
import Header from '../src/components/Header.vue'
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  name: 'App',
  components: { Header },
  data() {
    return {
      show: false
    }
  },
  created() {
    firebase.auth().onAuthStateChanged((user)=>{
      if (user) {
        this.show = true
      } else {
        this.show = false
      }
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

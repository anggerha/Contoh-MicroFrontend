<template>
  <router-view></router-view>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  name: 'App',
  created() {
    firebase.auth().onAuthStateChanged((user)=>{
      if (user) {
        this.$router.replace(this.$route.path)
      } else {
        this.$router.replace('/login')
      }
    })
  }
}
</script>

<style>
</style>

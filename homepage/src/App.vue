<template>
  <router-view></router-view>
</template>

<script>
// import axios from 'axios'
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  name: 'App',
  data(){
    return {
      user: null
    }
  },
  watch: {
      checkUser: function() {
        console.log('HOME');
        firebase.auth().onAuthStateChanged((user)=>{
          this.user = user
          console.log('HOMEPAGE = '+ this.user);
          if (this.user != null) {
            this.$router.replace('/listmenu')
          } else {
            this.$router.replace('/login')
          }
        })
      }
  }
}
</script>

<style>
</style>

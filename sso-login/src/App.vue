<template>
  <router-view/>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  name: 'App',
  created() {
    firebase.auth().onAuthStateChanged((user)=>{
        if (user) {
          this.$router.replace('/listmenu')
        }
      })
  }
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<template>
  <router-view/>
</template>

<script>
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
      console.log('SSO');
      firebase.auth().onAuthStateChanged((user)=>{
        this.user = user
        console.log('SSO = '+ this.user);
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

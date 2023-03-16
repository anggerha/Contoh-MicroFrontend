<template>
  <div id="app">
    <h1>Login</h1>
    Email <input type="text" v-model="user.email"> <br>
    Password <input type="password" v-model="user.password"> <br><br>
    <button @click="login">Login</button>

  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return{
      user: {
        email: null,
        password: null
      }
    }
  },
  methods: {
    login() {
      if ( this.user.email == 'email@gmail.com' && this.user.password == 12345){
        window.history.pushState(null, null, '/vue3-app')
        sessionStorage.setItem('user', JSON.stringify(this.user))
      } else {
        console.log('Email atau Password Salah !');
      } 
    }
  } 
}
</script>

<style>
  #app{
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>

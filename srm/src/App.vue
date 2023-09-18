<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {  },
  data(){
    return {
      role: '',
      firebaseUID: null,
      isAdmin: false
    }
  }
}
</script>

<style>
.btn-general{
    background-color: white;
    color: #32a3df;
    transition: ease-in-out;
    transition-duration: 300ms;
    border-style: none;
    transition-delay: 100ms;
}
.btn-general:hover{
    background-color: #32a3df;
    color: white;
    border-style: none;
}
</style>

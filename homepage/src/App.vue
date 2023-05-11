<template>
  <router-view></router-view>
</template>

<script>

export default {
  name: 'App',
  created() {
    if(!sessionStorage.getItem('firebase-token') && !sessionStorage.getItem('firebase-uid')){
      this.$router.replace('/Login').then(() => { this.$router.go() })
    }
  }
}
</script>

<style>

</style>

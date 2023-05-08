<template>
  <router-view></router-view>
</template>

<script>

export default {
  name: 'App',
  created() {
    if(!sessionStorage.getItem('user') && !sessionStorage.getItem('dataDiri')){
      this.$router.replace('/Login').then(() => { this.$router.go() })
    }
  }
}
</script>

<style>

</style>

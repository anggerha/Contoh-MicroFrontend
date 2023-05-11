<template>
  <div id="app">
    <DosenPage v-if="role == 'DOSEN'"/>
    <MahasiswaPage v-if="role == 'MAHASISWA'"/>
    <AdminPage v-if="role == 'ADMIN'"/>
  </div>
    
</template>

<script>
import DosenPage from './components/DosenPage.vue'
import MahasiswaPage from './components/MahasiswaPage.vue'
import AdminPage from './components/AdminPage.vue'

export default {
  name: 'App',
  components: { DosenPage, MahasiswaPage, AdminPage },
  data(){
    return {
      role: ''
    }
  },
  created() {
    if(!sessionStorage.getItem('user') && !sessionStorage.getItem('dataDiri')){
      this.$router.replace('/Login').then(() => { this.$router.go() })
    } else {
      if(sessionStorage.getItem('dataDiri')){
        var data = JSON.parse(sessionStorage.getItem('dataDiri'))
        if (data.nim){
          this.role = 'MAHASISWA'
        } else if (data.nik && data.role == 'DOSEN') {
          this.role = 'DOSEN'
        } else if(data.nik && data.role == 'ADMIN'){
          this.role = 'ADMIN'
        } else{
          this.role = ''
        }
      }
    }
    
  }
}
</script>

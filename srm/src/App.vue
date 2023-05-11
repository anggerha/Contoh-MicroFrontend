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

export default {
  name: 'App',
  components: { DosenPage, MahasiswaPage, AdminPage },
  data(){
    return {
      role: '',
      firebaseUID: null
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
        } else if (data.nik) {
          this.role = 'DOSEN'
        } else {
          this.role = ''
        }
      }
    }
  }
}
</script>

<template>
  <div id="app">
    <DosenPage v-if="role == 'DOSEN'"/>
    <MahasiswaPage v-if="role == 'MAHASISWA'"/>
   
  </div>
    
</template>

<script>
import DosenPage from './components/DosenPage.vue'
import MahasiswaPage from './components/MahasiswaPage.vue'

export default {
  name: 'App',
  components: { DosenPage, MahasiswaPage },
  data(){
    return {
      role: ''
    }
  },
  created() {
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
</script>

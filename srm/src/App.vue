<template>
  <div id="app">
    <DosenPage v-if="role == 'Dosen'"/>
    <MahasiswaPage v-if="role == 'Mahasiswa'"/>
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
      if (data.data.nim){
        this.role = 'Mahasiswa'
      } else if (data.data.nik) {
        this.role = 'Dosen'
      } else {
        this.role = ''
      }
    }
  }
}
</script>

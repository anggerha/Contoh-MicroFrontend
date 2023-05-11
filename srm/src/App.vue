<template>
  <div id="app">
    <DosenPage v-if="role == 'DOSEN'"/>
    <MahasiswaPage v-if="role == 'MAHASISWA'"/>
   
  </div>
    
</template>

<script>
import DosenPage from './components/DosenPage.vue'
import MahasiswaPage from './components/MahasiswaPage.vue'
import axios from 'axios'

export default {
  name: 'App',
  components: { DosenPage, MahasiswaPage },
  data(){
    return {
      role: '',
      firebaseUID: null
    }
  },
  created() {
    this.checkRole()
  },
  methods: {
    async checkRole() {
      if(!sessionStorage.getItem('firebase-token') && !sessionStorage.getItem('firebase-uid')){
        this.$router.replace('/Login').then(() => { this.$router.go() })
      } else {
        this.firebaseUID = JSON.parse(sessionStorage.getItem('firebase-uid'))
        await axios.get(`http://localhost:10001/mahasiswa/${this.firebaseUID.uid}`)
        .then( async (response) => {
          if(response.status == 200){
            this.role = response.data.role
          } else {
            await axios.get(`http://localhost:10001/dosen/${this.firebaseUID.uid}`)
            .then((response) => {
              this.role = response.data.role
            })
          }
        })
        // if(sessionStorage.getItem('dataDiri')){
        //   var data = JSON.parse(sessionStorage.getItem('dataDiri'))
        //   if (data.nim){
        //     this.role = 'MAHASISWA'
        //   } else if (data.nik) {
        //     this.role = 'DOSEN'
        //   } else {
        //     this.role = ''
        //   }
        // }
      }
    }
  }
}
</script>

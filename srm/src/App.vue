<template>
  <div id="app">
    <DosenPage v-if="role == 'DOSEN' && isAdmin == false"/>
    <MahasiswaPage v-if="role == 'MAHASISWA'"/>
    <AdminPage v-if="role == 'DOSEN' && isAdmin == true"/>
  </div>
    
</template>

<script>
import DosenPage from './components/DosenPage.vue'
import MahasiswaPage from './components/MahasiswaPage.vue'
import AdminPage from './components/AdminPage.vue'
import axios from 'axios'

export default {
  name: 'App',
  components: { DosenPage, MahasiswaPage, AdminPage },
  data(){
    return {
      role: '',
      firebaseUID: null,
      isAdmin: false
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
        await axios.get(`http://localhost:10001/${this.firebaseUID.uid}`)
        .then( async (response) => {
          if(response.status == 200){
            var listAdmin = await axios.get(`http://localhost:10001/${this.firebaseUID.uid}/accessPass`)
            if(listAdmin.data.access == "granted"){
              this.role = response.data.role
              this.isAdmin = true
            } else if (listAdmin.data.access == "denied") {
              this.role = response.data.role
              this.isAdmin = false
            }
          } else {
            console.log(response);
          }
        })
      }
    }
  }
}
</script>

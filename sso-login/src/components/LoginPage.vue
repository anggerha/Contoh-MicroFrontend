<template>
    <div class="d-flex justify-content-center h-100 align-items-center" >
      <div class="card shadow p-9 bg-white rounded mx-auto my-5">
        <img class="mx-auto" src="../assets/fti-ukdw.png" alt="">
        <button style="" type="button" class="btn btn-primary btn-lg btn-block mx-auto" @click="signInSSO">Sign in With Google</button>
      </div>
    </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import axios from "axios"

export default {
    name: 'LoginPage',
    data() {
      return {
        firebaseUID: null
      }
    },
    async created() {
      if(sessionStorage.getItem('firebase-token') && sessionStorage.getItem('firebase-uid')){
        this.firebaseUID = JSON.parse(sessionStorage.getItem('firebase-uid'))
        await axios.get(`https://userapi.fti.ukdw.ac.id/${this.firebaseUID.uid}`)
        .then((response) => {
            if(response.data.id_telegram == '' && response.data.role == 'MAHASISWA'){
              this.$router.replace('formpage')
            } else {
              this.$router.replace('listmenu')
            }
        })
      } else {
        this.$router.replace('login')
      }
    },
    methods: {
        async signInSSO() {
            const provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider).then(
                async (result) => {
                    if(result.additionalUserInfo.profile.hd){
                      if(result.additionalUserInfo.profile.hd == 'ti.ukdw.ac.id' || result.additionalUserInfo.profile.hd == 'staff.ukdw.ac.id' || result.additionalUserInfo.profile.hd == 'fti.ukdw.ac.id') {
                        try {
                          await axios.get(`https://userapi.fti.ukdw.ac.id/login/${result.user.uid}`, { params: {
                            email: result.user.email.toString() 
                          }})
                          .then( async (response) => {
                            if(response.status == 200){
                              sessionStorage.setItem('firebase-token', result.credential.idToken)
                              sessionStorage.setItem('firebase-uid', JSON.stringify({
                                profilPicture: result.additionalUserInfo.profile.picture,
                                uid: result.user.uid
                              }))
                              await axios.get(`https://userapi.fti.ukdw.ac.id/${result.user.uid}`)
                              .then( async (response) => {
                                if(response.status == 200) {
                                  if(response.data.role == 'MAHASISWA'){
                                    if(response.data.id_telegram !== null && response.data.id_telegram !== ''){
                                      this.$router.replace("/listmenu")
                                    } else {
                                      this.$router.replace("/formpage")
                                    }
                                  } else if (response.data.role == 'DOSEN') {
                                    this.$router.replace("/listmenu")
                                  }
                                } else if(response.status == 404) {
                                  this.$toast.open({
                                      message: 'Login gagal!',
                                      type: 'warning',
                                      position: 'top'
                                  })
                                }
                              })
                            } else if(response.status == 404) {
                              this.$toast.open({
                                  message: 'Login gagal!',
                                  type: 'warning',
                                  position: 'top'
                              })
                            }
                          })
                        } catch (error) {
                          if (error.response.status == 404) {
                            this.$toast.open({
                                message: 'Email Belum Terdaftar, Hubungi Admin!',
                                type: 'warning',
                                position: 'top'
                            })
                          }
                        }
                      } 
                      else {
                        sessionStorage.clear()
                        this.$toast.open({
                              message: 'Harap Login Menggunakan Email TI atau Staff UKDW Anda.',
                              type: 'warning',
                              position: 'top'
                          })
                      }
                    } else {
                      sessionStorage.clear()
                      this.$toast.open({
                          message: 'Harap Login Menggunakan Email TI atau Staff Anda.',
                          type: 'warning',
                          position: 'top'
                      })
                    }
                }
            )
            .catch((error) => {
              sessionStorage.clear()
              console.log(error.message);
            })
        }
    }
}
</script>

<style scoped>
.btn{
  width: 20rem;
  margin-bottom: 1rem;
}
/* .card{
  margin: auto;
} */
</style>
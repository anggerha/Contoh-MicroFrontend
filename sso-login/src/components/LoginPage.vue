<template>
    <div class="container">
      <div class="card shadow p-9 bg-white rounded w-50 mx-auto">
        <img class="mx-auto" src="../assets/fti-ukdw.png" alt="">
        <button type="button" class="btn btn-primary btn-lg btn-block" @click="signInSSO">Sign in With Google</button>
      </div>
    </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import axios from "axios"

export default {
    name: 'LoginPage',
    created(){
      if(sessionStorage.getItem('firebase-token') && sessionStorage.getItem('firebase-uid')){
        this.$router.replace("/listmenu").then(() => { })
      }
    },
    methods: {
        async signInSSO() {
            const provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider).then(
                // eslint-disable-next-line no-unused-vars
                async (result) => {
                    if(result.additionalUserInfo.profile.hd){
                      if(result.additionalUserInfo.profile.hd == 'ti.ukdw.ac.id' || result.additionalUserInfo.profile.hd == 'staff.ukdw.ac.id') {
                        await axios.get(`http://localhost:10001/login/${result.user.uid}`, { params: {
                          email: result.user.email.toString() 
                        }})
                        .then( async (response) => {
                          if(response.status == 200){
                            sessionStorage.setItem('firebase-token', result.credential.idToken)
                            sessionStorage.setItem('firebase-uid', JSON.stringify({
                              profilPicture: result.additionalUserInfo.profile.picture,
                              uid: result.user.uid
                            }))
                            await axios.get(`http://localhost:10001/${result.user.uid}`)
                            .then( async (response) => {
                              if(response.status == 200) {
                                if(response.data.role == 'MAHASISWA'){
                                  if(response.data.username_telegram !== null && response.data.username_telegram !== '' && response.data.id_telegram !== null && response.data.id_telegram !== ''){
                                    this.$router.replace("/listmenu").then(() => { this.$router.go() })
                                  } else {
                                    this.$router.replace("/formpage").then(() => { this.$router.go() })
                                  }
                                } else if (response.data.role == 'DOSEN') {
                                  this.$router.replace("/listmenu").then(() => { this.$router.go() })
                                }
                              } 
                            })
                          }
                        })
                      } else {
                        sessionStorage.clear()
                        this.$router.replace("/login").then(() => { })
                      }
                    } else {
                      sessionStorage.clear()
                      this.$router.replace("/login").then(() => { })
                    }
                }
            )
            .catch((error) => {
              sessionStorage.clear()
              console.log(error);
            })
        }
    }
}
</script>

<style scoped>
/* .card{
  margin: auto;
} */
</style>
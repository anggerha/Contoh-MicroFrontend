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
      if(sessionStorage.getItem('user') && sessionStorage.getItem('dataDiri')){
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
                        await axios.get('http://localhost:5000/login', { params: { 
                          nama : result.user.displayName.toString().toUpperCase(), 
                          email: result.user.email.toString() 
                        }})
                        .then(async (response) => {
                          console.log('get response pass');
                          console.log(response);
                          if(response.status === 200){
                            sessionStorage.setItem('dataDiri', JSON.stringify(response.data))
                            sessionStorage.setItem('idToken', result.credential.idToken)
                            sessionStorage.setItem('user', JSON.stringify({
                              displayName: result.user.displayName,
                              profilPicture: result.additionalUserInfo.profile.picture,
                              email: result.user.email,
                              emailVerified: result.user.emailVerified,
                              uid: result.user.uid
                            }))
                            // window.history.replaceState(null, null, '/homepage')
                            if(response.data.id_telegram == null || response.data.id_telegram == ''){
                              this.$router.replace("/formpage").then(() => { this.$router.go() })
                            } else {
                              this.$router.replace("/listmenu").then(() => { this.$router.go() })
                            }
                          } 
                          // else if (response.status === 404) {
                          //   await axios.get('http://localhost:5000/dosen/me', { params: { nama : result.user.displayName.toString().toUpperCase(), email : result.user.email.toString() }})
                          //   .then((response) => {
                          //     if(response.status === 200){
                          //       sessionStorage.setItem('dataDiri', JSON.stringify(response))
                          //       sessionStorage.setItem('idToken', result.credential.idToken)
                          //       sessionStorage.setItem('user', JSON.stringify({
                          //         displayName: result.user.displayName,
                          //         profilPicture: result.additionalUserInfo.profile.picture,
                          //         email: result.user.email,
                          //         emailVerified: result.user.emailVerified,
                          //         uid: result.user.uid
                          //       }))
                          //       // window.history.replaceState(null, null, '/homepage')
                          //       if(response.data.id_telegram == null || response.data.id_telegram == ''){
                          //         this.$router.replace("/formpage").then(() => { this.$router.go() })
                          //       } else {
                          //         this.$router.replace("/listmenu").then(() => { this.$router.go() })
                          //       }
                          //     }
                          //   })
                          // }
                        })
                      } else {
                        this.$router.replace("/login").then(() => { })
                      }
                    } else {
                      this.$router.replace("/login").then(() => { })
                    }
                }
            )
            .catch((err) => {
                console.log(err.message)
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
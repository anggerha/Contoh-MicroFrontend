<template>
    <div class="center rounded overflow-hidden shadow-lg">
      <img class="container" src="../assets/fti-ukdw.png" alt="UKDW's Logo">
      <div class="px-6 py-4">
        <div class="font-bold text-xxl mb-2"><h1>STUDENT RELATIONSHIP MANAGEMENT</h1></div>
        <div class="container text-base">
          <div class="google-btn">
              <div class="google-icon-wrapper">
                  <img class="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
              </div>
              <p class="btn-text" @click="signInSSO"><b>Sign in with google</b></p>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import axios from "axios"

export default {
    name: 'LoginPage',
    methods: {
        async signInSSO() {
            const provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider).then(
                // eslint-disable-next-line no-unused-vars
                async (result) => {
                    if(result.additionalUserInfo.profile.hd){
                      if(result.additionalUserInfo.profile.hd == 'ti.ukdw.ac.id' || result.additionalUserInfo.profile.hd == 'staff.ukdw.ac.id') {
                        await axios.get('http://localhost:5000/mahasiswa/me', { params: { email : result.user.email.toString() }})
                        .then((response) => {
                          if(response.status === 200){
                            sessionStorage.setItem('dataDiri', JSON.stringify(response))
                            sessionStorage.setItem('idToken', result.credential.idToken)
                            sessionStorage.setItem('user', JSON.stringify({
                              displayName: result.user.displayName,
                              profilPicture: result.additionalUserInfo.profile.picture,
                              email: result.user.email,
                              emailVerified: result.user.emailVerified,
                              uid: result.user.uid
                            }))
                            // window.history.replaceState(null, null, '/homepage')
                            this.$router.replace("/listmenu").then(() => { this.$router.go() })
                          } else {
                            this.$router.replace("/login").then(() => { this.$router.go() })
                          }
                        })
                      } else {
                        this.$router.replace("/login").then(() => { this.$router.go() })
                      }
                    } else {
                      this.$router.replace("/login").then(() => { this.$router.go() })
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

<style lang="scss" scoped>
$white: #fff;
$google-blue: #4285f4;
$button-active-blue: #1669F2;

h1{
    text-align: center;
}
.container {
  position: relative;
}
.center {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.container{
    display:flex;
    justify-content: center;
    align-items: center;
}
.google-btn {
  width: 184px;
  height: 42px;
  background-color: $google-blue;
  border-radius: 2px;
  box-shadow: 0 3px 4px 0 rgba(0,0,0,.25);
  .google-icon-wrapper {
    position: absolute;
    margin-top: 1px;
    margin-left: 1px;
    width: 40px;
    height: 40px;
    border-radius: 2px;
    background-color: $white;
  }
  .google-icon {
    position: absolute;
    margin-top: 11px;
    margin-left: 11px;
    width: 18px;
    height: 18px;
  }
  .btn-text {
    float: right;
    margin: 11px 11px 0 0;
    color: $white;
    font-size: 14px;
    letter-spacing: 0.2px;
    font-family: "Roboto";
  }
  &:hover {
    box-shadow: 0 0 6px $google-blue;
  }
  &:active {
    background: $button-active-blue;
  }
}

@import url(https://fonts.googleapis.com/css?family=Roboto:500);
</style>
<template>
    <div>
        <ListBerita/>
    </div>
</template>

<script>
import ListBerita from './ListBerita.vue'
import axios from 'axios'
// import firebase from 'firebase/app'
import 'firebase/auth'

export default {
    name: 'ListMenu',
    components:{ListBerita},
    data() {
        return {
            firebaseUID: null
        }
    },
    created() {
        if(localStorage.getItem('firebase-token') && localStorage.getItem('firebase-uid')){
            this.firebaseUID = JSON.parse(localStorage.getItem('firebase-uid'))
            this.check()
        } else {
            this.$router.replace("/login").then(() => { })
        }
    },
    methods: {
        async check() {
            // firebase.auth().onAuthStateChanged((user) => {
            // if (user) {
            //     // User is signed in
            //     localStorage.setItem('user', JSON.stringify(user))
            //     // Assuming stsTokenManager.expirationTime is a timestamp in seconds
            //     user = JSON.parse(JSON.stringify(user))
            //     const expirationTimeInSeconds = user.stsTokenManager.expirationTime;
            //     const expirationDate = new Date(expirationTimeInSeconds * 1000); // Convert to milliseconds
            // } else {
            //     localStorage.setItem('user', user)
            //     // User is signed out
            //     // ...
            // }
            // });
            await axios.get(`https://userapi.fti.ukdw.ac.id/${this.firebaseUID.uid}`)
            .then((response) => {
                if(response.data.id_telegram == '' && response.data.role == 'MAHASISWA'){
                    this.$router.replace('/formPage')
                }
            })
        }
    }
}
</script>

<style scoped>
    button{
        margin: 2%;
    }
    .sidenav {
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #111;
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 60px;
}

.sidenav a {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
  transition: 0.3s;
}

.sidenav a:hover {
  color: #f1f1f1;
}

.sidenav .closebtn {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
}

@media screen and (max-height: 450px) {
  .sidenav {padding-top: 15px;}
  .sidenav a {font-size: 18px;}
}
</style>
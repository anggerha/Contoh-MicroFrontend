<template>
    <div class="shadow p-3 mb-5 bg-white">
        <b-navbar class="navbar" type="light" variant="faded">
            <b-navbar-brand>
                <!-- <div class="center" @click="goHome"> -->
                    <!-- <img style="max-width:150px;" src="../assets/fti-ukdw.png" class="d-inline-block align-top" alt="FTI UKDW">
                    <h1 id="judulHeader">Informatika</h1> -->
                    <div class="sidenav" id="mySidenav">
                        <a href="javascript:void(0)" class="closebtn" @click="closeNav">&times;</a>
                        <router-link class="nav-flex" to="/listMenu"><svg xmlns="http://www.w3.org/2000/svg" width="45" height="40" fill="currentColor" class="bi bi-house-fill" viewBox="0 0 16 16">
                            <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5Z"/>
                            <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6Z"/>
                            </svg>
                            &nbsp;Home
                        </router-link>
                        <router-link class="nav-flex" :to="route">
                            <img style="width: 3rem;" src="../assets/fti-ukdw.png" class="d-inline-block align-top" alt="FTI UKDW">&nbsp;SRM
                        </router-link>
                    </div>
                    <div style="display:flex;">
                        <span style="font-size:30px;cursor:pointer" @click="openNav"> &#9776;</span>
                    </div>
                <!-- </div> -->
            </b-navbar-brand>
            <div id="judulHeader" style="font-size: calc(200% + 1vw); text-align: center; width: 100%;">INFORMATIKA</div>
            <b-dropdown class="ml-auto" variant="link" toggle-class="text-decoration-none" no-caret>
                <template #button-content>
                    <b-avatar class="avatar" :src="profilPicture.profilPicture" size="4rem"></b-avatar>
                </template>
                <b-dropdown-item @click="goProfile">Profile</b-dropdown-item>
                <b-dropdown-item @click="signOut">Sign Out</b-dropdown-item>
            </b-dropdown>
        </b-navbar>
    </div>
</template>

<script>
import firebase from 'firebase'
import axios from 'axios'

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Header',
    data() {
        return {
            profilPicture: null,
            route: ''
        }
    },
    created() {
        this.profilPicture = JSON.parse(localStorage.getItem('firebase-uid'))
        this.checkRole()
    },
    methods: {
        async checkRole() {
            try {
                if(!localStorage.getItem('firebase-token') && !localStorage.getItem('firebase-uid')){
                this.$router.replace('/login').then(() => { this.$router.go() })
                } else {
                this.firebaseUID = JSON.parse(localStorage.getItem('firebase-uid'))
                await axios.get(`https://userapi.fti.ukdw.ac.id/${this.firebaseUID.uid}`)
                .then( async (response) => {
                    if(response.status == 200){
                    var listAdmin = await axios.get(`https://userapi.fti.ukdw.ac.id/${this.firebaseUID.uid}/accessPass`)
                    if(listAdmin.data.access == "granted"){
                        this.route = '/srm/AdminPage'
                    } else if (listAdmin.data.access == "denied") {
                        if(response.data.role == 'DOSEN') {
                            this.route = '/srm/DosenPage'
                        } else {
                            this.route = '/srm/MahasiswaPage'
                        }
                    }
                    }
                })
                }
            } catch (error) {
                console.log(error.message);
            }
        },
        signOut() {
            firebase.auth().signOut()
                .then(() => {
                    localStorage.clear()
                    this.$router.replace("/login").then(() => { this.$router.go() })
                }).catch((err) => {
                    console.log(err);
            });
        },
        goProfile() {
            this.$router.replace('/profile')
        },
        // goHome() {
        //     this.$router.replace('/listMenu').then(() => { this.$router.go() }).catch(()=>{})
        // },
        openNav() {
            document.getElementById("mySidenav").style.width = "250px";
        },
        closeNav() {
            document.getElementById("mySidenav").style.width = "0";
        },
        // goToSrm(){
        //     this.$router.replace('/srm')
        // }
    }
}
</script>

<style scoped>
@media (min-width: 1080px){
    .container{
        margin: auto;
        max-width: 1500px;
    }
}
img{
    float: left;
    max-width: 50%;
    height: auto;
    width: auto\9; /* ie8 */
}
h1{
    text-align:center;
    padding: 10%;
    font-size:calc(100% + 2vw);
}

@media (max-width:480px){
    #judulHeader{
        visibility: hidden;
    }
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
  color: white;
  display: block;
  transition: 0.3s;
}

.sidenav a:hover {
  color: #32a3df;
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
.sidenav a.active {
  background-color: #04AA6D;
  color: white;
}
.nav-flex {
    display: flex !important;
}
</style>
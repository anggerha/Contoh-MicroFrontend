<template>
    <div >
        <b-navbar class="navbar" type="light" variant="faded">
            <b-navbar-brand>
                <!-- <div class="center" @click="goHome"> -->
                    <!-- <img style="max-width:150px;" src="../assets/fti-ukdw.png" class="d-inline-block align-top" alt="FTI UKDW">
                    <h1 id="judulHeader">Informatika</h1> -->
                    <div class="sidenav" id="mySidenav">
                        <a href="javascript:void(0)" class="closebtn" @click="closeNav">&times;</a>
                        <a href="" @click="goHome" >Home</a>
                        <a href="" @click="goToSrm">SRM</a>
                    </div>
                    <div style="display:flex;">
                        <span style="font-size:30px;cursor:pointer" @click="openNav"> &#9776; Informatika</span>
                    
                    </div>
                    
                <!-- </div> -->
            </b-navbar-brand>
            <b-dropdown class="ml-auto" variant="link" toggle-class="text-decoration-none" no-caret>
                <template #button-content>
                    <b-avatar class="avatar" :src="profilPicture.profilPicture" size="4rem"></b-avatar>
                </template>
                <b-dropdown-item @click="goProfile">Profile</b-dropdown-item>
                <b-dropdown-item @click="signOut">Sign Out</b-dropdown-item>
            </b-dropdown>
        </b-navbar>
        <hr>
    </div>
</template>

<script>
import firebase from 'firebase'

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Header',
    data() {
        return {
            profilPicture: null
        }
    },
    created() {
        this.profilPicture = JSON.parse(sessionStorage.getItem('firebase-uid'))
       
    },
    methods: {
        signOut() {
            firebase.auth().signOut()
                .then(() => {
                    sessionStorage.clear()
                    this.$router.replace("/Login").then(() => { this.$router.go() })
                }).catch((err) => {
                    console.log(err);
            });
        },
        goProfile() {
            this.$router.replace('/profile')
        },
        goHome() {
            this.$router.replace('/listMenu').then(() => { this.$router.go() }).catch(()=>{})
        },
        openNav() {
            document.getElementById("mySidenav").style.width = "250px";
        },

        closeNav() {
            document.getElementById("mySidenav").style.width = "0";
        },
        goToSrm(){
            this.$router.replace('/srm')
        }
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
hr{
    border: 2px black solid;
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
</style>
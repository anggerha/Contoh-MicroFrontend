<template>
    <div class="container">
        <b-navbar class="navbar" type="light" variant="faded">
            <b-navbar-brand>
                <div class="center" @click="goHome">
                    <img style="max-width:150px;" src="../assets/fti-ukdw.png" class="d-inline-block align-top" alt="FTI UKDW">
                    <h1 id="judulHeader">Informatika</h1>
                </div>
            </b-navbar-brand>
            <b-dropdown class="ml-auto" variant="link" toggle-class="text-decoration-none" no-caret>
                <template #button-content>
                    <b-avatar class="avatar" :src="user.profilPicture" size="4rem"></b-avatar>
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
            user: [],
            dataDiri: []
        }
    },
    created() {
        this.user = JSON.parse(sessionStorage.getItem('user'))
        this.dataDiri = JSON.parse(sessionStorage.getItem('dataDiri'))
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
</style>
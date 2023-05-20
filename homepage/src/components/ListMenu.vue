<template>
<!-- <div>
    <div class="sidenav" id="mySidenav">
        <a href="javascript:void(0)" class="closebtn" @click="closeNav">&times;</a>
        <a class="active" href="#home">Home</a>
        <a href="#news">SRM</a>
    </div>
    <span style="font-size:30px;cursor:pointer" @click="openNav">&#9776; open</span>
    <div class="content">
         <h2>Responsive Sidebar Example</h2>
 
    </div>
</div> -->
    
    <div class="container">
        <div class="grid grid-flow-col auto-cols-max space-x-8 place-content-center">
            <!-- <router-link to="/srm">
                <div class="h-48 w-48 relative inline-flex items-center p-3 text-2xl font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <div class="grid-flow-row auto-rows-max space-y-4">
                        <img src="../assets/fti-ukdw.png" alt="">
                        <p>SRM</p>
                    </div>
                </div>
            </router-link>
            <router-link to="/srm">
                <div class="h-48 w-48 relative inline-flex items-center p-3 text-2xl font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <div class="grid-flow-row auto-rows-max space-y-4">
                        <img src="../assets/srm-icon.png" alt="">
                        <p>Punokawan</p>
                    </div>
                </div>
            </router-link> -->
            <p>berita</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'ListMenu',
    data() {
        return {
            firebaseUID: null
        }
    },
    created() {
        this.checkUser()
    },
    methods:{
        async checkUser() {
            if(sessionStorage.getItem('firebase-token') && sessionStorage.getItem('firebase-uid')){
                this.firebaseUID = JSON.parse(sessionStorage.getItem('firebase-uid'))
                await axios.get(`http://localhost:10001/${this.firebaseUID.uid}`)
                .then((response) => {
                    if(response.data.username_telegram == '' && response.data.id_telegram == '' && response.data.role == 'MAHASISWA'){
                        this.$router.replace('/formPage')
                    }
                })
            }
        },
        openNav() {
            document.getElementById("mySidenav").style.width = "250px";
        },

        closeNav() {
            document.getElementById("mySidenav").style.width = "0";
        }
    }
}
</script>

<style scoped>
    /* .container{
        margin: auto;
        margin-top: 5%;
    } */
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
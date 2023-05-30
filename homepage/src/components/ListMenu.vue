<template>
    <div>
        <ListBerita/>
    </div>
</template>

<script>
import ListBerita from './ListBerita.vue'
import axios from 'axios'

export default {
    name: 'ListMenu',
    components:{ListBerita},
    data() {
        return {
            firebaseUID: null
        }
    },
    created() {
        if(sessionStorage.getItem('firebase-token') && sessionStorage.getItem('firebase-uid')){
            this.firebaseUID = JSON.parse(sessionStorage.getItem('firebase-uid'))
            this.check()
        }
    },
    methods: {
        async check() {
            await axios.get(`http://userapi.fti.ukdw.ac.id/${this.firebaseUID.uid}`)
            .then((response) => {
                if(response.data.username_telegram == '' && response.data.id_telegram == '' && response.data.role == 'MAHASISWA'){
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
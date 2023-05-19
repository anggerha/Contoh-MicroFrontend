<template>
    <div class="container">
        <div class="grid grid-flow-col auto-cols-max space-x-8 place-content-center">
            <router-link to="/srm">
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
            </router-link>
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
                    if(response.data.username_telegram == '' && response.data.id_telegram == ''){
                        this.$router.replace('/formPage')
                    }
                })
            }
        }
    }
}
</script>

<style scoped>
    .container{
        margin: auto;
        margin-top: 5%;
    }
    button{
        margin: 2%;
    }
</style>
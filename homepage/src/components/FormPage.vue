<template>
    <div class="container">
        <h1 class="self-center font-semibold whitespace-nowrap dark:text-white" style="font-size: calc(80% + 0.8vw)">SELAMAT DATANG {{ profile.nama }}</h1>
    <form>
        <div class="mb-6" v-if="profile.nim">
            <label for="nim" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nim</label>
            <input type="text" id="nim" class="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :value="profile.nim" disabled required>
        </div>
        <div class="mb-6" v-if="profile.nim">
            <label for="nama" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Mahasiswa</label>
            <input type="text" id="nama" class="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :value="profile.nama" disabled required>
        </div>
        <div class="mb-6">
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
            <input type="email" id="email" class="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :value="profile.email" disabled required>
        </div>
        <!-- <div class="mb-6">
            <label for="usernameTelegram" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username Telegram</label>
            <input v-model="dataDiri.username_telegram" type="text" id="idTelegram" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
        </div> -->
        <div class="mb-6">
            <label for="idTelegram" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ID Telegram</label>
            <div style="margin-bottom: 1rem; background-color: lightgray; padding: 1rem; border-radius: 10px">
                <p>Cara mendapatkan Chat ID Telegram anda:</p>
                <ol style="list-style-type: number; margin-left: 2rem">
                    <li>Buka <a href="https://t.me/srm_informatika_ukdw_bot" target="_blank">Bot SRM Informatika UKDW</a> di Telegram,</li>
                    <li>Tekan START</li>
                    <li>Masukkan NIM anda</li>
                    <li>Tunggu konfirmasi dari BOT</li>
                    <li>Tekan tombol SUBMIT pada halaman ini</li>
                </ol>
            </div>
        </div>
    </form>
    <h5 v-if="state == true" style="text-align: center; color: red;">ID Telegram dan Username Telegram Anda Masih Kosong, Harap Ikuti Arahan di Atas dan Klik Tombol Submit Kembali !</h5>
    <button @click="goToListmenu" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'FormPage',
    data() {
        return{
            firebaseUID: null,
            profile: [],
            state: false
        }
    },
    created() {
        if(localStorage.getItem('firebase-token') && localStorage.getItem('firebase-uid')){
            this.firebaseUID = JSON.parse(localStorage.getItem('firebase-uid'))
            this.check()
        } else{
            this.$router.replace('/login').then(() => { this.$router.go() })
        }
    },
    methods: {
        async check() {
            await axios.get(`https://userapi.fti.ukdw.ac.id/${this.firebaseUID.uid}`)
            .then((response) => {
                if(response.data.id_telegram == '' && response.data.role == 'MAHASISWA'){
                    this.getProfile()
                }
            })
        },
        async getProfile() {
            await axios.get(`https://userapi.fti.ukdw.ac.id/${this.firebaseUID.uid}`)
            .then((response) => {
                this.profile = response.data
            })
        },
        async goToListmenu() {
            await axios.get(`https://userapi.fti.ukdw.ac.id/${this.firebaseUID.uid}`)
            .then((response) => {
                this.profile = response.data
            })
            if(this.profile.id_telegram !== null && this.profile.id_telegram !== ''){
                this.state = false
                this.$router.replace('/listMenu')
            } else {
                this.state = true
            }
        },
    },
}
</script>

<style scoped>
@media (min-width: 1080px){
    .container{
        margin: auto;
        max-width: 1500px;
    }
}
h1{
    padding-top: 2.5%;
    text-align: center;
}
</style>
<template>
    <div class="container">
        <h1 class="self-center text-3xl font-semibold whitespace-nowrap dark:text-white">Hai {{ dataDiri.nama }}, Lengkapi Data Diri Dulu Yuk</h1>
    <form>
        <div class="mb-6" v-if="dataDiri.nim">
            <label for="nim" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nim</label>
            <input type="text" id="nim" class="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :value="dataDiri.nim" disabled required>
        </div>
        <div class="mb-6" v-if="dataDiri.nik">
            <label for="nim" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nik</label>
            <input type="text" id="nim" class="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :value="dataDiri.nik" disabled required>
        </div>
        <div class="mb-6" v-if="dataDiri.nim">
            <label for="nama" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Mahasiswa</label>
            <input type="text" id="nama" class="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :value="dataDiri.nama" disabled required>
        </div>
        <div class="mb-6" v-if="dataDiri.nik">
            <label for="nama" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Dosen</label>
            <input type="text" id="nama" class="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :value="dataDiri.nama" disabled required>
        </div>
        <div class="mb-6">
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
            <input type="email" id="email" class="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :value="user.email" disabled required>
        </div>
        <div class="mb-6">
            <label for="usernameTelegram" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username Telegram</label>
            <input v-model="dataDiri.username_telegram" type="text" id="idTelegram" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
        </div>
        <div class="mb-6">
            <label for="idTelegram" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ID Telegram</label>
            <div style="margin-bottom: 1rem; background-color: lightgray; padding: 1rem; border-radius: 10px">
                <p>Cara mendapatkan Chat ID Telegram anda:</p>
                <ol style="list-style-type: number; margin-left: 2rem">
                    <li>Buka <a href="https://t.me/RawDataBot" target="_blank">@RawDataBot</a> di Telegram,</li>
                    <li>Tekan pilihan "start",</li>
                    <li>Cari Chat ID anda pada respon yang dikembalikan,</li>
                    <li>Masukkan Chat ID Telegram anda pada input field dibawah.</li>
                </ol>
                <p>Lokasi Chat ID:</p>
                <img src="../assets/locationChatId.png" alt="">
            </div>
            <input v-model="dataDiri.id_telegram" type="text" id="idTelegram" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
        </div>
    </form>
    <button @click="updateData" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'FormPage',
    data() {
        return{
            user: [],
            dataDiri: [],
        }
    },
    created() {
        if(sessionStorage.getItem('user') && sessionStorage.getItem('dataDiri')){
            this.user = JSON.parse(sessionStorage.getItem('user'))
            this.dataDiri = JSON.parse(sessionStorage.getItem('dataDiri'))
            this.dataDiri.email = this.user.email
            if(this.dataDiri.nim){
                this.dataDiri.role = 'MAHASISWA'
            } else if (this.dataDiri.nik) {
                this.dataDiri.role = 'DOSEN'
            } else {
                this.dataDiri.role = ''
            }
        }
    },
    methods: {
        async updateData(){
            if(this.dataDiri.id_telegram !== null && this.dataDiri.id_telegram !== '' && this.dataDiri.username_telegram !== null && this.dataDiri.username_telegram !== ''){
                if(this.dataDiri.role == 'MAHASISWA'){
                    await axios.put(`http://localhost:10001/mahasiswa/update`, this.dataDiri, { params: { 
                        email: this.dataDiri.email.toString(), 
                        role: this.dataDiri.role.toString()
                    }})
                    .then(async () => {
                        this.$toast.open({
                            message: 'Data berhasil diupdate !',
                            type: 'success',
                            position: 'top'
                        });
                        await axios.get('http://localhost:10001/mahasiswa/me', { params: { email: this.user.email.toString(), role: this.dataDiri.role.toString() }})
                        .then((response) => {
                            sessionStorage.setItem('dataDiri', JSON.stringify(response.data))
                            this.$router.replace("/listmenu").then(() => {})
                        })
                    })
                } else if (this.dataDiri.role == 'DOSEN') {
                    await axios.put(`http://localhost:10001/dosen/update`, this.dataDiri, { params: {
                        email: this.dataDiri.email.toString(), 
                        role: this.dataDiri.role.toString() 
                    }})
                    .then(async () => {
                        this.$toast.open({
                            message: 'Data berhasil diupdate !',
                            type: 'success',
                            position: 'top'
                        });
                        await axios.get('http://localhost:10001/dosen/me', { params: { email: this.user.email.toString(), role: this.dataDiri.role.toString() }})
                        .then((response) => {
                            sessionStorage.setItem('dataDiri', JSON.stringify(response.data))
                            this.$router.replace("/listmenu").then(() => {})
                        })
                    })
                }
            } else {
                this.$toast.open({
                    message: 'ID telegram kosong !',
                    type: 'error',
                    position: 'top'
                });
            }
        }
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
    margin: 5%;
    text-align: center;
}
</style>
<template>
    <div class="container">
        <div class="shadow p-3 mb-5 bg-white rounded">
            <tr>
                <button class="btn" type="button" @click="kembali">Kembali</button>
            </tr>
            <div class="form">
                <tr class="avatar">
                    <img class="avatar" :src="user.profilPicture" alt="Profile Picture">
                </tr>
                <div v-if="dataDiri.nik" class="mb-6">
                    <label for="nama" class="block mb-2 text-lg text-center font-medium text-gray-900 dark:text-white">{{ dataDiri.nik }}</label>
                </div>
                <div v-if="dataDiri.nim" class="mb-6">
                    <label for="nama" class="block mb-2 text-lg text-center font-medium text-gray-900 dark:text-white">{{ dataDiri.nim }}</label>
                </div>
                <div class="mb-6" v-if="dataDiri.nama">
                    <label for="nama" class="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Nama</label>
                    <input :value="dataDiri.nama" type="text" id="nim" class="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" disabled required>
                </div>
                <div class="mb-6" v-if="dataDiri.email">
                    <label for="email" class="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Email</label>
                    <input :value="dataDiri.email" type="text" id="email" class="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" disabled required>
                </div>
                <div class="mb-6" v-if="dataDiri.id_telegram">
                    <label for="Id Telegram" class="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Id Telegram</label>
                    <input :value="dataDiri.id_telegram" type="text" id="id_telegram" class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                </div>
                <div class="mb-6" v-if="dataDiri.username_telegram">
                    <label for="Id Telegram" class="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Username Telegram</label>
                    <input :value="dataDiri.username_telegram" type="text" id="username_telegram" class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                </div>
            </div>
            <tr>
                <button class="btn" type="button" @click="updateData">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" id="logo" class="bi bi-check2" viewBox="0 0 16 16">
                        <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                    </svg>
                    Simpan
                </button>
            </tr>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Profile',
    data() {
        return {
            user: [],
            dataDiri: []
        }
    },
    created() {
        if(sessionStorage.getItem('dataDiri') && sessionStorage.getItem('user')){
            this.getMahasiswa()
        } else {
            this.$router.replace('/Login').then(() => { this.$router.go() })
        }
    },
    methods: {
        getMahasiswa() {
            this.dataDiri = JSON.parse(sessionStorage.getItem('dataDiri'))
            this.user = JSON.parse(sessionStorage.getItem('user'))
        },
        kembali() {
            this.$router.replace('/ListMenu').then(() => {})
        },
        async updateData() {
            if(this.dataDiri.id_telegram !== null && this.dataDiri.id_telegram !== '' && this.dataDiri.username_telegram !== null && this.dataDiri.username_telegram !== ''){
                if(this.dataDiri.role == 'MAHASISWA'){
                    await axios.put(`http://localhost:5000/mahasiswa/update`, this.dataDiri, { params: { nim : this.dataDiri.nim, email: this.dataDiri.email.toString(), role: this.dataDiri.role.toString(), nama: this.dataDiri.nama }})
                    .then(async () => {
                        this.$toast.open({
                            message: 'Data berhasil diupdate !',
                            type: 'success',
                            position: 'top'
                        });
                        await axios.get('http://localhost:5000/mahasiswa/me', { params: { nama : this.user.displayName.toString().toUpperCase(), email: this.user.email.toString() }})
                        .then((response) => {
                            sessionStorage.setItem('dataDiri', JSON.stringify(response.data))
                            this.$router.replace("/listmenu").then(() => {})
                        })
                    })
                } else if (this.dataDiri.role == 'DOSEN') {
                    await axios.put(`http://localhost:5000/dosen/update`, this.dataDiri, { params: { nik : this.dataDiri.nik, email: this.dataDiri.email.toString(), role: this.dataDiri.role.toString(), nama: this.dataDiri.nama }})
                    .then(async () => {
                        this.$toast.open({
                            message: 'Data berhasil diupdate !',
                            type: 'success',
                            position: 'top'
                        });
                        await axios.get('http://localhost:5000/dosen/me', { params: { nama : this.user.displayName.toString().toUpperCase(), email: this.user.email.toString() }})
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
    }
}
</script>

<style scoped>
.avatar {
    vertical-align: middle;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    margin: auto; 
    display: flex; 
    max-width: 8rem;
}
.btn {
    display: flex;
}
#logo {
    margin: auto;
    text-align: center;
    font-size: x-large;
}
.btn:hover {
    color: white !important;
    background-color: #32a3df;
}
</style>
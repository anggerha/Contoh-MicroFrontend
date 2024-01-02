<template>
    <div class="container">
        <div class="shadow p-3 mb-5 bg-white rounded">
            <tr>
                <button class="kembali" @click="kembali">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
            </svg>
            Kembali
        </button>
            </tr>
            <div class="form">
                <tr class="avatar">
                    <img class="avatar" :src="firebaseUID.profilPicture" alt="Profile Picture">
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
                <div class="mb-6" v-if="dataDiri.username_telegram || dataDiri.username_telegram =='' && dataDiri.role == 'MAHASISWA'">
                    <label for="Id Telegram" class="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Username Telegram</label>
                    <input v-model="dataDiri.username_telegram" type="text" id="username_telegram" class="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" disabled required/>
                </div>
                <div class="mb-6" v-if="dataDiri.id_telegram || dataDiri.id_telegram == '' && dataDiri.role == 'MAHASISWA' ">
                    <label for="Id Telegram" class="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Chat ID Telegram</label>
                    <input v-model="dataDiri.id_telegram" type="text" id="id_telegram" class="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" disabled required/>
                </div>
            </div>
            <!-- <tr>
                <button class="btn simpan" type="button" @click="updateData">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" id="logo" class="bi bi-check2" viewBox="0 0 16 16">
                        <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                    </svg>
                    Simpan
                </button>
            </tr> -->
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
            dataDiri: [],
            firebaseUID: null
        }
    },
    created() {
        if(localStorage.getItem('firebase-token') && localStorage.getItem('firebase-uid')){
            this.firebaseUID = JSON.parse(localStorage.getItem('firebase-uid'))
            this.check()
        } else {
            this.$router.replace('/login').then(() => {  })
        }
    },
    methods: {
        async check() {
            await axios.get(`https://userapi.fti.ukdw.ac.id/${this.firebaseUID.uid}`)
            .then((response) => {
                if(response.data.id_telegram == '' && response.data.role == 'MAHASISWA'){
                    this.$router.replace('/formPage')
                } else {
                    this.getMahasiswa()
                }
            })
        },
        async getMahasiswa() {
            this.firebaseUID = JSON.parse(localStorage.getItem('firebase-uid'))
            await axios.get(`https://userapi.fti.ukdw.ac.id/${this.firebaseUID.uid}`)
            .then( async (response) => {
                if(response.status == 200){
                    this.dataDiri = response.data
                }
            })
        },
        kembali() {
            this.$router.replace('/listMenu').then(() => {})
        },
        async updateData() {
            if(this.dataDiri.id_telegram !== null && this.dataDiri.id_telegram !== ''){
                if(this.dataDiri.role == 'MAHASISWA'){
                    await axios.put(`https://userapi.fti.ukdw.ac.id/mahasiswa/${this.firebaseUID.uid}/update`, this.dataDiri, { params: { email: this.dataDiri.email.toString(), role: this.dataDiri.role.toString() }})
                    .then(async () => {
                        this.$toast.open({
                            message: 'Data berhasil diupdate !',
                            type: 'success',
                            position: 'top'
                        });
                        await axios.get('https://userapi.fti.ukdw.ac.id/${this.firebaseUID.uid}', { params: {email: this.user.email.toString(), role: this.dataDiri.role.toString() }})
                        .then((response) => {
                            localStorage.setItem('dataDiri', JSON.stringify(response.data))
                            //this.$router.replace("/listmenu").then(() => {})
                        })
                    })
                } 
                // else if (this.dataDiri.role == 'DOSEN') {
                //     await axios.put(`https://userapi.fti.ukdw.ac.id/dosen/${this.firebaseUID.uid}/update`, this.dataDiri, { params: { nik : this.dataDiri.nik, email: this.dataDiri.email.toString(), role: this.dataDiri.role.toString(), nama: this.dataDiri.nama }})
                //     .then(async () => {
                //         this.$toast.open({
                //             message: 'Data berhasil diupdate !',
                //             type: 'success',
                //             position: 'top'
                //         });
                //         await axios.get('https://userapi.fti.ukdw.ac.id/${this.firebaseUID.uid}', { params: { nama : this.user.displayName.toString().toUpperCase(), email: this.user.email.toString() }})
                //         .then((response) => {
                //             localStorage.setItem('dataDiri', JSON.stringify(response.data))
                //             this.$router.replace("/listmenu").then(() => {})
                //         })
                //     })
                // }
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
.kembali:hover {
    color: white !important;
    background-color: #32a3df;
    
}
.kembali{
    display: flex;
    border-style: none;
    background-color: transparent;
    color: black;
    margin: 0.25rem;
    padding: 0.5rem;
    border-radius: 5%;
}
.simpan:hover {
    color: white !important;
    background-color: #43a04b;
    
}
.simpan{
    display: flex;
    border-style: none;
    background-color: transparent;
    color: black;
    margin: 0.25rem;
    padding: 0.5rem;
    border-radius: 5%;
}
</style>
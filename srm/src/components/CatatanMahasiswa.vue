<template>
    <div v-if="itemMahasiswa.length !== 0" id="catatanMahasiswa">
        <body class="bv-example-row">
            <b-row>
                <b-col>
                    <div class="shadow-lg p-3 mb-5 bg-white rounded-4">
                        <b-row style="margin-bottom:1rem;">
                            <b-col>
                                <h3>Catatan Mahasiswa </h3>
                            </b-col>
                            <b-col style="display: flex; justify-content: flex-end;">
                                <div>
                                    <div class="button">
                                        <b-button class="delete" @click="hapusKomponen()" >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                                            </svg>
                                            Tutup
                                        </b-button>
                                    </div>
                                </div>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                                 <div class="nim">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-person-vcard-fill" viewBox="0 0 16 16">
                                        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm9 1.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4a.5.5 0 0 0-.5.5ZM9 8a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4A.5.5 0 0 0 9 8Zm1 2.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 0-1h-3a.5.5 0 0 0-.5.5Zm-1 2C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1 1 0 0 0 2 13h6.96c.026-.163.04-.33.04-.5ZM7 6a2 2 0 1 0-4 0 2 2 0 0 0 4 0Z"/>
                                    </svg>
                                    <span style="margin-left: 0.5rem;">{{ itemMahasiswa.nim }}</span>
                                 </div>
                            </b-col>
                            <b-col>
                                <p>IPK :</p>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                                <div class="nama">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                                    </svg>
                                    <span style="margin-left: 0.5rem;">{{ itemMahasiswa.NAMA_MAHASISWA }}</span>
                                </div>
                            </b-col>
                            <b-col>
                                <p>IPS :</p>
                            </b-col>
                        </b-row>
                        <b-row style="margin-top: 1rem">
                            <b-col>
                                <h2 v-if="logMahasiswa.length != 0">Catatan Perwalian {{ logMahasiswa[0]?.kode_semester?.slice(0, 4) }}</h2>
                                <h2 v-if="logMahasiswa.length == 0">Catatan Perwalian Kosong</h2>
                                <h4 v-if="logMahasiswa[0]?.kode_semester?.slice(4, 5) == 1">Semester Gasal</h4>
                                <h4 v-if="logMahasiswa[0]?.kode_semester?.slice(4, 5) == 2">Semester Genap</h4>
                                <b-card v-for="item in logMahasiswa" :key="item._id" style="margin-bottom: 1rem">
                                    <b-card-title>{{ item.judul }}</b-card-title>
                                        <b-card-text>
                                            {{ item.pembahasan }}
                                        </b-card-text>
                                    <b-card-text class="small text-muted">Dikirim pada tanggal {{ item.tanggal }}</b-card-text>
                                </b-card>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                                <b-button block>Arsip Catatan Perwalian</b-button>
                            </b-col>
                        </b-row>
                    </div>
                </b-col>
            </b-row>
        </body>
    </div>
</template>

<script>
import axios from 'axios'
import "core-js/actual/array/group-by"

export default {
    name: 'CatatanMahasiswa',
    props: ['itemMahasiswa'],
    data() {
        return {
            dataPerwalian: [],
            logMahasiswa: [],
            dataDiri: [],
            logMahasiswaGrouped: null
        }
    },
    created(){
        this.dataPerwalian = this.itemMahasiswa
        this.dataDiri = JSON.parse(sessionStorage.getItem('user'))
    },
    watch: {
        // eslint-disable-next-line no-unused-vars
        dataPerwalian(newValue, oldValue) {
            if(this.itemMahasiswa.length !== 0)
                this.getLogMahasiswa()
        }
    },
    methods: {
        async getLogMahasiswa() {
            try {
                await axios.get(`http://localhost:10002/dosen/log-mahasiswa/${this.dataPerwalian.nim}`, { params: {
                    email: this.dataDiri.email,
                    role: 'DOSEN'
                }})
                .then((response) => {
                    // console.log(response);
                    this.logMahasiswa = response.data
                    this.logMahasiswaGrouped = this.logMahasiswa.groupBy((log) => {
                        return log.kode_semester
                    })
                    console.log(this.logMahasiswaGrouped)
                })
            } catch (error) {
                console.log(error)
                this.$toast.open({
                    message: 'Tidak Ada Catatan Perwalian !',
                    type: 'warning',
                    position: 'top'
                });
            }
        },
        hapusKomponen(){
            this.$emit('clicked',true)
            //console.log(event);
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
.button {
    display: flex;
    justify-content: flex-end;
}
.send{
    display: flex;
    border-style: none;
    color: #32a3df;
    margin: 0.25rem;
    background-color: transparent;
}
.send:hover{
    color: white;
    background-color: #32a3df;
}
.nim, .nama{
    display: flex;
}
.delete{
    display: flex;
    border-style: none;
    color: black;
    margin: 0.25rem;
    background-color: transparent;
}
.delete:hover{
    color: white;
    background-color: darkgray;
}
</style>
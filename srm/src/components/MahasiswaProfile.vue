<template>
    <div v-if="item.length !== 0" id="catatanPerwalian">
        <body class="bv-example-row">
            <b-row>
                <b-col>
                    <div class="shadow-lg p-3 mb-5 bg-white rounded-4">
                        <b-row>
                            <b-col>
                                <h3>Catatan Perwalian</h3>
                            </b-col>
                            <b-col>
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
                        
                        <div class="nim">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-person-vcard-fill" viewBox="0 0 16 16">
                                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm9 1.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4a.5.5 0 0 0-.5.5ZM9 8a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4A.5.5 0 0 0 9 8Zm1 2.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 0-1h-3a.5.5 0 0 0-.5.5Zm-1 2C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1 1 0 0 0 2 13h6.96c.026-.163.04-.33.04-.5ZM7 6a2 2 0 1 0-4 0 2 2 0 0 0 4 0Z"/>
                            </svg>
                            <span style="margin-left: 0.5rem;">{{ item.nim }}</span>
                        </div>
                        <br>
                        <div class="nama">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                            </svg>
                            <span style="margin-left: 0.5rem;">{{ item.NAMA_MAHASISWA }}</span>
                        </div>
                        <div class="form">
                            <b-input type="text" placeholder="Judul" style="margin-bottom: 1rem; margin-top: 1rem" v-model="judulPengumuman"></b-input>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="8" v-model="isiPengumuman"></textarea>
                        </div>
                        <div style="margin-top: 1rem;">
                            <div>
                                <div class="button">
                                    <b-button class="send" @click="kirimPersonal">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-send-fill" viewBox="0 0 16 16">
                                            <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"/>
                                        </svg>
                                        Kirim
                                    </b-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </b-col>
            </b-row>
        </body>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'MahasiswaProfile',
    props: ['item'],
    data() {
        return {
            dataPerwalian: [],
            user: [],
            dataDiri: [],
            judulPengumuman: '',
            isiPengumuman: ''
        }
    },
    created(){
        this.dataPerwalian = this.item
        this.dataDiri = JSON.parse(sessionStorage.getItem('dataDiri'))
        this.user = JSON.parse(sessionStorage.getItem('user'))
    },
    watch: {
        // eslint-disable-next-line no-unused-vars
        dataMahasiswa(newValue, oldValue) {
            if(this.item.length !== 0)
                this.getLogMahasiswa()
        }
    },
    methods: {
        // async getLogMahasiswa() {
        //     try {
        //         await axios.get(`http://localhost:8000/dosen/log-mahasiswa`, { params: {
        //             email: this.dataDiri.email,
        //             role: 'DOSEN',
        //             nama_mahasiswa: this.item.NAMA_MAHASISWA.toUpperCase(),
        //             nim: this.item.nim
        //         }})
        //         .then((response) => {
        //             console.log(response);
        //             this.logMahasiswa = response.data[0]
        //         })
        //     } catch (error) {
        //         this.$toast.open({
        //             message: error.response.data.message,
        //             type: 'warning',
        //             position: 'top'
        //         });
        //     }
        // },
        async kirimPersonal(){
            await axios.post(`http://localhost:10002/dosen/new-log/${this.dataPerwalian.nim}`, {
                nama_dosen: this.dataDiri.nama,
                nama_mahasiswa: this.dataPerwalian.NAMA_MAHASISWA,
                email: '',
                kode_semester: this.dataPerwalian.KODE_SEMESTER,
                nim: this.dataPerwalian.nim,
                role: this.dataDiri.role,
                pembahasan: this.isiPengumuman,
                judul: this.judulPengumuman,
                file: ''
            },
            {
                params: {
                    role: this.dataDiri.role,
                    email: this.dataDiri.email
                }
            })
            .then((response) => {
                console.log(response);
                this.$toast.open({
                    message: 'Pesan Berhasil Terkirim',
                    type: 'success',
                    position: 'top'
                });
                this.isiPengumuman = ''
                this.judulPengumuman = ''
            })
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
.nim, .nama{
    display: flex;
}
</style>
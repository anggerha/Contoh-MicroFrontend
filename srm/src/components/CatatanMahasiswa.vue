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
                        <div v-if="loadingCatatanMahasiswa" style="text-align: center;">
                            <div class="loadingio-spinner-ellipsis-f9g8sm63oof"><div class="ldio-mr6hs88yhu">
                            <div></div><div></div><div></div><div></div><div></div>
                            </div></div>
                        </div>
                        <div v-if="!loadingCatatanMahasiswa">
                            <b-row>
                                <b-col>
                                    <div class="nim">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-person-vcard-fill" viewBox="0 0 16 16">
                                            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm9 1.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4a.5.5 0 0 0-.5.5ZM9 8a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4A.5.5 0 0 0 9 8Zm1 2.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 0-1h-3a.5.5 0 0 0-.5.5Zm-1 2C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1 1 0 0 0 2 13h6.96c.026-.163.04-.33.04-.5ZM7 6a2 2 0 1 0-4 0 2 2 0 0 0 4 0Z"/>
                                        </svg>
                                        <span style="margin-left: 0.5rem;">{{ dataPerwalian.nim }}</span>
                                    </div>
                                </b-col>
                                <b-col>
                                    <p>IPK : {{detailMahasiswa.ipk}} </p>
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col>
                                    <div class="nama">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                                        </svg>
                                        <span v-if="itemMahasiswa[1] == 'dosen'" style="margin-left: 0.5rem;">{{ dataPerwalian.nama_mahasiswa }}</span>
                                        <span v-if="itemMahasiswa[1] == 'admin'" style="margin-left: 0.5rem;">{{ dataPerwalian.nama_lengkap }}</span>
                                    </div>
                                </b-col>
                            </b-row>
                            <b-row v-if="itemMahasiswa[1] == 'admin'">
                                <b-col>
                                    <div class="email">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-envelope-fill" viewBox="0 0 16 16">
                                            <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z"/>
                                        </svg>
                                        <span  style="margin-left: 0.5rem;">{{ dataPerwalian.email }}</span>
                                    </div>
                                </b-col>
                            </b-row>
    <!-- LOG MAHASISWA -->
                            <div v-if="logMahasiswa.length != 0">
                                <b-row style="margin-top: 1rem">
                                    <b-col>
                                        <h2 v-if="logMahasiswa.length != 0">Catatan Perwalian {{ logMahasiswa[logMahasiswa.length-1]?.kode_semester?.slice(0, 4) }}</h2>
                                        <b-row style="margin-bottom: 0.5rem;">
                                            <b-col style="display: flex;">
                                                <h4 v-if="logMahasiswa[0]?.kode_semester?.slice(4, 5) == 1">Semester Gasal</h4>
                                                <h4 v-if="logMahasiswa[0]?.kode_semester?.slice(4, 5) == 2">Semester Genap</h4>
                                                <span v-if="logMahasiswa.length != 0" class="badge badge-pill badge-success badge-catatan">Terbaru</span>
                                            </b-col>
                                        </b-row>
                                        <div v-for="item in kodeSemester" :key="item">
                                            <div v-for="data in logMahasiswaGrouped[item]" :key="data._id" style="margin-bottom: 1rem">
                                                <b-card v-if="logMahasiswa[0].kode_semester == item">
                                                        <b-card-title>
                                                            {{ data.judul }}
                                                        </b-card-title>
                                                        <b-card-text>
                                                            {{ data.pembahasan }}
                                                        </b-card-text>
                                                    <b-card-text class="small text-muted">Dikirim pada tanggal {{ data.tanggal}}</b-card-text>
                                                </b-card>
                                            </div>
                                        </div>
                                    </b-col>
                                </b-row>
                                <b-row>
                                    <b-col>
                                        <b-button class="button-arsip" block v-b-toggle.accordion-catatan variant="info">
                                            <svg xmlns="http://www.w3.org/2000/svg" style="margin-right:0.5rem;" width="20" height="20" fill="currentColor" class="bi bi-archive-fill" viewBox="0 0 16 16">
                                                <path d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15h9.286zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zM.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8H.8z"/>
                                            </svg> Arsip Catatan Perwalian
                                        </b-button>
                                        <b-collapse id="accordion-catatan" role="tabpanel">
                                            <div style="margin-top: 1rem;width: 100%;">
                                                <ul style="display: grid;grid-template-columns:repeat(3, 1fr); padding:0;">
                                                    <li v-show="logMahasiswa[0].kode_semester != item" v-for="item in kodeSemester" :key="item" style="width: 100%; display:inline;">
                                                        <b-button v-b-toggle="'accordion-' + item">{{ item.slice(0, 4) }}<span v-if="item.slice(4, 5) == 1"> Gasal</span><span v-if="item.slice(4, 5) == 2"> Genap</span></b-button>
                                                    </li>
                                                </ul>                             
                                            </div>
                                            <div v-show="logMahasiswa[0].kode_semester !== item" v-for="item in kodeSemester" :key="item" style="margin-bottom: 1rem">
                                                <b-collapse :id="'accordion-' + item" role="tabpanel">
                                                    <b-card-title style="margin-left:1rem;" v-if="item.slice(4, 5) == 1">{{ item.slice(0, 4) }} Gasal</b-card-title>
                                                    <b-card-title style="margin-left:1rem;" v-if="item.slice(4, 5) == 2">{{ item.slice(0, 4) }} Genap</b-card-title>
                                                    <b-card>
                                                        <b-card-text v-for="data in logMahasiswaGrouped[item]" :key="data._id">
                                                            <h3>{{ data.judul }}</h3>
                                                            <b-card-text class="small text-muted">Dikirim pada tanggal {{ data.tanggal }}</b-card-text>
                                                            <p>Catatan: <br>{{ data.pembahasan }}</p>
                                                            <hr>
                                                        </b-card-text>
                                                    </b-card>
                                                </b-collapse>
                                            </div>
                                        </b-collapse>
                                    </b-col>
                                </b-row>
                            </div>
                            <div v-if="logMahasiswa.length == 0 && !isAdmin">
                                <b-row>
                                    <b-col style="margin-top: 1rem">
                                        <span class="badge badge-pill badge-warning">Catatan Perwalian Kosong</span>
                                    </b-col>
                                </b-row>
                            </div>
    <!-- DETAIL MAHASISWA -->
                            <div v-if="detailMahasiswa.length != 0">
                                <b-row style="margin-top: 1rem;">
                                    <b-col>
                                        <b-button class="button-arsip" block v-b-toggle.accordion-nilai variant="info">Nilai Mahasiswa</b-button>
                                        <b-collapse id="accordion-nilai" role="tabpanel">
                                            <div style="margin-top: 1rem; width: 100%;">
                                                <ul style="display: grid; grid-template-columns:repeat(auto-fit, minmax(110px,1fr)); padding:0;">
                                                    <li v-for="item in kodeSemesterNilai" :key="item" style="display:inline; padding: 10px; ">
                                                        <b-button class="tombolNilai" v-if="item.slice(4, 5) == 1" style="margin-bottom: 1rem; display:flex; width:6.5rem; " v-b-toggle="'accordion-' + item"><div style="float:left;">{{ item.slice(0, 4) }}</div> &nbsp;<div style="float:right;">Gasal</div> </b-button>
                                                        <b-button class="tombolNilai" v-if="item.slice(4, 5) == 2" style="margin-bottom: 1rem; display:flex; width:6.5rem; " v-b-toggle="'accordion-' + item"><div style="float:left;">{{ item.slice(0, 4) }}</div> &nbsp;<div style="float:right;">Genap</div> </b-button>
                                                    </li>
                                                </ul>                                            
                                            </div>
                                            <div v-for="item in kodeSemesterNilai" :key="item" style="margin-bottom: 1rem">
                                                <b-collapse :id="'accordion-' + item" role="tabpanel">
                                                    <b-row>
                                                        <div style="margin: auto; display:flex; ">
                                                        <h5 class="judulNilai">Tahun Ajaran {{item.slice(0,4)}}/{{parseInt(item.slice(0,4))+1}}</h5>&nbsp;
                                                        <h5 class="judulNilai" v-if="item.slice(4,5)==1">Semester Gasal</h5>
                                                        <h5 class="judulNilai" v-if="item.slice(4,5)==2">Semester Genap</h5>
                                                        </div>
                                                    </b-row>
                                                    <b-row style="margin:auto;">
                                                        <h5 v-if="detailMahasiswa.ips[item] >= 2.5" class="badge badge-primary" style="font-size: calc(65% + 0.5vw)">IPS: {{detailMahasiswa.ips[item]}}</h5>
                                                        <h5 v-if="detailMahasiswa.ips[item] < 2.5" class="badge badge-warning" style="font-size: calc(65% + 0.5vw)">IPS: {{detailMahasiswa.ips[item]}}</h5>
                                                    </b-row>
                                                    <div class="row">
                                                        <div v-for="nilai in nilaiGrouped[item]" :key="nilai._id" class="col-md-6 col-6 my-1 col-lg-4 col-xl-4">
                                                            <b-card style="height:100%; ">
                                                                <b-card-text>
                                                                    <p style=" font-size:calc(80% + 0.5vw);">{{nilai.nama_matakuliah}}</p>
                                                                    <span class="badge badge-pill badge-info"> Nilai: {{ nilai.nilai}}</span>
                                                                </b-card-text>
                                                            </b-card>
                                                        </div>
                                                    </div>
                                                    <br>
                                                </b-collapse>
                                            </div>
                                        </b-collapse>
                                    </b-col>
                                </b-row>
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
import "core-js/actual/array/group-by"

export default {
    name: 'CatatanMahasiswa',
    props: ['itemMahasiswa'],
    data() {
        return {
            dataPerwalian: [],
            detailMahasiswa: [],
            logMahasiswa: [],
            dataDiri: [],
            firebaseUID:[],
            logMahasiswaGrouped: null,
            nilaiGrouped: [],
            kodeSemesterNilai: [],
            kodeSemester: null,
            isAdmin: null,
            loadingCatatanMahasiswa: true
        }
    },
    created(){
        this.dataPerwalian = this.itemMahasiswa[0]
        if(sessionStorage.getItem('firebase-token') && sessionStorage.getItem('firebase-uid')){
            this.firebaseUID = JSON.parse(sessionStorage.getItem('firebase-uid'))
        }
    },
    watch: {
        // eslint-disable-next-line no-unused-vars
        async dataPerwalian(newValue, oldValue) {
            await axios.get(`https://userapi.fti.ukdw.ac.id/${this.firebaseUID.uid}/accessPass`)
            .then(async(response) => {
                if(response.data.access == 'denied'){
                    if(this.itemMahasiswa.length !== 0){
                        this.isAdmin = false
                        await this.getLogMahasiswa()
                        await this.getDetailMahasiswaDosen()
                        this.loadingCatatanMahasiswa = false
                    }
                } else if (response.data.access == 'granted'){
                    this.isAdmin = true
                    await this.getDetailMahasiswa()
                    this.loadingCatatanMahasiswa = false
                }
            })
        }
    },
    methods: {
        async getLogMahasiswa() {
            try {
                await axios.get(`https://waliapi.fti.ukdw.ac.id/dosen/${this.firebaseUID.uid}/log-mahasiswa/${this.dataPerwalian.nim}`, )
                .then( async (response) => {
                    this.logMahasiswa = response.data
                    this.logMahasiswaGrouped = this.logMahasiswa.groupBy((log) => {
                        return log.kode_semester
                    })
                    this.kodeSemester = Object.keys(this.logMahasiswaGrouped).reverse()
                })
            } catch (error) {
                this.$toast.open({
                    message: 'Tidak Ada Catatan Perwalian !',
                    type: 'warning',
                    position: 'top'
                });
            }
        },
        async getDetailMahasiswaDosen() {
            try {
                await axios.get(`https://userapi.fti.ukdw.ac.id/dosen/${this.firebaseUID.uid}/view-mahasiswa/${this.dataPerwalian.nim}`)
                .then((response) => {
                    this.detailMahasiswa = response.data
                    this.nilaiGrouped = response.data.nilai.groupBy((nilai) => {
                        return nilai.kode_semester
                    })
                    this.kodeSemesterNilai = Object.keys(this.nilaiGrouped).reverse()
                    console.log(this.detailMahasiswa);
                })
            } catch (error) {
                console.log(error.message);
            }
        },
        async getDetailMahasiswa() {
            try {
                await axios.get(`https://userapi.fti.ukdw.ac.id/admin/${this.firebaseUID.uid}/view-mahasiswa/${this.dataPerwalian.nim}`)
                .then((response) => {
                    this.detailMahasiswa = response.data
                    this.nilaiGrouped = response.data.nilai.groupBy((nilai) => {
                        return nilai.kode_semester
                    })
                    this.kodeSemesterNilai = Object.keys(this.nilaiGrouped).reverse()
                })
            } catch (error) {
                console.log(error.message);
            }
        },
        hapusKomponen(){
            this.$emit('clicked',true)
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
.btn-info{
    color: #32a3df;
    display: flex;
    justify-content: center;
    background-color: transparent;
    border-color: #32a3df !important
}
.btn-info:hover{
    color: white;
    background-color: #32a3df;
    border-style: 1px solid #32a3df;
}
.btn-info:focus{
    color: white;
    background-color: #32a3df;
    border-color:#32a3df !important;
    box-shadow: none;
}
.button {
    display: flex;
    justify-content: center;
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
.nim, .nama, .email{
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
.judulNilai{
    font-size:calc(80% + 0.7vw);
}
.tombolNilai:active{
    background-color: #32a3df;
    color: white;
}
.badge-catatan{
    margin-left: 0.8rem;
    margin-top: 0.4rem;
    margin-bottom: 0.5rem;
    display: flex; 
    align-items: center;
}
@keyframes ldio-mr6hs88yhu {
   0% { transform: translate(12px,80px) scale(0); }
  25% { transform: translate(12px,80px) scale(0); }
  50% { transform: translate(12px,80px) scale(1); }
  75% { transform: translate(80px,80px) scale(1); }
 100% { transform: translate(148px,80px) scale(1); }
}
@keyframes ldio-mr6hs88yhu-r {
   0% { transform: translate(148px,80px) scale(1); }
 100% { transform: translate(148px,80px) scale(0); }
}
@keyframes ldio-mr6hs88yhu-c {
   0% { background: #93dbe9 }
  25% { background: #3b4368 }
  50% { background: #5e6fa3 }
  75% { background: #689cc5 }
 100% { background: #93dbe9 }
}
.ldio-mr6hs88yhu div {
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transform: translate(80px,80px) scale(1);
  background: #93dbe9;
  animation: ldio-mr6hs88yhu 1s infinite cubic-bezier(0,0.5,0.5,1);
}
.ldio-mr6hs88yhu div:nth-child(1) {
  background: #689cc5;
  transform: translate(148px,80px) scale(1);
  animation: ldio-mr6hs88yhu-r 0.25s infinite cubic-bezier(0,0.5,0.5,1), ldio-mr6hs88yhu-c 1s infinite step-start;
}.ldio-mr6hs88yhu div:nth-child(2) {
  animation-delay: -0.25s;
  background: #93dbe9;
}.ldio-mr6hs88yhu div:nth-child(3) {
  animation-delay: -0.5s;
  background: #689cc5;
}.ldio-mr6hs88yhu div:nth-child(4) {
  animation-delay: -0.75s;
  background: #5e6fa3;
}.ldio-mr6hs88yhu div:nth-child(5) {
  animation-delay: -1s;
  background: #3b4368;
}
.loadingio-spinner-ellipsis-f9g8sm63oof {
  width: 200px;
  height: 200px;
  display: inline-block;
  overflow: hidden;
  background: transparent;
}
.ldio-mr6hs88yhu {
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(1);
  backface-visibility: hidden;
  transform-origin: 0 0; /* see note above */
}
.ldio-mr6hs88yhu div { box-sizing: content-box; }
/* generated by https://loading.io/ */
</style>
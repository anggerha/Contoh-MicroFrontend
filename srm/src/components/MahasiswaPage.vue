<template>
    <div class="container">
        <b-button class="kembali" @click="kembali">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
            </svg>
            Kembali
        </b-button>
        <p class="judul">SRM FTI UKDW</p>
        <b-skeleton-wrapper :loading="loading" class="mt-3">
            <template #loading>
                <div>
                    <b-skeleton width="85%"></b-skeleton>
                    <b-skeleton width="55%"></b-skeleton>
                    <b-skeleton width="70%"></b-skeleton>
                </div>
            </template>
            <h6> Nama: {{ dataDiri.nama }}</h6>
            <h6> Email: {{ dataDiri.email }}</h6>
            <h6> Dosen Wali: {{dataPerwalian.nama_dosen}}</h6>
        </b-skeleton-wrapper>
        
        <div class="accordion mt-3" role="tablist">
            <h1>Pengumuman Perwalian</h1>
            <b-row>
                <b-col v-if="pengumuman.length != 0">
                        <div v-if="!loadingPengumuman">
                            <div v-if="pengumuman.valid.length != 0">
                                <b-card class="cardPengumuman" v-for="item in pengumuman.valid" :key="item._id"
                                    header-text-variant="white"
                                    :footer="'Berakhir pada '+ item.periode_akhir">
                                    <template #header>
                                        <div style="display: flex; color: black;">
                                            Dibuat pada {{ item.tanggal }}
                                        </div>
                                    </template>
                                    <b-card-title class="cardTitle">
                                        <b-row>
                                            <b-col > 
                                                <h4 class="judulPengumuman">{{ item.judul }}</h4>
                                            </b-col>
                                        </b-row>
                                        <!-- <b-row>
                                            <b-col>
                                                <span class="tanggalPengumuman small text-muted">{{ item.tanggal }}  WIB</span>
                                            </b-col>
                                        </b-row> -->
                                        <hr>
                                    </b-card-title>
                                    <b-card-text>
                                        <span id="pengumuman" v-html="item.pengumuman"></span>
                                        <span v-show="item.file.length != 0">Attachment: </span><br>
                                        <div v-show="item.file.length != 0" v-for="attachment in item.file" :key="attachment.id">
                                            <span><a :href="attachment.url" target="_blank">{{ attachment.file_name }}</a></span>
                                        </div>
                                        <!-- <div style="margin-top: 2rem;">
                                            <span class="pengumuman small text-muted">periode pengumuman berakhir: {{item.periode_akhir}}</span>
                                        </div> -->
                                    </b-card-text>
                                </b-card>
                            </div>
                            <div v-if="pengumuman.valid.length == 0">
                                <div>
                                    <div class="desert">
                                        <h3 style="color: darkslategray; display: flex; margin: auto;">Oopss ... Pengumuman Kosong</h3>
                                        <div class="tumbleweed"></div>
                                        <div class="tumbleweed"></div>
                                        <div class="tumbleweed"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-if="loadingPengumuman">
                            <div v-if="loading" style="text-align:center;">
                                    <div class="loadingio-spinner-ellipsis-f9g8sm63oof"><div class="ldio-mr6hs88yhu">
                                <div></div><div></div><div></div><div></div><div></div>
                                </div></div>
                            </div>
                        </div>
                </b-col>
                <b-col v-if="pengumuman.length == 0">
                    <div>
                        <div class="desert">
                            <h3 style="color: darkslategray; display: flex; margin: auto;">Pengumuman Kosong</h3>
                            <div class="tumbleweed"></div>
                            <div class="tumbleweed"></div>
                            <div class="tumbleweed"></div>
                        </div>
                    </div>
                </b-col>
            </b-row>
            <b-row style="margin-top: 2rem;">
                <b-col v-if="pengumuman.length != 0">
                    <b-button v-if="pengumuman.archived.length != 0"  block v-b-toggle.collapse-2 class="btn-general"><svg xmlns="http://www.w3.org/2000/svg" style="margin-right:0.5rem;" width="20" height="20" fill="currentColor" class="bi bi-archive-fill" viewBox="0 0 16 16">
                        <path d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15h9.286zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zM.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8H.8z"/>
                        </svg>Arsip Pengumuman
                    </b-button>
                    <b-button v-if="pengumuman.archived.length == 0" block v-b-toggle.collapse-2 class="btn-general"><svg xmlns="http://www.w3.org/2000/svg" style="margin-right:0.5rem;" width="20" height="20" fill="currentColor" class="bi bi-archive-fill" viewBox="0 0 16 16">
                        <path d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15h9.286zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zM.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8H.8z"/>
                        </svg>Arsip Pengumuman Kosong
                    </b-button>
                    <b-collapse id="collapse-2" v-if="pengumuman.length != 0">
                        <div v-if="pengumuman.archived.length != 0">
                           <b-card class="cardPengumuman archived" v-for="item in pengumuman.archived" :key="item._id" header-text-variant="white" :footer="'Tanggal pengumuman berakhir: '+ item.periode_akhir">
                                <template #header>
                                    <div style="display: flex; color: black;">
                                        {{ item.tanggal }}
                                        <div class="badge badge-pill badge-warning" id="kadaluarsa" style="color: black;">Expired</div>
                                    </div>
                                </template>
                                <b-card-title class="cardTitle">
                                    <b-row>
                                        <b-col> <h4 class="judulPengumuman">{{ item.judul }}</h4></b-col>
                                    </b-row>
                                    <!-- <b-row>
                                        <b-col>
                                            <span class="tanggalPengumuman small text-muted">{{ item.tanggal }}  WIB</span>
                                        </b-col>
                                    </b-row> -->
                                    <hr>
                                </b-card-title>
                                <b-card-text>
                                    <span id="pengumuman" v-html="item.pengumuman"></span>
                                    <div v-show="item.file.length != 0" v-for="attachment in item.file" :key="attachment.id">
                                        <span>Attachment: </span><br>
                                        <span><a :href="attachment.url" target="_blank">{{ attachment.file_name }}</a></span>
                                    </div>
                                    <!-- <div style="margin-top: 2rem;">
                                        <span class="pengumuman small text-muted">periode pengumuman berakhir: {{item.periode_akhir}}</span>
                                    </div> -->
                                </b-card-text>
                            </b-card>
                        </div>
                    </b-collapse>
                </b-col>
            </b-row>
<!-- CATATAN PERWALIAN -->
            <b-row style="margin-top: 2rem">
                <b-col>
                    <div v-if="loadingCatatan && pengumumanPerwalian.length != 0">
                        <div style="text-align:center;">
                                <div class="loadingio-spinner-ellipsis-f9g8sm63oof"><div class="ldio-mr6hs88yhu">
                            <div></div><div></div><div></div><div></div><div></div>
                            </div></div>
                        </div>
                    </div>
                    <div v-else-if="!loadingCatatan && pengumumanPerwalian.length != 0">
                        <h2>Catatan Perwalian {{ pengumumanPerwalian[0]?.kode_semester?.slice(0, 4) }}</h2> 
                        <b-row>
                            <b-col style="display: flex;">
                                <h4 v-if="pengumumanPerwalian[0]?.kode_semester?.slice(4, 5) == 1">Semester Gasal</h4>
                                <h4 v-if="pengumumanPerwalian[0]?.kode_semester?.slice(4, 5) == 2">Semester Genap</h4>
                                <div class="badge badge-pill badge-success" id="terbaru-catatan-perwalian" v-if="pengumumanPerwalian.length != 0">Terbaru</div>
                            </b-col>
                        </b-row>
                        <div class="cardPerwalian" v-for="item in kodeSemester" :key="item">
                            <div v-for="data in pengumumanPerwalianGrouped[item]" :key="data._id" style="margin-bottom: 1rem">
                                <b-card v-if="pengumumanPerwalian[0].kode_semester == item">
                                    <b-card-title>{{ data.judul }}</b-card-title>
                                        <b-card-text>
                                            {{ data.pembahasan }}
                                        </b-card-text>
                                    <b-card-text class="small text-muted">Dikirim pada tanggal {{ data.tanggal }}</b-card-text>
                                </b-card>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <h2 style="color: darkslategray;">Catatan Perwalian Kosong</h2>
                    </div>
                </b-col>
            </b-row>
            <!-- <b-row >
                <div style="margin:auto; color:grey;" v-if="perwalianEror != ''"><h5>{{this.perwalianEror}}</h5></div>
            </b-row> -->
            <b-row style="margin-bottom:1rem;">
                <b-col v-if="pengumumanPerwalian.length != 0">
                    <b-button block v-b-toggle.accordion-1 class="btn-general"><svg xmlns="http://www.w3.org/2000/svg" style="margin-right:0.5rem;" width="20" height="20" fill="currentColor" class="bi bi-archive-fill" viewBox="0 0 16 16">
                        <path d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15h9.286zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zM.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8H.8z"/>
                        </svg> Arsip Catatan Perwalian
                    </b-button>
                    <b-collapse id="accordion-1" role="tabpanel">
                        <div style="margin-top: 1rem;width: 100%;">
                            <ul style="display: grid;grid-template-columns:repeat(5,1fr); padding:0;">
                                <li v-show="pengumumanPerwalian[0].kode_semester !== item" v-for="item in kodeSemester" :key="item" style="width: 100%; display:inline;">
                                    <b-button v-b-toggle="'accordion-' + item" class="btn-general">{{ item.slice(0, 4) }}<span v-if="item.slice(4, 5) == 1">&nbsp;Gasal</span><span v-if="item.slice(4, 5) == 2">&nbsp;Genap</span></b-button>
                                </li>
                            </ul>                                            
                        </div>
                        <div v-show="pengumumanPerwalian[0].kode_semester !== item" v-for="item in kodeSemester" :key="item" style="margin-bottom: 1rem">
                            <b-collapse :id="'accordion-' + item" role="tabpanel">
                                <b-card-title style="margin-left:1rem;" v-if="item.slice(4, 5) == 1">{{ item.slice(0, 4) }} Gasal</b-card-title>
                                <b-card-title style="margin-left:1rem;" v-if="item.slice(4, 5) == 2">{{ item.slice(0, 4) }} Genap</b-card-title>
                                <b-card>
                                    <b-card-text v-for="data in pengumumanPerwalianGrouped[item]" :key="data._id">
                                        <h4 style="text-align:left;">{{ data.judul }}</h4>
                                        <b-card-text class="small text-muted">Dikirim pada tanggal {{ data.tanggal }}</b-card-text>
                                        <p>Catatan: <br>{{ data.pembahasan }}</p>
                                        <hr style="border: 1px solid black;">
                                    </b-card-text>
                                </b-card>
                            </b-collapse>
                        </div>
                    </b-collapse>
                </b-col>
            </b-row>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'

export default {
    name: 'MahasiswaPage',
    data(){
        return {
            loading: true,
            loadingPengumuman: true,
            loadingCatatan: true,
            text: 'Pengumuman',
            firebaseUID: null,
            dataDiri: [],
            pengumuman: [],
            pengumumanPerwalian:[],
            pengumumanPerwalianGrouped:[],
            kodeSemester:[],
            dataPerwalian:[],
            perwalianEror: '',
            tanggalNow: ''
        }
    },
    async created() {
        if(localStorage.getItem('firebase-token') && localStorage.getItem('firebase-uid')){
            this.firebaseUID = JSON.parse(localStorage.getItem('firebase-uid'))
            await axios.get(`https://userapi.fti.ukdw.ac.id/${this.firebaseUID.uid}`).then((response) => {
                if(response.data.id_telegram == '' && response.data.role == 'MAHASISWA'){
                    this.$router.replace('/formPage')
                } else {
                    this.dataDiri = response.data
                    this.getLastKodeSemester()
                    this.getPengumuman()
                    this.getPengumumanPerwalian()
                    this.getDateNow()
                    
                }
            })
        } else {
            this.$router.replace('/login').then(() => { this.$router.go() })
        }
    },
    methods: {
        alertPengumumanPerwalian(){
            this.$toast.open({
                message: 'Tidak Ada Pengumuman Perwalian !',
                type: 'warning',
                position: 'top'
            });
        },
        kembali() {
            this.$router.replace('/listMenu')
        },
        getDateNow(){
            this.tanggalNow = moment().locale('id').format('ll')
        },
        async getLastKodeSemester() {
            await axios.get(`https://waliapi.fti.ukdw.ac.id/mahasiswa/${this.firebaseUID.uid}/perwalian`).then((response) => {
                var kodeSemester = response.data[0].kode_semester
                this.getDataPerwalian(kodeSemester)
            })
        },
        async getDataPerwalian(kodeSemester){
            try {
                await axios.get(`https://waliapi.fti.ukdw.ac.id/mahasiswa/${this.firebaseUID.uid}/perwalian/${kodeSemester}`,  {params:{
                    role:'MAHASISWA',
                    email: this.dataDiri.email,
                    nim: this.dataDiri.nim,
                    nama_mahasiswa: this.dataDiri.nama
                }}).then((response)=>{
                    this.dataPerwalian = response.data[0]
                    this.loading = false
                })
            } catch (error) {
                console.log(error.response.data.message);
            }
        },
        async getPengumuman() {
            try {
                await axios.get(`https://waliapi.fti.ukdw.ac.id/mahasiswa/${this.firebaseUID.uid}/list-pengumuman`)
                .then((response) => {
                    this.pengumuman = response.data
                    for(let i = 0; i < this.pengumuman.valid.length; i++){
                        // this.pengumuman[i].tanggal = this.pengumuman[i].tanggal.replaceAll('.',':')
                        this.pengumuman.valid[i].tanggal = moment(this.pengumuman.valid[i].tanggal).locale('id').format('lll')
                        this.pengumuman.valid[i].periode_akhir = moment(this.pengumuman.valid[i].periode_akhir).locale('id').format('lll')
                    }
                    for(let i = 0; i < this.pengumuman.archived.length; i++){
                        // this.pengumuman[i].tanggal = this.pengumuman[i].tanggal.replaceAll('.',':')
                        this.pengumuman.archived[i].tanggal = moment(this.pengumuman.archived[i].tanggal).locale('id').format('lll')
                        this.pengumuman.archived[i].periode_akhir = moment(this.pengumuman.archived[i].periode_akhir).locale('id').format('lll  ')
                    }
                    this.loadingPengumuman = false
                })
            } catch (error) {
                console.log(error.message);
            }
            
        },
        async getPengumumanPerwalian() {
            try {
                await axios.get(`https://waliapi.fti.ukdw.ac.id/mahasiswa/${this.firebaseUID.uid}/log-perwalian`)
                .then((response) => {
                    this.pengumumanPerwalian = response.data.reverse()
                    this.pengumumanPerwalianGrouped = this.pengumumanPerwalian.groupBy((log)=>{
                        return log.kode_semester
                    })
                    this.kodeSemester = Object.keys(this.pengumumanPerwalianGrouped).reverse()
                    for(let i = 0; i < this.pengumumanPerwalian.length; i++){
                        this.pengumumanPerwalian[i].tanggal = new Date(this.pengumumanPerwalian[i].tanggal)
                        .toLocaleString('id-ID', {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric"
                        })
                    }
                    this.loadingCatatan = false
                })
            } catch (error) {
                console.log(error.message);
                this.perwalianEror = error
            }
        },
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
.btn-general{
    display: flex;
    background-color: white;
    color: #32a3df;
    transition: ease-in-out;
    transition-duration: 300ms;
    border: #32a3df 1px solid;
    transition-delay: 100ms;
}
.btn-general:hover{
    background-color: #32a3df;
    color: white;
    border-color: transparent;
}
a:hover{
    text-decoration: none;
}
.desert {
    position: relative;
    height: 8rem;
    overflow: hidden;
}

.desert .tumbleweed {
    position: absolute;
    top: 0;
    left: -5rem;
    background: url(https://img.icons8.com/ios/1600/tumbleweed.png) no-repeat center;
    background-size: cover;
    width: 5rem;
    height: 5rem;
    animation: jumping 1.5s infinite, rolling 5s linear infinite, rotating 2s linear infinite;

}
.tumbleweed:nth-child(2) {
    animation-delay: 2.5s;
}
.tumbleweed:nth-child(3) {
    animation-delay: 4s;
}

@keyframes jumping {
    0% {
        top: 0rem;
        animation-timing-function: ease-in;
    }
    25% {
        top: 3rem;
        animation-timing-function: ease-out;
    }
    50% {
        top: 1rem;
        animation-timing-function: ease-in;
    }
    75% {
        top: 3rem;
        animation-timing-function: ease-out;
    }
    100% {
        top: 0rem;
        animation-timing-function: ease-in;
    }
}

@keyframes rolling {
    0% {
        left: -5rem;
    }
    100% {
        left: 100%;
    }
}

@keyframes rotating {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
.judul{
    font-size: 250%;
    font-weight: bold;
    text-align: center;
}
p{
    text-align: left;
    font-size: large;
}
.form{
    display: flex;
    text-align: left;
}
.btn{
    display: flex;
}
.btn:hover{
    color: white !important;
    background-color: #32a3df;
}
.button .send{
    border-style: none;
    color: #32a3df;
    margin: 0.25rem;
    background-color: transparent;
}
.button .send:hover{
    color: white;
    background-color: #32a3df;
}
.kembali{
    display: flex;
    border-style: none;
    background-color: transparent;
    color: black;
    margin: 0.25rem;
}
span{
    text-align: left;
}
h3{
    font-size:calc(100% + 1vw);
    text-align: center;
}
#judulPengumuman{
    text-align: left;
}
#kadaluarsa{
    margin-left: 1rem;
    display: flex;
    justify-content: center;
    color: white;
    font-size: 1rem;
}
#terbaru-catatan-perwalian{
    margin-left: 1rem;
    padding-top: .5rem;
    display: flex;
    justify-content: center;
    color: white;
    font-size: 1rem;
}
.cardPengumuman{
    margin-top: 1rem;
   
}
.cardTitle{
    min-width: 100%;
    /* background-color: #32a3df; */
}
.cardPerwalian{
    margin-top: 1rem;
}

.card-header {
    padding: 0.75rem 1.25rem;
    margin-bottom: 0;
    color: black;
    border-bottom: 1px solid rgba(0, 0, 0, 0.125);
   
}
.card {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-radius: 0.8rem;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
}
.card-header:first-child {
    border-radius: calc(0.8rem - 1px) calc(0.8rem - 1px) 0 0;
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
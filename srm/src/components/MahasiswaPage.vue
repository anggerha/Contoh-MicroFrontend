<template>
    <div class="container">
        <b-button class="kembali" @click="kembali">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
            </svg>
            Kembali
        </b-button>
        <p class="judul">SRM FTI UKDW</p>
        <h6> Nama: {{ dataDiri.nama }}</h6>
        <h6> Email: {{ dataDiri.email }}</h6>
        <h6> Dosen Wali: {{dataPerwalian.nama_dosen}}</h6>
        <div class="accordion" role="tablist">
            <b-row style="margin:1rem;">
                <h1>Pengumuman</h1>
            </b-row>
            <!-- <b-row style="margin:1rem;">

                 <h4>{{tanggalNow}}</h4>
            </b-row> -->
            <vsa-list class="vsaList">
                <vsa-item class="vsaItem" v-for="item in pengumuman.valid" :key="item._id">
                    <vsa-heading class="heading">
                            <b-row>
                                <b-col> <h5 id="judulPengumuman">{{ item.judul }}</h5></b-col>
                            </b-row>
                            <b-row>
                                <b-col>
                                    <h6 id="tanggalPengumuman">{{ item.tanggal }}  WIB</h6>
                                </b-col>
                            </b-row> 
                    </vsa-heading>
                    <vsa-content >
                        <span id="pengumuman" v-html="item.pengumuman"></span>
                        <div v-if="item.file != null">
                           <span><a :href="item.file" target="_blank">Download File Disini</a></span>
                          
                        </div>
                        <div style="margin-top: 2rem;">
                            <span id="pengumuman" >periode pengumuman berakhir: {{item.periode_akhir}}</span>
                        </div>
                    </vsa-content>
                </vsa-item>
            </vsa-list>
            <b-row style="margin-top: 2rem;">
                <b-col>
                    <b-button block v-b-toggle.collapse-2 ><svg xmlns="http://www.w3.org/2000/svg" style="margin-right:0.5rem;" width="20" height="20" fill="currentColor" class="bi bi-archive-fill" viewBox="0 0 16 16">
                        <path d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15h9.286zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zM.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8H.8z"/>
                        </svg>Arsip Pengumuman 
                    </b-button>
                    <b-collapse id="collapse-2">
                        <vsa-list class="vsaList">
                            <vsa-item class="vsaItem" v-for="item in pengumuman.archived" :key="item._id">
                                <vsa-heading class="heading">
                                        <b-row>
                                            <b-col> <h5 id="judulPengumuman">{{ item.judul }}</h5></b-col>
                                        </b-row>
                                        <b-row>
                                            <b-col>
                                                <h6 id="tanggalPengumuman">{{ item.tanggal }}  WIB</h6>
                                            </b-col>
                                            
                                        </b-row> 
                                </vsa-heading>
                                <vsa-content >
                                    <span id="pengumuman"  v-html="item.pengumuman"></span>
                                    <div v-if="item.file != null">
                                    <span id="pengumuman" ><a :href="item.file" target="_blank">Download File Disini</a></span>
                                    
                                    </div>
                                    <div style="margin-top: 2rem;">
                                        <span id="pengumuman" >periode pengumuman berakhir: {{item.periode_akhir}}</span>
                                    </div>
                                </vsa-content>
                            </vsa-item>
                        </vsa-list>
                    </b-collapse>
                </b-col>
            </b-row>
            
            <b-row style="margin-top: 1rem">
                <b-col>
                    <h2 v-if="pengumumanPerwalian.length != 0">Catatan Perwalian {{ pengumumanPerwalian[0]?.kode_semester?.slice(0, 4) }}</h2> 
                    <h2 v-if="pengumumanPerwalian.length == 0">Catatan Perwalian Kosong</h2>
                    <b-row>
                        <b-col style="display: flex;">
                            <h4 v-if="pengumumanPerwalian[0]?.kode_semester?.slice(4, 5) == 1">Semester Gasal</h4>
                            <h4 v-if="pengumumanPerwalian[0]?.kode_semester?.slice(4, 5) == 2">Semester Genap</h4>

                            <div class="badge badge-pill badge-success" id="terbaru" v-if="pengumumanPerwalian.length != 0">Terbaru</div>
                        </b-col>
                    </b-row>
                    
                    <div v-for="item in kodeSemester" :key="item">
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
                </b-col>
            </b-row>
            <!-- <b-row >
                <div style="margin:auto; color:grey;" v-if="perwalianEror != ''"><h5>{{this.perwalianEror}}</h5></div>
            </b-row> -->
            <b-row style="margin-bottom:1rem;">
                <b-col>
                    <b-button block v-b-toggle.accordion-1><svg xmlns="http://www.w3.org/2000/svg" style="margin-right:0.5rem;" width="20" height="20" fill="currentColor" class="bi bi-archive-fill" viewBox="0 0 16 16">
                        <path d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15h9.286zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zM.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8H.8z"/>
                        </svg> Arsip Catatan Perwalian
                    </b-button>
                    <b-collapse id="accordion-1" role="tabpanel">
                        <div style="margin-top: 1rem;width: 100%;">
                            <ul style="display: grid;grid-template-columns:repeat(5,1fr); padding:0;">
                                <li v-show="pengumumanPerwalian[0].kode_semester !== item" v-for="item in kodeSemester" :key="item" style="width: 100%; display:inline;" >
                                    <b-button v-b-toggle="'accordion-' + item">{{ item.slice(0, 4) }}<span v-if="item.slice(4, 5) == 1">&nbsp;Gasal</span><span v-if="item.slice(4, 5) == 2">&nbsp;Genap</span></b-button>
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
import {
  VsaList,
  VsaItem,
  VsaHeading,
  VsaContent,
  
} from 'vue-simple-accordion';
import 'vue-simple-accordion/dist/vue-simple-accordion.css';
import moment from 'moment';
export default {
    name: 'MahasiswaPage',
    data(){
        return {
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
    components:{
        VsaList,
        VsaItem,
        VsaHeading,
        VsaContent,
       
    },
    async created() {
        if(sessionStorage.getItem('firebase-token') && sessionStorage.getItem('firebase-uid')){
            this.firebaseUID = JSON.parse(sessionStorage.getItem('firebase-uid'))
            await axios.get(`http://userapi.fti.ukdw.ac.id/${this.firebaseUID.uid}`).then((response) => {
                if(response.data.id_telegram == '' && response.data.role == 'MAHASISWA'){
                    this.$router.replace('/formPage')
                } else {
                    this.dataDiri = response.data
                    this.getDataPerwalian()
                    this.getPengumuman()
                    this.getPengumumanPerwalian()
                    this.getDateNow()
                }
            })
        }
    },
    methods: {
        kembali() {
            this.$router.replace('listMenu').then(this.$router.go({}))
        },
        getDateNow(){
            this.tanggalNow = moment().locale('id').format('ll')
        },
        async getDataPerwalian(){
            var kode_semester
            if(new Date().getMonth() <= 6) {
                kode_semester = new Date().getFullYear()-2+'2'
            } else if(new Date().getMonth() >=7 && new Date.getMonth() <=12) {
                kode_semester = new Date().getFullYear()-2+'1'
            }
            try {
                await axios.get(`http://waliapi.fti.ukdw.ac.id/mahasiswa/${this.firebaseUID.uid}/perwalian/${kode_semester}`,  {params:{
                    role:'MAHASISWA',
                    email: this.dataDiri.email,
                    nim: this.dataDiri.nim,
                    nama_mahasiswa: this.dataDiri.nama
                }}).then((response)=>{
                    this.dataPerwalian = response.data[0]
                    // console.log("ini data perwalian= ")
                })
            } catch (error) {
                console.log(error.response.data.message);
            }
        },
        async getPengumuman() {
            await axios.get(`http://waliapi.fti.ukdw.ac.id/mahasiswa/${this.firebaseUID.uid}/list-pengumuman`)
            .then((response) => {
                this.pengumuman = response.data
                for(let i = 0; i < this.pengumuman.valid.length; i++){
                    // this.pengumuman[i].tanggal = this.pengumuman[i].tanggal.replaceAll('.',':')
                    this.pengumuman.valid[i].tanggal = moment(this.pengumuman.valid[i].tanggal).locale('id').format('lll')
                    this.pengumuman.valid[i].periode_akhir = moment(this.pengumuman.valid[i].periode_akhir).locale('id').format('ll')
                }
                for(let i = 0; i < this.pengumuman.archived.length; i++){
                    // this.pengumuman[i].tanggal = this.pengumuman[i].tanggal.replaceAll('.',':')
                     this.pengumuman.archived[i].tanggal = moment(this.pengumuman.archived[i].tanggal).locale('id').format('lll')
                    this.pengumuman.archived[i].periode_akhir = moment(this.pengumuman.archived[i].periode_akhir).locale('id').format('ll')
                }
            })
        },
        async getPengumumanPerwalian() {
            try {
                await axios.get(`http://waliapi.fti.ukdw.ac.id/mahasiswa/${this.firebaseUID.uid}/log-perwalian`)
                .then((response) => {
                    this.pengumumanPerwalian = response.data.reverse()
                    this.pengumumanPerwalianGrouped = this.pengumumanPerwalian.groupBy((log)=>{
                        return log.kode_semester
                    })
                    this.kodeSemester = Object.keys(this.pengumumanPerwalianGrouped).reverse()
                    // console.log(this.kodeSemester);
                    for(let i = 0; i < this.pengumumanPerwalian.length; i++){
                        this.pengumumanPerwalian[i].tanggal = new Date(this.pengumumanPerwalian[i].tanggal)
                        .toLocaleString('id-ID', {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric"
                        })
                    }
                })
            } catch (error) {
                console.log(error);
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
.vsa-list{
    --vsa-max-width: 100%;
    --vsa-min-width: 300px;
    --vsa-text-color: rgba(55, 55, 55, 1);
    --vsa-highlight-color: #32a3df;
    --vsa-bg-color: rgba(255, 255, 255, 1);
    --vsa-border-color: rgba(0, 0, 0, 0.2);
    --vsa-border-width: 1px;
    --vsa-border-style: solid;
    --vsa-heading-padding: 0.5rem 0.5rem;
    --vsa-content-padding: 1rem 1rem;
    --vsa-default-icon-size: 1;
    text-align: justify;
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
hr{
    border: 2px #32a3df solid;
}
#judulPengumuman{
    text-align: left;
}
h6{
    text-align: left;
}
#terbaru{
    margin-left: 1rem;
    padding-top: .5rem;
    display: flex;
    justify-content: center;
    color: white;
    font-size: 1rem;
}
</style>
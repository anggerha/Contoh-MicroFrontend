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
        <!-- <h6> ID Telegram: {{ dataDiri.id_telegram }}</h6>
        <h6> Username Telegram: {{ dataDiri.username_telegram }}</h6> -->
        <h6> Dosen Wali: {{ dataPerwalian.nama_dosen}}</h6>
        
        <div class="accordion" role="tablist">
            <!-- <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-1" role="tab">
                    <b-button block v-b-toggle.accordion-1 variant="info">Matakuliah</b-button>
                </b-card-header>
                <b-collapse id="accordion-1" accordion="my-accordion" role="tabpanel">
                    <b-card-body>
                        inner accordion
                        <b-card>
                            <b-card-header header-tag="header" class="p-1" role="tab">
                                <b-button block v-b-toggle.collapse-1-inner variant="info">Pemrograman Web Lanjut</b-button>
                            </b-card-header>
                            <b-collapse id="collapse-1-inner" class="mt-2">
                                <b-card>Hello!</b-card>
                            </b-collapse>
                        </b-card>
                        <b-card>
                            <b-card-header header-tag="header" class="p-1" role="tab">
                                <b-button block v-b-toggle.collapse-2-inner variant="info">Logika Matematika</b-button>
                            </b-card-header>
                            <b-collapse id="collapse-2-inner" class="mt-2">
                                <b-card>Hello!</b-card>
                            </b-collapse>
                        </b-card> -->
                        <!-- end of inner accordion -->
                    <!-- </b-card-body>
                </b-collapse>
            </b-card> 
             <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-1" role="tab">
                    <b-button block v-b-toggle.accordion-2 variant="info">Perwalian</b-button>
                </b-card-header>
                <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
                    <b-card-body>
                    <b-card-text>{{ text }}</b-card-text>
                    </b-card-body>
                </b-collapse>
            </b-card> -->
         
            <b-row style="margin:1rem;">
                <h1>Pengumuman</h1>
            </b-row>
            <vsa-list class="vsaList">
                <vsa-item class="vsaItem" v-for="item in pengumuman" :key="item._id">
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
                        <span v-html="item.pengumuman"></span>
                        <div v-if="item.file != null">
                           <span><a :href="item.file" target="_blank">Download File Disini</a></span>
                          
                        </div>
                     
                           
                        
                    </vsa-content>
                </vsa-item>
            </vsa-list>
            <b-row style="margin:1rem;">
                <h4>Catatan Perwalian saya</h4>
            </b-row>
            <b-row style="margin:1rem;">
                <div style="margin:auto; color:grey;" v-if="perwalianEror != ''"><h5>{{this.perwalianEror}}</h5></div>
                <div style="margin:auto; color:grey;" v-if="perwalianEror == ''">
                    <b-card-group deck>
                        <b-card v-for="item in pengumumanPerwalian" :key="item._id" :header="item.tanggal_perwalian">
                            <b-card-text>{{item.pembahasan}}</b-card-text>
                        </b-card>
                    </b-card-group>
                </div>
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
export default {
    name: 'MahasiswaPage',
    data(){
        return {
            text: 'Pengumuman',
            user: [],
            dataDiri: [],
            pengumuman: [],
            pengumumanPerwalian:[],
            dataPerwalian:[],
            perwalianEror: '',
        }
    },
    components:{
        VsaList,
        VsaItem,
        VsaHeading,
        VsaContent,
       
    },
    created() {
        if(sessionStorage.getItem('user') && sessionStorage.getItem('dataDiri')){
            this.user = JSON.parse(sessionStorage.getItem('user'))
            this.dataDiri = JSON.parse(sessionStorage.getItem('dataDiri'))
        }
        this.getDataPerwalian()
        this.getPengumuman()
        this.getPengumumanPerwalian()
       
    },
    methods: {
        kembali() {
            this.$router.replace('listMenu')
        },
        async updateData(){
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
        },
        async getPengumuman() {
            await axios.get(`http://localhost:8000/mahasiswa/announcements`, { params: {
                role: 'MAHASISWA',
                email: this.dataDiri.email,
                nama_dosen: 'Testing Channel'
            }})
            .then((response) => {
                this.pengumuman = response.data
                for(let i = 0; i < this.pengumuman.length; i++){
                    this.pengumuman[i].tanggal = this.pengumuman[i].tanggal.replaceAll('.',':')
                    
                }
                
            })
        },
        async getPengumumanPerwalian() {
            try {
              
                await axios.get(`http://localhost:8000/mahasiswa/logs`, { params: {
                role: 'MAHASISWA',
                email: this.dataDiri.email,
                nim: this.dataDiri.nim,
               
                }})
                .then((response) => {
                    
                    this.pengumumanPerwalian = response.data
                    console.log(this.pengumumanPerwalian);
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
                console.log(error.response.data.message);
                this.perwalianEror = error.response.data.message
            }
            
        },
        async getDataPerwalian(){
            try {
                await axios.get(`http://localhost:8000/mahasiswa/perwalian`,  {params:{
                    role:'MAHASISWA',
                    email: this.dataDiri.email,
                    nim: this.dataDiri.nim,
                    nama_mahasiswa: this.dataDiri.nama
                }}).then((response)=>{
                    this.dataPerwalian = response.data
                    console.log(this.dataPerwalian);
                })
            } catch (error) {
                console.log(error.response.data.message);
            }
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
</style>
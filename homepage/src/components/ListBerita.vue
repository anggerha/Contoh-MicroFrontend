<template>
    <div>
        <h5 style="font-size:calc(125% + 1vw); width:100%; text-align:center;">Berita Informatika</h5>
        <div class="form-row">
            <div class="col-md-12">
                <div class="form-inline mr-2" style="display: flex; justify-content: right;">
                    <input v-model="keyword" class="form-control mr-sm-2" type="search" placeholder="Search by Judul" aria-label="Search" style="width: 20rem;">
                </div>
            </div>
        </div>
        <div v-if="loading && listBerita.length != 0" style="text-align:center; margin-top:15rem;">
            <div class="loadingio-spinner-ellipsis-f9g8sm63oof"><div class="ldio-mr6hs88yhu">
            <div></div><div></div><div></div><div></div><div></div>
            </div></div>
        </div>
        <div v-else-if="listBerita.length == 0&& !loading">
            <h3 style="font-size:calc(100% + 1vw); width:100%; text-align:center; color: darkslategray;" class="mt-10">Belum Ada Berita</h3>
        </div>
        <div class="centered" v-else>
            <section class="cards">
                <article class="card p-4 shadow p-2 mb-3 bg-white rounded" v-for="item in searchBerita" :key="item._id">
                    <h1 v-if="item.group === 'alumni'" class="badge badge-primary badge-status">Alumni</h1>
                    <h5 v-if="item.group === 'aktif'" class="badge badge-success badge-status">Mahasiswa Aktif</h5>
                    <h5 v-if="item.group === 'all'" class="badge badge-secondary badge-status">Umum</h5>
                    <h3 style="border-left: #32a3df 5px solid; padding-left: 1rem; font-size: 150%; font-weight: bold;">{{ item.judul_berita }}</h3>
                    
                    <p v-html="item.isi_berita" style="text-align: justify;"></p>
                    <div>
                        <span v-if="item.file.length != 0">Attachment: </span><br>
                        <div v-show="item.file.length != 0" v-for="attachment in item.file" :key="attachment.id">
                            <span><a :href="attachment.url" target="_blank" style="color: #32a3df;">{{ attachment.file_name }}</a></span>
                        </div>
                    </div>
                    <div class="footer ">
                        <div class="mb-2 mt-4">
                            Dibuat pada tanggal {{ item.tanggal }}
                        </div>
                    </div>
                </article>
            </section>
        </div>
        <!-- <div style="width:100%" v-else>
            <h5 style="font-size:calc(125% + 1vw); width:100%; text-align:center;" >Berita Informatika</h5>
            <ul style="display: grid; grid-template-columns:repeat(auto-fit, minmax(400px,1fr)); padding:0;">
                <li v-for="item in listBerita" :key="item._id" style="display:inline; padding: 10px;">
                    <div style="flex-grow: 1;" class="shadow p-0 mb-3 bg-white rounded">
                        <div>
                            <p style="font-size:calc(80% + 0.5vw);font-weight:bold;">{{item.judul_berita}}</p>
                        </div>
                        <div v-html="item.isi_berita" style="flex-grow: 1;"></div>
                        <div >
                            <span v-if="item.file.length != 0">Attachment: </span><br>
                            <div v-show="item.file.length != 0" v-for="attachment in item.file" :key="attachment.id">
                                <span><a :href="attachment.url" target="_blank">{{ attachment.file_name }}</a></span>
                            </div>
                        </div>
                        <div class="card-footer text-muted">
                            {{item.tanggal}}
                        </div>
                    </div>
                </li>
            </ul>
        </div> -->
    </div>
</template>

<script>

import axios from 'axios'

export default {
    name: 'ListBerita',
    compatConfig: { MODE: 3 },
    data(){
        return {
            text: 'Pengumuman',
            firebaseUID: null,
            dataDiri: [],
            listBerita: [],
            listBeritaTemp: [],
            loading:true,
            keyword: '',
            statusMahasiswa: ''
        }
    },
    created() {
        if(localStorage.getItem('firebase-token') && localStorage.getItem('firebase-uid')){
            this.getProfile()
        }else {
            this.$router.replace("/login").then(() => { })
        }
    },
    methods:{
        async getBerita(){
            var firebaseUID = JSON.parse(localStorage.getItem('firebase-uid'))
            await axios.get(`https://userapi.fti.ukdw.ac.id/${firebaseUID.uid}`)
            .then( async (response) => {
                if(response.status == 200){
                    if (response.data.role === 'MAHASISWA') {
                        this.statusMahasiswa = response.data.status
                        await axios.get(`https://beritaapi.fti.ukdw.ac.id/news/${response.data.status}`).then((response)=>{
                            this.listBeritaTemp = response.data
                            this.listBeritaTemp = JSON.parse(JSON.stringify(this.listBeritaTemp))
                            this.loading = false
                        })
                        await axios.get(`https://beritaapi.fti.ukdw.ac.id/news/all`).then((response)=>{
                            this.listBerita = response.data
                            this.listBerita = this.listBeritaTemp.concat(JSON.parse(JSON.stringify(this.listBerita)))
                            this.listBerita.sort((a,b)=> a.updated_at > b.updated_at ? -1: 1)
                            this.loading = false
                        })
                    } else {
                        await axios.get(`https://beritaapi.fti.ukdw.ac.id/news`).then((response)=>{
                            this.listBerita = response.data
                            this.listBerita = JSON.parse(JSON.stringify(this.listBerita))
                            this.loading = false
                        })
                    }
                }
            })
        },
        async getProfile() {
            this.firebaseUID = JSON.parse(localStorage.getItem('firebase-uid'))
            await axios.get(`https://userapi.fti.ukdw.ac.id/${this.firebaseUID.uid}`)
            .then((response) => {
                this.dataDiri = response.data
                this.getBerita()
            })
        },
    },
    computed: {
        searchBerita(){
            if(this.keyword != ''){
                return this.listBerita.filter((item)=>{
                    return this.keyword.toLowerCase().split(' ').every(v => item.judul_berita.toLowerCase().includes(v))
                })
            } else {
                return this.listBerita
            }
        }
    }

}
</script>

<style scoped>

@media screen and (min-width: 480px) {
    .card {
       max-width: calc(25%);
    }
}
 
@media screen and (max-width: 480px) {
    .card {
        max-width: calc(100%);
    }
}
.badge-status{
    font-size: large;
    width: max-content;
}
.centered{
    width: 100%;
    display: flex;
    justify-content: center;
    
}
.cards {
    min-width: 100%;
    display: flex;
    flex-wrap: wrap;
 }
 
.card {
    align-content: space-evenly;
    flex: 1 1 400px;
    box-sizing: border-box;
    margin: 1rem .5em;
    position: relative; 
    display: flex; 
    flex-direction: column;
    transition: ease-in-out 0.5s;
}
.card:hover{
    transform: scale(1.05);
}
.card .footer{
    flex: 1 1 auto;
    position: relative; 
    display: flex; 
    flex-direction: column;
    justify-content: flex-end;
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
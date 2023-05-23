<template>
    <div style="width:100%">
        <h5 style="font-size:calc(125% + 1vw); width:100%; text-align:center;" >Berita Informatika</h5>
        <ul style="display: grid; grid-template-columns:repeat(auto-fit, minmax(400px,1fr); padding:0;">
            <li v-for="item in listBerita" :key="item._id" style="display:inline; padding: 10px; ">
                <div class="shadow p-0 mb-3 bg-white rounded">
                    <div class="card-body">
                        <p style=" font-size:calc(80% + 0.5vw);font-weight:bold;">{{item.judul_berita}}</p>
                    <div v-html="item.isi_berita"></div>
                    <div v-if="item.file != null">
                        <span><a :href="item.file" target="_blank" :download="item.judul_berita">Download File Disini!</a></span>
                    </div>
                    </div>
                    <div class="card-footer text-muted">
                        {{item.tanggal}}
                    </div>
                </div>
                
            </li>
        </ul>
    </div>
</template>

<script>

import axios from 'axios'

//import moment from 'moment';

export default {
    name: 'ListBerita',
    compatConfig: { MODE: 3 },
    data(){
        return {
            text: 'Pengumuman',
            firebaseUID: null,
            dataDiri: [],
            listBerita: [],
        }
    },
    created() {
        if(sessionStorage.getItem('firebase-token') && sessionStorage.getItem('firebase-uid')){
            this.getProfile()
        }
    },
    methods:{
        async getBerita(){
            await axios.get(`http://localhost:10003/news`).then((response)=>{
                this.listBerita = response.data
                console.log(this.listBerita);
            })
        },
        async getProfile() {
            this.firebaseUID = JSON.parse(sessionStorage.getItem('firebase-uid'))
            await axios.get(`http://localhost:10001/${this.firebaseUID.uid}`)
            .then((response) => {
                this.dataDiri = response.data
                this.getBerita()
            })
        },
    }

}
</script>
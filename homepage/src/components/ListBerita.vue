<template>
    <vsa-list class="vsaList">
                <vsa-item class="vsaItem" v-for="item in listBerita" :key="item._id">
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
//import moment from 'moment';

export default {
    name: 'BeritaPage',
    data(){
        return {
            text: 'Pengumuman',
            firebaseUID: null,
            dataDiri: [],
            listBerita: [],
        }
    },
    components:{
        VsaList,
        VsaItem,
        VsaHeading,
        VsaContent,
       
    },
    created() {
        if(sessionStorage.getItem('firebase-token') && sessionStorage.getItem('firebase-uid')){
            this.getProfile()
        }
    },
    methods:{
        async getBerita(){
            await axios.get(`http://localhost:10003/admin/${this.firebaseUID.uid}/berita/published`).then((response)=>{
                this.listBerita = response.data
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
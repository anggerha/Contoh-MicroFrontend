<template>
    <div class="container">
        <b-button class="kembali" @click="kembali">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
            </svg>
            Kembali
        </b-button>
        <p class="judul">ADMIN SRM FTI UKDW</p>
        <body class="bv-example-row">
            <b-row>
                <b-col>
                    <div v-if="isRemoveCatatan == false">
                        <CatatanMahasiswa :itemMahasiswa="itemMahasiswa"  :key="JSON.stringify(itemMahasiswa)" @clicked=onClickChildCatatan />
                    </div>
                    <b-row>
                        <b-col>
                            <div align="center" >
                                <b-button block id="listMenuAdmin"  @click="toggleBerita" :class="[showListBerita ? 'active':'']">List Pengumuman</b-button>
                            </div>
                       </b-col>
                       <b-col>
                            <div align="center">
                                <b-button block id="listMenuAdmin" @click="toggle" :class="[showListMahasiswa ? 'active':'']">List Mahasiswa</b-button>
                            </div>
                       </b-col>
                       
                    </b-row>
<!-- LIST MAHASISWA DOSEN -->
                    <div v-if="showListMahasiswa" class="listMahasiswa">
                        <h4>Daftar Mahasiswa Informatika</h4>
                        <div v-if="loadingListMahasiswa" style="text-align:center;">
                            <div class="loadingio-spinner-ellipsis-f9g8sm63oof"><div class="ldio-mr6hs88yhu">
                            <div></div><div></div><div></div><div></div><div></div>
                            </div></div>
                        </div>
                        <div v-if="!loadingListMahasiswa">
                            <b-row v-if="jumlahPage !=null" style="margin-top: 1rem;">
                                <b-col>
                                    <b-button class="page" id="prev" :disabled="page <=1" @click="page -=1">prev</b-button>
                                </b-col>
                                <b-col style="text-align:center; margin:auto;">
                                    {{page}}/{{Math.ceil(jumlahPage)}}
                                </b-col>
                                <b-col>
                                    <b-button class="page" id="next" :disabled="page >= jumlahPage" @click="page +=1">next</b-button>
                                </b-col>
                            </b-row>
                            <div class="perwalian">
                                <ul class="daftar-mahasiswa">
                                    <li v-for="item in daftarPerwalian.slice(page*10-10,page*10 )" :key="item.id" style="display:inline; padding: 5px;" >
                                        <b-container class="shadow p-2 mb-3 bg-white rounded">
                                            <b-row style="align-items:center; margin-left: .2rem; display:flex; flex-wrap:wrap; " >
                                                <b-col cols="8">
                                                    <b-row>{{ item.nim }}</b-row>
                                                    <b-row>{{ item.nama_lengkap }}</b-row>
                                                </b-col>
                                            </b-row>
                                                <div class="justify-content-center">
                                                    <div class="button">
                                                        <a href="#catatanMahasiswa">
                                                        <b-button block @click="sendDataCatatan(item,'admin')" style="margin: .2rem; justify-content: center;" data-toggle="tooltip" data-placement="top" title="Lihat Catatan Perwalian" type="button" class="send" >
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="1.4rem" height="1.4rem" fill="currentColor" class="bi bi-send-fill">
                                                                <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/>
                                                            </svg>
                                                                &nbsp;Lihat Detail
                                                        </b-button>
                                                        </a>
                                                    </div>
                                                </div>
                                        </b-container>
                                    </li>
                                </ul>
                                
                            </div>
                        </div>
                    </div>
<!-- LIST PENGUMUMAN -->
                    <div v-if="showListBerita">
                        <h4>Daftar Berita</h4>
                        <b-button block class="btn-buat-pengumuman" @click="tambahKomponenPengumuman" style="display:flex;justify-content:center;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                            </svg>&nbsp; Buat Pengumuman
                        </b-button>
                        <div id="form-pengumuman">
                            <div v-if="isRemoveBerita == false" class="shadow-lg p-3 mb-5 bg-white rounded-4 field-pengumuman">
                                <b-row style="margin-bottom:1rem;">
                                    <b-col>
                                        <h3>Buat Pengumuman</h3>
                                    </b-col>
                                    <b-col style="display: flex; justify-content: flex-end;">
                                        <div>
                                            <div class="button">
                                                <b-button class="tutup-pengumuman" @click="hapusKomponenPengumuman()" >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                                                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                                                    </svg>
                                                    Tutup
                                                </b-button>
                                            </div>
                                        </div>
                                    </b-col>
                                </b-row>
                                <b-input type="text" placeholder="Judul" style="margin-bottom:1rem;" v-model="judulPengumuman" v-if="itemBerita.status == 'PUBLISHED'" readonly></b-input>
                                <b-input type="text" placeholder="Judul" style="margin-bottom:1rem;" v-model="judulPengumuman" v-if="itemBerita.status != 'PUBLISHED'"></b-input>
                                <VueTrix @trix-attachment-add="handleAttachmentChanges" v-model="isiPengumuman" v-if="itemBerita.status == 'PUBLISHED'" :disabled-editor="true" @hook:mounted="hapusTool"/>
                                <VueTrix @trix-attachment-add="handleAttachmentChanges" v-model="isiPengumuman" v-if="itemBerita.status != 'PUBLISHED'" @hook:mounted="hapusTool"/>
                                <!-- <p class="tanggalBerakhir">Tanggal Pengumuman Berakhir</p>
                                <b-input required placeholder="Tanggal Berakhir" type="datetime-local" v-model="periode_akhir"></b-input> -->
                                <div class="button-group" v-if="itemBerita.status != 'PUBLISHED'">
                                    <div class="button">
                                        <b-button class="save" @click="simpan">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-bookmarks-fill" viewBox="0 0 16 16">
                                                <path d="M2 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v11.5a.5.5 0 0 1-.777.416L7 13.101l-4.223 2.815A.5.5 0 0 1 2 15.5V4z"/>
                                                <path d="M4.268 1A2 2 0 0 1 6 0h6a2 2 0 0 1 2 2v11.5a.5.5 0 0 1-.777.416L13 13.768V2a1 1 0 0 0-1-1H4.268z"/>
                                            </svg>
                                            Simpan
                                        </b-button>
                                    </div>
                                    <div class="button">
                                        <b-button class="delete" @click="hapusPengumuman">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                            </svg>
                                            Hapus
                                        </b-button>
                                    </div>
                                    <div class="button">
                                        <b-button class="send" @click="kirimTele">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-send-fill" viewBox="0 0 16 16">
                                                <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"/>
                                            </svg>
                                            Kirim
                                        </b-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <b-row v-if="jumlahPage !=null" style="margin-top: 1rem;">
                            <b-col>
                                <b-button class="page" id="prev" :disabled="page <=1" @click="page -=1">prev</b-button>
                            </b-col>
                            <b-col style="text-align:center; margin:auto;">
                                {{page}}/{{Math.ceil(jumlahPage)}}
                            </b-col>
                            <b-col>
                                <b-button class="page" id="next" :disabled="page >= jumlahPage" @click="page +=1">next</b-button>
                            </b-col>
                        </b-row>
                        <b-row style="margin-top: 1rem;">
                            <b-col>
                                <b-form-select v-model="statusBerita" :options="optionStatusBerita" @change="toggleBerita"></b-form-select>
                            </b-col>
                        </b-row>
                        <div class="perwalian" v-if="daftarBerita.length != 0">
                            <div v-if="daftarBerita[statusBerita] != null">
                                <ul class="daftar-berita">
                                    <li v-for="item in daftarBerita[statusBerita].slice(page*10-10,page*10 )" :key="item.id" style="display:inline; padding: 5px;">
                                        <b-container class="shadow p-2 mb-3 bg-white rounded">
                                            <b-row style="align-items:center; margin-left: .2rem; display:flex; flex-wrap:wrap;">
                                                <b-col>
                                                    <b-row>
                                                        <h5>{{ item.judul_berita }}&nbsp;<span v-if="item.status == 'PUBLISHED'" class="badge badge-pill badge-success" id="pillStatus">{{item.status}}</span>
                                                            <span v-if="item.status == 'DRAFT'" class="badge badge-pill badge-secondary" id="pillStatus">{{item.status}}</span>
                                                            <span v-if="item.status == 'DELETED'" class="badge badge-pill badge-danger" id="pillStatus">{{item.status}}</span></h5>
                                                    </b-row>
                                                    <b-row>
                                                        <span v-html="item.isi_berita"></span>
                                                        
                                                    </b-row>
                                                    <b-row>
                                                        <div v-if="item.file != null && item.file !=''">
                                                            <span><a :href="item.file" target="_blank" :download="item.judul_berita">Download File Disini!</a></span>
                                                        </div>
                                                    </b-row>
                                                    <b-row>Dibuat pada: {{ item.tanggal }}</b-row>
                                                </b-col>
                                            </b-row>
                                                <div class="justify-content-center">
                                                    <div class="button">
                                                        <b-button block @click="sendDataBerita(item)" style="margin: .2rem; justify-content: center;" data-toggle="tooltip" data-placement="top" title="Lihat Catatan Perwalian" type="button" class="send" >
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="1.4rem" height="1.4rem" fill="currentColor" class="bi bi-send-fill">
                                                                <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/>
                                                            </svg>
                                                                &nbsp;Lihat Detail
                                                        </b-button>
                                                    </div>
                                                </div>
                                        </b-container>
                                    </li>
                                </ul>
                            </div>
                            <div v-if="daftarBerita[statusBerita] == null && statusBerita != null" style="text-align:center;">
                                List {{statusBerita}} Berita Kosong
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
import firebase from 'firebase/app'
import 'firebase/storage'
import VueTrix from 'vue-trix'
import CatatanMahasiswa from './CatatanMahasiswa.vue'
import moment from 'moment'
export default {
    name: 'SRMPage',
    components: { VueTrix, CatatanMahasiswa },
    data() {
      return {
        loadingListMahasiswa: true,
       
        isShowBuatPengumuman: true,
        showListMahasiswa: false,
        showListBerita: true,
        fromPage:'admin',
        user: [],
        isRemoveCatatan: true,
        isRemoveBerita: true,
        firebaseUID: null,
        profile: [],
        fields: [ 'NAMA_MAHASISWA', 'nim'],
        daftarPerwalian: [],
        daftarBerita:[],
        statusBerita: null,
        optionStatusBerita:[
            { value: null, text: 'Pilih Status Berita', disabled: true },
            { value: 'PUBLISHED', text: 'Published' },
            { value: 'DRAFT', text: 'Draft' }
        ],
        page: 1,
        jumlahPage: null,
        itemBerita: [],
        itemMahasiswa: [],
        files: [],
        gambar: null,
        imageData: null,
        isiPengumuman:'',
        judulPengumuman:'',
        //_akhir: null
      }
    },
    created(){
        if(sessionStorage.getItem('firebase-token') && sessionStorage.getItem('firebase-uid')){
            this.firebaseUID = JSON.parse(sessionStorage.getItem('firebase-uid'))
        }
    },
    methods: {
        async getProfile(){
            try {
                await axios.get(`https://userapi.fti.ukdw.ac.id/dosen/${this.firebaseUID}`).then((response)=>{
                    this.profile = response.data
                })
            } catch (error) {
                console.log(error.message);
            }
        },
        toggle() {
            this.showListMahasiswa = true
            this.showListBerita = false
            this.page = 1
             this.jumlahPage = null
            this.getMahasiswa()
        },
        toggleBerita() {
            this.showListMahasiswa = false
            this.showListBerita = true
            this.page = 1
            this.jumlahPage = null
            this.getAllBerita()
           
        },
        kembali() {
            this.$router.replace('listMenu')
        },
        onClickChildCatatan(value){
            this.isRemoveCatatan = value
            this.isShowBuatPengumuman = true
        },
        async getMahasiswa() {
            this.page = 1
            this.daftarPerwalian = []
            try {
                await axios.get(`https://userapi.fti.ukdw.ac.id/admin/${this.firebaseUID.uid}/list-mahasiswa`)
                .then((response) => {
                    this.daftarPerwalian = response.data
                    this.jumlahPage = this.daftarPerwalian.length/10
                    this.loadingListMahasiswa = false
                })
            } catch (error) {
                this.$toast.open({
                    message: 'Tidak Ada Mahasiswa',
                    type: 'warning',
                    position: 'top'
                });
                this.jumlahPage=null
                this.loadingListMahasiswa = false
            }
        },
        sendDataBerita(item) {
            this.isRemoveBerita = false
            this.itemBerita = item
            console.log(this.itemBerita);
            this.periode_akhir = moment(item.periode_akhir).format('YYYY-MM-DDTHH:mm:ss')
            if(item.judul_berita){
                this.judulPengumuman = item.judul_berita
                this.isiPengumuman = item.isi_berita
            }else{
                this.judulPengumuman = ''
                this.isiPengumuman = item.isi_berita
            }
            this.isRemoveBerita = false
        },
        sendDataCatatan(itemMahasiswa,fromPage) {
            this.itemMahasiswa = [itemMahasiswa,fromPage]
            this.isRemoveCatatan = false
            this.isShowBuatPengumuman = false  
        },
        hapusTool(){
            const del = document.querySelector(".trix-button-group--block-tools");
            del.style.display = 'none'
        },
        hapusPengumuman(){
            this.judulPengumuman = ''
            this.isiPengumuman = ''
            this.gambar = ''
            //this.periode_akhir = null
        },
        async simpan(){
            if(this.itemBerita.length != 0){
                if(this.judulPengumuman ==''){
                    this.$toast.open({
                            message: 'Pesan Gagal Disimpan, Judul Berita Tidak Boleh Kosong',
                            type: 'warning',
                            position: 'top'
                        });
                }else{
                        await axios.put(`https://beritaapi.fti.ukdw.ac.id/admin/${this.firebaseUID.uid}/edit-berita/${this.itemBerita.id}`, {
                        //tanggal: moment().locale('id').toString(),
                        nama: "Admin FTI",
                        isi_berita: this.isiPengumuman,
                        file: this.gambar,
                        judul_berita: this.judulPengumuman,
                        status:"DRAFT",
                    })
                    .then((response) => {
                        if(response.status == 201){
                            this.$toast.open({
                                dismissible: true,
                                duration:0,
                                message: 'Perubahan Berita Berhasil Disimpan',
                                type: 'success',
                                position: 'top'
                            });
                            this.judulPengumuman = ''
                            this.isiPengumuman = ''
                            this.gambar = null
                            this.isRemoveBerita = true
                            this.getAllBerita()
                        } else {
                            this.$toast.open({
                                dismissible: true,
                                duration:0,
                                message: 'Berita Gagal Disimpan pada ',
                                type: 'warning',
                                position: 'top'
                            });
                        }
                    })
                } 
            }
            else{
                try {
                    if(this.isiPengumuman == '' || this.judulPengumuman == ''){
                        this.$toast.open({
                            message: 'Pesan Gagal Terkirim, Isi Berita Tidak Boleh Kosong',
                            type: 'warning',
                            position: 'top'
                        });
                    }else{
                        await axios.post(`https://beritaapi.fti.ukdw.ac.id/admin/${this.firebaseUID.uid}/new-berita`, {
                            nama: "ADMIN FTI",
                            isi_berita: this.isiPengumuman,
                            file: this.gambar,
                            judul_berita: this.judulPengumuman,
                            status:"DRAFT",
                            tanggal: moment().locale('id').toString()
                            }, 
                            )
                            .then(()=>{
                                
                                this.$toast.open({
                                    message: 'Pesan Berhasil Disimpan',
                                    type: 'success',
                                    position: 'top'
                                });
                                this.isiPengumuman = ''
                                this.judulPengumuman = ''
                                this.periode_akhir = null
                                this.getAllBerita()
                            })
                    }
                } catch (error) {
                    console.log(error);
                }
            }
            
        },
        async kirimTele(){
            
            try {
                if(this.isiPengumuman == ''){
                    this.$toast.open({
                        message: 'Pesan Gagal Terkirim, Isi Berita Tidak Boleh Kosong',
                        type: 'warning',
                        position: 'top'
                    });
                }else{
                    await axios.post(`https://beritaapi.fti.ukdw.ac.id/admin/${this.firebaseUID.uid}/new-berita`, {
                        nama: "Admin FTI",
                        isi_berita: this.isiPengumuman,
                        file: this.gambar,
                        judul_berita: this.judulPengumuman,
                        status:"PUBLISHED",
                        //tanggal: moment().locale('id').toString()
                        }, 
                        )
                        .then(()=>{
                            
                            this.$toast.open({
                                message: 'Pesan Berhasil Terkirim',
                                type: 'success',
                                position: 'top'
                            });
                            this.getAllBerita()
                            this.isiPengumuman = ''
                            this.judulPengumuman = ''
                            //this.periode_akhir = null
                        })
                }
                
            } catch (error) {
                console.log(error);
            }
            
        },
        async getAllBerita(){
            this.page = 1
            this.jumlahPage = null
            await axios.get(`https://beritaapi.fti.ukdw.ac.id/admin/${this.firebaseUID.uid}/berita`)
            .then((response)=>{
                this.daftarBerita = response.data
                this.daftarBerita = this.daftarBerita.groupBy((berita) => {
                    return berita.status
                })
                console.log(this.daftarBerita[this.statusBerita])
                if(this.daftarBerita[this.statusBerita] == null){
                    this.jumlahPage = null
                }else{
                    this.jumlahPage = this.daftarBerita[this.statusBerita].length/10
                }
                
            })
        },
        handleAttachmentChanges(event) {
            try {
                var file = event.attachment
                const storageRef = firebase.storage().ref(`${file.file.name}`).put(file.file)
                storageRef.on("state_changed", snapshot => {
                    this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
                }, error => {console.log(error.message)},
                    () => {this.uploadValue=100;  
                        storageRef.snapshot.ref.getDownloadURL().then((url)=>{
                            this.gambar = url
                            const progress = document.querySelector("progress")
                            progress.setAttribute("value","100")
                        })
                    }
                )
            } catch (error) {
                console.log(error.message);
            }
        },
        hapusKomponenPengumuman() {
            this.isRemoveBerita = true
        },
        tambahKomponenPengumuman() {
            this.isRemoveBerita = false
            this.judulPengumuman = ''
            this.isiPengumuman = ''
            this.gambar = ''
            //this.periode_akhir = null
            this.itemBerita = []
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
    .daftar-berita{
        display: grid; 
        grid-template-columns:repeat(auto-fit, minmax(500px,1fr)); 
        padding:0;
    }
    .daftar-mahasiswa{
        display: grid; 
        grid-template-columns:repeat(auto-fit, minmax(500px,1fr)); 
        padding:0;
    }
}
.judul{
    text-align: left;
    font-size: 250%;
    font-weight: bold;
}
p{
    text-align: left;
    font-size: x-large;
}
p.tanggalBerakhir{
    font-size: large;
    margin-top:1rem;
}
p.tanggalPengumuman{
    font-size: medium;
}
.form{
    display: flex;
    text-align: left;
}
.btn:hover {
    color: white !important;
    background-color: #32a3df;
}
.button-group{
    display: flex; 
    justify-content: flex-end;
}
.button .send{
    display: flex;
    border-style: none;
    color: #32a3df;
    margin: 0.25rem;
    background-color: transparent;
}
.button .send:hover{
    color: white;
    background-color: #32a3df;
}
.button .save{
    display: flex;
    justify-content: center;
    border-style: none;
    color: grey;
    margin: 0.25rem;
    background-color: transparent;
}
.button .save:hover{
    color: white;
    background-color: grey;
}
.delete{
    display: flex;
    border-style: none;
    color: #ee1010;
    margin: 0.25rem;
    background-color: transparent;
}
.delete:hover{
    color: white;
    background-color: #ee1010;
    
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
h4{
    font-size:calc(100% + 1vw);
    text-align: center;
}
.perwalian{
    margin-top: 1rem;
}

.page{
    color: #32a3df;
    border-color: #32a3df;
    background-color: transparent;
}
.page[disabled]{
    pointer-events: none;
}
button#next{
    float: right;
}
#listMenuAdmin:hover{
    color: white !important;
    background-color: #32a3df !important ;
    border-color:  #32a3df !important;
}
#listMenuAdmin:not(:disabled):not(.disabled) {
    color: white ;
    background-color: #32a3df ;
    border-color:  #32a3df;
}
#listMenuAdmin:not(:disabled):not(.active) {
    border-color: #32a3df  !important;
    background: none ;
    color: #32a3df  ;
}
.list-judul-pengumuman{
    font-size:calc(80% + 1vw);
    text-align: left;
}
.btn-buat-pengumuman{
    color: #32a3df;
    background-color: transparent;
    border: #32a3df 1px solid;
    margin-top: 1rem;
}
.btn-buat-pengumuman:hover{
    border: #32a3df 1px solid;
}
.tutup-pengumuman{
    display: flex;
    border-style: none;
    color: black;
    margin: 0.25rem;
    background-color: transparent;
}
.tutup-pengumuman:hover{
    color: white;
    background-color: darkgray;
}
.field-pengumuman{
    margin: 1rem 0 0 0 ;
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


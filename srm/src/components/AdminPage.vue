<template>
    <div class="container">
        <b-button class="kembali" @click="kembali">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
            </svg>
            Kembali
        </b-button>
        <p class="judul">ADMIN FTI UKDW</p>
        <body class="bv-example-row">
            <b-row >
                <b-col sm="8">
                    <div class="shadow-lg p-3 mb-5 bg-white rounded-4" v-show="isShowBuatPengumuman">
                        <p  v-if="itemBerita.status != 'PUBLISHED'">Buat Berita</p>
                        <p  v-if="itemBerita.status == 'PUBLISHED'">Detail Berita</p>
                            <span v-if="itemBerita.status == 'PUBLISHED'">Judul</span>
                            <b-input type="text" placeholder="Judul" style="margin-bottom:1rem;" v-model="judulPengumuman" v-if="itemBerita.status != 'PUBLISHED'"></b-input>
                            <b-input type="text" placeholder="Judul" style="margin-bottom:1rem;" v-model="judulPengumuman" v-if="itemBerita.status == 'PUBLISHED'" readonly></b-input>
                            <!-- <textarea class="form-control" id="exampleFormControlTextarea1" rows="8" v-model="isiPengumuman"></textarea> -->
                            <VueTrix @trix-attachment-add="handleAttachmentChanges" v-model="isiPengumuman" v-if="itemBerita.status == 'PUBLISHED'" :disabled-editor="true"/>
                            <VueTrix @trix-attachment-add="handleAttachmentChanges" v-model="isiPengumuman" v-if="itemBerita.status != 'PUBLISHED'" :disabled-editor="false"/>
                        <div style="margin-top: 1rem;">
                            <div v-if="itemBerita.status == 'PUBLISHED'">
                                <div v-if="itemBerita.file != null">Lampiran File: <a :href="itemBerita.file" target="_blank">File</a></div>
                            </div>
                            <div v-if="itemBerita.status == 'DRAFT'">
                               <div v-if="itemBerita.file != null">Lampiran File:<a :href="itemBerita.file" target="_blank">File</a></div>  
                            </div>
                            <div v-if="itemBerita.status == 'DRAFT'">
                                Disimpan Pada Tanggal: {{itemBerita.tanggal}}
                            </div>
                            <div v-if="itemBerita.status == 'PUBLISHED'">
                                Dikirimkan Pada Tanggal: {{itemBerita.tanggal}}
                            </div>
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
                    <div v-if="isRemoveCatatan == false">
                        <CatatanMahasiswa :itemMahasiswa="itemMahasiswa" :key="JSON.stringify(itemMahasiswa)" @clicked=onClickChildCatatan />
                    </div>
                </b-col>
                <b-col>
                    <b-row>
                       <b-col style="margin:0;padding:0;">
                            <div align="center">
                                <b-button block id="listMenuAdmin" @click="toggle" :class="[showListMahasiswa ? 'active':'']">List Mahasiswa</b-button>
                            </div>
                       </b-col>
                       <b-col style="margin:0;padding:0;">
                            <div  align="center" >
                                <b-button block id="listMenuAdmin"  @click="toggleBerita" :class="[showListBerita ? 'active':'']">List Berita</b-button>
                            </div>
                       </b-col>
                    </b-row>
                    <div v-if="showListMahasiswa" class="listMahasiswa">
                        <h4>Daftar Mahasiswa Informatika</h4>
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
                            <b-container v-for="item in daftarPerwalian.slice(page*10-10,page*10 )" :key="item.id" style="margin-bottom: .5rem; padding: 1rem; border: 2px solid #e5e5e5;" class="shadow p-3 rounded listMahasiswa">
                                <b-row style="align-items:center; margin-left: .2rem; display:flex; flex-wrap:wrap; " >
                                    <b-col cols="8">
                                        <b-row>{{ item.nim }}</b-row>
                                        <b-row>{{ item.nama_lengkap }}</b-row>
                                    </b-col>
                                </b-row>
                                    <div class="justify-content-center">
                                        <div class="button">
                                            <a href="#catatanMahasiswa">
                                            <b-button block @click="sendDataCatatan(item,'admin')" style="margin: .2rem; border: 1px solid #32a3df;" data-toggle="tooltip" data-placement="top" title="Lihat Catatan Perwalian" type="button" class="send" >
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="1.4rem" height="1.4rem" fill="currentColor" class="bi bi-send-fill">
                                                    <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/>
                                                </svg>
                                                    &nbsp;Lihat Detail
                                            </b-button>
                                            </a>
                                        </div>
                                    </div>
                            </b-container>
                        </div>
                    </div>
                    
                    <!-- LIST BERITA -->
                    <div v-if="showListBerita">
                        <h4>Daftar Berita</h4>
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
                            <b-form-select v-model="statusBerita" :options="optionStatusBerita" @change="toggleBerita"></b-form-select>
                        </b-row>
                        <div class="perwalian" v-if="daftarBerita.length != 0">
                            <b-container v-for="item in daftarBerita[statusBerita].slice(page*10-10,page*10 )" :key="item.id" style="margin-bottom: .5rem; padding: 1rem; border: 2px solid #e5e5e5;" class="shadow p-3 rounded listMahasiswa">
                                <b-row style="align-items:center; margin-left: .2rem; display:flex; flex-wrap:wrap;">
                                    <b-col>
                                        <b-row>
                                            <h5>{{ item.judul_berita }}&nbsp;<span v-if="item.status == 'PUBLISHED'" class="badge badge-pill badge-success" id="pillStatus">{{item.status}}</span>
                                                 <span v-if="item.status == 'DRAFT'" class="badge badge-pill badge-secondary" id="pillStatus">{{item.status}}</span>
                                                 <span v-if="item.status == 'DELETED'" class="badge badge-pill badge-danger" id="pillStatus">{{item.status}}</span></h5>
                                        </b-row>
                                        <b-row>{{ item.tanggal }}</b-row>
                                    </b-col>
                                </b-row>
                                    <div class="justify-content-center">
                                        <div class="button">
                                            <b-button block @click="sendDataBerita(item)" style="margin: .2rem; border: 1px solid #32a3df;" data-toggle="tooltip" data-placement="top" title="Lihat Catatan Perwalian" type="button" class="send" >
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="1.4rem" height="1.4rem" fill="currentColor" class="bi bi-send-fill">
                                                    <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/>
                                                </svg>
                                                    &nbsp;Lihat Detail
                                            </b-button>
                                        </div>
                                    </div>
                            </b-container>
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
//import MahasiswaProfile from './MahasiswaProfile.vue'
// import DetailBerita from './DetailBerita.vue'
import VueTrix from 'vue-trix'
import CatatanMahasiswa from './CatatanMahasiswa.vue'
import moment from 'moment'
export default {
    name: 'AdminPage',
    components: { VueTrix, CatatanMahasiswa },
    data() {
      return {
        isShowBuatPengumuman: true,
        showListMahasiswa: true,
        showListBerita: false,
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
        periode_akhir: null
      }
    },
    created(){
        //this.hapusTool();
        if(sessionStorage.getItem('firebase-token') && sessionStorage.getItem('firebase-uid')){
            //this.user = JSON.parse(sessionStorage.getItem('user'))
            this.firebaseUID = JSON.parse(sessionStorage.getItem('firebase-uid'))
           if(this.showListMahasiswa == true){
            this.getMahasiswa()
           }
        }
    },
    mounted() {
            this.hapusTool()
    },
    methods: {
        toggle() {
            this.showListMahasiswa = true
            this.showListBerita = false
            this.getMahasiswa()
            
        },
        toggleBerita() {
            this.showListMahasiswa = false
            this.showListBerita = true
            if(this.statusBerita != null && this.statusBerita != ''){
                this.getAllBerita()
            }
        },
        async getProfile(){
            await axios.get(`http://userapi.fti.ukdw.ac.id/dosen/${this.firebaseUID}`).then((response)=>{
                this.profile = response.data
            })
        },
        kembali() {
            this.$router.replace('listMenu')
        },
        onClickChildCatatan(value){
            console.log(value);
            this.isRemoveCatatan = value
            this.isShowBuatPengumuman = true
            this.hapusTool()
           
        },
        async getMahasiswa() {
            this.page = 1
            this.jumlahPage = null
            await axios.get(`http://userapi.fti.ukdw.ac.id/admin/${this.firebaseUID.uid}/list-mahasiswa`)
            .then((response) => {
                this.daftarPerwalian = response.data
                this.jumlahPage = this.daftarPerwalian.length/10
            })
        },
        async getAllBerita(){
            this.page = 1
            this.jumlahPage = null
            await axios.get(`http://beritaapi.fti.ukdw.ac.id/admin/${this.firebaseUID.uid}/berita`)
            .then((response)=>{
                this.daftarBerita = response.data
                this.daftarBerita = this.daftarBerita.groupBy((berita) => {
                    return berita.status
                })
                this.jumlahPage = this.daftarBerita[this.statusBerita].length/10
            })
        },
        sendDataBerita(item) {
            this.itemBerita = item
            if(item.judul_berita){
                this.judulPengumuman = item.judul_berita
                this.isiPengumuman = item.isi_berita
            }else{
                this.judulPengumuman = ''
                this.isiPengumuman = item.isi_berita
            }
            
            this.isRemoveBerita = false
            console.log(this.itemBerita);
        },
        sendDataCatatan(itemMahasiswa,fromPage) {
            this.itemMahasiswa = [itemMahasiswa,fromPage]
            this.isRemoveCatatan = false
            this.isShowBuatPengumuman = false     
            //console.log(this.itemMahasiswa);
        },
        hapusTool(){
            const del = document.querySelector(".trix-button-group--block-tools");
            del.style.display = 'none'
        },
        hapusPengumuman(){
            this.isiPengumuman = ''
            this.gambar = null
        },
        async simpan(){
            try {
                if(this.isiPengumuman == ''){
                    this.$toast.open({
                        message: 'Pesan Gagal Terkirim, Isi Berita Tidak Boleh Kosong',
                        type: 'warning',
                        position: 'top'
                    });
                }else{
                    await axios.post(`http://beritaapi.fti.ukdw.ac.id/admin/${this.firebaseUID.uid}/new-berita`, {
                        nama: "Admin Angger Lucu",
                        isi_berita: this.isiPengumuman,
                        file: this.gambar,
                        judul_berita: this.judulPengumuman,
                        status:"DRAFT",
                        periode_akhir: moment().locale('id').toString()
                        }, 
                        )
                        .then((response)=>{
                            console.log(response)
                            this.$toast.open({
                                message: 'Pesan Berhasil Disimpan',
                                type: 'success',
                                position: 'top'
                            });
                            this.isiPengumuman = ''
                            this.judulPengumuman = ''
                            this.periode_akhir = null
                        })
                }
            } catch (error) {
                console.log(error.response.data.message);
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
                    await axios.post(`http://beritaapi.fti.ukdw.ac.id/admin/${this.firebaseUID.uid}/new-berita`, {
                        nama: "Admin Angger Lucu",
                        isi_berita: this.isiPengumuman,
                        file: this.gambar,
                        judul_berita: this.judulPengumuman,
                        status:"PUBLISHED",
                        periode_akhir: moment().locale('id').toString()
                        }, 
                        )
                        .then((response)=>{
                            console.log(response)
                            this.$toast.open({
                                message: 'Pesan Berhasil Terkirim',
                                type: 'success',
                                position: 'top'
                            });
                            this.isiPengumuman = ''
                            this.judulPengumuman = ''
                            this.periode_akhir = null
                        })
                }
                
            } catch (error) {
                console.log(error.response.data.message);
            }
            
        },
        handleAttachmentChanges(event) {
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
span .trix-button-group--block-tools{
    display: none !important;
}
.judul{
    text-align: left;
    font-size: calc(120% + 1vw);
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
.button-group{
    display: flex; 
    justify-content: flex-end;
}.button-group-list{
    display: flex; 
   
}
.button .send{
    display: flex;
    justify-content: center;
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
    margin-top: 2rem;
    font-size:calc(80% + 1vw);
    text-align: center;
}
/* h5{
    
    font-size:calc(75% + .5vw);
} */

.perwalian{
    margin-top: 1rem;
}
h6{
    font-size:calc(10% + 0.5vw);

}
span#hapus{
    display: none;
}
.page{

    color: #32a3df;
    border-color: #32a3df;
    background-color: transparent;
}
.page:hover{
    background-color: #32a3df;
    border-color: #32a3df;
}
.page[disabled]{
    pointer-events: none;
}
#pillStatus{
    font-size: 60%;
}
button#next{
    
    float: right;
}
/* #listMenuAdmin{
   border-color: none !important;
    background: none !important;
    color: black;
} */
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

</style>


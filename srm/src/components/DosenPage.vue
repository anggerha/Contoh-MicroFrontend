<template>
    <div class="container">
        <b-button class="kembali" @click="kembali">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
            </svg>
            Kembali
        </b-button>
        <p class="judul">SRM FTI UKDW</p>
        <body class="bv-example-row">
            <b-row>
                <b-col sm="8">
                    <div class="shadow-lg p-3 mb-5 bg-white rounded-4">
                        <p>Buat Pengumuman</p>

                            <b-input type="text" placeholder="Judul" style="margin-bottom:1rem;" v-model="judulPengumuman"></b-input>
                            <!-- <textarea class="form-control" id="exampleFormControlTextarea1" rows="8" v-model="isiPengumuman"></textarea> -->
                            <VueTrix @trix-attachment-add="handleAttachmentChanges" v-model="isiPengumuman"/>

                        <div style="margin-top: 1rem;">
                            <div class="button-group">
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
                    <div v-if="isRemoveProfile == false">
                        <MahasiswaProfile :item="item" :key="JSON.stringify(item)" @clicked=onClickChildProfile />
                    </div>
                </b-col>
                <b-col>
                    <h4 v-if="semester == null">Daftar Mahasiswa Perwalian Tahun Ajaran {{ new Date().getFullYear()-2 }}/{{ new Date().getFullYear()-1 }}</h4>
                    <h4 v-if="semester == 1">Daftar Mahasiswa Perwalian Tahun Ajaran {{ new Date().getFullYear()-2 }}/{{ new Date().getFullYear()-1 }} Semester Ganjil</h4>
                    <h4 v-if="semester == 2">Daftar Mahasiswa Perwalian Tahun Ajaran {{ new Date().getFullYear()-2 }}/{{ new Date().getFullYear()-1 }} Semester Genap</h4>
                    <b-form-select v-model="semester" :options="options" @change="getMahasiswaPerwalian"></b-form-select>
                    <div class="perwalian">
                        <b-container v-for="item in daftarPerwalian" :key="item.id" style="margin-bottom: .5rem; padding: 1rem; border: 2px solid #e5e5e5;" class="shadow p-3 rounded listMahasiswa">
                            <b-row style="align-items:center; margin-left: .2rem; display:flex; flex-wrap:wrap; " >
                                <b-col cols="8">
                                    <b-row>{{ item.nim }}</b-row>
                                    <b-row>{{ item.NAMA_MAHASISWA }}</b-row>
                                </b-col>
                            </b-row>
                                <div class="button-group justify-content-center">
                                    <div class="button">
                                        <a href="#catatanPerwalian">
                                            <b-button style="margin: .2rem; border: 1px solid #32a3df;" @click="sendDataProfile(item)" class="send">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" fill="currentColor" class="bi bi-file-earmark-plus" viewBox="0 0 16 16">
                                                    <path d="M8 6.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 .5-.5z"/>
                                                    <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"/>
                                                </svg>
                                                    Tambah Catatan
                                            </b-button>
                                        </a>
                                    </div>
                                    <div class="button">
                                        <a href="#catatanMahasiswa">
                                        <b-button @click="sendDataCatatan(item)" style="margin: .2rem; border: 1px solid #32a3df;" data-toggle="tooltip" data-placement="top" title="Lihat Catatan Perwalian" type="button" class="send" >
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="1.4rem" height="1.4rem" fill="currentColor" class="bi bi-send-fill">
                                                <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/>
                                            </svg>
                                                Lihat Catatan
                                        </b-button>
                                        </a>
                                    </div>
                                </div>
                        </b-container>
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
import MahasiswaProfile from './MahasiswaProfile.vue'
import VueTrix from 'vue-trix'
import CatatanMahasiswa from './CatatanMahasiswa.vue'
export default {
    name: 'SRMPage',
    components: { MahasiswaProfile,VueTrix, CatatanMahasiswa },
    data() {
      return {
        user: [],
        isRemoveCatatan: false,
        isRemoveProfile: false,
        dataDiri: [],
        fields: [ 'NAMA_MAHASISWA', 'nim'],
        daftarPerwalian: [],
        item: [],
        itemMahasiswa: [],
        files: [],
        gambar: null,
        imageData: null,
        semester: null,
        options: [
            { value: null, text: 'Pilih Semester Gasal atau Genap' },
            { value: '1', text: 'Gasal' },
            { value: '2', text: 'Genap' },
        ],
        isiPengumuman:'',
        judulPengumuman:''
      }
    },
    created(){
        //this.hapusTool();
        if(sessionStorage.getItem('user') && sessionStorage.getItem('dataDiri')){
            this.user = JSON.parse(sessionStorage.getItem('user'))
            this.dataDiri = JSON.parse(sessionStorage.getItem('dataDiri'))
            
        }
       
    },
    mounted() {
        this.hapusTool()
    },
    methods: {
        kembali() {
            this.$router.replace('listMenu')
        },
        onClickChildCatatan(value){
            console.log(value);
            this.isRemoveCatatan = value
        },
        onClickChildProfile(value){
            console.log(value);
            this.isRemoveProfile = value
        },
        async getMahasiswaPerwalian() {
            await axios.get(`http://localhost:8000/dosen/list-mahasiswa`, { params: {
                nama_dosen: "Laurentius Kuncoro Probo Saputra",
                email: this.dataDiri.email,
                role: this.dataDiri.role,
                kode_semester: parseInt(new Date().getFullYear()-2+this.semester)
            } })
            .then((response) => {
                this.daftarPerwalian = response.data
            })
        },
        sendDataProfile(item) {
            this.item = item
            this.isRemoveProfile = false
            // console.log(this.item);
        },
        sendDataCatatan(itemMahasiswa) {
            this.itemMahasiswa = itemMahasiswa
            this.isRemoveCatatan = false
            //console.log(this.itemMahasiswa);
        },
         hapusTool(){
            const del = document.querySelector(".trix-button-group--block-tools");
            del.style.display = 'none'
        },
        hapusPengumuman(){
            this.isiPengumuman = ''
        },
        async kirimTele(){
            await axios.post(`http://localhost:8000/dosen/announcement`, {
                nama_dosen: "Testing Channel",
                email: this.dataDiri.email,
                role: this.dataDiri.role,
                pengumuman: this.isiPengumuman,
                file: this.gambar,
                judul: this.judulPengumuman
            })
            .then(()=>{
                // console.log(response)
                this.$toast.open({
                    message: 'Pesan Berhasil Terkirim',
                    type: 'success',
                    position: 'top'
                });
                this.isiPengumuman = ''
                this.judulPengumuman = ''
            })
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
.judul{
    text-align: left;
    font-size: 250%;
    font-weight: bold;
}
p{
    text-align: left;
    font-size: x-large;
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
    font-size:calc(80% + 1vw);
    text-align: center;
}
.perwalian{
    margin-top: 1rem;
}
h6{
    font-size:calc(10% + 0.5vw);

}
span#hapus{
    display: none;
}
</style>


<template>
    <div class="container">
        <b-button class="kembali" @click="kembali">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
            </svg>
            Kembali
        </b-button>
        <b-row>
            <b-col cols="12" md="6" lg="6" xl="6">
                <p class="judul">ADMIN SRM FTI UKDW</p>
            </b-col>
            <b-col cols="12" md="6" lg="6" xl="6" align-self="center">
                <b-button id="listMenuAdmin" class="float-right shadow btn-general" style="border: 1px solid #32a3df;" @click="goToForm()">Form Data</b-button>
            </b-col>
        </b-row>
        <body class="bv-example-row">
            <b-row>
                <b-col>
                    
                    <b-row>
                        <b-col>
                            <div align="center" >
                                <b-button block id="listMenuAdmin" class="shadow btn-general" @click="toggleBerita" :class="[showListBerita ? 'active':'']">List Pengumuman</b-button>
                            </div>
                       </b-col>
                       <b-col>
                            <div align="center">
                                <b-button block id="listMenuAdmin" class="shadow btn-general" @click="toggle" :class="[showListMahasiswa ? 'active':'']">List Mahasiswa</b-button>
                            </div>
                       </b-col>
                       
                    </b-row>
                    <b-row class="mt-5">
                        <b-col>
                            <div v-if="isRemoveCatatan == false" id="catatanMahasiswa">
                                <CatatanMahasiswa :itemMahasiswa="itemMahasiswa" :key="JSON.stringify(itemMahasiswa)" @clicked=onClickChildCatatan />
                            </div>
                        </b-col>
                    </b-row>
<!-- LIST MAHASISWA DOSEN -->
                    <div v-if="showListMahasiswa" class="listMahasiswa mt-5">
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
                            <b-row class="mt-2">
                                <b-col>
                                    <div class="form-inline" style="display: flex; justify-content: right;">
                                        <input v-model="keyword" class="form-control" type="search" placeholder="Cari NIM, Nama, atau Status Mahasiswa" aria-label="Search" style="width: 20rem;">
                                    </div>
                                </b-col>
                            </b-row>
                            <div class="perwalian">
                                <ul class="daftar-mahasiswa">
                                    <li v-for="item in searchMahasiswa.slice(page*12-12,page*12 )" :key="item.id" style="display:inline; padding: 5px;" >
                                        <b-container class="shadow-sm p-2 mb-3 rounded" style=" background-color: white">
                                            <b-row style="align-items:center; margin-left: .2rem; display:flex; flex-wrap:wrap; " >
                                                <b-col cols="8">
                                                    <b-row v-if="item.status == 'aktif' "><h5>{{ item.nim }} <b-badge variant="success">Aktif</b-badge></h5> </b-row>
                                                    <b-row v-if="item.status == 'alumni' "><h5>{{ item.nim }} <b-badge variant="primary">Alumni</b-badge></h5> </b-row>
                                                    <b-row v-if="item.status == null || !item.status"><h5>{{ item.nim }}</h5> </b-row>
                                                    <b-row>{{ item.nama_lengkap }}</b-row>
                                                </b-col>
                                            </b-row>
                                                <div class="justify-content-center">
                                                    <div class="button">
                                                        <a href="#catatanMahasiswa">
                                                        <b-button block @click="sendDataCatatan(item,'admin')" data-toggle="tooltip" data-placement="top" title="Lihat Catatan Perwalian" class="btn-general" >
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 576" width="1.4rem" height="1.4rem" fill="currentColor" class="bi bi-send-fill">
                                                                <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/>
                                                            </svg>
                                                                &nbsp;Lihat Detail
                                                        </b-button>
                                                        </a>
                                                    </div>
                                                </div>
                                        </b-container>
                                    </li>
                                    <li v-if="searchMahasiswa.length == 0" style="text-align: center;">Tidak Dapat Menemukan Data dengan Keyword {{ keyword }}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
<!-- FORM PENGUMUMAN -->
                    <div v-if="showListBerita" class="mt-5">
                        <h4>Daftar Pengumuman</h4>
                        <b-button block class="shadow btn-general" @click="tambahKomponenPengumuman" style="display:flex; justify-content:center; font-size: large;">
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
                                <div style="display: flex; align-items: center; margin-bottom: 1rem;" v-if="itemBerita.length == 0">
                                    <span style="margin-right: 1rem;">Kepada: </span>
                                    <b-form-select
                                    id="input-2"
                                    v-model="statusPenerima"
                                    :options="daftarStatusMahasiswa"
                                    required
                                    ></b-form-select>
                                </div>
                                <div style="display: flex; align-items: center; margin-bottom: 1rem;" v-if="itemBerita.length != 0">
                                    <span style="margin-right: 1rem;">Kepada: </span>
                                    <b-input
                                    v-if="itemBerita.status === 'PUBLISHED'"
                                    id="input-2"
                                    v-model="statusPenerima"
                                    readonly
                                    required
                                    ></b-input>
                                    <b-form-select
                                    v-if="itemBerita.status !== 'PUBLISHED'"
                                    id="input-2"
                                    v-model="statusPenerima"
                                    :options="daftarStatusMahasiswa"
                                    required
                                    ></b-form-select>
                                </div>
                                <b-input type="text" placeholder="Judul" style="margin-bottom:1rem;" v-model="judulPengumuman" v-if="itemBerita.status == 'PUBLISHED'" readonly></b-input>
                                <b-input type="text" placeholder="Judul" style="margin-bottom:1rem;" v-model="judulPengumuman" v-if="itemBerita.status != 'PUBLISHED'"></b-input>
                                <VueTrix v-model="isiPengumuman" v-if="itemBerita.status == 'PUBLISHED'" :disabled-editor="true" @hook:mounted="hapusTool"/>
                                <VueTrix v-model="isiPengumuman" v-if="itemBerita.status != 'PUBLISHED'" @hook:mounted="hapusTool"/>
                                <b-form-file id="attachment" multiple ref="file-input" class="mb-2 mt-2" @change="handleAttachmentChanges" plain>
                                    <label id="fileLabel">Choose file</label>
                                </b-form-file>
                                <b-progress-bar v-if="uploadValue != 0 && uploadValue != 100" :label="label + '   ' + Math.round(uploadValue) + '%'" :value="uploadValue" variant="primary"></b-progress-bar>
                                <span v-if="files.length != 0">Attachment: </span><br>
                                <div v-show="files.length != 0" v-for="attachment in files" :key="attachment.id">
                                    <a :href="attachment.url" target="_blank">{{ attachment.file_name }}</a>
                                    <span>&nbsp;</span>
                                    <span v-if="itemBerita.status != 'PUBLISHED'"><button class="deleteFile" @click="hapusFile">&#10005;</button></span>
                                </div>
                                <div class="button-group" v-if="itemBerita.status != 'PUBLISHED'">
                                    <div class="button">
                                        <b-button class="save btn-general" @click="simpan">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-bookmarks-fill" viewBox="0 0 16 16">
                                                <path d="M2 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v11.5a.5.5 0 0 1-.777.416L7 13.101l-4.223 2.815A.5.5 0 0 1 2 15.5V4z"/>
                                                <path d="M4.268 1A2 2 0 0 1 6 0h6a2 2 0 0 1 2 2v11.5a.5.5 0 0 1-.777.416L13 13.768V2a1 1 0 0 0-1-1H4.268z"/>
                                            </svg>
                                            Simpan
                                        </b-button>
                                    </div>
                                    <div class="button">
                                        <b-button class="delete btn-general" @click="hapusPengumuman">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                            </svg>
                                            Hapus
                                        </b-button>
                                    </div>
                                    <div class="button">
                                        <b-button class="send btn-general" @click="kirimTele">
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
                        <b-row style="margin-bottom: 1rem; margin-top: 1rem;">
                            <b-col>
                                <b-form-select v-model="statusBerita" :options="optionStatusBerita" @change="toggleBerita"></b-form-select>
                            </b-col>
                        </b-row>
<!-- LIST PENGUMUMAN -->
                        <div class="perwalian" v-if="daftarBerita.length != 0">
                            <div v-if="daftarBerita[statusBerita]">
                                <div class="centered">
                                    <section class="cards">
                                        <article class="card p-4 shadow p-2 mb-3 bg-white rounded" v-for="item in daftarBerita[statusBerita].slice(page*10-10,page*10 )" :key="item.id">
                                            <h1 v-if="item.group === 'alumni'" class="badge badge-primary badge-status">Alumni</h1>
                                            <h5 v-if="item.group === 'aktif'" class="badge badge-success badge-status">Mahasiswa Aktif</h5>
                                            <h5 v-if="item.group === 'all'" class="badge badge-secondary badge-status">Mahasiswa Aktif dan Alumni</h5>
                                            <h3>{{ item.judul_berita }}</h3>
                                            <p v-html="item.isi_berita" style="text-align: justify;"></p>
                                            <div>
                                                <span v-if="item.file.length != 0">Attachment: </span><br>
                                                <div v-show="item.file.length != 0" v-for="attachment in item.file" :key="attachment.id">
                                                    <span><a :href="attachment.url" target="_blank">{{ attachment.file_name }}</a></span>
                                                </div>
                                            </div>
                                            <div class="footer">
                                                <div class="mb-4 mt-4" >
                                                    Dibuat pada tanggal {{ item.tanggal }}
                                                </div>
                                                <b-row >
                                                    <b-col>
                                                        <div class="button">
                                                            <b-button block @click="sendDataBerita(item)" style="margin: .2rem; justify-content: center;" type="button" class="btn-general">
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="1.4rem" height="1.4rem" fill="currentColor" class="bi bi-send-fill">
                                                                    <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/>
                                                                </svg>
                                                                    &nbsp;Lihat Detail
                                                            </b-button>
                                                        </div>
                                                    </b-col>
                                                    <b-col>
                                                        <div class="button">
                                                            <b-button block @click="hapusBerita(item)" style="margin: .2rem; justify-content: center;" class="hapusPengumuman btn-general">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="1.4rem" height="1.4rem" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                                                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                                                </svg>
                                                                Hapus
                                                            </b-button>
                                                        </div>
                                                    </b-col>
                                                </b-row>
                                            </div>
                                        </article>
                                    </section>
                                </div>
                                <!-- <div class="centered">
                                    <div class="cards" v-for="item in daftarBerita[statusBerita].slice(page*10-10,page*10 )" :key="item.id" style="display:inline; padding: 5px;">
                                        <b-container class="shadow p-2 mb-3 bg-white rounded card">
                                            <b-row style="align-items:center; margin: .2rem; display:flex; flex-wrap:wrap;">
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
                                                        <span v-if="item.file.length != 0">Attachment: &nbsp;</span>
                                                        <div v-show="item.file.length != 0" v-for="attachment in item.file" :key="attachment.id">
                                                            <span><a :href="attachment.url" target="_blank">{{ attachment.file_name }}</a>,&nbsp;</span>
                                                        </div>
                                                    </b-row>
                                                    <b-row>Dibuat pada: {{ item.tanggal }}</b-row>
                                                </b-col>
                                            </b-row>
                                            <div class="justify-content-center">
                                                <b-row>
                                                    <b-col>
                                                        <div class="button">
                                                            <b-button block @click="sendDataBerita(item)" style="margin: .2rem; justify-content: center;" data-toggle="tooltip" data-placement="top" title="Lihat Catatan Perwalian" type="button" class="send" >
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="1.4rem" height="1.4rem" fill="currentColor" class="bi bi-send-fill">
                                                                    <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/>
                                                                </svg>
                                                                    &nbsp;Lihat Detail
                                                            </b-button>
                                                        </div>
                                                    </b-col>
                                                    <b-col>
                                                        <div class="button">
                                                            <b-button block class="hapusPengumuman" @click="hapusBerita(item)" style="margin: .2rem; justify-content: center;">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="1.4rem" height="1.4rem" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                                                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                                                </svg>
                                                                Hapus
                                                            </b-button>                   
                                                        </div>
                                                    </b-col>
                                                </b-row>
                                            </div>
                                        </b-container>
                                    </div>
                                </div> -->
                            </div>
                            <div v-else style="text-align:center;">
                                <div>
                                    List {{statusBerita}} Berita Kosong
                                </div>
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
        imageData: null,
        isiPengumuman:'',
        judulPengumuman:'',
        uploadValue: 0,
        label: '',
        keyword: '',
        daftarStatusMahasiswa: [
            { text: 'Status Mahasiswa', value: 'null', disabled: true },
            { text: 'Aktif', value: 'aktif' },
            { text: 'Alumni', value: 'alumni' },
            { text: 'Aktif dan Alumni', value: 'all' }
        ],
        statusPenerima: null
      }
    },
    created(){
        if(localStorage.getItem('firebase-token') && localStorage.getItem('firebase-uid')){
            this.firebaseUID = JSON.parse(localStorage.getItem('firebase-uid'))
        } else {
            this.$router.replace('/login').then(() => { this.$router.go() })
        }
    },
    computed:{
        searchMahasiswa(){
            if(this.keyword != ''){
                var temp = this.daftarPerwalian.filter((item)=>{
                    if(item.status) {
                        return this.keyword.toLowerCase().split(' ').every(v => item.status.toLowerCase().includes(v) || item.nim.toLowerCase().includes(v) || item.nama_lengkap.toLowerCase().includes(v))
                    } else {
                        return this.keyword.toLowerCase().split(' ').every(v => item.nim.toLowerCase().includes(v) || item.nama_lengkap.toLowerCase().includes(v))
                    }
                })
                return temp
                
            } else {
                return this.daftarPerwalian
            }
            
        }
    },
    watch:{
        searchMahasiswa:{
            deep: true,
            handler: function (newVal) {
                if (newVal.length != 0) {
                    this.jumlahPage = newVal.length/10
                    this.page = 1
                } else {
                    this.jumlahPage = 0
                    this.page = 0
                }
            }
        }
    },
    methods: {
        goToForm(){
            this.$router.replace('FormData')
        },
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
            this.isRemoveCatatan = true
            this.getAllBerita()
        },
        kembali() {
            this.$router.replace('/listMenu')
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
            this.periode_akhir = moment(item.periode_akhir).format('YYYY-MM-DDTHH:mm:ss')
            if(this.itemBerita.file.length != 0){
                this.files = item.file
            }
            if(item.judul_berita){
                this.judulPengumuman = item.judul_berita
                this.isiPengumuman = item.isi_berita
                this.statusPenerima = item.group
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
            const attach = document.querySelector("span.trix-button-group.trix-button-group--file-tools")
            attach.style.display = 'none'
        },
        hapusPengumuman(){
            this.judulPengumuman = ''
            this.isiPengumuman = ''
            this.files = []
        },
        async simpan(){
            try {
                if(this.itemBerita.length != 0){
                    if(this.statusPenerima == null){
                        this.$toast.open({
                            message: 'Pesan Gagal Disimpan, Status Penerima Tidak Boleh Kosong',
                            type: 'warning',
                            position: 'top'
                        });
                    } else if(this.judulPengumuman == ''){
                        this.$toast.open({
                            message: 'Pesan Gagal Disimpan, Judul Berita Tidak Boleh Kosong',
                            type: 'warning',
                            position: 'top'
                        });
                    } else if(this.isiPengumuman == '') {
                        this.$toast.open({
                            message: 'Pesan Gagal Terkirim, Isi Berita Tidak Boleh Kosong',
                            type: 'warning',
                            position: 'top'
                        });
                    } else {
                        if(this.judulPengumuman != '' && this.statusPenerima != null && this.isiPengumuman != '') {
                            await axios.put(`https://beritaapi.fti.ukdw.ac.id/admin/${this.firebaseUID.uid}/edit-berita/${this.itemBerita.id}`, {
                                //tanggal: moment().locale('id').toString(),
                                nama: "Admin FTI",
                                isi_berita: this.isiPengumuman,
                                file: this.files,
                                judul_berita: this.judulPengumuman,
                                status:"DRAFT",
                                groups: this.statusPenerima
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
                                    this.statusPenerima = null
                                    this.files = []
                                    this.isRemoveBerita = true
                                    this.getAllBerita()
                                } else {
                                    this.$toast.open({
                                        dismissible: true,
                                        duration:0,
                                        message: 'Berita Gagal Disimpan',
                                        type: 'warning',
                                        position: 'top'
                                    });
                                }
                            })
                        } else {
                            this.$toast.open({
                                message: 'Pesan Gagal Disimpan, Ada Field yang Masih Kosong',
                                type: 'warning',
                                position: 'top'
                            });
                        }
                    } 
                } else {
                    if(this.statusPenerima == null){
                        this.$toast.open({
                            message: 'Pesan Gagal Disimpan, Status Penerima Tidak Boleh Kosong',
                            type: 'warning',
                            position: 'top'
                        });
                    } else if(this.judulPengumuman == ''){
                        this.$toast.open({
                            message: 'Pesan Gagal Disimpan, Judul Berita Tidak Boleh Kosong',
                            type: 'warning',
                            position: 'top'
                        });
                    } else if (this.isiPengumuman == '') {
                        this.$toast.open({
                            message: 'Pesan Gagal Terkirim, Isi Berita Tidak Boleh Kosong',
                            type: 'warning',
                            position: 'top'
                        });
                    } else {
                        if(this.judulPengumuman != '' && this.statusPenerima != null && this.isiPengumuman != '') {
                            await axios.post(`https://beritaapi.fti.ukdw.ac.id/admin/${this.firebaseUID.uid}/new-berita`, {
                                nama: "ADMIN FTI",
                                isi_berita: this.isiPengumuman,
                                file: this.files,
                                judul_berita: this.judulPengumuman,
                                status:"DRAFT",
                                tanggal: moment().locale('id').toString(),
                                groups: this.statusPenerima
                            })
                            .then(()=>{
                                this.$toast.open({
                                    message: 'Pesan Berhasil Disimpan',
                                    type: 'success',
                                    position: 'top'
                                });
                                this.getAllBerita()
                                this.isiPengumuman = ''
                                this.judulPengumuman = ''
                                this.periode_akhir = null
                                this.statusPenerima = null
                                this.isRemoveBerita = true
                                this.files = []
                            })
                        }
                    }
                }
            } catch (error) {
                console.log(error);
            }
        },
        async kirimTele(){
            try {
                if(this.itemBerita.length != 0){
                    if(this.statusPenerima == null){
                        this.$toast.open({
                            message: 'Pesan Gagal Disimpan, Status Penerima Tidak Boleh Kosong',
                            type: 'warning',
                            position: 'top'
                        });
                    } else if(this.judulPengumuman == ''){
                        this.$toast.open({
                            message: 'Pesan Gagal Disimpan, Judul Berita Tidak Boleh Kosong',
                            type: 'warning',
                            position: 'top'
                        });
                    } else if (this.isiPengumuman == '') {
                        this.$toast.open({
                            message: 'Pesan Gagal Terkirim, Isi Berita Tidak Boleh Kosong',
                            type: 'warning',
                            position: 'top'
                        });
                    } else {
                        if(this.judulPengumuman != '' && this.statusPenerima != null && this.isiPengumuman != ''){
                            await axios.put(`https://beritaapi.fti.ukdw.ac.id/admin/${this.firebaseUID.uid}/edit-berita/${this.itemBerita.id}`, {
                                nama: "Admin FTI",
                                isi_berita: this.isiPengumuman,
                                file: this.files,
                                judul_berita: this.judulPengumuman,
                                status:"PUBLISHED",
                                groups: this.statusPenerima
                            })
                            .then((response) => {
                                if(response.status == 201){
                                    this.$toast.open({
                                        dismissible: true,
                                        duration:0,
                                        message: 'Perubahan Berita Berhasil Dikirim',
                                        type: 'success',
                                        position: 'top'
                                    });
                                    this.getAllBerita()
                                    this.judulPengumuman = ''
                                    this.statusPenerima = null
                                    this.isiPengumuman = ''
                                    this.files = []
                                    this.isRemoveBerita = true
                                    this.itemBerita = []
                                } else {
                                    this.$toast.open({
                                        dismissible: true,
                                        duration:0,
                                        message: 'Berita Gagal Dikirim',
                                        type: 'warning',
                                        position: 'top'
                                    });
                                }
                            })
                        }
                    } 
                } else {
                    if(this.statusPenerima == null){
                        this.$toast.open({
                            message: 'Pesan Gagal Disimpan, Status Penerima Tidak Boleh Kosong',
                            type: 'warning',
                            position: 'top'
                        });
                    } else if(this.judulPengumuman == ''){
                        this.$toast.open({
                            message: 'Pesan Gagal Disimpan, Judul Berita Tidak Boleh Kosong',
                            type: 'warning',
                            position: 'top'
                        });
                    } else if (this.isiPengumuman == '') {
                        this.$toast.open({
                            message: 'Pesan Gagal Terkirim, Isi Berita Tidak Boleh Kosong',
                            type: 'warning',
                            position: 'top'
                        });
                    } else {
                        if(this.judulPengumuman != '' && this.statusPenerima != null && this.isiPengumuman != '') {
                            await axios.post(`https://beritaapi.fti.ukdw.ac.id/admin/${this.firebaseUID.uid}/new-berita`, {
                                nama: "Admin FTI",
                                isi_berita: this.isiPengumuman,
                                file: this.files,
                                judul_berita: this.judulPengumuman,
                                status:"PUBLISHED",
                                groups: this.statusPenerima
                            })
                            .then(()=>{
                                this.$toast.open({
                                    message: 'Berita Berhasil Terkirim',
                                    type: 'success',
                                    position: 'top'
                                });
                                this.getAllBerita()
                                this.isiPengumuman = ''
                                this.judulPengumuman = ''
                                this.periode_akhir = null
                                this.statusPenerima = null
                                this.isRemoveBerita = true
                                this.files = []
                            })
                        }
                    }
                }
            } catch (error) {
                console.log(error);
            }
        },
        async getAllBerita(){
            try {
                this.page = 1
                this.jumlahPage = null
                if(this.statusBerita != null){
                    await axios.get(`https://beritaapi.fti.ukdw.ac.id/admin/${this.firebaseUID.uid}/berita/${this.statusBerita}`)
                    .then((response)=>{
                        this.daftarBerita = response.data
                        if(this.daftarBerita.length != 0){
                            this.daftarBerita = this.daftarBerita.groupBy((berita) => {
                                return berita.status
                            })
                            if(this.daftarBerita[this.statusBerita] == null){
                                this.jumlahPage = null
                            }else{
                                this.jumlahPage = this.daftarBerita[this.statusBerita].length/10
                            }
                        } else if (this.daftarBerita.length == 0 || this.daftarBerita.length) {
                            console.log('Berita Kosong');
                        }
                    })
                }
            // eslint-disable-next-line no-empty
            } catch (error) {
                this.daftarBerita = !this.daftarBerita[this.statusBerita]
            }
        },
        handleAttachmentChanges(event) {
            try {
                var file = event.target.files
                for(let i = 0; i < file.length; i++){
                    this.uploadValue = 0
                    const storageRef = firebase.storage().ref(`${file[i].name}`).put(file[i])
                    storageRef.on("state_changed", snapshot => {
                        this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
                        this.label = file[i].name
                    }, error => {console.log(error)},
                        () => {
                            storageRef.snapshot.ref.getDownloadURL().then((url)=>{
                                this.files.push({
                                    file_name: file[i].name,
                                    type: file[i].type,
                                    file_size: file[i].size,
                                    url: url
                                })
                            })
                        }
                    )
                }
            } catch (error) {
                console.log(error.message);
            }
        },
        async hapusBerita(item){
            this.$bvModal.msgBoxConfirm(`Apakah Anda Yakin Ingin Menghapus Pengumuman "${item.judul_berita}"` , {
            title: 'Hapus Pengumuman',
            size: 'sm',
            buttonSize: 'sm',
            okVariant: 'danger',
            okTitle: 'Ya',
            cancelTitle: 'Tidak',
            footerClass: 'p-2',
            hideHeaderClose: true,
            centered: true
            })
            .then(async value=>{
                if(value == 0 || value == null){
                    this.$bvModal.hide()
                }else{
                    try {
                        await axios.delete(`https://beritaapi.fti.ukdw.ac.id/admin/${this.firebaseUID.uid}/delete-berita/${item.id}`)
                        .then(()=>{
                            this.$toast.open({
                                message: 'Berita Berhasil Dihapus',
                                type: 'success',
                                position: 'top'
                                });
                            this.getAllBerita()
                        })
                    } catch (error) {
                        this.$toast.open({
                            message: 'Berita Gagal Dihapus',
                            type: 'warning',
                            position: 'top'
                        });
                    }
                }
                
            })
            .catch(err => {
                console.log(err);
            })
        },
        hapusFile(file){
            this.files.splice(this.files.indexOf(file), 1)
        },
        hapusKomponenPengumuman() {
            this.isRemoveBerita = true
        },
        tambahKomponenPengumuman() {
            this.isRemoveBerita = false
            this.judulPengumuman = ''
            this.isiPengumuman = ''
            this.statusPenerima = null
            this.files = []
            this.itemBerita = []
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

.btn-general{
    display: flex;
    justify-content: center;
    background-color: white;
    color: #32a3df;
    transition: ease-in-out;
    transition-duration: 300ms;
    border-style: none;
    transition-delay: 100ms;
}
.btn-general:hover{
    background-color: #32a3df;
    color: white;
    border-style: none;
}
a:hover{
    text-decoration: none;
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
    flex: 1 1 350px;
    box-sizing: border-box;
    margin: 1rem .25em;
    position: relative; 
    display: flex; 
    flex-direction: column;
}
.card .footer{
    flex: 1 1 auto;
    position: relative; 
    display: flex; 
    flex-direction: column;
    justify-content: flex-end;
}
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
        grid-template-columns:repeat(auto-fit, minmax(400px,1fr)); 
        padding:0;
    }
}
ul{
    padding-inline-start: 0px !important;
}
.judul{
    text-align: left;
    font-size: 250%;
    font-weight: bold;
}
p{
    text-align: left;
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
#lihat-detail{
    border: #32a3df 1px solid;
}
#hapus-pengumuman{
    border: #ee1010 1px solid;
}
.deleteFile{
    color: #ee1010;
    padding: 0.2rem;
    border: none;
    border-radius: 10%;
    background-color: transparent;
}

.deleteFile:hover{
    color: white;
    background-color: #ee1010;
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
.button .hapusPengumuman{
    display: flex;
    color: #ee1010;
    background-color: transparent;
    border: none;
}
.button .hapusPengumuman:hover{
    color: white;
    background-color: #ee1010;
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
    background-color: grey;
    border-color: transparent;
    color: white;
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


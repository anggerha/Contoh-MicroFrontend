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
                <b-col>
                    <b-row>
                       <b-col>
                            <div align="center">
                                <b-button block id="listMenuAdmin" @click="toggle" :class="[showListMahasiswa ? 'active':'']" class="shadow btn-general">List Mahasiswa</b-button>
                            </div>
                       </b-col>
                       <b-col>
                            <div align="center" >
                                <b-button block id="listMenuAdmin"  @click="toggleBerita" :class="[showListPengumuman ? 'active':'']" class="shadow btn-general">List Pengumuman</b-button>
                            </div>
                       </b-col>
                    </b-row>
                    <hr>
                    <b-row class="mt-5">
                        <b-col>
                            <div v-if="isRemoveCatatan == false">
                                <CatatanMahasiswa :itemMahasiswa="itemMahasiswa"  :key="JSON.stringify(itemMahasiswa)" @clicked=onClickChildCatatan />
                            </div>
                            <div v-if="isRemoveProfile == false">
                                <MahasiswaProfile :item="item" :key="JSON.stringify(item)" @clicked=onClickChildProfile />
                            </div>
                        </b-col>
                    </b-row>
<!-- LIST MAHASISWA DOSEN -->
                    <div v-if="showListMahasiswa" class="list-mahasiswa">
                        <div style="margin-bottom: 2rem;" v-if="!loadingListMahasiswa">
                            <h4 v-if="semester == null && tahunAngkatan != ''">Daftar Mahasiswa Perwalian Tahun Ajaran {{ parseInt(tahunAngkatan) }}/{{ parseInt(tahunAngkatan)+1 }}</h4>
                            <h4 v-if="semester == null && tahunAngkatan == ''" >{{ getLastKodeSemester() }}</h4>
                            <h4 v-if="semester == 1">Daftar Mahasiswa Perwalian Tahun Ajaran {{ parseInt(tahunAngkatan) }}/{{ parseInt(tahunAngkatan)+1 }} Semester Ganjil</h4>
                            <h4 v-if="semester == 2">Daftar Mahasiswa Perwalian Tahun Ajaran {{ parseInt(tahunAngkatan) }}/{{ parseInt(tahunAngkatan)+1 }} Semester Genap</h4>
                        </div>
                        <b-row class="filter-kode-semester" align-h="end" no-gutters>
                            <b-col cols="auto" class="p-2">
                                <span>Filter: </span>
                            </b-col>
                            <b-col cols="auto" class="p-1">
                                <b-input maxlength="4" onkeypress="return event.charCode >= 48 && event.charCode <=57" v-model="tahunAngkatan" placeholder="Tahun angkatan"></b-input>
                            </b-col>
                            <b-col cols="auto" class="p-1">
                                <b-form-select v-model="semester" :options="options" @change="kodeSemesterFilter"></b-form-select>
                            </b-col>
                            <b-col cols="auto" class="p-1">
                                <input v-model="keyword" class="form-control" type="search" placeholder="Cari NIM, Nama, atau Status Mahasiswa" aria-label="Search" style="width: 20rem;">
                            </b-col>
                            <b-col cols="auto" class="p-1">
                                <b-button variant="danger" @click="getLastKodeSemester">reset</b-button>
                            </b-col>
                        </b-row>
                        <div v-if="loadingListMahasiswa && semester != null"  style="text-align:center;">
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
                                <ul class="daftar-perwalian" v-if="daftarPerwalian.length != 0">
                                    <li v-for="item in searchMahasiswa.slice(page*10-10,page*10 )" :key="item.id" style="display:inline; padding: 5px;">
                                        <b-container class="shadow p-2 mb-3 bg-white rounded" v-if="searchMahasiswa.length != 0">
                                            <div>
                                                <b-row style="align-items:center; margin-left: .2rem; display:flex; flex-wrap:wrap;">
                                                    <b-col cols="8">
                                                        <b-row>{{ item.nim }}</b-row>
                                                        <b-row>{{ item.nama_mahasiswa }}</b-row>
                                                    </b-col>
                                                </b-row>
                                                <div class="button-group justify-content-center">
                                                    <div class="button">
                                                        <a href="#catatanPerwalian">
                                                            <b-button style="margin: .2rem; border: 1px solid #32a3df;" @click="sendDataProfile(item)" class="send btn-general">
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
                                                            <b-button @click="sendDataCatatan(item, 'dosen')" style="margin: .2rem; border: 1px solid #32a3df;" data-toggle="tooltip" data-placement="top" title="Lihat Catatan Perwalian" type="button" class="send btn-general" >
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="1.4rem" height="1.4rem" fill="currentColor" class="bi bi-send-fill">
                                                                    <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/>
                                                                </svg>
                                                                    Lihat Catatan
                                                            </b-button>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </b-container>
                                    </li>
                                    <li v-if="searchMahasiswa.length == 0" style="text-align: center;">Tidak Dapat Menemukan Data dengan Keyword {{ keyword }}</li>
                                </ul>
                                <ul style="margin: auto; text-align: center;" v-if="daftarPerwalian == 0">
                                    <h3>Daftar Perwalian Pada Tahun {{ tahunAngkatan }} Semester <span v-if="semester == 1">Ganjil</span> <span v-if="semester == 2">Genap</span> Kosong</h3>
                                </ul>
                            </div>
                        </div>
                    </div>
<!-- LIST PENGUMUMAN -->
                    <div v-if="showListPengumuman">
                        <b-button block class="btn-buat-pengumuman" @click="tambahKomponenPengumuman" style="display:flex;justify-content:center;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                            </svg>&nbsp; Buat Pengumuman
                        </b-button>
                        <div id="form-pengumuman">
                            <div v-if="isRemovePengumuman == false" class="shadow-lg p-3 mb-5 bg-white rounded-4 field-pengumuman">
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
                                    <span style="margin-right: 1rem;">Kepada: {{ statusPenerima }}</span>
                                </div>
                                <b-input type="text" placeholder="Judul" style="margin-bottom:1rem;" v-model="judulPengumuman" v-if="itemBerita.length != 0" readonly></b-input>
                                <b-input type="text" placeholder="Judul" style="margin-bottom:1rem;" v-model="judulPengumuman" v-if="itemBerita.length == 0"></b-input>
                                <VueTrix v-model="isiPengumuman" v-if="itemBerita.length != 0" :disabled-editor="true" @hook:mounted="hapusTool"/>
                                <VueTrix v-model="isiPengumuman" v-if="itemBerita.length == 0" @hook:mounted="hapusTool"/>
                                <div v-if="itemBerita.length != 0">
                                    <b-form-file id="attachment" multiple ref="file-input" class="mb-2 mt-2" @change="handleAttachmentChanges" plain disabled>
                                        <label id="fileLabel">Choose file</label>
                                    </b-form-file>
                                    <b-progress-bar v-if="uploadValue != 0 && uploadValue != 100" :label="label + '   ' + Math.round(uploadValue) + '%'" :value="uploadValue" variant="primary"></b-progress-bar>
                                    <span v-if="files.length != 0">Attachment: </span><br>
                                    <div v-show="files.length != 0" v-for="attachment in files" :key="attachment.id">
                                        <a :href="attachment.url" target="_blank">{{ attachment.file_name }}</a>
                                        <span>&nbsp;</span>
                                    </div>
                                </div>
                                <div v-else> 
                                    <b-form-file id="attachment" multiple ref="file-input" class="mb-2 mt-2" @change="handleAttachmentChanges" plain>
                                        <label id="fileLabel">Choose file</label>
                                    </b-form-file>
                                    <b-progress-bar v-if="uploadValue != 0 && uploadValue != 100" :label="label + '   ' + Math.round(uploadValue) + '%'" :value="uploadValue" variant="primary"></b-progress-bar>
                                    <span v-if="files.length != 0">Attachment: </span><br>
                                    <div v-show="files.length != 0" v-for="attachment in files" :key="attachment.id">
                                        <a :href="attachment.url" target="_blank">{{ attachment.file_name }}</a>
                                        <span>&nbsp;</span>
                                        <span><button class="deleteFile" @click="hapusFile(attachment)">&#10005;</button></span>
                                    </div>
                                </div>
                                <p class="tanggalBerakhir">Tanggal Pengumuman Berakhir</p>
                                <b-input required placeholder="Tanggal Berakhir" type="datetime-local" v-model="periode_akhir"></b-input>
                                <div style="margin-top: 1rem;">
                                    <div class="button-group">
                                        <div v-if="itemBerita.length == 0" class="button">
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
                                                <span v-if="itemBerita.length == 0">Kirim</span>
                                                <span v-if="itemBerita.length != 0">Edit</span>
                                            </b-button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h4>Daftar Pengumuman</h4>
                        <div style="display: flex; margin:auto;">
                            <div id="judulFilter">Tanggal&nbsp;Dibuat:&nbsp;</div>
                            <b-input required placeholder="Tanggal Berakhir" type="date" v-model="filterTanggal" id="filterTanggal" @change="convertFilter(filterTanggal)"></b-input>
                            <div><b-button variant="danger" @click="resetFilter">reset</b-button></div>
                        </div>
                        <div v-if="loadingListPengumuman && !isPengumumanError"  style="text-align:center;">
                            <div class="loadingio-spinner-ellipsis-f9g8sm63oof"><div class="ldio-mr6hs88yhu">
                            <div></div><div></div><div></div><div></div><div></div>
                            </div></div>
                        </div>
                        <div v-if="!loadingListPengumuman && isPengumumanError">
                            <div style="text-align: center;">Pengumuman Masih Kosong</div> 
                        </div>
                        <div v-if="!loadingListPengumuman && !isPengumumanError">
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
                            <div v-if="listPengumuman.length != 0 && !isFilterActive">
                                <ul class="daftar-pengumuman">
                                    <li v-for="item in listPengumuman.slice(page*10-10,page*10 )" :key="item._id" style="display:inline; padding: 5px;">
                                        <b-container class="shadow p-2 mb-3 bg-white rounded">
                                            <div>
                                                <div>
                                                    <b-col>
                                                        <!-- <span v-if="!item.isExpired" class="badge badge-pill badge-success" id="pillStatus"></span> -->
                                                        <span v-if="item.isExpired" class="badge badge-pill badge-warning" id="pillStatus">Expired</span>
                                                    </b-col>
                                                </div>
                                                <div class="card-body">
                                                    <p style=" font-size:calc(85% + 0.5vw);font-weight:bold;border-bottom:1px solid #32a3df;">{{item.judul}}</p>
                                                      <div>{{item.tanggal.format('LLLL')}}</div>
                                                <div v-html="item.pengumuman"></div>
                                                <span v-if="item.file.length != 0">Attachment Pengumuman: </span><br>
                                                <div v-show="item.file.length != 0" v-for="attachment in item.file" :key="attachment.id">
                                                    <span><a :href="attachment.url" target="_blank">{{ attachment.file_name }}</a></span>
                                                </div>
                                                </div>
                                                <div class="text-muted">
                                                    <b-col>
                                                        Tanggal Berakhir: {{item.periode_akhir.format('LLLL')}}
                                                    </b-col> 
                                                </div>
                                                <div class="button">
                                                    <a href="#form-pengumuman">
                                                        <b-button block @click="sendDataBerita(item)" style="margin: 0.2rem; justify-content: center;" data-toggle="tooltip" data-placement="top" title="Lihat Catatan Perwalian" type="button" class="send btn-general" >
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
                            <div v-if="listPengumuman.length != 0 && isFilterActive">
                                <ul class="daftar-pengumuman">
                                    <li v-for="item in hasilFilter.slice(page*10-10,page*10 )" :key="item._id" style="display:inline; padding: 5px;">
                                        <b-container class="shadow p-2 mb-3 bg-white rounded">
                                            <div>
                                                <div>
                                                    <b-col>
                                                        <!-- <span v-if="!item.isExpired" class="badge badge-pill badge-success" id="pillStatus">Active</span> -->
                                                        <span v-if="item.isExpired" class="badge badge-pill badge-warning" id="pillStatus">Expired</span>
                                                    </b-col>
                                                </div>
                                                <div class="card-body">
                                                    <p style=" font-size:calc(85% + 0.5vw);font-weight:bold;border-bottom:1px solid #32a3df;">{{item.judul}}</p>
                                                      <div>{{item.tanggal.format('LLLL')}}</div>
                                                <div v-html="item.pengumuman"></div>
                                                <span v-if="item.file.length != 0">Attachment: </span><br>
                                                <div v-show="item.file.length != 0" v-for="attachment in item.file" :key="attachment.id">
                                                    <span><a :href="attachment.url" target="_blank">{{ attachment.file_name }}</a></span>
                                                    <span>&nbsp;</span>
                                                    <span style=""><button class="deleteFile" @click="hapusFile">&#10005;</button></span>
                                                </div>
                                                </div>
                                                <div class="text-muted">
                                                    <b-col>
                                                        Tanggal Berakhir: {{item.periode_akhir.format('LLLL')}}
                                                    </b-col> 
                                                </div>
                                                <div class="button">
                                                    <a href="#form-pengumuman">
                                                        <b-button block @click="sendDataBerita(item)" style="margin: 0.2rem; justify-content: center;" data-toggle="tooltip" data-placement="top" title="Lihat Catatan Perwalian" type="button" class="send btn-general" >
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="1.4rem" height="1.4rem" fill="currentColor" class="bi bi-send-fill">
                                                                <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/>
                                                            </svg>
                                                            &nbsp;Lihat Detail
                                                        </b-button>
                                                    </a>
                                                </div>
                                            </div>
                                        </b-container>
                                        <!-- <a :href="url">{{ file_name }}</a> -->
                                    </li>
                                </ul>
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
import MahasiswaProfile from './MahasiswaProfile.vue'
import VueTrix from 'vue-trix'
import CatatanMahasiswa from './CatatanMahasiswa.vue'
import moment from 'moment'
export default {
    name: 'SRMPage',
    components: { MahasiswaProfile,VueTrix, CatatanMahasiswa },
    data() {
      return {
        fromPage:'dosen',
        user: [],
        loadingListMahasiswa: true,
        loadingListPengumuman: true,
        showListMahasiswa: true,
        showListPengumuman: false,
        isFilterActive: false,
        isRemoveCatatan: false,
        isRemoveProfile: false,
        isRemovePengumuman: true,
        isPengumumanError: false,
        firebaseUID: null,
        profile: [],
        fields: [ 'NAMA_MAHASISWA', 'nim'],
        daftarPerwalian: [],
        page: 1,
        jumlahPage: null,
        item: [],
        itemMahasiswa: [],
        listPengumuman: [],
        hasilFilter: [],
        files: [],
        imageData: null,
        semester: null,
        options: [
            { value: null, text: 'Pilih Semester', disabled:true },
            { value: '1', text: 'Gasal' },
            { value: '2', text: 'Genap' },
        ],
        isiPengumuman:'',
        judulPengumuman:'',
        periode_akhir: null,
        filterTanggal:null,
        isTanggalSama: null,
        pengumumanButton: false,
        now: null,
        itemBerita: [],
        tahunAngkatan: '',

        kodeSemesterTerbaru: '',
        uploadValue: 0,
        label: '',
        daftarStatusMahasiswa: [
            { text: 'Status Mahasiswa', value: 'null', disabled: true },
            { text: 'Kirim ke Semua Mahasiswa', value: 'all' },
            { text: 'Aktif', value: 'aktif' },
            { text: 'Tidak Aktif', value: 'tidak_aktif' },
            { text: 'Alumni', value: 'alumni' }
        ],
        statusPenerima: null,
        keyword: ''
      }
    },
    // watch: {
    //     files: {
    //         handler: "fileLimit"
    //     }
    // },
    created(){
        if(sessionStorage.getItem('firebase-token') && sessionStorage.getItem('firebase-uid')){
            this.firebaseUID = JSON.parse(sessionStorage.getItem('firebase-uid'))
            this.getLastKodeSemester()
        } else {
            this.$router.replace('/login').then(() => { this.$router.go() })
        }
    },
    computed:{
        searchMahasiswa(){
            if(this.keyword != ''){
                var temp = this.daftarPerwalian.filter((item)=>{
                    if(item.status) {
                        return this.keyword.toLowerCase().split(' ').every(v => item.status.toLowerCase().includes(v) || item.nim.toLowerCase().includes(v) || item.nama_mahasiswa.toLowerCase().includes(v))
                    } else {
                        return this.keyword.toLowerCase().split(' ').every(v => item.nim.toLowerCase().includes(v) || item.nama_mahasiswa.toLowerCase().includes(v))
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
                this.jumlahPage = newVal.length/10
                this.page = 1
            }
        }
    },
    methods: {
        previewFiles(event) {
            console.log(event.target.files);
        },
        kodeSemesterFilter() {
            if(this.tahunAngkatan != '' && this.tahunAngkatan.length == 4){
                this.daftarPerwalian = []
                var kodeSemester = this.tahunAngkatan + this.semester
                this.getMahasiswaPerwalian(kodeSemester)
            } else {
                if(this.tahunAngkatan.length != 4){
                    this.$toast.open({
                        message: 'Tahun Tidak Valid',
                        type: 'error',
                        position: 'top'
                    });
                }
                if(this.tahunAnkatan == '') {
                    this.$toast.open({
                        message: 'Tahun Angkatan Tidak Boleh Kosong',
                        type: 'error',
                        position: 'top'
                    });
                }
                
            }
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
            this.showListPengumuman = false
            this.page = 1
            this.jumlahPage = null
        },
        toggleBerita() {
            this.showListMahasiswa = false
            this.showListPengumuman = true
            this.page = 1
            this.jumlahPage = null
            this.getAllPengumuman()
        },
        kembali() {
            this.$router.replace('/listMenu')
        },
        onClickChildCatatan(value){
            this.isRemoveCatatan = value
        },
        onClickChildProfile(value){
            this.isRemoveProfile = value
        },
        async getLastKodeSemester() {
            await axios.get(`https://waliapi.fti.ukdw.ac.id/dosen/${this.firebaseUID.uid}/list-mahasiswa/`).then((response) => {
                if(response.data.length != 0){
                    var temp = response.data.reverse()
                    this.tahunAngkatan = temp[0].kode_semester.slice(0, 4)
                    this.kodeSemesterTerbaru = temp[0].kode_semester
                    var kodeSemester = temp[0].kode_semester
                    this.getMahasiswaPerwalian(kodeSemester)
                    this.loadingListMahasiswa = false
                }
            })
        },
        async getMahasiswaPerwalian(kodeSemester) {
            try {
                await axios.get(`https://waliapi.fti.ukdw.ac.id/dosen/${this.firebaseUID.uid}/list-perwalian/${kodeSemester}`)
                .then((response) => {
                    this.daftarPerwalian = response.data
                    this.jumlahPage = this.daftarPerwalian.length/10
                    this.loadingListMahasiswa = false
                })
            } catch (error) {
                this.$toast.open({
                    message: 'Tidak Ada Mahasiswa Perwalian',
                    type: 'warning',
                    position: 'top'
                });
                this.jumlahPage=null
                this.loadingListMahasiswa = false
            }
        },
        sendDataProfile(item) {
            this.item = item
            this.isRemoveProfile = false
        },
        sendDataBerita(item) {
            this.isRemovePengumuman = false
            this.itemBerita = item
            this.periode_akhir = moment(item.periode_akhir).format('YYYY-MM-DDTHH:mm:ss')
            if(this.itemBerita.file.length != 0){
                this.files = item.file
            }
            if(item.judul){
                this.judulPengumuman = item.judul
                this.isiPengumuman = item.pengumuman
            }else{
                this.judulPengumuman = ''
                this.isiPengumuman = item.pengumuman
            }
            this.isRemoveBerita = false
        },
        sendDataCatatan(itemMahasiswa,fromPage) {
            this.itemMahasiswa = [itemMahasiswa,fromPage]
            this.isRemoveCatatan = false
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
            this.periode_akhir = null
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
                    } else if(this.isiPengumuman == '') {
                        this.$toast.open({
                            message: 'Pesan Gagal Terkirim, Isi Berita Tidak Boleh Kosong',
                            type: 'warning',
                            position: 'top'
                        });
                    } else if (this.periode_akhir == null) {
                        this.$toast.open({
                            message: 'Pengumuman Gagal Terkirim, semua field tidak boleh kosong',
                            type: 'warning',
                            position: 'top'
                        });
                    } else {
                        if(this.statusPenerima != null && this.judulPengumuman != '' && this.isiPengumuman != '' && this.periode_akhir != null) {
                            await axios.put(`https://waliapi.fti.ukdw.ac.id/dosen/${this.firebaseUID.uid}/update-pengumuman/${this.itemBerita.id}`, {
                                periode_akhir: moment(this.periode_akhir).locale('id').toString()
                            })
                            .then((response) => {
                                if(response.status == 201){
                                    this.$toast.open({
                                        dismissible: true,
                                        duration:0,
                                        message: 'Pengumuman Berhasil Disimpan',
                                        type: 'success',
                                        position: 'top'
                                    });
                                    this.getAllPengumuman()
                                } else {
                                    this.$toast.open({
                                        dismissible: true,
                                        duration:0,
                                        message: 'Pengumuman Gagal Disimpan pada ',
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
                    try {
                        if(this.statusPenerima == null || this.statusPenerima == ''){
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
                        } else if (this.periode_akhir == null) {
                            this.$toast.open({
                                message: 'Pengumuman Gagal Terkirim, Tanggal Tidak Bolek Kosong',
                                type: 'warning',
                                position: 'top'
                            });
                        } else{
                            if(this.judulPengumuman != '' && this.statusPenerima != null && this.isiPengumuman != '') {
                                await axios.post(`https://waliapi.fti.ukdw.ac.id/dosen/${this.firebaseUID.uid}/new-pengumuman`, {
                                    nama_dosen: this.profile.nama,
                                    email: this.profile.email,
                                    role: this.profile.role,
                                    kode_semester: this.kodeSemesterTerbaru,
                                    semester: this.kodeSemesterTerbaru.slice(4, 5),
                                    pengumuman: this.isiPengumuman,
                                    file: this.files,
                                    judul: this.judulPengumuman,
                                    periode_akhir: moment(this.periode_akhir).locale('id').toString()
                                })
                                .then(()=>{
                                    console.log(this.files);
                                    this.$toast.open({
                                        dismissible: true,
                                        duration:0,
                                        message: 'Pengumuman Berhasil Terkirim pada '+ moment().locale('id').toString() ,
                                        type: 'success',
                                        position: 'top'
                                    });
                                    this.isiPengumuman = ''
                                    this.judulPengumuman = ''
                                    this.statusPenerima = null
                                    this.periode_akhir = null
                                    this.files = []
                                })
                                this.getAllPengumuman()
                            } else {
                                this.$toast.open({
                                    message: 'Pengumuman Gagal Terkirim, Tanggal Tidak Bolek Kosong',
                                    type: 'warning',
                                    position: 'top'
                                });
                            }
                        }
                    } catch (error) {
                        console.log(error.response.data.message);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        },
        async getAllPengumuman(){
            this.page = 1
            this.jumlahPage = null
            try {
                    await axios.get(`https://waliapi.fti.ukdw.ac.id/dosen/${this.firebaseUID.uid}/list-pengumuman`).then((response)=>{
                    this.listPengumuman = response.data.reverse()
                    for(let i=0;i< this.listPengumuman.length;i++){
                    this.listPengumuman[i].tanggal = moment(this.listPengumuman[i].tanggal).locale('id')
                    this.listPengumuman[i].periode_akhir = moment(this.listPengumuman[i].periode_akhir).locale('id')
                    // let tanggalBerakhir = this.listPengumuman[i].tanggal.locale(id)
                    //     if(tanggalBerakhir.isBefore(moment().locale(id))){
                    //         this.pengumumanExpired = true
                    //     }else{
                    //         this.pengumumanExpired = false
                    //     } 
                    this.listPengumuman[i].isExpired = this.getPengumumanExpired(this.listPengumuman[i])
                    this.listPengumuman[i].judul = i+1 +'. '+ this.listPengumuman[i].judul            
                    }
                    this.now = moment().locale('id')
                    this.jumlahPage = this.listPengumuman.length/10
                    this.loadingListPengumuman = false
                    this.isPengumumanError = false;
                })
            } catch (error) {
                console.log(error);
                this.isPengumumanError = true;
                this.loadingListPengumuman = false;
            }
        },
        async convertFilter(tanggal){
            this.hasilFilter = []
            this.isFilterActive = true;
            this.page = 1
            this.jumlahPage = null
            var listPengumumanFilter = []
            try {                           
                    listPengumumanFilter = this.listPengumuman
                    for(let i=0;i<listPengumumanFilter.length;i++){
                    listPengumumanFilter[i].periode_akhir = moment(listPengumumanFilter[i].periode_akhir).locale('id')
                    listPengumumanFilter[i].tanggal = moment(listPengumumanFilter[i].tanggal).locale('id')
                    this.filterTanggal = moment(tanggal).locale('id').toString()
                    this.filterTanggal = moment(tanggal).locale('id')
                    this.isTanggalSama =moment(this.filterTanggal).isSame(listPengumumanFilter[i].tanggal,'day')
                    listPengumumanFilter[i].isTanggalSama = this.isTanggalSama
                    listPengumumanFilter[i].isExpired = this.getPengumumanExpired(listPengumumanFilter[i])
                    
                        if(listPengumumanFilter[i].isTanggalSama){
                            this.hasilFilter.push(listPengumumanFilter[i])
                        }
                    }
                    this.now = moment().locale('id')
                    this.jumlahPage = this.hasilFilter.length/10
                    this.loadingListPengumuman = false
                    this.filterTanggal = moment(tanggal).format('YYYY-MM-DD')
                    
             
                if(this.hasilFilter.length == 0){
                    this.isPengumumanError = true
                }else{
                    this.isPengumumanError = false
                }
            } catch (error) {
                console.log(error);
                this.isPengumumanError = true;
                this.loadingListPengumuman = false;
            }
            
        },
        resetFilter(){
            this.filterTanggal = null
            this.hasilFilter = []
            this.isFilterActive = false
            this.getAllPengumuman()
        },
        getPengumumanExpired(pengumuman){
            return pengumuman.periode_akhir.isBefore(moment().locale('id'))
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
        // fileLimit() {
        //     const del = document.querySelector(".trix-button--icon-attach");
        //     if(this.files.length != 0){                
        //         del.style.display = 'none'
        //     } else {
        //         del.style.display = ''
        //     }
        // },
        hapusKomponenPengumuman() {
            this.isRemovePengumuman = true
        },
        tambahKomponenPengumuman() {
            this.isRemovePengumuman = false
            this.judulPengumuman = ''
            this.isiPengumuman = ''
            this.statusPenerima = null
            this.files = []
            this.periode_akhir = null
            this.itemBerita = []
        },
        hapusFile(file){
            this.files.splice(this.files.indexOf(file), 1)
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
    .daftar-pengumuman{
        display: grid; 
        grid-template-columns:repeat(auto-fit, minmax(500px,1fr)); 
        padding:0;
    }
    .daftar-perwalian{
        display: grid; 
        grid-template-columns:repeat(auto-fit, minmax(500px,1fr)); 
        padding:0;
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
.form-file-text{
    display: none;
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
#judulFilter{
    width: fit-content;
    display: inline-block;
    margin: auto;
}
ul{
    padding-inline-start: 0px;
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
  transform-origin: 0 0;
}
.ldio-mr6hs88yhu div { box-sizing: content-box; }
.list-mahasiswa {
    margin-top: 3rem;
}
</style>


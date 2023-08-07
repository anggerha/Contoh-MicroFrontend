<template>
    <div class="canvas">
        <b-button class="kembali" @click="kembali">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
            </svg>
            Kembali
        </b-button>
        <h5>Form Data</h5>
        <b-form ref="formInput" class="form">
            <b-form-group id="input-group-1" label="Jenis Jadwal" label-for="input-1">
                <b-form-select
                id="input-1"
                v-model="form.jenis_jadwal"
                :options="optionKlasifikasi"
                @change="optionType"
                required
                ></b-form-select>
            </b-form-group>
<!-- Mata Kuliah -->
            <div v-if="form.jenis_jadwal == 'jadwal_ujian_mata_kuliah'">
                <b-form-group id="input-group-2" label="Jenis Ujian" label-for="input-2">
                    <b-form-select
                    id="input-2"
                    v-model="form.topik_jadwal"
                    :options="optionTopik"
                    @change="namaKegiatan"
                    required
                    ></b-form-select>
                </b-form-group>

                <b-form-group id="input-group-3" label="Nama Matakuliah" label-for="input-3">
                    <v-select label="nama_matkul" :options="listMatkul"  v-model="form.selected" @input="namaKegiatan"></v-select>
                </b-form-group>

                <b-form-group
                    id="input-group-4"
                    label="Nama Kegiatan"
                    label-for="input-4"
                >
                    <b-form-input
                    id="input-4"
                    v-model="form.nama_kegiatan"
                    type="text"
                    placeholder="Nama Kegiatan"
                    readonly
                    required
                    ></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-5" label="Tanggal Ujian" label-for="input-5">
                    <b-form-input
                    id="input-5"
                    v-model="form.tanggal_mulai"
                    type="datetime-local"
                    placeholder="Tanggal Ujian"
                    required
                    ></b-form-input>
                </b-form-group>

                <b-button class="btn" @click="submit" variant="primary">Submit</b-button>
                <b-button class="btn" @click="reset" variant="danger">Reset</b-button>
            </div>
          
<!-- Jadwal Khusus -->
            <div v-if="form.jenis_jadwal == 'jadwal_khusus'">
                <b-form-group id="input-group-2" label="Topik Jadwal" label-for="input-2">
                    <b-form-select
                    id="input-2"
                    v-model="form.topik_jadwal"
                    :options="optionTopik"
                    required
                    ></b-form-select>
                </b-form-group>

                <b-form-group
                    id="input-group-3"
                    label="Nama Kegiatan"
                    label-for="input-3"
                >
                    <b-form-input
                    id="input-3"
                    v-model="form.nama_kegiatan"
                    type="text"
                    placeholder="Nama Kegiatan"
                    required
                    ></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-4" label="Tanggal Mulai" label-for="input-4">
                    <b-form-input
                    id="input-4"
                    v-model="form.tanggal_mulai"
                    type="date"
                    placeholder="Tanggal Mulai"
                    required
                    ></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-5" label="Tanggal Selesai" label-for="input-5">
                    <b-form-input
                    id="input-5"
                    v-model="form.tanggal_selesai"
                    type="date"
                    placeholder="Tanggal Selesai"
                    required
                    ></b-form-input>
                </b-form-group>

                <b-button class="btn" @click="submit" variant="primary">Submit</b-button>
                <b-button class="btn" @click="reset" variant="danger">Reset</b-button>
            </div>
<!-- Jadwal Ujian -->
            <div v-if="form.jenis_jadwal == 'jadwal_ujian'">
                <b-form-group id="input-group-2" label="Topik Jadwal" label-for="input-2">
                    <b-form-select
                    id="input-2"
                    v-model="form.topik_jadwal"
                    :options="optionTopik"
                    required
                    ></b-form-select>
                </b-form-group>

                <b-form-group
                    id="input-group-3"
                    label="Nama Kegiatan"
                    label-for="input-3"
                >
                    <b-form-input
                    id="input-3"
                    v-model="form.nama_kegiatan"
                    type="text"
                    placeholder="Nama Kegiatan"
                    required
                    ></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-4" label="Tanggal Mulai" label-for="input-4">
                    <b-form-input
                    id="input-4"
                    v-model="form.tanggal_mulai"
                    type="date"
                    placeholder="Tanggal Mulai"
                    required
                    ></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-5" label="Tanggal Selesai" label-for="input-5">
                    <b-form-input
                    id="input-5"
                    v-model="form.tanggal_selesai"
                    type="date"
                    placeholder="Tanggal Selesai"
                    required
                    ></b-form-input>
                </b-form-group>

                <b-button class="btn" @click="submit" variant="primary">Submit</b-button>
                <b-button class="btn" @click="reset" variant="danger">Reset</b-button>
            </div>
<!-- Pembayaran -->
            <div v-if="form.jenis_jadwal == 'pembayaran'">
                <b-form-group id="input-group-2" label="Topik Pembayaran" label-for="input-2">
                    <b-form-select
                    id="input-2"
                    v-model="form.topik_jadwal"
                    :options="optionTopik"
                    required
                    ></b-form-select>
                </b-form-group>

                <b-form-group
                    id="input-group-3"
                    label="Nama Pembayaran"
                    label-for="input-3"
                >
                    <b-form-input
                    id="input-3"
                    v-model="form.nama_kegiatan"
                    type="text"
                    placeholder="Nama Pembayaran"
                    required
                    ></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-4" label="Tanggal Mulai" label-for="input-4">
                    <b-form-input
                    id="input-4"
                    v-model="form.tanggal_mulai"
                    type="datetime-local"
                    placeholder="Tanggal Mulai"
                    required
                    ></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-5" label="Tanggal Selesai" label-for="input-5">
                    <b-form-input
                    id="input-5"
                    v-model="form.tanggal_selesai"
                    type="datetime-local"
                    placeholder="Tanggal Selesai"
                    required
                    ></b-form-input>
                </b-form-group>

                <b-button class="btn" @click="submit" variant="primary">Submit</b-button>
                <b-button class="btn" @click="reset" variant="danger">Reset</b-button>
            </div>
<!-- Informasi Umum -->
            <div v-if="form.jenis_jadwal == 'informasi_umum'">
                <b-form-group id="input-group-2" label="Topik Informasi Umum" label-for="input-2">
                    <b-form-select
                    id="input-2"
                    v-model="form.topik_jadwal"
                    :options="optionTopik"
                    required
                    ></b-form-select>
                </b-form-group>

                <b-form-group
                    id="input-group-3"
                    label="Pertanyaan"
                    label-for="input-3"
                >
                    <b-form-input
                    id="input-3"
                    v-model="form.nama_kegiatan"
                    type="text"
                    placeholder="Pertanyaan"
                    required
                    ></b-form-input>
                </b-form-group>

                <b-form-group
                    id="input-group-4"
                    label="Jawaban"
                    label-for="input-4"
                >
                    <b-form-textarea
                    id="textarea"
                    placeholder="Jawaban"
                    rows="3"
                    max-rows="6"
                ></b-form-textarea>
                </b-form-group>

                <!-- <b-form-group id="input-group-4" label="Tanggal Mulai" label-for="input-4">
                    <b-form-input
                    id="input-4"
                    v-model="form.tanggal_mulai"
                    type="datetime-local"
                    placeholder="Tanggal Mulai"
                    required
                    ></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-5" label="Tanggal Selesai" label-for="input-5">
                    <b-form-input
                    id="input-5"
                    v-model="form.tanggal_selesai"
                    type="datetime-local"
                    placeholder="Tanggal Selesai"
                    required
                    ></b-form-input>
                </b-form-group> -->

                <b-button class="btn" @click="submit" variant="primary">Submit</b-button>
                <b-button class="btn" @click="reset" variant="danger">Reset</b-button>
            </div>
        </b-form>
        <div>
            <b-row class="list">
                <b-col cols="12" md="4" lg="3" xl="3">
                    <h5 class="judul-kategori">List Jadwal Khusus</h5>
                    <b-row v-if="jumlahPageJadwalKhusus !=null" class="pagination">
                        <b-col>
                            <b-button class="page" id="prev" :disabled="pageJadwalKhusus <=1" @click="pageJadwalKhusus -=1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                                </svg>
                            </b-button>
                        </b-col>
                        <b-col style="text-align:center; margin:auto;">
                            {{pageJadwalKhusus}}/{{Math.ceil(jumlahPageJadwalKhusus)}}
                        </b-col>
                        <b-col>
                            <b-button class="page" id="next" :disabled="pageJadwalKhusus >= jumlahPageJadwalKhusus" @click="pageJadwalKhusus +=1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                                </svg>
                            </b-button>
                        </b-col>
                    </b-row>
                    <div v-for="item in listJadwalKhusus" :key="item._id" class="listCard shadow p-3 mb-2 bg-white rounded">
                        <!-- <div class="isiList" v-if="isMobile">   
                            <h5>{{item.nama_kegiatan}}</h5>
                            <p>{{item.kode_semester}}</p>
                            <p><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-calendar3" viewBox="0 0 16 16">
                                <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z"/>
                                <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                                </svg> {{item.tanggal_mulai}} s.d {{item.tanggal_selesai}}
                            </p>
                        </div> -->
                        <div class="isiList" >   
                            <h6>{{item.nama_kegiatan}}</h6>
                            <div>
                                <p><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-calendar3" viewBox="0 0 16 16">
                                <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z"/>
                                <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                                </svg> {{item.tanggal_mulai}} s.d {{item.tanggal_selesai}}
                            </p>
                            </div>
                        </div>
                    </div>
                </b-col>
                <!-- list Jadwal Ujian -->
                <b-col cols="12" md="4" lg="3" xl="3">
                    <h5 class="judul-kategori">List Jadwal Ujian</h5>
                    <b-row v-if="jumlahPageJadwalUjian !=null" class="pagination">
                        <b-col>
                            <b-button class="page" id="prev" :disabled="pageJadwalUjian <=1" @click="pageJadwalUjian -=1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                                </svg>
                            </b-button>
                        </b-col>
                        <b-col style="text-align:center; margin:auto;">
                            {{pageJadwalUjian}}/{{Math.ceil(jumlahPageJadwalUjian)}}
                        </b-col>
                        <b-col>
                            <b-button class="page" id="next" :disabled="pageJadwalUjian >= jumlahPageJadwalUjian" @click="pageJadwalUjian +=1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                                </svg>
                            </b-button>
                        </b-col>
                    </b-row>
                    <div v-if="listJadwalUjian.length != 0">
                        <div v-for="item in listJadwalUjian" :key="item._id" class="listCard shadow p-3 mb-2 bg-white rounded">
                            <div class="isiList" >   
                                <h6>{{ item.nama_kegiatan }}</h6>
                                <p><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-calendar3" viewBox="0 0 16 16">
                                    <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z"/>
                                    <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                                    </svg> {{item.tanggal_mulai}} s.d {{item.tanggal_selesai}}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div v-if="listJadwalUjian.length">

                    </div>
                </b-col>
                <!-- list jadwal ujian matkul -->
                <b-col cols="12" md="4" lg="3" xl="3">
                    <h5 class="judul-kategori">List Jadwal Ujian Matakuliah</h5>
                    <b-row v-if="jumlahPageJadwalUjianMatkul !=null" class="pagination">
                        <b-col>
                            <b-button class="page" id="prev" :disabled="pageJadwalUjianMatkul <=1" @click="pageJadwalUjianMatkul -=1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                                </svg>
                            </b-button>
                        </b-col>
                        <b-col style="text-align:center; margin:auto;">
                            {{pageJadwalUjianMatkul}}/{{Math.ceil(jumlahPageJadwalUjianMatkul)}}
                        </b-col>
                        <b-col>
                            <b-button class="page" id="next" :disabled="pageJadwalUjianMatkul >= jumlahPageJadwalUjianMatkul" @click="pageJadwalUjianMatkul +=1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                                </svg>
                            </b-button>
                        </b-col>
                    </b-row>
                    <div v-for="item in listJadwalUjianMatkul.slice(pageJadwalUjianMatkul*5-5,pageJadwalUjianMatkul*5)" :key="item._id" class="listCard shadow p-3 mb-2 bg-white rounded">
                        <div class="isiList" >   
                            <h6>{{ item.nama_kegiatan }}</h6>
                            <p><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-calendar3" viewBox="0 0 16 16">
                                <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z"/>
                                <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                                </svg> {{item.tanggal_mulai}}
                            </p>
                        </div>
                    </div>
                </b-col>
                <!-- list jadwal pembayaran -->
                <b-col cols="12" md="4" lg="3" xl="3">
                    <h5 class="judul-kategori">List Jadwal Pembayaran</h5>
                    <b-row v-if="jumlahPageJadwalPembayaran !=null" class="pagination">
                        <b-col>
                            <b-button class="page" id="prev" :disabled="pageJadwalPembayaran <=1" @click="pageJadwalPembayaran -=1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                                </svg>
                            </b-button>
                        </b-col>
                        <b-col style="text-align:center; margin:auto;">
                            {{pageJadwalPembayaran}}/{{Math.ceil(jumlahPageJadwalPembayaran)}}
                        </b-col>
                        <b-col>
                            <b-button class="page" id="next" :disabled="pageJadwalPembayaran >= jumlahPageJadwalPembayaran" @click="pageJadwalPembayaran +=1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                                </svg>
                            </b-button>
                        </b-col>
                    </b-row>
                    <div v-for="item in listJadwalPembayaran" :key="item._id" class="listCard shadow p-3 mb-2 bg-white rounded">
                        <div class="isiList" >   
                            <h6>{{item.nama_kegiatan}}</h6>
                            <p><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-calendar3" viewBox="0 0 16 16">
                                <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z"/>
                                <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                                </svg> {{item.tanggal_mulai}} s.d {{item.tanggal_selesai}}
                            </p>
                        </div>
                    </div>
                </b-col>
                <!-- list informasi umum -->
                <!-- <b-col cols="12">
                    <h5 class="judul-kategori">List Informasi Umum</h5>
                    <b-row v-if="jumlahPageJadwalPembayaran !=null" class="pagination">
                        <b-col>
                            <b-button class="page" id="prev" :disabled="pageJadwalPembayaran <=1" @click="pageJadwalPembayaran -=1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                                </svg>
                            </b-button>
                        </b-col>
                        <b-col style="text-align:center; margin:auto;">
                            {{pageJadwalPembayaran}}/{{Math.ceil(jumlahPageJadwalPembayaran)}}
                        </b-col>
                        <b-col>
                            <b-button class="page" id="next" :disabled="pageJadwalPembayaran >= jumlahPageJadwalPembayaran" @click="pageJadwalPembayaran +=1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                                </svg>
                            </b-button>
                        </b-col>
                    </b-row>
                    <div v-for="item in listJadwalPembayaran" :key="item._id" class="listCard shadow p-3 mb-2 bg-white rounded">
                        <div class="isiList" >   
                            <h6>{{item.nama_kegiatan}}</h6>
                            <p><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-calendar3" viewBox="0 0 16 16">
                                <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z"/>
                                <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                                </svg> {{item.tanggal_mulai}} s.d {{item.tanggal_selesai}}
                            </p>
                        </div>
                    </div>
                </b-col> -->
            </b-row>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

export default {
    name: 'FormData',
    data(){
        return {
            firebaseUID: '',
            form: {
                jenis_jadwal: null,
                topik_jadwal: null,
                nama_kegiatan: '',
                selected: { nama_matkul: ''},
                tanggal_mulai: '',
                tanggal_selesai: '',
                attachment: null,
                // pertanyaan: '',
                // jawaban: ''
            },
            optionKlasifikasi: [
                { text: 'Pilih Jenis Jadwal', value: null, disabled: true },
                { text: 'Jadwal Ujian Mata Kuliah', value: 'jadwal_ujian_mata_kuliah' },
                { text: 'Jadwal Khusus', value: 'jadwal_khusus' },
                { text: 'Jadwal Ujian', value: 'jadwal_ujian' },
                { text: 'Pembayaran', value: 'pembayaran' },
                // { text: 'Informasi Umum', value: 'informasi_umum' }
            ],
            optionTopik: [],
            listMatkul: [],
            listJadwalUjian: [],
            listJadwalUjianMatkul: [],
            listJadwalKhusus: [],
            listJadwalPembayaran: [],
            isMobile: false,
            jumlahPageJadwalKhusus: null,
            pageJadwalKhusus: 1,
            jumlahPageJadwalUjian: null,
            pageJadwalUjian: 1,
            jumlahPageJadwalUjianMatkul: null,
            pageJadwalUjianMatkul: 1,
            jumlahPageJadwalPembayaran: null,
            pageJadwalPembayaran: 1
        }
    },
    created() {
        if(sessionStorage.getItem('firebase-token') && sessionStorage.getItem('firebase-uid')){
            this.firebaseUID = JSON.parse(sessionStorage.getItem('firebase-uid'))
            this.getListMatkul()
            this.getListJadwalKhusus()
            this.getListJadwalPembayaran()
            this.getListJadwalUjian()
            this.getListJadwalUjianMatkul()
        }
    },
    methods: {
        kembali() {
            this.$router.replace('/srm/AdminPage')
        },
        onResize () {
            this.isMobile = window.innerWidth < 600
        },
        async getListMatkul(){
            try {
                await axios.get(`https://beritaapi.fti.ukdw.ac.id/admin/${this.firebaseUID.uid}/list-matkul`).then((response)=>{
                    this.listMatkul = response.data
                })
            } catch (error) {
                console.log(error);
            }
        },
        async getListJadwalUjian(){
            try {
                await axios.get(`https://beritaapi.fti.ukdw.ac.id/admin/${this.firebaseUID.uid}/jadwal-ujian`).then((response)=>{
                    this.listJadwalUjian = response.data.reverse()
                    for(var i=0; i < this.listJadwalUjian.length; i++){
                        this.listJadwalUjian[i].tanggal_mulai = moment(this.listJadwalUjian[i].tanggal_mulai).locale('id').format("DD-MM-YYYY")
                        this.listJadwalUjian[i].tanggal_selesai = moment(this.listJadwalUjian[i].tanggal_selesai).locale('id').format("DD-MM-YYYY")
                    }
                    this.jumlahPageJadwalUjian = this.listJadwalUjian.length/5
                    this.pageJadwalUjian = 1
                })
            } catch (error) {
                console.log(error);
            }
        },
        async getListJadwalUjianMatkul(){
            try {
                await axios.get(`https://beritaapi.fti.ukdw.ac.id/admin/${this.firebaseUID.uid}/jadwal-ujian-matkul`).then((response)=>{
                    this.listJadwalUjianMatkul = response.data.reverse()
                    this.jumlahPageJadwalUjianMatkul = this.listJadwalUjianMatkul.length/5
                    this.pageJadwalUjianMatkul = 1
                    // console.log(response.data);
                })
            } catch (error) {
                console.log(error);
            }
        },
        async getListJadwalKhusus(){
            try {
                await axios.get(`https://beritaapi.fti.ukdw.ac.id/admin/${this.firebaseUID.uid}/jadwal-khusus`).then((response)=>{
                    this.listJadwalKhusus = response.data.reverse()
                    for(var i=0; i < this.listJadwalKhusus.length; i++){
                        this.listJadwalKhusus[i].tanggal_mulai = moment(this.listJadwalKhusus[i].tanggal_mulai).locale('id').format("DD-MM-YYYY")
                        this.listJadwalKhusus[i].tanggal_selesai = moment(this.listJadwalKhusus[i].tanggal_selesai).locale('id').format("DD-MM-YYYY")
                    }
                    this.jumlahPageJadwalKhusus = this.listJadwalKhusus.length/5
                    this.pageJadwalKhusus = 1
                    // console.log(this.listJadwalKhusus);
                })
            } catch (error) {
                console.log(error);
            }
        },
        async getListJadwalPembayaran(){
            try {
                await axios.get(`https://beritaapi.fti.ukdw.ac.id/admin/${this.firebaseUID.uid}/jadwal-pembayaran`).then((response)=>{
                    this.listJadwalPembayaran = response.data.reverse()
                    this.jumlahPageJadwalPembayaran = this.listJadwalPembayaran.length/5
                    this.pageJadwalPembayaran = 1
                })
            } catch (error) {
                console.log(error);
            }
        },
        async submit() {
            try {
                await axios.post(`https://beritaapi.fti.ukdw.ac.id/admin/${this.firebaseUID.uid}/new-jadwal`, this.form).then((response) => {
                    this.$toast.open({
                        message: 'Form ' + this.form.nama_kegiatan + ' Berhasil Disimpan',
                        type: 'success',
                        position: 'top'
                    });
                    if(this.form.jenis_jadwal == 'jadwal_ujian_mata_kuliah'){
                        // console.log(response);
                        this.getListJadwalUjianMatkul()
                    }else if(this.form.jenis_jadwal == 'jadwal_ujian'){
                        this.getListJadwalUjian()
                    }else if(this.form.jenis_jadwal =='jadwal_khusus'){
                        this.getListJadwalKhusus()
                    }else if(this.form.jenis_jadwal == 'pembayaran'){
                        this.getListJadwalPembayaran()
                    }else{
                        console.log(response);
                    }
                    this.form.jenis_jadwal = null,
                    this.form.topik_jadwal = '',
                    this.form.nama_kegiatan = '',
                    this.form.selected = { nama_matkul: ''},
                    this.form.tanggal_mulai = '',
                    this.form.tanggal_selesai = '',
                    this.form.attachment = null

                })
            } catch (error) {
                console.log(error);
            }
        },
        reset() {
            this.form.jenis_jadwal = null,
            this.form.topik_jadwal = null,
            this.form.nama_kegiatan = '',
            this.form.selected = { nama_matkul: ''},
            this.form.tanggal_mulai = '',
            this.form.tanggal_selesai = '',
            this.form.attachment = null
        },
        optionType(){
            this.form.topik_jadwal = null,
            this.form.nama_kegiatan = '',
            this.form.selected = { nama_matkul: ''},
            this.form.tanggal_mulai = '',
            this.form.tanggal_selesai = '',
            this.form.attachment = null
            if (this.form.jenis_jadwal == 'jadwal_khusus'){
                this.optionTopik = [
                    { text: 'Pilih Jadwal Khusus', value: null, disabled: true },
                    { text: 'KKN', value: 'kkn' },
                    { text: 'Kuliah Umum', value: 'kuliah_umum' },
                    { text: 'Registrasi', value: 'registrasi' },
                    { text: 'Wisuda', value: 'wisuda' },
                    { text: 'Perwalian', value: 'perwalian' }
                ]
            } else if (this.form.jenis_jadwal == 'jadwal_ujian_mata_kuliah'){
                this.optionTopik = [
                    { text: 'Pilih Jenis Ujian', value: null, disabled: true },
                    { text: 'UTS', value: 'uts' },
                    { text: 'UAS', value: 'uas' },
                ]
            } else if (this.form.jenis_jadwal == 'jadwal_ujian'){
                this.optionTopik = [
                    { text: 'Pilih Jenis Ujian', value: null, disabled: true },
                    { text: 'UTS', value: 'uts' },
                    { text: 'UAS', value: 'uas' },
                ]
            } else if (this.form.jenis_jadwal == 'pembayaran') {
                this.optionTopik = [
                    { text: 'Pilih Jenis Pembayaran', value: null, disabled: true },
                    { text: 'SPP', value: 'spp' },
                    { text: 'Pendadaran', value: 'pendadaran' },
                    { text: 'Wisuda', value: 'wisuda' }
                ]
            } 
            // else if (this.form.jenis_jadwal == 'informasi_umum') {
            //     this.optionTopik = [
            //         { text: 'Pilih Jenis Informasi Umum', value: null, disabled: true },
            //         { text: 'Informatika', value: 'informatika' },
            //         { text: 'Sistem Informasi', value: 'sistem_informasi' },
            //         { text: 'UKDW', value: 'ukdw' },
            //         { text: 'Beasiswa', value: 'beasiswa' }        
            //     ]
            // }
        },
        namaKegiatan() {
            if(this.form.topik_jadwal != '' && this.form.topik_jadwal != null && this.form.selected != null){
                if(this.form.selected ){
                    this.form.nama_kegiatan = this.form.topik_jadwal.toUpperCase() + ' ' + this.form.selected.nama_matkul
                } else {
                    this.form.nama_kegiatan = this.form.topik_jadwal.toUpperCase()
                }
            }
        }
    }
}
</script>

<style scoped>
.canvas{
    @media only screen and (max-width: 600px) {
        margin: 0 1rem;
        .col-12{
            margin-bottom: 2rem;
        }
    }
    margin: 0 4rem;
}
.kembali{
    display: flex;
    border-style: none;
    background-color: transparent;
    color: black;
    margin: 0.25rem;
}
.kembali:hover{
    background-color: #32a3df;
    color: white;
}
.btn{
    margin-top: 1rem;
}
.listCard{
    /* border: #32a3df solid 1px; */
    margin-bottom: 0.1rem;
}
.isiList{
    margin: 0.5rem;
}
.judul-kategori {
    text-align: center;
}
svg{
    display: inline-flex;
}
button#next{
    float: right;
}
.pagination{
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
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
.page:hover{
    color: white !important;
    background-color: #32a3df;
    border-color: #32a3df;
    border: none;
}
.page:visited{
    color: white !important;
    background-color: #32a3df;
    border: none;
}
.list{
    margin-top: 2rem;
}
</style>
<template>
    <div class="canvas">
        <b-button class="kembali" @click="kembali">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
            </svg>
            Kembali
        </b-button>
        <h5>Form Data</h5>
        <b-form ref="formInput" class="form" id="inputForm">
            <b-form-group v-if="tempForm.jenis_jadwal == null || this.id == null" id="input-group-1" label="Jenis Jadwal" label-for="input-1">
                <b-form-select
                id="input-1"
                v-model="form.jenis_jadwal"
                :options="optionKlasifikasi"
                @change="optionType"
                required
                ></b-form-select>
            </b-form-group>
            <b-form-group v-if="tempForm.jenis_jadwal != null && this.id != null" id="input-group-1" label="Jenis Jadwal" label-for="input-1">
                <b-form-select
                id="input-1"
                v-model="tempForm.jenis_jadwal"
                :options="optionKlasifikasi"
                disabled
                required
                ></b-form-select>
            </b-form-group>
<!-- Ujian Mata Kuliah -->
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
                    <v-select label="placeholder" :options="listMatkul"  v-model="form.selected" @input="namaKegiatan"></v-select>
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

                <div style="float: right; ">
                    <b-button class="btn" style="margin: 0.5rem;" @click="submit" variant="primary">Submit</b-button>
                    <b-button class="btn" style="margin: 0.5rem;" @click="reset" variant="danger">Reset</b-button>
                </div>
                
            </div>
          
<!-- Jadwal Khusus -->
            <div v-if="form.jenis_jadwal == 'jadwal_khusus'">
                <b-row>
                    <b-col>
                        <b-form-group id="input-group-2" label="Topik Jadwal" label-for="input-2">
                            <b-form-select
                            id="input-2"
                            v-model="form.topik_jadwal"
                            :options="optionTopik"
                            @change="namaKegiatan"
                            required
                            ></b-form-select>
                        </b-form-group>
                    </b-col>
                    <b-col v-if="form.topik_jadwal == 'p3dm' || form.topik_jadwal == 'p2kmm'">
                        <b-form-group id="input-group-gelombang" label="Gelombang" label-for="input-gelombang">
                            <b-form-select
                            id="input-gelombang"
                            v-model="gelombangSelected"
                            :options="gelombang"
                            @change="namaKegiatan"
                            required
                            ></b-form-select>
                        </b-form-group>
                    </b-col>
                </b-row>

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

                <div style="float: right; ">
                    <b-button class="btn" style="margin: 0.5rem;" @click="submit" variant="primary">Submit</b-button>
                    <b-button class="btn" style="margin: 0.5rem;" @click="reset" variant="danger">Reset</b-button>
                </div>
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

                <div style="float: right; ">
                    <b-button class="btn" style="margin: 0.5rem;" @click="submit" variant="primary">Submit</b-button>
                    <b-button class="btn" style="margin: 0.5rem;" @click="reset" variant="danger">Reset</b-button>
                </div>
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

                <div style="float: right; ">
                    <b-button class="btn" style="margin: 0.5rem;" @click="submit" variant="primary">Submit</b-button>
                    <b-button class="btn" style="margin: 0.5rem;" @click="reset" variant="danger">Reset</b-button>
                </div>
            </div>
<!-- Informasi Umum -->
            <!-- <div v-if="form.jenis_jadwal == 'informasi_umum'">
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
            </div> -->
<!-- Jadwal Matakuliah -->  
            <div v-if="form.jenis_jadwal == 'jadwal_mata_kuliah'">
                
                <b-form-group id="input-group-2" label="Nama Matakuliah" label-for="input-2">
                  
                    <v-select label="placeholder" :options="listMatkul" v-model="form.selected" @input="namaKegiatan"></v-select>
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
                    readonly
                    required
                    ></b-form-input>
                </b-form-group>

                <div class="sesi-hari-jam" v-for="(mingguan, k) in form.jadwal_mingguan" :key="k">
                    <b-form-group id="input-group-4" label="Hari" label-for="input-4">
                        <b-form-select
                        id="input-4"
                        v-model="mingguan.hari"
                        :options="listHari"
                        @change="jamSesiFunction"
                        required
                        ></b-form-select>
                    </b-form-group>

                    <b-form-group id="input-group-5" label="Sesi" label-for="input-5">
                        <b-form-select
                        id="input-5"
                        v-model="mingguan.sesi"
                        :options="listSesi"
                        @change="jamSesiFunction"
                        required
                        ></b-form-select>
                    </b-form-group>
                    
                    <b-form-group id="input-group-7" label="Jam" label-for="input-7">
                        <b-form-input id="input-7" v-model="mingguan.jam" label="Jam Mata Kuliah" required disabled></b-form-input>
                    </b-form-group>

                    <b-form-group id="input-group-6" label="Grup" label-for="input-6">
                        <b-form-select
                        id="input-6"
                        v-model="mingguan.grup"
                        :options="listGrup"
                        required
                        ></b-form-select>
                    </b-form-group>
                    <div class="button " >
                        <b-button id="lihat-detail" block @click="add(k)" v-if="k == form.jadwal_mingguan.length-1" type="button" class="tambahField" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-plus button-tambah" viewBox="0 0 16 16">
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                            </svg>
                        </b-button>  
                    </div>
                    <div class="button">
                        <b-button id="hapus-pengumuman" block @click="remove(k)" v-if="k || ( !k && form.jadwal_mingguan.length > 1)" type="button" class="hapusField">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-dash button-hapus" viewBox="0 0 16 16">
                                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                            </svg>
                        </b-button>
                    </div>
                </div>
                <div style="float: right; ">
                    <b-button class="btn" style="margin: 0.5rem;" @click="submit" variant="primary">Submit</b-button>
                    <b-button class="btn" style="margin: 0.5rem;" @click="reset" variant="danger">Reset</b-button>
                </div>
            </div>
        </b-form>
<!-- LIST -->
<!-- List Jadwal Khusus -->
        <div>
            <b-row class="list">
                <b-col v-if="listJadwalKhusus.length != 0" cols="12" md="4" lg="3" xl="3" class="mt-5">
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
                    <div v-for="item in listJadwalKhusus.slice(pageJadwalKhusus*5-5,pageJadwalKhusus*5)" :key="item._id" class="listCard shadow p-3 mb-2 bg-white rounded">
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
                                    </svg> {{ moment(item.tanggal_mulai).locale('id').format("ll") }} s.d {{ moment(item.tanggal_selesai).locale('id').format("ll") }}
                                </p>
                            </div>
                            <b-row class="listJadwalButton">
                                <b-col class="button">
                                    <b-button block id="edit-jadwal" type="button" class="editJadwal" @click="getJadwal(item)">
                                        Edit
                                    </b-button>
                                </b-col>
                                <b-col class="button">
                                    <b-button block id="hapus-jadwal" type="button" class="hapusJadwal" @click="hapusJadwal(item)">
                                        Hapus
                                    </b-button>
                                </b-col>
                            </b-row>
                        </div>
                    </div>
                </b-col>
<!-- list Jadwal Ujian -->
                <b-col v-if="listJadwalUjian.length != 0" cols="12" md="4" lg="3" xl="3" class="mt-5">
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
                        <div v-for="item in listJadwalUjian.slice(pageJadwalUjian*5-5,pageJadwalUjian*5)" :key="item._id" class="listCard shadow p-3 mb-2 bg-white rounded">
                            <div class="isiList" >   
                                <h6>{{ item.nama_kegiatan }}</h6>
                                <p><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-calendar3" viewBox="0 0 16 16">
                                    <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z"/>
                                    <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                                    </svg> {{ moment(item.tanggal_mulai).locale('id').format("ll") }} s.d {{ moment(item.tanggal_selesai).locale('id').format("ll") }}
                                </p>
                            </div>
                            <b-row class="listJadwalButton">
                                <b-col class="button">
                                    <b-button block id="edit-jadwal" type="button" class="editJadwal" @click="getJadwal(item)">
                                        Edit
                                    </b-button>
                                </b-col>
                                <b-col class="button">
                                    <b-button block id="hapus-jadwal" type="button" class="hapusJadwal" @click="hapusJadwal(item)">
                                        Hapus
                                    </b-button>
                                </b-col>
                            </b-row>
                        </div>
                    </div>
                </b-col>
<!-- list jadwal ujian matkul -->
                <b-col v-if="listJadwalUjianMatkul.length != 0" cols="12" md="4" lg="3" xl="3" class="mt-5">
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
                                </svg> {{ moment(item.tanggal_mulai).locale('id').format("lll") }}
                            </p>
                        </div>
                        <b-row class="listJadwalButton">
                            <b-col class="button">
                                <b-button block id="edit-jadwal" type="button" class="editJadwal" @click="getJadwal(item)">
                                    Edit
                                </b-button>
                            </b-col>
                            <b-col class="button">
                                <b-button block id="hapus-jadwal" type="button" class="hapusJadwal" @click="hapusJadwal(item)">
                                    Hapus
                                </b-button>
                            </b-col>
                        </b-row>
                    </div>
                </b-col>
<!-- list jadwal pembayaran -->
                <b-col v-if="listJadwalPembayaran.length != 0" cols="12" md="4" lg="3" xl="3" class="mt-5">
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
                    <div v-for="item in listJadwalPembayaran.slice(pageJadwalPembayaran*5-5,pageJadwalPembayaran*5)" :key="item._id" class="listCard shadow p-3 mb-2 bg-white rounded">
                        <div class="isiList" >   
                            <h6>{{item.nama_kegiatan}}</h6>
                            <p><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-calendar3" viewBox="0 0 16 16">
                                <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z"/>
                                <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                                </svg> {{ moment(item.tanggal_mulai).locale('id').format("ll") }} s.d {{ moment(item.tanggal_selesai).locale('id').format("ll") }}
                            </p>
                        </div>
                        <b-row class="listJadwalButton">
                            <b-col class="button">
                                <b-button block id="edit-jadwal" type="button" class="editJadwal" @click="getJadwal(item)">
                                    Edit
                                </b-button>
                            </b-col>
                            <b-col class="button">
                                <b-button block id="hapus-jadwal" type="button" class="hapusJadwal" @click="hapusJadwal(item)">
                                    Hapus
                                </b-button>
                            </b-col>
                        </b-row>
                    </div>
                </b-col>
<!-- list jadwal mata kuliah -->
                <b-col v-if="listJadwalMataKuliah.length != 0" cols="12" md="4" lg="3" xl="3" class="mt-5">
                    <h5 class="judul-kategori">List Jadwal Kelas Mata Kuliah</h5>
                    <b-row v-if="jumlahPageJadwalMataKuliah !=null" class="pagination">
                        <b-col>
                            <b-button class="page" id="prev" :disabled="pageJadwalMataKuliah <=1" @click="pageJadwalMataKuliah -=1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                                </svg>
                            </b-button>
                        </b-col>
                        <b-col style="text-align:center; margin:auto;">
                            {{pageJadwalMataKuliah}}/{{Math.ceil(jumlahPageJadwalMataKuliah)}}
                        </b-col>
                        <b-col>
                            <b-button class="page" id="next" :disabled="pageJadwalMataKuliah >= jumlahPageJadwalMataKuliah" @click="pageJadwalMataKuliah +=1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                                </svg>
                            </b-button>
                        </b-col>
                    </b-row>
                    <div v-for="item in listJadwalMataKuliah.slice(pageJadwalMataKuliah*5-5,pageJadwalMataKuliah*5)" :key="item._id" class="listCard shadow p-3 mb-2 bg-white rounded">
                        <div class="isiList" >   
                            <h6>{{item.nama_kegiatan}} - {{ item.selected.kode_matakuliah }}</h6>
                            <div v-for="i in item.jadwal_mingguan" :key="i.grup" class="grup-jadwal-mingguan">
                                <div class="jadwal-mingguan" v-if="i.grup != null">
                                    Grup {{ i.grup.toUpperCase() }}
                                </div>
                                <div class="jadwal-mingguan" v-if="i.sesi != null">
                                    Sesi {{ i.sesi }}
                                </div>
                                <div class="jadwal-mingguan" v-if="i.hari != null">
                                    {{ i.hari.toUpperCase() }}
                                </div>
                            </div>
                        </div>
                        <b-row class="listJadwalButton">
                            <b-col class="button">
                                <b-button block id="edit-jadwal" type="button" class="editJadwal" href="#inputForm" @click="getJadwal(item)">
                                    Edit
                                </b-button>
                            </b-col>
                            <b-col class="button">
                                <b-button block id="hapus-jadwal" type="button" class="hapusJadwal" @click="hapusJadwal(item)">
                                    Hapus
                                </b-button>
                            </b-col>
                        </b-row>
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
// import moment from 'moment';

export default {
    name: 'FormData',
    data(){
        return {
            id: null,
            firebaseUID: '',
            form: {
                jenis_jadwal: null,
                topik_jadwal: null,
                nama_kegiatan: '',
                selected: { nama_matakuliah: ''},
                tanggal_mulai: '',
                tanggal_selesai: '',
                attachment: null,
                jadwal_mingguan: [
                    {
                        hari: null,
                        sesi: null,
                        jam: null,
                        grup: null
                    }
                ]
            },
            tempForm: {
                jenis_jadwal: null,
                topik_jadwal: null,
                nama_kegiatan: '',
                selected: { nama_matakuliah: ''},
                tanggal_mulai: '',
                tanggal_selesai: '',
                attachment: null,
                jadwal_mingguan: [
                    {
                        hari: null,
                        sesi: null,
                        jam: null,
                        grup: null
                    }
                ]
            },
            optionKlasifikasi: [
                { text: 'Pilih Jenis Jadwal', value: null, disabled: true },
                { text: 'Jadwal Khusus', value: 'jadwal_khusus' },
                { text: 'Jadwal Ujian', value: 'jadwal_ujian' },
                { text: 'Jadwal Ujian Mata Kuliah', value: 'jadwal_ujian_mata_kuliah' },
                { text: 'Pembayaran', value: 'pembayaran' },
                { text: 'Jadwal Kelas Mata Kuliah', value: 'jadwal_mata_kuliah' }
                // { text: 'Informasi Umum', value: 'informasi_umum' }
            ],
            listSesi: [
                { text: 'Pilih Sesi', value: null, disabled: true },
                { text: '1', value: 1},
                { text: '2', value: 2},
                { text: '3', value: 3},
                { text: '4', value: 4},
            ],
            listHari: [
                { text: 'Pilih Hari', value: null, disabled: true },
                { text: 'Senin', value: 'senin'},
                { text: 'Selasa', value: 'selasa'},
                { text: 'Rabu', value: 'rabu'},
                { text: 'Kamis', value: 'kamis'},
                { text: 'Jumat', value: 'jumat'},
            ],
            listGrup: [
                { text: 'Pilih Grup', value: null, disabled: true },
                { text: 'A', value: 'a'},
                { text: 'B', value: 'b'},
                { text: 'C', value: 'c'},
                { text: 'D', value: 'd'},
                { text: 'E', value: 'e'},
                { text: 'F', value: 'f'},
                { text: 'G', value: 'g'},
                { text: 'H', value: 'h'},
                { text: 'I', value: 'i'},
                { text: 'J', value: 'j'},
                { text: 'K', value: 'k'},
            ],
            gelombang: [
                { text: 'Pilih Gelombang', value: null, disabled: true },
                { text: 1, value: 1},
                { text: 2, value: 2}
            ],
            gelombangSelected: null,
            optionTopik: [],
            listMatkul: [],
            listJadwalUjian: [],
            listJadwalUjianMatkul: [],
            listJadwalKhusus: [],
            listJadwalPembayaran: [],
            listJadwalMataKuliah: [],
            isMobile: false,
            jumlahPageJadwalKhusus: null,
            pageJadwalKhusus: 1,
            jumlahPageJadwalUjian: null,
            pageJadwalUjian: 1,
            jumlahPageJadwalUjianMatkul: null,
            pageJadwalUjianMatkul: 1,
            jumlahPageJadwalPembayaran: null,
            pageJadwalPembayaran: 1,
            jumlahPageJadwalMataKuliah: null,
            pageJadwalMataKuliah: 1
        }
    },
    created() {
        if(localStorage.getItem('firebase-token') && localStorage.getItem('firebase-uid')){
            this.firebaseUID = JSON.parse(localStorage.getItem('firebase-uid'))
            this.getListMatkul()
            this.getListJadwalKhusus()
            this.getListJadwalPembayaran()
            this.getListJadwalUjian()
            this.getListJadwalUjianMatkul()
            this.getListJadwalMataKuliah()
        }
    },
    methods: {
        add() {
            this.form.jadwal_mingguan.push({
                hari: null,
                sesi: null,
                jam: null,
                grup: null
            })
        },
        remove(index) {
            this.form.jadwal_mingguan.splice(index, 1)
        },
        jamSesiFunction() {
            for(var i = 0; i < this.form.jadwal_mingguan.length; i++){
                if(this.form.jadwal_mingguan[i].hari != null && this.form.jadwal_mingguan[i].hari){
                    if(this.form.jadwal_mingguan[i].hari == 'senin') { // JAM SESI UNTUK HARI SENIN
                        if(this.form.jadwal_mingguan[i].sesi && this.form.jadwal_mingguan[i].sesi != null){
                            if(this.form.jadwal_mingguan[i].sesi == 1){ 
                                this.form.jadwal_mingguan[i].jam = '08.30 - 11.20 WIB'
                            } else if(this.form.jadwal_mingguan[i].sesi == 2){
                                this.form.jadwal_mingguan[i].jam = '11.30 - 14.20 WIB'
                            } else if(this.form.jadwal_mingguan[i].sesi == 3){
                                this.form.jadwal_mingguan[i].jam = '14.30 - 17.20 WIB'
                            } else if(this.form.jadwal_mingguan[i].sesi == 4){
                                this.form.jadwal_mingguan[i].jam = '17.30 - 20.20 WIB'
                            }
                        }
                    } else {
                        if(this.form.jadwal_mingguan[i].sesi && this.form.jadwal_mingguan[i].sesi != null){
                            if(this.form.jadwal_mingguan[i].sesi == 1){ 
                                this.form.jadwal_mingguan[i].jam = '07.30 - 10.20 WIB'
                            } else if(this.form.jadwal_mingguan[i].sesi == 2){
                                this.form.jadwal_mingguan[i].jam = '10.30 - 13.20 WIB'
                            } else if(this.form.jadwal_mingguan[i].sesi == 3){
                                this.form.jadwal_mingguan[i].jam = '13.30 - 16.20 WIB'
                            } else if(this.form.jadwal_mingguan[i].sesi == 4){
                                this.form.jadwal_mingguan[i].jam = '16.30 - 19.20 WIB'
                            }
                        }
                    }
                }
            }
        },
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
                    // for(var i=0; i < this.listJadwalUjian.length; i++){
                    //     this.listJadwalUjian[i].tanggal_mulai = moment(this.listJadwalUjian[i].tanggal_mulai).locale('id').format("DD-MM-YYYY")
                    //     this.listJadwalUjian[i].tanggal_selesai = moment(this.listJadwalUjian[i].tanggal_selesai).locale('id').format("DD-MM-YYYY")
                    // }
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
                    this.listJadwalUjianMatkul = response.data
                    this.jumlahPageJadwalUjianMatkul = this.listJadwalUjianMatkul.length/5
                    this.pageJadwalUjianMatkul = 1
                    // console.log(this.listJadwalUjianMatkul);
                })
            } catch (error) {
                console.log(error);
            }
        },
        async getListJadwalKhusus(){
            try {
                await axios.get(`https://beritaapi.fti.ukdw.ac.id/admin/${this.firebaseUID.uid}/jadwal-khusus`).then((response)=>{
                    this.listJadwalKhusus = response.data
                    // for(var i=0; i < this.listJadwalKhusus.length; i++){
                    //     this.listJadwalKhusus[i].tanggal_mulai = moment(this.listJadwalKhusus[i].tanggal_mulai).locale('id').format("DD-MM-YYYY")
                    //     this.listJadwalKhusus[i].tanggal_selesai = moment(this.listJadwalKhusus[i].tanggal_selesai).locale('id').format("DD-MM-YYYY")
                    // }
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
                    this.listJadwalPembayaran = response.data
                    this.jumlahPageJadwalPembayaran = this.listJadwalPembayaran.length/5
                    this.pageJadwalPembayaran = 1
                    // console.log(this.listJadwalPembayaran);
                })
            } catch (error) {
                console.log(error);
            }
        },
        async getListJadwalMataKuliah(){
            try {
                await axios.get(`https://beritaapi.fti.ukdw.ac.id/admin/${this.firebaseUID.uid}/jadwal-kelas`).then((response) => {
                    this.listJadwalMataKuliah = response.data
                    this.jumlahPageJadwalMataKuliah = this.listJadwalMataKuliah.length/5
                    this.pageJadwalMataKuliah = 1
                })
            } catch (error) {
                console.log(error);
            }
        },
        async submit() {
            try {
                if(this.tempForm.jenis_jadwal == '' || this.tempForm.jenis_jadwal == null || this.id == null){
                    await axios.post(`https://beritaapi.fti.ukdw.ac.id/admin/${this.firebaseUID.uid}/new-jadwal`, this.form).then((response) => {
                        this.$toast.open({
                            message: 'Form ' + this.form.nama_kegiatan + ' Berhasil Disimpan',
                            type: 'success',
                            position: 'top'
                        });
                        if(this.form.jenis_jadwal == 'jadwal_ujian_mata_kuliah'){
                            this.getListJadwalUjianMatkul()
                        }else if(this.form.jenis_jadwal == 'jadwal_mata_kuliah'){
                            this.getListJadwalMataKuliah()
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
                        this.form.selected = { nama_matakuliah: ''},
                        this.form.tanggal_mulai = '',
                        this.form.tanggal_selesai = '',
                        this.form.attachment = null,
                        this.form.jadwal_mingguan = [
                            {
                                hari: null,
                                sesi: null,
                                jam: null,
                                grup: null
                            }
                        ],
                        this.gelombangSelected = null
                    })
                } else if (this.tempForm.jenis_jadwal != '' || this.tempForm.jenis_jadwal != null || this.id != null) {
                    var id = this.id
                    await axios.put(`https://beritaapi.fti.ukdw.ac.id/admin/${this.firebaseUID.uid}/edit-jadwal/${id}`, {
                        jenis_jadwal: this.form.jenis_jadwal,
                        topik_jadwal: this.form.topik_jadwal,
                        nama_kegiatan: this.form.nama_kegiatan,
                        selected: this.form.selected,
                        tanggal_mulai: this.form.tanggal_mulai,
                        tanggal_selesai: this.form.tanggal_selesai,
                        attachment: this.form.attachment,
                        jadwal_mingguan: this.form.jadwal_mingguan
                    }).then((response) => {
                        this.$toast.open({
                            message: 'Form ' + this.form.nama_kegiatan + ' Berhasil Diedit',
                            type: 'success',
                            position: 'top'
                        });
                        if(this.form.jenis_jadwal == 'jadwal_ujian_mata_kuliah'){
                            this.getListJadwalUjianMatkul()
                        }else if(this.form.jenis_jadwal == 'jadwal_mata_kuliah'){
                            this.getListJadwalMataKuliah()
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
                        this.form.selected = { nama_matakuliah: ''},
                        this.form.tanggal_mulai = '',
                        this.form.tanggal_selesai = '',
                        this.form.attachment = null,
                        this.form.jadwal_mingguan = [
                            {
                                hari: null,
                                sesi: null,
                                jam: null,
                                grup: null
                            }
                        ]
                        this.gelombangSelected = null
                        this.tempForm.jenis_jadwal = null
                        this.id = null
                    })
                }
            } catch (error) {
                console.log(error);
            }
        },
        reset() {
            this.form.jenis_jadwal = null,
            this.form.topik_jadwal = null,
            this.form.nama_kegiatan = '',
            this.form.selected = { nama_matakuliah: ''},
            this.form.tanggal_mulai = '',
            this.form.tanggal_selesai = '',
            this.form.attachment = null,
            this.form.jadwal_mingguan = [{
                hari: null,
                sesi: null,
                jam: null,
                grup: null
            }]

            this.tempForm.jenis_jadwal = null,
            this.tempForm.topik_jadwal = null,
            this.tempForm.nama_kegiatan = '',
            this.tempForm.selected = { nama_matakuliah: ''},
            this.tempForm.tanggal_mulai = '',
            this.tempForm.tanggal_selesai = '',
            this.tempForm.attachment = null,
            this.tempForm.jadwal_mingguan = [{
                hari: null,
                sesi: null,
                jam: null,
                grup: null
            }]
            this.gelombangSelected = null
            this.id = null
        },
        optionType(){
            this.form.topik_jadwal = null,
            this.form.nama_kegiatan = '',
            this.form.selected = { nama_matakuliah: ''},
            this.form.tanggal_mulai = '',
            this.form.tanggal_selesai = '',
            this.form.attachment = null
            if (this.form.jenis_jadwal == 'jadwal_khusus'){
                this.optionTopik = [
                    { text: 'Pilih Jadwal Khusus', value: null, disabled: true },
                    { text: 'KKN Tematik', value: 'kkn_tematik' },
                    { text: 'KKN Reguler', value: 'kkn_reguler'},
                    { text: 'Kuliah Umum', value: 'kuliah_umum' },
                    { text: 'Registrasi', value: 'registrasi' },
                    { text: 'Wisuda', value: 'wisuda' },
                    { text: 'Perwalian', value: 'perwalian' },
                    { text: 'P2KMM', value: 'p2kmm'},
                    { text: 'P3DM', value: 'p3dm'},
                    { text: 'Edas', value: 'edas'},
                    { text: 'Uji Kompetensi', value: 'uji_kompetensi'}
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
            if(this.form.jenis_jadwal == 'jadwal_ujian_mata_kuliah'){
                if(this.form.topik_jadwal != '' && this.form.topik_jadwal != null && this.form.selected != null){
                    if(this.form.selected ){
                        this.form.nama_kegiatan = this.form.topik_jadwal.toUpperCase() + ' ' + this.form.selected.nama_matakuliah
                    } else {
                        this.form.nama_kegiatan = this.form.topik_jadwal.toUpperCase()
                    }
                }
            } else if(this.form.jenis_jadwal == 'jadwal_mata_kuliah'){
                if(this.form.selected.nama_matakuliah != ''){
                    if(this.form.selected){
                        this.form.nama_kegiatan = this.form.selected.nama_matakuliah
                    }
                }
            } else if(this.form.jenis_jadwal == 'jadwal_khusus'){
                if(this.form.topik_jadwal == 'p2kmm' || this.form.topik_jadwal == 'p3dm'){
                    if(this.gelombangSelected != null){
                        this.form.nama_kegiatan = this.form.topik_jadwal.toUpperCase() + ' Gelombang ' + this.gelombangSelected
                    } else {
                        this.form.nama_kegiatan = this.form.topik_jadwal.toUpperCase()
                    }
                } else {
                    this.form.nama_kegiatan =  this.form.topik_jadwal.toUpperCase()
                }
            }
        },
        async getJadwal(item){
            try {
                if(item.id)
                    this.id = item.id
                if(item.jenis_jadwal != null && item.jenis_jadwal){
                    this.tempForm.jenis_jadwal = item.jenis_jadwal
                    this.form.jenis_jadwal = item.jenis_jadwal
                    if(item.tipe_jadwal)
                        this.optionType()
                        this.form.topik_jadwal = item.tipe_jadwal
                    if(item.nama_kegiatan)
                    this.gelombangSelected = null
                        this.form.nama_kegiatan = item.nama_kegiatan
                        if(item.nama_kegiatan.includes(1)) {
                            this.gelombangSelected = 1
                        } else if (item.nama_kegiatan.includes(2)) {
                            this.gelombangSelected = 2
                        }
                    if(item.selected)
                        this.form.selected = item.selected
                    if(item.tanggal_mulai)
                        this.form.tanggal_mulai = item.tanggal_mulai
                    if(item.tanggal_selesai)
                        this.form.tanggal_selesai = item.tanggal_selesai
                    if(item.attachment)
                        this.form.attachment = item.attachment
                    if(item.jadwal_mingguan)
                        this.form.jadwal_mingguan = item.jadwal_mingguan
                }
            } catch (error) {
                console.log(error);
            }
        },
        async hapusJadwal(item){
            this.$bvModal.msgBoxConfirm(`Apakah Anda Yakin Ingin Menghapus Pengumuman "${item.nama_kegiatan}"` , {
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
                        if(item.jenis_jadwal != null && item.jenis_jadwal){
                            this.tempForm.jenis_jadwal = item.jenis_jadwal
                            if(item.tipe_jadwal)
                                this.optionType()
                                this.tempForm.topik_jadwal = item.tipe_jadwal
                            if(item.nama_kegiatan)
                                this.tempForm.nama_kegiatan = item.nama_kegiatan
                            if(item.selected)
                                this.tempForm.selected = item.selected
                            if(item.tanggal_mulai)
                                this.tempForm.tanggal_mulai = item.tanggal_mulai
                            if(item.tanggal_selesai)
                                this.tempForm.tanggal_selesai = item.tanggal_selesai
                            if(item.attachment)
                                this.tempForm.attachment = item.attachment
                            if(item.jadwal_mingguan)
                                this.tempForm.jadwal_mingguan = item.jadwal_mingguan
                            await axios.delete(`https://beritaapi.fti.ukdw.ac.id/admin/${this.firebaseUID.uid}/delete-jadwal/${item.id}`, { params: {
                                jenis_jadwal: this.tempForm.jenis_jadwal,
                                topik_jadwal: this.tempForm.topik_jadwal,
                                nama_kegiatan: this.tempForm.nama_kegiatan,
                                selected: this.tempForm.selected,
                                tanggal_mulai: this.tempForm.tanggal_mulai,
                                tanggal_selesai: this.tempForm.tanggal_selesai,
                                attachment: this.tempForm.attachment,
                                jadwal_mingguan: this.tempForm.jadwal_mingguan
                            }}).then(() => {
                                this.$toast.open({
                                    message: 'Form ' + this.tempForm.nama_kegiatan + ' Berhasil Dihapus',
                                    type: 'success',
                                    position: 'top'
                                });
                                if(this.tempForm.jenis_jadwal == 'jadwal_ujian_mata_kuliah'){
                                    this.getListJadwalUjianMatkul()
                                }else if(this.tempForm.jenis_jadwal == 'jadwal_mata_kuliah'){
                                    this.getListJadwalMataKuliah()
                                }else if(this.tempForm.jenis_jadwal == 'jadwal_ujian'){
                                    this.getListJadwalUjian()
                                }else if(this.tempForm.jenis_jadwal =='jadwal_khusus'){
                                    this.getListJadwalKhusus()
                                }else if(this.tempForm.jenis_jadwal == 'pembayaran'){
                                    this.getListJadwalPembayaran()
                                }
                                this.tempForm.jenis_jadwal = null,
                                this.tempForm.topik_jadwal = '',
                                this.tempForm.nama_kegiatan = '',
                                this.tempForm.selected = { nama_matakuliah: ''},
                                this.tempForm.tanggal_mulai = '',
                                this.tempForm.tanggal_selesai = '',
                                this.tempForm.attachment = null,
                                this.tempForm.jadwal_mingguan = [
                                    {
                                        hari: null,
                                        sesi: null,
                                        jam: null,
                                        grup: null
                                    }
                                ]
                                this.id = null,
                                this.gelombangSelected = null
                            })
                        }
                    } catch (error) {
                        this.$toast.open({
                            message: `Data ${this.tempForm.nama_kegiatan} Gagal Dihapus`,
                            type: 'warning',
                            position: 'top'
                        });
                    }
                }
            })
            .catch(err => {
                console.log(err);
            })
        }
    }
}
</script>

<style scoped>
.grup-jadwal-mingguan {
    display: flex;
    justify-content: space-around;
    text-align: center;
}
.button {
    display: flex;
    justify-content: center;
}
.button .tambahField{
    color: #32a3df;
    background-color: transparent;
    border: none;
}
.button-tambah{
    border: 1px solid #32a3df;
    border-radius: 15%;
}
.button-hapus{
    border: 1px solid #ee1010;
    border-radius: 15%;
}

.button .hapusField{
    color: #ee1010;
    background-color: transparent;
    border: none;
}
.button .editJadwal{
    color: #32a3df;
    background-color: transparent;
    border: none;
    transition: ease-in-out;
    transition-duration: 300ms;
    transition-delay: 150ms;
}
.button .editJadwal:hover{
    color: white;
    background-color: #32a3df;
    border: none;
}
.button .hapusJadwal{
    color: #ee1010;
    background-color: transparent;
    border: none;
    transition: ease-in-out;
    transition-duration: 300ms;
    transition-delay: 150ms;
}
.button .hapusJadwal:hover{
    color: white;
    background-color: #ee1010;
    border: none;
}
.sesi-hari-jam{
    min-width: 100%;
    display: flex;
    gap: 0.5rem;
}


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
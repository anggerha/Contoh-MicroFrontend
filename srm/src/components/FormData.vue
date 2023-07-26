<template>
    <div class="container">
        <b-button class="kembali" @click="kembali">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
            </svg>
            Kembali
        </b-button>
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
                    <v-select label="text" :options="dummyMatkul" v-model="form.selected" @input="namaKegiatan"></v-select>
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

                <b-form-file
                    id="file-default"
                    v-model="form.attachment"
                    :state="Boolean(form.attachment)"
                    placeholder="Choose a file or drop it here..."
                    drop-placeholder="Drop file here..."
                ></b-form-file>

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

                <b-form-file
                    id="file-default"
                    v-model="form.attachment"
                    :state="Boolean(form.attachment)"
                    placeholder="Choose a file or drop it here..."
                    drop-placeholder="Drop file here..."
                ></b-form-file>

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

                <b-form-file
                    id="file-default"
                    v-model="form.attachment"
                    :state="Boolean(form.attachment)"
                    placeholder="Choose a file or drop it here..."
                    drop-placeholder="Drop file here..."
                ></b-form-file>

                <b-button class="btn" @click="submit" variant="primary">Submit</b-button>
                <b-button class="btn" @click="reset" variant="danger">Reset</b-button>
            </div>
        </b-form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'FormData',
    data(){
        return {
            firebaseUID: '',
            form: {
                jenis_jadwal: null,
                topik_jadwal: null,
                nama_kegiatan: '',
                selected: { text: '', value: null},
                tanggal_mulai: '',
                tanggal_selesai: '',
                attachment: null,
            },
            optionKlasifikasi: [
                { text: 'Pilih Jenis Jadwal', value: null, disabled: true },
                { text: 'Jadwal Ujian Mata Kuliah', value: 'jadwal_ujian_mata_kuliah' },
                { text: 'Jadwal Khusus', value: 'jadwal_khusus' },
                { text: 'Jadwal Ujian', value: 'jadwal_ujian' },
                { text: 'Pembayaran', value: 'pembayaran' },
            ],
            optionTopik: [],
            dummyMatkul: [
                { text: 'Matematika Diskrit', value: 'matematika_diskrit'},
                { text: 'Desain Evaluasi Antarmuka', value: 'desain_evaluasi_antarmuka'},
                { text: 'Pemrograman Web Lanjut', value: 'pemrograman_web_lanjut'}
            ],
        }
    },
    created() {
        if(sessionStorage.getItem('firebase-token') && sessionStorage.getItem('firebase-uid')){
            this.firebaseUID = JSON.parse(sessionStorage.getItem('firebase-uid'))
        }
    },
    methods: {
        kembali() {
            this.$router.replace('/srm/AdminPage')
        },
        async submit() {
            try {
                await axios.post(`https://beritaapi.fti.ukdw.ac.id/admin/${this.firebaseUID.uid}/new-jadwal`, this.form).then((response) => {
                    console.log(response);
                    this.$toast.open({
                        message: 'Form ' + this.form.nama_kegiatan + ' Berhasil Disimpan',
                        type: 'success',
                        position: 'top'
                    });
                    this.form.jenis_jadwal = null,
                    this.form.topik_jadwal = '',
                    this.form.nama_kegiatan = '',
                    this.form.selected = { text: '', value: null},
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
            this.form.selected = { text: '', value: null},
            this.form.tanggal_mulai = '',
            this.form.tanggal_selesai = '',
            this.form.attachment = null
        },
        optionType(){
            this.form.topik_jadwal = null,
            this.form.nama_kegiatan = '',
            this.form.selected = { text: '', value: null},
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
        },
        namaKegiatan() {
            if(this.form.topik_jadwal != '' && this.form.topik_jadwal != null && this.form.selected != null){
                if(this.form.selected  && this.form.selected.value != null){
                    this.form.nama_kegiatan = this.form.topik_jadwal.toUpperCase() + ' ' + this.form.selected.text
                } else {
                    this.form.nama_kegiatan = this.form.topik_jadwal.toUpperCase()
                }
            }
        }
    }
}
</script>

<style scoped>
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
</style>
<template>
    <div class="container">
        <b-button class="kembali" @click="kembali">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
            </svg>
            Kembali
        </b-button>
        <b-form ref="formInput" class="form" @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group id="input-group-3" label="Jenis Jadwal" label-for="input-3">
                <b-form-select
                id="input-3"
                v-model="form.jenis_jadwal"
                :options="optionKlasifikasi"
                @change="optionType"
                required
                ></b-form-select>
            </b-form-group>
<!-- Mata Kuliah -->
            <div v-if="form.jenis_jadwal == 'jadwal_ujian_mata_kuliah'">
                <b-form-group id="input-group-1" label="Jenis Ujian" label-for="input-1">
                    <b-form-select
                    id="input-1"
                    v-model="form.topik_jadwal"
                    :options="optionTopik"
                    required
                    ></b-form-select>
                </b-form-group>

                <b-form-group
                    id="input-group-1"
                    label="Nama Kegiatan"
                    label-for="input-1"
                >
                    <b-form-input
                    id="input-1"
                    v-model="form.nama_kegiatan"
                    type="text"
                    placeholder="Nama Kegiatan"
                    required
                    ></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-2" label="Tanggal Ujian" label-for="input-2">
                    <b-form-input
                    id="input-2"
                    v-model="form.tanggal_mulai"
                    type="datetime-local"
                    placeholder="Tanggal Ujian"
                    required
                    ></b-form-input>
                </b-form-group>

                <b-button class="btn" type="submit" variant="primary">Submit</b-button>
                <b-button class="btn" type="reset" variant="danger">Reset</b-button>
            </div>
<!-- Jadwal Khusus -->
            <div v-if="form.jenis_jadwal == 'jadwal_khusus'">
                <b-form-group id="input-group-1" label="Topik Jadwal" label-for="input-1">
                    <b-form-select
                    id="input-1"
                    v-model="form.topik_jadwal"
                    :options="optionTopik"
                    required
                    ></b-form-select>
                </b-form-group>

                <b-form-group
                    id="input-group-1"
                    label="Nama Kegiatan"
                    label-for="input-1"
                >
                    <b-form-input
                    id="input-1"
                    v-model="form.nama_kegiatan"
                    type="text"
                    placeholder="Nama Kegiatan"
                    required
                    ></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-2" label="Tanggal Mulai" label-for="input-2">
                    <b-form-input
                    id="input-2"
                    v-model="form.tanggal_mulai"
                    type="date"
                    placeholder="Tanggal Mulai"
                    required
                    ></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-3" label="Tanggal Selesai" label-for="input-3">
                    <b-form-input
                    id="input-3"
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

                <b-button class="btn" type="submit" variant="primary">Submit</b-button>
                <b-button class="btn" type="reset" variant="danger">Reset</b-button>
            </div>
<!-- Jadwal Ujian -->
            <div v-if="form.jenis_jadwal == 'jadwal_ujian'">
                <b-form-group id="input-group-1" label="Topik Jadwal" label-for="input-1">
                    <b-form-select
                    id="input-1"
                    v-model="form.topik_jadwal"
                    :options="optionTopik"
                    required
                    ></b-form-select>
                </b-form-group>

                <b-form-group
                    id="input-group-1"
                    label="Nama Kegiatan"
                    label-for="input-1"
                >
                    <b-form-input
                    id="input-1"
                    v-model="form.nama_kegiatan"
                    type="text"
                    placeholder="Nama Kegiatan"
                    required
                    ></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-2" label="Tanggal Mulai" label-for="input-2">
                    <b-form-input
                    id="input-2"
                    v-model="form.tanggal_mulai"
                    type="date"
                    placeholder="Tanggal Mulai"
                    required
                    ></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-3" label="Tanggal Selesai" label-for="input-3">
                    <b-form-input
                    id="input-3"
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

                <b-button class="btn" type="submit" variant="primary">Submit</b-button>
                <b-button class="btn" type="reset" variant="danger">Reset</b-button>
            </div>
<!-- Pembayaran -->
            <div v-if="form.jenis_jadwal == 'pembayaran'">
                <b-form-group id="input-group-1" label="Topik Pembayaran" label-for="input-1">
                    <b-form-select
                    id="input-1"
                    v-model="form.topik_jadwal"
                    :options="optionTopik"
                    required
                    ></b-form-select>
                </b-form-group>

                <b-form-group
                    id="input-group-1"
                    label="Nama Pembayaran"
                    label-for="input-1"
                >
                    <b-form-input
                    id="input-1"
                    v-model="form.nama_kegiatan"
                    type="text"
                    placeholder="Nama Pembayaran"
                    required
                    ></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-2" label="Tanggal Mulai" label-for="input-2">
                    <b-form-input
                    id="input-2"
                    v-model="form.tanggal_mulai"
                    type="datetime-local"
                    placeholder="Tanggal Mulai"
                    required
                    ></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-3" label="Tanggal Selesai" label-for="input-3">
                    <b-form-input
                    id="input-3"
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

                <b-button class="btn" type="submit" variant="primary">Submit</b-button>
                <b-button class="btn" type="reset" variant="danger">Reset</b-button>
            </div>
        </b-form>
    </div>
</template>

<script>
export default {
    name: 'FormData',
    data(){
        return {
            show: true,
            form: {
                jenis_jadwal: '',
                topik_jadwal: '',
                nama_kegiatan: '',
                tanggal_mulai: '',
                tanggal_selesai: '',
                attachment: null,
            },
            optionKlasifikasi: [
                { text: 'Jadwal Ujian Mata Kuliah', value: 'jadwal_ujian_mata_kuliah' },
                { text: 'Jadwal Khusus', value: 'jadwal_khusus' },
                { text: 'Jadwal Ujian', value: 'jadwal_ujian' },
                { text: 'Pembayaran', value: 'pembayaran' },
            ],
            optionTopik: []
        }
    },
    methods: {
        kembali() {
            this.$router.replace('/srm/AdminPage')
        },
        onSubmit(event) {
            event.preventDefault()
            console.log(this.form);
        },
        onReset(event) {
            event.preventDefault()
            // Reset our form values
            this.form.jenis_jadwal = '',
            this.form.topik_jadwal = '',
            this.form.nama_kegiatan = '',
            this.form.tanggal_mulai = '',
            this.form.tanggal_selesai = '',
            this.form.attachment = null,
            // Trick to reset/clear native browser form validation state
            this.show = false
            this.$nextTick(() => {
                this.show = true
            })
        },
        optionType(){
            this.form.topik_jadwal = '',
            this.form.nama_kegiatan = '',
            this.form.tanggal_mulai = '',
            this.form.tanggal_selesai = '',
            this.form.attachment = null
            if (this.form.jenis_jadwal == 'jadwal_khusus'){
                this.optionTopik = [
                    { text: 'KKN', value: 'kkn' },
                    { text: 'Kuliah Umum', value: 'kuliah_umum' },
                    { text: 'Registrasi', value: 'registrasi' },
                    { text: 'Wisuda', value: 'wisuda' },
                    { text: 'Perwalian', value: 'perwalian' }
                ]
            } else if (this.form.jenis_jadwal == 'jadwal_ujian_mata_kuliah'){
                this.optionTopik = [
                    { text: 'UTS', value: 'uts' },
                    { text: 'UAS', value: 'uas' },
                ]
            } else if (this.form.jenis_jadwal == 'jadwal_ujian'){
                this.optionTopik = [
                    { text: 'UTS', value: 'uts' },
                    { text: 'UAS', value: 'uas' },
                ]
            } else if (this.form.jenis_jadwal == 'pembayaran') {
                this.optionTopik = [
                    { text: 'SPP', value: 'spp' },
                    { text: 'Pendadaran', value: 'pendadaran' },
                    { text: 'Wisuda', value: 'wisuda' }
                ]
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
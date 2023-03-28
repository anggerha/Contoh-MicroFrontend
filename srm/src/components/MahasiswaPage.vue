<template>
    <div class="container">
        <p class="judul">SRM FTI UKDW</p>
        <h6> Nama: {{ dataDiri.nama }}</h6>
        <h6> Email: {{ dataDiri.email }}</h6>
        <h6> ID Telegram: <b-input v-model="dataDiri.id_telegram"></b-input></h6>
        <b-button @click="updateData">Update</b-button>
        <div class="accordion" role="tablist">
            <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-1" role="tab">
                    <b-button block v-b-toggle.accordion-1 variant="info">Matakuliah</b-button>
                </b-card-header>
                <b-collapse id="accordion-1" accordion="my-accordion" role="tabpanel">
                    <b-card-body>
                        <!-- inner accordion -->
                        <b-card>
                            <b-card-header header-tag="header" class="p-1" role="tab">
                                <b-button block v-b-toggle.collapse-1-inner variant="info">Pemrograman Web Lanjut</b-button>
                            </b-card-header>
                            <b-collapse id="collapse-1-inner" class="mt-2">
                                <b-card>Hello!</b-card>
                            </b-collapse>
                        </b-card>
                        <b-card>
                            <b-card-header header-tag="header" class="p-1" role="tab">
                                <b-button block v-b-toggle.collapse-2-inner variant="info">Logika Matematika</b-button>
                            </b-card-header>
                            <b-collapse id="collapse-2-inner" class="mt-2">
                                <b-card>Hello!</b-card>
                            </b-collapse>
                        </b-card>
                        <!-- end of inner accordion -->
                    </b-card-body>
                </b-collapse>
            </b-card>
            <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-1" role="tab">
                    <b-button block v-b-toggle.accordion-2 variant="info">Perwalian</b-button>
                </b-card-header>
                <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
                    <b-card-body>
                    <b-card-text>{{ text }}</b-card-text>
                    </b-card-body>
                </b-collapse>
            </b-card>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'MahasiswaPage',
    data(){
        return {
            text: 'Pengumuman',
            user: [],
            dataDiri: []
        }
    },
    created() {
        if(sessionStorage.getItem('user') && sessionStorage.getItem('dataDiri')){
            this.user = JSON.parse(sessionStorage.getItem('user'))
            var temp = JSON.parse(sessionStorage.getItem('dataDiri'))
            this.dataDiri = temp.data
        }
    },
    methods: {
        async updateData() {
            if(this.dataDiri.id_telegram !== null && this.dataDiri.id_telegram !== ''){
                await axios.put(`http://localhost:5000/mahasiswa/update`, this.dataDiri, { params: { nim : this.dataDiri.nim.toString() }})
                .then(async () => {
                    this.$toast.open({
                        message: 'Data berhasil diupdate !',
                        type: 'success',
                        position: 'top'
                    });
                    await axios.get('http://localhost:5000/mahasiswa/me', { params: { email : this.user.email.toString() }})
                    .then((response) => {
                        sessionStorage.setItem('dataDiri', JSON.stringify(response))
                    })
                })
            } else {
                this.$toast.open({
                    message: 'ID telegram kosong !',
                    type: 'error',
                    position: 'top'
                });
            }
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
    font-size: 150%;
    font-weight: bold;
}
p{
    text-align: left;
}
.form{
    display: flex;
    text-align: left;
}
.button .send{
    border-style: none;
    color: #32a3df;
    margin: 0.25rem;
    background-color: transparent;
}
.button .send:hover{
    color: white;
    background-color: #32a3df;
}
span{
    text-align: left;
}
h3{
    font-size:calc(100% + 1vw);
    text-align: center;
}
</style>
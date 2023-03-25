<template>
    <div class="container">
        <p class="judul">SRM FTI UKDW</p>
        <body class="bv-example-row">
            <b-row>
                <b-col sm="8">
                    <div class="shadow-lg p-3 mb-5 bg-white rounded-4">
                        <p>Buat Pengumuman</p>
                        <div class="form">
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                            <div class="button">
                                <b-button class="send">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-folder-plus" viewBox="0 0 16 16">
                                        <path d="m.5 3 .04.87a1.99 1.99 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14H9v-1H2.826a1 1 0 0 1-.995-.91l-.637-7A1 1 0 0 1 2.19 4h11.62a1 1 0 0 1 .996 1.09L14.54 8h1.005l.256-2.819A2 2 0 0 0 13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2zm5.672-1a1 1 0 0 1 .707.293L7.586 3H2.19c-.24 0-.47.042-.683.12L1.5 2.98a1 1 0 0 1 1-.98h3.672z"/>
                                        <path d="M13.5 10a.5.5 0 0 1 .5.5V12h1.5a.5.5 0 1 1 0 1H14v1.5a.5.5 0 1 1-1 0V13h-1.5a.5.5 0 0 1 0-1H13v-1.5a.5.5 0 0 1 .5-.5z"/>
                                    </svg>
                                </b-button>
                                <b-button class="send">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-send-fill" viewBox="0 0 16 16">
                                    <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"/>
                                </svg>
                                </b-button>
                            </div>
                        </div>
                    </div>
                </b-col>
                <b-col sm="4">
                    <h3>Daftar Mahasiswa Perwalian</h3>
                </b-col>
            </b-row>
        </body>
    </div>
</template>

<script>
export default {
    name: 'SRMPage',
    data() {
      return {

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
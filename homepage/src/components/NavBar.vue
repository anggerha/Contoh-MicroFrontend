<template>
    <div class="container">
        <nav class="bg-white px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
            <div class="container flex flex-wrap items-center justify-between mx-auto">
                <router-link to="/listmenu" class="flex items-center">
                    <img src="../assets/fti-ukdw.png" class="h-6 mr-3 sm:h-20" alt="Informatika's Logo" />
                    <span class="self-center text-3xl font-semibold whitespace-nowrap dark:text-white">Informatika</span>
                </router-link>
                <div class="flex items-center md:order-2">
                    <button type="button" class="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                        <span class="sr-only">Open user menu</span>
                        <img class="w-14 h-14 rounded-full border-2 border-sky-500" :src="user.profilPicture" alt="user photo">
                    </button>
                    <!-- Dropdown menu -->
                    <div class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
                        <div class="px-4 py-3">
                        <span class="block text-sm text-gray-900 dark:text-white">{{ user.displayName }}</span>
                        <span class="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">{{ user.email }}</span>
                        </div>
                        <ul class="py-2" aria-labelledby="user-menu-button">
                        <li>
                            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</a>
                        </li>
                        <li>
                            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" @click="logout">Sign out</a>
                        </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
        <hr>
    </div>
</template>

<script>
import firebase from 'firebase'

export default {
    name: 'App',
    data() {
        return {
        user: []
        }
    },
    created() {
        if(sessionStorage.getItem('user'))
        this.user = JSON.parse(sessionStorage.getItem('user'))
    },
    methods: {
        logout(){
            firebase.auth().signOut()
            .then(() => {
                sessionStorage.clear()
                this.$router.replace("/login").then(() => { this.$router.go() })
            }).catch((err) => {
                console.log(err);
            });
        },
    },
}
</script>

<style>
</style>
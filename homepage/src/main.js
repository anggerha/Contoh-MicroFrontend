import { h, createApp } from 'vue';
import singleSpaVue from 'single-spa-vue';

import App from './App.vue';
import router from './router';
import store from './store';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import firebase from 'firebase/app';
import './main.css'
import 'flowbite';

const firebaseConfig = {
  apiKey: "AIzaSyAB2QSI1oTZhXh-xndPusKdwE4jjMjP6JU",
  authDomain: "srm-user.firebaseapp.com",
  projectId: "srm-user",
  storageBucket: "srm-user.appspot.com",
  messagingSenderId: "573533885273",
  appId: "1:573533885273:web:89dea05a4ff4a44065f248",
  measurementId: "G-ZZRGC3Z7LG"
};

firebase.initializeApp(firebaseConfig)

const vueLifecycles = singleSpaVue({
  createApp,
  appOptions: {
    render() {
      return h(App, {
        // single-spa props are available on the "this" object. Forward them to your component as needed.
        // https://single-spa.js.org/docs/building-applications#lifecycle-props
        // if you uncomment these, remember to add matching prop definitions for them in your App.vue file.
        /*
        name: this.name,
        mountParcel: this.mountParcel,
        singleSpa: this.singleSpa,
        */
      });
    },
  },
  handleInstance(app) {
    app.use(router);
    app.use(store);
  },
});

export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;

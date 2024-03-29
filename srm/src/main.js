import Vue from 'vue';
import singleSpaVue from 'single-spa-vue';

import App from './App.vue';
import router from './router';
import store from './store';
import firebase from 'firebase/app';
import * as BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';
import "core-js/actual/array/group-by"
import moment from 'moment'

Vue.prototype.moment = moment

Vue.component('v-select', vSelect)

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

Vue.config.productionTip = false;
Vue.use(BootstrapVue)
Vue.use(ToastPlugin)

const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    render(h) {
      return h(App, {
        props: {
          // single-spa props are available on the "this" object. Forward them to your component as needed.
          // https://single-spa.js.org/docs/building-applications#lifecycle-props
          // if you uncomment these, remember to add matching prop definitions for them in your App.vue file.
          /*
          name: this.name,
          mountParcel: this.mountParcel,
          singleSpa: this.singleSpa,
          */
        }
      });
    },
    router,
    store,
  },
});

export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;

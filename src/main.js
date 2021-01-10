import Vue from 'vue'
import _ from 'lodash'
import App from './App.vue'
import router from '@/router.js'
import store from '@/store'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'

Vue.use(VueMaterial)

const moment = require('moment')
Vue.use(require('vue-moment'), {
    moment,
})

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app')

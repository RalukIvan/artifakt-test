import Vue from 'vue'
import Vuex from 'vuex'

import storeModule from '@/store/modules/store-module'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    getters: {},
    mutations: {},
    actions: {},

    modules: {
        storeModule,
    },
})
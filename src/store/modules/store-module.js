/* eslint-disable no-param-reassign */
const initialState = {
    myVar: 0,
}

const getters = {
    myProcessedVar: (state) => state.myVar * 2,
}

const mutations = {
    increment: (state) => {
        state.myVar += 1
    },
}

const actions = {
    increment: ({ commit }) => {
        commit('increment')
    },
    // context.getters
    // context.state
    // context.dispatch -> to call other actions
}

export default {
    state: initialState,
    getters,
    mutations,
    actions,
}
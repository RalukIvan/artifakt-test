import Vue from 'vue'
import Vuex from 'vuex'

import resources from '@/services/resources'

Vue.use(Vuex)

// actions, getters, mutations and state have to be exported like this to be able to use them in the tests
export const mutations = {
    setLoading: (state, loading) => {
        state.loading = loading
    },
    saveSelectedEmployee: (state, employee) => {
        state.selectedEmployee = JSON.parse(JSON.stringify(employee))
    },
    saveEmployees: (state, employees) => {
        state.employees = JSON.parse(JSON.stringify(employees))
    },
    saveCommits: (state, commits) => {
        state.commits = JSON.parse(JSON.stringify(commits))
    },
}

export const getters = {
    // application loading state
    loading: (state) => {
        return state.loading
    },
    // employees state
    employees: (state) => {
        return state.employees
    },
    selectedEmployee: (state) => {
        return state.selectedEmployee
    },
    commitsByEmployeeId: (state) => {
        return state.commits && state.selectedEmployee && state.commits.filter((item) => {
            return item.owner_id === state.selectedEmployee.id
        })
    },
}

export const actions = {
    getEmployees: ({ commit }) => {
        commit('setLoading', true)
        return resources.getEmployees()
        .then((employees) => {
            const orderedEmployees = employees.sort((a, b) => {
                return new Date(a.created_at) - new Date(b.created_at)
            })
            commit('saveEmployees', orderedEmployees)
        })
        .finally(() => {
            commit('setLoading', false)
        })
    },
    getEmployeeInfo: ({commit}, id) => {
        commit('setLoading', true)
        return resources.getEmployeeInfo(id)
        .then((employeeInfo) => {
            commit('saveSelectedEmployee', employeeInfo)
        })
        .finally(() => {
            commit('setLoading', false)
        })
    },
    getCommits: ({commit}) => {
        commit('setLoading', true)
        return resources.getCommits()
        .then((commits) => {
            commit('saveCommits', commits)
        })
        .finally(() => {
            commit('setLoading', false)
        })
    },
}

export const state = {
    commits: undefined,
    employees: undefined,
    selectedEmployee: undefined,
    loading: false,
}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
})
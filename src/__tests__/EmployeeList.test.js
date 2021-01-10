import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { expect } from 'chai'
import EmployeeList from '../views/EmployeeList.vue'
import EmployeeCard from '../components/employee/EmployeeCard.vue'
import ErrorMessage from '../components/common/ErrorMessage.vue'

import VueMaterial from 'vue-material'

//create mock store for component
const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueMaterial)

describe('EmployeeList', () => {
    let component
    let actions
    let getters
    let store

    beforeEach(() => {
        //mock store getter for EmployeeList
        getters = {
            employees: () => [{
                age: 26,
                avatar: 'https://avatars.dicebear.com/api/male/lyrikz.svg',
                created_at: '2020-06-06T13:37:00.000Z',
                description: `Why don't we do it with rust? Rust is better !!`,
                first_name: 'Nicolas',
                id: 1,
                last_name: 'Carquin',
                nickname: 'Lyrikz',
                occupation: 'back developer',
                tags: ['Rust', 'rust', 'rust-lang'],
                team: 'engineering',
            }],
            loading: () => false,
        }
        actions = {
            getEmployees: () => [{
                age: 26,
                avatar: 'https://avatars.dicebear.com/api/male/lyrikz.svg',
                created_at: '2020-06-06T13:37:00.000Z',
                description: `Why don't we do it with rust? Rust is better !!`,
                first_name: 'Nicolas',
                id: 1,
                last_name: 'Carquin',
                nickname: 'Lyrikz',
                occupation: 'back developer',
                tags: ['Rust', 'rust', 'rust-lang'],
                team: 'engineering',
            }],
        }
        store = new Vuex.Store({
            actions,
            getters,
        })

        //mock Employees component
        component = shallowMount(EmployeeList, {
            store,
            localVue,
        })
    })

    it('should render EmployeeList on mount', () => {
        expect(component.findComponent(EmployeeList).exists()).to.be.true
    })

    it('should render one EmployeeCard component', () => {
        // check that there in one EmployeeCard component rendered
        expect(component.findComponent(ErrorMessage).exists()).to.be.false
        expect(component.findAllComponents(EmployeeCard).length).to.be.equal(1)
    })
})
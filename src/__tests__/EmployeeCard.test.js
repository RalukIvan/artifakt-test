import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import { expect } from 'chai'
import EmployeeCard from '../components/employee/EmployeeCard.vue'
import VueMaterial from 'vue-material'

//create mock store for component
const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(VueMaterial)

const router = new VueRouter()

describe('EmployeeCard', () => {
    let actions
    let component
    let store

    beforeEach(() => {
        //mock EmployeeCard component
        component = shallowMount(EmployeeCard, {
            propsData: {
                employeeData: {
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
                },
            },
            router,
            localVue,
        })
    })

    it('should render EmployeeCard on mount', () => {
        expect(component.findComponent(EmployeeCard).exists()).to.be.true
    })

    it('should display the information of 1 Employee', () => {
        expect(component.find('.employee-info-nickname').text()).equal('Lyrikz')
        expect(component.find('.employee-info-occupation').text()).equal('back developer')
        expect(component.find('.employee-info-team').text()).equal('team engineering')
        expect(component.find('.employee-actions-profile').exists()).to.be.true
    })
})
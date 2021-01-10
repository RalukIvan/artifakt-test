import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import { expect } from 'chai'
import EmployeeProfile from '../views/EmployeeProfile.vue'
import Commit from '../components/employee/Commit.vue'

import Moment from 'moment'

import VueMaterial from 'vue-material'

//create mock store for component
const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(Vuex)
localVue.use(VueMaterial)

const router = new VueRouter()

Vue.prototype.$moment = Moment
Moment.locale('fr')


localVue.filter('moment', (date, dateFormat) => {
    return Moment(date).format(dateFormat)
})

describe('EmployeeProfile', () => {
    let component
    let actions
    let getters
    let store

    beforeEach(() => {
        //mock store getter for Employee Profile
        actions = {
            getEmployeeInfo: () => ({
                age: 29,
                avatar: 'https://avatars.dicebear.com/api/male/vanglenn.svg',
                created_at: '2020-12-28T12:42:42.000Z',
                description: `Why don't you use css grid for that?`,
                first_name: 'Yann',
                id: 2,
                last_name: 'Isabel',
                nickname: 'Vanglenn',
                occupation: 'front developer',
                tags: ['Design System', 'Mixins', 'Guide Lines', 'Naming Conventions'],
                team: 'engineering',
            }),
            getCommits: () => ([{
                date: '2019-01-14T15:21:04Z',
                hash: '86ghe41353c791a62dfe3bc201a07c3801129602',
                id: 2,
                message: 'change default layout for env settings',
                owner_id: 4,
                project: 'Symfony',
            }, {
                date: '2020-06-24T16:00:54Z',
                hash: 'jhf67d5g7edv21a62dfe3bc201a07c3801129602',
                id: 4,
                message: 'update color variables',
                owner_id: 2,
                project: 'Symfony',
            }, {
                date: '2020-05-19T09:54:40Z',
                hash: 'mpa9kfhj657dcvbb87dakjguhwhfn87emgroirr3',
                id: 8,
                message: 'fix typo',
                owner_id: 2,
                project: 'Symfony',
            }]),
        }

        getters = {
            selectedEmployee: () => ({
                age: 29,
                avatar: 'https://avatars.dicebear.com/api/male/vanglenn.svg',
                created_at: '2020-12-28T12:42:42.000Z',
                description: `Why don't you use css grid for that?`,
                first_name: 'Yann',
                id: 2,
                last_name: 'Isabel',
                nickname: 'Vanglenn',
                occupation: 'front developer',
                tags: ['Design System', 'Mixins', 'Guide Lines', 'Naming Conventions'],
                team: 'engineering',
            }),
            loading: () => false,
            commitsByEmployeeId: () => ([{
                date: '2020-05-19T09:54:40Z',
                hash: 'mpa9kfhj657dcvbb87dakjguhwhfn87emgroirr3',
                id: 8,
                message: 'fix typo',
                owner_id: 2,
                project: 'Symfony',
            }, {
                date: '2020-06-24T16:00:54Z',
                hash: 'jhf67d5g7edv21a62dfe3bc201a07c3801129602',
                id: 4,
                message: 'update color variables',
                owner_id: 2,
                project: 'Symfony',
            }])
        }
        store = new Vuex.Store({
            actions,
            getters,
        })

        //mock EmployeeProfile
     component
        component = shallowMount(EmployeeProfile, {
            router,
            store,
            localVue,
        })
    })

    it('should render EmployeeProfile on mount', () => {
        expect(component.findComponent(EmployeeProfile).exists()).to.be.true
    })

    it('should display the EmployeeProfile information correctly', () => {
        // check that the EmployeeProfile name renders
        expect(component.find('.employee-profile-header-section-name').text()).equal('Yann Isabel')
        expect(component.find('.employee-profile-header-section-item').text().replace(' ', '')).equal('NicknameVanglenn')
        expect(component.findAllComponents(Commit).length).to.be.equal(2)
    })
})
import Vue from 'vue'
import Router from 'vue-router'

import EmployeeList from '@/views/EmployeeList.vue'
import EmployeeProfile from '@/views/EmployeeProfile.vue'
import NewEmployeeForm from '@/views/NewEmployeeForm.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            // default route
            path: '/',
            name: 'home',
            component: EmployeeList,
        },
        {
            path: '/employee/:employeeId',
            name: 'employee-profile',
            component: EmployeeProfile,
        },
        {
            path: '/new-employee',
            name: 'add-employees',
            component: NewEmployeeForm,
        },
    ],
})

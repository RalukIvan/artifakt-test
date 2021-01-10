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
            meta: {
                title: 'Employee List',
            },
        },
        {
            path: '/employee/:employeeId',
            name: 'employee-profile',
            component: EmployeeProfile,
            meta: {
                title: 'Employee Profile',
            },
        },
        {
            path: '/new-employee',
            name: 'add-employees',
            component: NewEmployeeForm,
            meta: {
                title: 'New Employee Form',
            },
        },
    ],
})

<template lang="pug">
.employees-container
    .employees-container-title Employees
    .employees
        Loader(v-if="loading")
        .employees-actions
            button.employees-actions-add(@click="addEmployee")
                i.fa.fa-plus
            form.search-form(name="searchForm", @submit="searchEmployees")
                input.employees-actions-input-search#searchEmployees(type="search", name=s, placeholder="String to search...", results="0", aria-label="Search", v-model="searchString")
                button.employees-actions-search(type="submit")
                  i.fa.fa-search
        div(v-if="displayedEmployees && displayedEmployees.length === 0 && !loading")
            span There are no results matching your search
        div(v-else-if="!displayedEmployees && !loading")
            span There are no employees in the list!
        
        div.employees-list(v-else-if="displayedEmployees && !loading")
            EmployeeCard(v-for="(employee, index) in displayedEmployees", :key="employee.id", :employeeData="employee")
        ErrorMessage(v-if="errorMessage && !loading")
            p An error occured when we tried to load the employees. We are sorry for the incovenience! {{errorMessage}}
  
</template>

<script>
// import the store helpers in order to use directly the store getters
import {
    mapActions,
    mapGetters,
} from 'vuex'

import ErrorMessage from '@/components/common/ErrorMessage'
import Loader from '@/components/common/Loader'
import EmployeeCard from '@/components/employee/EmployeeCard'

export default {
    name: 'EmployeeList',
    components: {
        ErrorMessage,
        Loader,
        EmployeeCard,
    },
    data() {
        return {
            displayedEmployees: undefined,
            errorMessage: undefined,
            searchString: undefined,
        }
    },
    computed: mapGetters(['employees', 'loading']),
    created() {
        this.getEmployees()
        .then(() => {
            this.displayedEmployees = this.employees
        })
        .catch((err) => {
            this.errorMessage = err
        })
    },
    methods: {
        ...mapActions(['getEmployees']),
        addEmployee(e) {
            this.$router.push({ name: 'add-employees' })
        },
        searchEmployees() {
            if (this.searchString !== '') {
                this.displayedEmployees = this.employees.filter((item) => {
                    return item.nickname.toLowerCase().indexOf(this.searchString) > -1
                })
            } else {
                this.displayedEmployees = this.employees
            }
        },
    },
}
</script>

<!-- Added "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.employees-container {

    &-title {
        font-size: 20px;
        font-weight: 700;
        padding: 50px;
    }
    .employees {
        &-list {
            display: flex;
            flex-direction: row;
            justify-content: center;
        }
        &-actions {
            cursor: pointer;
            padding: 10px 20px;
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            &-add, &-search {
                background-color: #E5E5E5;
                margin-right: 10px;
                padding: 10px;
                border: none;
            }

            &-input-search {
                border-radius: 6px;
                cursor: pointer;
                height: 30px;
                border: 1px solid black;
                &:focus, &:hover {
                    border: 1px solid #8969E6;
                    border-radius: 6px;
                }
            }
        }
  }
}
</style>


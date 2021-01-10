<template lang="pug">
.employee
    form(novalidate @submit.prevent="validateEmployeeData")
        md-card
            md-card-header
                .md-title Add a new employee

            md-card-content
                .md-layout.md-gutter
                    .md-layout-item.md-small-size-100
                        md-field(:class="getValidationClass('first_name')")
                            label(for="employee-first-name") First Name
                            md-input(name="employee-first-name" id="employee-first-name" v-model="form.first_name" :disabled="sending")
                            span(class="md-error" v-if="!$v.form.first_name.required") The employee first name is required
                            span(class="md-error" v-else-if="!$v.form.first_name.minlength") Employee first name should have at least 3 characters
                .md-layout.md-gutter
                    .md-layout-item.md-small-size-100
                        md-field(:class="getValidationClass('last_name')")
                            label(for="employee-last-name") Last Name
                            md-input(name="employee-last-name" id="employee-last-name" v-model="form.last_name" :disabled="sending")
                            span(class="md-error" v-if="!$v.form.last_name.required") The employee last name is required
                            span(class="md-error" v-else-if="!$v.form.last_name.minlength") Employee last name should have at least 3 characters
                .md-layout.md-gutter
                    .md-layout-item.md-small-size-100
                        md-field(:class="getValidationClass('nickname')")
                            label(for="employee-nickname") Nickname
                            md-input(name="employee-nickname" id="employee-nickname" v-model="form.nickname" :disabled="sending")
                            span(class="md-error" v-if="!$v.form.nickname.required") The employee last name is required
                            span(class="md-error" v-else-if="!$v.form.nickname.minlength") Employee last name should have at least 3 characters
                .md-layout.md-gutter
                    .md-layout-item.md-small-size-100
                        md-field(:class="getValidationClass('description')")
                            label(for="description") Description
                            md-input(name="description" id="description" v-model="form.description" :disabled="sending")
                            span(class="md-error" v-if="!$v.form.description.required") The description is required
                            span(class="md-error" v-else-if="!$v.form.description.minlength") Description should have at least 10 characters

            md-progress-bar(md-mode="indeterminate" v-if="sending")

            md-card-actions
                md-button(@click="goToEmployeeList") Back
                md-button.md-raised.md-primary(type="submit" :disabled="sending") Create employee
        md-snackbar(v-if="lastAddedEmployee", :md-active.sync="employeeSaved") The employee {{ lastAddedEmployee.first_name }} {{lastAddedEmployee.last_name}} was saved with success!
</template>

<script>
// import the store helpers in order to use directly the store getters
import {
    mapActions,
    mapGetters,
} from 'vuex'

import ErrorMessage from '@/components/common/ErrorMessage'
import Loader from '@/components/common/Loader'

import { validationMixin } from 'vuelidate'
import {
    required,
    decimal,
    minLength,
    maxLength,
    minValue,
    url,
} from 'vuelidate/lib/validators'

export default {
    name: 'NewEmployeeForm',
    components: {
        ErrorMessage,
        Loader,
    },
    mixins: [validationMixin],
    data() {
        return {
            errorMessage: undefined,
            form: {
                first_name: null,
                last_name: null,
                nickname: null,
                description: null,
            },
            employeeSaved: false,
            sending: false,
            lastAddedEmployee: null,
        }
    },
    validations: {
        form: {
            first_name: {
                required,
                minLength: minLength(2),
                maxLength: maxLength(64),
            },
            last_name: {
                required,
                minLength: minLength(2),
                maxLength: maxLength(64),
            },
            nickname: {
                minLength: minLength(2),
            },
            description: {
                minLength: minLength(10),
                maxLength: maxLength(256),
            },
        },
    },
    created() {
    },
    methods: {
        ...mapActions(['addEmployeeToList']),
        getValidationClass(fieldName) {
            const field = this.$v.form[fieldName]

            if (field) {
                return {
                    'md-invalid': field.$invalid && field.$dirty,
                }
            }
        },
        goToEmployeeList() {
            this.$router.push({ name: 'home' })
        },
        saveEmployeeData() {
            this.sending = true
            this.lastAddedEmployee = Object.assign({}, this.form)
            this.addEmployeeToList(this.lastAddedEmployee)
            this.employeeSaved = true
            this.sending = false
            this.clearForm()
        },
        validateEmployeeData() {
            this.$v.$touch()

            if (!this.$v.$invalid) {
                this.saveEmployeeData()
            }
        },
        clearForm() {
            this.$v.$reset()
            this.form.first_name = null
            this.form.last_name = null
            this.form.nickname = null
            this.form.description = null
        },
    },
}
</script>

<!-- Added "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.employee {
    padding: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    form {
        width: 70%;
        background-color: white;

        input {
            border-radius: 6px;
            cursor: pointer;
            height: 30px;
            &:focus, &:hover {
                border: 1px solid #8969E6;
                border-bottom: none;
                border-radius: 6px;
            }
            
        }
        
        .md-field.md-focused label, .md-field.md-has-value label {
            color: #8969E6;
        }
    }

    &-title {
      padding-bottom: 40px;
    }

    .md-progress-bar {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
    }
}
</style>


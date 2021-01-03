<template lang="pug">
.employee
    .employee-avatar
        img(:src="employeeData.avatar" :alt="`${employeeData.nickname} image`")

    .employee-info
        span.employee-info-nickname {{employeeData.nickname}}
        br
        span.employee-info-occupation {{employeeData.occupation}}
        p.employee-info-team team {{employeeData.team}}
    .employee-actions
        button.employee-actions-profile(@click="goToEmployeeProfile") See profile
</template>

<script>
// import the store helpers in order to use directly the store getters
import {
    mapActions,
} from 'vuex'

export default {
    name: 'EmployeeCard',
    props: {
        employeeData: {
            type: Object,
            default: null,
            required: true,
        },
    }, 
    methods: {
        goToEmployeeProfile() {
            this.$router.push({ name: 'employee-profile', params: { employeeId: this.employeeData.id }})
        },
    },
}
</script>

<!-- Added "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.employee {
    background-color: #fff;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 14px;
    margin: 35px 40px;
    justify-content: space-around;
    width: 256px;
    height: 265px;
   

    &-avatar {
        width: 66px;
        height: 64px;
        border: 1px solid #8969E6;
        border-radius: 32px;
        img {
            height: 90%;
        }
    }

    &-info {
        margin-top:5px;
        &-nickname {
            color: #333333;
            font-weight: 700;
            font-size: 21px;
        }
        &-team {
            font-style: italic;
        }
    }

    &-actions {
        &-profile {
            text-transform: uppercase;
            background-color: #8969E6;
            color: #fff;
            border-radius: 4px;
            padding: 5px 10px;
            font-weight: 700;
            font-size: 12px;
        }
    }
}
</style>

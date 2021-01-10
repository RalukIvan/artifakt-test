<template lang="pug">
.employee-profile
    Loader(v-if="loading")
    .employee-profile-header(v-if="selectedEmployee && !loading")
        .employee-profile-header-section
            .employee-profile-header-section-avatar
                img(:src="selectedEmployee.avatar" :alt="`${selectedEmployee.nickname} image`")
            .employee-profile-header-section-tags
                .employee-profile-header-section-tag(v-for="(tag, index) in selectedEmployee.tags", :key="`tag${index}`") {{tag.toLowerCase()}}
        .employee-profile-header-section
            span.employee-profile-header-section-name {{displayedName}}
            .employee-profile-header-section-item 
                span Nickname
                span {{selectedEmployee.nickname}}
            .employee-profile-header-section-item
                span Age
                span {{selectedEmployee.age}}
            .employee-profile-header-section-item
                span Occupation
                span {{selectedEmployee.occupation}}
            .employee-profile-header-section-description {{selectedEmployee.description}}
    .employee-profile-content
        .employee-profile-content-title Last commits
        .employee-profile-content-search
            span Filter by project:
            form.employee-profile-content-search-form(name="searchForm", @submit="searchProject")
                input#searchProject(type="search", name=s, placeholder="Type your project here...", results="0", aria-label="Search project", v-model="project")
        .employee-profile-content-commits(v-if="displayedCommits && displayedCommits.length > 0 && !loading")
            Commit(v-for="(commit, index) in displayedCommits", :key="`commit${index}`", :commit="commit")
        div(v-else) There are no commits for this user and project
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
import Commit from '@/components/employee/Commit'

export default {
    name: 'EmployeeProfile',
    components: {
        Commit,
        ErrorMessage,
        Loader,
    },
    data() {
        return {
            errorMessage: undefined,
            project: undefined,
            displayedCommits: [],
        }
    },
    computed: {
        displayedName() {
            return `${this.selectedEmployee.first_name} ${this.selectedEmployee.last_name}`
        },
        ...mapGetters(['selectedEmployee', 'commitsByEmployeeId', 'loading']),
    },
    created() {
        this.getEmployeeInfo(this.$route.params.employeeId)
        .catch((err) => {
            this.errorMessage = err
        })
        this.getCommits()
        .then(() => {
            this.displayedCommits = this.commitsByEmployeeId
        })
        .catch((err) => {
            this.errorMessage = err
        })
    },
    methods: {
        ...mapActions(['getEmployeeInfo', 'getCommits']),
        searchProject() {
            if (this.project !== '') {
                this.displayedCommits = this.commitsByEmployeeId.filter((item) => {
                    return item.project.toLowerCase().indexOf(this.project) > -1
                })
            } else {
                this.displayedCommits = this.commitsByEmployeeId
            }
        },
    },
}
</script>

<!-- Added "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.employee-profile {
    background-color: white;
    margin: 0 43px;
    &-header {
        display: flex;
        flex-direction: row;
        border-bottom: 1px solid #C4C4C4;
        margin: 43px 40px 40px 40px;
        &-section {
            display: flex;
            flex-direction: column;
            margin-top: 35px;
            &-avatar {
                width: 246px;
                height: 246px;
                border: 1px solid #8969E6;
                border-radius: 129px;
                img {
                    height: 90%;
                }
                margin-bottom: 15px;
            }
            &-tags {
                display: -webkit-inline-box;
                flex-direction: row;
                flex-wrap: wrap;
                margin-bottom: 24px;
            }
            &-tag {
                background-color: #8969E6;
                color: #fff;
                border-radius: 4px;
                padding: 5px 10px;
                font-weight: 700;
                font-size: 12px;
                margin: 7px;
            }
            &-name {
                font-size: 64px;
                color: #8969E6;
                font-weight: 700;
                line-height: 75px;
            }
            &-item {
                display: flex;
                flex-direction: row;
                flex: 0 1;
                font-weight: 700;
                font-size: 24px;
                margin: 5px 0px;
                line-height: 28px;
                width: 100%;
                text-align: left;
                text-transform: capitalize;
                span:first-of-type {
                    color: #333333;
                }
                span:nth-of-type(2) {
                    color: #8D8D8D;
                }
                span {
                    flex: 0 0 35%;
                }
            }
            &-description {
                font-size: 20px;
                color: #333333;
                margin-top: 26px;
                font-weight: 500;
            }
        }
        &-section:first-of-type {
            width: 21%;
            margin-right: 68px;
            align-items: center;
        }
        &-section:last-of-type {
            width: 75%;
            align-items: baseline;
        }
    }
    &-content {
        padding: 0 43px;
        display: flex;
        flex-direction: column;
        align-items: baseline;
        &-title {
            font-size: 36px;
            font-weight: 700;
            color: #333333;
            padding-bottom: 38px;
            line-height: 42px;
        }
        &-search {
            font-size: 20px;
            font-weight: 700;
            text-align: left;
            padding-bottom: 47px;
            input {
                border-radius: 6px;
                cursor: pointer;
                height: 30px;
                border: 1px solid #8D8D8D;
                &:focus, &:hover {
                    border: 1px solid #8969E6;
                    border-radius: 6px;
                }
            }
            ::placeholder {
                color: #C4C4C4;
                font-size: 14px;
                line-height: 16px;
            }
            ::-webkit-input-placeholder {
                color: #C4C4C4;
                font-size: 14px;
                line-height: 16px;
            }
            :-moz-placeholder {
                color: #C4C4C4;
                font-size: 14px;
                line-height: 16px;
            }
            ::-moz-placeholder {
                color: #C4C4C4;
                font-size: 14px;
                line-height: 16px;
            }
            :-ms-input-placeholder {
                color: #C4C4C4;
                font-size: 14px;
                line-height: 16px;
            }
            form {
                padding-top:10px;
            }
        }
        &-commits {
            width: 100%;
        }
    }
}
</style>

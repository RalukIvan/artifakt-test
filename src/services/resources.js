import axios from 'axios'


const resources = {
    getEmployees: () => {
        return axios.get('/artifakt/employees')
        .then((response) => {
            return response.data
        })
    },
    getEmployeeInfo: (id) => {
        return axios.get(`/artifakt/employees/${id}`)
        .then((response) => {
            return response.data
        })
    },
    getCommits: () => {
        return axios.get(`/artifakt/commits`)
        .then((response) => {
            return response.data
        })
    },
}

export default resources
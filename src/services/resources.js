import axios from 'axios'


const resources = {
    getEmployees: () => {
        return axios.get('/artifakt/employees')
        .then((response) => {
            return response.data
        })
    },
}

export default resources
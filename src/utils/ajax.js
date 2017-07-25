import axios from 'axios'
// import qs from 'qs'

const url = '/api'

export default {
    post(key, query) {
        return new Promise((resolve, reject) => {
            // console.log(url+key)
            axios.post(`${url+key}?${query}`).then(res => {
                if (res.status === 200) resolve(res.data);
            }).catch(err => {
                console.error(err)
            })
        })
    }
}
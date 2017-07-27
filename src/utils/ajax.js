import axios from 'axios'
// import qs from 'qs'

const url = '/api'
// const home = 'http://www.by2z.cn'

export default {
    post(key, query) {
        return new Promise((resolve, reject) => {
            // console.log(url+key)
            axios.post(`${window.location.origin + url + key}?${query}`).then(res => {
                if (res.status === 200) resolve(res.data);
            }).catch(err => {
                console.error(err)
            })
        })
    }
}
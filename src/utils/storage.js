// import Cookie from 'js-cookie'

export default {
    save(item) {
        // Cookie.set(item.name, item.data)
        sessionStorage.setItem(item.name, item.data)
    },
    read(name) {
        // return Cookie.get(name)
        return sessionStorage.getItem(name)
    }
}
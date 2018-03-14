import ajax from '../utils/ajax'
import { observable, runInAction, action } from 'mobx'
import storage from '../utils/storage'

export default class FavouriteList {
    @observable store = {
        title: 'My Favourite',
        listData: {},
        scrollDis: 0,
        playlist: [],
        loading: false
    }
    constructor(root) {
        this.rootStore = root
    }

    @action.bound
    getList(key, query) {
        if (!this.store.listData.result) {
            // 从本地存储中读取列表
            let list = storage.read('favorList')
            if (list) {
                list = JSON.parse(list)
                this.setList(list)
            } else {
                // 本地存储中不存在list就发送请求
                this.switchLoading(true)
                ajax.post(key, query).then(res => {
                    runInAction(() => {
                        this.setList(res)
                        this.switchLoading(false)
                    })
                    storage.save({
                        name: 'favorList',
                        data: JSON.stringify(res)
                    })
                }).catch(err => {
                    runInAction(() => {
                        this.switchLoading(false)
                    })
                })
            }
        } 
    }

    @action.bound
    setList(obj) {
        this.store.listData = obj
        this.store.playlist = obj.result.tracks
    }

    @action.bound
    switchLoading(bool) {
        this.store.loading = bool
    }

    @action.bound
    saveScrollDis(dis) {
        this.store.scrollDis = dis
    }
}

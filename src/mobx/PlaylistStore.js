import ajax from "../utils/ajax"
import storage from "../utils/storage"
import { observable, action, runInAction } from "mobx"

class PlayListStore {
    @observable store = initStore()

    constructor(root) {
        this.rootStore = root
    }

    // 初始化列表
    @action.bound
    initList(id) {
        let listId = Number(storage.read('listId'))
        let playlist = storage.read('playlist')

        if (!listId || listId !== id) {
            this.store.loading = true
            this.store.playList = {}
            // 保存当前传入的歌单id
            storage.save({
                name: 'listId',
                data: id
            })
            // 请求歌单详细信息
            ajax.post(`/playlist/detail`, `id=${id}`).then(res => {
                runInAction(() => {
                    this.store.playList = res.result
                    this.store.loading = false
                })
                storage.save({
                    name: 'playlist',
                    data: JSON.stringify(res.result)
                })
            })
        } else {
            this.store.playList = JSON.parse(playlist) || {}
        }
    }
}

function initStore () {
    return {
        playList: {},
        loading: false
    }
}

export default PlayListStore
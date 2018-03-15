import { action, observable } from 'mobx'
import storage from '../utils/storage'

class PlayingListStore {
    @observable store = initStore()

    constructor(root) {
        this.rootStore = root
    }

    // 更新正在播放的列表
    @action.bound
    updatePlayingList(items, id) {
        this.store.list = items
        this.store.listId = id
    }
}

function initStore () {
    let list = JSON.parse(storage.read('playingList')) || []

    return {
        list,
        listId: 0
    }
}

export default PlayingListStore
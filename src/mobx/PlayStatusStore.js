import { observable, action } from "mobx"
import storage from '../utils/storage'

class PlayStatusStore {
    @observable store = initStore()
    constructor(root) {
        this.rootStore = root
    }

    // 切换当前播放的曲目
    @action.bound
    updatePlayNumber (number) {
        this.store.playNumber = number
    }
}

function initStore() {
    let playNumber = parseInt(storage.read('playNumber'), 10) || 0
    return {
        title: '歌曲',
        picUrl: '',
        musicDetail: {},
        musicTime: 0,
        musicId: 0,
        musicUrl: '',
        playNumber: playNumber,
        isPlay: true
    }
}

export default PlayStatusStore
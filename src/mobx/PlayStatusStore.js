import { observable, action, runInAction } from "mobx"
import storage from '../utils/storage'
import ajax from "../utils/ajax"

class PlayStatusStore {
    @observable store = initStore()
    constructor(root) {
        this.rootStore = root
    }

    // 切换当前播放的曲目
    @action.bound
    updatePlayNumber (number) {
        this.store.playNumber = number
        storage.save({
            name: 'playNumber',
            data: number
        })
    }

    // 获取当前播放歌曲url
    @action.bound
    initMusicUrl (id) {
        ajax.post(`/music/url`, `id=${id}`).then(res => {
            runInAction(() => {
                this.store.musicUrl = res.data[0].url
            })
        })
    }

    // 获取歌词
    @action.bound
    getMusicLyric(id) {
        return new Promise((resolve) => {
            ajax.post(`/lyric`, `id=${id}`).then(res => {
                resolve(res)
            })
        })
    }

    // 获取歌曲详情
    @action.bound
    initPlayingSong(id) {
        ajax.post(`/song/detail`, `ids=${id}`).then(res => {
            runInAction(() => {
                this.store = {
                    ...this.store,
                    title: res.songs[0].name,
                    musicDetail: res.songs[0],
                    picUrl: res.songs[0].al.picUrl,
                    musicTime: res.songs[0].dt,
                    musicId: id
                }
            })
        })
    }

    // 暂停功能
    @action.bound
    pauseOrPlay() {
        this.store.isPlay = !this.store.isPlay
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
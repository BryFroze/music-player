import { observable, action } from "mobx"

class AudioStore {
    @observable store = {
        myAudio: null
    }

    constructor(root) {
        this.rootStore = root
    }

    // 初始化audio对象
    @action.bound
    initAudio(audio) {
        this.store.myAudio = audio
    }
}

export default AudioStore
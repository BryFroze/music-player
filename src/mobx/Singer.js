import { observable, action, runInAction } from "mobx"
import ajax from "../utils/ajax";

class Singer {
    @observable store = {
        singerInfo: {
            artist: {}
        }
    }

    constructor(root) {
        this.rootStore = root
    }

    // 获取歌手信息
    @action.bound
    getSingerInfo(id) {
        ajax.post('/artists', `id=${id}`).then(res => {
            console.log(res)
            runInAction(() => {
                this.store.singerInfo = res
            })
        })
    }
}

export default Singer
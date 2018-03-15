import ajax from "../utils/ajax"
import { observable, runInAction, action } from "mobx"
import storage from "../utils/storage"

function getStateFromCache() {
	let singerList = storage.read("singerList")
	let listData = storage.read("songList")
	return {
		listData: listData ? JSON.parse(listData) : [],
		singerList: singerList ? JSON.parse(singerList) : []
	}
}

class SongListStore {
	@observable store = getStateFromCache()

	constructor(root) {
		this.rootStore = root
	}

	// 获取歌单列表，目前是获取欧美热门歌单
	@action.bound
	getSongList() {
		if (!this.store.listData.length) {
			ajax
				.post("/top/playlist/highquality", "cat=欧美&limit=30")
				.then(res => {
					let list = res.playlists
					let listStr = JSON.stringify(list)
					runInAction(() => {
						this.store.listData = list
					})
					storage.save({
						name: "songList",
						data: listStr
					})
				})
		}
	}

	// 获取歌手列表
	@action.bound
	getSingerList() {
		if (!this.store.singerList.length) {
			ajax.post("/top/artists", "offset=0&limit=100").then(res => {
                runInAction(() => {
                    this.store.singerList = res.artists
                })
                storage.save({
                    name: "singerList",
                    data: JSON.stringify(res.artists)
                })
            })
		}
	}
}

export default SongListStore

import FavouriteList from './FavouriteList'
import SongListStore from './SongListStore'

class RootStore {
    constructor() {
        this.store = {
            favouriteList: new FavouriteList(this),
            songListStore: new SongListStore(this)
        }
    }
}

export default new RootStore()

import FavouriteList from './FavouriteList'

class RootStore {
    constructor() {
        this.store = {
            favouriteList: new FavouriteList(this)
        }
    }
}

export default new RootStore()

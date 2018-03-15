import FavouriteList from './FavouriteList'
import SongListStore from './SongListStore'
import PlayListStore from './PlaylistStore'
import PlayingListStore from './PlayingListStore'
import PlayStatusStore from './PlayStatusStore'
import AudioStore from './AudioStore'

class RootStore {
    constructor() {
        this.store = {
            favouriteList: new FavouriteList(this),
            songListStore: new SongListStore(this),
            playListStore: new PlayListStore(this),
            playingListStore: new PlayingListStore(this),
            playStatusStore: new PlayStatusStore(this),
            audioStore: new AudioStore(this)
        }
    }
}

export default new RootStore()

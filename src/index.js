import React from 'react'
import ReactDOM from 'react-dom'
import Fastclick from 'fastclick'
import './common/js/rem'
import './common/style/reset.css'
import './common/style/app.css'
import './common/style/patch.css'
import { Provider } from 'mobx-react'
import App from './components/app/App'
import rootStore from './mobx/RootStore'

Fastclick.attach(document.body)

ReactDOM.render(
    <Provider {...rootStore.store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
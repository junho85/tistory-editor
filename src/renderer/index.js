import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ipcRenderer } from 'electron'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from './containers/App'
import configureStore from './store/configureStore'
import { receiveUser, receiveBlogs, receivePosts, receiveCategories, selectPost, disconnectAuth, openMessage } from './actions'

injectTapEventPlugin()
const store = configureStore()

ipcRenderer.send("fetch-user")
ipcRenderer.send("fetch-blogs")

ipcRenderer.on("receive-user", (e, user) => {
	store.dispatch(receiveUser(user))
})

ipcRenderer.on("receive-blogs", (e, user) => {
	store.dispatch(receiveBlogs(user))
})

ipcRenderer.on("receive-posts", (e, res) => {
	store.dispatch(receivePosts(res.page, res.posts, res.hasNext))
})

ipcRenderer.on("receive-categories", (e, categories) => {
	store.dispatch(receiveCategories(categories))
})

ipcRenderer.on("receive-content", (e, post) => {
	store.dispatch(selectPost(post))
})

ipcRenderer.on("complete-disconnect-auth", (e) => {
	store.dispatch(disconnectAuth())
})

ipcRenderer.on("receive-message", (e, message) => {
	store.dispatch(openMessage(message))
})

render (
	<Provider store={store}>
		<MuiThemeProvider>
			<App />
		</MuiThemeProvider>
	</Provider>,
	document.getElementById('root')
)

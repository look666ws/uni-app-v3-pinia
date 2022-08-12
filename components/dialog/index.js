import Dialog from './dialog'

export default {
	install (app) {
		app.config.globalProperties.$dialog = Dialog
	}
}

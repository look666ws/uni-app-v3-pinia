import Loading from './loading'

export default {
	install (app) {
		app.config.globalProperties.$loading = Loading
	}
}

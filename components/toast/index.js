import Toast from './toast'

export default {
	install (app) {
		app.config.globalProperties.$toast = Toast
	}
}

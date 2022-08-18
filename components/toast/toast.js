import {
	createApp
} from 'vue'
import Toast from './toast.vue'
export default {
	instance: null,
	timer: null,
	parent: document.createElement('div'),
	clear() {
		if (this.instance !== null) {
			this.instance.unmount(this.parent)
			document.body.removeChild(this.parent)
			this.instance = null
		}
	},
	show(options) {
		if (this.instance !== null) this.clear()
		const _this = this;
		const defaultOptions = {
			title: '', // 标题
			mask: true, // 是否展示遮罩层
			type: '', // 类型 success/warning/info/error
			duration: 3000, // 显示时间
			success: () => {
				if (isCallback(options.success)) {

					options.success()
					resolve()
				}
			}
		}

		function isCallback(callback) {
			_this.clear()


			if (callback && typeof callback === 'function') {
				return true
			}
			return false
		}
		Object.assign(defaultOptions, options)
		this.instance = createApp(Toast, defaultOptions)
		document.body.appendChild(this.parent)
		this.instance.mount(this.parent)
		// 自动隐藏
		if (defaultOptions.duration > 0) {
			clearTimeout(this.timer)
			this.timer = setTimeout(() => {
				this.clear()

				if (options.success != undefined) options.success();
			}, defaultOptions.duration)
		}
	},
	hide() {
		this.clear()
	}
}
import { createApp } from 'vue'
import Loading from './loading.vue'

export default {
	instance: null,
	timer: null,
	parent: document.createElement('div'),
	clear () {
		if (this.instance !== null) {
			this.instance.unmount(this.parent)
			document.body.removeChild(this.parent)
			this.instance = null
		}
	}, 
  show (options) {
		if (this.instance !== null) this.clear()
		const defaultOptions = {
			title: '', // 标题
			mask: true, // 是否展示遮罩层
			duration: 0 // 显示时间
		}
		Object.assign(defaultOptions, options)
		this.instance = createApp(Loading, defaultOptions)
		document.body.appendChild(this.parent)
		this.instance.mount(this.parent)
		// 自动隐藏
		if (defaultOptions.duration > 0) {
			clearTimeout(this.timer)
			this.timer = setTimeout(() => {
				this.clear()
			}, defaultOptions.duration)
		}
	},
	hide () {
		this.clear()
	},
}

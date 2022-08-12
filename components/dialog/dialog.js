import { createApp } from 'vue'
import Dialog from './dialog.vue'

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
		return new Promise(resolve => {
			if (!options) {
				if (isCallback(options.fail)) {
					options.fail()
				}
				throw new Error('调用错误')
			}
			
			const _this = this
			const defaultOptions = {
				title: '', // 标题
				icon: '', // 内容区图片标识
				content: '', // 内容
				contentColor: '#fff', // 内容颜色
				showClose: false, // 是否展示“关闭”按钮
				duration: 0, // 弹窗自动关闭时间
				confirmText: '', // 确定按钮
				confirmColor: '#FF8C5A', // 确定按钮颜色
				cancelText: '', // 取消按钮
				cancelColor: 'transparent', // 取消按钮颜色
				handleSuccess: () => {
					if (isCallback(options.confirm)) {
						options.confirm()
						resolve()
					}
				},
				handleCancel: () => {
					if (isCallback(options.cancel)) {
						options.cancel()
						resolve()
					}
				}
			}
	  
			function isCallback (callback) {
				_this.clear()
				if (callback && typeof callback === 'function') {
					return true
				}
				return false
			}
			Object.assign(defaultOptions, options)
			console.log('defaultOptions', defaultOptions)
	  
			// 自动隐藏
			if (defaultOptions.duration > 0) {
				clearTimeout(_this.timer)
				_this.timer = setTimeout(() => {
					_this.clear()
				}, defaultOptions.duration)
			}
	  
			this.instance = createApp(Dialog, defaultOptions)
			document.body.appendChild(this.parent)
			this.instance.mount(this.parent)
		})
	},  
	hide () {
		this.clear()
	}
}
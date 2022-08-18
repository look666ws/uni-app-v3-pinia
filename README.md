# **uniapp-vue3组件**

## 公共弹窗dialog （toast、loading同理）

```vue
第一步：mian.js
	import Toast from '@/components/publicFile/toast'
  import Dialog from '@/components/publicFile/dialog'
  import Loading from '@/components/publicFile/loading'
  const app=createApp(App);
  app.use(Toast)
  app.use(Dialog)
  app.use(Loading)
引入方式一：
	import Dialog from '@/components/dialog/dialog'
	Dialog.show({
		title: '提示',
		showClose: true,
		icon: 'success',
		duration: 3000,
		contentColor: '#fff',
		content: '我是内容',
		confirmText: '确认',
		cancelText: '取消',
		confirm: () => {
			console.log('点击确认')
		},
		cancel: () => {
			console.log('点击取消')
		}
	})
	Dialog.hide()
	
	引入方式二：
	import { getCurrentInstance  } from 'vue'
	const instance = getCurrentInstance()
	instance.proxy.$dialog.show({})
	instance.proxy.$dialog.hide()
```

## progress 可拖动进度

### circleLoading 圆形动态进度
<!-- 
	引入方式一：
	import Toast from '@/components/toast/toast'
	Toast.show({
		title: "默认",
		type: 'error',
		duration: 0
	})
	Toast.hide()
	
	引入方式二：
	import { getCurrentInstance  } from 'vue'
	const instance = getCurrentInstance()
	instance.proxy.$toast.show({})
	instance.proxy.$toast.hide()
 -->
<template>
  <view class="toast">
    <view v-if="mask" class="mask"></view>
    <view class="toast" :style="style[type]"> {{ title }}</view>
  </view>
</template>

<script setup>
defineProps({
  title: String,
  type: String,
  mask: Boolean,
});

const style = {
  success: {
    color: "#fff",
    backgroundColor: "#f0f9eb",
  },
  warning: {
    color: "#fff",
    backgroundColor: "#fdf6ec",
  },
  info: {
    color: "#fff",
    backgroundColor: "#f4f4f5",
  },
  error: {
    color: "#fff",
    backgroundColor: "rgb(212, 52, 52, .8)",
  },
};
</script>

<style lang="scss" scoped>
.toast {
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    width: 100vw;
    height: 100vh;
  }

  .toast {
    position: fixed;
    top: 40%;
    left: 50%;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    border-radius: 10rpx;
    font-size: 36rpx;
    min-width: 200rpx;
    line-height: 60rpx;
    padding: 35rpx 132rpx;
  }
}
</style>

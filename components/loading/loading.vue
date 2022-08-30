<!-- 
	引入方式一：
	import Loading from '@/components/loading/loading'
	Loading.show({})
	Loading.hide()
	
	引入方式二：
	import { getCurrentInstance  } from 'vue'
	const instance = getCurrentInstance()
	instance.proxy.$loading.show()
	instance.proxy.$loading.hide()
 -->
<template>
  <view class="loading">
    <view v-if="mask" class="mask"></view>
    <view class="loading" v-cloak>
      <view class="icon">
        <view class="line" v-for="index of 6" :key="index"></view>
      </view>
      <view class="text">{{ title || "加载中..." }}</view>
    </view>
  </view>
</template>

<script setup>
defineProps({
  title: String,
  mask: Boolean,
});
</script>

<style lang="scss" scoped>
.loading {
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 99;
  }

  .loading {
    width: 250rpx;
    height: 250rpx;
    position: fixed;
    left: 50%;
    top: 30%;
    z-index: 100;
    background-color: rgba(130, 130, 130, 0.7);
    transform: translateX(-100rpx);
    border-radius: 10rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .icon {
      width: 60rpx;
      height: 60rpx;
      position: relative;

      .line {
        position: absolute;
        left: 50%;
        top: 0;
        width: 4rpx;
        height: 100%;

        &::before {
          position: absolute;
          top: 0;
          display: block;
          content: "";
          width: 4rpx;
          height: 15rpx;
          background-color: white;
          border-radius: 5rpx 5rpx 0 0;
        }

        &::after {
          position: absolute;
          bottom: 0;
          display: block;
          content: "";
          width: 4rpx;
          height: 15rpx;
          background-color: white;
          border-radius: 0 0 5rpx 5rpx;
        }

        &:nth-child(1) {
          &::before {
            animation: loading 1.2s linear 0s infinite;
          }
          &::after {
            animation: loading 1.2s linear 0.6s infinite;
          }
        }

        &:nth-child(2) {
          transform: rotate(30deg);
          &::before {
            animation: loading 1.2s linear 0.1s infinite;
          }
          &::after {
            animation: loading 1.2s linear 0.7s infinite;
          }
        }

        &:nth-child(3) {
          transform: rotate(60deg);
          &::before {
            animation: loading 1.2s linear 0.2s infinite;
          }
          &::after {
            animation: loading 1.2s linear 0.8s infinite;
          }
        }

        &:nth-child(4) {
          transform: rotate(90deg);
          &::before {
            animation: loading 1.2s linear 0.3s infinite;
          }
          &::after {
            animation: loading 1.2s linear 0.9s infinite;
          }
        }

        &:nth-child(5) {
          transform: rotate(120deg);
          &::before {
            animation: loading 1.2s linear 0.4s infinite;
          }
          &::after {
            animation: loading 1.2s linear 1s infinite;
          }
        }

        &:nth-child(6) {
          transform: rotate(150deg);
          &::before {
            animation: loading 1.2s linear 0.5s infinite;
          }
          &::after {
            animation: loading 1.2s linear 1.1s infinite;
          }
        }
      }

      @keyframes loading {
        from {
          opacity: 0;
        }

        to {
          opacity: 1;
        }
      }
    }

    .text {
      margin-top: 26rpx;
      font-size: 30rpx;
      color: #fff;
    }
  }
}
</style>

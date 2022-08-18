<template>
  <view class="container">
    <span>{{ percent }}s</span>
    <view class="circle" :style="percent == 20 ? 'animation-play-state:paused;' : ''"
      ><view class="ring"></view
    ></view>
  </view>
</template>

<script setup>
import { watch, getCurrentInstance } from "vue";
const emit = defineEmits(["clear"]);
const instance = getCurrentInstance();
// 进度
const props = defineProps({
  percent: {
    type: Number || String,
    default: 0,
  },
});
watch(
  props,
  (newValue, old) => {
    if (newValue.percent == 20) {
      emit("clear");
      instance.proxy.$dialog.hide();
    }
  },

  { immediate: true }
);
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  span {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    color: #008cff;
    font-size: 24rpx;
  }

  .circle {
    position: relative;
    margin: 0 auto;
    height: 80rpx;
    width: 80rpx;
    background-color: #394149;
    border-radius: 50%;
    animation: zhuan 2s linear infinite;

    &::after {
      content: "";
      position: absolute;
      top: 5rpx;
      left: 5rpx;
      right: 5rpx;
      bottom: 5rpx;
      background-color: #252b32;
      border-radius: 50%;
    }
  }

  .ring {
    position: absolute;
    top: 0;
    left: 0;
    width: 40rpx;
    height: 80rpx;
    background-image: linear-gradient(180deg, #008cff, #394149 80%);
    border-radius: 40rpx 0 0 40rpx;
  }

  @keyframes zhuan {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
}
</style>

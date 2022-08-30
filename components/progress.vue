<template>
  <view class="wrapper" :style="{ width: `${widthWrapper}rpx` }">
    <view class="inner" :style="{ width: `${widthInner}rpx` }"></view>
    <view
      :style="{ left: `${widthInner - 20}rpx` }"
      class="circleWrapper"
      @touchmove="touchmove"
    >
      <view class="circle"></view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from "vue";

let widthWrapper = ref(400); // 外层的宽度
let widthInner = ref(60); // 内层要改变的宽度
let styleWrapper = ref(null); // container样式
let scale = ref(0); // px与rpx转换比例 0.5

// 获取元素位置
onMounted(() => {
  let obj = uni.createSelectorQuery().select(".wrapper");
  obj
    .boundingClientRect(function (data) {
      styleWrapper.value = data;
      scale.value = data.width / widthWrapper.value;
    })
    .exec();
});

const touchmove = (e) => {
  let newX = Math.round(e.touches[0].clientX - styleWrapper.value.left) / scale.value;
  newX = newX > widthWrapper.value ? widthWrapper.value : newX;
  newX = newX < 0 ? 0 : newX;
  widthInner.value =
    widthInner.value <= widthWrapper.value ? Math.round(newX) : widthWrapper.value;
};
</script>

<style lang="scss" scoped>
.wrapper {
  height: 10rpx;
  background: rgba(255, 255, 255, 0.1);
  position: relative;
  border-radius: 5rpx;

  .inner {
    height: 10rpx;
    background-color: #008cff;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 5rpx;
  }

  .circleWrapper {
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 40rpx;
    height: 40rpx;
    border-radius: 50%;
    // background-color: red;
    display: flex;
    align-items: center;
    justify-content: center;

    .circle {
      width: 16rpx;
      height: 16rpx;
      background: #141414;
      border: 4rpx solid #008cff;
      border-radius: 50%;
    }
  }
}
</style>

<template>
  <view class="stepper">
    <view class="left">
      <!-- 减号
				@click="onChange('minus')"  -->
      <view
        class="triangle"
        :class="{ active: activeBtn == 'minus' }"
        @touchstart.native.prevent="onChangeTouchstart('minus')"
        @touchmove.native.prevent="onChangeTouchmove"
        @touchend.native.prevent="onChangeTouchend('minus')"
      >
        <view class="icon left"></view>
      </view>
      <!-- 滑动条 -->
      <view class="content">
        <text class="num">-90°</text>
        <view class="wrapper">
          <view
            class="box"
            :style="{ left: `${widthInner - 75}rpx` }"
            @touchstart.native.prevent="onTouchstart"
            @touchmove.native.prevent="onTouchmove"
            @touchend.native.prevent="onTouchend"
          >
            <view class="top">{{ deg }}°</view>
            <view class="bottom"></view>
          </view>
        </view>
        <text class="num">90°</text>
      </view>
      <!-- 加号
				@click="onChange('plus')"  -->
      <view
        class="triangle"
        :class="{ active: activeBtn == 'plus' }"
        @touchstart.native.prevent="onChangeTouchstart('plus')"
        @touchmove.native.prevent="onChangeTouchmove"
        @touchend.native.prevent="onChangeTouchend('plus')"
      >
        <view class="icon right"> </view>
      </view>
    </view>
    <button class="triangleBtn" @click="onConfirm">确认</button>
  </view>
</template>
<script setup>
import { ref, getCurrentInstance, onMounted, watch } from "vue";
import { powerShovelStore } from "@/store/module/powerShovel";
import emitter from "@/utils/mitt.js";

const powerShovel = powerShovelStore();
const instance = getCurrentInstance();
const widthWrapper = ref(621); // 外层的宽度
const widthInner = ref(widthWrapper.value / 2); // 内层要改变的宽度
const scale = ref(0); // px与rpx转换比例 0.5
const deg = ref(0); // 旋转角度
const times = ref(0); // 次数
const styleWrapper = ref(null); // container样式
const timer = ref(null); // 长按定时器
const timer2 = ref(null); // 事件执行定时器
const activeBtn = ref(null); // 选中按钮
const isDialog = ref(false); // 展示弹窗

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

watch(
  widthInner,
  (newValue, oldValue) => {
    let num = Math.round((newValue * 180) / widthWrapper.value); // 旋转角度 1度 = 621 /180
    deg.value = num <= 90 ? num - 90 : num - 90;
    emitter.emit("changeDeg", deg.value);
  },
  { immediate: true }
);

// 拖动滑块 start
const onTouchstart = (e) => {
  uni.showToast({
    title: "开始拖动",
    icon: "none",
    duration: 2000,
  });
};

// 拖动滑块 move
const onTouchmove = (e) => {
  let newX = Math.round(e.touches[0].clientX - styleWrapper.value.left) / scale.value;
  newX = newX > widthWrapper.value ? widthWrapper.value : newX < 0 ? 0 : newX;
  widthInner.value =
    widthInner.value <= widthWrapper.value ? Math.round(newX) : widthWrapper.value;
};

// 拖动滑块 end
const onTouchend = (e) => {
  uni.showToast({
    title: "结束拖动",
    icon: "none",
    duration: 2000,
  });
};

// 点击左右按钮
const onChange = (type) => {
  if (type == "minus") {
    widthInner.value =
      widthInner.value - widthWrapper.value / 180 > 0
        ? widthInner.value - widthWrapper.value / 180
        : 0;
  } else {
    widthInner.value =
      widthInner.value + widthWrapper.value / 180 < widthWrapper.value
        ? widthInner.value + widthWrapper.value / 180
        : widthWrapper.value;
  }
};

// 长按按钮 start
const onChangeTouchstart = (type) => {
  clearTimer();
  times.value = 0;
  timer.value = setTimeout(function () {
    onTimeChange(type);
    times.value++;
  }, 500);
  activeBtn.value = type;
};

// 长按按钮 move
const onChangeTouchmove = () => {
  clearTimer();
};

// 长按按钮 end
const onChangeTouchend = (type) => {
  clearTimer();
  if (times.value == 0) {
    // 点击一次
    onChange(type);
  }
};

// 长按按钮 数字增加/减少
const onTimeChange = (type) => {
  timer2.value = setInterval(() => {
    onChange(type);
  }, 100);
};

// 清除定时器
const clearTimer = () => {
  clearTimeout(timer.value);
  clearInterval(timer2.value);
  timer.value = null;
  timer2.value = null;
  activeBtn.value = null;
};

const onConfirm = () => {
  // 点击确认
  isDialog.value = true;
};

const onHide = (status) => {
  // 路线规划完成
  isDialog.value = false;
  if (!status) {
    // 路线规划成功
    instance.proxy.$dialog.show({
      duration: 3000,
      contentColor: "#00FF62",
      content: "线路规划成功！",
      confirm: () => {
        // TODO: 隐藏度数，出现三个按钮
        powerShovel.changeDirection(false);
        powerShovel.changeLoadInd(0);
      },
    });
  } else {
    // 路线规划失败
    instance.proxy.$dialog.show({
      contentColor: "#D43434",
      content: "线路规划失败。",
      confirmText: "重新指点",
      confirm: () => {
        console.log("重新指点");
        widthInner.value = widthWrapper.value / 2;
      },
    });
  }
};
</script>

<style lang="scss" scoped>
.stepper {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;

  .triangleBtn {
    width: 200rpx;
    height: 68rpx;
    background: #ff8c5a;
    border-radius: 10rpx;
    font-size: 28rpx;
    color: #fff;
    margin: 0;
  }

  .left {
    display: flex;

    .triangle {
      width: 68rpx;
      height: 68rpx;
      background: #4d535c;
      border-radius: 10rpx;
      display: flex;
      align-items: center;
      justify-content: center;

      .icon {
        width: 0;
        height: 0;
        border-top: 18rpx solid transparent;
        border-bottom: 18rpx solid transparent;
        border-radius: 5rpx;

        &.left {
          margin-left: -5rpx;
          border-right: 25rpx solid #fff;
        }

        &.right {
          margin-right: -5rpx;
          border-left: 25rpx solid #fff;
        }
      }

      &.active,
      &:active {
        .icon {
          &.left {
            border-right-color: #ec8357;
          }

          &.right {
            border-left-color: #ec8357;
          }
        }
      }
    }
  }

  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 28rpx;

    .num {
      padding: 0 16rpx;
      color: #d8d8d8;
    }

    .wrapper {
      width: 621rpx;
      height: 16rpx;
      background-color: #4d535c;
      position: relative;

      &::after {
        content: "";
        width: 3rpx;
        height: 100%;
        position: absolute;
        left: 50%;
        top: 0;
        transform: translate(-50%);
        background-color: rgba(255, 255, 255, 0.3);
        z-index: 0;
      }

      .box {
        width: 150rpx;
        height: 150rpx;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: absolute;
        top: 50rpx;
        left: -40rpx;
        transform: translate(0, -80%);
        z-index: 1;

        .top {
          width: 100%;
          height: 50rpx;
          line-height: 45rpx;
          //   可更换背景图
          background: red;
          text-align: center;
        }

        .bottom {
          width: 16rpx;
          height: 40rpx;
          margin-top: 5rpx;
          background-color: #ec8357;
        }
      }
    }
  }
}
</style>

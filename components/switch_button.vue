<template>
  <view
    @click="changeSwitch"
    :class="
      ischeckedSwitch ? 'switch_button switch_button_checked' : 'switch_button'
    "
  >
    <view
      :class="
        ischeckedSwitch ? 'switch_circle switch_checked' : 'switch_circle'
      "
    ></view>
  </view>
</template>

<script>
export default {
  setup() {
    let ischeckedSwitch = ref(false);
    const changeSwitch = () => {
      ischeckedSwitch.value = !ischeckedSwitch.value;
    };
    return {
      ischeckedSwitch,
      changeSwitch,
    };
  },
};
</script>

<style lang="scss" scoped>
.switch_button_checked {
  background-color: #008cff !important;
}
.switch_button {
  width: 52rpx;
  height: 28rpx;
  background-color: #5a5a5a;
  border-radius: 15rpx;
  .switch_circle {
    width: 25rpx;
    height: 25rpx;
    border-radius: 50%;
    background: #fff;
    transition: transform 0.3s;
  }
  .switch_checked {
    transform: translateX(25rpx);
  }
}
</style>
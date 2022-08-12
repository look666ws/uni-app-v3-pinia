<template>
	<view class="container">
		<span>{{ percent }}s</span>
		<view class="circle"><view class="ring"></view></view>
	</view>
</template>

<script setup>
	// 进度
const props = defineProps({
	percent: {
		type: Number || String,
		default: 0
	}
});
</script>

<style lang="scss" scoped>
.container {
	span {
		position: absolute;
		left: 50%;
		top: 58%;
		transform: translate(-55%, -55%);
		color: rgb(20, 129, 202);
		text-shadow: 0 0 10px rgb(20, 129, 202), 0 0 30px rgb(20, 129, 202), 0 0 60px rgb(20, 129, 202),
			0 0 100px rgb(20, 129, 202);
		font-size: 24rpx;
		z-index: 1;
	}

	.circle {
		position: relative;
		margin: 0 auto;
		height: 150px;
		width: 150px;
		background-color: #394149;
		border-radius: 50%;
		animation: zhuan 2s linear infinite;
		zoom: 0.3;
	}

	@keyframes zhuan {
		0% {
			transform: rotate(0deg);
		}

		100% {
			transform: rotate(360deg);
		}
	}

	.circle::after {
		content: '';
		position: absolute;
		top: 10px;
		left: 10px;
		right: 10px;
		bottom: 10px;
		background-color: #252b32;
		border-radius: 50%;
	}

	.ring {
		position: absolute;
		top: 0;
		left: 0;
		width: 75px;
		height: 150px;
		background-image: linear-gradient(180deg, #008cff, #394149 80%);
		border-radius: 75px 0 0 75px;
	}
}
</style>

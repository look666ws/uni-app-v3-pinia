
<template>
	<view class="dialog">
		<view class="body">
			<view class="header" v-if="title || showClose">
				<view class="title" v-if="title">{{ title }}</view>
				<image class="close" v-if="showClose" src="../../static/image/close.png" @click="handleCancel" />
			</view>
			<view class="border" v-if="title"></view>
			<view class="content" :style="{'margin-top': title ? '' : '30rpx'}" v-if="!isChild">
				<image class="icon" v-if="icon" :src="`../components/dialog/images/${icon}.png`" />
				<view class="main">{{ content }}</view>
			</view>
			<view class="border" v-if="title"></view>
			<view class="footer" v-if="cancelText || confirmText">
				<button 
					v-if="cancelText" 
					class="btn" 
					@click="handleCancel" 
					:style="{ 'background-color': cancelColor, 
								'border-color': cancelColor == 'transparent' ? '#8EA1C3' : cancelColor }"
				>{{ cancelText }}</button>
				<button 
					v-if="confirmText" 
					class="btn" 
					@click="handleSuccess" 
					:style="{ 'background-color': confirmColor,
								'border-color': confirmColor == 'transparent' ? '#8EA1C3' : confirmColor }"
					>{{ confirmText}}</button>
			</view>
		</view>
	</view>
</template>
<script setup>
import { ref } from 'vue'

const props = defineProps({
	title: String,
	icon: String,
	content: String,
	contentColor: String,
	showClose: Boolean,
	confirmText: String,
	confirmColor: String,
	cancelText: String,
	cancelColor: String,
	isChild: Boolean,
	handleSuccess: Function,
	handleCancel: Function
})

const emit = defineEmits(["success", "cancel"])
const handleSuccess = () => {
	if (props.isChild) {
		emit("success")	
	} else {
		props.handleSuccess()
	}
}

const handleCancel = () => {
	if (props.isChild) {
		emit("cancel")
	} else {
		props.handleCancel()
	}
}
</script>
<style lang="scss" scoped>
.dialog {
	width: 100vw;
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 99;
	background: rgb(0, 0, 0, 0.8);

    .body {
		width: 740rpx;
		height: 450rpx;
		border-radius: 10rpx;
		position: absolute;
		top: 30%;
		right: 28%;
		background-color: rgba(46,53,61, .8);
		color: #fff;
		display: flex;
		flex-direction: column;

	.header {
		height: 100rpx;
		padding: 0 12rpx 0 24rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		
		.close {
			width: 50rpx;
			height: 50rpx;
			cursor: pointer;
		}
	}
	
	.border {
		width: 100%;
		height: 1px;
		background-color: #394757;
	}
    
    .content {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding: 0 120rpx;
		
		&.content-file {
			display: block;
			padding: 0;
			max-height: 200rpx;
			overflow-y: auto;
		}
		
		.icon {
			width: 84rpx;
			height: 84rpx;
			margin-bottom: 20rpx;
		}
		
		.main {
			font-size: 36rpx;
			line-height: 60rpx;
		}
    }
	

    .footer {
		width: 100%;
		height: 148rpx;
		display: flex;
		align-items: center;
		justify-content: space-around;

    .btn {
        width: 230rpx;
		height: 68rpx;
		border: 1px solid transparent;
		border-radius: 10rpx;
        font-size: 28rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		padding: 0;
      }
    }
  }

}
</style>






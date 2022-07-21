<template>
	<view class="login_dialog position_box">
		<view class="login_content position_content">
			<view class="content_box">
				<!-- 密码框变* -->
				<view :class="isBorderPass ? 'pass focusPass' : 'pass'">
					<input
						type="text"
						placeholder="密码"
						v-model="passWrod"
						@input="getPassWord"
						@focus="focusPass"
						@blur="blurPass"
					/>
				</view>

				<button @click="loginHandel">登录</button>
			</view>
		</view>
	</view>
</template>

<script>
import { onMounted, ref, reactive, watch } from 'vue';
import { mainStore } from '@/store/index.js';
export default {
	setup() {
		let passWrod = ref('');
		let fromvalue = reactive([]);
		const store = mainStore();
		const getPassWord = e => {
			let data = e.detail.value;
			passWrod.value = data.replace(/./g, '*');
			if (data.substr(data.length - 1, 1) == '*' || data.substr(data.length - 1, 1) == '') {
				fromvalue.pop();
			} else {
				fromvalue.push(data.substr(data.length - 1, 1));
			}
		};
		const loginHandel = () => {
			store.changeLoginDialog(false);
			console.log(fromvalue.join(''), '=====');
		};

	

		return {
			passWrod,
			getPassWord,
			loginHandel,
			fromvalue,
			realPassWrod,
			store
		};
	}
};
</script>

<style lang="scss" scoped>
.login_dialog {
	.content_box {
		padding: 50rpx;
		input {
			height: 100% !important;
			caret-color: #fff;
			color: #fff;
			flex: 1;
			align-items: center;
		}

		.user,
		.pass {
			height: 88rpx;
			display: flex;
			align-items: center;
			// border: 1rpx solid #3D8ACA;
			// box-shadow: 0rpx 0rpx 6rpx 0rpx rgba(61,138,202,0.5);
			// border-radius: 10rpx;
			border: 1rpx solid #394757;
			border-radius: 10rpx;
			background: rgba(0, 0, 0, 0.2);
		}
		.focusUser,
		.focusPass {
			border: 1rpx solid #3d8aca;
			box-shadow: 0rpx 0rpx 6rpx 0rpx rgba(61, 138, 202, 0.5);
			border-radius: 10rpx;
		}
		.pass {
			margin-top: 20rpx;
		}
		.iconUser,
		.password {
			width: 30rpx;
			height: 30rpx;
			padding: 20rpx;
			image {
				width: 100%;
				height: 100%;
				display: flex;
				align-items: center;
			}
		}
		button {
			background: #ff8c5a;
			border-radius: 10rpx;
			color: #fff;
			margin-top: 40rpx;
		}
	}
}
</style>

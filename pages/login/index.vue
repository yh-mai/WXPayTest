<template>
	<view class="app-container">
		<!-- <image src="../../static/img/login_bottom.png" mode="" class="imgStyle"></image> -->
		<!-- <view class="title1">手机快捷登录</view>
		<view class="title2">您好！欢迎登录链尚武夷</view> -->
		<u-form :model="form" ref="uForm"  label-width="110rpx" :label-style="labelStyle">
			<u-form-item label="url" prop="url"><u-input maxlength="-1" v-model="form.url" placeholder="请输入url" /></u-form-item>
			<!-- <u-form-item label="手机号" prop="phone"><u-input v-model="form.phone" placeholder="请输入手机号" /></u-form-item> -->
			<!-- <u-form-item label="验证码" prop="code"><u-input v-model="form.code" placeholder="请输入验证码" /><text slot="right" class="codeBtnStyle" @tap="getCode">{{tips}}</text></u-form-item> -->
		</u-form>
		<button class="loginBtnStyle" @click="login">登录</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				labelStyle:{
					color:'#FFFBDB',
				},
				rules: {
					phone: [
						{ required: true, message: '请输入手机号', trigger: ['blur']},
						{ validator: (rule, value, callback) => {
									return this.$u.test.mobile(value);
							},
							message: '手机号格式不正确',
							trigger: ['blur'],
						}
					],
					code: [{ required: true, message: '请输入验证码', trigger: ['blur']}],
					url: [{ required: true, message: '请输入url', trigger: ['blur']}],
				},
				form:{phone:'', code:'', url:''},
				checked:false,
				showBtn: true,
				clientHeight:document.documentElement.clientHeight,
				// 验证码倒计时组件
				tips: '',
				seconds: 60,
			};
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules)
		},
		mounted(){
			window.onresize= ()=>{
				if(this.clientHeight>document.documentElement.clientHeight) {
					this.showBtn =false
				}else{
					this.showBtn = true
				}
			}
		},
		methods:{
			// 验证码倒计时组件 -- start
			codeChange(text) {
				this.tips = text;
			},
			getCode() {
				// 判断是否输入了手机号
				if (!this.form.phone) {
					this.$u.toast('请输入手机号')
			    return false
			  } else {
			    if (!this.$u.test.mobile(this.form.phone)) {
						this.$u.toast('手机号格式不正确')
			      return false
			    }
			  }
				if(this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码'
					})
					setTimeout(() => {
						uni.hideLoading();
						// 这里此提示会被this.start()方法中的提示覆盖
						// this.$u.toast('验证码已发送');
						// 通知验证码组件内部开始倒计时
						this.$refs.uCode.start();
					}, 2000);
				} else {
						// this.$u.toast('倒计时结束后再发送');
					}
			},
			end() {
				// this.$u.toast('倒计时结束');
			},
			start() {
				this.$u.toast('验证码已发送')
			},
			// 验证码倒计时组件 -- end
			// 登录
			login(){
				this.$refs.uForm.validate(valid => {
					if(valid){
						window.location.href = this.form.url
					}
				})
				
			},
			// 跳转到注册
			jumpToRegister(){
				uni.navigateTo({
				    url: '/pages/register/index'
				});
			},
			// 服务协议
			jumpToAgreement(){
				uni.navigateTo({
				    url: '/pages/agreement/index'
				});
			},
			// 隐私政策
			jumpToPrivacy(){
				uni.navigateTo({
				    url: '/pages/agreement/privacy'
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
page{
	background-color: #00182F;
}
.app-container{
	padding: 67rpx 80rpx 32rpx;
	height: calc(100vh - 100rpx);
	position: relative;
	.title1{
		font-size: 54rpx;
		font-family: Source Han Sans SC;
		font-weight: 500;
		color: #FFFBDB;
	}
	.title2{
		margin: 16rpx 0 80rpx;
		font-size: 28rpx;
		font-family: Source Han Sans SC;
		font-weight: 400;
		color: #949A99;
	}
	.codeBtnStyle{
		color: #F6D36F;
	}
	.loginBtnStyle{
		margin-top: 46rpx;
		height: 80rpx;
		color: #00182F;
		font-size: 32rpx;
		font-weight: 500;
		font-family: Source Han Sans SC;
		background-color: #F6D36F;
		border-radius: 40rpx;
	}
	.registerBtnStyle{
		margin-top: 34rpx;
		font-size: 24prx;
		font-family: Source Han Sans SC;
		font-weight: 400;
		color: #F6D36F;
		text-align: center;
	}
	.imgStyle{
		position: absolute;
		bottom: 20rpx;
		left: 50%;
		transform: translate(-50%, 0);
	}
	.agreementBoxStyle{
		display: flex;
		align-items: baseline;
		width: calc(100% - 130rpx);
		position: absolute;
		bottom: 20rpx;
		left: 50%;
		transform: translate(-50%, 0);
		z-index: 1;
		// 复选框样式
		/deep/.u-checkbox__label{
			margin-left: 0;
		}
		/deep/.u-checkbox__icon-wrap--square{
			width: 24rpx !important;
			height: 24rpx !important;
			border-radius: 5rpx;
			border-color: #405559;
		}
		// 复选框选中后样式
		/deep/.u-checkbox__icon-wrap--checked{
			background-color: #032B51;
			.uicon-checkbox-mark:before{
				color: #F6D36F;
			}
		}
		.agreementStyle{
			font-size: 24rpx;
			font-family: Source Han Sans SC;
			font-weight: 400;
			color: #949A99;
		}
	}
}
// 表单下边框颜色
.u-border-bottom:after{
	border-color: #F6D36F;
	opacity: 0.25;
}
// 表单中提示字颜色
.uni-input-placeholder{
	color: #949A99 !important;
}
// 表单中输入的文字颜色
/deep/.u-input__input{
	color: #FFFFFF !important;//颜色在这里
}
</style>

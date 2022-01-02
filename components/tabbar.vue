<template>
    <view class="tabbar-container" :style="{'padding-bottom': paddingBottomHeight + 'rpx'}">
        <!-- <view class="tabbar-item"
            v-for="(item, index) in list" 
            :key="index" 
            @click="tabbarChange(item.path)"
        >
            <cover-image class="item-img" :src="current == index ? item.icon_select : item.icon"></cover-image>
            <view class="item-name" :class="{'tabbarActive': current == index}" v-if="item.text">{{item.text}}</view>
        </view> -->
		<image src="@/static/icon/tabbg.png" mode="" class="tabbg"></image>
		<view class="tabbar-item" v-for="(item, index) in list" :key="index" :class="[item.centerItem ? ' center-item' : '']" @click="tabbarChange(item.path)">
			<view class="item-top"><image :src="currentItem == index ? item.selectIcon : item.icon"></image></view>
			<view class="item-bottom" :class="[currentItem == index ? 'item-active' : '']">
				<text>{{ item.text }}</text>
			</view>
		</view>
		
		<!-- <view class="u-page">
		</view>
		<u-tabbar v-model="current" :list="list" :mid-button="true" active-color='#5098FF'></u-tabbar>
		 -->
	</view>
</template>

<script>
export default {
    props: {
        currentPage: {
			type: Number,
			default: 0
		}
    },
    data() {
        return {
			currentItem: 0,
            paddingBottomHeight: 0,  //苹果X以上手机底部适配高度
            list: [{
                    text: '发现',  
                    icon: '/static/icon/home.png',  //未选中图标
                    selectIcon: '/static/icon/home-select.png',  //选中图片
                    path: "/pages/home/index",  //页面路径
                },{
                    text: '武夷仙',
                    icon: '/static/icon/center.png',
                    selectIcon: '/static/icon/center-select.png',
                    path: "/pages/center/index",
					centerItem: true,
					midButton: true,
                },{
                    text: '我的',
                    icon: '/static/icon/my.png',
                    selectIcon: '/static/icon/my-select.png',
                    path: "/pages/my/index",
                },
            ]
        };
    },
    created() {
        let that = this;
        uni.getSystemInfo({
            success: function (res) {
                let model = ['X', 'XR', 'XS', '11', '12', '13', '14', '15'];
                model.forEach(item => {
                    //适配iphoneX以上的底部，给tabbar一定高度的padding-bottom
                    if(res.model.indexOf(item) != -1 && res.model.indexOf('iPhone') != -1) {
                        that.paddingBottomHeight = 40;
                    }
                })
            }
        });
    },
    watch: {
        
    },
    methods: {
        tabbarChange(path) {
            uni.switchTab({
                url: path
            })
        }
    },
	mounted() {
		this.currentItem = this.currentPage
		uni.hideTabBar();
	}
};
</script>

<style lang="scss" scoped>
    // .tabbarActive{
    //     color: #79D5AD !important;
    // }
    // .tabbar{
    //     position: fixed;
    //     bottom: 0;
    //     left: 0;
    //     right: 0;
    //     display: flex;
    //     justify-content: space-around;
    //     align-items: center;
    //     width: 100%;
    //     height: 100rpx;
    //             background-color: #ffffff;
    //     .tabbar-item{
    //         display: flex;
    //         flex-direction: column;
    //         align-items: center;
    //         justify-content: center;
    //         height: 100rpx;
    //         .item-img{
    //             margin-bottom: 4rpx;
    //             width: 46rpx;
    //             height: 46rpx;
    //         }
    //         .item-name{
    //             font-size: 26rpx;
    //             color: #A3A3A3;
    //         }
    //     }
    // }
	
	view {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
	}
	.tabbar-container {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 168rpx;
		// box-shadow: 0 0 5px #999;
		display: flex;
		align-items: center;
		padding: 5rpx 0;
		color: #FFFBDB;
		// background: #000000;
		// background: url(../static/icon/tabbg.png) no-repeat center;
		// background-size: 100% 100%;
		z-index: 9;
		.tabbg{
			width: 100%;
			height: 168rpx;
			position: absolute;
			top: 0;
			left: 0;
			z-index: -1;
		}
	}
	.tabbar-container .tabbar-item {
		width: 33.33%;
		// height: 100rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		color: #FFFBDB;
	}
	.tabbar-container .item-active {
		color: #EACA6C;
	}
	.tabbar-container .center-item {
		display: block;
		position: relative;
	}
	.tabbar-container .tabbar-item .item-top {
		width: 46rpx;
		height: 46rpx;
		// padding: 10rpx;
		margin: 20rpx 0;
	}
	.tabbar-container .center-item .item-top {
		flex-shrink: 0;
		width: 74rpx;
		height: 74rpx;
		position: absolute;
		top: -84rpx;
		left: calc(50% - 36rpx);
		border-radius: 50%;
		box-shadow: 0 0 5px #999;
		background-color: #ffffff;
	}
	.tabbar-container .tabbar-item .item-top image {
		width: 100%;
		height: 100%;
	}
	.tabbar-container .tabbar-item .item-bottom {
		font-size: 20rpx;
		width: 100%;
	}
	.tabbar-container .center-item .item-bottom {
		position: absolute;
		bottom: -60rpx;
	}
</style>
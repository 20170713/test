<template>
  <view>
    <!-- 搜索 -->
    <view class="search-box">
          <my-search @click="gotoSearch"></my-search>
    </view>

    <!-- 轮播图区域 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular="true">
      <swiper-item v-for="(item,index) in swiperList" :key="index">
        <navigator class="swiper-item" :url="'../../subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id">
          <image :src="item.image_src" mode=""></image>
        </navigator>
      </swiper-item>
    </swiper>

    <!-- 分类导航区域 -->
    <view class="nav-list">
      <view class="nav-item" v-for="(item,index) in navList" :key="index" @click="navClickHandler(item)">
        <image :src="item.image_src" class="nav-img"></image>
      </view>
    </view>

    <!-- 楼层区域 -->
    <view class="floor-list">
      <view class="floor-item" v-for="(item,i) in floorList" :key="i">
        <!-- 楼层标题 -->
        <image :src="item.floor_title.image_src" class="floor-title"></image>
        <!-- 楼层图片区域 -->
        <view class="floor-img-box">
          <!-- 左侧大图片 -->
          <navigator class="left-img-box" :url="item.product_list[0].url">
            <image :src="item.product_list[0].image_src" :style="{width: item.product_list[0].image_width + 'rpx'} "></image>
          </navigator>
          <!-- 右侧4个图片 -->
          <view class="right-img-box">
            <template v-for="(item2,index) in item.product_list" :key="index">
              <navigator class="right-img-item"  v-if="index !== 0" :url="item2.url">
                <image :src="item2.image_src" mode="widthFix" :style="{width: item2.image_width + 'rpx'}"></image>
              </navigator>
            </template>
          </view>
        </view>
      </view>
    </view>

  </view>
</template>

<script>
  export default {
    data() {
      return {
        //轮播图的数据列表
        swiperList: [],
        //分类导航的数据列表
        navList: [],
        //楼层的数据列表
        floorList: [],
        productList: [],
        leftList: [],
      };
    },
    onLoad() {
      this.getSwiperList()
      this.getNavList()
      this.getFloorList()
    },
    methods: {
      //获取轮播图数据
      async getSwiperList() {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/home/swiperdata')
        if (res.meta.status !== 200) return uni.$showMsg()
        this.swiperList = res.message
      },

      //获取分类导航的数据
      async getNavList() {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/home/catitems')
        if (res.meta.status !== 200) return uni.$showMsg()
        this.navList = res.message
      },

      //点击分类导航实现跳转的功能
      navClickHandler(item) {
        if (item.name === '分类') {
          uni.switchTab({
            url: '/pages/cate/cate'
          })
        }
      },

      //获取楼层的数据列表
      async getFloorList() {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/home/floordata')
        if (res.meta.status !== 200) return uni.$showMsg()
         res.message.forEach(floor => {
            floor.product_list.forEach(prod => {
              prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split('?')[1]
            })
          })
        this.floorList = res.message
        },
        
        //跳转到搜索页面
        gotoSearch() {
          uni.navigateTo({
            url: '/subpkg/search/search'
          })
        },
  },
  }
</script>

<style lang="scss">
  swiper {
    height: 330rpx;

    .swiper-item,
    image {
      width: 100%;
      height: 100%;
    }
  }

  .nav-list {
    display: flex;
    justify-content: space-around;
    margin: 15rpx;

    .nav-img {
      width: 128rpx;
      height: 140rpx;
    }
  }

  .floor-title {
    height: 60rpx;
    width: 100%;
    display: flex;
  }
  .right-img-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  .floor-img-box {
    display: flex;
    padding-left: 10rpx;
  }
  
  //搜索
  .search-box {
    position: sticky;
    top: 0;
    z-index: 999;
  }
</style>
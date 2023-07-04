<template>
  <view class="goods-item">
    <!-- 商品左侧图片区域 -->
    <view class="goods-item-left">
      <image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
    </view>
    <!-- 商品右侧信息区域 -->
    <view class="goods-item-right">
      <view class="goods-name">{{goods.goods_name}}</view>
      <view class="goods-info">
        <view class="goods-price">￥{{money}}</view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name:"my-goods",
    props: {
      goods: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        //默认图片
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
      };
    },
    computed: {
      money() {
        if(this.goods) return Number(this.goods.goods_price).toFixed(2)
      }
    },
    
  }
</script>

<style lang="scss">
.goods-item {
  display: flex;
  padding: 10px 5px;
   border-bottom: 1px solid #efefef;
  .goods-item-left {
    margin-right: 5px;
    .goods-pic {
      width: 100px;
      height: 100px;
      display: block;
    }
  }
  .goods-item-right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .goods-name {
      font-size: 13px;
    }
    .goods-info {
      .goods-price {
        color: #c00000;
        font-size: 16px;  
      }
    }
  }
}
</style>
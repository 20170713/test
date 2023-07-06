<template>
  <view class="goods-item">
    <!-- 商品左侧图片区域 -->
    <view class="goods-item-left">
      <radio :checked="goods.goods_state" color="#c00000" v-if="showRadio" @click="radioClickHandler" />
      <image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
    </view>
    <!-- 商品右侧信息区域 -->
    <view class="goods-item-right">
      <view class="goods-name">{{goods.goods_name}}</view>
      <view class="goods-info">
        <view class="goods-price">￥{{money}}</view>
        <uni-number-box :min="1" :value="goods.goods_count" v-if="showNum" @change="numChangeHandler"></uni-number-box>
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
      },
      //是否展示图片左侧的radio
      showRadio: {
        type:Boolean,
        default: false
      },
      // 是否展示商品右侧的NumberBox
      showNum: {
        type: Boolean,
        default: false
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
    methods: {
      // radio组件的点击事件
      radioClickHandler() {
        this.$emit('radio-change',{
          goods_id: this.goods.goods_id,
          goods_state: !this.goods.goods_state
        })
      },
      // NumberBox组件的change事件
      numChangeHandler(val) {
        this.$emit('num-change',{
          goods_id: this.goods.goods_id,
          goods_count: +val
        })
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
    display: flex;
    justify-content: space-between;
    align-items: center;
    .goods-pic {
      width: 100px;
      height: 100px;
      display: block;
    }
  }
  .goods-item-right {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
    .goods-name {
      font-size: 13px;
    }
    .goods-info {
      display: flex;
      justify-content: space-between;
      .goods-price {
        color: #c00000;
        font-size: 16px;  
      }
    }
  }
}
</style>
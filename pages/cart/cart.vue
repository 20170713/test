<template>
  <view class="cart" v-if="cart.length !== 0">
    <!-- 收货地址区 -->
    <my-address></my-address>
    <!-- 购物车列表的标题区域 -->
    <view class="cart-title">
      <!-- 左侧图标 -->
      <uni-icons type="shop" size="18"></uni-icons>
      <!-- 描述文本 -->
      <text class="cart-title-text">购物车</text>
    </view>
    
    <!-- 商品列表区域 -->
    <uni-swipe-action>
      <block v-for="(goods,i) in cart" :key="i">
        <uni-swipe-action-item :right-options="options" @click="swipeActionClickHandler(goods)">
          <my-goods :goods="goods" :showRadio="true" @radio-change="radioChangeHandler" :showNum="true" @num-change="numberChangeHandler"></my-goods>
        </uni-swipe-action-item>
      </block>
    </uni-swipe-action>
    
    <!-- 结算区域 -->
    <my-settle></my-settle>
  </view>
  
  <!-- 空白购物车区域 -->
  <view class="empty-cart" v-else>
    <image src="/static/cart_empty@2x.png" class="empty-img" ></image>
    <text class="tip-text">空空如也~</text>
  </view>
</template>

<script>
import badgeMix from '@/mixins/tabbar-badge.js'
import {CartStore} from '../../store/cart.js';
  export default {
    mixins: [badgeMix],
    data() {
      return {
        options: [{
          text: '删除',
          style: {
            backgroundColor: '#c00000'
          }
        }]
      };
    },
    computed: {
      cart() {
        return CartStore().cart 
      }
    },
    methods: {
      radioChangeHandler(e) {
        const cartStore = CartStore()
        cartStore.updateGoodsState(e)
      },
      numberChangeHandler(e) {
        const cartStore = CartStore()
        cartStore.updateGoodsCount(e)
      },
      swipeActionClickHandler(goods) {
        const cartStore = CartStore()
        cartStore.removeGoodsById(goods.goods_id)
      }
    }
  }
</script>

<style lang="scss">
  .cart {
    padding-bottom: 50px;
  }
.cart-title {
  height: 40px;
  display: flex;
  align-items: center;
  font-size: 14px;
  padding-left: 5px;
  border-bottom: 1px solid #efefef;
  .cart-title-text {
    margin-left: 10px;
  }
}

// 空白购物车
.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 150px;
  .empty-img {
    width: 90px;
    height: 90px;
  }
  .tip-text {
    font-size: 12px;
    color: gray;
    margin-top: 15px;
  }
}
</style>

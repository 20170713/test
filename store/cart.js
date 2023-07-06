import { defineStore } from 'pinia'

export const CartStore = defineStore('cart',{
  state: () => ({
    // 每个商品的信息对象，都包含如下 6 个属性：
    // { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
    cart: JSON.parse(uni.getStorageSync('cart') || '[]')
  }),
  getters: {
    // 购物车徽标的数据 购物车商品的总数
    total() {
      // let count = 0
      // this.cart.forEach(x => count += x.goods_count)
      // return count
      return this.cart.reduce((total,item) => total += item.goods_count,0)
    },
    //勾选商品的总数量
    checkedCount() {
      return this.cart.filter(x => x.goods_state).reduce((total,item) => total += item.goods_count , 0)
    },
    // 已勾选商品的总价
    checkedGoodsAmount() {
      return this.cart.filter(x => x.goods_state).reduce((total,item) => total += item.goods_count * item.goods_price, 0).toFixed(2)
    }
  },
  actions: {
    addToCart(goods) {
      //判断是否已存在同个商品
      const findResult = this.cart.find((x) => x.goods_id === goods.goods_id)
      
      if(!findResult) {
        this.cart.push(goods)
      }else {
        findResult.goods_count++
      }
      this.saveToStorage()
    },
    saveToStorage() {
      uni.setStorageSync('cart',JSON.stringify(this.cart))
    },
    // 更新商品是否被选中的状态
    updateGoodsState(goods) {
      const findResult = this.cart.find(x => x.goods_id === goods.goods_id)
      if(findResult) {
        findResult.goods_state = goods.goods_state
        this.saveToStorage()
      }
    },
    // 更新商品的数量
    updateGoodsCount(goods) {
      const findResult = this.cart.find(x => x.goods_id === goods.goods_id)
      if(findResult) {
        findResult.goods_count = goods.goods_count
        this.saveToStorage()
      }
    },
    // 删除购物车商品
    removeGoodsById(goods_id) {
      this.cart = this.cart.filter(x => x.goods_id !== goods_id)
      this.saveToStorage()
    },
    // 更新商品的全部勾选状态
    updateAllGoodsState(newState) {
      this.cart.forEach(x => x.goods_state = newState)
      this.saveToStorage()
    }
  }
})
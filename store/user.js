import { defineStore } from 'pinia'

export const UserStore = defineStore('user',{
  state: () => ({
    address: JSON.parse(uni.getStorageSync('address') || '{}'),
  }),
  getters: {
    addstr() {
      if(!this.address.provinceName) return ''
       // 拼接 省，市，区，详细地址 的字符串并返回给用户
      return this.address.provinceName + this.address.cityName + this.address.countyName + this.address.detailInfo
    }
  },
  actions: {
    updateAddress(address) {
      this.address = address
      this.saveToStorage()
    },
    saveToStorage() {
      uni.setStorageSync('address',JSON.stringify(this.address))
    },
  }
})
import {CartStore} from '../store/cart.js'
import { mapState } from 'pinia'
export default {
  computed: {
    ...mapState(CartStore,['total'])
  },
  watch: {
    total() {
      this.setBadge()
    }
  },
  onShow() {
    this.setBadge()
  },
  methods: {
    setBadge() {
      uni.setTabBarBadge({
        index:2,
        text: this.total + '',
      })
    }
  }
}
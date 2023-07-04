<template>
  <view class="my-search-container" :style="{'background-color': bgcolor}">
    <view class="my-search-box" :style="{'border-radius': radius + 'px'}" @click="searchBoxHandler">
      <uni-icons type="search" size="17"></uni-icons>
      <text class="placeholder">搜索</text>
    </view>
  </view>
</template>

<script>
  export default {
    name:"my-search",
    data() {
      return {
        
      };
    },
    props: {
      //背景颜色
      bgcolor: {
        type: String,
        default: "#c00000"
      },
      // 圆角尺寸
      radius: {
        type: Number,
        default: 18
      }
    },
    methods: {
      searchBoxHandler() {
        this.$emit('click')
      }
    }
  }
</script>

<style lang="scss">
.my-search-container {
  // background-color: #c00000;
  height: 50px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  .my-search-box {
    height: 36px;
    width: 100%;
    // border-radius: 18px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
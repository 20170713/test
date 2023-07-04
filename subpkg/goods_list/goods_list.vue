<template>
  <view>
    <!-- 商品列表 -->
    <view class="goods-list">
      <view v-for="(item,index) in goodsList" :key="index" @click="gotoDetail(item.goods_id)">
      <my-goods :goods="item"></my-goods>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        queryObj: {
          //查询关键词
          query: '',
          //商品分类id
          cid: '',
          //页码值
          pagenum: 1,
          //每页显示多少条数据
          pagesize: 10,
        },
        //商品列表数据
        goodsList: [],
        //商品总数，用于实现分页
        total: 0,
        //节流阀
        isLoading: false
      };
    },
    onLoad(options) {
      this.queryObj.query = options.query || ''
      this.queryObj.cid = options.cid || ''
      this.getGoodsList()
      
    },
    methods: {
      async getGoodsList(cb) {
        //开启节流阀
        this.isLoading = true
        //发起请求
        const {data : res} = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
        //关闭节流阀
        this.isLoading = false
        cb && cb()
        
        if (res.meta.status !== 200) return uni.$showMsg()
        this.goodsList = [...this.goodsList,...res.message.goods]
        this.total = res.message.total
      },
      gotoDetail(goods_id) {
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods_id
        })
      }
    },
    
    // 上拉触底事件
      onReachBottom() {
        //判断是否还有下一条数据
        if(this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return uni.$showMsg('数据已全部加载！')
        
        //判断是否正在发起请求
        if (this.isLoading) return
        
        this.queryObj.pagenum += 1
        this.getGoodsList()
      },
      //下拉刷新事件
      onPullDownRefresh() {
        //重置关键数据
        this.queryObj.pagenum = 1
        this.goodsList = []
        this.total = 0
        this.isLoading = false
        
        //重新发起请求
        this.getGoodsList(() => {uni.stopPullDownRefresh()})
      }
  }
</script>


<style lang="scss">

</style>
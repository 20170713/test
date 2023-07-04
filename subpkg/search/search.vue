<template>
  <!-- 搜索框 -->
  <view class="search-box">
   <uni-search-bar @input="input" :radius="100" :cancel-button="none" :focus="true"></uni-search-bar>
  </view>
  
  <!-- 搜索建议列表 -->
  <view class="sugg-list" v-if="searchResults.length !== 0">
    <view class="sugg-item" v-for="(item,i) in searchResults" :key="i" @click="gotoDetail(item.goods_id)">
      <view class="goods-name">{{item.goods_name}}</view>
      <uni-icons type="arrowright" size="16"></uni-icons>
    </view>
  </view>
  
  <!-- 搜索历史 -->
  <view class="history-box" v-else>
    <!-- 标题区域 -->
    <view class="history-title">
      <text>搜索历史</text>
      <uni-icons type="trash" @click="cleanHistory"></uni-icons>
    </view>
    <view class="history-list">
      <uni-tag :text="item" v-for="(item,i) in histories" :key="i" :inverted="true" size="17" @click="gotoGoodsList(item)"></uni-tag>
    </view>
  </view>
  
</template>

<script>
  export default {
    data() {
      return {
        //节流阀
        timer: null,
        //输入的文本
        kw: '',
        //搜索建议列表
        searchResults: [],
        // 搜索历史
        historyList: [],
      };
    },
    methods: {
      input(e) {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.kw = e
          this.getSearchResults()
        },800)
      },
      async getSearchResults() {
        if(this.kw === '') {
          this.searchResults = []
          return
        }
        
        const {data : res} = await uni.$http.get('/api/public/v1/goods/qsearch', { query: this.kw })
        if (res.meta.status !== 200) return uni.$showMsg()
        this.searchResults = res.message
        this.saveHistoryList()
      },
      gotoDetail(goods_id) {
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods_id
        })
      },
      saveHistoryList() {
        const set = new Set(this.historyList)
        set.delete(this.kw)
        set.add(this.kw)
        this.historyList = Array.from(set)
        //将数据存储在本地
        uni.setStorageSync('kw',JSON.stringify(this.historyList))
      },
      //清空历史数据
      cleanHistory() {
        this.historyList = []
        uni.setStorageSync('kw','[]')
      },
      //跳转到商品列表页面
      gotoGoodsList(kw) {
        uni.navigateTo({
          url: '/subpkg/goods_list/goods_list?query=' + kw
        })
      }
    },
    computed: {
      histories() {
        return [...this.historyList].reverse()
      }
    },
    onLoad() {
      this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
    }
  }
</script>

<style lang="scss">
.search-box {
  position: sticky;
  top: 0;
  z-index: 999;
}

.sugg-list {
  padding: 0 5px;
  .sugg-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
    padding: 13px 0;
    border-bottom: 1px solid #efefef;
    .goods-name {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-right: 3px;
    }
  }
}

// 搜索历史
.history-box {
  padding: 0 5px;
  .history-title {
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #efefef;
    font-size: 13px;
    margin-bottom: 10px;
  }
  .history-list {
    display: flex;
    flex-wrap: wrap;
    .uni-tag {
      margin-right: 5px;
    }
  }
}
</style>

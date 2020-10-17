<template>
  <div>
    <div class="header">
      <div class="logo">
        <i class="iconfont iconnew"></i>
      </div>
      <div class="search">
        <i class="iconfont iconsearch"></i>
        <span>搜索新闻</span>
      </div>
      <div class="myself">
        <i class="iconfont iconwode"></i>
      </div>
    </div>
    <van-tabs v-model="active" sticky>
      <van-tab :title="tob.name" v-for="tob in tobList" :key="tob.id">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :immediate-check="false">
            <hm-post v-for="post in postList" :key="post.id" :post="post"></hm-post>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return{
      active: 1,
      tobList: [],
      postList: [],
      loading: false,
      finished: false,
      pageIndex: 1,
      isLoading: false
    }
  },
  created() {
    this.getTobList()
    // this.getPostList()
  },
  watch: {
    active(newActive){
      this.postList = []
      this.pageIndex = 1

      this.finished = false
      this.loading=true

      this.getPostList(this.tobList[newActive].id)
    }
  },
  methods: {
    async getTobList(id) {
      let res = await this.$axios.get('/category')
      // console.log(res.data);
      const {statusCode, data} = res.data
      if( statusCode === 200 ) {
        this.tobList = data
        this.getPostList(this.tobList[this.active].id)
      }
      
    },
    async getPostList (id) {
      let res = await this.$axios.get('/post',{
        params:{
          category: id,
          pageIndex: this.pageIndex,
          pageSize: 5
        }
      })

      // console.log(res);
      const {statusCode, data} = res.data
      if( statusCode === 200 ) {
        this.postList = [...this.postList, ...data]
        this.loading = false;
        // console.log(this.postList);
        this.isLoading = false
      }
      if(data.length < 5) {
        this.finished=true
      }

    },
    onLoad() {
      // console.log('到底了');
      this.pageIndex++
      this.getPostList(this.tobList[this.active].id)
    },
    onRefresh() {
      this.postList=[]
      this.pageIndex=1

      this.finished = false
      this.loading = true

      this.getPostList(this.tobList[this.active].id)
    }
  }

}
</script>

<style lang='less' scoped>
 /deep/.van-tabs__nav {
   background: #ddd;
 }
 .header{
   display: flex;
   height: 50px;
   line-height: 50px;
   background: #f00;
   text-align: center;
   .logo{
     width: 60px;
     color: #fff;
     .iconfont{
       font-size: 42px;
     }
   }
   .search{
     margin: 8px 0;
     line-height: 34px;
     flex: 1;
     color: #fff;
     background: rgba(255, 255, 255, .5);
     border-radius: 16px;
     .iconfont{
      font-size: 16px;
      margin-right: 6px;
     }
     span{
       font-size: 14px;
     }
   }
   .myself{
     width: 60px;
     color: #fff;
     .iconfont{
       font-size: 26px;
     }
   }
 }
</style>
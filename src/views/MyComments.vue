
<template>
  <div>
    <hm-header>我的跟帖</hm-header>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" :immediate-check="false" @load="onLoad" class="list">
      <div class="item" v-for="item in list" :key="item.id">
        <div class="time">{{item.create_date | data}}</div>
        <div class="parent-comment" v-if="item.parent">
          <div class="parent-name">回复：{{item.parent.user.nickname}}</div>
          <div class="parent-content">{{item.parent.content}}</div>
        </div>
        <div class="content">{{item.content}}</div>
        <div class="link">
          <div class="title line1">{{item.post.title}}</div>
          <i class="iconfont iconjiantou1"></i>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
export default {
  data() {
    return{
      list: '',
      loading: false,
      finished: false,
      pageIndex:1
    }
  },
  created() {
    this.getComment()
  },
  methods: {
    async getComment() {
      let res = await this.$axios.get('/user_comments',{
        params:{
          pageIndex: this.pageIndex,
          pageSize: 5
        }
      })
      // console.log(res);
      if(res.data.statusCode===200) {
        this.loading = false

        if(res.data.data.length<5){
          this.finished = true
        }
        this.list =[...this.list, ...res.data.data]
      }

    },
    onLoad() {
      console.log('到底了');
      this.pageIndex++
      this.getComment()
    }
  }

}
</script>

<style lang='less' scoped>
  .list{
    .item{
      margin: 10px;
      .time{
        padding: 10px 0;
        color: #ccc;
      }
      .parent-comment{
        padding: 15px 10px;
        line-height: 25px;
        background: #eee;
        .parent-name{
          color: #ccc;
        }
        .parent-content{
          font-size: 14px;
          color: #ccc;
        }
      }
      .content{
        padding: 10px 0;
        font-size: 14px;
      }
      .link{
        display: flex;
        padding: 10px 0;
        color: #ccc;
        .title{
         flex: 1;
         font-size: 14px;
        }
        .iconjiantou1{
          width: 20px;
        }

      }
    }
    .line1 {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
  }
</style>
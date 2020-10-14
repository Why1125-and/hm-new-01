
<template>
  <div>
    <hm-header>我的关注</hm-header>
    <div class="list">
      <div class="item" v-for="item in list" :key="item.id">
        <div class="left">
          <img :src="$axios.defaults.baseURL + item.head_img" alt="">
        </div>
        <div class="center">
          <div class="name">{{item.nickname}}</div>
          <div class="time">{{item.create_date | data}}</div>
        </div>
        <div class="right" @click="unfollow(item.id)">取消关注</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return{
      list:''
    }
  },
  created() {
    this.getFollow()
    // this.follow()
  },
  methods: {
    async getFollow() {
      let res = await this.$axios.get('/user_follows')
      // console.log(res);
      this.list = res.data.data
      // console.log(this.list);
    },
  //   async follow() {
  //     let res = await this.$axios.get(`/user_follows/10`)
  //     this.getFollow()
  //  },
    unfollow(id){
      this.$dialog.confirm({
        title: '提示',
        message: '请确认是否取消关注',
      })
        .then(async r => {
          // on confirm
          let res = await this.$axios.get(`/user_unfollow/${id}`)
          // console.log(res);
          this.getFollow()
        })
        .catch(() => {
          // on cancel
        });

    }
  }
}
</script>

<style lang='less' scoped>
  .list{
    .item{
      height: 80px;
      border-bottom: 1px solid #ccc;
      display: flex;
      align-items: center;
      padding: 0 10px;
      .left{
        img{
          width: 50px;
          height: 50px;
          border-radius: 50%;
          object-fit: cover;
        }
      }
      .center{
        flex: 1;
        padding-left: 10px;
        .name{
          font-size: 14px;
          line-height: 25px;
        }
        .time{
          color: #ccc;
        }
      }
      .right{
        padding: 0 15px;
        height: 30px;
        line-height: 30px;
        background: #eee;
        border-radius: 15px;
      }
    }
  }
</style>
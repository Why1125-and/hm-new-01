
<template>
  <div>
    <hm-header>个人中心</hm-header>
    <div class="info">
      <div class="left">
        <img :src="$axios.defaults.baseURL + info.head_img" alt="">
      </div>
      <div class="center">
        <div class="nick-name">
          <i v-if="info.gender === 1" class="iconfont iconxingbienan"></i>
          <i v-else class="iconfont iconxingbienv"></i>
            <span>{{info.nickname}}</span>
        </div>
        <div class="tiem">{{info.create_date | data}}</div>
      </div>
      <div class="right">
        <i class="iconfont iconjiantou1"></i>
      </div>
    </div>
    <div class="cell">
      <van-cell-group>
      <van-cell title="我的关注" is-link value="关注的用户" @click="$router.push('/my-follow')"/>
      <van-cell title="我的跟帖" is-link value="跟帖/回复"  @click="$router.push('/my-comments')"/>
      <van-cell title="我的收藏" is-link value="文档/视频" />
      <van-cell title="设置" is-link @click="goEdit"/>
      <van-cell title="退出" is-link @click="goLogin" />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return{
      info:{},
    }
  },
  async created() {
  const token = localStorage.getItem('token')
  const user_id = localStorage.getItem('user_id')
  let res = await this.$axios.get(`/user/${user_id}`)
    // console.log(res);
    const {statusCode,data} = res.data
    if (statusCode === 200) {
      this.info=data
    }
  },
  methods: {
    goLogin() {
      this.$dialog.confirm({
        title: '提示',
        message: '请确认是否退出',
      })
        .then(() => {
          localStorage.removeItem('token')
          localStorage.removeItem('user_id')

          this.$router.push('/login')
          this.$toast.success('退出成功')
        }) 
         .catch(() => {
            this.$toast('取消退出')
        });
    },
    goEdit () {
      this.$router.push('/edit')
    }
  }
}
</script>

<style lang='less' scoped>
 .info{
   height: 100px;
   border-bottom: 2px solid #ccc;

   display: flex;
   align-items: center;
   .left{
     margin: 0 20px;
     img{
       width: 70px;
       height: 70px;
       display: block;
       border-radius: 50%;
       object-fit: cover;
     }
   }
   .center{
       flex: 1;
       line-height: 25px;
       .nick-name{
         span{
           font-size: 14px;
         }
       }
     }
  .right{
    width: 70px;
    text-align: center;
  }
 }
</style>
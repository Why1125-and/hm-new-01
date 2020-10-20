<template>
  <div>
    <div class="detail-header">
      <div class="head-left" @click="$router.back()">
        <i class="iconfont iconjiantou2"></i>
      </div>
      <div class="head-center">
        <i class="iconfont iconnew"></i>
      </div>
      <div class="head-right">
        <div @click="unfollow" v-if="detail.has_follow" class="follow">已关注</div>
        <div @click="follow" v-else class="follow">关注</div>
      </div>
    </div>
    <div class="content">
      <div class="title">{{detail.title}}</div>
      <div class="name-time">
        <span v-if="detail.user">{{detail.user.nickname}}</span>
        <span v-else></span>
        <span>{{detail.create_date | data}}</span>
      </div>
    </div>
    <div class="particulars">
      <div v-if="detail.type == 1" v-html="detail.content"></div>
      <video v-else :src="detail.content" controls></video>
    </div>
    <div class="bottom">
      <div @click="like" class="like" :class="{ active: detail.has_like }">
        <i class="iconfont icondianzan"></i>
        <span>{{detail.like_length}}</span>
      </div>
    </div>
    <div class="comment">
      <hm-comment v-for="comment in commentsList" :key="comment.id" :comment="comment"></hm-comment>
    </div>
    <div class="footer">
      <div class="input" v-if="!isShow">
        <div class="left">
          <input type="text" @focus="handleFocus" placeholder="跟帖" />
        </div>
        <div class="center">
          <van-icon name="chat-o" badge="9" />
        </div>
        <div class="right">
          <van-icon name="star-o" />
        </div>
      </div>
      <div class="textarea" v-else>
        <div class="left">
          <textarea ref="textarea" @blur="handleBlur" placeholder="请输入内容"></textarea>
        </div>
        <div class="right">
          <div class="send">发送</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      detail: {},
      commentsList: [],
      isShow: false
    }
  },
  created () {
    this.getDetail()
    this.getComments()
  },
  methods: {
    async getDetail () {
      let res = await this.$axios.get(`/post/${this.$route.params.id}`)
      // console.log(res);
      this.detail = res.data.data
      // console.log(this.detail);
    },
    async unfollow () {
      let res = await this.$axios.get(`/user_unfollow/${this.detail.user.id}`)
      // console.log(res);
      // const { message } = res.data
      this.$toast.success(res.data.message)
      this.getDetail()

    },
    async follow () {
      let token = localStorage.getItem('token')
      if (!token) {
        this.$toast('请登录')
        this.$router.push({
          name: 'login',
          params: {
            back: true
          }
        })
        return
      }
      let res = await this.$axios.get(`/user_follows/${this.detail.user.id}`)
      // console.log(res);
      // const { message } = res.data
      this.$toast.success(res.data.message)
      this.getDetail()
    },
    async like () {
      let token = localStorage.getItem('token')
      if (!token) {
        this.$toast('请登录')
        this.$router.push({
          name: 'login',
          params: {
            back: true
          }
        })
        return
      }
      let res = await this.$axios.get(`/post_like/${this.detail.id}`)
      // console.log(res);
      this.$toast.success(res.data.message)
      this.getDetail()
    },
    async getComments () {
      let res = await this.$axios.get(`/post_comment/${this.$route.params.id}`)
      // console.log(res);
      this.commentsList = res.data.data
      console.log(this.commentsList);
    },
    handleFocus () {
      this.isShow = true
    },
    handleBlur () {
      this.isShow = false
    }
  }
}
</script>

<style lang='less' scoped>
.particulars {
  padding: 0 10px;
}
/deep/img {
  width: 100%;
}
video {
  width: 100%;
}
.detail-header {
  display: flex;
  height: 40px;
  align-items: center;
  border-bottom: 1px solid #ccc;
  .head-left {
    width: 40px;
    text-align: center;
  }
  .head-center {
    flex: 1;
    i {
      font-size: 50px;
    }
  }
  .head-right {
    width: 60px;
    text-align: center;
    .follow {
      width: 50px;
      height: 18px;
      line-height: 18px;
      border-radius: 9px;
      border: 1px solid #bbb;
    }
  }
}
.content {
  margin: 10px;
  .title {
    font-size: 16px;
    font-weight: 700;
    margin: 20px 0;
  }
  .name-time {
    span {
      margin-right: 10px;
      color: #ccc;
    }
  }
}
.bottom {
  display: flex;
  justify-content: flex-end;
  padding: 10px;
  border-bottom: 2px solid #ccc;
  .like {
    height: 30px;
    width: 80px;
    border: 1px solid #000;
    line-height: 30px;
    text-align: center;
    border-radius: 15px;
    i {
      margin: 0 5px;
    }
  }
  .like.active {
    border: 1px solid #f00;
    i {
      color: red;
    }
  }
}
.comment {
  padding-bottom: 50px;
}
.footer {
  background: #fff;
  border-top: 1px solid #ccc;
  position: fixed;
  bottom: 0;
  width: 100%;
  .input {
    height: 40px;
    display: flex;
    .left {
      flex: 1;
      // background: red;
      display: flex;
      justify-content: center;
      align-items: center;
      input {
        height: 30px;
        width: 80%;
        border: none;
        border-radius: 15px;
        background: #ddd;
        text-indent: 1em;
      }
    }
    .center,
    .right {
      width: 60px;
      font-size: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .textarea {
    height: 70px;
    display: flex;
    .left {
      flex: 1;
      // background: pink;
      display: flex;
      justify-content: center;
      align-items: center;
      textarea {
        border: none;
        width: 90%;
        height: 75%;
        border-radius: 8px;
        resize: none;
        background: #ddd;
        text-indent: 1em;
        padding-top: 5px;
      }
    }
    .right {
      width: 80px;
      display: flex;
      justify-content: center;
      align-items: center;
      .send {
        background: #f00;
        color: #fff;
        width: 40px;
        height: 30px;
        border-radius: 5px;
        line-height: 30px;
        text-align: center;
      }
    }
  }
}
</style>
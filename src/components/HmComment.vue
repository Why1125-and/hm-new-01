
<template>
  <div class="hm-comment">
    <div class="comments">
      <div class="customer">
        <div class="left">
          <img :src="$axios.defaults.baseURL + comment.user.head_img" alt />
        </div>
        <div class="center">
          <div class="name">{{comment.user.nickname}}</div>
          <div class="time">{{comment.create_date}}</div>
        </div>
        <div class="right">回复</div>
      </div>
      <hm-floor :count="getCount(0, comment)" v-if="comment.parent" :parent="comment.parent"></hm-floor>
      <div class="reply">{{comment.content}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['comment'],
  methods: {
    getCount (num, parent) {
      if (parent.parent) {
        return this.getCount(num + 1, parent.parent)
      } else {
        return num
      }
    }
  }
}
</script>

<style lang='less' scoped>
.hm-comment {
  .comments {
    padding: 10px;
    border-bottom: 1px solid #ccc;
    .customer {
      margin: 10px 0;
      display: flex;
      align-items: center;
      .left {
        width: 60px;
        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          object-fit: cover;
        }
      }
      .center {
        flex: 1;
        line-height: 25px;
        .time {
          color: #ccc;
        }
      }
      .right {
        width: 40px;
        color: #ccc;
      }
    }
    .reply {
      margin-top: 10px;
    }
  }
}
</style>
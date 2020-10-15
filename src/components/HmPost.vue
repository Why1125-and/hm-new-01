
<template>
  <div class="hm-post">
    <div class="post-video" v-if="post.type==2">
      <div class="top">
        <div class="title line1">
          {{post.title}}
        </div>
      </div>
      <div class="center">
        <img :src="fixedUrl(post.cover[0].url)" alt="">
        <i class="iconfont iconshipin"></i>
      </div>
      <div class="bottom">
          <span>{{post.user.nickname}}</span>
          <span>{{post.comments.length}} 跟帖</span>
      </div>
    </div>
    <div class="post-photo-one" v-else-if="post.cover.length < 3">
      <div class="left">
        <div class="title line2">
          {{post.title}}
        </div>
        <div class="bottom">
          <span>{{post.user.nickname}}</span>
          <span>{{post.comments.length}} 跟帖</span>
        </div>
      </div>
      <div class="right">
        <img :src="fixedUrl(post.cover[0].url)" alt="">
      </div>
    </div>
    <div class="post-photo-three" v-else>
      <div class="top">
        <div class="title line1">
          {{post.title}}
        </div>
      </div>
      <div class="center">
        <img :src="fixedUrl(post.cover[0].url)" alt="">
        <img :src="fixedUrl(post.cover[1].url)" alt="">
        <img :src="fixedUrl(post.cover[2].url)" alt="">
      </div>
      <div class="bottom">
          <span>{{post.user.nickname}}</span>
          <span>{{post.comments.length}} 跟帖</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['post'],
  methods: {
    fixedUrl(url) {
      if(url.startsWith('http')) {
        return url
      }else{
        return this.$axios.defaults.baseURL + url
      }
    }
  },
}
</script>

<style lang='less' scoped>
 .hm-post{

   .post-photo-one{
     display: flex;
     padding: 10px;
     border-bottom: 1px solid #ccc;
     .left{
       flex: 1;
       display: flex;
       flex-direction: column;
       justify-content: space-between;
       .title{
         font-size: 14px;
         margin-right: 10px;
       }
       .bottom{
         color: #ccc;
         span{
           margin-right: 10px;
         }
       }
     }
     .right{
      width: 110px;
      img{
        width: 110px;
        height: 80px;
        object-fit: cover;
      }
     }
   }
   .post-photo-three{
     padding: 10px;
     border-bottom: 1px solid #ccc;
     .top{
       font-size: 14px;
       margin-right: 10px;
     }
     .center{
       display: flex;
       justify-content: space-around;
       margin: 10px 0;
       img{
       width: 30%;
       height: 70px;
       object-fit: cover;
       }
     }
      .bottom{
        color: #ccc;
        span{
          margin-right: 10px;
        }
     }
   }
    .post-video{
     padding: 10px;
     border-bottom: 1px solid #ccc;
     .top{
       font-size: 14px;
       margin-right: 10px;
     }
     .center{
       position: relative;
       margin: 10px;
       img{
         width: 100%;
         height: 180px;
         object-fit: cover;
         text-align: center;
       }
       .iconfont{
         position: absolute;
         left: 50%;
         top: 50%;
         transform: translate(-50%,-50%);
         font-size: 30px;
         width: 50px;
         height: 50px;
         line-height: 50px;
         background: rgba(0, 0, 0, .5);
         border-radius: 50%;
         display: block;
         text-align: center;
         color: #fff;

       }
     }
      .bottom{
        color: #ccc;
        span{
          margin-right: 10px;
        }
     }
   }
 }
</style>
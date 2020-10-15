
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
  </div>
</template>

<script>
export default {

}
</script>

<style lang='less' scoped>
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
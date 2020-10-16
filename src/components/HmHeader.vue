
<template>
  <div class="hm-header">
    <div class="box">
        <div class="left">
        <i class="iconfont iconjiantou2" @click="$router.back()"></i>
      </div>
      <div class="center">
        <slot></slot>
      </div>
      <div class="right"></div>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='less' scoped>
  .hm-header{
    height: 40px;
    .box{
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 40px;
      background: #f4f4f4;
      border-bottom: 1px solid #ccc;
      text-align: center;

      display: flex;
      align-items: center;
      z-index: 999;
      .left,
      .right{
        width: 30px;
      }
      .center{
        flex: 1;
        font-weight: 700;
        font-size: 16px;
      }
    }
  }

</style>
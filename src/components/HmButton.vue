
<template>
  <div class="hm-button">
    <slot></slot>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='less' scoped>
  .hm-button{
    margin: 20px;
    height: 50px;
    background: red;
    border-radius: 25px;
    color: #fff;
    font-size: 20px;

    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
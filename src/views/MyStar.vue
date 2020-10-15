
<template>
  <div>
    <hm-header>我的收藏</hm-header>
    <hm-post v-for="post in list" :key="post.id" :post="post"></hm-post>
  </div>
</template>

<script>
export default {
  data() {
    return{
      list: []
    }
  },

  async created() {
    let res = await this.$axios.get('/user_star')
    // console.log(res);
    this.list = res.data.data
  }
}
</script>

<style>

</style>

<template>
  <div>
    <hm-header>栏目管理</hm-header>
    <div class="tab-content">
      <div class="del">点击删除频道</div>
      <div class="list">
        <div class="item" v-for="tab in activeTabs" :key="tab.id">
          <span @click="del(tab.id)">{{tab.name}}</span>
        </div>
      </div>
      <div class="add">点击添加频道</div>
      <div class="list">
        <div class="item" v-for="tab in deactiveTabs" :key="tab.id">
          <span @click="add(tab.id)">{{tab.name}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeTabs: [],
      deactiveTabs: []
    }
  },
  created () {
    this.getTabs()
  },
  watch: {
    activeTabs (newValue) {
      // console.log(newValue);
      localStorage.setItem('activeTabs', JSON.stringify(newValue))
      localStorage.setItem('deactiveTabs', JSON.stringify(this.deactiveTabs))
    }
  },
  methods: {
    async getTabs () {
      let activeTabs = JSON.parse(localStorage.getItem('activeTabs'))
      let deactiveTabs = JSON.parse(localStorage.getItem('deactiveTabs'))
      if (activeTabs && deactiveTabs) {
        this.activeTabs = activeTabs
        this.deactiveTabs = deactiveTabs
        return
      }

      let res = await this.$axios.get('/category')
      // console.log(res.data.data);
      if (res.data.statusCode === 200) {
        this.activeTabs = res.data.data
      }
    },
    del (id) {
      let tab = this.activeTabs.find(v => v.id == id)
      this.deactiveTabs.push(tab)
      this.activeTabs = this.activeTabs.filter(v => v.id !== id)
    },
    add (id) {
      let tab = this.deactiveTabs.find(v => v.id == id)
      this.activeTabs.push(tab)
      this.deactiveTabs = this.deactiveTabs.filter(v => v.id !== id)
    }
  }

}
</script>

<style lang='less' scoped>
.tab-content {
  margin: 20px;
  .del,
  .add {
    font-weight: 700;
    font-size: 14px;
    margin: 10px 0;
  }
  .list {
    display: flex;
    flex-wrap: wrap;
    .item {
      width: 20%;
      height: 40px;
      span {
        width: 80%;
        height: 80%;
        display: block;
        background: #ddd;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
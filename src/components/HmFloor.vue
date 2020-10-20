<template>
  <div>
    <hm-floor :count="count - 1" v-if="parent.parent" :parent="parent.parent"></hm-floor>
    <div class="hm-floor" :class="{top:!parent.parent}">
      <div class="floor-header">
        <div class="floor-name">
          <span>{{count}}楼</span>
          <span>{{parent.user.nickname}}</span>
        </div>
        <div class="time">{{parent.create_date}}</div>
        <div class="reply">回复</div>
      </div>
      <div class="floor-content">{{parent.content}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['parent', 'count'],
  name: 'hm-floor'
}
</script>

<style lang='less' scoped>
.hm-floor {
  padding: 10px;
  border: 1px solid #000;
  height: 50px;
  line-height: 30px;
  background: #eee;
  border-top: none;
  &.top {
    border-top: 1px solid #000;
  }
  .floor-header {
    display: flex;
    .floor-name {
      width: 70px;
      span {
        margin-right: 5px;
      }
    }
    .time {
      flex: 1;
      color: #ccc;
    }
    .reply {
      width: 40px;
    }
  }
}
</style>
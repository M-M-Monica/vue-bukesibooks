<template>
  <div>
    <header class="mui-bar mui-bar-nav">
      <a
        @click="goBack"
        class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left">
      </a>
      <h1 class="mui-title">{{title}}</h1>
    </header>
  </div>
</template>

<script>
export default {
  name: 'NavHeader',
  data() {
    return{
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  },
  props: ['title']
}
</script>

<style lang="less" scoped>
.mui-bar {
  height: 40px;
  position: fixed;
  background-color: #fbfbfb;
}
</style>
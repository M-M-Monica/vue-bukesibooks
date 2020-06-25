<template>
  <div id="app">
    <!-- 中间router-view -->
    <transition name="view" mode="out-in">
      <router-view/>
    </transition> 
    <!-- 底部tabbar -->
    <nav class="mui-bar mui-bar-tab">
      <router-link class="mui-tab-item" :to="{name:'home'}">
        <span class="mui-icon iconshouye"></span>
        <span class="mui-tab-label">Home</span>
      </router-link>
      <router-link class="mui-tab-item" :to="{name:'cart'}">
        <span class="mui-icon icongouwuche">
          <span
            class="mui-badge"
            v-show="this.$store.state.loginStatus&&this.$store.getters.getTotalCount>0"
          >
            {{this.$store.getters.getTotalCount}}
          </span>
        </span>
        <span class="mui-tab-label">Cart</span>
      </router-link>
      <router-link class="mui-tab-item" :to="{name:'mine'}">
        <span class="mui-icon iconyonghu"></span>
        <span class="mui-tab-label">Me</span>
      </router-link>
    </nav> 
  </div>
</template>

<style lang="less" scoped>
#app{
  margin-top: 40px;
  overflow: hidden;
  .view-enter-active,.view-leave-active{
    transition: all .3s ease;
  }
  .view-enter,.view-leave-to{
    opacity:0.5;
  }
  .mui-bar-tab{
    border-top: 1px solid white;
    box-shadow: 0px 0px 1px 1px #f7f7f7;
    .mui-active{
      color: #26a5ae !important;
    } 
  }
}
</style>

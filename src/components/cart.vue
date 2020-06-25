<template>
  <div>
    <nav-header title="购物车"></nav-header>
    <div class="mui-card" v-if="loginStatus">
      <ul class="mui-table-view" v-for="(item,index) in selectedGoods" :key="index">
        <li class="mui-table-view-cell mui-media">
          <img class="mui-media-object mui-pull-left" :src="item.img">
          <div class="mui-media-body">
            {{item.name}}
            <span>￥：{{item.price}}</span>
            <span @click="remove(item.id,index)">×</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner sum">
          <p>
            合计：
            <span class="red">
              ￥{{loginStatus?this.$store.getters.getTotalPrice:0}}
            </span>
          </p>
          <mt-button size="small" type="danger" @click="summary" v-if="loginStatus">
            结算
          </mt-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';

export default {
  name: 'Cart',
  data() {
    return {
      selectedGoods: [],
      loginStatus: false
    }
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.loginStatus = this.$store.state.loginStatus;
      this.selectedGoods = this.$store.state.selectedGoods;
    },
    remove(id,index) {
      this.selectedGoods.splice(index,1);
      this.$store.commit('removeStore',id)
    },
    summary() {
      if(this.$store.getters.getTotalPrice > 0) {
        Toast({
          message: '一共' + this.$store.getters.getTotalPrice + '元',
          position: 'middle',
          duration: 1000
        });
      }else {
        Toast({
          message: '购物车空空的',
          position: 'middle',
          duration: 1000
        });
      }
    }
  }
}
</script>

<style lang="less" scoped>
.mui-card {
  &:last-of-type {
    margin-bottom: 55px;
  }
  .mui-media-object {
    width: 42px;
    height: 50px;
  }
  .mui-media-body {
    margin-top: 15px;
    font-size: 1em;
    span {
      &:first-of-type {
        position: absolute;
        right: 20%;
      }
      &:last-of-type {
        position: absolute;
        right: 8%;
      }
    } 
  }
  .mui-ellipsis {
    display: inline-block;
  }
  .sum {
    display: flex;
    justify-content: space-between;
    align-items: center;
    p {
      margin-top: 10px;
      .red {
        color: red;
        font-size: 1em;
        font-weight: bold;
      }
    }
  }
}
</style>
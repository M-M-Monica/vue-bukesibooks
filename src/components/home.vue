<template>
  <div>
    <!-- 标题栏，用mint-ui的组件，用之前先导入 -->
    <mt-header fixed title="BukesiBooks"></mt-header>
    <!-- 轮播图 v-show="flag"-->
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(item,index) in swipes" :key="index">
        <img :src="item.img">
      </mt-swipe-item>
    </mt-swipe>
    <!-- 分文学、人文、科学三类 -->
    <div class="grids">
      <router-link class="item" :to="{name:'book',query:{id:1,category:'人文'}}">
        <img :src="rw"/>
        <p>人文</p>
      </router-link>
      <router-link class="item" :to="{name:'book',query:{id:2,category:'科学'}}">
        <img :src="kx"/>
        <p>科学</p>
      </router-link>
      <router-link class="item" :to="{name:'book',query:{id:3,category:'文学'}}">
        <img :src="wx"/>
        <p>文学</p>
      </router-link>
    </div>
    <!--今日推荐-->
    <div class="products">
      <img :src="time" class="icon"/>
      <span class="text">今日推荐</span>
      <div class="productsBox">
        <router-link
          class="a_33"
          :key="item.name"
          :to="{name:'detail',query:{cid:item.cid,bid:item.bid}}"
          v-for="item in recommend"
        >
          <img :src="item.img"/>
          <p>{{item.name}}</p>
          <p>￥：{{item.price}}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import rw from '../static/img/rw.png';
import kx from '../static/img/kx.png';
import wx from '../static/img/wx.png';
import time from '../static/img/time.png';

export default {
  name: 'Home',
  data() {
    return {
      rw,
      kx,
      wx,
      time,
      swipes: [],//轮播图
      recommend: []
    }
  },
  created() {
    axios.get('/mock/swipes.json').then(res => {
      this.swipes = res.data.swipes;
    })
    axios.get('/mock/recommend.json').then(res => {
      this.recommend = res.data.recommend;
    })
  }
}
</script>

<style lang="less" scoped>
.mint-header {
  background-color: #26a5ae;
  position: fixed;
}
.mint-swipe {
  height: 200px;
  img {
    width: 100%;
    height: 100%;
  }
}
.grids {
  display: flex;
  margin-top: 15px; 
  font-size: 1em;
  text-align: center;
  background-color: #fff;
  .item {
    flex: 1;
    border-left: 2px solid #eee; 
    &:first-of-type {
      border-left: none; 
    }
    img {
      width: 40px;
      height: 40px;
    }
    p {
      display: block;
      color: #888;
    }
  }
}
/*今日推荐*/
.products {
  border-top: 2px solid #eee;
  margin: 9px 5px 50px 5px;
  .icon {
    width: 24px;
    height: 24px;
    position: relative;
    top: 5px;
    left: 7px;
  }
  .text {
    color: #888;
    font-size: 1em;
    margin: 0 6px;
  }
  .productsBox {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding-top: 5px;
    .a_33 {
      width: 33.3%;
      padding: 5px;
      border: 1px solid #eee;
      img {
        width: 100%;
        height: 115px;
      }
      p {
        margin-bottom: 0;
        color: #888;
        text-align: center;
      }
    }
  }
}
</style>
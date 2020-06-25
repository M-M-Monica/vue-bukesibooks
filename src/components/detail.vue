<template>
  <div>
    <nav-header :title="book.name"></nav-header>
    <mt-swipe :auto="2000">
      <mt-swipe-item v-for="(item,index) in details.images" :key="index">
        <img :src="item.img">
      </mt-swipe-item>
    </mt-swipe>
    <div class="de_content">
      <p>{{book.name}}</p>
      <p>{{details.introduce}}</p>
      <mt-button @click="addToCart">
        <img :src="shop" height="30" width="35" slot="icon"/>
        Add To Cart
      </mt-button>
      <transition name="ball" @after-enter="afterEnter">
        <div class="ball" v-if="isShow"></div>
      </transition>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import shop from '../static/img/shop.png';

export default {
  name: 'Detail',
  data() {
    return {
      shop,
      isShow: false,
      book: [],
      details: {}
    }
  },
  created() {
    //哪个分类
    let cid = this.$route.query.cid;
    //哪本书
    let bid = this.$route.query.bid;
    axios.get('/mock/categories.json?cid=' + cid + '&bid=' + bid).then(res => {
      let books = res.data.categories[--cid].books[--bid]
      this.book = books;
      this.details = books.details;
    })
  },
  methods: {
    addToCart() {
      if (this.$store.state.loginStatus != true) {
        this.$router.push("mine");
      }else {
        this.isShow = true;      
        let bookInfo = {
          id:this.book.id,
          name:this.book.name,
          img:this.book.img,
          price:this.book.price,
          count:this.book.count      
        };
        this.$store.commit('addToStore',bookInfo);
      }
    },
    afterEnter() {
      this.isShow = false;
    }
  }
}
</script>

<style lang="less" scoped>
.mint-swipe {
  height: 170px;
  img {
    width: 100%;
    height: 100%;
  }
}
.de_content {
  margin-top: 40px;
  padding: 5px;
  p {
    display: block;
    margin-bottom: 0;
    padding: 7px;
    font-size: 1em;
    color: #888;
    &:first-of-type {
      color: #000;
      font-weight: 800;
    }
  }
  .mint-button {
    font-size: 13px;
    font-weight: 600;
    position: fixed;
    bottom: 60px;
    left: 50%;
    transform: translateX(-50%);
  }
  .ball {
    width: 10px;
    height: 10px;
    position: fixed;
    bottom: 150px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 50%;
    background-color: #ffbb12;
  }
  .ball-enter-active {
    animation: bounce-in .5s;
  }
  @keyframes bounce-in {
    0%{transform: translate(0,0);}
    100%{transform: translate(0,67px);}
  }
}
</style>
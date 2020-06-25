<template>
  <div class="content">
    <nav-header :title="category"></nav-header>
    <div class="mui-card">      
      <ul class="mui-table-view">
        <li v-for="item in books" :key="item.id" class="mui-table-view-cell mui-media">
          <router-link :to="{name:'detail',query:{cid:cid,bid:item.id}}">
            <img v-lazy="item.img" class="mui-media-object mui-pull-right">
            <div class="mui-media-body">
              {{item.name}}
              <p class='mui-ellipsis'>作者：{{item.author}}</p>
              <p class='mui-ellipsis'>￥：{{item.price}}</p>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Book',
  data() {
    return {
      books: [],
      category: '',
      bid: ''
    }
  },
  created() {
    //是哪个分类
    let id = this.$route.query.id;
    let category = this.$route.query.category;
    this.cid = id;
    this.category = category;
    axios.get('/mock/categories.json?id=' + id).then(res => {
      let categories = res.data.categories[--id];
      this.books = categories.books;
    })
  }
}
</script>

<style lang="less" scoped>
.mui-card {
  margin-bottom: 55px;
  .mui-table-view {
    .mui-media-object {
      max-width: 80px;
      height: 80px;
    }
    .mui-media-body {
      padding: 10px 20px;
    }
    .mui-table-view-cell {
      p {
        font-size: 1em;
      }
      image[lazy=loading] {
        width: 40px;
        height: 300px;
        margin: auto;
      }
    }
  }
}
</style>

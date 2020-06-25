<template>
  <div id="bg">
    <nav-header :title="this.$store.state.loginStatus?'我的':'登录'">
    </nav-header>
    <div id="my-page" v-if="this.$store.state.loginStatus">
      <div class="info">
        <img :src="user" class="avatar" />
        <div class="info-name">{{this.$store.state.name}}</div>
      </div>
      <button type="button" class="mui-btn mui-btn-block">
        我的地址
      </button>
      <button type="button" class="mui-btn mui-btn-block">
        我的订单
      </button>
      <button type="button" class="mui-btn mui-btn-block" @click="logout">
        退出登录
      </button>
    </div>
    <div id="login-page" v-if="!this.$store.state.loginStatus">
      <form class="mui-input-group">
        <div class="mui-input-row">
          <label>用户</label>
          <input
            type="text"
            class="mui-input-clear"
            placeholder="请输入用户名"
            v-model="name"
          />
        </div>
        <div class="mui-input-row">
          <label>密码</label>
          <input
            type="password"
            class="mui-input-password"
            placeholder="请输入密码"
            v-model="password"
          />
        </div>
        <div class="mui-content-padded">
          <button type="button" class="mui-btn mui-btn-block" @click="login">
            登录
          </button>
          <div class="link-area">
            <a id='register'>注册账号</a>
            <span>|</span>
            <a id='forgetPassword'>忘记密码</a>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import user from '../static/img/user.png';
import { Toast } from 'mint-ui';

export default {
  name: 'Mine',
  data() {
    return {
      user,
      name: '',
      password: ''
    }
  },
  methods: {
    login() {
      axios.get('/mock/login.json?name='+this.name+'&password='+this.password).then(res=>{
        const result = res.data.data;
        const name = this.name;
        const password = this.password;
        if (name != '' && password != '' && result) {
          this.$store.commit('changeLogin', {
            loginStatus: true,
            name: name
          });
          this.$router.go(-1);
        }else {
          Toast({
            message: '输入不能为空',
            position: 'middle',
            duration: 1000
          });
        }
      })
    },
    logout() {
      this.$store.commit('changeLogin', {loginStatus: false});
    }
  }    
}
</script>

<style lang="less" scoped>
#bg {
  width: 100%;
  height: calc(100vh - 92px);
  .mui-btn {
    padding: 10px;
    color: #656565;
    border: 1px solid #c3e0de;
    background-color: #ccdbde;
  }
}
#my-page {
  height: 100%;
  .info {
    width: 100%;
    height: 40%;
    background: url(../static/img/me.jpg) center;
    position: relative;
    .avatar {
      position: absolute;
      width: 70px;
      height: 70px;
      background: white;
      border-radius: 50%;
      left: 50%;
      margin-left: -35px;
      bottom: 30%;
    }
    .info-name {
      position: absolute;
      left: 50%;
      bottom: 8%;
      transform: translateX(-50%);
      font-size: 30px;
      font-family: monospace;
      font-weight: 900;
      color: white;
    }
  }
}
#login-page {
  height: 100%;
  background: url(../static/img/book.jpg) center;
  .mui-input-group {
    background-color: #faffffbd;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 30px;
    padding: 10px;
    margin: 0 10px;
    .mui-input-row {
      height: 50px;
    }
    label {
      width: 30%;
      text-align: center;
    }
    label~input {
      width: 70%;
    }
    .mui-content-padded {
      margin-top: 25px;
    }
    .link-area {
      display: block;
      margin-top: 25px;
      text-align: center;
      a {
        color: #174460;
      }
    }
  }
}
</style>

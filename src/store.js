import Vue from 'vue';
//安装vuex
import Vuex from 'vuex';
//注册vuex到vue中
Vue.use(Vuex);

//新建实例对象存数据
export default new Vuex.Store({
	state: {//类似组件中的data,存数据
		loginStatus: JSON.parse(localStorage.getItem('loginStatus')),
		name: localStorage.getItem('name'),
		selectedGoods: JSON.parse(localStorage.getItem('selectedGoods')||'[]')
	},
	mutations: {//操作数据
		addToStore(state,bookInfo) {
			let flag = false;
			state.selectedGoods.some(item => {
				if (item.name == bookInfo.name) {
					flag = true
					return true
				}
			})
			if(!flag) {
				state.selectedGoods.push(bookInfo)
			}
			localStorage.setItem('selectedGoods', JSON.stringify(state.selectedGoods))
		},
		removeStore(state,id) {
			state.selectedGoods.some((item,i) =>{
				if(item.id == id) {
					state.selectedGoods.splice(i,1)
					return true
				}
			})
			localStorage.setItem('selectedGoods', JSON.stringify(state.selectedGoods))
		},
		changeLogin(state,payload) {
			state.loginStatus = payload.loginStatus
			state.name = payload.name
			localStorage.setItem('loginStatus', state.loginStatus)
			localStorage.setItem('name', state.name)
		}
	},
	getters: {//获取数据
		getTotalCount(state) {
			let sum = 0;
			state.selectedGoods.forEach(item => {
				sum += item.count
			})
			return sum
		},
		getTotalPrice(state) {
			let price = 0;
			state.selectedGoods.forEach(item => {
				price += item.price
			})
			return price
		}
	}
})
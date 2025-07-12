// stores/counter.js
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
	persist:true,
	state: () => {
		return { 
			user:{
				id:0,
				email:"",
				nickname:"",
				token:"",
			},
			admin:{
				id:0,
				username:"",
				token:"",
			},
		}
	},
	// could also be defined as
	// state: () => ({ count: 0 })
	actions: {
		isLogin(){
			return this.user.token != undefined &&  this.user.token != 0 && this.user.token != ""
		},
		set(user) {
			this.user.id=user.id
			this.user.email=user.email
			this.user.nickname=user.nickname
			this.user.token=user.token
		},
		clear() {
			this.user.id=0
			this.user.email=""
			this.user.nickname=""
			this.user.token=""
		},

		adminIsLogin(){
			return this.admin.token != undefined &&  this.admin.token != 0 && this.admin.token != ""
		},
		adminSet(admin) {
			this.admin.id=admin.id
			this.admin.username=admin.username
			this.admin.token=admin.token
		},
		adminClear() {
			this.admin.id=0
			this.admin.username=""
			this.admin.token=""
		},
	},
})

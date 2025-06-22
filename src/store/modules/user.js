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
        }
    },
    // could also be defined as
    // state: () => ({ count: 0 })
    actions: {
        set(user) {
            this.id=user.id
            this.email=user.email
            this.nickname=user.nickname
            this.token=user.token
        },
    },
})

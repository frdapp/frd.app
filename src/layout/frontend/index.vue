<script setup>
import { useUserStore } from '@/store/modules/user'
import  VBox from '@/components/VBox.vue'

const userStore = useUserStore()
</script>
<template>

        <!-- Navigation-->
        <nav class="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
            <div class="container">
                <a class="navbar-brand" href="/">
                    <!--
                    <img src="@/assets/img/navbar-logo.svg" alt="..." /></a>
                    -->
                    木石科技
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    Menu
                    <i class="fas fa-bars ms-1"></i>
                </button>
                <div class="collapse navbar-collapse" id="navbarResponsive">
                    <ul v-if="userStore.isLogin() " class="navbar-nav text-uppercase ms-auto">
                        <li v-if="userStore.isLogin() == true" class="nav-item"><a @click="logout" class="nav-link" href="#">Logout</a></li>
                        <li class="nav-item"><a class="nav-link" href="/admin/dashboard">Admin</a></li>
                    </ul>
                    <ul v-else class="navbar-nav text-uppercase ms-auto">
                        <li v-if="userStore.isLogin() == false" class="nav-item"><a class="nav-link" href="/login">Login</a></li>
                        <li v-if="userStore.isLogin() == false" class="nav-item"><a class="nav-link" href="/register">Register</a></li>
                    </ul>
                </div>
            </div>
        </nav>

        <router-view />

        <!-- Footer-->
        <footer class="footer">
            <VBox style="width:100%;height:100px;align-items: center;background-color:#eaeae4">

                    <div class="">Copyright &copy; frd.app 2025</div>
            </VBox>
        </footer>

</template>


<script>
export default {
    data: function(){
        return {
        }
    },

    mounted:function(){
    },
    methods:{
        logout:async function(){
            await this.$api.admin_login_logout();

            const userStore = useUserStore()
            userStore.clear()

            window.location.reload()
            return 
        },
    },
}
</script>

<style scoped>
    .navbar{
        padding-top: var(--bs-navbar-brand-padding-y);
        padding-bottom: var(--bs-navbar-brand-padding-y);
        margin-right: var(--bs-navbar-brand-margin-end);
        font-size: var(--bs-navbar-brand-font-size);
        color: var(--bs-navbar-brand-color);
        text-decoration: none;
        white-space: nowrap;
        background-color:#000000 !important;
    }

    a{
        color:aliceblue !important;
    }

    a:hover{
        color:aliceblue !important;
    }

</style>

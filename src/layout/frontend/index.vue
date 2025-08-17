<script setup>
import { useUserStore } from '@/store/modules/user'
import  VBox from '@/components/VBox.vue'

const userStore = useUserStore()
</script>
<template>

    <!-- Navigation-->
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
        <div class="container">
            <VBox>

            <a class="navbar-brand" href="/">
                            <img src="@/assets/logo_bg.png" alt="木石科技" style="width:100px" />


            </a>
            <span style="font-size:12px;color:rgb(49, 111, 21)">
                    Tree & Stone Tech
            </span>

            </VBox>
            <div class="collapse navbar-collapse" id="navbarResponsive">
                <ul v-if="userStore.isLogin()" class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a href="#products" class="nav-link" style="">
                            <span style="color:#534f4a">
                                {{ $t("Products") }}
                            </span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="#contact" class="nav-link" style="">
                            <span style="color:#534f4a">
                                {{ $t("Connect Us") }}
                            </span>
                        </a>
                    </li>
                    <li class="nav-item"><a class="nav-link" href="/admin/domain">
                            <span style="color:#534f4a">
                                {{ $t("Admin Panel") }}
                            </span>
                        </a>
                    </li>
                    <li v-if="userStore.isLogin() == true" class="nav-item"><a @click="logout" class="nav-link"
                            href="#">
                            <span style="color:#ee1111">
                                {{ $t("Logout") }}
                            </span>
                        </a>
                    </li>
                </ul>
                <ul v-else class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a href="#products" class="nav-link" style="">
                            <span style="color:#534f4a">
                                {{ $t("Products") }}
                            </span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="#contact" class="nav-link" style="">
                            <span style="color:#534f4a">
                                {{$t("Connect Us")}}
                            </span>
                        </a>
                    </li>

                    <li v-if="userStore.isLogin() == false" class="nav-item">
                        <a class="nav-link" href="/login">
                            <span style="color: #e19d6c; font-size: 20px; font-weight: 600;">
                                {{ $t('Login') }}
                            </span>
                        </a>
                    </li>
                    <!--
                        <li v-if="userStore.isLogin() == false" class="nav-item"><a class="nav-link" href="/register">Register</a></li>
                        -->
                </ul>
            </div>
        </div>
    </nav>


    <div class="container" style="min-height:600px">
        <router-view />
    </div>

    <!-- Footer-->
    <footer class="footer border-top" style="margin-top:30px">
        <VBox style="width:100%;height:100px;align-items: center;">

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
        background-color:#f7f7f7 ;
    }

    a{
        color:aliceblue !important;
    }

    a:hover{
        color:aliceblue !important;
    }

</style>

<script setup>
</script>

<template>
    <div style="margin-top:100px">

    Welcome To Frd.App's  Mail Product

    为你的域名自由创建邮箱
    每月1G 容量低  200

    Product, Price , Start Button   , Good points

    1. very much emails ( 100)
    2. all email share the same storage limit
    3. very cheep  storage  plan
    4. use how much , pay how much

    </div>

</template>
<script>


export default {
    data: function () {
        return {
        }
    },

    methods: {
        logout: function (r) {
            var self = this;
            this.$api.logout().then(function (r) {
                userStore.clear()
                self.$router.push({ "path": "/" });
            });
        }
    }

}
</script>

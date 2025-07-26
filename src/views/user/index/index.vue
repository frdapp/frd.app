<script setup>
</script>

<template>
    <div style="margin-top:100px">
        <pre>
        Create Your Emails By Your Own Doamin ! 

        1. you can create 200 domain email address ! The More Address also support !
        2. all emails share the same storage limit ! Save Your Money
        3. 1GB /Year Only Cost  $1
        </pre>

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

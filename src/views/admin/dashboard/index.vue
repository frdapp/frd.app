<script setup>
import Button from "@/components/Button.vue"
</script>
<template>
    <pre>
        Stoage Info
        Domain Count
        Email Count



    Usage

        register account

        add domain
        add email



    </pre>

    <Button @click="send_email_verify_code">
        Send Email Verify Code

    </Button>
</template>

<script>
export default {
    data: function () {
        return {

        }
    },

    mounted: function () {
    },
    methods: {
        send_email_verify_code: function () {
            this.$api.post("/api/admin/email/send_verify_code",{"email":"root@frd.app"})

            return;
        },



    },
}
</script>

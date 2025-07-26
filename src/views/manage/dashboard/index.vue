<template>

    <div class="card" style="width:200px">
        <div class="card-header">
            {{$t("user amount")}}
        </div>
        <div class="card-body">
            {{stat.user_amount}}
        </div>
    </div>


    <div class="card" style="width:200px;margin-top:30px">
        <div class="card-header">
            {{$t("order amount")}}
        </div>
        <div class="card-body">
            {{stat.order_amount}}
        </div>
    </div>


</template>

<script>
export default {
    data: function(){
        return {
            stat:{
                "user_amount":0,
                "order_amount":0,
            },
        }
    },

    created:async function(){
        var response=await this.$api.manage_index_stat();
        if(response == false) return false;

        this.stat.user_amount=response.user_amount;
        this.stat.order_amount=response.order_amount;

    },
    methods:{
    },
}
</script>


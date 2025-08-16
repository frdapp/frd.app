<script setup>
    import VBox from "@/components/VBox.vue"
    import HBox from "@/components/HBox.vue"
    import Input from "@/components/Input.vue"
    import Select from "@/components/Select.vue"
    import Button from "@/components/Button.vue"
    import Textarea from "@/components/Textarea.vue"
</script>

<template>
        <table class="layout-table" style="">
            <tr>
                <td>
                <label class="form-control-label">{{$t("User")}}</label>
                </td>
                <td>
                    <Input class="" v-model="form.user_id"  />
                </td>
            </tr>
            <tr>
                <td>
                <label class="form-control-label">{{$t("Order No")}}</label>
                </td>
                <td>
                <Input class="" v-model="form.order_no" />
                </td>
            </tr>
            <tr>
                <td>
                <label class="form-control-label">{{$t("creem refund_no")}}</label>
                </td>
                <td>
                <Input class="" v-model="form.refund_no"  />
                </td>
            </tr>
            <tr>
                <td>
                <label class="form-control-label">{{$t("reason")}}</label>
                </td>
                <td>
                <Textarea class="" v-model="form.reason"  />
                </td>
            </tr>
           
            <tr>
                <td>
                <label class="form-control-label"></label>
                </td>
                <td>
                <Button type="primary" @click="submit()">{{$t("Save")}}</Button>
                </td>
            </tr>
        </table>
</template>

<script>
    export default {
        created:async function(){
            var item_id=this.$route.query.id;
            if(item_id)
            {
                var response= await this.$api.api_get("/api/manage/order_refund/get",{"id":item_id})
                this.form = response
            }
        },
        data: function(){
            return {
                form:{
                    id:0,
                    user_id:"",
                    order_no:"",
                    refund_no:'',
                    reason:"",
                },
            }
        },

        methods:{
            submit:async function(){
                        if(this.form.id)
                        {
                            var response=await this.$api.api_post("/api/manage/order_refund/update",this.form);
                            if (response == false) return false;

                            this.$router.back();
                        }
                        else
                        {
                            var response=await this.$api.api_post("/api/manage/order_refund/create",this.form);
                            if (response == false) return false;

                            this.$router.back();
                        }



            },
    
        },

    }
</script>

<style scoped>
</style>

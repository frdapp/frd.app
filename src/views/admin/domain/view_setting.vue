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
                <label class="form-control-label">{{$t('Domain')}}</label>
                </td>
                <td>
                    {{  form.domain }}
                </td>
            </tr>
            <tr>
                <td>
                <label class="form-control-label">{{$t("Setting")}}</label>
                </td>
                <td>
                    <pre>
                        1. set dns 

                        MX   mail.frd.app   100
                        MX   mail2.frd.app   50


                        2. set dkim

                        3. smtp Setting
                        4. imop setting

                    </pre>
                </td>
            </tr>

            <tr>
                <td>
                <label class="form-control-label"></label>
                </td>
                <td>
                <Button type="primary" @click="submit(true)">{{$t("Save")}}</Button>
                <Button @click="cancel">{{$t("Cancel")}}</Button>
                </td>
            </tr>
        </table>
</template>

<script>
    export default {
        mounted:async function(){
            var item_id=this.$route.query.id;
            if(item_id)
            {
                var response=await this.$api.admin_domain_get(item_id);
                this.form=response
            }
        },
        data: function(){
            return {
                form:{
                    id:0,
                    domain:"",
                    description:'',
                },
            }
        },

        methods:{
            submit:async function(back){
                        if(this.form.id)
                        {
                            var response=await this.$api.admin_domain_update(this.form);
                        }
                        else 
                        {
                            var response=await this.$api.admin_domain_create(this.form);
                        }

                        if(response != false)
                        {
                           this.$router.back();
                        }


            },

            cancel:function(path){
                this.$router.back();
            }
        },

    }
</script>

<style scoped>
</style>

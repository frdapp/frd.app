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
                <label class="form-control-label">{{$t('Email')}}</label>
                </td>
                <td>
                    <Input class="form-control" v-model="form.address" placeholder="test@example.com" />
                </td>
            </tr>
            <tr>
                <td>
                <label class="form-control-label">{{$t("Goto")}}</label>
                </td>
                <td>
                    <Input class="form-control" v-model="form.goto" placeholder="test@example.com" />
                </td>
            </tr>

            <tr>
                <td>
                <label class="form-control-label"></label>
                </td>
                <td>
                <Button type="primary" @click="submit()">{{$t("Save")}}</Button>
                <Button @click="cancel">{{$t("Cancel")}}</Button>
                </td>
            </tr>
        </table>
</template>

<script>
    export default {
        created:async function(){
            //fetch options
            //var response=await this.$api.admin_email_list({"page_size":999});
            //if (response) {
           //     this.emails = response.items
            //}


            var item_id=this.$route.query.id;
            if(item_id)
            {
                var response=await this.$api.admin_alias_get(item_id);
                this.form=response
            }
        },
        data: function(){
            return {
                form:{
                    id:0,
                    address:"",
                    goto:'',
                },
            }
        },

        methods:{
            submit:async function(){
                        if(this.form.id)
                        {
                            var response=await this.$api.admin_alias_update(this.form);
                        }
                        else 
                        {
                            var response=await this.$api.admin_alias_create(this.form);
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

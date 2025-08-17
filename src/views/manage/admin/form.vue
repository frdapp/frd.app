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
                <label class="form-control-label">Email</label>
                </td>
                <td>
                <Input class="right_column" ref="title" v-model="form.email" />
                </td>
            </tr>
            <tr>
                <td>
                <label class="form-control-label">{{ $t("Password")}} </label>
                </td>
                <td>
                    <Input type="password" v-model="form.password" />
                </td>
            </tr>
            <tr>
                <td>
                <label class="form-control-label"></label>
                </td>
                <td>
                <Button type="primary" @click="submit(true)">保存</Button>
                <Button @click="cancel">取消</Button>
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
                var response=await this.$api.manage_admin_get(item_id)
                this.form=response
            }
        },
        data: function(){
            return {
                form:{
                    id:0,
                    email:"",
                    password:"",
                },
            }
        },

        methods:{
            submit:async function(back){
                        if(this.form.id)
                        {
                            var response=await this.$api.manage_admin_update(this.form);
                        }
                        else
                        {
                            var response=await this.$api.manage_admin_create(this.form);
                        }

                        if(response != false)
                        {
                            if(back)
                            {
                                this.$router.back(-1);
                            }
                            else
                            {
                                this.$alert("SUCCESS","保存成功!" );
                            }
                        }


            },

            cancel:function(path){
                this.$emit("dialog_cancel")
                this.$router.back();
            }
        },
        components: {
        },
    }
</script>

<style scoped>
                .form-control-label{
                    width:100px;
                }

                .right_column{
                    flex:1;
                    max-width:700px;
                }
</style>

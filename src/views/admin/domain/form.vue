<script setup>
    import VBox from "@/components/VBox.vue"
    import HBox from "@/components/HBox.vue"
    import Input from "@/components/Input.vue"
    import Select from "@/components/Select.vue"
    import Button from "@/components/Button.vue"
    import Textarea from "@/components/Textarea.vue"
</script>

<template>
    <!--
    domain
    description
    aliases
    -->

        <table class="layout-table" style="">
            <tr>
                <td>
                <label class="form-control-label">Domain</label>
                </td>
                <td>
                <Input class="right_column" ref="title" v-model="form.domain" />
                </td>
            </tr>
            <tr>
                <td>
                <label class="form-control-label">描述</label>
                </td>
                <td>
                <Textarea class="right_column" v-model="form.description" :rows=5 cols=60 style="" />
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
        mounted:async function(){

            var url="/api/admin/domain/get"


            var item_id=this.$route.query.id;
            var self=this;

            if(item_id)
            {
                this.mode="update"
                var response=await this.$api.admin_domain_get(item_id);
                this.form=response
            }
        },
        data: function(){
            return {
                mode:"create",
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
            reset:function(path){
                this.form.domain=""
                this.form.description=""
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

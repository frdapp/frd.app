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
                <label class="form-control-label">Username</label>
                </td>
                <td>
                    <HBox>
                        <Input  v-model="form.username"   /> 
                        <Select v-model="form.domain" :options="domains">
                        </Select>
                    </HBox>
                </td>
            </tr>
            <tr>
                <td>
                <label class="form-control-label">Password</label>
                </td>
                <td>
                <Input name="password" type="password" v-model="form.password" />
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
            var item_id=this.$route.query.id;
            var self=this;

            if(item_id)
            {
                this.mode = "update"
                var response = await this.$api.admin_email_get(item_id);
                this.form = response;
            }
        },
        data: function(){
            return {
                mode:"create",
                domains:[
                ],
                form:{
                    id:0,
                    username:"",
                    domain:"",
                    password:'',
                },
            }
        },
        created:async function(){
            var response=await this.$api.admin_domain_list({"page_size":9999});
            for(var index in response.items)
            {
                var domain=response.items[index]["domain"]

                this.domains.push({
                    "label":domain,
                    "value":domain,
                })
            }

            console.log(this.domains)

        },
        methods:{
            submit:async function(back){
                        if(this.form.id)
                        {
                            var response=await this.$api.admin_email_update(this.form);
                        }
                        else
                        {
                            var response=await this.$api.admin_email_create(this.form);
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
                this.form.title=""
                //this.form.tags=""
                this.form.content=""
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

</style>

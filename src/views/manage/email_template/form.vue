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
                <label class="form-control-label">{{$t("Title")}}</label>
                </td>
                <td>
                <Input class="right_column" ref="title" v-model="form.title" />
                </td>
            </tr>
            <tr>
                <td>
                <label class="form-control-label">{{$t("Identify")}}</label>
                </td>
                <td>
                    <Select class=""  v-model="form.identify" >
                        <option value="EMAIL_VERIFY_CODE">EMAIL_VERIFY_CODE</option>
                    </Select>
                </td>
            </tr>
            <tr>
                <td>
                <label class="form-control-label">{{$t("Email Subject")}}</label>
                </td>
                <td>
                    <Input class=""  v-model="form.subject" />
                </td>
            </tr>
            <tr>
                <td>
                <label class="form-control-label">{{$t("Email Content")}}</label>
                </td>
                <td>
                    <Textarea class="" v-model="form.content" :rows=10 cols=60 style="" />
                </td>
            </tr>
            <tr>
                <td>
                <label class="form-control-label"></label>
                </td>
                <td>
                    <Button type="primary" @click="submit">{{$t("Save")}}</Button>
                    <Button @click="cancel">{{$t("Cancel")}}</Button>
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
                var response= await this.$api.manage_email_template_get(item_id)
                this.form = response
            }
        },
        data: function(){
            return {
                form:{
                    id:0,
                    title:"",
                    identify:'EMAIL_VERIFY_CODE',
                    subject:'',
                    content:'',
                },
            }
        },

        methods:{
            submit:async function(){
                        if(this.form.id)
                        {
                            var response=await this.$api.manage_email_template_update(this.form);
                            if (response == false) return false;

                            this.$router.back();
                        }
                        else
                        {
                            var response=await this.$api.manage_email_template_create(this.form);
                            if (response == false) return false;

                            this.$router.back();
                        }



            },
            cancel:function(path){
                this.$router.back();
            }
        },
        components: {
        },
    }
</script>

<style scoped>
                .form-control-label{
                    width:200px;
                }

                .right_column{
                    flex:1;
                    max-width:700px;
                }
</style>

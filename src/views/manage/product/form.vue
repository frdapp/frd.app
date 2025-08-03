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
                <label class="form-control-label">{{$t("Product Type")}}</label>
                </td>
                <td>
                <Select class="" ref="title" v-model="form.product_type" >
                    <option value="NORMAL">Normal</option>
                    <option value="ACTIVITY">Activity</option>
                </Select>
                </td>
            </tr>
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
                <label class="form-control-label">{{$t("Description")}}</label>
                </td>
                <td>
                <Textarea class="right_column" v-model="form.description" :rows=5 cols=60 style="" />
                </td>
            </tr>
            <tr>
                <td>
                <label class="form-control-label">{{$t("Storage")}}</label>
                </td>
                <td>
                    <Input class=""  v-model="form.storage" /> GB
                </td>
            </tr>
            <tr>
                <td>
                <label class="form-control-label">{{$t("Duration")}}</label>
                </td>
                <td>
                    <Input class=""  v-model="form.duration" /> Month
                </td>
            </tr>
            <tr>
                <td>
                <label class="form-control-label">{{$t("Price")}}</label>
                </td>
                <td>
                    <Input class=""  v-model="form.price" />
                </td>
            </tr>
            <tr>
                <td>
                <label class="form-control-label">{{$t("Points")}}</label>
                </td>
                <td>
                    <Input class=""  v-model="form.points" />
                </td>
            </tr>
            <tr>
                <td>
                <label class="form-control-label">{{$t("Stock")}}</label> 
                </td>
                <td>
                    <Input class=""  v-model="form.stock" />
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
        created:async function(){
            var item_id=this.$route.query.id;
            if(item_id)
            {
                var response= await this.$api.manage_product_get(item_id)
                this.form = response
            }
        },
        data: function(){
            return {
                form:{
                    id:0,
                    product_type:"NORMAL",
                    title:"",
                    description:'',
                    storage:1,
                    duration:1,
                    price:0,
                    points:0,
                    amount:0,
                },
            }
        },

        methods:{
            submit:async function(){
                        if(this.form.id)
                        {
                            var response=await this.$api.manage_product_update(this.form);
                            if (response == false) return false;

                            this.$router.back();
                        }
                        else
                        {
                            var response=await this.$api.manage_product_create(this.form);
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
                    width:100px;
                }

                .right_column{
                    flex:1;
                    max-width:700px;
                }
</style>

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
                <label class="form-control-label">{{$t("Activity Type")}}</label>
                </td>
                <td>
                    <Select class=""  v-model="form.activity_type" > 
                        <option value="GIVE_PRODUCT">Give Product</option>
                    </Select>
                </td>
            </tr>
            <tr>
                <td>
                <label class="form-control-label">{{$t("On Event")}}</label>
                </td>
                <td>
                    <Select class=""  v-model="form.on_event" > 
                        <option value="REGISTER">REGISTER</option>
                    </Select>
                </td>
            </tr>
            <tr>
                <td>
                <label class="form-control-label">{{$t("Title")}}</label>
                </td>
                <td>
                <Input class="" ref="title" v-model="form.title" />
                </td>
            </tr>
            <tr>
                <td>
                <label class="form-control-label">{{$t("Description")}}</label>
                </td>
                <td>
                <Textarea class="" v-model="form.description" :rows=5 cols=60 style="" />
                </td>
            </tr>
            <tr>
                <td>
                <label class="form-control-label">{{$t("Params")}}</label>
                </td>
                <td>
                    <div v-if="form.activity_type == 'GIVE_PRODUCT'">
                        <table class="layout-table">
                            <tr>
                                <td>
                                    <label>{{ $t('Start AT') }}</label>
                                </td>
                                <td>
                                    <Input class=""  v-model="form.params.start_at" placeholder="2022-02-02"/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>{{ $t('End AT') }}</label>
                                </td>
                                <td>
                                    <Input class=""  v-model="form.params.end_at" placeholder="2022-02-02"/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>{{ $t('Product ID') }}</label>
                                </td>
                                <td>
                                        <Input class=""  v-model="form.params.product_id" />
                                </td>
                            </tr>
                        </table>
                    </div>
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
            var item_id=this.$route.query.id;
            if(item_id)
            {
                var response= await this.$api.manage_activity_get(item_id)
                this.form = response
            }
        },
        data: function(){
            return {
                form:{
                    id:0,
                    title:"",
                    description:'',
                    activity_type:"",
                    on_event:"",
                    params:{},
                },
            }
        },

        methods:{
            submit:async function(){
                        if(this.form.id)
                        {
                            var response=await this.$api.manage_activity_update(this.form);
                            if (response == false) return false;

                            this.$router.back();
                        }
                        else
                        {
                            var response=await this.$api.manage_activity_create(this.form);
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
</style>

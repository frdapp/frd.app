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
        <label class="form-control-label">标题</label>
      </td>
      <td>
        <Input class="right_column" ref="title" v-model="form.title" autocomplete="on" />
      </td>
    </tr>

    <tr>
      <td>
        <label class="form-control-label">描述</label>
      </td>
      <td>
        <Textarea class="right_column" v-model="form.description" :rows=25 cols=60 style="" />
      </td>
    </tr>

    <tr>
      <td>
        <label class="form-control-label"></label>
      </td>
      <td>
        <Button type="button" @click="submit(true)">保存</Button>
        <Button @click="cancel">取消</Button>
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
        this.mode="update"
        var response=await this.$api.admin_ticket_get({"id":item_id});
          this.form=response;
      }
    },
    data: function(){
      return {
        mode:"create",
        form:{
          id:0,
          title:"",
          description:'',
        },
      }
    },

    methods:{
      submit:async function(back){
        if(this.form.id)
        {
          var response=await this.$api.admin_ticket_update(this.form);
        }
        else
        {
          var response=await this.$api.admin_ticket_create(this.form);
        }

        if(response != false)
        {
          if(back)
          {
            this.$router.back(-1);
          }
          else
          {
            this.$alert("SUCCESS",this.$t("Save Successful") );
          }
        }


      },

      cancel:function(path){
      }
    },
    components: {
    },
  }
</script>

<style scoped>
</style>

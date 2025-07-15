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
        <label class="form-control-label"></label>
      </td>
      <td>
        {{ ticket.title }}
      </td>
    </tr>

    <tr>
      <td>
        <label class="form-control-label"></label>
      </td>
      <td>
        {{ ticket.description }}
      </td>
    </tr>

    <tr>
      <td>
        <label class="form-control-label"></label>
      </td>
      <td>
        <div v-for="message in ticket.messages">
          {{ message.user_id }}
          {{ message.message }}
          {{ message.created_at }}

        </div>
      </td>
    </tr>

    <tr>
      <td>
        <label class="form-control-label"></label>
      </td>
      <td>
        <Textarea class="" v-model="form.message" :rows=10 cols=60 style="" />
      </td>
    </tr>

    <tr>
      <td>
        <label class="form-control-label"></label>
      </td>
      <td>
        <Button type="button" @click="append_message(true)">保存</Button>
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
        var response=await this.$api.manage_ticket_get(item_id);
        this.ticket = response;
      }
    },
    data: function(){
      return {
        ticket:{
          id:0,
          title:"",
          description:'',
          messages:[],
        },
        form:{
          message:"",
        }
      }
    },

    methods:{
      append_message:async function(){
        var params={
          "ticket_id":this.ticket.id,
          "message":this.form.message,
        };
        var response = await this.$api.manage_ticket_append_message(params);
        if(response == false) return false;

        this.$router.back(-1);
      },
    },
  }
</script>

<style scoped>
.form-control-label{
  width:100px;
}

</style>

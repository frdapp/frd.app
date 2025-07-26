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
        <strong>{{ ticket.title }}</strong>
      </td>
    </tr>

    <tr>
      <td>
        <label class="form-control-label"></label>
      </td>
      <td>
        {{ ticket.description }}
        <hr/>
      </td>
    </tr>

    <tr>
      <td>
        <label class="form-control-label"></label>
      </td>
      <td>
        <div v-for="message in ticket.messages">
          <span>{{ message.name }} {{ message.created_at }} </span>
          <p>
          {{ message.message }}
          </p>

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
        <Button type="button" @click="append_message(true)">{{ $t("Save")}}</Button>
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
        var response=await this.$api.admin_ticket_get(item_id);
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
        var response = await this.$api.admin_ticket_append_message(params);
        if(response == false) return false;

         window.location.reload()
      },
    },
  }
</script>

<style scoped>
.form-control-label{
  width:100px;
}

</style>

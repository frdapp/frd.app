<script setup>
  import VBox from "@/components/VBox.vue"
    import HBox from "@/components/HBox.vue"
    import Input from "@/components/Input.vue"
    import Select from "@/components/Select.vue"
    import Button from "@/components/Button.vue"
    import Textarea from "@/components/Textarea.vue"
</script>

<template>
  <VBox style="width:600px">

  
        <strong>{{ ticket.title }}</strong>


   
        <p>
        {{ ticket.description }}
        </p>
        <ul class="list-group" style="height:300px;overflow:scroll">
          <li v-for="message in ticket.messages" class="list-group-item">
          {{ message.name }}
            {{ message.created_at }}
          <p>
          {{ message.message }}
          </p>

          </li>
        </ul>


 
        <Textarea class="" v-model="form.message" :rows=10 cols=60 style="margin-top:10px" />


        <Button type="button" @click="append_message(true)">保存</Button>

  </VBox>
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
